import type { ReactElement } from 'react'
import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PageHeading } from './PageHeading'
import { renderWithTheme } from '../../test-utils'

const wrap = (ui: ReactElement) => renderWithTheme(ui)

describe('PageHeading', () => {
  it('renders the title as the page heading', () => {
    wrap(<PageHeading title="Transmissions" />)
    expect(screen.getByRole('heading', { name: 'Transmissions' })).toBeInTheDocument()
  })

  it('renders subtitle and actions when provided', () => {
    wrap(
      <PageHeading
        title="Open Enrollment"
        subtitle="Set the enrollment window"
        actions={<button type="button">Add plan year</button>}
      />,
    )
    expect(screen.getByText('Set the enrollment window')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add plan year' })).toBeInTheDocument()
  })

  it('omits subtitle and actions when not provided', () => {
    wrap(<PageHeading title="Bare" />)
    expect(screen.getByRole('heading', { name: 'Bare' })).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
