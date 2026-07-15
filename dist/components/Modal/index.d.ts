import type { ReactNode } from 'react';
export interface ModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: ReactNode;
    children: ReactNode;
    footer?: ReactNode;
    /** Max width of the centred panel (default 32rem). */
    width?: string;
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
export declare function Modal({ open, onOpenChange, title, description, children, footer, width }: ModalProps): import("react").JSX.Element;
