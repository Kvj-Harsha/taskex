import Link from "next/link";

export default async function TasksPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, { cache: "no-store" });
  const tasks = await response.json();

  return (
    <div>
      <h1>Tasks</h1>
      <Link href="/tasks/create">Create Task</Link>
      <ul>
        {tasks.map((task) => (
          <li key={task.taskId}>
            <Link href={`/tasks/${task.taskId}`}>
              <a>{task.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
