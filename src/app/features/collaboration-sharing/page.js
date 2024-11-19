import dynamic from "next/dynamic";
const CollaborationAndSharing = dynamic(() => import("@containers/features/collaboration-sharing/CollaborationAndSharing"), { ssr: false });
// import CollaborationAndSharing from "@containers/features/collaboration-sharing/CollaborationAndSharing";


export const metadata = {
  title: "Easy Share & Collab with the Community on CurateIt",
  description:
    "Explore CurateIt's collaboration tools designed to help you share curated content and gems publicly or privately. Learn how our platform enhances your ability to collaborate, organise and distribute valuable information effortlessly.",
};

const CollaborationAndSharingPage = () => {
  return <CollaborationAndSharing />;
};
export default CollaborationAndSharingPage;
