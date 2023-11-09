import type {
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query'

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
} & UseCommandOptions<Data, Error, Variables>

export type UseCommandResult<Data, Error, Variables> = Omit<
  UseMutationResult<Data, Error, Variables>,
  'mutate' | 'mutateAsync'
> & {
  command: UseMutationResult<Data, Error, Variables>['mutate']
  commandAsync: UseMutationResult<Data, Error, Variables>['mutateAsync']
}
