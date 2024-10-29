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
    title: "Strategic Tax Planning and Optimization",
    description:
      "We create tailored tax strategies that maximize deductions, credits, and exemptions, improving the financial health of your business.",
    image: "/images/business.jpg",
    alt: "Restaurant food cost software on mobile phones",
  },
  {
    number: 2,
    title: "Corporate and Personal Tax Filing",
    description: `Ratgeber handles all aspects of tax filing for corporations and individuals, ensuring accuracy and compliance with local and international tax codes.`,
    image: "/images/tax.jpg",
    alt: "Transparent pricing",
  },
  {
    number: 3,
    title: "Litigation Support and Dispute Resolution",
    description: `Our tax experts assist clients with audit defense, appeals, and tax dispute resolution, providing essential advocacy and representation when needed.`,
    image: "/images/software.jpg",
    alt: "Client restaurants and CEO Bo Davis",
  },
  {
    number: 4,
    title: "Compliance and Regulatory Updates",
    description:
      "We proactively monitor tax legislation changes, offering timely guidance and adjustments to keep clients compliant and ahead of regulatory shifts.",
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
          <h1 className="text-4xl md:text-6xl font-bold">Taxation</h1>
          <p className="mt-4 text-lg md:text-xl">
            Comprehensive Tax Planning, Compliance, and Advocacy
          </p>
        </div>
      </div>

      <div className="px-2 md:px-10">
        {/* Section 2: In-Page Navigation */}

        <div className="sticky top-0 bg-white text-gray-600 pt-4  border-b-2 border-gray-300  z-10 whitespace-nowrap ">
          <div className=" px-4">
            <div>
              <h2 className="text-sm font-thin mb-1">Taxation</h2>

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
                Navigating tax complexities requires a partner with both
                technical expertise and a strategic approach. Ratgeber’s
                Taxation services cover everything from tax planning and filing
                to litigation support. We help businesses mitigate tax risks,
                leverage tax incentives, and stay compliant, ensuring financial
                operations remain optimized.
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
                Effective tax management goes beyond compliance; it can be a
                strategic tool for financial optimization. With frequent
                regulatory changes, businesses need a partner who anticipates
                shifts and adapts strategies accordingly. Our approach
                emphasizes proactive tax planning, helping clients leverage
                credits, deductions, and incentives available within local and
                international frameworks. We conduct detailed tax scenario
                analyses, enabling businesses to make informed decisions on tax
                structures and minimize liabilities. Moreover, our litigation
                support and dispute resolution expertise ensure clients are
                prepared to handle audits and inquiries effectively, giving them
                a secure foundation for growth and stability.
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
                Our Taxation experts are proficient in all aspects of tax
                strategy, compliance, and litigation support. With years of
                experience managing tax, VAT, and customs for multiple sectors,
                they possess a comprehensive understanding of complex tax
                regulations. Their skills in tax planning, compliance
                monitoring, and dispute resolution help clients optimize their
                tax obligations, minimize liabilities, and navigate changing tax
                landscapes with confidence.
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
