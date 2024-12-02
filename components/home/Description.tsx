"use client";

import React from "react";

const PandaHRAbout = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-16 max-w-[1400px] m-auto">
      {/* Title */}
      <h2 className="text-5xl font-bold font-zrnic text-[#0B0B0B] mb-6">
        What is PandaHR?
      </h2>

      {/* Description */}
      <p className="text-lg text-gray-700 max-w-6xl leading-relaxed font-dmSans">
        PandaHR is a modern HR management solution designed to streamline and
        optimize your HR processes. From hiring to employee management and team
        development, PandaHR equips your organization with powerful tools to
        foster collaboration, enhance productivity, and support growth. Whether
        you're a startup or an established enterprise, PandaHR ensures your
        team has the resources and guidance to succeed in today&apos;s dynamic work
        environment.
      </p>
    </div>
  );
};

export default PandaHRAbout;
