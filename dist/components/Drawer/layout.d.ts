import type { ReactNode } from 'react';
/** The drawer body: a vertical stack of sections at one gap. */
export declare function DrawerBody({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
/** A labelled group within a drawer body. */
export declare function DrawerSection({ title, children }: {
    title?: ReactNode;
    children: ReactNode;
}): import("react").JSX.Element;
/** A label + value/control row, consistent across every drawer. */
export declare function DrawerField({ label, children }: {
    label: ReactNode;
    children: ReactNode;
}): import("react").JSX.Element;
