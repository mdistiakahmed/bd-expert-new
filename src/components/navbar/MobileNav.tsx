"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useState } from "react";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "Experts",
    path: "/experts",
  },
  {
    name: "Articles",
    path: "/articles",
  },
];

const MobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLinkClick = (path: string) => {
    router.push(path);
    setIsSheetOpen(false);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>

      <SheetContent className="flex flex-col">
        <div className="mt-32 mb-30 text-center text-2xl">
          <Link href="/">
            <h1 className="text-4xl text-white font-semibold">
              RatGeber<span className="text-accent">.</span>
            </h1>
          </Link>
        </div>
        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map((link, index) => {
            return (
              <button
                key={index}
                onClick={() => handleLinkClick(link.path)}
                className={`${
                  link.path === pathname &&
                  "text-accent border-b-2 border-accent"
                } text-white text-xl capitalize hover:text-accent transition-all`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
