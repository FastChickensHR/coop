import * as Dialog from '@radix-ui/react-dialog'
import { styled, keyframes } from 'styled-components'
import { HeaderText, Title, Description, CloseButton } from './parts'
import { XMarkIcon } from '@heroicons/react/24/outline'
import type { ReactNode } from 'react'

export interface ModalProps {
  /** Whether the dialog is showing (controlled). */
  open: boolean
  /** Called when the dialog wants to open or close — Escape, overlay click, the × button. */
  onOpenChange: (open: boolean) => void
  /** Heading text; also the dialog's accessible name, so it is required. */
  title: string
  /** One line under the title saying what this dialog is for. */
  description?: ReactNode
  /** The dialog body — the form or content the user works through. */
  children: ReactNode
  /** Action row pinned to the bottom of the panel (usually Cancel + a primary Button). */
  footer?: ReactNode
  /** Max width of the centred panel. @default '32rem' */
  width?: string
}

/**
 * A centred, general-purpose modal dialog (ADR-0175). Radix-backed: focus trap,
 * Escape + overlay-click to close, focus returns to the trigger.
 *
 * Choose by shape and intent: a {@link Modal} is a short, self-contained task or
 * form the user handles then dismisses; a Drawer is the right-side surface for
 * richer detail; an AlertDialog is a small confirm/cancel decision. Reach for a
 * Modal when the content is a compact centred form, not a full detail view.
 */
export function Modal({ open, onOpenChange, title, description, children, footer, width }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Overlay />
        <Content style={width ? { maxWidth: width } : undefined}>
          <Header>
            <HeaderText>
              <Title>{title}</Title>
              {description ? (
                <Description>{description}</Description>
              ) : (
                <Dialog.Description aria-hidden style={{ display: 'none' }} />
              )}
            </HeaderText>
            <Dialog.Close asChild>
              <CloseButton aria-label="Close">
                <XMarkIcon width={20} height={20} />
              </CloseButton>
            </Dialog.Close>
          </Header>
          <Body>{children}</Body>
          {footer && <Footer>{footer}</Footer>}
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const overlayShow = keyframes`from { opacity: 0; } to { opacity: 1; }`
const contentShow = keyframes`
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.98); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`

const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.45);
  animation: ${overlayShow} ${({ theme }) => theme.motion.duration.base} ${({ theme }) => theme.motion.easing.enter};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Content = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100vw - 2rem);
  max-width: 32rem;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.canvas};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.pop};
  z-index: 51;
  animation: ${contentShow} ${({ theme }) => theme.motion.duration.base} ${({ theme }) => theme.motion.easing.enter};

  &:focus {
    outline: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  flex-shrink: 0;
`





const Body = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.xl};
  overflow-y: auto;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  flex-shrink: 0;
`
