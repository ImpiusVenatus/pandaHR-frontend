import { useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/holiday";

const useHoliday = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create a new holiday
  const createHoliday = async (holidayData) => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, holidayData);
      setHolidays((prev) => [...prev, response.data.data]);
    } catch (err) {
      setError("Error creating holiday: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get all holidays
  const getAllHolidays = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setHolidays(response.data.data);
    } catch (err) {
      setError("Error fetching holidays: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get a holiday by ID
  const getHolidayById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data.data;
    } catch (err) {
      setError("Error fetching holiday: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update a holiday by ID
  const updateHoliday = async (id, holidayData) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/${id}`, holidayData);
      setHolidays((prev) =>
        prev.map((holiday) =>
          holiday._id === id ? response.data.data : holiday
        )
      );
    } catch (err) {
      setError("Error updating holiday: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a holiday by ID
  const deleteHoliday = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setHolidays((prev) => prev.filter((holiday) => holiday._id !== id));
    } catch (err) {
      setError("Error deleting holiday: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    holidays,
    loading,
    error,
    createHoliday,
    getAllHolidays,
    getHolidayById,
    updateHoliday,
    deleteHoliday,
  };
};

export default useHoliday;
