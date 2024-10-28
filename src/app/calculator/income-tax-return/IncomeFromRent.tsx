import React from "react";
import { TextField } from "@mui/material";

const IncomeFromRent = ({ register, errors }: any) => (
  <div className="mb-6 p-4 bg-white shadow rounded">
    <h2 className="text-xl font-semibold mb-4">
      Income From Rent (Section 35)
    </h2>
    <div className="overflow-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 w-1/4">Occupied</th> {/* Made wider */}
            <th className="border p-2">Area</th>
            <th className="border p-2 w-1/4">Size (Sq Ft)</th>{" "}
            {/* Made wider */}
            <th className="border p-2">Annual Rent Received</th>
          </tr>
        </thead>
        <tbody>
          {/* Self Occupied */}
          <tr>
            <td rowSpan={2} className="border p-2 text-center font-medium">
              Self Occupied
            </td>
            <td className="border p-2">In Corporation Area</td>
            <td className="border p-2">
              <TextField
                fullWidth
                type="number"
                size="small"
                {...register("selfOccupiedCorpSize")}
                placeholder="Size (Sq Ft)"
              />
            </td>
            <td className="border p-2">
              <TextField
                fullWidth
                type="number"
                size="small"
                {...register("selfOccupiedCorpRent")}
                placeholder="Annual Rent Received"
              />
            </td>
          </tr>
          <tr>
            <td className="border p-2">In Other Area</td>
            <td className="border p-2">
              <TextField
                fullWidth
                type="number"
                size="small"
                {...register("selfOccupiedOtherSize")}
                placeholder="Size (Sq Ft)"
              />
            </td>
            <td className="border p-2">
              <TextField
                fullWidth
                type="number"
                size="small"
                {...register("selfOccupiedOtherRent")}
                placeholder="Annual Rent Received"
              />
            </td>
          </tr>

          {/* Residential */}
          <tr>
            <td rowSpan={2} className="border p-2 text-center font-medium">
              Residential
            </td>
            <td className="border p-2">In Corporation Area</td>
            <td className="border p-2">
              <TextField
                fullWidth
                type="number"
                size="small"
                {...register("residentialCorpSize")}
                placeholder="Size (Sq Ft)"
              />
            </td>
            <td className="border p-2">
              <TextField
                fullWidth
                type="number"
                size="small"
                {...register("residentialCorpRent")}
                placeholder="Annual Rent Received"
              />
            </td>
          </tr>
          <tr>
            <td className="border p-2">In Other Area</td>
            <td className="border p-2">
              <TextField
                fullWidth
                type="number"
                size="small"
                {...register("residentialOtherSize")}
                placeholder="Size (Sq Ft)"
              />
            </td>
            <td className="border p-2">
              <TextField
                fullWidth
                type="number"
                size="small"
                {...register("residentialOtherRent")}
                placeholder="Annual Rent Received"
              />
            </td>
          </tr>

          {/* Commercial */}
          <tr>
            <td rowSpan={2} className="border p-2 text-center font-medium">
              Commercial
            </td>
            <td className="border p-2">In Corporation Area</td>
            <td className="border p-2">
              <TextField
                fullWidth
                type="number"
                size="small"
                {...register("commercialCorpSize")}
                placeholder="Size (Sq Ft)"
              />
            </td>
            <td className="border p-2">
              <TextField
                fullWidth
                type="number"
                size="small"
                {...register("commercialCorpRent")}
                placeholder="Annual Rent Received"
              />
            </td>
          </tr>
          <tr>
            <td className="border p-2">In Other Area</td>
            <td className="border p-2">
              <TextField
                fullWidth
                type="number"
                size="small"
                {...register("commercialOtherSize")}
                placeholder="Size (Sq Ft)"
              />
            </td>
            <td className="border p-2">
              <TextField
                fullWidth
                type="number"
                size="small"
                {...register("commercialOtherRent")}
                placeholder="Annual Rent Received"
              />
            </td>
          </tr>

          {/* Additional Row */}
          <tr>
            <td colSpan={2} className="border p-2 font-medium bg-gray-50">
              <div className="grid grid-cols-1 gap-4">
                <TextField
                  fullWidth
                  label="Advance Rent"
                  type="number"
                  size="small"
                  {...register("advanceRent")}
                />
                <TextField
                  fullWidth
                  label="Any Other Receipt (Not Included in Rent)"
                  type="number"
                  size="small"
                  {...register("otherReceipt")}
                />
                <TextField
                  fullWidth
                  label="Adjusted Advance Rent"
                  type="number"
                  size="small"
                  {...register("adjustedAdvanceRent")}
                />
                <TextField
                  fullWidth
                  label="Vacancy Allowance"
                  type="number"
                  size="small"
                  {...register("vacancyAllowance")}
                />
                <TextField
                  fullWidth
                  label="Assessee's Portion (%)"
                  type="number"
                  size="small"
                  {...register("assesseePortion")}
                />
              </div>
            </td>
            <td colSpan={2} className="border p-2 font-medium bg-gray-50">
              <div className="grid grid-cols-1 gap-4">
                <TextField
                  fullWidth
                  label="Municipal or Local Tax"
                  type="number"
                  size="small"
                  {...register("municipalTax")}
                />
                <TextField
                  fullWidth
                  label="Land Revenue"
                  type="number"
                  size="small"
                  {...register("landRevenue")}
                />
                <TextField
                  fullWidth
                  label="Interest on Loan/Mortgage/Capital Charge"
                  type="number"
                  size="small"
                  {...register("interestOnLoan")}
                />
                <TextField
                  fullWidth
                  label="Insurance Premium"
                  type="number"
                  size="small"
                  {...register("insurancePremium")}
                />
                <TextField
                  fullWidth
                  label="Other Expense"
                  type="number"
                  size="small"
                  {...register("otherExpense")}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default IncomeFromRent;
