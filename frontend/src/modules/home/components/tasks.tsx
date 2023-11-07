import { useTasksByDate } from '@/shared/hooks'
import { styled } from '@styled-system/jsx'
import { useSearchParams } from 'react-router-dom'
import { Quote } from '.'

export function Tasks() {
  const [searchParams] = useSearchParams()
  const date = searchParams.get('date') ?? new Date()

  const tasks = useTasksByDate({
    date: date as string,
    userId: '65479b51d6ca25452d479bfc'
  })

  function renderContent() {
    if (!tasks.data?.length)
      return (
        <styled.div css={{ display: 'flex', flexDir: 'column', w: '100%' }}>
          <styled.span css={{ color: 'text.dimmed', textAlign: 'center' }}>
            No tasks for today
          </styled.span>
          <styled.hr my={20} />
          <Quote />
        </styled.div>
      )

    return (
      <styled.div css={{ h: '100%', w: '100%' }}>
        {tasks.data?.map(task => (
          <styled.div css={{ w: '100%' }}>
            <p>{task.title}</p>
            <p>{task.description}</p>
          </styled.div>
        ))}
      </styled.div>
    )
  }

  return (
    <styled.div
      css={{
        w: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto'
      }}
    >
      {renderContent()}
    </styled.div>
  )
}
