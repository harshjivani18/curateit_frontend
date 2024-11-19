import React                        from 'react'
import { message }                  from 'antd'

import HighlightActions             from './HighlightActions'
import CodeEditor                   from './CodeEditor'
import session from '@utils/session';
import GemEngagement from '@components/gemEngagement/GemEngagement';
import FloatingButtons from '@components/common/FloatingButtons';

const CodeHighlight = (props) => {
    const { obj, user, onViewGem, openHighlight } = props
    const media   = Array.isArray(obj.media) && obj.media.length !== 0 ? obj.media[0] : typeof obj.media === "object" && obj.media["0"] ? obj.media["0"] : typeof obj.media ? obj.media : null
    const onLinkCopy = () => {
        if (media) {
            try {
                window.navigator.clipboard.writeText(media.code);
                message.success('Text Copied to clipboard');
            } catch (err) {
                message.error('Not have permission')
            }
        }
    }   

    const onDownload = () => {

    }
    
    if (media === null) return null
    return (
        <div>
            <div className='border-[1px] border-gray-300 border-b-0 rounded-b-0 rounded-sm py-2 pr-2'>
                <div className='py-1 pl-3 border-l-4 border-pink-500'>
                    <div className='mb-2'>
                        <div className='ct-relative bg-[#01122B] p-4 rounded-md'>
                            <FloatingButtons onLinkCopy={onLinkCopy} onDownload={onDownload} onPreview={props.onViewGem} isHideDownload={true} />
                            <CodeEditor media={media} isSidebar={props.isSidebar} width={props.width} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='pl-4 border-[1px] border-gray-300 border-t-0 rounded-t-0 rounded-sm'>
                <hr className='w-full bg-gray-300 -mr-5' />
                <div className='flex justify-between items-center'>
                    <GemEngagement
                        showBookmark={user?.username !== session?.username}
                        isListView={true}
                        gem={obj}
                        user={user}
                        showAddToBookmark={onViewGem}
                        showComment={onViewGem}
                    />
                    <HighlightActions media={media} obj={obj} openLinkToHighlight={openHighlight} />
                </div>
            </div>
        </div>
    )
}

export default CodeHighlight