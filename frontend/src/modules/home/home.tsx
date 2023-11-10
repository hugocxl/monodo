// Components
import { Navigate } from 'react-router-dom'
import { Tasks, Header, Navbar } from './components'
import { Grid, SuspenseFallback } from '@/shared/components'

// Hooks
import { useUserQuery } from '@/shared/hooks'

export function HomePage() {
  const userQuery = useUserQuery()

  if (userQuery.isError && !userQuery.isFetching) {
    return <Navigate to={'/auth'} />
  }

  if (!userQuery.data?.id) {
    return <SuspenseFallback />
  }

  return (
    <Grid
      data-testid={'home-page'}
      position={'relative'}
      gridTemplateRows={'auto  1fr auto'}
      h={'100%'}
      pb={'54px'}
    >
      <Header />
      <Tasks />
      <Navbar />
    </Grid>
  )
}
