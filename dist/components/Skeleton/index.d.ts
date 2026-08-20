export interface SkeletonProps {
    /** Corner radius override (defaults to the `sm` token; use `full` for a circle). */
    radius?: string;
}
/**
 * Loading placeholder that holds the shape of content while it loads (ADR-0175).
 * Prefer a Skeleton over a centred spinner when you know the layout in advance —
 * it prevents the reflow jump when data arrives. Set `width`/`height` (or the
 * `radius`) to match the real element; stack several for a list or card.
 *
 * Honours prefers-reduced-motion (static block, no pulse).
 */
export declare const Skeleton: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "radius"> & SkeletonProps, never> & Partial<Pick<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "radius"> & SkeletonProps, never>>> & string;
/** A round skeleton — for an avatar or icon placeholder. */
export declare const SkeletonCircle: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("styled-components").FastOmit<import("styled-components").FastOmit<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "radius"> & SkeletonProps, never> & Partial<Pick<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "radius"> & SkeletonProps, never>>, "as" | "forwardedAs"> & {
    as?: import("styled-components").WebTarget | undefined;
    forwardedAs?: import("styled-components").WebTarget | undefined;
}, never> & Partial<Pick<import("styled-components").FastOmit<import("styled-components").FastOmit<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "radius"> & SkeletonProps, never> & Partial<Pick<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "radius"> & SkeletonProps, never>>, "as" | "forwardedAs"> & {
    as?: import("styled-components").WebTarget | undefined;
    forwardedAs?: import("styled-components").WebTarget | undefined;
}, never>>> & string;
/** A single line of text-height skeleton. */
export declare const SkeletonText: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("styled-components").FastOmit<import("styled-components").FastOmit<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "radius"> & SkeletonProps, never> & Partial<Pick<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "radius"> & SkeletonProps, never>>, "as" | "forwardedAs"> & {
    as?: import("styled-components").WebTarget | undefined;
    forwardedAs?: import("styled-components").WebTarget | undefined;
}, never> & Partial<Pick<import("styled-components").FastOmit<import("styled-components").FastOmit<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "radius"> & SkeletonProps, never> & Partial<Pick<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "radius"> & SkeletonProps, never>>, "as" | "forwardedAs"> & {
    as?: import("styled-components").WebTarget | undefined;
    forwardedAs?: import("styled-components").WebTarget | undefined;
}, never>>> & string;
