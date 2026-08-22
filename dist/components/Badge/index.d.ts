/**
 * The generic tone vocabulary (#1235): filled tones follow Alert's error/info/success/warning
 * house model, `outline-*` are the quieter bordered form. Domain words (statuses, EDI
 * directions) live in the APP, which maps its vocabulary onto a tone at the call site —
 * coop is published under MIT and speaks only generic UI language (docs/code-style.md,
 * Naming 3).
 */
export type BadgeTone = 'success' | 'warning' | 'error' | 'neutral' | 'outline-info' | 'outline-success' | 'outline-neutral';
export interface BadgeProps {
    /** Filled tone (success/warning/error/neutral) or quiet outline form. @default 'outline-neutral' */
    variant?: BadgeTone;
}
/**
 * A small rounded label for a state or category (ADR-0175). Pick a filled tone for statuses
 * the reader should feel (success/warning/error/neutral) and an `outline-*` tone for quiet
 * directional or categorical tags. One line of content; use Chip for removable selections.
 */
export declare const Badge: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "variant"> & BadgeProps, never> & Partial<Pick<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "variant"> & BadgeProps, never>>> & string;
