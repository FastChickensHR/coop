import { useRef, useState, type KeyboardEvent } from 'react'
import styled from 'styled-components'
import { rangePicksFor } from '../../lib/quickPicks'

/** Both ends of a range, written together. Never open-ended — a period always has two dates. */
export interface DateRangeValue {
  start: string
  end: string
}

export interface PeriodChipsProps {
  /** The range's **outer** bounds. See {@link rangePicksFor} — coupling bounds must not be passed. */
  min?: string | null
  max?: string | null
  disabled?: boolean
  /** Accessible name for the group, so two ranges on one page are tellable apart. */
  'aria-label': string
  /** Applies the whole period in one call. Sequential per-end writes are not safe here. */
  onPick: (range: DateRangeValue) => void
}

/**
 * The four calendar-period chips (ADR-0816 §7): `This month` · `Next month` · `This year` ·
 * `Next year`, rendered inline after a {@link DateRangePicker}'s pair.
 *
 * Three of the four periods **cannot be said from the two half-lists at all** — §4's start edge has
 * no "1st of this month", and its end edge has no "end of next month" or "end of next year" — so
 * this is not a press-saver but the only path to them. There is deliberately **no typed door**: the
 * range level has no text buffer of its own, and four more range words would break §5's
 * unique-prefix vocabulary three ways on `t`.
 *
 * ⚠️ Not the app's {@link Chip} (ADR-0175), which is a *removable token* — a `<span>` you dismiss.
 * These are momentary actions, so they are buttons. Same word, different thing; do not "unify" them.
 *
 * ⚠️ Likewise not a `ToggleGroup`: a pressed state would lie about a gesture that only ever fires.
 * The one tab stop comes from a hand-rolled roving `tabIndex` instead.
 *
 * ⚠️ Picks resolve against today at render time (never memoised), so a page left open across
 * midnight cannot offer a chip that writes yesterday's month.
 */
export function PeriodChips({
  min,
  max,
  disabled,
  'aria-label': ariaLabel,
  onPick,
}: PeriodChipsProps) {
  const [active, setActive] = useState(0)
  const chips = useRef<(HTMLButtonElement | null)[]>([])

  const picks = rangePicksFor({ min, max })
  if (picks.length === 0) return null

  // The row varies in length with the bounds, so a remembered index can outlive its chip.
  const activeIndex = Math.min(active, picks.length - 1)

  function focusChip(index: number) {
    setActive(index)
    chips.current[index]?.focus()
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = picks.length - 1
    const to =
      event.key === 'ArrowRight' ? (activeIndex === last ? 0 : activeIndex + 1)
      : event.key === 'ArrowLeft' ? (activeIndex === 0 ? last : activeIndex - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null
    if (to === null) return
    event.preventDefault()
    focusChip(to)
  }

  return (
    <Group role="toolbar" aria-orientation="horizontal" aria-label={ariaLabel} onKeyDown={onKeyDown}>
      {picks.map((pick, i) => (
        <ChipButton
          key={pick.period}
          type="button"
          ref={(el) => {
            chips.current[i] = el
          }}
          // Roving tabIndex: exactly one chip is tabbable, so the group is one tab stop and the
          // arrows walk it — the toolbar pattern, hand-rolled because no primitive here fits.
          tabIndex={i === activeIndex ? 0 : -1}
          disabled={disabled}
          onClick={() => {
            onPick({ start: pick.start, end: pick.end })
            // Focus deliberately **stays on the chip** — a chip closes nothing, and staying buys a
            // repick in one arrow. This is the one place §3's uniform landing is not inherited.
            focusChip(i)
          }}
        >
          {pick.label}
        </ChipButton>
      ))}
    </Group>
  )
}

const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-shrink: 0;
  gap: ${({ theme }) => theme.spacing.xs};
`

const ChipButton = styled.button`
  height: 1.75rem;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.surface2};
  color: ${({ theme }) => theme.colors.ink};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 150ms ease, border-color 150ms ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.border};
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 1px;
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.subtle};
    cursor: not-allowed;
  }
`
