import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
/**
 * The styled menu parts for a {@link DropdownMenu} (ADR-0175). Styled-only file
 * (no function component) so Fast Refresh stays happy; the Portal-wrapping
 * content lives in `DropdownMenuContent.tsx`.
 */
export declare const DropdownMenuItem: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Merged<Omit<RadixDropdownMenu.DropdownMenuItemProps & import("react").RefAttributes<HTMLDivElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}, {
    danger?: boolean;
}>> & string & Omit<import("react").ForwardRefExoticComponent<RadixDropdownMenu.DropdownMenuItemProps & import("react").RefAttributes<HTMLDivElement>>, keyof import("react").Component<any, {}, any>>;
export declare const DropdownMenuSeparator: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<RadixDropdownMenu.DropdownMenuSeparatorProps & import("react").RefAttributes<HTMLDivElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string & Omit<import("react").ForwardRefExoticComponent<RadixDropdownMenu.DropdownMenuSeparatorProps & import("react").RefAttributes<HTMLDivElement>>, keyof import("react").Component<any, {}, any>>;
export declare const DropdownMenuLabel: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<RadixDropdownMenu.DropdownMenuLabelProps & import("react").RefAttributes<HTMLDivElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string & Omit<import("react").ForwardRefExoticComponent<RadixDropdownMenu.DropdownMenuLabelProps & import("react").RefAttributes<HTMLDivElement>>, keyof import("react").Component<any, {}, any>>;
