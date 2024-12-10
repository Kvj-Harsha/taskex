import React from 'react';

const Hero: React.FC = () => {
  return (
    <div>
  <section className="bg-[#3d52a0] text-[#ede8f5]">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-3xl text-center">
      <h1
        className="text-[#ede8f5] text-3xl font-extrabold sm:text-5xl"
      >
        Taskex

        <span className="sm:block"> Increase Conversion. </span>
      </h1>

      <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
        numquam ea!
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">

        <a
          className="block w-full rounded border border-white-600 px-12 py-3 text-sm font-medium text-[#ede8f5] hover:bg-[#ede8f5]  hover:text-[#3d52a0] focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default Hero;
