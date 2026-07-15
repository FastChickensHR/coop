/**
 * A field's semantic validation status (ADR-0157). Traffic-light: `error` (red),
 * `warning` (yellow), `success` (green). Absent = neutral. Distinct from the
 * interaction accent (focus) — a field can be, say, in `error` and focused.
 */
export type FieldStatus = 'error' | 'warning' | 'success';
/** The `*Soft` background token that pairs with each status. */
export declare const STATUS_SOFT: {
    readonly error: "errorSoft";
    readonly warning: "warningSoft";
    readonly success: "successSoft";
};
/**
 * Published by `FormField` and consumed by base controls via `useFieldControl`.
 * The wiring travels through context (not cloneElement) precisely because we
 * own the controls — which is also why raw <input>/<select>/<textarea> is
 * forbidden in feature code (ADR-0075).
 */
export interface FieldContextValue {
    controlId: string;
    descriptionId?: string;
    /** Id of the status message element (error/warning/success), if any. */
    statusId?: string;
    /** The field's semantic status, if any. */
    status?: FieldStatus;
    required: boolean;
}
export declare const FieldContext: import("react").Context<FieldContextValue | null>;
/** Spreadable a11y props for a field control. */
export interface FieldControlAria {
    id?: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    'aria-required'?: boolean;
}
export interface UseFieldControlResult {
    /** Spread onto the control element (id + aria wiring). */
    fieldProps: FieldControlAria;
    /** The field's semantic status (error/warning/success), for status styling. */
    status?: FieldStatus;
    /** True when the surrounding FormField is in the error status. */
    hasError: boolean;
}
/**
 * Read the surrounding `FormField`'s wiring. Returns inert defaults when used
 * outside a FormField, so base controls work standalone (search boxes, filters).
 */
export declare function useFieldControl(): UseFieldControlResult;
