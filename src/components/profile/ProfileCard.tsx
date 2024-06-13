import { Button, Chip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileCard = (props: any) => {
  const { name, title, image_url } = props;

  return (
    <div className="flex justify-between gap-10 p-10 border rounded-md shadow-md w-full">
      <div
        className="w-[100px] h-[100px] relative"
        style={{ transform: "scale(1.2) rotateZ(calc(-11 * 1deg))" }}
      >
        <Image
          src={image_url}
          alt=""
          fill
          className="absolute border-4 border-red-500 rounded-lg"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p>{name}</p>
        <p>{title}</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Button variant="outlined">See Full Profile</Button>
      </div>
    </div>
  );
};

export default ProfileCard;
