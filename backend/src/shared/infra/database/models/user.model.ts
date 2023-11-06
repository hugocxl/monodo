import mongoose from 'mongoose'

// Types
import type { User } from '@/modules/users/domain'

const userSchema = new mongoose.Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      private: true
    }
  },
  {
    timestamps: true
  }
)

export const userModel = mongoose.model<User>('User', userSchema)
