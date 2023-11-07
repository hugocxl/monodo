// Dependencies
import { useMutation, useQueryClient } from 'react-query'

// Constants
import { USE_COMMAND_CONSTANTS } from './use-command.constants'

// Types
import type { UseCommandProps } from './use-command.types'

export const useCommand = <Data, Error, Variables>({
  commandFn,
  commandKey,
  options
}: UseCommandProps<Data, Error, Variables>) => {
  const queryClient = useQueryClient()

  function onSuccess(data: Data, variables: Variables, context: unknown) {
    if (commandKey) {
      commandKey.forEach((key: string) =>
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
    ...USE_COMMAND_CONSTANTS.defaults,
    ...options,
    onSuccess,
    mutationKey: commandKey,
    mutationFn: commandFn
  })

  return {
    ...props,
    command,
    commandAsync
  }
}
