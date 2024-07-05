import { fetchProfileById } from "@/services/profileService";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import ProfilePhoto from "@/components/profile/ProfilePhoto";
import ProfileNavbar from "@/components/navbar/ProfileNavbar";
import ProfileArticles from "@/components/profile/ProfileArticles";
import ProfileContact from "@/components/profile/ProfileContact";
import { FaLinkedinIn, FaFacebook } from "react-icons/fa";
import ProfileStats from "@/components/profile/ProfileStats";
import ExperienceSection from "@/app/my/profile/ExperienceSection";
import { Metadata } from "next";

const SocialIcons = ({ iconStyles, facebookUrl, linkedInUrl }: any) => {
  return (
    <div className="flex gap-4">
      <a
        className={iconStyles}
        style={{ color: "#3b5998", fontSize: "1.5em", cursor: "pointer" }}
        href={facebookUrl}
        target="_blank"
      >
        <FaFacebook />
      </a>
      <a
        className={iconStyles}
        style={{ color: "#0e76a8", fontSize: "1.5em", cursor: "pointer" }}
        href={linkedInUrl}
        target="_blank"
      >
        <FaLinkedinIn />
      </a>
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
    openGraph: {
      title: profileData?.name,
      description: profileData?.description,
      type: "article",
      locale: "en_US",
      url: `https://www.bdtaxexpert.com/experts/profile/${id}`,
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

const page = async ({ params }: any) => {
  const { id } = params;
  const response = await fetchProfileById(id);
  const profileData = response.data;

  return (
    <section className="h-full ">
      <ProfileNavbar />
      <div className="container mx-auto h-full md:w-[70%] " id="summary">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">{profileData.title}</span>
            <h1 className="h2 mb-6">
              Hello I&#39;m
              <br /> <span className="text-accent">{profileData.name}</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              {profileData.description}
            </p>

            {/* btn and socials*/}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <a
                href={profileData?.resume_url}
                download="resume.pdf"
                target="_blank"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase flex items-center gap-2"
                >
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </Button>
              </a>

              <div className="mb-8 xl:mb-0">
                <SocialIcons
                  iconStyles="w-9 h-9 border border-accent rounded-full
                flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary
                hover:transition-all duration-500"
                  facebookUrl={profileData?.facebookUrl}
                  linkedInUrl={profileData?.linkedInUrl}
                />
              </div>
            </div>
          </div>

          {/* photo */}
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <ProfilePhoto imgUrl={profileData.image_url} />
          </div>
        </div>
      </div>

      <div className="container mx-auto h-full md:w-[70%] ">
        <ProfileStats profileData={profileData} />
      </div>

      <div
        className="container mx-auto h-full mt-[100px] md:w-[70%]"
        id="qualification"
      >
        <ExperienceSection profileData={profileData} disableUpdate={true} />
      </div>

      <div className="container mx-auto  mt-[100px] md:w-[70%]" id="articles">
        <ProfileArticles email={profileData.email} />
      </div>

      <div className="container mx-auto mt-[100px] md:w-[70%]" id="contact">
        <ProfileContact profileData={profileData} />
      </div>
    </section>
  );
};

export default page;
