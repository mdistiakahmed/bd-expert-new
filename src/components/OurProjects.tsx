import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrowDownRight } from "react-icons/bs";
import styles from "./styles.module.css";

const OurProjects = () => {
  const projectList = [
    {
      name: "Baby Name Nestlings",
      url: "https://babynamenestlings.com/",
      description: `Your ultimate destination for finding the perfect baby name. 
            Explore our extensive collection of unique and meaningful baby names, 
            carefully curated to help you choose a name that your family will treasure forever.`,
      imageUrl: "/babyname.png",
    },
    {
      name: "Just For Quotes",
      url: "https://www.justforquotes.com/",
      description: `Discover the ultimate hub for daily motivation, laughter, and brain-teasing fun! 
        Explore our collection of motivational quotes, hilarious jokes, trending memes, challenging puzzles, and mind-bending riddles. 
        Your go-to source for inspiration and entertainment.`,
      imageUrl: "/justforquotes.png",
    },
  ];

  return (
    <section className="flex flex-col justify-center py-12 mt-10">
      <h2
        className=" text-center py-10"
        style={{
          fontSize: "42px",
          fontWeight: "bold",
          color: "#00ff99",
        }}
      >
        Our Products
      </h2>
      <p className="text-center p-5 text-xl">
        {`RatGeber offers a suite of innovative software solutions designed to streamline operations, enhance productivity, drive growth.
             Our products are tailored to meet the specific needs of business by providing Software Development, Maintenance and Growth.
            From Enterprise to Utility products, our solutions empower businesses to grow in its desired level.`}
      </p>
      <div className="container mx-auto my-10">
        <div>
          {projectList.map((project, index) => {
            return (
              <div key={index}>
                <div className="flex items-center justify-between md:px-10">
                  <h3 className="text-2xl text-accent">{project.name}</h3>
                  <Link
                    href={project.url}
                    className={`${styles["link-style"]}`}
                    target="_blank"
                  >
                    <BsArrowDownRight className="text-primary text-3xl" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-5 py-10">
                  <p className="text-lg text-center">{project.description}</p>
                  <Link href={project.url} target="_blank">
                    <Image
                      src={project.imageUrl}
                      alt={project.name}
                      height={400}
                      width={500}
                      className="transform transition duration-500 hover:scale-105"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurProjects;
