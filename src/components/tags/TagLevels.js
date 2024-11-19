import { PencilSquareIcon }             from "@heroicons/react/24/outline"
import { getAllLevelCollectionPermissions } from "@utils/find-collection-id"
import { RiTeamLine } from "react-icons/ri"
// import * as ReactIcons from 'react-icons/ri';
import { Emoji, EmojiStyle }                from 'emoji-picker-react';

const TagLevels = (props) => {
    // const Icon          = props?.obj?.avatar && props?.obj?.avatar?.type === 'icon' &&  ReactIcons[props?.obj?.avatar?.icon]
    const permissions   = getAllLevelCollectionPermissions(props?.sharedTags,Number(props?.obj?.id))
    const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
    return (
        <div>
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
                                                <img className='w-[24px] h-[24px] rounded-lg' src={props?.obj?.avatar?.icon?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/24x24_contain`) || ''} alt={props?.obj?.name || props?.obj?.description} 
                                                     onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = props?.obj?.avatar?.icon;
                                                     }} />
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

                                            {
                                            props?.obj?.id === 'withoutTags' ? 
                                            <span className='font-normal text-sm' 
                                            style={{color:'rgb(75 85 99)'}}>#{props?.obj?.tag}</span>
                                            :
                                            <div className='flex items-center truncate'>
                                                <span className='truncate block font-normal text-sm' 
                                                style={{color: props.obj?.tagColor ? props.obj?.tagColor : 'rgb(75 85 99)'}}>{!props?.obj?.avatar && '#'}{props.obj?.tag}</span>
                                                {permissions && <RiTeamLine className="font-medium text-sm text-gray-600 h-4 w-4"/>}
                                            </div>
                                            }
                                        </div>
                                    </button>
                                    <span className="font-normal text-xs  text-[#74778B] py-[2px] px-[12px] rounded-[53px] border border-[#ABB7C9] group-hover:opacity-0 h-fit" >
                                        
                                        {
                                        props?.obj?.gems_count || props?.obj?.bookmarks?.length || 0
                                        }
                                        </span>
                                    <div className='flex absolute top-0 right-0 items-center opacity-0 group-hover:opacity-100'>
                                        {
                                           ((!permissions && props?.obj?.id === 'withoutTags') || (permissions && permissions?.accessType === 'viewer')) ? '' : <button className='edit-btn' 
                                        onClick={() => props.editCollection(props.obj)}
                                        >
                                        <PencilSquareIcon className='w-5 h-5 text-gray-400'  />
                                        </button> 
                                        }
                                       
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

export default TagLevels