import mongoose, { Schema, model } from "mongoose";

export interface TaskDocument {
  _id: string;
  userId: mongoose.Schema.Types.ObjectId;  // Reference to the user who created the task
  dueDate: Date;
  heading: string;
  description: string;
  comment?: string;
  priority: 'Priority-1' | 'Priority-2' | 'Priority-3' | 'Priority-4';
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<TaskDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    heading: {
        type: String,
        required: [true, "Heading is required"]
    },
    description: {
        type: String,
        required: false
    },
    comment: {
        type: String,
        required: false
    },
    priority: {
        type: String,
        enum: ['Priority-1', 'Priority-2', 'Priority-3', 'Priority-4'],
        required: true
    }
    }, {
    timestamps: true
});

const Task = mongoose.models?.Task || model<TaskDocument>('Task', TaskSchema);
export default Task;
