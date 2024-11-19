import RatingComponent from "@components/common/RatingComponent";
import { PlayCircleIcon } from "@heroicons/react/24/outline";
import { PLATFORMS_URLS } from "@utils/constants";
import ReactPlayer from "react-player";

const TestimonialCard = ({avatar,tagLine,author, product,attachImage,platform, rating, date,testimonial, metaData, altInfo="", showDetailsFull=false,isBioPage=false,shape='',testimonialType='image', attachAudio='', attachVideo='',fileType='',html='',imgSrc=''}) => {
    const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
    const decodeHtmlEntities = (str,isBioPage='') => {
        var element = document.createElement('div');
        if (str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
        }

        if(isBioPage && shape === 'pipe'){
            return str && str.length > 20 ? str.substring(0, 20) + '...' : str
        }else if(isBioPage && shape === 'square'){
            return str && str.length > 250 ? str.substring(0, 250) + '...' : str
        }else if(isBioPage && shape === 'rectangle'){
            return str && str.length > 30 ? str.substring(0, 30) + '...' : str
        }
        else{
            return str && str.length > 150 ? str.substring(0, 150) + '...' : str
        }
    };


    const displayMedia = (media) => {
        if (!media) return null;

        return(
        <div className="tweet-image" style={{ width: '100%', position: 'relative' }}>
            <img src={media} alt={altInfo} className={"w-full"} />
        </div>
        )
    };

    const displayMediaType = (testimonialType,attachImage,attachAudio,attachVideo,fileType,html,imgSrc,) => {
        if(testimonialType === 'image' && attachImage){
        return(
            <div className="tweet-image" style={{ width: '100%', position: 'relative' }}>
                <img src={attachImage?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`)} alt={altInfo} className={"w-full"} 
                     onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src=`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                     }} />
            </div>
            )
        }
        if(testimonialType === 'video' && attachVideo){
        return(
            <ReactPlayer
                    url={attachVideo} 
                    playing={false}
                    controls={true}
                    width="100%"
                    height={showDetailsFull ? '450px' :'200px'}
            />
        )
        }
        
        if(testimonialType === 'audio' && fileType === 'url' && (html || imgSrc)){
        return(
            html ? <div dangerouslySetInnerHTML={{ __html: html }}/> :
            <div className={`overflow-hidden relative`}>
                        <img src={imgSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) || `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
                            alt={"curateit"} 
                            className='w-full object-cover block h-full moodboardImageEffect'
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src=`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                            }}
                        />

                        <div className="absolute top-[50%] left-[50%]" style={{transform: 'translate(-50%, -50%)'}}><PlayCircleIcon className="h-10 w-10 text-white"/></div>
            </div>
        )
        }
        if(testimonialType === 'audio' && (fileType === 'file' || fileType === 'record') && attachAudio){
        return(
            <div className={`${showDetailsFull ? 'w-full flex items-center justify-center' : 'w-full'} `}>
                <audio src={attachAudio} autoPlay={false} controls className={`${showDetailsFull ? 'w-[50%]' : 'w-full'} `}>
                    <source src={attachAudio} />
                </audio>
            </div>
        )
        }
    };

    const renderAppDetails = (icon, platform) => {
        return (
            <div className="flex items-center justify-center">
                <img src={icon} alt={platform} className="w-[20px] h-[20px]" />
            </div>
        )
    }

    const renderAppTextDetails = (platform, product, icon) => {
        return (
            (platform && product) 
                ? <div className='bg-[#e6e6e6] text-black text-xs py-[2px] px-[4px] rounded w-fit my-2 '>
                    {/* {!icon ? `${platform} - ${product}` : product}/ */}
                    {!icon ? `${product}` : product}

                  </div>
                :
                  <div className='bg-[#e6e6e6] text-black text-xs py-[2px] px-[4px] rounded w-fit my-2 '>
                    {product || platform}
                  </div>
        )
    }
    return(
        <>
        {
        !showDetailsFull &&
        <div 
        className={`cursor-pointer w-full`} 
        >
            <div 
            className={'flex items-center w-full'} 
            >
                <div className="post_avatar mr-4">
                <img src={avatar} alt={author} className="w-[40px] h-[40px] object-cover" />
                </div>

                <div className='flex items-center justify-between mb-1 w-full'>
                    <div>
                        <span>{decodeHtmlEntities(author)}</span>
                    </div>

                    {PLATFORMS_URLS[platform] && renderAppDetails(PLATFORMS_URLS[platform], platform)}
                </div>
               
            </div>
            <div className="flex items-center w-full">
                {renderAppTextDetails(platform, product, metaData?.testimonialIcon)}
            </div>
            <div className="flex items-center justify-between">
                {rating && <RatingComponent value={rating}/>}
                <div className="text-xs font-medium text-gray-500">{date}</div>
            </div>
            <div className="my-2 text-sm">
                <p>{decodeHtmlEntities(testimonial,isBioPage)}</p>
            </div>
            {displayMediaType(testimonialType,attachImage,attachAudio,attachVideo,fileType,html,imgSrc)}
        </div>
        }

        {
        showDetailsFull && 
        <div 
        className={`w-[50%] bg-white p-4 rounded-[5px] shadow-md my-2 border border-solid border-[#d9d9d9]`} 
        >
            <div 
            className={'flex items-center w-full'} 
            >
                <div className="post_avatar mr-4">
                    <img src={avatar} alt={author} className="w-[40px] h-[40px] object-cover" />
                </div>

                <div className='flex items-center justify-between mb-1 w-full'>
                    <div>
                        <span>{decodeHtmlEntities(author)}</span>
                    </div>
                    {(platform && product) ? <div className='bg-[#e6e6e6] text-black text-xs py-[2px] px-[4px] rounded w-fit my-2 '>
                    {platform} - {product}
                    </div>:
                    <div className='bg-[#e6e6e6] text-black text-xs py-[2px] px-[4px] rounded w-fit my-2 '>
                    {product || platform}
                    </div>}
                </div>
               
            </div>
            <div className="flex items-center justify-between">
                {rating && <RatingComponent value={rating}/>}
                <div className="text-xs font-medium text-gray-500">{date}</div>
            </div>
            <div className="my-2 text-sm">
                <p>{testimonial}</p>
            </div>
            {/* {displayMedia(attachImage)} */}
            {displayMediaType(testimonialType,attachImage,attachAudio,attachVideo,fileType,html,imgSrc,showDetailsFull)}
        </div>
        }
        </>
    )
}

export default TestimonialCard;