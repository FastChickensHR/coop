import * as RadixPopover from '@radix-ui/react-popover'

/**
 * Radix root parts for the Popover (ADR-0175). Kept in a `.ts` file separate
 * from the styled component so neither file mixes component and non-component
 * exports — Fast Refresh stays happy (same reason as the design-docs split).
 */
export const Popover = RadixPopover.Root
export const PopoverTrigger = RadixPopover.Trigger
export const PopoverClose = RadixPopover.Close
