import { type ReactNode } from 'react';
/**
 * Mounts a single Drawer once, globally, and lets any descendant drive it
 * declaratively via {@link DrawerSlot}. Because the drawer lives here — not
 * inside a page — opening it, swapping its content, or closing it re-renders
 * only the drawer's children, never the page behind it (ADR-0068). Only
 * {@link DrawerHost} subscribes to drawer state, so the rest of the tree never
 * re-renders when the drawer opens or closes.
 */
export declare function DrawerProvider({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
