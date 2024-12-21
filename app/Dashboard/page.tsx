"use client";

import { useState, useEffect } from "react";

// Define a Note type
type Note = {
  _id: string;
  name: string;
  note: string;
};

export default function Dashboard() {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]); // Explicitly typing the notes state
  const [error, setError] = useState("");

  // Fetch all notes when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch("/api/notes");
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setNotes(data);
      }
    };

    fetchNotes();
  }, []);

  // Add type for event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !note) {
      setError("Name and Note are required");
      return;
    }

    const newNote = { name, note };

    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
    } else {
      setNotes([...notes, data]); // Update the notes list with the new note
      setName("");
      setNote("");
      setError("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-semibold text-[#3d52a0] mb-8">Dashboard</h1>

      {/* Display Error */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Form to Create Note */}
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-[#3d52a0] mb-4">Add a New Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3d52a0] mb-4"
            />
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter Note"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3d52a0]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#3d52a0] text-white p-3 rounded-md hover:bg-[#2b3d72] transition"
          >
            Add Note
          </button>
        </form>
      </div>

      {/* Display Notes */}
      <div className="w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-[#3d52a0] mb-4">Notes:</h2>
        <ul className="space-y-4">
          {notes.map((note) => (
            <li
              key={note._id}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <strong className="text-[#3d52a0]">{note.name}</strong>
              <p className="text-gray-700 mt-2">{note.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
