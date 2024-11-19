// import UniversalDarkMode from "@containers/features/universal-dark-mode/UniversalDarkMode";
import dynamic from "next/dynamic";
const UniversalDarkMode = dynamic(() => import("@containers/features/universal-dark-mode/UniversalDarkMode"), { ssr: false });

export const metadata = {
  title: "Best Google Chrome Extension for Universal Dark Mode | CurateIt",
  description:
    "CurateIt offers the top-rated Google Chrome Extension for Universal Dark Mode. Say goodbye to eye strain and enjoy a visually appealing browsing experience. Try it today!",
};

const UniversalDarkModePage = () => {
  return <UniversalDarkMode />;
};
export default UniversalDarkModePage;
