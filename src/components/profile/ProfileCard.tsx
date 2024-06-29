import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useRouter } from 'next/navigation';

const ProfileCard = (props: any) => {
  const { name, title, image_url, id } = props;

  const router = useRouter();

  const handleClick = () => {
    router.push(`/profile/${id}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-10 p-10 border rounded-md shadow-md w-full">
      <div
        className="w-[100px] h-[100px] relative"
        style={{ transform: "scale(1.2) rotateZ(calc(-11 * 1deg))" }}
      >
        <Image
          src={image_url}
          alt=""
          fill
          className="absolute border-4 border-accent rounded-lg"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p>{name}</p>
        <p>{title}</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Button variant="outlined" onClick={handleClick}>See Full Profile</Button>
      </div>
    </div>
  );
};

export default ProfileCard;
