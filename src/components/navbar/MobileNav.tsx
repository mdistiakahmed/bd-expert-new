"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useState } from "react";
import { Button } from "../ui/button";
import { links } from "./links";
import { IoIosArrowDown } from "react-icons/io";

const MobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();

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
            if (link.sublinks) {
              return (
                <div
                  key={index}
                  className="capitalize font-medium  transition-all cursor-pointer group/first flex flex-col items-center justify-center text-white"
                >
                  <span className="hover:text-accent flex items-center gap-2">
                    {link.name}
                    <IoIosArrowDown className="hover:text-accent" />
                  </span>
                  <div className=" hidden group-hover/first:block hover:block">
                    <ul>
                      {link.sublinks.map((subLink: any, index2: any) => (
                        <li
                          key={index2}
                          className="hover:underline px-6 py-2 whitespace-nowrap"
                        >
                          {" "}
                          {subLink.nestedSubLinks ? (
                            <div className="flex flex-col items-center gap-2 justify-between group/second w-[150px]">
                              <span className="flex items-center gap-2">
                                {subLink.name}
                                <IoIosArrowDown className="hover:text-accent" />
                              </span>

                              <div className="hidden group-hover/second:block hover:block">
                                <ul>
                                  {subLink.nestedSubLinks.map(
                                    (nLink: any, index3: any) => (
                                      <li
                                        key={index3}
                                        className="px-6 py-2 hover:underline"
                                      >
                                        {" "}
                                        {nLink.external ? (
                                          <Link
                                            href={nLink.external}
                                            target="_blank"
                                          >
                                            {nLink.name}
                                          </Link>
                                        ) : (
                                          <Link href={nLink.path}>
                                            {nLink.name}
                                          </Link>
                                        )}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          ) : (
                            <div>{subLink.name}</div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
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
            // return (
            //   <button
            //     key={index}
            //     onClick={() => handleLinkClick(link.path)}
            //     className={`${
            //       link.path === pathname &&
            //       "text-accent border-b-2 border-accent"
            //     } text-white text-xl capitalize hover:text-accent transition-all`}
            //   >
            //     {link.name}
            //   </button>
            // );
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
