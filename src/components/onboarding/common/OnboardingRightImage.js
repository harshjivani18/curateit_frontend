import Image from "next/image";
import TitleComponent from "./TitleComponents";
import ImageCarousel from "@components/common/ImageCarousel";

const OnboardingRightImage = ({
  imgSrc = "",
  alt,
  cls,
  title,
  subTitle,
  titleCls = "",
  divCls = "",
  isRedirect = false,
  isCarousel = false,
  imagesArr=[]
}) => {
  const handleOpenExtension = () => {
    if (isRedirect) {
      window.open(
        "https://chromewebstore.google.com/detail/curateit-ai-bookmark-mana/hhofkocnlefejficdipgkefgfmnenpbk",
        "_blank"
      );
    }
    return false;
  };
  return (
    <div
      className={`relative hidden md:block bg-[#E5F0FF] md:col-span-2 inline-flex flex-col items-start ${
        title && "pt-12"
      } ${divCls || ""}`}
    >
      {title && (
        <div className={`${titleCls ? titleCls : ""}`}>
          <TitleComponent
            title={title}
            subTitle={subTitle}
            isFromImage={true}
          />
        </div>
      )}

      {imgSrc && !isCarousel && (
        <Image
          src={imgSrc}
          alt={alt}
          className={cls ? cls : ""}
          priority={true}
          width={585}
          height={550}
          style={{
            width: "100%",
          }}
          onClick={handleOpenExtension}
        />
      )}

      {isCarousel && <ImageCarousel images={imagesArr} />}
    </div>
  );
};

export default OnboardingRightImage;