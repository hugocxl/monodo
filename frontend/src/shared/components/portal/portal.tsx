// Dependencies
import { createPortal } from 'react-dom'

// Types
import type { PortalProps } from './portal.types'

export function Portal({ children }: PortalProps) {
  return createPortal(children, document.body)
}
