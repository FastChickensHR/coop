import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Pagination } from '.'
import { renderWithTheme } from '../../test-utils'

describe('Pagination', () => {
  it('marks only the current page as current', () => {
    renderWithTheme(<Pagination page={3} pageCount={5} onPageChange={() => {}} />)
    const current = screen.getAllByRole('button').filter((button) => button.hasAttribute('aria-current'))
    expect(current).toHaveLength(1)
    expect(current[0]).toHaveTextContent('3')
  })

  it('reports the picked page and clamps the arrows at the ends', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    renderWithTheme(<Pagination page={1} pageCount={4} onPageChange={onPageChange} />)
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: '4' }))
    expect(onPageChange).toHaveBeenCalledWith(4)
    await user.click(screen.getByRole('button', { name: 'Next page' }))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('renders nothing for a single page', () => {
    renderWithTheme(<Pagination page={1} pageCount={1} onPageChange={() => {}} />)
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })
})
