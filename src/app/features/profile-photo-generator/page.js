// import ProfilePhotoGenerator from "@containers/features/profile-photo-generator/ProfilePhotoGenerator";
import dynamic from "next/dynamic";
const ProfilePhotoGenerator = dynamic(() => import("@containers/features/profile-photo-generator/ProfilePhotoGenerator"), { ssr: false });

export const metadata = {
  title: "AI Profile Photo Generator, Maker for your Perfect PFP | CurateIt",
  description:
    "Get a stunning AI profile photo in seconds! Our online generator is easy to use. Plus, don't forget to install our Chrome extension for added convenience.",
};

const ProfilePhotoGeneratorPage = () => {
  return <ProfilePhotoGenerator />;
};
export default ProfilePhotoGeneratorPage;
