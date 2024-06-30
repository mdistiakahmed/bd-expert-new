"use client";
import { FaLinkedinIn, FaFacebook } from "react-icons/fa";

const shareOnFacebook = () => {
  const url = window.location.href;
  const facebookShareUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
    url
  )}`;
  window.open(facebookShareUrl, "_blank");
};

const shareOnLinkedIn = () => {
  const url = window.location.href;
  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    url
  )}`;
  window.open(linkedInShareUrl, "_blank");
};

const Social = ({ iconStyles }: any) => {
  return (
    <div className="flex gap-4">
      <div
        className={iconStyles}
        style={{ color: "#3b5998", fontSize: "1.5em", cursor: "pointer" }}
        onClick={shareOnFacebook}
      >
        <FaFacebook />
      </div>
      <div
        className={iconStyles}
        style={{ color: "#0e76a8", fontSize: "1.5em", cursor: "pointer" }}
        onClick={shareOnLinkedIn}
      >
        <FaLinkedinIn />
      </div>
    </div>
  );
};

export default Social;
