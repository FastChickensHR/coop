import type { InputHTMLAttributes } from 'react';
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    /** Force the error status even outside a FormField (e.g. standalone forms). */
    hasError?: boolean;
}
/**
 * Base text input. Inside a `FormField` it self-wires id + aria + semantic
 * status via `useFieldControl` (ADR-0075/0157); standalone it behaves as a
 * plain styled input. Explicit props (id, aria-*, hasError) always win over the
 * field; `hasError` maps to the error status.
 */
export declare const Input: import("react").ForwardRefExoticComponent<InputProps & import("react").RefAttributes<HTMLInputElement>>;
