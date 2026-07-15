import { type FieldStatus } from './context';
/**
 * Border colour + soft ring for a text control's semantic status (ADR-0157),
 * plus the accent focus ring. Spread into a control's styled block *after* its
 * base `border`/`&:focus` so status wins at rest and the accent wins on focus
 * (a focused field reads as *active*, whatever its status). A control with no
 * status keeps its base border and only gets the accent focus ring.
 */
export declare const controlStatusStyles: (status?: FieldStatus) => import("styled-components").RuleSet<object>;
