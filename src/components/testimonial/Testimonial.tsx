import React from "react";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SingleTestimonialCard from "./TestimonialCard";

const CustomPrevArrow = ({ onClick }: { onClick: () => void }) => (
  <button
    className="absolute left-[46%] max-md:left-[40%] bottom-[-80px] max-md:bottom-[-60px] transform -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-black transition hover:text-white"
    onClick={onClick}
  >
    <IoIosArrowBack className="text-3xl max-md:text-2xl text-gray-700 hover:text-white" />
  </button>
);

const CustomNextArrow = ({ onClick }: { onClick: () => void }) => (
  <button
    className="absolute right-[46%] max-md:right-[40%] bottom-[-80px] max-md:bottom-[-60px] transform -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-black transition hover:text-white"
    onClick={onClick}
  >
    <IoIosArrowForward className="text-3xl max-md:text-2xl text-gray-700 hover:text-white" />
  </button>
);

const testimonials = [
  {
    name: "Leslie Alexander",
    role: "Freelance React Developer",
    avatar:
      "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png",
    review:
      "You made it so simple. My new site is so much faster and easier to work with than my old site.",
    prodName:"Special Rose Gold Plated Solitaire Ring Corner",
    prodImg:"https://admirer.in/assets/images/two.jpg"
  },
  {
    name: "Jacob Jones",
    role: "Digital Marketer",
    avatar:
      "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png",
    review:
      "Simply the best. Better than all the rest. I’d recommend this product to beginners and advanced users.",
      prodName:"Special Rose Gold Plated Solitaire Ring Corner",
    prodImg:"https://admirer.in/assets/images/two.jpg"
  },
  {
    name: "Theresa Webb",
    role: "UX Designer",
    avatar:
      "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-3.png",
    review: "cjnwefowefe fnwe fwelkfjpwe feijfpe fipejfp epfjejfew.",
    prodName:"Special Rose Gold Plated Solitaire Ring Corner",
    prodImg:"https://admirer.in/assets/images/two.jpg"
  },
  {
    name: "erthg",
    role: "UX Designer",
    avatar:
      "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-3.png",
    review:
      "Must-have tool for designers. A joy to use and beautifully crafted. Nothing else compares.",
      prodName:"Special Rose Gold Plated Solitaire Ring Corner",
    prodImg:"https://admirer.in/assets/images/two.jpg"
  },
  {
    name: "lkjhgfds",
    role: "UX Designer",
    avatar:
      "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-3.png",
    review: "dwqkrhfnwe fhwnecjgbyersdf ncewijfewi fhcwohdsifjkcw dfcowdlcm.",
    prodName:"Special Rose Gold Plated Solitaire Ring Corner",
    prodImg:"https://admirer.in/assets/images/two.jpg"
  },
];

const TestimonialsSection = () => {
  const testimonialsSlider = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <CustomPrevArrow onClick={() => {}} />,
    nextArrow: <CustomNextArrow onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 768, // screens less than or equal to 768px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-12 pb-16 bg-gray-50 sm:py-16 lg:py-20 ">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <h2 className="text-4xl max-md:text-2xl font-semibold text-gray-800 mb-1">
              Our happy clients say about us
            </h2>
          </div>

          <div className="relative mt-10 md:mt-24 md:order-2">
            <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
              <div
                className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
                style={{
                  background:
                    "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
                }}
              ></div>
            </div>

            <div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 ">
              <Slider {...testimonialsSlider}>
                {testimonials.map((testimonial, idx) => (
                  <SingleTestimonialCard key={idx} testimonial={testimonial} />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
