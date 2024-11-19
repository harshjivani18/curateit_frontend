"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import "./landingStyle.css";
import session from "@utils/session";
import RolesTabs from "@components/landingPageTabs/RolesTabs";
// import SolutionsTab from "@components/landingPageTabs/SolutionsTab";
import FeaturesTab from "@components/landingPageTabs/FeaturesTab";
import CustomNav from "@components/landingPageTabs/CustomNav";
import QueryComponent from "@components/landingPageTabs/QueryComponent";
// import { NewTwitterIcon, InstagramIcon } from "src/hugeicons/Stroke";
// import { Linkedin01Icon } from "src/hugeicons/Solid";
import ImageGrid from "@components/landingPageTabs/ImageGrid";
import TestimonialsTab from "@components/landingPageTabs/TestimonialsTab";
// import Footer from "@components/Footer2/Footer";
import DefaultFooter from "@components/footer/DefaultFooter";
import CookieConsent from "@components/cookie/CookieConsent";

const MainLandingPage = () => {
  const searchParams = useSearchParams();
  const navigate = useRouter();
  const STATIC_IMAGES_CDN = process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN;
  const WEBSITE_DOMAIN = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN;

  useEffect(() => {
    const getCall = async () => {
      const accessToken = searchParams.get("access_token");
      const isRegister = searchParams.has("isRegister");
      if (accessToken) {
        session.setLoginDetails(accessToken);
        const userDetails = JSON.parse(window.atob(accessToken));
        if (userDetails.jwt) {
          await axios.post("/api/cookies", {
            messages: userDetails.jwt,
            userId: userDetails?.user?.id,
            userName: userDetails?.user?.username,
          });
        }
        if (isRegister){
          navigate.push(`/onboarding`);
        } else{
          navigate.push(`/u/${session.username}/all-bookmarks`);
        }
      } else if (session.token && session.username) {
        await axios.post("/api/cookies", {
          messages: session.token,
          userId: session.userId,
          userName: session.username,
        });
        navigate.push(`/u/${session.username}/all-bookmarks`);
      }
    };

    getCall();
  }, [navigate]);

  return (
    <div className="bg-white flex flex-col items-stretch">
      <CustomNav />
      <div className="flex base w-full flex-col pb-4 md:pb-12 px-5  max-md:max-w-full">
        <div className="items-stretch border border-[color:var(--primary-100,#E5F0FF)] bg-slate-50 self-center flex gap-3 mt-16 pl-1 pr-2.5 py-1 rounded-full border-solid max-md:mt-10">
          <div className="text-blue-700 text-center text-sm font-medium leading-5 whitespace-nowrap items-stretch border border-[color:var(--primary-200,#B8D4FE)] bg-sky-100 grow justify-center px-2.5 py-0.5 rounded-full border-solid">
            What’s new!
          </div>
          <div className="items-stretch self-center flex gap-1 my-auto">
            <Link
              href={`${WEBSITE_DOMAIN}/whats-new`}
              className="flex items-center"
            >
              <div className="text-blue-700 text-sm font-medium leading-5 grow whitespace-nowrap">
                Check out the latest release{" "}
              </div>
              <img
                loading="lazy"
                src={`${STATIC_IMAGES_CDN}/webapp/arrow-right.svg`}
                alt="Right arrow icon"
                className="aspect-square object-contain object-center w-4 overflow-hidden self-center shrink-0 max-w-full my-auto"
              />
            </Link>
          </div>
        </div>
        <div className="self-center text-sky-950 text-center text-6xl font-bold leading-[84px] tracking-tighter w-full max-w-[1120px] mt-6 max-md:max-w-full max-md:text-4xl max-md:leading-[58px]">
          Unite Productivity & Content Curation to Transform your Brand
        </div>
        <div className="text-sky-950 text-center text-xl leading-8 tracking-normal self-center max-w-[928px] mt-6 max-md:max-w-full">
          The ultimate tool for content creators, marketers, researchers,
          readers, and productivity enthusiasts. Effortlessly create, curate,
          discover, and share. Transform information into impactful, shareable,
          and monetizable knowledge to elevate your brand
        </div>
        <div className="justify-center items-center self-center flex w-full max-w-[1120px] flex-col mt-8 mb-10 px-16 max-md:max-w-full max-md:mb-10 max-md:px-5">
          <div className="flex flex-col md:flex-row items-stretch gap-4">
            <div className="justify-between items-center bg-blue-700 flex gap-2 px-8 py-4 rounded-lg max-md:px-5">
              <Link href="/sign-up">
                <div className="text-white text-center text-base font-semibold leading-6 grow whitespace-nowrap">
                  Start Curating for Free{" "}
                </div>
              </Link>
              <img
                loading="lazy"
                alt="Right arrow icon"
                src={`${STATIC_IMAGES_CDN}/webapp/rightarrow.svg`}
                className="aspect-square object-contain object-center w-5 mr-2 sm:mr-0 overflow-hidden self-center shrink-0 max-w-full my-auto"
              />
            </div>
            <div className="text-blue-700 text-center text-base font-semibold leading-6 whitespace-nowrap justify-center items-stretch border-[color:var(--primary-200,#B8D4FE)] grow px-8 py-4 rounded-lg border-2 border-solid max-md:px-5">
              <Link
                href={"https://link.curateit.com/SignUpExtension"}
                target="_blank"
              >
                Add to Chrome (Free)
              </Link>
            </div>
          </div>
          <div className="flex items-center flex-wrap mt-4  justify-between w-[280px]">
          <img
            loading="lazy"
            src={`${STATIC_IMAGES_CDN}/webapp/logos_chrome.svg`}
            alt="chrome"
            className="w-8 h-8"
          />
          <img
            loading="lazy"
            src={`${STATIC_IMAGES_CDN}/webapp/stars.svg`}
            alt="chrome"
            className="w-30 h-30"
          />
          <span className="text-base font-medium  text-black"> Rated 5/5</span>
          </div>
          
        </div>
      </div>
      <div className="flex-col overflow-hidden self-center pb-2 relative z-[1] flex min-h-auto mt-0 w-full max-w-[1218px] justify-center items-center px-16 py-4 max-md:max-w-full max-md:px-5">
        <Link href={`/sign-up`} className="hover:none hidden sm:flex">
          <img
            loading="lazy"
            src={`${STATIC_IMAGES_CDN}/webapp/groupHeroBig.png`}
            alt="hero-image"
            className="object-contain h-auto w-full max-w-full pt-8 pb-8"
          />
        </Link>
        <Link href={`/sign-up`} className="hover:none flex sm:hidden ">
          <img
            loading="lazy"
            src={`${STATIC_IMAGES_CDN}/webapp/groupHeroMobile.png`}
            alt="hero-image"
            className="object-contain h-auto w-full max-w-full pt-2 pb-2"
          />
        </Link>
      </div>
      {/* <div className="flex w-full flex-col items-center mt-5 md:mt-20 pb-12 px-16 max-md:max-w-full max-md:mt-10 max-md:px-5">
        <Link href={`${WEBSITE_DOMAIN}/sign-up`} className="hover:none">
          <img
            loading="lazy"
            src={`${STATIC_IMAGES_CDN}/webapp/gridimg1.svg`}
            className="aspect-[0.92] object-contain object-center w-full overflow-hidden z-[1] mt-0 max-w-[1120px] mb-16 max-md:max-w-full max-md:mt-0 max-md:mb-10"
          />
        </Link>
      </div> */}
      <ImageGrid />
      <div className="items-center border border-[color:var(--primary-200,#B8D4FE)] shadow-sm bg-white self-center flex gap-1.5 mt-16 px-2.5 py-1 rounded-lg border-solid max-md:mt-10">
        <img
          loading="lazy"
          src={`${STATIC_IMAGES_CDN}/webapp/Dot.svg`}
          alt="Three dot"
          className="aspect-square object-contain object-center w-2 overflow-hidden shrink-0 max-w-full my-auto"
        />
        <div className="text-sky-950 text-center text-sm font-medium leading-5 self-stretch grow whitespace-nowrap">
          Features
        </div>
      </div>
      <div className="self-center text-gray-900 text-center text-4xl font-semibold leading-10 tracking-tighter max-w-screen-md mt-4 max-md:max-w-full">
        AI-Powered Tool To Streamline and Monetise Digital Content - All In One
        Place!
      </div>
      <div className="self-center text-slate-600 text-center text-xl leading-8 max-w-screen-md mt-5 max-md:max-w-full">
        Effortless content management and productivity to Streamline
        bookmarking, enjoy creative curation, enhance reading experiences and
        more. Perfect for professionals, students, and hobbyists
      </div>
      <div className="w-full overflow-x-auto px-4 mt-2 max-md:px-5">
        <FeaturesTab />
      </div>
      <div className="flex w-auto justify-center baseCTA items-center">
        <div className="text-blue-700 text-center  text-base font-semibold leading-6 mb-28  whitespace-nowrap justify-center items-stretch border-[color:var(--primary-200,#B8D4FE)] self-center mt-24 px-8 py-4 rounded-lg border-2 border-solid max-md:mt-10 max-md:px-5">
          <Link href={`https://www.curateit.com/features/`}>View all features</Link>
        </div>{" "}
      </div>
      <div className="justify-center items-center bg-[rgb(229,240,255)] flex w-full flex-col pb-12 px-16 max-md:max-w-full max-md:px-5">
        <div className="justify-between content-center gap-y-8 flex-wrap bg-slate-50 w-full max-w-[1120px] mb-12 px-16 py-12 rounded-2xl max-md:max-w-full max-md:mb-10 max-md:px-5">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[81%] max-md:w-full max-md:ml-0">
              <div className="items-stretch flex flex-col my-auto max-md:max-w-full max-md:mt-10">
                <div className="text-gray-900 text-3xl font-semibold leading-10 max-md:max-w-full">
                  Your journey to having the most organized, tab-zero browser
                  starts here.
                </div>{" "}
                <div className="text-slate-600 text-xl leading-8 mt-4 max-md:max-w-full">
                  It’s a must-have superpower for all creators.
                </div>
              </div>
            </div>{" "}
            <div className="flex flex-col items-stretch w-[19%] ml-5 max-md:w-full max-md:ml-0">
              <div className="justify-center cursor-pointer items-stretch bg-blue-700 flex gap-2 w-full my-auto px-8 py-4 rounded-lg max-md:mt-10 max-md:px-5">
                <Link href="/sign-up" className="flex items-center">
                  <div className="text-white text-center text-base font-semibold leading-6 grow whitespace-nowrap">
                    Add to Chrome{" "}
                  </div>{" "}
                  <img
                    loading="lazy"
                    src={`${STATIC_IMAGES_CDN}/webapp/rightarrow.svg`}
                    alt="Right arrow icon"
                    className="aspect-square object-contain object-center w-5 overflow-hidden self-center shrink-0 max-w-full my-auto"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="items-center bg-white flex w-full flex-col px-20 py-12 max-md:max-w-full max-md:px-5">
        {/* <div className="text-blue-700 flex text-center text-sm gap-1 font-medium leading-5 whitespace-nowrap items-stretch border-[color:var(--primary-500-base,#105FD3)] justify-center mt-12 px-3 py-1 rounded-full border-[1.5px] border-solid max-md:mt-10">
          <img
            loading="lazy"
            src={`${STATIC_IMAGES_CDN}/webapp/Dot.svg`}
            className="aspect-square object-contain object-center w-2  overflow-hidden shrink-0 max-w-full my-auto"
          />
          Use Cases
        </div>{" "}
        <div className="text-sky-950 text-center text-4xl font-semibold leading-10 tracking-tighter max-w-screen-md mt-4 max-md:max-w-full">
          CurateIt in action
        </div>{" "}
        <div className="text-slate-600 text-center text-xl leading-8 max-w-screen-md mt-5 max-md:max-w-full">
          Get hands on the real ways you can optimize your content!
        </div>{" "} */}
        {/* <div className="text-sky-950 text-center text-3xl font-bold leading-10 whitespace-nowrap justify-center items-center border-b-[color:var(--primary-500-base,#105FD3)] w-[366px] max-w-full mt-16 px-16 py-5 border-b-2 border-solid max-md:mt-10 max-md:px-5">
          Solutions
        </div>{" "} */}
        {/* <div className="w-full overflow-x-auto">
         
          <SolutionsTab />
        </div> */}
        {/* <div className="text-white text-lg font-semibold leading-7 whitespace-nowrap justify-center items-stretch border border-[color:var(--primary-500-base,#105FD3)] shadow-sm bg-blue-700 mt-10 px-6 py-4 rounded-lg border-solid max-md:px-5">
          <Link href="/sign-up" className="hover:text-blue-50">
            Install Extension -&gt;
          </Link>
        </div> */}
        <div className="text-sky-950 flex text-center text-3xl font-bold leading-10 whitespace-nowrap justify-center items-center border-b-[color:var(--primary-500-base,#105FD3)] w-[366px] max-w-full mt-16 px-16  py-5 border-b-2 border-solid max-md:mt-10 max-md:px-5">
          Different Roles,
          <br className="flex md:hidden" /> One Solution
        </div>
        <div className="w-full overflow-x-auto">
          {/* Roles Section  */}
          <RolesTabs />
        </div>
        {/* <div className="text-white text-lg font-semibold leading-7 whitespace-nowrap justify-center items-stretch border border-[color:var(--primary-500-base,#105FD3)] shadow-sm bg-blue-700 mt-10 mb-12 px-6 py-4 rounded-lg border-solid max-md:mb-10 max-md:px-5">
          <Link href="/sign-up" className="hover:text-blue-50">
            Join 2000+ Users -&gt;
          </Link>
        </div> */}
      </div>
      <div className="flex w-full flex-col items-stretch mt-2 max-md:max-w-full">
        <div className="items-center z-[1] flex mt-0 w-full flex-col justify-center px-16 py-12 max-md:max-w-full max-md:px-5">
          <div className="flex w-full max-w-[1120px] flex-col items-stretch my-12 max-md:max-w-full max-md:my-10">
            <div className="justify-between flex-col md:flex-row items-stretch content-start gap-y-8 flex-wrap flex gap-5 max-md:max-w-full">
              <div className="items-stretch flex grow basis-[0%] flex-col max-md:max-w-full">
                <div className="text-sky-950 text-4xl font-semibold leading-10 tracking-tighter max-md:max-w-full">
                  Learn and Grow with CurateIt
                </div>
                <div className="text-slate-600 text-xl leading-8 mt-5 md:pr-[126px] max-md:max-w-full">
                  Tool, tips and strategies you need to enhance your content,
                  collaborate better and monetise your work.
                </div>
              </div>
              <div className="text-white text-base font-semibold leading-6 whitespace-nowrap justify-center items-stretch border border-[color:var(--primary-500-base,#105FD3)] shadow-sm bg-blue-700 px-5 py-3 rounded-lg border-solid self-start">
                <Link
                  href={`${WEBSITE_DOMAIN}/blog`}
                  className="hover:text-blue-50"
                >
                  See more -&gt;
                </Link>
              </div>
            </div>
            <div className="content-start flex-wrap mt-16 max-md:max-w-full max-md:mt-10">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
                  <div className="items-stretch flex grow flex-col max-md:mt-8">
                    <img
                      loading="lazy"
                      src={`${STATIC_IMAGES_CDN}/webapp/blog1sv.svg`}
                      alt="blog"
                      className="rounded-md object-contain object-center w-full overflow-hidden"
                    />
                    <Link
                      href={`${WEBSITE_DOMAIN}/blog/top-10-product-management-tools-for-efficient-decision-making/a-startup-story-surviving-the-first-12-months`}
                      className="hover:none"
                    >
                      <div className="items-stretch flex justify-between gap-4 mt-5">
                        <div className="text-sky-950 text-xl font-semibold leading-8 grow shrink basis-auto">
                          10 Essential AI Tools You Need to Know About in 2024
                        </div>
                        <img
                          loading="lazy"
                          src={`${STATIC_IMAGES_CDN}/webapp/arrow-up-right.svg`}
                          alt="Arrow up right icon"
                          className="aspect-square object-contain object-center w-6 overflow-hidden self-center shrink-0 max-w-full my-auto"
                        />
                      </div>
                      <div className="overflow-hidden text-slate-600 text-ellipsis text-sm leading-6 mt-2">
                        As someone who has been following the developments in
                        the field of Artificial Intelligence
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="items-stretch flex grow flex-col max-md:mt-8">
                    <img
                      loading="lazy"
                      src={`${STATIC_IMAGES_CDN}/webapp/blog2sv.svg`}
                      alt="blog"
                      className=" object-contain object-center rounded-md  w-full overflow-hidden"
                    />
                    <Link
                      href={`${WEBSITE_DOMAIN}/blog/how-to-use-curateit-second-brain`}
                      className="hover:none"
                    >
                      <div className="items-stretch flex justify-between gap-4 mt-5">
                        <div className="text-sky-950 text-xl font-semibold leading-8 grow shrink basis-auto">
                          Use CurateIt as Your Second Brain
                        </div>
                        <img
                          loading="lazy"
                          src={`${STATIC_IMAGES_CDN}/webapp/arrow-up-right.svg`}
                          alt="Arrow up right icon"
                          className="aspect-square object-contain object-center w-6 overflow-hidden self-center shrink-0 max-w-full my-auto"
                        />
                      </div>
                      <div className="overflow-hidden text-slate-600 text-ellipsis text-sm leading-6 mt-2">
                        In today’s information age, we are constantly bombarded
                        with information from various sources.
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="items-stretch flex grow flex-col max-md:mt-8">
                    <img
                      loading="lazy"
                      src={`${STATIC_IMAGES_CDN}/webapp/blog3sv.svg`}
                      alt="blog"
                      className="rounded-md object-contain object-center w-full overflow-hidden"
                    />
                    <Link
                      href={`${WEBSITE_DOMAIN}/blog/top-10-product-management-tools-for-efficient-decision-making/founder-stack-the-best-solopreneur-tools`}
                      className="hover:none"
                    >
                      <div className="items-stretch flex justify-between gap-4 mt-5">
                        <div className="text-sky-950 text-xl font-semibold leading-8 grow shrink basis-auto">
                          Powerful Product Management Tools to Boost
                          Productivity
                        </div>
                        <img
                          loading="lazy"
                          src={`${STATIC_IMAGES_CDN}/webapp/arrow-up-right.svg`}
                          alt="Arrow up right icon"
                          className="aspect-square object-contain object-center w-6 overflow-hidden self-center shrink-0 max-w-full my-auto"
                        />
                      </div>
                      <div className="overflow-hidden text-slate-600 text-ellipsis text-sm leading-6 mt-2">
                        Product management is a challenging role that requires a
                        high level of organization
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="items-center flex w-full flex-col justify-center px-16 py-12 max-md:max-w-full max-md:px-5">
          <div className="flex w-full max-w-[1120px] flex-col items-stretch my-12 max-md:max-w-full max-md:my-10">
            <div className="justify-between items-stretch content-start gap-y-8 flex-wrap flex gap-5 max-md:max-w-full">
              <div className="items-stretch flex grow basis-[0%] flex-col max-md:max-w-full">
                <div className="text-sky-950 text-4xl font-semibold leading-10 tracking-tighter max-md:max-w-full">
                  Lastest tutorials
                </div>
                <div className="text-slate-600 text-xl leading-8 mt-5 max-md:max-w-full">
                  Tool and strategies modern teams need to help their companies
                  grow.
                </div>
              </div>
              <div className="text-white text-base font-semibold leading-6 whitespace-nowrap justify-center items-stretch border border-[color:var(--primary-500-base,#105FD3)] shadow-sm bg-blue-700 px-5 py-3 rounded-lg border-solid self-start">
                See more -&gt;
              </div>
            </div>
            <div className="content-start flex-wrap mt-16 max-md:max-w-full max-md:mt-10">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
                  <div className="items-stretch flex grow flex-col max-md:mt-8">
                    <img
                      loading="lazy"
                      src={`${STATIC_IMAGES_CDN}/webapp/blog1.png`}
                      alt="blog"
                      className="aspect-[1.47] object-contain object-center w-full overflow-hidden"
                    />
                    <div className="items-stretch flex justify-between gap-4 mt-5">
                      <div className="text-sky-950 text-xl font-semibold leading-8 grow shrink basis-auto">
                        UX review presentations
                      </div>
                      <img
                        loading="lazy"
                        src={`${STATIC_IMAGES_CDN}/webapp/arrow-up-right.svg`}
                        className="aspect-square object-contain object-center w-6 overflow-hidden self-center shrink-0 max-w-full my-auto"
                      />
                    </div>
                    <div className="overflow-hidden text-slate-600 text-ellipsis text-sm leading-6 mt-2">
                      How do you create compelling presentations that wow your
                      colleagues and impress your managers?
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="items-stretch flex grow flex-col max-md:mt-8">
                    <img
                      loading="lazy"
                      src={`${STATIC_IMAGES_CDN}/webapp/blog2.png`}
                      alt="blog"
                      className="aspect-[1.47] object-contain object-center w-full overflow-hidden"
                    />
                    <div className="items-stretch flex justify-between gap-4 mt-5">
                      <div className="text-sky-950 text-xl font-semibold leading-8 grow shrink basis-auto">
                        Migrating to Linear 101
                      </div>
                      <img
                        loading="lazy"
                        src={`${STATIC_IMAGES_CDN}/webapp/arrow-up-right.svg`}
                        className="aspect-square object-contain object-center w-6 overflow-hidden self-center shrink-0 max-w-full my-auto"
                      />
                    </div>
                    <div className="overflow-hidden text-slate-600 text-ellipsis text-sm leading-6 mt-2">
                      Linear helps streamline software projects, sprints, tasks,
                      and bug tracking. Here’s how to get started.
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="items-stretch flex grow flex-col max-md:mt-8">
                    <img
                      loading="lazy"
                      src={`${STATIC_IMAGES_CDN}/webapp/blog3.png`}
                      alt="blog"
                      className="aspect-[1.47] object-contain object-center w-full overflow-hidden"
                    />
                    <div className="items-stretch flex justify-between gap-4 mt-5">
                      <div className="text-sky-950 text-xl font-semibold leading-8 grow shrink basis-auto">
                        Building your API stack
                      </div>
                      <img
                        loading="lazy"
                        src={`${STATIC_IMAGES_CDN}/webapp/arrow-up-right.svg`}
                        className="aspect-square object-contain object-center w-6 overflow-hidden self-center shrink-0 max-w-full my-auto"
                      />
                    </div>
                    <div className="overflow-hidden text-slate-600 text-ellipsis text-sm leading-6 mt-2">
                      The rise of RESTful APIs has been met by a rise in tools
                      for creating, testing, and managing them.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      {/* <-----Testimonials Section----->  */}
      <TestimonialsTab />
      <div className="items-center bg-white flex w-full flex-col justify-center px-16 py-8 max-md:max-w-full max-md:px-5">
        <div className="flex w-full max-w-[1120px] flex-col my-12 max-md:max-w-full max-md:my-10">
          <div className="self-center text-sky-950 text-center text-4xl font-semibold leading-10 tracking-tighter max-w-screen-md max-md:max-w-full">
            Frequently asked questions
          </div>
          <div className="self-center text-slate-600 text-center text-xl leading-8 max-w-screen-md mt-5 max-md:max-w-full">
            Everything you need to know about the product and billing.
          </div>
          {<QueryComponent />}
        </div>
      </div>
      {/* <div className="items-stretch bg-white flex w-full flex-col pb-12 max-md:max-w-full">
        <div className="items-stretch bg-[rgb(229,240,255)] flex w-full flex-col pt-12 px-8 max-md:max-w-full max-md:px-5">
          <div className="items-center border-b-[color:var(--colors-border-border-secondary,#EAECF0)] flex flex-col mt-3.5 pb-12 px-16 border-b border-solid max-md:max-w-full max-md:px-5">
            <div className="flex w-[768px] max-w-full flex-col items-center mb-3.5">
              <div className="self-stretch text-gray-900 text-center text-3xl font-semibold leading-10 max-md:max-w-full">
                Sign up to get your invite
              </div>
              <div className="self-stretch text-slate-600 text-center text-xl leading-8 mt-4 max-md:max-w-full">
                Sign up now and transform the way you save, organize, and access
                your favorite content from across the web
              </div>
              <div className="justify-center items-stretch bg-blue-700 flex gap-2 mt-12 px-8 py-4 rounded-lg max-md:mt-10 max-md:px-5">
                <div className="text-white text-center cursor-pointer text-base font-semibold leading-6 grow whitespace-nowrap">
                  <Link href="/sign-up" className="hover:text-white">
                    Sign up now
                  </Link>
                </div>
                <img
                  loading="lazy"
                  src={`${STATIC_IMAGES_CDN}/webapp/rightarrow.svg`}
                  alt="iocn"
                  className="aspect-square object-contain object-center w-5 overflow-hidden self-center shrink-0 max-w-full my-auto"
                />
              </div>
            </div>
          </div>
        </div>
        <Footer/>
        {/* <div className="self-center w-full max-w-[1216px] mt-16 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[81%] max-md:w-full max-md:ml-0">
              <div className="items-stretch flex grow flex-col px-5 max-md:max-w-full max-md:mt-8">
                <Link href="/">
                  <img
                    loading="lazy"
                    src={`${STATIC_IMAGES_CDN}/webapp/logo1sv.svg`}
                    className="aspect-[4.2] object-contain object-center w-[168px] justify-center items-center overflow-hidden max-w-full self-start"
                  />
                </Link>

                <div className="text-slate-600 text-base leading-6 mt-8 max-md:max-w-full">
                  CurateIt is designed for Professionals, Freelancers,
                  entrepreneurs, and small to medium-sized businesses
                </div>
                <div className="flex justify-between items-start">
                  <div className="items-stretch flex flex-col md:flex-row justify-between gap-5 mt-8 md:pr-40 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                    <div className="text-slate-600 text-base font-semibold leading-6 whitespace-nowrap">
                      <Link href={`${WEBSITE_DOMAIN}/pricing`}>Pricing</Link>
                    </div>
                    <div className="text-slate-600 text-base font-semibold leading-6">
                      <Link href={`${WEBSITE_DOMAIN}/whats-new`}>
                        What's New?
                      </Link>
                    </div>
                    <div className="text-slate-600 text-base font-semibold leading-6">
                      <Link href={`${WEBSITE_DOMAIN}/the-team`}>Team</Link>
                    </div>
                    <div className="text-slate-600 text-base font-semibold leading-6">
                      <Link href={`${WEBSITE_DOMAIN}/careers`}>Careers</Link>
                    </div>
                    {/* <div className="text-slate-600 text-base font-semibold leading-6">
                    Help
                  </div> 
                  </div>{" "}
                    <div className="text-slate-600 text-base font-semibold leading-6 whitespace-nowrap">
                      <Link
                        href={`${WEBSITE_DOMAIN}/privacy-terms-and-conditions`}
                      >
                        Privacy
                      </Link>
                    </div>
                  </div>
                  <div className="items-stretch flex flex-col px-5 md:hidden ">
                    <Link
                      href={"https://link.curateit.com/SignUpExtension"}
                      target="_blank"
                    >
                      <img
                        loading="lazy"
                        src={`${STATIC_IMAGES_CDN}/webapp/chrome-webstore.png`}
                        className="aspect-[2.92] object-contain object-center w-[228px] overflow-hidden self-center mt-4"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:flex flex-col hidden items-stretch w-[19%] ml-5 max-md:w-full max-md:ml-0">
              <div className="items-stretch flex flex-col px-5 max-md:mt-8">
                <Link
                  href={"https://link.curateit.com/SignUpExtension"}
                  target="_blank"
                >
                  <img
                    loading="lazy"
                    src={`${STATIC_IMAGES_CDN}/webapp/chrome-webstore.png`}
                    className="aspect-[2.92] object-contain object-center w-[228px] overflow-hidden self-center mt-4"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="justify-between items-stretch content-center gap-y-6 flex-wrap border-t-[color:var(--colors-border-border-secondary,#EAECF0)] self-center flex w-full max-w-[1216px] gap-5 mt-16 pt-8 px-5 border-t border-solid max-md:max-w-full max-md:mt-10">
          <div className="text-gray-500 text-base leading-6 grow whitespace-nowrap">
            © 2023 Curateit Inc. All rights reserved.
          </div>
          <div className="items-stretch flex justify-between gap-5 max-md:justify-center">
            <div className="text-gray-500">
              <Link href={`https://twitter.com/CurateitHQ`}>
                <NewTwitterIcon />
              </Link>
            </div>
            <div className="text-gray-500">
              <Link href={`https://www.linkedin.com/company/curateit/"`}>
                <Linkedin01Icon />
              </Link>
            </div>
            <div className="text-gray-500">
              <Link href={`https://www.instagram.com/curateithq`}>
                <InstagramIcon />
              </Link>
            </div>
          </div>
        </div>
      </div> */}
      <DefaultFooter />
      <CookieConsent />
    </div>
  );
};
export default MainLandingPage;
