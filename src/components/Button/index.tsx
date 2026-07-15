import styled, { css } from 'styled-components'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  /** Visual emphasis. `primary` = the one commit action per view; `danger` = destructive. @default 'primary' */
  $variant?: Variant
  /** Control height/padding. @default 'md' */
  $size?: Size
}

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.ink900};
    color: ${({ theme }) => theme.colors.brand50};
    border: 1px solid ${({ theme }) => theme.colors.brand50};
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.brand50};
      color: ${({ theme }) => theme.colors.ink900};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.canvas};
    color: ${({ theme }) => theme.colors.ink};
    border: 1px solid ${({ theme }) => theme.colors.borderStrong};
    &:hover:not(:disabled) { background-color: ${({ theme }) => theme.colors.surface}; }
  `,
  danger: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.brand};
    border: 1px solid ${({ theme }) => theme.colors.brand};
    &:hover:not(:disabled) { background-color: ${({ theme }) => theme.colors.brandSoft}; }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.ink};
    border: 1px solid transparent;
    &:hover:not(:disabled) { background-color: ${({ theme }) => theme.colors.surface2}; }
  `,
}

const sizeStyles = {
  sm: css`
    height: 34px;
    padding: 0 0.75rem;
    font-size: ${({ theme }) => theme.fontSize.xs};
  `,
  md: css`
    height: 44px;
    padding: 0 1.25rem;
    font-size: ${({ theme }) => theme.fontSize.base};
  `,
  lg: css`
    height: 54px;
    padding: 0 1.5rem;
    font-size: ${({ theme }) => theme.fontSize.lg};
  `,
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  cursor: pointer;
  transition: background-color 150ms ease, opacity 150ms ease;
  white-space: nowrap;
  box-shadow: ${({ theme }) => theme.boxShadow.card};

  ${({ $variant = 'primary' }) => variantStyles[$variant]}
  ${({ $size = 'md' }) => sizeStyles[$size]}

  &:disabled {
    background-color: ${({ theme }) => theme.colors.surface2};
    color: ${({ theme }) => theme.colors.subtle};
    border-color: transparent;
    cursor: not-allowed;
    box-shadow: none;
  }
`
