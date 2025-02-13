import { useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/company";

const useCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all companies
  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setCompanies(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching companies");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a company by ID
  const fetchCompanyById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setCompany(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching company");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a company ID by user ID
  const fetchCompanyByUserId = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      setCompany(response.data.data);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message || "Error fetching company by user ID"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch a company ID by user ID
  const fetchCompanyIdByUserId = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`
      );
      const companyId = response.data.companyId;
      setCompany(companyId);
      setError(null);
      return companyId;
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching company ID");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create a new company
  const createCompany = async (newCompany) => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, newCompany);
      setCompanies((prev) => [...prev, response.data.data]);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error creating company");
    } finally {
      setLoading(false);
    }
  };

  // Update a company by ID
  const updateCompany = async (id, updatedCompany) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedCompany);
      setCompanies((prev) =>
        prev.map((comp) => (comp._id === id ? response.data.data : comp))
      );
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating company");
    } finally {
      setLoading(false);
    }
  };

  // Delete a company by ID
  const deleteCompany = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCompanies((prev) => prev.filter((comp) => comp._id !== id));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting company");
    } finally {
      setLoading(false);
    }
  };

  return {
    companies,
    company,
    loading,
    error,
    fetchCompanies,
    fetchCompanyById,
    fetchCompanyByUserId,
    fetchCompanyIdByUserId,
    createCompany,
    updateCompany,
    deleteCompany,
  };
};

export default useCompany;
