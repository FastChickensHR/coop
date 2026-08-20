export interface SliderProps {
    /** The current value (controlled); clamped to `min`/`max` by the track. */
    value: number;
    /** Called continuously with the new value as the thumb moves. */
    onValueChange: (value: number) => void;
    /** Lower end of the range. @default 0 */
    min?: number;
    /** Upper end of the range. @default 100 */
    max?: number;
    /** Granularity the thumb snaps to, in value units. @default 1 */
    step?: number;
    /** Render the slider unusable and dimmed; the thumb stays where it is. */
    disabled?: boolean;
    /** Accessible name for the thumb — a slider has no visible label of its own. */
    'aria-label'?: string;
    /** Class name for the root element (for layout only — colour and size come from the theme). */
    className?: string;
}
/**
 * A draggable control for a value on a continuous range (ADR-0175) — a
 * threshold, an opacity, a page size. Radix-backed: keyboard (arrows / Home /
 * End), the accent-filled range. Use a Slider only when the approximate value
 * matters more than the exact number and the range is bounded; when the precise
 * figure matters, a NumberInput is clearer.
 */
export declare function Slider({ value, onValueChange, min, max, step, disabled, className, 'aria-label': ariaLabel, }: SliderProps): import("react").JSX.Element;
