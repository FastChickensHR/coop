import { type ReactNode } from 'react';
/** The chrome + live children a DrawerSlot feeds into the one global Drawer. */
export interface DrawerSlotConfig {
    title: string;
    description?: ReactNode;
    headerActions?: ReactNode;
    footer?: ReactNode;
    bodyPadding?: string;
    /** Invoked when the drawer requests to close (Esc, overlay click, close button).
     *  The owning slot flips its `open` to false in response (controlled). */
    onRequestClose?: () => void;
    children: ReactNode;
}
export interface DrawerState {
    open: boolean;
    /** Which DrawerSlot currently owns the surface (its `useId`). */
    activeId: string | null;
    config: DrawerSlotConfig | null;
}
export interface DrawerStore {
    subscribe: (listener: () => void) => () => void;
    getSnapshot: () => DrawerState;
    /** A slot claims the surface, or refreshes its live content while it holds it. */
    acquire: (id: string, config: DrawerSlotConfig) => void;
    /** A slot gives up the surface (its `open` went false, or it unmounted). */
    release: (id: string) => void;
    /** The drawer asked to close (Esc/overlay/close button); routed to the active slot. */
    requestClose: () => void;
}
export declare function createDrawerStore(): DrawerStore;
export declare const DrawerStoreProvider: import("react").Provider<DrawerStore | null>;
export declare function useDrawerStore(): DrawerStore;
