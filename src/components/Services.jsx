"use client";

import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./styles.module.css";

const services = [
  {
    num: "01",
    title: "Business Development & Advisory",
    description: `We identify growth opportunities and craft strategic plans. Our services include market analysis, strategy formulation, operational improvements, and expert advisory to enhance business performance.`,
    href: "/",
  },
  {
    num: "02",
    title: "Accounting & Internal Audit",
    description:
      "We ensure accurate financial reporting and regulatory compliance with expert financial management, risk assessment, and internal control evaluations.",
    href: "/",
  },
  {
    num: "03",
    title: "Taxation",
    description:
      "We offer tax planning, compliance, and legal counsel to navigate complex taxation and legal frameworks, ensuring optimal business operations including  company  & Personal tax filing and litigation.",
    href: "/",
  },
  {
    num: "04",
    title: "License And Registrations",
    description:
      "We handle the acquisition of licenses and registrations, streamlining administrative processes to ensure legal and efficient business operations.",
    href: "/",
  },
  {
    num: "05",
    title: "Software Development and ITES",
    description:
      "We provide custom software solutions and IT-enabled services (ITES) to enhance efficiency and drive innovation through technology consulting and support.",
    href: "/",
  },
  {
    num: "06",
    title: "FreeLancing",
    description:
      "We connect businesses with freelancers for specialized projects and offer import outsourcing solutions to optimize business operation management.",
    href: "/",
  },
  {
    num: "07",
    title: "Legal Advice and Company Secretarial Work ",
    description:
      "We provide legal guidance and company secretarial services, including corporate documentation, board management, and compliance with governance requirements.",
    href: "/",
  },
  {
    num: "08",
    title: "Import Solutions",
    description:
      "We manage supplier coordination, documentation, and import procedures to enhance efficiency and minimize costs.",
    href: "/",
  },
];

const Services = () => {
  return (
    <section className="flex flex-col justify-center mt-10">
      <h2
        className=" text-center mb-8"
        style={{
          fontSize: "42px",
          fontWeight: "bold",
          color: "#00ff99",
        }}
      >
        Our Services
      </h2>
      <div className="container mx-auto">
        <div className={`${styles["grid-container"]} px-4 md:px-8`}>
          {services.map((services, index) => {
            return (
              <div
                key={index}
                className="flex-1 flex flex-col justify-center gap-6 group"
              >
                {/* top */}
                <div className="w-full flex justify-between items-center">
                  <div className="text-2xl font-bold hover:text-accent transition-all duration-500">
                    {services.num}
                  </div>
                </div>

                {/* heading*/}
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#00ff99",
                  }}
                >
                  {services.title}
                </h2>
                <p>{services.description}</p>
                <div className="border-b border-white/20 "></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
