"use client";

import ExperienceCard from "@/components/profile/ExperienceCard";
import AvatarCard from "@/components/profile/AvatarCard";
import EducationCard from "@/components/profile/EducationCard";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import AddEducationDialog from "@/components/profile/AddEducationDialog";
import AddExperienceDialog from "@/components/profile/AddExperienceDialog";
import { fetchMyProfile, updateProfile } from "@/services/profileService";
import Loader from "@/utils/Loader";

export interface Experience {
  company_name: string;
  title: string;
  start_date: number;
  end_date: number | null;
  achievements: string[];
  industries: string[];
  skills: string[];
  handleUpdate?: any;
}

export interface Education {
  degree: string;
  start_date: number;
  end_date: number | null;
  institution: string;
}

interface ProfileResponse {
  email?: string;
  name: string;
  title: string;
  image_url: string;
  experiences: Experience[];
  education: Education[];
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [addNewExperienceModalOpen, setAddNewExperienceModalOpen] =
    useState(false);

  const profileResponse1: ProfileResponse = {
    name: "Md Istiak Ahmed",
    title: "Software Technical Lead | React | Node | Java",
    image_url: "",
    experiences: [
      {
        company_name: "Frisbee",
        title: "Senior Full-stack Developer",
        start_date: 2022,
        end_date: 2024,
        achievements: [
          "Managed 8 people",
          "Communicate with client",
          "Made products from scratch",
        ],
        industries: ["Software", "FinTech"],
        skills: ["Java", "Python", "AWS Service"],
      },

      {
        company_name: "Enosis Solutions",
        title: "Technical Lead",
        start_date: 2024,
        end_date: null,
        achievements: [
          "Managed 8 people",
          "Communicate with client",
          "Made products from scratch",
        ],
        industries: ["Artificial Intelligence", "ERP"],
        skills: ["React", "Angular", "GCP Service"],
      },
    ],
    education: [
      {
        degree: "B.Sc in CSE",
        start_date: 2014,
        end_date: 2018,
        institution: "Bangladesh University of Engineering and Technology",
      },
      {
        degree: "HSC in Science",
        start_date: 2011,
        end_date: 2013,
        institution: "Comilla Victoria Gov. College",
      },
      {
        degree: "SSC in Science",
        start_date: 2009,
        end_date: 2010,
        institution: "Ibn Taimia School & College",
      },
    ],
  };

  const [profileResponse, setProfileResponse1] = useState(profileResponse1);

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

  const handleEducationSubmit = async (newEducationData: any) => {
    if (profileData) {
      setProfileData((prevData: any) => ({
        ...prevData,
        education: [...prevData.education, newEducationData],
      }));
    }
  };

  const handleEducationUpdate = (newEducationData: any) => {
    const { index, ...restEducationData } = newEducationData;
    if (profileData && typeof index === "number") {
      setProfileData((prevData: any) => {
        const updatedEducation = [...prevData.education];
        updatedEducation[index] = restEducationData;
        return {
          ...prevData,
          education: updatedEducation,
        };
      });
    }
  };

  const handleEducationDelete = (toDeleteData: any) => {
    const { index } = toDeleteData;
    if (profileData && typeof index === "number") {
      setProfileData((prevData: any) => {
        const updatedEducation = prevData.education.filter(
          (_: any, i: number) => i !== index
        );
        return {
          ...prevData,
          education: updatedEducation,
        };
      });
    }
  };

  const handleExperienceSubmit = (newExperienceData: any) => {
    if (profileData) {
      setProfileData((prevData: any) => ({
        ...prevData,
        experiences: [...prevData.experiences, newExperienceData],
      }));
    }
  };

  const handleExperienceUpdate = (updatedExperienceData: any) => {
    const { index, ...restExperienceData } = updatedExperienceData;
    if (profileData && typeof index === "number") {
      setProfileData((prevData: any) => {
        const updatedExperiences = [...prevData.experiences];
        updatedExperiences[index] = updatedExperienceData;
        return {
          ...prevData,
          experiences: updatedExperiences,
        };
      });
    }
  };

  const handleExperienceDelete = (updatedExperienceData: any) => {
    const { index } = updatedExperienceData;
    if (profileData && typeof index === "number") {
      setProfileData((prevData: any) => {
        const updatedExperiences = prevData.experiences.filter(
          (_: any, i: number) => i !== index
        );
        return {
          ...prevData,
          experiences: updatedExperiences,
        };
      });
    }
  };

  const handleProfileUpdate = (data: any) => {
    setProfileData((prevData: any) => {
      return {
        ...prevData,
        ...data,
      };
    });
  };

  const experienceCard = profileData?.experiences.map((e: any, index: any) => {
    return (
      <ExperienceCard
        key={index}
        {...e}
        handleUpdate={handleExperienceUpdate}
        handleDelete={handleExperienceDelete}
        index={index}
      />
    );
  });

  const educationCard = profileData?.education.map((e: any, index: any) => {
    return (
      <EducationCard
        key={index}
        {...e}
        handleDelete={handleEducationDelete}
        handleUpdate={handleEducationUpdate}
        index={index}
      />
    );
  });

  return (
    <>
      <div className="hidden sm:flex items-center justify-center bg-gray-200">
        <div className="w-[60vw] flex flex-col gap-5 p-5 bg-gray-200">
          <AvatarCard
            name={profileData?.name || ""}
            title={profileData?.title || ""}
            imageUrl={profileData?.image_url || ""}
            handleUpdate={handleProfileUpdate}
          />

          <div className="rounded-lg bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Experience</h2>
              <Tooltip title="Add Experience" placement="top">
                <Fab
                  size="small"
                  aria-label="add"
                  sx={{
                    backgroundColor: "white",
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                    },
                  }}
                  onClick={() => setAddNewExperienceModalOpen(true)}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            </div>

            {experienceCard}
          </div>

          <div className="rounded-lg bg-white  p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Education</h2>
              <Tooltip title="Add Education" placement="top">
                <Fab
                  size="small"
                  aria-label="add"
                  sx={{
                    backgroundColor: "white",
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                    },
                  }}
                  onClick={() => setOpen(true)}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            </div>

            {educationCard}
          </div>
        </div>
      </div>
      <div className="sm:hidden flex flex-col gap-5 p-5 bg-gray-200">
        <AvatarCard
          name={profileData?.name || ""}
          title={profileData?.title || ""}
          imageUrl={profileData?.image_url || ""}
          handleUpdate={handleProfileUpdate}
        />

        <div className="rounded-lg bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Experience</h2>
            <Tooltip title="Add Experience" placement="top">
              <Fab
                size="small"
                aria-label="add"
                sx={{
                  backgroundColor: "white",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </div>

          {experienceCard}
        </div>

        <div className="rounded-lg bg-white  p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Education</h2>
            <Tooltip title="Add Education" placement="top">
              <Fab
                size="small"
                aria-label="add"
                sx={{
                  backgroundColor: "white",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
                onClick={() => setOpen(true)}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </div>

          {educationCard}
        </div>
      </div>
      <AddEducationDialog
        open={open}
        setOpen={setOpen}
        onSubmit={handleEducationSubmit}
      />

      <AddExperienceDialog
        open={addNewExperienceModalOpen}
        setOpen={setAddNewExperienceModalOpen}
        onSubmit={handleExperienceSubmit}
      />
      <Loader loading={loading} />
    </>
  );
}
