import type { ReactNode } from 'react'
import { styled } from 'styled-components'

/**
 * Shared body-layout primitives for drawers (ADR compositional-layout-primitives).
 * `DrawerSlot` owns the shell (title/description/footer); these own the body, so
 * the 25 drawers stop reinventing their own BodyStack / Section / Row / Field.
 *
 * All three are function components (not bare styled exports) so the module stays
 * fast-refresh-clean.
 */

const BodyRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

/** The drawer body: a vertical stack of sections at one gap. */
export function DrawerBody({ children }: { children: ReactNode }) {
  return <BodyRoot>{children}</BodyRoot>
}

const SectionRoot = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const SectionLabel = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.subtle};
  margin: 0;
`

/** A labelled group within a drawer body. */
export function DrawerSection({ title, children }: { title?: ReactNode; children: ReactNode }) {
  return (
    <SectionRoot>
      {title != null && <SectionLabel>{title}</SectionLabel>}
      {children}
    </SectionRoot>
  )
}

const FieldRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const FieldLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.muted};
`

const FieldValue = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.ink};
`

/** A label + value/control row, consistent across every drawer. */
export function DrawerField({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <FieldRoot>
      <FieldLabel>{label}</FieldLabel>
      <FieldValue>{children}</FieldValue>
    </FieldRoot>
  )
}
