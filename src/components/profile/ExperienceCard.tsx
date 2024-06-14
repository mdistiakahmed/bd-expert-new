import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddExperienceDialog from "./AddExperienceDialog";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import AddEducationDialog from "./AddEducationDialog";

const AlertDialog = (props: any) => {
  const { deleteConfirm, setDeleteConfirm, handleDelete, title, company_name } =
    props;

  const handleClose = () => {
    setDeleteConfirm(false);
  };

  const onDeleteConfirm = () => {
    setDeleteConfirm(false);
    handleDelete();
  };

  return (
    <>
      <Dialog open={deleteConfirm} onClose={handleClose}>
        <DialogTitle>{"Delete Confirmation!"}</DialogTitle>
        <DialogContent>
          <div>
            <div>Sure you want to delete this experience?</div>
            <div>
              {" "}
              Title: <strong>{title}</strong>
            </div>
            <div>
              Company Name: <strong>{company_name}</strong>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onDeleteConfirm} autoFocus variant="outlined">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const ExperienceCard = (props: any) => {
  const {
    company_name,
    title,
    start_date,
    end_date,
    achievements,
    industries,
    skills,
    handleUpdate,
    handleDelete,
    index,
  } = props;
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  return (
    <div className="text-black">
      <div className="m-2 p-2 flex flex-col gap-2 rounded-lg transition duration-500 hover:bg-sky-100">
        <div className="flex flex-col justify-between md:flex-row">
          <p>{title}</p>
          <p className="text-sm">
            {start_date} - {end_date}
          </p>
        </div>

        <p className="text-blue-500 text-sm">{company_name}</p>

        <div className="flex flex-col gap-2">
          <ul>
            {achievements.map((a: any, index: any) => {
              return (
                <li key={index} className="flex items-center">
                  {" "}
                  <span className="mr-2 text-gray-400">•</span>
                  {a}
                </li>
              );
            })}
          </ul>

          <div className="flex gap-2 items-center ">
            <p className="text-sm italic">Industries:</p>
            <div className="flex gap-1">
              {industries.map((ee: any) => {
                return (
                  <Chip
                    key={ee}
                    label={ee}
                    variant="outlined"
                    color="warning"
                    size="small"
                    sx={{
                      fontSize: "0.75rem",
                      padding: "3px 8px",
                      minWidth: "unset",
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex gap-2 items-center ">
            <p className="text-sm italic">Skills:</p>
            <div className="flex gap-1">
              {skills.map((ee: any) => {
                return (
                  <Chip
                    key={ee}
                    label={ee}
                    variant="outlined"
                    color="success"
                    size="small"
                    sx={{
                      fontSize: "0.75rem",
                      padding: "3px 8px",
                      minWidth: "unset",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <Tooltip title="Delete" placement="top">
          <IconButton
            aria-label="delete"
            onClick={() => setDeleteConfirm(true)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit" placement="top">
          <IconButton
            aria-label="edit"
            onClick={() => setUpdateDialogOpen(true)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </div>

      <hr />

      <AlertDialog
        deleteConfirm={deleteConfirm}
        setDeleteConfirm={setDeleteConfirm}
        handleDelete={() => handleDelete(props)}
        title={title}
        company_name={company_name}
      />

      <AddExperienceDialog
        open={updateDialogOpen}
        setOpen={setUpdateDialogOpen}
        onSubmit={handleUpdate}
        isEdit={true}
        index={index}
        {...props}
      />
    </div>
  );
};

export default ExperienceCard;
