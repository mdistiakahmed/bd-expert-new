import React from "react";
import { TextField } from "@mui/material";

const IncomeFromSalary = ({ register, errors }: any) => (
  <div className="mb-6 p-4 bg-white shadow rounded">
    <h2 className="text-xl font-semibold mb-4">
      Income From Salary (Section - 32)
    </h2>
    <div className="grid gap-4">
      {[
        "Basic Pay",
        "Arrear Salary",
        "Special Pay",
        "House Rent Allowance",
        "Medical Allowance",
        "Conveyance Allowance",
        "Festival Bonus",
        "Servant Allowance",
        "Leave Allowance",
        "Honorium/Reward/Fee",
        "Overtime Allowance",
        "Bangla New Year Allowance",
        "Employee's Contribution to Recognized Provident Fund",
        "Interest Accrued on Recognized Provident Fund",
        "Festival Allowance",
        "Accommodation Facility Provided by Employer",
        "Transportation Facility Provided by Employer",
        "Gratuity",
        "Others",
      ].map((label, index) => (
        <TextField
          key={index}
          fullWidth
          label={label}
          type="number"
          size="small"
          {...register(`salary${index + 1}`, { required: true })}
          error={!!errors[`salary${index + 1}`]}
          helperText={
            errors[`salary${index + 1}`] ? "This field is required" : ""
          }
        />
      ))}
    </div>
  </div>
);

export default IncomeFromSalary;
