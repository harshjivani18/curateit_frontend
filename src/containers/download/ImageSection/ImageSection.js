'use client'

import Image from 'next/image'

import { useState } from 'react'

const ImageSection = ({
  title,
  subTitle,
  defaultImage,
  hoverImage,
  alt,
  cta,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-start page-layout">
      <p className="text-[32px] font-bold text-[#101828] leading-[40px] md:text-[40px] md:text-[#062046] md:font-semibold md:leading-[44px] text-center">
        {title}
      </p>

      <p className="text-[16px] text-[#475467] leading-[22.4px] mt-5 md:text-[20px] md:text-[#475467] md:font-regular md:mt-4 md:px-10 md:leading-[30px] text-center">
        {subTitle}
      </p>
      <div
        className="w-full rounded-full mt-10 md:mt-12"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Image
          src={defaultImage}
          className={`transition-all ease-in-out delay-150 block h-full rounded-2xl ${
            hover ? "hidden" : "block"
          } h-full w-full`}
          alt={alt}
          width={1000}
          height={1000}
          quality={100}
          priority={true}
        />
        <Image
          src={hoverImage}
          className={`transition-all ease-in-out delay-150 block h-full rounded-2xl ${
            hover ? "block" : "hidden"
          } h-full w-full`}
          alt={alt}
          width={1000}
          height={1000}
          quality={100}
          priority={true}
        />
      </div>

      <button className="lg:block bg-[#105FD3] py-3 px-8 lg:py-4 lg:px-8 rounded-[8px] mt-8 md:mt-12">
        <a
          className="text-white text-[16px] font-semibold w-full flex grow flex-row items-center justify-center gap-2"
          href={cta?.href}
          target="_self"
        >
          {cta?.title}
        </a>
      </button>
    </div>
  );
};

export default ImageSection