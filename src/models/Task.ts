import mongoose, { Schema, model } from "mongoose";
// mongoose imports main library object of mongoose
// Schema, model imports specific functionalities of mongoose library
// models/task.ts

export interface TaskDocument {
  _id: string;
  userId: mongoose.Schema.Types.ObjectId;  // Reference to the user who created the task
  dueDate: Date;
  heading: string;
  description: string;
  comment?: string;
  priority: 'low' | 'medium' | 'high';  // Priority can be one of these values
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
        type: String
    },
    comment: {
        type: String
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
        required: true
    }
    }, {
    timestamps: true
});

const Task = mongoose.models?.Task || model<TaskDocument>('Task', TaskSchema);
export default Task;
