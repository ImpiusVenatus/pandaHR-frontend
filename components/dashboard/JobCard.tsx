import React from "react";
import { FiBriefcase, FiMapPin } from "react-icons/fi";

interface JobCardProps {
  title: string;
  category: string;
  types: string[];
  location: string;
  salary: string;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  category,
  types,
  location,
  salary,
}) => (
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
      <p className="flex items-center">
        <FiMapPin />
        {location}
      </p>
      <p>{salary}</p>
    </div>
  </div>
);

export default JobCard;
