"use client";
import React, { useState } from 'react';
import { db, collection, addDoc } from '@/lib/firebase'; // Import Firestore functions

const Cta: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      // Add email to the Firestore newsletter collection
      const docRef = await addDoc(collection(db, 'newsletter'), {
        email,
        subscribedAt: new Date(),
      });
      console.log('Document written with ID: ', docRef.id); // Optional: Log the document ID
      setEmail(''); // Clear the email input after submission
      alert('Thank you for subscribing!');
    } catch (error) {
      console.error('Error adding email to Firestore:', error);
      alert('Something went wrong. Please try again later.');
    }

    setIsSubmitting(false);
  };

  return (
    <section>
      <div className="p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
            Subscribe to our Newsletter for Task Management Tips
          </h2>

          <p className="hidden text-gray-500 sm:mt-4 sm:block dark:text-gray-400">
            Stay up-to-date with the latest tips, features, and updates on our task management app. 
            Sign up to receive expert advice on boosting your productivity and managing tasks more efficiently.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-xl">
          <form onSubmit={handleSubmit} className="sm:flex sm:gap-4">
            <div className="sm:flex-1">
              <label htmlFor="email" className="sr-only">Email</label>

              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full rounded-md border-gray-200 bg-white p-3 shadow-sm transition focus:border-white focus:outline-none focus:ring focus:ring-yellow-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-rose-600 px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-yellow-400 sm:mt-0 sm:w-auto"
            >
              <span className="text-sm font-medium"> Sign Up </span>

              <svg
                className="size-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Cta;
