/** Diameter presets for {@link Spinner}. */
export type SpinnerSize = 'sm' | 'md' | 'lg';
/** Props for Spinner. */
export interface SpinnerProps {
    /** Diameter preset. @default 'md' */
    size?: SpinnerSize;
    /** Ring colour; defaults to the interaction accent (or inherits `currentColor`). */
    color?: string;
}
/**
 * Indeterminate loading spinner (ADR-0175). A ring that reads as "working" for
 * an unknown-length wait; for a known-length wait use {@link Progress}, and to
 * hold the shape of content that's loading use {@link Skeleton}.
 *
 * Colour follows `currentColor`, so it inherits the surrounding text colour (or
 * set the `color` prop). Honours prefers-reduced-motion by slowing, not
 * stopping — a stopped spinner reads as broken.
 */
export declare const Spinner: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Merged<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}, SpinnerProps>> & string;
