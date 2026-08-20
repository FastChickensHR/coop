export interface PaginationProps {
    /** 1-based current page. */
    page: number;
    /** Total number of pages. */
    pageCount: number;
    /** Called with the 1-based page the user picked (arrows included). */
    onPageChange: (page: number) => void;
    /** Class name for the root `<nav>` (for layout only — colour and size come from the theme). */
    className?: string;
}
/**
 * Page navigation for a long, paged list or table (ADR-0175). Shows first/last,
 * a window around the current page, and ellipses for the gaps. Use it when a
 * table has more rows than one screen; for endless feeds, prefer load-more.
 */
export declare function Pagination({ page, pageCount, onPageChange, className }: PaginationProps): import("react").JSX.Element | null;
