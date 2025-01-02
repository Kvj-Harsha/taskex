"use client";

import { useState, useEffect } from "react";
import { auth, firebaseAuth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import PrivateRoute from "../_components/PrivateRoute";
import { motion, AnimatePresence } from "framer-motion";

import { FaTasks, FaClipboardList, FaCalendarAlt,
   FaExclamationCircle, FaUserAlt, 
   FaArrowRight, FaTrashAlt } from 'react-icons/fa';
   import { MdAddTask, MdTaskAlt, MdAssignment } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai'

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

interface Task {
  taskId: string;
  title: string;
  description: string;
  assignee: string;
  status: string;
  assignedBy: string;
  dueDate: string;
  priority: string;
  type: string;
}

const Dashboard = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]); // Specify that tasks is an array of Task objects
  const [userName, setUserName] = useState<string>("User");
  const [users, setUsers] = useState<any[]>([]); // Update this as needed based on your user data
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
  const [darkMode, setDarkMode] = useState(false);

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
        const fetchedTasks = snapshot.docs.map((doc) => ({
          taskId: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          assignee: doc.data().assignee,
          status: doc.data().status,
          assignedBy: doc.data().assignedBy,
          dueDate: doc.data().dueDate,
          priority: doc.data().priority,
          type: doc.data().type,
        } as Task));

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
      <div className="flex text-black dark:text-white min-h-screen bg-[#3d52a0] ">

        {/* Sidebar */}

        <motion.aside
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-[26vw] bg-white text-gray-800 flex flex-col items-center justify-between py-6 border-r border-gray-200 shadow-lg dark:bg-gray-900 dark:text-white"
        >
          <div className="flex flex-col items-center justify-center w-full">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="text-2xl font-semibold mb-4 text-center"
            >
              Welcome!
            </motion.h2>

            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              onClick={() => setShowForm(true)}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-500 transition-colors duration-300 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              <MdAddTask className="mr-2" /> Create Task
            </motion.button>
          
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              className="flex flex-col items-center gap-6 w-full"
            >
              {[ 
                { label: "All Tasks", icon: <MdTaskAlt />, tab: "all" },
                { label: "My Tasks", icon: <AiOutlineUser />, tab: "my" },
                { label: "Assigned Tasks", icon: <MdAssignment />, tab: "assigned" },
              ].map(({ label, icon, tab }, index) => (
                <motion.button
                  key={index}
                  variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                  onClick={() => setCurrentTab(tab)}
                  className={`flex items-center gap-3 text-lg font-medium ${currentTab === tab ? "text-blue-600" : "hover:text-blue-500"} transition-colors duration-300`}
                >
                  <span className="text-xl">{icon}</span>
                  <span>{label}</span>
                </motion.button>
              ))}
            </motion.nav>
          </div>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            <p>Developed by <span className="font-semibold text-blue-600"><a href="https://github.com/kvj-harsha">callmekvj</a></span></p>
          </div>
        </motion.aside>
        

        {/* Main Content */}
        <main className="flex-grow p-6  bg-[#3d52a0] ">

 
        <header className="flex justify-between items-center mb-8 bg-white p-5 rounded-lg shadow-xl">
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="flex items-center space-x-3"
  >
    <FaTasks className="text-blue-900 text-4xl transform transition-transform duration-300 hover:scale-105" />
    <motion.h1
      className="text-3xl font-bold text-blue-900 tracking-tight font-sans transform transition-all duration-300 hover:text-blue-300"
    >
      TaskEx Dashboard
    </motion.h1>
  </motion.div>

  <motion.button
    onClick={handleLogout}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
  >
    Logout
  </motion.button>
</header>



          {/* Task Columns */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {["To Do", "In Progress", "Done"].map((status, index) => (
    <motion.div
      key={status}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaTasks className="mr-3 text-gray-600" />
        {status}
      </h2>
      
      {tasks
        .filter((task: { assignee: string; assignedBy: string }) => {
          return (
            task.assignee === auth.currentUser?.email ||
            task.assignedBy === auth.currentUser?.email
          );
        })
        .filter((task: { status: string }) => task.status === status)
        .map((task: any) => (
          <motion.div
            key={task.taskId}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-5 rounded-lg shadow hover:shadow-lg mb-6 transition-shadow duration-300"
          >
            <h3 className="font-semibold text-lg text-gray-900 mb-2 flex items-center">
              <FaClipboardList className="mr-3 text-gray-600" />
              {task.title}
            </h3>
            
            <p className="text-gray-700 text-sm">{task.description}</p>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600 flex items-center">
                <FaCalendarAlt className="mr-2 text-gray-500" />
                Due: {task.dueDate}
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <FaExclamationCircle className="mr-2 text-gray-500" />
                Priority: {task.priority}
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <FaUserAlt className="mr-2 text-gray-500" />
                Assigned to: {getUserDisplayName(task.assignee)}
              </p>
            </div>

            <div className="flex gap-4 mt-4">
              {status !== "Done" && (
                <button
                  onClick={() =>
                    handleStageChange(
                      task.taskId,
                      status === "To Do" ? "In Progress" : "Done"
                    )
                  }
                  className="text-blue-600 hover:underline flex items-center"
                >
                  <FaArrowRight className="mr-2" />
                  Move to {status === "To Do" ? "In Progress" : "Done"}
                </button>
              )}
              <button
                onClick={() => handleDelete(task.taskId)}
                className="text-red-600 hover:underline flex items-center"
              >
                <FaTrashAlt className="mr-2" />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
    </motion.div>
  ))}
</section>



          {/* Task Creation Form */}
          <AnimatePresence>
            {showForm && (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
              >
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-6 rounded shadow w-full max-w-md dark:bg-gray-700"
                >
                  <h2 className="text-xl font-bold mb-4">Create Task</h2>
                  <div className="mb-4">
                    <label className="block mb-2">Title</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full border p-2 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full border p-2 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Assignee</label>
                    <select
                      value={form.assignee}
                      onChange={(e) => setForm({ ...form, assignee: e.target.value })}
                      className="w-full border p-2 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
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
                      className="w-full border p-2 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Priority</label>
                    <select
                      value={form.priority}
                      onChange={(e) => setForm({ ...form, priority: e.target.value })}
                      className="w-full border p-2 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
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
                      className="w-full border p-2 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
                    >
                      <option value="my-task">My Task</option>
                      <option value="assigned-task">Assigned Task</option>
                    </select>
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded dark:bg-blue-500">
                      Add Task
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="bg-gray-300 px-4 py-2 rounded dark:bg-gray-600 dark:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </main>


      </div>
    </PrivateRoute>
  );
};

export default Dashboard;
