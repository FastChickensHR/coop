import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import styled from 'styled-components'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useFieldControl, type FieldStatus } from '../FormField/context'
import { controlStatusStyles } from '../FormField/fieldStyles'

export interface ComboboxOption {
  value: string
  label: string
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  $hasError?: boolean
  id?: string
  'aria-label'?: string
  className?: string
}

/**
 * A searchable select (ADR-0175): type to filter a long option list, then pick
 * one. Use a Combobox over a plain Select when there are enough options that
 * scanning them is slow (states, carriers, employees); for a short list a Select
 * is simpler, and for a few side-by-side choices use a Radio group. Full keyboard
 * nav (type, arrows, Enter, Escape) and FormField status wiring.
 */
export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = 'Search…',
  disabled,
  $hasError,
  id,
  className,
  'aria-label': ariaLabel,
}: ComboboxProps) {
  const { fieldProps, status } = useFieldControl()
  const controlStatus: FieldStatus | undefined = $hasError ? 'error' : status

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const selected = options.find((o) => o.value === value)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter((o) => o.label.toLowerCase().includes(q))
  }, [options, query])

  const activeIndex = filtered.length ? Math.min(active, filtered.length - 1) : 0

  // Close on outside click.
  useEffect(() => {
    if (!open) return
    function onDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  // Keep the highlighted option scrolled into view.
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, open])

  function choose(opt: ComboboxOption | undefined) {
    if (!opt) return
    onValueChange?.(opt.value)
    setQuery('')
    setOpen(false)
  }

  function onKeyDown(e: ReactKeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!open) setOpen(true)
      else setActive((a) => Math.min(a + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      if (open) {
        e.preventDefault()
        choose(filtered[activeIndex])
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  const displayValue = open ? query : selected?.label ?? ''

  return (
    <Root ref={rootRef} className={className}>
      <ControlInput
        id={id ?? fieldProps.id}
        role="combobox"
        aria-expanded={open}
        aria-controls="combobox-list"
        aria-label={ariaLabel}
        aria-describedby={fieldProps['aria-describedby']}
        aria-required={fieldProps['aria-required']}
        aria-invalid={controlStatus === 'error' || undefined}
        $status={controlStatus}
        disabled={disabled}
        placeholder={selected && !open ? selected.label : placeholder}
        value={displayValue}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value)
          setActive(0)
          setOpen(true)
        }}
        onKeyDown={onKeyDown}
      />
      <Chevron aria-hidden="true">
        <ChevronUpDownIcon width={18} height={18} />
      </Chevron>
      {open && (
        <List id="combobox-list" ref={listRef} role="listbox">
          {filtered.length === 0 ? (
            <Empty>No matches</Empty>
          ) : (
            filtered.map((opt, i) => (
              <Option
                key={opt.value}
                data-index={i}
                role="option"
                aria-selected={opt.value === value}
                $active={i === activeIndex}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => {
                  e.preventDefault()
                  choose(opt)
                }}
              >
                <span>{opt.label}</span>
                {opt.value === value && <CheckIcon width={16} height={16} />}
              </Option>
            ))
          )}
        </List>
      )}
    </Root>
  )
}

const Root = styled.div`
  position: relative;
  width: 100%;
`

const ControlInput = styled.input<{ $status?: FieldStatus }>`
  width: 100%;
  height: 44px;
  padding: 0 2.5rem 0 0.875rem;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.ink};
  background-color: ${({ theme }) => theme.colors.canvas};
  outline: none;
  box-sizing: border-box;
  transition: border-color 150ms ease, box-shadow 150ms ease;

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

const Chevron = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  height: 44px;
  width: 2.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.muted};
  pointer-events: none;
`

const List = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 50;
  max-height: 15rem;
  overflow-y: auto;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.xs};
  list-style: none;
  background-color: ${({ theme }) => theme.colors.canvas};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.boxShadow.pop};
`

const Option = styled.li<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.ink};
  cursor: pointer;
  background-color: ${({ theme, $active }) => ($active ? theme.colors.surface2 : 'transparent')};

  svg {
    color: ${({ theme }) => theme.colors.accent};
    flex-shrink: 0;
  }
`

const Empty = styled.li`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.muted};
`
