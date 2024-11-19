import humanNumber from 'human-number';
import TimeAgo from 'react-timeago'
import { MdOutlineComment,MdVerified, } from 'react-icons/md'
import { IoMdRepeat } from 'react-icons/io'
import { AiOutlineHeart, AiOutlineTwitter } from 'react-icons/ai'
import Image from 'next/image';
import { useState } from 'react';

const TweetDetail = ({tweet, altInfo="", isMoodboard=false,isBioPage=false,shape='',description}) => {
    const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
    const [mediaFallback, setMediaFallback] = useState(false)
    const [profileFallback, setProfileFallback] = useState(false)
    const displayShortenNumbers = number => {
        return humanNumber(number, n => {
            if (n > 0) {
                return Number.parseFloat(n).toFixed(0);
            }
            return n;
        });
    };

    const decodeHtmlEntities = (str,isBioPage) => {
        var element = document.createElement('div');
        if (str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
        }

        if(isBioPage){
            return str?.length > 45 ? str?.slice(0, 45).concat("..."): str
        } else{
            return str?.length > 200 ? str?.slice(0, 200).concat("..."): str
        }
        
    };


    const displayMedia = (media, mediaKey) => {
        if (!media?.length) return null;

        if (media[0]?.type === 'video') {
            const videoItem = media[0]?.[mediaKey]?.find(video => video.content_type === 'video/mp4');
            return (
                <video controls>
                    <source src={videoItem?.url} type={'video/mp4'} />
                </video>
            );
        } else {
            if (!media?.[0]?.url) return null;
            return (
                <div className="tweet-image" style={{ width: '100%', position: 'relative' }}>
                    <Image src={mediaFallback ? mediaFallback : (media[0]?.url?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) || media[0]?.preview_image_url?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`))} alt={altInfo}
                    className={`${isBioPage ? 'w-full h-[100px] object-contain' : ''}`}
                    onError={(e) => {
                        setMediaFallback(`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`)
                        // e.target.src = `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    }}
                    priority={true} />
                </div>
            );
        }
    };

    return(
        <div 
        className={`${isMoodboard ? "" : 'tweet-post' } cursor-pointer `} 
        >
            <div 
            className={'flex items-center w-full'} 
            >
                {(isBioPage && shape === 'pipe') ? <></> : <div className="post_avatar mr-4">
                    <Image src={profileFallback || tweet?.user?.profile_image_url} alt={altInfo} className="w-[40px] h-[40px] object-cover" onError={(e) => {
                        // e.target.src = `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                        setProfileFallback(`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`)
                    }}
                    priority={true} />
                </div>}

                {
                (isMoodboard || isBioPage) ? 
                <div className='flex items-center justify-between mb-1 w-full'>
                    <div>
                        <span>{tweet.user?.name}</span>
                        {tweet.user?.verified && (
                        <span className="flex items-center">
                        <MdVerified className='h-5 w-5 text-[#50b7f5]'/>
                        <span className='post__headerSpecial ml-1'>
                            {tweet.user?.screen_name}
                        </span>
                        </span>
                        )}
                    </div>

                    <div>
                        <AiOutlineTwitter className="h-5 w-5 text-[#50b7f5]"/>
                    </div>
                </div>
                : 
                <div className="post__header">
                        <div className="post__headerText">
                            <h3 className='flex items-center'>
                                {tweet.user?.name}
                                {tweet.user?.verified && (
                                <span className="flex items-center">
                                    <MdVerified className='h-5 w-5 text-[#50b7f5]'/>
                                    <span className='post__headerSpecial ml-1'>
                                        {tweet.user?.screen_name}
                                    </span>
                                </span>
                                )}
                                <span className="post__headerTime ml-1">
                                    {<TimeAgo date={tweet.date} />}
                                </span>
                            </h3>
                        </div>
                </div>
                }
            </div>

            <div>
                <div 
                // className='pl-[50px]'
                >

                    <div className={`post__headerDescription ${isBioPage && shape === 'pipe' ? 'truncate' : ''}`}>
                        <p>{decodeHtmlEntities(tweet?.text || tweet?.full_text,isBioPage)}</p>
                    </div>

                    {isMoodboard && <div className={`post__headerDescription ${isBioPage && shape === 'pipe' ? 'truncate' : ''}`}>
                        <p>{decodeHtmlEntities(description,isBioPage)}</p>
                    </div>}
                    
                    { 
                    (isBioPage && shape === 'rectangle') ? <></> : 
                    displayMedia(tweet.medias, 'video_src') 
                    }
                    <div className="post__footer">
                        <div className="tweet-actions">
                            <MdOutlineComment className='h-5 w-5 mr-1'/>
                            {displayShortenNumbers(tweet?.reply_count || 0)}
                        </div>

                        <div className="tweet-actions">
                            <IoMdRepeat className='h-5 w-5 mr-1'/>
                            {displayShortenNumbers(tweet?.retweet_count || 0)}
                        </div>

                        <div className="tweet-actions">
                            <AiOutlineHeart className='h-5 w-5 mr-1'/>
                            {displayShortenNumbers(tweet?.likeCount || 0)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TweetDetail;