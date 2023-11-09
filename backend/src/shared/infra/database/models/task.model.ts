// Dependencies
import mongoose from 'mongoose'

// Types
import type { Task } from '@/modules/tasks/domain'

const taskSchema = new mongoose.Schema<Task>(
  {
    title: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const taskModel = mongoose.model<Task>('Task', taskSchema)
