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
import { useState, useRef, memo, useEffect } from 'react'
import { useSearchTasksCommand, useSelectedDate, useUser } from '@/shared/hooks'

// Types
import type { TaskDto } from '@/shared/types'

export function SearchModal({ onClose, isOpen }: Omit<ModalProps, 'children'>) {
  const [search, setSearch] = useState('')
  const searchCmd = useSearchTasksCommand()
  const [user] = useUser()

  useEffect(() => {
    setSearch('')
  }, [isOpen])

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
    <Modal onClose={onClose} isOpen={isOpen}>
      <Stack data-testid={'search-modal'}>
        <SearchResults tasks={searchCmd?.data || []} onClose={onClose} />
        <Input
          data-testid={'search-input'}
          placeholder='Search'
          value={search}
          onChange={ev => {
            setSearch(ev.target.value)
            onChangeThrottled({
              title: search,
              userId: user?.id
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
      <Stack gap={12} py={20} data-testid={'search-list'}>
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
    )
  },
  (prev, next) => {
    return !next.tasks.length || prev.tasks.length === next.tasks.length
  }
)
