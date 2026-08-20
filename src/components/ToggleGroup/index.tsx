import * as RadixToggleGroup from '@radix-ui/react-toggle-group'
import styled from 'styled-components'

/**
 * A segmented control — a small set of mutually-exclusive (or multi-select)
 * options shown side by side, one pressed at a time (ADR-0175). Radix-backed:
 * roving focus, arrow-key nav. Use it to switch a view's mode inline (list vs
 * grid, a date range) where the choices are few and worth showing at once; for
 * a value in a form use Select or Radio group, and for on/off use Switch.
 *
 * Compose like Radix: `ToggleGroup` (root, `type="single"|"multiple"`) ›
 * `ToggleGroupItem value="…"`.
 */
export const ToggleGroup = styled(RadixToggleGroup.Root)`
  display: inline-flex;
  padding: 2px;
  gap: 2px;
  background-color: ${({ theme }) => theme.colors.surface2};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

export const ToggleGroupItem = styled(RadixToggleGroup.Item)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  height: 2rem;
  padding: 0 0.75rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.muted};
  transition: background-color ${({ theme }) => theme.motion.duration.fast}
      ${({ theme }) => theme.motion.easing.standard},
    color ${({ theme }) => theme.motion.duration.fast} ${({ theme }) => theme.motion.easing.standard};

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }

  &[data-state='on'] {
    background-color: ${({ theme }) => theme.colors.canvas};
    color: ${({ theme }) => theme.colors.ink};
    box-shadow: ${({ theme }) => theme.boxShadow.card};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 1px;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`
