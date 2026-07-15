import styled from 'styled-components'
import { DatePicker } from '../DatePicker'

export interface DateRangePickerProps {
  /** ISO `YYYY-MM-DD` or `null` for each boundary. */
  start?: string | null
  end?: string | null
  onStartChange?: (value: string | null) => void
  onEndChange?: (value: string | null) => void
  /** Outer inclusive bounds applied to both ends (e.g. within a plan year). */
  min?: string | null
  max?: string | null
  /** Per-boundary open-endedness (start → "Always", end → "Ongoing"). */
  allowOpenEndedStart?: boolean
  allowOpenEndedEnd?: boolean
  startOpenEndedLabel?: string
  endOpenEndedLabel?: string
  startId?: string
  endId?: string
  /** Accessible names for the two inputs (they have no visible per-field label). */
  startAriaLabel?: string
  endAriaLabel?: string
  disabled?: boolean
  $hasError?: boolean
}

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
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
 */
export function DateRangePicker({
  start,
  end,
  onStartChange,
  onEndChange,
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
  $hasError,
}: DateRangePickerProps) {
  return (
    <Row>
      <Side>
        <DatePicker
          id={startId}
          aria-label={startAriaLabel}
          value={start}
          onValueChange={onStartChange}
          min={min || undefined}
          max={end || max || undefined}
          allowOpenEnded={allowOpenEndedStart}
          openEndedLabel={startOpenEndedLabel}
          disabled={disabled}
          $hasError={$hasError}
        />
      </Side>
      <Separator aria-hidden="true">–</Separator>
      <Side>
        <DatePicker
          id={endId}
          aria-label={endAriaLabel}
          value={end}
          onValueChange={onEndChange}
          min={start || min || undefined}
          max={max || undefined}
          allowOpenEnded={allowOpenEndedEnd}
          openEndedLabel={endOpenEndedLabel}
          disabled={disabled}
          $hasError={$hasError}
        />
      </Side>
    </Row>
  )
}
