import { styled } from 'styled-components'
import { pageEnterAnimation } from '../../theme/motion'
import { pageTitleType } from '../../theme/typography'

/**
 * The page's outer width-and-padding shell; content fades in on entry via the shared
 * `pageEnterAnimation` (ADR-0081).
 */
export const PageContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  width: 100%;
  padding: 1.5rem 1rem;
  ${pageEnterAnimation}

  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem 4rem;
  }
`

/** Title row at the top of a page: the heading stack left, {@link PageActions} right. */
export const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
`

/** The page's `h1`, on the page-title type role. */
export const PageTitle = styled.h1`
  ${pageTitleType}
  color: ${({ theme }) => theme.colors.ink};
  margin: 0;
`

/** One muted line under a {@link PageTitle}. */
export const PageSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
`

/** Right-aligned action cluster inside a {@link PageHeader}. */
export const PageActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`
