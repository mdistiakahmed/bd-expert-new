"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/blog/Card";
import { compile, convert } from "html-to-text";
import Pagination from "@mui/material/Pagination";

import { Timestamp } from "firebase/firestore";
import { deleteBlogById, fetchBlogs } from "@/services/blogService";
import Loader from "@/utils/Loader";
import { useRouter } from "next/navigation";

function timestampToDateString(timestamp: Timestamp): string {
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  return date.toDateString();
}

const AllBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const result = await fetchBlogs(page, 5);

        setBlogs(result.data);
        setTotalPages(Math.ceil(result.total / 5));
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

  const handleDelete = async (slug: any) => {
    try {
      setLoading(true);
      await deleteBlogById(slug);
      const result = await fetchBlogs(page, 5);
      setBlogs(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleUpdate = async (slug: any) => {
    router.push(`/articles/${slug}/edit`);
  };

  const cards = blogs?.map((d: any) => {
    const options = {
      wordwrap: 130,
    };
    const html = convert(d.data, options);

    return (
      <Card
        key={d.id}
        title={d.title}
        content={html.trim().substring(0, 100)}
        author={d.author}
        publishedDate={timestampToDateString(d.created_at)}
        tags={d.tags}
        id={d.id}
        imageUrl={d.imageUrl}
        slug={d.slug}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    );
  });

  return (
    <>
      <div className="hidden sm:flex items-center justify-center">
        <div className="w-[70vw] flex flex-col gap-5 m-5 items-center bg-white p-10 rounded-lg">
          {cards}
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
          />
        </div>
      </div>
      <div className="flex sm:hidden">
        <div className="w-full flex flex-col gap-5 m-5 items-center bg-white p-4 rounded-lg">
          {cards}
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
          />
        </div>
      </div>
      <Loader loading={loading} />
    </>
  );
};

export default AllBlogsPage;
