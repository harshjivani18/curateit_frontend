import { PiArrowRight } from "react-icons/pi";

const HeroInfoBlob = () => {
  return (
    <div className="hero-info-blob py-1 pl-1 pr-[10px] rounded bg-[#F8FBFF] rounded-full flex flex-row items-center justify-between gap-3 cursor-pointer">
      <div className="p-[2px] px-[10px] bg-[#E5F0FF] border-[1px] border-[#B8D4FE] rounded-full">
        <a
          href="https://web.curateit.com/whats-new"
          target="_blank"
          className="outline-none text-xs md:text-sm text-primary-blue font-medium text-center m-0"
        >
          What&apos;s new!
        </a>
      </div>

      <div className="flex flex-row items-center jusitfy-between gap-1">
        <p className="text-xs md:text-sm text-primary-blue font-medium text-center m-0">
          Check out the latest release
        </p>

        <p className="text-[16px] text-[#5690E7] m-0">
          <PiArrowRight />
        </p>
      </div>
    </div>
  );
};

export default HeroInfoBlob;
