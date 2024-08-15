"use client";

import { urlForImage } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import Image from "next/image";

const ProfilePhoto = ({ imgUrl }: any) => {
  return (
    <div className="w-full h-full relative">
      {/* image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 1, duration: 0.4, ease: "easeIn" },
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 1.4, duration: 0.4, ease: "easeInOut" },
          }}
          exit={{ opacity: 0 }}
          className="w-[298px] h-[298px]  mix-blend-lighten absolute rounded-full overflow-hidden"
        >
          {imgUrl && (
            <Image
              src={urlForImage(imgUrl)}
              alt="A"
              priority
              quality={100}
              fill
              className="object-contain "
            />
          )}
        </motion.div>
      </motion.div>

      {/* circle */}
      <motion.svg
        className="w-[300px]  h-[300px] "
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

export default ProfilePhoto;
