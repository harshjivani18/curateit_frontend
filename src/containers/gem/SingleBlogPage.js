"use client";

import "./SingleBlogPage.css";

import React, { useEffect, useState }   from "react";
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
import Blog                             from "@components/blog/Blog";
import { EquationNode }                 from "@components/common/TextEditor/nodes/EquationNode";
import { ImageNode }                    from "@components/common/TextEditor/nodes/ImageNode";
import { CollapsibleContainerNode }     from "@components/common/TextEditor/plugins/CollapsiblePlugin/CollapsibleContainerNode";
import { CollapsibleContentNode }       from "@components/common/TextEditor/plugins/CollapsiblePlugin/CollapsibleContentNode";
import { CollapsibleTitleNode }         from "@components/common/TextEditor/plugins/CollapsiblePlugin/CollapsibleTitleNode";
import { KeywordNode }                  from "@components/common/TextEditor/nodes/KeywordNode";
import session from "@utils/session";
import { IframeNode } from "@components/common/TextEditor/nodes/IframeNode";
import { YouTubeNode } from "@components/common/TextEditor/nodes/YouTubeNode";
import { LayoutContainerNode } from "@components/common/TextEditor/nodes/LayoutContainerNode";
import { LayoutItemNode } from "@components/common/TextEditor/nodes/LayoutItemNode";

const SingleBlogPage = ({ items, isInboxView=false, onModeChange=null, gemPublicView=true, isPreviewMode=false }) => {
    const [extraDetails, setExtraDetails] = useState({ title: items?.title })

    useEffect(() => {
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
        editor.setEditorState(editor.parseEditorState(isPreviewMode ? items?.media?.blogContent : (items?.media?.publishedContent || items?.media?.blogContent)))
        editor.update(() => {
            const htmlString = $generateHtmlFromNodes(editor, null)
            const dom        = new DOMParser().parseFromString(htmlString, "text/html")
            setExtraDetails({
                ...extraDetails,
                content: htmlString,
                textContent: dom?.body?.innerText
            })
        })
    }, [])

    let authorObj = { ...items.author }
    if (!authorObj.data) {
        authorObj = {
            data: {
                id: items?.author?.id,
                attributes: { ...items.author }
            }
        }
    }

    return (<Blog 
                blog={{ 
                    ...items, 
                    author: authorObj
                }}
                extraDetails={extraDetails} 
                gemPublicView={gemPublicView} 
                gemId={items.id} 
                showBackBtn={session.token !== null && session.token !== undefined && session.token !== ""}
                isInboxView={isInboxView}
                onModeChange={onModeChange} />
    )
    // const router    = useRouter();
    // const name      = items?.author?.firstname && items?.author?.lastname ? `${items?.author?.firstname} ${items?.author?.lastname}` : items?.author?.username;
    
    // const onProfileClick = () => {
    //     router.push(`/u/${items?.author?.username}`)
    // }

    // return (
    //     <div className="container">
    //         {items?.media?.blogBanner && <div style={{
    //             backgroundImage: `url(${items?.media?.blogBanner?.icon})`,
    //             backgroundSize: "cover",
    //             backgroundPosition: "center",
    //             backgroundRepeat: "no-repeat",
    //             height: "30vh",
    //             width: "100%",
    //         }}></div>}
    //         <div className="w-full h-full flex justify-center items-center flex-row">
    //             <div className={items?.media?.blogBanner ? "blog-content mt-5" : "mt-2"}>
    //                 <div className="blog-meta">
    //                     <Descriptions colon={false}>
    //                         <Descriptions.Item>
    //                             <div className="flex items-center">
    //                                 <div className="flex items-center justify-center flex-row text-gray-400"><FaUserEdit className="mr-1" /><span>Written By</span></div>
    //                             </div>
    //                         </Descriptions.Item>
    //                         <Descriptions.Item>
    //                             <div className="flex items-center justify-center flex-row blog-profile-desc" onClick={onProfileClick}>
    //                                 <Avatar size={"small"} src={items?.author?.profilePhoto} className="mr-1">{name.charAt(0).toUpperCase()}</Avatar>
    //                                 <lable className="text-blue-500">{name}</lable>
    //                             </div>
    //                         </Descriptions.Item>
    //                     </Descriptions>
    //                     <Descriptions colon={false}>
    //                         <Descriptions.Item>
    //                             <div className="flex items-center">
    //                                 <div className="flex items-center justify-center flex-row text-gray-400"><FaCalendar className="mr-1" /><span>Published On</span></div>
    //                             </div>
    //                         </Descriptions.Item>
    //                         <Descriptions.Item>
    //                             {moment(items?.publishedAt).format("MMMM DD, YYYY")}
    //                         </Descriptions.Item>
    //                     </Descriptions>
    //                 </div>
    //                 <div className="blog-title-container">
    //                     <h1 className="blog-title"><span className="blog-title-span">{items?.title}</span></h1>
    //                 </div>
    //                 <div className="blog-body">
    //                     <Editor descriptionContent={items?.media?.blogContent} editable={false} isLeftMargin={false}  />
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
}

export default SingleBlogPage;