import * as RadixSlider from '@radix-ui/react-slider'
import styled from 'styled-components'

export interface SliderProps {
  /** The current value (controlled); clamped to `min`/`max` by the track. */
  value: number
  /** Called continuously with the new value as the thumb moves. */
  onValueChange: (value: number) => void
  /** Lower end of the range. @default 0 */
  min?: number
  /** Upper end of the range. @default 100 */
  max?: number
  /** Granularity the thumb snaps to, in value units. @default 1 */
  step?: number
  /** Render the slider unusable and dimmed; the thumb stays where it is. */
  disabled?: boolean
  /** Accessible name for the thumb — a slider has no visible label of its own. */
  'aria-label'?: string
  /** Class name for the root element (for layout only — colour and size come from the theme). */
  className?: string
}

/**
 * A draggable control for a value on a continuous range (ADR-0175) — a
 * threshold, an opacity, a page size. Radix-backed: keyboard (arrows / Home /
 * End), the accent-filled range. Use a Slider only when the approximate value
 * matters more than the exact number and the range is bounded; when the precise
 * figure matters, a NumberInput is clearer.
 */
export function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  className,
  'aria-label': ariaLabel,
}: SliderProps) {
  return (
    <Root
      value={[value]}
      onValueChange={([v]) => onValueChange(v)}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      className={className}
    >
      <Track>
        <Range />
      </Track>
      <Thumb aria-label={ariaLabel} />
    </Root>
  )
}

const Root = styled(RadixSlider.Root)`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.25rem;
  touch-action: none;
  user-select: none;

  &[data-disabled] {
    opacity: 0.5;
  }
`

const Track = styled(RadixSlider.Track)`
  position: relative;
  flex-grow: 1;
  height: 4px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.surface2};
`

const Range = styled(RadixSlider.Range)`
  position: absolute;
  height: 100%;
  border-radius: inherit;
  background-color: ${({ theme }) => theme.colors.accent};
`

const Thumb = styled(RadixSlider.Thumb)`
  display: block;
  width: 1rem;
  height: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.canvas};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  box-shadow: ${({ theme }) => theme.boxShadow.card};
  cursor: grab;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.accentSoft};
  }

  &:active {
    cursor: grabbing;
  }
`
