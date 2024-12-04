"use client";

import React from "react";
import Image from "next/image";
import { SparklesIcon } from "@heroicons/react/24/outline";
import SparklesText from "../ui/sparkles-text";
import { AnimatedTooltipPreview } from "./AnimatedTooltipPreview";
import AnimatedShinyText from "../ui/animated-shiny-text";

const HeroSection = () => {
  return (
    <div className="min-h-screen flex items-center px-6 max-w-[1400px] mx-auto">
      <div className="lg:w-1/2 pl-8 lg:pl-32">
        <div className="flex gap-4 text-[#0B0B0B]">
        <AnimatedShinyText className="flex py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <SparklesIcon className="h-6 w-6" />
            <h1 className="text-xl font-bold mb-4 font-bebas-neue">Welcome to Your Future</h1>
        </AnimatedShinyText>
        </div>
        <h2 className="text-[#010101] mb-6 font-zrnic text-6xl font-bold">
          <SparklesText text="HR solution" />
           your team deserves
        </h2>
        <p className="text-gray-600 my-4 text-lg">
            Streamline your HR processes with modern tools designed to optimize team performance and foster growth.
        </p>
        <div className="space-x-4 my-8 font-dmSans-bold">
          <a
            href="#"
            className="bg-black text-white py-4 px-6 rounded hover:bg-white hover:text-black border border-black transition duration-300"
          >
            Get Started
          </a>
          <a
            href="#"
            className="py-2 px-4 rounded hover:text-purple-500 transition duration-300"
          >
            Learn More
          </a>
        </div>
        <div className="pt-8">
          <AnimatedTooltipPreview />
        </div>
      </div>

      <div className="flex justify-center lg:w-1/2 mt-8 lg:mt-0 px-8">
        <div className="w-[24rem] h-[24rem] lg:w-[32rem] lg:h-[32rem] relative">
          <Image
            src="/hero/hero-image.jpg"
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            className="rounded-tl-[4rem] shadow-lg z-[90]"
          />
          <Image
            src="/hero/panda.jpg"
            alt="Hero Image"
            width={1000}
            height={1000}
            className="absolute -top-12 -right-8 w-[75px] rotate-12"
          />
          <div className="absolute top-8 lg:top-12 -left-8 lg:-left-12 w-[24rem] h-[24rem] lg:w-[32rem] lg:h-[32rem] border-4 border-black rounded-sm z-10" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
