"use client";

import ProfileCard from "@/components/profile/ProfileCard";
import { fetchProfilesByPage } from "@/services/profileService";
import Loader from "@/utils/Loader";
import { Pagination } from "@mui/material";
import { Metadata } from "next";
import React, { useEffect, useState } from "react";

const ExpertsPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        setLoading(true);
        const result = await fetchProfilesByPage(page, 10);

        setProfiles(result.data);
        setTotalPages(Math.ceil(result.total / 10));
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
      }
    };

    loadAccounts();
  }, [page]);

  const cards = profiles?.map((d: any) => {
    return (
      <ProfileCard
        key={d.id}
        name={d.name}
        title={d.title}
        image_url={d.image_url}
        id={d.id}
        slug={d.slug}
      />
    );
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className=" md:w-[70vw] flex flex-col gap-5 m-5 items-center justify-center">
        {cards}
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </div>
      <Loader loading={loading} />
    </div>
  );
};

export default ExpertsPage;
