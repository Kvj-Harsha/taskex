import React from "react";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  status: "To Do" | "In Progress" | "Done";
  onUpdateStatus: (id: string, newStatus: "In Progress" | "Done") => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  assignee,
  dueDate,
  priority,
  status,
  onUpdateStatus,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-black">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p>{description}</p>
      <p className="text-sm text-gray-500">Assignee: {assignee}</p>
      <p className="text-sm text-gray-500">Due: {dueDate}</p>
      <p className="text-sm text-gray-500">Priority: {priority}</p>
      {status !== "Done" && (
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() =>
            onUpdateStatus(id, status === "To Do" ? "In Progress" : "Done")
          }
        >
          Move to {status === "To Do" ? "In Progress" : "Done"}
        </button>
      )}
    </div>
  );
};

export default TaskCard;
