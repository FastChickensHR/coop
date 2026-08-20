import { useId, type ReactNode } from 'react'
import * as RadixRadio from '@radix-ui/react-radio-group'
import styled from 'styled-components'
import { useFieldControl } from '../FormField/context'

export interface RadioOption {
  value: string
  label: ReactNode
  disabled?: boolean
}

export interface RadioGroupProps {
  /** The selected option's value (controlled). */
  value?: string
  /** Called with the value of the option the user picked. */
  onValueChange?: (value: string) => void
  /** The mutually exclusive choices, in display order. */
  options: RadioOption[]
  /** Render the whole group unusable and dimmed (per-option `disabled` also exists). */
  disabled?: boolean
  /** Override the auto-generated id root (normally supplied by FormField / auto). */
  id?: string
  /** Form field name shared by the underlying radio inputs (for native form submission). */
  name?: string
  /** Accessible name for the group when there's no visible label. */
  'aria-label'?: string
  /** Lay the options out in a column or a wrapping row. @default 'vertical' */
  orientation?: 'vertical' | 'horizontal'
  /** Class name for the root element (for layout only — colour and size come from the theme). */
  className?: string
}

const Root = styled(RadixRadio.Root)<{ $horizontal?: boolean }>`
  display: flex;
  flex-direction: ${({ $horizontal }) => ($horizontal ? 'row' : 'column')};
  flex-wrap: ${({ $horizontal }) => ($horizontal ? 'wrap' : 'nowrap')};
  gap: ${({ $horizontal }) => ($horizontal ? '1.25rem' : '0.5rem')};
`

const Item = styled.div<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
`

const Dot = styled(RadixRadio.Item)`
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.canvas};
  cursor: inherit;
  transition: border-color 120ms ease;

  &[data-state='checked'] {
    border-color: ${({ theme }) => theme.colors.accent};
  }
  &[data-disabled] {
    opacity: 0.5;
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`

const Indicator = styled(RadixRadio.Indicator)`
  display: inline-flex;
  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
  }
`

const OptLabel = styled.label`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.ink};
  cursor: inherit;
`

/**
 * A themed single-choice radio group on Radix (ADR-0075). Options-driven like `Select`, for small
 * fixed code sets where all choices should be visible. Works standalone or inside a `FormField`
 * (self-wires id + aria via `useFieldControl`).
 */
export function RadioGroup({
  value,
  onValueChange,
  options,
  disabled,
  id,
  name,
  orientation = 'vertical',
  className,
  ...rest
}: RadioGroupProps) {
  const { fieldProps } = useFieldControl()
  const reactId = useId()
  const groupId = id ?? fieldProps.id ?? `radiogroup-${reactId}`
  return (
    <Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name}
      className={className}
      $horizontal={orientation === 'horizontal'}
      aria-label={rest['aria-label']}
      aria-describedby={fieldProps['aria-describedby']}
      aria-invalid={fieldProps['aria-invalid']}
      aria-required={fieldProps['aria-required']}
    >
      {options.map((opt) => {
        const optId = `${groupId}-${opt.value}`
        return (
          <Item key={opt.value} $disabled={disabled || opt.disabled}>
            <Dot value={opt.value} id={optId} disabled={opt.disabled}>
              <Indicator />
            </Dot>
            <OptLabel htmlFor={optId}>{opt.label}</OptLabel>
          </Item>
        )
      })}
    </Root>
  )
}
