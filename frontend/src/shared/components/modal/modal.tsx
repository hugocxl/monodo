// Components
import { Backdrop, Portal } from '..'
import { Container } from '../container'
import { Box } from '../box'

// Types
import type { ReactNode } from 'react'

export type ModalProps = {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

export function Modal({ children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null

  return (
    <Portal>
      <Box
        css={{
          position: 'fixed',
          bottom: '0',
          w: '100%',
          h: '100%',
          zIndex: 1000
        }}
      >
        <Backdrop isOpen={isOpen} onClose={onClose}>
          <Container
            w={'100%'}
            h={'100%'}
            smDown={{
              maxW: '95dvw'
            }}
          >
            <Box
              onClick={ev => ev.stopPropagation()}
              css={{
                overflow: 'auto',
                bg: 'bg.modal',
                position: 'absolute',
                w: '100%',
                borderRadius: 8,
                p: 24,
                bottom: 8,
                zIndex: 1001
              }}
            >
              {children}
            </Box>
          </Container>
        </Backdrop>
      </Box>
    </Portal>
  )
}
