import { cva } from '@styled-system/css'

export const inputStyles = cva({
  base: {
    bg: 'bg.secondary',
    border: 'primary',
    width: '100%',
    px: 16,
    py: 8,
    borderRadius: 8,
    _focus: {
      outline: 'none'
    }
  },
  variants: {
    variant: {
      icon: {
        p: 6,
        borderRadius: '50%',
        bg: 'bg.secondary',
        color: 'text.primary'
      }
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed'
      }
    }
  }
})
