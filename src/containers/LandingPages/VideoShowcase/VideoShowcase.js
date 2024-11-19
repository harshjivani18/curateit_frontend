import Blob from "../Blob/Blob";

import { FaChevronRight } from "react-icons/fa6";
import "../../../components/landing-pages.css";

const VideoShowcase = ({ blob, title, subtitle, embed, cta }) => {
  return (
    <div id="video-showcase" className="w-full py-7 lg:pt-14 lg:pb-0">
      <div className="page-layout flex flex-col items-center justify-start">
        <Blob text={blob} />

        <p className="hidden md:block mt-4 text-[40px] text-[#062046] font-semibold leading-[44px] tracking-tight text-center">
          {title}
        </p>

        <p className="block md:hidden mt-4 text-[32px] text-[#062046] font-semibold leading-[40px] tracking-tight text-center">
          {title}
        </p>

        <p className="mt-5 text-[16px]  md:max-w-[65%] md:text-[20px] text-[#575C70] md:leading-[30px] text-center tracking-tight">
          {subtitle}
        </p>

        <div className="mt-4 md:mt-8">
          <iframe
            id="landing-page-iframe"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${embed}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen={true}
            className="rounded-[16px]"
            loading="lazy"
          />
        </div>

        <a
          href={cta?.href}
          className="px-8 py-3 mt-4 md:py-4 md:mt-10 rounded-[8px] flex flex-row items-center justify-center gap-1 text-white text-[16px] font-semibold bg-[#105FD3]"
        >
          <p>{cta?.title}</p>
          <FaChevronRight className="text-[14px]" />
        </a>
      </div>
    </div>
  );
};

export default VideoShowcase;
