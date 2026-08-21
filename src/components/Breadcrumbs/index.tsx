import { styled } from 'styled-components'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Fragment, type ReactNode } from 'react'

export interface Crumb {
  label: ReactNode
  /** Link target; omit for the current (last) page. */
  href?: string
}

export interface BreadcrumbsProps {
  /** The trail, root first; the last entry is rendered as the current page, not a link. */
  items: Crumb[]
  /** Class name for the root `<nav>` (for layout only — colour and size come from the theme). */
  className?: string
}

/**
 * Shows the path to the current page and lets the user step back up it
 * (ADR-0175). Use it on deep pages where the hierarchy isn't obvious from the
 * sidebar. The last crumb is the current page (not a link). Renders plain
 * anchors so it stays dependency-light; wrap them with your router at the call
 * site if you need client-side nav.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <Nav aria-label="Breadcrumb" className={className}>
      <List>
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <Fragment key={i}>
              <li>
                {item.href && !isLast ? (
                  <CrumbLink href={item.href}>{item.label}</CrumbLink>
                ) : (
                  <Current aria-current={isLast ? 'page' : undefined}>{item.label}</Current>
                )}
              </li>
              {!isLast && (
                <Separator aria-hidden="true">
                  <ChevronRightIcon width={14} height={14} />
                </Separator>
              )}
            </Fragment>
          )
        })}
      </List>
    </Nav>
  )
}

const Nav = styled.nav`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.sm};
`

const List = styled.ol`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  list-style: none;
  margin: 0;
  padding: 0;
`

const CrumbLink = styled.a`
  color: ${({ theme }) => theme.colors.muted};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
    text-decoration: underline;
  }
`

const Current = styled.span`
  color: ${({ theme }) => theme.colors.ink};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`

const Separator = styled.span`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.subtle};
`
