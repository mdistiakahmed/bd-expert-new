import Head from "next/head";
import Image from "next/image";
import React from "react";

const ContactUs = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Contact Us page" />
      </Head>
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex items-center justify-center">
          <Image
            src="/contact-us.PNG"
            alt="contact us"
            height={400}
            width={500}
          />
        </div>

        <div className="flex flex-col items-center justify-center bg-slate-200 rounded-xl p-4">
          <h2 className="text-2xl font-bold mb-4">General Inquiries</h2>
          <p>+1631 5078482 (USA)</p>
          <p>+880 1610 959752 (BD)</p>
          <p>www.ratgeberltd.com</p>
          <p>info@ratgeberltd.com</p>
        </div>
        <div className=" flex flex-col items-center justify-center bg-slate-200 rounded-xl p-10">
          <h2 className="text-2xl font-bold mb-4">Registered Head Office</h2>
          <p>D/6, Building-4008, Organ Mohammad Tower,</p>
          <p>Kawlar Bazar, Khilkhet, Dhakshin Khan,</p>
          <p>Dhaka, PO:1229, Bangladesh</p>
        </div>

        <div className=" flex flex-col items-center justify-center bg-slate-200 rounded-xl p-10">
          <h2 className="text-2xl font-bold mb-4">Affiliated Office</h2>
          <p>Expedite US LLC</p>
          <p>58 Arrowhead Dr, Dallas, GA, 30132 - USA</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
