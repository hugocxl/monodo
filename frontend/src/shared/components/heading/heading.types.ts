// Types
import type { JsxStyleProps } from '@styled-system/types'
import type { HtmlHTMLAttributes, ReactNode } from 'react'
import { headingStyles } from './heading.styles'
import type { RecipeVariantProps } from '@styled-system/css'

export type HeadingProps = JsxStyleProps &
  RecipeVariantProps<typeof headingStyles> &
  HtmlHTMLAttributes<HTMLHeadingElement> & {
    children: ReactNode
    id: string
  }
