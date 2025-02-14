"use client";

import React from "react";
import JobCard from "@/components/dashboard/JobCard";
import JobDialog from "@/components/dashboard/JobDialog";
import { Button } from "@/components/ui/button";

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
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-[#7152F3] text-white hover:bg-transparent border border-[#7152F3] hover:text-[#7152F3]"
        >
          <JobDialog />
        </Button>
      </div>

      {/* Board Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Active Jobs */}
        <div className="border border-[#A2A1A816] rounded-md p-4 bg-[#F9FAFB] dark:bg-transparent">
          <h2 className="text-lg font-semibold mb-3">Active Jobs</h2>
          {activeJobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>

        {/* Inactive Jobs */}
        <div className="border border-[#A2A1A816] rounded-md p-4 bg-[#F9FAFB] dark:bg-transparent">
          <h2 className="text-lg font-semibold mb-3">Inactive Jobs</h2>
          {inactiveJobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>

        {/* Completed Jobs */}
        <div className="border border-[#A2A1A816] rounded-md p-4 bg-[#F9FAFB] dark:bg-transparent">
          <h2 className="text-lg font-semibold mb-3">Completed Jobs</h2>
          {completedJobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
