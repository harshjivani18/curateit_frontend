// import PinterestAlternative from "@containers/features/pinterest-alternative/PinterestAlternative";
import dynamic from "next/dynamic";
const PinterestAlternative = dynamic(() => import("@containers/features/pinterest-alternative/PinterestAlternative"), { ssr: false });

export const metadata = {
  title: "Create aesthetic moodboards with this Pinterest alternative",
  description:
    "Check out this curated pick of Pinterest alternatives to see how you can transform your creative collections!",
};

const PinterestAlternativePage = () => {
  return <PinterestAlternative />;
};
export default PinterestAlternativePage;
