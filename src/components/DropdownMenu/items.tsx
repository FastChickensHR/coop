import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import styled from 'styled-components'

/**
 * The styled menu parts for a {@link DropdownMenu} (ADR-0175). Styled-only file
 * (no function component) so Fast Refresh stays happy; the Portal-wrapping
 * content lives in `DropdownMenuContent.tsx`.
 */
export const DropdownMenuItem = styled(RadixDropdownMenu.Item)<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme, $danger }) => ($danger ? theme.colors.error : theme.colors.ink)};
  cursor: pointer;
  outline: none;
  user-select: none;

  &[data-highlighted] {
    background-color: ${({ theme, $danger }) => ($danger ? theme.colors.errorSoft : theme.colors.surface2)};
  }

  &[data-disabled] {
    color: ${({ theme }) => theme.colors.subtle};
    cursor: not-allowed;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`

export const DropdownMenuSeparator = styled(RadixDropdownMenu.Separator)`
  height: 1px;
  margin: ${({ theme }) => theme.spacing.xs} 0;
  background-color: ${({ theme }) => theme.colors.border};
`

export const DropdownMenuLabel = styled(RadixDropdownMenu.Label)`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.subtle};
`
