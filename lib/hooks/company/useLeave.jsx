import { useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/leave";

const useLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create a new leave request
  const createLeave = async (leaveData) => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, leaveData);
      setLeaves((prev) => [...prev, response.data.data]);
    } catch (err) {
      setError("Error creating leave: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get all leave requests
  const getAllLeaves = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setLeaves(response.data.data);
    } catch (err) {
      setError("Error fetching leaves: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get a leave request by ID
  const getLeaveById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data.data;
    } catch (err) {
      setError("Error fetching leave: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update a leave request by ID
  const updateLeave = async (id, leaveData) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/${id}`, leaveData);
      setLeaves((prev) =>
        prev.map((leave) => (leave._id === id ? response.data.data : leave))
      );
    } catch (err) {
      setError("Error updating leave: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a leave request by ID
  const deleteLeave = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setLeaves((prev) => prev.filter((leave) => leave._id !== id));
    } catch (err) {
      setError("Error deleting leave: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    leaves,
    loading,
    error,
    createLeave,
    getAllLeaves,
    getLeaveById,
    updateLeave,
    deleteLeave,
  };
};

export default useLeave;
