import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Timestamp } from "firebase/firestore";

import { Button } from "@mui/material";
import { fetchBlogById } from "@/services/blogService";
import "react-quill/dist/quill.snow.css";
import { fetchProfileByEmail } from "@/services/profileService";
import VisibilityIcon from "@mui/icons-material/Visibility";

function timestampToDateString(timestamp: Timestamp): string {
  const date = new Date(
    timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000
  );
  return date?.toDateString();
}

const page = async ({ params }: any) => {
  const { id } = params;
  const result = await fetchBlogById(id);
  const docData = result.data;
  const authorInfo = await fetchProfileByEmail(docData?.author);
  const authorData = authorInfo.data;

  const tags: any = (
    <div className="flex gap-1">
      {docData?.tags?.map((t: any, index: any) => (
        <Link href="/" key={index} className="text-red-500 underline">
          {t}
        </Link>
      ))}
    </div>
  );

  const blogHeader = (
    <div className="flex gap-10 p-5">
      <div
        className="w-[100px] h-[100px] relative"
        style={{ transform: "scale(1.2) rotateZ(calc(-11 * 1deg))" }}
      >
        <Image
          src={authorData.image_url}
          alt=""
          fill
          className="absolute border-4 border-red-500 rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p>
          <Link href="/" className="font-semibold underline">
            {authorData.name}
          </Link>{" "}
          wrote
        </p>
        <h2 className="text-2xl font-bold">{docData?.title}</h2>
        <p className="flex gap-1">
          {timestampToDateString(docData?.created_at)} in {tags}
        </p>
        <div className="flex self-end gap-2">
          {docData?.view_count}
          <VisibilityIcon />
        </div>
      </div>
    </div>
  );

  const blogContent = (
    <div className="flex flex-col gap-5">
      {blogHeader}
      <hr className="border border-dotted rounded-md border-blue-500" />

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
      <div className="hidden sm:flex items-center justify-center">
        <div className="w-[60vw] m-5">{blogContent}</div>
      </div>
      <div className="flex flex-col sm:hidden">
        <div className="m-5">{blogContent}</div>
        <div className="m-5 mt-10">{author}</div>
      </div>
    </>
  );
};

export default page;
