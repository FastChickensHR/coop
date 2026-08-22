import { CalendarDate, getDayOfWeek, getWeeksInMonth, startOfMonth } from '@internationalized/date'
import { outOfRange, parseUserDate, toISO } from '../../lib/date'
import { matchQuickPick, type DateEdge } from '../../lib/quickPicks'

/**
 * The DatePicker's pure policy (#1228) — the calendar math and the input-resolution door,
 * extracted from inline handlers so they are unit-testable apart from the component. The
 * component keeps only wiring, DOM-timing refs, and markup.
 */

export const LOCALE = 'en-US'
export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
export const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export function monthMatrix(anchor: CalendarDate): CalendarDate[] {
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
export function acceptedShapes(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${iso}, ${y}${m}${d}, or ${m}/${d}/${y}`
}

export function dayLabel(d: CalendarDate): string {
  return `${MONTH_NAMES[d.month - 1]} ${d.day}, ${d.year}`
}

export interface DateInputOptions {
  edge: DateEdge
  allowOpenEnded?: boolean
  min?: string | null
  max?: string | null
}

/**
 * What a raw input string resolves to. The component was spelling this policy three times —
 * blur-commit, live-commit, and Enter-expansion — with the door rule repeated at each site.
 */
export type DateInputResolution =
  | { kind: 'empty' }
  | { kind: 'date'; iso: string }
  | { kind: 'pick'; value: string | null }
  | { kind: 'invalid' }

/**
 * Digits are dates, letters are shortcuts (ADR-0816 §5). The two sets are disjoint by
 * construction — every valid date input starts with a digit — so there is no parse order to
 * get wrong; the date attempt simply falls through. An out-of-range value (typed or via a
 * token) resolves invalid, refusing loudly.
 */
export function resolveDateInput(raw: string, options: DateInputOptions): DateInputResolution {
  const trimmed = raw.trim()
  if (!trimmed) return { kind: 'empty' }
  const iso = toISO(parseUserDate(trimmed))
  if (iso && !outOfRange(iso, options.min, options.max)) return { kind: 'date', iso }
  const match = matchQuickPick(trimmed, options)
  if (match.kind === 'match') return { kind: 'pick', value: match.pick.value }
  return { kind: 'invalid' }
}

/**
 * The grid's keyboard vocabulary (ADR-0816 §3): arrows move by day/week, PageUp/PageDown by
 * month, Home to the month's start. Null for any key the grid does not own — Tab in
 * particular stays the component's leave-the-control concern.
 */
export function gridMove(key: string, from: CalendarDate): CalendarDate | null {
  switch (key) {
    case 'ArrowLeft':
      return from.subtract({ days: 1 })
    case 'ArrowRight':
      return from.add({ days: 1 })
    case 'ArrowUp':
      return from.subtract({ weeks: 1 })
    case 'ArrowDown':
      return from.add({ weeks: 1 })
    case 'PageUp':
      return from.subtract({ months: 1 })
    case 'PageDown':
      return from.add({ months: 1 })
    case 'Home':
      return startOfMonth(from)
    default:
      return null
  }
}
