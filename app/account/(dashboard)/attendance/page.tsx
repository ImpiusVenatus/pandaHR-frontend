"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FiPlusCircle, FiSearch } from "react-icons/fi";
import React, { useState } from "react";
import { MdTune } from "react-icons/md";
import { Avatar } from "@/components/ui/avatar";

const generateEmployees = () => {
  return [
    { 
      id: "E001", 
      name: "John Doe", 
      designation: "Manager", 
      type: "Full-Time", 
      checkInTime: "9:00 AM", 
      status: "On Time" 
    },
    { 
      id: "E002", 
      name: "Jane Smith", 
      designation: "Analyst", 
      type: "Part-Time", 
      checkInTime: "1:00 PM", 
      status: "Late" 
    },
    { 
      id: "E003", 
      name: "Samuel Green", 
      designation: "Developer", 
      type: "Contract", 
      checkInTime: "10:00 AM", 
      status: "On Time" 
    },
    { 
      id: "E004", 
      name: "Anna White", 
      designation: "Executive", 
      type: "Full-Time", 
      checkInTime: "8:45 AM", 
      status: "On Time" 
    },
    { 
      id: "E005", 
      name: "Michael Brown", 
      designation: "Accountant", 
      type: "Part-Time", 
      checkInTime: "11:30 AM", 
      status: "Late" 
    },
    { 
      id: "E006", 
      name: "Sara Lee", 
      designation: "Coordinator", 
      type: "Full-Time", 
      checkInTime: "9:15 AM", 
      status: "On Time" 
    },
    { 
      id: "E007", 
      name: "David Wilson", 
      designation: "Admin", 
      type: "Contract", 
      checkInTime: "9:05 AM", 
      status: "On Time" 
    },
    { 
      id: "E008", 
      name: "Sophia Davis", 
      designation: "Sales Manager", 
      type: "Full-Time", 
      checkInTime: "8:30 AM", 
      status: "On Time" 
    },
    { 
      id: "E009", 
      name: "James Anderson", 
      designation: "Consultant", 
      type: "Contract", 
      checkInTime: "9:45 AM", 
      status: "Late" 
    },
    { 
      id: "E010", 
      name: "Emily Brown", 
      designation: "Marketing Specialist", 
      type: "Full-Time", 
      checkInTime: "8:55 AM", 
      status: "On Time" 
    },
    { 
      id: "E011", 
      name: "Robert Martinez", 
      designation: "Data Analyst", 
      type: "Part-Time", 
      checkInTime: "12:45 PM", 
      status: "Late" 
    },
    { 
      id: "E012", 
      name: "Jessica Taylor", 
      designation: "Product Manager", 
      type: "Full-Time", 
      checkInTime: "8:40 AM", 
      status: "On Time" 
    },
    { 
      id: "E013", 
      name: "William Moore", 
      designation: "HR Assistant", 
      type: "Full-Time", 
      checkInTime: "9:20 AM", 
      status: "Late" 
    },
    { 
      id: "E014", 
      name: "Olivia Johnson", 
      designation: "UX Designer", 
      type: "Full-Time", 
      checkInTime: "8:50 AM", 
      status: "On Time" 
    },
    { 
      id: "E015", 
      name: "Thomas Garcia", 
      designation: "System Administrator", 
      type: "Contract", 
      checkInTime: "9:10 AM", 
      status: "On Time" 
    },
    { 
      id: "E016", 
      name: "Sophia Miller", 
      designation: "Sales Associate", 
      type: "Part-Time", 
      checkInTime: "12:15 PM", 
      status: "Late" 
    },

  ];
};


const Attendance = () => {
  const allEmployees = generateEmployees();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(allEmployees);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredEmployees(
      allEmployees.filter(
        (employee) =>
          employee.name.toLowerCase().includes(query)
      )
    );
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-4 border border-[#A2A1A816] rounded-md font-dmSans">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
            <Input
              value={searchQuery}
              onChange={handleSearch}
              className="w-32 lg:w-64 border border-[#A2A1A816] rounded-md pl-10 pr-4 py-2"
              placeholder="Search..."
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#16151C] dark:text-white" />
          </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 bg-[#7152F3] text-white">
            <FiPlusCircle />
            Add New Employee
          </Button>
          <Button variant="outline" className="bg-transparent">
            <MdTune />
            Filter
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-lg shadow-md overflow-hidden mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-left">Employee Name</TableHead>
              <TableHead className="font-semibold text-left">Designation</TableHead>
              <TableHead className="font-semibold text-left">Type</TableHead>
              <TableHead className="font-semibold text-left">Check In Time</TableHead>
              <TableHead className="font-semibold text-left">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.designation}</TableCell>
                  <TableCell>{employee.type}</TableCell>
                  <TableCell>{employee.checkInTime}</TableCell>
                  <TableCell>
                    <span
                      className={`py-1 px-2 rounded-full text-xs ${
                        employee.status === "On Time"
                          ? "bg-[#3FC28A16] text-[#3FC28A]"
                          : "bg-[#F45B6916] text-[#F45B69]"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No employees found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {paginatedEmployees.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
          {currentPage * itemsPerPage > filteredEmployees.length
            ? filteredEmployees.length
            : currentPage * itemsPerPage}{" "}
          of {filteredEmployees.length} entries
        </p>
        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index}
              variant={index + 1 === currentPage ? "default" : "outline"}
              onClick={() => setCurrentPage(index + 1)}
              className={`${
                index + 1 === currentPage
                  ? "bg-[#7152F3] text-white border-[#7152F3]"
                  : "bg-transparent text-[#7152F3] border-[#7152F3]"
              }`}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
