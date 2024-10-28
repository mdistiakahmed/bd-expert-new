import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const ReturnAssessmentInfo = ({ register, errors }: any) => (
  <div className="mb-6 p-4 bg-white shadow rounded">
    <h2 className="text-xl font-semibold mb-4">
      Return Assessment Information
    </h2>
    <div className="grid gap-4">
      <FormControl fullWidth size="small">
        <InputLabel>Assessee Nature</InputLabel>
        <Select
          {...register("assesseeNature", { required: true })}
          label="Assessee Nature"
        >
          <MenuItem value="individual">Individual</MenuItem>
          <MenuItem value="company">Company</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Taxpayer&apos;s Status</InputLabel>
        <Select
          {...register("taxpayerStatus", { required: true })}
          label="Taxpayer's Status"
        >
          <MenuItem value="resident">Resident</MenuItem>
          <MenuItem value="non-resident">Non-Resident</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Employment Type</InputLabel>
        <Select
          {...register("employmentType", { required: true })}
          label="Employment Type"
        >
          <MenuItem value="salaried">Salaried</MenuItem>
          <MenuItem value="self-employed">Self-Employed</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Income Area</InputLabel>
        <Select
          {...register("incomeArea", { required: true })}
          label="Income Area"
        >
          <MenuItem value="domestic">Domestic</MenuItem>
          <MenuItem value="foreign">Foreign</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Statement as On"
        type="date"
        size="small"
        InputLabelProps={{ shrink: true }}
        {...register("statementAsOn", { required: true })}
      />

      <TextField
        fullWidth
        label="Tax Day"
        type="date"
        size="small"
        InputLabelProps={{ shrink: true }}
        {...register("taxDay", { required: true })}
      />
    </div>
  </div>
);

export default ReturnAssessmentInfo;
