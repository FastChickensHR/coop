import { createContext, useContext, type ReactNode } from 'react'

// Library-safe dev probe: coop is published, so no Vite-isms (import.meta.env broke the
// package under native Node once already — #990's class of trap). Bundlers replace
// process.env.NODE_ENV; with no process at all we stay silent.
const globalProcess = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process
const IS_DEV = globalProcess ? globalProcess.env?.NODE_ENV !== 'production' : false

/** The chrome + live children a DrawerSlot feeds into the one global Drawer. */
export interface DrawerSlotConfig {
  title: string
  description?: ReactNode
  headerActions?: ReactNode
  footer?: ReactNode
  bodyPadding?: string
  /** Invoked when the drawer requests to close (Esc, overlay click, close button).
   *  The owning slot flips its `open` to false in response (controlled). */
  onRequestClose?: () => void
  children: ReactNode
}

export interface DrawerState {
  open: boolean
  /** Which DrawerSlot currently owns the surface (its `useId`). */
  activeId: string | null
  config: DrawerSlotConfig | null
}

export interface DrawerStore {
  subscribe: (listener: () => void) => () => void
  getSnapshot: () => DrawerState
  /** A slot claims the surface, or refreshes its live content while it holds it. */
  acquire: (id: string, config: DrawerSlotConfig) => void
  /** A slot gives up the surface (its `open` went false, or it unmounted). */
  release: (id: string) => void
  /** The drawer asked to close (Esc/overlay/close button); routed to the active slot. */
  requestClose: () => void
}

export function createDrawerStore(): DrawerStore {
  let state: DrawerState = { open: false, activeId: null, config: null }
  const listeners = new Set<() => void>()
  // Bumped on every acquire/release; a deferred close is void once superseded.
  let generation = 0
  const set = (next: DrawerState) => {
    state = next
    listeners.forEach((l) => l())
  }
  return {
    subscribe: (listener) => {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
    getSnapshot: () => state,
    acquire: (id, config) => {
      // Any queued close is now stale — a slot is (re)claiming the surface.
      generation++
      // Single-slot invariant (ADR-0068): a different slot opening while one is
      // already open is a bug. Warn loudly in dev; the newcomer replaces the incumbent.
      if (IS_DEV && state.open && state.activeId !== null && state.activeId !== id) {
        console.error(
          `[Drawer] Single-slot violation: "${state.config?.title}" is open and another drawer ` +
            `("${config.title}") is opening over it. Only one DrawerSlot may be open at a time — ` +
            `the newcomer replaces the incumbent. (ADR-0068)`,
        )
      }
      set({ open: true, activeId: id, config })
    },
    release: (id) => {
      // Ignore stale releases from slots that don't currently own the surface.
      if (state.activeId !== id || !state.open) return
      // Defer the close by a microtask. React StrictMode simulates mount →
      // unmount → mount, and a fast reopen (or A→B swap) fires release then
      // acquire back-to-back; closing synchronously would flip `open`
      // true→false→true and cancel the drawer's enter animation mid-slide. The
      // generation check lets a same-tick acquire (which bumps it) void this
      // close, so `open` only actually falls when the slot is really gone.
      const g = ++generation
      queueMicrotask(() => {
        if (g !== generation) return
        if (state.activeId === id && state.open) {
          // Keep activeId + config so the closing content renders through the exit animation.
          set({ ...state, open: false })
        }
      })
    },
    requestClose: () => {
      if (state.config?.onRequestClose) state.config.onRequestClose()
      else if (state.activeId !== null) set({ ...state, open: false })
    },
  }
}

const DrawerStoreContext = createContext<DrawerStore | null>(null)
export const DrawerStoreProvider = DrawerStoreContext.Provider

export function useDrawerStore(): DrawerStore {
  const store = useContext(DrawerStoreContext)
  if (store === null) throw new Error('DrawerSlot must be used within a DrawerProvider')
  return store
}
