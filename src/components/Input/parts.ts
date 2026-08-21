import { styled } from 'styled-components'
import { blockStyleProps } from '../../lib/styleProps'
import type { FieldStatus } from '../FormField/context'

/** Inline error message styling, shared by FormField and standalone forms. */
export const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.error};
  margin: 0;
`

/**
 * Inline validation message coloured by semantic status (ADR-0157): red / yellow
 * / green for error / warning / success. Used by FormField for all three states.
 */
export const StatusMessage = styled.p.withConfig({
  shouldForwardProp: blockStyleProps('status'),
})<{ status: FieldStatus }>`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme, status }) => theme.colors[status]};
  margin: 0;
`

/** Lightweight vertical label+control+error stack for hand-laid-out forms. */
export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`
