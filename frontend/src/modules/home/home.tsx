// Dependencies
import { styled } from '@styled-system/jsx'
import { useSearchParams } from 'react-router-dom'

// Components
import { Calendar } from '@/shared/components'
import { Tasks } from './components'

// Hooks
import { Suspense } from 'react'

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const date = searchParams.get('date') ?? new Date()

  return (
    <styled.div
      display={'grid'}
      gridTemplateRows={'auto 1fr'}
      h={'100%'}
      gap={40}
    >
      <Calendar
        // tileContent={() => <p>Calendar</p>}
        value={new Date(date)}
        onChange={value =>
          setSearchParams(
            new URLSearchParams({
              date: new Date(value).toLocaleString('default', {
                day: '2-digit',
                month: 'numeric',
                year: 'numeric'
              })
            })
          )
        }
      />

      <Suspense>
        <Tasks />
      </Suspense>
      {/* <Quote /> */}
    </styled.div>
  )
}
