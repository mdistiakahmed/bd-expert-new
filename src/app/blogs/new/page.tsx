"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { MuiChipsInput } from "mui-chips-input";

import "react-quill/dist/quill.snow.css";
import { createBlog } from "@/services/blogService";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SendIcon from "@mui/icons-material/Send";
import { deleteImage, uploadImage } from "@/services/profileService";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    ["link", "video"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "align",
  "list",
  "bullet",
  "indent",
  "script",
  "blockquote",
  "code-block",
  "link",
  "image",
  "video",
  "clean",
];
const CreateNewBlog = () => {
  const [blogText, setBlogText] = useState("");
  const [title, setTitle] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [tags, setTags] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("/placeholder.png");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChipChange = (newTags: any) => {
    setTags(newTags);
  };

  const handleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleThumbnailChange = (event: any) => {
    const file = event.target.files[0];
    setThumbnailFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result as string);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      let newImageUrl = null;
      if (thumbnailFile != null) {
        try {
          const res = await uploadImage(thumbnailFile);
          newImageUrl = res.data;
        } catch (err) {
          console.log("could not upload image");
        }
      }
      const result = await createBlog(title, blogText, tags, newImageUrl);
      setBlogText("");
      setTitle("");
      setTags([]);
      setThumbnailFile(null);
      setThumbnailPreview("/placeholder.png");

      setLoading(false);

      router.push(`/blogs/${result.data}`);
    } catch (err: any) {
      setLoading(false);
      setSnackbarMessage(err?.message || "Something went wrong");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="flex items-center justify-center relative bg-white text-black">
      <div className="flex flex-col items-center justify-center mt-10 md:mt-0 p-2 gap-10 md:w-2/3 md:p-10">
        <TextField
          id="standard-basic"
          label="Title"
          variant="standard"
          fullWidth
          value={title}
          onChange={handleChange}
        />
        <ReactQuill
          value={blogText}
          onChange={setBlogText}
          modules={modules}
          formats={formats}
          style={{ height: "300px" }}
          placeholder="Write your blog content here..."
        />

        <MuiChipsInput
          value={tags}
          onChange={handleChipChange}
          variant="outlined"
          size="small"
          fullWidth
          label="Tags"
        />

        <div className="relative">
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="thumbnail-input"
            type="file"
            onChange={handleThumbnailChange}
          />
          <span className="font-bold">Thumbnail Image</span>

          <label
            htmlFor="thumbnail-input"
            className="absolute top-0 right-0 m-4 z-10"
          >
            <Button variant="contained" color="primary" component="span">
              <PhotoCameraIcon />
            </Button>
          </label>
          <div className="flex justify-center items-center">
            <Image
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              width={600}
              height={200}
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </div>
        </div>

        <div className="absolute right-4 top-2 md:right-10 md:top-10">
          <Button variant="outlined" endIcon={<SendIcon />} onClick={onSubmit}>
            Publish
          </Button>
        </div>

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
    </div>
  );
};

export default CreateNewBlog;
