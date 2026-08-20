type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
type Size = 'sm' | 'md' | 'lg';
export interface ButtonProps {
    /** Visual emphasis. `primary` = the one commit action per view; `danger` = destructive. @default 'primary' */
    variant?: Variant;
    /** Control height/padding. @default 'md' */
    size?: Size;
}
export declare const Button: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, keyof ButtonProps> & ButtonProps, never> & Partial<Pick<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, keyof ButtonProps> & ButtonProps, never>>> & string;
export {};
