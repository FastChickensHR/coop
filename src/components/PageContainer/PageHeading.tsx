import type { ReactNode } from 'react'
import { styled } from 'styled-components'
import { PageHeader, PageTitle, PageSubtitle, PageActions } from './index'

// Stacks the title + subtitle as one flex item, so a subtitle never becomes a
// third item competing with the actions (ADR compositional-layout-primitives).
const HeadingText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`

/**
 * The one sanctioned page header: title + optional subtitle (stacked left) +
 * optional actions (right, top-aligned). Replaces the ad-hoc HeaderLeft /
 * TitleGroup / HeaderRight wrappers pages used to hand-roll.
 */
export function PageHeading({
  title,
  subtitle,
  actions,
}: {
  title: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
}) {
  return (
    <PageHeader>
      <HeadingText>
        <PageTitle>{title}</PageTitle>
        {subtitle != null && <PageSubtitle>{subtitle}</PageSubtitle>}
      </HeadingText>
      {actions != null && <PageActions>{actions}</PageActions>}
    </PageHeader>
  )
}
