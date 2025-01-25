import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/attendance";

export const useAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendanceRecord, setAttendanceRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all attendance records
  const fetchAllAttendance = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      setAttendanceRecords(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch attendance records"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch a single attendance record by ID
  const fetchAttendanceById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      setAttendanceRecord(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch attendance record"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new attendance record
  const createAttendance = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}`, data);
      setAttendanceRecords((prev) => [...prev, response.data.data]);
      return response.data.data;
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create attendance record"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an attendance record by ID
  const updateAttendance = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}`, data);
      setAttendanceRecords((prev) =>
        prev.map((record) => (record._id === id ? response.data.data : record))
      );
      return response.data.data;
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update attendance record"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete an attendance record by ID
  const deleteAttendance = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setAttendanceRecords((prev) =>
        prev.filter((record) => record._id !== id)
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete attendance record"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAttendance();
  }, [fetchAllAttendance]);

  return {
    attendanceRecords,
    attendanceRecord,
    loading,
    error,
    fetchAllAttendance,
    fetchAttendanceById,
    createAttendance,
    updateAttendance,
    deleteAttendance,
  };
};
