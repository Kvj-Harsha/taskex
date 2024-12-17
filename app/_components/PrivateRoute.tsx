"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        router.push("/sign-in");
      } else {
        setUser(true);
      }
    });
    return () => unsubscribe();
  }, [router]);

  return user ? children : <div>Loading...</div>;
}
