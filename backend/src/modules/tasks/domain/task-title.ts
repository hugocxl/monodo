import { Result, Guard } from '@/shared/core'
import { ValueObject } from '@/shared/domain'
export interface TaskTitleProps {
  value: string
}

export class TaskTitle extends ValueObject<TaskTitleProps> {
  private constructor(props: TaskTitleProps) {
    super(props)
  }

  public static minLength: number = 1

  get value(): string {
    return this.props.value
  }

  private static isAppropriateLength(title: string): boolean {
    return title.length >= this.minLength
  }

  public static create(title: string): Result<TaskTitle> {
    const propsResult = Guard.againstNullOrUndefined(title, 'title')

    if (propsResult.isFailure) {
      return Result.fail<TaskTitle>(propsResult.getError())
    }
    if (!this.isAppropriateLength(title)) {
      return Result.fail<TaskTitle>('Title doesnt meet criteria [8 chars min].')
    }

    return Result.ok<TaskTitle>(
      new TaskTitle({
        value: title
      })
    )
  }
}
