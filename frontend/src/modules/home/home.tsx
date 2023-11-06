// Dependencies
import { styled } from '@styled-system/jsx'

// Components
import { Calendar } from '@/shared/components'
import { Quote } from './components'

// Hooks
import { useSelectedDate } from '@/shared/hooks'

export function Home() {
  const [selectedDate, setSelectedDate] = useSelectedDate()

  return (
    <styled.div display={'grid'} gridTemplateRows={'auto auto 1fr'} h={'100%'}>
      <Calendar
        // tileContent={() => <p>Calendar</p>}
        value={selectedDate}
        onChange={value => setSelectedDate(value as Date)}
      />
      <div>
        <styled.input
          css={{
            my: 40
          }}
          placeholder='What needs to be done?'
          type='text'
          name=''
          id=''
        />
      </div>

      <Quote />
    </styled.div>
  )
}
