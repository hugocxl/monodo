// Dependencies
import { styled } from '@styled-system/jsx'

// Hooks
import { useQuoteQuery } from '@/shared/hooks'

export function Quote() {
  const { isLoading, data } = useQuoteQuery()

  function renderQuote() {
    if (isLoading) return <p>Loading...</p>

    return (
      <>
        <styled.p
          css={{
            textAlign: 'center',
            fontSize: 'small',
            color: 'text.dimmed'
          }}
        >
          {data?.content}
        </styled.p>
        <styled.p css={{ mt: 8, fontSize: 'x-small' }}>{data?.author}</styled.p>
      </>
    )
  }

  return (
    <styled.div
      css={{
        h: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDir: 'column',
        alignItems: 'center'
      }}
    >
      {renderQuote()}
    </styled.div>
  )
}
