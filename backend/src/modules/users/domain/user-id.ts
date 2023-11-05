import { Result } from '@/shared/core'
import { Entity } from '@/shared/domain'

export class UserId extends Entity<any> {
  get id() {
    return this._id
  }

  private constructor(id?: string) {
    super(null, id)
  }

  public static create(id?: string): Result<UserId> {
    return Result.ok<UserId>(new UserId(id))
  }
}
