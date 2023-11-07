import { useQuery } from 'react-query'
import { Fetcher } from '../libs'

type Quote = {
  author: string
  content: string
}

export const useQuote = () => {
  return useQuery('quote', async () => {
    const { author, content } = await Fetcher.get<Quote>(
      'https://api.quotable.io/random',
      {
        cache: 'force-cache'
      }
    )

    return { author, content }
  })
}
