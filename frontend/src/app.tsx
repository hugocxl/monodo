// Dependencies
import { QueryClient } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Components
import { QueryClientProvider } from 'react-query'
import { AppShell } from '@/shared/components'
import { HomePage } from './modules/home'
import { AuthPage } from './modules/auth'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, suspense: true, cacheTime: 60 * 60 * 24 * 1000 },
    mutations: { retry: false }
  }
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>
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
