// Dependencies
import { styled } from '@styled-system/jsx'

// Hooks
import {
  useSelectedDate,
  useTasksByDateQuery,
  useUserQuery
} from '@/shared/hooks'

// Components
import { Stack, Text } from '@/shared/components'
import { Quote } from './quote'
import { Task } from '../task'

// Utils
import { getGroupedTasks } from './tasks.utils'

export function Tasks() {
  const [date] = useSelectedDate()
  const userQuery = useUserQuery()
  const tasks = useTasksByDateQuery({
    date: date,
    userId: userQuery.data?.id
  })

  function renderContent() {
    if (!tasks.data?.length) return <NoTaskForToday />

    const [completed, pending] = getGroupedTasks(tasks.data)
    const arePending = pending.length > 0
    const areCompleted = completed.length > 0

    return (
      <Stack
        css={{
          h: '100%',
          w: '100%',
          overflow: 'auto',
          gap: 12
        }}
      >
        {arePending && pending.map(task => <Task key={task.id} {...task} />)}
        {areCompleted && (
          <>
            <Text
              css={{
                color: 'text.dimmed',
                fontWeight: 'bold',
                ...(arePending && {
                  mt: 40
                })
              }}
            >
              Completed
            </Text>
            {completed.map(task => (
              <Task key={task.id} {...task} />
            ))}
          </>
        )}
      </Stack>
    )
  }

  return (
    <Stack
      css={{
        w: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        px: 12
      }}
    >
      {renderContent()}
    </Stack>
  )
}

function NoTaskForToday() {
  return (
    <Stack>
      <Text css={{ color: 'text.dimmed', textAlign: 'center' }}>
        No tasks for today
      </Text>
      <styled.hr my={40} />
      <Quote />
    </Stack>
  )
}
