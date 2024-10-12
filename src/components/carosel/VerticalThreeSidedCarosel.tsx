"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const sections = [
  {
    number: 1,
    title: "Simplify your business",
    description:
      "Take control of the complexity of your business with real-time insights...",
    image: "/images/business.jpg",
    alt: "Restaurant food cost software on mobile phones",
  },
  {
    number: 2,
    title: "Transparent pricing",
    description: "MarginEdge costs $330 per month, per location...",
    image: "/images/tax.jpg",
    alt: "Transparent pricing",
  },
  {
    number: 3,
    title: "Who the hell are we?",
    description:
      "Together we empower restaurants with a holistic software solution...",
    image: "/images/software.jpg",
    alt: "Client restaurants and CEO Bo Davis",
  },
];

const VerticalThreeSidedCarousel = () => {
  const [activeSection, setActiveSection] = useState(1);

  useEffect(() => {
    AOS.init({ duration: 1000 });
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
      <div className="sticky top-44 h-screen w-1/5">
        <div className="flex flex-col items-start relative">
          {sections.map((section) => (
            <div
              key={section.number}
              className={` cursor-pointer p-4 flex items-center`}
              onClick={() => handleNavigationClick(section.number)} // Add onClick
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

              {/* Custom stylish rounded checkbox */}
              <span
                className={`inline-block w-6 h-6 rounded-full border-2 transition-all duration-500 ${
                  activeSection === section.number
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-500 bg-white"
                } mr-4`}
              ></span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="w-4/5">
        {sections.map((section) => (
          <div
            key={section.number}
            id={`content-section-${section.number}`}
            data-section={section.number}
            className={`content-section py-24 flex items-center`}
            data-aos="zoom-in"
            data-aos-duration="2000"
          >
            {/* Section Text */}
            <div className="w-1/2 p-4">
              <h2 className="text-3xl font-bold">
                {section.number}. {section.title}
              </h2>
              <p className="text-lg">{section.description}</p>
            </div>

            {/* Section Image */}
            <div className="w-1/2 p-4">
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
