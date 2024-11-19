"use client";
import Link from "next/link";
import { Avatar, Col, Row } from "antd";
import session from "@utils/session";
import SettingsMenu from "@components/common/settingsMenu";
import { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import { FaChevronRight, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import {
  PiArticle,
  PiBookOpen,
  PiBookmarkSimple,
  PiBrowsers,
  PiChartLine,
  PiCloudArrowUp,
  PiCode,
  PiFilePdf,
  PiFolderLock,
  PiGauge,
  PiImageSquare,
  PiInfo,
  PiInstagramLogo,
  PiLink,
  PiListBold,
  PiMagnifyingGlass,
  PiMicrophone,
  PiMoon,
  PiPalette,
  PiRobot,
  PiScan,
  PiSelectionPlus,
  // PiSparkleFill,
  PiSpeakerHigh,
  PiSquaresFour,
  PiTag,
  PiTextAlignCenter,
  PiUserCirclePlus,
  PiUserFocus,
  PiXBold,
  PiYoutubeLogo,
} from "react-icons/pi";
import Highlighter from "../../icons/Highlighter";
import TextExpander from "../../icons/TextExpander";
import UserSound from "../../icons/UserSound";

const features = [
  {
    asset: "PiBookmarkSimple",
    title: "Bookmark Manager",
    subtitle: "Organise your online resources and gems with ease",
    href: "/features/bookmark-manager",
  },
  {
    asset: "PiBrowsers",
    title: "Tabs Manager",
    subtitle:
      "Keep your browsing sessions clutter-free and resume from where you left",
    href: "/features/tabs-manager",
  },
  {
    asset: "PiRobot",
    title: "AI Prompts",
    subtitle: "Slash down time working with AI using pre-saved prompts",
    href: "/features/ai-prompts",
  },
  {
    asset: "TextExpander",
    title: "Text Expander",
    subtitle: "Type less, say more with text expansion shortcuts",
    href: "/features/text-expander",
  },
  {
    asset: "UserSound",
    title: "Listen to Articles",
    subtitle: "Listen to articles on the go with built-in audio playback",
    href: "/features/listen-to-articles",
  },
  {
    asset: "PiSpeakerHigh",
    title: "Audio Notes Taker",
    subtitle: "Record and store audio notes effortlessly",
    href: "/features/audio-notes-taker",
  },
  {
    asset: "PiMoon",
    title: "Universal Dark Mode",
    subtitle:
      "Keep your browsing smooth and dark with CurateIt's Universal Dark Mode.",
    href: "/features/universal-dark-mode",
  },
  {
    asset: "PiYoutubeLogo",
    title: "YouTube Summariser",
    subtitle: "Summarise YouTube videos for quick insights",
    href: "/features/youtube-summariser",
  },
  {
    asset: "PiBookOpen",
    title: "Reader mode",
    subtitle:
      "Convert busy web pages into clean reading layouts with CurateIt's Reader Mode.",
    href: "/features/reader-mode",
  },
];

const images = {
  PiBrowsers: PiBrowsers,
  PiScan: PiScan,
  PiBookmarkSimple: PiBookmarkSimple,
  PiFolderLock: PiFolderLock,
  PiFilePdf: PiFilePdf,
  PiBookOpen: PiBookOpen,
  PiRobot: PiRobot,
  PiMoon: PiMoon,
  PiGauge: PiGauge,
  PiSpeakerHigh: PiSpeakerHigh,
  PiUserCirclePlus: PiUserCirclePlus,
  PiTextAlignCenter: PiTextAlignCenter,
  PiYoutubeLogo: PiYoutubeLogo,
  PiInfo: PiInfo,
  PiPalette: PiPalette,
  PiArticle: PiArticle,
  PiSelectionPlus: PiSelectionPlus,
  PiInstagramLogo: PiInstagramLogo,
  PiCode: PiCode,
  PiTag: PiTag,
  PiUserFocus: PiUserFocus,
  PiChartLine: PiChartLine,
  PiLink: PiLink,
  PiMagnifyingGlass: PiMagnifyingGlass,
  PiSquaresFour: PiSquaresFour,
  PiImageSquare: PiImageSquare,
  PiCloudArrowUp: PiCloudArrowUp,
  PiMicrophone: PiMicrophone,
  Highlighter: Highlighter,
  UserSound: UserSound,
  TextExpander: TextExpander,
};

export default function CustomNav({ setShowReportBug }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const FeatureBlocks = () => {
    return features?.map((feature, index) => {
      const AssetComponent = images[feature?.asset];

      return (
        <Col
          xs={{ span: 8 }}
          sm={{ span: 8 }}
          md={{ span: 8 }}
          lg={{ span: 8 }}
          xl={{ span: 8 }}
          xxl={{ span: 8 }}
          key={`nav-feature-bocks-${index}`}
        >
          <Link
            key={`nav-feature-bocks-${index}`}
            className="w-full h-full min-h-[90px] flex flex-row items-start border-[2px] bg-white border-white hover:border-[#105FD3] hover:shadow-md rounded-[12px] py-2 px-3 gap-3"
            href={feature?.href === "" ? "#" : feature?.href}
          >
            <AssetComponent className="text-[27px] text-[#105FD3] w-[10%]" />
            <div>
              <p className="text-[#105FD3] text-[16px] font-semibold">
                {feature?.title}
              </p>
              <p className="text-[#97A0B5] hover:text-[#5690E7] text-[14px] mt-1">
                {feature?.subtitle}
              </p>
            </div>
          </Link>
        </Col>
      );
    });
  };

  return (
    <header className="relative isolate z-10 bg-[#F0F6FE] sticky top-0">
      <nav
        className="mx-auto flex items-center justify-between p-6 lg:px-[48px]"
        aria-label="Global"
      >
        <div className="">
          <a href="https://www.curateit.com/" className="outline-none">
            <span className="sr-only">CurateIt</span>
            <img
              className="h-10 w-auto"
              src="https://d3jrelxj5ogq5g.cloudfront.net/webapp/logo1sv.svg"
              alt="Curateit"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <PiListBold className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/download"
            className="text-[16px] font-medium leading-[24px] text-[#000929] outline-none"
          >
            Download
          </Link>
          <Link
            href="/pricing"
            className="text-[16px] font-medium leading-[24px] text-[#000929] outline-none"
          >
            Pricing
          </Link>
          {/* <a
            href="https://web.curateit.com/use-cases"
            className="text-[16px] font-medium leading-[24px] text-[#000929] outline-none"
          >
            Use cases
          </a> */}

          <Popover>
            {({ open }) => (
              <>
                <Popover.Button
                  className={`flex items-center gap-x-2 text-[16px] font-medium leading-[24px] outline-none ${
                    open ? "text-[#105FD3]" : "text-[#000929]"
                  }`}
                >
                  Features
                  {open ? (
                    <FaChevronUp
                      className="text-[12px] flex-none text-[#105FD3]"
                      aria-hidden="true"
                    />
                  ) : (
                    <FaChevronDown
                      className="text-[12px] flex-none text-[#000929]"
                      aria-hidden="true"
                    />
                  )}
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 -translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 -translate-y-1"
                >
                  <Popover.Panel className="absolute inset-x-0 top-0 -z-10 bg-white pt-14 shadow-lg ring-1 ring-gray-900/5">
                    <div className="py-10 page-layout">
                      <div className="w-full flex flex-row items-center justify-between">
                        <p className="text-[#105FD3] text-[20px] font-medium">
                          Features
                        </p>

                        <Link
                          className="px-3 py-[6px] rounded-[30px] bg-[#E5F0FF] flex flex-row items-center justify-center gap-[2px]"
                          href="/features"
                        >
                          <p className="text-[#235197] text-[14px] font-medium">
                            See all features
                          </p>
                          <FaChevronRight className="text-[#235197] text-[16px]" />
                        </Link>
                      </div>
                      <div className="w-full mt-3">
                        <Row gutter={[32, 24]}>
                          <FeatureBlocks />
                        </Row>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>

          <a
            href="https://www.curateit.com/u/curateit.com/c/8197/blogs"
            className="text-[16px] font-medium leading-[24px] text-[#000929] outline-none"
          >
            Blog
          </a>
        </Popover.Group>
        {!session.token && (
          <div className="justify-between hidden cursor-pointer items-stretch md:flex gap-4">
            <Link href="/sign-in">
              <div className="text-blue-700 text-center text-base font-bold leading-6 whitespace-nowrap justify-center items-stretch border-[color:var(--primary-200,#B8D4FE)] grow px-6 py-3 rounded-lg border-2 border-solid max-md:px-5">
                Login
              </div>
            </Link>

            <Link href="/sign-up">
              <div className="text-white text-center cursor-pointer text-base font-bold leading-6 whitespace-nowrap justify-center items-stretch bg-blue-700 grow px-6 py-3 rounded-lg max-md:px-5">
                Sign up
              </div>
            </Link>
          </div>
        )}
        {session.token && (
          <div className="justify-between hidden cursor-pointer items-stretch md:flex gap-4">
            <SettingsMenu
              onShowReportBug={() => setShowReportBug && setShowReportBug(true)}
            >
              <Avatar src={session.userProfileImage} className="cursor-pointer">
                {session.username?.charAt(0)?.toUpperCase()}
              </Avatar>
            </SettingsMenu>
          </div>
        )}
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="">
              <span className="sr-only">Your Company</span>
              <img
                className="h-10 w-auto"
                src="https://d3jrelxj5ogq5g.cloudfront.net/webapp/logo1sv.svg"
                alt="Curateit"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <PiXBold className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 flex flex-col gap-6">
                <Link
                  href="/download"
                  className="text-[16px] font-medium leading-[24px] text-[#000929] outline-none"
                >
                  Download
                </Link>
                <Link
                  href="/pricing"
                  className="text-[16px] font-medium leading-[24px] text-[#000929] outline-none"
                >
                  Pricing
                </Link>
                {/* <a
                  href="https://web.curateit.com/use-cases"
                  className="text-[16px] font-medium leading-[24px] text-[#000929] outline-none"
                >
                  Use cases
                </a> */}
                <Link
                  href="/features"
                  className="text-[16px] font-medium leading-[24px] text-[#000929] outline-none"
                >
                  Features
                </Link>
                <a
                  href="https://www.curateit.com/u/curateit.com/c/8197/blogs"
                  className="text-[16px] font-medium leading-[24px] text-[#000929] outline-none"
                >
                  Blog
                </a>
              </div>
              <div className="py-6 flex flex-col gap-2">
                <Link
                  href="/sign-in"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
