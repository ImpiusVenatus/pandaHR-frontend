"use client";
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
import {
  FiEye,
  FiEdit,
  FiTrash2,
  FiPlusCircle,
  FiSearch,
} from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { MdTune } from "react-icons/md";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Assuming Dialog components are imported
import useEmployee from "@/lib/hooks/employee/useEmployee"; // Assuming useEmployee hook is imported

// const generateEmployees = () => {
//   return [
//     {
//       id: "E001",
//       name: "John Doe",
//       department: "HR",
//       designation: "Manager",
//       type: "Full-Time",
//       status: "Active",
//     },
//     {
//       id: "E002",
//       name: "Jane Smith",
//       department: "Finance",
//       designation: "Analyst",
//       type: "Part-Time",
//       status: "Inactive",
//     },
//     {
//       id: "E003",
//       name: "Samuel Green",
//       department: "IT",
//       designation: "Developer",
//       type: "Contract",
//       status: "Active",
//     },
//     {
//       id: "E004",
//       name: "Anna White",
//       department: "Marketing",
//       designation: "Executive",
//       type: "Full-Time",
//       status: "Active",
//     },
//     {
//       id: "E005",
//       name: "Michael Brown",
//       department: "Finance",
//       designation: "Accountant",
//       type: "Part-Time",
//       status: "Inactive",
//     },
//     {
//       id: "E006",
//       name: "Sara Lee",
//       department: "HR",
//       designation: "Coordinator",
//       type: "Full-Time",
//       status: "Active",
//     },
//     {
//       id: "E007",
//       name: "David Wilson",
//       department: "IT",
//       designation: "Admin",
//       type: "Contract",
//       status: "Active",
//     },
//     {
//       id: "E008",
//       name: "Sophia Davis",
//       department: "Sales",
//       designation: "Sales Manager",
//       type: "Full-Time",
//       status: "Active",
//     },
//   ];
// };

type Employee = {
  // id: number;
  name: string;
  department: string;
  designation: string;
  type: "Full-Time" | "Part-Time" | "Contract";
  status: "Active" | "Inactive";
};

const Employees = () => {
  const { addEmployee, getAllEmployees, employees, pagination, loading } =
    useEmployee();
  // const { addEmployee, getAllEmployees, employees } = useEmployee();
  // const allEmployees = generateEmployees();
  // const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // const [filteredEmployees, setFilteredEmployees] = useState(allEmployees);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility

  // Fetch employees when the page or currentPage changes
  useEffect(() => {
    getAllEmployees(currentPage, itemsPerPage);
  }, [currentPage]);

  const [newEmployee, setNewEmployee] = useState<Omit<Employee, "id">>({
    name: "",
    department: "",
    designation: "",
    type: "Full-Time", // Default value matching the union type
    status: "Active", // Default value matching the union type
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Validate fields with specific union types
    if (
      name === "type" &&
      !["Full-Time", "Part-Time", "Contract"].includes(value)
    ) {
      console.error(`Invalid type: ${value}`);
      return;
    }

    if (name === "status" && !["Active", "Inactive"].includes(value)) {
      console.error(`Invalid status: ${value}`);
      return;
    }

    // Use a type guard to ensure 'name' exists on newEmployee
    if (name in newEmployee) {
      setNewEmployee((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      console.error(`Unknown field: ${name}`);
    }
  };

  const handleAddEmployee = async () => {
    try {
      await addEmployee(newEmployee);
      console.log("Employee added successfully:", newEmployee);
      closeDialog(); // Close dialog on success
    } catch (error) {
      console.error("Failed to add employee:", error);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setNewEmployee({
      name: "",
      department: "",
      designation: "",
      type: "Full-Time",
      status: "Active",
    });
  };

  // const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  // const paginatedEmployees = filteredEmployees.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const query = e.target.value.toLowerCase();
  //   setSearchQuery(query);
  //   setFilteredEmployees(
  //     allEmployees.filter(
  //       (employee) =>
  //         employee.name.toLowerCase().includes(query) ||
  //         employee.id.toLowerCase().includes(query) ||
  //         employee.department.toLowerCase().includes(query)
  //     )
  //   );
  //   setCurrentPage(1);
  // };

  const openDialog = () => setIsDialogOpen(true);

  return (
    <div className="container mx-auto p-4 border border-[#A2A1A816] rounded-md font-dmSans">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Input
            // value={searchQuery}
            // onChange={handleSearch}
            className="w-32 lg:w-64 border border-[#A2A1A816] rounded-md pl-10 pr-4 py-2"
            placeholder="Search..."
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#16151C] dark:text-white" />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-[#7152F3] text-white hover:bg-transparent border border-[#7152F3] hover:text-[#7152F3]"
            onClick={openDialog}
          >
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
              <TableHead className="font-semibold text-left">
                Employee Name
              </TableHead>
              <TableHead className="font-semibold text-left">
                Employee ID
              </TableHead>
              <TableHead className="font-semibold text-left">
                Department
              </TableHead>
              <TableHead className="font-semibold text-left">
                Designation
              </TableHead>
              <TableHead className="font-semibold text-left">Type</TableHead>
              <TableHead className="font-semibold text-left">Status</TableHead>
              <TableHead className="font-semibold text-left">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Loading employees...
                </TableCell>
              </TableRow>
            ) : employees.length > 0 ? (
              employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.designation}</TableCell>
                  <TableCell>{employee.type}</TableCell>
                  <TableCell>
                    <span
                      className={`py-1 px-2 rounded-full text-xs ${
                        employee.status === "Active"
                          ? "bg-[#3FC28A16] text-[#3FC28A]"
                          : "bg-[#F45B6916] text-[#F45B69]"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <FiEye />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FiEdit />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FiTrash2 />
                    </Button>
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
          Showing{" "}
          {employees.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
          {currentPage * itemsPerPage > employees.length
            ? employees.length
            : currentPage * itemsPerPage}{" "}
          of {pagination.totalEmployees} entries
        </p>
        <div className="flex gap-2">
          {[...Array(pagination.totalPages)].map((_, index) => (
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

      {/* Dialog for Adding New Employee */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger className="hidden"></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              name="name"
              value={newEmployee.name}
              onChange={handleInputChange}
              placeholder="Employee Name"
            />
            <Input
              name="department"
              value={newEmployee.department}
              onChange={handleInputChange}
              placeholder="Department"
            />
            <Input
              name="designation"
              value={newEmployee.designation}
              onChange={handleInputChange}
              placeholder="Designation"
            />
            <div className="flex gap-4">
              <select
                name="type"
                value={newEmployee.type}
                onChange={handleInputChange}
                className="border border-neutral-500 rounded-md p-2 text-white bg-black"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
              </select>
              <select
                name="status"
                value={newEmployee.status}
                onChange={handleInputChange}
                className="border border-neutral-500 rounded-md p-2 text-white bg-black"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={closeDialog}>Cancel</Button>
            <Button
              className="bg-[#7152F3] text-white"
              onClick={handleAddEmployee}
            >
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employees;
