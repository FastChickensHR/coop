/**
 * Toast notifications (#1211): coop standardizes on sonner — `toast(...)` fires one, and the
 * app shell mounts a single `<Toaster />`. Re-exported so consumers depend on coop's surface,
 * not on the underlying library.
 */
export { toast, Toaster } from 'sonner'
