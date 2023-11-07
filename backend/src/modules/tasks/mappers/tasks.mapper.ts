// Dependencies
import { Task, TaskDescription, TaskTitle } from '../domain'

// Types
import type { Mapper } from '@/shared/infra'
import type { TaskDto } from '../dto'

export class TaskMapper implements Mapper<Task> {
  public static toDto(task: Task): TaskDto {
    return {
      title: task.title.value,
      description: task.description.value
    }
  }

  public static toDomain(raw: any): Task | null {
    const taskTitleOrError = TaskTitle.create(raw.title)
    const taskDescriptionOrError = TaskDescription.create(raw.description)

    const taskOrError = Task.create(
      {
        userId: raw.userId,
        description: taskDescriptionOrError.getValue(),
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
      title: task.title.value,
      description: task.description.value,
      userId: task.userId
    }
  }
}
