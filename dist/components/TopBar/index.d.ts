/**
 * The shared top-bar chrome (ADR compositional-layout-primitives): 4rem tall,
 * `canvas` ground, `border` bottom, a space-between flex row. Opt into
 * `$sticky` for bars that scroll with the page (marketing) rather than sitting
 * in a fixed layout column (the app shell).
 *
 * Intentionally-dark surfaces (sidebar, footer) are NOT this — they follow the
 * documented fixed-dark recipe (the fixed ink scale: `ink900` ground,
 * `ink300`/`ink50` text).
 */
export declare const TopBar: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "$sticky"> & {
    $sticky?: boolean;
}, never> & Partial<Pick<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "$sticky"> & {
    $sticky?: boolean;
}, never>>> & string;
