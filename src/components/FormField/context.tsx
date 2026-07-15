import { createContext, useContext } from 'react'

/**
 * A field's semantic validation status (ADR-0157). Traffic-light: `error` (red),
 * `warning` (yellow), `success` (green). Absent = neutral. Distinct from the
 * interaction accent (focus) — a field can be, say, in `error` and focused.
 */
export type FieldStatus = 'error' | 'warning' | 'success'

/** The `*Soft` background token that pairs with each status. */
export const STATUS_SOFT = {
  error: 'errorSoft',
  warning: 'warningSoft',
  success: 'successSoft',
} as const

/**
 * Published by `FormField` and consumed by base controls via `useFieldControl`.
 * The wiring travels through context (not cloneElement) precisely because we
 * own the controls — which is also why raw <input>/<select>/<textarea> is
 * forbidden in feature code (ADR-0075).
 */
export interface FieldContextValue {
  controlId: string
  descriptionId?: string
  /** Id of the status message element (error/warning/success), if any. */
  statusId?: string
  /** The field's semantic status, if any. */
  status?: FieldStatus
  required: boolean
}

export const FieldContext = createContext<FieldContextValue | null>(null)

/** Spreadable a11y props for a field control. */
export interface FieldControlAria {
  id?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  'aria-required'?: boolean
}

export interface UseFieldControlResult {
  /** Spread onto the control element (id + aria wiring). */
  fieldProps: FieldControlAria
  /** The field's semantic status (error/warning/success), for status styling. */
  status?: FieldStatus
  /** True when the surrounding FormField is in the error status. */
  hasError: boolean
}

/**
 * Read the surrounding `FormField`'s wiring. Returns inert defaults when used
 * outside a FormField, so base controls work standalone (search boxes, filters).
 */
export function useFieldControl(): UseFieldControlResult {
  const ctx = useContext(FieldContext)
  if (!ctx) return { fieldProps: {}, hasError: false }

  const describedBy = [ctx.descriptionId, ctx.status ? ctx.statusId : undefined]
    .filter(Boolean)
    .join(' ')

  return {
    fieldProps: {
      id: ctx.controlId,
      'aria-describedby': describedBy || undefined,
      // Only a hard error marks the control invalid; warning/success do not.
      'aria-invalid': ctx.status === 'error' || undefined,
      'aria-required': ctx.required || undefined,
    },
    status: ctx.status,
    hasError: ctx.status === 'error',
  }
}
