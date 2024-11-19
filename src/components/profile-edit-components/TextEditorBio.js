'use client'

const modules = {
  toolbar: [
    [{ 'size': [] },'bold', 'italic', 'underline', 'strike', 'blockquote',{ 'align': [] },],
  ],
  clipboard: {
    matchVisual: false,
  },
}

const formats = [
'bold', 'italic', 'underline', 'strike', 'blockquote','align','size'
]

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';

function TextEditorComponent({bio='',setBio=()=>{}}) {

  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.focus();
    }
  }, []);

    return(
       <ReactQuill 
        modules={modules} 
        formats={formats}
        value={bio}
        onChange={setBio}
        placeholder={"Write about yourself..."}
        ref={quillRef}
       />
    )
}

export default TextEditorComponent;