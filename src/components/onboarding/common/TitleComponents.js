const TitleComponent = ({
  title,
  subTitle,
  isFromImage = false
}) => {
  return (
    <div className={`inline-flex items-start flex-col gap-3 pt-4`}>
      <p
        className={`text-[#292B38] font-bold ${
          isFromImage ? "text-2xl" : "text-2xl md:text-3xl"
        }`}
      >
        {title}
      </p>
      <p className={`text-[#4B4F5D] text-sm md:text-base`}>{subTitle}</p>
    </div>
  );
};

export default TitleComponent;