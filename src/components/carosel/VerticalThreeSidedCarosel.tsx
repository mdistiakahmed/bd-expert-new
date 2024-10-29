"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const VerticalThreeSidedCarousel = ({ sections }: any) => {
  const [activeSection, setActiveSection] = useState(1);

  useEffect(() => {
    AOS.init({ duration: 1000, disable: "mobile" });
  }, []);

  const handleScroll = () => {
    const sectionElements = document.querySelectorAll(".content-section");
    let found = false;

    sectionElements.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (!found && rect.top >= 0 && rect.top <= window.innerHeight * 0.5) {
        const sectionId = parseInt(section.getAttribute("data-section") as any);
        setActiveSection(sectionId);
        found = true;
      }
    });
  };

  const handleNavigationClick = (sectionNumber: number) => {
    const targetSection = document.getElementById(
      `content-section-${sectionNumber}`
    );
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionNumber); // Update active section on click
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex">
      {/* Sticky Navigation */}
      <div className="md:block sticky top-44 h-screen w-1/12">
        <div className="flex flex-col items-start relative">
          {sections.map((section: any) => (
            <div
              key={section.number}
              className="cursor-pointer p-4 flex items-center relative"
              onClick={() => handleNavigationClick(section.number)}
            >
              {/* Background large number */}
              <span
                className={`absolute text-8xl font-bold transition-opacity duration-500 ${
                  activeSection === section.number ? "opacity-10" : "opacity-0"
                } top-0 left-14`}
                style={{ zIndex: -1 }}
              >
                {section.number}
              </span>

              {/* Custom stylish rounded checkbox with custom check icon */}
              <span
                className={`inline-block w-6 h-6 rounded-full border-2 transition-all duration-500 relative ${
                  activeSection === section.number
                    ? "border-[#133156] bg-[#133156]"
                    : "border-[#133156] bg-white"
                } mr-4`}
              >
                {/* Custom checkmark image (shown when selected) */}
                <span
                  className={`absolute w-full h-full bottom-1 left-1 flex items-center justify-center transition-opacity duration-500 ${
                    activeSection === section.number
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  {/* Use a custom image as the check icon */}
                  <img
                    src="https://f.hubspotusercontent20.net/hubfs/6423873/2021%20Website%20Assets/img/icons/checkmark-orange.svg"
                    alt="checked"
                    className="w-6 h-6"
                  />
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="md:w-11/12">
        {sections.map((section: any) => (
          <div
            key={section.number}
            id={`content-section-${section.number}`}
            data-section={section.number}
            className={`content-section py-24 flex flex-col md:flex-row items-center`}
            data-aos="zoom-in"
            data-aos-duration="2000"
          >
            {/* Section Text */}
            <div className="md:w-1/2 pl-4">
              <h2 className="text-3xl text-center md:text-left md:text-6xl font-bold pb-4">
                {section.title}
              </h2>
              <p className="text-md text-center md:text-left md:text-lg leading-loose tracking-wide">
                {section.description}
              </p>
            </div>

            {/* Section Image */}
            <div className="w-10/12 md:w-1/2 ">
              <img
                src={section.image}
                alt={section.alt}
                className="w-full h-auto"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalThreeSidedCarousel;
