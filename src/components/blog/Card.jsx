import React from "react";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";

const Card = (props) => {
  const { title, author, publishedDate, tags, content, id, imageUrl, slug } =
    props;

  return (
    <div className=" text-black flex flex-col gap-2  p-5 border rounded-md shadow-md w-full">
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
    </div>
  );
};

export default Card;
