import { describe, expect, it } from 'vitest'
import { CalendarDate } from '@internationalized/date'
import { gridMove, monthMatrix, resolveDateInput } from './model'

const opts = { edge: 'start' as const }

describe('resolveDateInput', () => {
  it('resolves the three accepted date shapes to ISO', () => {
    expect(resolveDateInput('2026-08-22', opts)).toEqual({ kind: 'date', iso: '2026-08-22' })
    expect(resolveDateInput('20260822', opts)).toEqual({ kind: 'date', iso: '2026-08-22' })
    expect(resolveDateInput('08/22/2026', opts)).toEqual({ kind: 'date', iso: '2026-08-22' })
  })

  it('empty (or whitespace) input is the empty resolution — cleared, not an error', () => {
    expect(resolveDateInput('', opts)).toEqual({ kind: 'empty' })
    expect(resolveDateInput('   ', opts)).toEqual({ kind: 'empty' })
  })

  it('an in-range date passes and an out-of-range one refuses loudly (ADR-0816)', () => {
    const bounded = { ...opts, min: '2026-01-01', max: '2026-12-31' }
    expect(resolveDateInput('2026-06-15', bounded)).toEqual({ kind: 'date', iso: '2026-06-15' })
    expect(resolveDateInput('2027-06-15', bounded)).toEqual({ kind: 'invalid' })
  })

  it('letters go through the quick-pick door (§5): a token resolves to its pick value', () => {
    const resolved = resolveDateInput('t', opts)
    expect(resolved.kind).toBe('pick')
  })

  it('garbage is invalid', () => {
    expect(resolveDateInput('zzz', opts)).toEqual({ kind: 'invalid' })
    expect(resolveDateInput('2026-13-45', opts)).toEqual({ kind: 'invalid' })
  })
})

describe('gridMove', () => {
  const from = new CalendarDate(2026, 8, 22)

  it.each([
    ['ArrowLeft', '2026-08-21'],
    ['ArrowRight', '2026-08-23'],
    ['ArrowUp', '2026-08-15'],
    ['ArrowDown', '2026-08-29'],
    ['PageUp', '2026-07-22'],
    ['PageDown', '2026-09-22'],
    ['Home', '2026-08-01'],
  ])('%s moves to %s', (key, expected) => {
    expect(gridMove(key, from)?.toString()).toBe(expected)
  })

  it('keys the grid does not own return null (Tab stays the component’s concern)', () => {
    expect(gridMove('Tab', from)).toBeNull()
    expect(gridMove('Escape', from)).toBeNull()
  })
})

describe('monthMatrix', () => {
  it('starts on the leading Sunday and covers whole weeks', () => {
    const cells = monthMatrix(new CalendarDate(2026, 8, 1))
    expect(cells.length % 7).toBe(0)
    expect(cells[0].toString()).toBe('2026-07-26') // Aug 1 2026 is a Saturday; grid leads back to Sunday
    expect(cells.some((d) => d.toString() === '2026-08-31')).toBe(true)
  })
})
