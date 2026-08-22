import { useState, useSyncExternalStore, type ReactNode } from 'react'
import { Drawer } from './index'
import { createDrawerStore, DrawerStoreProvider, type DrawerStore } from './drawerStore'

/**
 * Mounts a single Drawer once, globally, and lets any descendant drive it
 * declaratively via {@link DrawerSlot}. Because the drawer lives here — not
 * inside a page — opening it, swapping its content, or closing it re-renders
 * only the drawer's children, never the page behind it (ADR-0068). Only
 * {@link DrawerHost} subscribes to drawer state, so the rest of the tree never
 * re-renders when the drawer opens or closes.
 */
export function DrawerProvider({ children }: { children: ReactNode }) {
  const [store] = useState(createDrawerStore)
  return (
    <DrawerStoreProvider value={store}>
      {children}
      <DrawerHost store={store} />
    </DrawerStoreProvider>
  )
}

function DrawerHost({ store }: { store: DrawerStore }) {
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot)
  const { config } = state
  return (
    <Drawer
      open={state.open}
      onOpenChange={(open) => {
        if (!open) store.requestClose()
      }}
      title={config?.title ?? ''}
      description={config?.description}
      headerActions={config?.headerActions}
      footer={config?.footer}
      bodyPadding={config?.bodyPadding}
    >
      {config?.children}
    </Drawer>
  )
}
