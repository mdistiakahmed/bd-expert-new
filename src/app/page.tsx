import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { FiArrowRight } from "react-icons/fi";
import Services from "@/components/Services";
import OurProjects from "@/components/OurProjects";
import HomeSocial from "@/components/HomeSocial";

const HomeContent = () => {
  return (
    <div className=" w-full bg-primary">
      <div className="h-full  text-white container">
        <div className="mx-auto h-full">
          <div className="flex flex-col xl:flex-row items-center justify-between pt-8 xl:pb-24 md:px-10">
            {/* text */}
            <div className="text-center xl:text-left order-2 xl:order-none">
              <span className="text-xl"> Master Your Finances</span>
              <h1 className="h2 mb-6">
                Expert Money and
                <br /> <span className="text-accent">Tax Management</span>
                <br />
                <span className="text-accent"> Counseling</span>
              </h1>
              <p className="max-w-[500px] mb-9 text-white/80">
                Optimize your finances with expert tax management and smart
                investment strategies for maximum savings.
              </p>

              {/* btn and socials*/}
              <div className="flex flex-col xl:flex-row items-center gap-8">
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase flex items-center gap-2"
                >
                  <span>Learn More</span>
                  <FiArrowRight className="text-xl" />
                </Button>

                <div className="mb-8 xl:mb-0">
                  <HomeSocial
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
              <Photo />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Stats />
        </div>

        <div className="h-[50px]"></div>
        <Services />

        <div className="h-[50px]"></div>

        <OurProjects />
      </div>
    </div>
  );
};

const Home = () => {
  return <HomeContent />;
};

export default Home;
