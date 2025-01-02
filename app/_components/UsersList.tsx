"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth"; // Import updateProfile
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";

type User = {
  username: string;
  email: string;
};

const UsersList = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Query Firestore for the user with the matching email
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("email", "==", user.email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            // Get the first user that matches the email
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            const username = userData.username || "Unknown User";

            // Update the displayName in Firebase Authentication
            if (user.displayName !== username) {
              await updateProfile(user, {
                displayName: username, // Update displayName in Firebase Auth
              });
              console.log("User's displayName updated:", username);
            }

            // Update the username in Firestore
            const userDocRef = doc(db, "users", userDoc.id);
            await updateDoc(userDocRef, {
              username: username, // Ensure Firestore username is consistent
            });
            console.log("User's username updated in Firestore:", username);

            setCurrentUser({
              username: username,
              email: user.email || "No Email",
            });
          } else {
            setCurrentUser({
              username: "Unknown User", // Default value if no user data found
              email: user.email || "No Email",
            });
          }
        } catch (error) {
          console.error("Error fetching user data or updating displayName:", error);
        }
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
            username: userData.username || "No Username",
            email: userData.email || "No Email",
          });
        });
        setAllUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    return () => unsubscribe(); // Cleanup on component unmount
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
