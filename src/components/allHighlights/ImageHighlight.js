import React                    from 'react'
import { message }              from 'antd'
import session from '@utils/session'
import FloatingButtons from '@components/common/FloatingButtons'
import HighlightActions from './HighlightActions'
import GemEngagement from '@components/gemEngagement/GemEngagement'
import HighlightBody from './HighlightBody'
import { copyLinkToHighlight } from '@utils/constants'

const ImageHighlight = (props) => {
    const { obj, user, onViewGem } = props
    const media   = Array.isArray(obj.media) && obj.media.length !== 0 ? obj.media[0] : typeof obj.media === "object" && obj.media["0"] ? obj.media["0"] : typeof obj.media ? obj.media : null

    const onLinkCopy = () => {
        if (media) {
            try {
                window.navigator.clipboard.writeText(obj?.S3_link && obj.S3_link.length !== 0 ? obj.S3_link[0] : media.image);
                message.success('Text Copied to clipboard');
            } catch (err) {
                message.error('Not have permission')
            }
        }
    }

    const onOpenHighlight = () => {
        onViewGem();
    }

    const handleCopyLinkToHighlight = () => {
        copyLinkToHighlight(obj.url, obj.description).then(res => {
            message.success('Link Copied to clipboard');
        })
    }

    const onDownload = () => {
        const src    = obj?.S3_link && obj.S3_link.length !== 0 ? obj.S3_link[0] : media.image ? media.image : null
        if(src){
            const link      = document.createElement('a');
            link.href       = src;
            link.download   = src;
    
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        }
    }

    if (media === null) return null
    const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
    return (
        <div>
            <div className='border-[1px] border-gray-300 border-b-0 rounded-b-0 rounded-sm py-2 pr-2'>
                <div className='py-1 pl-3 border-l-4 border-pink-500'>
                    <div className='mb-2'>
                        <div className='ct-relative'>
                            <FloatingButtons onLinkCopy={onLinkCopy} onDownload={onDownload} onPreview={props.onViewGem} />
                            <img src={obj?.S3_link && obj.S3_link.length !== 0 
                                        ? obj.S3_link?.[0]?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) 
                                        : media.image?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`)}
                                 alt={obj?.altInfo || obj?.title || obj?.description || "Curateit user highlight image"} 
                                 className='w-full h-auto object-cover rounded-sm'
                                 onError={(e) => {
                                    e.target.onerror = null
                                    if (media?.fallbackURL) {
                                        e.target.src = media?.fallbackURL
                                    }
                                 }} />
                        </div>
                    </div>
                    <HighlightBody text={obj.text || obj.title || obj.description} />
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
                        showAddToBookmark={onOpenHighlight}
                        showComment={onOpenHighlight}
                    />
                    <HighlightActions
                        media={media}
                        openLinkToHighlight={props.onViewGem}
                        copyLinkToHighlight={handleCopyLinkToHighlight}
                        isTextHighlight={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default ImageHighlight