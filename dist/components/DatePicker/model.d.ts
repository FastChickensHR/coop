import { CalendarDate } from '@internationalized/date';
import { type DateEdge } from '../../lib/quickPicks';
/**
 * The DatePicker's pure policy (#1228) — the calendar math and the input-resolution door,
 * extracted from inline handlers so they are unit-testable apart from the component. The
 * component keeps only wiring, DOM-timing refs, and markup.
 */
export declare const LOCALE = "en-US";
export declare const MONTH_NAMES: string[];
export declare const WEEKDAYS: string[];
export declare function monthMatrix(anchor: CalendarDate): CalendarDate[];
/**
 * The three shapes `parseUserDate` accepts, spelled with a real date so the hint is copyable.
 * Display-only — the ban ADR-0816 §8 lands on hand-rolled *parsing*, not on formatting.
 */
export declare function acceptedShapes(iso: string): string;
export declare function dayLabel(d: CalendarDate): string;
export interface DateInputOptions {
    edge: DateEdge;
    allowOpenEnded?: boolean;
    min?: string | null;
    max?: string | null;
}
/**
 * What a raw input string resolves to. The component was spelling this policy three times —
 * blur-commit, live-commit, and Enter-expansion — with the door rule repeated at each site.
 */
export type DateInputResolution = {
    kind: 'empty';
} | {
    kind: 'date';
    iso: string;
} | {
    kind: 'pick';
    value: string | null;
} | {
    kind: 'invalid';
};
/**
 * Digits are dates, letters are shortcuts (ADR-0816 §5). The two sets are disjoint by
 * construction — every valid date input starts with a digit — so there is no parse order to
 * get wrong; the date attempt simply falls through. An out-of-range value (typed or via a
 * token) resolves invalid, refusing loudly.
 */
export declare function resolveDateInput(raw: string, options: DateInputOptions): DateInputResolution;
/**
 * The grid's keyboard vocabulary (ADR-0816 §3): arrows move by day/week, PageUp/PageDown by
 * month, Home to the month's start. Null for any key the grid does not own — Tab in
 * particular stays the component's leave-the-control concern.
 */
export declare function gridMove(key: string, from: CalendarDate): CalendarDate | null;
