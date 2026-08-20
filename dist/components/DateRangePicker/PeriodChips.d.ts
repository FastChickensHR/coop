/** Both ends of a range, written together. Never open-ended — a period always has two dates. */
export interface DateRangeValue {
    start: string;
    end: string;
}
export interface PeriodChipsProps {
    /** The range's **outer** bounds. See {@link rangePicksFor} — coupling bounds must not be passed. */
    min?: string | null;
    max?: string | null;
    disabled?: boolean;
    /** Accessible name for the group, so two ranges on one page are tellable apart. */
    'aria-label': string;
    /** Applies the whole period in one call. Sequential per-end writes are not safe here. */
    onPick: (range: DateRangeValue) => void;
}
/**
 * The four calendar-period chips (ADR-0816 §7): `This month` · `Next month` · `This year` ·
 * `Next year`, rendered inline after a {@link DateRangePicker}'s pair.
 *
 * Three of the four periods **cannot be said from the two half-lists at all** — §4's start edge has
 * no "1st of this month", and its end edge has no "end of next month" or "end of next year" — so
 * this is not a press-saver but the only path to them. There is deliberately **no typed door**: the
 * range level has no text buffer of its own, and four more range words would break §5's
 * unique-prefix vocabulary three ways on `t`.
 *
 * ⚠️ Not the app's {@link Chip} (ADR-0175), which is a *removable token* — a `<span>` you dismiss.
 * These are momentary actions, so they are buttons. Same word, different thing; do not "unify" them.
 *
 * ⚠️ Likewise not a `ToggleGroup`: a pressed state would lie about a gesture that only ever fires.
 * The one tab stop comes from a hand-rolled roving `tabIndex` instead.
 *
 * ⚠️ Picks resolve against today at render time (never memoised), so a page left open across
 * midnight cannot offer a chip that writes yesterday's month.
 */
export declare function PeriodChips({ min, max, disabled, 'aria-label': ariaLabel, onPick, }: PeriodChipsProps): import("react").JSX.Element | null;
