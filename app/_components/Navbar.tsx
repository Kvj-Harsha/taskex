"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HiMenuAlt3 } from "react-icons/hi";

function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // Apply effect if scrolled more than 10px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-3 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-screen-xl ${
        isScrolled
          ? "bg-white/20 backdrop-blur-md shadow-lg"
          : "bg-white"
      } rounded-lg px-4 py-3 md:py-4 transition-all duration-300`}
    >
      {/* Side Menu (for mobile) */}
      <div
        className={`fixed top-0 left-0 w-2/3 h-full bg-transparent transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        <div className="flex flex-col bg-black lg:bg-transparent md:bg-transparent items-center mt-20 gap-6">
          {[
            { name: "Home", link: "/" },
            { name: "About", link: "/About" },
            { name: "GitHub", link: "https://github.com/Kvj-Harsha/taskex" },
            { name: "Contact", link: "/Contact" },
            { name: "db-test", link: "/read" },
          ].map((item) => (
            <motion.a
              key={item.name}
              href={item.link}
              className="text-white text-lg font-medium"
              whileHover={{ scale: 1.1 }}
              onClick={() => setMenuOpen(false)} // Close menu on navigation
            >
              {item.name}
            </motion.a>
          ))}
        </div>
      </div>

      <header className="flex justify-between items-center">
        {/* Logo */}
        <motion.div
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3 cursor-pointer text-[#3d52a0] font-semibold text-3xl"
      onClick={() => router.push("/")}
    >

      {/* Text with clean modern typography */}
      <span className="text-[#3d52a0] font-extrabold tracking-tight transform transition-all duration-200 hover:text-[#3d52a0]">
        TaskEx
      </span>
    </motion.div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {[
            { name: "Home", link: "/" },
            { name: "About", link: "/About" },
            { name: "GitHub", link: "https://github.com/Kvj-Harsha/taskex" },
            { name: "Contact", link: "/Contact" },
            { name: "db-test", link: "/read" },
          ].map((item) => (
            <motion.a
              key={item.name}
              href={item.link}
              className="text-[#3d52a0] transition-colors hover:text-[#6366f1] dark:hover:text-black"
              whileHover={{ scale: 1.1 }}
            >
              {item.name}
            </motion.a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#6366f1" }}
            onClick={() => router.push("/Dashboard")}
            className="rounded-full bg-[#3d52a0] px-5 py-2 text-sm font-medium text-white shadow-md"
          >
            Login
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#6366f1", color: "#fff" }}
            onClick={() => router.push("/sign-up")}
            className="rounded-full bg-gray-100 px-5 py-2 text-sm font-medium text-[#3d52a0] shadow-md"
          >
            Register
          </motion.button>
        </div>

        {/* Hamburger Menu (for mobile) */}
        <div className="md:hidden">
          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={toggleMenu}
            className="rounded p-2 text-[#3d52a0] transition hover:text-white"
          >
            <HiMenuAlt3 className="w-6 h-6" />
          </motion.button>
        </div>
      </header>
    </motion.div>
  );
}

export default Navbar;
