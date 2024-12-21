"use client";

import { auth, firebaseAuth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import PrivateRoute from "../_components/PrivateRoute";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await firebaseAuth.signOut(auth);
    router.push("/sign-in");
  };

  const tasks = [
    { id: 1, title: "Design login page", status: "Completed" },
    { id: 2, title: "Implement authentication", status: "In Progress" },
    { id: 3, title: "Create API integration", status: "Pending" },
  ];

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

        <main className="flex-grow  container mx-auto p-6">
          <h2 className="text-2xl font-semibold mb-6">Your Tasks</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {task.title}
                </h3>
                <p
                  className={`mt-2 text-sm ${task.status === "Completed"
                      ? "text-green-500"
                      : task.status === "In Progress"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                >
                  {task.status}
                </p>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center py-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Taskex. All rights reserved.
          </p>
        </footer>
      </div>
    </PrivateRoute>
  );
}
