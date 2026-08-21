import * as RadixSelect from '@radix-ui/react-select'
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from '@heroicons/react/24/outline'
import { styled } from 'styled-components'
import { useFieldControl, type FieldStatus } from '../FormField/context'
import { controlStatusStyles } from '../FormField/fieldStyles'

export interface SelectOption {
  value: string
  label: string
  /** Render the option visible but unselectable (a refused-but-not-hidden choice). @default false */
  disabled?: boolean
  /** Muted sub-line under the label — e.g. why a disabled option can't be chosen. */
  hint?: string
}

export interface SelectProps {
  /** The selected option's value (controlled). */
  value?: string
  /** Called with the value of the option the user picked. */
  onValueChange?: (value: string) => void
  /** The choices to offer, in display order. */
  options: SelectOption[]
  /** Text shown on the trigger while nothing is selected. */
  placeholder?: string
  /** Render the control unusable and dimmed; the list cannot be opened. */
  disabled?: boolean
  /** Force the error status even outside a FormField. */
  hasError?: boolean
  /** Override the auto-generated control id (normally supplied by FormField). */
  id?: string
  /** Accessible name for a select with no visible label (inline filters, table cells). */
  'aria-label'?: string
  /** Id of an existing element that names the trigger (alternative to `aria-label`). */
  'aria-labelledby'?: string
  /** Forwarded to the trigger — e.g. `-1` to take it out of the tab order inside a roving grid. */
  tabIndex?: number
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
  flex-direction: column;
  align-items: flex-start;
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

  &[data-disabled] {
    color: ${({ theme }) => theme.colors.subtle};
    cursor: not-allowed;
  }
`

const ItemHint = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.muted};
  max-width: 18rem;
  white-space: normal;
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
  hasError,
  id,
  className,
  tabIndex,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
}: SelectProps) {
  const { fieldProps, status } = useFieldControl()
  return (
    <RadixSelect.Root value={value} onValueChange={onValueChange} disabled={disabled}>
      <Trigger
        className={className}
        $status={hasError ? 'error' : status}
        id={id ?? fieldProps.id}
        tabIndex={tabIndex}
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
              <Item key={opt.value} value={opt.value} disabled={opt.disabled}>
                <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                {opt.hint && <ItemHint>{opt.hint}</ItemHint>}
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
