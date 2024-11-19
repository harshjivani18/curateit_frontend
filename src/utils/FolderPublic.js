import React                                from 'react'
// import * as ReactIcons                      from 'react-icons/ri';
import { Emoji, EmojiStyle }                from 'emoji-picker-react';
import { PiFolder, PiFolderNotchOpen } from "react-icons/pi";

const FolderPublic = (props) => {
    // const Icon          = props?.obj?.avatar && props?.obj?.avatar?.type === 'icon' &&  ReactIcons[props?.obj?.avatar?.icon]

    const renderDefaultIcon = () => (
        <div className="">
          <PiFolder className='h-5 w-5 text-[#74778B]' />
        </div>
      );

    //   const renderDefaultIconOpen = () => (
    //     <div className="">
    //      < PiFolderNotchOpen className='h-5 w-5 text-black' />
    //     </div>
    //   );

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
                                                <img className='w-[24px] h-[24px] rounded-lg' src={props?.obj?.avatar?.icon || ''} alt={props?.obj?.name || props?.obj?.description} />
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
                                                <span className="truncate font-normal text-sm text-[#4B4F5D] block mr-1" >{props.obj?.name}</span>
                                            </div>
                                        </div>
                                    </button>
                                    <span className="font-normal text-xs  text-[#74778B] py-[2px] px-[12px] rounded-[53px] border border-[#ABB7C9] h-fit" >{props.obj?.bookmarksCount || props.obj?.count || 0}</span>
                                </div>
                            </dt>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default FolderPublic