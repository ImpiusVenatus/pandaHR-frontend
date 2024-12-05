import * as React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const sampleData = [
  { day: "Mon", attendance: 90 },
  { day: "Tue", attendance: 85 },
  { day: "Wed", attendance: 80 },
  { day: "Thu", attendance: 95 },
  { day: "Fri", attendance: 88 },
  { day: "Sat", attendance: 70 },
  { day: "Sun", attendance: 75 },
];

export function AttendanceChart() {
  const [chartData, setChartData] = React.useState(sampleData);
  const [selectedRange, setSelectedRange] = React.useState("Today");

  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
    const randomData = Array.from({ length: 7 }, (_, index) => ({
      day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index],
      attendance: Math.floor(Math.random() * 31) + 70,
    }));
    setChartData(randomData);
  };

  return (
    <Card className="bg-transparent w-full h-full">
      <CardHeader className="flex flex-row justify-between px-6 py-4">
        <CardTitle className="text-2xl">Attendance Overview</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="bg-transparent">
            <Button variant="outline" className="text-sm">
              {selectedRange}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#16151C]">
            <DropdownMenuItem onClick={() => handleRangeChange("Today")}>
              Today
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRangeChange("Past 7 Days")}>
              Past 7 Days
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRangeChange("Past 15 Days")}>
              Past 15 Days
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRangeChange("Past 30 Days")}>
              Past 30 Days
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ left: 12, right: 12 }}>
            
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <YAxis
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              tickLine={false}
              axisLine={false}
            />
            <Bar dataKey="attendance" fill="#7152F3" barSize={20}/>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
