export interface PaginationProps {
    /** 1-based current page. */
    page: number;
    /** Total number of pages. */
    pageCount: number;
    onPageChange: (page: number) => void;
    className?: string;
}
/**
 * Page navigation for a long, paged list or table (ADR-0175). Shows first/last,
 * a window around the current page, and ellipses for the gaps. Use it when a
 * table has more rows than one screen; for endless feeds, prefer load-more.
 */
export declare function Pagination({ page, pageCount, onPageChange, className }: PaginationProps): import("react").JSX.Element | null;
