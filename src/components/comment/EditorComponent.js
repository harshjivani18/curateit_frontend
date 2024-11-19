'use client'

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote','link'],
  ],
  clipboard: {
    matchVisual: false,
  },
}

const formats = [
'bold', 'italic', 'underline', 'strike', 'blockquote',
'link'
]

import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';

function EditorComponent({commentVal,setCommentVal}) {

  const handleChange = (content, delta, source, editor) => {
    const text = editor.getText();
    const filteredText = text.replace(/\s+/g, "");
    if (filteredText.length > 0) {
      setCommentVal(content);
    } else {
      setCommentVal("");
    }
  };

    return (
      <ReactQuill
        modules={modules}
        formats={formats}
        value={commentVal}
        onChange={handleChange}
        placeholder={"What are your thoughts?"}
      />
    );
}

export default EditorComponent;