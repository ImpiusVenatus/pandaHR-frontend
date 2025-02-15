"use client";

import React, { useEffect, useState } from "react";
import JobCard from "@/components/dashboard/JobCard";
import JobDialog from "@/components/dashboard/JobDialog";
import { Button } from "@/components/ui/button";
import useCompany from "@/lib/hooks/company/useCompany";
import useJob from "@/lib/hooks/company/useJob";

const Jobs = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const { fetchCompanyIdByUserId } = useCompany();
  const { jobs, getAllJobs, loading, updateJob } = useJob(); // Assuming updateJob is available

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  useEffect(() => {
    const fetchCompany = async () => {
      if (userId) {
        const id = await fetchCompanyIdByUserId(userId);
        setCompanyId(id);
      }
    };
    fetchCompany();
  }, [userId]);

  useEffect(() => {
    if (companyId) {
      getAllJobs(companyId);
    }
  }, [companyId]);

  // Categorize jobs based on status
  const activeJobs = jobs.filter((job) => job.status === "Active");
  const inactiveJobs = jobs.filter((job) => job.status === "Inactive");
  const completedJobs = jobs.filter((job) => job.status === "Completed");

  // Handle status change and update the job
  // Update handleStatusChange to allow for all status types
  const handleStatusChange = async (
    jobId: string,
    newStatus: "Active" | "Inactive" | "Completed"
  ) => {
    try {
      // Call the updateJob function from the useJob hook to update the job status
      await updateJob(jobId, newStatus);

      // Only call getAllJobs if companyId is not null
      if (companyId) {
        getAllJobs(companyId);
      } else {
        console.error("Company ID is null. Cannot fetch jobs.");
      }
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 border border-[#A2A1A816] rounded-md font-dmSans">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Jobs</h1>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-[#7152F3] text-white hover:bg-transparent border border-[#7152F3] hover:text-[#7152F3]"
        >
          <JobDialog />
        </Button>
      </div>

      {/* Board Section */}
      {loading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Active Jobs */}
          <div className="border border-[#A2A1A816] rounded-md p-4 bg-[#F9FAFB] dark:bg-transparent">
            <h2 className="text-lg font-semibold mb-3">Active Jobs</h2>
            {activeJobs.length > 0 ? (
              activeJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onStatusChange={handleStatusChange}
                />
              ))
            ) : (
              <p className="text-gray-500">No active jobs available.</p>
            )}
          </div>

          {/* Inactive Jobs */}
          <div className="border border-[#A2A1A816] rounded-md p-4 bg-[#F9FAFB] dark:bg-transparent">
            <h2 className="text-lg font-semibold mb-3">Inactive Jobs</h2>
            {inactiveJobs.length > 0 ? (
              inactiveJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onStatusChange={handleStatusChange}
                />
              ))
            ) : (
              <p className="text-gray-500">No inactive jobs available.</p>
            )}
          </div>

          {/* Completed Jobs */}
          <div className="border border-[#A2A1A816] rounded-md p-4 bg-[#F9FAFB] dark:bg-transparent">
            <h2 className="text-lg font-semibold mb-3">Completed Jobs</h2>
            {completedJobs.length > 0 ? (
              completedJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onStatusChange={handleStatusChange}
                />
              ))
            ) : (
              <p className="text-gray-500">No completed jobs available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
