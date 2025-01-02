import React from 'react';
import { AiFillLinkedin, AiFillGithub, AiOutlineMail } from 'react-icons/ai';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-4 text-sm">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Left-aligned copyright */}
        <p className="mb-2 md:mb-0 text-left w-full md:w-auto">
          &copy; {currentYear} Taskex
        </p>

        {/* Centered love message */}
        <p className="mb-2 md:mb-0 text-center w-full md:w-auto">
          Made with ❤️ by <span className="text-white"><a target="_blank"
            rel="noopener noreferrer" href="https://github.com/kvj-harsha">callmekvj</a></span>
        </p>

        {/* Right-aligned social links */}
        <div className="flex justify-center md:justify-end w-full md:w-auto space-x-3">
          <a
            href="https://www.linkedin.com/in/kvjharsha/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-xl"
          >
            <AiFillLinkedin />
          </a>
          <a
            href="https://github.com/Kvj-Harsha/taskex"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-xl"
          >
            <AiFillGithub />
          </a>
          <a
            href="mailto:cs23b1034@iiitr.ac.in"
            className="text-gray-400 hover:text-white text-xl"
          >
            <AiOutlineMail />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
