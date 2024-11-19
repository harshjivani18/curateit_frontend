// import SpeedReading from "@containers/features/speed-reading/SpeedReading";
import dynamic from "next/dynamic";
const SpeedReading = dynamic(() => import("@containers/features/speed-reading/SpeedReading"), { ssr: false });

export const metadata = {
  title: "Speed Reading Software & Extension for Google Chrome | CurateIt",
  description:
    "Take your reading skills to the next level with CurateIt's speed reading software. Boost your productivity and save time with this innovative Google Chrome extension.",
};

const SpeedReadingPage = () => {
  return <SpeedReading />;
};
export default SpeedReadingPage;
