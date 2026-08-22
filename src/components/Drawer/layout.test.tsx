import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { describe, it, expect } from 'vitest'
import { lightTheme } from '@fastchickenshr/coop'
import { DrawerBody, DrawerSection, DrawerField } from './layout'

describe('Drawer body primitives', () => {
  it('renders a body of sections and fields', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <DrawerBody>
          <DrawerSection title="Delivery">
            <DrawerField label="Host">sftp.acme.com</DrawerField>
            <DrawerField label="Port">22</DrawerField>
          </DrawerSection>
        </DrawerBody>
      </ThemeProvider>,
    )
    expect(screen.getByText('Delivery')).toBeInTheDocument()
    expect(screen.getByText('Host')).toBeInTheDocument()
    expect(screen.getByText('sftp.acme.com')).toBeInTheDocument()
    expect(screen.getByText('Port')).toBeInTheDocument()
    expect(screen.getByText('22')).toBeInTheDocument()
  })

  it('omits the section label when no title is given', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <DrawerSection>
          <span>bare</span>
        </DrawerSection>
      </ThemeProvider>,
    )
    expect(screen.getByText('bare')).toBeInTheDocument()
    // no heading rendered without a title
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })
})
