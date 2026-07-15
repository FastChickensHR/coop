import * as RadixProgress from '@radix-ui/react-progress'
import styled from 'styled-components'

export interface ProgressProps {
  /** 0–100. Omit/null for an indeterminate bar (use a Spinner if length is truly unknown). */
  value?: number | null
  /** Accessible name for the bar (e.g. "Upload progress"). */
  'aria-label'?: string
  'aria-labelledby'?: string
  className?: string
}

const Track = styled(RadixProgress.Root)`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.surface2};
`

const Indicator = styled(RadixProgress.Indicator)`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.accent};
  border-radius: inherit;
  transition: width ${({ theme }) => theme.motion.duration.slow}
    ${({ theme }) => theme.motion.easing.standard};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

/**
 * Determinate progress bar for a known-length wait (ADR-0175) — an upload, a
 * multi-step import. For an unknown-length wait use {@link Spinner}. The fill is
 * the interaction accent; the track is a neutral surface.
 */
export function Progress({ value, className, ...aria }: ProgressProps) {
  const clamped = value == null ? null : Math.max(0, Math.min(100, value))
  return (
    <Track value={clamped} className={className} {...aria}>
      <Indicator style={{ width: `${clamped ?? 0}%` }} />
    </Track>
  )
}
