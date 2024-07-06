"use client";

import { fetchMyProfile, updateProfile } from "@/services/profileService";
import ProfileArticles from "@/components/profile/ProfileArticles";
import ProfileContact from "@/components/profile/ProfileContact";
import { useEffect, useState } from "react";
import Loader from "@/utils/Loader";
import SummarySection from "./SummarySection";
import ExperienceSection from "./ExperienceSection";
import ProfileStats from "@/components/profile/ProfileStats";
import { v4 as uuidv4 } from "uuid";

const generateSlug = (title: string) => {
  const cleanedTitle = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  const uniqueId = uuidv4().substring(0, 6);
  return `${cleanedTitle}-${uniqueId}`;
};

const MyProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [dateUpdated, setDateUpdated] = useState<any>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetchMyProfile();
        setProfileData(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function updateData() {
      try {
        if (profileData) {
          setLoading(true);
          const res = await updateProfile(profileData);
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
      }
    }
    updateData();
  }, [profileData]);

  const handleUpdate = async (newData: any) => {
    if (profileData) {
      if (
        !profileData.slug ||
        (newData.name && newData.name != profileData.name)
      ) {
        newData.slug = generateSlug(newData.name ?? profileData.name);
      }

      setProfileData((prevData: any) => ({
        ...prevData,
        ...newData,
      }));
    }
  };

  return (
    <section className="h-full ">
      <SummarySection
        profileData={profileData}
        handleSummaryUpdate={handleUpdate}
      />

      <div className="container mx-auto h-full md:w-[70%] ">
        <ProfileStats profileData={profileData} />
      </div>

      <div
        className="container mx-auto h-full mt-[100px] md:w-[70%]"
        id="qualification"
      >
        <ExperienceSection
          profileData={profileData}
          handleUpdate={handleUpdate}
        />
      </div>

      <div className="container mx-auto  mt-[100px] md:w-[70%]" id="articles">
        <ProfileArticles email={profileData?.email} />
      </div>

      <div className="container mx-auto mt-[100px] md:w-[70%]" id="contact">
        <ProfileContact profileData={profileData} />
      </div>
      <Loader loading={loading} />
    </section>
  );
};

export default MyProfilePage;
