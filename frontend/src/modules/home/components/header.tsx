// Dependencies
import { styled } from '@styled-system/jsx'

// Hooks
import { useSelectedDate } from '@/shared/hooks'

export function Header() {
  const [selectedDate] = useSelectedDate()

  return (
    <styled.header
      css={{
        w: '100%',
        py: 24,
        pt: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <styled.div
        css={{
          display: 'flex',
          flexDir: 'column'
        }}
      >
        <styled.span textStyle={'2xl'} css={{ letterSpacing: '-0.1rem' }}>
          {selectedDate.toLocaleString('default', { weekday: 'long' })}
        </styled.span>
        <styled.div
          css={{
            display: 'flex',
            gap: 4,
            color: 'text.dimmed'
          }}
        >
          <span>
            {selectedDate.toLocaleString('default', { day: '2-digit' })}
          </span>
          <span>
            {selectedDate.toLocaleString('default', { month: 'long' })}
          </span>
          <span>
            {selectedDate.toLocaleString('default', { year: 'numeric' })}
          </span>
        </styled.div>
      </styled.div>
    </styled.header>
  )
}
