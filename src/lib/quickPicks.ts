// The quick-pick vocabulary (ADR-0816 §4, §5, §7) — pure resolvers, no UI.
//
// One table feeds both doors: the buttons above the calendar grid and the typed shortcuts in the
// text input render and resolve from the same `QuickPick` objects, so "one vocabulary, two doors"
// is structural rather than maintained by hand.
//
// ⚠️ This deliberately does NOT live in `parseUserDate`. Two hard reasons: tokens are
// edge-dependent (`month` means the 1st on a start edge and the last day on an end edge), and
// `pasteDecisionTable.ts` runs pasted spreadsheet cells through the parse seam — a cell containing
// the word `today` must never become a date. The range chips (§7) also need this table from
// outside the `DatePicker` primitive.
//
// Every pick is an **absolute anchor relative to today** — never to the field's current value and
// never to the calendar's visible month. Date arithmetic (`+30`) is deferred, not forbidden:
// because nothing here is relative to anything but today, offsets can be added later without
// reinterpreting any existing token.

import { endOfMonth, endOfYear, startOfMonth, startOfYear } from '@internationalized/date'
import { outOfRange, todayDate } from './date'

/**
 * Which end of a period a date field sits on. A start edge is effective-from, a window or coverage
 * start, a cutover, or an as-of lens; an end edge is effective-until or a window/coverage end.
 * A bare `DatePicker` is a start edge.
 */
export type DateEdge = 'start' | 'end'

/** The closed token vocabulary. `month`/`year` mean the boundary *in the edge's direction*. */
export type QuickPickToken = 'today' | 'month' | 'year' | 'ongoing'

/** One offer of the field-level vocabulary: how it renders, how it is typed, and what it commits. */
export interface QuickPick {
  /** The typed token. Unique by first letter within its edge's list — see {@link matchQuickPick}. */
  token: QuickPickToken
  /** Button label, e.g. `1st of next month`. */
  label: string
  /**
   * Index into `label` of the token's first letter — the letter to mark for discovery
   * (`1st of next **m**onth`). ⚠️ The marked label must render in one inline `<span>`; sibling
   * flex items trim the trailing space and ship `1st of nextmonth`.
   */
  markIndex: number
  /** Accessible name carrying the shortcut, e.g. `Today, type t`. Not `aria-keyshortcuts`. */
  accessibleName: string
  /** What this pick commits: ISO `YYYY-MM-DD`, or `null` for the open-ended `Ongoing`. */
  value: string | null
}

/** The four range periods (§7). Two grains, today-anchored, calendar-relative. */
export type RangePeriod = 'thisMonth' | 'nextMonth' | 'thisYear' | 'nextYear'

/** One offer of the range-level vocabulary: a whole calendar period, resolved to both its ends. */
export interface RangePick {
  /** Which period this chip applies. */
  period: RangePeriod
  /** Chip label, e.g. `Next year`. There is no typed door at the range level. */
  label: string
  /** ISO `YYYY-MM-DD` — both ends are always concrete; a period is never open-ended. */
  start: string
  /** The period's closing boundary, ISO `YYYY-MM-DD` (see `start`). */
  end: string
}

// ── the six field tokens ───────────────────────────────────────────────────────

const LABELS: Record<DateEdge, ReadonlyArray<{ token: QuickPickToken; label: string }>> = {
  start: [
    { token: 'today', label: 'Today' },
    { token: 'month', label: '1st of next month' },
    { token: 'year', label: '1st of next year' },
  ],
  end: [
    { token: 'month', label: 'End of this month' },
    { token: 'year', label: 'End of this year' },
    { token: 'ongoing', label: 'Ongoing' },
  ],
}

/**
 * Resolve a token to the value it commits, anchored to today. `ongoing` resolves to `null` (the
 * open-ended boundary); every other token resolves to an ISO `YYYY-MM-DD`.
 *
 * ⚠️ Reads {@link todayDate}, so this and everything built on it is zone-sensitive.
 */
export function resolveQuickPick(token: QuickPickToken, edge: DateEdge = 'start'): string | null {
  const now = todayDate()
  switch (token) {
    case 'today':
      return now.toString()
    case 'ongoing':
      return null
    case 'month':
      return (edge === 'start' ? startOfMonth(now.add({ months: 1 })) : endOfMonth(now)).toString()
    case 'year':
      return (edge === 'start' ? startOfYear(now.add({ years: 1 })) : endOfYear(now)).toString()
  }
}

function pickOf(token: QuickPickToken, label: string, edge: DateEdge): QuickPick {
  const markIndex = label.toLowerCase().indexOf(token)
  return {
    token,
    label,
    markIndex,
    accessibleName: `${label}, type ${token[0]}`,
    value: resolveQuickPick(token, edge),
  }
}

/** The field context both doors resolve against — its edge, its open-endedness, and its bounds. */
interface FieldOptions {
  /** Defaults to a start edge — a bare `DatePicker`, and what `AsOfDatePicker` passes. */
  edge?: DateEdge
  /** `Ongoing` appears only when the field allows an open-ended boundary. */
  allowOpenEnded?: boolean
  /** The field's inclusive ISO bounds. Picks outside them are hidden. */
  min?: string | null
  /** The field's inclusive upper ISO bound (see `min`). */
  max?: string | null
}

/**
 * Every pick this field can offer, in list order — the button row above the grid.
 *
 * Out-of-range picks are **hidden**, so the row varies in length (the typed door refuses them
 * loudly instead, because a typist gets no visual cue to work from). `Ongoing` appears only with
 * `allowOpenEnded`, and is never range-gated: an open-ended boundary is the absence of a date.
 *
 * ⚠️ Values are resolved against today at call time, so build the row when the calendar opens
 * rather than memoising it for the life of the page.
 */
export function quickPicksFor({ edge = 'start', allowOpenEnded, min, max }: FieldOptions = {}): QuickPick[] {
  return LABELS[edge]
    .filter(({ token }) => token !== 'ongoing' || allowOpenEnded)
    .map(({ token, label }) => pickOf(token, label, edge))
    .filter((pick) => pick.value === null || !outOfRange(pick.value, min, max))
}

/** What the typed door made of the buffer so far. */
export type QuickPickMatch =
  /** No token starts with this text — including every input that starts with a digit. */
  | { kind: 'none' }
  /** Resolved, and the field's bounds forbid it. Refuse loudly; do not commit. */
  | { kind: 'outOfRange'; pick: QuickPick }
  | { kind: 'match'; pick: QuickPick }

/**
 * Match typed text against this field's vocabulary by **unique prefix**, case-insensitively.
 *
 * Because every valid date input starts with a digit and every token starts with a letter, the two
 * are disjoint by construction — there is no parse order to get wrong. And because the tokens in
 * an edge's list have distinct first letters, any non-empty prefix matches at most one of them:
 * `t`, `to`, `tod` and `today` all resolve alike, so **a prefix never commits a different value
 * than the whole word**. That is what preserves live-commit-as-you-type (§1).
 *
 * Empty text is not a shortcut — it is an empty field.
 */
export function matchQuickPick(text: string, opts: FieldOptions = {}): QuickPickMatch {
  const typed = text.trim().toLowerCase()
  if (!typed) return { kind: 'none' }

  const { edge = 'start', allowOpenEnded, min, max } = opts
  const entry = LABELS[edge].find(
    ({ token }) => token.startsWith(typed) && (token !== 'ongoing' || allowOpenEnded),
  )
  if (!entry) return { kind: 'none' }

  const pick = pickOf(entry.token, entry.label, edge)
  if (pick.value !== null && outOfRange(pick.value, min, max)) return { kind: 'outOfRange', pick }
  return { kind: 'match', pick }
}

// ── the four range periods ─────────────────────────────────────────────────────

const PERIOD_LABELS: ReadonlyArray<{ period: RangePeriod; label: string }> = [
  { period: 'thisMonth', label: 'This month' },
  { period: 'nextMonth', label: 'Next month' },
  { period: 'thisYear', label: 'This year' },
  { period: 'nextYear', label: 'Next year' },
]

/** Resolve a period to both its ends, anchored to today. Calendar-relative — never a plan year. */
export function resolveRangePeriod(period: RangePeriod): { start: string; end: string } {
  const now = todayDate()
  const anchor =
    period === 'nextMonth'
      ? now.add({ months: 1 })
      : period === 'nextYear'
        ? now.add({ years: 1 })
        : now
  const [from, to] =
    period === 'thisMonth' || period === 'nextMonth'
      ? [startOfMonth(anchor), endOfMonth(anchor)]
      : [startOfYear(anchor), endOfYear(anchor)]
  return { start: from.toString(), end: to.toString() }
}

/**
 * The range chips this range can offer, in list order.
 *
 * ⚠️ Applicability consults **only the outer `min`/`max`, all-or-nothing**: the two halves' mutual
 * coupling bounds cannot gate a pick that replaces both ends at once, and a period whose start is
 * allowed but whose end is not would write a range the field then rejects.
 */
export function rangePicksFor({ min, max }: { min?: string | null; max?: string | null } = {}): RangePick[] {
  return PERIOD_LABELS.map(({ period, label }) => ({ period, label, ...resolveRangePeriod(period) })).filter(
    ({ start, end }) => !outOfRange(start, min, max) && !outOfRange(end, min, max),
  )
}
