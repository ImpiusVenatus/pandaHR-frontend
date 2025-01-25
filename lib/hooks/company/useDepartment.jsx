import { useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/departments";

const useDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all departments
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setDepartments(response.data.departments);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching departments");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a department by ID
  const fetchDepartmentById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setDepartment(response.data.department);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching department");
    } finally {
      setLoading(false);
    }
  };

  // Create a new department
  const createDepartment = async (newDepartment) => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, newDepartment);
      setDepartments((prev) => [...prev, response.data.department]);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error creating department");
    } finally {
      setLoading(false);
    }
  };

  // Update a department by ID
  const updateDepartment = async (id, updatedDepartment) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedDepartment);
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

  // Delete a department by ID
  const deleteDepartment = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setDepartments((prev) => prev.filter((dept) => dept._id !== id));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting department");
    } finally {
      setLoading(false);
    }
  };

  const addEmployeeToDepartment = async (departmentId, employeeIds) => {
    try {
      const response = await axios.patch(
        `${API_URL}/${departmentId}/add-employees`,
        { employees: employeeIds }
      );
      console.log("Employees added successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error adding employees to department:",
        error.response?.data || error.message
      );
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
