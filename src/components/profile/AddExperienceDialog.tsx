"use client";

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { MuiChipsInput } from "mui-chips-input";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const AddExperienceDialog = (props: any) => {
  const { open, setOpen } = props;
  const {
    title,
    company_name,
    start_date,
    end_date,
    company_url,
    industries,
    skills,
    achievements = [],
    isEdit,
    index,
  } = props;
  const [newIndustries, setNewIndustries] = useState(industries ?? []);
  const [newSkills, setNewSkills] = useState(skills ?? []);

  const handleIndustriesChange = (newTags: any) => {
    setNewIndustries(newTags);
  };
  const handleSkillsChange = (newTags: any) => {
    setNewSkills(newTags);
  };

  const obj: any = {};
  const indexArray: any = [];
  achievements.map((e: any) => {
    const index = Math.random().toString(36).substring(2, 7);
    indexArray.push(index);
    obj[`experience_details_${index}`] = e;
  });

  const [experienceDetails, setExperienceDetails] =
    useState<string[]>(indexArray);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: title,
      company: company_name,
      companyURL: company_url,
      start_date: start_date,
      end_date: end_date,
      ...obj,
    },
  });

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data: any) => {
    if (newIndustries.length === 0 || newSkills.length === 0) {
      return;
    }
    const experienceData: any = {};
    experienceData.company_name = data.company;
    experienceData.title = data.title;
    experienceData.start_date = data.start_date;
    experienceData.end_date = data.end_date;
    experienceData.company_url = data.companyURL;
    experienceData.industries = newIndustries;
    experienceData.skills = newSkills;
    experienceData.achievements = [];

    experienceDetails.forEach((e) => {
      const achievement = data[`experience_details_${e}`];
      experienceData.achievements.push(achievement);
    });

    props.onSubmit(
      index !== undefined ? { ...experienceData, index } : experienceData
    );
    setOpen(false);

    reset();
    setNewSkills([]);
    setNewIndustries([]);
    setExperienceDetails([]);
  };

  const handleAddAdditionalField = () => {
    setExperienceDetails((prevFields) => [
      ...prevFields,
      Math.random().toString(36).substring(2, 7),
    ]);
  };

  const handleRemoveAdditionalField = (index: string) => {
    setExperienceDetails((prevFields) =>
      prevFields.filter((item) => item !== index)
    );
    setValue(`experience_details_${index}`, undefined);
  };

  const createAdditionalFormControl = (index: string) => (
    <FormControl fullWidth margin="normal" key={index} className="flex">
      <InputLabel htmlFor={`experience_details_${index}`}>
        Experience Details
      </InputLabel>
      <div className="flex w-full">
        <OutlinedInput
          id={`experience_details_${index}`}
          label="Experience Details"
          className="w-full"
          {...register(`experience_details_${index}`, {})}
        />
        <IconButton
          onClick={() => handleRemoveAdditionalField(index)}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </FormControl>
  );

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {isEdit === true ? "Edit Work Experience" : "Add Work Experience"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the following details for your work experience.
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="title">Job title</InputLabel>
              <OutlinedInput
                id="title"
                label="Job Title"
                {...register("title", { required: "Title is required" })}
                error={!!errors.title}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="company">Company</InputLabel>
              <OutlinedInput
                id="company"
                label="Company"
                {...register("company", { required: "Company is required" })}
                error={!!errors.company}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="companyURL">Company URL</InputLabel>
              <OutlinedInput
                id="companyURL"
                label="Company URL"
                {...register("companyURL", {})}
                error={!!errors.companyURL}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                id="start_date"
                label="Start Date"
                type="date"
                {...register("start_date", {
                  required: "Start date is required",
                })}
                InputLabelProps={{ shrink: true }}
                error={!!errors.start_date}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                id="end_date"
                label="End Date"
                type="date"
                {...register("end_date", {})}
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <MuiChipsInput
                value={newIndustries}
                onChange={handleIndustriesChange}
                variant="outlined"
                label="Industries"
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <MuiChipsInput
                value={newSkills}
                onChange={handleSkillsChange}
                variant="outlined"
                label="Skills"
              />
            </FormControl>

            {experienceDetails.map((item, index) =>
              createAdditionalFormControl(item)
            )}

            <FormControl margin="normal">
              <InputAdornment position="start" className="mt-6">
                <Button onClick={handleAddAdditionalField}>
                  Add experience details
                  <AddIcon />
                </Button>
              </InputAdornment>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            form="educationForm"
            variant="outlined"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddExperienceDialog;
