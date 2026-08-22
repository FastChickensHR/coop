import { css } from 'styled-components'
import { STATUS_SOFT, type FieldStatus } from './context'

/**
 * Border colour + soft ring for a text control's semantic status (ADR-0157),
 * plus the accent focus ring. Spread into a control's styled block *after* its
 * base `border`/`&:focus` so status wins at rest and the accent wins on focus
 * (a focused field reads as *active*, whatever its status). A control with no
 * status keeps its base border and only gets the accent focus ring.
 */
export const controlStatusStyles = (status?: FieldStatus, focusSelector = '&:focus') => css`
  ${status &&
  css`
    border-color: ${({ theme }) => theme.colors[status]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors[STATUS_SOFT[status]]};
  `}

  ${focusSelector} {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accentSoft};
  }
`

/**
 * The chrome every 44px text control wears — sizing, border, type, colours, motion, and the
 * disabled/placeholder states (#1217; the audit found this block pasted five times). Compose it
 * FIRST, then `controlStatusStyles`, then per-control overrides (icon padding, trigger flex,
 * a wrapper's `min-height`) so the override wins by order. The disabled/placeholder selectors
 * are inert on hosts they don't apply to.
 */
export const controlBaseStyles = css`
  width: 100%;
  height: 44px;
  padding: 0 0.875rem;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.ink};
  background-color: ${({ theme }) => theme.colors.canvas};
  outline: none;
  box-sizing: border-box;
  transition:
    border-color ${({ theme }) => theme.motion.duration.fast} ${({ theme }) => theme.motion.easing.standard},
    box-shadow ${({ theme }) => theme.motion.duration.fast} ${({ theme }) => theme.motion.easing.standard};

  &:disabled {
    background-color: ${({ theme }) => theme.colors.surface2};
    color: ${({ theme }) => theme.colors.subtle};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.subtle};
  }
`
