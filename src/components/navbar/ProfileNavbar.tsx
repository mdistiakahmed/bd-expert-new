"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

import { CiMenuFries } from "react-icons/ci";
import { IoShareOutline } from "react-icons/io5";
import { FaLinkedinIn, FaFacebook } from "react-icons/fa";
import { Button } from "../ui/button";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";

const ShareDialog = (props: any) => {
  const { open, setOpen } = props;

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

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        <div className="flex gap-2 items-center">
          <p>Share</p>
          <IoShareOutline />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-5 p-10">
          <div
            className="border-2 border-accent p-2 rounded-lg flex gap-2 items-center"
            style={{ color: "#3b5998", fontSize: "1.5em", cursor: "pointer" }}
            onClick={shareOnFacebook}
          >
            <FaFacebook />
            <p>Share on Facebook</p>
          </div>

          <div
            className="border-2 border-accent p-2 rounded-lg flex gap-2 items-center"
            style={{ color: "#0e76a8", fontSize: "1.5em", cursor: "pointer" }}
            onClick={shareOnLinkedIn}
          >
            <FaLinkedinIn />
            <p>Share on LinkedIn</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const links = [
  {
    name: "Summary",
    path: "#summary",
  },
  {
    name: "Qualification",
    path: "#qualification",
  },
  {
    name: "Articles",
    path: "#articles",
  },
  {
    name: "Contact",
    path: "#contact",
  },
];

const Nav = () => {
  const [activeTab, setActiveTab] = useState("");
  const [openShareDialog, setOpenShareDialog] = useState(false);

  useEffect(() => {
    const summarySection = document.getElementById("summary");
    const qualificationSection = document.getElementById("qualification");
    const articlesSection = document.getElementById("articles");
    const contactSection = document.getElementById("contact");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(summarySection as any);
    observer.observe(qualificationSection as any);
    observer.observe(articlesSection as any);
    observer.observe(contactSection as any);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleScroll = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    event.preventDefault();
    if (path.startsWith("#")) {
      const targetElement = document.querySelector(path);
      if (targetElement) {
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset - 120;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      } else {
        console.log("Target element not ofund");
      }
    } else {
      window.location.href = path;
    }
  };

  return (
    <>
      <nav className="flex gap-8">
        {links.map((link, index) => {
          const isActive = activeTab === link.path;
          return (
            <Link
              href={link.path}
              key={index}
              onClick={(e) => handleScroll(e, link.path)}
              className={`${
                isActive && "text-accent border-b-2 border-accent"
              } capitalize font-medium hover:text-accent transition-all`}
            >
              {link.name}
            </Link>
          );
        })}
        <Button onClick={() => setOpenShareDialog(true)}>
          Share <IoShareOutline />
        </Button>
      </nav>
      <ShareDialog open={openShareDialog} setOpen={setOpenShareDialog} />
    </>
  );
};

const ProfileMobileNav = ({ logoText }: any) => {
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  let summarySection: any = null;

  useEffect(() => {
    summarySection = document.getElementById("summary");
    const qualificationSection = document.getElementById("qualification");
    const articlesSection = document.getElementById("articles");
    const contactSection = document.getElementById("contact");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(summarySection as any);
    observer.observe(qualificationSection as any);
    observer.observe(articlesSection as any);
    observer.observe(contactSection as any);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleScroll = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    event.preventDefault();
    if (path.startsWith("#")) {
      const targetElement = document.querySelector(path);
      if (targetElement) {
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset - 120;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      } else {
        console.log("Target element not ofund");
      }
    } else {
      window.location.href = path;
    }
  };

  const handleScrollToTop = () => {
    if (summarySection) {
      const targetPosition =
        summarySection.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>

      <SheetContent className="flex flex-col">
        <div className="mt-32 mb-30 text-center text-2xl">
          <div className="cursor-pointer" onClick={handleScrollToTop}>
            <h1 className="text-4xl font-semibold">
              {logoText || "RatGeber"}
              <span className="text-accent">.</span>
            </h1>
          </div>
        </div>
        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map((link, index) => {
            const isActive = activeTab === link.path;
            return (
              <Link
                href={link.path}
                key={index}
                onClick={(e) => handleScroll(e, link.path)}
                className={`${
                  isActive && "text-accent border-b-2 border-accent"
                } text-xl capitalize hover:text-accent transition-all`}
              >
                {link.name}
              </Link>
            );
          })}
          <Button onClick={() => setOpenShareDialog(true)}>
            Share <IoShareOutline />
          </Button>

          <ShareDialog open={openShareDialog} setOpen={setOpenShareDialog} />
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const ProfileNavbar = ({ logoText }: any) => {
  let summarySection = document.getElementById("summary");

  useEffect(() => {
    summarySection = document.getElementById("summary");
  }, []);

  const handleScrollToTop = () => {
    if (summarySection) {
      const targetPosition =
        summarySection.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  return (
    <header
      className="py-8  text-white sticky top-0 left-0 w-full bg-black z-50 "
      id="navbar"
    >
      <div className="container px-[15px] mx-auto flex justify-between items-center">
        {/* logo */}
        <div className="cursor-pointer" onClick={handleScrollToTop}>
          <h1 className="text-4xl font-semibold">
            {logoText || "RatGeber"}
            <span className="text-accent">.</span>
          </h1>
        </div>
        {/* desktop nav */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
        </div>

        {/* mobile nav */}
        <div className="xl:hidden">
          <ProfileMobileNav logoText={logoText} />
        </div>
      </div>
    </header>
  );
};

export default ProfileNavbar;
