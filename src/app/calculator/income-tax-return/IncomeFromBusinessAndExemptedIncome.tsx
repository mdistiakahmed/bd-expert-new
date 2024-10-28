import React from "react";
import { TextField } from "@mui/material";

const IncomeFromBusinessAndExemptedIncome = ({ register, errors }: any) => (
  <div className="mb-6 p-4 bg-white">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Block - Income From Business */}
      <div className="p-4 border">
        <h2 className="text-xl font-semibold mb-4">
          Income From Business (Section 45)
        </h2>
        <div className="grid gap-4">
          {[
            "Sale/Turnover/Receipt",
            "Gross Profit",
            "General, Administrative, Sales & Other Related Expense",
            "Bad Debt Expense",
            "Cash in Hand & Bank Balance",
            "Closing Inventory",
            "Fixed Assets",
            "Other Assets",
            "Opening Capital",
            "Withdrawals in the Income Year",
            "Liabilities",
          ].map((label, index) => (
            <TextField
              key={index}
              fullWidth
              label={label}
              type="number"
              size="small"
              {...register(`businessIncome${index + 1}`)}
              // error={!!errors[`businessIncome${index + 1}`]}
              // helperText={errors[`businessIncome${index + 1}`] ? "This field is required" : ""}
            />
          ))}
        </div>
      </div>

      {/* Right Block - Exempted Income */}
      <div className="p-4 border">
        <h2 className="text-xl font-semibold mb-4">
          Exempted Income (Schedule - 6)
        </h2>
        <div className="grid gap-4">
          {[
            "Foreign Remittance",
            "Software & IT Business",
            "Export of Handicrafts",
            "Tax Exempted Bond or Securities",
            "Govt Welfare Allowance",
            "Rewards From Govt",
            "Other Exemption Under 6th Schedule",
            "Other Exemption by SRO",
          ].map((label, index) => (
            <TextField
              key={index}
              fullWidth
              label={label}
              type="number"
              size="small"
              {...register(`exemptedIncome${index + 1}`)}
              // error={!!errors[`exemptedIncome${index + 1}`]}
              // helperText={errors[`exemptedIncome${index + 1}`] ? "This field is required" : ""}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default IncomeFromBusinessAndExemptedIncome;
