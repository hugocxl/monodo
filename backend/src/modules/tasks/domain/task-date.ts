import { Result, Guard } from '@/shared/core'
import { ValueObject } from '@/shared/domain'

export interface TaskDateProps {
  value: Date
}

export class TaskDate extends ValueObject<TaskDateProps> {
  private constructor(props: TaskDateProps) {
    super(props)
  }

  get value(): Date {
    return this.props.value
  }

  private static isValidDate(date: string | Date): boolean {
    return new Date(date).toString() !== 'Invalid Date'
  }

  public static create(date: Date | string): Result<TaskDate> {
    const propsResult = Guard.againstNullOrUndefined(date, 'date')

    if (propsResult.isFailure) {
      return Result.fail<TaskDate>(propsResult.getError())
    }

    if (!this.isValidDate(date)) {
      return Result.fail<TaskDate>('Date is not a valid date.')
    }

    return Result.ok<TaskDate>(
      new TaskDate({
        value: new Date(date)
      })
    )
  }
}
