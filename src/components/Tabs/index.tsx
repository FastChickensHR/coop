import * as RadixTabs from '@radix-ui/react-tabs'
import styled from 'styled-components'

/**
 * A tab set — sibling views of the same subject, one shown at a time
 * (ADR-0175). Radix-backed: roving focus, arrow-key nav, correct
 * `tablist`/`tab`/`tabpanel` roles. Use tabs to slice one page's content;
 * to move between pages use navigation, and for a mutually-exclusive
 * *setting* use ToggleGroup or a Radio group.
 *
 * Compose like Radix: `Tabs` (root, `value` / `defaultValue` +
 * `onValueChange`) › `TabsList` › `TabsTrigger value="…"`, then one
 * `TabsContent value="…"` per trigger.
 */
export const Tabs = RadixTabs.Root

export const TabsList = styled(RadixTabs.List)`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  gap: 0;
`

export const TabsTrigger = styled(RadixTabs.Trigger)`
  padding: 0.75rem 1rem;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.muted};
  border: none;
  border-bottom: 2px solid transparent;
  background: none;
  cursor: pointer;
  margin-bottom: -1px;
  transition: color ${({ theme }) => theme.motion.duration.fast}
      ${({ theme }) => theme.motion.easing.standard},
    border-color ${({ theme }) => theme.motion.duration.fast} ${({ theme }) => theme.motion.easing.standard};
  outline: none;

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }

  &[data-state='active'] {
    color: ${({ theme }) => theme.colors.accent};
    border-bottom-color: ${({ theme }) => theme.colors.accent};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accentSoft};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`

export const TabsContent = styled(RadixTabs.Content)`
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accentSoft};
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
`
