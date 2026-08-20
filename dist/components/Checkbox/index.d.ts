import { type ReactNode } from 'react';
export interface CheckboxProps {
    /** Whether the box is ticked (controlled). */
    checked?: boolean;
    /** Called with the new state when the user toggles the box. */
    onCheckedChange?: (checked: boolean) => void;
    /** Render the box unusable and dimmed; it stays visible and keeps its value. */
    disabled?: boolean;
    /** Override the auto-generated id (normally supplied by FormField / auto). */
    id?: string;
    /** Accessible name when there's no visible label (no `children`, no FormField). */
    'aria-label'?: string;
    /** Optional inline label rendered beside the box; clicking it toggles the checkbox. */
    children?: ReactNode;
    /** Class name for the row wrapping box and label (for layout only). */
    className?: string;
}
/**
 * A themed checkbox on Radix (ADR-0075). Distinct from `Switch` (on/off toggle) — use this for
 * "select this option" semantics. Works standalone with an inline label (`children`) or inside a
 * `FormField` (self-wires id + aria via `useFieldControl`).
 */
export declare function Checkbox({ checked, onCheckedChange, disabled, id, children, className, ...rest }: CheckboxProps): import("react").JSX.Element;
