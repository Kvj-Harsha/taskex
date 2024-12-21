import mongoose from "mongoose";

const SubtaskSchema = new mongoose.Schema({
  subtaskId: { type: String, required: true },
  title: { type: String, required: true },
  status: { type: String, default: "pending" }, // Default status is pending
});

const CommentSchema = new mongoose.Schema({
  commentId: { type: String, required: true },
  userId: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const TaskSchema = new mongoose.Schema(
  {
    taskId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: "pending" }, // pending, in-progress, completed
    assignee: {
      userId: { type: String, required: true },
      name: { type: String, required: true },
    },
    dueDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    tags: [{ type: String }],
    subtasks: [SubtaskSchema],
    comments: [CommentSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
