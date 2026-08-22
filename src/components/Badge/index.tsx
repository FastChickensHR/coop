import { styled, css } from 'styled-components'
import { blockStyleProps } from '../../lib/styleProps'

/**
 * The generic tone vocabulary (#1235): filled tones follow Alert's error/info/success/warning
 * house model, `outline-*` are the quieter bordered form. Domain words (statuses, EDI
 * directions) live in the APP, which maps its vocabulary onto a tone at the call site —
 * coop is published under MIT and speaks only generic UI language (docs/code-style.md,
 * Naming 3).
 */
export type BadgeTone =
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral'
  | 'outline-info'
  | 'outline-success'
  | 'outline-neutral'

export interface BadgeProps {
  /** Filled tone (success/warning/error/neutral) or quiet outline form. @default 'outline-neutral' */
  variant?: BadgeTone
}

const variantStyles: Record<BadgeTone, ReturnType<typeof css>> = {
  // Filled — soft ground, strong text
  success: css`
    background-color: ${({ theme }) => theme.colors.successSoft};
    color: ${({ theme }) => theme.colors.success};
    border: none;
  `,
  warning: css`
    background-color: ${({ theme }) => theme.colors.warningSoft};
    color: ${({ theme }) => theme.colors.warning};
    border: none;
  `,
  error: css`
    background-color: ${({ theme }) => theme.colors.errorSoft};
    color: ${({ theme }) => theme.colors.error};
    border: none;
  `,
  neutral: css`
    background-color: ${({ theme }) => theme.colors.surface2};
    color: ${({ theme }) => theme.colors.muted};
    border: none;
  `,
  // Outline — transparent ground, bordered
  'outline-info': css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.info};
    border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  `,
  'outline-success': css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.success};
    border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  `,
  'outline-neutral': css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.muted};
    border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  `,
}

/**
 * A small rounded label for a state or category (ADR-0175). Pick a filled tone for statuses
 * the reader should feel (success/warning/error/neutral) and an `outline-*` tone for quiet
 * directional or categorical tags. One line of content; use Chip for removable selections.
 */
export const Badge = styled.span.withConfig({
  shouldForwardProp: blockStyleProps('variant'),
})<BadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  height: 28px;
  padding: 0 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  white-space: nowrap;

  ${({ variant = 'outline-neutral' }) => variantStyles[variant]}
`
