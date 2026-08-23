/**
 * Key/value facts about a single thing (ADR-0175) — a details panel, a summary
 * card's body. A semantic `<dl>`: pair each `DescriptionTerm` (`<dt>`) with a
 * `DescriptionDetails` (`<dd>`). Prefer this over a two-column Table when the
 * data is one entity's attributes rather than a list of records. Styled-only.
 */
export declare const DescriptionList: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDListElement>, HTMLDListElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
/** The label half of a DescriptionList row. */
export declare const DescriptionTerm: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
/** The value half of a DescriptionList row. */
export declare const DescriptionDetails: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
