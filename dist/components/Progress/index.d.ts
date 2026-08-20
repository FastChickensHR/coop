export interface ProgressProps {
    /** 0–100. Omit/null for an indeterminate bar (use a Spinner if length is truly unknown). */
    value?: number | null;
    /** Accessible name for the bar (e.g. "Upload progress"). */
    'aria-label'?: string;
    /** Id of an existing element that names the bar (alternative to `aria-label`). */
    'aria-labelledby'?: string;
    /** Class name for the track element (for layout only — colour and size come from the theme). */
    className?: string;
}
/**
 * Determinate progress bar for a known-length wait (ADR-0175) — an upload, a
 * multi-step import. For an unknown-length wait use {@link Spinner}. The fill is
 * the interaction accent; the track is a neutral surface.
 */
export declare function Progress({ value, className, ...aria }: ProgressProps): import("react").JSX.Element;
