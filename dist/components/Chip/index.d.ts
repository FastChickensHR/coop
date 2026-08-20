import type { ReactNode } from 'react';
export interface ChipProps {
    /** The token's label; truncates with an ellipsis rather than wrapping. */
    children: ReactNode;
    /** When provided, renders a remove (×) button that calls this. */
    onRemove?: () => void;
    /** Accessible label for the remove button. @default 'Remove' */
    removeLabel?: string;
    /** Class name for the root element (for layout only — colour and size come from the theme). */
    className?: string;
}
/**
 * A compact, removable token (ADR-0175) — a selected filter, a tag, a recipient.
 * Use a Chip when the user can *dismiss* the thing it represents; for a
 * read-only status label use a Badge, and for a person use an Avatar.
 */
export declare function Chip({ children, onRemove, removeLabel, className }: ChipProps): import("react").JSX.Element;
