"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FiPlusCircle, FiSearch } from "react-icons/fi";
import React, { useState } from "react";



const generatePayrolls = () => [
  { id: "E001", name: "John Doe", ctc: "$12,00,000", salaryPerMonth: "$1,00,000", deduction: "$5,000", status: "Completed" },
  { id: "E002", name: "Jane Smith", ctc: "$8,40,000", salaryPerMonth: "$70,000", deduction: "$3,500", status: "Pending" },
  { id: "E003", name: "Samuel Green", ctc: "$6,00,000", salaryPerMonth: "$50,000", deduction: "$2,000", status: "Completed" },
  { id: "E004", name: "Anna White", ctc: "$15,00,000", salaryPerMonth: "$1,25,000", deduction: "$6,000", status: "Completed" },
  { id: "E005", name: "Michael Brown", ctc: "$7,20,000", salaryPerMonth: "$60,000", deduction: "$2,500", status: "Pending" },
  { id: "E006", name: "Sara Lee", ctc: "$9,00,000", salaryPerMonth: "$75,000", deduction: "$3,000", status: "Completed" },
  { id: "E007", name: "David Wilson", ctc: "$4,80,000", salaryPerMonth: "$40,000", deduction: "$1,500", status: "Completed" },
  { id: "E008", name: "Sophia Davis", ctc: "$18,00,000", salaryPerMonth: "$1,50,000", deduction: "$7,000", status: "Completed" },
  { id: "E009", name: "James Anderson", ctc: "$5,40,000", salaryPerMonth: "$45,000", deduction: "$2,000", status: "Completed" },
  { id: "E010", name: "Emily Brown", ctc: "$10,80,000", salaryPerMonth: "$90,000", deduction: "$4,500", status: "Completed" },
  { id: "E011", name: "Robert Martinez", ctc: "$7,20,000", salaryPerMonth: "$60,000", deduction: "$2,500", status: "Pending" },
  { id: "E012", name: "Jessica Taylor", ctc: "$14,40,000", salaryPerMonth: "$1,20,000", deduction: "$6,000", status: "Completed" },
  { id: "E013", name: "William Moore", ctc: "$5,00,000", salaryPerMonth: "$41,667", deduction: "$1,750", status: "Completed" },
  { id: "E014", name: "Olivia Johnson", ctc: "$8,40,000", salaryPerMonth: "$70,000", deduction: "$3,500", status: "Completed" },
  { id: "E015", name: "Thomas Garcia", ctc: "$11,00,000", salaryPerMonth: "$91,667", deduction: "$4,000", status: "Completed" },
  { id: "E016", name: "Sophia Miller", ctc: "$6,60,000", salaryPerMonth: "$55,000", deduction: "$2,250", status: "Pending" },
];

const Payroll = () => {
  const allPayrolls = generatePayrolls();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPayrolls, setFilteredPayrolls] = useState(allPayrolls);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredPayrolls.length / itemsPerPage);
  const paginatedPayrolls = filteredPayrolls.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredPayrolls(
      allPayrolls.filter((payroll) =>
        payroll.name.toLowerCase().includes(query)
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
            placeholder="Search Employee..."
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#16151C] dark:text-white" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 bg-[#7152F3] text-white">
            <FiPlusCircle />
            Add Payroll
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-lg shadow-md overflow-hidden mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-left">Employee Name</TableHead>
              <TableHead className="font-semibold text-left">CTC</TableHead>
              <TableHead className="font-semibold text-left">Salary Per Month</TableHead>
              <TableHead className="font-semibold text-left">Deduction</TableHead>
              <TableHead className="font-semibold text-left">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPayrolls.length > 0 ? (
              paginatedPayrolls.map((payroll) => (
                <TableRow key={payroll.id}>
                  <TableCell>{payroll.name}</TableCell>
                  <TableCell>{payroll.ctc}</TableCell>
                  <TableCell>{payroll.salaryPerMonth}</TableCell>
                  <TableCell>{payroll.deduction}</TableCell>
                  <TableCell>
                    <span
                      className={`py-1 px-2 rounded-full text-xs ${
                        payroll.status === "Completed"
                          ? "bg-[#3FC28A16] text-[#3FC28A]"
                          : "bg-[#EFBE1216] text-[#EFBE12]"
                      }`}
                    >
                      {payroll.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No payroll records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {paginatedPayrolls.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
          {currentPage * itemsPerPage > filteredPayrolls.length
            ? filteredPayrolls.length
            : currentPage * itemsPerPage}{" "}
          of {filteredPayrolls.length} entries
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

export default Payroll;