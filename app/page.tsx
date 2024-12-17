"use client";
import Hero from './_components/Hero';
import Navbar from './_components/Navbar'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div>
          <Navbar/>

      <Hero/>
    </div>
  );
}
