import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderWithTheme } from '../../test-utils'
import { DateRangePicker } from './index'

/**
 * Unit characterization for the pair's coupling (#1229) — the interaction depth lives in the
 * required e2e-ui suites (date-picker.spec, range-chips.spec); this pins what jsdom can see:
 * the linked bounds and the chips' gating.
 */
describe('DateRangePicker (characterization, #1229)', () => {
  it('renders both edges under their accessible names', () => {
    renderWithTheme(<DateRangePicker />)
    expect(screen.getByLabelText('Start date')).toBeInTheDocument()
    expect(screen.getByLabelText('End date')).toBeInTheDocument()
  })

  it('the end cannot precede the start: a typed earlier end refuses loudly', async () => {
    const onEndChange = vi.fn()
    renderWithTheme(<DateRangePicker start={{ value: "2026-08-10" }} end={{ onValueChange: onEndChange }} />)
    const end = screen.getByLabelText('End date')
    await userEvent.type(end, '2026-08-01')
    await userEvent.tab()
    expect(onEndChange).not.toHaveBeenCalledWith('2026-08-01')
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('an in-range end commits', async () => {
    const onEndChange = vi.fn()
    renderWithTheme(<DateRangePicker start={{ value: "2026-08-10" }} end={{ onValueChange: onEndChange }} />)
    await userEvent.type(screen.getByLabelText('End date'), '2026-08-20')
    await userEvent.tab()
    expect(onEndChange).toHaveBeenCalledWith('2026-08-20')
  })

  it('the period chips appear only when onRangeChange is supplied (ADR-0816 §7)', () => {
    const { unmount } = renderWithTheme(<DateRangePicker />)
    expect(screen.queryByRole('toolbar', { name: 'Set both dates' })).not.toBeInTheDocument()
    unmount()
    renderWithTheme(<DateRangePicker onRangeChange={() => {}} />)
    expect(screen.getByRole('toolbar', { name: 'Set both dates' })).toBeInTheDocument()
  })
})
