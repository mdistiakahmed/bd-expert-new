import React from "react";
import { TextField } from "@mui/material";

const LifeStyleExpense = ({ register, errors }: any) => (
  <div className="mb-6 p-4 bg-white shadow rounded">
    <h2 className="text-xl font-semibold mb-4">Life Style Expense</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="w-1/3 p-2 border-b-2 border-gray-300 bg-gray-100 text-left">
              Particulars
            </th>
            <th className="w-1/4 p-2 border-b-2 border-gray-300 bg-gray-100 text-left">
              Amount
            </th>
            <th className="w-1/3 p-2 border-b-2 border-gray-300 bg-gray-100 text-left">
              Remarks
            </th>
          </tr>
        </thead>
        <tbody>
          {[
            "Personal & Family Life Expense",
            "Accommodation Expense",
            "Personal Transport Expenses",
            "Utility Expense (Electricity, Gas, Wasa, Telephone, Mobile, Internet etc)",
            "Education Expense for Children",
            "Travel Expense at Own Cost",
            "Festival and Other Special Expense",
            "Tax Deducted / Collected at Source (Including TDS on Saving Certificate)",
            "Tax & Surcharge on Last Year's Return",
            "Interest Paid on Personal Loan from Financial Institution or Any Other Source",
          ].map((label, index) => (
            <tr key={index}>
              <td className="p-2 border-b border-gray-200">{label}</td>
              <td className="p-2 border-b border-gray-200">
                <TextField
                  fullWidth
                  type="number"
                  size="small"
                  {...register(`expenseAmount${index + 1}`)}
                  // error={!!errors[`expenseAmount${index + 1}`]}
                  // helperText={errors[`expenseAmount${index + 1}`] ? "This field is required" : ""}
                />
              </td>
              <td className="p-2 border-b border-gray-200">
                <TextField
                  fullWidth
                  type="text"
                  size="small"
                  {...register(`expenseRemarks${index + 1}`)}
                  // error={!!errors[`expenseRemarks${index + 1}`]}
                  // helperText={errors[`expenseRemarks${index + 1}`] ? "This field is required" : ""}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default LifeStyleExpense;
