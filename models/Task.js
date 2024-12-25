import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; // To generate unique taskId

const TaskSchema = new mongoose.Schema(
  {
    taskId: {
      type: String,
      unique: true,
      default: () => uuidv4(), // Generate a unique taskId automatically
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done", "Deferred", "Canceled"],
      default: "To Do",
    },
    assignee: {
      type: String,
      required: true,
    },
    assignedBy: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value >= new Date();
        },
        message: "Due date cannot be in the past",
      },
    },
    notes: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    category: {
      type: String,
      enum: ["Development", "Design", "Testing", "Marketing", "Other"],
    },
  },
  { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);

export default Task;
