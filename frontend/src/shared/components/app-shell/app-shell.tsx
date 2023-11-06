//Components
import { Header } from '../header'
import { Box } from '..'

// Types
import type { AppShellProps } from './app-shell.types'
import { styled } from '@styled-system/jsx'

export function AppShell({ children }: AppShellProps) {
  return (
    <Box
      css={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        height: '100dvh',
        maxWidth: '480px',
        margin: '0 auto',
        px: 32
      }}
    >
      <Header />
      <styled.main
        css={{
          position: 'relative'
        }}
      >
        {children}
      </styled.main>
    </Box>
  )
}
