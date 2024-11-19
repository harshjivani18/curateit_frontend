// import ListenToArticles from "@containers/features/listen-to-articles/ListenToArticles";
import dynamic from "next/dynamic";
const ListenToArticles = dynamic(() => import("@containers/features/listen-to-articles/ListenToArticles"), { ssr: false });

export const metadata = {
  title: "Best Text to Speech & Listen to Articles Chrome Extension | CurateIt",
  description:
    "Transform text into speech with the top Chrome Extension for listening to articles. Enjoy a seamless reading experience like never before.",
};

const ListenToArticlesPage = () => {
  return <ListenToArticles />;
};
export default ListenToArticlesPage;
