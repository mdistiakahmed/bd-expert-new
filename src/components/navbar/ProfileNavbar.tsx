"use client";

import MobileNav from "./MobileNav";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("");

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
    </nav>
  );
};

const ProfileNavbar = () => {
  return (
    <header
      className="py-8  text-white sticky top-0 left-0 w-full bg-black z-50 "
      id="navbar"
    >
      <div className="container px-[15px] mx-auto flex justify-between items-center">
        {/* logo */}
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            Istiak<span className="text-accent">.</span>
          </h1>
        </Link>
        {/* desktop nav */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
        </div>

        {/* mobile nav */}
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default ProfileNavbar;
