// import ImageTextExtractor from "@containers/features/image-text-extractor/ImageTextExtractor";
import dynamic from "next/dynamic";
const ImageTextExtractor = dynamic(() => import("@containers/features/image-text-extractor/ImageTextExtractor"), { ssr: false });

export const metadata = {
  title: "Online Image Text Extractor Extension for Google Chrome | CurateIt",
  description:
    "Maximize your productivity with our Online Image Text Extractor Extension for Google Chrome. Extract text from images effortlessly and save valuable time.",
};

const ImageTextExtractorPage = () => {
  return <ImageTextExtractor />;
};

export default ImageTextExtractorPage;
