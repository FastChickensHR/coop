import * as RadixAccordion from '@radix-ui/react-accordion'
import styled, { keyframes } from 'styled-components'

/**
 * Vertically stacked, expandable sections (ADR-0175). Radix-backed: keyboard
 * nav, single- or multiple-open. Use an Accordion to let the user reveal detail
 * on demand in a long page (an FAQ, grouped settings); for switching between
 * peer views use Tabs, and for a modal aside use a Drawer or Popover.
 *
 * Compose like Radix: `Accordion` (root, `type="single"|"multiple"`) ›
 * `AccordionItem` › `AccordionHeader` › `AccordionTrigger` / `AccordionContent`.
 */
export const Accordion = RadixAccordion.Root

export const AccordionItem = styled(RadixAccordion.Item)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`

export const AccordionHeader = styled(RadixAccordion.Header)`
  margin: 0;
`

export const AccordionTrigger = styled(RadixAccordion.Trigger)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.ink};
  text-align: left;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: -2px;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  /* CSS chevron — down, flips up when the item is open. */
  &::after {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    flex-shrink: 0;
    border-right: 2px solid ${({ theme }) => theme.colors.muted};
    border-bottom: 2px solid ${({ theme }) => theme.colors.muted};
    transform: rotate(45deg) translateY(-2px);
    transition: transform ${({ theme }) => theme.motion.duration.base}
      ${({ theme }) => theme.motion.easing.standard};
  }

  &[data-state='open']::after {
    transform: rotate(-135deg) translateY(-2px);
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      transition: none;
    }
  }
`

const slideDown = keyframes`
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
`
const slideUp = keyframes`
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
`

export const AccordionContent = styled(RadixAccordion.Content)`
  overflow: hidden;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.muted};
  line-height: ${({ theme }) => theme.lineHeight.relaxed};

  &[data-state='open'] {
    animation: ${slideDown} ${({ theme }) => theme.motion.duration.base}
      ${({ theme }) => theme.motion.easing.standard};
  }
  &[data-state='closed'] {
    animation: ${slideUp} ${({ theme }) => theme.motion.duration.fast}
      ${({ theme }) => theme.motion.easing.exit};
  }

  /* Inner padding so the animated height wraps the content cleanly. */
  & > * {
    padding: 0 ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
