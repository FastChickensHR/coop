import { type FieldStatus } from './context';
/**
 * Border colour + soft ring for a text control's semantic status (ADR-0157),
 * plus the accent focus ring. Spread into a control's styled block *after* its
 * base `border`/`&:focus` so status wins at rest and the accent wins on focus
 * (a focused field reads as *active*, whatever its status). A control with no
 * status keeps its base border and only gets the accent focus ring.
 */
export declare const controlStatusStyles: (status?: FieldStatus, focusSelector?: string) => import("styled-components").RuleSet<object>;
/**
 * The chrome every 44px text control wears — sizing, border, type, colours, motion, and the
 * disabled/placeholder states (#1217; the audit found this block pasted five times). Compose it
 * FIRST, then `controlStatusStyles`, then per-control overrides (icon padding, trigger flex,
 * a wrapper's `min-height`) so the override wins by order. The disabled/placeholder selectors
 * are inert on hosts they don't apply to.
 */
export declare const controlBaseStyles: import("styled-components").RuleSet<object>;
