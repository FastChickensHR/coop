import * as Popover from '@radix-ui/react-popover'
import { styled } from 'styled-components'
import { controlBaseStyles, controlStatusStyles } from '../FormField/fieldStyles'
import type { FieldStatus } from '../FormField/context'

/**
 * The DatePicker's styled set (#1228): moved to this sibling per docs/code-style.md
 * (Functions 6 — styled decls past ~10 move to a sibling styles file). Extracted verbatim,
 * layout comments included — several are measured decisions (ADR-0816 §6).
 */


export const FieldWrap = styled.div`
  position: relative;
  width: 100%;
`

export const TextInput = styled.input<{ $status?: FieldStatus; $openEnded?: boolean }>`
  ${controlBaseStyles}
  padding-right: 2.75rem;
  color: ${({ theme, $openEnded }) => ($openEnded ? theme.colors.muted : theme.colors.ink)};
  font-style: ${({ $openEnded }) => ($openEnded ? 'italic' : 'normal')};

  ${({ $status }) => controlStatusStyles($status)}
`

export const CalendarButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  height: 44px;
  width: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.ink};
  }
  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.subtle};
  }
  svg { width: 1.15rem; height: 1.15rem; }
`

export const Content = styled(Popover.Content)`
  background-color: ${({ theme }) => theme.colors.canvas};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.boxShadow.pop};
  padding: 1rem;
  z-index: 50;
`

export const CalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`

export const NavButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: none;
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;

  &:hover { background-color: ${({ theme }) => theme.colors.surface2}; color: ${({ theme }) => theme.colors.ink}; }
  svg { width: 17px; height: 17px; }
`

export const MonthLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.ink};
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 2.5rem);
`

export const Weekday = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.muted};
`

export const DayButton = styled.button<{ $selected?: boolean; $today?: boolean; $outside?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme, $today }) => ($today ? theme.fontWeight.bold : theme.fontWeight.normal)};
  color: ${({ theme, $selected, $outside }) =>
    $selected ? theme.colors.canvas : $outside ? theme.colors.subtle : theme.colors.ink};
  background-color: ${({ theme, $selected }) => ($selected ? theme.colors.accent : 'transparent')};
  transition: background-color 100ms ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme, $selected }) => ($selected ? theme.colors.accent : theme.colors.surface2)};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 1px;
  }
  &:disabled {
    color: ${({ theme }) => theme.colors.subtle};
    cursor: not-allowed;
    opacity: 0.5;
  }
`

export const ParseHint = styled.p`
  margin: 0.375rem 0 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.error};
`

/**
 * The quick-pick row, ABOVE the day grid (ADR-0816 §6). Measured at true size: every horizontal
 * placement costs the same +136px of height, because `1st of next month` (~9rem) does not fit
 * three-across a 17.5rem grid — "footer row" was never a row, it is a stack. That collapses the
 * trade to pure adjacency, and under §3 focus stays in the input, so the popover's TOP edge is the
 * edge nearest the field: the fast path belongs closest to the caret and first in reading order.
 * Accepted cost: `‹ July 2026 ›` is no longer the first thing in the popover.
 */
export const PickRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const PickButton = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.4rem 0.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: none;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.ink};
  cursor: pointer;

  &:hover { background-color: ${({ theme }) => theme.colors.surface2}; }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: -2px;
  }
`

/**
 * ⚠️ ONE inline `<span>`, never sibling flex items — siblings trim the trailing space and ship
 * `1st of nextmonth`. Discovery is the marked token letter inside the label the user already
 * reads; the shortcut rides in the accessible name (`Today, type t`), never `aria-keyshortcuts`,
 * which means "a key that activates this control".
 */
export const PickLabel = styled.span`
  display: inline;
`

export const Mark = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-decoration: underline dotted;
  text-underline-offset: 2px;
`

