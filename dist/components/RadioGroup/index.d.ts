import { type ReactNode } from 'react';
export interface RadioOption {
    value: string;
    label: ReactNode;
    disabled?: boolean;
}
export interface RadioGroupProps {
    value?: string;
    onValueChange?: (value: string) => void;
    options: RadioOption[];
    disabled?: boolean;
    /** Override the auto-generated id root (normally supplied by FormField / auto). */
    id?: string;
    name?: string;
    'aria-label'?: string;
    orientation?: 'vertical' | 'horizontal';
    className?: string;
}
/**
 * A themed single-choice radio group on Radix (ADR-0075). Options-driven like `Select`, for small
 * fixed code sets where all choices should be visible. Works standalone or inside a `FormField`
 * (self-wires id + aria via `useFieldControl`).
 */
export declare function RadioGroup({ value, onValueChange, options, disabled, id, name, orientation, className, ...rest }: RadioGroupProps): import("react").JSX.Element;
