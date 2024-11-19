// import Wakelet from "@containers/features/wakelet/Wakelet";
import dynamic from "next/dynamic";
const Wakelet = dynamic(() => import("@containers/features/wakelet/Wakelet"), { ssr: false });

export const metadata = {
  title: "Best Wakelet Alternative for Students | Curateit",
  description:
    "Looking for a Wakelet alternative for students? Curateit is the perfect solution. Easily curate and share content for your academic needs.",
};

const WakeletPage = () => {
  return <Wakelet />;
};
export default WakeletPage;
