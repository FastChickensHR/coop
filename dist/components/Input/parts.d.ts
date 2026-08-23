import type { FieldStatus } from '../FormField/context';
/** Inline error message styling, shared by FormField and standalone forms. */
export declare const ErrorText: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
/**
 * Inline validation message coloured by semantic status (ADR-0157): red / yellow
 * / green for error / warning / success. Used by FormField for all three states.
 */
export declare const StatusMessage: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Merged<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}, {
    status: FieldStatus;
}>> & string;
/** Lightweight vertical label+control+error stack for hand-laid-out forms. */
export declare const Field: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
