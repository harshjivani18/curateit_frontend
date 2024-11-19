import { LinkIcon } from '@heroicons/react/24/outline'
import { ImEmbed, } from 'react-icons/im'
import { message } from 'antd'
import { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton, PinterestIcon, PinterestShareButton, RedditIcon,  RedditShareButton,
} from 'react-share'
import slugify from "slugify";
import session from '@utils/session'

const SocialShare = ({ gem='', user='', isProfile = false, setShowShare = () =>{}, html = '',collectionUrl='',fromShareCollDrawer=false }) => {
    const [shareUrl, setShareUrl] = useState(isProfile 
        ? `${window.location.origin.toString()}/u/${user?.userName}` 
        : gem.media_type === "Blog" 
            ? session.isInternalUser ? `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${gem?.slug || (gem?.title ? slugify(gem?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g }) : "default")}?bid=${gem?.media?.blogId}` : `${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/${gem?.slug || (gem?.title ? slugify(gem?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g }) : "default")}?bid=${gem?.media?.blogId}`
            : `${window.location.origin.toString()}/u/${user?.username || user?.userName || gem?.author?.data?.attributes?.username ||''}/g/${gem?.id}/${gem?.slug || (gem?.title ? slugify(gem?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g }) : "default")}?public=true`);
    useEffect(() => {
        if(collectionUrl){
            setShareUrl(collectionUrl)
        }
        else if (isProfile) {
            setShareUrl(`${window.location.origin.toString()}/u/${user?.userName}`)
        }
        else if (gem.media_type === "Blog") {
            const blogSlug = `${gem?.slug || (gem?.title ? slugify(gem?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g }) : "default")}?bid=${gem?.media?.blogId}`
            let url        = `${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/${blogSlug}`
            if (session.isInternalUser === "true") {
                url        = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blogSlug}`
            }
            setShareUrl(url)
        } else {
            setShareUrl(`${window.location.origin.toString()}/u/${user?.username || user?.userName || gem?.author?.data?.attributes?.username ||''}/g/${gem?.id}/${gem?.slug || (gem.title ? slugify(gem.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g }) : "default")}?public=true`)
        }
    }, [user, gem, isProfile,collectionUrl])


    return (
        <div className={`bg-white w-full ${fromShareCollDrawer ? '' : 'h-full'}`}>
            {!fromShareCollDrawer && <h6 className='text-center mb-3 text-md font-semibold borderdsds-b-2'>Share</h6>}
            <div className={`grid grid-cols-4 ${fromShareCollDrawer ? 'gap-4' : 'w-[14rem] gap-2'} `}>
                <FacebookShareButton
                    // url={gem?.url}
                    url={encodeURI(shareUrl)}
                    quote={gem?.description}
                    className='flex flex-col justify-center items-center'
                >
                    <FacebookIcon size={36} round={true} />
                    <span className='text-[0.6rem]'>Facebook</span>
                </FacebookShareButton>
                <TwitterShareButton
                    // url={gem?.url}
                    // url={encodeURI(`${window.location.origin.toString()}/u/${user?.username}/g/${gem?.id}`)}
                    url={encodeURI(shareUrl)}
                    title={gem?.title}
                    summary={gem?.description}
                    className='flex flex-col justify-center items-center'
                >
                    <TwitterIcon size={36} round={true} />
                    <span className='text-[0.6rem]'>Twitter</span>
                </TwitterShareButton>
                <LinkedinShareButton
                    // url={gem?.url}
                    url={encodeURI(shareUrl)}
                    title={gem?.title}
                    summary={gem?.description}
                    className='flex flex-col justify-center items-center'
                >
                    <LinkedinIcon size={36} round={true} />
                    <span className='text-[0.6rem]'>Linkedin</span>
                </LinkedinShareButton>
                <WhatsappShareButton
                    // url={gem?.url}
                    url={encodeURI(shareUrl)}
                    title={gem?.title}
                    className='flex flex-col justify-center items-center'
                >
                    <WhatsappIcon size={36} round={true} />
                    <span className='text-[0.6rem]'>WhatsApp</span>
                </WhatsappShareButton>
                <RedditShareButton
                    url={encodeURI(shareUrl)}
                    title={gem?.title}
                    className='flex flex-col justify-center items-center'
                >
                    <RedditIcon size={36} round={true} />
                    <span className='text-[0.6rem]'>Reddit</span>
                </RedditShareButton>
                <PinterestShareButton
                    url={encodeURI(shareUrl)}
                    media={ gem?.media?.image || gem?.media?.covers || user?.profilePhoto ||  `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png` || '' }
                    description={gem?.description}
                    className='flex flex-col justify-center items-center'
                >
                    <PinterestIcon size={36} round={true} />
                    <span className='text-[0.6rem]'>Pinterest</span>
                </PinterestShareButton>
                <EmailShareButton
                    // url={gem?.url}
                    url={encodeURI(shareUrl)}
                    subject="Share with you"
                    body={`${gem?.title} ${gem?.description}. Visit page `}
                    className='flex flex-col justify-center items-center'
                >
                    <EmailIcon size={36} round={true} />
                    <span className='text-[0.6rem]'>Email Address</span>
                </EmailShareButton>
                <div className='flex justify-center items-center z-[9999]' onClick={(e) => e.stopPropagation()}>
                    {/* <CopyToClipboard text={encodeURI(shareUrl)} className="cursor-pointer" onCopy={() => {}}> */}
                    <CopyToClipboard text={encodeURI(shareUrl)} className="cursor-pointer"
                        onCopy={() => {
                            message.success('Link copied')
                            setShowShare(false)
                        }
                        }>
                        <div className='flex flex-col justify-center items-center'>
                            <div className='h-[2.2rem] w-[2.2rem] bg-gray-200 rounded-full flex justify-center items-center'>
                                <LinkIcon className='h-5 w-5 text-black' />
                            </div>
                            <span className='text-[0.6rem] leading-1'>Copy Link</span>
                        </div>
                    </CopyToClipboard>
                </div>

                {/* embed code copy */}
                {
                    html &&
                    <div className='flex justify-center items-center z-[9999]' onClick={(e) => e.stopPropagation()}>
                        <CopyToClipboard text={html} className="cursor-pointer"
                            onCopy={() => {
                                message.success('Embed code copied')
                                setShowShare(false)
                            }
                            }>
                            <div className='flex flex-col justify-center items-center'>
                                <div className='h-[2.2rem] w-[2.2rem] bg-gray-200 rounded-full flex justify-center items-center'>
                                    <ImEmbed className='h-5 w-5 text-black' />
                                </div>
                                <span className='text-[0.6rem] leading-1'>Embed</span>
                            </div>
                        </CopyToClipboard>
                    </div>
                }
            </div>
        </div>
    )
}

export default SocialShare