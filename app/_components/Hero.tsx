import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div>
      <section className="bg-[#3d52a0] text-[#ede8f5] overflow-hidden relative h-screen">
        <div className="relative mx-auto max-w-screen-xl px-4 py-16 lg:py-32 lg:flex lg:h-screen lg:items-center">
          <div className="relative mx-auto max-w-3xl text-center z-10">
            {/* Animated Heading */}
            <motion.h1
              className="text-[#ede8f5] text-4xl font-extrabold sm:text-5xl md:text-6xl leading-tight"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Taskex
              <motion.span
                className="sm:block"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Collaborative. Modern. Efficient.
              </motion.span>
            </motion.h1>

            {/* Animated Paragraph */}
            <motion.p
              className="mx-auto mt-6 max-w-md sm:max-w-lg md:max-w-xl text-sm sm:text-base md:text-xl text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Manage your team’s tasks effortlessly with Taskex—a collaborative tool designed for high performance.
            </motion.p>

            {/* Call to Action Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <motion.a
                className="block w-full max-w-xs rounded border border-transparent bg-[#ede8f5] px-6 py-3 text-sm font-medium text-[#3d52a0] hover:bg-transparent hover:text-[#ede8f5] hover:border-white focus:outline-none focus:ring sm:w-auto"
                href="/dashboard"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4, delay: 1 }}
              >
                Get Started
              </motion.a>
              <motion.a
                className="block w-full max-w-xs rounded border border-[#ede8f5] px-6 py-3 text-sm font-medium text-[#ede8f5] hover:bg-[#ede8f5] hover:text-[#3d52a0] focus:outline-none focus:ring sm:w-auto"
                href="/learn-more"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4, delay: 1.2 }}
              >
                Learn More
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
