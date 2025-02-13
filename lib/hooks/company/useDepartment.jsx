import { useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/department";

const useDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDepartments = async (companyId) => {
    if (!companyId)
      throw new Error("companyId is required to fetch departments.");

    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/${companyId}`);
      const fetchedDepartments = response.data.departments;

      setDepartments(fetchedDepartments);

      setDepartments((prevDepartments) => {
        return fetchedDepartments;
      });

      return fetchedDepartments || [];
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching departments");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a department by ID (must belong to the given company)
  const fetchDepartmentById = async (id, companyId) => {
    if (!companyId)
      throw new Error("companyId is required to fetch a department.");

    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/${id}?companyId=${companyId}`
      );
      setDepartment(response.data.department);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching department");
    } finally {
      setLoading(false);
    }
  };

  const createDepartment = async (newDepartment, companyId) => {
    setLoading(true);

    try {
      const response = await axios.post(API_URL, {
        name: newDepartment.name,
        companyId: newDepartment.companyId,
      });

      setDepartments((prev) => [...prev, response.data.department]);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error creating department");
    } finally {
      setLoading(false);
    }
  };

  // Update a department by ID (ensuring it belongs to the given company)
  const updateDepartment = async (id, companyId, updatedDepartment) => {
    if (!companyId)
      throw new Error("companyId is required to update a department.");

    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        ...updatedDepartment,
        companyId,
      });
      setDepartments((prev) =>
        prev.map((dept) => (dept._id === id ? response.data.department : dept))
      );
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating department");
    } finally {
      setLoading(false);
    }
  };

  // Delete a department by ID (ensuring it belongs to the given company)
  const deleteDepartment = async (id, companyId) => {
    if (!companyId)
      throw new Error("companyId is required to delete a department.");

    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`, { data: { companyId } });
      setDepartments((prev) => prev.filter((dept) => dept._id !== id));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting department");
    } finally {
      setLoading(false);
    }
  };

  // Add employees to a department (ensuring it belongs to the given company)
  const addEmployeeToDepartment = async (
    departmentId,
    companyId,
    employeeIds
  ) => {
    if (!companyId) throw new Error("companyId is required to add employees.");

    try {
      const response = await axios.patch(
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
