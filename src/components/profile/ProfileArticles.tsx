"use client";

import { fetchBlogsByAuthor } from "@/services/blogService";
import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";

function timestampToDateString(timestamp: Timestamp): string {
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  return date.toDateString();
}

const ProfileArticles = ({ email }: any) => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const result = await fetchBlogsByAuthor(page, 10, email as string);
        setBlogs(result.data);
        setTotalPages(Math.ceil(result.total / 10));
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
      }
    };

    loadBlogs();
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-accent text-center">
        My Articles
      </h3>

      {blogs.length > 0 && (
        <ScrollArea className="h-[600px] mt-10">
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
            {blogs.map((item: any, index) => {
              const formattedDate = timestampToDateString(item.created_at);
              return (
                <li
                  key={index}
                  className="bg-white  py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1 text-sm"
                >
                  <Link href={`/articles/${item.slug}`}>
                    <Image
                      src={item.imageUrl}
                      alt="U"
                      height={300}
                      width={300}
                    />
                    <span className="text-black">{item.title}</span>
                    <span className="text-black">
                      Published On : {formattedDate}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      )}

      {blogs.length === 0 && (
        <div className="w-full flex items-center justify-center my-[200px]">
          <h3 className="text-center text-xl">No Articles published yet</h3>
        </div>
      )}
    </div>
  );
};

export default ProfileArticles;
