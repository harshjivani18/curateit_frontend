import "./SocialFeedInfoPanel.css"
import { Avatar, Card }                 from "antd"
import { BsCodeSlash }                  from "react-icons/bs" 
import { AiFillPushpin,
         AiOutlineFork,
         AiFillStar,
         AiFillGithub,
         AiOutlineStar,
         AiOutlineRetweet,
         AiOutlineLike,
         AiOutlineTag,
         AiOutlineRead }                from "react-icons/ai"
import { GiOpenPalm }                   from "react-icons/gi"
import { FaUsers,
         FaGlobeAmericas,
         FaComment }                    from "react-icons/fa"
import { IoLogoTiktok }                 from "react-icons/io5"
import { BiSolidTimer,
         BiUpvote,
         BiSolidUser }                  from "react-icons/bi"
import { SiSubstack }                   from "react-icons/si"
import { MdEmail,
         MdLocationPin,
         MdSystemUpdateAlt }            from "react-icons/md"
import { RiFacebookCircleFill,
         RiLinkedinBoxFill,
         RiInstagramLine,
         RiGithubFill,
         RiYoutubeFill,
         RiMediumFill,
         RiProductHuntFill,
         RiCake2Line, 
         RiTwitterXFill}                  from "react-icons/ri"
import { CgCalendarDates }              from "react-icons/cg"
import humanNumber                      from 'human-number';

const SocialFeedInfoPanel = ({ socialFeed, bookmark }) => {

    const decodeHtmlEntities = str => {
        var element = document.createElement('div');
        if (str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
        }
        return str && str.length > 150 ? str.substring(0, 150) + '...' : str
    };

    const displayShortenNumbers = number => {
        return humanNumber(number, n => {
            if (n > 0) {
                return Number.parseFloat(n).toFixed(0);
            }
            return n;
        });
    };

    const renderMoodboardCard = (obj) => {
        return (
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
                        <a href={obj?.link} target="_blank">
                            <div>
                                <span>{obj?.name}</span>
                            </div>
                        </a>

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
                            <p>{decodeHtmlEntities(obj?.description)}</p>
                        </div>
                        {/* {displayMedia(tweet.image)} */}
                        <div className='bg-[#e6e6e6] text-black text-xs py-[2px] px-[4px] rounded w-fit my-2 '>
                            {obj?.language}
                        </div>

                        <div className='flex items-center justify-between'>
                            <div className="tweet-actions">
                                <AiOutlineStar className='h-5 w-5 mr-1'/>
                                {displayShortenNumbers(obj?.stars || 0)}
                            </div>

                            <div className="tweet-actions">
                                <AiOutlineFork className='h-5 w-5 mr-1'/>
                                {displayShortenNumbers(obj?.forkCount || 0)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderPinnedUrls = (pinnedUrls) => {
        return (
            <div className="flex flex-col mt-10">
                <h3 className="flex flex-row text-xl font-bold mt-1"><AiFillPushpin className="mr-2"/> Pinned URLs</h3>
                {pinnedUrls.map((url, index) => {
                    return <Card className="mt-5">{renderMoodboardCard(url)}</Card>
                })}
            </div>
        )
    }

    const renderSocialLinks = (socialLinks) => {
        return Object.keys(socialLinks).map((key, index) => {
            switch(key) {
                case "Facebook":
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key]}>
                                <RiFacebookCircleFill className="h-5 w-5 text-blue-500" />
                           </a>
                case "Twitter":
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key]}>
                                <RiTwitterXFill className="h-5 w-5 text-blue-500" />
                           </a>
                case "Linkedin":
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key]}>
                                <RiLinkedinBoxFill className="h-5 w-5 text-blue-500" />
                           </a>
                case "Instagram":
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key]}>
                                <RiInstagramLine className="h-5 w-5 text-blue-500" />
                           </a>
                case "Github":
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key]}>
                                <RiGithubFill className="h-5 w-5 text-blue-500" />
                           </a>
                case "YouTube":
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key]}>
                                <RiYoutubeFill className="h-5 w-5 text-blue-500" />
                           </a>
                case "Tiktok":
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key]}>
                                <IoLogoTiktok className="h-5 w-5 text-blue-500" />
                           </a>
                case "Medium":
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key]}>
                                <RiMediumFill className="h-5 w-5 text-blue-500" />
                           </a>
                case "Producthunt":
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key]}>
                                <RiProductHuntFill className="h-5 w-5 text-blue-500" />
                           </a>
                case "Substack":
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key]}>
                            <SiSubstack className="h-5 w-5 text-blue-500" />
                           </a>
                default:
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key]}>
                            <FaGlobeAmericas className="h-5 w-5 text-blue-500" />
                           </a>
            }
        })
    }
    
    const renderProfile = () => {
        const name          = socialFeed?.display_name || socialFeed?.name || socialFeed?.screen_name || socialFeed?.title || ""
        const follwerString = socialFeed?.followers || socialFeed?.userFollowers 
        const followers     = follwerString?.split(" ")[0] || ""
        const profileUrl    = socialFeed?.profile_url || bookmark?.url
        return (
            <>
                <div className="flex flex-col items-center">
                    <Avatar
                        className="w-20 h-20"
                        src={socialFeed?.image || socialFeed?.profile_image_url || socialFeed?.socialUserObj?.image || socialFeed?.socialUserObj?.profile_image_url}
                        alt={name}
                        size={"large"}
                    >
                        {name?.charAt(0)?.toUpperCase() || ""}
                    </Avatar>
                    <h3 className="text-xl font-bold mt-1">{name}</h3>
                </div>

                {socialFeed?.socialLinks && <div className="flex flex-row items-center justify-evenly mt-5">
                    {socialFeed?.socialLinks && renderSocialLinks(socialFeed?.website ? { ...socialFeed.socialLinks, "Website": socialFeed?.website } : socialFeed?.socialLinks)}
                </div>}

                {socialFeed?.email && <div className="flex flex-row items-center justify-evenly mt-5">
                    {socialFeed?.email && <p className="flex flex-row font-bold info "><MdEmail className="text-blue-500 w-5 h-5 mr-2" /> {socialFeed?.email}</p>}
                </div>}
                
                {(socialFeed?.localTime || socialFeed?.location) && <div className="flex flex-row justify-between mt-5" >
                    {socialFeed?.localTime && <p className="flex flex-row font-bold info"><BiSolidTimer className="text-blue-500 w-5 h-5 mr-2" /> {socialFeed?.localTime}</p>}
                    {socialFeed?.location && <p className="flex flex-row font-bold info"><MdLocationPin className="text-blue-500 w-5 h-5 mr-2" /> {socialFeed?.location}</p>}
                </div>}

                {socialFeed?.description && <div className="flex flex-col mt-5" >
                    {socialFeed?.description && <p className="font-bold">{socialFeed?.description}</p>}
                </div>}

                {socialFeed?.company && <div className="mt-5">
                    {socialFeed?.company && <p className="info font-bold">{socialFeed?.company}</p>}
                </div>}

                {(socialFeed?.userGender || socialFeed?.userLocation) && <div className="flex flex-row justify-between mt-5 ">
                    {socialFeed?.userGender && <p className="info font-bold">{socialFeed?.userGender}</p>}
                    {socialFeed?.userLocation && <p className="info font-bold">{socialFeed?.userLocation}</p>}
                </div>}

                {socialFeed?.userTalksAbout && <div className="mt-5">
                    {socialFeed?.userTalksAbout && <p className="info font-bold">{socialFeed?.userTalksAbout}</p>}
                </div>}

                {socialFeed?.cake_day && <div className="flex flex-row mt-5">
                    {socialFeed?.cake_day && <p className="flex flex-row info font-bold"><RiCake2Line className="text-blue-500 w-5 h-5 mr-1" /> {socialFeed?.cake_day}</p>}
                </div>}

                {socialFeed?.karma && <div className="flex flex-row mt-5">
                    {socialFeed?.karma && <p className="flex flex-row info font-bold"><GiOpenPalm className="text-blue-500 w-5 h-5 mr-1" /> {socialFeed?.karma}</p>}
                </div>}

                {(socialFeed?.following || followers !== "") && <div className="flex flex-row justify-between mt-5">
                    {followers !== "" && <p className="info text-sm flex flex-row "><span className="count font-bold mr-1">{socialFeed?.followers?.replace("Followers","") || socialFeed?.userFollowers?.replace("undefined","")}</span> Followers </p>}
                    {socialFeed?.following && <p className="info text-sm flex flex-row "><span className="count font-bold mr-1">{socialFeed?.following}</span> Following </p>}
                </div>}

                {socialFeed?.userConnections && <div className="mt-5">
                    {socialFeed?.userConnections && <p className="info flex flex-row font-bold"><FaUsers className="text-blue-500 w-5 h-5 mr-2" /> {socialFeed?.userConnections?.replace("undefined","")}</p>}
                </div>}
                
                {socialFeed?.pinned && socialFeed?.pinned?.length > 0 && renderPinnedUrls(socialFeed?.pinned)}
                {profileUrl !== "" && <div className="flex flex-row justify-end mt-1">
                    <a href={profileUrl} target='_blank' rel="noreferrer" className='text-blue-500 hover:text-blue-600'>View Profile</a>
                </div>}
            </>
        )
    }

    const renderSocialFeed = () => {
        const name          = socialFeed?.display_name || socialFeed?.name || socialFeed?.screen_name || socialFeed?.socialUserObj?.display_name || socialFeed?.socialUserObj?.name || socialFeed?.socialUserObj?.screen_name || socialFeed?.socialUserObj?.title || ""
        const profileUrl    = socialFeed?.profile_url || ""
        const postUrl       = socialFeed?.postUrl || socialFeed?.tweetUrl || socialFeed?.post_url || socialFeed?.link || ""
        const comments      = socialFeed?.reply_count || socialFeed?.comments
        const date          = socialFeed?.date || socialFeed?.createdAt || socialFeed?.date_time || socialFeed?.postedOn
        const description   = socialFeed?.text || socialFeed?.fullText || socialFeed?.description

        return (
            <>
                <div className="flex flex-col items-center w-full">
                    <Avatar
                        className="w-20 h-20"
                        src={socialFeed?.socialUserObj?.image?.replace("resize:fill:30:30", "resize:fit:2400")?.replace("resize:fill:40:40", "resize:fit:2400") || socialFeed?.socialUserObj?.profile_image_url?.replace("resize:fill:30:30", "resize:fit:2400")?.replace("resize:fill:40:40", "resize:fit:2400")}
                        alt={name}
                        size={"large"}
                    >
                        <BiSolidUser className="icon"/>
                        {/* {name?.charAt(0)?.toUpperCase() || ""} */}
                    </Avatar>
                    <h3 className="text-xl font-bold mt-1">{name}</h3>
                </div>

                {socialFeed?.title && <div className="flex flex-col mt-5">
                    {socialFeed?.title && <p className="info font-bold">{socialFeed?.title}</p>}
                </div>}

                {description && <div className="flex flex-col mt-5">
                    {description && <p className="font-bold wrap-words">{description}</p>}
                </div>}

                {socialFeed?.media && <img
                        className="mt-5"
                        src={socialFeed?.media}
                        alt={bookmark?.attributes?.altInfo || socialFeed?.title || description || name}
                        size={"large"}
                    />}

                {socialFeed?.image && <img
                        className="mt-5"
                        src={socialFeed?.image}
                        alt={bookmark?.attributes?.altInfo || socialFeed?.title || description || name}
                        size={"large"}
                    />}

                {socialFeed?.medias && socialFeed?.medias.length !== 0 && <img
                        className="mt-5"
                        src={socialFeed?.medias[0].url}
                        alt={bookmark?.attributes?.altInfo || socialFeed?.title || description || name}
                        size={"large"}
                    />} 

                {date && <div className="flex flex-row mt-5">
                    {date && <p className="info font-bold flex flex-row"><CgCalendarDates className="text-blue-500 w-5 h-5 mr-2"/>  {date}</p>}
                </div>}

                {(socialFeed?.retweet_count || comments || socialFeed?.likeCount || socialFeed?.upvote || socialFeed.starCount || socialFeed.updated) &&<div className="flex flex-row justify-between mt-5 ">
                    {comments && <p className="flex flex-row info font-bold"><FaComment className="text-blue-500 w-5 h-5 mr-2"/>{comments}</p>}

                    {socialFeed?.retweet_count && <p className="flex flex-row info font-bold"><AiOutlineRetweet className="text-blue-500 w-5 h-5 mr-2"/>{socialFeed?.retweet_count}</p>}

                    {socialFeed?.likeCount && <p className="flex flex-row info font-bold"><AiOutlineLike className="text-blue-500 w-5 h-5 mr-2"/>{socialFeed?.likeCount}</p>}

                    {socialFeed?.upvote && <p className="flex flex-row info font-bold"><BiUpvote className="text-blue-500 w-5 h-5 mr-2"/>{socialFeed?.upvote}</p>}

                    {socialFeed.starCount && <p className="text-sm flex flex-row justify-end"><AiFillStar className="text-blue-500 w-5 h-5 mr-2"/> {socialFeed.starCount}</p>}

                    {socialFeed.updated && <p className="text-sm flex flex-row justify-end"><MdSystemUpdateAlt className="text-blue-500 w-5 h-5 mr-2"/> {socialFeed.updated}</p>}
                </div>}

                {(socialFeed?.postTag || socialFeed?.timeToRead) && <div className="flex flex-row justify-between mt-5">
                    {socialFeed?.postTag && <p className="info font-bold flex flex-row"><AiOutlineTag className="text-blue-500 w-5 h-5 mr-2"/>  {socialFeed?.postTag}</p>}
                    {socialFeed?.timeToRead && <p className="info font-bold flex flex-row"><AiOutlineRead className="text-blue-500 w-5 h-5 mr-2"/>  {socialFeed?.timeToRead}</p>}
                </div>}

                {(socialFeed?.programmingLanguage || socialFeed?.forkCount) && <div className="flex flex-row justify-between mt-2">
                    {socialFeed?.programmingLanguage && <p className="text-sm flex flex-row"><BsCodeSlash className="text-blue-500 w-5 h-5 mr-2"/> {socialFeed?.programmingLanguage}</p>}
                    {socialFeed?.forkCount && <p className="text-sm flex flex-row"><AiOutlineFork className="text-blue-500 w-5 h-5 mr-2"/> {socialFeed?.forkCount}</p>}
                </div>}

                {profileUrl !== "" && <div className="flex flex-row justify-end mt-1">
                    <a href={profileUrl} target='_blank' rel="noreferrer" className='text-blue-500 hover:text-blue-600'>View Profile</a>
                </div>}
                {postUrl !== "" && <div className="flex flex-row justify-end mt-1">
                    <a href={postUrl} target='_blank' rel="noreferrer" className='text-blue-500 hover:text-blue-600'>View Post</a>
                </div>}
            </>
        )
    }

    if (bookmark?.media_type === "Profile") return renderProfile()
    return <>
        {renderSocialFeed()}
    </>
}

export default SocialFeedInfoPanel