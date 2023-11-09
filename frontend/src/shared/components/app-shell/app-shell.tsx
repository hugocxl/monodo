// Dependencies
import { styled } from '@styled-system/jsx'
import { Suspense } from '../suspense'

// Types
import type { AppShellProps } from './app-shell.types'

export function AppShell({ children }: AppShellProps) {
  return (
    <styled.main
      css={{
        position: 'relative',
        height: '100dvh',
        minHeight: '100dvh',
        maxWidth: '480px',
        margin: '0 auto'
      }}
    >
      <Suspense>{children}</Suspense>
    </styled.main>
  )
}
