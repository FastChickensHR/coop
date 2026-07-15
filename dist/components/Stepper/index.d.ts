import { type ReactNode } from 'react';
export interface Step {
    label: ReactNode;
}
export interface StepperProps {
    steps: Step[];
    /** 0-based index of the current (in-progress) step. Earlier steps are done. */
    current: number;
    className?: string;
}
/**
 * A horizontal progress indicator for a linear, multi-step flow (ADR-0175) —
 * setup wizards, onboarding, a guided import. Shows which steps are done, which
 * is current, and what's ahead. Use it only for genuinely sequential tasks; for
 * switching between independent views use Tabs.
 */
export declare function Stepper({ steps, current, className }: StepperProps): import("react").JSX.Element;
