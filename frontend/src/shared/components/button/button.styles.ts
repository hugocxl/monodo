import { cva } from '@styled-system/css'

export const buttonStyles = cva({
  base: {
    color: 'text.primary',
    textAlign: 'center',
    fontWeight: 'xl',
    border: 'button',
    fontSize: 'md',
    px: 'md',
    py: 'xs',
    width: 'fit-content',
    borderRadius: 'lg',
    cursor: 'pointer',
    _hover: {
      opacity: 0.8
    }
  },
  variants: {
    variant: {
      accent: {
        bg: 'bg.accent',
        border: 'none'
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
