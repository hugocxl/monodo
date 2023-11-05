import { cva } from '@styled-system/css'

export const headingStyles = cva({
  base: {
    letterSpacing: 'tight',
    fontWeight: '600'
  },
  variants: {
    variant: {
      h1: {
        textStyle: '4xl',
        fontWeight: 'bold'
      },
      h2: {
        textStyle: '3xl',
        marginTop: 14
      },
      h3: {
        textStyle: '2xl',
        marginTop: 12
      },
      h4: {
        textStyle: 'xl',
        marginTop: 10
      }
    }
  }
})
