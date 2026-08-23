/**
 * The page's outer width-and-padding shell; content fades in on entry via the shared
 * `pageEnterAnimation` (ADR-0081).
 */
export declare const PageContainer: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
/** Title row at the top of a page: the heading stack left, {@link PageActions} right. */
export declare const PageHeader: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
/** The page's `h1`, on the page-title type role. */
export declare const PageTitle: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
/** One muted line under a {@link PageTitle}. */
export declare const PageSubtitle: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
/** Right-aligned action cluster inside a {@link PageHeader}. */
export declare const PageActions: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
