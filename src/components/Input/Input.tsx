import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { styled } from 'styled-components'
import { useFieldControl, type FieldStatus } from '../FormField/context'
import { controlStatusStyles } from '../FormField/fieldStyles'

const StyledInput = styled.input<{ $status?: FieldStatus }>`
  width: 100%;
  height: 44px;
  padding: 0 0.875rem;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.ink};
  background-color: ${({ theme }) => theme.colors.canvas};
  outline: none;
  box-sizing: border-box;
  transition: border-color ${({ theme }) => theme.motion.duration.fast}
      ${({ theme }) => theme.motion.easing.standard},
    box-shadow ${({ theme }) => theme.motion.duration.fast} ${({ theme }) => theme.motion.easing.standard};

  ${({ $status }) => controlStatusStyles($status)}

  &:disabled {
    background-color: ${({ theme }) => theme.colors.surface2};
    color: ${({ theme }) => theme.colors.subtle};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.subtle};
  }
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
