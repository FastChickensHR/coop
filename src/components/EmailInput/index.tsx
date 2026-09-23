import { forwardRef, useCallback, useId, useState } from 'react'
import type { FocusEvent, ChangeEvent } from 'react'
import { styled } from 'styled-components'
import { Input, type InputProps, StatusMessage } from '../Input'
import { useFieldControl } from '../FormField/context'

const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`

/**
 * Deliberately forgiving: this is not the arbiter of whether an address exists,
 * only of whether what has been typed could be one. Something before an @,
 * something after it, and a dot in the domain. Anything stricter starts
 * rejecting real addresses.
 */
function looksLikeAnAddress(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

/** Everything the base `Input` accepts except `type`, which this field owns. */
export type EmailInputProps = Omit<InputProps, 'type'>

/**
 * The one email field, used for every email in the product.
 *
 * It exists because a form that says nothing until you press the button makes
 * you find your own mistake: react-hook-form validates on submit unless a form
 * asks otherwise, so a mistyped address sat there silently. This field does not
 * depend on how its form was set up — **it says so on the way out of the box**,
 * once, and stops saying it the moment the address looks right.
 *
 * Inside a `FormField` it stays quiet when the form already has something to say
 * about this field, so the two never speak at once; the form's message, which
 * knows about things this field cannot (an address already registered), wins.
 */
export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(function EmailInput(
  { autoComplete = 'email', onBlur, onChange, ...rest },
  ref,
) {
  const [malformed, setMalformed] = useState(false)
  const { hasError } = useFieldControl()
  const messageId = `${useId()}-email-format`

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value
      setMalformed(value.trim().length > 0 && !looksLikeAnAddress(value))
      onBlur?.(event)
    },
    [onBlur],
  )

  // Once it has spoken, it stops the moment the address looks right — nobody
  // should have to leave the box again to find out they have fixed it.
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      // Read the value before the updater runs: React has cleared the event by
      // the time a lazy setState callback is called.
      const value = event.currentTarget.value
      setMalformed((spoken) => spoken && !looksLikeAnAddress(value))
      onChange?.(event)
    },
    [onChange],
  )

  const speaking = malformed && !hasError

  return (
    <FieldWrap>
      <Input
        ref={ref}
        type="email"
        autoComplete={autoComplete}
        inputMode="email"
        onBlur={handleBlur}
        onChange={handleChange}
        hasError={speaking || undefined}
        aria-invalid={speaking || undefined}
        aria-describedby={speaking ? messageId : undefined}
        {...rest}
      />
      {speaking && (
        <StatusMessage id={messageId} status="error" role="alert">
          An email address looks like name@example.com.
        </StatusMessage>
      )}
    </FieldWrap>
  )
})
