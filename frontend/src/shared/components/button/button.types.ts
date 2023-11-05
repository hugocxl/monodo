import { buttonStyles } from './button.styles'
import type { RecipeVariantProps } from '@styled-system/css'
import type { ReactNode } from 'react'
import type { JsxStyleProps } from '@styled-system/types'

export type ButtonProps = JsxStyleProps &
  RecipeVariantProps<typeof buttonStyles> & {
    children: ReactNode
    onClick?: () => void
  }
