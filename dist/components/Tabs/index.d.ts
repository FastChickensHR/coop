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
/** The tab strip (underline style). */
export declare const TabsList: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<RadixTabs.TabsListProps & import("react").RefAttributes<HTMLDivElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string & Omit<import("react").ForwardRefExoticComponent<RadixTabs.TabsListProps & import("react").RefAttributes<HTMLDivElement>>, keyof import("react").Component<any, {}, any>>;
/** One tab; the active tab underlines and takes the ink tone. */
export declare const TabsTrigger: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<RadixTabs.TabsTriggerProps & import("react").RefAttributes<HTMLButtonElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string & Omit<import("react").ForwardRefExoticComponent<RadixTabs.TabsTriggerProps & import("react").RefAttributes<HTMLButtonElement>>, keyof import("react").Component<any, {}, any>>;
/** A tab's panel; inactive panels unmount (the Radix default). */
export declare const TabsContent: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<RadixTabs.TabsContentProps & import("react").RefAttributes<HTMLDivElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string & Omit<import("react").ForwardRefExoticComponent<RadixTabs.TabsContentProps & import("react").RefAttributes<HTMLDivElement>>, keyof import("react").Component<any, {}, any>>;
