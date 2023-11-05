import mongoose from 'mongoose'
import validator from 'validator'

// Types
import type { User } from '@/modules/users/domain'

const userSchema = new mongoose.Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email')
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            'Password must contain at least one letter and one number'
          )
        }
      },
      private: true // used by the toJSON plugin
    }
  },
  {
    timestamps: true
  }
)

export const userModel = mongoose.model<User>('User', userSchema)
