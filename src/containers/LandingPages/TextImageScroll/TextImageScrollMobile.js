import dynamic from "next/dynamic";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";
import Blob from "../Blob/Blob";

const LottieAnimation = dynamic(() => import("@utils/LottieAnimation"), {
  ssr: false,
});

const TextImageScrollMobile = ({ title, sections }) => {
  const renderBlocks = () => {
    return (
      sections &&
      sections?.length > 0 &&
      sections?.map((section, index) => {
        return (
          <div className="w-full flex flex-col" key={`text-image-m-${index}`}>
            {section?.assetType === "image" ? (
              <Image
                src={section?.asset?.source}
                alt={section?.asset?.altText}
                className="w-full rounded-[8px] drop-shadow-md border-[0.4px] border-[#ABB7C9]"
                width={1000}
                height={1000}
                loading="lazy"
                style={{ maxWidth: "100%" }}
              />
            ) : (
              <LottieAnimation url={section?.asset?.source} />
            )}

            <p className="mt-4 text-[20px] text-[#062046] font-semibold leading-[32px] tracking-tight">
              {section?.title}
            </p>

            <p className="mt-1 text-[16px] text-[#575C70] leading-[24px] tracking-tight">
              {section?.subtitle}
            </p>

            <a
              href={section?.cta?.href}
              className="mt-4 mx-auto py-3 px-[47.5px] rounded-[61px] bg-[#105FD3] flex flex-row items-center justify-center gap-[6px]"
            >
              <p className="text-white text-[16px] font-semibold leading-[24px]">
                {section?.cta?.title}
              </p>

              <FaChevronRight className="text-[12px] text-white" />
            </a>
          </div>
        );
      })
    );
  };

  return (
    <div className="text-image-scroll-mobile w-full py-7">
      <div className="page-layout">
        <div className="w-full flex flex-col items-center gap-4 mb-10">
          <Blob text={"Features"} />

          <p className="text-[32px] text-[#101828] font-bold leading-[40px] text-center tracking-tight">
            {title}
          </p>
        </div>

        <div className="w-full flex flex-col gap-10">{renderBlocks()}</div>
      </div>
    </div>
  );
};

export default TextImageScrollMobile;
