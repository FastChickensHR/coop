import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import { styled, keyframes } from 'styled-components'
import type { ComponentProps } from 'react'

/**
 * The self-portalling content panel for a {@link DropdownMenu} (ADR-0175).
 * Function-only file; the styled items live in `items.tsx`, the root/trigger in
 * `parts.ts`, and the public API in the barrel `index.ts`.
 */
const slideIn = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`

const StyledContent = styled(RadixDropdownMenu.Content)`
  min-width: 11rem;
  padding: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.colors.canvas};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.boxShadow.pop};
  z-index: 60;
  animation: ${slideIn} ${({ theme }) => theme.motion.duration.fast}
    ${({ theme }) => theme.motion.easing.enter};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export function DropdownMenuContent(props: ComponentProps<typeof StyledContent>) {
  return (
    <RadixDropdownMenu.Portal>
      <StyledContent align="end" sideOffset={4} {...props} />
    </RadixDropdownMenu.Portal>
  )
}
