"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { Avatar } from "@mui/material";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";

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
  {
    name: "Write",
    path: "/articles/new",
  },
];

const MobileNav = () => {
  const pathname = usePathname();
  const session = useSession();
  const router = useRouter();

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSettingMenu = (action: string) => {
    if (action == "Profile") {
      router.push(`/profile/my`);
    } else if (action == "Logout") {
      signOut();
    }
  };

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
            <h1 className="text-4xl font-semibold">
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
                } text-xl capitalize hover:text-accent transition-all`}
              >
                {link.name}
              </button>
            );
          })}

          {session?.status === "unauthenticated" && pathname !== "/login" && (
            <Link href="/login">
              <Button>Log In</Button>
            </Link>
          )}

          {session?.status === "authenticated" && (
            <div>
              <Button
                onClick={() => setOpenUserMenu(!openUserMenu)}
                className="flex justify-between gap-2"
                variant={"primary"}
              >
                <Avatar alt="A" src={session?.data?.user?.image || ""} />
                <FaArrowDown />
              </Button>
            </div>
          )}

          {openUserMenu && (
            <>
              <Link
                href="/profile/my"
                className={`text-xl capitalize hover:text-accent transition-all`}
              >
                Profile
              </Link>
              <Button onClick={() => signOut()}>Log Out</Button>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
