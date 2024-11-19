import { Emoji, EmojiStyle } from 'emoji-picker-react';
// import * as ReactIcons from 'react-icons/ri';

const FavIconComponent = ({data,renderingPlace='',defaultImgSrc='',isBlockPlace=false}) => {
    // const Icon = data  && data?.type === 'icon' && ReactIcons[data?.icon];
    const isFavIconImageString = typeof data === 'string' ? true : false
    return (
        <>
        {
        !renderingPlace &&
        <>
        {
        (isFavIconImageString && !renderingPlace && data) ?
        <img className={`${isBlockPlace ? 'w-[24px] h-[24px]' : 'w-[30px] h-[30px]'} rounded-[3px]`} src={data || defaultImgSrc} alt={"Curateit - Curate, Save, Search gems of web, 10x your productivity"} onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src=`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    }}/>
        : <></>
        }

        {
        (!isFavIconImageString && !renderingPlace && data) ?
        <div>
                <div className="relative">
                <div className='bg-white rounded-lg pointer text-center' 
                style={{height: (data && data?.type === 'image' && !isBlockPlace) ? '30px' : (data && data?.type === 'image' && isBlockPlace) ? '24px' : 'inherit',
                width: (data && data?.type === 'image' && !isBlockPlace) ? '30px' : (data && data?.type === 'image' && isBlockPlace) ? '24px' : ' inherit'}}>
                {/* img */}
                {data && data?.type === 'image' &&
                <>
                <img className={`${isBlockPlace ? 'w-[24px] h-[24px]' : 'w-[30px] h-[30px]'}  rounded-[3px]`} src={data?.icon || defaultImgSrc} alt={"Curateit - Curate, Save, Search gems of web, 10x your productivity"} onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src=`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    }}/>
                </>
                }

                {/* emoji */}
                {
                    data && data?.type === 'emoji'  && <div className="flex items-center justify-center">
                        <Emoji
                            unified={data?.icon || ''}
                            emojiStyle={EmojiStyle.APPLE}
                            size={22}
                            lazyLoad={true}
                        />
                    </div>
                }

                {
                    data && data?.type === 'color' && <div className="flex items-center justify-center">
                        <div style={{height:'20px',width:'20px',borderRadius:'50%',background: data?.icon || ''}}>
                        </div>
                    </div>
                }

                {/* {
                    data  && data?.type === 'icon' && <div className="flex items-center justify-center">
                    <Icon style={{fontSize:'20px'}}/>
                    </div>
                } */}
              </div>
              </div>
        </div>
        : <></>
        }
        </>
        }

        {
        renderingPlace === 'moodboard' &&
        <>
        {
        (isFavIconImageString  && data) ?
        <div className='bg-white rounded-[55px] pointer text-center flex items-center justify-center' 
                style={{
                height: '50px',
                width: '50px',
                border: '0.6px solid  #97A0B5',
                }}>
        <img className={`h-[40px] w-[40px] rounded-[50%]`} src={data || defaultImgSrc} alt={"Curateit - Curate, Save, Search gems of web, 10x your productivity"} onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src=`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    }}/>
        </div>
        : <></>
        }

        {
        (!isFavIconImageString && data) ?
        <div className='bg-white rounded-[55px] pointer text-center flex items-center justify-center' 
                style={{
                height: '50px',
                width: '50px',
                border: '0.6px solid  #97A0B5',
                }}>
                {/* img */}
                {data && data?.type === 'image' &&
                <>
                <img className={`h-[40px] w-[40px] rounded-[50%]`} src={data?.icon || defaultImgSrc} alt={"Curateit - Curate, Save, Search gems of web, 10x your productivity"} onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src=`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    }}/>
                </>
                }

                {/* emoji */}
                {
                    data && data?.type === 'emoji'  && <div className="flex items-center justify-center">
                        <Emoji
                            unified={data?.icon || ''}
                            emojiStyle={EmojiStyle.APPLE}
                            size={45}
                        />
                    </div>
                }

                {
                    data && data?.type === 'color' && <div className="flex items-center justify-center">
                        <div style={{height:'40px',width:'40px',borderRadius:'50%',background: data?.icon || ''}}>
                        </div>
                    </div>
                }

                {/* {
                    data  && data?.type === 'icon' && <div className="flex items-center justify-center">
                    <Icon style={{fontSize:'40px'}}/>
                    </div>
                } */}
        </div>
        : <></>
        }
        </>
        }

        {
        renderingPlace === 'listing' &&
        <>
        {
        (isFavIconImageString && data) ?
        <img className={`w-[24px] h-[24px] rounded-[3px]`} src={data || defaultImgSrc} alt={"Curateit - Curate, Save, Search gems of web, 10x your productivity"} onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src=`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    }}/>
        : <></>
        }

        {
        (!isFavIconImageString && data) ?
        <div>
                <div className="relative">
                <div className='bg-white rounded-lg pointer text-center' 
                style={{height: '24px',
                width: '24px'}}>
                {/* img */}
                {data && data?.type === 'image' &&
                <>
                <img className={`w-[24px] h-[24px] rounded-[3px]`} src={data?.icon || defaultImgSrc} alt={"Curateit - Curate, Save, Search gems of web, 10x your productivity"} onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src=`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    }}/>
                </>
                }

                {/* emoji */}
                {
                    data && data?.type === 'emoji'  && <div className="flex items-center justify-center">
                        <Emoji
                            unified={data?.icon || ''}
                            emojiStyle={EmojiStyle.APPLE}
                            size={22}
                        />
                    </div>
                }

                {
                    data && data?.type === 'color' && <div className="flex items-center justify-center">
                        <div style={{height:'20px',width:'20px',borderRadius:'50%',background: data?.icon || ''}}>
                        </div>
                    </div>
                }

                {/* {
                    data  && data?.type === 'icon' && <div className="flex items-center justify-center">
                    <Icon style={{fontSize:'20px'}}/>
                    </div>
                } */}
              </div>
              </div>
        </div>
        : <></>
        }
        </>
        }


        {
        renderingPlace === 'tag' &&
        <div className=''>
        {
        (isFavIconImageString && data) ?
        <img className={`w-[14px] h-[14px] rounded-[3px]`} src={data || defaultImgSrc} alt={"Curateit - Curate, Save, Search gems of web, 10x your productivity"} onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src=`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    }}/>
        : <></>
        }

        {
        (!isFavIconImageString && data) ?
        <div>
                <div className="relative">
                <div className='bg-white rounded-lg pointer text-center' 
                style={{height: '14px',
                width: '14px'}}>
                {/* img */}
                {data && data?.type === 'image' &&
                <>
                <img className={`w-[14px] h-[14px] rounded-[3px]`} src={data?.icon || defaultImgSrc} alt={"Curateit - Curate, Save, Search gems of web, 10x your productivity"} onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src=`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    }}/>
                </>
                }

                {/* emoji */}
                {
                    data && data?.type === 'emoji'  && <div className="flex items-center justify-center">
                        <Emoji
                            unified={data?.icon || ''}
                            emojiStyle={EmojiStyle.APPLE}
                            size={14}
                        />
                    </div>
                }

                {
                    data && data?.type === 'color' && <div className="flex items-center justify-center">
                        <div style={{height:'14px',width:'14px',borderRadius:'50%',background: data?.icon || ''}}>
                        </div>
                    </div>
                }

                {/* {
                    data  && data?.type === 'icon' && <div className="flex items-center justify-center">
                    <Icon style={{fontSize:'14px'}}/>
                    </div>
                } */}
              </div>
              </div>
        </div>
        : <></>
        }
        </div>
        }
        </>
    )
}

export default FavIconComponent;