// Hooks
import { useQuoteQuery } from '@/shared/hooks'

// Components
import { Stack, Text } from '@/shared/components'

export function Quote() {
  const { isLoading, data } = useQuoteQuery()

  function renderQuote() {
    if (isLoading) return <p>Loading...</p>

    return (
      <>
        <Text
          css={{
            textAlign: 'center',
            fontSize: 'small',
            color: 'text.dimmed'
          }}
        >
          {data?.content}
        </Text>
        <Text css={{ mt: 8, fontSize: 'x-small' }}>{data?.author}</Text>
      </>
    )
  }

  return (
    <Stack
      css={{
        h: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {renderQuote()}
    </Stack>
  )
}
