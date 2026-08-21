import { styled } from 'styled-components'
import { XMarkIcon } from '@heroicons/react/24/outline'
import type { ReactNode } from 'react'

export interface ChipProps {
  /** The token's label; truncates with an ellipsis rather than wrapping. */
  children: ReactNode
  /** When provided, renders a remove (×) button that calls this. */
  onRemove?: () => void
  /** Accessible label for the remove button. @default 'Remove' */
  removeLabel?: string
  /** Class name for the root element (for layout only — colour and size come from the theme). */
  className?: string
}

/**
 * A compact, removable token (ADR-0175) — a selected filter, a tag, a recipient.
 * Use a Chip when the user can *dismiss* the thing it represents; for a
 * read-only status label use a Badge, and for a person use an Avatar.
 */
export function Chip({ children, onRemove, removeLabel = 'Remove', className }: ChipProps) {
  return (
    <Root className={className}>
      <Text>{children}</Text>
      {onRemove && (
        <RemoveButton type="button" aria-label={removeLabel} onClick={onRemove}>
          <XMarkIcon width={14} height={14} />
        </RemoveButton>
      )}
    </Root>
  )
}

const Root = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  height: 1.5rem;
  padding: 0 ${({ theme }) => theme.spacing.xs} 0 ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.surface2};
  color: ${({ theme }) => theme.colors.ink};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  max-width: 100%;
`

const Text = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 0.125rem;
`

const RemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  padding: 0;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: none;
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.ink};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 1px;
  }
`
