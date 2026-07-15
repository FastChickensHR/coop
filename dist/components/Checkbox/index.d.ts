import { type ReactNode } from 'react';
export interface CheckboxProps {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    /** Override the auto-generated id (normally supplied by FormField / auto). */
    id?: string;
    'aria-label'?: string;
    /** Optional inline label rendered beside the box; clicking it toggles the checkbox. */
    children?: ReactNode;
    className?: string;
}
/**
 * A themed checkbox on Radix (ADR-0075). Distinct from `Switch` (on/off toggle) — use this for
 * "select this option" semantics. Works standalone with an inline label (`children`) or inside a
 * `FormField` (self-wires id + aria via `useFieldControl`).
 */
export declare function Checkbox({ checked, onCheckedChange, disabled, id, children, className, ...rest }: CheckboxProps): import("react").JSX.Element;
