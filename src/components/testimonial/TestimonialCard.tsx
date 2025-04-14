import React from "react";
import { AiFillStar } from "react-icons/ai";

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  review: string;
  rating?: number; // Optional: defaults to 5
  prodName?: string;
  prodImg?: string;
}

const SingleTestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  const { name, role, avatar, review, rating = 5, prodName, prodImg } = testimonial;

  const renderStars = () =>
    Array.from({ length: rating }).map((_, idx) => (
      <AiFillStar key={idx} className="text-[#FDB241] w-5 h-5" />
    ));

  return (
    <div className="flex flex-col overflow-hidden shadow-xl mx-1">
      <div className="flex flex-col justify-between flex-1 p-6 bg-white !pb-5 lg:py-8 lg:px-7">
        <div className="flex-1">
          <blockquote className="flex-1 ">
            <p className="text-lg leading-relaxed text-gray-900 font-pj">“{review}”</p>
          </blockquote>
          <div className="flex items-center mt-5">{renderStars()}</div>
        </div>
        <div className="flex items-center mt-8 mb-5">
          <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" src={avatar} alt={name} />
          <div className="ml-4">
            <p className="text-base font-bold text-gray-900 font-pj">{name}</p>
            <p className="mt-0.5 text-sm font-pj text-gray-600">{role}</p>
          </div>
        </div>
          <hr />
          <div className="flex justify-between mt-3 gap-2">
  <div
    className="self-center text-md leading-relaxed text-gray-900 truncate w-full"
    title={prodName}
  >
    {prodName}
  </div>
  <div>
    <img src={prodImg} alt="" className="w-12 h-12" />
  </div>
</div>

      </div>
    </div>
  );
};

export default SingleTestimonialCard;
