import { PiPaintBrush, PiSuitcaseSimple, PiUsers } from "react-icons/pi";


import { FaChevronRight } from "react-icons/fa6";
import Blob from "../Blob/Blob";

const UserCards = ({ blob, title, cards }) => {
  const renderCards = (card) => {
    const icons = {
      PiPaintBrush: PiPaintBrush,
      PiSuitcaseSimple: PiSuitcaseSimple,
      PiUsers: PiUsers,
    };

    return (
      cards &&
      cards?.length > 0 &&
      cards?.map((card, index) => {
        const IconComponent = icons[card?.icon];

        return (
          <div
            key={`user-card-${index}`}
            className="w-full min-h-[305px] lg:min-h-[472px] h-full lg:h-full lg:p-7 px-2 py-5 rounded-[16px] drop-shadow-md bg-[#F8FBFF] flex flex-col justify-between"
          >
            <div className="flex flex-col items-center lg:items-start ">
              <div className="p-[10px] bg-[#E5F0FF] rounded-full w-max">
                <IconComponent className="text-[24px] lg:text-[32px] text-primary-blue" />
              </div>

              <p className="mt-5 lg:mt-6 text-[28px] lg:text-[40px] lg:min-h-[97px] text-black font-semibold leading-[33.89px] lg:leading-[48.4px] tracking-tight">
                {card?.title}
              </p>

              <p className="mt-5 lg:mt-7 text-center lg:text-left text-[16px] lg:text-[20px] text-[#575C70] font-medium leading-[25.6px] lg:leading-[32px] tracking-tight">
                {card?.subTitle}
              </p>
            </div>

            <div className="flex flex-row justify-center mt-8">
              <button className="outline-none">
                <a
                  href={card?.cta?.href}
                  className="py-3 px-[48px] lg:py-4 lg:px-8 flex flex-row items-center justify-center gap-2 text-[16px] leading-[24px] font-medium tracking-tight text-white bg-[#105FD3] w-max rounded-[8px]"
                >
                  <p className="text-white">{card?.cta?.title}</p>

                  <span className="text-[14px] text-white">
                    <FaChevronRight />
                  </span>
                </a>
              </button>
            </div>
          </div>
        );
      })
    );
  };

  return (
    <div id="tags-manager-user-cards-section" className="w-full pt-7 lg:pt-14">
      <div className="page-layout flex flex-col items-center justify-start">
        <Blob text={blob} />

        <p className="hidden md:block mt-4 text-[40px] text-[#062046] font-semibold leading-[44px] tracking-tight text-center">
          {title}
        </p>

        <p className="block md:hidden mt-4 text-[32px] text-[#062046] font-semibold leading-[40px] tracking-tight text-center">
          {title}
        </p>

        <div className="mt-4 lg:mt-12" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {renderCards()}
        </div>
      </div>
    </div>
  );
};

export default UserCards;
