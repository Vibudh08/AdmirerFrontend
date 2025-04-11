import React from "react";
import { AiFillStar } from "react-icons/ai";

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  review: string;
  rating?: number; // Optional: defaults to 5
}

const SingleTestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  const { name, role, avatar, review, rating = 5 } = testimonial;

  const renderStars = () =>
    Array.from({ length: rating }).map((_, idx) => (
      <AiFillStar key={idx} className="text-[#FDB241] w-5 h-5" />
    ));

  return (
    <div className="flex flex-col overflow-hidden shadow-xl">
      <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
        <div className="flex-1">
          <div className="flex items-center">{renderStars()}</div>
          <blockquote className="flex-1 mt-8">
            <p className="text-lg leading-relaxed text-gray-900 font-pj">“{review}”</p>
          </blockquote>
        </div>
        <div className="flex items-center mt-8">
          <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" src={avatar} alt={name} />
          <div className="ml-4">
            <p className="text-base font-bold text-gray-900 font-pj">{name}</p>
            <p className="mt-0.5 text-sm font-pj text-gray-600">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTestimonialCard;
