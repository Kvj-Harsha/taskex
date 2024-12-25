"use client";

import { useState, useEffect } from "react";
import { auth, firebaseAuth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import PrivateRoute from "../_components/PrivateRoute";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";
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
    status: "To Do",
    assignedBy: "",
    dueDate: "",
    priority: "Medium",
    category: "Development",
  });
  const [showForm, setShowForm] = useState(false);
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
      setShowForm(false);
      setForm({
        title: "",
        description: "",
        status: "To Do",
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

  const handleLogout = async () => {
    await firebaseAuth.signOut(auth);
    router.push("/sign-in");
  };



return (
  <PrivateRoute>
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-semibold">Task Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded text-white transition duration-200"
        >
          Logout
        </button>
      </header>

      <main className="flex-grow p-6 flex flex-col gap-8">
        {/* Create Task Button */}
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-md self-center shadow-lg hover:bg-blue-700 transition duration-200"
        >
          Create Task
        </button>

        {/* Floating Task Form */}
        {showForm && (
            <form
               onSubmit={handleSubmit}
               className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
             >
                        <div className="bg-white text-black p-8 rounded-2xl shadow-xl w-full max-w-3xl transition-all duration-300 ease-in-out transform scale-95 hover:scale-100">
                        <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                        Add New Task
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Task Title */}
                        <div className="flex flex-col">
                            <label
                            htmlFor="title"
                            className="text-lg font-medium text-gray-700 mb-2"
                            >
                            Task Title
                            </label>
                            <input
                            type="text"
                            id="title"
                            placeholder="Task Title"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            required
                            className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            />
                        </div>
             
                   {/* Description */}
                   <div className="flex flex-col">
                     <label
                       htmlFor="description"
                       className="text-lg font-medium text-gray-700 mb-2"
                     >
                       Description
                     </label>
                     <textarea
                       id="description"
                       placeholder="Description"
                       value={form.description}
                       onChange={(e) => setForm({ ...form, description: e.target.value })}
                       required
                       className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                     />
                   </div>
             
                   {/* Assignee */}
                   <div className="flex flex-col">
                     <label
                       htmlFor="assignee"
                       className="text-lg font-medium text-gray-700 mb-2"
                     >
                       Assignee
                     </label>
                     <input
                       type="text"
                       id="assignee"
                       placeholder="Assignee"
                       value={form.assignee}
                       onChange={(e) => setForm({ ...form, assignee: e.target.value })}
                       required
                       className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                     />
                   </div>
             
                   {/* Assigned By */}
                   <div className="flex flex-col">
                     <label
                       htmlFor="assignedBy"
                       className="text-lg font-medium text-gray-700 mb-2"
                     >
                       Assigned By
                     </label>
                     <input
                       type="text"
                       id="assignedBy"
                       placeholder="Assigned By"
                       value={form.assignedBy}
                       onChange={(e) => setForm({ ...form, assignedBy: e.target.value })}
                       required
                       className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                     />
                   </div>
             
                   {/* Due Date */}
                   <div className="flex flex-col">
                     <label
                       htmlFor="dueDate"
                       className="text-lg font-medium text-gray-700 mb-2"
                     >
                       Due Date
                     </label>
                     <input
                       type="date"
                       id="dueDate"
                       value={form.dueDate}
                       onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                       required
                       className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                     />
                   </div>
             
                   {/* Priority */}
                   <div className="flex flex-col">
                     <label
                       htmlFor="priority"
                       className="text-lg font-medium text-gray-700 mb-2"
                     >
                       Priority
                     </label>
                     <select
                       id="priority"
                       value={form.priority}
                       onChange={(e) => setForm({ ...form, priority: e.target.value })}
                       className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                     >
                       <option value="Low">Low</option>
                       <option value="Medium">Medium</option>
                       <option value="High">High</option>
                     </select>
                   </div>
             
                   {/* Category */}
                   <div className="flex flex-col">
                     <label
                       htmlFor="category"
                       className="text-lg font-medium text-gray-700 mb-2"
                     >
                       Project Type
                     </label>
                     <select
                       id="category"
                       value={form.category}
                       onChange={(e) => setForm({ ...form, category: e.target.value })}
                       className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                     >
                       <option value="Development">Development</option>
                       <option value="Design">Design</option>
                       <option value="Testing">Testing</option>
                       <option value="Marketing">Marketing</option>
                       <option value="Other">Other</option>
                     </select>
                   </div>
                 </div>
             
                 <div className="mt-6 flex justify-end gap-4">
                   <button
                     type="submit"
                     className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                   >
                     Add Task
                   </button>
                   <button
                     type="button"
                     onClick={() => setShowForm(false)}
                     className="bg-gray-300 text-black px-6 py-3 rounded-md hover:bg-gray-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                   >
                     Cancel
                   </button>
                 </div>
               </div>
             </form>
              

        )}

        {/* Task Status Columns */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["To Do", "In Progress", "Done"].map((status) => (
            <div
              key={status}
              className="bg-white rounded-lg shadow-lg p-6 border border-gray-300"
            >
              <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">
                {status}
              </h3>
              <ul>
                {tasks
                  .filter((task) => task.status === status)
                  .map((task) => {
                    const categoryData = {
                      Development: {
                        style: "bg-blue-50 text-blue-600",
                        icon: <MdCode className="text-blue-600" />,
                      },
                      Design: {
                        style: "bg-pink-50 text-pink-600",
                        icon: <MdBrush className="text-pink-600" />,
                      },
                      Testing: {
                        style: "bg-yellow-50 text-yellow-600",
                        icon: <MdBugReport className="text-yellow-600" />,
                      },
                      Marketing: {
                        style: "bg-green-50 text-green-600",
                        icon: <MdCampaign className="text-green-600" />,
                      },
                      Other: {
                        style: "bg-gray-50 text-gray-600",
                        icon: <MdMoreHoriz className="text-gray-600" />,
                      },
                    };

                    const { style, icon } =
                      categoryData[task.category as keyof typeof categoryData] ||
                      categoryData.Other;

                    return (
                      <li
                        key={task.taskId}
                        className="p-4 bg-white shadow-md rounded-lg mb-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-3">
                            {icon}
                            {task.title}
                          </h4>
                          <button
                            onClick={() => handleDelete(task.taskId)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                        <p className="text-gray-600 my-4">{task.description}</p>
                        <div
                          className={`inline-block px-4 py-1 text-xs font-medium rounded-full ${{
                            "To Do": "bg-blue-50 text-blue-600",
                            "In Progress": "bg-yellow-50 text-yellow-600",
                            Done: "bg-green-50 text-green-600",
                            Deferred: "bg-orange-50 text-orange-600",
                            Canceled: "bg-red-50 text-red-600",
                          }[task.status] || "bg-gray-50 text-gray-600"}`}
                        >
                          {task.status}
                        </div>
                        <div className="flex flex-col gap-3 mt-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <AiOutlineUser className="text-green-500" />
                            <span>
                              Assigned to:{" "}
                              <span className="font-medium">{task.assignee}</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AiOutlineUser className="text-purple-500" />
                            <span>
                              Assigned by:{" "}
                              <span className="font-medium">{task.assignedBy}</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AiOutlineCalendar className="text-yellow-500" />
                            <span>
                              Due Date:{" "}
                              <span className="font-medium">
                                {new Date(task.dueDate).toLocaleDateString()}
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                          <span
                            className={`px-4 py-1 text-xs font-bold rounded-full ${
                              task.priority === "High"
                                ? "bg-red-50 text-red-600"
                                : task.priority === "Medium"
                                ? "bg-yellow-50 text-yellow-600"
                                : "bg-green-50 text-green-600"
                            }`}
                          >
                            {task.priority}
                          </span>
                          {task.category && (
                            <div
                              className={`flex items-center gap-3 px-4 py-1 text-sm font-medium rounded-full ${style}`}
                            >
                              {icon}
                              {task.category}
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </section>
      </main>
    </div>
  </PrivateRoute>
);




}
