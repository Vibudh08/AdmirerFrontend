import React from 'react';
import { Truck, RefreshCw, ShieldCheck, Headphones } from 'lucide-react';

const features= [
    {
      icon: <Truck className="w-12 h-12 mx-auto mb-5 text-gray-700" />,
      title: 'Fast & Free Shipping',
    },
    {
      icon: <RefreshCw className="w-12 h-12 mx-auto mb-5 text-gray-700" />,
      title: '7 Day Exchange Policy',
    },
    {
      icon: <ShieldCheck className="w-12 h-12 mx-auto mb-5 text-gray-700" />,
      title: 'Secure Payment',
    },
    {
      icon: <Headphones className="w-12 h-12 mx-auto mb-5 text-gray-700" />,
      title: 'Special Support',
    },
  ]
const AboutPage = () => {
  return (
    <main>
      {/* About Section */}
      <section className="bg-white py-5 px-4 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {/* Left Side - Image */}
        <div>
          <img
            src="https://admirer.in/assets/images/about%20us1.jpg"
            alt="Jewelry Promo"
            className="w-full h-auto rounded p-6 max-md:p-0"
          />
        </div>

        {/* Right Side - Text */}
        <div className='space-y-3'>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 mt-16 max-md:mt-0">
            The fashion everything <br />that you want in your life.
          </h2>
          <p className="text-gray-600 mb-2 leading-relaxed">
            We get it. Getting dressed can be hard and we’re here to help with that.
            Whether you’re more of a casual girl I feel you, give me joggers all day
            every day or are looking to spice things up for your next date night,
            you’ve come to the right place.
          </p>
          <p className="text-gray-600 mb-2 leading-relaxed">
            Dig through our piles of posts. Booties, booties, booties rockin’ everywhere!
            When it comes to Fall and Winter fashion, boots are my weakness.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed ">
            As part of our growth, Roman has launched a new range of shoes and handbags.
          </p>

          <button className="bg-purple-700 text-white !mt-8 font-semibold px-6  py-3 rounded hover:bg-purple-800 transition">
            Explore Products
          </button>
        </div>
      </div>
    </section>

      {/* Features Section */}
      <section className="bg-white py-12 px-4 md:px-16 text-center">
      {/* Feature Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {features.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-md py-12 p-6 hover:shadow-md transition"
          >
            {item.icon}
            <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
          </div>
        ))}
      </div>

      {/* Description */}
      <p className="text-gray-600 w-[90%] max-md:w-full text-xl mx-auto">
        At Admirer, we believe in the power of expression. Whether you’re looking to add a touch
        of elegance to your outfit with a beautiful ring, update your wardrobe with the latest
        trends, or discover cutting-edge gadgets, we have something for everyone. Our carefully
        curated collections are designed to help you feel confident, stylish, and connected to
        the world around you.
      </p>
    </section>
    </main>
  );
};

export default AboutPage;
