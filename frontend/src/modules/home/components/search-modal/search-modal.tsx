/* eslint-disable @typescript-eslint/ban-ts-comment */
// Components
import { CheckCircle2, CircleIcon } from 'lucide-react'
import {
  Input,
  Text,
  Modal,
  Stack,
  type ModalProps,
  Flex
} from '@/shared/components'

// Hooks
import { useState, useRef, memo } from 'react'
import {
  useSearchTasksCommand,
  useSelectedDate,
  useUserQuery
} from '@/shared/hooks'

// Types
import type { TaskDto } from '@/shared/types'

export function SearchModal({
  onClose,
  ...props
}: Omit<ModalProps, 'children'>) {
  const [search, setSearch] = useState('')
  const searchCmd = useSearchTasksCommand()
  const userQuery = useUserQuery()

  const throttle = (func: () => void, delay: number) => {
    let timeoutId: unknown = null
    let lastArgs: unknown = null

    const throttledFunc = (...args: unknown[]) => {
      lastArgs = args

      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          func(
            // @ts-ignore
            ...lastArgs
          )
          timeoutId = null
        }, delay)
      }
    }

    return throttledFunc
  }

  const onChangeThrottled = useRef(
    throttle(
      // @ts-ignore
      searchCmd.command,
      100
    )
  ).current

  return (
    <Modal onClose={onClose} {...props}>
      <Stack>
        <SearchResults tasks={searchCmd?.data || []} onClose={onClose} />
        <Input
          placeholder='Search'
          value={search}
          onChange={ev => {
            setSearch(ev.target.value)
            onChangeThrottled({
              title: search,
              userId: userQuery?.data.id
            })
          }}
        />
      </Stack>
    </Modal>
  )
}

const SearchResults = memo<{ tasks: TaskDto[]; onClose: () => void }>(
  ({ tasks, onClose }) => {
    const [, setDate] = useSelectedDate()

    return (
      <Stack>
        <Text>Found {tasks.length} tasks</Text>
        <Stack gap={12} py={20}>
          {tasks.map(task => {
            return (
              <Stack
                cursor={'pointer'}
                key={task.id}
                onClick={() => {
                  setDate(task.date)
                  onClose()
                }}
              >
                <Flex gap={8}>
                  {task.completed ? (
                    <CheckCircle2 fill='greenyellow' />
                  ) : (
                    <CircleIcon />
                  )}
                  <Text fontWeight={'bold'}>{task.title}</Text>
                </Flex>
                <Text css={{ textStyle: 'xs', color: 'text.dimmed' }}>
                  {new Date(task.date).toLocaleString('default', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </Text>
              </Stack>
            )
          })}
        </Stack>
      </Stack>
    )
  },
  (prev, next) => {
    return !next.tasks.length || prev.tasks.length === next.tasks.length
  }
)
