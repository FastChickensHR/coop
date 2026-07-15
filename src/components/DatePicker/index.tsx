import { type KeyboardEvent as ReactKeyboardEvent, useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import styled from 'styled-components'
import {
  CalendarDate,
  getDayOfWeek,
  getLocalTimeZone,
  getWeeksInMonth,
  startOfMonth,
  today,
} from '@internationalized/date'
import { useFieldControl, type FieldStatus } from '../FormField/context'
import { controlStatusStyles } from '../FormField/fieldStyles'
import { formatDate, formatDateNumeric, fromISO, parseUserDate, toISO } from '../../lib/date'

const LOCALE = 'en-US'
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export interface DatePickerProps {
  /** ISO `YYYY-MM-DD`, or `null`/undefined when unset. */
  value?: string | null
  onValueChange?: (value: string | null) => void
  /** Inclusive ISO bounds; days outside are disabled and typed out-of-range values are rejected. */
  min?: string | null
  max?: string | null
  /** Allow an open-ended (`null`) boundary, shown as `openEndedLabel` with a toggle. */
  allowOpenEnded?: boolean
  /** Muted word shown when open-ended, e.g. "Ongoing" / "Always". */
  openEndedLabel?: string
  placeholder?: string
  disabled?: boolean
  $hasError?: boolean
  /** Override the auto-generated control id (normally supplied by FormField). */
  id?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  className?: string
}

// ── grid math (off-by-one-proof via CalendarDate) ──────────────────────────────

function monthMatrix(anchor: CalendarDate): CalendarDate[] {
  const first = startOfMonth(anchor)
  const lead = getDayOfWeek(first, LOCALE) // Sunday = 0 for en-US
  const start = first.subtract({ days: lead })
  const weeks = getWeeksInMonth(anchor, LOCALE)
  return Array.from({ length: weeks * 7 }, (_, i) => start.add({ days: i }))
}

function outOfRange(iso: string, min?: string | null, max?: string | null): boolean {
  // Treat empty/absent bounds as "no bound" (ISO strings compare chronologically).
  return (!!min && iso < min) || (!!max && iso > max)
}

function dayLabel(d: CalendarDate): string {
  return `${MONTH_NAMES[d.month - 1]} ${d.day}, ${d.year}`
}

// ── styled ─────────────────────────────────────────────────────────────────────

const FieldWrap = styled.div`
  position: relative;
  width: 100%;
`

const TextInput = styled.input<{ $status?: FieldStatus; $openEnded?: boolean }>`
  width: 100%;
  height: 44px;
  padding: 0 2.75rem 0 0.875rem;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme, $openEnded }) => ($openEnded ? theme.colors.muted : theme.colors.ink)};
  font-style: ${({ $openEnded }) => ($openEnded ? 'italic' : 'normal')};
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

const CalendarButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  height: 44px;
  width: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.ink};
  }
  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.subtle};
  }
  svg { width: 1.15rem; height: 1.15rem; }
`

const Content = styled(Popover.Content)`
  background-color: ${({ theme }) => theme.colors.canvas};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.boxShadow.pop};
  padding: 0.75rem;
  z-index: 50;
`

const CalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`

const NavButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: none;
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;

  &:hover { background-color: ${({ theme }) => theme.colors.surface2}; color: ${({ theme }) => theme.colors.ink}; }
  svg { width: 15px; height: 15px; }
`

const MonthLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.ink};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 2rem);
`

const Weekday = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.75rem;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.muted};
`

const DayButton = styled.button<{ $selected?: boolean; $today?: boolean; $outside?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme, $today }) => ($today ? theme.fontWeight.bold : theme.fontWeight.normal)};
  color: ${({ theme, $selected, $outside }) =>
    $selected ? theme.colors.canvas : $outside ? theme.colors.subtle : theme.colors.ink};
  background-color: ${({ theme, $selected }) => ($selected ? theme.colors.accent : 'transparent')};
  transition: background-color 100ms ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme, $selected }) => ($selected ? theme.colors.accent : theme.colors.surface2)};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 1px;
  }
  &:disabled {
    color: ${({ theme }) => theme.colors.subtle};
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const ParseHint = styled.p`
  margin: 0.375rem 0 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.error};
`

const OpenEndedToggle = styled.button`
  margin-top: 0.375rem;
  padding: 0;
  background: none;
  border: none;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover { color: ${({ theme }) => theme.colors.ink}; }
`

// ── component ────────────────────────────────────────────────────────────────

export function DatePicker({
  value,
  onValueChange,
  min,
  max,
  allowOpenEnded,
  openEndedLabel,
  placeholder = 'MM/DD/YYYY',
  disabled,
  $hasError,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  className,
}: DatePickerProps) {
  const { fieldProps, status } = useFieldControl()
  // $hasError (explicit) forces error; otherwise inherit the field's semantic status.
  const fieldStatus: FieldStatus | undefined = $hasError ? 'error' : status

  const [focused, setFocused] = useState(false)
  // `text` drives the input only while focused; when blurred the input shows the formatted value
  // (see `displayValue`). On focus we seed `text` with that SAME formatted string, so focusing
  // never changes `input.value` — external value-setters (a human, or Playwright `.fill()`) then
  // edit cleanly instead of fighting a focus-time re-render. We deliberately do NOT select-all,
  // so clicking into a single segment (e.g. the year) edits just it rather than the first
  // keystroke wiping the whole date.
  const [text, setText] = useState('')
  const [parseError, setParseError] = useState(false)
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dirtyRef = useRef(false)

  const [anchor, setAnchor] = useState<CalendarDate>(() => fromISO(value) ?? today(getLocalTimeZone()))
  const [focusDate, setFocusDate] = useState<CalendarDate>(() => fromISO(value) ?? today(getLocalTimeZone()))

  const gridRef = useRef<HTMLDivElement>(null)
  const controlId = id ?? fieldProps.id
  const errorId = controlId ? `${controlId}-parse-error` : undefined

  // Move DOM focus onto the roving cell whenever it changes while the calendar is open.
  useLayoutEffect(() => {
    if (!open) return
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${focusDate.toString()}"]`)?.focus()
  }, [open, focusDate])

  function handleOpenChange(next: boolean) {
    if (next) {
      const base = fromISO(value) ?? today(getLocalTimeZone())
      setAnchor(startOfMonth(base))
      setFocusDate(base)
    }
    setOpen(next)
  }

  function commit(raw: string) {
    const trimmed = raw.trim()
    if (!trimmed) {
      setParseError(false)
      onValueChange?.(null)
      return
    }
    const iso = toISO(parseUserDate(trimmed))
    if (!iso || outOfRange(iso, min, max)) {
      setParseError(true)
      return
    }
    setParseError(false)
    onValueChange?.(iso)
  }

  function pick(d: CalendarDate) {
    const iso = d.toString()
    if (outOfRange(iso, min, max)) return
    setParseError(false)
    onValueChange?.(iso)
    setOpen(false)
  }

  function moveFocus(next: CalendarDate) {
    setFocusDate(next)
    if (next.month !== anchor.month || next.year !== anchor.year) setAnchor(startOfMonth(next))
  }

  function onGridKeyDown(e: ReactKeyboardEvent) {
    const moves: Record<string, () => CalendarDate> = {
      ArrowLeft: () => focusDate.subtract({ days: 1 }),
      ArrowRight: () => focusDate.add({ days: 1 }),
      ArrowUp: () => focusDate.subtract({ weeks: 1 }),
      ArrowDown: () => focusDate.add({ weeks: 1 }),
      PageUp: () => focusDate.subtract({ months: 1 }),
      PageDown: () => focusDate.add({ months: 1 }),
      Home: () => startOfMonth(focusDate),
    }
    const move = moves[e.key]
    if (move) {
      e.preventDefault()
      moveFocus(move())
    }
  }

  const cells = useMemo(() => monthMatrix(anchor), [anchor])
  const todayIso = today(getLocalTimeZone()).toString()
  const valueIso = value ?? null
  const focusIso = focusDate.toString()
  const isOpenEnded = allowOpenEnded === true && value == null
  const formattedValue = value ? formatDate(value) : ''
  const displayValue = focused
    ? text
    : value
      ? formattedValue
      : isOpenEnded && openEndedLabel
        ? openEndedLabel
        : ''

  return (
    <>
      <Popover.Root open={open} onOpenChange={handleOpenChange}>
        <FieldWrap className={className}>
          <TextInput
            ref={inputRef}
            $openEnded={isOpenEnded && !focused}
            id={controlId}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-invalid={parseError || fieldProps['aria-invalid'] || undefined}
            aria-required={fieldProps['aria-required']}
            aria-describedby={
              [parseError ? errorId : undefined, fieldProps['aria-describedby']]
                .filter(Boolean)
                .join(' ') || undefined
            }
            $status={parseError ? 'error' : fieldStatus}
            disabled={disabled}
            placeholder={placeholder}
            value={displayValue}
            onFocus={() => {
              setFocused(true)
              dirtyRef.current = false
              // Open-ended: clear the word so blurring without typing stays open-ended (no parse
              // error). Otherwise seed `text` with the SAME formatted string already shown (so
              // focus never rewrites input.value — keeps Playwright `.fill()` and other value-
              // setters clean), but do NOT select-all, so clicking into the year/day edits just
              // that segment instead of the first keystroke wiping the whole date.
              setText(isOpenEnded ? '' : formattedValue)
            }}
            onChange={(e) => {
              const next = e.target.value
              setText(next)
              dirtyRef.current = true
              if (parseError) setParseError(false)
              // Commit live once the text is a complete, in-range date, so a fully-typed value
              // is captured even if the user submits without blurring first. Incomplete/invalid
              // text neither commits nor errors until blur.
              const iso = toISO(parseUserDate(next))
              if (iso && !outOfRange(iso, min, max)) onValueChange?.(iso)
            }}
            onBlur={() => {
              setFocused(false)
              // Only commit if the user actually edited; an untouched field keeps its value (and
              // the effect above re-syncs the friendly display).
              if (dirtyRef.current) {
                dirtyRef.current = false
                commit(text)
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                if (dirtyRef.current) {
                  dirtyRef.current = false
                  commit(text)
                }
              }
            }}
          />
          <Popover.Trigger asChild>
            <CalendarButton type="button" disabled={disabled} aria-label="Open calendar">
              <CalendarDaysIcon />
            </CalendarButton>
          </Popover.Trigger>
        </FieldWrap>

        {allowOpenEnded && !disabled && (
          value != null ? (
            <OpenEndedToggle
              type="button"
              onClick={() => {
                setParseError(false)
                onValueChange?.(null)
              }}
            >
              Set to {openEndedLabel ?? 'open-ended'}
            </OpenEndedToggle>
          ) : (
            <OpenEndedToggle
              type="button"
              onClick={() => {
                setFocused(true)
                setText('')
                inputRef.current?.focus()
              }}
            >
              Pick a date
            </OpenEndedToggle>
          )
        )}

        <Popover.Portal>
          <Content
            align="start"
            sideOffset={4}
            role="dialog"
            aria-label="Choose date"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <CalHeader>
              <NavButton
                type="button"
                aria-label="Previous month"
                onClick={() => setAnchor(anchor.subtract({ months: 1 }))}
              >
                <ChevronLeftIcon />
              </NavButton>
              <MonthLabel>
                {MONTH_NAMES[anchor.month - 1]} {anchor.year}
              </MonthLabel>
              <NavButton
                type="button"
                aria-label="Next month"
                onClick={() => setAnchor(anchor.add({ months: 1 }))}
              >
                <ChevronRightIcon />
              </NavButton>
            </CalHeader>
            <Grid ref={gridRef} onKeyDown={onGridKeyDown}>
              {WEEKDAYS.map((w) => (
                <Weekday key={w} aria-hidden="true">
                  {w}
                </Weekday>
              ))}
              {cells.map((d) => {
                const iso = d.toString()
                const inMonth = d.month === anchor.month && d.year === anchor.year
                const isSelected = iso === valueIso
                return (
                  <DayButton
                    key={iso}
                    type="button"
                    data-date={iso}
                    tabIndex={iso === focusIso ? 0 : -1}
                    aria-label={dayLabel(d)}
                    aria-pressed={isSelected}
                    aria-current={iso === todayIso ? 'date' : undefined}
                    disabled={outOfRange(iso, min, max)}
                    $selected={isSelected}
                    $today={iso === todayIso}
                    $outside={!inMonth}
                    onClick={() => pick(d)}
                  >
                    {d.day}
                  </DayButton>
                )
              })}
            </Grid>
          </Content>
        </Popover.Portal>
      </Popover.Root>
      {parseError && (
        <ParseHint id={errorId} role="alert">
          Enter a date like {todayIso} or {formatDateNumeric(todayIso)}.
        </ParseHint>
      )}
    </>
  )
}
