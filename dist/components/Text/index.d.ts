import type { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';
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
export type TextVariant = 'display' | 'h1' | 'h2' | 'sectionTitle' | 'bodyLarge' | 'body' | 'bodySmall' | 'caption' | 'overline' | 'mono';
export type TextTone = 'default' | 'muted' | 'subtle' | 'brand' | 'accent' | 'danger' | 'warning' | 'success' | 'info' | 'inverse';
export interface TextProps extends Omit<ComponentPropsWithoutRef<'p'>, 'color'> {
    /** Type-scale role (from `theme/typography.ts`). @default 'body' */
    variant?: TextVariant;
    /** Semantic colour role — resolves to a theme token, so it's dark-mode-safe. @default 'default' */
    tone?: TextTone;
    /** Override the rendered element for semantics (e.g. `h1`, `span`, `dt`). */
    as?: ElementType;
    /** The text to render. */
    children?: ReactNode;
}
export declare function Text({ variant, tone, as, ...rest }: TextProps): import("react").JSX.Element;
