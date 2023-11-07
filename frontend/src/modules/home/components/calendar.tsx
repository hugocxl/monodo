// Components
import { Calendar as CoreCalendar } from '@/shared/components'

// Hooks
import { useSelectedDate } from '@/shared/hooks'

export function Calendar() {
  const [selectedDate, setSelectedDate] = useSelectedDate()

  return (
    <CoreCalendar
      // tileContent={() => <p>Calendar</p>}
      value={selectedDate}
      onChange={value => setSelectedDate(value as Date)}
    />
  )
}
