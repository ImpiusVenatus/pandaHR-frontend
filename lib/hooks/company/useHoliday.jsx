import { useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/holiday";

const useHoliday = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create a new holiday for a specific company
  const createHoliday = async (companyId, holidayData) => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, { ...holidayData, companyId });
      setHolidays((prev) => [...prev, response.data.data]);
    } catch (err) {
      setError("Error creating holiday: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get all holidays for a specific company
  const getAllHolidays = async (companyId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}?companyId=${companyId}`);
      setHolidays(response.data.data);
    } catch (err) {
      setError("Error fetching holidays: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get a specific holiday by ID for a company
  const getHolidayById = async (companyId, id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/${id}?companyId=${companyId}`
      );
      return response.data.data;
    } catch (err) {
      setError("Error fetching holiday: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update a holiday by ID for a specific company
  const updateHoliday = async (companyId, id, holidayData) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${API_URL}/${id}?companyId=${companyId}`,
        holidayData
      );
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

  // Delete a holiday by ID for a specific company
  const deleteHoliday = async (companyId, id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}?companyId=${companyId}`);
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
