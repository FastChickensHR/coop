import * as RadixLabel from '@radix-ui/react-label'
import { styled } from 'styled-components'

/** A form label on the standard field typography; pair with any labelled control via `htmlFor`. */
export const Label = styled(RadixLabel.Root)`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.ink};
  cursor: default;
`
