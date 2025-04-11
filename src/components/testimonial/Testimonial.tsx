import React from "react";
import SingleTestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "Leslie Alexander",
    role: "Freelance React Developer",
    avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png",
    review: "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.",
  },
  {
    name: "Jacob Jones",
    role: "Digital Marketer",
    avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png",
    review: "Simply the best. Better than all the rest. I’d recommend this product to beginners and advanced users.",
  },
  {
    name: "Theresa Webb",
    role: "UX Designer",
    avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-3.png",
    review: "Must-have tool for designers. A joy to use and beautifully crafted. Nothing else compares.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
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

            <div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3">
              {testimonials.map((testimonial, idx) => (
                <SingleTestimonialCard key={idx} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
