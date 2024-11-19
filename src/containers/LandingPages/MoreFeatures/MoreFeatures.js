import { FaChevronRight } from "react-icons/fa";

import Blob from "../Blob/Blob";
import {
  PiAperture,
  PiArticle,
  PiBookOpen,
  PiBookmarkSimple,
  PiBrowsers,
  PiChartLine,
  PiCloudArrowDown,
  PiCloudArrowUp,
  PiCode,
  PiFilePdf,
  PiFolderLock,
  PiFolderNotchOpen,
  PiGauge,
  PiImageSquare,
  PiInfo,
  PiInstagramLogo,
  PiLink,
  PiMagnifyingGlass,
  PiMicrophone,
  PiMonitor,
  PiMoon,
  PiPalette,
  PiRecordFill,
  PiRobot,
  PiScan,
  PiSelectionPlus,
  PiSpeakerHigh,
  PiSquaresFour,
  PiTag,
  PiTextAlignCenter,
  PiUserCirclePlus,
  PiUserFocus,
  PiYoutubeLogo,
} from "react-icons/pi";
import { HiOutlineDuplicate } from "react-icons/hi";
import { FaXTwitter } from "react-icons/fa6";
import { RiDoubleQuotesL } from "react-icons/ri";
import Highlighter from "../../../icons/Highlighter";
import TextExpander from "../../../icons/TextExpander";
import UserSound from "../../../icons/UserSound";

const MoreFeatures = ({ blob, title, blocks, cta }) => {
  const images = {
    PiBookmarkSimple: PiBookmarkSimple,
    PiAperture: PiAperture,
    PiMonitor: PiMonitor,
    PiCloudArrowDown: PiCloudArrowDown,
    PiFolderNotchOpen: PiFolderNotchOpen,
    HiOutlineDuplicate: HiOutlineDuplicate,
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
    FaXTwitter: FaXTwitter,
    PiTag: PiTag,
    PiUserFocus: PiUserFocus,
    PiChartLine: PiChartLine,
    PiLink: PiLink,
    PiMagnifyingGlass: PiMagnifyingGlass,
    PiSquaresFour: PiSquaresFour,
    RiDoubleQuotesL: RiDoubleQuotesL,
    PiImageSquare: PiImageSquare,
    PiCloudArrowUp: PiCloudArrowUp,
    PiMicrophone: PiMicrophone,
    Highlighter: Highlighter,
    TextExpander: TextExpander,
    UserSound: UserSound,
    PiRecordFill: PiRecordFill,
  };

  const Blocks = () => {
    return (
      blocks &&
      blocks?.length > 0 &&
      blocks?.map(({ asset, title, href }, index) => {
        const ImageComponent = images[asset];

        return (
          <div key={`feature-block-${index}`}>
            <a
              className="w-full h-full bg-[#F3F8FF] rounded-[8px] flex flex-col items-center justify-center p-6 gap-3 border-[1px]  border-[#F3F8FF] hover:border-[#B8D4FE] hover:shadow-lg hover:shadow-[#105FD333]"
              href={href || "#"}
            >
              <ImageComponent className={`text-[28px] text-[#105FD3]`} />

              <p className="text-[14px] md:text-[16px] text-[#292B38] font-medium  lg:leading-[25.6px] text-center">
                {title}
              </p>
            </a>
          </div>
        );
      })
    );
  };

  return (
    <div className="page-layout py-5 lg:py-12">
      <div className="w-full flex flex-col items-center justify-start gap-8 md:gap-16">
        <div className="flex flex-col items-center justify-center">
          <Blob text={blob} />

          <p className="mt-3 text-center text-[24px] md:text-[32px] text-[#062046] font-semibold leading-[32px] md:leading-[44px]">
            {title}
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Blocks />
        </div>

        <div className="w-full flex flex-row items-center justify-center">
          <a
            className="py-3 px-8 lg:py-4 rounded-[8px] bg-[#105FD3] flex flex-row items-center justify-center gap-2"
            href={cta?.href}
          >
            <p className="text-[16px] text-[#FFFFFF] font-semibold leading-[24px]">
              {cta?.title}
            </p>

            <p>
              <FaChevronRight className="text-[14px] text-[#FFFFFF] " />
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MoreFeatures;
