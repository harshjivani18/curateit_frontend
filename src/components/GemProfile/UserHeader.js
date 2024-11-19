'use client'

import React, { useState, useEffect, useRef } from 'react'
import UserBox from '../userBox/UserBox'
import { CheckIcon, GlobeAltIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { RiFileCopyLine } from "react-icons/ri"
import { PiArrowBendUpRightBold } from "react-icons/pi"
import SocialShare from '../socialShare/SocialShare'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Dropdown } from 'antd'
import session from '../../utils/session'
import { useDispatch } from 'react-redux'
import { Spin } from 'antd'
import { followUser, unfollowUser } from '../../actions/following'
import { getOtherUserDetails } from '../../actions/user'


function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
}

const UserHeader = ({ bookmark, editClicked, html, setReadArticle,permissions,gemPublicView }) => {
    const dispatch = useDispatch();
    const shareRef = useRef();

    const [showShare, setShowShare] = useState(false);
    const [showCopied, setShowCopied] = useState(false)
    const [userFollowers, setUserFollowers] = useState([]);
    const [followLoading, setfollowLoading] = useState(false);
    const [following, setFollowing]      = useState(false);

    useEffect(() => {
        if (bookmark?.attributes?.author?.data?.attributes?.username) {
            dispatch(getOtherUserDetails(bookmark?.attributes?.author?.data?.attributes?.username)).then(res => {
                if (res?.payload?.data?.status === 200) {
                    setUserFollowers(res?.payload?.data?.followerUsers);
                    if (res?.payload?.data?.followerUsers?.indexOf(parseInt(session.userId)) !== -1){
                        setFollowing(true);
                    }else{
                        setFollowing(false);
                    }
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFollow = async () => {
        setfollowLoading(true);
        const data = {
            hierarchyLevel: 'user',
            followerUserId: bookmark?.attributes?.author?.data?.id
        }
        dispatch(followUser(data)).then(res => {
            if (res?.payload?.status === 200) {
                setFollowing(true)
            }
            setfollowLoading(false);
        });
    }

    const handleUnfollow = async () => {
        setfollowLoading(true);
        const data = {
            hierarchyLevel: 'user',
            followerUserId: bookmark?.attributes?.author?.data?.id
        }
        dispatch(unfollowUser(data)).then(res => {
            if (res?.payload?.status === 200) {
                setFollowing(false);
            };
            setfollowLoading(false);
        });
    }

    const handleOpen = (flag) => {
        setShowShare(flag);
    };

    const handleCopy = () => {
        setShowCopied(true)
        setTimeout(() => {
            setShowCopied(false)
        }, 1000)
    }


    const openGemInNewWindow = () => {
        if (bookmark?.attributes?.url) {
            window.open(bookmark?.attributes?.url, "_blank");
        }
    }

    const dropdownnRenderUI = () => {
       return(
        <div className='bg-white z-50 p-3 rounded-lg shadow-lg border-[0.5px]'>
            <SocialShare gem={{ id: bookmark?.id, ...bookmark?.attributes }} 
            setShowShare={setShowShare} showCopied={showCopied}
            handleCopy={handleCopy} html={html}
            />
        </div>
       )
    }

    return (
        <div className='md:flex md:justify-between md:items-center mb-2'>
            <div className='flex justify-start items-center gap-4'>
                <UserBox user={bookmark?.attributes?.author?.data} userFollowers={userFollowers} gemPublicView={gemPublicView}/>
                {(session && bookmark?.attributes?.author?.data?.id?.toString() !== session?.userId?.toString()) && !gemPublicView &&
                <button className='bg-light-blue h-8 px-4 rounded-lg text-white font-500 relative' 
                    onClick={following ? handleUnfollow : handleFollow}
                >
                    {following ? 'Unfollow' : 'Follow'}
                    {followLoading && <div className='bg-blue-200 w-full h-full absolute left-0 top-0 rounded-lg flex justify-center items-center'>
                        <Spin size='small' />
                    </div>}
                    
                </button>}
            </div>
            <div className='flex mt-2 md:mt-0 justify-end items-center gap-2'>
                {bookmark?.attributes?.media_type === "Article" && <button onClick={() => setReadArticle(prev => !prev)} className='h-6 w-6 rounded-md bg-white shadow flex justify-center items-center'>
                    <img className="h-5 w-5" src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/play-button-outline.svg`} alt="play button icon" />
                </button>}
                
                {/* {bookmark?.attributes?.media_type === "Article" && <button onClick={readerView} className='w-7 h-7 border-[0.5px] border-gray-400 shadow flex justify-center items-center outline-none rounded-md'>
                    <BookOpenIcon className='w-4 h-5' />
                </button>} */}
                {session && bookmark?.attributes?.author?.data?.id?.toString() === session.userId?.toString() && <button onClick={editClicked} className='w-7 h-7 border-[0.5px] border-gray-400 shadow flex justify-center items-center outline-none rounded-md'>
                    <PencilSquareIcon className='w-4 h-5' />
                </button>}
                <button onClick={openGemInNewWindow} className='w-7 h-7 border-[0.5px] border-gray-400 shadow flex justify-center items-center outline-none rounded-md'>
                    <GlobeAltIcon className='w-4 h-5' />
                </button>
                <CopyToClipboard
                    text={bookmark?.attributes?.description}
                    onCopy={handleCopy}
                >
                    <div className='w-7 h-7 border-[0.5px] border-gray-400 shadow flex justify-center items-center outline-none rounded-md cursor-pointer relative'>
                        <RiFileCopyLine className='w-4 h-5' />
                        <div
                            className={classNames(
                                showCopied ? "" : "hidden",
                                "text-xs font-bold text-green-800 bg-green-400 absolute break-words text-center rounded-md p-1 -right-3 -top-7 flex justify-center items-center gap-1"
                            )}
                        >
                            <CheckIcon className="w-4 h-4" />
                            Copied
                        </div>
                    </div>
                </CopyToClipboard>
                {
                (!permissions || permissions?.gems?.canShare) ?  
                <Dropdown
                overlayStyle={{ width: '250px' }}
                trigger={['click']}
                dropdownRender={() => (dropdownnRenderUI())}
                onOpenChange={handleOpen}
                open={showShare}
                placement="bottomRight"
                >
                    <button className='px-3 h-8 shadow flex justify-center items-center outline-none rounded-md text-white bg-light-blue gap-2 relative'>
                    <PiArrowBendUpRightBold className='w-4 h-5' />
                    <span>Share</span>
                    {showShare && <div className='absolute top-8 right-0 bg-white z-50 p-3 rounded-lg shadow-lg border-[0.5px]' ref={shareRef}>
                        <SocialShare gem={{ id: bookmark?.id, ...bookmark?.attributes }} user={bookmark?.attributes?.author?.data?.attributes} />
                    </div>}
                </button>
                </Dropdown>
                :
                <div></div>
                }
            </div>
        </div>
    )
}

export default UserHeader