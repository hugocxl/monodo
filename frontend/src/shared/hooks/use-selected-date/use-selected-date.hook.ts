// Dependencies
import { useSearchParams } from 'react-router-dom'
import moment from 'moment'

export const useSelectedDate = (): [string, (date: Date | string) => void] => {
  const [searchParams, setSearchParams] = useSearchParams()
  const paramsDate = searchParams.get('date')
  const date = paramsDate ?? getFormattedDate(new Date())
  // const dateObj = moment(date, 'YYYY-MM-DD')

  function getFormattedDate(date: Date) {
    return moment(date).format('YYYY-MM-DD')
  }

  function onChangeDate(date: Date | string) {
    const newDate = getFormattedDate(new Date(date))

    const searchParams = new URLSearchParams({
      date: newDate
    })

    setSearchParams(searchParams)
  }

  return [date, onChangeDate]
}
