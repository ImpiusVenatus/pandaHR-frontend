import { useState } from "react";
import axios, { AxiosError } from "axios";

interface PayrollData {
  _id: string;
  employeeId: {
    // Changed from string to object with name property
    _id: string;
    name: string;
  };
  CTC: number;
  monthlySalary: number;
  status: "Paid" | "Pending";
}

// For creating new payroll entries
interface CreatePayrollData {
  employeeId: string;
  CTC: number;
  monthlySalary: number;
  payDate?: string;
  status?: "Paid" | "Pending";
}

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/payroll";

const usePayroll = () => {
  const [payrolls, setPayrolls] = useState<PayrollData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Create a new payroll entry
  const createPayroll = async (payrollData: CreatePayrollData) => {
    console.log(payrollData);
    setLoading(true);
    try {
      const response = await axios.post<{ data: PayrollData }>(
        API_URL,
        payrollData
      );
      setPayrolls((prev) => [...prev, response.data.data]);
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError;
      setError(`Error creating payroll: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get all payroll entries
  const getAllPayrolls = async () => {
    setLoading(true);
    try {
      const response = await axios.get<{
        data: PayrollData[];
        currentPage: number;
        totalPages: number;
        totalPayrolls: number;
      }>(API_URL);
      setPayrolls(response.data.data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      setError(`Error fetching payrolls: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get a payroll entry by ID
  const getPayrollById = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get<{ data: PayrollData }>(
        `${API_URL}/${id}`
      );
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError;
      setError(`Error fetching payroll: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update a payroll entry by ID
  const updatePayroll = async (id: string, status: "Paid" | "Pending") => {
    setLoading(true);
    try {
      const response = await axios.patch<{ data: PayrollData }>(
        `${API_URL}/${id}`,
        { status } // Only sending the status field
      );
      setPayrolls((prev) =>
        prev.map((payroll) =>
          payroll._id === id ? response.data.data : payroll
        )
      );
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError;
      setError(`Error updating payroll: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete a payroll entry by ID
  const deletePayroll = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPayrolls((prev) => prev.filter((payroll) => payroll._id !== id));
    } catch (err) {
      const error = err as AxiosError;
      setError(`Error deleting payroll: ${error.message}`);
      throw error;
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
