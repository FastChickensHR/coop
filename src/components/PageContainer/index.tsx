import { styled } from 'styled-components'
import { pageEnterAnimation } from '../../theme/motion'
import { pageTitleType } from '../../theme/typography'

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

export const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
`

export const PageTitle = styled.h1`
  ${pageTitleType}
  color: ${({ theme }) => theme.colors.ink};
  margin: 0;
`

export const PageSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
`

export const PageActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`
