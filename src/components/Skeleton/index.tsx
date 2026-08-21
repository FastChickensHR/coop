import { styled, keyframes } from 'styled-components'
import { blockStyleProps } from '../../lib/styleProps'

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
`

export interface SkeletonProps {
  /** Corner radius override (defaults to the `sm` token; use `full` for a circle). */
  radius?: string
}

/**
 * Loading placeholder that holds the shape of content while it loads (ADR-0175).
 * Prefer a Skeleton over a centred spinner when you know the layout in advance —
 * it prevents the reflow jump when data arrives. Set `width`/`height` (or the
 * `radius`) to match the real element; stack several for a list or card.
 *
 * Honours prefers-reduced-motion (static block, no pulse).
 */
export const Skeleton = styled.div.withConfig({
  shouldForwardProp: blockStyleProps('radius'),
})<SkeletonProps>`
  background-color: ${({ theme }) => theme.colors.surface2};
  border-radius: ${({ theme, radius }) => radius ?? theme.borderRadius.sm};
  width: 100%;
  height: 1rem;
  animation: ${pulse} 1.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

/** A round skeleton — for an avatar or icon placeholder. */
export const SkeletonCircle = styled(Skeleton)`
  border-radius: ${({ theme }) => theme.borderRadius.full};
`

/** A single line of text-height skeleton. */
export const SkeletonText = styled(Skeleton)`
  height: 0.75rem;
`
