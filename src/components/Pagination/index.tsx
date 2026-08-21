import { styled } from 'styled-components'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export interface PaginationProps {
  /** 1-based current page. */
  page: number
  /** Total number of pages. */
  pageCount: number
  /** Called with the 1-based page the user picked (arrows included). */
  onPageChange: (page: number) => void
  /** Class name for the root `<nav>` (for layout only — colour and size come from the theme). */
  className?: string
}

/**
 * Page navigation for a long, paged list or table (ADR-0175). Shows first/last,
 * a window around the current page, and ellipses for the gaps. Use it when a
 * table has more rows than one screen; for endless feeds, prefer load-more.
 */
export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  if (pageCount <= 1) return null
  const pages = pageWindow(page, pageCount)
  return (
    <Nav aria-label="Pagination" className={className}>
      <Arrow
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeftIcon width={16} height={16} />
      </Arrow>
      {pages.map((p, i) =>
        p === ELLIPSIS ? (
          <Gap key={`gap-${i}`} aria-hidden="true">
            …
          </Gap>
        ) : (
          <PageButton
            key={p}
            type="button"
            $active={p === page}
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onPageChange(p)}
          >
            {p}
          </PageButton>
        ),
      )}
      <Arrow
        type="button"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRightIcon width={16} height={16} />
      </Arrow>
    </Nav>
  )
}

const ELLIPSIS = -1

/** First, last, and a ±1 window around the current page, with ellipsis gaps. */
function pageWindow(page: number, pageCount: number): number[] {
  const out = new Set<number>([1, pageCount, page, page - 1, page + 1])
  const sorted = [...out].filter((p) => p >= 1 && p <= pageCount).sort((a, b) => a - b)
  const result: number[] = []
  let prev = 0
  for (const p of sorted) {
    if (p - prev > 1) result.push(ELLIPSIS)
    result.push(p)
    prev = p
  }
  return result
}

const Nav = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const cell = `
  min-width: 2rem;
  height: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
`

const Arrow = styled.button`
  ${cell}
  padding: 0 0.375rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.canvas};
  color: ${({ theme }) => theme.colors.muted};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.borderStrong};
    color: ${({ theme }) => theme.colors.ink};
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

const PageButton = styled.button<{ $active?: boolean }>`
  ${cell}
  padding: 0 0.5rem;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.border)};
  background-color: ${({ theme, $active }) => ($active ? theme.colors.accentSoft : theme.colors.canvas)};
  color: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.ink)};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme, $active }) => ($active ? theme.fontWeight.semibold : theme.fontWeight.normal)};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }
`

const Gap = styled.span`
  min-width: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.subtle};
`
