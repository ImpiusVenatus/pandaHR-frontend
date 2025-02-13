"use client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import useHoliday from "@/lib/hooks/company/useHoliday";
import useCompany from "@/lib/hooks/company/useCompany";

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const getOrdinal = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  return `${day}${getOrdinal(day)} ${month}, ${year}`;
};

const Holidays = () => {
  const { holidays, loading, getAllHolidays, createHoliday, deleteHoliday } = useHoliday();
  const [newHoliday, setNewHoliday] = useState({ name: "", date: "" });
  const today = getTodayDate();

  const {fetchCompanyIdByUserId} = useCompany();
  const userId = localStorage.getItem("userId");
  const [companyId, setCompanyId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      if (userId) {
        console.log("Fetching companyId for userId:", userId);
        const id = await fetchCompanyIdByUserId(userId);
        console.log("Fetched companyId:", id);
        setCompanyId(id);
      }
    };
    fetchCompany();
  }, [userId]);
  
  useEffect(() => {
    if (companyId) {
      console.log("Fetching holidays for companyId:", companyId);
      getAllHolidays(companyId);
    }
  }, [companyId]);

  const handleCreateHoliday = async () => {
    if (!newHoliday.name || !newHoliday.date) return;
    await createHoliday(companyId, newHoliday);
    setNewHoliday({ name: "", date: "" });
  };

  return (
    <div className="container mx-auto p-4 border border-[#A2A1A816] rounded-md font-dmSans">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Holidays</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 bg-[#7152F3] text-white hover:bg-transparent border border-[#7152F3] hover:text-[#7152F3]">
              <FiPlusCircle /> Add New Holiday
            </Button>
          </DialogTrigger>
          <DialogContent className="w-auto font-dmSans">
            <DialogHeader>
              <DialogTitle>Add New Holiday</DialogTitle>
            </DialogHeader>
            <hr />
            <div className="flex flex-col gap-4 max-w-[250px]">
              <Input
                id="name"
                placeholder="Holiday Name"
                className="w-[240px]"
                value={newHoliday.name}
                onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className="w-[240px] pl-3 text-left font-normal">
                    {newHoliday.date ? newHoliday.date : <span className="text-[#A2A1A8]">Pick a date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    disabled={(date) => date < new Date("1900-01-01")}
                    onSelect={(date) => setNewHoliday({ ...newHoliday, date: date.toISOString().split("T")[0] })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex justify-between gap-2">
              <Button variant={"outline"} className="w-full">Cancel</Button>
              <Button onClick={handleCreateHoliday} className="w-full bg-[#7152F3] text-white">
                Add
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table Section */}
      <div className="rounded-lg overflow-hidden">
        {loading ? (
          <p className="text-center py-4">Loading...</p>
        ) : (
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
                    <TableCell className={`border-l-4 p-2 ${isUpcoming ? "border-[#7152F3]" : "border-[#A2A1A832]"}`}>
                    {formatDate(holiday.date)}
                    </TableCell>
                    <TableCell className="p-2">{new Date(holiday.date).toLocaleDateString("en-US", { weekday: "long" })}</TableCell>
                    <TableCell className="p-2">{holiday.name}</TableCell>
                    <TableCell className="p-2 text-right">
                      <button
                        onClick={() => deleteHoliday(companyId, holiday._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}

        {/* Legend */}
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
