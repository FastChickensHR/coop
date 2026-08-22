import { type DateRangeValue } from './PeriodChips';
/**
 * One boundary of the range (#1229, docs/code-style.md TypeScript 4). The old surface mirrored
 * twelve start/end props pairwise; each edge now carries its own object, so a prop cannot be
 * given for one end and forgotten for the other by accident.
 */
export interface DateRangeEdgeProps {
    /** ISO `YYYY-MM-DD`, or `null` when unset / open-ended. */
    value?: string | null;
    /** Called with the new boundary, or `null` when cleared / set open-ended. */
    onValueChange?: (value: string | null) => void;
    /** Let this boundary be open-ended (`null`), shown as `openEndedLabel`. */
    allowOpenEnded?: boolean;
    /** Muted word shown when open-ended (start → "Always", end → "Ongoing"). */
    openEndedLabel?: string;
    /** Override the auto-generated id of this input. */
    id?: string;
    /** Accessible name for this input (they have no visible per-field label).
     *  @default 'Start date' / 'End date' */
    ariaLabel?: string;
}
/** Props for DateRangePicker. */
export interface DateRangePickerProps {
    /** The range's opening boundary. */
    start?: DateRangeEdgeProps;
    /** The range's closing boundary. */
    end?: DateRangeEdgeProps;
    /**
     * Applies a whole calendar period in **one** call. Supplying it is what turns the period chips on
     * (ADR-0816 §7) — they are not wanted on every range, and there is no other reason to want this.
     *
     * ⚠️ It is a distinct prop rather than a sequential pair of edge changes because that pair only
     * works by luck: it survives a functional patch, and silently commits a range with just its
     * **end** set behind a closure-style setter.
     */
    onRangeChange?: (range: DateRangeValue) => void;
    /** Accessible name for the chip group — distinguishes two chipped ranges on one page. @default 'Set both dates' */
    periodsAriaLabel?: string;
    /** Outer inclusive bounds applied to both ends (e.g. within a plan year). */
    min?: string | null;
    /** Outer inclusive upper bound applied to both ends (see `min`). */
    max?: string | null;
    /** Render both inputs unusable and dimmed; the chips go with them. */
    disabled?: boolean;
    /** Force the error status on both inputs even outside a FormField. */
    hasError?: boolean;
}
/**
 * A date range as two linked {@link DatePicker}s (ADR-0079). The end cannot precede the start and
 * vice-versa — coupling flows through each side's `min`/`max` (typed out-of-range values are
 * rejected and calendar days disabled), composed with the outer `min`/`max`. Each boundary can be
 * independently open-ended, configured on its own `start`/`end` edge object (#1229).
 *
 * Supply `onRangeChange` to also offer the four calendar-period chips (ADR-0816 §7) inline after
 * the pair — see {@link PeriodChips}.
 */
export declare function DateRangePicker({ start, end, onRangeChange, periodsAriaLabel, min, max, disabled, hasError, }: DateRangePickerProps): import("react").JSX.Element;
