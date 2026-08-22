import { useLayoutEffect, useMemo, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { CalendarDate, startOfMonth } from '@internationalized/date'
import { useFieldControl, type FieldStatus } from '../FormField/context'
import { fromISO, outOfRange, todayDate, todayISO } from '../../lib/date'
import { quickPicksFor, type DateEdge, type QuickPick } from '../../lib/quickPicks'
import { CalendarPopover } from './CalendarPopover'
import { acceptedShapes, gridMove, monthMatrix } from './model'
import { useDateTextEditing } from './useDateTextEditing'
import { CalendarButton, FieldWrap, ParseHint, TextInput } from './styles'

export interface DatePickerProps {
  /** ISO `YYYY-MM-DD`, or `null`/undefined when unset. */
  value?: string | null
  /** Called with the new ISO date, or `null` when cleared / set open-ended. */
  onValueChange?: (value: string | null) => void
  /** Inclusive ISO bounds; days outside are disabled and typed out-of-range values are rejected. */
  min?: string | null
  /** Inclusive upper ISO bound (see `min`). */
  max?: string | null
  /** Allow an open-ended (`null`) boundary, shown as `openEndedLabel` with a toggle. */
  allowOpenEnded?: boolean
  /** Muted word shown when open-ended, e.g. "Ongoing" / "Always". */
  openEndedLabel?: string
  /**
   * Which end of a period this field sits on — it chooses the quick-pick list (ADR-0816 §4).
   * A bare `DatePicker` is a start edge, which is also what the as-of lens wants: a lens is most
   * valuable pointed forward, to verify a scheduled change.
   *
   * @default 'start'
   */
  edge?: DateEdge
  /** Text shown in the empty text input; also the format hint. @default 'YYYY-MM-DD' */
  placeholder?: string
  /** Render the control unusable and dimmed; the calendar cannot be opened. */
  disabled?: boolean
  /** Force the error status even outside a FormField. */
  hasError?: boolean
  /** Override the auto-generated control id (normally supplied by FormField). */
  id?: string
  /** Accessible name for the text input when there's no visible label. */
  'aria-label'?: string
  /** Id of an existing element that names the text input (alternative to `aria-label`). */
  'aria-labelledby'?: string
  /** Class name for the root element (for layout only — colour and size come from the theme). */
  className?: string
}

export function DatePicker({
  value,
  onValueChange,
  min,
  max,
  allowOpenEnded,
  openEndedLabel,
  edge = 'start',
  placeholder = 'YYYY-MM-DD',
  disabled,
  hasError,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  className,
}: DatePickerProps) {
  const { fieldProps, status } = useFieldControl()
  // hasError (explicit) forces error; otherwise inherit the field's semantic status.
  const fieldStatus: FieldStatus | undefined = hasError ? 'error' : status

  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState<CalendarDate>(() => fromISO(value) ?? todayDate())
  const [focusDate, setFocusDate] = useState<CalendarDate>(() => fromISO(value) ?? todayDate())
  const [gridEl, setGridEl] = useState<HTMLDivElement | null>(null)

  const isOpenEnded = allowOpenEnded === true && value == null
  const pickOpts = { edge, allowOpenEnded, min, max }
  const picks = quickPicksFor(pickOpts)

  function moveFocus(next: CalendarDate) {
    setFocusDate(next)
    if (next.month !== anchor.month || next.year !== anchor.year) setAnchor(startOfMonth(next))
  }

  const editing = useDateTextEditing({
    value,
    onValueChange,
    isOpenEnded,
    options: pickOpts,
    isCalendarOpen: () => open,
    openCalendar: () => handleOpenChange(true),
    closeCalendar: () => setOpen(false),
    followDate: moveFocus,
  })
  const { focusZone, setFocusZone, text, parseError, inputRef } = editing

  const controlId = id ?? fieldProps.id
  const errorId = controlId ? `${controlId}-parse-error` : undefined
  const calendarId = controlId ? `${controlId}-calendar` : undefined

  // ⚠️ ADR-0816 §3 trap 3 — gated on the `grid` zone, NOT on `open`. Keyed on `open` (its previous
  // form) this fired the instant the popover opened and yanked DOM focus into the grid, which is
  // why the prevented `onOpenAutoFocus` was decorative: two mechanisms fought and the effect won.
  // It must still run for arrow navigation once the user has actually entered the grid.
  // ⚠️ `gridEl` is STATE, not a ref, and that is load-bearing: the grid lives in a Radix Portal
  // that is not yet in the DOM when this component's layout effect runs on the opening commit. A
  // ref would read `null` exactly once — on the only pass that matters — and since neither the
  // zone nor `focusDate` changes again, focus would never enter the grid at all. A callback ref
  // makes the node's arrival its own dependency, with no timer and no race.
  useLayoutEffect(() => {
    if (focusZone !== 'grid' || !gridEl) return
    gridEl.querySelector<HTMLButtonElement>(`[data-date="${focusDate.toString()}"]`)?.focus()
  }, [focusZone, focusDate, gridEl])

  function handleOpenChange(next: boolean) {
    if (next) {
      const base = fromISO(value) ?? todayDate()
      setAnchor(startOfMonth(base))
      setFocusDate(base)
    } else {
      // Closed from outside (overlay click, Radix dismiss): a user who was in the grid has no
      // focus target left, so the zone falls to blurred; the input zone is untouched.
      setFocusZone((zone) => (zone === 'grid' ? 'blurred' : zone))
    }
    setOpen(next)
  }

  /**
   * A press behaves exactly like a day cell: commit, close, land per §3 (focus in the input, whole
   * value selected). The split from the typed door is DOOR-shaped, not vocabulary-shaped — typing
   * `m` commits live and leaves the calendar open for the same reason typing `20260801` does;
   * *pressing* is a dismissing gesture.
   */
  function pressQuickPick(p: QuickPick) {
    editing.commitPicked(p.value)
    setOpen(false)
  }

  function pick(d: CalendarDate) {
    const iso = d.toString()
    if (outOfRange(iso, min, max)) return
    editing.commitPicked(iso)
    setOpen(false)
  }

  /**
   * Tab means leave-the-control, but the popover is portalled to `document.body`, so from inside
   * the grid the browser's own Tab would jump somewhere unrelated. Advance explicitly instead.
   */
  function focusNextAfterInput() {
    const input = inputRef.current
    if (!input) return
    const tabbable = Array.from(
      document.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => el.offsetParent !== null || el === input)
    const next = tabbable[tabbable.indexOf(input) + 1]
    next?.focus()
  }

  function onGridKeyDown(e: ReactKeyboardEvent) {
    // Tab from inside the grid still means leave-the-control (one tab stop per field).
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault()
      setFocusZone('blurred')
      setOpen(false)
      focusNextAfterInput()
      return
    }
    const next = gridMove(e.key, focusDate)
    if (next) {
      e.preventDefault()
      moveFocus(next)
    }
  }

  const cells = useMemo(() => monthMatrix(anchor), [anchor])
  const todayIso = todayISO()
  const displayValue =
    focusZone === 'input' ? text : value ? value : isOpenEnded && openEndedLabel ? openEndedLabel : ''

  return (
    <>
      <Popover.Root open={open} onOpenChange={handleOpenChange}>
        <FieldWrap className={className}>
          <TextInput
            ref={inputRef}
            $openEnded={isOpenEnded && focusZone !== 'input'}
            id={controlId}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            // The input stays a plain textbox — NOT role="combobox" (see FocusZone). The
            // shortcut is invisible without this, since the 📅 icon is no longer a tab stop.
            aria-keyshortcuts="ArrowDown"
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
            {...editing.handlers}
          />
          <Popover.Trigger asChild>
            {/* ⚠️ tabIndex={-1} — a mouse affordance, not a tab stop: ONE stop per field (was two,
                four per range picker). Defensible under WCAG 2.1.1 because ArrowDown reaches the
                same function and typing reaches everything the grid can produce. */}
            <CalendarButton
              type="button"
              disabled={disabled}
              tabIndex={-1}
              // Clicking the icon must OPEN the calendar without taking focus — §3's "two doors,
              // one per input device", where the mouse door leaves the caret where it was. Radix
              // opens on `click`, which `preventDefault` on mousedown does not suppress (trap 7).
              onMouseDown={(e) => e.preventDefault()}
              aria-label="Open calendar"
              aria-expanded={open}
              aria-controls={open ? calendarId : undefined}
            >
              <CalendarDaysIcon />
            </CalendarButton>
          </Popover.Trigger>
        </FieldWrap>

        <CalendarPopover
          calendarId={calendarId}
          picks={picks}
          anchor={anchor}
          cells={cells}
          valueIso={value ?? null}
          todayIso={todayIso}
          focusIso={focusDate.toString()}
          min={min}
          max={max}
          inGrid={focusZone === 'grid'}
          inputRef={inputRef}
          onMonthShift={(months) =>
            setAnchor(months < 0 ? anchor.subtract({ months: -months }) : anchor.add({ months }))
          }
          onPressQuickPick={pressQuickPick}
          onPickDay={pick}
          onGridKeyDown={onGridKeyDown}
          onGridElement={setGridEl}
          onEscapeFromGrid={editing.closeToInput}
        />
      </Popover.Root>
      {parseError && (
        <ParseHint id={errorId} role="alert">
          {/* Edge-aware: someone who typed letters was reaching for a shortcut, not a date, so
              answer the question they actually asked. Same table and same range filter as the
              button row — a pick hidden as a button is absent from the hint too. */}
          {/^[a-z]/i.test(text.trim()) && picks.length > 0
            ? `Try ${picks.map((p) => p.token).join(', ')}.`
            : `Enter a date like ${acceptedShapes(todayIso)}.`}
        </ParseHint>
      )}
    </>
  )
}
