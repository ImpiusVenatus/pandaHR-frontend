"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FiPlusCircle, FiSearch } from "react-icons/fi";
import React, { useState } from "react";
import { MdTune } from "react-icons/md";

const generateCandidates = () => {
  return [
    {
      id: "C001",
      name: "John Doe",
      appliedFor: "UI/UX Designer",
      appliedDate: "2024-12-01",
      email: "john.doe@example.com",
      mobile: "+1 123-456-7890",
      status: "Pending",
    },
    {
      id: "C002",
      name: "Jane Smith",
      appliedFor: "Frontend Developer",
      appliedDate: "2024-12-03",
      email: "jane.smith@example.com",
      mobile: "+1 234-567-8901",
      status: "Shortlisted",
    },
    {
      id: "C003",
      name: "Samuel Green",
      appliedFor: "Backend Developer",
      appliedDate: "2024-11-28",
      email: "samuel.green@example.com",
      mobile: "+1 345-678-9012",
      status: "Rejected",
    },
    {
      id: "C004",
      name: "Anna White",
      appliedFor: "Marketing Manager",
      appliedDate: "2024-12-04",
      email: "anna.white@example.com",
      mobile: "+1 456-789-0123",
      status: "Pending",
    },
    {
      id: "C005",
      name: "Michael Brown",
      appliedFor: "Data Scientist",
      appliedDate: "2024-11-30",
      email: "michael.brown@example.com",
      mobile: "+1 567-890-1234",
      status: "Shortlisted",
    },
  ];
};

const Candidates = () => {
  const allEmployees = generateCandidates();
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
      allEmployees.filter((employee) =>
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
      </div>

      {/* Table Section */}
      <div className="rounded-lg shadow-md overflow-hidden mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-left">Candidate Name</TableHead>
              <TableHead className="font-semibold text-left">Applied For</TableHead>
              <TableHead className="font-semibold text-left">Applied Date</TableHead>
              <TableHead className="font-semibold text-left">Email Address</TableHead>
              <TableHead className="font-semibold text-left">Mobile Number</TableHead>
              <TableHead className="font-semibold text-left">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.appliedFor}</TableCell>
                  <TableCell>{employee.appliedDate}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.mobile}</TableCell>
                  <TableCell>
                    <span
                      className={`py-1 px-2 rounded-full text-xs ${
                        employee.status === "Shortlisted"
                          ? "bg-[#3FC28A16] text-[#3FC28A]"
                          : employee.status === "Rejected"
                          ? "bg-[#F45B6916] text-[#F45B69]"
                          : "bg-[#F59E0B16] text-[#F59E0B]"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No candidates found.
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

export default Candidates;
