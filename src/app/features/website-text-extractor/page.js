// import WebsiteTextExtractor from "@containers/features/website-text-extractor/WebsiteTextExtractor";
import dynamic from "next/dynamic";
const WebsiteTextExtractor = dynamic(() => import("@containers/features/website-text-extractor/WebsiteTextExtractor"), { ssr: false });

export const metadata = {
  title: "Website Text Extractor Software & Extension for Chrome | CurateIt",
  description:
    "Extract and curate website text effortlessly with our powerful Website Text Extractor Software & Extension for Chrome. Enhance your content curation process today!",
};

const WebsiteTextExtractorPage = () => {
  return <WebsiteTextExtractor />;
};
export default WebsiteTextExtractorPage;
