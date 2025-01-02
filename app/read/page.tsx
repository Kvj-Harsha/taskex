"use client";

import { useEffect, useState } from "react";

import Navbar from "../_components/Navbar";
import PrivateRoute from "../_components/PrivateRoute"; // Import your Navbar
import { db } from "@/lib/firebase"; // Path to your Firebase setup
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";

interface Issue {
  id: string;
  email: string;
  issue: string;
  name: string;
}

const FirebaseRead = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newIssue, setNewIssue] = useState<Issue>({
    id: "",
    email: "",
    issue: "",
    name: "",
  });
  const [filter, setFilter] = useState<string>("");

  // Fetch issues in real-time
  useEffect(() => {
    setLoading(true);

    const unsubscribe = onSnapshot(
      collection(db, "issues"),
      (snapshot) => {
        const fetchedIssues: Issue[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          fetchedIssues.push({
            id: doc.id,
            email: data.email,
            issue: data.issue,
            name: data.name,
          });
        });
        setIssues(fetchedIssues);
        setLoading(false);
      },
      (err) => {
        setError("Failed to fetch data");
        console.error("Error fetching Firestore data: ", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Add a new issue
  const handleAddIssue = async () => {
    try {
      await addDoc(collection(db, "issues"), {
        email: newIssue.email,
        issue: newIssue.issue,
        name: newIssue.name,
      });
      setNewIssue({ id: "", email: "", issue: "", name: "" });
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  // Delete an issue
  const handleDeleteIssue = async (id: string) => {
    try {
      await deleteDoc(doc(db, "issues", id));
    } catch (err) {
      console.error("Error deleting document: ", err);
    }
  };

  // Filter issues
  const filteredIssues = issues.filter(
    (issue) =>
      issue.email.toLowerCase().includes(filter.toLowerCase()) ||
      issue.issue.toLowerCase().includes(filter.toLowerCase()) ||
      issue.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

  return (
      <PrivateRoute>
    <div>
      <Navbar />
      <div className="max-w-6xl mt-28 mx-auto px-4 space-y-6">
        <h1 className="text-3xl text-white font-bold text-center text-gray-800">Issues Collection (Real-Time)</h1>

        {/* Add Issue Form */}
        <div className="p-6 rounded-lg shadow-md bg-gradient-to-r from-blue-50 to-white">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Issue</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newIssue.name}
              onChange={(e) => setNewIssue({ ...newIssue, name: e.target.value })}
              className="border border-gray-300 rounded px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={newIssue.email}
              onChange={(e) => setNewIssue({ ...newIssue, email: e.target.value })}
              className="border border-gray-300 rounded px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Issue"
              value={newIssue.issue}
              onChange={(e) => setNewIssue({ ...newIssue, issue: e.target.value })}
              className="border border-gray-300 rounded px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            onClick={handleAddIssue}
            className="mt-4 w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          >
            Add Issue
          </button>
        </div>

        {/* Filter */}
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search issues..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-2/3 md:w-1/2 border border-gray-300 rounded px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Issues List */}
        <div className="p-6 rounded-lg shadow-md bg-white">
          {filteredIssues.length > 0 ? (
            <ul className="space-y-4">
              {filteredIssues.map((issue) => (
                <li
                  key={issue.id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-sm"
                >
                  <div>
                    <p className="text-gray-700">
                      <strong>Name:</strong> {issue.name}
                    </p>
                    <p className="text-gray-700">
                      <strong>Email:</strong> {issue.email}
                    </p>
                    <p className="text-gray-700">
                      <strong>Issue:</strong> {issue.issue}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteIssue(issue.id)}
                    className="mt-4 sm:mt-0 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No issues found.</p>
          )}
        </div>
      </div>
    </div>
    </PrivateRoute>
  );
};

export default FirebaseRead;
