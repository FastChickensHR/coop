import { styled } from 'styled-components'

/**
 * Key/value facts about a single thing (ADR-0175) — a details panel, a summary
 * card's body. A semantic `<dl>`: pair each `DescriptionTerm` (`<dt>`) with a
 * `DescriptionDetails` (`<dd>`). Prefer this over a two-column Table when the
 * data is one entity's attributes rather than a list of records. Styled-only.
 */
export const DescriptionList = styled.dl`
  display: grid;
  grid-template-columns: minmax(8rem, 12rem) 1fr;
  gap: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  margin: 0;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xs} 0;
  }
`

export const DescriptionTerm = styled.dt`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
`

export const DescriptionDetails = styled.dd`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.ink};
  margin: 0;

  @media (max-width: 480px) {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`
