import type { ReactNode } from 'react';
export interface ModalProps {
    /** Whether the dialog is showing (controlled). */
    open: boolean;
    /** Called when the dialog wants to open or close — Escape, overlay click, the × button. */
    onOpenChange: (open: boolean) => void;
    /** Heading text; also the dialog's accessible name, so it is required. */
    title: string;
    /** One line under the title saying what this dialog is for. */
    description?: ReactNode;
    /** The dialog body — the form or content the user works through. */
    children: ReactNode;
    /** Action row pinned to the bottom of the panel (usually Cancel + a primary Button). */
    footer?: ReactNode;
    /** Max width of the centred panel. @default '32rem' */
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
