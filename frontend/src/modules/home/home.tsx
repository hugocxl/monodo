// Dependencies
import { styled } from '@styled-system/jsx'

// Components
import { Suspense } from '@/shared/components'
import { Calendar, Tasks, Header } from './components'

export function HomePage() {
  return (
    <styled.div
      display={'grid'}
      gridTemplateRows={'auto auto 1fr'}
      h={'100%'}
      gap={40}
    >
      <Header />
      <Calendar />
      <Suspense>
        <Tasks />
      </Suspense>
    </styled.div>
  )
}
