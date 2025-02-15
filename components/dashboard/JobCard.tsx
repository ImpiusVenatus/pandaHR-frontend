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
  onStatusChange: (
    jobId: string,
    newStatus: "Active" | "Inactive" | "Completed"
  ) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onStatusChange }) => {
  // Handle status changes (like Mark as Active, Inactive, or Completed)
  const handleStatusChange = (
    newStatus: "Inactive" | "Completed" | "Active"
  ) => {
    onStatusChange(job._id, newStatus);
  };

  return (
    <div className="border border-[#A2A1A816] rounded-md p-4 bg-[#A2A1A808] shadow-sm mb-4 font-dmSans">
      {/* Job Title & Category */}
      <div className="flex items-center gap-3 mb-2">
        <FiBriefcase className="dark:text-white" size={20} />
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <div className="flex items-center">
            {job.status && (
              <span
                className={`text-sm font-medium px-2 py-1 rounded-md ${
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
            <span className="mx-2 py-1 px-3 text-sm rounded-md bg-[#7152F3] text-white">
              {job.type}
            </span>
          </div>
        </div>
      </div>

      {/* Location & Salary */}
      <div className="text-sm dark:text-white flex justify-between">
        <p className="flex items-center gap-1">
          <FiMapPin />
          {job.location === "Remote" ? "Remote" : job.place}
        </p>
        <p>${job.salary.toLocaleString()}</p>
      </div>

      {/* Action Buttons */}
      {job.status === "Active" && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => handleStatusChange("Inactive")}
            className="text-sm py-1 px-3 py-2 px-4 text-white bg-gray-400 rounded-md hover:bg-gray-500"
          >
            Mark as Inactive
          </button>
          <button
            onClick={() => handleStatusChange("Completed")}
            className="text-sm py-1 px-3 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Mark as Completed
          </button>
        </div>
      )}
      {job.status === "Inactive" && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => handleStatusChange("Active")}
            className="text-sm py-1 px-3 text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Mark as Active
          </button>
          <button
            onClick={() => handleStatusChange("Completed")}
            className="text-sm py-1 px-3 text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            Mark as Completed
          </button>
        </div>
      )}
      {job.status === "Completed" && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => handleStatusChange("Inactive")}
            className="text-sm py-1 px-3 text-white bg-gray-400 rounded-md hover:bg-gray-500"
          >
            Mark as Inactive
          </button>
        </div>
      )}
    </div>
  );
};

export default JobCard;
