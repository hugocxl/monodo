// Dependencies
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Components
import { AppShell } from '@/shared/components'
import { Home } from './modules/home'
import { AuthPage } from './modules/auth'

const queryClient = new QueryClient()

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
    element: <Home />
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
