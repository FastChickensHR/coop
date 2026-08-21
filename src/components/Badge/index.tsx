import { styled, css } from 'styled-components'
import { blockStyleProps } from '../../lib/styleProps'

// Status variants — filled soft-color background (Active/Pending/Terminated/Draft)
type StatusVariant = 'active' | 'pending' | 'terminated' | 'draft'

// Tag variants — outline only (Inbound/Outbound/Default directional labels)
type TagVariant = 'inbound' | 'outbound' | 'default'

type BadgeVariant = StatusVariant | TagVariant

export interface BadgeProps {
  /** Status or tag style (active/pending/terminated/draft/inbound/outbound). @default 'default' */
  variant?: BadgeVariant
}

const statusStyles = {
  active: css`
    background-color: ${({ theme }) => theme.colors.successSoft};
    color: ${({ theme }) => theme.colors.success};
    border: none;
  `,
  pending: css`
    background-color: ${({ theme }) => theme.colors.warningSoft};
    color: ${({ theme }) => theme.colors.warning};
    border: none;
  `,
  terminated: css`
    background-color: ${({ theme }) => theme.colors.errorSoft};
    color: ${({ theme }) => theme.colors.error};
    border: none;
  `,
  draft: css`
    background-color: ${({ theme }) => theme.colors.surface2};
    color: ${({ theme }) => theme.colors.muted};
    border: none;
  `,
}

const tagStyles = {
  inbound: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.info};
    border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  `,
  outbound: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.success};
    border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  `,
  default: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.muted};
    border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  `,
}

const variantStyles: Record<BadgeVariant, ReturnType<typeof css>> = {
  ...statusStyles,
  ...tagStyles,
}

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

  ${({ variant = 'default' }) => variantStyles[variant]}
`
