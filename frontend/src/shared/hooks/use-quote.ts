import { useQuery } from 'react-query'

type Quote = {
  author: string
  content: string
}

export const useQuote = () => {
  return useQuery('quote', async () => {
    const res = await fetch('https://api.quotable.io/random')
    const { author, content } = await res.json()

    return { author, content } as Quote
  })
}
