import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { styled } from 'styled-components'
import { useFieldControl, type FieldStatus } from '../FormField/context'
import { controlBaseStyles, controlStatusStyles } from '../FormField/fieldStyles'

const StyledInput = styled.input<{ $status?: FieldStatus }>`
  ${controlBaseStyles}
  ${({ $status }) => controlStatusStyles($status)}
`

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Force the error status even outside a FormField (e.g. standalone forms). */
  hasError?: boolean
}

/**
 * Base text input. Inside a `FormField` it self-wires id + aria + semantic
 * status via `useFieldControl` (ADR-0075/0157); standalone it behaves as a
 * plain styled input. Explicit props (id, aria-*, hasError) always win over the
 * field; `hasError` maps to the error status.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { hasError, ...rest },
  ref,
) {
  const { fieldProps, status } = useFieldControl()
  return <StyledInput ref={ref} $status={hasError ? 'error' : status} {...fieldProps} {...rest} />
})
