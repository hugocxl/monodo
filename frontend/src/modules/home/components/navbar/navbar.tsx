import {
  Box,
  Button,
  Calendar,
  Container,
  Flex,
  Stack
} from '@/shared/components'
import {
  PlusIcon,
  LogOutIcon,
  ArrowBigRightDash,
  ArrowBigLeftDash
} from 'lucide-react'
import { TaskModal } from '../task-modal/task-modal'

// Hooks
import { useSelectedDate, useSignOutCommand, useUser } from '@/shared/hooks'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NAVBAR_HEIGHT = 54

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useSelectedDate()
  const logoutCmd = useSignOutCommand()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [, , deleteUser] = useUser()

  function onClickNext() {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + 1)
    setSelectedDate(newDate)
  }

  function onClickPrev() {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() - 1)
    setSelectedDate(newDate)
  }

  return (
    <Stack
      css={{
        position: 'fixed',
        bottom: 0,
        transition: 'all 0.2s ease-in-out',
        transform: `translateY(calc(100% - ${NAVBAR_HEIGHT}px))`,
        ...(isOpen && {
          transform: 'translateY(0)'
        })
      }}
    >
      <Container bg={'bg.secondary'}>
        <Flex
          justify={'space-between'}
          align={'center'}
          css={{
            alignItems: 'center',
            minHeight: NAVBAR_HEIGHT,
            maxHeight: NAVBAR_HEIGHT,
            p: 12,
            w: '100%',
            borderBottom: 'primary'
          }}
        >
          <Button
            data-testid={'open-new-task-modal-button'}
            onClick={() => setIsModalOpen(prev => !prev)}
            variant='icon'
            css={{ bg: 'red', p: 4 }}
          >
            <PlusIcon />
          </Button>

          <Flex h={'100%'} align={'center'}>
            <Button
              onClick={onClickPrev}
              css={{ bg: 'none', color: 'text.dimmed' }}
            >
              <ArrowBigLeftDash size={20} />
            </Button>

            <Button bg={'none'} onClick={() => setIsOpen(prev => !prev)}>
              <Box
                css={{
                  width: 40,
                  height: 6,
                  borderRadius: 8,
                  bg: 'text.dimmed'
                }}
              />
            </Button>

            <Button
              onClick={onClickNext}
              css={{ bg: 'none', color: 'text.dimmed' }}
            >
              <ArrowBigRightDash size={20} />
            </Button>
          </Flex>

          <Button
            variant='icon'
            p={8}
            onClick={() => {
              deleteUser()
              logoutCmd.command('auth')
              navigate('/auth')
            }}
          >
            <LogOutIcon size={20} />
          </Button>
        </Flex>

        <Box p={20}>
          <Calendar
            minDetail='decade'
            value={selectedDate}
            onChange={value => {
              setSelectedDate(value as Date)
              setIsOpen(false)
            }}
          />
        </Box>
      </Container>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(prev => !prev)}
      />
    </Stack>
  )
}
