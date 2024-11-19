import dynamic from 'next/dynamic';
// import AudioNotesTaker from "@containers/features/audio-notes-taker/AudioNotesTaker";
const AudioNotesTaker = dynamic(() => import("@containers/features/audio-notes-taker/AudioNotesTaker"), { ssr: false });

export const metadata = {
  title: "Free AI Audio Note Taker Extension for Google Chrome | CurateIt",
  description:
    "Take your note-taking to the next level with our free AI Audio Note Taker Extension for Google Chrome. Experience the convenience of CurateIt today!",
};

const AudioNotesTakerPage = () => {
  return <AudioNotesTaker />;
};

export default AudioNotesTakerPage;
