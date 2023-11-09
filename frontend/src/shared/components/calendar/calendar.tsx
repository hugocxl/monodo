// Dependencies
import ReactCalendar from 'react-calendar'

// Components
import { ArrowBigRightDash, ArrowBigLeftDash } from 'lucide-react'
import { Button } from '../button'

// Types
import type { CalendarProps } from 'react-calendar'

// Styles
import './calendar.css'

function NextIcon() {
  return (
    <Button variant='icon'>
      <ArrowBigRightDash />
    </Button>
  )
}

function LeftIcon() {
  return (
    <Button variant='icon'>
      <ArrowBigLeftDash />
    </Button>
  )
}

export const Calendar = (props: CalendarProps) => {
  return (
    <ReactCalendar
      {...props}
      minDetail='month'
      nextLabel={<NextIcon />}
      prevLabel={<LeftIcon />}
      next2Label={null}
      prev2Label={null}
      // navigationLabel={({ date }) => date.getFullYear()}
    />
  )
}
