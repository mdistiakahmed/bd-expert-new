import { fetchRecent4Blogs } from "@/services/blogService";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const RecentBlogs = async () => {
  const { data: blogs } = await fetchRecent4Blogs();

  return (
    <div className="p-6 my-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Recent Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs?.map((blog: any, index: any) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <Link href={`/articles/${blog.slug.current}`}>
              <div className="cursor-pointer flex flex-col items-center justify-center">
                <h3 className="text-lg font-bold p-4 text-black">
                  {blog.title}
                </h3>
                <h3 className="text-sm font-bold pr-4 pb-4 text-black self-end">
                  Published At {blog.publishedAt.split("T")[0]}
                </h3>
                <Image
                  src={blog.heroImage}
                  alt={blog.title}
                  width={400}
                  height={200}
                />

                <div className="flex items-center justify-center pb-2">
                  <span className="text-black px-5">Continue Reading..</span>

                  <Image
                    src="/button-arrow.svg"
                    height={20}
                    width={80}
                    alt="see more"
                  />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;
