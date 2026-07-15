/**
 * Key/value facts about a single thing (ADR-0175) — a details panel, a summary
 * card's body. A semantic `<dl>`: pair each `DescriptionTerm` (`<dt>`) with a
 * `DescriptionDetails` (`<dd>`). Prefer this over a two-column Table when the
 * data is one entity's attributes rather than a list of records. Styled-only.
 */
export declare const DescriptionList: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDListElement>, HTMLDListElement>, never> & Partial<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDListElement>, HTMLDListElement>, never>>> & string;
export declare const DescriptionTerm: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, never> & Partial<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, never>>> & string;
export declare const DescriptionDetails: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, never> & Partial<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, never>>> & string;
