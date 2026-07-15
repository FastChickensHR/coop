export interface ComboboxOption {
    value: string;
    label: string;
}
export interface ComboboxProps {
    options: ComboboxOption[];
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    $hasError?: boolean;
    id?: string;
    'aria-label'?: string;
    className?: string;
}
/**
 * A searchable select (ADR-0175): type to filter a long option list, then pick
 * one. Use a Combobox over a plain Select when there are enough options that
 * scanning them is slow (states, carriers, employees); for a short list a Select
 * is simpler, and for a few side-by-side choices use a Radio group. Full keyboard
 * nav (type, arrows, Enter, Escape) and FormField status wiring.
 */
export declare function Combobox({ options, value, onValueChange, placeholder, disabled, $hasError, id, className, 'aria-label': ariaLabel, }: ComboboxProps): import("react").JSX.Element;
