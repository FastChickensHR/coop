import styled from 'styled-components'

// Shared table primitives (ADR-0075). Replaces the ~14 hand-rolled `styled.table`/`Th`/`Td` sets
// with one consistent set. Compose them like native table elements:
//   <TableScroll><Table><Thead><Tr><Th>…</Th></Tr></Thead><Tbody>…</Tbody></Table></TableScroll>
// Variants: `$interactive` rows (pointer + hover), `$noBorder` cells (for timeline connector rows),
// `$align` on Th/Td.

/** Horizontal-scroll wrapper so wide tables never overflow the page body. */
export const TableScroll = styled.div`
  overflow-x: auto;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSize.sm};
`

export const Thead = styled.thead`
  background-color: ${({ theme }) => theme.colors.surface};
`

export const Tbody = styled.tbody``

export const Tr = styled.tr<{ $interactive?: boolean }>`
  cursor: ${({ $interactive }) => ($interactive ? 'pointer' : 'default')};
  ${({ $interactive, theme }) =>
    $interactive && `&:hover { background-color: ${theme.colors.surface}; }`}
`

type Align = 'left' | 'right' | 'center'

export const Th = styled.th<{ $noBorder?: boolean; $align?: Align }>`
  padding: 0.75rem 1rem;
  text-align: ${({ $align }) => $align ?? 'left'};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.muted};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.05em;
  border-bottom: ${({ theme, $noBorder }) =>
    $noBorder ? 'none' : `1px solid ${theme.colors.border}`};
`

export const Td = styled.td<{ $noBorder?: boolean; $align?: Align }>`
  padding: 0.75rem 1rem;
  text-align: ${({ $align }) => $align ?? 'left'};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  color: ${({ theme }) => theme.colors.ink};
  vertical-align: middle;
  border-bottom: ${({ theme, $noBorder }) =>
    $noBorder ? 'none' : `1px solid ${theme.colors.border}`};
`
