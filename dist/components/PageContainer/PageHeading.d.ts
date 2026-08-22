import type { ReactNode } from 'react';
/**
 * The one sanctioned page header: title + optional subtitle (stacked left) +
 * optional actions (right, top-aligned). Replaces the ad-hoc HeaderLeft /
 * TitleGroup / HeaderRight wrappers pages used to hand-roll.
 */
export declare function PageHeading({ title, subtitle, actions, }: {
    title: ReactNode;
    subtitle?: ReactNode;
    actions?: ReactNode;
}): import("react").JSX.Element;
