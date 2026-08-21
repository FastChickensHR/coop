import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { styled } from 'styled-components'
import { useFieldControl, type FieldStatus } from '../FormField/context'
import { controlStatusStyles } from '../FormField/fieldStyles'

const StyledTextarea = styled.textarea<{ $status?: FieldStatus }>`
  width: 100%;
  min-height: 88px;
  padding: 0.625rem 0.875rem;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.ink};
  background-color: ${({ theme }) => theme.colors.canvas};
  outline: none;
  box-sizing: border-box;
  resize: vertical;
  transition: border-color 150ms ease, box-shadow 150ms ease;

  ${({ $status }) => controlStatusStyles($status)}

  &:disabled {
    background-color: ${({ theme }) => theme.colors.surface2};
    color: ${({ theme }) => theme.colors.subtle};
    cursor: not-allowed;
    resize: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.subtle};
  }
`

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Force the error status even outside a FormField. */
  hasError?: boolean
}

/**
 * Base multi-line text input. Self-wires to a surrounding `FormField` via
 * `useFieldControl` (ADR-0075/0157); standalone it is a plain styled textarea.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { hasError, ...rest },
  ref,
) {
  const { fieldProps, status } = useFieldControl()
  return <StyledTextarea ref={ref} $status={hasError ? 'error' : status} {...fieldProps} {...rest} />
})
