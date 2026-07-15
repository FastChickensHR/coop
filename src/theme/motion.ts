import { css, keyframes } from 'styled-components'

/**
 * Shared enter animation for route/content changes: a subtle fade + upward
 * settle (ADR-0081). Enter-only — CSS can't animate the *outgoing* page without
 * presence management, and this app stays dependency-light (no framer-motion),
 * so the incoming content fades in and the old one is simply replaced.
 *
 * One definition, used by both the cross-section {@link PageContainer} and the
 * within-section tab-content wrappers (Settings, Organization), so every
 * navigation reads the same instead of each surface hand-tuning its own fade.
 */
export const pageEnter = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`

/**
 * Applies {@link pageEnter} using the motion tokens, honoring
 * prefers-reduced-motion (a page appearing instantly is fine, so we hard-cut).
 * Spread into any styled surface that should fade its content in on mount.
 */
export const pageEnterAnimation = css`
  animation: ${pageEnter} ${({ theme }) => theme.motion.duration.slow}
    ${({ theme }) => theme.motion.easing.enter};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
