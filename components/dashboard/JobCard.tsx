import React from "react";
import { FiBriefcase, FiMapPin } from "react-icons/fi";

interface JobCardProps {
  job: {
    _id: string;
    title: string;
    type: "Full-Time" | "Part-Time" | "Contract";
    salary: number;
    status?: "Active" | "Inactive" | "Completed";
    location: "Remote" | "On-site";
    place: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="border border-[#A2A1A816] rounded-md p-4 bg-[#A2A1A808] shadow-sm mb-4 font-dmSans">
      {/* Job Title & Category */}
      <div className="flex items-center gap-3 mb-2">
        <FiBriefcase className="dark:text-white" size={20} />
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          {job.status && (
            <span
              className={`text-xs font-medium px-2 py-1 rounded-md ${
                job.status === "Active"
                  ? "bg-green-500 text-white"
                  : job.status === "Inactive"
                  ? "bg-gray-400 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {job.status}
            </span>
          )}
        </div>
      </div>

      {/* Job Type */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="py-1 px-3 text-sm rounded-md bg-[#7152F3] text-white">
          {job.type}
        </span>
      </div>

      {/* Location & Salary */}
      <div className="text-sm dark:text-white flex justify-between">
        <p className="flex items-center gap-1">
          <FiMapPin />
          {job.location === "Remote" ? "Remote" : job.place}
        </p>
        <p>${job.salary.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default JobCard;
