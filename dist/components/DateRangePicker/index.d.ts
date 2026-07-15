export interface DateRangePickerProps {
    /** ISO `YYYY-MM-DD` or `null` for each boundary. */
    start?: string | null;
    end?: string | null;
    onStartChange?: (value: string | null) => void;
    onEndChange?: (value: string | null) => void;
    /** Outer inclusive bounds applied to both ends (e.g. within a plan year). */
    min?: string | null;
    max?: string | null;
    /** Per-boundary open-endedness (start → "Always", end → "Ongoing"). */
    allowOpenEndedStart?: boolean;
    allowOpenEndedEnd?: boolean;
    startOpenEndedLabel?: string;
    endOpenEndedLabel?: string;
    startId?: string;
    endId?: string;
    /** Accessible names for the two inputs (they have no visible per-field label). */
    startAriaLabel?: string;
    endAriaLabel?: string;
    disabled?: boolean;
    $hasError?: boolean;
}
/**
 * A date range as two linked {@link DatePicker}s (ADR-0079). The end cannot precede the start and
 * vice-versa — coupling flows through each side's `min`/`max` (typed out-of-range values are
 * rejected and calendar days disabled), composed with the outer `min`/`max`. Each boundary can be
 * independently open-ended. The whole thing is `useState`-friendly (two `value`/`onChange` pairs).
 */
export declare function DateRangePicker({ start, end, onStartChange, onEndChange, min, max, allowOpenEndedStart, allowOpenEndedEnd, startOpenEndedLabel, endOpenEndedLabel, startId, endId, startAriaLabel, endAriaLabel, disabled, $hasError, }: DateRangePickerProps): import("react").JSX.Element;
