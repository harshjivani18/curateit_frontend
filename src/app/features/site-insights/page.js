// import SiteInsights from "@containers/features/site-insights/SiteInsights";
import dynamic from "next/dynamic";
const SiteInsights = dynamic(() => import("@containers/features/site-insights/SiteInsights"), { ssr: false });

export const metadata = {
  title: "Best Online Image Editor Chrome Extension | CurateIt",
  description:
    "Edit and enhance your images effortlessly with the best online image editor Chrome extension, CurateIt. Transform your photos with ease and creativity.",
};

const SiteInsightsPage = () => {
  return <SiteInsights />;
};
export default SiteInsightsPage;
