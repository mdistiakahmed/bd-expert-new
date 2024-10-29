"use client";
import VerticalThreeSidedCarosel from "@/components/carosel/VerticalThreeSidedCarosel";
import UpdatedNavbar from "@/components/navbar/UpdatedNavbar";
import UpdatedNavbar2 from "@/components/navbar/UpdatedNavbar2";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const sections = [
  {
    number: 1,
    title: "Custom Software Development",
    description:
      "From enterprise resource planning systems to customer-facing applications, we build solutions that fit your unique specifications and industry requirements.",
    image: "/images/business.jpg",
    alt: "Restaurant food cost software on mobile phones",
  },
  {
    number: 2,
    title: "IT-Enabled Services (ITES)",
    description: ` Our ITES offerings include data processing, customer support, and back-office functions, designed to enhance productivity and operational efficiency.`,
    image: "/images/tax.jpg",
    alt: "Transparent pricing",
  },
  {
    number: 3,
    title: "Focus on AI, Security, and Emerging Technologies",
    description: `We integrate cutting-edge technologies like artificial intelligence, machine learning, and cybersecurity protocols into our software, ensuring innovation and robust data protection.`,
    image: "/images/software.jpg",
    alt: "Client restaurants and CEO Bo Davis",
  },
  {
    number: 4,
    title: "Comprehensive Implementation and Support",
    description:
      "Ratgeber manages the full software lifecycle, from design and development to deployment and ongoing support, ensuring seamless integration with your existing infrastructure.",
    image: "/images/business.jpg",
    alt: "Restaurant food cost software on mobile phones",
  },
];

const Page = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="">
      {/* Section 1: Background Image */}
      <div
        className="relative h-[350px] bg-cover bg-center"
        style={{ backgroundImage: "url('/finance.jpg')" }}
      >
        <UpdatedNavbar2 />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start pl-10 text-white">
          <h1 className="text-4xl md:text-6xl font-bold">
            Software Development and ITES
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Driving Innovation with Tailored Software and IT-Enabled Solutions
          </p>
        </div>
      </div>

      <div className="px-2 md:px-10">
        {/* Section 2: In-Page Navigation */}

        <div className="sticky top-0 bg-white text-gray-600 pt-4  border-b-2 border-gray-300  z-10 whitespace-nowrap ">
          <div className=" px-4">
            <div>
              <h2 className="text-sm font-thin mb-1">
                Software Development and ITES
              </h2>

              <Link
                href={`https://www.ratgeberltd.com/contact-us`}
                target="_blank"
                className="hidden md:flex absolute right-10 bottom-4 h-12 w-48 z-20 bg-[#e1523d] text-white rounded-md  items-center justify-center hover:bg-orange-600"
              >
                Contact Our Experts
                <FaArrowRight className="ml-2" />
              </Link>
            </div>
            <ul className="flex space-x-4 overflow-x-auto scrollbar-hide ">
              <li className="relative">
                <a
                  href="#overview"
                  className={`text-lg    ${activeTab === "overview" ? "font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black" : ""}`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </a>
              </li>
              <li className="relative">
                <a
                  href="#our-solutions"
                  className={`text-lg  ${activeTab === "our-solutions" ? "font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black" : "hover:text-orange-500"}`}
                  onClick={() => setActiveTab("our-solutions")}
                >
                  Our Solutions
                </a>
              </li>
              {/* <li className="relative">
                <a
                  href="#our-impact"
                  className={`text-lg   ${activeTab === "our-impact" ? "font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black" : "hover:text-orange-500"}`}
                  onClick={() => setActiveTab("our-impact")}
                >
                  Our Impact
                </a>
              </li> */}
              <li className="relative">
                <a
                  href="#our-insights"
                  className={`text-lg  ${activeTab === "our-insights" ? "font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black" : "hover:text-orange-500"}`}
                  onClick={() => setActiveTab("our-insights")}
                >
                  Our Insights
                </a>
              </li>
              <li className="relative">
                <a
                  href="#our-experts"
                  className={`text-lg  ${activeTab === "our-experts" ? "font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black" : "hover:text-orange-500"}`}
                  onClick={() => setActiveTab("our-experts")}
                >
                  Our Experts
                </a>
              </li>
              <li className="">
                <div className="md:px-4 py-2">
                  <div className="h-8 px-4 py-2"></div>
                </div>
              </li>
              <li className="md:hidden">
                <div className="py-2">
                  <div className="h-8  py-2"></div>
                  <div className="relative">
                    <Link
                      href={`https://www.ratgeberltd.com/contact-us`}
                      target="_blank"
                      className=" flex absolute  bottom-0 h-10 w-48 z-20 bg-[#e1523d] text-white rounded-md  items-center justify-center hover:bg-orange-600"
                    >
                      Contact Our Experts
                      <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 3: Overview */}

        <div
          id="overview"
          className="mx-auto px-4 py-8 scroll-mt-16 text-center md:text-left"
        >
          <h3 className="text-3xl font-bold mb-4 ">Overview</h3>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 flex flex-col gap-5">
              <h4 className="text-2xl font-semibold mb-2">
                Ratgeber’s Software Development and ITES (IT-Enabled Services)
                offer a range of custom technology solutions to meet diverse
                business needs. We leverage advanced methodologies, including
                agile development and rigorous testing, to create software that
                not only meets but exceeds client expectations. Our ITES support
                services also enhance operational effectiveness, making
                technology a key enabler for our clients’ success.
              </h4>
              <div className="w-16 h-1 bg-orange-500 mb-4 self-center md:self-start"></div>
            </div>
            <div className="md:w-1/3 md:pl-8">
              <h4 className="text-xl font-semibold mb-2">
                Featured Case Studies
              </h4>
              <ul className="list-none">
                <li className="flex items-center mb-2">
                  <FiArrowRight className="text-orange-500 mr-2" />
                  <a
                    href="https://www.ratgeberltd.com/articles"
                    className="text-blue-600"
                    target="_blank"
                  >
                    Case Study 1
                  </a>
                </li>
                <li className="flex items-center mb-2">
                  <FiArrowRight className="text-orange-500 mr-2" />
                  <a
                    href="https://www.ratgeberltd.com/articles"
                    className="text-blue-600"
                    target="_blank"
                  >
                    Case Study 2
                  </a>
                </li>
                <li className="flex items-center mb-2">
                  <FiArrowRight className="text-orange-500 mr-2" />
                  <a
                    href="https://www.ratgeberltd.com/articles"
                    className="text-blue-600"
                    target="_blank"
                  >
                    Case Study 3
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3: our-solutions */}
        <div id="our-solutions" className=" mx-auto md:px-16 py-8 scroll-mt-16">
          <VerticalThreeSidedCarosel sections={sections} />
        </div>

        {/* Section 3: our-impact */}
        {/* <div id="our-impact" className=" mx-auto px-4 py-8 scroll-mt-16">
          <h3 className="text-3xl font-bold mb-4">our-impact</h3>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
            <div className="md:w-1/3 md:pl-8">
              <h4 className="text-xl font-semibold mb-2">Related Links</h4>
              <ul className="list-disc list-inside">
                <li>
                  <a href="#" className="text-blue-600">
                    Link 1
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600">
                    Link 2
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600">
                    Link 3
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div> */}

        {/* Section 3: our-insights */}
        <div id="our-insights" className=" mx-auto px-4 py-8 scroll-mt-16">
          <h3 className="text-3xl font-bold mb-4">Our Insight</h3>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3">
              <p>
                Custom software can be a key driver of productivity and
                competitive advantage, but only when it aligns with a company’s
                specific goals and challenges. Our insight is that successful
                software solutions start with a deep understanding of business
                objectives and an emphasis on adaptability. From AI integration
                to cybersecurity protocols, we ensure that every tool we build
                is secure, scalable, and tailored to meet each client’s unique
                needs. Our IT-enabled services (ITES) provide additional
                operational support, handling back-office processes and data
                management, allowing clients to focus on high-impact
                initiatives. With a focus on emerging technologies, we design
                solutions that future-proof our clients’ operations.
              </p>
            </div>
            <div className="md:w-1/3 md:pl-8">
              <h4 className="text-xl font-semibold mb-2">Related Links</h4>
              <ul className="list-inside list-none">
                <li className="flex items-center mb-2">
                  <FiArrowRight className="text-orange-500 mr-2" />
                  <a
                    href="https://www.ratgeberltd.com/articles"
                    target="_blank"
                    className="text-blue-600"
                  >
                    Article Link
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3: our-experts */}
        <div id="our-experts" className=" mx-auto px-4 py-8 scroll-mt-16">
          <h3 className="text-3xl font-bold mb-4">Our Experts</h3>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3">
              <p>
                Our Software Development and ITES team includes skilled software
                developers and IT specialists with a focus on creating
                innovative, secure, and user-centric solutions. With experience
                in AI integration, cybersecurity, and custom software
                development, they deliver technology that enhances productivity
                and adapts to evolving business needs. This team’s dedication to
                quality ensures that clients receive scalable, future-proof
                software and IT-enabled services that support long-term growth.
              </p>
            </div>
            <div className="md:w-1/3 md:pl-8">
              <h4 className="text-xl font-semibold mb-2">Related Links</h4>
              <ul className="list-inside list-none">
                <li className="flex items-center mb-2">
                  <FiArrowRight className="text-orange-500 mr-2" />
                  <a
                    href="https://www.ratgeberltd.com/articles"
                    target="_blank"
                    className="text-blue-600"
                  >
                    Article Link
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Other sections can follow the same pattern */}
    </div>
  );
};

export default Page;
