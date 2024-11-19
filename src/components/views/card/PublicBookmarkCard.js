import { Card, Checkbox, Avatar } from "antd";
import {
    PencilSquareIcon,
    EyeIcon, ArrowTopRightOnSquareIcon,XMarkIcon
} from '@heroicons/react/24/outline'
import { renderDetails, renderDetailsWithoutProperty } from "../../../utils/commonFunctions";
import { useNavigate } from "react-router-dom";
import session from "../../../utils/session";
import slugify from "slugify";
import { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom';
import { Resizable } from "re-resizable";
import GemEngagement from "@components/gemEngagement/GemEngagement";
import { useDispatch, useSelector } from "react-redux";
import { updateGem } from "@actions/collection";
import { setPreviousPathName } from "@actions/app";
import { usePathname, useSearchParams } from "next/navigation";
import ReactPlayer from "react-player";


const PublicBookmarkCard = ({ showEdit = false, items, propertyOrder, setOpenDrawer, setGemSingleIdSingleId, page = '', collectionName = '', setIsPreviewVisible, setPreviewBookmark, checkedBookmark, setCheckedBookmark, showComment, showAddToBookmark, user,shrink, setShrink,cardSize,openPagesIn, }) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [width, setWidth] = useState('40%');
    const [mobileScreen, setMobileScreen] = useState(false);
    const {isMobileView} = useSelector(state => state.app)
    const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env

    const openGemInWindow = (item) => {
        if(item?.media_type === 'Article' && !item?.isRead){
            const payload = {
                ...item,
                isRead: true
            }
           
            delete payload.id
            dispatch(updateGem(item.id, { data: payload }))
        }
        window.open(item?.url || '', "_blank");
    }

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 600) {
                setMobileScreen(true)
            } else {
                setMobileScreen(false)
            }
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleCheck = (e, item,) => {
        if (e.target.checked === true) {
            setCheckedBookmark((prev) => [...prev, item])
            return;
        }

        if (e.target.checked === false) {
            const filtered = checkedBookmark?.filter(data => data.id !== item.id)
            setCheckedBookmark(filtered)
            return
        }
    }

    const handlePreview = (e, item) => {
        e.stopPropagation();
        setIsPreviewVisible(true)
        setPreviewBookmark(item)
    }

    const renderCardImage = (imgSrc, favSrc, altInfo, item) => {
        if (item?.socialfeed_obj?.postType === "video") {
            return <ReactPlayer url={item?.socialfeed_obj?.image_url} controls={true} width="100%" height="150px" />
        }
        return imgSrc ?
                    <img alt={altInfo}
                        className={`object-scale-down h-[150px] max-w-[100%] object-center`}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src     = item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                        }}  
                        src={imgSrc ? imgSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
                    />
                    : <img alt={altInfo}
                        className={` object-scale-down h-[150px]`}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src     = item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                        }}
                        src={favSrc ? favSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
                    />
    }

    const renderProfileCardImg = (imgSrc, favSrc) => {
        const src = imgSrc ? imgSrc : favSrc ? favSrc : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
        return <div className="flex items-center justify-center mt-2"><Avatar src={typeof src === 'string' ? src.replace("resize:fill:24:24", "resize:fit:2400")?.replace("resize:fill:40:40", "resize:fit:2400") : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`} size={100} /></div>
    }

    const handleOpenGem = (e, item) => {
        const queryString = new URLSearchParams(searchParams).toString();
        const url = `${pathname}${queryString ? `?${queryString}` : ''}`;
        dispatch(setPreviousPathName(url))
        if(openPagesIn === 'full page'){
            e.stopPropagation();
            navigate(`/u/${item?.author?.username || 'default'}/g/${item.id}/${item?.slug || (item.title ? slugify(item.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g }) : "default")}`)
            return;
        }
        if(openPagesIn === 'side peek'){
            e.stopPropagation()
            setShrink(true)
            if(page === 'bookmark'){
                navigate(`/u/${item?.author?.username || 'default'}/${item.id}`)
                return
            }
        }
    }

    const handleNavigate = (item) => {
        navigate(`/u/${session.username}/c/${item?.collection_gems?.id}/${item?.collection_gems?.slug || slugify(item?.collection_gems?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}`)
    }

    const handleNavigateMediaType = (item) => {
        navigate(`/u/${session.username}/filters/${slugify(item.media_type || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}?type=${item.media_type}`)
    }

    const handleResetShrink = (e) => {
        e.stopPropagation()
        setShrink(false)
    }

    return (
        <>
            {
                page === 'bookmark' &&
                <>
                {
                    shrink ? 
                    <>
                    <div className="flex flex-col-reverse md:flex md:flex-row">
                        <Resizable
                            className="!h-[100vh] !overflow-y-scroll overflow-x-hidden"
                            size={{ width: mobileScreen ? "100%" : width }}
                            onResizeStop={(e, direction, ref, d) => {
                                setWidth(ref.style.width);
                            }}
                            enable={{
                                top: false,
                                bottom: false,
                                topRight: false,
                                bottomRight: false,
                                bottomLeft: false,
                                topLeft: false,
                                right: true,
                                left: false,
                            }}
                        >
                            <div className={`pr-2 ${cardSize === "medium"
                    ? "grid-container"
                    : cardSize === "large"
                      ? "grid-container-large"
                      : "grid-container-small"}`}>
                            {
                            (items && items.length > 0) ?
                                items
                                    .map((item, i) => {
                                        const imgSrc = (item?.metaData && item?.metaData?.covers?.length !== 0) ? (item?.metaData?.covers?.[0] || item?.metaData?.app_screenshot) : ''
                                        const favSrc = (item?.metaData && item?.metaData.length !== 0) ?
                                typeof item?.metaData?.icon === 'string' ?
                                item?.metaData?.icon
                                : (typeof item?.metaData?.icon === 'object' &&  item?.metaData?.icon?.type === 'image') ? item?.metaData?.icon?.icon : 
                                item?.metaData?.defaultIcon ? item?.metaData?.defaultIcon : '' : ''
                                        return (
                                            <Card
                                                cover={item?.media_type === "Profile" ? renderProfileCardImg(imgSrc, favSrc) : renderCardImage(imgSrc, favSrc, item?.altInfo || item?.title || item?.description || "", item)}
                                                key={i}
                                                className={'border-1 border-solid border-[#DADEE8] group hover:border-2 relative'}
                                                style={{
                                                    height: '100%', cursor: 'pointer',
                                                    background: checkedBookmark?.some(data => data.id === item.id) ? '#E7F2FB' : 'inherit',
                                                    color: checkedBookmark?.some(data => data.id === item.id) ? 'black' : 'inherit'
                                                }}
                                                onClick={(e) => handleOpenGem(e, item)}
                                            >
                                                <div
                                                    style={{
                                                        background: checkedBookmark?.some(data => data.id === item.id) ? 'rgba(231,242,251,0.1)' : '',
                                                    }}
                                                    className={`p-1 absolute top-0 left-0 flex justify-between h-full w-full ${isMobileView ? 'opacity-100' : 'opacity-0'} ${!isMobileView && 'transition-opacity  group-hover:opacity-100 group-hover:shadow-xl shadow-gray-700'}`}>

                                                    <div className="checkDiv">
                                                        <Checkbox
                                                            onChange={(e) => handleCheck(e, item)} onClick={e => e.stopPropagation()}
                                                            checked={checkedBookmark?.some(data => data.id === item.id)}
                                                        />
                                                    </div>

                                                    <div className="flex">

                                                        <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Open in new tab"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openGemInWindow(item)
                                                            }}
                                                        >
                                                            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                                                        </div>

                                                        <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 mx-2" title="Preview" onClick={(e) => handleOpenGem(e, item)}>
                                                            <EyeIcon className="h-5 w-5" />
                                                        </div>

                                                        <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Edit"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setOpenDrawer(true)
                                                                setGemSingleIdSingleId(item.id)
                                                            }}>
                                                            <PencilSquareIcon className="h-5 w-5" />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className='flex flex-col py-1 mb-1'>
                                                    {renderDetails(propertyOrder || [], item, '', page, handleNavigate, handleNavigateMediaType)}
                                                </div>

                                                <div className={`mt-2 border-t-2 p-2 z-50 absolute bottom-0 w-full left-0 ${Number(session.userId) === item?.author?.id ? 'hidden group-hover:block' : 'block'}`}>
                                                    <GemEngagement gem={item}
                                                        showBookmark={Number(session.userId) !== item?.author?.id}
                                                        showComment={showComment}
                                                        user={user}
                                                    />
                                                </div>
                                            </Card>
                                        )
                                    })
                                :

                                <p>No Bookmarks</p>
                        }
                            </div>
                        </Resizable>

                        <div
                        className={`h-full  ${mobileScreen && 'mb-4'}`}
                        style={{ width: mobileScreen ? '100%' : `calc(100% - ${width})` }}
                        >
                            <div className="mb-2 ml-1" 
                            style={{borderBottomColor:'#d9d9d9',borderBottomStyle:'solid',borderBottomWidth:'1px'}}>
                                <div className="p-2 w-fit hover:bg-[#f2f2f2] hover:rounded-[2px]">
                                    <XMarkIcon className="cursor-pointer h-5 w-5" onClick={handleResetShrink}/>
                                </div>
                            </div>
                            <Outlet context={'inboxView'} />
                        </div>
                    </div>
                    </>
                    : 
                    (items && items.length > 0) ?
                        items
                        .map((item, i) => {
                                    const imgSrc = (item?.metaData && item?.metaData?.covers?.length !== 0) ? (item?.metaData?.covers?.[0] || item?.metaData?.app_screenshot) : ''
                                    const favSrc = (item?.metaData && item?.metaData.length !== 0) ?
                                typeof item?.metaData?.icon === 'string' ?
                                item?.metaData?.icon
                                : (typeof item?.metaData?.icon === 'object' &&  item?.metaData?.icon?.type === 'image') ? item?.metaData?.icon?.icon : 
                                item?.metaData?.defaultIcon ? item?.metaData?.defaultIcon : '' : ''
                                    return (
                                        <Card
                                            cover={item?.media_type === "Profile" ? renderProfileCardImg(imgSrc, favSrc) : renderCardImage(imgSrc, favSrc, item?.altInfo || item?.title || item?.description || "", item)}
                                            key={i}
                                            className={'border-1 border-solid border-[#DADEE8] group hover:border-2 relative'}
                                            style={{
                                                height: '100%', cursor: 'pointer',
                                                background: checkedBookmark?.some(data => data.id === item.id) ? '#E7F2FB' : 'inherit',
                                                color: checkedBookmark?.some(data => data.id === item.id) ? 'black' : 'inherit'
                                            }}
                                            onClick={(e) => handleOpenGem(e, item)}
                                        >
                                            <div
                                                style={{
                                                    background: checkedBookmark?.some(data => data.id === item.id) ? 'rgba(231,242,251,0.1)' : '',
                                                }}
                                                className={`p-1 absolute top-0 left-0 flex justify-between h-full w-full ${isMobileView ? 'opacity-100' : 'opacity-0'} ${!isMobileView && 'transition-opacity  group-hover:opacity-100 group-hover:shadow-xl shadow-gray-700'}`}>

                                                <div className="checkDiv">
                                                    <Checkbox
                                                        onChange={(e) => handleCheck(e, item)} onClick={e => e.stopPropagation()}
                                                        checked={checkedBookmark?.some(data => data.id === item.id)}
                                                    />
                                                </div>

                                                <div className="flex">

                                                    <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Open in new tab"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openGemInWindow(item)
                                                        }}
                                                    >
                                                        <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                                                    </div>

                                                    <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 mx-2" title="Preview" onClick={(e) => handleOpenGem(e, item)}>
                                                        <EyeIcon className="h-5 w-5" />
                                                    </div>

                                                    <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Edit"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setOpenDrawer(true)
                                                            setGemSingleIdSingleId(item.id)
                                                        }}>
                                                        <PencilSquareIcon className="h-5 w-5" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='flex flex-col py-1 mb-1'>
                                                {renderDetails(propertyOrder || [], item, '', page, handleNavigate, handleNavigateMediaType)}
                                            </div>

                                            <div className={`mt-2 border-t-2 p-2 z-50 absolute bottom-0 w-full left-0 ${Number(session.userId) === item?.author?.id ? 'hidden group-hover:block' : 'block'}`}>
                                                    <GemEngagement gem={item}
                                                        showBookmark={Number(session.userId) !== item?.author?.id}
                                                        showComment={showComment}
                                                        user={user}
                                                    />
                                                </div>
                                        </Card>
                                    )
                        })
                        :
                    <p>No Bookmarks</p>
                    }
                </>
            }

            {
                page === 'random-bookmark' &&
                <>
                    {
                        (items && items.length > 0) ?
                            items
                                .map((item, i) => {
                                    const imgSrc = (item?.metaData && item?.metaData?.covers?.length !== 0) ? item?.metaData?.covers[0] : ''
                                    const favSrc = (item?.metaData && item?.metaData.length !== 0) ?
                                typeof item?.metaData?.icon === 'string' ?
                                item?.metaData?.icon
                                : (typeof item?.metaData?.icon === 'object' &&  item?.metaData?.icon?.type === 'image') ? item?.metaData?.icon?.icon : 
                                item?.metaData?.defaultIcon ? item?.metaData?.defaultIcon : '' : ''
                                    const mediaImgsrc = (item?.media && item?.media?.covers && item?.media?.covers?.length !== 0) ? item?.media?.covers[0] : ''
                                    return (
                                        <Card
                                            cover={item?.media_type === "Profile" ? renderProfileCardImg(imgSrc, favSrc) : renderCardImage(imgSrc || mediaImgsrc, favSrc, item?.altInfo || item?.title || item?.description || "", item)} 

                                            key={i}
                                            className={'border-1 border-solid border-[#DADEE8] group'}
                                            style={{
                                                height: '100%',
                                                background: checkedBookmark?.some(data => data.id === item.id) ? '#E7F2FB' : 'inherit',
                                                color: checkedBookmark?.some(data => data.id === item.id) ? 'black' : 'inherit'
                                            }}
                                        >
                                            <div
                                                style={{
                                                    background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(255, 255, 255,0.1))',
                                                }}
                                                className={`p-1 absolute top-0 left-0 flex flex-col justify-between w-full opacity-0 transition-opacity  group-hover:opacity-100 `}>
                                                <div className="flex justify-between">
                                                    <div>
                                                        {showEdit && <Checkbox
                                                            onChange={(e) => handleCheck(e, item)} onClick={e => e.stopPropagation()}
                                                            checked={checkedBookmark?.some(data => data.id === item.id)}
                                                        />}
                                                    </div>

                                                    <div className="flex">

                                                        <div className="cursor-pointer bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Open in new tab"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openGemInWindow(item)
                                                            }}
                                                        >
                                                            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                                                        </div>

                                                        <div className="cursor-pointer bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 mx-2" title="Preview" onClick={(e) => handlePreview(e, item)}>
                                                            <EyeIcon className="h-5 w-5" />
                                                        </div>

                                                        {showEdit && <div className="cursor-pointer bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Edit"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setOpenDrawer(true)
                                                                setGemSingleIdSingleId(item.id)
                                                            }}>
                                                            <PencilSquareIcon className="h-5 w-5" />
                                                        </div>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className='flex flex-col cursor-pointer'
                                                // onClick={() => navigate(`/u/${user?.userName ? user?.userName : user?.username}/gems/${item.id}`)}
                                                onClick={() => navigate(`/u/${user.username}/g/${item.id}/${item?.slug || slugify(item.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}`)}
                                            >
                                                {renderDetails(propertyOrder, item, null, true)}
                                            </div>
                                            <div className="mt-2 border-t-2 pt-2">
                                                <GemEngagement gem={item} user={user} showBookmark={!showEdit} showComment={showComment} showAddToBookmark={showAddToBookmark} />
                                            </div>
                                        </Card>

                                    )
                                })
                            :

                            <p>No Bookmarks</p>
                    }
                </>
            }





            {
                page === 'collection' &&
                <>
                    {
                        (items && items.length > 0) ?
                            items
                                .map((item, i) => {
                                    const imgSrc = (item?.metaData && item?.metaData?.covers?.length !== 0) ? (item?.metaData?.covers?.[0] || item?.metaData?.app_screenshot) : ''
                                    const favSrc = (item?.metaData && item?.metaData.length !== 0) ? item?.metaData?.icon : ''
                                    const mediaImgsrc = (item?.media && item?.media?.covers && item?.media?.covers?.length !== 0) ? item?.media?.covers[0] : ''
                                    return (
                                        <Card
                                            cover={item?.media_type === "Profile" ? renderProfileCardImg(imgSrc, favSrc) : renderCardImage(imgSrc || mediaImgsrc, favSrc, item?.altInfo || item?.title || item?.description || "", item)}

                                            key={i}
                                            className={'w-[250px] sm:w-[300px] border-1 border-solid border-[#DADEE8] group'}
                                            style={{
                                                height: '100%', cursor: 'pointer',
                                                background: checkedBookmark?.some(data => data.id === item.id) ? '#E7F2FB' : 'inherit',
                                                color: checkedBookmark?.some(data => data.id === item.id) ? 'black' : 'inherit'
                                            }}
                                            onClick={() => {
                                                setOpenDrawer(true)
                                                setGemSingleIdSingleId(item.id)
                                            }}
                                        >

                                            {/* hover icons */}
                                            <div
                                                style={{
                                                    background: checkedBookmark?.some(data => data.id === item.id) ? 'rgba(231,242,251,0.1)' : 'linear-gradient(180deg, rgba(55, 68, 92, 0.198) 0%, rgba(55, 68, 92, 0.55) 100%)',
                                                }}
                                                className={`p-1 absolute top-0 left-0 flex justify-between h-full w-full opacity-0 transition-opacity  group-hover:opacity-100 `}>

                                                <div>
                                                    <Checkbox
                                                        onChange={(e) => handleCheck(e, item)} onClick={e => e.stopPropagation()}
                                                        checked={checkedBookmark?.some(data => data.id === item.id)}
                                                    />
                                                </div>

                                                <div className="flex">

                                                    <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Open in new tab"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openGemInWindow(item)
                                                        }}
                                                    >
                                                        <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                                                    </div>

                                                    <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 mx-2" title="Preview" onClick={(e) => handlePreview(e, item)}>
                                                        <EyeIcon className="h-5 w-5" />
                                                    </div>

                                                    <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Edit"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setOpenDrawer(true)
                                                            setGemSingleIdSingleId(item.id)
                                                        }}>
                                                        <PencilSquareIcon className="h-5 w-5" />
                                                    </div>
                                                </div>

                                            </div>

                                            <div className='flex flex-col'>
                                                {renderDetails(propertyOrder, item, collectionName)}
                                            </div>
                                        </Card>
                                    )
                                })

                            :

                            <p>No Bookmarks</p>
                    }
                </>
            }

            {
                (page === 'broken-duplicate' || page === 'filter') &&
                <>
                    {
                        (items && items.length > 0) ?
                            items
                                .map((item, i) => {
                                    const imgSrc = (item?.metaData && item?.metaData?.covers?.length !== 0) ? (item?.metaData?.covers?.[0] || item?.metaData?.app_screenshot) : ''
                                    const favSrc = (item?.metaData && item?.metaData.length !== 0) ? item?.metaData?.icon : ''
                                    const mediaImgsrc = (item?.media && item?.media?.covers && item?.media?.covers?.length !== 0) ? item?.media?.covers[0] : ''
                                    return (
                                        <Card
                                            cover={item?.media_type === "Profile" ? renderProfileCardImg(imgSrc, favSrc) : renderCardImage(imgSrc || mediaImgsrc, favSrc, item?.altInfo || item?.title || item?.description || "", item)}

                                            key={i}
                                            className={'w-[250px] sm:w-[300px] border-1 border-solid border-[#DADEE8] group'}
                                            style={{
                                                height: '100%', cursor: 'pointer',
                                                background: checkedBookmark?.some(data => data.id === item.id) ? '#E7F2FB' : 'inherit',
                                                color: checkedBookmark?.some(data => data.id === item.id) ? 'black' : 'inherit'
                                            }}
                                            onClick={() => {
                                                setOpenDrawer(true)
                                                setGemSingleIdSingleId(item.id)
                                            }}
                                        >

                                            {/* hover icons */}
                                            <div
                                                style={{
                                                    background: checkedBookmark?.some(data => data.id === item.id) ? 'rgba(231,242,251,0.1)' : 'linear-gradient(180deg, rgba(55, 68, 92, 0.198) 0%, rgba(55, 68, 92, 0.55) 100%)',
                                                }}
                                                className={`p-1 absolute top-0 left-0 flex justify-between h-full w-full opacity-0 transition-opacity  group-hover:opacity-100 `}>

                                                <div>
                                                    <Checkbox
                                                        onChange={(e) => handleCheck(e, item)} onClick={e => e.stopPropagation()}
                                                        checked={checkedBookmark?.some(data => data.id === item.id)}
                                                    />
                                                </div>

                                                <div className="flex">

                                                    <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Open in new tab"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openGemInWindow(item)
                                                        }}
                                                    >
                                                        <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                                                    </div>

                                                    <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 mx-2" title="Preview" onClick={(e) => handlePreview(e, item)}>
                                                        <EyeIcon className="h-5 w-5" />
                                                    </div>

                                                    <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Edit"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setOpenDrawer(true)
                                                            setGemSingleIdSingleId(item.id)
                                                        }}>
                                                        <PencilSquareIcon className="h-5 w-5" />
                                                    </div>
                                                </div>

                                            </div>

                                            <div className='flex flex-col'>
                                                {renderDetailsWithoutProperty(item)}
                                            </div>
                                        </Card>
                                    )
                                })
                            :

                            <p>No Bookmarks</p>
                    }
                </>
            }
        </>
    )

}

export default PublicBookmarkCard;