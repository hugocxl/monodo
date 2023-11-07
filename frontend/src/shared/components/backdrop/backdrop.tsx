// Components
import { styled } from '@styled-system/jsx'

// Types
import type { BackdropProps } from './backdrop.types'

export function Backdrop({ open, onClose, children }: BackdropProps) {
  return (
    <styled.div
      onClick={onClose}
      css={{
        zIndex: 100,
        display: open ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100dvw',
        height: '100dvh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
    >
      {children}
    </styled.div>
  )
}
