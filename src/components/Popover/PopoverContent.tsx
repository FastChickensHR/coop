import * as RadixPopover from '@radix-ui/react-popover'
import { styled, keyframes } from 'styled-components'
import type { ComponentProps } from 'react'

/**
 * The styled, self-portalling content panel for a {@link Popover} (ADR-0175).
 * See `parts.ts` for the root/trigger/close, and the barrel `index.ts` for the
 * public API. A Popover holds arbitrary interactive content the user focuses
 * into — distinct from a passive Tooltip and from a DropdownMenu of actions.
 */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`

const StyledContent = styled(RadixPopover.Content)`
  min-width: 14rem;
  max-width: min(24rem, calc(100vw - 2rem));
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.canvas};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.boxShadow.pop};
  z-index: 60;
  animation: ${fadeIn} ${({ theme }) => theme.motion.duration.fast}
    ${({ theme }) => theme.motion.easing.enter};

  &:focus {
    outline: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Arrow = styled(RadixPopover.Arrow)`
  fill: ${({ theme }) => theme.colors.canvas};
  stroke: ${({ theme }) => theme.colors.border};
  stroke-width: 1px;
`

export function PopoverContent(props: ComponentProps<typeof StyledContent>) {
  const { children, ...rest } = props
  return (
    <RadixPopover.Portal>
      <StyledContent align="start" sideOffset={6} {...rest}>
        {children}
        <Arrow />
      </StyledContent>
    </RadixPopover.Portal>
  )
}
