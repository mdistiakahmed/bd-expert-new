import { fetchProfileById } from "@/services/profileService";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import Social from "@/components/Social";
import Stats from "@/components/Stats";
import ProfilePhoto from "@/components/profile/ProfilePhoto";
import ProfileExperience from "@/components/profile/ProfileExperience";
import ProfileNavbar from "@/components/navbar/ProfileNavbar";
import ProfileArticles from "@/components/profile/ProfileArticles";

const page = async ({ params }: any) => {
  const { id } = params;
  const response = await fetchProfileById(id);
  const profileData = response.data;

  console.log(profileData);

  return (
    <section className="h-full ">
      <ProfileNavbar />
      <div className="container mx-auto h-full md:w-[70%] " id="summary">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">Software Developer</span>
            <h1 className="h2 mb-6">
              Hello I'm
              <br /> <span className="text-accent">{profileData.name}</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              {profileData.title}
            </p>

            {/* btn and socials*/}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2"
              >
                <span>Download CV</span>
                <FiDownload className="text-xl" />
              </Button>

              <div className="mb-8 xl:mb-0">
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full
                flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary
                hover:transition-all duration-500"
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
        <Stats />
      </div>

      <div
        className="container mx-auto h-full mt-[100px] md:w-[70%]"
        id="qualification"
      >
        <ProfileExperience />
      </div>

      <div
        className="container mx-auto h-[300px] mt-[100px] md:w-[70%]"
        id="articles"
      >
        <ProfileArticles email={profileData.email} />
      </div>

      <div
        className="container mx-auto h-[300px] mt-[100px] md:w-[70%]"
        id="contact"
      >
        Hello contact
      </div>
    </section>
  );
};

export default page;
