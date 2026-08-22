import {
  type FocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import type { CalendarDate } from '@internationalized/date'
import { fromISO } from '../../lib/date'
import { resolveDateInput, type DateInputOptions } from './model'

/**
 * Where the user is, as ONE named state (#1228 — was two interacting booleans, `focused` +
 * `inGrid`, whose only legal overlap encoded transition ordering):
 *
 * - `blurred` — neither the input nor the grid has focus.
 * - `input`   — real DOM focus is in the text input (ADR-0816 §3: opening the calendar does
 *               NOT move it; arrows stay caret movement and typing continues).
 * - `grid`    — the user explicitly entered the day grid (ArrowDown), so all four arrows are
 *               the grid's. Virtual focus lost on a structural point worth remembering: a
 *               listbox is 1-D so a combobox need only hijack Up/Down, but a 2-D grid needs
 *               Left/Right — which would steal the caret and destroy the segment editing §1
 *               and §2 spent two slices restoring.
 */
export type FocusZone = 'blurred' | 'input' | 'grid'

export interface DateTextEditingCollaborators {
  value: string | null | undefined
  onValueChange?: (value: string | null) => void
  isOpenEnded: boolean
  options: DateInputOptions
  /** Whether the calendar popover is open — the live paths only steer the grid while it is. */
  isCalendarOpen: () => boolean
  /** Open the calendar re-anchored on the current value (the ArrowDown door). */
  openCalendar: () => void
  /** Close the calendar (leaving focus wherever the caller decides). */
  closeCalendar: () => void
  /** Steer the calendar's focused day to a freshly-resolved date (§3 trap 6 — grid follows typing). */
  followDate: (date: CalendarDate) => void
}

/**
 * The text-editing half of the DatePicker (#1228): the §1/§2/§5 machine — ISO-string display,
 * select-all on entry, the typed quick-pick door — extracted from ~10 inline JSX handlers so
 * the component keeps only wiring and markup. Every measured trap comment rode along.
 */
export function useDateTextEditing({
  value,
  onValueChange,
  isOpenEnded,
  options,
  isCalendarOpen,
  openCalendar,
  closeCalendar,
  followDate,
}: DateTextEditingCollaborators) {
  const [focusZone, setFocusZone] = useState<FocusZone>('blurred')
  // `text` drives the input only while the zone is `input`; otherwise the input shows the ISO
  // value itself (see `displayValue`). On focus we seed `text` with that SAME string, so focusing
  // never changes `input.value` — external value-setters (a human, or Playwright `.fill()`) then
  // edit cleanly instead of fighting a focus-time re-render.
  //
  // ADR-0816 §1: the displayed string is the ISO value, not a friendly rendering, so it round-trips
  // through `parseUserDate`. That is what makes editing one segment of the shown date produce
  // another valid date instead of garbage — friendly display was *creating* the bug it looked like
  // polish for.
  const [text, setText] = useState('')
  const [parseError, setParseError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dirtyRef = useRef(false)

  // ADR-0816 §2 — entering the field selects its whole value, so replacing a date is one gesture.
  // Two refs rather than one, because the two halves are consumed at different moments:
  //   `pendingSelectRef` — armed on focus, consumed by the layout effect below.
  //   `guardMouseUpRef`  — armed on mousedown, consumed by the mouseup that follows it.
  const pendingSelectRef = useRef(false)
  const guardMouseUpRef = useRef(false)

  // Select the whole value on entry — and it must happen HERE, not in `onFocus`. `onFocus` sets
  // state, React re-renders, and if the rendered string changed the DOM value is rewritten, which
  // discards any selection made during the handler. Running after commit is what survives that.
  useLayoutEffect(() => {
    if (!pendingSelectRef.current) return
    pendingSelectRef.current = false
    inputRef.current?.select()
  }, [focusZone, text])

  function commit(raw: string) {
    const resolved = resolveDateInput(raw, options)
    if (resolved.kind === 'invalid') {
      setParseError(true)
      return
    }
    setParseError(false)
    // A pick token commits its value; a date its ISO; empty clears.
    onValueChange?.(resolved.kind === 'date' ? resolved.iso : resolved.kind === 'pick' ? resolved.value : null)
  }

  /**
   * A successful commit that keeps (or lands) focus in the input must resync everything at once
   * (⚠️ Trap 1 — `displayValue` reads `text` while the zone is `input`, so stale typed text would
   * render over the picked date and a later blur would re-commit it; ⚠️ Trap 5 — a mouse pick
   * fires no focus event, so the uniform §3 landing needs an explicit arm routed through §2's
   * after-commit effect; an inline `.select()` would be discarded). One home for the resync the
   * day-cell, quick-pick and Enter-expansion paths each hand-rolled before #1228.
   */
  function commitPicked(next: string | null) {
    // Focus FIRST. On the keyboard path focus sits in the grid, so this fires `onFocus`, which
    // seeds `text` from the not-yet-updated `value`. Doing it before `setText` means our value
    // wins inside the same batch. On the mouse path focus never left, so this is a no-op.
    inputRef.current?.focus()
    setParseError(false)
    onValueChange?.(next)
    setText(next ?? '')
    dirtyRef.current = false
    pendingSelectRef.current = true
    setFocusZone('input')
  }

  /** Close, and land per §3's uniform rule: focus in the input, whole value selected. */
  function closeToInput() {
    closeCalendar()
    pendingSelectRef.current = true
    setFocusZone('input')
    inputRef.current?.focus()
  }

  const handlers = {
    onMouseDown: () => {
      // A mousedown on an UNfocused field is about to focus it, and the mouseup that follows
      // would collapse the selection the focus is about to make. A mousedown on an ALREADY
      // focused field is the user asking for a caret — leave that one alone. This is what makes
      // select-all and segment editing coexist: entry selects, a second click carets. Tab-in
      // arms nothing here, so a later click still carets correctly.
      guardMouseUpRef.current = document.activeElement !== inputRef.current
    },
    onMouseUp: (e: ReactMouseEvent<HTMLInputElement>) => {
      if (!guardMouseUpRef.current) return
      guardMouseUpRef.current = false
      e.preventDefault()
    },
    onFocus: () => {
      setFocusZone('input')
      dirtyRef.current = false
      pendingSelectRef.current = true
      // Open-ended: clear the word so blurring without typing stays open-ended (no parse error).
      // Otherwise seed `text` with the SAME ISO string already shown, so focus never rewrites
      // input.value — keeps Playwright `.fill()` and other value-setters clean.
      setText(isOpenEnded ? '' : (value ?? ''))
    },
    onChange: (e: FocusEvent<HTMLInputElement>) => {
      const next = e.target.value
      setText(next)
      dirtyRef.current = true
      if (parseError) setParseError(false)
      // Commit live once the text resolves, so a fully-typed value (or a unique-prefix token, §5
      // — a prefix never commits a DIFFERENT value than the whole word, the live-commit invariant
      // §1 relies on) is captured even if the user submits without blurring. Incomplete/invalid
      // text neither commits nor errors until blur. ⚠️ The buffer is deliberately NOT expanded
      // here — doing so mid-typing appends onto anyone spelling out `month`.
      const resolved = resolveDateInput(next, options)
      if (resolved.kind !== 'date' && resolved.kind !== 'pick') return
      const iso = resolved.kind === 'date' ? resolved.iso : resolved.value
      onValueChange?.(iso)
      // §3 trap 6 — with the calendar open the grid FOLLOWS what you type, re-anchoring to the
      // parsed month. This is what makes "keep focus in the input" worth doing: without it you
      // could type a 2027 date and watch the grid sit on this month.
      if (isCalendarOpen() && iso) {
        const parsed = fromISO(iso)
        if (parsed) followDate(parsed)
      }
    },
    onBlur: () => {
      // Blur only demotes the `input` zone — entering the grid blurs the input too, and that
      // transition already happened (the ArrowDown door set `grid` in the same batch).
      setFocusZone((zone) => (zone === 'grid' ? zone : 'blurred'))
      // Only commit if the user actually edited; an untouched field keeps its value.
      if (dirtyRef.current) {
        dirtyRef.current = false
        commit(text)
      }
    },
    onKeyDown: (e: ReactKeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        // ⭐ Enter EXPANDS a typed token to the date it resolved to, and selects it — §3's
        // uniform landing, and the confirmation the typed door otherwise lacks. ⚠️ This is the
        // ONLY place expansion may happen (see onChange).
        const resolved = resolveDateInput(text, options)
        if (resolved.kind === 'pick') {
          commitPicked(resolved.value)
          return
        }
        if (dirtyRef.current) {
          dirtyRef.current = false
          commit(text)
        }
        return
      }
      // ⚠️ Trap 6 — hijacking ArrowDown costs the browser's native "caret to end" in a
      // single-line input. Accepted (comboboxes do the same); ArrowUp is deliberately left alone
      // as "caret to start". One press opens AND enters, so the grid is reachable by keyboard
      // even though the 📅 icon is no longer a tab stop.
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (!isCalendarOpen()) openCalendar()
        setFocusZone('grid')
        return
      }
      // Tab always means leave-the-control. No preventDefault: the icon is tabIndex={-1}, so the
      // browser's own advance already skips to the next field; the blur handler demotes the zone.
      if (e.key === 'Tab' && isCalendarOpen()) {
        closeCalendar()
      }
    },
  }

  return {
    focusZone,
    setFocusZone,
    text,
    parseError,
    setParseError,
    inputRef,
    handlers,
    commitPicked,
    closeToInput,
  }
}
