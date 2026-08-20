/**
 * Style-only props carry clean public names — `variant`, `size`, `hasError`,
 * `interactive`… — never styled-components' `$` escape syntax (coop#18). The
 * `$` prefix is internal plumbing: it may appear between a wrapper component
 * and the styled element it renders, but it must never be part of the API a
 * consumer writes, because the compat gate locks that surface until 2.0.
 *
 * styled-components only strips `$`-prefixed props on its way to the DOM, so a
 * clean style prop on a styled *host* element (`styled.button`, `styled.td`, a
 * Radix part that spreads to the DOM) would land as an unknown attribute and
 * trip a React console warning. `blockStyleProps` builds the
 * `shouldForwardProp` predicate that keeps the named props out of the DOM and
 * lets every real HTML attribute through.
 *
 *   export const Badge = styled.span.withConfig({
 *     shouldForwardProp: blockStyleProps('variant'),
 *   })<BadgeProps>`…`
 *
 * Components that already wrap a styled element don't need this: destructuring
 * the clean prop keeps it out of the spread, and the wrapper passes a `$`-prop
 * down instead.
 *
 * Internal — deliberately absent from the barrel, so it is not public API.
 */
export const blockStyleProps = (...names: readonly string[]) => {
  const blocked = new Set<string>(names)
  return (prop: string) => !blocked.has(prop)
}
