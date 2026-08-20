import { type DateRangeValue } from './PeriodChips';
export interface DateRangePickerProps {
    /** ISO `YYYY-MM-DD` or `null` for each boundary. */
    start?: string | null;
    /** The range's closing boundary (see `start`). */
    end?: string | null;
    /** Called with the new start boundary, or `null` when cleared / set open-ended. */
    onStartChange?: (value: string | null) => void;
    /** Called with the new end boundary, or `null` when cleared / set open-ended. */
    onEndChange?: (value: string | null) => void;
    /**
     * Applies a whole calendar period in **one** call. Supplying it is what turns the period chips on
     * (ADR-0816 §7) — they are not wanted on every range, and there is no other reason to want this.
     *
     * ⚠️ It is a distinct prop rather than a sequential `onStartChange` + `onEndChange` because that
     * pair only works by luck: it survives a functional patch, and silently commits a range with just
     * its **end** set behind a closure-style setter.
     */
    onRangeChange?: (range: DateRangeValue) => void;
    /** Accessible name for the chip group — distinguishes two chipped ranges on one page. @default 'Set both dates' */
    periodsAriaLabel?: string;
    /** Outer inclusive bounds applied to both ends (e.g. within a plan year). */
    min?: string | null;
    /** Outer inclusive upper bound applied to both ends (see `min`). */
    max?: string | null;
    /** Per-boundary open-endedness (start → "Always", end → "Ongoing"). */
    allowOpenEndedStart?: boolean;
    /** Let the end boundary be open-ended (`null`), shown as `endOpenEndedLabel`. */
    allowOpenEndedEnd?: boolean;
    /** Muted word shown when the start is open-ended (with `allowOpenEndedStart`). */
    startOpenEndedLabel?: string;
    /** Muted word shown when the end is open-ended (with `allowOpenEndedEnd`). */
    endOpenEndedLabel?: string;
    /** Override the auto-generated id of the start input. */
    startId?: string;
    /** Override the auto-generated id of the end input. */
    endId?: string;
    /** Accessible names for the two inputs (they have no visible per-field label). @default 'Start date' */
    startAriaLabel?: string;
    /** Accessible name for the end input (see `startAriaLabel`). @default 'End date' */
    endAriaLabel?: string;
    /** Render both inputs unusable and dimmed; the chips go with them. */
    disabled?: boolean;
    /** Force the error status on both inputs even outside a FormField. */
    hasError?: boolean;
}
/**
 * A date range as two linked {@link DatePicker}s (ADR-0079). The end cannot precede the start and
 * vice-versa — coupling flows through each side's `min`/`max` (typed out-of-range values are
 * rejected and calendar days disabled), composed with the outer `min`/`max`. Each boundary can be
 * independently open-ended. The whole thing is `useState`-friendly (two `value`/`onChange` pairs).
 *
 * Supply `onRangeChange` to also offer the four calendar-period chips (ADR-0816 §7) inline after
 * the pair — see {@link PeriodChips}.
 */
export declare function DateRangePicker({ start, end, onStartChange, onEndChange, onRangeChange, periodsAriaLabel, min, max, allowOpenEndedStart, allowOpenEndedEnd, startOpenEndedLabel, endOpenEndedLabel, startId, endId, startAriaLabel, endAriaLabel, disabled, hasError, }: DateRangePickerProps): import("react").JSX.Element;
