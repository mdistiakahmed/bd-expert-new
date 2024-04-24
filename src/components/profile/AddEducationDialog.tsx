"use client";

import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

const AddEducationDialog = (props: any) => {
  const { open, setOpen } = props;
  const { degree, institution, start_date, end_date, isEdit } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      degree: degree,
      institution: institution,
      start_date: start_date,
      end_date: end_date,
    },
  });

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data: any) => {
    props.onSubmit(data);
    setOpen(false);
    reset();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {isEdit === true ? "Edit Education" : "Add Education"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the following details for your education experience.
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="degree">Degree</InputLabel>
              <OutlinedInput
                id="degree"
                label="Degree"
                {...register("degree", { required: "Degree is required" })}
                error={!!errors.degree}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="institution">School</InputLabel>
              <OutlinedInput
                id="institution"
                label="School"
                {...register("institution", { required: "School is required" })}
                error={!!errors.institution}
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

export default AddEducationDialog;
