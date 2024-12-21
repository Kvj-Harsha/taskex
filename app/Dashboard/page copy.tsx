"use client";

import { useState, useEffect } from "react";
import { auth, firebaseAuth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import PrivateRoute from "../_components/PrivateRoute";
import TaskList from "../_components/TaskList";

export default function Dashboard() {
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleLogout = async () => {
    await firebaseAuth.signOut(auth);
    router.push("/sign-in");
  };

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    if (data?.tasks) {
      setTasks(data.tasks);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    if (!title || !description || !dueDate) {
      setError("All fields are required");
      return;
    }
  
    const newTask = { title, description, status, dueDate };
  
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
  
    const data = await res.json();
  
    if (data?.task) {
      setTasks([...tasks, data.task]); // Update the state with new task
      setTitle("");
      setDescription("");
      setStatus("To Do");
      setDueDate("");
      setError("");
    } else {
      setError(data.error || "Failed to create task");
    }
  };
  
  const handleDeleteTask = async (id) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
  
    const data = await res.json();
  
    if (data?.success) {
      setTasks(tasks.filter((task) => task._id !== id));
    }
  };
  

  const handleUpdateTask = async (id, updatedStatus) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: updatedStatus }),
    });
  
    const data = await res.json();
  
    if (data?.task) {
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, status: updatedStatus } : task
        )
      );
    }
  };
  

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-[#3d52a0] flex flex-col">
        {/* Header */}
        <header className="bg-white text-[#3d52a0] py-4 px-6 flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-semibold">Task Management Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white transition duration-200"
          >
            Logout
          </button>
        </header>

        {/* Task Creation Form */}
        <div className="max-w-md mx-auto bg-white p-6 mt-8 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter task title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter task description"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="dueDate" className="block text-gray-700">Due Date</label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={handleCreateTask}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Create Task
          </button>
        </div>

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onUpdateStatus={handleUpdateTask}
        />

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
          <p className="text-sm">
            © {new Date().getFullYear()} Taskex. All rights reserved.
          </p>
        </footer>
      </div>
    </PrivateRoute>
  );
}