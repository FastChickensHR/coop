/**
 * Type roles — the semantic typography vocabulary (ADR-0229).
 *
 * A role is a *composed* type style: family + weight + size + line-height + tracking,
 * as one thing you can reach for. The theme's raw scales (`fontSize`, `fontWeight`,
 * `lineHeight`, `letterSpacing`, `typography.fontFamily`) are the alphabet; these are
 * the words. Reach for a role first — assemble raw tokens only when no role fits.
 *
 * They live here rather than inside the theme object, mirroring `theme/motion.ts`:
 * tokens are plain data in the theme, css helpers are module exports beside it that
 * read those tokens. That keeps `theme/index.ts` free of styled-components and keeps
 * the theme object serializable.
 *
 * Usage — interpolate the whole role, don't cherry-pick fields:
 *
 * ```ts
 * const PageTitle = styled.h1`
 *   ${h1Type}
 *   color: ${({ theme }) => theme.colors.ink};
 * `
 * ```
 *
 * Roles set type only — never colour, margin, or alignment. Those are the caller's,
 * because they vary per surface while the type doesn't.
 *
 * Sizes are the ones the app already shipped, so adopting a role never re-renders
 * anything. Note they're rem against a 112.5% root (ADR-0044) — see `fontSize` in
 * `theme/index.ts` for what each step actually renders at.
 */
/**
 * The loudest thing on a page: hero headlines, marketing, the design overview.
 * Italic Archivo Black — the one place the type echoes the wordmark's forward lean.
 * Rare by design; if two Displays are visible at once, one of them is an h1.
 */
export declare const displayType: import("styled-components").RuleSet<object>;
/** The page's single title. One per view. */
export declare const h1Type: import("styled-components").RuleSet<object>;
/** Section headings within a page. */
export declare const h2Type: import("styled-components").RuleSet<object>;
/**
 * The title of a *region* of content — a card, a panel, a drawer section. This is
 * what `Section`'s `SectionTitle` already is (sans · sm · semibold), named after it.
 *
 * Deliberately NOT called `h3`: it is not the third step of the display hierarchy.
 * `h1`/`h2` are large Archivo; this is small sans and renders *below* `body` — a
 * different species, not a smaller heading. Naming it `h3` implied a slot in a
 * scale it doesn't occupy. (ADR-0240, renamed in its 2026-07-15 amendment.)
 *
 * Titling a region → this. Labelling a single value or field → {@link overlineType}.
 */
export declare const sectionTitleType: import("styled-components").RuleSet<object>;
/** Intro/lede paragraphs — the sentence under a heading that sets up the page. */
export declare const bodyLargeType: import("styled-components").RuleSet<object>;
/** Default prose and table text — the workhorse. */
export declare const bodyType: import("styled-components").RuleSet<object>;
/**
 * Dense body — secondary copy, table cells, drawer detail. The app's real
 * workhorse (`sm` is its most-used size); a touch tighter leading than `body`
 * so compact UI doesn't get airy. (ADR-0240.)
 */
export declare const bodySmallType: import("styled-components").RuleSet<object>;
/** Meta text — timestamps, counts, hints under a field. (ADR-0240.) */
export declare const captionType: import("styled-components").RuleSet<object>;
/**
 * Small mono labels above a value or section — field labels, data annotations,
 * token names. Wide tracking keeps it legible at this size. Not for prose.
 */
export declare const overlineType: import("styled-components").RuleSet<object>;
/**
 * Monospace data — codes, IDs, EDI values, column names. The app leans on mono
 * heavily (its second-most-used family) for machine-legible values. Not for
 * prose. (ADR-0240.)
 */
export declare const monoType: import("styled-components").RuleSet<object>;
/** The title of a whole page or detail view — the app's `PageTitle`. */
export declare const pageTitleType: import("styled-components").RuleSet<object>;
/** A heading over a panel or a settings/detail section — below a page title. */
export declare const panelHeadingType: import("styled-components").RuleSet<object>;
/** The title of a card or a small in-panel block — below a panel heading. */
export declare const cardHeadingType: import("styled-components").RuleSet<object>;
/**
 * A mono eyebrow over a card or group — the app's heavy `CardTitle`/`GroupLabel`
 * usage. Distinct from {@link overlineType}: heavier (semibold vs medium) and
 * tighter-tracked (0.05em vs 0.08em), matching what the app actually ships.
 */
export declare const eyebrowType: import("styled-components").RuleSet<object>;
