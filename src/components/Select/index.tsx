import * as RadixSelect from '@radix-ui/react-select'
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from '@heroicons/react/24/outline'
import styled from 'styled-components'
import { useFieldControl, type FieldStatus } from '../FormField/context'
import { controlStatusStyles } from '../FormField/fieldStyles'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  $hasError?: boolean
  /** Override the auto-generated control id (normally supplied by FormField). */
  id?: string
  /** Accessible name for a select with no visible label (inline filters, table cells). */
  'aria-label'?: string
  'aria-labelledby'?: string
  /** Forwarded to the trigger so `styled(Select)` can adjust sizing/layout. */
  className?: string
}

const Trigger = styled(RadixSelect.Trigger)<{ $status?: FieldStatus }>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 44px;
  padding: 0 0.875rem;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.ink};
  background-color: ${({ theme }) => theme.colors.canvas};
  cursor: pointer;
  outline: none;
  gap: 0.5rem;
  box-sizing: border-box;
  transition: border-color 150ms ease, box-shadow 150ms ease;

  ${({ $status }) => controlStatusStyles($status)}

  &[data-disabled] {
    background-color: ${({ theme }) => theme.colors.surface2};
    color: ${({ theme }) => theme.colors.subtle};
    cursor: not-allowed;
  }

  &[data-placeholder] {
    color: ${({ theme }) => theme.colors.subtle};
  }
`

const Content = styled(RadixSelect.Content)`
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.canvas};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.boxShadow.pop};
  z-index: 50;
`

const Viewport = styled(RadixSelect.Viewport)`
  padding: 0.25rem;
`

const Item = styled(RadixSelect.Item)`
  display: flex;
  align-items: center;
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.ink};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  outline: none;
  position: relative;
  user-select: none;
  transition: background-color 100ms ease;

  &[data-highlighted] {
    background-color: ${({ theme }) => theme.colors.surface2};
    color: ${({ theme }) => theme.colors.ink};
  }
`

const ItemIndicator = styled(RadixSelect.ItemIndicator)`
  position: absolute;
  right: 0.5rem;
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.accent};
`

const ScrollButton = styled(RadixSelect.ScrollUpButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5rem;
  color: ${({ theme }) => theme.colors.muted};
  cursor: default;
`

export function Select({
  value,
  onValueChange,
  options,
  placeholder,
  disabled,
  $hasError,
  id,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
}: SelectProps) {
  const { fieldProps, status } = useFieldControl()
  return (
    <RadixSelect.Root value={value} onValueChange={onValueChange} disabled={disabled}>
      <Trigger
        className={className}
        $status={$hasError ? 'error' : status}
        id={id ?? fieldProps.id}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={fieldProps['aria-describedby']}
        aria-invalid={fieldProps['aria-invalid']}
        aria-required={fieldProps['aria-required']}
      >
        <RadixSelect.Value placeholder={placeholder ?? 'Select…'} />
        <RadixSelect.Icon>
          <ChevronDownIcon style={{ width: '1rem', height: '1rem' }} />
        </RadixSelect.Icon>
      </Trigger>
      <RadixSelect.Portal>
        <Content position="popper" sideOffset={4}>
          <ScrollButton as={RadixSelect.ScrollUpButton}>
            <ChevronUpIcon style={{ width: '1rem', height: '1rem' }} />
          </ScrollButton>
          <Viewport>
            {options.map((opt) => (
              <Item key={opt.value} value={opt.value}>
                <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                <ItemIndicator>
                  <CheckIcon style={{ width: '0.875rem', height: '0.875rem' }} />
                </ItemIndicator>
              </Item>
            ))}
          </Viewport>
          <ScrollButton as={RadixSelect.ScrollDownButton}>
            <ChevronDownIcon style={{ width: '1rem', height: '1rem' }} />
          </ScrollButton>
        </Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}
