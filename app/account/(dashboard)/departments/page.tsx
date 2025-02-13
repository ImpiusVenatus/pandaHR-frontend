"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiPlusCircle, FiSearch } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useDepartment from "@/lib/hooks/company/useDepartment";
import useCompany from "@/lib/hooks/company/useCompany";

const Departments = () => {
  const { fetchCompanyIdByUserId } = useCompany();
  const { fetchDepartments, createDepartment, addEmployeeToDepartment } = useDepartment();
  
  const [departments, setDepartments] = useState<{ id: number; name: string; employees: string[]; people?: string[] }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEmployeeDialogOpen, setIsEmployeeDialogOpen] = useState(false);
  const [newDepartment, setNewDepartment] = useState({ name: "" });
  const [newEmployee, setNewEmployee] = useState({ name: "", designation: "" });
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(null);

  const [companyId, setCompanyId] = useState<string | null>(null);
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    const fetchCompany = async () => {
      if (userId) {
        const id = await fetchCompanyIdByUserId(userId);
        setCompanyId(id);
      }
    };
    fetchCompany();
  }, [userId]);

  useEffect(() => {
    const getDepartments = async () => {
      if (!companyId) return;
      try {
        const fetchedDepartments = await fetchDepartments(companyId);
        setDepartments(fetchedDepartments || []);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    getDepartments();
  }, [companyId]);

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDepartment({ ...newDepartment, [e.target.name]: e.target.value });
  };

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleAddDepartment = async () => {
    if (!newDepartment.name || !companyId) {
      alert("Please enter a department name.");
      return;
    }
  
    try {
      await createDepartment({ ...newDepartment, companyId });
  
      setNewDepartment({ name: "" });
      setIsDialogOpen(false);
  
      const updatedDepartments = await fetchDepartments(companyId);
  
      setDepartments(updatedDepartments || []);
    } catch (error) {
      alert("Error creating department. Please try again.");
    }
  };
  

  const handleAddEmployee = async () => {
    if (!selectedDepartmentId) {
      alert("Please select a department.");
      return;
    }

    if (!newEmployee.name.trim()) {
      alert("Please enter an employee name.");
      return;
    }

    try {
      await addEmployeeToDepartment(selectedDepartmentId, [newEmployee.name]);
      setNewEmployee({ name: "", designation: "" });
      setIsEmployeeDialogOpen(false);

      const updatedDepartments = await fetchDepartments(companyId!);
      setDepartments(updatedDepartments || []);
    } catch {
      alert("Error adding employee. Please try again.");
    }
  };

  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
  return (
    <div className="container mx-auto p-4 border border-[#A2A1A816] rounded-md font-dmSans">
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-32 lg:w-64 border border-[#A2A1A816] rounded-md pl-10 pr-4 py-2"
            placeholder="Search..."
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#16151C] dark:text-white" />
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-[#7152F3] text-white hover:bg-transparent border border-[#7152F3] hover:text-[#7152F3]"
          onClick={() => setIsDialogOpen(true)}
        >
          <FiPlusCircle />
          Add New Department
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDepartments.length > 0 ? (
          filteredDepartments.map((department) => (
            <div key={department.id} className="p-4 border border-[#A2A1A816] rounded-md shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-semibold text-lg">{department.name}</h2>
                  <p className="text-sm text-gray-500">{department.employees.length || 0} People</p>
                </div>
                <Button
                  variant="outline"
                  className="bg-transparent text-[#7152F3] border-[#7152F3]"
                  onClick={() => {
                    setSelectedDepartmentId(department.id);
                    setIsEmployeeDialogOpen(true);
                  }}
                >
                  Edit
                </Button>
              </div>
              <hr />
              <ul className="space-y-2">
                {department.employees?.map((person, idx) => (
                  <li key={idx} className="flex items-center justify-between py-2 px-3 border rounded-md hover:bg-[#7152F316]">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage />
                      </Avatar>
                      <div>
                        <p className="font-medium">{person.name}</p>
                        <p className="text-sm text-gray-500">{person.designation}</p>
                      </div>
                    </div>
                    <ChevronRight className="text-[#7152F3]" />
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No departments found.</p>
        )}
      </div>

      {/* Add Employee Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Department</DialogTitle>
          </DialogHeader>
          <Input
            name="name"
            value={newDepartment.name}
            onChange={handleDepartmentChange}
            placeholder="Department Name"
          />
          <Button className="mt-4" onClick={handleAddDepartment}>
            Add Department
          </Button>
        </DialogContent>
      </Dialog>

      {/* Add Employee Dialog */}
      <Dialog open={isEmployeeDialogOpen} onOpenChange={setIsEmployeeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Employee</DialogTitle>
          </DialogHeader>
          <Input
            name="name"
            value={newEmployee.name}
            onChange={handleEmployeeChange}
            placeholder="Employee Name"
          />
          <Button className="mt-4" onClick={handleAddEmployee}>
            Add Employee
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Departments;
