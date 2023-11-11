// Dependencies
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUser } from '..'

// Types
import type { UseCommandProps, UseCommandResult } from './use-command.types'

export const useCommand = <Data, Error, Variables>({
  commandFn,
  commandKey,
  ...options
}: UseCommandProps<Data, Error, Variables>): UseCommandResult<
  Data,
  Error,
  Variables
> => {
  const queryClient = useQueryClient()
  const [user] = useUser()

  const mutationKey = [user?.id as string, ...commandKey]

  function onSuccess(data: Data, variables: Variables, context: unknown) {
    if (mutationKey) {
      mutationKey.forEach((key: string) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      )
    }

    if (options && options.onSuccess) {
      options.onSuccess(data, variables, context)
    }
  }

  const {
    mutate: command,
    mutateAsync: commandAsync,
    ...props
  } = useMutation<Data, Error, Variables>({
    ...options,
    onSuccess,
    mutationKey,
    mutationFn: commandFn
  })

  return {
    ...props,
    command,
    commandAsync
  }
}
