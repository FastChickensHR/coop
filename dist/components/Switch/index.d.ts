export interface SwitchProps {
    /** Whether the switch is on. */
    checked: boolean;
    /** Called with the new state when toggled (takes effect immediately). */
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
    /** Accessible name when there's no visible label. */
    'aria-label'?: string;
}
/** A themed on/off toggle backed by a native checkbox (accessible, no extra deps). */
export declare function Switch({ checked, onCheckedChange, disabled, ...rest }: SwitchProps): import("react").JSX.Element;
