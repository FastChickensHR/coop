import { describe, it, expect, afterEach, vi } from 'vitest'

// The "today" tests below need to control which zone counts as local. Mutating `process.env.TZ`
// at runtime does NOT do that reliably: it only takes effect when TZ was unset when the process
// started, so a developer machine with TZ unset passes while CI — which runs with TZ set to UTC —
// fails. Stubbing `getLocalTimeZone` instead makes the tests hermetic under any ambient zone.
// They still discriminate: an implementation that hand-rolled UTC would ignore this stub entirely.
const localZone = vi.hoisted(() => ({ current: 'UTC' }))
vi.mock('@internationalized/date', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@internationalized/date')>()),
  getLocalTimeZone: () => localZone.current,
}))

import {
  fromISO,
  toISO,
  todayDate,
  todayISO,
  formatDate,
  formatInstant,
  formatDateTime,
  dayOfInstant,
  parseUserDate,
  ALWAYS,
  ONGOING,
} from './date'

describe('fromISO / toISO', () => {
  it('round-trips a date-only ISO string', () => {
    expect(toISO(fromISO('2027-06-15'))).toBe('2027-06-15')
  })
  it('returns null for absent input', () => {
    expect(fromISO(null)).toBeNull()
    expect(fromISO(undefined)).toBeNull()
    expect(fromISO('')).toBeNull()
  })
  it('returns null for non-date-only or invalid strings', () => {
    expect(fromISO('garbage')).toBeNull()
    expect(fromISO('2027-13-01')).toBeNull() // month out of range
    expect(fromISO('2027-02-30')).toBeNull() // day out of range
    expect(fromISO('2027-01-01T12:00:00Z')).toBeNull() // not date-only
  })
  it('toISO of null is null', () => {
    expect(toISO(null)).toBeNull()
    expect(toISO(undefined)).toBeNull()
  })
})

describe('todayISO / todayDate', () => {
  // Pins each assertion to a real instant + a real zone so "today" is deterministic. `Z`-suffixed
  // input parses identically in every zone, so only the *reading* of it varies.
  function at(instantUtc: string, timeZone: string) {
    localZone.current = timeZone
    vi.useFakeTimers()
    vi.setSystemTime(new Date(instantUtc))
  }

  afterEach(() => {
    vi.useRealTimers()
    localZone.current = 'UTC'
  })

  it('returns a YYYY-MM-DD string', () => {
    expect(todayISO()).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('is LOCAL today, not UTC today, in an evening west of UTC', () => {
    // 2026-07-15 21:30 PDT — the same instant is already 2026-07-16 in UTC.
    at('2026-07-16T04:30:00Z', 'America/Los_Angeles')

    // Guard: the zone really is being honored, and the UTC hand-rolls this seam replaced
    // (`new Date().toISOString().slice(0, 10)`) really do disagree here. Without this the
    // assertions below would still pass under a UTC implementation.
    expect(new Date().toISOString().slice(0, 10)).toBe('2026-07-16')

    expect(todayISO()).toBe('2026-07-15')
    expect(todayDate().toString()).toBe('2026-07-15')
  })

  it('is LOCAL today, not UTC today, in a morning east of UTC', () => {
    // 2026-07-16 07:00 JST — the same instant is still 2026-07-15 in UTC.
    at('2026-07-15T22:00:00Z', 'Asia/Tokyo')

    expect(new Date().toISOString().slice(0, 10)).toBe('2026-07-15')

    expect(todayISO()).toBe('2026-07-16')
    expect(todayDate().toString()).toBe('2026-07-16')
  })

  it('agrees with the UTC reading when the local zone is UTC', () => {
    at('2026-07-16T04:30:00Z', 'UTC')
    expect(todayISO()).toBe('2026-07-16')
  })

  it('todayISO is exactly todayDate serialized — one definition, two shapes', () => {
    at('2026-07-16T04:30:00Z', 'America/Los_Angeles')
    expect(todayISO()).toBe(todayDate().toString())
  })
})

describe('formatDate', () => {
  it('echoes a date-only value as the ISO it already is', () => {
    expect(formatDate('2027-01-01')).toBe('2027-01-01')
    expect(formatDate('2026-12-31')).toBe('2026-12-31')
  })
  it('returns the fallback for null/invalid, honoring a custom fallback', () => {
    expect(formatDate(null)).toBe('—')
    expect(formatDate('')).toBe('—')
    expect(formatDate('nope')).toBe('—')
    expect(formatDate('2027-02-30')).toBe('—') // a real-looking date that is not a day
    expect(formatDate(null, 'n/a')).toBe('n/a')
  })
  it('carries the boundary vocabulary as its fallback — the reason it still exists', () => {
    expect(formatDate(null, ALWAYS)).toBe('Always')
    expect(formatDate(null, ONGOING)).toBe('Ongoing')
  })

  // ⚠️ This assertion and its twin under formatInstant are the entire enforcement of the
  // value-kind cut. Nothing else in the app fails if the two kinds start crossing over.
  it('REFUSES a timestamp: a moment is not a day, so it shows the fallback, never a false date', () => {
    expect(formatDate('2027-03-15T09:04:00Z')).toBe('—')
    expect(formatDate('2027-03-15T09:04:00Z', ONGOING)).toBe('Ongoing')
  })
})

describe('formatInstant / dayOfInstant', () => {
  afterEach(() => {
    localZone.current = 'UTC'
  })

  it('projects an instant onto its local day and renders it friendly', () => {
    expect(formatInstant('2027-03-15T09:04:00Z')).toBe('Mar 15, 2027')
  })

  it('projects into the LOCAL zone, so the same instant can be two different days', () => {
    // 2026-07-16 04:30Z is still 21:30 on the 15th in Los Angeles, and already 13:30 on the
    // 16th in Tokyo. A hand-rolled UTC projection would render "Jul 16, 2026" for both.
    localZone.current = 'America/Los_Angeles'
    expect(formatInstant('2026-07-16T04:30:00Z')).toBe('Jul 15, 2026')
    expect(dayOfInstant('2026-07-16T04:30:00Z')?.toString()).toBe('2026-07-15')

    localZone.current = 'Asia/Tokyo'
    expect(formatInstant('2026-07-16T04:30:00Z')).toBe('Jul 16, 2026')
    expect(dayOfInstant('2026-07-16T04:30:00Z')?.toString()).toBe('2026-07-16')
  })

  it('returns the fallback for null/invalid', () => {
    expect(formatInstant(null)).toBe('—')
    expect(formatInstant('')).toBe('—')
    expect(formatInstant('not-a-time')).toBe('—')
    expect(formatInstant(null, 'never')).toBe('never')
    expect(dayOfInstant('not-a-time')).toBeNull()
  })

  // ⚠️ The twin of formatDate's refusal, and the more dangerous direction: `new Date('2026-07-25')`
  // is UTC midnight, so projecting a date-only value onto a local day renders the *previous* day
  // west of UTC — the exact off-by-one this seam exists to kill.
  it('REFUSES a bare date-only value: it is not a moment and must not be projected', () => {
    localZone.current = 'America/Los_Angeles'
    expect(formatInstant('2026-07-25')).toBe('—')
    expect(dayOfInstant('2026-07-25')).toBeNull()
  })
})

describe('parseUserDate', () => {
  it('parses ISO YYYY-MM-DD', () => {
    expect(toISO(parseUserDate('2027-06-15'))).toBe('2027-06-15')
  })
  it('parses forgiving US M/D/YYYY and MM/DD/YYYY', () => {
    expect(toISO(parseUserDate('6/15/2027'))).toBe('2027-06-15')
    expect(toISO(parseUserDate('06/15/2027'))).toBe('2027-06-15')
    expect(toISO(parseUserDate('  1/1/2027  '))).toBe('2027-01-01')
  })
  it('returns null for empty input', () => {
    expect(parseUserDate('')).toBeNull()
    expect(parseUserDate('   ')).toBeNull()
  })
  it('rejects out-of-range and unparseable input', () => {
    expect(parseUserDate('13/45/2027')).toBeNull() // month/day out of range
    expect(parseUserDate('2027-02-30')).toBeNull() // Feb 30
    expect(parseUserDate('next tuesday')).toBeNull()
    expect(parseUserDate('2027/06/15')).toBeNull() // wrong separators for ISO
  })

  // ADR-0816 §1 — eight bare digits are CCYYMMDD and nothing else.
  it('parses exactly eight bare digits as CCYYMMDD', () => {
    expect(toISO(parseUserDate('20270615'))).toBe('2027-06-15')
    expect(toISO(parseUserDate('20260101'))).toBe('2026-01-01')
    expect(toISO(parseUserDate('  20261231  '))).toBe('2026-12-31')
  })
  it('fails loudly on MMDDYYYY rather than silently meaning another date', () => {
    // 06/15/2027 typed as MMDDYYYY. Read as CCYYMMDD this is year 0615, month 20 — invalid, so
    // it returns null instead of committing a date the user did not mean.
    expect(parseUserDate('06152027')).toBeNull()
    expect(parseUserDate('12312026')).toBeNull() // month 20 again
  })
  it('refuses six digits (YYMMDD), which would mis-commit halfway through typing eight', () => {
    expect(parseUserDate('270615')).toBeNull()
    expect(parseUserDate('260101')).toBeNull()
  })
  it('validates ranges inside the compact form', () => {
    expect(parseUserDate('20270230')).toBeNull() // Feb 30
    expect(parseUserDate('20271301')).toBeNull() // month 13
  })
  it('rejects digit runs of any other length', () => {
    for (const s of ['2', '2027', '2027061', '202706150', '202706155']) {
      expect(parseUserDate(s)).toBeNull()
    }
  })

  // The live commit in DatePicker's `onChange` is only safe because no prefix of a valid input is
  // itself valid — otherwise typing would commit a date the user had not finished typing.
  it('no proper prefix of an accepted input is itself accepted', () => {
    for (const complete of ['2027-06-15', '20270615', '06/15/2027']) {
      for (let i = 1; i < complete.length; i++) {
        const prefix = complete.slice(0, i)
        expect(parseUserDate(prefix), `prefix "${prefix}" of "${complete}"`).toBeNull()
      }
    }
  })

  // What the picker shows must survive being re-parsed — this is why the display went ISO.
  it('round-trips whatever the picker displays: parse(display(iso)) === iso', () => {
    for (const iso of ['2027-06-15', '2026-01-01', '2026-12-31', '2024-02-29']) {
      // The picker displays the ISO value verbatim (DatePicker `displayValue`).
      expect(toISO(parseUserDate(iso))).toBe(iso)
    }
  })
})

describe('formatDateTime', () => {
  it('renders a date and time for a valid timestamp', () => {
    const out = formatDateTime('2027-03-15T09:04:00Z')
    expect(out).toContain('2027')
    expect(out).toMatch(/\d:\d{2}/) // has a clock time
  })
  it('appends a zone name when requested', () => {
    const withZone = formatDateTime('2027-03-15T09:04:00Z', { timeZoneName: true })
    // The zone abbreviation varies by runner locale/zone; assert it is strictly longer than
    // the zone-less rendering rather than pinning a specific abbreviation.
    const withoutZone = formatDateTime('2027-03-15T09:04:00Z')
    expect(withZone.length).toBeGreaterThan(withoutZone.length)
  })
  it('returns the fallback for null/invalid', () => {
    expect(formatDateTime(null)).toBe('—')
    expect(formatDateTime('not-a-time')).toBe('—')
  })
})
