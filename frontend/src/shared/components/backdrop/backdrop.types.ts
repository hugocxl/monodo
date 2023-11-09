import type { ReactNode } from 'react'

export type BackdropProps = {
  isOpen: boolean
  onClose: () => void
  children?: ReactNode
}
