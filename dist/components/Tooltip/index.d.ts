import type { ReactNode } from 'react';
export interface TooltipProps {
    /** The hint text. */
    content: ReactNode;
    /** The element the tooltip describes — must accept a ref / be focusable. */
    children: ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
    /** Delay before showing, ms (default 200). */
    delayDuration?: number;
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
export declare function Tooltip({ content, children, side, delayDuration }: TooltipProps): import("react").JSX.Element;
