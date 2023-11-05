import type { ReactNode } from 'react'

export type BackdropProps = {
  open: boolean
  onClose: () => void
  children?: ReactNode
}
