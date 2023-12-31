// Hooks
import { useState } from 'react'
import {
  useDeleteTaskCommand,
  useSelectedDate,
  useUpdateTaskCommand,
  useUser
} from '@/shared/hooks'

// Types
import type { TaskDto } from '@/shared/types'

// Components
import { Stack, Box, Grid, Flex, Button, Text } from '@/shared/components'
import { TaskModal } from '../task-modal/task-modal'
import { CheckCircle2, CircleIcon, Edit2Icon, TrashIcon } from 'lucide-react'

const smallIconProps = {
  size: 12,
  strokeWidth: 3
}

export function Task({ completed, title, ...rest }: TaskDto) {
  const [date] = useSelectedDate()
  const deleteTaskCmd = useDeleteTaskCommand(date)
  const updateTaskCmd = useUpdateTaskCommand(date)
  const [user] = useUser()
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <Stack
      data-testid={`task-${title}`}
      css={{
        border: 'primary',
        borderRadius: 8,
        p: 12,
        ...(completed && {
          opacity: 0.35
        })
      }}
    >
      <Grid
        css={{
          gridTemplateColumns: '1fr auto',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Flex css={{ gap: 8, w: '100%' }}>
          <Box
            css={{
              cursor: 'pointer',
              borderRadius: '50%'
            }}
            onClick={() => {
              updateTaskCmd.command({
                ...rest,
                userId: user?.id as string,
                completed: !completed,
                title
              })
            }}
          >
            {completed ? <CheckCircle2 fill='greenyellow' /> : <CircleIcon />}
          </Box>

          <Text css={{ fontWeight: 'bolder' }}>{title}</Text>
        </Flex>

        <Flex css={{ gap: 8 }}>
          <Button
            variant={'icon'}
            onClick={() => setIsOpenModal(prev => !prev)}
          >
            <Edit2Icon {...smallIconProps} />
          </Button>
          <Button
            data-testid={'delete-task-button'}
            variant={'icon'}
            onClick={() =>
              deleteTaskCmd.command({
                ...rest,
                userId: user?.id as string
              })
            }
          >
            <TrashIcon {...smallIconProps} />
          </Button>
        </Flex>
      </Grid>

      <TaskModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(prev => !prev)}
        task={{
          ...rest,
          completed,
          title
        }}
      />
    </Stack>
  )
}
