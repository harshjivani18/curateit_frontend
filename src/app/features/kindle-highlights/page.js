// import KindleHighlights from "@containers/features/kindle-highlights/KindleHighlights";
import dynamic from "next/dynamic";
const KindleHighlights = dynamic(() => import("@containers/features/kindle-highlights/KindleHighlights"), { ssr: false });

export const metadata = {
  title: "Free Kindle Highlighter & Exporter Extension for Chrome | CurateIt",
  description:
    "Take your Kindle reading to the next level with our CurateIt. Easily highlight and export your Kindle notes for easy reference. Get it for free!",
};

const KindleHighlightsPage = () => {
  return <KindleHighlights />;
};
export default KindleHighlightsPage;
