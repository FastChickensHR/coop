type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
type Size = 'sm' | 'md' | 'lg';
/** Props for {@link Button}. */
export interface ButtonProps {
    /** Visual emphasis. `primary` = the one commit action per view; `danger` = destructive. @default 'primary' */
    variant?: Variant;
    /** Control height/padding. @default 'md' */
    size?: Size;
}
/**
 * The standard button: `variant` carries emphasis (one `primary` commit action per view,
 * ADR-0157), `size` tracks the shared control heights.
 */
export declare const Button: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Merged<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}, ButtonProps>> & string;
export {};
