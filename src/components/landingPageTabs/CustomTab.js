const CustomTab = ({ title, iconSrc, isSelected }) => {
    return (
      <div
        className={`flex justify-center  select-none transition-colors duration-200 ease-in-out gap-2 items-stretch border border-[color:var(--primary-100,#E5F0FF)] ${
          isSelected ? "bg-blue-700" : "bg-slate-50"
        }  px-4 py-4 rounded-lg border-solid`}
      >
        <div className={`${isSelected?"text-white":"text-blue-500"}`}>
            {iconSrc}
        </div>
        <div
          className={`${
            isSelected ? "text-white" : "text-gray-500"
          } text-lg transition-colors duration-200 ease-in-out font-medium leading-6 grow whitespace-nowrap`}
        >
          {title}
        </div>
      </div>
    );
  };

  export default CustomTab;