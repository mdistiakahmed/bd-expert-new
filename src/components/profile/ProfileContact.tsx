"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ProfileContact = ({ profileData }: any) => {
  const info = [
    {
      icon: <FaPhoneAlt />,
      title: "Phone",
      description: profileData?.phone,
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      description: profileData?.email,
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      description: "",
    },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-accent text-center">Contact</h3>

      <div className="py-6">
        <div className="container mx-auto">
          <div className="flex flex-col xl:flex-row gap-[30px]">
            {/* form */}
            <div className="xl:w-[60%] order-2 xl:order-none">
              <form className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
                <h3 className="text-2xl text-accent">Lets work together</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input type="firstname" placeholder="Firstname" />
                  <Input type="lastname" placeholder="Lastname" />
                  <Input type="email" placeholder="Email Address" />
                  <Input type="phone" placeholder="Phone number" />
                </div>

                <Textarea
                  className="h-[200px]"
                  placeholder="Type your message here..."
                />

                <Button size="md" className="max-w-40">
                  Send message
                </Button>
              </form>
            </div>

            {/* info */}
            <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
              <ul className="flex flex-col gap-10">
                {info.map((item, index) => {
                  return (
                    <li key={index} className="flex items-center gap-6">
                      <div className="w-[52px] h-[52px]  bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                        <div className="text-[28px]">{item.icon}</div>
                      </div>
                      <div className="flex-1">
                        <p className="text-white/60">{item.title}</p>
                        <h3 className="text-xl">{item.description}</h3>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContact;
