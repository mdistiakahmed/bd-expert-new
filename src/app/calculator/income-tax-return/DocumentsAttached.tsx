import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const DocumentsAttached = ({ register, errors }: any) => (
  <div className="mb-6 p-4 bg-white shadow rounded">
    <h2 className="text-xl font-semibold mb-4">Documents Attached</h2>
    <div className="grid gap-4">
      {[
        "Document 01",
        "Document 02",
        "Document 03",
        "Document 04",
        "Document 05",
      ].map((label, index) => (
        <TextField
          key={index}
          size="small"
          fullWidth
          label={label}
          {...register(`document${index + 1}`)}
        />
      ))}
    </div>
  </div>
);

export default DocumentsAttached;
