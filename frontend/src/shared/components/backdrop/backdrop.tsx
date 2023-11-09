// Components
import { styled } from '@styled-system/jsx'

// Types
import type { BackdropProps } from './backdrop.types'

export function Backdrop({ isOpen, onClose, children }: BackdropProps) {
  if (!isOpen) return children
  return (
    <styled.div
      onClick={onClose}
      css={{
        transition: 'all 0.3s ease',
        opacity: 1,
        backdropFilter: 'blur(8px)',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
        // ...(!isOpen && {
        //   zIndex: -1,
        //   opacity: 0,
        //   pointerEvents: 'none'
        // })
      }}
    >
      {children}
    </styled.div>
  )
}
