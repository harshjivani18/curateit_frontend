import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";


const HeaderTitle = ({ handleClose, showRightIcon = true, title,showLeftIcon=true }) => {
  return (
    <div
      className={`flex items-center w-full justify-between mb-4`}
    >
      <div className="flex items-center gap-2">
          {showLeftIcon && <ArrowLeftIcon
            className="h-4 w-4 cursor-pointer text-[#4B4F5D]"
            onClick={handleClose}
          />}
        <div className="text-base text-[#062046] font-bold">{title}</div>
      </div>
      {showRightIcon && <XMarkIcon
        className="h-5 w-5 cursor-pointer text-[#97A0B5]"
        onClick={handleClose}
      />}
    </div>
  );
};

export default HeaderTitle;