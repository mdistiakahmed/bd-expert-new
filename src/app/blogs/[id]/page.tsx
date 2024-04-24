import React from "react";
import Card from "@/components/blog/Card";
import { db } from "@/firebaseConfig";
import { compile, convert } from "html-to-text";
import Image from "next/image";
import Link from "next/link";

import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  orderBy,
  Timestamp,
} from "firebase/firestore";

import { doc, getDoc } from "firebase/firestore";
import { Button } from "@mui/material";

function timestampToDateString(timestamp: Timestamp): string {
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  return date.toDateString(); // Get only the date string
}

const page = async ({ params }: any) => {
  const { id } = params;
  const docRef = doc(db, "test", id);
  const docSnap = await getDoc(docRef);
  let docData: any;

  if (docSnap.exists()) {
    docData = docSnap.data();
    console.log(docData);
    // Document data is available in docData
  } else {
    console.log("No data found");
  }

  const blogContent = (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold text-center">{docData?.title}</h1>
      <p className="text-center">
        <span className="font-semibold text-blue-900 underline dark:text-white decoration-blue-500 decoration-double">
          {docData?.author}
        </span>{" "}
        on{" "}
        <span className="italic text-sm">
          {timestampToDateString(docData?.created_at)}
        </span>
      </p>
      <hr className="border-4 rounded-md border-blue-500" />
      <div className="quill">
        <div className="ql-container ql-snow">
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: docData?.data }}
          ></div>
        </div>
      </div>
    </div>
  );

  const author = (
    <div className="flex flex-col gap-2 items-center justify-center border rounded-full p-5 bg-blue-200">
      <h1 className="text-xl font-bold text-center">Author</h1>
      <div className="text-center">
        <Image
          src={"https://picsum.photos/200/200"}
          alt="Avatar Image"
          width={100}
          height={100}
          style={{ borderRadius: "20%" }}
        />
      </div>

      <p className="text-center text-xl pb-0">{docData?.author}</p>
      <p className="text-center p-0">Software Engineer</p>

      <Link href={`/blogs/${id}`}>
        <Button variant="outlined" size="small">
          More
        </Button>
      </Link>
    </div>
  );

  return (
    <>
      <div className="hidden sm:flex">
        <div className="w-[60vw] m-5">{blogContent}</div>
        <div className="w-[30vw] m-5 mt-20">{author}</div>
      </div>
      <div className="flex flex-col sm:hidden">
        <div className="m-5">{blogContent}</div>
        <div className="m-5 mt-10">{author}</div>
      </div>
    </>
  );
};

export default page;
