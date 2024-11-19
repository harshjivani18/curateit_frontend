import React                                from 'react'
import {
    RiTeamLine
}                                           from "react-icons/ri"
// import * as ReactIcons                      from 'react-icons/ri';
import { PencilSquareIcon }                 from '@heroicons/react/24/outline'
import { Emoji, EmojiStyle }                from 'emoji-picker-react';
import { getAllLevelCollectionPermissions } from '@utils/find-collection-id';
import { PiFolder, PiFolderSimpleUserBold } from 'react-icons/pi';

const Folder = (props) => {
    // const Icon          = props?.obj?.avatar && props?.obj?.avatar?.type === 'icon' &&  ReactIcons[props?.obj?.avatar?.icon]
    const permissions   = getAllLevelCollectionPermissions(props?.sharedCollections,Number(props?.obj?.id))

    const renderDefaultIcon = () => (
        <div className="">
          <PiFolder className='h-5 w-5 text-[#74778B]' />
        </div>
      );
    
    const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
    return (
        <div id={(props?.obj?.isFollowerCollection && props?.obj?.name === 'Curateit') ? 'curateit-c-id' : 'c-id'}>
            <div className="mx-auto w-full">
                <div className="mx-auto">
                    <dl className="space-y-2">
                        <div className='pt-1'>
                            <dt className="text-lg">
                                <div className='group relative flex'>
                                    <button className="truncate flex w-full items-center justify-start text-left text-gray-600 gap-2 folders"
                                    onClick={() => props.openCollection(props.obj)}
                                    >
                                        <div className='truncate flex justify-start items-center gap-1'>
                                            {/* {
                                                props?.obj?.avatar && props?.obj?.avatar?.type === 'icon' && <div className="">
                                                <Icon style={{fontSize:'20px'}}/>
                                                </div>
                                            } */}
                                            {
                                                props?.obj?.avatar && props?.obj?.avatar?.type === 'color' && <div className="">
                                                <div style={{height:'20px',width:'20px',borderRadius:'50%',background: props?.obj?.avatar?.icon || ''}}>
                                                </div>
                                                </div>
                                            }
                                            {
                                                props?.obj?.avatar && props?.obj?.avatar?.type === 'image' && <div className="">
                                                <img className='w-[24px] h-[24px] rounded-lg' src={props?.obj?.avatar?.icon?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/32x32_contain`) || ''} alt={props?.obj?.name || props?.obj?.description || "Curateit collection icon"} />
                                                </div>
                                            }
                                            {
                                                props?.obj?.avatar && props?.obj?.avatar?.type === 'emoji' && <div className="">
                                                <Emoji
                                                    unified={props?.obj?.avatar?.icon || ''}
                                                    emojiStyle={EmojiStyle.APPLE}
                                                    size={22}
                                                    />
                                                </div>
                                            }

                                            {!props?.obj?.avatar && renderDefaultIcon()}

                                            <div className='flex items-center truncate'>
                                                <span className="font-normal text-sm text-[#4B4F5D] block mr-1 truncate" >{props.obj?.name}</span>
                                                {permissions && <RiTeamLine className="font-medium text-sm text-gray-600 h-4 w-4"/>}
                                                {props.obj?.isFollowerCollection && <PiFolderSimpleUserBold className="font-medium text-sm text-gray-600 h-4 w-4"/>}
                                            </div>
                                        </div>
                                    </button>
                                    <span className="font-normal text-xs  text-[#74778B] py-[2px] px-[12px] rounded-[53px] border border-[#ABB7C9] group-hover:opacity-0 h-fit" >{props.obj?.gems_count || props?.obj?.bookmarks?.length || 0}</span>
                                    <div className='flex absolute top-0 right-0 items-center opacity-0 group-hover:opacity-100'>
                                        <button className='edit-btn' 
                                        onClick={() => props.editCollection(props.obj)}
                                        >
                                        {
                                        ((!permissions && props.obj?.name === 'Unfiltered') || 
                                        (!permissions && props.obj?.name === 'Curateit') || (permissions && permissions?.accessType === 'viewer') || props?.obj?.isFollowerCollection) ? '' : <PencilSquareIcon className='w-5 h-5 text-gray-400'  />
                                        } 
                                        
                                        </button>
                                        {/* <button className='share-btn' 
                                        onClick={() => props.shareCollection(props.obj)}
                                        >
                                            <ShareIcon className='w-5 h-5 text-gray-400'  />
                                        </button> */}
                                    </div> 
                                </div>
                            </dt>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default Folder