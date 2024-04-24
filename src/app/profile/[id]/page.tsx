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
  name: string;
  title: string;
  image_url: string;
  experiences: Experience[];
  education: Education[];
}

export default function ProfilePage() {
  const [open, setOpen] = useState(false);
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

  useEffect(() => {}, [profileResponse, profileResponse.education]);

  const handleEducationSubmit = (newEducationData: any) => {
    setProfileResponse1((prevData) => ({
      ...prevData,
      education: [...prevData.education, newEducationData],
    }));
  };

  const handleExperienceSubmit = (newExperienceData: any) => {
    console.log(newExperienceData);
    setProfileResponse1((prevData) => ({
      ...prevData,
      experiences: [...prevData.experiences, newExperienceData],
    }));

    console.log(profileResponse);
  };

  const handleExperienceUpdate = (updatedExperienceData: any) => {
    console.log(updatedExperienceData);
  };

  const handleEducationUpdate = (newEducationData: any) => {
    console.log(newEducationData);
  };

  const handleEducationDelete = (toDeleteData: any) => {
    const updatedEducationData = profileResponse.education.filter(
      (e) => e.degree != toDeleteData.degree
    );
    setProfileResponse1((prevData) => ({
      ...prevData,
      education: updatedEducationData,
    }));
  };

  const experienceCard = profileResponse.experiences.map((e) => {
    return (
      <ExperienceCard
        key={e.company_name}
        {...e}
        handleUpdate={handleExperienceUpdate}
      />
    );
  });

  const educationCard = profileResponse.education.map((e, index) => {
    return (
      <EducationCard
        key={index}
        {...e}
        handleDelete={handleEducationDelete}
        handleUpdate={handleEducationUpdate}
      />
    );
  });

  return (
    <>
      <div className="hidden sm:flex">
        <div className="w-[60vw] flex flex-col gap-5 p-5 bg-gray-200">
          <AvatarCard
            name={profileResponse.name}
            title={profileResponse.title}
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

        <div className="w-[30vw]">
          <div className="w-full flex flex-col gap-5 m-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum porro
            maiores vel voluptatum ex. Nobis et ipsum ullam nihil perspiciatis.
            Culpa eos adipisci doloremque rem itaque consectetur excepturi
            necessitatibus omnis!
          </div>
        </div>
      </div>
      <div className="sm:hidden flex flex-col gap-5 p-5 bg-gray-200">
        <AvatarCard name={profileResponse.name} title={profileResponse.title} />

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
    </>
  );
}
