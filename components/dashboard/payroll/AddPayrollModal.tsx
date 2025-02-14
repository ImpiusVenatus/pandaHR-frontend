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
import usePayroll from "@/lib/hooks/company/usePayroll";

// Payroll interface for form state
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
  const { createPayroll, error } = usePayroll();

  const [payroll, setPayroll] = useState<Payroll>({});
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );
  const [submitting, setSubmitting] = useState<boolean>(false);

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

  const handleSubmit = async () => {
    if (!selectedEmployeeId) return;

    const payrollData = payroll[selectedEmployeeId];

    if (!payrollData || payrollData.salaryPerMonth <= 0) {
      alert("Please enter a valid salary.");
      return;
    }

    const formattedPayrollData = {
      employeeId: payrollData.employeeId,
      monthlySalary: payrollData.salaryPerMonth, // Renamed to match CreatePayrollData
      CTC: payrollData.ctc, // Renamed to match CreatePayrollData
    };

    try {
      setSubmitting(true);
      console.log("Creating payroll:", formattedPayrollData);
      await createPayroll(formattedPayrollData);
      onClose(); // Close modal on success
    } catch (err) {
      console.error("Error creating payroll:", err);
    } finally {
      setSubmitting(false);
    }
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
                      ? "bg-[#7152F3] text-white border border-[#7152F3]"
                      : "border border-gray-600"
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
                disabled={submitting}
              >
                {submitting ? "Adding..." : "Add"}
              </Button>
            </div>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPayrollModal;
