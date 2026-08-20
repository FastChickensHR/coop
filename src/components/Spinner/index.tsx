import styled, { keyframes } from 'styled-components'
import { blockStyleProps } from '../../lib/styleProps'

export type SpinnerSize = 'sm' | 'md' | 'lg'

const SIZES: Record<SpinnerSize, string> = {
  sm: '1rem',
  md: '1.5rem',
  lg: '2.25rem',
}

const spin = keyframes`
  to { transform: rotate(360deg); }
`

export interface SpinnerProps {
  /** Diameter preset. @default 'md' */
  size?: SpinnerSize
  /** Ring colour; defaults to the interaction accent (or inherits `currentColor`). */
  color?: string
}

/**
 * Indeterminate loading spinner (ADR-0175). A ring that reads as "working" for
 * an unknown-length wait; for a known-length wait use {@link Progress}, and to
 * hold the shape of content that's loading use {@link Skeleton}.
 *
 * Colour follows `currentColor`, so it inherits the surrounding text colour (or
 * set the `color` prop). Honours prefers-reduced-motion by slowing, not
 * stopping — a stopped spinner reads as broken.
 */
export const Spinner = styled.span.withConfig({
  shouldForwardProp: blockStyleProps('size', 'color'),
})<SpinnerProps>`
  display: inline-block;
  width: ${({ size = 'md' }) => SIZES[size]};
  height: ${({ size = 'md' }) => SIZES[size]};
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.borderStrong};
  border-top-color: ${({ theme, color }) => color ?? theme.colors.accent};
  animation: ${spin} 0.6s linear infinite;
  flex-shrink: 0;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 1.6s;
  }
`
