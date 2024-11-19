'use client'

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import {HashtagPlugin} from '@lexical/react/LexicalHashtagPlugin';
import MyCustomAutoFocusPlugin from "./plugins/MyCustomAutoFocusPlugin";
import EmojiPickerPlugin from "./plugins/EmojiPickerPlugin";
import EmojisPlugin from "./plugins/EmojisPlugin";
import {EmojiNode} from "./nodes/EmojiNode";
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";
import ComponentPickerMenuPlugin from "./plugins/ComponentPickerPlugin";

import {CodeHighlightNode, CodeNode} from '@lexical/code';
import {HashtagNode} from '@lexical/hashtag';
import {AutoLinkNode, LinkNode} from '@lexical/link';
import {ListItemNode, ListNode} from '@lexical/list';
import {MarkNode} from '@lexical/mark';
import {OverflowNode} from '@lexical/overflow';
import {HeadingNode, QuoteNode} from '@lexical/rich-text';
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import {TablePlugin} from '@lexical/react/LexicalTablePlugin';
import {CheckListPlugin} from '@lexical/react/LexicalCheckListPlugin';
import {HorizontalRulePlugin} from '@lexical/react/LexicalHorizontalRulePlugin';
import {TableCellNode, TableNode, TableRowNode} from '@lexical/table';
import { useEffect, useState } from "react";
import FloatingTextFormatToolbarPlugin from "./plugins/FloatingTextFormatToolbarPlugin";
import FloatingLinkEditorPlugin from "./plugins/FloatingLinkEditorPlugin";
import LinkPlugin from './plugins/LinkPlugin';
import { SaveToDbPlugin } from "./plugins/SaveToDbPlugin";
import ToolbarPlugin from './plugins/ToolbarPlugin';
import ImagesPlugin from './plugins/ImagesPlugin';
import EquationsPlugin from './plugins/EquationsPlugin';
import { EquationNode } from "./nodes/EquationNode";
import { ImageNode } from "./nodes/ImageNode";
import TableCellResizer from './plugins/TableCellResizer';
import DraggableBlockPlugin from "./plugins/DraggableBlockPlugin";
import CollapsiblePlugin from "./plugins/CollapsiblePlugin";
import { CollapsibleContainerNode } from "./plugins/CollapsiblePlugin/CollapsibleContainerNode";
import { CollapsibleContentNode } from "./plugins/CollapsiblePlugin/CollapsibleContentNode";
import { CollapsibleTitleNode } from "./plugins/CollapsiblePlugin/CollapsibleTitleNode";
import { KeywordNode } from "./nodes/KeywordNode";
import DragDropPaste from './plugins/DragDropPastePlugin';
import { useSelector } from "react-redux";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import { IframeNode } from "./nodes/IframeNode";
import IframePlugin from "./plugins/IframePlugin";
import { YouTubeNode } from "./nodes/YouTubeNode";
import YouTubePlugin from "./plugins/YouTubePlugin";
import { LayoutContainerNode } from "./nodes/LayoutContainerNode";
import { LayoutItemNode } from "./nodes/LayoutItemNode";
import { LayoutPlugin } from "./plugins/LayoutPlugin/LayoutPlugin";

export default function Editor({descriptionContent,setDescriptionContent,collectionId,page,tagId,editable=true,isLeftMargin=true}) {

const [floatingAnchorElem, setFloatingAnchorElem] = useState(null);
const [isSmallWidthViewport, setIsSmallWidthViewport] = useState(false);
const {isMobileView} = useSelector(state => state.app)

  const onRef = (_floatingAnchorElem) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        typeof window !== "undefined" ? window.matchMedia('(max-width: 1025px)').matches : [];

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };

    if (typeof window !== "undefined") window.addEventListener('resize', updateViewPortWidth);

    return () => {
      if (typeof window !== "undefined") window.removeEventListener('resize', updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

const editorConfig = {
  theme: PlaygroundEditorTheme,
  onError(error) {
    throw error;
  },
  nodes: [
    EmojiNode,
    HeadingNode,
    QuoteNode,
    HorizontalRuleNode,
    OverflowNode,
    ListItemNode,
    ListNode,
    CodeHighlightNode,
    CodeNode,
    HashtagNode,
    AutoLinkNode,
    LayoutContainerNode,
    LayoutItemNode,
    LinkNode,
    MarkNode,
    EquationNode,
    ImageNode,
    YouTubeNode,
    IframeNode,
    TableCellNode, TableNode, TableRowNode,
    CollapsibleContainerNode,
    CollapsibleContentNode,
    CollapsibleTitleNode,
    KeywordNode,
    ],
  editorState: descriptionContent,
  editable: editable,
};


  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className={`editor-shell ${editable ? 'my-5' : ''}`}>
        {editable && !isMobileView && <ToolbarPlugin/>}
      <div className="editor-container">
        <RichTextPlugin
            contentEditable={
              <div ref={onRef}>
                <ContentEditable className={isLeftMargin ? "editor-input ml-[15px]" : "editor-input"} />
              </div>
            }
            placeholder={editable ? <Placeholder /> : <></>}
            ErrorBoundary={LexicalErrorBoundary}
          />
        <OnChangePlugin />
        <HistoryPlugin />
        <MyCustomAutoFocusPlugin />
        <ComponentPickerMenuPlugin />
        <EmojiPickerPlugin />
        <EmojisPlugin />
        <CodeHighlightPlugin />
        <ListPlugin />
        <HorizontalRulePlugin />
        <CheckListPlugin />
        <LinkPlugin />
        <HashtagPlugin />
        <ImagesPlugin />
        <LayoutPlugin />
        <IframePlugin />
        <EquationsPlugin />
        <TablePlugin />
        <TableCellResizer />
        <YouTubePlugin />
        <CollapsiblePlugin />
        <DragDropPaste />
        <SaveToDbPlugin 
        setDescriptionContent={setDescriptionContent}
        collectionId={collectionId}
        page={page}
        tagId={tagId}
        />

        {floatingAnchorElem && !isSmallWidthViewport && (
          <>
          {!isMobileView && <DraggableBlockPlugin anchorElem={floatingAnchorElem} />}
          <FloatingTextFormatToolbarPlugin
            anchorElem={floatingAnchorElem}
          />
          <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
          </>
        )}
      </div>
      </div>
    </LexicalComposer>
  );
}

function Placeholder() {
  return <div className="editor-placeholder ml-[15px]">Enter description or ‘/’ for commands</div>;
}
