// import YoutubeSummariser from "@containers/features/youtube-summariser/YoutubeSummariser";
import dynamic from "next/dynamic";
const YoutubeSummariser = dynamic(() => import("@containers/features/youtube-summariser/YoutubeSummariser"), { ssr: false });

export const metadata = {
  title: "Make Instant Summary from Youtube Videos | Curateit",
  description:
    "Curateit offers a fast and easy way to summarize YouTube videos instantly. Get the key points without watching the entire video.",
};

const YoutubeSummariserPage = () => {
  return <YoutubeSummariser />;
};

export default YoutubeSummariserPage;
