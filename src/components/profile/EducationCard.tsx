"use client";

import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Education } from "@/app/profile/[id]/page";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddEducationDialog from "./AddEducationDialog";

const AlertDialog = (props: any) => {
  const { deleteConfirm, setDeleteConfirm, handleDelete, degree, institution } =
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
            <div>Sure you want to delete this degree?</div>
            <div>
              {" "}
              Degree Title: <strong>{degree}</strong>
            </div>
            <div>
              Institution: <strong>{institution}</strong>
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

const EducationCard = (props: any) => {
  const {
    degree,
    start_date,
    end_date,
    institution,
    handleDelete,
    handleUpdate,
  } = props;
  const [deleteConfirm, setDeleteConfirm] = React.useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);

  const onDelete = () => {
    setDeleteConfirm(true);
  };

  return (
    <div>
      <div className="m-2 p-2 flex flex-col rounded-lg transition duration-500 hover:bg-sky-100">
        <div className="flex justify-between">
          <p>{degree}</p>
          <p className="text-sm">
            {start_date} - {end_date}
          </p>
        </div>

        <p className="text-blue-500 text-sm">{institution}</p>
      </div>

      <div className="flex gap-2 justify-end">
        <Tooltip title="Delete" placement="top">
          <IconButton aria-label="delete" onClick={onDelete}>
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
        degree={degree}
        institution={institution}
      />
      <AddEducationDialog
        open={updateDialogOpen}
        setOpen={setUpdateDialogOpen}
        onSubmit={handleUpdate}
        isEdit={true}
        {...props}
      />
    </div>
  );
};

export default EducationCard;
