import { useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/payroll";

const usePayroll = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create a new payroll entry
  const createPayroll = async (payrollData) => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, payrollData);
      setPayrolls((prev) => [...prev, response.data.data]);
    } catch (err) {
      setError("Error creating payroll: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get all payroll entries
  const getAllPayrolls = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setPayrolls(response.data.data);
    } catch (err) {
      setError("Error fetching payrolls: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get a payroll entry by ID
  const getPayrollById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data.data;
    } catch (err) {
      setError("Error fetching payroll: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update a payroll entry by ID
  const updatePayroll = async (id, payrollData) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/${id}`, payrollData);
      setPayrolls((prev) =>
        prev.map((payroll) =>
          payroll._id === id ? response.data.data : payroll
        )
      );
    } catch (err) {
      setError("Error updating payroll: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a payroll entry by ID
  const deletePayroll = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPayrolls((prev) => prev.filter((payroll) => payroll._id !== id));
    } catch (err) {
      setError("Error deleting payroll: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    payrolls,
    loading,
    error,
    createPayroll,
    getAllPayrolls,
    getPayrollById,
    updatePayroll,
    deletePayroll,
  };
};

export default usePayroll;
