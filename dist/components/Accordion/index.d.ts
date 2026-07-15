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
export declare const AccordionItem: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<RadixAccordion.AccordionItemProps & import("react").RefAttributes<HTMLDivElement>, never> & Partial<Pick<RadixAccordion.AccordionItemProps & import("react").RefAttributes<HTMLDivElement>, never>>> & string & Omit<import("react").ForwardRefExoticComponent<RadixAccordion.AccordionItemProps & import("react").RefAttributes<HTMLDivElement>>, keyof import("react").Component<any, {}, any>>;
export declare const AccordionHeader: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<RadixAccordion.AccordionHeaderProps & import("react").RefAttributes<HTMLHeadingElement>, never> & Partial<Pick<RadixAccordion.AccordionHeaderProps & import("react").RefAttributes<HTMLHeadingElement>, never>>> & string & Omit<import("react").ForwardRefExoticComponent<RadixAccordion.AccordionHeaderProps & import("react").RefAttributes<HTMLHeadingElement>>, keyof import("react").Component<any, {}, any>>;
export declare const AccordionTrigger: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<RadixAccordion.AccordionTriggerProps & import("react").RefAttributes<HTMLButtonElement>, never> & Partial<Pick<RadixAccordion.AccordionTriggerProps & import("react").RefAttributes<HTMLButtonElement>, never>>> & string & Omit<import("react").ForwardRefExoticComponent<RadixAccordion.AccordionTriggerProps & import("react").RefAttributes<HTMLButtonElement>>, keyof import("react").Component<any, {}, any>>;
export declare const AccordionContent: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<RadixAccordion.AccordionContentProps & import("react").RefAttributes<HTMLDivElement>, never> & Partial<Pick<RadixAccordion.AccordionContentProps & import("react").RefAttributes<HTMLDivElement>, never>>> & string & Omit<import("react").ForwardRefExoticComponent<RadixAccordion.AccordionContentProps & import("react").RefAttributes<HTMLDivElement>>, keyof import("react").Component<any, {}, any>>;
