import styled from 'styled-components'
import type { ReactNode } from 'react'

export interface EmptyStateProps {
  /** Optional leading icon/illustration (e.g. a heroicon). */
  icon?: ReactNode
  /** Short, specific heading — say what's empty ("No integrations yet"). */
  title: ReactNode
  /** One line on what to do about it. */
  description?: ReactNode
  /** Optional primary action (a Button). */
  action?: ReactNode
  className?: string
}

/**
 * The "nothing here yet" state for an empty list, table, or panel (ADR-0175).
 * A calm, centred block — an optional icon, a specific title, a line of
 * guidance, and (ideally) the action that fills it. Prefer this over a bare
 * "No data" string: an empty state is an opportunity to tell the user what to
 * do next.
 */
export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <Root className={className}>
      {icon && <IconWrap aria-hidden="true">{icon}</IconWrap>}
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {action && <Actions>{action}</Actions>}
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.muted};
`

const IconWrap = styled.div`
  color: ${({ theme }) => theme.colors.subtle};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`

const Title = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.ink};
  margin: 0;
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  max-width: 40ch;
  line-height: ${({ theme }) => theme.lineHeight.relaxed};
  margin: 0;
`

const Actions = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`
