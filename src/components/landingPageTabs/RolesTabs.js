import CustomTab from "./CustomTab";
import { rolesContent } from "@containers/landing-page/pageData";
import { Tabs } from "antd";
import Link from "next/link";
import { useRef, useState } from "react";

const renderRoleContent = ({ content }) => {

  return (
    <div className="justify-center transition-all mx-auto duration-100 ease-in w-full max-w-[1116px] mt-3 md:mt-10 max-md:max-w-full">
      <div className="gap-5 flex flex-col lg:flex-row max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch w-auto lg:w-[54%] max-md:w-full max-md:ml-0">
          <img
            loading="lazy"
            src={content?.imageSrc}
            alt={content?.featureOne?.heading || "CurateIt AI Bookmark Manager Logo"}
            className="aspect-[1.5] object-contain object-center w-full overflow-hidden my-auto max-md:max-w-full "
          />
        </div>
        <div className="flex flex-col items-stretch w-auto lg:w-[46%] ml-5 max-md:w-full max-md:ml-0">
          <div className="items-stretch flex grow flex-col max-md:max-w-full max-md:mt-10">
            <div className=" bg-slate-50 flex justify-between gap-4 p-3 md:p-5 rounded-xl items-start max-md:max-w-full max-md:flex-wrap">
              <img
                loading="lazy"
                alt="roles"
                src={content?.featureOne?.featureIconSrc}
                className="aspect-square hidden md:flex object-contain object-center w-12 justify-center items-center shadow-sm overflow-hidden shrink-0 max-w-full"
              />
              <div className="items-stretch self-stretch flex grow basis-[0%] flex-col pt-2.5">
                <div className="text-sky-950 text-xl font-semibold leading-8">
                  {content?.featureOne?.heading}
                </div>
                <div className="text-slate-600 text-base leading-6 mt-2">
                  {content?.featureOne?.description}
                </div>
              </div>
            </div>
            <div className=" bg-slate-50 flex justify-between gap-4 mt-3 md:mt-6  p-3 md:p-5 rounded-xl items-start max-md:max-w-full max-md:flex-wrap">
              <img
                loading="lazy"
                src={content?.featureTwo?.featureIconSrc}
                alt={content?.featureTwo?.heading || "CurateIt AI Bookmark Manager Logo"}
                className="aspect-square hidden md:flex object-contain object-center w-12 justify-center items-center shadow-sm overflow-hidden shrink-0 max-w-full"
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
            <div className="bg-slate-50 flex justify-between gap-4 mt-3 md:mt-6 p-3 md:p-5rounded-xl items-start max-md:max-w-full max-md:flex-wrap">
              <img
                loading="lazy"
                src={content?.featureThree?.featureIconSrc}
                alt={content?.featureThree?.heading || "CurateIt AI Bookmark Manager Logo"}
                className="aspect-square hidden md:flex object-contain object-center w-12 justify-center items-center shadow-sm overflow-hidden shrink-0 max-w-full"
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
      </div>
      <div className="text-white w-fit flex mx-auto text-lg font-semibold leading-7 whitespace-nowrap justify-center items-stretch border border-[color:var(--primary-500-base,#105FD3)] shadow-sm bg-blue-700 mt-3 md:mt-10 mb-12 px-6 py-4 rounded-lg border-solid max-md:mb-10 max-md:px-5">
        <Link href="/sign-up" className="hover:text-blue-50">
          Join 2000+ Users -&gt;
        </Link>
      </div>

    </div>
  );
};

const RolesTabs = () => {
  const [activeRoleTabKey, setActiveRoleTabKey] = useState("1");
  const tabsRef = useRef(null);

  const generateRoleTabLabel = (tab, tabType) => (
    <CustomTab
      title={tab.title}
      iconSrc={tab.iconSrc}
      isSelected={activeRoleTabKey === tab.key}
    />
  );
  const generateRoleContent = (tab) => {
    return renderRoleContent({ content: tab.content });
  };

  const rolesItems = rolesContent.map((tab) => ({
    label: generateRoleTabLabel(tab),
    key: tab.key,
    children: generateRoleContent(tab),
  }));


  return (
    <>
      <div className="flex justify-center w-full ">
        <div className="w-full max-w-screen-lg overflow-x-auto">
          <Tabs
            ref={tabsRef}
            items={rolesItems}
            activeKey={activeRoleTabKey}
            onChange={setActiveRoleTabKey}
          />
        </div>
      </div>
    </>
  );
};

export default RolesTabs;