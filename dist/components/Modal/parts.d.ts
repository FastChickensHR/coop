import * as Dialog from '@radix-ui/react-dialog';
/**
 * Dialog chrome shared by {@link Modal} and the Drawer (#1210). The app audit (#1192) found
 * the app/public Drawer re-declaring this set as a near-copy of Modal's — one home now.
 * Internal to coop: consumers compose Modal or Drawer, never these parts.
 */
export declare const HeaderText: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
export declare const Title: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<Dialog.DialogTitleProps & import("react").RefAttributes<HTMLHeadingElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string & Omit<import("react").ForwardRefExoticComponent<Dialog.DialogTitleProps & import("react").RefAttributes<HTMLHeadingElement>>, keyof import("react").Component<any, {}, any>>;
export declare const Description: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<Dialog.DialogDescriptionProps & import("react").RefAttributes<HTMLParagraphElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string & Omit<import("react").ForwardRefExoticComponent<Dialog.DialogDescriptionProps & import("react").RefAttributes<HTMLParagraphElement>>, keyof import("react").Component<any, {}, any>>;
export declare const CloseButton: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
