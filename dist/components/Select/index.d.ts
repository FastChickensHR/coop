export interface SelectOption {
    value: string;
    label: string;
}
export interface SelectProps {
    value?: string;
    onValueChange?: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    $hasError?: boolean;
    /** Override the auto-generated control id (normally supplied by FormField). */
    id?: string;
    /** Accessible name for a select with no visible label (inline filters, table cells). */
    'aria-label'?: string;
    'aria-labelledby'?: string;
    /** Forwarded to the trigger so `styled(Select)` can adjust sizing/layout. */
    className?: string;
}
export declare function Select({ value, onValueChange, options, placeholder, disabled, $hasError, id, className, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, }: SelectProps): import("react").JSX.Element;
