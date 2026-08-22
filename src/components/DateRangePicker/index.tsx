import { styled } from 'styled-components'
import { DatePicker } from '../DatePicker'
import { PeriodChips, type DateRangeValue } from './PeriodChips'

/**
 * One boundary of the range (#1229, docs/code-style.md TypeScript 4). The old surface mirrored
 * twelve start/end props pairwise; each edge now carries its own object, so a prop cannot be
 * given for one end and forgotten for the other by accident.
 */
export interface DateRangeEdgeProps {
  /** ISO `YYYY-MM-DD`, or `null` when unset / open-ended. */
  value?: string | null
  /** Called with the new boundary, or `null` when cleared / set open-ended. */
  onValueChange?: (value: string | null) => void
  /** Let this boundary be open-ended (`null`), shown as `openEndedLabel`. */
  allowOpenEnded?: boolean
  /** Muted word shown when open-ended (start → "Always", end → "Ongoing"). */
  openEndedLabel?: string
  /** Override the auto-generated id of this input. */
  id?: string
  /** Accessible name for this input (they have no visible per-field label).
   *  @default 'Start date' / 'End date' */
  ariaLabel?: string
}

/** Props for DateRangePicker. */
export interface DateRangePickerProps {
  /** The range's opening boundary. */
  start?: DateRangeEdgeProps
  /** The range's closing boundary. */
  end?: DateRangeEdgeProps
  /**
   * Applies a whole calendar period in **one** call. Supplying it is what turns the period chips on
   * (ADR-0816 §7) — they are not wanted on every range, and there is no other reason to want this.
   *
   * ⚠️ It is a distinct prop rather than a sequential pair of edge changes because that pair only
   * works by luck: it survives a functional patch, and silently commits a range with just its
   * **end** set behind a closure-style setter.
   */
  onRangeChange?: (range: DateRangeValue) => void
  /** Accessible name for the chip group — distinguishes two chipped ranges on one page. @default 'Set both dates' */
  periodsAriaLabel?: string
  /** Outer inclusive bounds applied to both ends (e.g. within a plan year). */
  min?: string | null
  /** Outer inclusive upper bound applied to both ends (see `min`). */
  max?: string | null
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
 * independently open-ended, configured on its own `start`/`end` edge object (#1229).
 *
 * Supply `onRangeChange` to also offer the four calendar-period chips (ADR-0816 §7) inline after
 * the pair — see {@link PeriodChips}.
 */
export function DateRangePicker({
  start = {},
  end = {},
  onRangeChange,
  periodsAriaLabel = 'Set both dates',
  min,
  max,
  disabled,
  hasError,
}: DateRangePickerProps) {
  return (
    <Row>
      <Pair>
        <Side>
          <DatePicker
            edge="start"
            id={start.id}
            aria-label={start.ariaLabel ?? 'Start date'}
            value={start.value}
            onValueChange={start.onValueChange}
            min={min || undefined}
            max={end.value || max || undefined}
            allowOpenEnded={start.allowOpenEnded}
            openEndedLabel={start.openEndedLabel}
            disabled={disabled}
            hasError={hasError}
          />
        </Side>
        <Separator aria-hidden="true">–</Separator>
        <Side>
          <DatePicker
            edge="end"
            id={end.id}
            aria-label={end.ariaLabel ?? 'End date'}
            value={end.value}
            onValueChange={end.onValueChange}
            min={start.value || min || undefined}
            max={max || undefined}
            allowOpenEnded={end.allowOpenEnded}
            openEndedLabel={end.openEndedLabel}
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
