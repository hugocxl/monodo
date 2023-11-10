// Dependencies
import { styled } from '@styled-system/jsx'

// Hooks
import { useSelectedDate } from '@/shared/hooks'
import { useState } from 'react'

// Components
import { CalendarDaysIcon, SearchIcon } from 'lucide-react'
import { Text, Button, Flex } from '@/shared/components'
import { SearchModal } from '../search-modal'

export function Header() {
  const [date] = useSelectedDate()
  const selectedDate = new Date(date)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const weekday = selectedDate.toLocaleString('default', { weekday: 'long' })
  const longDate = selectedDate.toLocaleString('default', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  return (
    <styled.header
      data-testid={'header'}
      css={{
        borderBottom: 'primary',
        w: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 12,
        mb: 16
      }}
    >
      <Flex css={{ gap: 8, alignItems: 'baseline' }}>
        <CalendarDaysIcon color='red' size={18} />
        <Text
          css={{
            letterSpacing: '-0.05rem',
            textStyle: '2xl',
            fontWeight: 'bolder'
          }}
        >
          {weekday}
        </Text>
        <Text css={{ textStyle: 'sm', color: 'text.dimmed' }}>{longDate}</Text>
      </Flex>

      <Button
        data-testid={'open-search-button'}
        variant='icon'
        onClick={() => setIsSearchModalOpen(prev => !prev)}
      >
        <SearchIcon size={20} />
      </Button>

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(prev => !prev)}
      />
    </styled.header>
  )
}
