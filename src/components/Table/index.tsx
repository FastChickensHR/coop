import { styled } from 'styled-components'
import { blockStyleProps } from '../../lib/styleProps'

// Shared table primitives (ADR-0075). Replaces the ~14 hand-rolled `styled.table`/`Th`/`Td` sets
// with one consistent set. Compose them like native table elements:
//   <TableScroll><Table><Thead><Tr><Th>…</Th></Tr></Thead><Tbody>…</Tbody></Table></TableScroll>
// Variants: `interactive` rows (pointer + hover), `noBorder` cells, `align` on Th/Td, and
// `mono` / `muted` cell treatments. `Timeline` is a table variant that owns its own alignment +
// row styling (see below).

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

export const Tr = styled.tr.withConfig({
  shouldForwardProp: blockStyleProps('interactive'),
})<{ interactive?: boolean }>`
  cursor: ${({ interactive }) => (interactive ? 'pointer' : 'default')};
  ${({ interactive, theme }) =>
    interactive && `&:hover { background-color: ${theme.colors.surface}; }`}
`

type Align = 'left' | 'right' | 'center'

export const Th = styled.th.withConfig({
  shouldForwardProp: blockStyleProps('noBorder', 'align'),
})<{ noBorder?: boolean; align?: Align }>`
  padding: 0.75rem 1rem;
  text-align: ${({ align }) => align ?? 'left'};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.muted};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.05em;
  border-bottom: ${({ theme, noBorder }) =>
    noBorder ? 'none' : `1px solid ${theme.colors.border}`};
`

// Orthogonal cell variants: `mono` = a monospace data cell (dates, codes) — small, non-wrapping,
// but NOT recoloured; `muted` = secondary/muted colour. Compose them: a muted mono cell is
// `mono muted`, an ink mono cell (e.g. a filename) is just `mono`.
export const Td = styled.td.withConfig({
  shouldForwardProp: blockStyleProps('noBorder', 'align', 'mono', 'muted'),
})<{ noBorder?: boolean; align?: Align; mono?: boolean; muted?: boolean }>`
  padding: 0.75rem 1rem;
  text-align: ${({ align }) => align ?? 'left'};
  font-family: ${({ theme, mono }) =>
    mono ? theme.typography.fontFamily.mono : theme.typography.fontFamily.sans};
  font-size: ${({ theme, mono, muted }) => (mono || muted ? theme.fontSize.xs : theme.fontSize.sm)};
  color: ${({ theme, muted }) => (muted ? theme.colors.muted : theme.colors.ink)};
  white-space: ${({ mono, muted }) => (mono || muted ? 'nowrap' : 'normal')};
  vertical-align: middle;
  border-bottom: ${({ theme, noBorder }) =>
    noBorder ? 'none' : `1px solid ${theme.colors.border}`};
`

// A timeline table: every effective-dated version of each row, newest on top, older versions on a
// muted surface. It OWNS its layout so pages don't restyle cells — content is centred, the identity
// column (mark its Th/Td `data-identity`) stays left, the action column (`data-action`) sits tight
// on the right, and past-version rows (`data-past` on the <Tr>) read muted. Compose it with the
// same Thead/Tbody/Tr/Th/Td; mark the value column's cells `mono` (or `muted`).
export const Timeline = styled(Table)`
  th,
  td {
    text-align: center;
  }

  th[data-identity],
  td[data-identity] {
    text-align: left;
  }

  th[data-action],
  td[data-action] {
    width: 1px;
    white-space: nowrap;
    text-align: right;
  }

  tbody tr:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }

  tbody tr[data-past] {
    background-color: ${({ theme }) => theme.colors.surface};
  }

  tbody tr[data-past]:hover {
    background-color: ${({ theme }) => theme.colors.surface2};
  }
`
