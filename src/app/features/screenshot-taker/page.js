// import FullPageScreenshotTaker from "@containers/features/screenshot-taker/FullPageScreenshotTaker";
import dynamic from "next/dynamic";
const FullPageScreenshotTaker = dynamic(() => import("@containers/features/screenshot-taker/FullPageScreenshotTaker"), { ssr: false });

export const metadata = {
  title: "Full Page Screen Capture Extension for Google Chrome | CurateIt",
  description:
    "Capture and curate entire web pages with ease using the Full Page Screen Capture Extension for Google Chrome. Explore CurateIt today!",
};

const FullPageScreenshotTakerPage = () => {
  return <FullPageScreenshotTaker />;
};
export default FullPageScreenshotTakerPage;
