import React from 'react';
import { FaReact, FaNodeJs, FaPython, FaDatabase } from 'react-icons/fa';
import { RiNextjsLine } from 'react-icons/ri';
import { SiFirebase } from 'react-icons/si';
import { DiCss3, DiHtml5, DiJavascript } from 'react-icons/di'; // HTML, CSS, JS icons
import { FaFigma } from 'react-icons/fa'; // Figma ico

const About: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-[#3d52a0] via-[#243c5a] to-[#3d52a0] text-[#f8fafc] min-h-screen overflow-hidden">
      {/* Background Graphics */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 80%)",
        }}
      />

      <div className="absolute inset-0 flex justify-center items-center">
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-[#64748b] to-[#334155] opacity-40 blur-[200px] rounded-full"></div>
      </div>

      <div className="relative z-10 mt-10 max-w-screen-xl mx-auto px-6 lg:px-20 py-20 space-y-16">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center leading-tight animate-fadeInUp">
          About Us
        </h1>

        {/* Scrolling Description */}
        <div className="relative overflow-hidden max-w-3xl mx-auto">
          <div className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed space-y-8">
            <p className="animate-slideUp">We are a team of passionate developers, designers, and dreamers dedicated to creating modern, intuitive, and powerful applications.</p>
            <p className="animate-slideUp">Our mission is to deliver solutions that empower individuals and teams to work smarter, collaborate better, and achieve their goals efficiently.</p>
            <p className="animate-slideUp">With years of experience in software development, we thrive on innovation, constantly pushing the boundaries of technology and design.</p>
          </div>
        </div>

        {/* Contributors Section */}
        <div className="py-16">
          <div className="flex py-9 justify-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              CONTRIBUTORS
            </h2>
          </div>

          <div className="flex justify-center">
            {/* Developer Card */}
            <div className="p-8 bg-[#1e293b] rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8 animate-slideUp">
              <div className="w-36 h-36 rounded-full overflow-hidden shadow-md">
                <img
                  src="/harsha.png" // Replace with actual profile picture URL
                  alt="Profile"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="text-center sm:text-left">
                <h3 className="text-3xl font-semibold">Kvj Harsha</h3>
                <p className="mt-2 text-gray-200 text-lg">Full Stack Developer</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mt-4 gap-3 justify-center sm:justify-start">
                  {/* Skill Tags with Icons */}
                  <span className="bg-[#2563eb] text-white py-1 px-4 rounded-full text-sm flex items-center gap-2">
                    <FaReact className="text-white" /> React
                  </span>
                  <span className="bg-[#2563eb] text-white py-1 px-4 rounded-full text-sm flex items-center gap-2">
                    <RiNextjsLine className="text-white" /> Next.js
                  </span>
                  <span className="bg-[#2563eb] text-white py-1 px-4 rounded-full text-sm flex items-center gap-2">
                    <DiHtml5 className="text-white" /> HTML
                  </span>
                  <span className="bg-[#2563eb] text-white py-1 px-4 rounded-full text-sm flex items-center gap-2">
                    <DiCss3 className="text-white" /> CSS
                  </span>
                  <span className="bg-[#2563eb] text-white py-1 px-4 rounded-full text-sm flex items-center gap-2">
                    <DiJavascript className="text-white" /> JavaScript
                  </span>
                  <span className="bg-[#2563eb] text-white py-1 px-4 rounded-full text-sm flex items-center gap-2">
                    <FaNodeJs className="text-white" /> Node.js
                  </span>
                  <span className="bg-[#2563eb] text-white py-1 px-4 rounded-full text-sm flex items-center gap-2">
                    <FaPython className="text-white" /> Python
                  </span>
                  <span className="bg-[#2563eb] text-white py-1 px-4 rounded-full text-sm flex items-center gap-2">
                    <FaFigma className="text-white" /> Figma
                  </span>
                  <span className="bg-[#2563eb] text-white py-1 px-4 rounded-full text-sm flex items-center gap-2">
                    <FaReact className="text-white" /> React Native
                  </span>
                  <span className="bg-[#2563eb] text-white py-1 px-4 rounded-full text-sm flex items-center gap-2">
                    <FaDatabase className="text-white" /> MongoDB
                  </span>
                  <span className="bg-[#2563eb] text-white py-1 px-4 rounded-full text-sm flex items-center gap-2">
                    <SiFirebase className="text-white" /> Firebase
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Section */}
        <div className="space-y-8 ">
          <div className="p-8 bg-[#1e293b] rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 animate-slideUp">
            <h2 className="text-3xl sm:text-4xl font-bold">Our Vision</h2>
            <p className="mt-4 text-gray-400 text-lg">
              We envision a world where technology seamlessly integrates with your
              workflow, enhancing productivity and creativity.
            </p>
          </div>

          <div className="p-8 bg-[#1e293b] rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 animate-slideUp">
            <h2 className="text-3xl sm:text-4xl font-bold">Our Values</h2>
            <p className="mt-4 text-gray-400 text-lg">
              Innovation, collaboration, and excellence drive us to deliver the best
              for our users.
            </p>
          </div>
        </div>

        {/* Revealing Texts */}
        <div className="text-center mt-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold animate-bounce">Join Our Journey</h2>
          <p className="mt-4 text-gray-300 text-lg lg:text-xl animate-fadeInUp">
            Together, let’s create something extraordinary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
