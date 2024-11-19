// import ImageEditor from "@containers/features/image-editor/ImageEditor";
import dynamic from "next/dynamic";
const ImageEditor = dynamic(() => import("@containers/features/image-editor/ImageEditor"), { ssr: false });

export const metadata = {
  title: "Best Online Image Editor Chrome Extension | CurateIt",
  description:
    "Edit and enhance your images effortlessly with the best online image editor Chrome extension, CurateIt. Transform your photos with ease and creativity.",
};

const ImageEditorPage = () => {
  return <ImageEditor />;
}; 
export default ImageEditorPage;
