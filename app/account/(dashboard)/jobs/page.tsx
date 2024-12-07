"use client";
import React, {useState} from "react";
import { FiBriefcase, FiMapPin, FiPlusCircle } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const JobCard = ({ title, category, types, location, salary }: JobCardProps) => (
  <div className="border border-[#A2A1A816] rounded-md p-4 bg-[#A2A1A808] shadow-sm mb-4 font-dmSans">
    <div className="flex items-center gap-3 mb-2">
      <FiBriefcase className="dark:text-white" size={20} />
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-[#A2A1A8]">{category}</p>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 mb-3">
      {types.map((type, index) => (
        <span
          key={index}
          className="py-1 px-3 text-sm cursor-pointer rounded-md bg-[#7152F3] text-white"
        >
          {type}
        </span>
      ))}
    </div>
    <div className="text-sm dark:text-white flex justify-between">
      <p className="flex items-center"><FiMapPin />{location}</p>
      <p>{salary}</p>
    </div>
  </div>
);

interface JobCardProps {
  title: string;
  category: string;
  types: string[];
  location: string;
  salary: string;
}

const Jobs = () => {
  const activeJobs = [
    {
      title: "UI/UX Designer",
      category: "Design",
      types: ["Design", "Full Time", "Remote"],
      location: "California, USA",
      salary: "3600$/Month",
    },
    {
      title: "Frontend Developer",
      category: "Engineering",
      types: ["Engineering", "Part Time", "Remote"],
      location: "New York, USA",
      salary: "4000$/Month",
    },
  ];

  const inactiveJobs = [
    {
      title: "Content Writer",
      category: "Writing",
      types: ["Writing", "Contract", "On-site"],
      location: "Chicago, USA",
      salary: "2500$/Month",
    },
  ];

  const completedJobs = [
    {
      title: "Backend Developer",
      category: "Engineering",
      types: ["Engineering", "Full Time", "Remote"],
      location: "Los Angeles, USA",
      salary: "5000$/Month",
    },
  ];
  const [location, setLocation] = useState("Enter a Location");
  const [department, setDepartment] = useState("Select a Department");

  return (
    <div className="container mx-auto p-4 border border-[#A2A1A816] rounded-md font-dmSans">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Jobs</h1>
        <Button variant="outline" className="flex items-center gap-2 bg-[#7152F3] text-white hover:bg-transparent border border-[#7152F3] hover:text-[#7152F3]">
          <Dialog>
            <DialogTrigger className="flex items-center gap-1"><FiPlusCircle /> Add New Job</DialogTrigger>
            <DialogContent className="w-auto font-dmSans">
              <DialogHeader>
                <DialogTitle>Add New Job</DialogTitle>
              </DialogHeader>
                <hr/>
                <div className="flex flex-col gap-4 max-w-[250px]">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex justify-between text-[#A2A1A8] px-3">{department} <ChevronDown /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-[15rem]">
                      <DropdownMenuItem onClick={() => setDepartment("English")}>English</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setDepartment("Spanish")}>Spanish</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setDepartment("French")}>French</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setDepartment("German")}>German</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Input
                    id="name"
                    placeholder="Enter Job Title"
                    className="w-[240px]"
                  />
                  <Input
                    id="name"
                    placeholder="Enter Amount"
                    className="w-[240px]"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex justify-between text-[#A2A1A8] px-3">{location} <ChevronDown /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-[15rem]">
                      <DropdownMenuItem onClick={() => setLocation("English")}>English</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLocation("Spanish")}>Spanish</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLocation("French")}>French</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLocation("German")}>German</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div>
                    <span>Select Type</span>
                  <RadioGroup defaultValue="comfortable" className="flex gap-4 pt-2 text-[#A2A1A8]">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="default" id="r1" className="border-[#A2A1A8]"/>
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
                  <Button variant={"outline"} className="w-full pl-3 text-left font-normal">
                    <span>Cancel</span>
                  </Button>
                  <Button variant={"outline"} className="w-full pl-3 text-left font-normal bg-[#7152F3] text-white">
                    <span>Add</span>
                  </Button>
                </div>
            </DialogContent>
          </Dialog>
        </Button>
      </div>

      {/* Board Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Active Jobs */}
        <div className="border border-[#A2A1A816] rounded-md p-4 bg-[#F9FAFB] dark:bg-transparent">
          <div className="flex items-center mb-3">
            <span className="w-2 h-2 rounded-full bg-[#EFBE12] mr-2"></span>
            <h2 className="text-lg font-semibold">Active Jobs</h2>
          </div>
          {activeJobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>

        {/* Inactive Jobs */}
        <div className="border border-[#A2A1A816] rounded-md p-4 bg-[#F9FAFB] dark:bg-transparent">
          <div className="flex items-center mb-3">
            <span className="w-2 h-2 rounded-full bg-[#F45B69] mr-2"></span>
            <h2 className="text-lg font-semibold">Inactive Jobs</h2>
          </div>
          {inactiveJobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
        {/* Completed Jobs */}
        <div className="border border-[#A2A1A816] rounded-md p-4 bg-[#F9FAFB] dark:bg-transparent">
          <div className="flex items-center mb-3">
            <span className="w-2 h-2 rounded-full bg-[#3FC28A] mr-2"></span>
            <h2 className="text-lg font-semibold">Completed Jobs</h2>
          </div>
          {completedJobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
