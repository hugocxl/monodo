import { useSearchParams } from 'react-router-dom'

export const useSelectedDate = (): [Date, (date: Date) => void] => {
  const [searchParams, setSearchParams] = useSearchParams()
  const paramsDate = searchParams.get('date')
  const date = paramsDate ? new Date(paramsDate) : new Date()

  function onChangeDate(date: Date) {
    const searchParams = new URLSearchParams({
      date: new Date(date).toLocaleString('default', {
        day: '2-digit',
        month: 'numeric',
        year: 'numeric'
      })
    })

    setSearchParams(searchParams)
  }

  return [date, onChangeDate]
}
