"use client";

import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import Social from "@/components/Social";
import ProfilePhoto from "@/components/profile/ProfilePhoto";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Image from "next/image";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { PhotoCamera } from "@mui/icons-material";
import {
  deleteImage,
  uploadImage,
  uploadResume,
} from "@/services/profileService";
import TextField from "@mui/material/TextField";
import Loader from "@/utils/Loader";

const UpdateAvatarDialog = (props: any) => {
  const { open, setOpen } = props;
  const { name, title, imageUrl } = props;
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(imageUrl);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState<any>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      logoText: "",
      title: "",
      name: name,
      description: "",
      facebookUrl: "",
      linkedInUrl: "",
      yearOfExperience: 0,
      projectsCompleted: 0,
      numberOfClientsServed: 0,
    },
  });

  useEffect(() => {
    setSelectedImage(imageUrl);
    reset({
      logoText: "",
      title: "",
      name: name,
      description: "",
      facebookUrl: "",
      linkedInUrl: "",
      yearOfExperience: 0,
      projectsCompleted: 0,
      numberOfClientsServed: 0,
    });
  }, [name, title, imageUrl, reset]);

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    let newResumeUrl = null;
    if (resumeFile != null) {
      // try {
      //   await deleteImage(imageUrl);
      // } catch (err) {
      //   console.log("could not delete previous image");
      // }

      try {
        const res = await uploadResume(resumeFile);
        newResumeUrl = res.data;
        console.log("newResumeUrl", newResumeUrl);
        setSnackbarMessage("Successfully uploaded resume");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);

        console.log(newResumeUrl);
      } catch (err: any) {
        console.log("could not upload resume");
        setSnackbarMessage(err?.message || "Could not upload resume");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }

    let newImageUrl = null;
    if (imageFile != null) {
      // try {
      //   await deleteImage(imageUrl);
      // } catch (err) {
      //   console.log("could not delete previous image");
      // }

      try {
        const res = await uploadImage(imageFile);
        newImageUrl = res.data;

        console.log("newImageUrl", newImageUrl);

        setSnackbarMessage("Successfully uploaded image");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (err: any) {
        console.log("could not upload image");
        setSnackbarMessage(err?.message || "Could not upload image");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }

    setLoading(false);

    props.onSubmit({
      ...data,
      ...(newImageUrl != null && { image_url: newImageUrl }),
      ...(newResumeUrl != null && { resume_url: newResumeUrl }),
    });
    setImageFile(null);
    setResumeFile(null);
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

  const handleResumeFileChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setResumeFile(file);
      setResumeFileName(file.name);
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
            <Image
              alt="Selected Image"
              src={selectedImage}
              height={100}
              width={100}
              objectFit="cover"
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
                Change Photo
              </IconButton>
            </label>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
              color: "blue",
            }}
          >
            <label className="pr-2">Change CV </label>
            <input
              accept="*"
              id="icon-button-second-file"
              type="file"
              onChange={handleResumeFileChange}
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="logoText">Logo Text, eg. Alice</InputLabel>
              <OutlinedInput
                id="logoText"
                label="Logo Text, eg. Alice"
                {...register("logoText", { required: "Logo Text is required" })}
                error={!!errors.logoText}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="title">Title, eg. Accountant</InputLabel>
              <OutlinedInput
                id="title"
                label="title"
                {...register("title", { required: "Title is required" })}
                error={!!errors.title}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="name">Name, eg. Devid Meril</InputLabel>
              <OutlinedInput
                id="name"
                label="Name"
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                id="description"
                label="Description, eg. Devid is a full-stack developer with five years ..."
                multiline
                rows={4}
                {...register("description", {
                  required: "description is required",
                })}
                error={!!errors.description}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="facebookUrl">Facebook Url</InputLabel>
              <OutlinedInput
                id="facebookUrl"
                label="Facebook Url"
                {...register("facebookUrl", {})}
                error={!!errors.facebookUrl}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="linkedInUrl">LinkedIn Url</InputLabel>
              <OutlinedInput
                id="linkedInUrl"
                label="LinkedIn Url"
                {...register("linkedInUrl", {})}
                error={!!errors.facebookUrl}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="yearOfExperience">
                Years Of Experience
              </InputLabel>
              <OutlinedInput
                id="yearOfExperience"
                label="Years Of Experience"
                type="number"
                {...register("yearOfExperience", {})}
                error={!!errors.yearOfExperience}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="numberOfClientsServed">
                Number Of Clients Served
              </InputLabel>
              <OutlinedInput
                id="numberOfClientsServed"
                label="Number Of Clients Served"
                type="number"
                {...register("numberOfClientsServed", {})}
                error={!!errors.numberOfClientsServed}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="projectsCompleted">
                Projects Completed
              </InputLabel>
              <OutlinedInput
                id="projectsCompleted"
                label="Projects Completed"
                type="number"
                {...register("projectsCompleted", {})}
                error={!!errors.projectsCompleted}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Loader loading={loading} />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          severity={snackbarSeverity as any}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

const SummarySection = ({ profileData, handleSummaryUpdate }: any) => {
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  return (
    <div className="container mx-auto h-full md:w-[70%] " id="summary">
      <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
        {/* text */}
        <div className="text-center xl:text-left order-2 xl:order-none">
          <span className="text-xl">{profileData?.title}</span>
          <h1 className="h2 mb-6">
            Hello I&#39;m
            <br /> <span className="text-accent">{profileData?.name}</span>
          </h1>
          <p className="max-w-[500px] mb-9 text-white/80">
            {profileData?.description}
          </p>

          {/* btn and socials*/}
          <div className="flex flex-col xl:flex-row items-center gap-8">
            <a
              href={profileData?.resume_url}
              download="resume.pdf"
              target="_blank"
            >
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2"
              >
                <span>Download CV</span>
                <FiDownload className="text-xl" />
              </Button>
            </a>

            <div className="mb-8 xl:mb-0">
              <Social
                containerStyles="flex gap-6"
                iconStyles="w-9 h-9 border border-accent rounded-full
                flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary
                hover:transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* photo */}
        <div className="order-1 xl:order-none mb-8 xl:mb-0">
          <ProfilePhoto imgUrl={profileData?.image_url} />
        </div>

        <div className="flex md:flex-col">
          <div className="flex justify-center border border-accent rounded-md m-5">
            <IconButton
              aria-label="edit"
              className="border border-red-500"
              onClick={() => setUpdateDialogOpen(true)}
            >
              <p className="text-white pr-2 text-sm">Edit</p>
              <EditIcon className="text-accent" />
            </IconButton>
          </div>
          <div className="flex justify-center border border-accent rounded-md m-5">
            <IconButton aria-label="edit" className="border border-red-500">
              <p className="text-white pr-2 text text-sm">Preview</p>
              <VisibilityIcon className="text-accent" />
            </IconButton>
          </div>
        </div>
      </div>

      <UpdateAvatarDialog
        open={updateDialogOpen}
        setOpen={setUpdateDialogOpen}
        onSubmit={handleSummaryUpdate}
      />
    </div>
  );
};

export default SummarySection;
