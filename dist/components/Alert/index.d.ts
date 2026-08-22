/** Semantic severity of an {@link Alert} — traffic-light vocabulary (ADR-0157). */
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';
/** Props for {@link Alert}. */
export interface AlertProps {
    /** Semantic severity — info / success / warning / error (traffic-light, ADR-0157). @default 'info' */
    variant?: AlertVariant;
}
/**
 * Inline callout for something the reader should notice, framed by severity. Compose from
 * {@link AlertIcon}, {@link AlertBody}, {@link AlertTitle} and {@link AlertMessage}.
 */
export declare const Alert: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "variant"> & AlertProps, never> & Partial<Pick<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "variant"> & AlertProps, never>>> & string;
/** The Alert's leading icon slot, top-aligned to the first text line. */
export declare const AlertIcon: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, never> & Partial<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, never>>> & string;
/** The Alert's text column — holds {@link AlertTitle} and {@link AlertMessage}. */
export declare const AlertBody: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never> & Partial<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>> & string;
/** One-line heading of an Alert. */
export declare const AlertTitle: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, never> & Partial<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, never>>> & string;
/** The Alert's body copy. */
export declare const AlertMessage: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, never> & Partial<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, never>>> & string;
