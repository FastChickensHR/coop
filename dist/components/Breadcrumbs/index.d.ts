import { type ReactNode } from 'react';
export interface Crumb {
    label: ReactNode;
    /** Link target; omit for the current (last) page. */
    href?: string;
}
export interface BreadcrumbsProps {
    items: Crumb[];
    className?: string;
}
/**
 * Shows the path to the current page and lets the user step back up it
 * (ADR-0175). Use it on deep pages where the hierarchy isn't obvious from the
 * sidebar. The last crumb is the current page (not a link). Renders plain
 * anchors so it stays dependency-light; wrap them with your router at the call
 * site if you need client-side nav.
 */
export declare function Breadcrumbs({ items, className }: BreadcrumbsProps): import("react").JSX.Element;
