import UpdatedNavbar from "@/components/navbar/UpdatedNavbar";
import UpdatedNavbar2 from "@/components/navbar/UpdatedNavbar2";
import React from "react";

const Page = () => {
  return (
    <div className="font-sans">
      {/* Section 1: Background Image */}
      <div
        className="relative h-[350px] bg-cover bg-center"
        style={{ backgroundImage: "url('/finance.jpg')" }}
      >
        <UpdatedNavbar2 />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start pl-10 text-white">
          <h1 className="text-4xl md:text-6xl font-bold">
            Business Development & Advisory
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Create an amazing customer experience
          </p>
        </div>
      </div>

      {/* Section 2: In-Page Navigation */}
      <div className=" text-gray-600 py-4 border-b-2 mx-6">
        <div className=" mx-auto px-4">
          <h2 className="text-sm font-thin mb-1">
            Business Development & Advisory
          </h2>
          <ul className="flex space-x-4">
            <li>
              <a href="#overview" className="text-lg">
                Overview
              </a>
            </li>
            <li>
              <a href="#our-solutions" className="text-lg">
                Our Solutions
              </a>
            </li>
            <li>
              <a href="#our-impact" className="text-lg">
                Our Impact
              </a>
            </li>
            <li>
              <a href="#our-insights" className="text-lg">
                Our Insights
              </a>
            </li>
            <li>
              <a href="#our-experts" className="text-lg">
                Our Experts
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Section 3: Overview */}
      <div id="overview" className="container mx-auto px-4 py-8">
        <h3 className="text-3xl font-bold mb-4">Overview</h3>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3">
            <p>Your text or paragraph goes here. Describe your overview.</p>
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
      </div>

      {/* Other sections can follow the same pattern */}
    </div>
  );
};

export default Page;
