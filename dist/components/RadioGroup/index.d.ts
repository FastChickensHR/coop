import { type ReactNode } from 'react';
export interface RadioOption {
    value: string;
    label: ReactNode;
    disabled?: boolean;
}
export interface RadioGroupProps {
    /** The selected option's value (controlled). */
    value?: string;
    /** Called with the value of the option the user picked. */
    onValueChange?: (value: string) => void;
    /** The mutually exclusive choices, in display order. */
    options: RadioOption[];
    /** Render the whole group unusable and dimmed (per-option `disabled` also exists). */
    disabled?: boolean;
    /** Override the auto-generated id root (normally supplied by FormField / auto). */
    id?: string;
    /** Form field name shared by the underlying radio inputs (for native form submission). */
    name?: string;
    /** Accessible name for the group when there's no visible label. */
    'aria-label'?: string;
    /** Lay the options out in a column or a wrapping row. @default 'vertical' */
    orientation?: 'vertical' | 'horizontal';
    /** Class name for the root element (for layout only — colour and size come from the theme). */
    className?: string;
}
/**
 * A themed single-choice radio group on Radix (ADR-0075). Options-driven like `Select`, for small
 * fixed code sets where all choices should be visible. Works standalone or inside a `FormField`
 * (self-wires id + aria via `useFieldControl`).
 */
export declare function RadioGroup({ value, onValueChange, options, disabled, id, name, orientation, className, ...rest }: RadioGroupProps): import("react").JSX.Element;
