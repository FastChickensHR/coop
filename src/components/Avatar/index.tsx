import * as RadixAvatar from '@radix-ui/react-avatar'
import styled from 'styled-components'

type AvatarSize = 'sm' | 'md' | 'lg'

const SIZES: Record<AvatarSize, string> = {
  sm: '1.75rem',
  md: '2.25rem',
  lg: '3rem',
}

export interface AvatarProps {
  /** Person/entity name — used for the alt text and the initials fallback. */
  name: string
  /** Optional image URL; falls back to initials while loading or on error. */
  src?: string
  size?: AvatarSize
  className?: string
}

/** First letters of the first and last word, up to two. */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/**
 * A person or entity's picture, with an initials fallback (ADR-0175). Radix-
 * backed: the fallback shows while the image loads or if it fails, so there's
 * never a broken-image icon. Use it for a user/member; for a status token use a
 * Badge, and for a removable tag a Chip.
 */
export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  return (
    <Root $size={size} className={className}>
      {src && <Image src={src} alt={name} />}
      <Fallback delayMs={src ? 300 : 0}>{initials(name)}</Fallback>
    </Root>
  )
}

const Root = styled(RadixAvatar.Root)<{ $size: AvatarSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => SIZES[$size]};
  height: ${({ $size }) => SIZES[$size]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
  flex-shrink: 0;
  user-select: none;
  vertical-align: middle;
`

const Image = styled(RadixAvatar.Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Fallback = styled(RadixAvatar.Fallback)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.surface2};
  color: ${({ theme }) => theme.colors.muted};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: 0.7em;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  letter-spacing: 0.02em;
`
