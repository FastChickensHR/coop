export interface DatePickerProps {
    /** ISO `YYYY-MM-DD`, or `null`/undefined when unset. */
    value?: string | null;
    onValueChange?: (value: string | null) => void;
    /** Inclusive ISO bounds; days outside are disabled and typed out-of-range values are rejected. */
    min?: string | null;
    max?: string | null;
    /** Allow an open-ended (`null`) boundary, shown as `openEndedLabel` with a toggle. */
    allowOpenEnded?: boolean;
    /** Muted word shown when open-ended, e.g. "Ongoing" / "Always". */
    openEndedLabel?: string;
    placeholder?: string;
    disabled?: boolean;
    $hasError?: boolean;
    /** Override the auto-generated control id (normally supplied by FormField). */
    id?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    className?: string;
}
export declare function DatePicker({ value, onValueChange, min, max, allowOpenEnded, openEndedLabel, placeholder, disabled, $hasError, id, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, className, }: DatePickerProps): import("react").JSX.Element;
