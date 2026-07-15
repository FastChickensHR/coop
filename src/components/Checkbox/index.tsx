import { useId, type ReactNode } from 'react'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@heroicons/react/24/outline'
import styled from 'styled-components'
import { useFieldControl } from '../FormField/context'

export interface CheckboxProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  /** Override the auto-generated id (normally supplied by FormField / auto). */
  id?: string
  'aria-label'?: string
  /** Optional inline label rendered beside the box; clicking it toggles the checkbox. */
  children?: ReactNode
  className?: string
}

const Row = styled.div<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
`

const Box = styled(RadixCheckbox.Root)`
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.canvas};
  cursor: inherit;
  transition: background 120ms ease, border-color 120ms ease;

  &[data-state='checked'],
  &[data-state='indeterminate'] {
    background: ${({ theme }) => theme.colors.accent};
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

const Indicator = styled(RadixCheckbox.Indicator)`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.canvas};
  svg {
    width: 14px;
    height: 14px;
    stroke-width: 3;
  }
`

const LabelText = styled.label`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.ink};
  cursor: inherit;
`

/**
 * A themed checkbox on Radix (ADR-0075). Distinct from `Switch` (on/off toggle) — use this for
 * "select this option" semantics. Works standalone with an inline label (`children`) or inside a
 * `FormField` (self-wires id + aria via `useFieldControl`).
 */
export function Checkbox({
  checked,
  onCheckedChange,
  disabled,
  id,
  children,
  className,
  ...rest
}: CheckboxProps) {
  const { fieldProps } = useFieldControl()
  const reactId = useId()
  const controlId = id ?? fieldProps.id ?? `checkbox-${reactId}`
  return (
    <Row $disabled={disabled} className={className}>
      <Box
        id={controlId}
        checked={checked}
        onCheckedChange={(c) => onCheckedChange?.(c === true)}
        disabled={disabled}
        aria-label={rest['aria-label']}
        aria-describedby={fieldProps['aria-describedby']}
        aria-invalid={fieldProps['aria-invalid']}
        aria-required={fieldProps['aria-required']}
      >
        <Indicator>
          <CheckIcon />
        </Indicator>
      </Box>
      {children != null && <LabelText htmlFor={controlId}>{children}</LabelText>}
    </Row>
  )
}
