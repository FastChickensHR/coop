import type { ReactNode } from 'react';
export interface EmptyStateProps {
    /** Optional leading icon/illustration (e.g. a heroicon). */
    icon?: ReactNode;
    /** Short, specific heading — say what's empty ("No integrations yet"). */
    title: ReactNode;
    /** One line on what to do about it. */
    description?: ReactNode;
    /** Optional primary action (a Button). */
    action?: ReactNode;
    /** Class name for the root element (for layout only — colour and size come from the theme). */
    className?: string;
}
/**
 * The "nothing here yet" state for an empty list, table, or panel (ADR-0175).
 * A calm, centred block — an optional icon, a specific title, a line of
 * guidance, and (ideally) the action that fills it. Prefer this over a bare
 * "No data" string: an empty state is an opportunity to tell the user what to
 * do next.
 */
export declare function EmptyState({ icon, title, description, action, className }: EmptyStateProps): import("react").JSX.Element;
