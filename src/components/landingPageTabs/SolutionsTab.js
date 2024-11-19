import { Tabs } from "antd";
import { solutionsContent } from "@containers/landing-page/pageData";
import CustomTab from "./CustomTab";
import { useState } from "react";

const renderSolutionsContent = ({ content }) => {
  return (
    <div className="justify-center w-full mx-auto max-w-[1116px] mt-10 ">
      <div className="gap-5 flex flex-col lg:flex-row max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col order-2 lg:order-1 items-stretch lg:w-[46%] max-md:w-full max-md:ml-0">
          <div className="items-stretch flex grow flex-col max-md:max-w-full max-md:mt-10">
            <div className=" bg-slate-50 flex justify-between gap-4 p-5 rounded-xl items-start max-md:max-w-full max-md:flex-wrap">
              <img
                loading="lazy"
                src={content?.featureOne?.featureIconSrc}
                alt={content?.featureOne?.heading || "CurateIt AI Bookmark Manager Logo"}
                className="aspect-square object-contain object-center w-12 justify-center items-center shadow-sm overflow-hidden shrink-0 max-w-full"
              />{" "}
              <div className="items-stretch self-stretch flex grow basis-[0%] flex-col pt-2.5">
                <div className="text-sky-950 text-xl font-semibold leading-8">
                  {content?.featureOne?.heading}
                </div>{" "}
                <div className="text-slate-600 text-base leading-6 mt-2">
                  {content?.featureOne?.description}
                </div>
              </div>
            </div>
            <div className=" bg-slate-50 flex justify-between gap-4 mt-7 p-5 rounded-xl items-start max-md:max-w-full max-md:flex-wrap">
              <img
                loading="lazy"
                src={content?.featureTwo?.featureIconSrc}
                alt={content?.featureTwo?.heading || "CurateIt AI Bookmark Manager Logo"}
                className="aspect-square object-contain object-center w-12 justify-center items-center shadow-sm overflow-hidden shrink-0 max-w-full"
              />
              <div className="items-stretch self-stretch flex grow basis-[0%] flex-col pt-2.5">
                <div className="text-sky-950 text-xl font-semibold leading-8">
                  {content?.featureTwo?.heading}
                </div>
                <div className="text-slate-600 text-base leading-6 mt-2">
                  {content?.featureTwo?.description}
                </div>
              </div>
            </div>
            <div className="bg-slate-50 flex justify-between gap-4 mt-7 p-5 rounded-xl items-start max-md:max-w-full max-md:flex-wrap">
              <img
                loading="lazy"
                alt={content?.featureThree?.heading || "CurateIt AI Bookmark Manager Logo"}
                src={content?.featureThree?.featureIconSrc}
                className="aspect-square object-contain object-center w-12 justify-center items-center shadow-sm overflow-hidden shrink-0 max-w-full"
              />
              <div className="items-stretch self-stretch flex grow basis-[0%] flex-col pt-2.5">
                <div className="text-sky-950 text-xl font-semibold leading-8">
                  {content?.featureThree?.heading}
                </div>
                <div className="text-slate-600 text-base leading-6 mt-2">
                  {content?.featureThree?.description}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col order-1 lg:order-2 items-stretch lg:w-[54%] ml-5 max-md:w-full max-md:ml-0">
          <img
            loading="lazy"
            alt="solutions"
            src={content?.imageSrc}
            className="aspect-[1.5] object-contain object-center w-full overflow-hidden my-auto max-md:max-w-full max-md:mt-10"
          />
        </div>
      </div>
    </div>
  );
};

const SolutionsTab = () => {
  const [activeSolutionTabKey, setActiveSolutionTabKey] = useState("1");
  const generateSolutionTabLabel = (tab, tabType) => (
    <CustomTab
      title={tab.title}
      iconSrc={tab.iconSrc}
      isSelected={activeSolutionTabKey === tab.key}
    />
  );

  const generateSolutionsContent = (tab) => {
    return renderSolutionsContent({ content: tab.content });
  };

  const solutionItems = solutionsContent.map((tab) => ({
    label: generateSolutionTabLabel(tab),
    key: tab.key,
    children: generateSolutionsContent(tab),
  }));

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="w-full max-w-screen-lg overflow-x-auto">
          <Tabs
            items={solutionItems}
            activeKey={activeSolutionTabKey}
            onChange={setActiveSolutionTabKey}
          />
        </div>
      </div>
    </>
  );
};

export default SolutionsTab;
