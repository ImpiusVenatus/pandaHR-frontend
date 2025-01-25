import { useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/employee";

interface Employee {
  id: string;
  name: string;
  department: string;
  designation: string;
  type: "Full-Time" | "Part-Time" | "Contract";
  status: "Active" | "Inactive";
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalEmployees: number;
}

const useEmployee = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 0,
    totalEmployees: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Add a new employee
  const addEmployee = async (employeeData: Omit<Employee, "id">) => {
    setLoading(true);
    try {
      const response = await axios.post<Employee>(API_URL, employeeData);
      setEmployees((prev) => [...prev, response.data]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Error adding employee: " + err.message);
      } else {
        setError("Error adding employee.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Get all employees with pagination
  const getAllEmployees = async (page = 1, limit = 5) => {
    setLoading(true);
    try {
      const response = await axios.get<{
        employees: Employee[];
        currentPage: number;
        totalPages: number;
        totalEmployees: number;
      }>(API_URL, {
        params: { page, limit },
      });
      setEmployees(response.data.employees);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalEmployees: response.data.totalEmployees,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Error fetching employees: " + err.message);
      } else {
        setError("Error fetching employees.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Get an employee by ID
  const getEmployeeById = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get<Employee>(`${API_URL}/${id}`);
      return response.data; // Return specific employee data
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Error fetching employee: " + err.message);
      } else {
        setError("Error fetching employee.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Update an employee by ID
  const updateEmployee = async (id: string, updatedData: Partial<Employee>) => {
    setLoading(true);
    try {
      const response = await axios.patch<Employee>(
        `${API_URL}/${id}`,
        updatedData
      );
      setEmployees((prev) =>
        prev.map((employee) => (employee.id === id ? response.data : employee))
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Error updating employee: " + err.message);
      } else {
        setError("Error updating employee.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Remove an employee by ID
  const removeEmployee = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setEmployees((prev) => prev.filter((employee) => employee.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Error removing employee: " + err.message);
      } else {
        setError("Error removing employee.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    employees,
    pagination,
    loading,
    error,
    addEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    removeEmployee,
  };
};

export default useEmployee;
