"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiChevronDown, FiPlus, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";

const UpdatedNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // For desktop menu
  const [activeMobileMenu, setActiveMobileMenu] = useState(null); // For mobile sub-menu

  const pathname = usePathname();

  console.log(pathname);

  const toggleMenu = (menu: any) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const toggleMobileSubMenu = (menu: any) => {
    setActiveMobileMenu(activeMobileMenu === menu ? null : menu);
  };

  const menuList = [
    {
      item: "Home",
      path: "/",
    },
    {
      item: "Services",
      subMenu: [
        { name: "Business Development & Advisory", path: "/services/business" },
        { name: "Accounting & Internal Audit", path: "/services/business" },
        { name: "Taxation", path: "/services/business" },
        { name: "License And Registrations", path: "/services/business" },
        { name: "Software Development and ITES", path: "/services/business" },
        { name: "BPO Service", path: "/services/business" },
        {
          name: "Legal Advice and Company Secretarial Work",
          path: "/services/business",
        },
        { name: "Import Solutions", path: "/services/business" },
      ],
    },
    {
      item: "Experts",
      path: "/experts",
    },
    {
      item: "Articles",
      path: "/articles",
    },
    {
      item: "Contact",
      path: "/contact-us",
    },
  ];

  return (
    <header className={`relative z-20 `}>
      <nav className="flex justify-between items-center p-6 md:px-12 text-white bg-transparent">
        {/* Logo */}
        <div
          className={`text-2xl font-bold ${pathname != "/" ? "text-black" : ""}`}
        >
          <Link href="/">RatGeber</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-semibold">
          {menuList.map((menu, idx) => (
            <li key={idx} className="">
              {menu.subMenu ? (
                // Menu item with sub-menu
                <>
                  <div
                    className="flex items-center cursor-pointer hover:text-gray-300"
                    onClick={() => toggleMenu(menu.item)}
                  >
                    <a className={`${pathname != "/" ? "text-black" : ""}`}>
                      {menu.item}
                    </a>
                    <FiChevronDown
                      className={`ml-1 w-4 h-4 ${pathname != "/" ? "text-black" : ""}`}
                    />
                  </div>
                  {activeMenu === menu.item && (
                    <div className="absolute left-0 top-full w-screen bg-white text-black py-6 shadow-lg z-10">
                      <div className="relative px-6">
                        <button
                          className="absolute top-2 right-10 text-black"
                          onClick={() => setActiveMenu(null)}
                        >
                          <FiX className="w-6 h-6" />
                        </button>
                        <h3 className="text-xl font-semibold">{menu.item}</h3>
                        <hr className="border-orange-400 my-4" />
                        <div className="grid grid-cols-3 gap-2 px-10 py-2 mx-10">
                          {menu.subMenu.map((sub, subIdx) => (
                            <div key={subIdx}>
                              <Link
                                href={sub.path}
                                className="block hover:text-orange-500 border-b-2 border-transparent hover:border-orange-500 py-2"
                              >
                                {sub.name}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                // Menu item without sub-menu
                <Link
                  href={menu.path}
                  className={`hover:text-gray-300 cursor-pointer ${pathname != "/" ? "text-black" : ""}`}
                >
                  {menu.item}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <FiX
                className={`w-8 h-8 ${pathname != "/" ? "text-black" : ""}`}
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={`w-8 h-8 ${pathname != "/" ? "text-black" : ""}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white text-black py-4 space-y-4 shadow-lg">
          {menuList.map((menu, idx) => (
            <div key={idx}>
              <div
                className="flex justify-between items-center px-4 py-2"
                onClick={() => toggleMobileSubMenu(menu.item)}
              >
                <Link href={menu.path || "#"}>{menu.item}</Link>
                {menu.subMenu && (
                  <FiPlus
                    className={`w-6 h-6 transition-transform transform ${
                      activeMobileMenu === menu.item ? "rotate-45" : ""
                    }`}
                  />
                )}
              </div>
              {menu.subMenu && activeMobileMenu === menu.item && (
                <div className="px-6 space-y-2">
                  {menu.subMenu.map((sub, subIdx) => (
                    <Link
                      key={subIdx}
                      href={sub.path}
                      className="block hover:text-orange-500"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default UpdatedNavbar;
