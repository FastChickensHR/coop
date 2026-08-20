import type { TextareaHTMLAttributes } from 'react';
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Force the error status even outside a FormField. */
    hasError?: boolean;
}
/**
 * Base multi-line text input. Self-wires to a surrounding `FormField` via
 * `useFieldControl` (ADR-0075/0157); standalone it is a plain styled textarea.
 */
export declare const Textarea: import("react").ForwardRefExoticComponent<TextareaProps & import("react").RefAttributes<HTMLTextAreaElement>>;
