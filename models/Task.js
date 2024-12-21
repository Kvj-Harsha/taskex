const TaskSchema = new mongoose.Schema({
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
    enum: ['To Do', 'In Progress', 'Done', 'Deferred', 'Canceled'],
    default: 'To Do',
  },
  assignee: {
    type: String,
    required: true, // the person the task is assigned to (could be a user ID or name)
  },
  assignedBy: {
    type: String,
    required: true, // UID from Firebase Auth of the person assigning the task
  },
  dueDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        return value >= new Date(); // Ensure dueDate is not in the past
      },
      message: 'Due date cannot be in the past',
    },
  },
  deferredDays: {
    type: Number,
    default: 0, // Number of days deferred
    validate: {
      validator: function(value) {
        return this.status !== 'Deferred' || value > 0;
      },
      message: 'Deferred days must be greater than 0 if the status is "Deferred".',
    },
  },
  canceled: {
    type: Boolean,
    default: false, // Indicates whether the task is canceled
  },
  deferredAt: {
    type: Date,
  },
  canceledAt: {
    type: Date,
  },
  notes: {
    type: String,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  history: [{
    status: String,
    updatedBy: String, // UID of the user who made the update
    updatedAt: Date,
    reason: String,
  }],
  category: {
    type: String,
    enum: ['Development', 'Design', 'Testing', 'Marketing', 'Other'],
  },
}, { timestamps: true });

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

export default Task;
