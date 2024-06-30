"use client";
import { FaLinkedinIn, FaFacebook, FaShareAlt } from "react-icons/fa";

const socials = [
  { icon: <FaFacebook />, path: "", color: "#3b5998" },
  { icon: <FaLinkedinIn />, path: "", color: "#0e76a8" },
];

const shareOnFacebook = () => {
  const url = window.location.href;
  console.log(url);
  const facebookShareUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
    url
  )}`;
  window.open(facebookShareUrl, "_blank");
};

const Social = ({ containerStyles, iconStyles }: any) => {
  return (
    <div className="flex gap-4">
      {socials.map((item, index) => {
        return (
          <div
            key={index}
            className={iconStyles}
            style={{ color: item.color, fontSize: "1.5em", cursor: "pointer" }}
            onClick={shareOnFacebook}
          >
            {item.icon}
          </div>
        );
      })}
    </div>
  );
};

export default Social;
