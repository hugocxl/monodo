// Components
import { Navigate } from 'react-router-dom'
import { Tasks, Header, Navbar } from './components'
import { Grid } from '@/shared/components'

// Hooks
import { useUser } from '@/shared/hooks'

export function HomePage() {
  const [user] = useUser()

  if (!user) {
    return <Navigate to={'/auth'} />
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
