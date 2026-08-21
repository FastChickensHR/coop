import { type KeyboardEvent as ReactKeyboardEvent, useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { styled } from 'styled-components'
import {
  CalendarDate,
  getDayOfWeek,
  getWeeksInMonth,
  startOfMonth,
} from '@internationalized/date'
import { useFieldControl, type FieldStatus } from '../FormField/context'
import { controlStatusStyles } from '../FormField/fieldStyles'
import { fromISO, outOfRange, parseUserDate, toISO, todayDate, todayISO } from '../../lib/date'
import {
  matchQuickPick,
  quickPicksFor,
  type DateEdge,
  type QuickPick,
} from '../../lib/quickPicks'

const LOCALE = 'en-US'
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

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

// ── grid math (off-by-one-proof via CalendarDate) ──────────────────────────────

function monthMatrix(anchor: CalendarDate): CalendarDate[] {
  const first = startOfMonth(anchor)
  const lead = getDayOfWeek(first, LOCALE) // Sunday = 0 for en-US
  const start = first.subtract({ days: lead })
  const weeks = getWeeksInMonth(anchor, LOCALE)
  return Array.from({ length: weeks * 7 }, (_, i) => start.add({ days: i }))
}

/**
 * The three shapes `parseUserDate` accepts, spelled with a real date so the hint is copyable.
 * Display-only — the ban ADR-0816 §8 lands on hand-rolled *parsing*, not on formatting.
 */
function acceptedShapes(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${iso}, ${y}${m}${d}, or ${m}/${d}/${y}`
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
  padding: 1rem;
  z-index: 50;
`

const CalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`

const NavButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: none;
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;

  &:hover { background-color: ${({ theme }) => theme.colors.surface2}; color: ${({ theme }) => theme.colors.ink}; }
  svg { width: 17px; height: 17px; }
`

const MonthLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.ink};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 2.5rem);
`

const Weekday = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.muted};
`

const DayButton = styled.button<{ $selected?: boolean; $today?: boolean; $outside?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.base};
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

/**
 * The quick-pick row, ABOVE the day grid (ADR-0816 §6). Measured at true size: every horizontal
 * placement costs the same +136px of height, because `1st of next month` (~9rem) does not fit
 * three-across a 17.5rem grid — "footer row" was never a row, it is a stack. That collapses the
 * trade to pure adjacency, and under §3 focus stays in the input, so the popover's TOP edge is the
 * edge nearest the field: the fast path belongs closest to the caret and first in reading order.
 * Accepted cost: `‹ July 2026 ›` is no longer the first thing in the popover.
 */
const PickRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const PickButton = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.4rem 0.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: none;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.ink};
  cursor: pointer;

  &:hover { background-color: ${({ theme }) => theme.colors.surface2}; }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: -2px;
  }
`

/**
 * ⚠️ ONE inline `<span>`, never sibling flex items — siblings trim the trailing space and ship
 * `1st of nextmonth`. Discovery is the marked token letter inside the label the user already
 * reads; the shortcut rides in the accessible name (`Today, type t`), never `aria-keyshortcuts`,
 * which means "a key that activates this control".
 */
const PickLabel = styled.span`
  display: inline;
`

const Mark = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-decoration: underline dotted;
  text-underline-offset: 2px;
`

// ── component ────────────────────────────────────────────────────────────────

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

  const [focused, setFocused] = useState(false)
  // `text` drives the input only while focused; when blurred the input shows the ISO value itself
  // (see `displayValue`). On focus we seed `text` with that SAME string, so focusing never changes
  // `input.value` — external value-setters (a human, or Playwright `.fill()`) then edit cleanly
  // instead of fighting a focus-time re-render.
  //
  // ADR-0816 §1: the displayed string is the ISO value, not a friendly rendering, so it round-trips
  // through `parseUserDate`. That is what makes editing one segment of the shown date produce
  // another valid date instead of garbage — friendly display was *creating* the bug it looked like
  // polish for.
  const [text, setText] = useState('')
  const [parseError, setParseError] = useState(false)
  const [open, setOpen] = useState(false)
  // ADR-0816 §3 — the calendar is NOT a combobox. Opening keeps real DOM focus in the input, so
  // arrows stay caret movement and typing continues; `inGrid` records that the user has explicitly
  // entered the grid (ArrowDown), at which point all four arrows become the grid's. Virtual focus
  // lost on a structural point worth remembering: a listbox is 1-D so a combobox need only hijack
  // Up/Down, but a 2-D grid needs Left/Right — which would steal the caret and destroy the segment
  // editing §1 and §2 spent two slices restoring.
  const [inGrid, setInGrid] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dirtyRef = useRef(false)

  // ADR-0816 §2 — entering the field selects its whole value, so replacing a date is one gesture.
  // Two refs rather than one, because the two halves are consumed at different moments:
  //   `pendingSelectRef` — armed on focus, consumed by the layout effect below.
  //   `guardMouseUpRef`  — armed on mousedown, consumed by the mouseup that follows it.
  const pendingSelectRef = useRef(false)
  const guardMouseUpRef = useRef(false)

  const [anchor, setAnchor] = useState<CalendarDate>(() => fromISO(value) ?? todayDate())
  const [focusDate, setFocusDate] = useState<CalendarDate>(() => fromISO(value) ?? todayDate())

  const [gridEl, setGridEl] = useState<HTMLDivElement | null>(null)
  const controlId = id ?? fieldProps.id
  const errorId = controlId ? `${controlId}-parse-error` : undefined
  const calendarId = controlId ? `${controlId}-calendar` : undefined

  // Select the whole value on entry — and it must happen HERE, not in `onFocus`. `onFocus` sets
  // state, React re-renders, and if the rendered string changed the DOM value is rewritten, which
  // discards any selection made during the handler. Running after commit is what survives that.
  useLayoutEffect(() => {
    if (!pendingSelectRef.current) return
    pendingSelectRef.current = false
    inputRef.current?.select()
  }, [focused, text])

  // ⚠️ ADR-0816 §3 trap 3 — gated on `inGrid`, NOT on `open`. Keyed on `open` (its previous form)
  // this fired the instant the popover opened and yanked DOM focus into the grid, which is why the
  // prevented `onOpenAutoFocus` below was decorative: two mechanisms fought and the effect won.
  // It must still run for arrow navigation once the user has actually entered the grid.
  // ⚠️ `gridEl` is STATE, not a ref, and that is load-bearing: the grid lives in a Radix Portal
  // that is not yet in the DOM when this component's layout effect runs on the opening commit. A
  // ref would read `null` exactly once — on the only pass that matters — and since neither `inGrid`
  // nor `focusDate` changes again, focus would never enter the grid at all. A callback ref makes
  // the node's arrival its own dependency, with no timer and no race.
  useLayoutEffect(() => {
    if (!inGrid || !gridEl) return
    gridEl.querySelector<HTMLButtonElement>(`[data-date="${focusDate.toString()}"]`)?.focus()
  }, [inGrid, focusDate, gridEl])

  function handleOpenChange(next: boolean) {
    if (next) {
      const base = fromISO(value) ?? todayDate()
      setAnchor(startOfMonth(base))
      setFocusDate(base)
    } else {
      setInGrid(false)
    }
    setOpen(next)
  }

  /** Close, and land per §3's uniform rule: focus in the input, whole value selected. */
  function closeToInput() {
    setInGrid(false)
    setOpen(false)
    pendingSelectRef.current = true
    inputRef.current?.focus()
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

  const pickOpts = { edge, allowOpenEnded, min, max }
  const picks = quickPicksFor(pickOpts)

  function commit(raw: string) {
    const trimmed = raw.trim()
    if (!trimmed) {
      setParseError(false)
      onValueChange?.(null)
      return
    }
    const iso = toISO(parseUserDate(trimmed))
    if (iso && !outOfRange(iso, min, max)) {
      setParseError(false)
      onValueChange?.(iso)
      return
    }
    // Digits are dates, letters are shortcuts (§5). The two sets are disjoint by construction —
    // every valid date input starts with a digit — so there is no parse order to get wrong; the
    // date attempt simply falls through. An out-of-range token refuses loudly, like a typed date.
    const match = matchQuickPick(trimmed, pickOpts)
    if (match.kind === 'match') {
      setParseError(false)
      onValueChange?.(match.pick.value)
      return
    }
    setParseError(true)
  }

  /**
   * A press behaves exactly like a day cell: commit, close, land per §3 (focus in the input, whole
   * value selected). The split from the typed door is DOOR-shaped, not vocabulary-shaped — typing
   * `m` commits live and leaves the calendar open for the same reason typing `20260801` does;
   * *pressing* is a dismissing gesture.
   */
  function pressQuickPick(p: QuickPick) {
    inputRef.current?.focus()
    setParseError(false)
    onValueChange?.(p.value)
    setText(p.value ?? '')
    dirtyRef.current = false
    pendingSelectRef.current = true
    setInGrid(false)
    setOpen(false)
  }

  function pick(d: CalendarDate) {
    const iso = d.toString()
    if (outOfRange(iso, min, max)) return
    // Focus FIRST. On the keyboard path focus sits in the grid, so this fires `onFocus`, which
    // seeds `text` from the not-yet-updated `value`. Doing it before `setText(iso)` means our
    // value wins inside the same batch. On the mouse path focus never left, so this is a no-op.
    inputRef.current?.focus()
    setParseError(false)
    onValueChange?.(iso)
    // ⚠️ Trap 1 — focus no longer leaves the input, so `displayValue` (which reads `text` while
    // focused) would render the STALE typed text over the picked date, and a later blur would
    // re-commit it. The general rule: any successful commit that keeps focus must resync both.
    setText(iso)
    dirtyRef.current = false
    // ⚠️ Trap 5 — a mouse pick fires no focus event, so the uniform landing needs an explicit arm
    // routed through §2's after-commit effect. An inline `.select()` here would be discarded.
    pendingSelectRef.current = true
    setInGrid(false)
    setOpen(false)
  }

  function moveFocus(next: CalendarDate) {
    setFocusDate(next)
    if (next.month !== anchor.month || next.year !== anchor.year) setAnchor(startOfMonth(next))
  }

  function onGridKeyDown(e: ReactKeyboardEvent) {
    // Tab from inside the grid still means leave-the-control (one tab stop per field).
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault()
      setInGrid(false)
      setOpen(false)
      focusNextAfterInput()
      return
    }
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
  const todayIso = todayISO()
  const valueIso = value ?? null
  const focusIso = focusDate.toString()
  const isOpenEnded = allowOpenEnded === true && value == null
  const displayValue = focused
    ? text
    : value
      ? value
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
            // The input stays a plain textbox — NOT role="combobox" (see `inGrid` above). The
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
            onMouseDown={() => {
              // A mousedown on an UNfocused field is about to focus it, and the mouseup that
              // follows would collapse the selection the focus is about to make. A mousedown on an
              // ALREADY focused field is the user asking for a caret — leave that one alone. This
              // is what makes select-all and segment editing coexist: entry selects, a second
              // click carets. Tab-in arms nothing here, so a later click still carets correctly.
              guardMouseUpRef.current = document.activeElement !== inputRef.current
            }}
            onMouseUp={(e) => {
              if (!guardMouseUpRef.current) return
              guardMouseUpRef.current = false
              e.preventDefault()
            }}
            onFocus={() => {
              setFocused(true)
              dirtyRef.current = false
              pendingSelectRef.current = true
              // Open-ended: clear the word so blurring without typing stays open-ended (no parse
              // error). Otherwise seed `text` with the SAME ISO string already shown, so focus
              // never rewrites input.value — keeps Playwright `.fill()` and other value-setters
              // clean.
              setText(isOpenEnded ? '' : (value ?? ''))
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
              if (iso && !outOfRange(iso, min, max)) {
                onValueChange?.(iso)
                // §3 trap 6 — with the calendar open the grid FOLLOWS what you type, re-anchoring
                // to the parsed month. This is what makes "keep focus in the input" worth doing:
                // without it you could type a 2027 date and watch the grid sit on this month.
                // Same threshold as the live-commit above, so no new parsing rule and no jitter.
                if (open) {
                  const parsed = fromISO(iso)
                  if (parsed) moveFocus(parsed)
                }
                return
              }
              // The typed door, live — §5. Unique-prefix matching is what keeps this safe: a
              // prefix never commits a DIFFERENT value than the whole word (`t`…`today` all
              // resolve alike), which is the live-commit invariant §1 relies on, in the only form
              // achievable for words. ⚠️ The buffer is deliberately NOT expanded here — doing so
              // mid-typing appends onto anyone spelling out `month`.
              const match = matchQuickPick(next, pickOpts)
              if (match.kind === 'match') {
                onValueChange?.(match.pick.value)
                if (open && match.pick.value) {
                  const parsed = fromISO(match.pick.value)
                  if (parsed) moveFocus(parsed)
                }
              }
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
                // ⭐ Enter EXPANDS a typed token to the date it resolved to, and selects it —
                // §3's uniform landing, and the confirmation the typed door otherwise lacks.
                // ⚠️ This is the ONLY place expansion may happen. Doing it as you type appends
                // onto anyone spelling out `month`.
                const match = matchQuickPick(text, pickOpts)
                if (match.kind === 'match') {
                  setParseError(false)
                  onValueChange?.(match.pick.value)
                  setText(match.pick.value ?? '')
                  dirtyRef.current = false
                  pendingSelectRef.current = true
                  return
                }
                if (dirtyRef.current) {
                  dirtyRef.current = false
                  commit(text)
                }
                return
              }
              // ⚠️ Trap 6 — hijacking ArrowDown costs the browser's native "caret to end" in a
              // single-line input. Accepted (comboboxes do the same); ArrowUp is deliberately left
              // alone as "caret to start". One press opens AND enters, so the grid is reachable by
              // keyboard even though the 📅 icon is no longer a tab stop.
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                if (!open) handleOpenChange(true)
                setInGrid(true)
                return
              }
              // Tab always means leave-the-control. No preventDefault: the icon is tabIndex={-1},
              // so the browser's own advance already skips to the next field.
              if (e.key === 'Tab' && open) {
                setInGrid(false)
                setOpen(false)
              }
            }}
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

        <Popover.Portal>
          <Content
            id={calendarId}
            align="start"
            sideOffset={4}
            // ⚠️ §6's own hazard: the picks now sit on the popover's TOP edge, which is exactly
            // the edge that gets clipped. At 480×900 a flipped popover rendered at y=-26 — 26px
            // shaved off what used to be dead padding and is now the fast path. Without this, a
            // fourth pick would silently eat it. (The separate "flip to top covers the field"
            // worry was measured FALSE and is not what this guards.)
            collisionPadding={8}
            role="dialog"
            aria-label="Choose date"
            onOpenAutoFocus={(e) => e.preventDefault()}
            // ⚠️ Radix returns focus to the TRIGGER on close, which would land the user on the 📅
            // icon — a control that is deliberately no longer a tab stop. This component decides
            // where focus goes after every close (`closeToInput`, `pick`, Tab), so Radix must not.
            onCloseAutoFocus={(e) => e.preventDefault()}
            // ⚠️ Trap 4 — focus deliberately sits OUTSIDE the content (in the input), so Radix's
            // DismissableLayer reads typing there as a focus-outside and would dismiss the
            // calendar mid-keystroke. Guarding it is what lets the grid track what you type.
            onFocusOutside={(e) => e.preventDefault()}
            // The input is "outside" the popover in DOM terms but is the same control to the user,
            // and under §3 it is where focus deliberately lives. Clicking into it to move the caret
            // must not dismiss the calendar you are picking from. Every other outside click still
            // closes, which is what makes the field's own click the only exception.
            onPointerDownOutside={(e) => {
              if (e.target === inputRef.current) e.preventDefault()
            }}
            // Escape only ever closes — never clears, never reverts (clearing is what select-all
            // and Delete are for). When focus is in the grid the popover is about to unmount from
            // under it, so hand focus back explicitly. When the calendar is already CLOSED this
            // handler doesn't exist and Escape bubbles, so an enclosing Drawer still closes.
            onEscapeKeyDown={() => {
              if (inGrid) closeToInput()
            }}
          >
            {picks.length > 0 && (
              <PickRow>
                {picks.map((p) => (
                  <PickButton
                    key={p.token}
                    type="button"
                    aria-label={p.accessibleName}
                    // Same trap as the day cells: without this, mousedown steals focus out of the
                    // input before `pressQuickPick` can land it back there.
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => pressQuickPick(p)}
                  >
                    <PickLabel>
                      {p.label.slice(0, p.markIndex)}
                      <Mark>{p.label[p.markIndex]}</Mark>
                      {p.label.slice(p.markIndex + 1)}
                    </PickLabel>
                  </PickButton>
                ))}
              </PickRow>
            )}
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
            <Grid ref={setGridEl} onKeyDown={onGridKeyDown}>
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
                    // ⚠️ Trap 2 — without this, mousedown on a day steals focus out of the input
                    // before `pick()` can put it back. Same trick our Combobox uses on its options.
                    onMouseDown={(e) => e.preventDefault()}
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
