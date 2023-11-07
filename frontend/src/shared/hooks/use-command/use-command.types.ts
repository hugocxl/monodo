import type { UseMutationOptions } from 'react-query'

export type UseCommandOptions<Data, Error, Variables> = UseMutationOptions<
  Data,
  Error,
  Variables
>

export type UseCommandProps<
  Data = unknown,
  Error = unknown,
  Variables = unknown
> = {
  commandFn: UseMutationOptions<Data, Error, Variables>['mutationFn']
  commandKey: string[]
  options?: UseCommandOptions<Data, Error, Variables>
}
