import { Avatar, Pagination, Spin } from "antd";
// import * as ReactIcons                      from 'react-icons/ri';
import { Emoji, EmojiStyle }                from 'emoji-picker-react';
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const ProfileSubCollectionComponent = ({data,loading,totalCount=0,handleOpenCollection,setSubCollectionPage=()=>{},subCollectionPage}) => {

    const BookmarkGem = ({gem}) => {
        const imgSrc = (gem?.metaData && gem?.metaData?.covers?.length !== 0) ? (gem?.metaData?.covers[0] || gem?.metaData?.app_screenshot) : ''

        const favSrc = (gem?.metaData && gem?.metaData.length !== 0) ?
            typeof gem?.metaData?.icon === 'string' ? gem?.metaData?.icon : (typeof gem?.metaData?.icon === 'object' &&  gem?.metaData?.icon?.type === 'image') ? gem?.metaData?.icon?.icon : 
            gem?.metaData?.defaultIcon ? gem?.metaData?.defaultIcon : '' : ''

        const mediaImgsrc = (gem?.media && gem?.media?.covers && gem?.media?.covers?.length !== 0) ? gem?.media?.covers[0] : ''
        
        const s3Src = (gem?.media_type === "Image" || gem?.media_type === "Screenshot") && (gem?.S3_link && gem?.S3_link?.length !== 0) ? gem?.S3_link[0]  : null
        const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
        return(
            <div key={gem?.id} className="ml-[-5px] z-100">
                <Avatar icon={<img src={favSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) || imgSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) || s3Src?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) || mediaImgsrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) || `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
                onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src=gem?.metaData?.fallbackURL ? gem?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                }}
                className="!object-scale-down"
                alt="Bookmark Gem"
                />}
                className="bg-[#E5F0FF] border border-[#78A6EC] border-solid"
                size={'small'}
                />
            </div>
        )
    }

    const BookmarkTag = ({tag}) => {
        return(
            <div className="text-zinc-600 text-xs font-medium rounded border border-[color:var(--greyscale-100,#DFE4EC)] bg-gray-100 justify-center p-2 border-solid" key={tag?.id}>
                {tag?.tag}
            </div>
        )
    }

    const CollectionIcon = ({item}) => {
        const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
        // if(item?.avatar?.type === 'icon'){
        //     const Icon = item?.avatar && item?.avatar?.type === 'icon' &&  ReactIcons[item?.avatar?.icon]
        //     return(
        //         <Icon style={{fontSize:'70px',color:'black'}}/>
        //     )
        // }

        if(item?.avatar?.type === 'emoji'){
            return(
                <Emoji
                    unified={item?.avatar?.icon || ''}
                    emojiStyle={EmojiStyle.APPLE}
                    size={70}
                />
            )
        }

        if(item?.avatar?.type === 'color'){
            return(
                <div style={{height:'70px',width:'70px',background: item?.avatar?.icon || ''}} className="rounded-full"></div>
            )
        }

        if(item?.avatar?.type === 'image'){
            return(
                <img src={item?.avatar?.icon?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/70x70_contain`)} className="object-cover rounded-full h-[70px] w-[70px]" alt="Collection image icon" />
            )
        }
    }

    const  getBackgroundStyle = (background,) =>{
        if (!background) {
            return '#bfdbfe';
        }

        switch (background.type) {
            case 'unsplash':
            case 'upload':
            return `url(${background.icon}) center /cover no-repeat`;
            case 'gallery':
            return `${background.icon}`;
            default:
            return '#bfdbfe';
        }
    }

    const handleLoadMore = (page) => {
        setSubCollectionPage(page)
    }

    if(loading){
        return(
            <div className="spinDiv">
                <Spin size='small' tip='Loading sub collections...'/>
            </div>
        )
    }
    
    return(
        <>
        {
        data?.length > 0 ? 
        <>
        <div className="grid-container-sub-collection px-3 pb-4">
            {
            data?.map(item => {
            return(
                <div className={`bg-blue-200 flex flex-col pt-12 rounded-xl border-solid relative cursor-pointer shadow-xl`} key={item?.id}
                style={{ 
                    background: getBackgroundStyle(item?.background),
                }} 
                onClick={() => handleOpenCollection(item)}
                >
                    <div className="bg-white flex w-full flex-col mt-6 pb-4 px-4 rounded-xl border-solid h-full relative">
                    <div className={`flex justify-between  gap-2 items-center ${item?.avatar && item?.avatar?.type ? 'mt-[-35px]' : 'mt-[-15px]'}`}>
                        {
                        item?.avatar && item?.avatar?.type ?
                            <CollectionIcon item={item}/>
                            :
                        <div className="h-[24px] w-[70px]"></div>
                        }

                        <div className="flex items-center">
                            {
                            item?.bookmarks?.length > 0 && item?.bookmarks?.map(gem => {
                            return(
                                <BookmarkGem gem={gem}/>
                            )
                            }).slice(0,5)
                            }
                        </div>
                    </div>

                    <div className="text-black text-xl font-medium my-2">
                        {item?.name}
                    </div>

                    <div className="text-slate-600 text-sm mt-1">
                        {
                        (item?.shortDescription && item?.shortDescription?.length > 100)
                            ? item?.shortDescription?.slice(0, 100)?.concat("...")
                            : (item?.shortDescription || '')
                        }
                    </div>

                    <div className="flex gap-2 mt-3 flex-wrap">
                        {
                        item?.tags && item?.tags?.length > 0 && item?.tags?.map(tag => {
                        return(
                            <BookmarkTag tag={tag}/>
                        )
                        }).slice(0,8)
                        }
                        
                    </div>

                    <div className={`flex items-center gap-2 text-sm text-blue-500 font-medium whitespace-nowrap mt-3`}>
                        <div className="">{item?.bookmarksCount} {item?.bookmarksCount === 0  ? 'gem' : 'gems'}</div>
                        <ArrowRightIcon className="h-4 w-4 text-blue-500"/>
                    </div>
                    </div>
                </div>
            )
            })
            }   
        </div>
        {totalCount > 20 && 
        <div className="px-3 mb-4">
        <Pagination  
            pageSize={20}
            showTotal={total => `Total ${total} items`}
            current={subCollectionPage} 
            total={totalCount} 
            onChange={handleLoadMore}
            showSizeChanger={false}
        />
        </div>
        }
        </>
        :
        <></>
        }
        </>
    )
}

export default ProfileSubCollectionComponent;