import * as RadixAccordion from '@radix-ui/react-accordion';
/**
 * Vertically stacked, expandable sections (ADR-0175). Radix-backed: keyboard
 * nav, single- or multiple-open. Use an Accordion to let the user reveal detail
 * on demand in a long page (an FAQ, grouped settings); for switching between
 * peer views use Tabs, and for a modal aside use a Drawer or Popover.
 *
 * Compose like Radix: `Accordion` (root, `type="single"|"multiple"`) ›
 * `AccordionItem` › `AccordionHeader` › `AccordionTrigger` / `AccordionContent`.
 */
export declare const Accordion: import("react").ForwardRefExoticComponent<(RadixAccordion.AccordionSingleProps | RadixAccordion.AccordionMultipleProps) & import("react").RefAttributes<HTMLDivElement>>;
/** One collapsible section of an Accordion; borders make adjacent items read as one stack. */
export declare const AccordionItem: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<RadixAccordion.AccordionItemProps & import("react").RefAttributes<HTMLDivElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string & Omit<import("react").ForwardRefExoticComponent<RadixAccordion.AccordionItemProps & import("react").RefAttributes<HTMLDivElement>>, keyof import("react").Component<any, {}, any>>;
/** The heading wrapper Radix requires around an {@link AccordionTrigger} — heading semantics without heading styles. */
export declare const AccordionHeader: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<RadixAccordion.AccordionHeaderProps & import("react").RefAttributes<HTMLHeadingElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string & Omit<import("react").ForwardRefExoticComponent<RadixAccordion.AccordionHeaderProps & import("react").RefAttributes<HTMLHeadingElement>>, keyof import("react").Component<any, {}, any>>;
/** The click target that opens and closes its item; the chevron tracks the open state. */
export declare const AccordionTrigger: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<RadixAccordion.AccordionTriggerProps & import("react").RefAttributes<HTMLButtonElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string & Omit<import("react").ForwardRefExoticComponent<RadixAccordion.AccordionTriggerProps & import("react").RefAttributes<HTMLButtonElement>>, keyof import("react").Component<any, {}, any>>;
/** The collapsible body of an accordion item, muted relative to its trigger. */
export declare const AccordionContent: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<RadixAccordion.AccordionContentProps & import("react").RefAttributes<HTMLDivElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string & Omit<import("react").ForwardRefExoticComponent<RadixAccordion.AccordionContentProps & import("react").RefAttributes<HTMLDivElement>>, keyof import("react").Component<any, {}, any>>;
