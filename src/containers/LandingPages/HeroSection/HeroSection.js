import Image from "next/image";

import HeroInfoBlob from "../Blobs/HeroInfoBlob";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { PiCheckCircleFill } from "react-icons/pi";
import { FaChevronRight } from "react-icons/fa6";

const HeroSection = (data) => {
  const { title, subTitle, features, cta, asset, breadcrumbs } = data;

  // ? Method to render the items in features list
  const renderFeatures = () => {
    return (
      features &&
      features?.length > 0 &&
      features?.map((feature, index) => {
        return (
          <div key={`feature-item-${index}`}>
            <p className="hidden lg:flex flex-row gap-[10px] w-full">
              <span className="text-[25px] text-[#347AE2] items-center justify-center">
                <PiCheckCircleFill />
              </span>
              <span className="text-[16px] text-[#4B4F5D]">{feature}</span>
            </p>

            <p className="flex lg:hidden flex-row gap-2 w-full">
              <span
                className="  text-[20px] text-[#347AE2] items-center justify-center"
                key={`feature-item-${index}`}
              >
                <PiCheckCircleFill />
              </span>
              <span className="text-xs text-[#4B4F5D]">{feature}</span>
            </p>
          </div>
        );
      })
    );
  };

  return (
    <div
      id="hero-section"
      className="w-full pt-6 pb-10 lg:pt-8 lg:pb-14 bg-gradient-to-b from-[#E5F0FF] to-[#E0DEF700]"
    >
      <div className="page-layout flex flex-col items-center justify-start">
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <div className="mt-4">
          <HeroInfoBlob />
        </div>

        <div
          id="text-asset-section"
          className="w-full flex flex-col items-center justify-start lg:flex-row lg:items-center lg:justify-between lg:gap-16 mt-6"
        >
          <div
            id="text-section"
            className="w-full lg:w-[50%] flex flex-col items-center lg:items-start lg:justify-start"
          >
            <h1 className="text-[32px] md:text-[44px] text-[#062046] font-bold tracking-tight leading-[40px] md:leading-[54px] text-center md:text-center lg:text-start">
              {title}
            </h1>

            <p className="mt-6 text-[16px] lg:text-[20px] text-[#062046] leading-[25.6px] lg:leading-[32px] text-center md:text-center lg:text-start">
              {subTitle}
            </p>

            {/* DESKTOP FEATURES */}
            <div className="w-full mt-10 hidden lg:block">
              <div className="grid grid-cols-2 gap-2">{renderFeatures()}</div>
            </div>

            {/* DESKTOP CTA */}
            <button className="desktop-btn mt-6">
              <a
                className="text-white text-[16px] font-semibold w-full flex grow flex-row items-center justify-center gap-2"
                href={cta?.href}
                // target="_self"
              >
                {cta?.title}
                <span>
                  <FaChevronRight className="text-[14px]" />
                </span>
              </a>
            </button>

            <div className="hidden lg:block w-max mt-4">
              <Image
                src={
                  "https://d3jrelxj5ogq5g.cloudfront.net/feature-pages/product_rating.png"
                }
                width={280}
                height={32}
                alt={`${title} with CurateIt`}
                priority={true}
              />
            </div>
          </div>
          <div id="asset-section" className="w-full lg:w-[45%] mt-7 lg:mt-0">
            <Image
              src={asset?.source}
              alt={asset?.altText}
              width={1000}
              height={1000}
              priority={true}
              style={{
                maxWidth:'100%'
              }}
            />
          </div>

          {/* MOBILE FEATURES */}
          <div className="w-full mt-7 block lg:hidden">
            <div className="grid grid-cols-2 gap-3">{renderFeatures()}</div>
          </div>

          {/* MOBILE CTA */}
          <button className="mob-btn md:desktop-btn mt-7 block lg:hidden">
            <a
              href={cta?.href}
              // target="_self"
            >
              {cta?.title}
              <span>
                <FaChevronRight className="text-[16px]" />
              </span>
            </a>
          </button>

          <div className="lg:hidden flex flex-row items-center justify-center w-max mt-6">
            <Image
              src={
                "https://d3jrelxj5ogq5g.cloudfront.net/200x200_min/feature-pages/product_rating.png"
              }
              width={200}
              height={32}
              priority
              alt={`${title} with CurateIt`}
              style={{width:'100%'}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
