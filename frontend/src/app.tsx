// Dependencies
import { QueryClient, QueryClientProvider } from 'react-query'

// Components
import { AppShell } from '@/shared/components'
import { SelectedDateContext } from './shared/context'
import { useState } from 'react'
import { Home } from './modules'

const queryClient = new QueryClient()

export function App() {
  const currentDateContext = useState(new Date())

  return (
    <QueryClientProvider client={queryClient}>
      <SelectedDateContext.Provider value={currentDateContext}>
        <AppShell>
          <Home />
        </AppShell>
      </SelectedDateContext.Provider>
    </QueryClientProvider>
  )
}
