import WebClipper from "@containers/features/web-clipper/WebClipper"
// import dynamic from "next/dynamic";
// const WebClipper = dynamic(() => import("@containers/features/web-clipper/WebClipper"), { ssr: false });

export const metadata = {
  title: "Free Web Clipper Browser Extension for Chrome | CurateIt",
  description:
    "Simplify content curation on Chrome with CurateIt, the ultimate web clipper browser extension. Save, organize, and share your favorite web pages effortlessly.",
};

const WebClipperPage = () => {

    return (
        <WebClipper />
    )

}

export default WebClipperPage