// Canonical date seam for the app (ADR-0079, amended by ADR-0816 §8).
//
// One home for date parsing, serialization, and display formatting so call sites stop
// hand-rolling `new Date(...).toLocaleDateString(...)` (which silently drifts a day on
// date-only ISO strings west of UTC). Date-only math is backed by @internationalized/date's
// `CalendarDate`, which is off-by-one-proof by construction. The value contract everywhere is
// an ISO `YYYY-MM-DD` string, or `null` for an open-ended / absent boundary.
//
// ⚠️ The display seam cuts on **value kind, not on place** (ADR-0816 §8): a date-only value is a
// fact about a calendar day with an exact spelling that round-trips, so it is *echoed* as ISO; an
// instant is a moment being *projected* onto a day, where ISO would assert a precision it does not
// have in the reader's zone, so it is rendered friendly. `formatDate` and `formatInstant` therefore
// guard **both** ways — hand one the other's kind and you get the fallback, never a false date.

import {
  CalendarDate,
  parseDate,
  today,
  getLocalTimeZone,
  fromDate,
  toCalendarDate,
} from '@internationalized/date'

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

/** Parse a date-only ISO `YYYY-MM-DD` into a `CalendarDate`, or `null` if absent/invalid. */
export function fromISO(iso: string | null | undefined): CalendarDate | null {
  if (!iso || !ISO_DATE.test(iso)) return null
  try {
    return parseDate(iso)
  } catch {
    return null
  }
}

/** Serialize a `CalendarDate` back to an ISO `YYYY-MM-DD` string, or `null`. */
export function toISO(date: CalendarDate | null | undefined): string | null {
  return date ? date.toString() : null
}

/**
 * Today as a `CalendarDate` in the user's local zone.
 *
 * This is the app's single definition of "what day is it" — every "today" must come from here or
 * from {@link todayISO}. Hand-rolling `new Date().toISOString().slice(0, 10)` computes today in
 * **UTC**, which west of UTC returns *tomorrow* for the last hours of every local day.
 */
export function todayDate(): CalendarDate {
  return today(getLocalTimeZone())
}

/**
 * Today as a `CalendarDate` in `timeZone` — for surfaces whose *contents* are bucketed in some other
 * zone than the viewer's. The dashboard calendar is the case (#775): its counts are bucketed in the
 * organisation's zone, so highlighting the viewer's today would put the ring on a cell whose contents
 * belong to a different day.
 */
export function todayDateIn(timeZone: string): CalendarDate {
  return today(timeZone)
}

/** Today as an ISO `YYYY-MM-DD` string in the user's local zone. See {@link todayDate}. */
export function todayISO(): string {
  return todayDate().toString()
}

/**
 * Is `iso` outside the inclusive bounds? ISO `YYYY-MM-DD` strings compare chronologically, so this
 * is a string comparison.
 *
 * ⚠️ Empty and absent bounds both mean "no bound". ADR-0079 slice 4 shipped a bug by treating `''`
 * as a real bound, which disabled every day in the calendar; anything needing this predicate must
 * call it rather than hand-roll `iso < min`, which is how that bug returns.
 */
export function outOfRange(iso: string, min?: string | null, max?: string | null): boolean {
  return (!!min && iso < min) || (!!max && iso > max)
}

const US_DATE = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
const COMPACT_DATE = /^(\d{4})(\d{2})(\d{2})$/

/**
 * Forgiving parse of user-typed date text into a `CalendarDate`, or `null` if empty/unparseable.
 * Accepts ISO `YYYY-MM-DD`, compact `CCYYMMDD` (exactly eight bare digits — the format X12 emits,
 * so it is the one users read all day), and US `M/D/YYYY`. Ranges are validated (Feb 30, month 13
 * → `null`).
 *
 * ADR-0816 §1: eight digits are read as `CCYYMMDD` and nothing else. `MMDDYYYY` can never parse
 * validly under that reading, so it fails loudly rather than silently meaning another date, and
 * `YYMMDD` is refused because six digits *would* mis-commit halfway through typing eight.
 *
 * ⚠️ Load-bearing invariant, relied on by `DatePicker`'s live commit in `onChange`: **no prefix of
 * a valid input is itself valid**, so typing can never commit a date the user did not finish
 * typing. Any new accepted shape must preserve it.
 */
export function parseUserDate(input: string): CalendarDate | null {
  const s = input.trim()
  if (!s) return null
  if (ISO_DATE.test(s)) return fromISO(s)
  const compact = COMPACT_DATE.exec(s)
  if (compact) {
    const [, yyyy, mm, dd] = compact
    return fromISO(`${yyyy}-${mm}-${dd}`)
  }
  const m = US_DATE.exec(s)
  if (m) {
    const [, mm, dd, yyyy] = m
    return fromISO(`${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`)
  }
  return null
}

/**
 * The boundary vocabulary — a closed word set for a boundary that is open rather than dated.
 *
 * Every renderer of a date-only value passes one of these as `formatDate`'s `fallback`, which is
 * the whole reason `formatDate` still exists now that a dated value is echoed: it owns this
 * vocabulary. There is deliberately **no** `formatBoundary(iso, side)` helper — `side` would be a
 * boolean in disguise, and every call site knows its side statically.
 */
/** The open *start* boundary — no beginning: "has been true forever". */
export const ALWAYS = 'Always'
/** The open *end* boundary — no ending: "still true, indefinitely". */
export const ONGOING = 'Ongoing'
/** Both ends open — a fact with no period at all. */
export const ANYTIME = 'Anytime'

const LONG_UTC = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

/**
 * A date-only value, echoed as the ISO `YYYY-MM-DD` it already is, e.g. `2027-01-01`.
 *
 * `null`, an empty string, an out-of-range date, **and a timestamp** all render `fallback` — pass
 * one of {@link ALWAYS} / {@link ONGOING} / {@link ANYTIME} when the absence has a word. Handing a
 * timestamp to this function is a kind error, and it shows as the fallback rather than a date that
 * would be wrong in the reader's zone; use {@link formatInstant} for a moment.
 */
export function formatDate(iso: string | null | undefined, fallback = '—'): string {
  return iso && fromISO(iso) ? iso : fallback
}

/**
 * The calendar day an instant falls on **in the user's local zone**, or `null` if `iso` is absent,
 * unparseable, or a bare date-only string (which is not a moment and must not be projected).
 */
export function dayOfInstant(iso: string | null | undefined): CalendarDate | null {
  if (!iso || ISO_DATE.test(iso)) return null
  const dt = new Date(iso)
  if (Number.isNaN(dt.getTime())) return null
  return toCalendarDate(fromDate(dt, getLocalTimeZone()))
}

/**
 * An instant projected onto the day it falls on locally, rendered friendly, e.g. `Jan 1, 2027`.
 *
 * The friendly form is the point: a projected day *should* look approximate, because it is one.
 * `null`/invalid → `fallback`, and so does a bare `YYYY-MM-DD` — a date-only value is not a moment,
 * so it goes to {@link formatDate}.
 */
export function formatInstant(iso: string | null | undefined, fallback = '—'): string {
  const day = dayOfInstant(iso)
  if (!day) return fallback
  return LONG_UTC.format(new Date(Date.UTC(day.year, day.month - 1, day.day)))
}

/**
 * Friendly date + time from a timestamp, e.g. `Jan 1, 2027, 03:04 PM`. Pass `timeZoneName` to
 * append the zone (e.g. ` PST`). Rendered in the local zone. `null`/invalid → `fallback`.
 */
export function formatDateTime(
  iso: string | null | undefined,
  opts?: { timeZoneName?: boolean },
  fallback = '—',
): string {
  if (!iso) return fallback
  const dt = new Date(iso)
  if (Number.isNaN(dt.getTime())) return fallback
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...(opts?.timeZoneName ? { timeZoneName: 'short' as const } : {}),
  }).format(dt)
}
