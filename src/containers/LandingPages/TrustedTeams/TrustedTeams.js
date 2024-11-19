import Image from "next/image";
import Marquee from "react-fast-marquee";

const TrustedTeams = ({ title, asset }) => {
  return (
    <div className="w-full">
      <div className="py-24 lg:py-28 flex flex-col items-center">
        <p className="text-[24px] lg:text-[32px] text-[#105FD3] font-medium leading-[19.36px] lg:leading-[24.2px]">
          {title}
        </p>

        <div className="page-layout hidden lg:block mt-16 ">
          <Image
            src={asset?.source}
            alt={asset?.altText}
            width={5000}
            height={1000}
            quality={100}
            loading="lazy"
            style={{
              maxWidth: "100%",
            }}
          />
        </div>

        <div className="block lg:hidden mt-8">
          <Marquee play={true}>
            <Image
              src={asset?.source}
              alt={asset?.altText}
              className="mr-5"
              width={1000}
              height={1000}
              loading="lazy"
              style={{
                maxWidth: "100%",
              }}
            />
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default TrustedTeams;
