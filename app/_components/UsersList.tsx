"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

type User = {
  username: string;
  email: string;
};

const UsersList = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          username: user.displayName || "Unknown User", // Assuming `displayName` is set
          email: user.email || "No Email",
        });
      } else {
        setCurrentUser(null);
      }
    });

    // Fetch all users from Firestore
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const users: User[] = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          users.push({
            username: userData.username || "No Username", // Ensure the `username` exists
            email: userData.email || "No Email", // Ensure the `email` exists
          });
        });
        setAllUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 text-black">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      {currentUser ? (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Current User Info</h3>
          <div className="text-gray-700">
            <p>
              <strong>Username:</strong> {currentUser.username}
            </p>
            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No user signed in.</p>
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4">All Users in the Database</h2>
      <div className="space-y-4">
        {allUsers.length > 0 ? (
          allUsers.map((user, index) => (
            <div key={index} className="text-gray-700">
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found in the database.</p>
        )}
      </div>
    </div>
  );
};

export default UsersList;
  