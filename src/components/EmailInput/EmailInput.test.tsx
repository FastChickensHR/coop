import type { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components'
import { EmailInput } from '.'
import { FormField } from '../FormField'
import { lightTheme } from '../../theme'

function renderField(node: ReactNode) {
  return render(<ThemeProvider theme={lightTheme}>{node}</ThemeProvider>)
}

describe('EmailInput', () => {
  it('says nothing while you are still typing', async () => {
    const user = userEvent.setup()
    renderField(<EmailInput aria-label="Your email" />)

    await user.type(screen.getByLabelText('Your email'), 'not-an-address')

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('speaks on the way out of the box, without waiting for the form to be sent', async () => {
    const user = userEvent.setup()
    renderField(<EmailInput aria-label="Your email" />)

    await user.type(screen.getByLabelText('Your email'), 'not-an-address')
    await user.tab()

    expect(screen.getByRole('alert')).toHaveTextContent('name@example.com')
    expect(screen.getByLabelText('Your email')).toHaveAttribute('aria-invalid', 'true')
  })

  it('stops the moment the address looks right, without leaving the box again', async () => {
    const user = userEvent.setup()
    renderField(<EmailInput aria-label="Your email" />)
    const field = screen.getByLabelText('Your email')

    await user.type(field, 'not-an-address')
    await user.tab()
    expect(screen.getByRole('alert')).toBeInTheDocument()

    await user.type(field, '@example.com')

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('says nothing about an empty box — that is the form’s business, not the format’s', async () => {
    const user = userEvent.setup()
    renderField(<EmailInput aria-label="Your email" />)

    await user.click(screen.getByLabelText('Your email'))
    await user.tab()

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('keeps quiet when the form already has something to say about the field', async () => {
    const user = userEvent.setup()
    renderField(
      <FormField label="Your email" error="That address is already registered">
        <EmailInput />
      </FormField>,
    )

    await user.type(screen.getByLabelText('Your email'), 'not-an-address')
    await user.tab()

    expect(screen.getAllByRole('alert')).toHaveLength(1)
    expect(screen.getByRole('alert')).toHaveTextContent('already registered')
  })
})
