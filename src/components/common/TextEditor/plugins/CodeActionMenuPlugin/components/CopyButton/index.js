
import {$isCodeNode} from '@lexical/code';
import {
  $getNearestNodeFromDOMNode,
  $getSelection,
  $setSelection,
} from 'lexical';
import * as React from 'react';
import {useState} from 'react';

import {useDebounce} from '../../utils';


export function CopyButton({editor, getCodeDOMNode}) {
  const [isCopyCompleted, setCopyCompleted] = useState(false);

  const removeSuccessIcon = useDebounce(() => {
    setCopyCompleted(false);
  }, 1000);

  async function handleClick() {
    const codeDOMNode = getCodeDOMNode();

    if (!codeDOMNode) {
      return;
    }

    let content = '';

    editor.update(() => {
      const codeNode = $getNearestNodeFromDOMNode(codeDOMNode);

      if ($isCodeNode(codeNode)) {
        content = codeNode.getTextContent();
      }

      const selection = $getSelection();
      $setSelection(selection);
    });

    try {
      await navigator.clipboard.writeText(content);
      setCopyCompleted(true);
      removeSuccessIcon();
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  return (
    <button className="menu-item" onClick={handleClick} aria-label="copy">
      {isCopyCompleted ? (
        <i className="format success" />
      ) : (
        <i className="format copy" />
      )}
    </button>
  );
}
