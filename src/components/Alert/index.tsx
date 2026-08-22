import { styled, css } from 'styled-components'
import { blockStyleProps } from '../../lib/styleProps'

/** Semantic severity of an {@link Alert} — traffic-light vocabulary (ADR-0157). */
export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

/** Props for {@link Alert}. */
export interface AlertProps {
  /** Semantic severity — info / success / warning / error (traffic-light, ADR-0157). @default 'info' */
  variant?: AlertVariant
}

const variantStyles = {
  info: css`
    background-color: ${({ theme }) => theme.colors.infoSoft};
    border-left-color: ${({ theme }) => theme.colors.info};
    color: ${({ theme }) => theme.colors.info};
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.successSoft};
    border-left-color: ${({ theme }) => theme.colors.success};
    color: ${({ theme }) => theme.colors.success};
  `,
  warning: css`
    background-color: ${({ theme }) => theme.colors.warningSoft};
    border-left-color: ${({ theme }) => theme.colors.warning};
    color: ${({ theme }) => theme.colors.warning};
  `,
  error: css`
    background-color: ${({ theme }) => theme.colors.errorSoft};
    border-left-color: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.error};
  `,
}

/**
 * Inline callout for something the reader should notice, framed by severity. Compose from
 * {@link AlertIcon}, {@link AlertBody}, {@link AlertTitle} and {@link AlertMessage}.
 */
export const Alert = styled.div.withConfig({
  shouldForwardProp: blockStyleProps('variant'),
})<AlertProps>`
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border-left: 3px solid;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.sm};

  ${({ variant = 'info' }) => variantStyles[variant]}
`

/** The Alert's leading icon slot, top-aligned to the first text line. */
export const AlertIcon = styled.span`
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  padding-top: 1px;
  width: 1rem;
  height: 1rem;
`

/** The Alert's text column — holds {@link AlertTitle} and {@link AlertMessage}. */
export const AlertBody = styled.div`
  flex: 1;
  min-width: 0;
`

/** One-line heading of an Alert. */
export const AlertTitle = styled.p`
  margin: 0 0 0.125rem;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-size: ${({ theme }) => theme.fontSize.sm};
`

/** The Alert's body copy. */
export const AlertMessage = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.sm};
  opacity: 0.9;
`
