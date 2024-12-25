"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PrivateRoute from "../_components/PrivateRoute";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineCalendar, AiOutlineUser, AiOutlineTag } from "react-icons/ai";
import { MdCode, MdBrush, MdBugReport, MdCampaign, MdMoreHoriz } from "react-icons/md";



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


          <section className="w-full max-w-6xl mx-auto p-4">
            <h3 className="text-3xl text-gray-900 font-extrabold mb-8 tracking-tight">
              Task List
            </h3>
            <ul className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
              {tasks.map((task) => {
                // Define category-based styles and icons
                const categoryData = {
                  Development: {
                    style: "bg-blue-100 text-blue-600",
                    icon: <MdCode className="text-blue-600" />,
                  },
                  Design: {
                    style: "bg-pink-100 text-pink-600",
                    icon: <MdBrush className="text-pink-600" />,
                  },
                  Testing: {
                    style: "bg-yellow-100 text-yellow-600",
                    icon: <MdBugReport className="text-yellow-600" />,
                  },
                  Marketing: {
                    style: "bg-green-100 text-green-600",
                    icon: <MdCampaign className="text-green-600" />,
                  },
                  Other: {
                    style: "bg-gray-100 text-gray-600",
                    icon: <MdMoreHoriz className="text-gray-600" />,
                  },
                };

                const { style, icon } = categoryData[task.category as keyof typeof categoryData] || categoryData.Other;

                return (
                  <li
                    key={task.taskId}
                    className="p-6 bg-gradient-to-r from-white to-gray-50 shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition-transform transform hover:scale-105"
                  >
                    <div className="flex justify-between items-start mb-5">
                    <h4 className="text-xl font-bold text-gray-700 flex items-center gap-3">
                        {icon}
                        {task.title}
                      </h4>
                      <button
                        onClick={() => handleDelete(task.taskId)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                        title="Delete Task"
                      >
                        <FaTrashAlt size={20} />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-5 leading-relaxed">{task.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <AiOutlineUser className="text-green-500" />
                        <span>Assigned to: <span className="font-medium text-gray-700">{task.assignee}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AiOutlineUser className="text-purple-500" />
                        <span>Assigned by: <span className="font-medium text-gray-700">{task.assignedBy}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AiOutlineCalendar className="text-yellow-500" />
                        <span>Due Date: <span className="font-medium text-gray-700">{new Date(task.dueDate).toLocaleDateString()}</span></span>
                      </div>
                    </div>
                    <div className="mt-5 flex justify-between items-center">
                      <span
                        className={`px-3 py-1 text-xs font-bold uppercase rounded-full tracking-wide ${
                          task.priority === "High"
                            ? "bg-red-100 text-red-600"
                            : task.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {task.priority}
                      </span>
                      {task.category && (
                        <div className={`flex items-center gap-2 px-3 py-1 text-sm font-semibold rounded-full ${style}`}>
                          {icon}
                          {task.category}
                        </div>
                      )}
                    </div>
                  </li>
                );

              })}            </ul>
          </section>

          

        </main>
      </div>
    </PrivateRoute>
  );
}
