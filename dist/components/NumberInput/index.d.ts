import type { InputProps } from '../Input';
/** Props for NumberInput — the base Input props, numeric attributes included. */
export interface NumberInputProps extends InputProps {
}
/**
 * Numeric input. Defaults to `type="number"` + `inputMode="numeric"`; forward `min`/`max`/`step`
 * (and `inputMode="decimal"` for fractional values). Works standalone or inside a `FormField`
 * (self-wires id + aria + error via `useFieldControl`, like {@link Input}).
 */
export declare function NumberInput({ inputMode, ...props }: NumberInputProps): import("react").JSX.Element;
