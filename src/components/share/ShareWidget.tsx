"use client";

import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const ShareWidget = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const pathname = usePathname();
  const [currentPath] = useState(pathname);

  const handleFacebookShare = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(BASE_URL + currentPath)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const handleTwitterShare = () => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(BASE_URL + currentPath)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const handleLinkedInShare = () => {
    const shareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(BASE_URL + currentPath)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="flex justify-end items-center gap-4 ">
      <span>Share</span>
      <FaFacebook
        style={{ color: "#4267B2" }}
        className="cursor-pointer text-2xl"
        onClick={handleFacebookShare}
      />
      <FaXTwitter
        className="cursor-pointer text-2xl"
        onClick={handleTwitterShare}
      />
      <FaLinkedin
        style={{ color: "#0077B5" }}
        className="cursor-pointer text-2xl"
        onClick={handleLinkedInShare}
      />
    </div>
  );
};

export default ShareWidget;
