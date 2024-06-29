"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const images = ["/net_1.png", "/net_2.png"];

const Photo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2, duration: 0.4, ease: "easeIn" },
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeInOut" },
          }}
          exit={{ opacity: 0 }}
          className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten absolute rounded-full overflow-hidden"
        >
          <Image
            src={images[currentIndex]}
            alt=""
            priority
            quality={100}
            fill
            className="object-contain "
          />
        </motion.div>
      </motion.div>

      {/* circle */}
      <motion.svg
        className="w-[300px] xl:w-[506px] h-[300px] xl:h-[506px]"
        fill="transparent"
        viewBox="0 0 506 506"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          cx="253"
          cy="253"
          r="250"
          stroke="#00ff99"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ strokeDasharray: "24 10 0 0" }}
          animate={{
            strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
            rotate: [120, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.svg>
    </div>
  );
};

export default Photo;
