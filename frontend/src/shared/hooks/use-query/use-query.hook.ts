// Dependencies
import { useQuery as useReactQuery } from 'react-query'

// Types
import type { UseQueryProps } from './use-query.types'

// Constants
import { USE_QUERY_CONSTANTS } from './use-query.constants'

export const useQuery = <FnReturn, Error, Data>({
  queryFn,
  queryKey,
  options
}: UseQueryProps<FnReturn, Error, Data>) => {
  return useReactQuery<FnReturn, Error, Data>({
    ...USE_QUERY_CONSTANTS.defaults,
    ...options,
    queryKey,
    queryFn
  })
}
