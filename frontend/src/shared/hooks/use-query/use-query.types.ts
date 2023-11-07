import type { QueryOptions } from 'react-query'

export type UseQueryOptions<
  FnReturn = unknown,
  Error = unknown,
  Data = unknown
> = QueryOptions<FnReturn, Error, Data>

export interface UseQueryProps<
  FnReturn = unknown,
  Error = unknown,
  Data = unknown
> {
  queryKey: UseQueryOptions<FnReturn, Error, Data>['queryKey']
  queryFn: UseQueryOptions<FnReturn, Error, Data>['queryFn']
  options?: UseQueryOptions<FnReturn, Error, Data>
}
