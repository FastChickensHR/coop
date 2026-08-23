import * as RadixPopover from '@radix-ui/react-popover';
import type { ComponentProps } from 'react';
declare const StyledContent: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<RadixPopover.PopoverContentProps & import("react").RefAttributes<HTMLDivElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string & Omit<import("react").ForwardRefExoticComponent<RadixPopover.PopoverContentProps & import("react").RefAttributes<HTMLDivElement>>, keyof import("react").Component<any, {}, any>>;
export declare function PopoverContent(props: ComponentProps<typeof StyledContent>): import("react").JSX.Element;
export {};
