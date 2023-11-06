import { useContext } from 'react'
import { SelectedDateContext } from '../context'

export const useSelectedDate = () => {
  return useContext(SelectedDateContext)
}
