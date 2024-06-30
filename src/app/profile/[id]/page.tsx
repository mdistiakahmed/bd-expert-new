import Social from "@/components/Social";
import { fetchProfileById } from "@/services/profileService";
import { Avatar } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Metadata } from "next";

const AvatarCard = (props: any) => {
  const { name, title, imageUrl } = props;

  return (
    <div className="flex items-center gap-5 rounded-lg bg-white p-5 text-black">
      <div>
        <Avatar alt="U" src={imageUrl} sx={{ width: 100, height: 100 }} />
      </div>

      <div>
        <h2 className="text-lg font-bold ">{name}</h2>
        <h3 className="text-md break-words">{title}</h3>
      </div>
    </div>
  );
};

const ExperienceCard = (props: any) => {
  const {
    company_name,
    title,
    start_date,
    end_date,
    achievements,
    industries,
    skills,
  } = props;

  return (
    <div className="text-black">
      <div className="m-2 p-2 flex flex-col gap-2 rounded-lg transition duration-500 hover:bg-sky-100">
        <div className="flex flex-col justify-between md:flex-row">
          <p>{title}</p>
          <p className="text-sm">
            {start_date?.substr(0, 7)} - {end_date?.substr(0, 7)}
          </p>
        </div>

        <p className="text-blue-500 text-sm">{company_name}</p>

        <div className="flex flex-col gap-2">
          <ul>
            {achievements.map((a: any, index: any) => {
              return (
                <li key={index} className="flex items-center">
                  {" "}
                  <span className="mr-2 text-gray-400">•</span>
                  {a}
                </li>
              );
            })}
          </ul>

          <div className="flex gap-2 items-center ">
            <p className="text-sm italic">Industries:</p>
            <div className="flex gap-1">
              {industries.map((ee: any) => {
                return (
                  <Chip
                    key={ee}
                    label={ee}
                    variant="outlined"
                    color="warning"
                    size="small"
                    sx={{
                      fontSize: "0.75rem",
                      padding: "3px 8px",
                      minWidth: "unset",
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex gap-2 items-center ">
            <p className="text-sm italic">Skills:</p>
            <div className="flex gap-1">
              {skills.map((ee: any) => {
                return (
                  <Chip
                    key={ee}
                    label={ee}
                    variant="outlined"
                    color="success"
                    size="small"
                    sx={{
                      fontSize: "0.75rem",
                      padding: "3px 8px",
                      minWidth: "unset",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <hr />
    </div>
  );
};

const EducationCard = (props: any) => {
  const { degree, start_date, end_date, institution } = props;

  return (
    <div className="text-black">
      <div className="m-2 p-2 flex flex-col rounded-lg transition duration-500 hover:bg-sky-100">
        <div className="flex flex-col md:flex-row justify-between">
          <p>{degree}</p>
          <p className="text-sm">
            {start_date?.substr(0, 7)} - {end_date?.substr(0, 7)}
          </p>
        </div>

        <p className="text-blue-500 text-sm">{institution}</p>
      </div>
      <hr />
    </div>
  );
};

export async function generateMetadata({
  params,
}: any): Promise<Metadata | undefined> {
  const { id } = params;
  const response = await fetchProfileById(id);

  if (!response) {
    return;
  }
  const profileData = response.data;

  return {
    title: profileData?.name,
    description: profileData?.title,
    openGraph: {
      title: profileData?.name,
      description: profileData?.title,
      type: "article",
      locale: "en_US",
      url: `https://www.bdtaxexpert.com/profile/${id}`,
      siteName: "RatGeber",
      images: [
        {
          url: profileData?.image_url,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const profilePage = async ({ params }: any) => {
  const { id } = params;
  const response = await fetchProfileById(id);
  const profileData = response.data;

  const experienceCard = profileData?.experiences.map((e: any, index: any) => {
    return <ExperienceCard key={index} {...e} />;
  });

  const educationCard = profileData?.education.map((e: any, index: any) => {
    return <EducationCard key={index} {...e} />;
  });

  return (
    <>
      <div className="hidden sm:flex items-center justify-center arial-font">
        <div className="w-[70vw] flex flex-col gap-5 p-5 ">
          <div className="flex gap-2 font-thin ">
            <p>Share-On</p>
            <Social />
          </div>
          <AvatarCard
            name={profileData?.name || ""}
            title={profileData?.title || ""}
            imageUrl={profileData?.image_url || ""}
          />

          <div className="rounded-lg bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-black">Experience</h2>
            </div>

            {experienceCard}
          </div>

          <div className="rounded-lg bg-white  p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-black">Education</h2>
            </div>

            {educationCard}
          </div>
        </div>
      </div>
      <div className="sm:hidden flex flex-col gap-5 p-5 bg-gray-200 arial-font">
        <AvatarCard
          name={profileData?.name || ""}
          title={profileData?.title || ""}
          imageUrl={profileData?.image_url || ""}
        />

        <div className="rounded-lg bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Experience</h2>
          </div>

          {experienceCard}
        </div>

        <div className="rounded-lg bg-white  p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Education</h2>
          </div>

          {educationCard}
        </div>
      </div>
    </>
  );
};

export default profilePage;
