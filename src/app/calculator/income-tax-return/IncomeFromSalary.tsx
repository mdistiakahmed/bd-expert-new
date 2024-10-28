import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const IncomeFromSalary = ({ register, errors }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 bg-gray-100 rounded shadow">
    {/* Left Column */}
    <div className="space-y-6">
      {/* Income From Salary (Section - 32) */}
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
              {...register(`salary${index + 1}`)}
            />
          ))}
        </div>
      </div>

      {/* Income From Agriculture (Section - 40) */}
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-4">
          Income From Agriculture (Section - 40)
        </h2>
        <div className="grid gap-4">
          {[
            "Type of Agriculture",
            "Sale/Turnover/Receipt",
            "Gross Profit",
            "General Expense",
          ].map((label, index) => (
            <TextField
              key={index}
              fullWidth
              label={label}
              type="text"
              size="small"
              {...register(`agricultureIncome${index + 1}`)}
            />
          ))}
        </div>
      </div>
    </div>

    {/* Right Column with additional sections */}
    <div className="space-y-6">
      {/* Income From Profit in a Firm (Section - 31) */}
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-4">
          Income From Profit in a Firm (Section - 31)
        </h2>
        <div className="grid gap-4">
          {[
            "Salary or other Receipt From Firm by the Assessee",
            "Salary or other Receipt From Firm by All Partners",
            "Total Income of Firm",
            "Share of Partnership of Assessee (%)",
          ].map((label, index) => (
            <TextField
              key={index}
              fullWidth
              label={label}
              type="number"
              size="small"
              {...register(`firmIncome${index + 1}`)}
            />
          ))}

          <FormControl fullWidth size="small">
            <InputLabel>Tax Paid on Total Income by the Firm?</InputLabel>
            <Select
              {...register("firmTaxPaid")}
              label="Tax Paid on Total Income by the Firm?"
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {/* Other Income (Which Regular Tax Applicable) */}
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-4">
          Other Income (Which Regular Tax Applicable)
        </h2>
        <div className="grid gap-4">
          {[
            "Royalty (section-66)",
            "License Fee (section -66)",
            "Technical Know How Fee (Section 66)",
            "Cash Incentives (section - 66)",
            "Income From Minor Child or Spouse (Section - 31)",
            "Overseas Income (section - 66)",
            "Income From Other Source (Section - 66)",
            "Capital Gain (section - 57)",
          ].map((label, index) => (
            <TextField
              key={index}
              fullWidth
              label={label}
              type="number"
              size="small"
              {...register(`regularTaxIncome${index + 1}`)}
            />
          ))}
        </div>
      </div>

      {/* Other Income (Which Minimum Tax Applicable) */}
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-4">
          Other Income (Which Minimum Tax Applicable)
        </h2>
        <div className="grid gap-4">
          {[
            "Signing/Subsistence Money (section - 66)",
            "Other Income (Which Minimum Tax Applicable)",
          ].map((label, index) => (
            <TextField
              key={index}
              fullWidth
              label={label}
              type="number"
              size="small"
              {...register(`minimumTaxIncome${index + 1}`)}
            />
          ))}
        </div>
      </div>

      {/* Other Income (Which Final Tax Applicable) */}
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-4">
          Other Income (Which Final Tax Applicable)
        </h2>
        <div className="grid gap-4">
          {[
            "Interest From Saving Certificate",
            "Gain on Property Sale/Transfer (Section - 66)",
            "Other Income (Which Final Tax Applicable)",
          ].map((label, index) => (
            <TextField
              key={index}
              fullWidth
              label={label}
              type="number"
              size="small"
              {...register(`finalTaxIncome${index + 1}`)}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default IncomeFromSalary;
