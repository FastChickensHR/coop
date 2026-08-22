/** Horizontal-scroll wrapper so wide tables never overflow the page body. */
export declare const TableScroll: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never> & Partial<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>> & string;
/**
 * The standard data table. Compose with {@link Thead}/{@link Tbody}/{@link Tr}/{@link Th}/
 * {@link Td} — ADR-0075 requires these over raw table elements or local styled copies.
 */
export declare const Table: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>, never> & Partial<Pick<import("react").DetailedHTMLProps<import("react").TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>, never>>> & string;
/** The header band, on the surface tone. */
export declare const Thead: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>, never> & Partial<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>, never>>> & string;
/** The body; exists so composition mirrors the HTML table model. */
export declare const Tbody: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>, never> & Partial<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>, never>>> & string;
/** A row; `interactive` adds the hover affordance for click-to-expand rows. */
export declare const Tr: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>, "interactive"> & {
    interactive?: boolean;
}, never> & Partial<Pick<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>, "interactive"> & {
    interactive?: boolean;
}, never>>> & string;
type Align = 'left' | 'right' | 'center';
/** A header cell; `align` and `noBorder` mirror Td's. */
export declare const Th: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>, "align" | "noBorder"> & {
    noBorder?: boolean;
    align?: Align;
}, never> & Partial<Pick<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>, "align" | "noBorder"> & {
    noBorder?: boolean;
    align?: Align;
}, never>>> & string;
/** A body cell; `align`/`noBorder` control layout, `mono`/`muted` compose per the note above. */
export declare const Td: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>, "align" | "noBorder" | "mono" | "muted"> & {
    noBorder?: boolean;
    align?: Align;
    mono?: boolean;
    muted?: boolean;
}, never> & Partial<Pick<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>, "align" | "noBorder" | "mono" | "muted"> & {
    noBorder?: boolean;
    align?: Align;
    mono?: boolean;
    muted?: boolean;
}, never>>> & string;
/** The bitemporal timeline variant of {@link Table} — see the note above for its markers. */
export declare const Timeline: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("styled-components").FastOmit<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>, never> & Partial<Pick<import("react").DetailedHTMLProps<import("react").TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>, never>>, "as" | "forwardedAs"> & {
    as?: import("styled-components").WebTarget | undefined;
    forwardedAs?: import("styled-components").WebTarget | undefined;
}, never> & Partial<Pick<import("styled-components").FastOmit<import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>, never> & Partial<Pick<import("react").DetailedHTMLProps<import("react").TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>, never>>, "as" | "forwardedAs"> & {
    as?: import("styled-components").WebTarget | undefined;
    forwardedAs?: import("styled-components").WebTarget | undefined;
}, never>>> & string;
export {};
