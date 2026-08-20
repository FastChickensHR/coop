import * as RadixTabs from '@radix-ui/react-tabs';
/**
 * A tab set — sibling views of the same subject, one shown at a time
 * (ADR-0175). Radix-backed: roving focus, arrow-key nav, correct
 * `tablist`/`tab`/`tabpanel` roles. Use tabs to slice one page's content;
 * to move between pages use navigation, and for a mutually-exclusive
 * *setting* use ToggleGroup or a Radio group.
 *
 * Compose like Radix: `Tabs` (root, `value` / `defaultValue` +
 * `onValueChange`) › `TabsList` › `TabsTrigger value="…"`, then one
 * `TabsContent value="…"` per trigger.
 */
export declare const Tabs: import("react").ForwardRefExoticComponent<RadixTabs.TabsProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const TabsList: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<RadixTabs.TabsListProps & import("react").RefAttributes<HTMLDivElement>, never> & Partial<Pick<RadixTabs.TabsListProps & import("react").RefAttributes<HTMLDivElement>, never>>> & string & Omit<import("react").ForwardRefExoticComponent<RadixTabs.TabsListProps & import("react").RefAttributes<HTMLDivElement>>, keyof import("react").Component<any, {}, any>>;
export declare const TabsTrigger: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<RadixTabs.TabsTriggerProps & import("react").RefAttributes<HTMLButtonElement>, never> & Partial<Pick<RadixTabs.TabsTriggerProps & import("react").RefAttributes<HTMLButtonElement>, never>>> & string & Omit<import("react").ForwardRefExoticComponent<RadixTabs.TabsTriggerProps & import("react").RefAttributes<HTMLButtonElement>>, keyof import("react").Component<any, {}, any>>;
export declare const TabsContent: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<RadixTabs.TabsContentProps & import("react").RefAttributes<HTMLDivElement>, never> & Partial<Pick<RadixTabs.TabsContentProps & import("react").RefAttributes<HTMLDivElement>, never>>> & string & Omit<import("react").ForwardRefExoticComponent<RadixTabs.TabsContentProps & import("react").RefAttributes<HTMLDivElement>>, keyof import("react").Component<any, {}, any>>;
