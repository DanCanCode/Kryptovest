import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const TestimonialCard = ({ image, jobTitle, name, quote, twitter }) => (
  <motion.div
    initial={{ transform: "scale(0.9)", opacity: 0 }}
    whileInView={{ opacity: 1 }}
    whileHover={{ transform: "scale(1.0)" }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-[#181918] m-4 mt-10 flex flex-1  2xl:min-w-[450px]  2xl:max-w-[500px]
sm:min-w-[300px]  sm:max-w-[300px] flex-col p-3 rounded-md hover:shadow-2xl relative"
  >
    <div className="flex flex-col px-6 py-4 items-center justify-center space-y-2 text-white text-center">
      <a href={twitter}>
        <img
          src={image}
          alt={name}
          className="absolute w-20 h-20 -top-8 right-0 left-0 mx-auto rounded-full border-2 border-blue-500"
        />
      </a>
      <div className="flex flex-col w-full mt-3">
        <FaQuoteLeft className="text-lg self-start text-blue-500" />
        <p className="p-2">{quote}</p>
        <FaQuoteRight className="text-lg self-end text-blue-500" />
      </div>

      <p className="">
        <span className="font-semibold text-blue-500">{jobTitle},</span> {name}
      </p>
    </div>
  </motion.div>
);

const Testimonials = () => {
  return (
    <div className="flex w-full justify-center items-center  md:p-20">
      <div className="flex flex-col items-center">
        <h3 className="text-white text-3xl text-center py-2 border-b inline-block">
          Testimonials
        </h3>

        <div className="text-white/60 mt-5 text-center">
          <p>hear what others have to say!</p>
          <p className="text-xs">
            (these are <span className="text-red-400">not</span> real
            testimonials)
          </p>
        </div>

        <div className="flex md:flex-row flex-col justify-center items-center mt-5 md:flex-wrap">
          <TestimonialCard
            image="https://pbs.twimg.com/profile_images/1603594913781891072/-Kbt2mBq_400x400.jpg"
            jobTitle="Crypto YouTuber"
            name="Brian Yung"
            twitter="https://twitter.com/thebrianjung"
            quote="Kryptovest is my go to exchange when it comes to trading crypto. I love the apps seamless design and the security features that keep my funds safe."
          />
          <TestimonialCard
            image="https://pbs.twimg.com/profile_images/1068007184800215040/_gCkXkbQ_400x400.jpg"
            jobTitle="Real Estate Investor"
            name="Graham Stephan"
            twitter="https://twitter.com/GrahamStephan"
            quote="Whenever I need to quickly send ethereum, I always choose Kryptovest."
          />
          <TestimonialCard
            image="https://pbs.twimg.com/profile_images/1583590917436764161/d4zb-sk-_400x400.jpg"
            jobTitle="Finance Guru"
            name="Humphrey Yang"
            twitter="https://twitter.com/Humphreytalks"
            quote="I have been trading cryptocurrencies for over 2 years, and I can say with confidence that Kryptovest is the best exchange for anyone new to crypto."
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
