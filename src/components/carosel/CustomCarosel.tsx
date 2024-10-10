import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CustomCarosel = () => {
  const sliderRef = useRef<Slider | null>(null);

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrow: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Carousel items
  const items = [
    {
      id: 1,
      title: "55%",
      text: "Savings in corporate account onboarding time for this FinTech company using automation and RPA based solutions.",
    },
    {
      id: 2,
      title: "$4M",
      text: "Milions in annual savings achieved through digital approach at major telecommunications company.",
    },
    {
      id: 3,
      title: "95%",
      text: "Drop in call avoidance for a large mortgage company using advanced analytics",
    },
    {
      id: 4,
      title: "$20M",
      text: "This healthcare provider saves millions thrugh our operational automation, every year",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row ">
        {/* Left Side: Text Content */}
        <div className="md:w-1/3 mb-8 md:mb-0 ">
          <h2 className="text-4xl font-bold text-black mb-4">Our Clients</h2>
          <p className="text-xl text-orange-500">Do more with less</p>
        </div>

        {/* Right Side: Carousel */}
        <div className="md:w-2/3 relative">
          <Slider {...settings} ref={sliderRef}>
            {items.map((item) => (
              <div key={item.id} className="p-4 ">
                <div className="bg-orange-600 p-6 rounded-lg text-center text-white h-[300px] flex flex-col justify-between items-center">
                  <h3 className="text-4xl font-bold">{item.title}</h3>
                  <p className="mb-4 text-sm">{item.text}</p>
                  <button className="h-14 w-[250px] md:w-44 group relative flex items-center justify-center p-2 bg-transparent text-white font-bold rounded-full border-2 border-white transition-all duration-500 overflow-hidden">
                    <span className="absolute left-1 h-11 w-11 group-hover:w-[235px] md:group-hover:w-[165px] border-2 border-white rounded-full transition-all duration-500"></span>

                    <span className="absolute left-5 flex items-center justify-center z-10 ">
                      <FaArrowRight className="text-white" />
                    </span>

                    <span className="ml-6 relative z-10">Read More</span>
                  </button>
                </div>
              </div>
            ))}
          </Slider>

          {/* Custom Arrow Styles */}
          <div className="absolute bottom-[-50px] left-0 flex space-x-4 p-4 text-black">
            <button
              className="p-2  border-2 border-black rounded-full"
              onClick={() => sliderRef.current?.slickPrev()}
            >
              <FaArrowLeft />
            </button>
            <button
              className="p-2  border-2 border-black rounded-full"
              onClick={() => sliderRef.current?.slickNext()}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomCarosel;
