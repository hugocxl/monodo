// Dependencies
import { Task, TaskDescription, TaskTitle, TaskDate } from '../domain'

// Types
import type { Mapper } from '@/shared/infra'
import type { TaskDto } from '../dto'

export class TaskMapper implements Mapper<Task> {
  public static toDto(task: Task): TaskDto {
    return {
      id: task.id as string,
      completed: task.completed,
      title: task.title.value,
      description: task.description.value,
      date: task.date.value.toString()
    }
  }

  public static toDomain(raw: any): Task | null {
    const taskTitleOrError = TaskTitle.create(raw.title)
    const taskDescriptionOrError = TaskDescription.create(raw.description)
    const taskDateOrError = TaskDate.create(raw.date)

    const taskOrError = Task.create(
      {
        userId: raw.userId,
        completed: raw.completed,
        description: taskDescriptionOrError.getValue(),
        date: taskDateOrError.getValue(),
        title: taskTitleOrError.getValue()
      },
      raw._id.toString()
    )

    if (taskOrError.isFailure) {
      console.log(taskOrError.getError())
      return null
    }

    return taskOrError.getValue()
  }

  public static async toPersistence(task: Task): Promise<any> {
    return {
      _id: task.id,
      completed: task.completed,
      title: task.title.value,
      description: task.description.value,
      date: task.date.value.toString(),
      userId: task.userId
    }
  }
}
