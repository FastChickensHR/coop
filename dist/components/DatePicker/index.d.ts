import { type DateEdge } from '../../lib/quickPicks';
export interface DatePickerProps {
    /** ISO `YYYY-MM-DD`, or `null`/undefined when unset. */
    value?: string | null;
    /** Called with the new ISO date, or `null` when cleared / set open-ended. */
    onValueChange?: (value: string | null) => void;
    /** Inclusive ISO bounds; days outside are disabled and typed out-of-range values are rejected. */
    min?: string | null;
    /** Inclusive upper ISO bound (see `min`). */
    max?: string | null;
    /** Allow an open-ended (`null`) boundary, shown as `openEndedLabel` with a toggle. */
    allowOpenEnded?: boolean;
    /** Muted word shown when open-ended, e.g. "Ongoing" / "Always". */
    openEndedLabel?: string;
    /**
     * Which end of a period this field sits on — it chooses the quick-pick list (ADR-0816 §4).
     * A bare `DatePicker` is a start edge, which is also what the as-of lens wants: a lens is most
     * valuable pointed forward, to verify a scheduled change.
     *
     * @default 'start'
     */
    edge?: DateEdge;
    /** Text shown in the empty text input; also the format hint. @default 'YYYY-MM-DD' */
    placeholder?: string;
    /** Render the control unusable and dimmed; the calendar cannot be opened. */
    disabled?: boolean;
    /** Force the error status even outside a FormField. */
    hasError?: boolean;
    /** Override the auto-generated control id (normally supplied by FormField). */
    id?: string;
    /** Accessible name for the text input when there's no visible label. */
    'aria-label'?: string;
    /** Id of an existing element that names the text input (alternative to `aria-label`). */
    'aria-labelledby'?: string;
    /** Class name for the root element (for layout only — colour and size come from the theme). */
    className?: string;
}
export declare function DatePicker({ value, onValueChange, min, max, allowOpenEnded, openEndedLabel, edge, placeholder, disabled, hasError, id, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, className, }: DatePickerProps): import("react").JSX.Element;
