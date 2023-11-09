import type { TaskDto } from '@/shared/types'

export const getGroupedTasks = (tasks: TaskDto[]) => {
  const completed: TaskDto[] = []
  const pending: TaskDto[] = []
  tasks.forEach(task => {
    if (task.completed) {
      completed.push(task)
    } else {
      pending.push(task)
    }
  })

  return [completed, pending]
}
