export interface SliderProps {
    value: number;
    onValueChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    'aria-label'?: string;
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
