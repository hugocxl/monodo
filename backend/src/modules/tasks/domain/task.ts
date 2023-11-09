// Dependencies
import { Guard, Result } from '@/shared/core'
import { Entity } from '@/shared/domain'

// Types
import type { TaskCompleted, TaskTitle } from '.'
import type { TaskUserId } from './task-user-id'
import type { TaskDate } from './task-date'

interface TaskProps {
  title: TaskTitle
  userId: TaskUserId
  date: TaskDate
  completed: TaskCompleted
}

export class Task extends Entity<TaskProps> {
  private constructor(props: TaskProps, id?: string) {
    super(props, id)
  }

  get id() {
    return this._id
  }

  get userId(): TaskUserId {
    return this.props.userId
  }

  get completed(): TaskCompleted {
    return this.props.completed
  }

  get date(): TaskDate {
    return this.props.date
  }

  get title(): TaskTitle {
    return this.props.title
  }

  public static create(props: TaskProps, id?: string): Result<Task> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.userId, argumentName: 'userId' },
      { argument: props.title, argumentName: 'title' },
      { argument: props.date, argumentName: 'date' }
    ])

    if (guardResult.isFailure) {
      return Result.fail<Task>(guardResult.getError())
    }

    const task = new Task(props, id)

    return Result.ok<Task>(task)
  }
}
