import styled from 'styled-components'

export interface CardProps {
  /** Adds hover affordance (pointer cursor + lift) for a whole-card click target. */
  $interactive?: boolean
}

/**
 * A surface that groups related content (ADR-0175) — a bordered, padded panel.
 * Compose with the parts: `Card` › `CardHeader` (`CardTitle` + `CardActions`) ›
 * `CardBody` › `CardFooter`. Use a Card to group one thing's content on a page;
 * for the page shell itself use `PageContainer`, and for a full data grid use
 * `Table`. Styled-only (no logic) so it drops into any layout.
 */
export const Card = styled.div<CardProps>`
  background-color: ${({ theme }) => theme.colors.canvas};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.card};
  overflow: hidden;

  ${({ theme, $interactive }) =>
    $interactive &&
    `
    cursor: pointer;
    transition: border-color ${theme.motion.duration.fast} ${theme.motion.easing.standard},
      box-shadow ${theme.motion.duration.fast} ${theme.motion.easing.standard};
    &:hover {
      border-color: ${theme.colors.borderStrong};
      box-shadow: ${theme.boxShadow.pop};
    }
  `}
`

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.ink};
  margin: 0;
`

export const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-shrink: 0;
`

export const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
`
