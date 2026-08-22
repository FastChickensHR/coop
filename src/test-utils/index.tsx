import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '../theme'

/** Coop's mandatory test-utils (#1222, docs/code-style.md Tests 2): the theme wrap every
 *  component test needs, declared once. Ships in the repo mirror like the tests themselves;
 *  excluded from the declaration build. */
export function renderWithTheme(ui: ReactElement) {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>)
}
