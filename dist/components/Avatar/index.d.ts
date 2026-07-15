type AvatarSize = 'sm' | 'md' | 'lg';
export interface AvatarProps {
    /** Person/entity name — used for the alt text and the initials fallback. */
    name: string;
    /** Optional image URL; falls back to initials while loading or on error. */
    src?: string;
    size?: AvatarSize;
    className?: string;
}
/**
 * A person or entity's picture, with an initials fallback (ADR-0175). Radix-
 * backed: the fallback shows while the image loads or if it fails, so there's
 * never a broken-image icon. Use it for a user/member; for a status token use a
 * Badge, and for a removable tag a Chip.
 */
export declare function Avatar({ name, src, size, className }: AvatarProps): import("react").JSX.Element;
export {};
