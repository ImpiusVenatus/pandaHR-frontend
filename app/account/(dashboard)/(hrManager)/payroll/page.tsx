"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FiPlusCircle, FiSearch } from "react-icons/fi";
import AddPayrollModal from "@/components/dashboard/payroll/AddPayrollModal";

const generatePayrolls = () => [
  {
    id: "E001",
    name: "John Doe",
    ctc: "$12,00,000",
    salaryPerMonth: "$1,00,000",
    status: "Completed",
  },
  {
    id: "E002",
    name: "Jane Smith",
    ctc: "$8,40,000",
    salaryPerMonth: "$70,000",
    status: "Pending",
  },
  {
    id: "E003",
    name: "Samuel Green",
    ctc: "$6,00,000",
    salaryPerMonth: "$50,000",
    status: "Completed",
  },
];

const Payroll = () => {
  const allPayrolls = generatePayrolls();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPayrolls, setFilteredPayrolls] = useState(allPayrolls);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          <Button
            variant="outline"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#7152F3] text-white hover:bg-transparent border border-[#7152F3] hover:text-[#7152F3]"
          >
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
              <TableHead className="font-semibold text-left">
                Employee Name
              </TableHead>
              <TableHead className="font-semibold text-left">CTC</TableHead>
              <TableHead className="font-semibold text-left">
                Salary Per Month
              </TableHead>
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
                <TableCell colSpan={4} className="text-center">
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
          Showing{" "}
          {paginatedPayrolls.length > 0
            ? (currentPage - 1) * itemsPerPage + 1
            : 0}{" "}
          to{" "}
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

      {/* Add Payroll Modal */}
      <AddPayrollModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Payroll;
