import styled from 'styled-components'
import { Input } from '../Input'
import type { InputProps } from '../Input'

// Built on the base Input (ADR-0075) so it inherits the border/focus/error/disabled treatment
// and the FormField self-wiring; adds numeric semantics and hides the native spinner buttons for
// a consistent control (keyboard ↑/↓ stepping still works).
const StyledNumberInput = styled(Input)`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
  appearance: textfield;
`

export interface NumberInputProps extends InputProps {}

/**
 * Numeric input. Defaults to `type="number"` + `inputMode="numeric"`; forward `min`/`max`/`step`
 * (and `inputMode="decimal"` for fractional values). Works standalone or inside a `FormField`
 * (self-wires id + aria + error via `useFieldControl`, like {@link Input}).
 */
export function NumberInput({ inputMode = 'numeric', ...props }: NumberInputProps) {
  return <StyledNumberInput type="number" inputMode={inputMode} {...props} />
}
