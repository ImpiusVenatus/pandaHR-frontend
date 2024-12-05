import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
  
  const employees = [
    {
      name: "John Doe",
      designation: "Team Lead",
      type: "Office",
      checkInTime: "09:00 AM",
      status: "On Time",
    },
    {
      name: "Jane Smith",
      designation: "Web Designer",
      type: "Remote",
      checkInTime: "09:15 AM",
      status: "Late",
    },
    {
      name: "Michael Brown",
      designation: "Medical Assistant",
      type: "Office",
      checkInTime: "08:45 AM",
      status: "On Time",
    },
    {
      name: "Emily Davis",
      designation: "React JS Developer",
      type: "Remote",
      checkInTime: "10:00 AM",
      status: "Late",
    },
    {
      name: "Chris Wilson",
      designation: "UI/UX Designer",
      type: "Office",
      checkInTime: "08:50 AM",
      status: "On Time",
    },
    {
      name: "Patricia Taylor",
      designation: "Project Manager",
      type: "Remote",
      checkInTime: "09:05 AM",
      status: "On Time",
    },
    {
      name: "Daniel Martinez",
      designation: "React JS Developer",
      type: "Office",
      checkInTime: "09:30 AM",
      status: "Late",
    },
    {
      name: "Sarah Jackson",
      designation: "Marketing Specialist",
      type: "Remote",
      checkInTime: "09:10 AM",
      status: "On Time",
    },
    {
      name: "David Lee",
      designation: "Backend Developer",
      type: "Office",
      checkInTime: "08:55 AM",
      status: "On Time",
    },
    {
      name: "Laura Harris",
      designation: "HR Manager",
      type: "Office",
      checkInTime: "09:20 AM",
      status: "Late",
    },
  ]
  
  export function AttendanceTable() {
    return (
   <div>
     <div className="flex justify-between py-4">
        <h2 className="text-2xl">Attendance Overview</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="bg-transparent">
            <Button variant="outline" className="text-sm">
              View All
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#16151C]">
            <DropdownMenuItem onClick={() => {}}>
              Today
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>
              Past 7 Days
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>
              Past 15 Days
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>
              Past 30 Days
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee Name</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Check In Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.name}>
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell>{employee.designation}</TableCell>
              <TableCell>{employee.type}</TableCell>
              <TableCell>{employee.checkInTime}</TableCell>
              <TableCell>
                <span className={`inline-block text-[11px] text-center ${
                  employee.status === "On Time"
                    ? "bg-[#3FC28A16] text-[#3FC28A]"
                    : "bg-[#F45B6916] text-[#F45B69]"
                } px-2 py-1 rounded-md`}>{employee.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell>{employees.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
   </div>
    )
  }
  