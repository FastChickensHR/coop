import { type FocusEvent, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent } from 'react';
import type { CalendarDate } from '@internationalized/date';
import { type DateInputOptions } from './model';
/**
 * Where the user is, as ONE named state (#1228 — was two interacting booleans, `focused` +
 * `inGrid`, whose only legal overlap encoded transition ordering):
 *
 * - `blurred` — neither the input nor the grid has focus.
 * - `input`   — real DOM focus is in the text input (ADR-0816 §3: opening the calendar does
 *               NOT move it; arrows stay caret movement and typing continues).
 * - `grid`    — the user explicitly entered the day grid (ArrowDown), so all four arrows are
 *               the grid's. Virtual focus lost on a structural point worth remembering: a
 *               listbox is 1-D so a combobox need only hijack Up/Down, but a 2-D grid needs
 *               Left/Right — which would steal the caret and destroy the segment editing §1
 *               and §2 spent two slices restoring.
 */
export type FocusZone = 'blurred' | 'input' | 'grid';
export interface DateTextEditingCollaborators {
    value: string | null | undefined;
    onValueChange?: (value: string | null) => void;
    isOpenEnded: boolean;
    options: DateInputOptions;
    /** Whether the calendar popover is open — the live paths only steer the grid while it is. */
    isCalendarOpen: () => boolean;
    /** Open the calendar re-anchored on the current value (the ArrowDown door). */
    openCalendar: () => void;
    /** Close the calendar (leaving focus wherever the caller decides). */
    closeCalendar: () => void;
    /** Steer the calendar's focused day to a freshly-resolved date (§3 trap 6 — grid follows typing). */
    followDate: (date: CalendarDate) => void;
}
/**
 * The text-editing half of the DatePicker (#1228): the §1/§2/§5 machine — ISO-string display,
 * select-all on entry, the typed quick-pick door — extracted from ~10 inline JSX handlers so
 * the component keeps only wiring and markup. Every measured trap comment rode along.
 */
export declare function useDateTextEditing({ value, onValueChange, isOpenEnded, options, isCalendarOpen, openCalendar, closeCalendar, followDate, }: DateTextEditingCollaborators): {
    focusZone: FocusZone;
    setFocusZone: import("react").Dispatch<import("react").SetStateAction<FocusZone>>;
    text: string;
    parseError: boolean;
    setParseError: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    inputRef: import("react").RefObject<HTMLInputElement | null>;
    handlers: {
        onMouseDown: () => void;
        onMouseUp: (e: ReactMouseEvent<HTMLInputElement>) => void;
        onFocus: () => void;
        onChange: (e: FocusEvent<HTMLInputElement>) => void;
        onBlur: () => void;
        onKeyDown: (e: ReactKeyboardEvent<HTMLInputElement>) => void;
    };
    commitPicked: (next: string | null) => void;
    closeToInput: () => void;
};
