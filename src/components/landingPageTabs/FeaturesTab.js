import { Tabs } from "antd";
import { featuresContent } from "@containers/landing-page/pageData";
import CustomTab from "./CustomTab";
import { useState } from "react";
import Link from "next/link";

const renderFeatureContent = ({ content }) => {
  return (
    <>
      <div className="self-center w-full mx-auto max-w-[1116px] mt-3 md:mt-4 max-md:max-w-full  ">
        <div className="gap-5 flex flex-col items-stretch md:flex-row md:gap-5">
          <div className="flex flex-col items-stretch w-full md:w-[58%]">
            <div className="bg-white flex flex-col w-full p-2">
              <div className="flex justify-between gap-5 items-start">
                <img
                  loading="lazy"
                  src={content?.firstPart?.favImageSrc}
                  alt={content?.firstPart?.title || "CurateIt AI Bookmark Manager Logo"}
                  className="aspect-square object-contain object-center w-12 justify-start overflow-hidden mt-2 shrink-0 max-w-full"
                />
                <div className="text-gray-900 text-3xl items-start flex font-semibold leading-10 self-center grow shrink basis-auto my-auto max-md:max-w-full">
                  {content?.firstPart?.title}
                </div>
              </div>
              <div className="p-2 md:hidden w-full">
                <img
                  loading="lazy"
                  src={content?.firstPart?.imageSrc}
                  alt={content?.firstPart?.title || "CurateIt AI Bookmark Manager Logo"}
                  className="aspect-[0.92] rounded-xl object-contain object-center w-full overflow-hidden grow max-md:max-w-full max-md:mt-10"
                />
              </div>
              <div className=" self-stretch bg-slate-50 flex justify-between gap-4 mt-4 p-3 md:p-4 rounded-xl items-start max-md:max-w-full max-md:flex-wrap">
                <img
                  loading="lazy"
                  src={content?.firstPart?.featureOne?.featureIconSrc}
                  alt={content?.firstPart?.featureOne?.heading || "CurateIt AI Bookmark Manager Logo"}
                  className="aspect-square hidden md:flex object-contain object-center w-12 justify-center items-center shadow-sm overflow-hidden shrink-0 max-w-full"
                />
                <div className="items-stretch self-stretch flex grow basis-[0%] flex-col md:pt-2 max-md:max-w-full">
                  <div className="text-sky-950 text-xl font-semibold leading-8 max-md:max-w-full">
                    {content?.firstPart?.featureOne?.heading}
                  </div>
                  <div className="text-slate-600 text-base leading-6 mt-2 max-md:max-w-full">
                    {content?.firstPart?.featureOne?.description}
                  </div>
                </div>
              </div>
              <div className="self-stretch bg-slate-50 flex justify-between gap-4 mt-3 md:mt-4 p-3 md:p-4 rounded-xl items-start max-md:max-w-full max-md:flex-wrap">
                <img
                  loading="lazy"
                  alt={content?.firstPart?.featureOne?.heading || "CurateIt AI Bookmark Manager Logo"}
                  src={content?.firstPart?.featureOne?.featureIconSrc}
                  className="aspect-square hidden md:flex object-contain object-center w-12 justify-center items-center shadow-sm overflow-hidden shrink-0 max-w-full"
                />
                <div className="items-stretch self-stretch flex grow basis-[0%] flex-col max-md:max-w-full">
                  <div className="text-sky-950 text-xl font-semibold leading-8 max-md:max-w-full">
                    {content?.firstPart?.featureTwo?.heading}
                  </div>
                  <div className="text-slate-600 text-base leading-6 mt-2 max-md:max-w-full">
                    {content?.firstPart?.featureTwo?.description}
                  </div>
                </div>
              </div>
              <div className="text-white cursor-pointer max-md:w-fit text-base font-semibold leading-6 whitespace-nowrap flex justify-center items-center border border-[color:var(--primary-500-base,#105FD3)] shadow-sm bg-blue-700 self-center w-[451px] max-w-full mt-3 md:mt-7 px-16 py-3 rounded-[42px] border-solid max-md:px-22">
                <Link href="https://chromewebstore.google.com/detail/curateit-ai-bookmark-mana/hhofkocnlefejficdipgkefgfmnenpbk" className="hover:text-blue-50">
                  Explore Now -&gt;
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:flex p-3 w-full md:w-[42%]">
            <img
              loading="lazy"
              src={content?.firstPart?.imageSrc}
              alt={content?.firstPart?.title || "CurateIt AI Bookmark Manager Logo"}
              className="aspect-[0.92] rounded-xl object-contain w-full"
            />
          </div>
        </div>
      </div>
      <div className="self-center w-full mx-auto max-w-[1116px] mt-16 px-4 max-md:max-w-full max-md:mt-10 ">
        <div className="gap-5 flex flex-col items-stretch md:flex-row md:gap-5">
          <div className="hidden md:flex items-center  p-3 w-full md:w-[42%]">
            <img
              loading="lazy"
              src={content?.secondPart?.imageSrc}
              alt={content?.secondPart?.title || "CurateIt AI Bookmark Manager Logo"}
              className="aspect-[0.92] rounded-xl  w-full overflow-hidden grow max-md:max-w-full max-md:mt-10"
            />
          </div>
          <div className="flex flex-col items-stretch w-full md:w-[58%]">
            <div className="bg-white flex flex-col w-full p-2">
              <div className="flex justify-between gap-5 items-start">
                <img
                  loading="lazy"
                  src={content?.secondPart?.favImageSrc}
                  alt={content?.secondPart?.title || "CurateIt AI Bookmark Manager Logo"}
                  className="aspect-square object-contain object-center w-12 mt-2 justify-start overflow-hidden shrink-0 max-w-full"
                />
                <div className="text-gray-900 text-3xl font-semibold leading-10 self-center grow shrink basis-auto my-auto max-md:max-w-full">
                  {content?.secondPart?.title}
                </div>
              </div>
              <div className="p-3 md:hidden w-full">
                <img
                  loading="lazy"
                  src={content?.secondPart?.imageSrc}
                  alt={content?.secondPart?.title || "CurateIt AI Bookmark Manager Logo"}
                  className="aspect-[0.92] rounded-xl object-contain object-center w-full overflow-hidden grow max-md:max-w-full max-md:mt-10"
                />
              </div>
              <div className="  self-stretch bg-slate-50 flex justify-between gap-4 mt-3 md:mt-4 p-3 md:p-4 rounded-xl items-start max-md:max-w-full max-md:flex-wrap">
                <img
                  loading="lazy"
                  src={content?.secondPart?.featureOne?.featureIconSrc}
                  alt={content?.secondPart?.featureOne?.heading || "CurateIt AI Bookmark Manager Logo"}
                  className="aspect-square object-contain hidden md:flex object-center w-12 justify-center items-center shadow-sm overflow-hidden shrink-0 max-w-full"
                />
                <div className="items-stretch self-stretch flex grow basis-[0%] flex-col md:pt-2 max-md:max-w-full">
                  <div className="text-sky-950 text-xl font-semibold leading-8 max-md:max-w-full">
                    {content?.secondPart?.featureOne?.heading}
                  </div>
                  <div className="text-slate-600 text-base leading-6 mt-2 max-md:max-w-full">
                    {content?.secondPart?.featureOne?.description}
                  </div>
                </div>
              </div>
              <div className=" self-stretch bg-slate-50 flex justify-between gap-4 mt-3 md:mt-4 px-2 py-4 rounded-xl items-start max-md:max-w-full max-md:flex-wrap">
                <img
                  loading="lazy"
                  src={content?.secondPart?.featureOne?.featureIconSrc}
                  alt={content?.secondPart?.featureTwo?.heading || "CurateIt AI Bookmark Manager Logo"}
                  className="aspect-square object-contain hidden md:flex object-center w-12 justify-center items-center shadow-sm overflow-hidden shrink-0 max-w-full"
                />
                <div className="items-stretch self-stretch flex grow basis-[0%] flex-col md:pt-2.5 max-md:max-w-full">
                  <div className="text-sky-950 text-xl font-semibold leading-8 max-md:max-w-full">
                    {content?.secondPart?.featureTwo?.heading}
                  </div>
                  <div className="text-slate-600 text-base leading-6 mt-2 max-md:max-w-full">
                    {content?.secondPart?.featureTwo?.description}
                  </div>
                </div>
              </div>{" "}
              <div className="text-white max-md:w-fit cursor-pointer flex text-base font-semibold leading-6 whitespace-nowrap justify-center items-center border border-[color:var(--primary-500-base,#105FD3)] shadow-sm bg-blue-700 self-center w-[451px] max-w-full mt-3 md:mt-7 px-16 py-3 rounded-[42px] border-solid max-md:px-22">
                <Link href="https://chromewebstore.google.com/detail/curateit-ai-bookmark-mana/hhofkocnlefejficdipgkefgfmnenpbk" className="hover:text-blue-50">
                  Learn More -&gt;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="self-center w-full mx-auto max-w-[1116px] mt-16 px-4 max-md:max-w-full max-md:mt-10 ">
        <div className="gap-5 flex flex-col items-stretch md:flex-row md:gap-5">
          <div className="flex flex-col items-stretch w-full md:w-[58%]">
            <div className="bg-white flex flex-col w-full p-2">
              <div className="flex justify-between gap-5 items-start">
                <img
                  loading="lazy"
                  src={content?.thirdPart?.favImageSrc}
                  alt={content?.thirdPart?.title || "CurateIt AI Bookmark Manager Logo"}
                  className="aspect-square object-contain object-center w-12 mt-2 items-start overflow-hidden shrink-0 max-w-full"
                />{" "}
                <div className="text-gray-900 text-3xl font-semibold leading-10 self-center grow shrink basis-auto my-auto max-md:max-w-full">
                  {content?.thirdPart?.title}
                </div>
              </div>{" "}
              <div className="p-3 md:hidden w-full">
                <img
                  loading="lazy"
                  src={content?.thirdPart?.imageSrc}
                  alt={content?.thirdPart?.title || "CurateIt AI Bookmark Manager Logo"}
                  className="aspect-[0.92] rounded-xl object-contain object-center w-full overflow-hidden max-md:max-w-full max-md:mt-10"
                />
              </div>
              <div className=" self-stretch bg-slate-50 flex justify-between gap-4 mt-3 md:mt-4  p-3 md:p-5 rounded-xl items-start max-md:max-w-full max-md:flex-wrap">
                <img
                  loading="lazy"
                  src={content?.secondPart?.featureOne?.featureIconSrc}
                  alt={content?.thirdPart?.featureOne?.heading || "CurateIt AI Bookmark Manager Logo"}
                  className="aspect-square object-contain hidden md:flex object-center w-12 justify-center items-center shadow-sm overflow-hidden shrink-0 max-w-full"
                />{" "}
                <div className="items-stretch self-stretch flex grow basis-[0%] flex-col md:pt-2.5 max-md:max-w-full">
                  <div className="text-sky-950 text-xl font-semibold leading-8 max-md:max-w-full">
                    {content?.thirdPart?.featureOne?.heading}
                  </div>{" "}
                  <div className="text-slate-600 text-base leading-6 mt-2 max-md:max-w-full">
                    {content?.thirdPart?.featureOne?.description}
                  </div>
                </div>
              </div>{" "}
              <div className=" self-stretch bg-slate-50 flex justify-between gap-4 mt-3 md:mt-4 p-3 py-4 rounded-xl items-start max-md:max-w-full max-md:flex-wrap">
                <img
                  loading="lazy"
                  src={content?.secondPart?.featureOne?.featureIconSrc}
                  alt={content?.thirdPart?.featureTwo?.heading || "CurateIt AI Bookmark Manager Logo"}
                  className="aspect-square object-contain hidden md:flex object-center w-12 justify-center items-center shadow-sm overflow-hidden shrink-0 max-w-full"
                />{" "}
                <div className="items-stretch self-stretch flex grow basis-[0%] flex-col md:pt-2.5 max-md:max-w-full">
                  <div className="text-sky-950 text-xl font-semibold leading-8 max-md:max-w-full">
                    {content?.thirdPart?.featureTwo?.heading}
                  </div>{" "}
                  <div className="text-slate-600 text-base leading-6 mt-2 max-md:max-w-full">
                    {content?.thirdPart?.featureTwo?.description}
                  </div>
                </div>
              </div>{" "}
              <div className="text-white max-md:w-fit cursor-pointer flex text-base font-semibold leading-6 whitespace-nowrap justify-center items-center border border-[color:var(--primary-500-base,#105FD3)] shadow-sm bg-blue-700 self-center w-[451px] max-w-full mt-3 md:mt-7 px-16 py-3 rounded-[42px] border-solid max-md:px-22">
                <Link href="https://chromewebstore.google.com/detail/curateit-ai-bookmark-mana/hhofkocnlefejficdipgkefgfmnenpbk" className="hover:text-blue-50">
                  Try This Feature -&gt;
                </Link>
              </div>
            </div>
          </div>{" "}
          <div className="hidden md:flex items-center p-3 w-full md:w-[42%]">
            <img
              loading="lazy"
              src={content?.thirdPart?.imageSrc}
              alt={content?.thirdPart?.title || "CurateIt AI Bookmark Manager Logo"}
              className="rounded-xl aspect-[0.92]  w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const FeaturesTab = () => {
  const [activeFeatureTabKey, setActiveFeatureTabKey] = useState("1");
  const generateFeatureTabLabel = (tab, tabType) => (
    <CustomTab
      title={tab.title}
      iconSrc={tab.iconSrc}
      isSelected={activeFeatureTabKey === tab.key}
    />
  );

  const generateFeatureContent = (tab) => {
    return renderFeatureContent({ content: tab.content });
  };

  const featureItems = featuresContent.map((tab) => ({
    label: generateFeatureTabLabel(tab),
    key: tab.key,
    children: generateFeatureContent(tab),
  }));

  return (
    <div className="flex justify-center w-full ">
      <div className="w-full max-w-screen-lg overflow-x-auto">
        <Tabs
          items={featureItems}
          activeKey={activeFeatureTabKey}
          onChange={setActiveFeatureTabKey}
        />
      </div>
    </div>
  );
};

export default FeaturesTab;
