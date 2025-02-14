import { useState } from "react";
import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/department";

interface Department {
  _id: string;
  name: string;
  companyId: string;
  employees?: string[];
}

interface NewDepartment {
  name: string;
  companyId: string;
}

interface ApiResponse<T> {
  department?: T;
  departments?: T[];
  message?: string;
}

const useDepartment = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDepartments = async (companyId: string): Promise<Department[]> => {
    if (!companyId)
      throw new Error("companyId is required to fetch departments.");

    setLoading(true);
    try {
      const response = await axios.get<ApiResponse<Department>>(
        `${API_URL}/${companyId}`
      );
      const fetchedDepartments = response.data.departments || [];

      setDepartments(fetchedDepartments);

      return fetchedDepartments;
    } catch (err) {
      const error = err as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Error fetching departments");
      } else {
        setError(error.message);
      }
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartmentById = async (
    id: string,
    companyId: string
  ): Promise<void> => {
    if (!companyId)
      throw new Error("companyId is required to fetch a department.");

    setLoading(true);
    try {
      const response = await axios.get<ApiResponse<Department>>(
        `${API_URL}/${id}?companyId=${companyId}`
      );
      setDepartment(response.data.department || null);
      setError(null);
    } catch (err) {
      const error = err as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Error fetching department");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const createDepartment = async (
    newDepartment: NewDepartment
  ): Promise<void> => {
    setLoading(true);

    try {
      const response = await axios.post<ApiResponse<Department>>(API_URL, {
        name: newDepartment.name,
        companyId: newDepartment.companyId,
      });

      if (response.data.department) {
        setDepartments((prev) => [...prev, response.data.department!]);
      }
      setError(null);
    } catch (err) {
      const error = err as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Error creating department");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateDepartment = async (
    id: string,
    companyId: string,
    updatedDepartment: Partial<Department>
  ): Promise<void> => {
    if (!companyId)
      throw new Error("companyId is required to update a department.");

    setLoading(true);
    try {
      const response = await axios.put<ApiResponse<Department>>(
        `${API_URL}/${id}`,
        {
          ...updatedDepartment,
          companyId,
        }
      );

      if (response.data.department) {
        setDepartments((prev) =>
          prev.map((dept) =>
            dept._id === id ? response.data.department! : dept
          )
        );
      }
      setError(null);
    } catch (err) {
      const error = err as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Error updating department");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteDepartment = async (
    id: string,
    companyId: string
  ): Promise<void> => {
    if (!companyId)
      throw new Error("companyId is required to delete a department.");

    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`, { data: { companyId } });
      setDepartments((prev) => prev.filter((dept) => dept._id !== id));
      setError(null);
    } catch (err) {
      const error = err as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Error deleting department");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const addEmployeeToDepartment = async (
    departmentId: string,
    companyId: string,
    employeeIds: string[]
  ): Promise<ApiResponse<Department>> => {
    if (!companyId) throw new Error("companyId is required to add employees.");

    try {
      const response = await axios.patch<ApiResponse<Department>>(
        `${API_URL}/${departmentId}/add-employees`,
        {
          employees: employeeIds,
          companyId,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    departments,
    department,
    loading,
    error,
    fetchDepartments,
    fetchDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    addEmployeeToDepartment,
  };
};

export default useDepartment;
