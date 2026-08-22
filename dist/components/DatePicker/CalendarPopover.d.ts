import { type KeyboardEvent as ReactKeyboardEvent, type RefObject } from 'react';
import type { CalendarDate } from '@internationalized/date';
import type { QuickPick } from '../../lib/quickPicks';
export interface CalendarPopoverProps {
    calendarId?: string;
    picks: QuickPick[];
    anchor: CalendarDate;
    cells: CalendarDate[];
    valueIso: string | null;
    todayIso: string;
    focusIso: string;
    min?: string | null;
    max?: string | null;
    inGrid: boolean;
    inputRef: RefObject<HTMLInputElement | null>;
    onMonthShift: (months: number) => void;
    onPressQuickPick: (pick: QuickPick) => void;
    onPickDay: (day: CalendarDate) => void;
    onGridKeyDown: (event: ReactKeyboardEvent) => void;
    onGridElement: (element: HTMLDivElement | null) => void;
    onEscapeFromGrid: () => void;
}
/** The popover half of the DatePicker (#1228): quick picks, month header, day grid — markup
 *  only; every decision flows back through the callbacks the component wires in. */
export declare function CalendarPopover({ calendarId, picks, anchor, cells, valueIso, todayIso, focusIso, min, max, inGrid, inputRef, onMonthShift, onPressQuickPick, onPickDay, onGridKeyDown, onGridElement, onEscapeFromGrid, }: CalendarPopoverProps): import("react").JSX.Element;
