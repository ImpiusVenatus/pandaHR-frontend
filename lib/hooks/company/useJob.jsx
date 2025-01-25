import { useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/job";

const useJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create a new job listing
  const createJob = async (jobData) => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, jobData);
      setJobs((prev) => [...prev, response.data.data]);
    } catch (err) {
      setError("Error creating job: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get all job listings
  const getAllJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setJobs(response.data.data);
    } catch (err) {
      setError("Error fetching jobs: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get a job listing by ID
  const getJobById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data.data;
    } catch (err) {
      setError("Error fetching job: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update a job listing by ID
  const updateJob = async (id, jobData) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/${id}`, jobData);
      setJobs((prev) =>
        prev.map((job) => (job._id === id ? response.data.data : job))
      );
    } catch (err) {
      setError("Error updating job: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a job listing by ID
  const deleteJob = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      setError("Error deleting job: " + err.message);
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
