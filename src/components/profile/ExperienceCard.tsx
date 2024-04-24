import React from "react";
import Chip from "@mui/material/Chip";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Experience } from "@/app/profile/[id]/page";
import AddExperienceDialog from "./AddExperienceDialog";

const ExperienceCard = (props: Experience) => {
  const {
    company_name,
    title,
    start_date,
    end_date,
    achievements,
    industries,
    skills,
    handleUpdate,
  } = props;
  const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);

  return (
    <div>
      <div className="m-2 p-2 flex flex-col gap-2 rounded-lg transition duration-500 hover:bg-sky-100">
        <div className="flex justify-between">
          <p>{title}</p>
          <p className="text-sm">
            {start_date} - {end_date}
          </p>
        </div>

        <p className="text-blue-500 text-sm">{company_name}</p>

        <div className="flex flex-col gap-2">
          <ul>
            {achievements.map((a, index) => {
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
              {industries.map((ee) => {
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
              {skills.map((ee) => {
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
          <IconButton aria-label="delete">
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

      <AddExperienceDialog
        open={updateDialogOpen}
        setOpen={setUpdateDialogOpen}
        onSubmit={handleUpdate}
        {...props}
      />
    </div>
  );
};

export default ExperienceCard;
