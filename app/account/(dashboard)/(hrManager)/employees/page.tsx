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
import { FiTrash2, FiPlusCircle, FiSearch } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { MdTune } from "react-icons/md";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useEmployee from "@/lib/hooks/employee/useEmployee";
import useCompany from "@/lib/hooks/company/useCompany";
import useDepartment from "@/lib/hooks/company/useDepartment";

type Employee = {
  _id: string;
  name: string;
  department: string;
  designation: string;
  type: "Full-Time" | "Part-Time" | "Contract";
  status: "Active" | "Inactive";
  companyId: string;
};

const Employees = () => {
  const {
    addEmployee,
    getEmployeesByCompanyId,
    removeEmployee,
    employees = [],
    pagination,
    loading,
  } = useEmployee();
  const { fetchCompanyIdByUserId } = useCompany();
  const { fetchDepartments } = useDepartment();
  const [departments, setDepartments] = useState<
    { id: number; name: string; people?: string[] }[]
  >([]);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  const [filters, setFilters] = useState({
    department: "",
    type: "",
    designation: "",
  });

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredEmployees = employees.filter((emp) => {
    return (
      (!filters.department || emp.department === filters.department) &&
      (!filters.type || emp.type === filters.type) &&
      (!filters.designation ||
        emp.designation
          .toLowerCase()
          .includes(filters.designation.toLowerCase()))
    );
  });

  useEffect(() => {
    const fetchCompany = async () => {
      if (userId) {
        const id = await fetchCompanyIdByUserId(userId);
        setCompanyId(id);
      }
    };
    fetchCompany();
  }, [userId]);

  // Fetch departments when companyId is available
  useEffect(() => {
    const getDepartments = async () => {
      if (!companyId) return;
      try {
        const fetchedDepartments = await fetchDepartments(companyId);
        const departmentsWithId = fetchedDepartments.map((dept, index) => ({
          id: index,
          name: dept.name,
        }));
        setDepartments(departmentsWithId || []);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    getDepartments();
  }, [companyId]);

  useEffect(() => {
    if (companyId) {
      getEmployeesByCompanyId(companyId, currentPage, itemsPerPage);
    }
  }, [companyId, currentPage]);

  const [newEmployee, setNewEmployee] = useState<Omit<Employee, "id">>({
    _id: "",
    name: "",
    department: "",
    designation: "",
    type: "Full-Time",
    status: "Active",
    companyId: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

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

    if (name === "department") {
      setNewEmployee((prev) => ({
        ...prev,
        department: value,
      }));
      return;
    }

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
      if (companyId) {
        await addEmployee({ ...newEmployee, companyId: companyId });
      }
      closeDialog();
    } catch (error) {
      console.error("Failed to add employee:", error);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setNewEmployee({
      _id: "",
      name: "",
      department: "",
      designation: "",
      type: "Full-Time",
      status: "Active",
      companyId: "",
    });
  };

  const openDialog = () => setIsDialogOpen(true);

  const openFilter = () => setIsFilterOpen(true);

  const closeFilter = () => setIsFilterOpen(false);

  const deleteEmployee = (id: string) => {
    removeEmployee(id);
  };

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
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={openFilter}
          >
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
              <TableHead className="font-semibold text-left">Sl No.</TableHead>
              <TableHead className="font-semibold text-left">
                Employee Name
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
            ) : Array.isArray(filteredEmployees) &&
              filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee, index) => (
                <TableRow key={employee._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{employee.name}</TableCell>
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
                    <Button
                      onClick={() => deleteEmployee(employee._id)}
                      variant="ghost"
                      size="sm"
                      className="text-[#F45B69]"
                    >
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
            {/* Department Dropdown */}
            <select
              name="department"
              value={newEmployee.department}
              onChange={handleInputChange}
              className="border border-neutral-500 rounded-md p-2 text-white bg-black w-full"
            >
              {departments.length > 0 ? (
                departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No departments available
                </option>
              )}
            </select>
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

      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogTrigger className="hidden"></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter Employee</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
              placeholder="Department"
            />
            <Input
              name="designation"
              value={filters.designation}
              onChange={handleFilterChange}
              placeholder="Designation"
            />
            <Input
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              placeholder="Type"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={closeFilter}>Cancel</Button>
            <Button
              className="bg-[#7152F3] hover:text-[#7152F3] text-white"
              onClick={closeFilter}
            >
              Filter
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employees;
