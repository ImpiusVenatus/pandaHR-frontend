"use client";

import { useState, useEffect } from "react";
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
import usePayroll from "@/lib/hooks/company/usePayroll";

// Assuming PayrollData is the correct type for payroll data
interface PayrollData {
  _id: string;
  employeeId: {
    _id: string;
    name: string;
  };
  CTC: number;
  monthlySalary: number;
  status: "Paid" | "Pending";
}

const Payroll = () => {
  const { payrolls, loading, error, getAllPayrolls, updatePayroll } =
    usePayroll();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPayrolls, setFilteredPayrolls] = useState<PayrollData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    getAllPayrolls();
  }, []);

  useEffect(() => {
    setFilteredPayrolls(
      payrolls.filter((payroll) =>
        payroll.employeeId.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  }, [payrolls, searchQuery]);

  const handleMarkAsPaid = (id: string) => {
    // Call your update function here to change the status
    updatePayroll(id, "Paid");
  };

  const totalPages = Math.ceil(filteredPayrolls.length / itemsPerPage);
  const paginatedPayrolls = filteredPayrolls.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4 border border-[#A2A1A816] rounded-md font-dmSans">
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-32 lg:w-64 border border-[#A2A1A816] rounded-md pl-10 pr-4 py-2"
            placeholder="Search Employee..."
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#16151C] dark:text-white" />
        </div>
        <Button
          variant="outline"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#7152F3] text-white hover:bg-transparent border border-[#7152F3] hover:text-[#7152F3]"
        >
          <FiPlusCircle />
          Add Payroll
        </Button>
      </div>

      <div className="rounded-lg shadow-md overflow-hidden mb-4">
        {loading ? (
          <p className="text-center">Loading payroll data...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-left">
                  Employee ID
                </TableHead>
                <TableHead className="font-semibold text-left">CTC</TableHead>
                <TableHead className="font-semibold text-left">
                  Salary Per Month
                </TableHead>
                <TableHead className="font-semibold text-left">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-left">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPayrolls.length > 0 ? (
                paginatedPayrolls.map((payroll) => (
                  <TableRow key={payroll._id}>
                    <TableCell>{payroll.employeeId.name}</TableCell>
                    <TableCell>${payroll.CTC.toLocaleString()}</TableCell>
                    <TableCell>
                      ${payroll.monthlySalary.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`py-1 px-2 rounded-full text-xs ${
                          payroll.status === "Paid"
                            ? "bg-[#3FC28A16] text-[#3FC28A]"
                            : "bg-[#EFBE1216] text-[#EFBE12]"
                        }`}
                      >
                        {payroll.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {payroll.status === "Pending" ? (
                        <>
                          <Button
                            variant="outline"
                            onClick={() => handleMarkAsPaid(payroll._id)}
                            className="bg-[#7152F3] text-white hover:bg-transparent border border-[#7152F3] hover:text-[#7152F3]"
                          >
                            Mark as Paid
                          </Button>
                        </>
                      ) : (
                        <span>Already Paid</span>
                      )}
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
        )}
      </div>

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

      <AddPayrollModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Payroll;
