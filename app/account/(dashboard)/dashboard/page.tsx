"use client";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { FiCalendar, FiChevronUp, FiUser } from "react-icons/fi";

const Dashboard = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="grid grid-cols-3 gap-4 p-4 font-dmSans">
      {/* First Column */}
      <div className="col-span-2 grid grid-rows-2 gap-4">
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><FiUser /> Total Employees</CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="flex justify-between">
                <p className="text-3xl">150</p>
                <span className="flex items-center text-[11px] gap-2 py-1 px-2 rounded-md bg-[#30BE8216]"><FiChevronUp/>12%</span>
              </div>
              <CardFooter>
                <p className="text-sm">Update: July 16, 2024</p>
              </CardFooter>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Applicants</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add content for Total Applicants here */}
              <p>30</p>
            </CardContent>
          </Card>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add content for Today's Attendance here */}
              <p>120/150</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add content for Total Projects here */}
              <p>25</p>
            </CardContent>
          </Card>
        </div>

         {/* Row 3 - Graph Section */}
         <div className="grid grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Graph</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add your graph content here */}
              <p>Graph will be here (tall section)</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Second Column */}
      <div className="col-span-1 grid grid-rows-1 gap-4 bg-white p-4">
        <div className="flex justify-between">
          <h4>My Schedule</h4>
          <FiCalendar />
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className=""
        />
      </div>
    </div>
  );
};

export default Dashboard;
