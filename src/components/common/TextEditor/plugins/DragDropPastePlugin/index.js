import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {DRAG_DROP_PASTE} from '@lexical/rich-text';
import {isMimeType, mediaFileReader} from '@lexical/utils';
import {COMMAND_PRIORITY_LOW} from 'lexical';
import {useEffect} from 'react';

import {INSERT_IMAGE_COMMAND} from '../ImagesPlugin';
import session from '@utils/session';

const ACCEPTABLE_IMAGE_TYPES = [
  'image/',
  'image/heic',
  'image/heif',
  'image/gif',
  'image/webp',
  'image/png',
  'image/jpeg',
];

export default function DragDropPaste() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerCommand(
      DRAG_DROP_PASTE,
      (files) => {
        (async () => {
          const filesResult = await mediaFileReader(
            files,
            [ACCEPTABLE_IMAGE_TYPES].flatMap((x) => x),
          );
          for (const {file, result} of filesResult) {
            if (isMimeType(file, ACCEPTABLE_IMAGE_TYPES)) {
              const payload = {
                base64: result
              }
              fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload-base64-img`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${session.token}`
                  },
                  body: JSON.stringify(payload)
              })
              .then(resp => {
                  return resp.json()
              })
              .then(response => {
                editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                  src: response.message, 
                  altText: "", 
                  imageLink: ""
                });
              })
              .catch(error => {
                console.log("Error on image uploading ====>", error)
              });
            }
          }
        })();
        return true;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);
  return null;
}
