"use client";

import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import {
  MenuItem,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Button,
} from "@mui/material";

export default function IncomeTaxCalculator() {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      name: "",
      tin: "",
      classification: "",
      location: "",
      employment: {
        monthlySalary: "",
        bonus: "",
        exemption: "",
        monthsWorked: "",
        monthlyTaxDeductible: "",
      },
      additionalIncomeSources: [],
    },
  });

  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: "additionalIncomeSources",
  });

  const [calculatedValues, setCalculatedValues] = useState({
    grossTax: 0,
    taxRebate: 0,
    netTax: 0,
    minimumTax: 0,
    taxPayable: 0,
  });

  const onSubmit = (data: any) => {
    console.log(data);
    const salary = parseFloat(data.employment.monthlySalary || "0");
    const bonus = parseFloat(data.employment.bonus || "0");
    const exemption = parseFloat(data.employment.exemption || "0");
    const monthsWorked = parseInt(data.employment.monthsWorked || "0");

    const totalIncome = salary * monthsWorked + bonus - exemption;
    const grossTax = totalIncome * 0.1;
    const taxRebate = grossTax * 0.2;
    const netTax = grossTax - taxRebate;
    const minimumTax = 500;
    const taxPayable = Math.max(netTax, minimumTax);

    setCalculatedValues({
      grossTax,
      taxRebate,
      netTax,
      minimumTax,
      taxPayable,
    });
  };

  return (
    <div className="p-6 md:mx-10">
      <Typography variant="h6" className=" mb-4">
        Income Tax Return Calculator (Income Year: 2024 - 2025)
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* User Info Section */}
        <Box
          className="p-4 border rounded-md mb-6"
          sx={{ borderColor: "grey.300" }}
        >
          <Typography variant="h6" className="mb-3">
            User Information
          </Typography>
          <Box className="grid gap-4 md:grid-cols-2">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              )}
            />
            <Controller
              name="tin"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="TIN"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              )}
            />
            <Controller
              name="classification"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel size="small">
                    Classification of Taxpayers
                  </InputLabel>
                  <Select
                    {...field}
                    label="Classification of Taxpayers"
                    size="small"
                  >
                    <MenuItem value="Individual Taxpayers">
                      Individual Taxpayers
                    </MenuItem>
                    <MenuItem value="Women and senior citizen(65+)">
                      Women and senior citizen(65+)
                    </MenuItem>
                    <MenuItem value="Third Gender and Physically Challenged">
                      Third Gender and Physically Challenged
                    </MenuItem>
                    <MenuItem value="Gazetted war-wounded freedom fighters">
                      Gazetted war-wounded freedom fighters
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel size="small">
                    Location of Income Generation
                  </InputLabel>
                  <Select
                    {...field}
                    label="Location of Income Generation"
                    size="small"
                  >
                    <MenuItem value="Dhaka and Chattogram city Corporation">
                      Dhaka and Chattogram city Corporation
                    </MenuItem>
                    <MenuItem value="Any other city corporation">
                      Any other city corporation
                    </MenuItem>
                    <MenuItem value="Other than city corporation area">
                      Other than city corporation area
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Box>
        </Box>

        {/* Income from Employment Section */}
        <Box
          className="p-4 border rounded-md mb-6"
          sx={{ borderColor: "grey.300" }}
        >
          <Typography variant="h6" className=" mb-3">
            Income from Employment
          </Typography>
          <Box className="grid gap-4 md:grid-cols-2">
            <Controller
              name="employment.monthlySalary"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Monthly Salary (BDT)"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              )}
            />
            <Controller
              name="employment.bonus"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Bonus (BDT)"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              )}
            />
            <Controller
              name="employment.exemption"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Exemption from Salary (BDT)"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              )}
            />
            <Controller
              name="employment.monthsWorked"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel size="small">Number of Months Worked</InputLabel>
                  <Select
                    {...field}
                    label="Number of Months Worked"
                    size="small"
                  >
                    {[...Array(12)].map((_, i) => (
                      <MenuItem key={i + 1} value={i + 1}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="employment.monthlyTaxDeductible"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Monthly Tax Deductible Amount (BDT)"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              )}
            />
          </Box>
        </Box>

        {/* Additional Income Sources */}
        <section className="mt-6">
          <h2 className="text-xl  mb-3 ">Additional Income Sources</h2>
          {fields.map((item, index) => (
            <div key={item.id} className="grid gap-4 mb-4 md:grid-cols-2">
              <Controller
                name={`additionalIncomeSources[${index}].source` as any}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel size="small">Select Income Source</InputLabel>
                    <Select
                      {...field}
                      label="Select Income Source"
                      size="small"
                    >
                      <MenuItem value="Income From Rent (Annex Schedule 2)">
                        Income From Rent (Annex Schedule 2)
                      </MenuItem>
                      <MenuItem value="Income From Agriculture (Annex Schedule 3)">
                        Income From Agriculture (Annex Schedule 3)
                      </MenuItem>
                      <MenuItem value="Income From Business (Annex Schedule 4)">
                        Income From Business (Annex Schedule 4)
                      </MenuItem>
                      <MenuItem value="Income From Capital Gain">
                        Income From Capital Gain
                      </MenuItem>
                      <MenuItem value="Income From Financial Assets">
                        Income From Financial Assets
                      </MenuItem>
                      <MenuItem value="Income From Other Sources">
                        Income From Other Sources
                      </MenuItem>
                      <MenuItem value="Share of Income from Firm or AoP">
                        Share of Income from Firm or AoP
                      </MenuItem>
                      <MenuItem value="Income of Minor or Spouse (if not Taxpayer)">
                        Income of Minor or Spouse (if not Taxpayer)
                      </MenuItem>
                      <MenuItem value="Taxable Income from Abroad">
                        Taxable Income from Abroad
                      </MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name={`additionalIncomeSources[${index}].amount` as any}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Amount (BDT)"
                    type="number"
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                )}
              />
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => remove(index)}
                className="col-span-2"
              >
                Remove Income Source
              </Button>
            </div>
          ))}
          <Button
            onClick={() => append({ source: "", amount: "" })}
            variant="outlined"
          >
            Add Additional Income Source
          </Button>
        </section>

        <button
          type="submit"
          className="border p-2 px-4 bg-blue-500 text-white font-bold my-10"
        >
          Calcuate Tax
        </button>

        {/* Calculation Results */}
        <Box
          className="p-4 border rounded-md mt-6"
          sx={{ backgroundColor: "grey.100" }}
        >
          <Typography variant="h6" className="font-semibold mb-3">
            Output (Calculated Values)
          </Typography>
          <Box className="grid gap-4 md:grid-cols-2">
            <Typography>
              Gross Tax: BDT {calculatedValues.grossTax.toFixed(2)}
            </Typography>
            <Typography>
              Tax Rebate: BDT {calculatedValues.taxRebate.toFixed(2)}
            </Typography>
            <Typography>
              Net Tax: BDT {calculatedValues.netTax.toFixed(2)}
            </Typography>
            <Typography>
              Minimum Tax: BDT {calculatedValues.minimumTax.toFixed(2)}
            </Typography>
            <Typography>
              Tax Payable: BDT {calculatedValues.taxPayable.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </form>
    </div>
  );
}
