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

const JobDialog: React.FC<{ companyId: string }> = ({ companyId }) => {
  const [location, setLocation] = useState("Enter a Location");
  const [department, setDepartment] = useState("Select a Department");
  const { departments, fetchDepartments, loading } = useDepartment();

  useEffect(() => {
    fetchDepartments(companyId);
  }, [companyId]);

  return (
    <Dialog>
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
                disabled={loading}
              >
                {loading ? "Loading..." : department} <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[15rem]">
              {departments.length > 0 ? (
                departments.map((dept) => (
                  <DropdownMenuItem
                    key={dept.id}
                    onClick={() => setDepartment(dept.name)}
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
          <Input placeholder="Enter Job Title" className="w-[240px]" />
          <Input placeholder="Enter Amount" className="w-[240px]" />
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
              <DropdownMenuItem onClick={() => setLocation("New York")}>
                New York
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocation("California")}>
                California
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocation("Chicago")}>
                Chicago
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            <span>Select Type</span>
            <RadioGroup
              defaultValue="comfortable"
              className="flex gap-4 pt-2 text-[#A2A1A8]"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="default"
                  id="r1"
                  className="border-[#A2A1A8]"
                />
                <Label htmlFor="r1">Default</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="r2" />
                <Label htmlFor="r2">Comfortable</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <Button variant={"outline"} className="w-full">
            Cancel
          </Button>
          <Button
            variant={"outline"}
            className="w-full bg-[#7152F3] text-white"
          >
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDialog;
