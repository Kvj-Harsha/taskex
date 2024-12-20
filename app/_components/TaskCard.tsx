import  motion  from "framer-motion";
import { FC } from "react";

interface TaskCardProps {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  assignee: string;
  tags: string[];
  comments: number;
  timeSpent: string;
  recurring: boolean;
}

const TaskCard: FC<TaskCardProps> = ({
  title,
  description,
  status,
  priority,
  dueDate,
  assignee,
  tags,
  comments,
  timeSpent,
  recurring,
}) => {
  const priorityColors = {
    Low: "bg-blue-500",
    Medium: "bg-green-500",
    High: "bg-orange-500",
    Critical: "bg-red-500",
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4 border-l-4"
      style={{ borderColor: priorityColors[priority as keyof typeof priorityColors] || "bg-gray-500" }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Task Title */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        {title}
      </h2>

      {/* Task Description */}
      <p className="text-gray-600 dark:text-gray-300">{description}</p>

      {/* Task Details */}
      <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400">
        <span className="mr-4">📅 Due: {dueDate}</span>
        <span className="mr-4">👤 {assignee}</span>
        <span className="mr-4">💬 {comments} Comments</span>
        <span>⏱️ {timeSpent}</span>
      </div>

      {/* Tags */}
      <div className="flex space-x-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full text-xs"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Recurring Indicator */}
      {recurring && (
        <div className="text-xs text-blue-500 font-medium">🔁 Recurring Weekly</div>
      )}

      {/* Status & Priority */}
      <div className="flex items-center justify-between">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${
            priorityColors[priority as keyof typeof priorityColors]
          }`}
        >
          {priority} Priority
        </span>
        <span
          className="inline-block bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium"
        >
          {status}
        </span>
      </div>
    </motion.div>
  );
};

export default TaskCard;
