// Styles
import { container } from '@styled-system/patterns'

//Components
import { Footer } from '../footer'
import { Header } from '../header'

// Types
import type { AppShellProps } from './app-shell.types'
import { styled } from '@styled-system/jsx'

export function AppShell({ children }: AppShellProps) {
  return (
    <>
      <Header />
      <styled.main className={container()}>{children}</styled.main>
      <Footer />
    </>
  )
}
