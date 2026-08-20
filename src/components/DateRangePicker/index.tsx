import styled from 'styled-components'
import { DatePicker } from '../DatePicker'
import { PeriodChips, type DateRangeValue } from './PeriodChips'

export interface DateRangePickerProps {
  /** ISO `YYYY-MM-DD` or `null` for each boundary. */
  start?: string | null
  /** The range's closing boundary (see `start`). */
  end?: string | null
  /** Called with the new start boundary, or `null` when cleared / set open-ended. */
  onStartChange?: (value: string | null) => void
  /** Called with the new end boundary, or `null` when cleared / set open-ended. */
  onEndChange?: (value: string | null) => void
  /**
   * Applies a whole calendar period in **one** call. Supplying it is what turns the period chips on
   * (ADR-0816 §7) — they are not wanted on every range, and there is no other reason to want this.
   *
   * ⚠️ It is a distinct prop rather than a sequential `onStartChange` + `onEndChange` because that
   * pair only works by luck: it survives a functional patch, and silently commits a range with just
   * its **end** set behind a closure-style setter.
   */
  onRangeChange?: (range: DateRangeValue) => void
  /** Accessible name for the chip group — distinguishes two chipped ranges on one page. @default 'Set both dates' */
  periodsAriaLabel?: string
  /** Outer inclusive bounds applied to both ends (e.g. within a plan year). */
  min?: string | null
  /** Outer inclusive upper bound applied to both ends (see `min`). */
  max?: string | null
  /** Per-boundary open-endedness (start → "Always", end → "Ongoing"). */
  allowOpenEndedStart?: boolean
  /** Let the end boundary be open-ended (`null`), shown as `endOpenEndedLabel`. */
  allowOpenEndedEnd?: boolean
  /** Muted word shown when the start is open-ended (with `allowOpenEndedStart`). */
  startOpenEndedLabel?: string
  /** Muted word shown when the end is open-ended (with `allowOpenEndedEnd`). */
  endOpenEndedLabel?: string
  /** Override the auto-generated id of the start input. */
  startId?: string
  /** Override the auto-generated id of the end input. */
  endId?: string
  /** Accessible names for the two inputs (they have no visible per-field label). @default 'Start date' */
  startAriaLabel?: string
  /** Accessible name for the end input (see `startAriaLabel`). @default 'End date' */
  endAriaLabel?: string
  /** Render both inputs unusable and dimmed; the chips go with them. */
  disabled?: boolean
  /** Force the error status on both inputs even outside a FormField. */
  hasError?: boolean
}

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.625rem;
`

/**
 * The two inputs and their separator, kept together so the chips can only ever wrap *after* the
 * pair — inline is the placement ADR-0816 §7 chose, and a wrap must not split the pair to keep it.
 */
const Pair = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  flex: 1 1 20rem;
  min-width: 0;
`

const Side = styled.div`
  flex: 1 1 0;
  min-width: 0;
`

const Separator = styled.span`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`

/**
 * A date range as two linked {@link DatePicker}s (ADR-0079). The end cannot precede the start and
 * vice-versa — coupling flows through each side's `min`/`max` (typed out-of-range values are
 * rejected and calendar days disabled), composed with the outer `min`/`max`. Each boundary can be
 * independently open-ended. The whole thing is `useState`-friendly (two `value`/`onChange` pairs).
 *
 * Supply `onRangeChange` to also offer the four calendar-period chips (ADR-0816 §7) inline after
 * the pair — see {@link PeriodChips}.
 */
export function DateRangePicker({
  start,
  end,
  onStartChange,
  onEndChange,
  onRangeChange,
  periodsAriaLabel = 'Set both dates',
  min,
  max,
  allowOpenEndedStart,
  allowOpenEndedEnd,
  startOpenEndedLabel,
  endOpenEndedLabel,
  startId,
  endId,
  startAriaLabel = 'Start date',
  endAriaLabel = 'End date',
  disabled,
  hasError,
}: DateRangePickerProps) {
  return (
    <Row>
      <Pair>
        <Side>
          <DatePicker
            edge="start"
            id={startId}
            aria-label={startAriaLabel}
            value={start}
            onValueChange={onStartChange}
            min={min || undefined}
            max={end || max || undefined}
            allowOpenEnded={allowOpenEndedStart}
            openEndedLabel={startOpenEndedLabel}
            disabled={disabled}
            hasError={hasError}
          />
        </Side>
        <Separator aria-hidden="true">–</Separator>
        <Side>
          <DatePicker
            edge="end"
            id={endId}
            aria-label={endAriaLabel}
            value={end}
            onValueChange={onEndChange}
            min={start || min || undefined}
            max={max || undefined}
            allowOpenEnded={allowOpenEndedEnd}
            openEndedLabel={endOpenEndedLabel}
            disabled={disabled}
            hasError={hasError}
          />
        </Side>
      </Pair>
      {onRangeChange && (
        <PeriodChips
          aria-label={periodsAriaLabel}
          // ⚠️ The **outer** bounds only, all-or-nothing. The halves' coupling bounds (`end` above,
          // `start` below) cannot gate a pick that replaces both ends at once.
          min={min}
          max={max}
          disabled={disabled}
          onPick={onRangeChange}
        />
      )}
    </Row>
  )
}
