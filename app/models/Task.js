import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do',
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming there's a User model for task assignment
    required: false,
  },
  dueDate: {
    type: Date,
    required: false,
  },
}, { timestamps: true });

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

export default Task;
