/**
 * Which end of a period a date field sits on. A start edge is effective-from, a window or coverage
 * start, a cutover, or an as-of lens; an end edge is effective-until or a window/coverage end.
 * A bare `DatePicker` is a start edge.
 */
export type DateEdge = 'start' | 'end';
/** The closed token vocabulary. `month`/`year` mean the boundary *in the edge's direction*. */
export type QuickPickToken = 'today' | 'month' | 'year' | 'ongoing';
/** One offer of the field-level vocabulary: how it renders, how it is typed, and what it commits. */
export interface QuickPick {
    /** The typed token. Unique by first letter within its edge's list — see {@link matchQuickPick}. */
    token: QuickPickToken;
    /** Button label, e.g. `1st of next month`. */
    label: string;
    /**
     * Index into `label` of the token's first letter — the letter to mark for discovery
     * (`1st of next **m**onth`). ⚠️ The marked label must render in one inline `<span>`; sibling
     * flex items trim the trailing space and ship `1st of nextmonth`.
     */
    markIndex: number;
    /** Accessible name carrying the shortcut, e.g. `Today, type t`. Not `aria-keyshortcuts`. */
    accessibleName: string;
    /** What this pick commits: ISO `YYYY-MM-DD`, or `null` for the open-ended `Ongoing`. */
    value: string | null;
}
/** The four range periods (§7). Two grains, today-anchored, calendar-relative. */
export type RangePeriod = 'thisMonth' | 'nextMonth' | 'thisYear' | 'nextYear';
/** One offer of the range-level vocabulary: a whole calendar period, resolved to both its ends. */
export interface RangePick {
    /** Which period this chip applies. */
    period: RangePeriod;
    /** Chip label, e.g. `Next year`. There is no typed door at the range level. */
    label: string;
    /** ISO `YYYY-MM-DD` — both ends are always concrete; a period is never open-ended. */
    start: string;
    /** The period's closing boundary, ISO `YYYY-MM-DD` (see `start`). */
    end: string;
}
/**
 * Resolve a token to the value it commits, anchored to today. `ongoing` resolves to `null` (the
 * open-ended boundary); every other token resolves to an ISO `YYYY-MM-DD`.
 *
 * ⚠️ Reads {@link todayDate}, so this and everything built on it is zone-sensitive.
 */
export declare function resolveQuickPick(token: QuickPickToken, edge?: DateEdge): string | null;
/** The field context both doors resolve against — its edge, its open-endedness, and its bounds. */
interface FieldOptions {
    /** Defaults to a start edge — a bare `DatePicker`, and what `AsOfDatePicker` passes. */
    edge?: DateEdge;
    /** `Ongoing` appears only when the field allows an open-ended boundary. */
    allowOpenEnded?: boolean;
    /** The field's inclusive ISO bounds. Picks outside them are hidden. */
    min?: string | null;
    /** The field's inclusive upper ISO bound (see `min`). */
    max?: string | null;
}
/**
 * Every pick this field can offer, in list order — the button row above the grid.
 *
 * Out-of-range picks are **hidden**, so the row varies in length (the typed door refuses them
 * loudly instead, because a typist gets no visual cue to work from). `Ongoing` appears only with
 * `allowOpenEnded`, and is never range-gated: an open-ended boundary is the absence of a date.
 *
 * ⚠️ Values are resolved against today at call time, so build the row when the calendar opens
 * rather than memoising it for the life of the page.
 */
export declare function quickPicksFor({ edge, allowOpenEnded, min, max }?: FieldOptions): QuickPick[];
/** What the typed door made of the buffer so far. */
export type QuickPickMatch = 
/** No token starts with this text — including every input that starts with a digit. */
{
    kind: 'none';
}
/** Resolved, and the field's bounds forbid it. Refuse loudly; do not commit. */
 | {
    kind: 'outOfRange';
    pick: QuickPick;
} | {
    kind: 'match';
    pick: QuickPick;
};
/**
 * Match typed text against this field's vocabulary by **unique prefix**, case-insensitively.
 *
 * Because every valid date input starts with a digit and every token starts with a letter, the two
 * are disjoint by construction — there is no parse order to get wrong. And because the tokens in
 * an edge's list have distinct first letters, any non-empty prefix matches at most one of them:
 * `t`, `to`, `tod` and `today` all resolve alike, so **a prefix never commits a different value
 * than the whole word**. That is what preserves live-commit-as-you-type (§1).
 *
 * Empty text is not a shortcut — it is an empty field.
 */
export declare function matchQuickPick(text: string, opts?: FieldOptions): QuickPickMatch;
/** Resolve a period to both its ends, anchored to today. Calendar-relative — never a plan year. */
export declare function resolveRangePeriod(period: RangePeriod): {
    start: string;
    end: string;
};
/**
 * The range chips this range can offer, in list order.
 *
 * ⚠️ Applicability consults **only the outer `min`/`max`, all-or-nothing**: the two halves' mutual
 * coupling bounds cannot gate a pick that replaces both ends at once, and a period whose start is
 * allowed but whose end is not would write a range the field then rejects.
 */
export declare function rangePicksFor({ min, max }?: {
    min?: string | null;
    max?: string | null;
}): RangePick[];
export {};
