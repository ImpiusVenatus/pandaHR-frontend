"use client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import { FiPlusCircle } from "react-icons/fi";

const holidays = [
  { date: "2024-01-01", day: "Monday", name: "New Year's Day" },
  { date: "2024-03-26", day: "Tuesday", name: "Independence Day" },
  { date: "2024-05-01", day: "Wednesday", name: "Labor Day" },
  { date: "2024-08-15", day: "Thursday", name: "National Mourning Day" },
  { date: "2024-12-25", day: "Wednesday", name: "Christmas Day" },
];

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const Holidays = () => {
  const today = getTodayDate();

  return (
    <div className="container mx-auto p-4 border border-[#A2A1A816] rounded-md font-dmSans">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Holidays</h2>
        <Button variant="outline" className="flex items-center gap-2 bg-[#7152F3] text-white">
          <FiPlusCircle />
          Add New Holiday
        </Button>
      </div>

      {/* Table Section */}
      <div className="rounded-lg overflow-hidden">
        <Table className="border-separate space-y-2">
          <TableHeader>
            <TableRow className="py-4">
              <TableHead className="font-semibold text-left">Date</TableHead>
              <TableHead className="font-semibold text-left">Day</TableHead>
              <TableHead className="font-semibold text-left">Holiday Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holidays.map((holiday, index) => {
              const isUpcoming = holiday.date > today;
              return (
                <TableRow key={index}>
                  <TableCell
                    className={`border-l-4 p-2 ${
                      isUpcoming ? "border-[#7152F3]" : "border-[#A2A1A832]"
                    }`}
                  >
                    {holiday.date}
                  </TableCell>
                  <TableCell className="p-2">{holiday.day}</TableCell>
                  <TableCell className="p-2">{holiday.name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        
      {/* Pagination Section */}
      <div className="flex gap-4 items-center pt-4">
          <div className="flex items-center mb-3">
            <span className="w-2 h-2 rounded-full bg-[#7152F3] mr-2"></span>
            <h2 className="text-sm font-semibold">Upcoming</h2>
          </div>
          <div className="flex items-center mb-3">
            <span className="w-2 h-2 rounded-full bg-[#A2A1A816] mr-2"></span>
            <h2 className="text-sm font-semibold">Past Holidays</h2>
          </div>
      </div>
      </div>
    </div>
  );
};

export default Holidays;
