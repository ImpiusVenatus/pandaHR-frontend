import { useState } from "react";
import axios, { AxiosError } from "axios";

// Job model type
interface Job {
  _id: string;
  companyId: string;
  title: string;
  departmentId: string;
  type: "Full-Time" | "Part-Time" | "Contract";
  salary: number;
  status?: "Active" | "Inactive" | "Completed";
  location: "Remote" | "On-site";
  place: string;
  postedBy: string;
  createdAt?: string;
  updatedAt?: string;
}

// API Response type
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// API Error response type
interface ApiErrorResponse {
  success: boolean;
  message: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/job";

const useJob = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Helper function to handle errors
  const handleError = (error: AxiosError<ApiErrorResponse> | Error) => {
    if (axios.isAxiosError(error) && error.response?.data) {
      return error.response.data.message;
    }
    return error.message;
  };

  // Create a new job listing
  const createJob = async (
    jobData: Omit<Job, "_id" | "createdAt" | "updatedAt">
  ) => {
    setLoading(true);
    try {
      const response = await axios.post<ApiResponse<Job>>(API_URL, jobData);
      setJobs((prev) => [...prev, response.data.data]);
    } catch (err) {
      const errorMessage = handleError(
        err as AxiosError<ApiErrorResponse> | Error
      );
      setError(`Error creating job: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Get all job listings by companyId
  const getAllJobs = async (companyId: string) => {
    if (!companyId) return;

    setLoading(true);
    try {
      const response = await axios.get<ApiResponse<Job[]>>(
        `${API_URL}/getAllJobs/${companyId}`
      );
      setJobs(response.data.data);
    } catch (err) {
      const errorMessage = handleError(
        err as AxiosError<ApiErrorResponse> | Error
      );
      setError(`Error fetching jobs: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Get a job listing by ID
  const getJobById = async (id: string): Promise<Job | null> => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse<Job>>(`${API_URL}/${id}`);
      return response.data.data;
    } catch (err) {
      const errorMessage = handleError(
        err as AxiosError<ApiErrorResponse> | Error
      );
      setError(`Error fetching job: ${errorMessage}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update job status by ID
  const updateJob = async (
    id: string,
    status: "Active" | "Inactive" | "Completed"
  ) => {
    setLoading(true);
    try {
      const jobData = { status }; // Only pass the updated status

      // Make a PATCH request to update the job's status
      const response = await axios.patch<ApiResponse<Job>>(
        `${API_URL}/${id}`, // Ensure the correct API endpoint is used
        jobData
      );

      // Update the job list with the new status
      setJobs((prev) =>
        prev.map((job) =>
          job._id === id ? { ...job, status: response.data.data.status } : job
        )
      );
    } catch (err) {
      const errorMessage = handleError(
        err as AxiosError<ApiErrorResponse> | Error
      );
      setError(`Error updating job: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Delete a job listing by ID
  const deleteJob = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete<ApiResponse<null>>(`${API_URL}/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      const errorMessage = handleError(
        err as AxiosError<ApiErrorResponse> | Error
      );
      setError(`Error deleting job: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    jobs,
    loading,
    error,
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
  };
};

export default useJob;
