// import KudoAlternative from "@containers/features/kudo-alternative/KudoAlternative";
import dynamic from "next/dynamic";
const KudoAlternative = dynamic(() => import("@containers/features/kudo-alternative/KudoAlternative"), { ssr: false });

export const metadata = {
  title: "Online Group Greeting Cards for Offices & Occassions from CurateIt",
  description:
    "Find the perfect online group greeting cards for offices and occasions at CurateIt. Browse our collection, customize your message, and send heartfelt greetings to your recipients.",
};

const KudoAlternativePage = () => {
  return <KudoAlternative />;
};
export default KudoAlternativePage;
