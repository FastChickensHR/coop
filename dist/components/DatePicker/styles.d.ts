import * as Popover from '@radix-ui/react-popover';
import type { FieldStatus } from '../FormField/context';
/**
 * The DatePicker's styled set (#1228): moved to this sibling per docs/code-style.md
 * (Functions 6 — styled decls past ~10 move to a sibling styles file). Extracted verbatim,
 * layout comments included — several are measured decisions (ADR-0816 §6).
 */
export declare const FieldWrap: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
export declare const TextInput: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Merged<Omit<import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}, {
    $status?: FieldStatus;
    $openEnded?: boolean;
}>> & string;
export declare const CalendarButton: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
export declare const Content: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<Popover.PopoverContentProps & import("react").RefAttributes<HTMLDivElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string & Omit<import("react").ForwardRefExoticComponent<Popover.PopoverContentProps & import("react").RefAttributes<HTMLDivElement>>, keyof import("react").Component<any, {}, any>>;
export declare const CalHeader: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
export declare const NavButton: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
export declare const MonthLabel: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
export declare const Grid: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
export declare const Weekday: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
export declare const DayButton: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Merged<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}, {
    $selected?: boolean;
    $today?: boolean;
    $outside?: boolean;
}>> & string;
export declare const ParseHint: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
/**
 * The quick-pick row, ABOVE the day grid (ADR-0816 §6). Measured at true size: every horizontal
 * placement costs the same +136px of height, because `1st of next month` (~9rem) does not fit
 * three-across a 17.5rem grid — "footer row" was never a row, it is a stack. That collapses the
 * trade to pure adjacency, and under §3 focus stays in the input, so the popover's TOP edge is the
 * edge nearest the field: the fast path belongs closest to the caret and first in reading order.
 * Accepted cost: `‹ July 2026 ›` is no longer the first thing in the popover.
 */
export declare const PickRow: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
export declare const PickButton: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
/**
 * ⚠️ ONE inline `<span>`, never sibling flex items — siblings trim the trailing space and ship
 * `1st of nextmonth`. Discovery is the marked token letter inside the label the user already
 * reads; the shortcut rides in the accessible name (`Today, type t`), never `aria-keyshortcuts`,
 * which means "a key that activates this control".
 */
export declare const PickLabel: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
export declare const Mark: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
