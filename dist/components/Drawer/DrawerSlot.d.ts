import { type ReactNode } from 'react';
export interface DrawerSlotProps {
    /** When true, this slot owns the global drawer and its children are shown. */
    open: boolean;
    title: string;
    description?: ReactNode;
    headerActions?: ReactNode;
    footer?: ReactNode;
    bodyPadding?: string;
    /** Called when the drawer requests to close (Esc, overlay click, close button).
     *  The owner flips `open` to false in response — the slot is controlled. */
    onOpenChange?: (open: boolean) => void;
    children: ReactNode;
}
/**
 * Declarative handle to the one global Drawer ({@link DrawerHost}). Render a
 * DrawerSlot where you would have rendered a `<Drawer>`: while `open`, it feeds
 * its **live** children + chrome into the single host, so only the drawer's
 * contents re-render — never the page behind it. One DrawerSlot open at a time
 * (ADR-0068); the host warns in dev if that's violated.
 *
 * Renders no DOM of its own — the children appear inside the host.
 */
export declare function DrawerSlot({ open, title, description, headerActions, footer, bodyPadding, onOpenChange, children, }: DrawerSlotProps): null;
