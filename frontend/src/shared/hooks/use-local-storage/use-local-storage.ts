// React
import { useCallback, useState, useRef, useMemo, useEffect } from 'react'

// Types
import type { Dispatch, SetStateAction } from 'react'

type parserOptions<T> = {
  raw: false
  serializer: (value: T) => string
  deserializer: (value: string) => T
}

export const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
  options?: parserOptions<T>
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void] => {
  const deserializer = useMemo(
    () =>
      options
        ? options.raw
          ? (value: string) => value
          : options.deserializer
        : JSON.parse,
    [options]
  )
  const initializer = useRef((key: string) => {
    try {
      const serializer = options
        ? options.raw
          ? String
          : options.serializer
        : JSON.stringify

      const localStorageValue = localStorage.getItem(key)
      if (localStorageValue !== null) {
        return deserializer(localStorageValue)
      } else {
        initialValue && localStorage.setItem(key, serializer(initialValue))
        return initialValue
      }
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw. JSON.parse and JSON.stringify
      // can throw, too.
      return initialValue
    }
  })

  const [state, setState] = useState<T | undefined>(() =>
    initializer.current(key)
  )

  useEffect(() => setState(initializer.current(key)), [key])

  const set: Dispatch<SetStateAction<T | undefined>> = useCallback(
    valOrFunc => {
      try {
        const newState =
          typeof valOrFunc === 'function'
            ? // eslint-disable-next-line @typescript-eslint/ban-types
              (valOrFunc as Function)(state)
            : valOrFunc
        if (typeof newState === 'undefined') return
        let value: string

        if (options)
          if (options.raw)
            if (typeof newState === 'string') value = newState
            else value = JSON.stringify(newState)
          else if (options.serializer) value = options.serializer(newState)
          else value = JSON.stringify(newState)
        else value = JSON.stringify(newState)

        localStorage.setItem(key, value)
        setState(deserializer(value))
      } catch {
        // If user is in private mode or has storage restriction
        // localStorage can throw. Also JSON.stringify can throw.
      }
    },
    [deserializer, key, options, state]
  )

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key)
      setState(undefined)
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw.
    }
  }, [key, setState])

  return [state, set, remove]
}
