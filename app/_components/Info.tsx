import React from 'react';
import { motion } from 'framer-motion';

function Info() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <section className="bg-[#3d52a0]">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <div className="max-w-lg md:max-w-none">
                <motion.h2
                  className="text-2xl font-semibold text-gray-100 sm:text-3xl"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                >
                  Organize Your Tasks Efficiently with Taskex
                </motion.h2>

                <motion.p
                  className="mt-4 text-gray-200"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                >
                  Taskex helps you stay on top of your daily to-dos, team projects, and deadlines.
                  With intuitive design and smart features, managing your workload has never been easier.
                </motion.p>

                <motion.p
                  className="mt-4 text-gray-200"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                >
                  Collaborate with your team, set priorities, and track progress in real time.
                  Turn your productivity dreams into reality with Taskex!
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <motion.img
                src="https://i.ibb.co/m8JTgjv/my-profit-tutor-v30b-SAWzp4-I-unsplash.jpg"
                className="rounded"
                alt="Task management in action"
                whileHover={{
                  scale: 1.05,
                  rotate: 1,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default Info;
