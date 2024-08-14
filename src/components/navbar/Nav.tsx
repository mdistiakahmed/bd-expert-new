"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { RiArrowRightSLine } from "react-icons/ri";
import { links } from "./links";

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-8">
      {links.map((link, index) => {
        if (link.sublinks) {
          return (
            <div
              key={index}
              className="capitalize font-medium  transition-all cursor-pointer group/first flex items-center justify-center relative"
            >
              <span className="hover:text-accent flex items-center gap-2">
                {link.name}
                <IoIosArrowDown className="hover:text-accent " />
              </span>
              <div className="absolute top-8 bg-gray-800 hidden group-hover/first:md:block hover:md:block z-50">
                <ul>
                  {link.sublinks.map((subLink: any, index2: any) => (
                    <li
                      key={index2}
                      className="hover:bg-gray-900 hover:underline px-6 py-2 whitespace-nowrap"
                    >
                      {" "}
                      {subLink.nestedSubLinks ? (
                        <div className="flex items-center gap-2 justify-between relative group/second w-[150px]">
                          <span>{subLink.name}</span>
                          <RiArrowRightSLine className="text-2xl" />
                          <div className="absolute bg-gray-800 left-36 top-0 z-50 hidden group-hover/second:md:block hover:md:block">
                            <ul>
                              {subLink.nestedSubLinks.map(
                                (nLink: any, index3: any) => (
                                  <li
                                    key={index3}
                                    className="px-6 py-2 hover:bg-gray-900 hover:underline"
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
            <div key={index}>
              <Link
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
    </nav>
  );
};

export default Nav;
