import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderWithTheme } from '../../test-utils'
import { Combobox } from './index'

const OPTIONS = [
  { value: 'ks', label: 'Kansas' },
  { value: 'mo', label: 'Missouri' },
  { value: 'ne', label: 'Nebraska' },
]

describe('Combobox — single select (characterization, #1229)', () => {
  it('typing filters the list case-insensitively and picking commits the value', async () => {
    const onValueChange = vi.fn()
    renderWithTheme(<Combobox aria-label="State" options={OPTIONS} onValueChange={onValueChange} />)
    await userEvent.type(screen.getByRole('combobox'), 'kan')
    const list = screen.getByRole('listbox')
    expect(within(list).getAllByRole('option')).toHaveLength(1)
    await userEvent.click(within(list).getByRole('option', { name: 'Kansas' }))
    expect(onValueChange).toHaveBeenCalledWith('ks')
    // Picking closes the list in single mode.
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('the selected value renders as its label when closed', () => {
    renderWithTheme(<Combobox aria-label="State" options={OPTIONS} value="mo" />)
    expect(screen.getByRole('combobox')).toHaveValue('Missouri')
  })

  it('arrows walk the list and Enter picks the highlighted option', async () => {
    const onValueChange = vi.fn()
    renderWithTheme(<Combobox aria-label="State" options={OPTIONS} onValueChange={onValueChange} />)
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    await userEvent.keyboard('{ArrowDown}{Enter}')
    expect(onValueChange).toHaveBeenCalledWith('mo')
  })

  it('an unmatched query says No matches', async () => {
    renderWithTheme(<Combobox aria-label="State" options={OPTIONS} />)
    await userEvent.type(screen.getByRole('combobox'), 'zz')
    expect(screen.getByText('No matches')).toBeInTheDocument()
  })
})

describe('Combobox — multi select (characterization, #1229)', () => {
  it('picking toggles membership, renders chips, and keeps the list open', async () => {
    const onValuesChange = vi.fn()
    renderWithTheme(
      <Combobox aria-label="States" multiple values={['ks']} onValuesChange={onValuesChange} options={OPTIONS} />,
    )
    expect(screen.getByText('Kansas')).toBeInTheDocument() // the chip
    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(screen.getByRole('option', { name: 'Missouri' }))
    expect(onValuesChange).toHaveBeenCalledWith(['ks', 'mo'])
    expect(screen.getByRole('listbox')).toBeInTheDocument() // stays open
    // Picking an already-selected value removes it.
    await userEvent.click(screen.getByRole('option', { name: /Kansas/ }))
    expect(onValuesChange).toHaveBeenCalledWith([])
  })

  it('Backspace in an empty query removes the last chip', async () => {
    const onValuesChange = vi.fn()
    renderWithTheme(
      <Combobox aria-label="States" multiple values={['ks', 'mo']} onValuesChange={onValuesChange} options={OPTIONS} />,
    )
    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.keyboard('{Backspace}')
    expect(onValuesChange).toHaveBeenCalledWith(['ks'])
  })
})

describe('Combobox — creatable and async (characterization, #1229)', () => {
  it('an unmatched query offers Create and commits the typed text', async () => {
    const onCreate = vi.fn()
    const onValueChange = vi.fn()
    renderWithTheme(
      <Combobox aria-label="Carrier" creatable options={OPTIONS} onCreate={onCreate} onValueChange={onValueChange} />,
    )
    await userEvent.type(screen.getByRole('combobox'), 'Aetna')
    await userEvent.click(screen.getByRole('option', { name: /Create/ }))
    expect(onCreate).toHaveBeenCalledWith('Aetna')
    expect(onValueChange).toHaveBeenCalledWith('Aetna')
  })

  it('onSearch fires with the settled query, and the loading row shows', async () => {
    const onSearch = vi.fn()
    renderWithTheme(
      <Combobox aria-label="Employee" options={[]} onSearch={onSearch} loading debounceMs={0} />,
    )
    await userEvent.type(screen.getByRole('combobox'), 'ada')
    await waitFor(() => expect(onSearch).toHaveBeenCalledWith('ada'))
    expect(screen.getByText('Searching…')).toBeInTheDocument()
  })
})
