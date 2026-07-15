import * as RadixPopover from '@radix-ui/react-popover';
/**
 * Radix root parts for the Popover (ADR-0175). Kept in a `.ts` file separate
 * from the styled component so neither file mixes component and non-component
 * exports — Fast Refresh stays happy (same reason as the design-docs split).
 */
export declare const Popover: import("react").FC<RadixPopover.PopoverProps>;
export declare const PopoverTrigger: import("react").ForwardRefExoticComponent<RadixPopover.PopoverTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
export declare const PopoverClose: import("react").ForwardRefExoticComponent<RadixPopover.PopoverCloseProps & import("react").RefAttributes<HTMLButtonElement>>;
