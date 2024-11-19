
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$wrapNodeInElement, mergeRegister} from '@lexical/utils';
import {
  $createParagraphNode,
  $createRangeSelection,
  $getSelection,
  $insertNodes,
  $isNodeSelection,
  $isRootOrShadowRoot,
  $setSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  createCommand,
  DRAGOVER_COMMAND,
  DRAGSTART_COMMAND,
  DROP_COMMAND,
} from 'lexical';
import {useEffect, useState} from 'react';
import * as React from 'react';

// import {
//   $createImageNode,
//   IframeNode,
// } from '../../nodes/IframeNode';
import Button from '../../ui/Button';
import {DialogActions} from '../../ui/Dialog';
// import FileInput from '../../ui/FileInput';
import TextInput from '../../ui/TextInput';
// import session from '@utils/session';
// import TextArea from '../../ui/TextArea';
import { $createIframeNode, $isIframeNode, IframeNode } from '../../nodes/IframeNode';

var canUseDOM = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);

const getDOMSelection = (targetWindow)=>
  canUseDOM ? (targetWindow || window).getSelection() : null;

export const INSERT_IFRAME_COMMAND =
  createCommand('INSERT_IFRAME_COMMAND');

export function InsertIframeDialogBox({
  onClick,
  activeEditor
}) {
  const [src, setSrc] = useState('');
  const isDisabled    = src === '';

  const onIframeSave = () => {
    activeEditor.dispatchCommand(INSERT_IFRAME_COMMAND, { src, maxWidth: 500, maxHeight: 500 })
    onClick()
  }

  return (
    <>
      <TextInput
        label="Iframe Src URL"
        placeholder="i.e. https://source.unsplash.com/random"
        onChange={setSrc}
        value={src}
        data-test-id="image-modal-url-input"
      />
      <DialogActions>
        <Button
          data-test-id="image-modal-confirm-btn"
          disabled={isDisabled}
          onClick={onIframeSave}>
          Confirm
        </Button>
      </DialogActions>
    </>
  );
}

export default function IframePlugin({
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([IframeNode])) {
      throw new Error('Iframe: IframeNode not registered on editor');
    }

    return mergeRegister(
      editor.registerCommand(
        INSERT_IFRAME_COMMAND,
        (payload) => {
          const IframeNode = $createIframeNode(payload);
          $insertNodes([IframeNode]);
          if ($isRootOrShadowRoot(IframeNode.getParentOrThrow())) {
            $wrapNodeInElement(IframeNode, $createParagraphNode).selectEnd();
          }

          return true;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
      editor.registerCommand(
        DRAGSTART_COMMAND,
        (event) => {
          return onDragStart(event);
        },
        COMMAND_PRIORITY_HIGH,
      ),
      editor.registerCommand(
        DRAGOVER_COMMAND,
        (event) => {
          return onDragover(event);
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        DROP_COMMAND,
        (event) => {
          return onDrop(event, editor);
        },
        COMMAND_PRIORITY_HIGH,
      ),
    );
  }, [editor]);

  return null;
}

function onDragStart(event) {
  const node = getIframeNodeSelection();
  if (!node) {
    return false;
  }
  const dataTransfer = event.dataTransfer;
  if (!dataTransfer) {
    return false;
  }
  dataTransfer.setData('text/plain', '_');
  dataTransfer.setDragImage(event.target, 0, 0);
  dataTransfer.setData(
    'application/x-lexical-drag',
    JSON.stringify({
      data: {
        height: node.__height,
        key: node.getKey(),
        maxWidth: node.__maxWidth,
        src: node.__src,
        width: node.__width,
      },
      type: 'iframe',
    }),
  );

  return true
}

function onDragover(event) {
  const node = getIframeNodeSelection();
  if (!node) {
    return false;
  }
  if (!canDropImage(event)) {
    event.preventDefault();
  }
  return true;
}

function onDrop(event, editor) {
  const node = getIframeNodeSelection();
  if (!node) {
    return false;
  }
  const data = getDragIframeData(event);
  if (!data) {
    return false;
  }
  event.preventDefault();
  if (canDropIframe(event)) {
    const range = getDragSelection(event);
    node.remove();
    const rangeSelection = $createRangeSelection();
    if (range !== null && range !== undefined) {
      rangeSelection.applyDOMRange(range);
    }
    $setSelection(rangeSelection);
    editor.dispatchCommand(INSERT_IFRAME_COMMAND, data);
  }
  return true;
}

function getIframeNodeSelection(){
  const selection = $getSelection();
  if (!$isNodeSelection(selection)) {
    return null;
  }
  const nodes = selection.getNodes();
  const node = nodes[0];
  return $isIframeNode(node) ? node : null;
}

function getDragIframeData(event){
  const dragData = event.dataTransfer?.getData('application/x-lexical-drag');
  if (!dragData) {
    return null;
  }
  const {type, data} = JSON.parse(dragData);
  if (type !== 'iframe') {
    return null;
  }

  return data;
}

function canDropIframe(event) {
  const target = event.target;
  return !!(
    target &&
    target instanceof HTMLElement &&
    !target.closest('code, span.editor-iframe') &&
    target.parentElement &&
    target.parentElement.closest('div.ContentEditable__root')
  );
}

function getDragSelection(event){
  let range;
  const target = event.target;
  const targetWindow =
    target == null
      ? null
      : target.nodeType === 9
      ? (target).defaultView
      : (target).ownerDocument.defaultView;
  const domSelection = getDOMSelection(targetWindow);
  if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(event.clientX, event.clientY);
  } else if (event.rangeParent && domSelection !== null) {
    domSelection.collapse(event.rangeParent, event.rangeOffset || 0);
    range = domSelection.getRangeAt(0);
  } else {
    throw Error(`Cannot get the selection when dragging`);
  }

  return range;
}
