import React from "react";
import { Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const AvatarCard = (props: { name: string; title: string }) => {
  const { name, title } = props;

  return (
    <div className="flex items-center gap-5 rounded-lg bg-white p-5">
      <div>
        <Avatar
          alt="Remy Sharp"
          src="https://picsum.photos/200/200"
          sx={{ width: 100, height: 100 }}
        />
      </div>

      <div>
        <h2 className="text-lg font-bold">{name}</h2>
        <h3 className="text-md ">{title}</h3>
      </div>

      <div className="flex-grow"></div>

      <div className="flex gap-2 justify-end">
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>

        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default AvatarCard;
