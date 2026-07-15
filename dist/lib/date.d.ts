import { CalendarDate } from '@internationalized/date';
/** Parse a date-only ISO `YYYY-MM-DD` into a `CalendarDate`, or `null` if absent/invalid. */
export declare function fromISO(iso: string | null | undefined): CalendarDate | null;
/** Serialize a `CalendarDate` back to an ISO `YYYY-MM-DD` string, or `null`. */
export declare function toISO(date: CalendarDate | null | undefined): string | null;
/** Today as an ISO `YYYY-MM-DD` string in the user's local zone. */
export declare function todayISO(): string;
/**
 * Forgiving parse of user-typed date text into a `CalendarDate`, or `null` if empty/unparseable.
 * Accepts ISO `YYYY-MM-DD` and US `M/D/YYYY`. Ranges are validated (Feb 30, month 13 → `null`).
 */
export declare function parseUserDate(input: string): CalendarDate | null;
/**
 * Friendly long date, e.g. `Jan 1, 2027`. A date-only ISO string is formatted in UTC so it never
 * drifts a day; a full timestamp falls back to the local date. `null`/invalid → `fallback`.
 */
export declare function formatDate(iso: string | null | undefined, fallback?: string): string;
/** Numeric date `MM/DD/YYYY` from a date-only ISO string. `null`/invalid → `fallback`. */
export declare function formatDateNumeric(iso: string | null | undefined, fallback?: string): string;
/**
 * Friendly date + time from a timestamp, e.g. `Jan 1, 2027, 03:04 PM`. Pass `timeZoneName` to
 * append the zone (e.g. ` PST`). Rendered in the local zone. `null`/invalid → `fallback`.
 */
export declare function formatDateTime(iso: string | null | undefined, opts?: {
    timeZoneName?: boolean;
}, fallback?: string): string;
