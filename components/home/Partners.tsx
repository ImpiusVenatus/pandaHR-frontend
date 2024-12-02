"use client"
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';

const Partners = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      className="bg-[#1D1C23] py-32 mx-auto px-4 md:px-16"
      ref={sectionRef}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(50px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
        <h2 className='text-white text-5xl font-zrnic text-center pb-12'>Driving Innovation with Our Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center items-center py-4">
          <Image
            src="/logos/google.png"
            width={300}
            height={100}
            alt="Google Logo"
            className="w-[75px] md:w-[100px] object-contain"
          />
          <Image
            src="/logos/amazon.png"
            width={300}
            height={100}
            alt="Amazon Logo"
            className="w-[75px] md:w-[100px] object-contain"
          />
          <Image
            src="/logos/openai.png"
            width={300}
            height={100}
            alt="OpenAI Logo"
            className="w-[75px] md:w-[200px] object-contain"
          />
          <Image
            src="/logos/anthropic.png"
            width={300}
            height={100}
            alt="Anthropic Logo"
            className="w-[75px] md:w-[200px] object-contain"
          />
          <Image
            src="/logos/marriott.png"
            width={300}
            height={100}
            alt="Marriott Logo"
            className="w-[75px] md:w-[100px] object-contain"
          />
          <Image
            src="/logos/shopify.png"
            width={300}
            height={100}
            alt="Shopify Logo"
            className="w-[75px] md:w-[100px] object-contain"
          />
          <Image
            src="/logos/airbnb.png"
            width={300}
            height={100}
            alt="Airbnb Logo"
            className="w-[75px] md:w-[100px] object-contain"
          />
          <Image
            src="/logos/urbn.png"
            width={300}
            height={100}
            alt="URBN Logo"
            className="w-[75px] md:w-[100px] object-contain"
          />
        </div>
    </div>
  );
};

export default Partners;
