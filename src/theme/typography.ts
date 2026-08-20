import { css } from 'styled-components'

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
export const displayType = css`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-style: italic;
  font-weight: ${({ theme }) => theme.fontWeight.black};
  font-size: ${({ theme }) => theme.fontSize['5xl']};
  line-height: ${({ theme }) => theme.lineHeight.flat};
  letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
`

/** The page's single title. One per view. */
export const h1Type = css`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  font-size: ${({ theme }) => theme.fontSize['4xl']};
  line-height: ${({ theme }) => theme.lineHeight.snugTight};
`

/** Section headings within a page. */
export const h2Type = css`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  line-height: ${({ theme }) => theme.lineHeight.tight};
`

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
export const sectionTitleType = css`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: ${({ theme }) => theme.lineHeight.snug};
`

/** Intro/lede paragraphs — the sentence under a heading that sets up the page. */
export const bodyLargeType = css`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  font-size: ${({ theme }) => theme.fontSize.lg};
  line-height: ${({ theme }) => theme.lineHeight.relaxed};
`

/** Default prose and table text — the workhorse. */
export const bodyType = css`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: ${({ theme }) => theme.lineHeight.relaxed};
`

/**
 * Dense body — secondary copy, table cells, drawer detail. The app's real
 * workhorse (`sm` is its most-used size); a touch tighter leading than `body`
 * so compact UI doesn't get airy. (ADR-0240.)
 */
export const bodySmallType = css`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: ${({ theme }) => theme.lineHeight.normal};
`

/** Meta text — timestamps, counts, hints under a field. (ADR-0240.) */
export const captionType = css`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: ${({ theme }) => theme.lineHeight.normal};
`

/**
 * Small mono labels above a value or section — field labels, data annotations,
 * token names. Wide tracking keeps it legible at this size. Not for prose.
 */
export const overlineType = css`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: ${({ theme }) => theme.lineHeight.normal};
  letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
`

/**
 * Monospace data — codes, IDs, EDI values, column names. The app leans on mono
 * heavily (its second-most-used family) for machine-legible values. Not for
 * prose. (ADR-0240.)
 */
export const monoType = css`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: ${({ theme }) => theme.lineHeight.normal};
`

// ─────────────────────────────────────────────────────────────────────────────
// App heading roles (ADR-0249)
//
// These describe the *app's* real headings, which the six brand roles above do
// not: the brand roles come from the marketing guidelines and run large, while
// the app runs dense. Added by reading what shipped and binding to the tokens it
// already used — exactly the descriptive rule ADR-0229 set, applied to the app
// instead of the brand doc.
//
// Deliberately WITHOUT `line-height`: every app heading currently inherits the
// root leading (Preflight's 1.5) rather than setting its own, so these roles omit
// it too — swapping one in changes nothing. (The brand roles set leading because
// large display type needs it; dense UI headings don't.) If a heading ever needs
// tighter leading, that's a per-site addition, not a change to the role.
// ─────────────────────────────────────────────────────────────────────────────

/** The title of a whole page or detail view — the app's `PageTitle`. */
export const pageTitleType = css`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize['2xl']};
`

/** A heading over a panel or a settings/detail section — below a page title. */
export const panelHeadingType = css`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-size: ${({ theme }) => theme.fontSize.lg};
`

/** The title of a card or a small in-panel block — below a panel heading. */
export const cardHeadingType = css`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-size: ${({ theme }) => theme.fontSize.base};
`

/**
 * A mono eyebrow over a card or group — the app's heavy `CardTitle`/`GroupLabel`
 * usage. Distinct from {@link overlineType}: heavier (semibold vs medium) and
 * tighter-tracked (0.05em vs 0.08em), matching what the app actually ships.
 */
export const eyebrowType = css`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.05em;
`
