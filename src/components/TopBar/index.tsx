import { styled, css } from 'styled-components'

/**
 * The shared top-bar chrome (ADR compositional-layout-primitives): 4rem tall,
 * `canvas` ground, `border` bottom, a space-between flex row. Opt into
 * `$sticky` for bars that scroll with the page (marketing) rather than sitting
 * in a fixed layout column (the app shell).
 *
 * Intentionally-dark surfaces (sidebar, footer) are NOT this — they follow the
 * documented fixed-dark recipe (the fixed ink scale: `ink900` ground,
 * `ink300`/`ink50` text).
 */
export const TopBar = styled.header<{ $sticky?: boolean }>`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 1.5rem;
  background-color: ${({ theme }) => theme.colors.canvas};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;

  ${({ $sticky }) =>
    $sticky &&
    css`
      position: sticky;
      top: 0;
      z-index: 40;
    `}
`
