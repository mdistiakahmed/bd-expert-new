"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useState } from "react";
import { Button } from "../ui/button";
import { links } from "./links";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const NestedSubLInks = ({ name, nestedSubLinks }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2 justify-between group/second w-[150px]">
      <span
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {name}
        {isOpen ? (
          <IoIosArrowUp className="hover:text-accent" />
        ) : (
          <IoIosArrowDown className="hover:text-accent" />
        )}
      </span>

      <div className={`${isOpen ? "block" : "hidden"}`}>
        <ul>
          {nestedSubLinks.map((nLink: any, index: any) => (
            <li key={index} className="px-6 py-2 hover:underline">
              {" "}
              {nLink.external ? (
                <Link href={nLink.external} target="_blank">
                  {nLink.name}
                </Link>
              ) : (
                <Link href={nLink.path}>{nLink.name}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const SubLinks = ({ name, sublinks }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="capitalize font-medium  transition-all cursor-pointer group/first flex flex-col items-center justify-center text-white">
      <span
        className="hover:text-accent flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {name}
        {isOpen ? (
          <IoIosArrowUp className="hover:text-accent" />
        ) : (
          <IoIosArrowDown className="hover:text-accent" />
        )}
      </span>
      <div className={`${isOpen ? "block" : "hidden"}`}>
        <ul>
          {sublinks.map((subLink: any, index: any) => (
            <li
              key={index}
              className="hover:underline px-6 py-2 whitespace-nowrap"
            >
              {" "}
              {subLink.nestedSubLinks ? (
                <NestedSubLInks
                  name={subLink.name}
                  nestedSubLinks={subLink.nestedSubLinks}
                />
              ) : (
                <div>{subLink.name}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const MobileNav = () => {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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
            if (link.sublinks) {
              return (
                <SubLinks
                  name={link.name}
                  sublinks={link.sublinks}
                  key={index}
                />
              );
            } else {
              return (
                <div key={index} className="text-white">
                  <Link
                    onClick={() => setIsSheetOpen(false)}
                    href={link.path}
                    className={`${
                      link.path === pathname &&
                      "text-accent border-b-2 border-accent"
                    } capitalize font-medium hover:text-accent transition-all`}
                  >
                    {link.name}
                  </Link>
                </div>
              );
            }
          })}

          <Link href="/contact">
            <Button>Contact Us</Button>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
