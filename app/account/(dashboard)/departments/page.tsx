"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSearch } from "react-icons/fi";
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const generateDepartments = () => {
  return [
    {
      name: "Design Department",
      people: ["Alice", "Bob", "Charlie", "Diana", "Eve"],
    },
    {
      name: "Sales",
      people: ["Frank", "Grace", "Heidi", "Ivan", "Judy"],
    },
    {
      name: "Project Manager",
      people: ["Karen", "Leo", "Mike", "Nancy", "Oscar"],
    },
    {
      name: "Marketing",
      people: ["Paul", "Quinn", "Rachel", "Steve", "Tina"],
    },
  ];
};

const Departments = () => {
  const allDepartments = generateDepartments();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDepartments = allDepartments.filter((department) =>
    department.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto p-4 border border-[#A2A1A816] rounded-md font-dmSans">
      {/* Search Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Input
            value={searchQuery}
            onChange={handleSearch}
            className="w-32 lg:w-64 border border-[#A2A1A816] rounded-md pl-10 pr-4 py-2"
            placeholder="Search..."
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#16151C] dark:text-white" />
        </div>
      </div>

      {/* Departments Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDepartments.length > 0 ? (
          filteredDepartments.map((department, index) => (
            <div
              key={index}
              className="p-4 border border-[#A2A1A816] rounded-md shadow-sm"
            >
              {/* Header Section */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-semibold text-lg">{department.name}</h2>
                  <p className="text-sm text-gray-500">
                    {department.people.length} People
                  </p>
                </div>
                <Button variant="outline" className="bg-transparent text-[#7152F3] border-[#7152F3]">
                  View All
                </Button>
              </div>
              <hr/>

              {/* People List */}
            <ul className="space-y-2 cursor-pointer">
              {department.people.map((person, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between py-2 px-3 border rounded-md hover:bg-[#7152F316]"
                >
                  {/* Left Section: Avatar and Details */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
                      {/* Placeholder for Avatar */}
                      <Avatar>
                        <AvatarImage />
                      </Avatar>
                    </div>
                    <div>
                      <p className="font-medium">{person}</p>
                      <p className="text-sm text-gray-500">Job Designation</p>
                    </div>
                  </div>
                  {/* Right Section: Chevron Icon */}
                  <span className="text-[#7152F3]">
                    <ChevronRight />
                  </span>
                </li>
              ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No departments found.</p>
        )}
      </div>
    </div>
  );
};

export default Departments;
