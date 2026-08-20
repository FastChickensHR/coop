import { CalendarDate } from '@internationalized/date';
/** Parse a date-only ISO `YYYY-MM-DD` into a `CalendarDate`, or `null` if absent/invalid. */
export declare function fromISO(iso: string | null | undefined): CalendarDate | null;
/** Serialize a `CalendarDate` back to an ISO `YYYY-MM-DD` string, or `null`. */
export declare function toISO(date: CalendarDate | null | undefined): string | null;
/**
 * Today as a `CalendarDate` in the user's local zone.
 *
 * This is the app's single definition of "what day is it" — every "today" must come from here or
 * from {@link todayISO}. Hand-rolling `new Date().toISOString().slice(0, 10)` computes today in
 * **UTC**, which west of UTC returns *tomorrow* for the last hours of every local day.
 */
export declare function todayDate(): CalendarDate;
/**
 * Today as a `CalendarDate` in `timeZone` — for surfaces whose *contents* are bucketed in some other
 * zone than the viewer's. The dashboard calendar is the case (#775): its counts are bucketed in the
 * organisation's zone, so highlighting the viewer's today would put the ring on a cell whose contents
 * belong to a different day.
 */
export declare function todayDateIn(timeZone: string): CalendarDate;
/** Today as an ISO `YYYY-MM-DD` string in the user's local zone. See {@link todayDate}. */
export declare function todayISO(): string;
/**
 * Is `iso` outside the inclusive bounds? ISO `YYYY-MM-DD` strings compare chronologically, so this
 * is a string comparison.
 *
 * ⚠️ Empty and absent bounds both mean "no bound". ADR-0079 slice 4 shipped a bug by treating `''`
 * as a real bound, which disabled every day in the calendar; anything needing this predicate must
 * call it rather than hand-roll `iso < min`, which is how that bug returns.
 */
export declare function outOfRange(iso: string, min?: string | null, max?: string | null): boolean;
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
export declare function parseUserDate(input: string): CalendarDate | null;
/**
 * The boundary vocabulary — a closed word set for a boundary that is open rather than dated.
 *
 * Every renderer of a date-only value passes one of these as `formatDate`'s `fallback`, which is
 * the whole reason `formatDate` still exists now that a dated value is echoed: it owns this
 * vocabulary. There is deliberately **no** `formatBoundary(iso, side)` helper — `side` would be a
 * boolean in disguise, and every call site knows its side statically.
 */
/** The open *start* boundary — no beginning: "has been true forever". */
export declare const ALWAYS = "Always";
/** The open *end* boundary — no ending: "still true, indefinitely". */
export declare const ONGOING = "Ongoing";
/** Both ends open — a fact with no period at all. */
export declare const ANYTIME = "Anytime";
/**
 * A date-only value, echoed as the ISO `YYYY-MM-DD` it already is, e.g. `2027-01-01`.
 *
 * `null`, an empty string, an out-of-range date, **and a timestamp** all render `fallback` — pass
 * one of {@link ALWAYS} / {@link ONGOING} / {@link ANYTIME} when the absence has a word. Handing a
 * timestamp to this function is a kind error, and it shows as the fallback rather than a date that
 * would be wrong in the reader's zone; use {@link formatInstant} for a moment.
 */
export declare function formatDate(iso: string | null | undefined, fallback?: string): string;
/**
 * The calendar day an instant falls on **in the user's local zone**, or `null` if `iso` is absent,
 * unparseable, or a bare date-only string (which is not a moment and must not be projected).
 */
export declare function dayOfInstant(iso: string | null | undefined): CalendarDate | null;
/**
 * An instant projected onto the day it falls on locally, rendered friendly, e.g. `Jan 1, 2027`.
 *
 * The friendly form is the point: a projected day *should* look approximate, because it is one.
 * `null`/invalid → `fallback`, and so does a bare `YYYY-MM-DD` — a date-only value is not a moment,
 * so it goes to {@link formatDate}.
 */
export declare function formatInstant(iso: string | null | undefined, fallback?: string): string;
/**
 * Friendly date + time from a timestamp, e.g. `Jan 1, 2027, 03:04 PM`. Pass `timeZoneName` to
 * append the zone (e.g. ` PST`). Rendered in the local zone. `null`/invalid → `fallback`.
 */
export declare function formatDateTime(iso: string | null | undefined, opts?: {
    timeZoneName?: boolean;
}, fallback?: string): string;
