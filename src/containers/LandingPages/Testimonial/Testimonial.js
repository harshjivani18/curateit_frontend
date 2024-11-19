import Image from "next/image";
import { PiStarFill } from "react-icons/pi";

const Testimonial = ({ profile, name, profession, testimonial }) => {
  return (
    <div
      id="testimonial-section"
      className="w-full bg-gradient-to-r from-[#4683FF] to-[#329AF1]"
    >
      <div className="page-layout py-7 px-[10px] lg:px-0 lg:py-24 flex lg:flex-row flex-col items-start justify-between gap-3 lg:gap-0">
        <div
          id="profile-icon-section"
          className="lg:w-[10%] flex flex-row lg:flex-col items-center justify-center gap-3 lg:gap-5"
        >
          <Image
            src={profile?.source}
            alt={profile?.altText}
            className="w-[41px] h-[41px] md:w-[55px] md:h-[55px] lg:w-full lg:h-full rounded-full"
            width={1000}
            height={1000}
            loading="lazy"
          />

          <div className="bg-white rounded-full lg:rounded-lg flex flex-row items-center justify-center gap-1 py-1 px-2 lg:py-2 lg:px-4">
            <PiStarFill className="text-[#FFE527] text-[13px] lg:text-[20px]" />
            <PiStarFill className="text-[#FFE527] text-[13px] lg:text-[20px]" />
            <PiStarFill className="text-[#FFE527] text-[13px] lg:text-[20px]" />
            <PiStarFill className="text-[#FFE527] text-[13px] lg:text-[20px]" />
            <PiStarFill className="text-[#FFE527] text-[13px] lg:text-[20px]" />
          </div>
        </div>
        <div
          id="testimonial-section"
          className="w-full lg:w-[85%] py-[15px] px-7 lg:py-8 lg:px-14 bg-white rounded-b-[20px] lg:rounded-b-[32px] rounded-tr-[20px] lg:rounded-tr-[32px]"
        >
          <p className="text-[16px] lg:text-[32px] text-[#000000] font-semibold leading-[19.36px] lg:leading-[38.73px]">
            {name}
          </p>
          <p className="text-[12px] lg:text-[20px] text-[#4D4D4D] leading-[14.52px] lg:leading-[24.2px] mt-1 lg:mt-3">
            {profession}
          </p>
          <p className="text-[10px] lg:text-[18px] leading-[12.1px] lg:leading-[28px] mt-2 lg:mt-4">
            {testimonial}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
