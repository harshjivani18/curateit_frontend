import dynamic from "next/dynamic";
const BookmarkManager = dynamic(() => import("@containers/features/bookmark-manager/BookmarkManager"), { ssr: false });
// import BookmarkManager from "@containers/features/bookmark-manager/BookmarkManager";


export const metadata = {
  title: "Free Multimedia Bookmark Manager Extension for Chrome | CurateIt",
  description:
    "Organize all your favorite multimedia content with CurateIt, the free bookmark manager extension for Chrome. Save time and stay organized!",
};

const BookmarkManagerPage = () => {
  return <BookmarkManager />;
};

export default BookmarkManagerPage;
