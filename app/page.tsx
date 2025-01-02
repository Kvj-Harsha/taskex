"use client";
import Hero from './_components/Hero';
import Navbar from './_components/Navbar';
import Cta from './_components/Cta';
import Info from './_components/Info';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div>
          <Navbar/>
          <Hero/>
          <Info/>
          <Cta/>
    </div>
  );
}
