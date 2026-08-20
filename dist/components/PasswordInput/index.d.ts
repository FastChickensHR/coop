import { type InputProps } from '../Input';
/** Everything the base `Input` accepts except `type`, which is owned by the toggle. */
export type PasswordInputProps = Omit<InputProps, 'type'>;
/**
 * An `Input` locked to password duty with a show/hide toggle. Forwards
 * everything (RHF register spread included); inside a FormField it keeps the
 * self-wired id/aria behaviour of the base Input.
 */
export declare const PasswordInput: import("react").ForwardRefExoticComponent<PasswordInputProps & import("react").RefAttributes<HTMLInputElement>>;
