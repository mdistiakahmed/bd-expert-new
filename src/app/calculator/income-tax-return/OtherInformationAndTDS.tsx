import React from "react";
import { TextField } from "@mui/material";

const OtherInformationAndTDS = ({ register, errors }: any) => (
  <div className="mb-6 p-4 bg-white shadow rounded">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Block - Other Information */}
      <div className="p-4 bg-gray-50 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          Other Information (IT-10B 2023)
        </h2>
        <div className="grid gap-4">
          {[
            "All Receipts not fall under above Income",
            "Net Wealth at the Last Date of Previous Income Year",
            "(Expense, Gift, Loss which is not mentioned in IT-10BB)",
            "Institutional Loan",
            "Non-Institutional Loan",
            "Other Loan",
            "Directors Shareholdings in Limited Companies",
            "Closing Capital in Partnership Firm",
            "(Non Agricultural Property, at Cost + Other Acquisition Cost)",
            "Location & Details of Non Agricultural Property",
            "Agricultural Property, at Cost + Other Acquisition Cost",
            "Location & Details of Agricultural Property",
            "(Share, Debenture, Bond, Securities, Unit Certificate)",
            "(Saving Certificate, DPS)",
            "Loan Given",
            "Name of Loan Receiver",
            "NID of Loan Receiver",
            "(Fixed Deposit, Term Deposit)",
            "Provident Fund or Other Fund",
            "Other Investments (If Any)",
            "Motor Vehicle (at Cost)",
            "Motor Vehicle Quantity",
            "Type of Vehicle",
            "Registration No",
            "(Jewellery , at cost)",
            "Jewellery Quantity (Vori)",
            "(Furniture and Electrical Equipment, at cost)",
            "Cash in Hand",
            "Cash at Bank",
            "Cost of Wealth outside Bangladesh",
          ].map((label, index) => (
            <TextField
              key={index}
              fullWidth
              label={label}
              type="text"
              size="small"
              {...register(`otherInfo${index + 1}`)}
              // error={!!errors[`otherInfo${index + 1}`]}
              // helperText={errors[`otherInfo${index + 1}`] ? "This field is required" : ""}
            />
          ))}
        </div>
      </div>

      {/* Right Side Blocks */}
      <div className="grid gap-6">
        {/* First Block - TDS On Income (Which Regular Tax Applicable) */}
        <div className="p-4 bg-gray-50 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">
            TDS On Income (Which Regular Tax Applicable)
          </h2>
          <div className="grid gap-4">
            {[
              "TDS on Salary (Section-86)",
              "TDS on Life Insurance Benefit (Section-99)",
              "TDS ON Post Office Saving Account (Section-103)",
              "TDS On Rent (Section-109)",
              "Tax Collected on Trade License Renew (Section-131)",
              "Tax Collected on Vehicle Fitness (Section-153)",
              "Other TDS which regular tax applicable",
              "Other Tax Collected which regular tax applicable",
            ].map((label, index) => (
              <TextField
                key={index}
                fullWidth
                label={label}
                type="text"
                size="small"
                {...register(`tdsRegular${index + 1}`)}
                // error={!!errors[`tdsRegular${index + 1}`]}
                // helperText={errors[`tdsRegular${index + 1}`] ? "This field is required" : ""}
              />
            ))}
          </div>
        </div>

        {/* Second Block - TDS On Income (Which Minimum Tax Applicable) */}
        <div className="p-4 bg-gray-50 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">
            TDS On Income (Which Minimum Tax Applicable)
          </h2>
          <div className="grid gap-4">
            {[
              "TDS on Contractors & Sub Contractors (Section-89)",
              "TDS on Professional Service (Section-90)",
              "TDS On Fixed / Term Deposit (Section-102)",
              "TDS On Bank Interest / Profit (Section-102)",
              "TDS On Dividend (Section-117)",
              "Other TDS which minimum tax applicable",
              "Other Tax Collected which minimum tax applicable",
            ].map((label, index) => (
              <TextField
                key={index}
                fullWidth
                label={label}
                type="text"
                size="small"
                {...register(`tdsMinimum${index + 1}`)}
                // error={!!errors[`tdsMinimum${index + 1}`]}
                // helperText={errors[`tdsMinimum${index + 1}`] ? "This field is required" : ""}
              />
            ))}
          </div>
        </div>

        {/* Third Block - TDS On Income (Which Final Tax Applicable) */}
        <div className="p-4 bg-gray-50 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">
            TDS On Income (Which Final Tax Applicable)
          </h2>
          <div className="grid gap-4">
            {[
              "TDS On Saving Certificate Interest (Section-105)",
              "Tax Collected On Properties Transfer (Section-125)",
              "Other TDS which Final Tax applicable",
            ].map((label, index) => (
              <TextField
                key={index}
                fullWidth
                label={label}
                type="text"
                size="small"
                {...register(`tdsFinal${index + 1}`)}
                // error={!!errors[`tdsFinal${index + 1}`]}
                // helperText={errors[`tdsFinal${index + 1}`] ? "This field is required" : ""}
              />
            ))}
          </div>
        </div>

        {/* Fourth Block - Tax Payment Information */}
        <div className="p-4 bg-gray-50 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">
            Tax Payment Information
          </h2>
          <div className="grid gap-4">
            {[
              "Adjustment of Previous Excess Tax",
              "Tax Payment Challan Number (Section-173)",
              "Tax Payment Challan Date (Section-173)",
              "Environmental Surcharge",
            ].map((label, index) => (
              <TextField
                key={index}
                fullWidth
                label={label}
                type="text"
                size="small"
                {...register(`taxPayment${index + 1}`)}
                // error={!!errors[`taxPayment${index + 1}`]}
                // helperText={errors[`taxPayment${index + 1}`] ? "This field is required" : ""}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default OtherInformationAndTDS;
