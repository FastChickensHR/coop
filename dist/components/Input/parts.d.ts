import type { FieldStatus } from '../FormField/context';
/** Inline error message styling, shared by FormField and standalone forms. */
export declare const ErrorText: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, never> & Partial<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, never>>> & string;
/**
 * Inline validation message coloured by semantic status (ADR-0157): red / yellow
 * / green for error / warning / success. Used by FormField for all three states.
 */
export declare const StatusMessage: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "status"> & {
    status: FieldStatus;
}, never> & Partial<Pick<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "status"> & {
    status: FieldStatus;
}, never>>> & string;
/** Lightweight vertical label+control+error stack for hand-laid-out forms. */
export declare const Field: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never> & Partial<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>> & string;
