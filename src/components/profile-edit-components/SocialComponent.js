"use client"
import { addGem, addImage, saveSocialProfileInCache } from "@actions/bookmark";
import { updateUser } from "@actions/user";
import { AtSymbolIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { rendeProfilePlatfromLogo } from "@utils/commonFunctions";
import { TextMessage } from "@utils/constants";
import session from "@utils/session";
import { Button, Input, message } from "antd";
import { useState } from "react";
// import { RiPinterestFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

const SocialComponent = ({ user = {}, isMobile = false }) => {
    const dispatch = useDispatch()
    const [socials, setSocials] = useState(user?.socialLinks || {});
    const [loadingSocial, setLoadingSocial] = useState(false)
    const [loadingBio, setLoadingBio] = useState(false)
    const [showBioBtn, setShowBioBtn] = useState(false)

    const getDescPayload = (title, mediaType,logo) => {
        const userId = session.userId
        const bioCollId = session.bio_collection_id
        const res = {
            "title": title,
            "description": "",
            "media_type": mediaType,
            "author": userId,
            "url": "",
            "metaData": {
                "type": mediaType,
                "title": "",
                "icon": logo,
                "defaultIcon": logo,
                "url": "",
                "covers": [
                    logo
                ]
            },
            "collection_gems": bioCollId,
            "remarks": "",
            "tags": [],
            "is_favourite": false,
            "expander": [],
            "price": "",
            "isRead": false,
            "media": {
                "covers": [
                    ""
                ],
                "shape": "square",
                "x": 4,
                "y": null,
                "notes": "",
                "color": {
                    "id": 4,
                    "border": "border-l-yellow-200",
                    "bg": "#FFFAB3",
                    "text": "text-yellow-200",
                    "colorCode": "#FFFAB3",
                    "className": "yellow-hl"
                },
                "text": title,
                "link": "",
                "collections": bioCollId,
                "tags": [],
                "type": mediaType,
                "_id": uuidv4(),
                "styleClassName": ""
            },
            "collections": bioCollId
        }
        return res
    }

    const getImagePayload = (title, mediaType, desc, imgUrl,logo) => {
        const userId = session.userId
        const bioCollId = session.bio_collection_id
        const res = {
            "title": title,
            "description": desc,
            "media_type": mediaType,
            "author": userId,
            "url": imgUrl,
            "metaData": {
                "type": mediaType,
                "title": title,
                "icon": logo,
                "defaultIcon": logo,
                "url": imgUrl,
                "covers": [
                    imgUrl
                ]
            },
            "collection_gems": bioCollId,
            "remarks": "",
            "tags": [],
            "is_favourite": false,
            "expander": [],
            "fileType": "url",
            "price": "",
            "isRead": false,
            "media": {
                "covers": [
                    ""
                ],
                "shape": "square",
                "x": 2,
                "y": null
            },
            "collections": bioCollId,
            "image": imgUrl
        }
        return res
    }

    async function iframelyRes(link) {
        const token = session.token;
        const iframelyApi = process.env.NEXT_PUBLIC_IFRAMELY_API_KEY;
        try {
            const response = await fetch(
                `https://cdn.iframe.ly/api/iframely/?url=${link}&api_key=${iframelyApi}&iframe=1&omit_script=1`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Replace with your actual token
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const res = await response.json();
            return res;
        } catch (error) {
            // console.log("error : ", error);
        }
    }

    const submitData = () => {
        setLoadingSocial(true)
        const data = {
            socialLinks: socials
        }


        dispatch(updateUser(data)).then((res) => {
            setLoadingSocial(false)
            message.success(TextMessage.PROFILE_SOCIAL_UPDATE)
            setShowBioBtn(true)
        }).catch((err) => {
            setLoadingSocial(false)
        })
    }

    const engagementScorePayload = (res) => {
        const url= res?.payload?.data?.data?.iframely?.url
        const platformLogo= res?.payload?.data?.data?.iframely?.links.icon[0].href || ""
        const engagementScore= res?.payload?.data?.data?.apify?.data?.profileData?.engagementScore
        const totalFollowers= res?.payload?.data?.data?.apify?.data?.profileData?.totalFollowers
        const subscriberCount= res?.payload?.data?.data?.apify?.data?.profileData?.subscriberCount
        const followers= res?.payload?.data?.data?.apify?.data?.profileData?.followers
        let score = engagementScore
        if(totalFollowers){
            score = engagementScore * 100 / totalFollowers
        }
        else if(subscriberCount){
            score = engagementScore * 100 / subscriberCount
        }
        else if(followers){
            score = engagementScore * 100 / followers
        }
        // const followers= res?.payload?.data?.data?.apify?.data?.profileData?.followers
        // const totalPosts= res?.payload?.data?.data?.apify?.data?.profileData?.totalPosts
        const desc= res?.payload?.data?.data?.iframely?.meta?.description

        const userId = session.userId
        const bioCollId = session.bio_collection_id
        const title = `Engagement Score : ${score}`
        const resp = {
            "title": title,
            "description": desc,
            "media_type": "Image",
            "author": userId,
            "url": url,
            "metaData": {
                "type": "Image",
                "title": title,
                "icon": platformLogo,
                "defaultIcon": platformLogo,
                "url": platformLogo,
                "covers": [
                    platformLogo
                ]
            },
            "collection_gems": bioCollId,
            "remarks": "",
            "tags": [],
            "is_favourite": false,
            "expander": [],
            "fileType": "url",
            "price": "",
            "isRead": false,
            "media": {
                "covers": [
                    ""
                ],
                "shape": "square",
                "x": 0,
                "y": null
            },
            "collections": bioCollId,
            "image": platformLogo
        }
        return resp
    }

    const [socialURLs, setSocialURLs] = useState({});
    const [descriptions, setDescriptions] = useState({});

    const generateSocialMediaURLs = (socials) => {
        const baseUrls = {
            "github": "https://github.com/",
            "medium": "",
            "tiktok": "https://www.tiktok.com/@",
            "twitter": "https://twitter.com/",
            "youtube": "https://www.youtube.com/c/",
            "facebook": "https://www.facebook.com/",
            "linkedin": "",
            "instagram": "https://www.instagram.com/",
            // Note: Telegram and WhatsApp do not have a simple URL scheme for user profiles.
        };

        const urls = {};
        for (const platform in socials) {
            if (socials[platform].username) {
                urls[platform] = baseUrls[platform] ? baseUrls[platform] + socials[platform].username : socials[platform].username;
            } else {
                urls[platform] = '';
            }
        }
        setSocialURLs(urls);
    };

    const addToBio = async (socialURLs) => {
        const newDescriptions = {};
        const newImgUrls = {};
        for (const platform in socialURLs) {
            const url = socialURLs[platform];
            if (url) {
                const res = await iframelyRes(url);
                // import description
                if (res && res.meta && res.meta.description) {
                    newDescriptions[platform] = res.meta.description;
                    const logo = res.links.icon[0].href || ""
                    const bioObject = getDescPayload(res.meta.description, "Quote", logo)
                    if(bioObject){
                        dispatch(addGem({ data: bioObject })).then((res) => {
                        setLoadingBio(false)
                    }).catch((err) => {
                        setLoadingBio(false)
                        console.error(err)
                    })
                    }
                }

                // import image
                if (res && res.links && res.links.thumbnail && res.links.thumbnail.length > 0 && res.links.thumbnail[0].href) {
                    newImgUrls[platform] = res.links.thumbnail[0].href;
                    const title=res?.meta?.description || ""
                    const description=res?.meta?.description || ""
                    const imgUrl=res?.links?.thumbnail[0]?.href || ""
                    const logo = res.links.icon[0].href || ""
                    const imgObject = getImagePayload(title, "Image", description, imgUrl,logo)
                    if(imgObject){
                        dispatch(addImage(imgObject, imgUrl)).then((res) => {
                            setLoadingBio(false)
                        }).catch((err) => {
                            setLoadingBio(false)
                        })
                    }
                } 

                // import engagement score
                const lowerCasePlatform = platform.toLowerCase();
                if (lowerCasePlatform === 'instagram' || lowerCasePlatform === 'tiktok' || lowerCasePlatform === 'youtube' || lowerCasePlatform === 'twitter') {
                    dispatch(saveSocialProfileInCache(url, true, socials[lowerCasePlatform].username, lowerCasePlatform)).then((res) => {
                        setLoadingBio(false)
            
                        const engagementObject = engagementScorePayload(res)
                        dispatch(addImage(engagementObject, engagementObject.metaData.icon)).then((res) => {
                            setLoadingBio(false)
                        }).catch((err) => {
                            setLoadingBio(false)
                        })
                    }).catch((err) => {
                        setLoadingBio(false)
                    })
                }
            }
        }
        setDescriptions(newDescriptions);
    };
    

    const importBioBtn = async () => {
        generateSocialMediaURLs(socials)
        message.success(TextMessage.BIO_IMPORT_WAITING)
        // dispatch(getUserDetails()).then((res) => {
        //     console.log(res);
        // }).catch((err) => {
        //     setLoadingSocial(false)
        // })
        addToBio(socialURLs)
    }

    const loginPinterest = async () => {
        // const redirectUri = `${window.location.hostname}/pinterestmiddleware`
        const redirectUri = `https://${window.location.hostname}/pinterestmiddleware`
        const clientId = process.env.NEXT_PUBLIC_PINTEREST_CLIENT_ID
        window.location.href = `https://www.pinterest.com/oauth/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=boards:read,pins:read&state=loggedin`;
    };

    return (
        <>
            {
                <div className={`flex flex-col gap-4 mt-4 ${isMobile ? 'px-4' : 'px-16'} `}>
                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("Twitter", socials?.twitter?.username)}
                        <Input
                            prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400" />}
                            className="ml-2 rounded-lg"
                            placeholder="twitter username"
                            value={socials?.twitter?.username}
                            size="large"
                            onChange={(e) => setSocials({ ...socials, twitter: { ...socials.twitter, username: e.target.value } })}
                        />
                    </div>

                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("LinkedIn", socials?.linkedin?.username)}
                        <Input
                            className="ml-2 rounded-lg"
                            placeholder="Linkedin profile url"
                            value={socials?.linkedin?.username}
                            onChange={(e) => setSocials({ ...socials, linkedin: { ...socials.linkedin, username: e.target.value } })}
                            size="large"
                        />
                    </div>

                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("Facebook", socials?.facebook?.username)}
                        <Input
                            prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400" />}
                            className="ml-2 rounded-lg"
                            placeholder="facebook username"
                            value={socials?.facebook?.username}
                            size="large"
                            onChange={(e) => setSocials({ ...socials, facebook: { ...socials.facebook, username: e.target.value } })}
                        />
                    </div>

                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("Instagram", socials?.instagram?.username)}
                        <Input
                            prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400" />}
                            className="ml-2 rounded-lg"
                            placeholder="Instagram username"
                            value={socials?.instagram?.username}
                            onChange={(e) => setSocials({ ...socials, instagram: { ...socials.instagram, username: e.target.value } })}
                            size="large"
                        />
                    </div>

                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("Github", socials?.github?.username)}
                        <Input
                            prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400" />}
                            className="ml-2 rounded-lg"
                            placeholder="Github username"
                            value={socials?.github?.username}
                            onChange={(e) => setSocials({ ...socials, github: { ...socials.github, username: e.target.value } })}
                            size="large"
                        />
                    </div>
                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("YouTube", socials?.youtube?.username)}
                        <Input
                            prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400" />}
                            className="ml-2 rounded-lg"
                            placeholder="Youtube channel"
                            value={socials?.youtube?.username}
                            onChange={(e) => setSocials({ ...socials, youtube: { ...socials.youtube, username: e.target.value } })}
                            size="large"
                        />
                    </div>

                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("Tiktok", socials?.tiktok?.username)}
                        <Input
                            prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400" />}
                            className="ml-2 rounded-lg"
                            placeholder="Tiktok username"
                            value={socials?.tiktok?.username}
                            onChange={(e) => setSocials({ ...socials, tiktok: { ...socials.tiktok, username: e.target.value } })}
                            size="large"
                        />
                    </div>

                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("Medium", socials?.medium?.username)}
                        <Input
                            className="ml-2 rounded-lg"
                            placeholder="Medium profile url"
                            value={socials?.medium?.username}
                            onChange={(e) => setSocials({ ...socials, medium: { ...socials.medium, username: e.target.value } })}
                            size="large"
                        />
                    </div>

                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("Producthunt", socials?.producthunt?.username)}
                        <Input
                            prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400" />}
                            className="ml-2 rounded-lg"
                            placeholder="Producthunt username"
                            value={socials?.producthunt?.username}
                            onChange={(e) => setSocials({ ...socials, producthunt: { ...socials.producthunt, username: e.target.value } })}
                            size="large"
                        />
                    </div>

                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("Substack", socials?.substack?.username)}
                        <Input
                            prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400" />}
                            className="ml-2 rounded-lg"
                            placeholder="Substack username"
                            value={socials?.substack?.username}
                            onChange={(e) => setSocials({ ...socials, substack: { ...socials.substack, username: e.target.value } })}
                            size="large"
                        />
                    </div>

                    {/* <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("Pinterest", socials?.pinterest?.username)}
                        <Input
                            prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400" />}
                            className="ml-2 rounded-lg"
                            placeholder="Pinterest username"
                            value={socials?.pinterest?.username}
                            onChange={(e) => setSocials({ ...socials, pinterest: { ...socials.pinterest, username: e.target.value } })}
                            size="large"
                        />
                    </div> */}

                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("Twitch", socials?.twitch?.username)}
                        <Input
                            prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400" />}
                            className="ml-2 rounded-lg"
                            placeholder="Twitch username"
                            value={socials?.twitch?.username}
                            onChange={(e) => setSocials({ ...socials, twitch: { ...socials.twitch, username: e.target.value } })}
                            size="large"
                        />
                    </div>

                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("Threads", socials?.threads?.username)}
                        <Input
                            prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400" />}
                            className="ml-2 rounded-lg"
                            placeholder="Threads username"
                            value={socials?.threads?.username}
                            onChange={(e) => setSocials({ ...socials, threads: { ...socials.threads, username: e.target.value } })}
                            size="large"
                        />
                    </div>

                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("Reddit", socials?.reddit?.username)}
                        <Input
                            prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400" />}
                            className="ml-2 rounded-lg"
                            placeholder="Reddit username"
                            value={socials?.reddit?.username}
                            onChange={(e) => setSocials({ ...socials, reddit: { ...socials.reddit, username: e.target.value } })}
                            size="large"
                        />
                    </div>

                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("Discord", socials?.discord?.username)}
                        <Input
                            prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400" />}
                            className="ml-2 rounded-lg"
                            placeholder="Discord username"
                            value={socials?.discord?.username}
                            onChange={(e) => setSocials({ ...socials, discord: { ...socials.discord, username: e.target.value } })}
                            size="large"
                        />
                    </div>

                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("Whatsapp", socials?.whatsapp?.username)}
                        <Input
                            prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400" />}
                            className="ml-2 rounded-lg"
                            placeholder="Whatsapp mobile number"
                            value={socials?.whatsapp?.username}
                            onChange={(e) => setSocials({ ...socials, whatsapp: { ...socials.whatsapp, username: e.target.value } })}
                            size="large"
                        />
                    </div>

                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("Telegram", socials?.telegram?.username)}
                        <Input
                            className="ml-2 rounded-lg"
                            placeholder="Telegram mobile number"
                            value={socials?.telegram?.username}
                            onChange={(e) => setSocials({ ...socials, telegram: { ...socials.telegram, username: e.target.value } })}
                            size="large"
                        />
                    </div>

                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("Gitlab", socials?.gitlab?.username)}
                        <Input
                            prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400" />}
                            className="ml-2 rounded-lg"
                            placeholder="Gitlab username"
                            value={socials?.gitlab?.username}
                            onChange={(e) => setSocials({ ...socials, gitlab: { ...socials.gitlab, username: e.target.value } })}
                            size="large"
                        />
                    </div>

                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("Tumblr", socials?.tumblr?.username)}
                        <Input
                            prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400" />}
                            className="ml-2 rounded-lg"
                            placeholder="Tumblr username"
                            value={socials?.tumblr?.username}
                            onChange={(e) => setSocials({ ...socials, tumblr: { ...socials.tumblr, username: e.target.value } })}
                            size="large"
                        />
                    </div>

                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("Steam", socials?.steam?.username)}
                        <Input
                            className="ml-2 rounded-lg"
                            placeholder="Steam profile url"
                            value={socials?.steam?.username}
                            onChange={(e) => setSocials({ ...socials, steam: { ...socials.steam, username: e.target.value } })}
                            size="large"
                        />
                    </div>

                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("Goodreads", socials?.goodreads?.username)}
                        <Input
                            className="ml-2 rounded-lg"
                            placeholder="Goodreads profile url"
                            value={socials?.goodreads?.username}
                            onChange={(e) => setSocials({ ...socials, goodreads: { ...socials.goodreads, username: e.target.value } })}
                            size="large"
                        />
                    </div>

                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("Mastodon", socials?.mastodon?.username)}
                        <Input
                            className="ml-2 rounded-lg"
                            placeholder="Mastodon profile url"
                            value={socials?.mastodon?.username}
                            onChange={(e) => setSocials({ ...socials, mastodon: { ...socials.mastodon, username: e.target.value } })}
                            size="large"
                        />
                    </div>

                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        {rendeProfilePlatfromLogo("Pinterest", socials?.pinterest?.username)}
                        <Input
                            prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400" />}
                            className="ml-2 rounded-lg"
                            placeholder="Pinterest username"
                            value={socials?.pinterest?.username}
                            onChange={(e) => setSocials({ ...socials, pinterest: { ...socials.pinterest, username: e.target.value } })}
                            size="large"
                        />
                    </div>

                    <div className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
                        <GlobeAltIcon className={`h-5 w-5 text-[#667085] cursor-pointer ${socials?.website?.username ? 'text-black' : 'text-gray-400'}`} />
                        <Input
                            className="ml-2 rounded-lg"
                            placeholder="Website"
                            value={socials?.website?.username}
                            onChange={(e) => setSocials({ ...socials, website: { ...socials.website, username: e.target.value } })}
                            // prefix={
                            //     <GlobeAltIcon className="h-5 w-5 text-[#667085] cursor-pointer" />
                            // }
                            size="large"
                        />
                    </div>

                    <div className={`flex justify-center items-center gap-4 ${isMobile ? 'mb-4' : ''}`}>
                        <Button type='primary' className={`${isMobile ? 'rounded-full w-[80%]' : 'rounded-md'}  bg-[#347AE2] hover:bg-[#347AE2] border-[#347AE2] hover:border-[#347AE2]`}
                            onClick={submitData}
                            disabled={loadingSocial}
                        >
                            {loadingSocial ? 'Loading...' : 'Update'}
                        </Button>
                        {showBioBtn &&
                            <Button type='primary' className={`${isMobile ? 'rounded-full w-[80%]' : 'rounded-md'}  bg-[#347AE2] hover:bg-[#347AE2] border-[#347AE2] hover:border-[#347AE2]`}
                                onClick={importBioBtn}
                                disabled={loadingBio}
                            >
                                {loadingBio ? 'Loading...' : 'Import in Bio'}
                            </Button>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default SocialComponent;