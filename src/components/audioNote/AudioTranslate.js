import { useState, useEffect } from "react";
import AudioWaveform from "./AudioWaveform";
import { getAudioText } from "@actions/bookmark";
import { useDispatch } from "react-redux";
import { Input } from "antd";
const { TextArea } = Input;

const AudioTranslate = ({
  audioEnhancedText,
  setAudioEnhancedText,
  audioOriginalText,
  setAudioOriginalText,
  showAudioTag,
  audioRecordSrc,
  setAudioRecordSrc,
  setAudioSrc,
  audioSrc
}) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState();
  const [processingText, setProcessingText] = useState("")
  const [OriginalTextBox, setOriginalTextBox] = useState(false);
  const [isRecordingCanceled, setIsRecordingCanceled] = useState(false);
  const [audioKey, setAudioKey] = useState(0);
  const [playAudio, setPlayAudio] = useState("")

  const handleAudioRecorded = (audioBlob) => {
    const audioFile = new File([audioBlob], "recording.mp3", {
      type: "audio/mp3",
    });

    setFiles(audioFile);
    setAudioRecordSrc(audioFile)
    setPlayAudio(URL.createObjectURL(audioFile))
    setAudioKey((prevKey) => prevKey + 1);
  };

  const handleCancelRecording = () => {
    setAudioEnhancedText("");
    setAudioOriginalText("");
    setAudioRecordSrc("");
  };

  useEffect(() => {
    const fetchAudioFileData = async () => {
      if (!files || isRecordingCanceled) {
        return;
      }

      const formData = new FormData();
      formData.append("files", files);

      try {
        setProcessingText("Processing audio file...")
        dispatch(getAudioText(formData))
          .then((response) => {
            setProcessingText("")
            setAudioOriginalText(response?.payload?.data?.data?.originalText)
            const textData = response?.payload?.data?.data?.enhancedText;
            setAudioEnhancedText(textData);
          })
          .catch((error) => {
            setProcessingText("")
            console.error("Error while fetching audio text:", error);
          });
      } catch (error) {
        console.error("Error while dispatching getAudioText:", error);
      }
    };

    fetchAudioFileData();
  }, [files, dispatch, isRecordingCanceled]);

  const handleOriginalTextBox = () => {
    setOriginalTextBox(!OriginalTextBox);
  };

  return (
    <div className="flex flex-col">
      <AudioWaveform
        onAudioRecorded={handleAudioRecorded}
        onCancelRecording={handleCancelRecording}
        setIsRecordingCanceled={setIsRecordingCanceled}
        setAudioRecordSrc={setAudioRecordSrc}
        showAudioTag={showAudioTag}
        processingText={processingText}
      />
      <div className="justify-between px-1 mt-2 flex items-center">
        <p className="text-sm text-gray-600">Transcript</p>
        <button
          className="text-xs   text-blue-400"
          onClick={handleOriginalTextBox}
        >
          {OriginalTextBox ? "Hide Original Text" : "Show Original Text"}
        </button>
      </div>
      {OriginalTextBox && (
        <TextArea
          className="rounded-md mt-2 text-xs overflow-auto border-[#ABB7C9] focus:border-none hover:border-[#ABB7C9] "
          type="text"
          name="original text"
          placeholder="Original Transcript"
          contentEditable={true}
          size="large"
          value={audioOriginalText}
          autoSize={{ minRows: 2, maxRows: 2 }}
        />
      )}
      {showAudioTag && playAudio && (
        <div className="flex flex-col gap-y-1 items-center justify-center mt-1">
          <audio src={playAudio} controls className="mt-2" key={audioKey}>
            <source src={playAudio} type="audio/mp3" />
          </audio>
        </div>
      )}
    </div>
  );
};

export default AudioTranslate;
