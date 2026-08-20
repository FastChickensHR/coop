import type { ReactNode } from 'react';
export interface ConfirmDialogProps {
    /** Whether the dialog is showing (controlled). */
    open: boolean;
    /** Called when the dialog wants to open or close — Cancel, Escape, overlay click, the × button. */
    onOpenChange: (open: boolean) => void;
    /** The decision, as a question — e.g. "Promote to production?" */
    title: string;
    /** The consequence, in plain language — what confirming will do. */
    description?: ReactNode;
    /** Extra content above the buttons, if the question needs more than a sentence. */
    children?: ReactNode;
    /** Text on the confirming button — name the action ("Promote"), not "OK". @default 'Confirm' */
    confirmLabel?: string;
    /** Text on the dismissing button. @default 'Cancel' */
    cancelLabel?: string;
    /** Confirm-button emphasis — `danger` for a destructive action. @default 'primary' */
    confirmVariant?: 'primary' | 'danger';
    /** While true, both buttons disable — the confirmed action is running. */
    pending?: boolean;
    /** Called when the user confirms; closing the dialog afterwards is the caller's job. */
    onConfirm: () => void;
}
/**
 * A small confirm/cancel decision (ADR-0318) — the styled replacement for `window.confirm`. Built on
 * {@link Modal} (Radix dialog: focus trap, Escape + overlay-click cancel), it takes a question as the
 * title and the consequence as the description, and renders Cancel + Confirm buttons.
 *
 * Choose by intent: a Modal is a compact form the user fills in; a ConfirmDialog is a yes/no gate in
 * front of a single action. Use {@code confirmVariant="danger"} when confirming is destructive.
 */
export declare function ConfirmDialog({ open, onOpenChange, title, description, children, confirmLabel, cancelLabel, confirmVariant, pending, onConfirm, }: ConfirmDialogProps): import("react").JSX.Element;
