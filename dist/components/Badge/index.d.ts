type StatusVariant = 'active' | 'pending' | 'terminated' | 'draft';
type TagVariant = 'inbound' | 'outbound' | 'default';
type BadgeVariant = StatusVariant | TagVariant;
export interface BadgeProps {
    /** Status or tag style (active/pending/terminated/draft/inbound/outbound). @default 'default' */
    variant?: BadgeVariant;
}
export declare const Badge: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "variant"> & BadgeProps, never> & Partial<Pick<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "variant"> & BadgeProps, never>>> & string;
export {};
