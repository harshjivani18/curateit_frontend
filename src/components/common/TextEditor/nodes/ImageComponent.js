import './ImageNode.css';

import { Button, Dropdown, Tooltip, Modal, Input, message } from 'antd'
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
// import {useCollaborationContext} from '@lexical/react/LexicalCollaborationContext';
// import {CollaborationPlugin} from '@lexical/react/LexicalCollaborationPlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {HashtagPlugin} from '@lexical/react/LexicalHashtagPlugin';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {LexicalNestedComposer} from '@lexical/react/LexicalNestedComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {useLexicalNodeSelection} from '@lexical/react/useLexicalNodeSelection';
import {mergeRegister} from '@lexical/utils';
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  $setSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  DRAGSTART_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import * as React from 'react';
import {Suspense, useCallback, useEffect, useRef, useState} from 'react';

import {useSharedHistoryContext} from '../context/SharedHistoryContext';
import EmojisPlugin from '../plugins/EmojisPlugin';
import KeywordsPlugin from '../plugins/KeywordsPlugin';
import LinkPlugin from '../plugins/LinkPlugin';
import MentionsPlugin from '../plugins/MentionsPlugin';
// import TreeViewPlugin from '../plugins/TreeViewPlugin';
import ContentEditable from '../ui/ContentEditable';
import ImageResizer from '../ui/ImageResizer';
import Placeholder from '../ui/Placeholder';
import {$isImageNode} from './ImageNode';
import { BiAlignLeft, BiAlignMiddle, BiAlignRight } from 'react-icons/bi';
import { FaDownload } from 'react-icons/fa';
import { TbTextCaption } from 'react-icons/tb';
import { TfiLayoutSliderAlt } from 'react-icons/tfi';
import { FiLink } from 'react-icons/fi';
// import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
// import { SaveToDbPlugin } from '../plugins/SaveToDbPlugin';
import { normalizeUrl } from '@utils/constants';
import { Validator } from '@utils/validations';

const imageCache = new Set();

function useSuspenseImage(src) {
  if (!imageCache.has(src)) {
    throw new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.add(src);
        resolve(null);
      };
    });
  }
}

function LazyImage({
  altText,
  className,
  imageRef,
  src,
  width,
  height,
  maxWidth,
}){
  useSuspenseImage(src);
  return (
    <img
      className={className || undefined}
      src={src}
      alt={altText}
      ref={imageRef}
      style={{
        height,
        maxWidth,
        width,
      }}
      draggable="false"
    />
  );
}

export default function ImageComponent({
  src,
  altText,
  nodeKey,
  width,
  height,
  maxWidth,
  resizable,
  showCaption,
  caption,
  captionsEnabled,
  imageLink
}){
  const imageRef = useRef(null);
  const buttonRef = useRef(null);
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);
  const [isResizing, setIsResizing] = useState(false);
  // const {isCollabActive} = useCollaborationContext();
  const [editor] = useLexicalComposerContext();
  const [selection, setSelection] = useState(null);
  const [newAltText, setNewAltText] = useState(altText)
  const [showAltBox, setShowAltBox] = useState(false)
  const [isMenu, setMenu] = useState(false)
  const [showLinkBox, setShowLinkBox] = useState(false)
  const [newURL, setNewURL] = useState(imageLink)
  const [imageLinkError, setImageLinkError] = useState(null)
  const activeEditorRef = useRef(null);

  const onDelete = useCallback(
    (payload) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        const event = payload;
        event.preventDefault();
        const node = $getNodeByKey(nodeKey);
        if ($isImageNode(node)) {
          node.remove();
        }
        setSelected(false);
      }
      return false;
    },
    [isSelected, nodeKey, setSelected],
  );

  const onEnter = useCallback(
    (event) => {
      const latestSelection = $getSelection();
      const buttonElem = buttonRef.current;
      if (
        isSelected &&
        $isNodeSelection(latestSelection) &&
        latestSelection.getNodes().length === 1
      ) {
        if (showCaption) {
          // Move focus into nested editor
          $setSelection(null);
          event.preventDefault();
          caption.focus();
          return true;
        } else if (
          buttonElem !== null &&
          buttonElem !== document.activeElement
        ) {
          event.preventDefault();
          buttonElem.focus();
          return true;
        }
      }
      return false;
    },
    [caption, isSelected, showCaption],
  );

  const onEscape = useCallback(
    (event) => {
      if (
        activeEditorRef.current === caption ||
        buttonRef.current === event.target
      ) {
        $setSelection(null);
        editor.update(() => {
          setSelected(true);
          const parentRootElement = editor.getRootElement();
          if (parentRootElement !== null) {
            parentRootElement.focus();
          }
        });
        return true;
      }
      return false;
    },
    [caption, editor, setSelected],
  );

  useEffect(() => {
    let isMounted = true;
    const unregister = mergeRegister(
      editor.registerUpdateListener(({editorState}) => {
        if (isMounted) {
          setSelection(editorState.read(() => $getSelection()));
        }
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_, activeEditor) => {
          activeEditorRef.current = activeEditor;
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CLICK_COMMAND,
        (payload) => {
          const event = payload;

          if (isResizing) {
            return true;
          }
          if (event.target === imageRef.current) {
            if (event.shiftKey) {
              setSelected(!isSelected);
            } else {
              clearSelection();
              setSelected(true);
            }
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        DRAGSTART_COMMAND,
        (event) => {
          if (event.target === imageRef.current) {
            // TODO This is just a temporary workaround for FF to behave like other browsers.
            // Ideally, this handles drag & drop too (and all browsers).
            event.preventDefault();
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(KEY_ENTER_COMMAND, onEnter, COMMAND_PRIORITY_LOW),
      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        onEscape,
        COMMAND_PRIORITY_LOW,
      ),
    );
    const onDocScroll = () => {
      setMenu(false)
    }
    document.addEventListener("scroll", onDocScroll)
    return () => {
      isMounted = false;
      unregister();
      document.removeEventListener("scroll", onDocScroll)
    };
  }, [
    clearSelection,
    editor,
    isResizing,
    isSelected,
    nodeKey,
    onDelete,
    onEnter,
    onEscape,
    setSelected,
  ]);

  const setShowCaption = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isImageNode(node)) {
        node.setShowCaption(true);
      }
    });
  };

  const onResizeEnd = (
    nextWidth,
    nextHeight,
  ) => {
    // Delay hiding the resize bars for click case
    setTimeout(() => {
      setIsResizing(false);
    }, 200);

    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isImageNode(node)) {
        node.setWidthAndHeight(nextWidth, nextHeight);
      }
    });
  };

  const onResizeStart = () => {
    setIsResizing(true);
  };

  const onAligntmentChange = (e) => {
    if (!activeEditorRef?.current) return
    !activeEditorRef?.current?.dispatchCommand(FORMAT_ELEMENT_COMMAND, e.key);
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isImageNode(node)) {
        node.setImageAlignment(e.key);
      }
    });
  }

  const onImageCaption = () => {
    if (!showCaption) {
      setShowCaption()
    }
  }

  const onImageDownload = () => {
    fetch(src)
      .then(response => response.blob())
      .then(blob => {
        let blobUrl = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.download = src.replace(/^.*[\\\/]/, '');
        a.href = blobUrl;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
  }

  const onAltSubmit = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isImageNode(node)) {
        node.onAltUpdate(newAltText)
      }
    });
    setShowAltBox(false)
  }

  const onLinkSubmit = () => {
    if (imageLinkError) {
      message.error(imageLinkError)
      return
    }
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isImageNode(node)) {
        node.onLinkUpdate(newURL)
      }
    });
    setShowLinkBox(false)
  }

  const {historyState} = useSharedHistoryContext();

  const draggable = isSelected && $isNodeSelection(selection) && !isResizing;
  const isFocused = isSelected || isResizing;

  const ALIGNMENT_OPTIONS = [
    {
      key: 'left',
      label: <BiAlignLeft />
    },
    {
      key: 'center',
      label: <BiAlignMiddle />
    },
    {
      key: 'right',
      label: <BiAlignRight />
    }
  ]

  return (
    <Suspense fallback={null}>
      <>
        {isMenu && 
          <div className='fixed flex justify-end ct-flyout-menu' 
                style={{ 
                  width: width === "inherit" ? imageRef?.current?.getBoundingClientRect()?.width > 500 ? 500 : imageRef?.current?.getBoundingClientRect()?.width : width > 500 ? 500 : width,
                  top: imageRef?.current?.getBoundingClientRect()?.top,
                }}
              onMouseEnter={(e) => {
                setMenu(true)
              }}
              onMouseLeave={(e) => {
                setMenu(false)
              }}
          >
            <div className='flex justify-start items-center flex-row bg-[rgba(0,0,0,0.5)]'>
              {width !== "inherit" && width < 500 &&
                  <Dropdown menu={{
                    items: ALIGNMENT_OPTIONS,
                    onClick: onAligntmentChange
                  }} className='text-white mr-3 ml-3'>
                    <BiAlignLeft color='white' className='ct-flyout-menu-item' />
                  </Dropdown>
              }
              <Tooltip title="Download" placement='bottom'>
                <Button type="ghost" onClick={onImageDownload} className='border-0 ct-flyout-menu-item'>
                  <FaDownload color='white' />
                </Button>
              </Tooltip>
              <Tooltip title="Write Caption" placement='bottom'>
                <Button type="ghost" onClick={onImageCaption} className='border-0 ct-flyout-menu-item'>
                  <TbTextCaption color='white' />
                </Button>
              </Tooltip>
              <Tooltip title="Set Link" placement='bottom'>
                <Button type="ghost" onClick={() => setShowLinkBox(true)} className='border-0 ct-flyout-menu-item'>
                  <FiLink color='white' />
                </Button>
              </Tooltip>
              <Tooltip title="Add Alt Info" placement='bottom'>
                <Button type="ghost" onClick={() => setShowAltBox(true)} className='border-0 ct-flyout-menu-item'>
                  <TfiLayoutSliderAlt color='white' />
                </Button>
              </Tooltip>
            </div>
          </div>
        }
        <div draggable={draggable} 
          onMouseEnter={(e) => {
            setMenu(true)
          }} 
          onMouseLeave={(e) => {
            setMenu(false)
          }}
        >
          <LazyImage
            className={
              isFocused
                ? `focused ${$isNodeSelection(selection) ? 'draggable' : ''}`
                : null
            }
            src={src}
            altText={altText}
            imageRef={imageRef}
            width={width}
            height={height}
            maxWidth={maxWidth}
          />
        </div>
        {showCaption && (
          <div className="image-caption-container">
            <LexicalNestedComposer initialEditor={caption}>
              <AutoFocusPlugin />
              <MentionsPlugin />
              <LinkPlugin />
              <EmojisPlugin />
              <HashtagPlugin />
              <KeywordsPlugin />
              <HistoryPlugin externalHistoryState={historyState} />
              {/* {isCollabActive ? (
                <CollaborationPlugin
                  id={caption.getKey()}
                  providerFactory={createWebsocketProvider}
                  shouldBootstrap={true}
                />
              ) : (
                <HistoryPlugin externalHistoryState={historyState} />
              )} */}
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="ImageNode__contentEditable" />
                }
                placeholder={
                  <Placeholder className="ImageNode__placeholder">
                    Enter a caption...
                  </Placeholder>
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
              {/* {showNestedEditorTreeView === true ? <TreeViewPlugin /> : null} */}
            </LexicalNestedComposer>
          </div>
        )}
        {showAltBox && (
          <Modal title="Add alt for selected image"
                 open={showAltBox}
                 onOk={onAltSubmit}
                 okButtonProps={{
                  className: "bg-[#347AE2]"
                 }}
                 onCancel={() => { setShowAltBox(false); setNewAltText(altText); }}
                 okText="Set Alt Info">
            <Input value={newAltText} onChange={(e) => { setNewAltText(e.target.value) }} placeholder='Write alt information' />
          </Modal>
        )}
        {showLinkBox && (
          <Modal title="Set image on link"
                 open={showLinkBox}
                 onOk={onLinkSubmit}
                 okButtonProps={{
                  className: "bg-[#347AE2]"
                 }}
                 onCancel={() => { setShowLinkBox(false); setNewURL(imageLink); }}
                 okText="Set URL">
            <Input value={newURL} 
              onBlur={() => {
                const url = normalizeUrl(newURL)
                if(Validator.validate('url',url,true)){
                  setImageLinkError(Validator.validate('url',url,true))
                  message.error(Validator.validate('url',url,true))
                }
                else {
                  setImageLinkError(null)
                  setNewURL(url)
                }
              }}
              onChange={(e) => { 
                const { value } = e.target
                setNewURL(value)
              }} placeholder='Add link on image' />
          </Modal>
        )}
        {resizable && $isNodeSelection(selection) && isFocused && (
          <ImageResizer
            showCaption={showCaption}
            setShowCaption={setShowCaption}
            editor={editor}
            buttonRef={buttonRef}
            imageRef={imageRef}
            maxWidth={maxWidth}
            onResizeStart={onResizeStart}
            onResizeEnd={onResizeEnd}
            captionsEnabled={captionsEnabled}
          />
        )}
      </>
    </Suspense>
  );
}
