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
import Image from "next/image";
import { fetchRecent4Blogs } from "@/services/blogService";
import Link from "next/link";
import CustomCarosel from "@/components/carosel/CustomCarosel";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import UpdatedNavbar from "@/components/navbar/UpdatedNavbar";
import CountdownTimer from "@/components/count-down/CountdownTimer";

const HomeContent = () => {
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

  const ourService = [
    {
      title: `Business Development & Advisory`,
      description: `We identify growth opportunities and craft strategic plans. Our services include market analysis, strategy formulation, operational improvements, and expert advisory to enhance business performance.`,
      image: `/images/business.jpg`,
      url: ``,
    },
    {
      title: `Accounting & Internal Audit`,
      description: `We ensure accurate financial reporting and regulatory compliance with expert financial management, risk assessment, and internal control evaluations.`,
      image: `/images/acconting.jpg`,
      url: ``,
    },
    {
      title: `Taxation`,
      description: `We offer tax planning, compliance, and legal counsel to navigate complex taxation and legal frameworks.`,
      image: `/images/tax.jpg`,
      url: ``,
    },
    {
      title: `License And Registrations`,
      description: `We handle the acquisition of licenses and registrations, streamlining administrative processes.`,
      image: `/images/license.jpg`,
      url: ``,
    },
    {
      title: `Software Development and ITES`,
      description: `We provide custom software solutions and IT-enabled services (ITES)`,
      image: `/images/software.jpg`,
      url: ``,
    },
    {
      title: `BPO Service`,
      description: `We connect businesses with freelancers for specialized projects.`,
      image: `/images/freelance.jpg`,
      url: ``,
    },
    {
      title: `Legal Advice and Company Secretarial Work`,
      description: `We provide legal guidance and company secretarial services with governance requirements.`,
      image: `/images/legal.jpg`,
      url: ``,
    },
    {
      title: `Import Solutions`,
      description: `We manage supplier coordination, documentation, and import procedures to enhance efficiency and minimize costs.`,
      image: `/images/import.jpg`,
      url: ``,
    },
  ];

  const projectList = [
    {
      name: "Baby Name Nestlings",
      url: "https://babynamenestlings.com/",
      imageUrl: "/babyname.png",
    },
    {
      name: "Just For Quotes",
      url: "https://www.justforquotes.com/",
      imageUrl: "/justforquotes.png",
    },
    {
      name: "Islamic Tablig",
      url: "https://www.islamictablig.com/",
      imageUrl: "/islamic-tablig.PNG",
    },
    {
      name: "The Girlish Talk",
      url: "https://www.thegirlishtalk.com/",
      imageUrl: "/the-girlish-talk.PNG",
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

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetchRecent4Blogs();
        setBlogs(response.data); // Assuming the API returns a `data` field

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching recent blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

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

        <div className="hidden md:flex items-center justify-center my-5 absolute top-16 ">
          <iframe
            width="300"
            height="154"
            src="https://w2.countingdownto.com/5858112"
            frameBorder="0"
          ></iframe>
        </div>

        {/* Navbar */}
        <UpdatedNavbar />

        {/* Hero Content */}
        <div
          className={`relative z-10 flex flex-col items-center justify-center mt-5 md:mt-0 md:h-full text-center text-white ${isTextAnimating ? "hero-text-exit" : "hero-text-enter"}`}
        >
          <h1 className="text-5xl font-bold mb-4 md:w-[600px]">
            {" "}
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl mb-6 p-2 md:w-[600px]">
            {slides[currentSlide].description}
          </p>
          <button className="group relative h-14 w-44 flex items-center justify-center bg-transparent text-white font-bold rounded-full border-2 border-white transition-all duration-500 overflow-hidden">
            <span className="absolute left-1 h-12 w-12 border-2 border-white rounded-full transition-all duration-500 group-hover:w-[165px]"></span>

            <span className="absolute left-5 flex items-center justify-center z-10 ">
              <FaArrowRight className="text-white" />
            </span>

            <span className="ml-6 relative z-10">Read More</span>
          </button>
          {/* <a href="#" className="px-8 py-3 transparent border-2 rounded-full">
            Learn More
          </a> */}
        </div>
      </div>

      <div className="flex items-center justify-center my-5">
        <iframe
          width="300"
          height="154"
          src="https://w2.countingdownto.com/5857761"
          frameBorder="0"
        ></iframe>
      </div>

      {/* Rest of the content (services, footer, etc.) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-2xl  mb-8 text-center">
            Featured Business Consulting Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* First Row - 2 items */}
            {ourService.slice(0, 2).map((item: any, index: any) => (
              <OurWorkItem
                title={item.title}
                description={item.description}
                image={item.image}
                key={index}
              />
            ))}
          </div>

          {/* Second Row - 3 items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {ourService.slice(2, 5).map((item: any, index: any) => (
              <OurWorkItem
                title={item.title}
                description={item.description}
                image={item.image}
                key={index}
              />
            ))}
          </div>

          {/* Third Row - 3 items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {ourService.slice(5, 8).map((item: any, index: any) => (
              <OurWorkItem
                title={item.title}
                description={item.description}
                image={item.image}
                key={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section>
        <CustomCarosel />
      </section>

      {/* Recent Articles*/}

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-2xl  mb-8 text-center">Latest Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {/* First item */}
            {blogs?.map((blog: any, index: any) => (
              <div
                className="overflow-hidden border border-gray-100"
                key={index}
              >
                <img
                  src={blog.heroImage}
                  alt="Article 1"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{blog.title}</h3>
                  <a
                    href="#"
                    className="text-blue-600 font-medium inline-flex items-center"
                  >
                    <span>Read Article</span>
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Products*/}

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-2xl mb-8 text-center">Our Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectList.map((project: any, index: any) => (
              <Link key={index} href={project.url} target="_blank">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={500} // Adjust based on your image size
                    height={400} // Adjust based on your image size
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeContent;

const OurWorkItem = ({ title, description, image }: any) => {
  return (
    <div className="flex flex-col items-center md:flex-row  p-6 border border-gray-500">
      <div className="w-[400px] p-2 flex items-center justify-center">
        <Image src={image} alt={image} height={300} width={300} />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-center md:text-left">
          {title}
        </h3>
        <p className="text-gray-700 mb-2 text-center md:text-left text-sm">
          {description}
        </p>
        <a
          href="#"
          className="text-blue-600 font-medium flex items-center justify-center md:justify-start"
        >
          <span>More</span>
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
};
