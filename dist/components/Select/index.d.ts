export interface SelectOption {
    value: string;
    label: string;
    /** Render the option visible but unselectable (a refused-but-not-hidden choice). @default false */
    disabled?: boolean;
    /** Muted sub-line under the label — e.g. why a disabled option can't be chosen. */
    hint?: string;
}
export interface SelectProps {
    /** The selected option's value (controlled). */
    value?: string;
    /** Called with the value of the option the user picked. */
    onValueChange?: (value: string) => void;
    /** The choices to offer, in display order. */
    options: SelectOption[];
    /** Text shown on the trigger while nothing is selected. */
    placeholder?: string;
    /** Render the control unusable and dimmed; the list cannot be opened. */
    disabled?: boolean;
    /** Force the error status even outside a FormField. */
    hasError?: boolean;
    /** Override the auto-generated control id (normally supplied by FormField). */
    id?: string;
    /** Accessible name for a select with no visible label (inline filters, table cells). */
    'aria-label'?: string;
    /** Id of an existing element that names the trigger (alternative to `aria-label`). */
    'aria-labelledby'?: string;
    /** Forwarded to the trigger — e.g. `-1` to take it out of the tab order inside a roving grid. */
    tabIndex?: number;
    /** Forwarded to the trigger so `styled(Select)` can adjust sizing/layout. */
    className?: string;
}
export declare function Select({ value, onValueChange, options, placeholder, disabled, hasError, id, className, tabIndex, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, }: SelectProps): import("react").JSX.Element;
