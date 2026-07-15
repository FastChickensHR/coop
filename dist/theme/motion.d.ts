/**
 * Shared enter animation for route/content changes: a subtle fade + upward
 * settle (ADR-0081). Enter-only — CSS can't animate the *outgoing* page without
 * presence management, and this app stays dependency-light (no framer-motion),
 * so the incoming content fades in and the old one is simply replaced.
 *
 * One definition, used by both the cross-section {@link PageContainer} and the
 * within-section tab-content wrappers (Settings, Organization), so every
 * navigation reads the same instead of each surface hand-tuning its own fade.
 */
export declare const pageEnter: import("styled-components/dist/models/Keyframes").default;
/**
 * Applies {@link pageEnter} using the motion tokens, honoring
 * prefers-reduced-motion (a page appearing instantly is fine, so we hard-cut).
 * Spread into any styled surface that should fade its content in on mount.
 */
export declare const pageEnterAnimation: import("styled-components").RuleSet<object>;
