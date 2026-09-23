import { type InputProps } from '../Input';
/** Everything the base `Input` accepts except `type`, which this field owns. */
export type EmailInputProps = Omit<InputProps, 'type'>;
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
export declare const EmailInput: import("react").ForwardRefExoticComponent<EmailInputProps & import("react").RefAttributes<HTMLInputElement>>;
