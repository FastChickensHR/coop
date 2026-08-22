export interface ComboboxOption {
    value: string;
    label: string;
}
interface ComboboxCommonProps {
    /** The choices to offer; filtered client-side as the user types unless `onSearch` is given. */
    options: ComboboxOption[];
    /** Fetch options remotely: called (debounced) with the query as the user types. When provided, the component stops filtering client-side — the server-supplied `options` are shown as-is. */
    onSearch?: (query: string) => void;
    /** Show a loading row while remote results are in flight (used with `onSearch`). */
    loading?: boolean;
    /** Debounce before `onSearch` fires, in milliseconds. @default 250 */
    debounceMs?: number;
    /** Allow entering a value that isn't in the list: a "Create …" row appears for an unmatched query, and the typed text becomes the value. */
    creatable?: boolean;
    /** Called with the newly created value when a "Create …" row is chosen (with `creatable`). */
    onCreate?: (value: string) => void;
    /** Text shown in the empty search box. @default 'Search…' */
    placeholder?: string;
    /** Render the control unusable and dimmed; the list cannot be opened. */
    disabled?: boolean;
    /** Force the error status even outside a FormField. */
    hasError?: boolean;
    /** Override the auto-generated control id (normally supplied by FormField). */
    id?: string;
    /** Accessible name for the search box when there's no visible label. */
    'aria-label'?: string;
    /** Class name for the root element (for layout only — colour and size come from the theme). */
    className?: string;
}
/** Single-select: one value, picking closes the list. */
export interface ComboboxSingleProps extends ComboboxCommonProps {
    multiple?: false;
    /** Selected value. */
    value?: string;
    /** Called with the picked value. */
    onValueChange?: (value: string) => void;
}
/** Multi-select: selections render as removable chips, picking toggles membership, the list stays open. */
export interface ComboboxMultiProps extends ComboboxCommonProps {
    multiple: true;
    /** Selected values. */
    values: string[];
    /** Called with the full next selection. */
    onValuesChange: (values: string[]) => void;
}
/**
 * The two modes as a discriminated union (#1229, docs/code-style.md TypeScript 4): the old
 * flat surface let `multiple` + `value` or a bare `values` type-check and fail by convention —
 * now a single-select cannot carry `values`, and a multi cannot carry `value`.
 */
export type ComboboxProps = ComboboxSingleProps | ComboboxMultiProps;
/**
 * A searchable select (ADR-0175): type to filter a long option list, then pick
 * one — or several with `multiple`, where picks become removable chips. Use a
 * Combobox over a plain Select when there are enough options that scanning them
 * is slow (states, carriers, employees); for a short list a Select is simpler,
 * and for a few side-by-side choices use a Radio group. Pass `onSearch` to load
 * options remotely (debounced) for very large lists, or `creatable` to let users
 * enter a value that isn't listed. Full keyboard nav (type, arrows, Enter, Escape;
 * Backspace removes the last chip) and FormField status wiring.
 */
export declare function Combobox(props: ComboboxProps): import("react").JSX.Element;
export {};
