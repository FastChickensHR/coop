/** Horizontal-scroll wrapper so wide tables never overflow the page body. */
export declare const TableScroll: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
/**
 * The standard data table. Compose with {@link Thead}/{@link Tbody}/{@link Tr}/{@link Th}/
 * {@link Td} — ADR-0075 requires these over raw table elements or local styled copies.
 */
export declare const Table: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
/** The header band, on the surface tone. */
export declare const Thead: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
/** The body; exists so composition mirrors the HTML table model. */
export declare const Tbody: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}> & string;
/** A row; `interactive` adds the hover affordance for click-to-expand rows. */
export declare const Tr: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Merged<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}, {
    interactive?: boolean;
}>> & string;
type Align = 'left' | 'right' | 'center';
/** A header cell; `align` and `noBorder` mirror Td's. */
export declare const Th: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Merged<Omit<import("react").DetailedHTMLProps<import("react").ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}, {
    noBorder?: boolean;
    align?: Align;
}>> & string;
/** A body cell; `align`/`noBorder` control layout, `mono`/`muted` compose per the note above. */
export declare const Td: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Merged<Omit<import("react").DetailedHTMLProps<import("react").TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}, {
    noBorder?: boolean;
    align?: Align;
    mono?: boolean;
    muted?: boolean;
}>> & string;
/** The bitemporal timeline variant of {@link Table} — see the note above for its markers. */
export declare const Timeline: import("styled-components/dist/types").IStyledComponentBase<"web", Omit<import("styled-components").FastOmit<Omit<import("react").DetailedHTMLProps<import("react").TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | undefined;
}, "as" | "forwardedAs"> & {
    as?: import("styled-components").WebTarget | undefined;
    forwardedAs?: import("styled-components").WebTarget | undefined;
}, "style"> & {
    style?: import("react").CSSProperties | import("styled-components/dist/types").CSSPropertiesWithVars | (import("react").CSSProperties & {
        [key: `--${string}`]: string | number | undefined;
    }) | undefined;
}> & string;
export {};
