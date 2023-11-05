import { Result, Guard } from '@/shared/core'
import { ValueObject } from '@/shared/domain'
export interface TaskDescriptionProps {
  value: string
}

export class TaskDescription extends ValueObject<TaskDescriptionProps> {
  private constructor(props: TaskDescriptionProps) {
    super(props)
  }

  get value(): string {
    return this.props.value
  }

  public static create(description: string): Result<TaskDescription> {
    const propsResult = Guard.againstNullOrUndefined(description, 'description')

    if (propsResult.isFailure) {
      return Result.fail<TaskDescription>(propsResult.getError())
    }

    return Result.ok<TaskDescription>(
      new TaskDescription({
        value: description
      })
    )
  }
}
