import { forwardRef, useState } from 'react'
import { styled } from 'styled-components'
import { Input, type InputProps } from '../Input'

const Wrap = styled.div`
  position: relative;
`

const PaddedInput = styled(Input)`
  padding-right: 2.75rem;
`

const ToggleButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 2.75rem;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.subtle};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.md};

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: -4px;
  }
`

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2.5 12S6 5.5 12 5.5c1.7 0 3.2.5 4.5 1.2M21.5 12S18 18.5 12 18.5c-1.7 0-3.2-.5-4.5-1.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 20 20 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

/** Everything the base `Input` accepts except `type`, which is owned by the toggle. */
export type PasswordInputProps = Omit<InputProps, 'type'>

/**
 * An `Input` locked to password duty with a show/hide toggle. Forwards
 * everything (RHF register spread included); inside a FormField it keeps the
 * self-wired id/aria behaviour of the base Input.
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(props, ref) {
    const [shown, setShown] = useState(false)
    return (
      <Wrap>
        <PaddedInput ref={ref} type={shown ? 'text' : 'password'} {...props} />
        <ToggleButton
          type="button"
          aria-label={shown ? 'Hide password' : 'Show password'}
          aria-pressed={shown}
          onClick={() => setShown((s) => !s)}
        >
          {shown ? <EyeOffIcon /> : <EyeIcon />}
        </ToggleButton>
      </Wrap>
    )
  },
)
