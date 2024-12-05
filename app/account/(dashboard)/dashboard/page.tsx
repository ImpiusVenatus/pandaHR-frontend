"use client";
import { AttendanceTable } from "@/components/dashboard/AttendanceTable";
import { AttendanceChart } from "@/components/dashboard/BarChart";
import React from "react";
import { FiCalendar, FiChevronDown, FiChevronUp, FiUser } from "react-icons/fi";

const Dashboard = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
<div>
<div className="grid grid-cols-[1fr,auto] gap-4 font-dmSans">
      {/* First Column */}
      <div className="col-span-1 grid grid-rows-2 gap-4">
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          {/* Total Employees Card */}
          <div className="bg-transparent border border-[#A2A1A832] rounded-lg">
            <div className="flex items-center gap-2 mb-4 px-4 py-2">
              <div className="bg-[#7152F308] p-2 rounded-md">
                <FiUser className="text-[#7152F3]" /> 
              </div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                Total Employee
              </h2>
            </div>
            <div className="flex justify-between items-center mb-2 py-2 px-4">
              <p className="text-3xl font-bold text-black dark:text-white">150</p>
              <span className="flex items-center text-[11px] gap-2 py-1 px-2 rounded-md bg-[#30BE8216] text-[#30BE82]">
                <FiChevronUp /> 12%
              </span>
            </div>
            {/* Horizontal Line */}
            <hr className="my-2 border-gray-300 dark:border-gray-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400 px-4 py-2">Update: July 16, 2024</p>
          </div>

          {/* Total Applicant Card */}
          <div className="bg-transparent border border-[#A2A1A832] rounded-lg">
            <div className="flex items-center gap-2 mb-4 px-4 py-2">
              <div className="bg-[#7152F308] p-2 rounded-md">
                <FiUser className="text-[#7152F3]" /> 
              </div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                Total Applicant
              </h2>
            </div>
            <div className="flex justify-between items-center mb-2 px-4 py-2">
              <p className="text-3xl font-bold text-black dark:text-white">1050</p>
              <span className="flex items-center text-[11px] gap-2 py-1 px-2 rounded-md bg-[#30BE8216] text-[#30BE82]">
                <FiChevronUp /> 5%
              </span>
            </div>
            {/* Horizontal Line */}
            <hr className="my-2 border-gray-300 dark:border-gray-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400 px-4 py-2">Update: July 14, 2024</p>
          </div>
        </div>
        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-4">
          {/* Attendance Card */}
          <div className="bg-transparent border border-[#A2A1A832] rounded-lg">
            <div className="flex items-center gap-2 mb-4 px-4 py-2">
              <div className="bg-[#7152F308] p-2 rounded-md">
                <FiUser className="text-[#7152F3]" /> 
              </div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                Total Attendance
              </h2>
            </div>
            <div className="flex justify-between items-center mb-2 px-4 py-2">
              <p className="text-3xl font-bold text-black dark:text-white">470</p>
              <span className="flex items-center text-[11px] gap-2 py-1 px-2 rounded-md bg-[#F45B6916] text-[#F45B69]">
                <FiChevronDown /> 8%
              </span>
            </div>
            {/* Horizontal Line */}
            <hr className="my-2 border-gray-300 dark:border-gray-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400 px-4 py-2">Update: July 14, 2024</p>
          </div>
          {/* Projects Card */}
          <div className="bg-transparent border border-[#A2A1A832] rounded-lg">
            <div className="flex items-center gap-2 mb-4 px-4 py-2">
              <div className="bg-[#7152F308] p-2 rounded-md">
                <FiUser className="text-[#7152F3]" /> 
              </div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                Total Projects
              </h2>
            </div>
            <div className="flex justify-between items-center mb-2 px-4 py-2">
              <p className="text-3xl font-bold text-black dark:text-white">250</p>
              <span className="flex items-center text-[11px] gap-2 py-1 px-2 rounded-md bg-[#30BE8216] text-[#30BE82]">
                <FiChevronUp /> 12%
              </span>
            </div>
            {/* Horizontal Line */}
            <hr className="my-2 border-gray-300 dark:border-gray-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400 px-4 py-2">Update: July 10, 2024</p>
          </div>
        </div>

         {/* Row 3 - Graph Section */}
         <div className="grid grid-cols-1 bg-transparent">
          <AttendanceChart />
        </div>
      </div>

      {/* Second Column */}
      <div className="bg-transparent p-4 rounded-lg border border-[#A2A1A832]">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold">My Schedule</h4>
          <FiCalendar />
        </div>
        <div className="w-full">
          Calendar Placeholder
        </div>
      </div>
    </div>
    <div className="bg-transparent p-4 mt-4 rounded-lg border border-[#A2A1A832]">
      
      <AttendanceTable />
    </div>
</div>
  );
};

export default Dashboard;
