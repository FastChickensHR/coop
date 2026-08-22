import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type RefObject } from 'react'
import { styled } from 'styled-components'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline'
import { Chip } from '../Chip'
import { useFieldControl, type FieldStatus } from '../FormField/context'
import { controlBaseStyles, controlStatusStyles } from '../FormField/fieldStyles'

export interface ComboboxOption {
  value: string
  label: string
}

interface ComboboxCommonProps {
  /** The choices to offer; filtered client-side as the user types unless `onSearch` is given. */
  options: ComboboxOption[]
  /** Fetch options remotely: called (debounced) with the query as the user types. When provided, the component stops filtering client-side — the server-supplied `options` are shown as-is. */
  onSearch?: (query: string) => void
  /** Show a loading row while remote results are in flight (used with `onSearch`). */
  loading?: boolean
  /** Debounce before `onSearch` fires, in milliseconds. @default 250 */
  debounceMs?: number
  /** Allow entering a value that isn't in the list: a "Create …" row appears for an unmatched query, and the typed text becomes the value. */
  creatable?: boolean
  /** Called with the newly created value when a "Create …" row is chosen (with `creatable`). */
  onCreate?: (value: string) => void
  /** Text shown in the empty search box. @default 'Search…' */
  placeholder?: string
  /** Render the control unusable and dimmed; the list cannot be opened. */
  disabled?: boolean
  /** Force the error status even outside a FormField. */
  hasError?: boolean
  /** Override the auto-generated control id (normally supplied by FormField). */
  id?: string
  /** Accessible name for the search box when there's no visible label. */
  'aria-label'?: string
  /** Class name for the root element (for layout only — colour and size come from the theme). */
  className?: string
}

/** Single-select: one value, picking closes the list. */
export interface ComboboxSingleProps extends ComboboxCommonProps {
  multiple?: false
  /** Selected value. */
  value?: string
  /** Called with the picked value. */
  onValueChange?: (value: string) => void
}

/** Multi-select: selections render as removable chips, picking toggles membership, the list stays open. */
export interface ComboboxMultiProps extends ComboboxCommonProps {
  multiple: true
  /** Selected values. */
  values: string[]
  /** Called with the full next selection. */
  onValuesChange: (values: string[]) => void
}

/**
 * The two modes as a discriminated union (#1229, docs/code-style.md TypeScript 4): the old
 * flat surface let `multiple` + `value` or a bare `values` type-check and fail by convention —
 * now a single-select cannot carry `values`, and a multi cannot carry `value`.
 */
export type ComboboxProps = ComboboxSingleProps | ComboboxMultiProps

/**
 * A searchable select (ADR-0175): type to filter a long option list, then pick
 * one — or several with `multiple`, where picks become removable chips. Use a
 * Combobox over a plain Select when there are enough options that scanning them
 * is slow (states, carriers, employees); for a short list a Select is simpler,
 * and for a few side-by-side choices use a Radio group. Pass `onSearch` to load
 * options remotely (debounced) for very large lists, or `creatable` to let users
 * enter a value that isn't listed. Full keyboard nav (type, arrows, Enter, Escape;
 * Backspace removes the last chip) and FormField status wiring.
 */
export function Combobox(props: ComboboxProps) {
  const {
    options,
    onSearch,
    loading,
    debounceMs = 250,
    creatable,
    onCreate,
    placeholder = 'Search…',
    disabled,
    hasError,
    id,
    className,
    'aria-label': ariaLabel,
  } = props
  // Narrow the union once; everything below speaks in terms of `selection`, never the raw props.
  const selection = props.multiple
    ? { multiple: true as const, values: props.values, onValuesChange: props.onValuesChange }
    : { multiple: false as const, value: props.value, onValueChange: props.onValueChange }
  const { fieldProps, status } = useFieldControl()
  const controlStatus: FieldStatus | undefined = hasError ? 'error' : status

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const isAsync = !!onSearch
  const selectedValues = selection.multiple ? selection.values : []
  const isSelected = (value: string) => (selection.multiple ? selectedValues.includes(value) : value === selection.value)

  // Label for a value from the current options; falls back to the raw value when the
  // option isn't in the current (e.g. async) results, so a selection never loses its chip.
  const labelFor = (value: string) => options.find((option) => option.value === value)?.label ?? value

  const selectedOptions = selection.multiple ? selectedValues.map((value) => ({ value: value, label: labelFor(value) })) : []
  const filtered = useMemo(() => {
    if (isAsync) return options // the server already filtered
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return options
    return options.filter((option) => option.label.toLowerCase().includes(normalizedQuery))
  }, [options, query, isAsync])

  // A "Create …" affordance when the typed query matches no existing option; it sits
  // after the options and is navigable like any other row.
  const trimmedQuery = query.trim()
  const showCreate =
    !!creatable &&
    trimmedQuery !== '' &&
    !filtered.some(
      (option) =>
        option.label.toLowerCase() === trimmedQuery.toLowerCase() ||
        option.value.toLowerCase() === trimmedQuery.toLowerCase(),
    )
  const createIndex = filtered.length
  const itemCount = filtered.length + (showCreate ? 1 : 0)
  const activeIndex = itemCount ? Math.min(active, itemCount - 1) : 0

  // Per-instance ids so multiple Comboboxes on one page don't collide, and so the
  // input can point `aria-activedescendant` at the highlighted option for screen readers.
  const baseId = useId()
  const listboxId = `${baseId}-listbox`
  const optionId = (index: number) => `${baseId}-option-${index}`

  useComboboxBehavior({ open, setOpen, rootRef, listRef, activeIndex, isAsync, query, debounceMs, onSearch })

  /** Multi keeps the list open for the next toggle; single closes on the pick. */
  function commit(nextForMulti: (current: string[]) => string[], single: string) {
    if (selection.multiple) {
      selection.onValuesChange(nextForMulti(selectedValues))
      setQuery('')
      setActive(0)
      setOpen(true)
      inputRef.current?.focus()
    } else {
      selection.onValueChange?.(single)
      setQuery('')
      setOpen(false)
    }
  }

  function choose(opt: ComboboxOption | undefined) {
    if (!opt) return
    commit(
      (current) => (current.includes(opt.value) ? current.filter((existing) => existing !== opt.value) : [...current, opt.value]),
      opt.value,
    )
  }

  function removeValue(value: string) {
    if (selection.multiple) selection.onValuesChange(selectedValues.filter((other) => other !== value))
  }

  function createValue(text: string) {
    const value = text.trim()
    if (!value) return
    onCreate?.(value)
    commit((current) => (current.includes(value) ? current : [...current, value]), value)
  }

  function onKeyDown(event: ReactKeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!open) setOpen(true)
      else setActive((current) => Math.min(current + 1, itemCount - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((current) => Math.max(current - 1, 0))
    } else if (event.key === 'Enter') {
      if (open) {
        event.preventDefault()
        if (showCreate && activeIndex === createIndex) createValue(trimmedQuery)
        else choose(filtered[activeIndex])
      }
    } else if (event.key === 'Backspace') {
      if (selection.multiple && query === '' && selectedValues.length > 0) {
        removeValue(selectedValues[selectedValues.length - 1])
      }
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const displayValue = open ? query : !selection.multiple && selection.value ? labelFor(selection.value) : ''

  return (
    <Root ref={rootRef} className={className}>
      {selection.multiple ? (
        <MultiControl
          $status={controlStatus}
          data-disabled={disabled || undefined}
          onMouseDown={(event) => {
            // Clicking the container's own padding focuses the input; clicks on a
            // chip's remove button or the input itself are left alone.
            if (event.target === event.currentTarget) {
              event.preventDefault()
              inputRef.current?.focus()
            }
          }}
        >
          {selectedOptions.map((opt) => (
            <Chip key={opt.value} onRemove={disabled ? undefined : () => removeValue(opt.value)}>
              {opt.label}
            </Chip>
          ))}
          <BareInput
            ref={inputRef}
            id={id ?? fieldProps.id}
            role="combobox"
            aria-expanded={open}
            aria-controls={open ? listboxId : undefined}
            aria-activedescendant={open && itemCount ? optionId(activeIndex) : undefined}
            aria-label={ariaLabel}
            aria-describedby={fieldProps['aria-describedby']}
            aria-required={fieldProps['aria-required']}
            aria-invalid={controlStatus === 'error' || undefined}
            disabled={disabled}
            placeholder={selectedOptions.length === 0 ? placeholder : ''}
            value={query}
            onFocus={() => setOpen(true)}
            onChange={(event) => {
              setQuery(event.target.value)
              setActive(0)
              setOpen(true)
            }}
            onKeyDown={onKeyDown}
          />
        </MultiControl>
      ) : (
        <ControlInput
          ref={inputRef}
          id={id ?? fieldProps.id}
          role="combobox"
          aria-expanded={open}
          aria-controls={open ? listboxId : undefined}
          aria-activedescendant={open && filtered.length ? optionId(activeIndex) : undefined}
          aria-label={ariaLabel}
          aria-describedby={fieldProps['aria-describedby']}
          aria-required={fieldProps['aria-required']}
          aria-invalid={controlStatus === 'error' || undefined}
          $status={controlStatus}
          disabled={disabled}
          placeholder={!selection.multiple && selection.value && !open ? labelFor(selection.value) : placeholder}
          value={displayValue}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value)
            setActive(0)
            setOpen(true)
          }}
          onKeyDown={onKeyDown}
        />
      )}
      <Chevron aria-hidden="true">
        <ChevronUpDownIcon width={18} height={18} />
      </Chevron>
      {open && (
        <OptionsList
          listboxId={listboxId}
          listRef={listRef}
          multiple={selection.multiple}
          loading={loading}
          filtered={filtered}
          optionId={optionId}
          isSelected={isSelected}
          activeIndex={activeIndex}
          onActivate={setActive}
          onChoose={choose}
          showCreate={showCreate}
          createIndex={createIndex}
          createQuery={trimmedQuery}
          onCreate={createValue}
        />
      )}
    </Root>
  )
}



/** The open-list behaviors — outside-click close, keep-highlight-visible, debounced remote
 *  search — pulled beside the component (#1229) so its body stays wiring + markup. */
function useComboboxBehavior({
  open,
  setOpen,
  rootRef,
  listRef,
  activeIndex,
  isAsync,
  query,
  debounceMs,
  onSearch,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  rootRef: RefObject<HTMLDivElement | null>
  listRef: RefObject<HTMLUListElement | null>
  activeIndex: number
  isAsync: boolean
  query: string
  debounceMs: number
  onSearch?: (query: string) => void
}) {
  // Close on outside click.
  useEffect(() => {
    if (!open) return
    function onDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open, rootRef, setOpen])

  // Keep the highlighted option scrolled into view.
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, open, listRef])

  // Keep the latest onSearch in a ref so re-creating the callback each render doesn't
  // reset the debounce timer below.
  const onSearchRef = useRef(onSearch)
  useEffect(() => {
    onSearchRef.current = onSearch
  })

  // Debounced remote search: fire when the query changes or the list opens, in async mode.
  useEffect(() => {
    if (!isAsync || !open) return
    const timer = setTimeout(() => onSearchRef.current?.(query), debounceMs)
    return () => clearTimeout(timer)
  }, [query, open, isAsync, debounceMs])
}

/** The dropdown rows — options, the loading/empty states, and the Create affordance —
 *  private to Combobox (#1229): rendering only, every decision flows back through props. */
function OptionsList({
  listboxId,
  listRef,
  multiple,
  loading,
  filtered,
  optionId,
  isSelected,
  activeIndex,
  onActivate,
  onChoose,
  showCreate,
  createIndex,
  createQuery,
  onCreate,
}: {
  listboxId: string
  listRef: RefObject<HTMLUListElement | null>
  multiple: boolean
  loading?: boolean
  filtered: ComboboxOption[]
  optionId: (index: number) => string
  isSelected: (value: string) => boolean
  activeIndex: number
  onActivate: (index: number) => void
  onChoose: (option: ComboboxOption | undefined) => void
  showCreate: boolean
  createIndex: number
  createQuery: string
  onCreate: (text: string) => void
}) {
  return (
    <List id={listboxId} ref={listRef} role="listbox" aria-multiselectable={multiple || undefined}>
      {loading && <Loading aria-live="polite">Searching…</Loading>}
      {!loading && filtered.length === 0 && !showCreate && <Empty>No matches</Empty>}
      {filtered.map((opt, i) => (
        <Option
          key={opt.value}
          id={optionId(i)}
          data-index={i}
          role="option"
          aria-selected={isSelected(opt.value)}
          $active={i === activeIndex}
          onMouseEnter={() => onActivate(i)}
          onMouseDown={(event) => {
            event.preventDefault()
            onChoose(opt)
          }}
        >
          <span>{opt.label}</span>
          {isSelected(opt.value) && <CheckIcon width={16} height={16} />}
        </Option>
      ))}
      {showCreate && (
        <Option
          id={optionId(createIndex)}
          data-index={createIndex}
          role="option"
          aria-selected={false}
          $active={activeIndex === createIndex}
          onMouseEnter={() => onActivate(createIndex)}
          onMouseDown={(event) => {
            event.preventDefault()
            onCreate(createQuery)
          }}
        >
          <CreateRow>
            Create “<strong>{createQuery}</strong>”
          </CreateRow>
        </Option>
      )}
    </List>
  )
}

const Root = styled.div`
  position: relative;
  width: 100%;
`

const ControlInput = styled.input<{ $status?: FieldStatus }>`
  ${controlBaseStyles}
  padding-right: 2.5rem;

  ${({ $status }) => controlStatusStyles($status)}
`

const MultiControl = styled.div<{ $status?: FieldStatus }>`
  ${controlBaseStyles}
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  height: auto;
  min-height: 44px;
  padding: 0.3rem 2.5rem 0.3rem 0.5rem;
  cursor: text;

  /* A wrapper div never :focuses — the ring keys off the inner input (#1217; this used to be
     a hand-inlined, slightly drifted copy of controlStatusStyles). */
  ${({ $status }) => controlStatusStyles($status, '&:focus-within')}

  &[data-disabled] {
    background-color: ${({ theme }) => theme.colors.surface2};
    cursor: not-allowed;
  }
`

const BareInput = styled.input`
  flex: 1 1 4rem;
  min-width: 4rem;
  height: 30px;
  padding: 0 0.25rem;
  border: none;
  outline: none;
  background: transparent;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.ink};

  &::placeholder {
    color: ${({ theme }) => theme.colors.subtle};
  }
  &:disabled {
    cursor: not-allowed;
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

const Loading = styled.li`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.muted};
`

const CreateRow = styled.span`
  color: ${({ theme }) => theme.colors.muted};

  strong {
    color: ${({ theme }) => theme.colors.ink};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`
