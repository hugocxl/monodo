// Hooks
import { useEffect, useState } from 'react'
import {
  useCreateTaskCommand,
  useSelectedDate,
  useUpdateTaskCommand,
  useUserQuery
} from '@/shared/hooks'

// Components
import { Button, Form, Input, Modal, Text } from '@/shared/components'

// Types
import type { ChangeEvent } from 'react'
import type { ModalProps } from '@/shared/components'
import type { TaskDto } from '@/shared/types'

export type TaskModalProps = Omit<ModalProps, 'children'> & {
  task?: TaskDto
}

export function TaskModal({ onClose, isOpen, task }: TaskModalProps) {
  const [date] = useSelectedDate()
  const [tempTask, setTempTask] = useState<TaskDto>({
    id: '',
    title: '',
    completed: false,
    date,
    ...task
  })
  const userQuery = useUserQuery()
  const updateTaskCmd = useUpdateTaskCommand(date, { onSuccess: onClose })
  const createTaskCmd = useCreateTaskCommand(date, {
    onSuccess: onClose
  })
  const isEdit = !!task
  const title = isEdit ? 'Edit Task' : 'Add Task'

  useEffect(() => {
    setTempTask({
      id: '',
      title: '',
      completed: false,
      date,
      ...task
    })
  }, [isOpen, task, setTempTask, date])

  const onChangeField = (field: string) => (e: ChangeEvent<HTMLInputElement>) =>
    setTempTask({ ...tempTask, [field]: e.target.value })

  function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (isEdit) {
      updateTaskCmd.command({ ...tempTask, userId: userQuery.data?.id })
    } else {
      createTaskCmd.command({ ...tempTask, userId: userQuery.data?.id })
    }
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <Form
        css={{ gap: 12, display: 'flex', flexDir: 'column' }}
        onSubmit={onSubmit}
      >
        <Text
          css={{
            letterSpacing: '-0.05rem',
            textStyle: 'xl',
            fontWeight: 'bolder'
          }}
        >
          {title}
        </Text>
        <Input
          type='text'
          placeholder='Title'
          value={tempTask.title}
          onChange={onChangeField('title')}
        />

        <Button alignSelf={'flex-end'} type='submit'>
          {isEdit ? 'Edit' : 'Create'} task
        </Button>
      </Form>
    </Modal>
  )
}
