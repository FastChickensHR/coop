import styled, { css, type DefaultTheme } from 'styled-components'
import type { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react'
import {
  displayType,
  h1Type,
  h2Type,
  sectionTitleType,
  bodyLargeType,
  bodyType,
  bodySmallType,
  captionType,
  overlineType,
  monoType,
} from '../../theme/typography'

/**
 * The typography primitive (ADR-0228, reconciled with the ADR-0229 type roles in
 * ADR-0240). Every piece of user-facing text is a `<Text>` so its scale comes from
 * a named type **role** and its colour from a semantic **tone** — never a
 * hand-picked value. Because tone resolves to a theme token, text is correct in
 * light *and* dark automatically.
 *
 * `<Text>` is the *component* that applies a role; the roles themselves live in
 * `theme/typography.ts` (the single source of the type scale, shared with plain
 * styled-components via `${h2Type}` etc.). `Text` adds the colour (tone) and the
 * rendered element (`as`) on top.
 *
 *   <Text>Body copy</Text>
 *   <Text variant="h1" as="h1">Page title</Text>
 *   <Text variant="caption" tone="muted">3 days ago</Text>
 *   <Text tone="danger">Failed to load</Text>
 *   <Text variant="mono" as="span">ABC-123</Text>
 */
export type TextVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'sectionTitle'
  | 'bodyLarge'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'overline'
  | 'mono'

export type TextTone =
  | 'default'
  | 'muted'
  | 'subtle'
  | 'brand'
  | 'accent'
  | 'danger'
  | 'warning'
  | 'success'
  | 'info'
  | 'inverse'

// The scale per variant comes straight from the shared type roles — Text does not
// re-declare font CSS, so the vocabulary can't drift between `<Text>` and the
// `${h2Type}` styled-components usage.
const VARIANTS: Record<TextVariant, ReturnType<typeof css>> = {
  display: displayType,
  h1: h1Type,
  h2: h2Type,
  sectionTitle: sectionTitleType,
  bodyLarge: bodyLargeType,
  body: bodyType,
  bodySmall: bodySmallType,
  caption: captionType,
  overline: overlineType,
  mono: monoType,
}

// Each tone → a theme token, so colour flips with the theme. `inverse` is the
// only one that must NOT flip — it rides `onFill` (a fixed light) so on-fill text
// stays readable in both modes.
const TONES: Record<TextTone, (t: DefaultTheme) => string> = {
  default: (t) => t.colors.ink,
  muted: (t) => t.colors.muted,
  subtle: (t) => t.colors.subtle,
  brand: (t) => t.colors.brand,
  accent: (t) => t.colors.accent,
  danger: (t) => t.colors.error,
  warning: (t) => t.colors.warning,
  success: (t) => t.colors.success,
  info: (t) => t.colors.info,
  inverse: (t) => t.colors.onFill,
}

// The default element per variant — semantic-enough out of the box; override with
// `as` where the document needs a specific tag (the page's single h1, an inline
// span, etc.). The `overline` role is the visual eyebrow/kicker (a span) — form
// labels stay with FormField/Label, which own `htmlFor`.
const DEFAULT_ELEMENT: Record<TextVariant, ElementType> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  sectionTitle: 'h3',
  bodyLarge: 'p',
  body: 'p',
  bodySmall: 'p',
  caption: 'p',
  overline: 'span',
  mono: 'span',
}

interface StyledTextProps {
  $variant: TextVariant
  $tone: TextTone
}

const StyledText = styled.p<StyledTextProps>`
  margin: 0; /* layout owns spacing (ADR-0167 gap-first); no stray browser margins */
  ${({ $variant }) => VARIANTS[$variant]}
  color: ${({ theme, $tone }) => TONES[$tone](theme)};
`

export interface TextProps extends Omit<ComponentPropsWithoutRef<'p'>, 'color'> {
  /** Type-scale role (from `theme/typography.ts`). @default 'body' */
  variant?: TextVariant
  /** Semantic colour role — resolves to a theme token, so it's dark-mode-safe. @default 'default' */
  tone?: TextTone
  /** Override the rendered element for semantics (e.g. `h1`, `span`, `dt`). */
  as?: ElementType
  /** The text to render. */
  children?: ReactNode
}

export function Text({ variant = 'body', tone = 'default', as, ...rest }: TextProps) {
  return <StyledText as={as ?? DEFAULT_ELEMENT[variant]} $variant={variant} $tone={tone} {...rest} />
}
