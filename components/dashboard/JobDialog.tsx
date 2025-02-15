import React, { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import useDepartment from "@/lib/hooks/company/useDepartment";
import useCompany from "@/lib/hooks/company/useCompany";
import useJob from "@/lib/hooks/company/useJob";

const JobDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState<"Remote" | "On-site">("Remote");
  const [place, setPlace] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [jobType, setJobType] = useState<
    "Full-Time" | "Part-Time" | "Contract"
  >("Full-Time");

  const {
    departments,
    fetchDepartments,
    loading: deptLoading,
  } = useDepartment();
  const { fetchCompanyIdByUserId } = useCompany();
  const { createJob, loading, error } = useJob();

  const userId = localStorage.getItem("userId");
  const [companyId, setCompanyId] = useState("");

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
    if (companyId) fetchDepartments(companyId);
  }, [companyId]);

  const resetForm = () => {
    setTitle("");
    setSalary("");
    setDepartmentId("");
    setJobType("Full-Time");
    setLocation("Remote");
    setPlace("");
  };

  const handleSubmit = async () => {
    if (!title || !salary || !departmentId || !place) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await createJob({
        companyId,
        title,
        departmentId,
        type: jobType,
        salary: Number(salary),
        location,
        place,
        postedBy: userId || "",
      });

      // Reset form and close dialog
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-1">
        <FiPlusCircle /> Add New Job
      </DialogTrigger>
      <DialogContent className="w-auto font-dmSans">
        <DialogHeader>
          <DialogTitle>Add New Job</DialogTitle>
        </DialogHeader>
        <hr />
        <div className="flex flex-col gap-4 max-w-[250px]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex justify-between text-[#A2A1A8] px-3"
                disabled={deptLoading}
              >
                {deptLoading
                  ? "Loading..."
                  : departmentId
                  ? departments.find((d) => d._id === departmentId)?.name
                  : "Select a Department"}{" "}
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[15rem]">
              {departments.length > 0 ? (
                departments.map((dept) => (
                  <DropdownMenuItem
                    key={dept._id}
                    onClick={() => setDepartmentId(dept._id)}
                  >
                    {dept.name}
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled>
                  No departments available
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            placeholder="Enter Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[240px]"
          />
          <Input
            placeholder="Enter Salary"
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-[240px]"
          />
          <Input
            placeholder="Enter Place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="w-[240px]"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex justify-between text-[#A2A1A8] px-3"
              >
                {location} <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[15rem]">
              <DropdownMenuItem onClick={() => setLocation("Remote")}>
                Remote
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocation("On-site")}>
                On-site
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            <span>Select Type</span>
            <RadioGroup
              value={jobType}
              onValueChange={(value: string) =>
                setJobType(value as "Full-Time" | "Part-Time" | "Contract")
              }
              className="flex gap-4 pt-2 text-[#A2A1A8]"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Full-Time" id="full-time" />
                <Label htmlFor="full-time">Full-Time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Part-Time" id="part-time" />
                <Label htmlFor="part-time">Part-Time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Contract" id="contract" />
                <Label htmlFor="contract">Contract</Label>
              </div>
            </RadioGroup>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="flex justify-between gap-2">
          <Button variant="outline" className="w-full" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#7152F3] text-white"
          >
            {loading ? "Adding..." : "Add"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDialog;
