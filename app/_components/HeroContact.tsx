"use client"
import React, { useState } from 'react';
import { db } from "@/lib/firebase";
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { collection, addDoc } from "firebase/firestore";

const HeroContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const docRef = await addDoc(collection(db, "issues"), formData);
      setSubmissionStatus("Issue submitted successfully!");
      setFormData({ name: "", email: "", issue: "" });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
      setSubmissionStatus("Failed to submit the issue.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div>
      <section className="bg-[#3d52a0] text-[#ede8f5] overflow-hidden relative min-h-screen">
        <div className="relative mx-auto max-w-screen-2xl px-8 py-16 lg:py-32 lg:flex lg:min-h-screen lg:items-center">
          <div className="relative mx-auto max-w-6xl text-center z-10 p-8">
            {/* Heading */}
            <h1 className="text-[#ede8f5] text-5xl font-extrabold sm:text-6xl md:text-7xl leading-tight animate-fadeInUp mb-6">
              Contact the Developer
            </h1>

            {/* Paragraph */}
            <p className="mx-auto mt-6 max-w-3xl text-lg sm:text-xl md:text-2xl text-gray-300 animate-slideUp">
              Have an issue, feedback, or an idea? Get in touch or contribute to the project. Your support and contributions drive the success of Taskex.
            </p>


              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 animate-slideUp">
                <div className="bg-[#1f3b73] p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
                    <FaGithub className="mr-2" /> GitHub Repository
                  </h2>
                  <a
                    className="inline-block text-center py-2 px-5 bg-[#ede8f5] text-[#3d52a0] font-semibold rounded-lg hover:bg-[#3d52a0] hover:text-[#ede8f5] focus:outline-none focus:ring transition-colors duration-300"
                    href="https://github.com/Kvj-Harsha/taskex"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Check Out
                  </a>
                  <p className="text-gray-300 mt-4">
                    Found an issue? Submit it in the repository's <strong>Issues</strong> section. Want to contribute? Fork the repository, create a branch, and submit a Pull Request (PR).
                  </p>
                </div>

                <div className="bg-[#1f3b73] p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
                    <FaLinkedin className="mr-2" /> LinkedIn
                  </h2>
                  <a
                    className="inline-block text-center py-2 px-5 bg-[#ede8f5] text-[#3d52a0] font-semibold rounded-lg hover:bg-[#3d52a0] hover:text-[#ede8f5] focus:outline-none focus:ring transition-colors duration-300"
                    href="https://linkedin.com/in/kvjharsha"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Connect on LinkedIn
                  </a>
                  <p className="text-gray-300 mt-4">Stay updated and connect for professional opportunities.</p>
                </div>

                <div className="bg-[#1f3b73] p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
                    <FaEnvelope className="mr-2" /> Email
                  </h2>
                  <a
                    className="inline-block text-center py-2 px-5 bg-[#ede8f5] text-[#3d52a0] font-semibold rounded-lg hover:bg-[#3d52a0] hover:text-[#ede8f5] focus:outline-none focus:ring transition-colors duration-300"
                    href="mailto:cs23b1034@iiitr.ac.in"
                  >
                    Send an Email
                  </a>
                  <p className="text-gray-300 mt-4">Feel free to email for detailed inquiries or collaboration proposals.</p>
                </div>
              </div>


            {/* Feedback Form */}
            <div className="mt-16 mx-auto max-w-xl bg-[#ede8f5] text-[#3d52a0] p-8 rounded-lg shadow-xl">
              <h2 className="text-3xl font-bold mb-6">Submit an Issue</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-lg font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-lg font-medium">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="issue" className="block text-lg font-medium">
                    Issue Details
                  </label>
                  <textarea
                    id="issue"
                    name="issue"
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none"
                    rows={4}
                    value={formData.issue}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-[#3d52a0] text-[#ede8f5] font-bold rounded-lg hover:bg-[#2b3a70] focus:outline-none focus:ring focus:ring-indigo-500"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
              {submissionStatus && (
                <p className="mt-4 text-lg font-semibold">
                  {submissionStatus}
                </p>
              )}
            </div>

            {/* Call to Action Buttons */}
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <a
                className="block w-full max-w-xs rounded-lg border border-transparent bg-[#ede8f5] px-8 py-4 text-lg font-medium text-[#3d52a0] hover:bg-transparent hover:text-[#ede8f5] hover:border-white focus:outline-none focus:ring sm:w-auto"
                href="/"
              >
                Back to Home
              </a>
              <a
                className="block w-full max-w-xs rounded-lg border border-[#ede8f5] px-8 py-4 text-lg font-medium text-[#ede8f5] hover:bg-[#ede8f5] hover:text-[#3d52a0] focus:outline-none focus:ring sm:w-auto"
                href="/About"
              >
                About Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroContact;
