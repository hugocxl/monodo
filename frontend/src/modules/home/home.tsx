// Components
import { Navigate } from 'react-router-dom'
import { Tasks, Header, Navbar } from './components'
import { Grid } from '@/shared/components'

// Hooks
import { useUserQuery } from '@/shared/hooks'

export function HomePage() {
  const userQuery = useUserQuery()

  if (userQuery.isError && !userQuery.isFetching) {
    return <Navigate to={'/auth'} />
  }

  return (
    <Grid
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
