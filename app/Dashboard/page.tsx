"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PrivateRoute from "../_components/PrivateRoute";

type Task = {
  taskId: string;
  title: string;
  description: string;
  status: string;
  assignee: string;
  assignedBy: string;
  dueDate: string;
  priority: string;
  category?: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignee: "",
    assignedBy: "",
    dueDate: "",
    priority: "Medium",
    category: "Development",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/task");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setTasks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      }
    };
    fetchTasks();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setTasks((prev) => [...prev, data]);
      setForm({
        title: "",
        description: "",
        assignee: "",
        assignedBy: "",
        dueDate: "",
        priority: "Medium",
        category: "Development",
      });
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      const res = await fetch("/api/task", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setTasks((prev) => prev.filter((task) => task.taskId !== taskId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  const handleLogout = () => {
    router.push("/sign-in");
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-semibold">Task Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded text-white">
            Logout
          </button>
        </header>

        <main className="flex-grow flex flex-col items-center py-10">
          <h2 className="text-3xl text-black font-bold mb-6">Manage Tasks</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form
            onSubmit={handleSubmit}
            className="bg-white text-black shadow-md p-6 rounded w-full max-w-lg mb-8"
          >
            <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Assignee"
                value={form.assignee}
                onChange={(e) => setForm({ ...form, assignee: e.target.value })}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Assigned By"
                value={form.assignedBy}
                onChange={(e) =>
                  setForm({ ...form, assignedBy: e.target.value })
                }
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                required
                className="w-full p-2 border rounded"
              />
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Testing">Testing</option>
                <option value="Marketing">Marketing</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
            >
              Add Task
            </button>
          </form>

          <section className="w-full max-w-4xl">
            <h3 className="text-2xl text-black font-semibold mb-4">Task List</h3>
            <ul className="grid gap-4">
              {tasks.map((task) => (
                <li key={task.taskId} className="p-4 bg-white text-black shadow rounded border">
                  <h4 className="text-lg text-black font-semibold">{task.title}</h4>
                  <p>{task.description}</p>
                  <p className="text-sm text-gray-600">Priority: {task.priority}</p>
                  <button
                    onClick={() => handleDelete(task.taskId)}
                    className="bg-red-500 px-2 py-1 rounded text-white mt-2"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </PrivateRoute>
  );
}
