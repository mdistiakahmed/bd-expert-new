"use client";

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { PhotoCamera } from "@mui/icons-material";
import {
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { deleteImage, uploadImage } from "@/services/profileService";

const UpdateAvatarDialog = (props: any) => {
  const { open, setOpen } = props;
  const { name, title, imageUrl } = props;
  const [selectedImage, setSelectedImage] = useState(imageUrl);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: name,
      title: title,
    },
  });

  useEffect(() => {
    setSelectedImage(imageUrl);
    reset({
      name: name,
      title: title,
    });
  }, [name, title, imageUrl, reset]);

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data: any) => {
    let newImageUrl = null;
    if (imageFile != null) {
      try {
        await deleteImage(imageUrl);
      } catch (err) {
        console.log("could not delete previous image");
      }

      try {
        const res = await uploadImage(imageFile);
        newImageUrl = res.data;
      } catch (err) {
        console.log("could not upload image");
      }
    }

    props.onSubmit(
      newImageUrl != null ? { ...data, image_url: newImageUrl } : data
    );
    setImageFile(null);
    setOpen(false);
    reset();
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Edit"}</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <Avatar
              alt={name}
              src={selectedImage}
              sx={{ width: 100, height: 100 }}
            />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="icon-button-file"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="name">Name</InputLabel>
              <OutlinedInput
                id="name"
                label="Name"
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="title">Title</InputLabel>
              <OutlinedInput
                id="title"
                label="Title"
                {...register("title", { required: "Title is required" })}
                error={!!errors.title}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
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

export default UpdateAvatarDialog;
