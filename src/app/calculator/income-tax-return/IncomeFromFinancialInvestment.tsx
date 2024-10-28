import React from "react";
import { TextField } from "@mui/material";

const IncomeFromFinancialInvestment = ({ register, errors }: any) => (
  <div className="mb-6 p-4 bg-white shadow rounded">
    <h2 className="text-xl font-semibold mb-4">
      Income From Financial Investment (Section 62)
    </h2>
    <div className="grid gap-4">
      {[
        "Interest/Profit From DPS",
        "Interest/Profit from FDR",
        "Post Office Saving Account",
        "Interest From Securities",
        "Income From Bank Interest/Profit",
        "Income From Dividend",
        "Income From Other Financial Investment",
      ].map((label, index) => (
        <TextField
          key={index}
          fullWidth
          label={label}
          type="number"
          size="small"
          {...register(`investment${index + 1}`)}
          //   error={!!errors[`investment${index + 1}`]}
          //   helperText={
          //     errors[`investment${index + 1}`] ? "This field is required" : ""
          //   }
        />
      ))}
    </div>
  </div>
);

export default IncomeFromFinancialInvestment;
