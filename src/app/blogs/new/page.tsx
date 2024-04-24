"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { MuiChipsInput } from "mui-chips-input";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import "react-quill/dist/quill.snow.css";

async function addToDatabase(title: string, data: string, tags: any) {
  try {
    const docRef = await addDoc(collection(db, "test"), {
      title,
      data,
      tags,
      author: "Istiak Ahmed",
      created_at: new Date(),
    });

    console.log(docRef.id);
  } catch (error) {
    console.log(error);
  }
}

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
    ["link", "image", "video"],
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

  const value: any = [];

  const handleChipChange = (newTags: any) => {
    setTags(newTags);
  };

  const handleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const onSubmit = async () => {
    if (title.length > 0 && blogText.length > 0) {
      await addToDatabase(title, blogText, tags);
      setBlogText("");
      setTitle("");
      setTags([]);
      setSnackbarMessage("Successfully created blog post!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage("Fill title and body");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="m-10 flex flex-col gap-10">
      <TextField
        id="standard-basic"
        label="Title"
        variant="standard"
        value={title}
        onChange={handleChange}
      />
      <ReactQuill
        value={blogText}
        onChange={setBlogText}
        modules={modules}
        formats={formats}
      />

      <MuiChipsInput
        value={tags}
        onChange={handleChipChange}
        variant="outlined"
        label="Tags"
      />

      <div className="flex justify-end">
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#1976d2", width: "200px" }}
          onClick={onSubmit}
        >
          Save
        </Button>
      </div>

      <div className="quill">
        <div className="ql-container ql-snow">
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: blogText }}
          ></div>
        </div>
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
  );
};

export default CreateNewBlog;
