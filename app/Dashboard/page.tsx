"use client";

import { useState, useEffect } from "react";
import { auth, firebaseAuth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import PrivateRoute from "../_components/PrivateRoute";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";
import { MdAddTask, MdTaskAlt, MdAssignment } from "react-icons/md";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";

const Dashboard = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [userName, setUserName] = useState("User");
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignee: "",
    status: "To Do",
    assignedBy: auth.currentUser?.email || "",
    dueDate: "",
    priority: "Medium",
    type: "my-task",
  });
  const [showForm, setShowForm] = useState(false);
  const [currentTab, setCurrentTab] = useState("all");

  // Fetch Tasks by Tab
  useEffect(() => {
    const fetchTasks = () => {
      const tasksRef = collection(db, "tasks");
      let q;

      // Fetch tasks for 'my-task' or 'assigned-task' based on user's role
      if (currentTab === "my") {
        q = query(
          tasksRef,
          where("assignedBy", "==", auth.currentUser?.email) // Only assigned by user
        );
      } else if (currentTab === "assigned") {
        q = query(
          tasksRef,
          where("assignee", "==", auth.currentUser?.email) // Only tasks assigned to user
        );
      } else {
        q = query(tasksRef); // Fetch all tasks (adjust this if needed)
      }

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedTasks = snapshot.docs.map((doc) => ({ taskId: doc.id, ...doc.data() }));

        setTasks(fetchedTasks);
      });

      return unsubscribe;
    };

    const unsubscribe = fetchTasks();
    return () => unsubscribe();
  }, [currentTab]);

  // Fetch User Details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (auth.currentUser?.uid) {
          const userDoc = doc(db, "users", auth.currentUser.uid);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            setUserName(docSnap.data().name); // Fetch and set the user name
          }
        }
      } catch (err) {
        console.error("Failed to fetch user details", err);
      }
    };

    const fetchUsers = async () => {
      const usersRef = collection(db, "users");
      onSnapshot(usersRef, (snap) => {
        const usersList = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
      });
    };

    fetchUserDetails();
    fetchUsers();
  }, []);

  // CRUD Operations
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tasks"), form);
      setShowForm(false);
      resetForm();
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  const handleStageChange = async (taskId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "tasks", taskId), { status: newStatus });
    } catch (err) {
      console.error("Failed to update task status", err);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      assignee: "",
      status: "To Do",
      assignedBy: auth.currentUser?.email || "",
      dueDate: "",
      priority: "Medium",
      type: "my-task",
    });
  };

  const handleLogout = async () => {
    await firebaseAuth.signOut(auth);
    router.push("/sign-in");
  };

  // Helper Functions
  const getUserDisplayName = (email: string) => {
    const user = users.find((user: { email: string }) => user.email === email);
    return user?.name || email;
  };
  // UI Components
  return (
    <PrivateRoute>
      <div className="flex text-black min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white flex flex-col items-center py-6">
          <h2 className="text-2xl font-bold mb-4">Welcome, {userName}</h2>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center bg-blue-600 px-4 py-2 rounded mb-4 hover:bg-blue-500"
          >
            <MdAddTask className="mr-2" /> Create Task
          </button>
          <nav className="flex flex-col gap-4">
            <button
              onClick={() => setCurrentTab("all")}
              className={currentTab === "all" ? "text-yellow-300" : "hover:text-yellow-300"}
            >
              <MdTaskAlt className="inline-block mr-2" /> All Tasks
            </button>
            <button
              onClick={() => setCurrentTab("my")}
              className={currentTab === "my" ? "text-yellow-300" : "hover:text-yellow-300"}
            >
              <AiOutlineUser className="inline-block mr-2" /> My Tasks
            </button>
            <button
              onClick={() => setCurrentTab("assigned")}
              className={currentTab === "assigned" ? "text-yellow-300" : "hover:text-yellow-300"}
            >
              <MdAssignment className="inline-block mr-2" /> Assigned Tasks
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-6 bg-gray-100">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Task Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </header>

          {/* Task Columns */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["To Do", "In Progress", "Done"].map((status) => (
              <div key={status} className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-4">{status}</h2>
                {tasks
                  .filter((task: { assignee: string; assignedBy: string }) => {
                    // Only show tasks that the current user is either the assignee or the assigned-by user
                    return (
                      task.assignee === auth.currentUser?.email ||
                      task.assignedBy === auth.currentUser?.email
                    );
                  })
                  .filter((task: { status: string }) => task.status === status)
                  .map((task: any) => (
                    <div key={task.taskId} className="bg-gray-200 p-4 rounded shadow mb-4">
                      <h3 className="font-bold text-lg">{task.title}</h3>
                      <p>{task.description}</p>
                      <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
                      <p className="text-sm text-gray-600">Priority: {task.priority}</p>
                      <p className="text-sm text-gray-600">Assigned to: {getUserDisplayName(task.assignee)}</p>
                      <div className="flex gap-2 mt-2">
                        {status !== "Done" && (
                          <button
                            onClick={() =>
                              handleStageChange(task.taskId, status === "To Do" ? "In Progress" : "Done")
                            }
                            className="text-blue-500 hover:underline"
                          >
                            Move to {status === "To Do" ? "In Progress" : "Done"}
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(task.taskId)}
                          className="text-red-500 hover:underline"
                        >
                          <FaTrashAlt className="inline-block mr-1" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}              </div>            ))}
          </section>

          {/* Task Creation Form */}
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
              <div className="bg-white p-6 rounded shadow w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Create Task</h2>
                <div className="mb-4">
                  <label className="block mb-2">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Assignee</label>
                  <select
                    value={form.assignee}
                    onChange={(e) => setForm({ ...form, assignee: e.target.value })}
                    className="w-full border p-2 rounded"
                  >
                    <option value="">Select Assignee</option>
                    {users.map((user: { id: string; email: string; name?: string }) => (
                      <option key={user.id} value={user.email}>
                        {user.name || user.email}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Due Date</label>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="w-full border p-2 rounded"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Task Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full border p-2 rounded"
                  >
                    <option value="my-task">My Task</option>
                    <option value="assigned-task">Assigned Task</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Add Task
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}
        </main>
      </div>
    </PrivateRoute>
  );
};

export default Dashboard;
