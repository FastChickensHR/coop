import type { ReactNode } from 'react';
/** Props for {@link Drawer}. */
export interface DrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: ReactNode;
    headerActions?: ReactNode;
    children: ReactNode;
    footer?: ReactNode;
    bodyPadding?: string;
    /** `wide` (default) is the 78vw detail surface; `narrow` is a ~36rem slide-over for a short list. */
    size?: DrawerSize;
}
/** How much of the page the drawer covers. */
export type DrawerSize = 'wide' | 'narrow';
/**
 * The right-side detail surface (ADR-0068/ADR-0081): a full-height panel that slides in over
 * the page. Radix-backed — focus trap, Escape + overlay-click close, focus returns to the
 * trigger. Prefer driving it declaratively through {@link DrawerSlot} + DrawerProvider so one
 * global host owns the surface; render Drawer directly only outside that tree.
 *
 * Choose by shape and intent: a Modal is a short centred task; a Drawer is the surface for
 * richer detail views.
 */
export declare function Drawer({ open, onOpenChange, title, description, headerActions, children, footer, bodyPadding, size }: DrawerProps): import("react").JSX.Element;
