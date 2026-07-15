import styled from 'styled-components'
import { CheckIcon } from '@heroicons/react/24/outline'
import { Fragment, type ReactNode } from 'react'

export interface Step {
  label: ReactNode
}

export interface StepperProps {
  steps: Step[]
  /** 0-based index of the current (in-progress) step. Earlier steps are done. */
  current: number
  className?: string
}

/**
 * A horizontal progress indicator for a linear, multi-step flow (ADR-0175) —
 * setup wizards, onboarding, a guided import. Shows which steps are done, which
 * is current, and what's ahead. Use it only for genuinely sequential tasks; for
 * switching between independent views use Tabs.
 */
export function Stepper({ steps, current, className }: StepperProps) {
  return (
    <Root className={className} aria-label="Progress">
      {steps.map((step, i) => {
        const state = i < current ? 'done' : i === current ? 'current' : 'upcoming'
        return (
          <Fragment key={i}>
            <StepBox aria-current={state === 'current' ? 'step' : undefined}>
              <Marker $state={state}>{state === 'done' ? <CheckIcon width={14} height={14} /> : i + 1}</Marker>
              <StepLabel $state={state}>{step.label}</StepLabel>
            </StepBox>
            {i < steps.length - 1 && <Connector $done={i < current} aria-hidden="true" />}
          </Fragment>
        )
      })}
    </Root>
  )
}

type StepState = 'done' | 'current' | 'upcoming'

const Root = styled.ol`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  list-style: none;
  margin: 0;
  padding: 0;
`

const StepBox = styled.li`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const Marker = styled.span<{ $state: StepState }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  border: 2px solid
    ${({ theme, $state }) => ($state === 'upcoming' ? theme.colors.border : theme.colors.accent)};
  background-color: ${({ theme, $state }) => ($state === 'done' ? theme.colors.accent : theme.colors.canvas)};
  color: ${({ theme, $state }) =>
    $state === 'done' ? theme.colors.canvas : $state === 'current' ? theme.colors.accent : theme.colors.subtle};
`

const StepLabel = styled.span<{ $state: StepState }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme, $state }) =>
    $state === 'current' ? theme.fontWeight.semibold : theme.fontWeight.normal};
  color: ${({ theme, $state }) => ($state === 'upcoming' ? theme.colors.subtle : theme.colors.ink)};
  white-space: nowrap;
`

const Connector = styled.span<{ $done?: boolean }>`
  width: 2rem;
  height: 2px;
  border-radius: 1px;
  background-color: ${({ theme, $done }) => ($done ? theme.colors.accent : theme.colors.border)};
`
