import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'

// Every resolver here reads `todayDate()`, so all ten are zone-sensitive *and* clock-sensitive.
// Two things are therefore controlled, and for different reasons:
//
//  1. The clock, via `vi.setSystemTime` — so every expectation below can be a hard-coded literal
//     rather than a value recomputed through the code under test.
//  2. The local zone, via a `getLocalTimeZone` mock. Mutating `process.env.TZ` at runtime does NOT
//     work: `vi.stubEnv('TZ', …)` silently no-ops when TZ was already set at process start, and CI
//     sets `TZ=UTC`. Mocking makes these hermetic under any ambient host zone — reproduce with
//     `TZ=UTC npx vitest run` — while still discriminating: an implementation that hand-rolled UTC
//     instead of going through `todayDate()` would ignore the stub entirely and fail the
//     zone-crossing test below.
//
// Only `Date` is faked; timers and promises are left alone.
const localZone = vi.hoisted(() => ({ current: 'UTC' }))
vi.mock('@internationalized/date', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@internationalized/date')>()),
  getLocalTimeZone: () => localZone.current,
}))

import {
  matchQuickPick,
  quickPicksFor,
  rangePicksFor,
  resolveQuickPick,
  resolveRangePeriod,
  type DateEdge,
  type QuickPickToken,
  type RangePeriod,
} from './quickPicks'

/** Pin the wall clock to an absolute instant, and pin which zone counts as local. */
function at(instant: string, zone = 'UTC') {
  localZone.current = zone
  vi.setSystemTime(new Date(instant))
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
  at('2026-07-15T12:00:00Z') // a mid-month Wednesday; UTC and US zones agree on the day
})

afterEach(() => {
  vi.useRealTimers()
  localZone.current = 'UTC'
})

describe('resolveQuickPick — the six field tokens', () => {
  it('resolves the three start-edge tokens', () => {
    expect(resolveQuickPick('today', 'start')).toBe('2026-07-15')
    expect(resolveQuickPick('month', 'start')).toBe('2026-08-01')
    expect(resolveQuickPick('year', 'start')).toBe('2027-01-01')
  })

  it('resolves the three end-edge tokens', () => {
    expect(resolveQuickPick('month', 'end')).toBe('2026-07-31')
    expect(resolveQuickPick('year', 'end')).toBe('2026-12-31')
    expect(resolveQuickPick('ongoing', 'end')).toBeNull()
  })

  it('defaults to the start edge — a bare DatePicker is a start edge', () => {
    expect(resolveQuickPick('month')).toBe('2026-08-01')
    expect(resolveQuickPick('year')).toBe('2027-01-01')
  })

  it('gives month and year opposite meanings on the two edges', () => {
    for (const token of ['month', 'year'] as const) {
      expect(resolveQuickPick(token, 'start')).not.toBe(resolveQuickPick(token, 'end'))
    }
  })

  it('anchors to today, never to a calendar year boundary, when today is in December', () => {
    at('2026-12-20T12:00:00Z')
    expect(resolveQuickPick('month', 'start')).toBe('2027-01-01') // rolls into next year
    expect(resolveQuickPick('month', 'end')).toBe('2026-12-31')
    expect(resolveQuickPick('year', 'start')).toBe('2027-01-01')
    expect(resolveQuickPick('year', 'end')).toBe('2026-12-31')
  })

  it('lands on the real last day of a short month, including a leap February', () => {
    at('2028-02-10T12:00:00Z')
    expect(resolveQuickPick('month', 'end')).toBe('2028-02-29')
    at('2026-02-10T12:00:00Z')
    expect(resolveQuickPick('month', 'end')).toBe('2026-02-28')
    at('2026-11-10T12:00:00Z')
    expect(resolveQuickPick('month', 'end')).toBe('2026-11-30')
  })

  it('does not drag a 31st into the next month when adding a month', () => {
    at('2026-01-31T12:00:00Z')
    expect(resolveQuickPick('month', 'start')).toBe('2026-02-01')
  })

  it('reads today in the local zone, not UTC', () => {
    // 02:00Z on Aug 1 is still 21:00 on Jul 31 in Chicago — a different day *and* a different
    // month, so every today-anchored token moves.
    at('2026-08-01T02:00:00Z', 'UTC')
    expect(resolveQuickPick('today')).toBe('2026-08-01')
    expect(resolveQuickPick('month', 'start')).toBe('2026-09-01')
    expect(resolveQuickPick('month', 'end')).toBe('2026-08-31')

    at('2026-08-01T02:00:00Z', 'America/Chicago')
    expect(resolveQuickPick('today')).toBe('2026-07-31')
    expect(resolveQuickPick('month', 'start')).toBe('2026-08-01')
    expect(resolveQuickPick('month', 'end')).toBe('2026-07-31')
  })
})

describe('quickPicksFor — the button row', () => {
  it('offers the start list, in order, for a start edge', () => {
    expect(quickPicksFor({ edge: 'start' })).toEqual([
      expect.objectContaining({ token: 'today', label: 'Today', value: '2026-07-15' }),
      expect.objectContaining({ token: 'month', label: '1st of next month', value: '2026-08-01' }),
      expect.objectContaining({ token: 'year', label: '1st of next year', value: '2027-01-01' }),
    ])
  })

  it('offers the end list, in order, for an end edge', () => {
    expect(quickPicksFor({ edge: 'end', allowOpenEnded: true })).toEqual([
      expect.objectContaining({ token: 'month', label: 'End of this month', value: '2026-07-31' }),
      expect.objectContaining({ token: 'year', label: 'End of this year', value: '2026-12-31' }),
      expect.objectContaining({ token: 'ongoing', label: 'Ongoing', value: null }),
    ])
  })

  it('defaults to the start edge when no edge is given', () => {
    expect(quickPicksFor()).toEqual(quickPicksFor({ edge: 'start' }))
  })

  it('offers Ongoing only when the field allows an open-ended boundary', () => {
    expect(quickPicksFor({ edge: 'end' }).map((p) => p.token)).toEqual(['month', 'year'])
    expect(quickPicksFor({ edge: 'start', allowOpenEnded: true }).map((p) => p.token)).toEqual([
      'today',
      'month',
      'year',
    ])
  })

  it('hides out-of-range picks, so the row varies in length', () => {
    expect(quickPicksFor({ edge: 'start', max: '2026-08-31' }).map((p) => p.token)).toEqual([
      'today',
      'month',
    ])
    expect(quickPicksFor({ edge: 'start', max: '2026-07-20' }).map((p) => p.token)).toEqual(['today'])
    expect(quickPicksFor({ edge: 'start', min: '2026-07-20' }).map((p) => p.token)).toEqual([
      'month',
      'year',
    ])
  })

  it('treats the bounds as inclusive', () => {
    expect(quickPicksFor({ edge: 'start', min: '2026-07-15', max: '2026-07-15' }).map((p) => p.token)).toEqual(
      ['today'],
    )
  })

  it('never range-gates Ongoing — an open boundary is the absence of a date', () => {
    // A max of Jul 20 puts both dated end-edge picks out of range; Ongoing is untouched by it.
    const picks = quickPicksFor({ edge: 'end', allowOpenEnded: true, max: '2026-07-20' })
    expect(picks.map((p) => p.token)).toEqual(['ongoing'])
  })

  it('treats empty-string bounds as no bound at all', () => {
    // ADR-0079 slice 4 shipped a bug by reading '' as a real bound, which disabled everything.
    expect(quickPicksFor({ edge: 'start', min: '', max: '' }).map((p) => p.token)).toEqual([
      'today',
      'month',
      'year',
    ])
    expect(quickPicksFor({ edge: 'start', min: null, max: null })).toHaveLength(3)
  })

  it('marks the token letter inside the label and carries it into the accessible name', () => {
    const all = [...quickPicksFor({ edge: 'start' }), ...quickPicksFor({ edge: 'end', allowOpenEnded: true })]
    for (const pick of all) {
      expect(pick.label.toLowerCase().slice(pick.markIndex)).toMatch(new RegExp(`^${pick.token}\\b`))
    }
    expect(quickPicksFor({ edge: 'start' })).toEqual([
      expect.objectContaining({ markIndex: 0, accessibleName: 'Today, type t' }),
      expect.objectContaining({ markIndex: 12, accessibleName: '1st of next month, type m' }),
      expect.objectContaining({ markIndex: 12, accessibleName: '1st of next year, type y' }),
    ])
    expect(quickPicksFor({ edge: 'end', allowOpenEnded: true })).toEqual([
      expect.objectContaining({ markIndex: 12, accessibleName: 'End of this month, type m' }),
      expect.objectContaining({ markIndex: 12, accessibleName: 'End of this year, type y' }),
      expect.objectContaining({ markIndex: 0, accessibleName: 'Ongoing, type o' }),
    ])
  })
})

describe('matchQuickPick — the typed door', () => {
  const EDGES: Array<{ edge: DateEdge; tokens: QuickPickToken[] }> = [
    { edge: 'start', tokens: ['today', 'month', 'year'] },
    { edge: 'end', tokens: ['month', 'year', 'ongoing'] },
  ]

  it('gives every token in an edge a distinct first letter', () => {
    // This is what makes "unique prefix" true by construction rather than by inspection: add a
    // colliding token and this fails before anything else does.
    for (const { edge, tokens } of EDGES) {
      const initials = tokens.map((t) => t[0])
      expect(new Set(initials).size, `${edge} initials collide`).toBe(tokens.length)
    }
  })

  it('resolves every prefix of a token exactly as the whole word does', () => {
    // The live-commit invariant: a prefix never commits a *different* value than the whole word.
    for (const { edge, tokens } of EDGES) {
      for (const token of tokens) {
        const whole = matchQuickPick(token, { edge, allowOpenEnded: true })
        expect(whole.kind).toBe('match')
        for (let n = 1; n <= token.length; n++) {
          expect(matchQuickPick(token.slice(0, n), { edge, allowOpenEnded: true })).toEqual(whole)
        }
      }
    }
  })

  it('resolves the single-letter fast path', () => {
    expect(matchQuickPick('t')).toEqual({ kind: 'match', pick: expect.objectContaining({ value: '2026-07-15' }) })
    expect(matchQuickPick('m')).toEqual({ kind: 'match', pick: expect.objectContaining({ value: '2026-08-01' }) })
    expect(matchQuickPick('y')).toEqual({ kind: 'match', pick: expect.objectContaining({ value: '2027-01-01' }) })
    expect(matchQuickPick('o', { edge: 'end', allowOpenEnded: true })).toEqual({
      kind: 'match',
      pick: expect.objectContaining({ token: 'ongoing', value: null }),
    })
  })

  it('reads the same letter differently on the two edges', () => {
    expect(matchQuickPick('m', { edge: 'start' })).toEqual({
      kind: 'match',
      pick: expect.objectContaining({ value: '2026-08-01' }),
    })
    expect(matchQuickPick('m', { edge: 'end' })).toEqual({
      kind: 'match',
      pick: expect.objectContaining({ value: '2026-07-31' }),
    })
  })

  it('is case-insensitive and ignores surrounding whitespace', () => {
    for (const text of ['T', 'ToDaY', '  today  ', ' T']) {
      expect(matchQuickPick(text)).toEqual(matchQuickPick('today'))
    }
  })

  it('never matches anything that starts with a digit', () => {
    // Dates and shortcuts are disjoint by construction — no parse order to get wrong.
    for (const text of ['2', '20', '2026', '20260801', '2026-08-01', '07/15/2026', '1st']) {
      expect(matchQuickPick(text, { edge: 'end', allowOpenEnded: true })).toEqual({ kind: 'none' })
    }
  })

  it('matches nothing for empty, unknown, or over-long text', () => {
    for (const text of ['', '   ', 'x', 'q', 'todayy', 'to day', 'end of this month', 'mo nth']) {
      expect(matchQuickPick(text, { edge: 'end', allowOpenEnded: true })).toEqual({ kind: 'none' })
    }
  })

  it('offers no token an edge does not have', () => {
    expect(matchQuickPick('today', { edge: 'end', allowOpenEnded: true })).toEqual({ kind: 'none' })
    expect(matchQuickPick('ongoing', { edge: 'start', allowOpenEnded: true })).toEqual({ kind: 'none' })
  })

  it('does not offer Ongoing when the field is not open-ended', () => {
    expect(matchQuickPick('o', { edge: 'end' })).toEqual({ kind: 'none' })
  })

  it('refuses an out-of-range pick loudly instead of silently dropping it', () => {
    // The button row *hides* these; the typed door must say what it refused, because a typist gets
    // no visual cue to work from.
    const refused = matchQuickPick('y', { edge: 'start', max: '2026-12-31' })
    expect(refused).toEqual({ kind: 'outOfRange', pick: expect.objectContaining({ value: '2027-01-01' }) })
    expect(matchQuickPick('t', { edge: 'start', min: '2026-08-01' })).toEqual({
      kind: 'outOfRange',
      pick: expect.objectContaining({ value: '2026-07-15' }),
    })
  })

  it('never refuses Ongoing on range grounds', () => {
    expect(matchQuickPick('o', { edge: 'end', allowOpenEnded: true, max: '2026-01-01' })).toEqual({
      kind: 'match',
      pick: expect.objectContaining({ token: 'ongoing', value: null }),
    })
  })

  it('treats empty-string bounds as no bound at all', () => {
    expect(matchQuickPick('y', { edge: 'start', min: '', max: '' }).kind).toBe('match')
  })
})

describe('resolveRangePeriod / rangePicksFor — the four range periods', () => {
  it('resolves all four periods to both ends', () => {
    expect(resolveRangePeriod('thisMonth')).toEqual({ start: '2026-07-01', end: '2026-07-31' })
    expect(resolveRangePeriod('nextMonth')).toEqual({ start: '2026-08-01', end: '2026-08-31' })
    expect(resolveRangePeriod('thisYear')).toEqual({ start: '2026-01-01', end: '2026-12-31' })
    expect(resolveRangePeriod('nextYear')).toEqual({ start: '2027-01-01', end: '2027-12-31' })
  })

  it('rolls the year when next month crosses December', () => {
    at('2026-12-20T12:00:00Z')
    expect(resolveRangePeriod('thisMonth')).toEqual({ start: '2026-12-01', end: '2026-12-31' })
    expect(resolveRangePeriod('nextMonth')).toEqual({ start: '2027-01-01', end: '2027-01-31' })
  })

  it('lands on the real last day of a short next month', () => {
    at('2028-01-31T12:00:00Z')
    expect(resolveRangePeriod('nextMonth')).toEqual({ start: '2028-02-01', end: '2028-02-29' })
  })

  it('reads today in the local zone, not UTC', () => {
    at('2026-08-01T02:00:00Z', 'America/Chicago')
    expect(resolveRangePeriod('thisMonth')).toEqual({ start: '2026-07-01', end: '2026-07-31' })
    at('2026-08-01T02:00:00Z', 'UTC')
    expect(resolveRangePeriod('thisMonth')).toEqual({ start: '2026-08-01', end: '2026-08-31' })
  })

  it('offers all four chips, in order, when the range is unbounded', () => {
    expect(rangePicksFor().map((p) => p.period)).toEqual(['thisMonth', 'nextMonth', 'thisYear', 'nextYear'])
    expect(rangePicksFor()).toEqual([
      { period: 'thisMonth', label: 'This month', start: '2026-07-01', end: '2026-07-31' },
      { period: 'nextMonth', label: 'Next month', start: '2026-08-01', end: '2026-08-31' },
      { period: 'thisYear', label: 'This year', start: '2026-01-01', end: '2026-12-31' },
      { period: 'nextYear', label: 'Next year', start: '2027-01-01', end: '2027-12-31' },
    ])
  })

  it('gates a period all-or-nothing: half a period inside the bounds is not offered', () => {
    // Next month starts inside this window and ends outside it. Offering it would write a range the
    // field then rejects, so the whole chip goes.
    expect(rangePicksFor({ max: '2026-08-15' }).map((p) => p.period)).toEqual(['thisMonth'])
    expect(rangePicksFor({ min: '2026-07-10' }).map((p) => p.period)).toEqual(['nextMonth', 'nextYear'])
  })

  it('offers nothing when the bounds admit no whole period', () => {
    expect(rangePicksFor({ min: '2026-07-10', max: '2026-07-20' })).toEqual([])
  })

  it('treats the bounds as inclusive', () => {
    expect(rangePicksFor({ min: '2026-07-01', max: '2026-07-31' }).map((p) => p.period)).toEqual(['thisMonth'])
  })

  it('treats empty-string bounds as no bound at all', () => {
    expect(rangePicksFor({ min: '', max: '' })).toHaveLength(4)
    expect(rangePicksFor({ min: null, max: null })).toHaveLength(4)
  })

  it('resolves every period the chip list reports', () => {
    for (const { period, start, end } of rangePicksFor()) {
      expect(resolveRangePeriod(period as RangePeriod)).toEqual({ start, end })
    }
  })
})
