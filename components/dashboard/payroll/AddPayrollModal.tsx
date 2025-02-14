import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useEmployee from "@/lib/hooks/employee/useEmployee";

// interface Employee {
//   _id: string;
//   name: string;
//   department: string;
//   designation: string;
//   type: "Full-Time" | "Part-Time" | "Contract";
//   status: "Active" | "Inactive";
//   companyId: string;
// }

interface Payroll {
  [employeeId: string]: {
    employeeId: string;
    salaryPerMonth: number;
    ctc: number;
  };
}

const AddPayrollModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { employees, getAllEmployees } = useEmployee();
  const [payroll, setPayroll] = useState<Payroll>({});
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );

  useEffect(() => {
    getAllEmployees();
  }, []);

  const handleSalaryChange = (salary: number) => {
    if (selectedEmployeeId) {
      setPayroll((prev) => ({
        ...prev,
        [selectedEmployeeId]: {
          employeeId: selectedEmployeeId,
          salaryPerMonth: salary,
          ctc: salary * 12,
        },
      }));
    }
  };

  const handleSelectEmployee = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
  };

  const handleSubmit = () => {
    if (selectedEmployeeId) {
      console.log("Payroll Data for Employee:", payroll[selectedEmployeeId]);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger className="hidden"></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Payroll</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {employees.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {employees.map((employee) => (
                <div
                  key={employee._id}
                  className={`p-2 cursor-pointer rounded-md ${
                    selectedEmployeeId === employee._id
                      ? "bg-purple-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleSelectEmployee(employee._id)}
                >
                  {employee.name}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No employees available</p>
          )}

          {selectedEmployeeId && (
            <div className="mt-4">
              <p className="mb-2">
                Enter Salary for{" "}
                {employees.find((emp) => emp._id === selectedEmployeeId)?.name}
              </p>
              <Input
                type="number"
                value={payroll[selectedEmployeeId]?.salaryPerMonth || ""}
                onChange={(e) => handleSalaryChange(Number(e.target.value))}
                placeholder="Salary per Month"
                className="mb-2"
              />
              <Input
                type="number"
                value={payroll[selectedEmployeeId]?.ctc || ""}
                readOnly
                className="cursor-not-allowed mb-2"
                placeholder="CTC"
              />
              <Button
                className="w-full bg-[#7152F3] text-white hover:bg-[#5b41d3]"
                onClick={handleSubmit}
              >
                Add
              </Button>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPayrollModal;
