"use client";
import Link from "next/link";
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

const HomeSocial = ({ iconStyles }: any) => {
  return (
    <div className="flex gap-4">
      <Link
        href={`https://www.facebook.com/profile.php?id=61562569811845`}
        target="_blank"
        className={iconStyles}
        style={{ color: "#3b5998", fontSize: "1.5em", cursor: "pointer" }}
      >
        <FaFacebook />
      </Link>
      <Link
        href={`https://www.linkedin.com/company/ratgeber-limited/`}
        target="_blank"
        className={iconStyles}
        style={{ color: "#3b5998", fontSize: "1.5em", cursor: "pointer" }}
      >
        <FaLinkedinIn />
      </Link>
    </div>
  );
};

export default HomeSocial;
