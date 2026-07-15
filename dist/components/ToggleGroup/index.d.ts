import * as RadixToggleGroup from '@radix-ui/react-toggle-group';
/**
 * A segmented control — a small set of mutually-exclusive (or multi-select)
 * options shown side by side, one pressed at a time (ADR-0175). Radix-backed:
 * roving focus, arrow-key nav. Use it to switch a view's mode inline (list vs
 * grid, a date range) where the choices are few and worth showing at once; for
 * a value in a form use Select or Radio group, and for on/off use Switch.
 *
 * Compose like Radix: `ToggleGroup` (root, `type="single"|"multiple"`) ›
 * `ToggleGroupItem value="…"`.
 */
export declare const ToggleGroup: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<(RadixToggleGroup.ToggleGroupSingleProps & import("react").RefAttributes<HTMLDivElement>) | (RadixToggleGroup.ToggleGroupMultipleProps & import("react").RefAttributes<HTMLDivElement>), never> & Partial<Pick<(RadixToggleGroup.ToggleGroupSingleProps & import("react").RefAttributes<HTMLDivElement>) | (RadixToggleGroup.ToggleGroupMultipleProps & import("react").RefAttributes<HTMLDivElement>), never>>> & string & Omit<import("react").ForwardRefExoticComponent<(RadixToggleGroup.ToggleGroupSingleProps | RadixToggleGroup.ToggleGroupMultipleProps) & import("react").RefAttributes<HTMLDivElement>>, keyof import("react").Component<any, {}, any>>;
export declare const ToggleGroupItem: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<RadixToggleGroup.ToggleGroupItemProps & import("react").RefAttributes<HTMLButtonElement>, never> & Partial<Pick<RadixToggleGroup.ToggleGroupItemProps & import("react").RefAttributes<HTMLButtonElement>, never>>> & string & Omit<import("react").ForwardRefExoticComponent<RadixToggleGroup.ToggleGroupItemProps & import("react").RefAttributes<HTMLButtonElement>>, keyof import("react").Component<any, {}, any>>;
