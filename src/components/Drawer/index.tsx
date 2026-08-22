import * as Dialog from '@radix-ui/react-dialog'
import { styled, keyframes } from 'styled-components'
import { HeaderText, Title, Description, CloseButton } from '../Modal/parts'
import { XMarkIcon } from '@heroicons/react/24/outline'
import type { ReactNode } from 'react'

export interface DrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: ReactNode
  headerActions?: ReactNode
  children: ReactNode
  footer?: ReactNode
  bodyPadding?: string
}

// Opacity fades — used for the overlay both ways, and for the panel itself under
// prefers-reduced-motion (where the slide transform is dropped, ADR-0081).
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`

const slideOut = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
`

// Signature drawer motion (ADR-0081 permits per-surface curves). The shared
// fast/base/slow tokens read a touch mechanical here, so the drawer gets its own
// pair: a sheet-style settle on the way in — the panel decelerates smoothly into
// place rather than arriving — and a gentle, slightly quicker accelerate on the
// way out so it draws back without snapping. Overlay and panel share the exact
// timing on each side, so the backdrop tracks the panel instead of the scrim
// racing ahead of it.
const ENTER = '400ms cubic-bezier(0.32, 0.72, 0, 1)'
const EXIT = '280ms cubic-bezier(0.55, 0, 1, 0.45)'

const Overlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.45);
  position: fixed;
  inset: 0;
  z-index: 40;

  &[data-state='open'] {
    animation: ${fadeIn} ${ENTER};
  }
  &[data-state='closed'] {
    animation: ${fadeOut} ${EXIT} forwards;
    pointer-events: none;
  }
`

const Content = styled(Dialog.Content)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  min-width: 78vw;
  width: 78vw;
  max-width: 100vw;
  background-color: ${({ theme }) => theme.colors.canvas};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.boxShadow.pop};
  z-index: 50;
  display: flex;
  flex-direction: column;

  &[data-state='open'] {
    animation: ${slideIn} ${ENTER};
    will-change: transform;
  }
  &[data-state='closed'] {
    animation: ${slideOut} ${EXIT} forwards;
    will-change: transform;
    pointer-events: none;
  }

  // Reduced motion: drop the slide transform, degrade to a brief opacity fade
  // (a full-height panel snapping in/out is disorienting; a fade is gentler).
  @media (prefers-reduced-motion: reduce) {
    &[data-state='open'] {
      animation: ${fadeIn} ${({ theme }) => theme.motion.duration.fast}
        ${({ theme }) => theme.motion.easing.standard};
    }
    &[data-state='closed'] {
      animation: ${fadeOut} ${({ theme }) => theme.motion.duration.fast}
        ${({ theme }) => theme.motion.easing.standard} forwards;
    }
  }

  &:focus {
    outline: none;
  }
`

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
`

const Body = styled.div<{ $padding?: string }>`
  flex: 1;
  overflow-y: auto;
  padding: ${({ $padding, theme }) => $padding ?? theme.spacing.xl};
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`

/**
 * The right-side detail surface (ADR-0068/ADR-0081): a full-height panel that slides in over
 * the page. Radix-backed — focus trap, Escape + overlay-click close, focus returns to the
 * trigger. Prefer driving it declaratively through {@link DrawerSlot} + DrawerProvider so one
 * global host owns the surface; render Drawer directly only outside that tree.
 *
 * Choose by shape and intent: a Modal is a short centred task; a Drawer is the surface for
 * richer detail views.
 */
export function Drawer({ open, onOpenChange, title, description, headerActions, children, footer, bodyPadding }: DrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Header>
            <HeaderText>
              <Title>{title}</Title>
              {description
                ? <Description>{description}</Description>
                : <Dialog.Description aria-hidden style={{ display: 'none' }} />}
            </HeaderText>
            <HeaderRight>
              {headerActions}
              <Dialog.Close asChild>
                <CloseButton aria-label="Close">
                  <XMarkIcon width={20} height={20} />
                </CloseButton>
              </Dialog.Close>
            </HeaderRight>
          </Header>
          <Body $padding={bodyPadding}>{children}</Body>
          {footer && <Footer>{footer}</Footer>}
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
