// import ReaderMode from "@containers/features/reader-mode/ReaderMode";
import dynamic from "next/dynamic";
const ReaderMode = dynamic(() => import("@containers/features/reader-mode/ReaderMode"), { ssr: false });

export const metadata = {
  title: "Free Reader Mode Extension for Google Chrome | CurateIt",
  description:
    "Discover the ultimate reader mode extension for Google Chrome. CurateIt offers a seamless reading experience, allowing you to curate and personalize web content.",
};

const ReaderModePage = () => {
  return <ReaderMode />;
};
export default ReaderModePage;
