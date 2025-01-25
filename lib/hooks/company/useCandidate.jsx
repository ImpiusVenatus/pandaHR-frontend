import { useState, useCallback } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/candidate";

const useCandidate = () => {
  const [candidates, setCandidates] = useState([]);
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all candidates
  const fetchCandidates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setCandidates(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch a single candidate by ID
  const fetchCandidateById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setCandidate(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new candidate
  const createCandidate = useCallback(async (candidateData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(API_URL, candidateData);
      setCandidates((prev) => [...prev, response.data.data]);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update a candidate by ID
  const updateCandidate = useCallback(async (id, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      setCandidates((prev) =>
        prev.map((candidate) =>
          candidate._id === id ? response.data.data : candidate
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a candidate by ID
  const deleteCandidate = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCandidates((prev) => prev.filter((candidate) => candidate._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    candidates,
    candidate,
    loading,
    error,
    fetchCandidates,
    fetchCandidateById,
    createCandidate,
    updateCandidate,
    deleteCandidate,
  };
};

export default useCandidate;
