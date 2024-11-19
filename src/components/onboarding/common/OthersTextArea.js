import { Input } from "antd";

const { TextArea } = Input;

const OthersTextArea = ({ value, placeholder, setValue }) => {
  return (
    <div className="mt-2">
      <TextArea
        rows={3}
        placeholder={placeholder}
        className="rounded-lg border-[0.6px] border-solid border-[#78A6EC]"
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default OthersTextArea;