import { FaReddit } from 'react-icons/fa'
import { BiUpvote } from 'react-icons/bi';
import humanNumber from 'human-number';
import { MdOutlineComment } from 'react-icons/md';
import { AiFillGithub, AiFillLinkedin, AiFillMediumSquare, AiOutlineFork, AiOutlineStar } from 'react-icons/ai';
import Image from 'next/image';
import { useState } from 'react';

const SocialFeedDetailCard = ({tweet, url, platform='',isBioPage=false,shape='',layout}) => {
    const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
    const [profileFallback, setProfileFallback] = useState(null)
    const [mediaFallback, setMediaFallback] = useState(null)
    // const [otherFallback, setOtherFallback] = useState(null)

    const displayShortenNumbers = number => {
        return humanNumber(number, n => {
            if (n > 0) {
                return Number.parseFloat(n).toFixed(0);
            }
            return n;
        });
    };

    const decodeHtmlEntities = (str,isBioPage='',shape='') => {
        var element = document.createElement('div');
        if (str && typeof str === 'string') {
            // strip script/html tags
            str = str?.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '');
            str = str?.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
        }
        // return str && str.length > 150 ? str.substring(0, 150) + '...' : str
        if(isBioPage && shape === 'rectangle'){
            return str.length > 45 ? str.slice(0, 45).concat("..."): str
        } else{
            return str && str.length > 150 ? str.substring(0, 150) + '...' : str
        }
    };


    const displayMedia = (item, altInfo) => {
        const imgSrc = typeof item === "string" ? item : (item && item?.covers && item?.covers?.length >0) ? item?.covers[0] : ''
        if (!imgSrc || imgSrc === "") return null;
        if (tweet.postType === "video") {
            return (
                <div className="tweet-image" style={{ width: '100%', position: 'relative' }}>
                    <video controls src={imgSrc} alt={altInfo || ""} className={(platform !== "medium" ? "w-full" : "")} />
                </div>
            );
        }
        return(
        <div className="tweet-image" style={{ width: '100%', position: 'relative' }}>
            <Image src={mediaFallback ? mediaFallback : imgSrc?.replace("resize:fill:112:112", "resize:fit:2400")?.replace("resize:fill:140:140", "resize:fit:2400")?.replace("resize:fill:40:40", "resize:fit:2400")?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`)}
                 alt={altInfo || "Curateit"} 
                 priority={true}
                 onError={(e) => {
                    setMediaFallback(item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`)
                    // const isFailedBefore = e.target.getAttibute("data-isFailedBefore")
                    // if (!isFailedBefore) {
                    //     e.target.setAttribute("data-isFailedBefore", true)
                    //     e.target.src = item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    // }
                    // else {
                    //     e.target.src = `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    // }
                 }}
                 className={(platform !== "medium" ? "w-full" : "")} />
        </div>
        )
    };

    const renderTagLine = (tagLine) => {
        let maxLength;
      
        if (layout === "stream") {
          maxLength = 60;
        } else if (layout === "moodboard") {
          maxLength = 15;
        }
      
        if (maxLength === undefined) return tagLine;
        return `${tagLine?.slice(0, maxLength)}${tagLine?.length > maxLength ? '...' : ''}`;
      };

    return(
        <>
        {
        platform === 'Reddit' &&
        <div 
        className={`cursor-pointer w-full`} 
        >
            <div 
            className={'flex items-center w-full'} 
            >
                {/* <div className="post_avatar mr-4">
                    <img src={tweet?.user?.url} alt="" className="w-[40px] h-[40px]" crossOrigin="anonymous"/>
                </div> */}

                <div className='flex items-center justify-between mb-1 w-full'>
                    <div>
                        <span>{decodeHtmlEntities(tweet.user?.name)}</span>
                    </div>

                    <div>
                        <FaReddit className="h-5 w-5 text-[#ff4500]"/>
                    </div>
                </div>
               
            </div>

            <div>
                <div 
                // className='pl-[50px]'
                >
                    <div className='font-medium'>{tweet?.title || ''}</div>

                    {tweet?.description && <div className="post__headerDescription">
                        <p>{decodeHtmlEntities(tweet?.description,isBioPage,shape)}</p>
                    </div>}
                    { 
                    isBioPage ? <></> : 
                    displayMedia(tweet?.media || tweet?.image_url, tweet?.title) 
                    }
                    <div className="flex items-center">
                        <div className="tweet-actions mr-4">
                            <BiUpvote className='h-5 w-5 mr-1'/>
                            {displayShortenNumbers(tweet?.upvote || 0)}
                        </div>

                        <div className="tweet-actions">
                            <MdOutlineComment className='h-5 w-5 mr-1'/>
                            {displayShortenNumbers(tweet?.comments || 0)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }

        {
        platform === 'Medium' &&
        <div 
        className={`cursor-pointer `} 
        >
            <div 
            className={'flex items-center'} 
            >
                {
                tweet?.user?.image &&
                <div className="post_avatar mr-4">
                    <Image src={profileFallback ? profileFallback : tweet?.user?.image?.replace("resize:fill:24:24", "resize:fit:2400")?.replace("resize:fill:140:140", "resize:fit:2400")?.replace("resize:fill:40:40", "resize:fit:2400")} alt={tweet?.title || "Curateit"} 
                          className="object-cover w-[40px] h-[40px]"
                          priority={true}
                          onError={(e) => {
                            setProfileFallback(`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`)
                            // e.target.src = `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                          }} />
                </div>
                }

                
                <div className='flex items-center justify-between mb-1 w-full'>
                    <div>
                        <span>{tweet.user?.name}</span>
                    </div>

                    <div>
                        <AiFillMediumSquare className="h-5 w-5 text-[#000]"/>
                    </div>
                </div>
                
            </div>

            <div>
                <div 
                // className='pl-[50px]'
                >

                    <div className="post__headerDescription">
                        <p>{decodeHtmlEntities(tweet?.title,isBioPage,shape)}</p>
                    </div>
                    { 
                    isBioPage ? <></> : 
                    displayMedia(tweet.image) 
                    }
                    <div className='flex items-center my-1 justify-between'>
                        <div className='bg-[#e6e6e6] text-black text-xs py-[2px] px-[4px] rounded w-fit'>{tweet?.postTag}</div>
                    <div className='text-xs'>{tweet?.timeToRead}</div>
                    </div>
                </div>
            </div>
        </div>
        }

        {
        platform === 'Github' &&
        <div 
        className={`cursor-pointer `} 
        >
            <div 
            className={'flex items-center'} 
            >
                {/* <div className="post_avatar mr-4">
                    <img src={tweet?.user?.image} alt="" className="w-[40px] h-[40px]" crossOrigin="anonymous"/>
                </div> */}

                
                <div className='flex items-center justify-between mb-1 w-full'>
                    <div>
                        <span>{tweet.user?.screen_name}</span>
                    </div>

                    <div>
                        <AiFillGithub className="h-5 w-5"/>
                    </div>
                </div>
                
            </div>

            <div>
                <div 
                // className='pl-[50px]'
                >
                    <div className="post__headerDescription">
                        <p>{decodeHtmlEntities(tweet?.description,isBioPage,shape)}</p>
                    </div>
                    {/* {displayMedia(tweet.image)} */}
                    <div className='bg-[#e6e6e6] text-black text-xs py-[2px] px-[4px] rounded w-fit my-2 '>
                        {tweet?.programmingLanguage}
                    </div>

                    <div className='flex items-center justify-between'>
                        <div className="tweet-actions">
                            <AiOutlineStar className='h-5 w-5 mr-1'/>
                            {displayShortenNumbers(tweet?.starCount || 0)}
                        </div>

                        <div className="tweet-actions">
                            <AiOutlineFork className='h-5 w-5 mr-1'/>
                            {displayShortenNumbers(tweet?.forkCount || 0)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }

        {
        platform === 'LinkedIn' &&
        <div 
        className={`cursor-pointer `} 
        >
            <div  className={'flex'} >
                <div className="post_avatar mr-4">
                    <Image src={profileFallback ? profileFallback : tweet?.user?.profile_image_url?.replace("resize:fill:24:24", "resize:fit:2400")?.replace("resize:fill:40:40", "resize:fit:2400")} alt={tweet?.title || "Curateit"} className="w-[40px] h-[40px] object-cover"
                           onError={(e) => {
                            setProfileFallback(`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`)
                            // e.target.src = `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                           }}
                           priority={true} />
                </div>
               
                <div className='flex justify-between mb-1 w-full'>
                    {(isBioPage && shape === 'pipe') ? <></> :<div className='flex flex-col'>
                        <span style={{ fontWeight: 550 }}>{tweet?.authorDisplayName}</span>
                        <span className='post__headerSpecial !font-normal' style={{color:"rgb(0 0 0 / 60%)"}}>
                        {renderTagLine(tweet?.user?.tag_line)}
                        </span>
                    </div>}

                    <div>
                        <AiFillLinkedin className="h-5 w-5 text-[#50b7f5]"/>
                    </div>
                </div>
            </div>

            <div>
                <div 
                // className='pl-[50px]'
                >

                    <div className="post__headerDescription">
                        <p>{decodeHtmlEntities(tweet?.description || tweet?.fullText || tweet?.text, isBioPage, shape)}</p>
                    </div>
                    { 
                    (isBioPage) ? <></> : 
                    displayMedia(tweet.media) 
                    }
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default SocialFeedDetailCard;