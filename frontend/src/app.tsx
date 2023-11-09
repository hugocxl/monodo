// Dependencies
import { QueryClient } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { compress, decompress } from 'lz-string'

// Components
import { AppShell } from '@/shared/components'
import { HomePage } from '@/modules/home'
import { AuthPage } from '@/modules/auth'
import { QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } }
})

persistQueryClient({
  queryClient: queryClient,
  persister: createSyncStoragePersister({
    storage: window.localStorage,
    serialize: data => compress(JSON.stringify(data)),
    deserialize: data => JSON.parse(decompress(data))
  }),
  maxAge: Infinity
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/auth',
    element: <AuthPage />
  },
  {
    path: '/:date',
    element: <HomePage />
  }
])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell>
        <RouterProvider router={router} />
      </AppShell>
    </QueryClientProvider>
  )
}
