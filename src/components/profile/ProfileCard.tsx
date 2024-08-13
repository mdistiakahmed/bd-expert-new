import Image from "next/image";
import React from "react";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";

const ProfileCard = (props: any) => {
  const { name, title, image, slug } = props;
  const url = `/experts/profile/${slug.current}`;

  return (
    <div className=" flex flex-col items-center justify-between gap-10 p-10 border rounded-md shadow-md w-full bg-slate-200">
      <div className="w-[200px] h-[200px] relative min-w-[150px]">
        <Image
          src={urlForImage(image)}
          alt={name}
          fill
          className="absolute border-4 border-white rounded-full"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className=" text-blue-600 ">{name}</p>
        <p className="text-center">{title}</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Link
          href={url}
          className="w-[180px] bg-blue-600 p-2 rounded-lg text-white text-center"
        >
          See Full Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
