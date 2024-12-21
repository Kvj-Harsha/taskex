function TaskItem({ task }) {
    return (
      <li>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
        <button>Mark as Done</button>
        <button>Delete</button>
      </li>
    );
  }
  
  export default TaskItem;
  