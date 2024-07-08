"use client";

import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSession } from "next-auth/react";

const AlertDialog = (props) => {
  const { deleteConfirm, setDeleteConfirm, handleDelete, title, author } =
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
        <DialogTitle>
          <p className="text-2xl text-red-500">Delete Confirmation!</p>
        </DialogTitle>
        <DialogContent>
          <div>
            <div>Sure you want to delete this article?</div>
            <div>
              {" "}
              Title: <strong>{title}</strong>
            </div>
            <div>
              Author: <strong>{author}</strong>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={onDeleteConfirm}
            variant="outlined"
            className="text-red-500"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Card = (props) => {
  const {
    title,
    author,
    publishedDate,
    tags,
    content,
    id,
    imageUrl,
    slug,
    handleDelete,
    handleUpdate,
  } = props;
  const session = useSession();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const updateVisible =
    session?.data?.user?.email === author ||
    session?.data?.user?.email === "ratgeber.ltd@gmail.com";

  return (
    <div className=" text-black flex flex-col gap-2  p-5 border rounded-md shadow-md w-full relative">
      {updateVisible && (
        <div className="flex  justify-end gap-2">
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            className="text-red-500"
            onClick={() => setDeleteConfirm(true)}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            endIcon={<EditIcon />}
            onClick={() => handleUpdate(slug)}
          >
            Edit
          </Button>
        </div>
      )}

      <Link href={`/articles/${slug}`}>
        <div>
          <Image src={imageUrl} alt="thumbnail" width={200} height={200} />
        </div>

        <h1 className="text-lg font-bold">{title}</h1>
      </Link>
      <p>
        <span className="font-semibold text-blue-900 underline dark:text-white decoration-blue-500 decoration-double">
          {author}
        </span>{" "}
        on <span className="italic text-sm">{publishedDate}</span>
      </p>
      <p>{content}...</p>
      <div className="flex self-end">
        <Link href={`/articles/${slug}`}>
          <Button variant="outlined" size="small">
            Continue Reading...
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-[#1976d2] italic">
          Tags
        </span>
        {tags?.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            variant="outlined"
            color="primary"
            size="small"
            clickable
          />
        ))}
      </div>

      <AlertDialog
        deleteConfirm={deleteConfirm}
        setDeleteConfirm={setDeleteConfirm}
        handleDelete={() => handleDelete(slug)}
        title={title}
        author={author}
      />
    </div>
  );
};

export default Card;
