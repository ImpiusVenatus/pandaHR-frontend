import { useState } from "react";
import axios, { AxiosError } from "axios";

interface PayrollData {
  _id: string;
  employeeId: string;
  salaryPerMonth: number;
  ctc: number;
  createdAt: string;
  updatedAt: string;
  companyId: string;
}

// For creating new payroll entries
interface CreatePayrollData {
  employeeId: string;
  salaryPerMonth: number;
  ctc: number;
  companyId: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/payroll";

const usePayroll = () => {
  const [payrolls, setPayrolls] = useState<PayrollData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Create a new payroll entry
  const createPayroll = async (payrollData: CreatePayrollData) => {
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

  // Get payroll entries by company ID
  const getPayrollsByCompanyId = async (companyId: string) => {
    setLoading(true);
    try {
      const response = await axios.get<{
        data: PayrollData[];
        currentPage: number;
        totalPages: number;
        totalPayrolls: number;
      }>(`${API_URL}/company/${companyId}`);
      setPayrolls(response.data.data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      setError(`Error fetching company payrolls: ${error.message}`);
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
  const updatePayroll = async (
    id: string,
    payrollData: Partial<CreatePayrollData>
  ) => {
    setLoading(true);
    try {
      const response = await axios.patch<{ data: PayrollData }>(
        `${API_URL}/${id}`,
        payrollData
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
    getPayrollsByCompanyId,
    getPayrollById,
    updatePayroll,
    deletePayroll,
  };
};

export default usePayroll;
