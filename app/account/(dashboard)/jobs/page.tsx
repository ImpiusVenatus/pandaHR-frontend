"use client";
import React from "react";
import { FiBriefcase, FiMapPin, FiPlusCircle } from "react-icons/fi";
import { Button } from "@/components/ui/button";

const JobCard = ({ title, category, types, location, salary }: JobCardProps) => (
  <div className="border border-[#A2A1A816] rounded-md p-4 bg-[#A2A1A808] shadow-sm mb-4 font-dmSans">
    <div className="flex items-center gap-3 mb-2">
      <FiBriefcase className="dark:text-white" size={20} />
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-[#A2A1A8]">{category}</p>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 mb-3">
      {types.map((type, index) => (
        <span
          key={index}
          className="py-1 px-3 text-sm cursor-pointer rounded-md bg-[#7152F3] text-white"
        >
          {type}
        </span>
      ))}
    </div>
    <div className="text-sm dark:text-white flex justify-between">
      <p className="flex items-center"><FiMapPin />{location}</p>
      <p>{salary}</p>
    </div>
  </div>
);

interface JobCardProps {
  title: string;
  category: string;
  types: string[];
  location: string;
  salary: string;
}

const Jobs = () => {
  const activeJobs = [
    {
      title: "UI/UX Designer",
      category: "Design",
      types: ["Design", "Full Time", "Remote"],
      location: "California, USA",
      salary: "3600$/Month",
    },
    {
      title: "Frontend Developer",
      category: "Engineering",
      types: ["Engineering", "Part Time", "Remote"],
      location: "New York, USA",
      salary: "4000$/Month",
    },
  ];

  const inactiveJobs = [
    {
      title: "Content Writer",
      category: "Writing",
      types: ["Writing", "Contract", "On-site"],
      location: "Chicago, USA",
      salary: "2500$/Month",
    },
  ];

  const completedJobs = [
    {
      title: "Backend Developer",
      category: "Engineering",
      types: ["Engineering", "Full Time", "Remote"],
      location: "Los Angeles, USA",
      salary: "5000$/Month",
    },
  ];

  return (
    <div className="container mx-auto p-4 border border-[#A2A1A816] rounded-md font-dmSans">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Jobs</h1>
        <Button variant="outline" className="bg-[#7152F3] text-white">
          <FiPlusCircle />
          Add New Job
        </Button>
      </div>

      {/* Board Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Active Jobs */}
        <div className="border border-[#A2A1A816] rounded-md p-4 bg-[#F9FAFB] dark:bg-transparent">
          <div className="flex items-center mb-3">
            <span className="w-2 h-2 rounded-full bg-[#EFBE12] mr-2"></span>
            <h2 className="text-lg font-semibold">Active Jobs</h2>
          </div>
          {activeJobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>

        {/* Inactive Jobs */}
        <div className="border border-[#A2A1A816] rounded-md p-4 bg-[#F9FAFB] dark:bg-transparent">
          <div className="flex items-center mb-3">
            <span className="w-2 h-2 rounded-full bg-[#F45B69] mr-2"></span>
            <h2 className="text-lg font-semibold">Inactive Jobs</h2>
          </div>
          {inactiveJobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
        {/* Completed Jobs */}
        <div className="border border-[#A2A1A816] rounded-md p-4 bg-[#F9FAFB] dark:bg-transparent">
          <div className="flex items-center mb-3">
            <span className="w-2 h-2 rounded-full bg-[#3FC28A] mr-2"></span>
            <h2 className="text-lg font-semibold">Completed Jobs</h2>
          </div>
          {completedJobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
