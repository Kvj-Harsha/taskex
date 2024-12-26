"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaTasks } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";

function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-screen-xl bg-gradient-to-r from-[#ede8f5] to-[#f9f8fc] shadow-xl backdrop-blur-md rounded-lg px-4 py-3 md:py-4"
    >
      {/* Side Menu (for mobile) */}
      <div
        className={`fixed top-0 left-0 w-2/3 h-full bg-[#3d52a0] transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        <div className="flex flex-col items-center mt-20 gap-6">
          {[
            { name: "Home", link: "/" },
            { name: "About", link: "/About" },
            { name: "GitHub", link: "https://github.com/Kvj-Harsha/taskex" },
            { name: "Contact", link: "/Contact" },
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
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-2 text-xl font-semibold text-[#3d52a0] cursor-pointer"
          onClick={() => router.push("/")}
        >
          <FaTasks className="text-[#6366f1]" />
          TaskEx
        </motion.div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {[
            { name: "Home", link: "/" },
            { name: "About", link: "/About" },
            { name: "GitHub", link: "https://github.com/Kvj-Harsha/taskex" },
            { name: "Contact", link: "/Contact" },
          ].map((item) => (
            <motion.a
              key={item.name}
              href={item.link}
              className="text-[#3d52a0] transition-colors hover:text-[#6366f1] dark:hover:text-white"
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
