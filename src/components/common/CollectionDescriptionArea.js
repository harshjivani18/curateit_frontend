import "./CollectionDescriptionArea.css"
import React, { useEffect, useState }   from "react"
import { $generateHtmlFromNodes }       from "@lexical/html"
import { createHeadlessEditor }         from "@lexical/headless";
import {HeadingNode,
        QuoteNode}                      from '@lexical/rich-text';
import {OverflowNode}                   from '@lexical/overflow';
import { HorizontalRuleNode }           from "@lexical/react/LexicalHorizontalRuleNode";
import {HashtagNode}                    from '@lexical/hashtag';
import {AutoLinkNode, LinkNode}         from '@lexical/link';
import {ListItemNode, ListNode}         from '@lexical/list';
import {CodeHighlightNode, CodeNode}    from '@lexical/code';
import {MarkNode}                       from '@lexical/mark';
import {TableCellNode, TableNode, 
        TableRowNode}                   from '@lexical/table';

import PlaygroundEditorTheme            from "@components/common/TextEditor/themes/PlaygroundEditorTheme";
import { EmojiNode }                    from "@components/common/TextEditor/nodes/EmojiNode";
import { EquationNode }                 from "@components/common/TextEditor/nodes/EquationNode";
import { ImageNode }                    from "@components/common/TextEditor/nodes/ImageNode";
import { CollapsibleContainerNode }     from "@components/common/TextEditor/plugins/CollapsiblePlugin/CollapsibleContainerNode";
import { CollapsibleContentNode }       from "@components/common/TextEditor/plugins/CollapsiblePlugin/CollapsibleContentNode";
import { CollapsibleTitleNode }         from "@components/common/TextEditor/plugins/CollapsiblePlugin/CollapsibleTitleNode";
import { KeywordNode }                  from "@components/common/TextEditor/nodes/KeywordNode";
import { IframeNode }                   from "@components/common/TextEditor/nodes/IframeNode";
import { YouTubeNode }                  from "@components/common/TextEditor/nodes/YouTubeNode";
import { LayoutContainerNode }          from "@components/common/TextEditor/nodes/LayoutContainerNode";
import { LayoutItemNode }               from "@components/common/TextEditor/nodes/LayoutItemNode";

import { sourceSerif }                  from "@utils/fonts";

const CollectionDescriptionArea = ({ description, onDescClick }) => {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        const editor          = createHeadlessEditor({ 
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
              HashtagNode,
              AutoLinkNode,
              CodeHighlightNode,
              CodeNode,
              LinkNode,
              MarkNode,
              EquationNode,
              ImageNode,
              IframeNode,
              YouTubeNode,
              LayoutContainerNode,
              LayoutItemNode,
              TableCellNode, 
              TableNode, 
              TableRowNode,
              CollapsibleContainerNode,
              CollapsibleContentNode,
              CollapsibleTitleNode,
              KeywordNode,
            ],
            editable: false
        })
        editor.setEditorState(editor.parseEditorState(description))
        editor.update(() => {
            const htmlString = $generateHtmlFromNodes(editor, null)
            const dom        = new DOMParser().parseFromString(htmlString, "text/html")
            const blogHtmlElem = document.getElementById("ct-collection-desc-html")
            if (blogHtmlElem) {
                blogHtmlElem.innerHTML += dom.body.innerHTML
            }
            setLoading(false)
        })
    }, [])

    if (loading) return null

    return (
        <div className="ct-collection-desc-area" style={{ fontFamily: sourceSerif.style.fontFamily }}>
            <div id="ct-collection-desc-html" style={{ fontFamily: sourceSerif.style.fontFamily }} onClick={onDescClick}></div>
        </div>
    )
}

export default CollectionDescriptionArea