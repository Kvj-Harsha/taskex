function TaskList({ tasks, onDelete, onUpdateStatus }) {
    return (
      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-white p-4 rounded shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p>{task.description}</p>
                <p className="text-sm text-gray-600">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                <p className="mt-2">
                  <strong>Status:</strong> {task.status}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onUpdateStatus(task._id, "Done")}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white transition"
                >
                  Mark as Done
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default TaskList;
  