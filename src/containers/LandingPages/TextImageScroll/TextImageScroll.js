"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

import { useState } from "react";
import Blob from "../Blob/Blob";

const LottieAnimation = dynamic(() => import("@utils/LottieAnimation"), {
  ssr: false,
});


const TextImageScroll = ({ title, sections }) => {
  const [loading, setLoading] = useState(true);

  const [ref1, isVisible1, entry1] = useInView({
    threshold: 1,
  });

  const [ref2, isVisible2, entry2] = useInView({
    threshold: 1,
  });

  const [ref3, isVisible3, entry3] = useInView({
    threshold: 0.65,
  });

  const [ref4, isVisible4, entry4] = useInView({
    threshold: 0.65,
  });

  const [ref5, isVisible5, entry5] = useInView({
    threshold: 0.65,
  });

  const [ref6, isVisible6, entry6] = useInView({
    threshold: 0.65,
  });

  const [ref7, isVisible7, entry7] = useInView({
    threshold: 0.65,
  });

  return (
    <div className="w-full pt-14">
      <div className="page-layout ">
        <div className="w-full flex flex-col items-center justify-center mb-14 gap-4">
          <Blob text={"Features"} />

          <div className="px-[25px] py-5 border-b-[2px] border-[#105FD3] text-center">
            <p className="text-[32px] leading-[40px] text-[#062046] font-bold">
              {title}
            </p>
          </div>
        </div>

        <div className="w-full grid grid-cols-12">
          <div className="grid-col-span-4">
            <>
              <div className="p-10 bg-priamry-blue-200" ref={ref1}>
                <p className="text-[32px] leading-[38px] text-[#062046] font-semibold">
                  {sections?.[0]?.title}
                </p>

                <p className="text-[20px] leading-[32px] text-[#575C70] mt-4">
                  {sections?.[0]?.subtitle}
                </p>

                <button className="mt-4 desktop-btn rounded-[8px] md:rounded-full">
                  <a
                    href={sections?.[0]?.cta?.href}
                    // className='bg-[#105FD3] rounded-[7px] text-white text-[16px] font-semibold'
                  >
                    {sections?.[0]?.cta?.title}
                  </a>
                </button>
              </div>

              <div className="h-[50vh] 2xl:h-[40vh] " />

              <div className=" p-10 bg-priamry-blue-200" ref={ref2}>
                <p className="text-[32px] leading-[38px] text-[#062046] font-semibold">
                  {sections?.[1]?.title}
                </p>

                <p className="text-[20px] leading-[32px] text-[#575C70] mt-4">
                  {sections?.[1]?.subtitle}
                </p>

                <button className="mt-4 desktop-btn rounded-[8px] md:rounded-full">
                  <a href={sections?.[1]?.cta?.href}>
                    {sections?.[1]?.cta?.title}
                  </a>
                </button>
              </div>

              <div className="h-[50vh] 2xl:h-[40vh]" />

              <div className=" p-10 bg-priamry-blue-200" ref={ref3}>
                <h2 className="text-[32px] leading-[38px] text-[#062046] font-semibold">
                  {sections?.[2]?.title}
                </h2>

                <p className="text-[20px] leading-[32px] text-[#575C70] mt-4">
                  {sections?.[2]?.subtitle}
                </p>

                <button className="mt-4 desktop-btn rounded-[8px] md:rounded-full">
                  <a
                    href={sections?.[2]?.cta?.href}
                    // className='px-5 py-2 bg-[#105FD3] rounded-[7px] text-white text-[16px] font-semibold'
                  >
                    {sections?.[2]?.cta?.title}
                  </a>
                </button>
              </div>

              <div className="h-[50vh] 2xl:h-[40vh]" />

              <div className=" p-10 bg-priamry-blue-200" ref={ref4}>
                <p className="text-[32px] leading-[38px] text-[#062046] font-semibold">
                  {sections?.[3]?.title}
                </p>

                <p className="text-[20px] leading-[32px] text-[#575C70] mt-4">
                  {sections?.[3]?.subtitle}
                </p>

                <button className="mt-4 desktop-btn rounded-[8px] md:rounded-full">
                  <a
                    href={sections?.[3]?.cta?.href}
                    // className='px-5 py-2 bg-[#105FD3] rounded-[7px] text-white text-[16px] font-semibold'
                  >
                    {sections?.[3]?.cta?.title}
                  </a>
                </button>
              </div>

              {sections[4] && <div className="h-[50vh] 2xl:h-[40vh]" />}

              {sections[4] && (
                <div className="p-10 bg-priamry-blue-200 mb-32" ref={ref5}>
                  <p className="text-[32px] leading-[38px] text-[#062046] font-semibold">
                    {sections?.[4]?.title}
                  </p>

                  <p className="text-[20px] leading-[32px] text-[#575C70] mt-4">
                    {sections?.[4]?.subtitle}
                  </p>

                  <button className="mt-4 desktop-btn rounded-[8px] md:rounded-full">
                    <a
                      href={sections?.[4]?.cta?.href}
                      // className='px-5 py-2 bg-[#105FD3] rounded-[7px] text-white text-[16px] font-semibold'
                    >
                      {sections?.[4]?.cta?.title}
                    </a>
                  </button>
                </div>
              )}

              {sections[5] && <div className="h-[50vh] 2xl:h-[40vh]" />}

              {sections[5] && (
                <div className="p-10 bg-priamry-blue-200 mb-32" ref={ref6}>
                  <p className="text-[32px] leading-[38px] text-[#062046] font-semibold">
                    {sections?.[5]?.title}
                  </p>

                  <p className="text-[20px] leading-[32px] text-[#575C70] mt-4">
                    {sections?.[5]?.subtitle}
                  </p>

                  <button className="mt-4 desktop-btn rounded-[8px] md:rounded-full">
                    <a
                      href={sections?.[5]?.cta?.href}
                      // className='px-5 py-2 bg-[#105FD3] rounded-[7px] text-white text-[16px] font-semibold'
                    >
                      {sections?.[5]?.cta?.title}
                    </a>
                  </button>
                </div>
              )}

              {sections[6] && <div className="h-[50vh] 2xl:h-[40vh]" />}

              {sections[6] && (
                <div className="p-10 bg-priamry-blue-200 mb-32" ref={ref7}>
                  <p className="text-[32px] leading-[38px] text-[#062046] font-semibold">
                    {sections?.[6]?.title}
                  </p>

                  <p className="text-[20px] leading-[32px] text-[#575C70] mt-4">
                    {sections?.[6]?.subtitle}
                  </p>

                  <button className="mt-4 desktop-btn rounded-[8px] md:rounded-full">
                    <a
                      href={sections?.[6]?.cta?.href}
                      // className='px-5 py-2 bg-[#105FD3] rounded-[7px] text-white text-[16px] font-semibold'
                    >
                      {sections?.[6]?.cta?.title}
                    </a>
                  </button>
                </div>
              )}
            </>
          </div>

          <div className="grid-col-span-8">
            {isVisible1 && (
              <div className="sticky top-[20vh]">
                {renderAsset(
                  sections?.[0]?.asset?.source,
                  sections?.[0]?.asset?.altText,
                  sections?.[0]?.assetType
                )}
              </div>
            )}

            {isVisible2 && (
              <div className="sticky top-[20vh]">
                {renderAsset(
                  sections?.[1]?.asset?.source,
                  sections?.[2]?.asset?.altText,
                  sections?.[1]?.assetType
                )}
              </div>
            )}
            {isVisible3 && (
              <div className="sticky top-[20vh]">
                {renderAsset(
                  sections?.[2]?.asset?.source,
                  sections?.[2]?.asset?.altText,
                  sections?.[2]?.assetType
                )}
              </div>
            )}

            {isVisible4 && (
              <div className="sticky top-[20vh]">
                {renderAsset(
                  sections?.[3]?.asset?.source,
                  sections?.[3]?.asset?.altText,
                  sections?.[3]?.assetType
                )}
              </div>
            )}
            {sections[4] && isVisible5 && (
              <div className="sticky top-[20vh]">
                {renderAsset(
                  sections?.[4]?.asset?.source,
                  sections?.[4]?.asset?.altText,
                  sections?.[4]?.assetType
                )}
              </div>
            )}
            {sections[5] && isVisible6 && (
              <div className="sticky top-[20vh]">
                {renderAsset(
                  sections?.[5]?.asset?.source,
                  sections?.[5]?.asset?.altText,
                  sections?.[5]?.assetType
                )}
              </div>
            )}
            {sections[6] && isVisible7 && (
              <div className="sticky top-[20vh]">
                {renderAsset(
                  sections?.[6]?.asset?.source,
                  sections?.[6]?.asset?.altText,
                  sections?.[1]?.assetType
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextImageScroll;

const renderAsset = (source, altText, assetType) => {
  return assetType === "image" ? (
    <Image
      src={source}
      className="fade-in-image sticky top-[20vh]"
      alt={altText}
      width={1000}
      height={1000}
      loading="lazy"
      style={{
        maxWidth:'100%'
      }}
    />
  ) : (
    <LottieAnimation url={source} />
  );
};
