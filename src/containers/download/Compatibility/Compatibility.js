"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";

import {
  PiAndroidLogo,
  PiAppleLogo,
  PiBookmark,
  PiCheckCircle,
  PiDesktop,
  PiDeviceMobileCamera,
  PiGlobe,
  PiGoogleChromeLogo,
  PiKey,
  PiLinuxLogo,
  PiWindowsLogo,
  PiCaretDown,
  PiSparkleFill,
} from "react-icons/pi";
import { SiMicrosoftedge, SiOpera } from "react-icons/si";


const images = {
  PiGlobe: PiGlobe,
  PiDeviceMobileCamera: PiDeviceMobileCamera,
  PiDesktop: PiDesktop,
  PiBookmark: PiBookmark,
  PiKey: PiKey,
  PiGoogleChromeLogo: PiGoogleChromeLogo,
  SiMicrosoftedge: SiMicrosoftedge,
  SiOpera: SiOpera,
  PiAndroidLogo: PiAndroidLogo,
  PiAppleLogo: PiAppleLogo,
  PiWindowsLogo: PiWindowsLogo,
  PiLinuxLogo: PiLinuxLogo,
  PiCheckCircle: PiCheckCircle,
};

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Compatibility = (data) => {
  const { list, title, content } = data;

  const [os, setOs] = useState(list[0] || "Extensions");

  const OsOptions = () => {
    return list?.map((operatingSystem, index) => {
      return (
        <Link
          href={`#${operatingSystem}`}
          onClick={(event) => {
            event.preventDefault();
            setOs(operatingSystem);
            document
              .getElementById(operatingSystem)
              .scrollIntoView({ behavior: "smooth" });
          }}
          key={`compatibility-btn-${index}`}
          className={`grow px-5 py-4 rounded-[8px] border-[1px] font-medium text-center ${
            operatingSystem === os
              ? "border-[#347AE2] bg-[#347AE2] text-[#FFFFFF] text-[18px]"
              : "border-[#B8D4FE] bg-[#F8FBFF] text-[#667085] text-[18px]"
          }`}
        >
          {operatingSystem}
        </Link>
      );
    });
  };

  const OsOptionsMobile = () => {
    const MenuItems = () => {
      return list?.map((operatingSystem, key) => {
        return (
          <Menu.Item key={`compatibility-option-${key}`}>
            {({ active }) => (
              <a
                onClick={() => setOs(operatingSystem)}
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-4 text-sm cursor-pointer"
                )}
              >
                {operatingSystem}
              </a>
            )}
          </Menu.Item>
        );
      });
    };

    return (
      <div className="flex flex-col items-center md:flex-row md:items-stretch gap-4 w-full">
        <Menu as="div" className="relative inline-block text-left w-full">
          <Menu.Button
            // className='inline-flex items-center w-full justify-center gap-x-1.5 rounded-[8px] bg-white px-4 py-[10px] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
            className="w-full md:min-w-[335px] rounded-[8px] border-[0.4px] border-[#ABB7C9] px-4 py-[10px] flex flex-row items-center justify-between"
          >
            <p className="tracking-tight text-[#4B4F5D] text-center">{os}</p>
            <PiCaretDown
              className=" text-[#4B4F5D] text-[20px]"
              aria-hidden="true"
            />
          </Menu.Button>

          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  w-full">
              <div className="py-1 gap-5">
                <MenuItems />
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    );
  };

  const Icon = ({ block }) => {
    const AssetComponent = images[block?.icon];

    return (
      <div
        className={`w-[48px] h-[48px] rounded-[500px] bg-[#FFFFFF] flex flex-row items-center justify-center border-[0.88px] ${
          block?.key === os ? "border-[#347AE2]" : "border-[#ABB7C9]"
        }`}
      >
        <AssetComponent
          className={`text-[25px] ${
            block?.key === os ? "text-[#347AE2]" : "text-[#4B4F5D]"
          }`}
        />
      </div>
    );
  };

  const Blob = ({ block }) => {
    if (block?.blob?.visible) {
      return (
        <>
          <div
            className={`py-1 px-4  rounded-[27px]  hidden lg:block ${
              os === block?.key ? "bg-[#FFFFFF]" : "bg-[#347AE2]"
            }`}
          >
            <p
              className={`text-[14px] font-semibold leading-[24px] flex flex-row items-center justify-center gap-1 ${
                os === block?.key ? "text-[#347AE2]" : "text-[#FFFFFF]"
              }`}
            >
              <PiSparkleFill className="text-[14px] leading-[24px] mb-[2px]" />{" "}
              {block?.blob?.title}
            </p>
          </div>

          <div className="mt-5 block lg:hidden">
            <div
              className={`py-1 px-4 rounded-[27px] ${
                os === block?.key ? "bg-[#FFFFFF]" : "bg-[#347AE2]"
              }`}
            >
              <p
                className={`text-[14px] font-semibold leading-[24px] flex flex-row items-center justify-center gap-1 ${
                  os === block?.key ? "text-[#347AE2]" : "text-[#FFFFFF]"
                }`}
              >
                <PiSparkleFill className="text-[14px] leading-[24px] mb-[4px]" />
                {block?.blob?.title}
              </p>
            </div>
          </div>
        </>
      );
    }
  };

  const IconsList = ({ iconList }) => {
    if (iconList === "browser-icons-list") {
      return (
        <div className="flex flex-col items-start justify-start">
          <div className="flex flex-row items-center justify-between gap-3">
            <Image
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/WindowsLogo.svg`}
              width={32}
              height={32}
              className="shadow-md rounded-[8px]"
              alt="CurateIt compatibility brower"
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/WindowsLogo-1.svg`}
              width={32}
              height={32}
              className="shadow-md rounded-[8px]"
              alt="CurateIt compatibility brower"
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/WindowsLogo-2.svg`}
              width={32}
              height={32}
              className="shadow-md rounded-[8px]"
              alt="CurateIt compatibility brower"
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/WindowsLogo-3.svg`}
              width={32}
              height={32}
              className="shadow-md rounded-[8px]"
              alt="CurateIt compatibility brower"
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/WindowsLogo-4.svg`}
              width={32}
              height={32}
              className="shadow-md rounded-[8px]"
              alt="CurateIt compatibility brower"
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/WindowsLogo-5.svg`}
              width={32}
              height={32}
              className="shadow-md rounded-[8px]"
              alt="CurateIt compatibility brower"
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/WindowsLogo-6.svg`}
              width={32}
              height={32}
              className="hidden lg:block shadow-md rounded-[8px]"
              alt="CurateIt compatibility brower"
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/WindowsLogo-7.svg`}
              width={32}
              height={32}
              className="hidden lg:block shadow-md rounded-[8px]"
              alt="CurateIt compatibility brower"
            />
          </div>

          <div className="flex flex-row items-center justify-between gap-3 mt-3">
            <Image
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/WindowsLogo-6.svg`}
              width={32}
              height={32}
              className="block lg:hidden shadow-md rounded-[8px]"
              alt="CurateIt compatibility brower"
            />

            <Image
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/WindowsLogo-7.svg`}
              width={32}
              height={32}
              className="block lg:hidden shadow-md rounded-[8px]"
              alt="CurateIt compatibility brower"
            />

            <Image
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/WindowsLogo-8.svg`}
              width={32}
              height={32}
              className="shadow-md rounded-[8px]"
              alt="CurateIt compatibility brower"
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/WindowsLogo-9.svg`}
              width={32}
              height={32}
              className="shadow-md rounded-[8px]"
              alt="CurateIt compatibility brower"
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/WindowsLogo-10.svg`}
              width={32}
              height={32}
              className="shadow-md rounded-[8px]"
              alt="CurateIt compatibility brower"
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/WindowsLogo-11.svg`}
              width={32}
              height={32}
              className="shadow-md rounded-[8px]"
              alt="CurateIt compatibility brower"
            />
          </div>
        </div>
      );
    }

    if (iconList === "integration-icons-list") {
      return (
        <div className="flex flex-col items-start justify-start">
          <div className="flex flex-row items-center justify-between gap-3">
            <Image
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/itegration-1.svg`}
              width={32}
              height={32}
              className=""
              alt="CurateIt compatibility Itegration"
              loading="lazy"
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/itegration-2.svg`}
              width={32}
              height={32}
              className=""
              alt="CurateIt compatibility Itegration"
              loading="lazy"
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/itegration-3.svg`}
              width={32}
              height={32}
              className=""
              alt="CurateIt compatibility Itegration"
              loading="lazy"
            />
          </div>
        </div>
      );
    }
  };

  const Cta = ({ block }) => {
    if (block?.links?.length > 0) {
      const CtaIcon = (icon) => {
        switch (icon?.icon) {
          case "PiGoogleChromeLogo":
            return <PiGoogleChromeLogo className="text-[20px]" />;

          case "SiMicrosoftedge":
            return <SiMicrosoftedge />;

          case "SiOpera":
            return <SiOpera />;

          case "PiAndroidLogo":
            return <PiAndroidLogo />;

          case "PiAppleLogo":
            return <PiAppleLogo />;

          case "PiWindowsLogo":
            return <PiWindowsLogo />;

          case "PiLinuxLogo":
            return <PiLinuxLogo />;

          case "PiBookmark":
            return <PiBookmark />;

          case "PiCheckCircle":
            return <PiCheckCircle />;
        }
      };

      return block?.links?.map((link, index) => {
        return (
          <Link
            href={link?.href}
            key={`cta-${link?.key}-${index}`}
            className={`px-8 py-3 flex flex-row items-center justify-center bg-[#FFFFFF] rounded-full gap-[10px] md:gap-1 border-[1px] ${
              os === block?.key ? "border-[#FFFFFF]" : "border-[#DFE4EC]"
            }`}
          >
            <CtaIcon icon={link?.icon} />
            <span className="text-[14px] font-medium text-[#292B38]">
              {link?.title ? link?.title : `Download for ${link?.key}`}
            </span>
          </Link>
        );
      });
    }
  };

  const renderBlocks = () => {
    return Object.values(content)?.map((block, index) => {
      return (
        <div
          className="mt-14 w-full lg:w-[95%]"
          id={block?.key}
          key={`${block?.key}-block-${index}`}
          onMouseEnter={() => setOs(block?.key)}
        >
          <div
            className={`p-7 lg:p-12 relative rounded-[20px]  w-full flex flex-col items-center gap-7 lg:gap-0 lg:flex-row lg:items-center lg:justify-between border-[1.8px] ${
              os === block?.key
                ? "bg-[#347AE2] border-[#347AE2]"
                : "bg-[#FFFFFF] border-[#DFE4EC]"
            }`}
          >
            <div className="hidden lg:block absolute top-[20px] right-10 z-[1000]">
              <Blob block={block} />
            </div>

            <div className="w-full lg:w-[60%] flex flex-col items-center lg:items-start">
              <Icon block={block} />

              <div className="block lg:hidden">
                <Blob block={block} />
              </div>

              <div className="mt-4 flex flex-col gap-3 items-center lg:items-start justify-start">
                <span
                  className={`text-[24px] md:text-[28px]  font-semibold text-center lg:text-left ${
                    os === block?.key ? "text-[#FFFFFF]" : "text-[#292B38]"
                  }`}
                >
                  {block.title}
                </span>

                <span
                  className={`text-[14px] text-center lg:text-left md:text-[16px] ${
                    os === block?.key ? "text-[#FFFFFF]" : "text-[#292B38]"
                  }`}
                >
                  {block?.subTitle}
                </span>
              </div>

              <div className="w-full flex flex-row justify-center lg:justify-start mt-5">
                <IconsList iconList={block?.iconList} />
              </div>
            </div>

            <div className="w-full lg:w-[25%] relative">
              <div className="w-full flex flex-col justify-center gap-4">
                <Cta block={block} />
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="page-layout flex flex-col items-center justify-start py-24">
      <div className="text-center px-0 md:px-48">
        <span className="text-[32px] md:text-[40px] text-[#062046] font-semibold leading-tight md:leading-tight">
          {title}
        </span>
      </div>

      {/* OPTIONS SECTION */}
      <div className="hidden lg:flex flex-row items-center justify-center grow gap-4 mt-14 w-[1080px] md:w-full">
        <OsOptions />
      </div>

      {/* OPTIONS SECTION - MOBILE*/}
      <div className="block lg:hidden w-full mt-8">
        <OsOptionsMobile />
      </div>

      {/* <div className='mt-14 w-full lg:w-[95%]'>
                <div className='p-7 lg:p-12 rounded-[20px] bg-[#347AE2] w-full flex flex-col items-center gap-7 lg:gap-0 lg:flex-row lg:items-center lg:justify-between'>

                    <div className='w-full lg:w-[60%] flex flex-col items-center lg:items-start'>
                        <Icon />

                        <div className='block lg:hidden'>

                            <Blob />

                        </div>


                        <div className='mt-4 flex flex-col gap-3 items-center lg:items-start justify-start'>
                            <span className='text-[24px] md:text-[28px] text-[#FFFFFF] font-semibold text-center lg:text-left'>
                                {content?.[os]?.title}
                            </span>

                            <span className='text-[14px] text-center lg:text-left md:text-[16px] text-[#FFFFFF]'>
                                {content?.[os]?.subTitle}
                            </span>
                        </div>

                        <div className='w-full flex flex-row justify-center lg:justify-start mt-5'>
                            <IconsList />
                        </div>
                    </div>
                    <div className='w-full lg:w-[25%] relative'>
                        <div className='hidden lg:block'>
                            <Blob />
                        </div>
                        <div className='w-full flex flex-col justify-center gap-4'>
                            <Cta />
                        </div>
                    </div>
                </div>
            </div> */}

      {renderBlocks()}
    </div>
  );
};

export default Compatibility;
