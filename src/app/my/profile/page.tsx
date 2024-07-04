"use client";

import {
  fetchMyProfile,
  fetchProfileById,
  updateProfile,
} from "@/services/profileService";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import Social from "@/components/Social";
import Stats from "@/components/Stats";
import ProfilePhoto from "@/components/profile/ProfilePhoto";
import ProfileExperience from "@/components/profile/ProfileExperience";
import ProfileNavbar from "@/components/navbar/ProfileNavbar";
import ProfileArticles from "@/components/profile/ProfileArticles";
import ProfileContact from "@/components/profile/ProfileContact";
import { useEffect, useState } from "react";
import Loader from "@/utils/Loader";
import SummarySection from "./SummarySection";
import ExperienceSection from "./ExperienceSection";

const MyProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
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
  }, [dateUpdated]);

  console.log(profileData);

  const handleSummaryUpdate = async (newSummaryData: any) => {
    if (profileData) {
      setProfileData((prevData: any) => ({
        ...prevData,
        ...newSummaryData,
      }));

      setDateUpdated(!dateUpdated);
    }

    console.log("new data", profileData);
  };

  return (
    <section className="h-full ">
      <SummarySection
        profileData={profileData}
        handleSummaryUpdate={handleSummaryUpdate}
      />

      <div className="container mx-auto h-full md:w-[70%] ">
        <Stats />
      </div>

      <div
        className="container mx-auto h-full mt-[100px] md:w-[70%]"
        id="qualification"
      >
        <ExperienceSection />
      </div>

      <div className="container mx-auto  mt-[100px] md:w-[70%]" id="articles">
        <ProfileArticles email={profileData?.email} />
      </div>

      <div className="container mx-auto mt-[100px] md:w-[70%]" id="contact">
        <ProfileContact />
      </div>
      <Loader loading={loading} />
    </section>
  );
};

export default MyProfilePage;
