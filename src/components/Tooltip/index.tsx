import * as RadixTooltip from '@radix-ui/react-tooltip'
import styled, { keyframes } from 'styled-components'
import type { ReactNode } from 'react'

export interface TooltipProps {
  /** The hint text. */
  content: ReactNode
  /** The element the tooltip describes — must accept a ref / be focusable. */
  children: ReactNode
  /** Preferred side to open on; Radix flips it if there isn't room. @default 'top' */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** Delay before showing, in milliseconds. @default 200 */
  delayDuration?: number
}

/**
 * Hover/focus hint (ADR-0175) — replaces bare `title=` attributes with a
 * styled, keyboard-accessible, themed tooltip. Wrap the trigger; the tooltip
 * shows on hover *and* focus, and dismisses on Escape (Radix). Keep it to a
 * short phrase — a tooltip is a hint, not a place for essential information or
 * interactive content.
 *
 * A single `TooltipProvider` at the app root shares open/close timing; this
 * component includes its own provider so it also works standalone (e.g. the
 * `/design` docs). Nesting providers is safe.
 */
export function Tooltip({ content, children, side = 'top', delayDuration = 200 }: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <Content side={side} sideOffset={6}>
            {content}
            <Arrow />
          </Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
`

const Content = styled(RadixTooltip.Content)`
  max-width: 18rem;
  padding: 0.375rem 0.625rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.canvas};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: ${({ theme }) => theme.lineHeight.snug};
  box-shadow: ${({ theme }) => theme.boxShadow.pop};
  z-index: 60;
  animation: ${fadeIn} ${({ theme }) => theme.motion.duration.fast}
    ${({ theme }) => theme.motion.easing.enter};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Arrow = styled(RadixTooltip.Arrow)`
  fill: ${({ theme }) => theme.colors.ink};
`
