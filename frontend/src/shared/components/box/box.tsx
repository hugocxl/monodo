import { styled, type BoxProps as CoreBoxProps } from '@styled-system/jsx'
import type { ElementType } from 'react'

export type BoxProps = CoreBoxProps & {
  element?: ElementType
}

export const Box = ({ element = 'div' as ElementType, ...props }) => {
  const Component = styled(element)

  return <Component {...props} />
}
