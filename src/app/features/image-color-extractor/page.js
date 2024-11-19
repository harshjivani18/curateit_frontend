import dynamic from "next/dynamic";
const ImageColorExtractor = dynamic(() => import("@containers/features/image-color-extractor/ImageColorExtractor"), { ssr: false });
// import ImageColorExtractor from "@containers/features/image-color-extractor/ImageColorExtractor";


export const metadata = {
  title: "Image Colour Extractor & Colour Picker Chrome Extension | CurateIt",
  description:
    "Get the perfect color palette for your design projects with this handy Chrome extension. The Image Colour Extractor & Colour Picker lets you easily extract colors from any image on the web.",
};

const ImageColorExtractorPage = () => {
  return <ImageColorExtractor />;
};

export default ImageColorExtractorPage;
