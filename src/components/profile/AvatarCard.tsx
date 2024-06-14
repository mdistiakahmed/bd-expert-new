import React, { useState } from "react";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UpdateAvatarDialog from "./UpdateAvatarDialog";

const AvatarCard = (props: any) => {
  const { name, title, imageUrl, handleUpdate } = props;

  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  return (
    <div className="flex items-center gap-5 rounded-lg bg-white p-5 text-black">
      <div>
        <Avatar
          alt="U"
          src={imageUrl || "https://picsum.photos/200/200"}
          sx={{ width: 100, height: 100 }}
        />
      </div>

      <div>
        <h2 className="text-lg font-bold ">{name}</h2>
        <h3 className="text-md break-words">{title}</h3>
      </div>

      <div className="flex-grow"></div>

      <div className="flex justify-end">
        <Tooltip title="Edit" placement="top">
          <IconButton
            aria-label="edit"
            onClick={() => setUpdateDialogOpen(true)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </div>

      <UpdateAvatarDialog
        open={updateDialogOpen}
        setOpen={setUpdateDialogOpen}
        onSubmit={handleUpdate}
        {...props}
      />
    </div>
  );
};

export default AvatarCard;
