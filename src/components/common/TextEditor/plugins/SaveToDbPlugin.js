import { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { debounce } from "../utils/debounce";
import { updateCollection } from "../../../../actions/collection";
import { useDispatch } from "react-redux";
import { updateTag } from "../../../../actions/tags";

export function SaveToDbPlugin({ namespace='',setDescriptionContent=()=>{},collectionId,page,tagId }) {
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    setIsInitialRender(false);
  }, []);
  
  const [editor] = useLexicalComposerContext();
  const dispatch  = useDispatch()

  const saveContent = useCallback(
    async (content) => {
    setDescriptionContent(content)
    const payload = {
      description: content
    }

    if(page === 'collection') {
      await dispatch(updateCollection(collectionId,payload))
    }
    if(page === 'tags') {
      await dispatch(updateTag(tagId,payload))
    }
    },
    [setDescriptionContent,collectionId,dispatch,page,tagId]
  );

  const debouncedSaveContent = debounce(saveContent, 1000);

  useEffect(() => {
    return editor.registerUpdateListener(
      ({ editorState, dirtyElements, dirtyLeaves }) => {
        if (dirtyElements.size === 0 && dirtyLeaves.size === 0) return;

        const serializedState = JSON.stringify(editorState);
        if(!isInitialRender){
          debouncedSaveContent(serializedState);
        }
      }
    );
  }, [debouncedSaveContent, editor,isInitialRender]);

  return null;
}
