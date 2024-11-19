import { CheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const CardSelection = ({ title, value ,setValue,items=[],type='',onChange=() => {}}) => {
  const [mobileScreen, setMobileScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        if (window.innerWidth <= 600) {
          setMobileScreen(true);
        } else {
          setMobileScreen(false);
        }
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleItemClick = (itemName) => {
    setValue((prev) => {
      if (itemName === "None of the above") {
        return ["None of the above"];
      } else {
        const filteredPrev = prev.filter(
          (data) => data !== "None of the above"
        );

        if (filteredPrev.some((data) => data === itemName)) {
          return filteredPrev.filter((data) => data !== itemName);
        } else {
          return [...filteredPrev, itemName];
        }
      }
    });
  };

  return (
    <div className="">
      {title && <p className={`text-[#292B38] font-medium mb-4 text-[22px]`}>{title}</p>}

      {type === "array" && (
        <div
          className={`${
            mobileScreen
              ? "div-selection-card-list-mobile"
              : "div-selection-card-list"
          } `}
        >
          {items?.map((item) => {
            return (
              <div
                className={`relative h-[100px] cursor-pointer flex flex-col py-3 px-4 bg-white rounded-xl border-[0.4px] border-solid  items-center justify-center card-selection-shadow ${
                  value?.some((data) => data === item.name)
                    ? "border-[#347AE2] text-[#347AE2]"
                    : "border-[#ABB7C9] text-[#4B4F5D]"
                }`}
                onClick={() => handleItemClick(item.name)}
                key={item.name}
              >
                {item.icon}
                <span
                  className={`text-center text-base block mt-1 ${
                    value?.some((data) => data === item.name)
                      ? "text-[#347AE2]"
                      : "text-[#4B4F5D]"
                  }`}
                >
                  {item.name}
                </span>
                {value?.some((data) => data === item.name) && (
                  <div className="p-1 bg-[#347AE2] rounded-full absolute top-[5px] right-[5px]">
                    <CheckIcon className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!type && (
        <div
          className={`${
            mobileScreen
              ? "div-selection-card-list-mobile"
              : "div-selection-card-list"
          } `}
        >
          {items?.map((item) => {
            return (
              <div
                className={`relative h-[100px] cursor-pointer flex flex-col py-3 px-4 bg-white rounded-xl border-[0.4px] border-solid  items-center justify-center card-selection-shadow ${
                  value === item.name
                    ? "border-[#347AE2] text-[#347AE2]"
                    : "border-[#ABB7C9] text-[#4B4F5D]"
                }`}
                // onClick={() =>
                //   setValue((prev) => (prev === item.name ? "" : item.name))
                // }
                onClick={() => onChange(item.name)}
                key={item.name}
              >
                {item.icon}
                <span
                  className={`text-center text-base block mt-1 ${
                    value === item.name ? "text-[#347AE2]" : "text-[#4B4F5D]"
                  }`}
                >
                  {item.name}
                </span>
                {value === item.name && (
                  <div className="p-1 bg-[#347AE2] rounded-full absolute top-[5px] right-[5px]">
                    <CheckIcon className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CardSelection;