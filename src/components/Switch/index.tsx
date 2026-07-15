import styled from 'styled-components'

export interface SwitchProps {
  /** Whether the switch is on. */
  checked: boolean
  /** Called with the new state when toggled (takes effect immediately). */
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  /** Accessible name when there's no visible label. */
  'aria-label'?: string
}

const Root = styled.label<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
`

const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  margin: 0;
`

const Track = styled.span<{ $checked: boolean; $disabled?: boolean }>`
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme, $checked }) => ($checked ? theme.colors.accent : theme.colors.borderStrong)};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: background 120ms ease;

  ${HiddenInput}:focus-visible + & {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`

const Thumb = styled.span<{ $checked: boolean }>`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  transform: translateX(${({ $checked }) => ($checked ? '14px' : '0')});
  transition: transform 120ms ease;
`

/** A themed on/off toggle backed by a native checkbox (accessible, no extra deps). */
export function Switch({ checked, onCheckedChange, disabled, ...rest }: SwitchProps) {
  return (
    <Root $disabled={disabled}>
      <HiddenInput
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        aria-label={rest['aria-label']}
        onChange={(e) => onCheckedChange(e.target.checked)}
      />
      <Track $checked={checked} $disabled={disabled}>
        <Thumb $checked={checked} />
      </Track>
    </Root>
  )
}
