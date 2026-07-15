import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

/**
 * Radix root parts for the DropdownMenu (ADR-0175). Kept in a `.ts` file
 * separate from the styled parts + content so neither file mixes component and
 * non-component exports — Fast Refresh stays happy.
 */
export const DropdownMenu = RadixDropdownMenu.Root
export const DropdownMenuTrigger = RadixDropdownMenu.Trigger
