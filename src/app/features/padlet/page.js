// import Padlet from "@containers/features/padlet/Padlet";
import dynamic from "next/dynamic";
const Padlet = dynamic(() => import("@containers/features/padlet/Padlet"), { ssr: false });

export const metadata = {
  title: "Best Free Discussion Board & Tool for Students | CurateIt",
  description:
    "Enhance your student experience with CurateIt, the top-rated free discussion board and tool. Engage in insightful discussions, collaborate with classmates, and excel academically.",
};

const PadletPage = () => {
  return <Padlet />;
};
export default PadletPage;
