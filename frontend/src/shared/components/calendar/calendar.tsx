// Dependencies
import { styled } from '@styled-system/jsx'

// Components
import ReactCalendar from 'react-calendar'
import { ArrowBigRightDash, ArrowBigLeftDash } from 'lucide-react'

import type { CalendarProps } from 'react-calendar'

// Styles
import './calendar.css'

function NextIcon() {
  return (
    <styled.div
      css={{
        p: 16,
        bg: 'bg.secondary',
        borderRadius: '50%',
        cursor: 'pointer'
      }}
    >
      <ArrowBigRightDash />
    </styled.div>
  )
}

function LeftIcon() {
  return (
    <styled.div
      css={{
        p: 16,
        bg: 'bg.secondary',
        borderRadius: '50%',
        cursor: 'pointer'
      }}
    >
      <ArrowBigLeftDash />
    </styled.div>
  )
}

export const Calendar = (props: CalendarProps) => {
  return (
    <ReactCalendar
      {...props}
      nextLabel={<NextIcon />}
      prevLabel={<LeftIcon />}
      next2Label={null}
      prev2Label={null}
      // navigationLabel={({ date }) => date.getFullYear()}
    />
  )
}
