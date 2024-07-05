"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import ExperienceUpdateDialog from "./ExperienceUpdateDialog";

const ExperienceSection = ({ profileData, handleUpdate }: any) => {
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const aboutMe = [
    {
      fieldName: "Name",
      fieldValue: profileData?.name,
    },
    {
      fieldName: "Phone",
      fieldValue: profileData?.aboutMe?.phone,
    },
    {
      fieldName: "Experience",
      fieldValue: profileData?.yearOfExperience,
    },
    {
      fieldName: "Nationality",
      fieldValue: profileData?.aboutMe?.nationality,
    },
    {
      fieldName: "Email",
      fieldValue: profileData?.aboutMe?.email,
    },
    {
      fieldName: "Languages",
      fieldValue: profileData?.aboutMe?.languages,
    },
  ];

  return (
    <div className=" flex items-center justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <div className="flex mx-auto w-[100px] justify-center border border-accent rounded-md m-5">
          <IconButton
            aria-label="edit"
            className="border border-red-500"
            onClick={() => setUpdateDialogOpen(true)}
          >
            <p className="text-white pr-2 text-sm">Edit</p>
            <EditIcon className="text-accent" />
          </IconButton>
        </div>
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col w-full max-w-[300px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About me</TabsTrigger>
          </TabsList>

          <div className=" w-full">
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-2xl font-bold">My Experiences</h3>

                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {profileData?.experienceList.map(
                      (item: any, index: any) => {
                        return (
                          <li
                            key={index}
                            className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                          >
                            <span className="text-accent text-sm">
                              {item.startDate} - {item.endDate}
                            </span>
                            <h3 className="text-sm max-w-[260px] min-h-[40px] text-center lg:text-left">
                              {item.position}
                            </h3>
                            <div className="flex items-center gap-3">
                              <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                              <p className="text-white/60 text-sm">
                                {item.companyName}
                              </p>
                            </div>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">My Education</h3>

                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {profileData?.educatoinList?.map(
                      (item: any, index: any) => {
                        return (
                          <li
                            key={index}
                            className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1 text-sm"
                          >
                            <span className="text-accent">
                              {item.startDate}
                            </span>
                            <h3 className="max-w-[260px] min-h-[40px] text-center lg:text-left">
                              {item.degree}
                            </h3>
                            <div className="flex items-center gap-3">
                              <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                              <p className="text-white/60">
                                {item.institution}
                              </p>
                            </div>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">My Skills</h3>
                </div>

                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                  {profileData?.skillList?.map((skill: any, index: any) => {
                    return (
                      <li key={index}>
                        <div className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                          <div className="text-sm group-hover:text-accent transition-all duration-300">
                            {skill}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>

            <TabsContent
              value="about"
              className="w-full text-center xl:text-left"
            >
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">About me</h3>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0 text-sm">
                  {aboutMe.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="flex items-center justify-center xl:justify-start gap-4"
                      >
                        <span className="text-white/60">{item.fieldName}</span>
                        <span className="font-bold">{item.fieldValue}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <ExperienceUpdateDialog
        open={updateDialogOpen}
        setOpen={setUpdateDialogOpen}
        profileData={profileData}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default ExperienceSection;
