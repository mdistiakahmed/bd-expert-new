"use client";

import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./styles.module.css";

const services = [
  {
    num: "01",
    title: "Tax Consultancy",
    description:
      "Maximize savings with expert tax consultancy. Our professionals offer personalized tax planning, compliance, and advisory services, ensuring accurate filings and minimized liabilities. Navigate complex tax laws confidently and efficiently with us.",
    href: "/",
  },
  {
    num: "02",
    title: "Financial Guide",
    description:
      "Achieve financial success with our expert financial guide. We offer personalized planning, investment strategies, and budgeting advice. Navigate your financial journey confidently and make informed decisions to secure your future.",
    href: "/",
  },
  {
    num: "03",
    title: "Investment Road",
    description:
      "Navigate the investment road with confidence. Our expert guidance offers tailored strategies, risk management, and market insights to help you achieve your financial goals effectively and securely.",
    href: "/",
  },
  {
    num: "04",
    title: "Web Development",
    description:
      "Web development transforms ideas into functional websites. Our services include custom design, responsive development, and optimization, ensuring seamless user experiences and effective digital presence for businesses of all sizes.",
    href: "/",
  },
];

const Services = () => {
  return (
    <section className="flex flex-col justify-center py-12 mt-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
          }}
          className={`${styles["grid-container"]} px-4 md:px-8`}
        >
          {services.map((services, index) => {
            return (
              <div
                key={index}
                className="flex-1 flex flex-col justify-center gap-6 group"
              >
                {/* top */}
                <div className="w-full flex justify-between items-center">
                  <div className="text-4xl font-bold hover:text-accent transition-all duration-500">
                    {services.num}
                  </div>
                  <Link
                    href={services.href}
                    className={`${styles["link-style"]}`}
                  >
                    <BsArrowDownRight className="text-primary text-3xl" />
                  </Link>
                </div>

                {/* heading*/}
                <h2
                  style={{
                    fontSize: "42px",
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
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
