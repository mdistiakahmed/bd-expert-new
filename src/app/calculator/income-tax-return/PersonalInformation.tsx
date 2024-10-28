import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const PersonalInformation = ({ register, errors }: any) => {
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <div className="grid gap-4">
        {[
          { label: "Name of Assessee", name: "nameOfAssessee" },
          { label: "National Id No.", name: "nationalIdNo" },
          { label: "TIN No.", name: "tinNo" },
          { label: "Circle", name: "circle" },
          { label: "Taxes Zone", name: "taxesZone" },
          {
            label: "Name of Employer/Business",
            name: "nameOfEmployer",
          },
          { label: "Father's Name", name: "fathersName" },
          { label: "Spouse Name", name: "spouseName" },
          { label: "eTIN of Spouse", name: "etinSpouse" },
          { label: "Date of Birth", name: "dob", type: "date" },
          { label: "Present Address", name: "presentAddress" },
          { label: "Mobile Number", name: "mobileNumber" },
          { label: "Email Address", name: "email", type: "email" },
          { label: "Business/Firm Name", name: "businessName" },
          { label: "Business Address", name: "businessAddress" },
          {
            label: "Type of Business/Profession",
            name: "businessType",
          },
          { label: "BIN Number", name: "binNumber" },
          {
            label: "Name & eTIN of Partner of Firm-1",
            name: "partner1",
          },
          {
            label: "Name & eTIN of Partner of Firm-2",
            name: "partner2",
          },
          {
            label: "Address of House Property",
            name: "housePropertyAddress",
          },
          {
            label: "Place of Submission of Return",
            name: "submissionPlace",
          },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <TextField
              fullWidth
              label={label}
              type={type}
              size="small"
              InputLabelProps={{ shrink: true }}
              {...register(name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalInformation;
