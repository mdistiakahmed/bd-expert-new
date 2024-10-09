"use client";

import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { FiArrowRight } from "react-icons/fi";
import Services from "@/components/Services";
import OurProjects from "@/components/OurProjects";
import HomeSocial from "@/components/HomeSocial";
import RecentBlogs from "@/components/blog/RecentBlogs";
import Head from "next/head";
import { useEffect, useState } from "react";

const HomeContent = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const slides = [
    {
      image: "/meeting.jpg",
      title: "Expert Money and Tax Management Counseling",
      description:
        "Optimize your finances with expert tax management and smart investment strategies for maximum savings.",
      link: "#",
    },
    {
      image: "/finance.jpg",
      title: "Grow Your Wealth with Strategic Investments",
      description:
        "Our experts will help you invest wisely to secure your financial future.",
      link: "#",
    },
    {
      image: "/sw-dev.jpg",
      title: "Tailored Financial Consulting Services",
      description:
        "Customized financial solutions for businesses and individuals.",
      link: "#",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTextAnimating, setIsTextAnimating] = useState(false);
  const [zoomEffectClass, setZoomEffectClass] = useState("zoom-in");
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setIsTextAnimating(true);
      setZoomEffectClass("");

      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTextAnimating(false);
        setZoomEffectClass("zoom-in");
      }, 1000);
    }, 10000); // Change every 5 seconds
    return () => clearInterval(slideInterval); // Clear interval on component unmount
  }, [slides.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div
        className={`relative bg-cover bg-center h-screen overflow-hidden hero-background ${zoomEffectClass}`}
        style={
          {
            "--background-image": `url(${slides[currentSlide].image})`, // Dynamically set background image
          } as React.CSSProperties
        }
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Navbar */}
        <header className="relative z-20">
          <nav className="flex justify-between items-center p-6 md:px-12 text-white bg-transparent">
            {/* Logo */}
            <div className="text-2xl font-bold">
              <a href="#">RatGeber</a>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-8 font-semibold">
              <li className="relative group">
                <a href="#" className="hover:text-gray-300">
                  Solutions
                </a>
                <ul className="absolute hidden group-hover:block mt-2 bg-white text-black shadow-lg py-2 space-y-2">
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Restructuring
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Risk Management
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Crisis Response
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Contact
                </a>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                className="text-white focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </nav>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white text-black py-4 space-y-4 shadow-lg">
              <a href="#" className="block px-4 py-2">
                Solutions
              </a>
              <a href="#" className="block px-4 py-2">
                Services
              </a>
              <a href="#" className="block px-4 py-2">
                About Us
              </a>
              <a href="#" className="block px-4 py-2">
                Contact
              </a>
            </div>
          )}
        </header>

        {/* Hero Content */}
        <div
          className={`relative z-10 flex flex-col items-center justify-center h-full text-center text-white ${isTextAnimating ? "hero-text-exit" : "hero-text-enter"}`}
        >
          <h1 className="text-5xl font-bold mb-4 md:w-[600px]">
            {" "}
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl mb-6 p-2 md:w-[600px]">
            {slides[currentSlide].description}
          </p>
          <a href="#" className="px-8 py-3 transparent border-2 rounded-full">
            Learn More
          </a>
        </div>
      </div>

      {/* Rest of the content (services, footer, etc.) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Corporate Finance</h3>
              <p className="text-gray-700">
                Expert advisory services in restructuring, M&A, and financial
                analytics.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                Economic Consulting
              </h3>
              <p className="text-gray-700">
                Leading insights in economics and statistical analysis for legal
                cases.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                Strategic Communications
              </h3>
              <p className="text-gray-700">
                Building and protecting corporate reputation in dynamic
                environments.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Home = () => {
  return <HomeContent />;
};

export default Home;
