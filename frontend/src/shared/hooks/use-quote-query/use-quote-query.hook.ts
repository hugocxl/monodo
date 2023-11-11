// Dependencies
import { useQuery, type UseQueryResult } from '../use-query'

// Types
type Quote = {
  author: string
  content: string
}

export const useQuoteQuery = (): UseQueryResult<Quote, null> =>
  useQuery({
    queryKey: ['quote'],
    queryFn: async () => {
      const res = await fetch('https://api.quotable.io/random', {
        cache: 'force-cache'
      })
      const json = (await res.json()) as Quote
      return json
    }
  })
