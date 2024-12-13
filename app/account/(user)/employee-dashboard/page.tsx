"use client";
import React from "react";
import Image from "next/image";
import { FaUserTie, FaEnvelope, FaLevelUpAlt, FaPhone } from "react-icons/fa";
import CircularProgressBar from "@/components/employee-dashboard/CircularProgressBar";

const EmployeeDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 font-dmSans">
      {/* Left Column: Profile Overview */}
      <div className="bg-transparent border border-[#A2A1A832] rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
          Profile Overview
        </h2>
        <div className="flex items-center mb-6 relative">
          {/* Badge and Profile Photo Container */}
          <div className="relative w-32 h-32 flex-shrink-0">
            {/* Profile Photo */}
            <div className="w-24 h-24 rounded-full overflow-hidden absolute top-4 left-4 z-10">
              <Image
                src="/dashboard/sadman.jpeg"
                alt="Profile Avatar"
                width={1000}
                height={1000}
                className="object-cover"
              />
            </div>
          </div>
          <div className="ml-6 w-full">
            {/* Name and Edit Button */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Sadman Hossain
              </h3>
              <button className="ml-4 px-4 py-2 text-sm font-medium text-[#7152F3] border border-[#7152F3] rounded-lg hover:bg-[#7152F3] hover:text-white transition">
                Edit Profile
              </button>
            </div>
            {/* Job Title and Contact */}
            <div className="mt-4 grid grid-cols-[2fr_3fr] gap-4">
              <div className="flex items-center">
                <FaUserTie className="text-gray-600 dark:text-gray-400 mr-2" />
                <p className="text-gray-800 dark:text-white font-medium">
                  Sr. Web Developer
                </p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-gray-600 dark:text-gray-400 mr-2" />
                <p className="text-gray-800 dark:text-white font-medium">
                  josephitesadman56@gmail.com
                </p>
              </div>
              <div className="flex items-center">
                <FaLevelUpAlt className="text-gray-600 dark:text-gray-400 mr-2" />
                <p className="text-gray-800 dark:text-white font-medium">Level 12</p>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-gray-600 dark:text-gray-400 mr-2" />
                <p className="text-gray-800 dark:text-white font-medium">
                  +8801717158743
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Level, Tier, Progress */}
      <div className="bg-transparent border border-[#A2A1A832] rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Tier Badge and Level */}
        <div className="flex items-center mb-6">
          <div className="bg-[#FFD700] text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-semibold mr-4">
            Gold
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Level:</p>
            <span className="text-lg font-bold text-gray-800 dark:text-white">
              12
            </span>
          </div>
        </div>

        {/* Middle Column: Stats */}
        <div className="flex flex-col mb-6">
          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-400">Projects Completed:</p>
            <span className="text-lg font-bold text-gray-800 dark:text-white">32</span>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Hours Worked:</p>
            <span className="text-lg font-bold text-gray-800 dark:text-white">1200</span>
          </div>
        </div>

        {/* Right Column: Circular Progress and Review Rating */}
        <div className="flex flex-col items-center">
          {/* Circular Progress Bar */}
          <CircularProgressBar progress={75} />

          {/* Next Tier */}
          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-400">Next Tier:</p>
            <span className="text-lg font-bold text-gray-800 dark:text-white">
              Platinum
            </span>
          </div>

          {/* Review Rating (Stars) */}
          <p className="text-gray-600 dark:text-gray-400 mb-2">Review Rating:</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                fill={index < 4 ? "#FFD700" : "#D1D5DB"}
                viewBox="0 0 20 20"
                className="w-5 h-5 mr-1"
                stroke="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 15l-5.47 2.873L6.68 12.24 1.32 7.882 7.88 7.056 10 2l2.12 5.056 6.56.826-5.36 4.358 1.56 6.633L10 15z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
