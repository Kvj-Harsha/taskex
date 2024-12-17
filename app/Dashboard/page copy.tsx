"use client";

import { useState } from "react";
import { format } from "date-fns";
import { getAuth, signOut } from "firebase/auth"; // Import Firebase Auth
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface Task {
  id: number;
  name: string;
  assignee: string;
  reviewer: string;
  category: string;
  tags: string[];
  startDate: string;
  endDate: string;
  time?: string;
  status: "ongoing" | "completed" | "deadlineCrossed";
}

export default function TaskDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState<Task>({
    id: Date.now(),
    name: "",
    assignee: "",
    reviewer: "",
    category: "",
    tags: [],
    startDate: "",
    endDate: "",
    status: "ongoing",
  });

  const currentDateTime = format(new Date(), "yyyy-MM-dd HH:mm");

  // Firebase Sign-Out Function
  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      // Optionally, redirect the user to the login page
      // window.location.href = "/"; 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const addTask = () => {
    setTasks((prev) => [...prev, newTask]);
    setShowModal(false);
    setNewTask({
      id: Date.now(),
      name: "",
      assignee: "",
      reviewer: "",
      category: "",
      tags: [],
      startDate: "",
      endDate: "",
      status: "ongoing",
    });
  };

  const renderTaskCard = (task: Task) => (
    <div
      key={task.id}
      className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2 border-l-4"
      style={{
        borderColor:
          task.status === "completed"
            ? "green"
            : task.status === "deadlineCrossed"
            ? "red"
            : "blue",
      }}
    >
      <h3 className="font-semibold text-lg text-blue-500">{task.name}</h3>
      <p className="text-sm text-gray-600">Assignee: {task.assignee}</p>
      <p className="text-sm text-gray-600">Reviewer: {task.reviewer}</p>
      <p className="text-sm text-gray-600">Category: {task.category}</p>
      <p className="text-sm text-gray-600">Tags: {task.tags.join(", ")}</p>
      <p className="text-sm text-gray-600">
        Start: {task.startDate}, End: {task.endDate}
      </p>
    </div>
  );

  return (
    <div className="p-6 bg-black min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-500">Task Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="text-white">{currentDateTime}</div>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="flex gap-4 mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setShowModal(true)}
        >
          Assign Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="gap-4">
          <h2 className="text-xl font-semibold mb-2">Ongoing Tasks</h2>
          {tasks
            .filter((task) => task.status === "ongoing")
            .map(renderTaskCard)}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Completed Tasks</h2>
          {tasks
            .filter((task) => task.status === "completed")
            .map(renderTaskCard)}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Deadline Crossed</h2>
          {tasks
            .filter((task) => task.status === "deadlineCrossed")
            .map(renderTaskCard)}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 text-black bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Assign New Task</h2>
            <input
              type="text"
              placeholder="Task Name"
              className="w-full mb-3 p-2 border rounded"
              value={newTask.name}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Assignee"
              className="w-full mb-3 p-2 border rounded"
              value={newTask.assignee}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, assignee: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Reviewer"
              className="w-full mb-3 p-2 border rounded"
              value={newTask.reviewer}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, reviewer: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Category"
              className="w-full mb-3 p-2 border rounded"
              value={newTask.category}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, category: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              className="w-full mb-3 p-2 border rounded"
              value={newTask.tags.join(", ")}
              onChange={(e) =>
                setNewTask((prev) => ({
                  ...prev,
                  tags: e.target.value.split(","),
                }))
              }
            />
            <input
              type="date"
              placeholder="Start Date"
              className="w-full mb-3 p-2 border rounded"
              value={newTask.startDate}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, startDate: e.target.value }))
              }
            />
            <input
              type="date"
              placeholder="End Date"
              className="w-full mb-3 p-2 border rounded"
              value={newTask.endDate}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, endDate: e.target.value }))
              }
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={addTask}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
