import * as Dialog from '@radix-ui/react-dialog'
import { styled } from 'styled-components'

/**
 * Dialog chrome shared by {@link Modal} and the Drawer (#1210). The app audit (#1192) found
 * the app/public Drawer re-declaring this set as a near-copy of Modal's — one home now.
 * Internal to coop: consumers compose Modal or Drawer, never these parts.
 */

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 0;
`

export const Title = styled(Dialog.Title)`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.ink};
  margin: 0;
`

export const Description = styled(Dialog.Description)`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
`

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color ${({ theme }) => theme.motion.duration.fast} ${({ theme }) => theme.motion.easing.standard};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface2};
    color: ${({ theme }) => theme.colors.ink};
  }
`
