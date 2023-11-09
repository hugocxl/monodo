import { cva } from '@styled-system/css'

export const buttonStyles = cva({
  base: {
    bg: 'text.default',
    color: 'bg.primary',
    textAlign: 'center',
    border: 'none',
    px: 16,
    fontWeight: 'bolder',
    py: 8,
    width: 'fit-content',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    _hover: {
      opacity: 0.8,
      transform: 'scale(1.025)'
    }
  },
  variants: {
    variant: {
      icon: {
        p: 6,
        aspectRatio: 1 / 1,
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
