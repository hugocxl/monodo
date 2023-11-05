// Utils
import { styled } from '@styled-system/jsx'

// Types
import type { HeadingProps } from './heading.types'

// Styles
import { headingStyles } from './heading.styles'

export const Heading = ({ variant = 'h1', ...props }: HeadingProps) => {
  const Component = styled(variant, headingStyles)

  return <Component {...props} variant={variant} />
}
