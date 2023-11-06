import { createContext } from 'react'

export const SelectedDateContext = createContext<
  [Date, React.Dispatch<React.SetStateAction<Date>>]
>([new Date(), () => null])
