import { useSearchParams } from 'react-router-dom'

export const useSelectedDate = (): [string, (date: Date | string) => void] => {
  const [searchParams, setSearchParams] = useSearchParams()
  const paramsDate = searchParams.get('date')
  const date = paramsDate ?? getFormattedDate(new Date())

  function getFormattedDate(date: Date) {
    return date.toLocaleDateString('default', {
      day: '2-digit',
      month: 'numeric',
      year: 'numeric'
    })
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
