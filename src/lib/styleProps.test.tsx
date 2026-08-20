import type { ReactNode } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import {
  lightTheme,
  Alert,
  Badge,
  Button,
  Card,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Skeleton,
  Spinner,
  StatusMessage,
  Table,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
} from '../index'

// Coop's style-only props carry clean public names (coop#18) — `variant`,
// `size`, `hasError`… — but styled-components only strips `$`-prefixed props on
// the way to the DOM, so every one of them needs an explicit block (a
// `blockStyleProps` predicate, or a wrapper that destructures it out). Forget
// one and the prop lands as an unknown DOM attribute plus a React console
// warning — invisible in a type check and easy to miss in review. This test
// renders every component carrying a renamed prop and fails on the leak.
//
// It discriminates: dropping any single `shouldForwardProp` fails it.

const wrap = (ui: ReactNode) => <ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>

describe('clean style props never reach the DOM', () => {
  it('renders every component with a renamed prop, leaking nothing', () => {
    const err = vi.spyOn(console, 'error').mockImplementation(() => {})
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const { container } = render(
      wrap(
        <>
          <Button variant="danger" size="lg">
            b
          </Button>
          <Alert variant="warning">a</Alert>
          <Badge variant="active">x</Badge>
          <Card interactive>c</Card>
          <Skeleton radius="4px" />
          <Spinner size="lg" color="red" />
          <StatusMessage status="error">m</StatusMessage>
          <Input hasError />
          <Textarea hasError />
          <Table>
            <Thead>
              <Tr interactive>
                <Th noBorder align="right">
                  h
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr interactive>
                <Td noBorder align="center" mono muted>
                  d
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <DropdownMenu open>
            <DropdownMenuTrigger>t</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem danger>i</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>,
      ),
    )

    // The menu content portals outside `container`, so scan the whole document.
    const html = document.body.innerHTML
    for (const attr of [
      'variant',
      'interactive',
      'noborder',
      'mono=',
      'muted=',
      'radius',
      'haserror',
      'danger',
      'status=',
    ]) {
      expect(html.includes(attr), `"${attr}" leaked to the DOM`).toBe(false)
    }

    // `size`, `color` and `align` ARE real HTML attributes on some elements, so
    // assert their absence on the specific elements Coop blocks them for.
    expect(container.querySelector('button[size]')).toBeNull()
    expect(container.querySelector('span[size]')).toBeNull()
    expect(container.querySelector('span[color]')).toBeNull()
    expect(container.querySelector('th[align]')).toBeNull()
    expect(container.querySelector('td[align]')).toBeNull()

    const noisy = [...err.mock.calls, ...warn.mock.calls]
      .map((c) => String(c[0]))
      .filter((c) => /unknown prop|non-boolean attribute|React does not recognize/i.test(c))
    expect(noisy).toEqual([])

    err.mockRestore()
    warn.mockRestore()
  })
})
