// Canonical date seam for the app (ADR-0079).
//
// One home for date parsing, serialization, and display formatting so call sites stop
// hand-rolling `new Date(...).toLocaleDateString(...)` (which silently drifts a day on
// date-only ISO strings west of UTC). Date-only math is backed by @internationalized/date's
// `CalendarDate`, which is off-by-one-proof by construction. The value contract everywhere is
// an ISO `YYYY-MM-DD` string, or `null` for an open-ended / absent boundary.

import { CalendarDate, parseDate, today, getLocalTimeZone } from '@internationalized/date'

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

/** Today as an ISO `YYYY-MM-DD` string in the user's local zone. */
export function todayISO(): string {
  return today(getLocalTimeZone()).toString()
}

const US_DATE = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/

/**
 * Forgiving parse of user-typed date text into a `CalendarDate`, or `null` if empty/unparseable.
 * Accepts ISO `YYYY-MM-DD` and US `M/D/YYYY`. Ranges are validated (Feb 30, month 13 → `null`).
 */
export function parseUserDate(input: string): CalendarDate | null {
  const s = input.trim()
  if (!s) return null
  if (ISO_DATE.test(s)) return fromISO(s)
  const m = US_DATE.exec(s)
  if (m) {
    const [, mm, dd, yyyy] = m
    return fromISO(`${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`)
  }
  return null
}

const LONG_UTC = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})
const LONG_LOCAL = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

/**
 * Friendly long date, e.g. `Jan 1, 2027`. A date-only ISO string is formatted in UTC so it never
 * drifts a day; a full timestamp falls back to the local date. `null`/invalid → `fallback`.
 */
export function formatDate(iso: string | null | undefined, fallback = '—'): string {
  if (!iso) return fallback
  const cd = fromISO(iso)
  if (cd) return LONG_UTC.format(new Date(Date.UTC(cd.year, cd.month - 1, cd.day)))
  const dt = new Date(iso)
  return Number.isNaN(dt.getTime()) ? fallback : LONG_LOCAL.format(dt)
}

/** Numeric date `MM/DD/YYYY` from a date-only ISO string. `null`/invalid → `fallback`. */
export function formatDateNumeric(iso: string | null | undefined, fallback = '—'): string {
  if (!iso) return fallback
  const [y, m, d] = iso.slice(0, 10).split('-')
  if (!y || !m || !d) return fallback
  return `${m}/${d}/${y}`
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
