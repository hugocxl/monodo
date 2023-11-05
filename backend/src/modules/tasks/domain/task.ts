import { Guard, Result } from '@/shared/core'
import { Entity } from '@/shared/domain'
import type { TaskDescription, TaskTitle } from '.'

interface TaskProps {
  description: TaskDescription
  title: TaskTitle
}

export class Task extends Entity<TaskProps> {
  private constructor(props: TaskProps, id?: string) {
    super(props, id)
  }

  get id() {
    return this._id
  }

  get description(): TaskDescription {
    return this.props.description
  }

  get title(): TaskTitle {
    return this.props.title
  }

  public static create(props: TaskProps, id?: string): Result<Task> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.title, argumentName: 'title' },
      { argument: props.description, argumentName: 'description' }
    ])

    if (guardResult.isFailure) {
      return Result.fail<Task>(guardResult.getError())
    }

    const user = new Task(
      {
        ...props
      },
      id
    )

    return Result.ok<Task>(user)
  }
}
