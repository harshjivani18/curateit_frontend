import { ArrowTopRightOnSquareIcon, GlobeAltIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import { Tooltip, Checkbox } from "antd"
import { useEffect, useRef, useState } from "react";
import { getFilteredData, renderDetails } from "../../../utils/commonFunctions";
import GemEngagement from "../../gemEngagement/GemEngagement";
import { sidebarMenuClicked } from "../../../actions/app";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Outlet } from 'react-router-dom';
import { Resizable } from 're-resizable';
import session from "../../../utils/session";
import slugify from "slugify";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../loader/Loader"
import { getAllBookmarksByAmount, getBookmarkByFiltersAndAmount } from "../../../actions/bookmark";
import { getBookmarkInCollectionsByAmount } from "../../../actions/collection";
import { getDuplicateLinksByAmount } from "../../../actions/broken-duplicate";

const InboxView = ({ page, items, propertyOrder, totalCount, collectionName, setOpenDrawer, setGemSingleIdSingleId, setIsPreviewVisible, setPreviewBookmark, checkedBookmark, setCheckedBookmark, showComment, collectionId = '', type = '', tagId = '', tagName = "", handleLayout = '', user, showEdit = false,isSharedAndAllowEdit=true,permissions,authorName='' }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const singleItemRef = useRef(null);  // Create a ref
    const [width, setWidth] = useState('40%');
    const [mobileScreen, setMobileScreen] = useState(false);
    const [allBookMark, setAllBookMark] = useState({});

    useEffect(() => {
        if (page === "bookmark" || page === "profile-bookmark") {
            dispatch(getAllBookmarksByAmount(totalCount))
                .then((value) => {
                    setAllBookMark(value.payload.data.data.bookmark);
                })
                .catch((error) => {
                    console.error("api Error:", error);
                });
        }
        else if (page === "filter") {
            dispatch(getBookmarkByFiltersAndAmount(type, totalCount, 1, false, type === 'Favourites', type === 'without tags'))
                .then((value) => {
                    setAllBookMark(value.payload.data.message);
                })
                .catch((error) => {
                    console.error("api Error:", error);
                });

        }
        else if (page === "collection") {
            dispatch(getBookmarkInCollectionsByAmount(collectionId, totalCount))
                .then((value) => {
                    setAllBookMark(value.payload.data.collection.gems);
                })
                .catch((error) => {
                    console.error("api Error:", error);
                });
        }
        else if (page === "broken-duplicate") {
            dispatch(getDuplicateLinksByAmount(totalCount))
                .then((value) => {
                    setAllBookMark(value.payload.data.data);
                })
                .catch((error) => {
                    console.error("api Error:", error);
                });
        }
        else if (page === "collection-public-shared") {
            setAllBookMark(items);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch,page,collectionId]);

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

    const [selected, setSelected] = useState((items && items.length > 0) ? items[0] : '')

    useEffect(() => {
        if (page === 'bookmark') {
            navigate(`/u/${selected?.author?.username || 'default'}/all-bookmarks/${selected.id}`)
            return
        }
        if (page === 'collection') {
            navigate(`/u/${selected?.author?.username || 'default'}/c/${collectionId}/${collectionName}/full/${selected.id}`)
            return
        }
        if (page === 'filter') {
            navigate(`/u/${selected?.author?.username || 'default'}/filters/${slugify(type || "", { lower: true, remove: /[0-9&,+()$~%.'":*?<>{}/\/]/g })}/${selected.id}?type=${type}`)
            return
        }
        if (page === 'broken-duplicate') {
            navigate(`/u/${selected?.author?.username || 'default'}/links/${selected.id}?type=${type}`)
            return
        }
        if (page === 'tags') {
            if (selected && selected.id) {
                navigate(`/u/${selected?.author?.username || 'default'}/tags/${tagId}/${slugify(tagName || "", { lower: true, remove: /[0-9&,+()$~%.'":*?<>{}/\/]/g })}/${selected.id}`)
            } else {
                handleLayout('card')
                navigate(`/u/${selected?.author?.username || 'default'}/tags/${tagId}/${slugify(tagName || "", { lower: true, remove: /[0-9&,+()$~%.'":*?<>{}/\/]/g })}`)
            }
            return
        }
        if (page === 'profile-bookmark') {
            navigate(`/u/${selected?.author?.username || 'default'}/${selected.id}`)
            return
        }
        if (page === 'collection-public-shared') {
            navigate(`/u/${authorName || 'default'}/c/${collectionId}/${slugify(collectionName || "", { lower: true, remove: /[0-9&,+()$~%.'":*?<>{}/\/]/g })}/${selected?.id}?public=true`)
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, selected, collectionId, navigate,])

    // const handlePreview = (e,item) => {
    //     e.stopPropagation();
    //     setIsPreviewVisible(true)
    //     setPreviewBookmark(item)
    // }
    // const handleOpenGem = (e, item) => {
    //     e.stopPropagation();
    //     setSelected(item)
    //     const rect = singleItemRef.current.getBoundingClientRect();

    //     const isOutOfView = rect.top < 0 || rect.bottom > window.innerHeight;

    //     if (isOutOfView) {
    //         const offsetTop = rect.top;
    //         window.scrollTo({
    //             top: offsetTop,
    //             behavior: "smooth",
    //         });
    //     }

    // }

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

    const handleSelect = (item) => {
        setSelected(item)

        const rect = singleItemRef.current.getBoundingClientRect();

        const isOutOfView = rect.top < 0 || rect.bottom > window.innerHeight;

        if (isOutOfView) {
            const offsetTop = rect.top;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
    };

    const handleNavigate = (item) => {
        navigate(`/u/${session.username}/c/${item?.collection_gems?.id}/${slugify(item?.collection_gems?.name || "", { lower: true, remove: /[0-9&,+()$~%.'":*?<>{}/\/]/g })}/full`)
        dispatch(sidebarMenuClicked('collection'))
    }

    const handleNavigateMediaType = (item) => {
        navigate(`/u/${session.username}/filters/${slugify(item.media_type || "", { lower: true, remove: /[0-9&,+()$~%.'":*?<>{}/\/]/g })}?type=${item.media_type}`)
        dispatch(sidebarMenuClicked('filter'))
    }

    const filteredData = propertyOrder?.length === 1 ? getFilteredData(items, propertyOrder || [], page) : items;
    // const bookmarksArray = Object.fromEntries(Object.entries(allBookMark).slice(0, 50));
    const bookmarksArray = allBookMark

    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    // const itemsPerPage = 1;
    const itemsPerPage = 20;

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookmarksArray]);

    const fetchData = () => {
        if (Object.keys(bookmarksArray).length > 0) {
            setTimeout(() => {
                if (data.length >= Object.keys(bookmarksArray).length) {
                    setHasMore(false);
                    return;
                }

                const moreData = Object.values(bookmarksArray).slice(
                    data.length,
                    data.length + itemsPerPage
                );
                setData(data.concat(moreData));
            }, 300);
        }
    };
    const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
    return (
        <>
            {
                page === 'bookmark' &&
                <>
                    <div className="flex flex-col-reverse md:flex md:flex-row">
                        <Resizable
                            // className="!h-[850px] !overflow-y-scroll"
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
                            id="scrollable-target"
                        >
                            <div>
                                <InfiniteScroll
                                    dataLength={data.length}
                                    next={fetchData}
                                    hasMore={hasMore}
                                    loader={<Loader />}
                                    scrollableTarget="scrollable-target"
                                    endMessage={
                                        <p style={{ textAlign: "center" }}>
                                            <b>All data shown</b>
                                        </p>
                                    }
                                    style={{ paddingBottom: "30px" }}
                                >
                                    {data && data.length > 0
                                        ? data.map((item) => {
                                            const thumbSrc =
                                                item?.metaData && item?.metaData?.covers?.length !== 0
                                                    ? item?.metaData?.covers?.[0] ||
                                                    item?.metaData?.app_screenshot
                                                    : "";
                                            const favSrc =
                                                item?.metaData && item?.metaData.length !== 0
                                                    ? item?.metaData?.icon
                                                    : "";
                                            const mediaImgsrc = (item?.media && item?.media?.covers && item?.media?.covers?.length !== 0) ? item?.media?.covers[0] : ''
                                            const s3Src = (item?.media_type === "Image" || item?.media_type === "Screenshot") && item?.S3_link?.length !== 0 ? item?.S3_link[0]  : null
                                            
                                            return (
                                                <div
                                                    key={item.id}
                                                    className={`bg-white cursor-pointer rounded-[8px] border border-solid border-[#DADEE8] flex items-center mb-[16px] group relative hover:border-2`}
                                                    onClick={() => handleSelect(item)}
                                                    style={{
                                                        background: checkedBookmark?.some(
                                                            (data) => data.id === item.id
                                                        )
                                                            ? "#E7F2FB"
                                                            : "#fff",
                                                        color: checkedBookmark?.some(
                                                            (data) => data.id === item.id
                                                        )
                                                            ? "black"
                                                            : "inherit",
                                                    }}
                                                >
                                                    {propertyOrder?.some(
                                                        (data) => data.name === "Thumbnail"
                                                    ) ? (
                                                        (thumbSrc || mediaImgsrc || s3Src) ? (
                                                            <div className="hidden sm:block flex-none w-[10%] m-10">
                                                                <img
                                                                    alt={item?.altInfo || item?.title || item?.description || "Curateit"}
                                                                    className={`object-scale-down object-center h-[150px] w-full`}
                                                                    onError={(e) => {
                                                                        e.target.onerror = null;
                                                                        e.target.src = item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`;
                                                                    }}
                                                                    src={s3Src ? s3Src?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : thumbSrc ? thumbSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : mediaImgsrc ? mediaImgsrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="hidden sm:block flex-none w-[10%] m-10">
                                                                <img
                                                                    alt={item?.title || item?.description || "Curateit"}
                                                                    className={` object-scale-down h-[150px]`}
                                                                    onError={(e) => {
                                                                        e.target.onerror = null;
                                                                        e.target.src = item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`; 
                                                                    }}
                                                                    src={favSrc ? favSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
                                                                />
                                                            </div>
                                                        )
                                                    ) : (
                                                        ""
                                                    )}
                                                    <div
                                                        style={{
                                                            background: checkedBookmark?.some(
                                                                (data) => data.id === item.id
                                                            )
                                                                ? "rgba(231,242,251,0.1)"
                                                                : "",
                                                        }}
                                                        className="p-1 absolute top-0 left-0 flex justify-between h-full w-full opacity-0 transition-opacity group-hover:opacity-100 group-hover:shadow-xl shadow-gray-700"
                                                    >
                                                        <div className="checkDiv">
                                                            {
                                                                <Checkbox
                                                                    onChange={(e) => handleCheck(e, item)}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    checked={checkedBookmark?.some(
                                                                        (data) => data.id === item.id
                                                                    )}
                                                                />
                                                            }
                                                        </div>

                                                        <div className="flex">
                                                            <div
                                                                className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1"
                                                                title="Open in new tab"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    window.open(item?.url || "", "_blank");
                                                                }}
                                                            >
                                                                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                                                            </div>

                                                            {/* <div
                                                                className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 mx-2"
                                                                title="Preview"
                                                                onClick={(e) => handleOpenGem(e, item)}
                                                            >
                                                                <EyeIcon className="h-5 w-5" />
                                                            </div> */}

                                                            {
                                                                <div
                                                                    className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1"
                                                                    title="Edit"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setOpenDrawer(true);
                                                                        setGemSingleIdSingleId(item.id);
                                                                    }}
                                                                >
                                                                    <PencilSquareIcon className="h-5 w-5" />
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col flex-auto p-2 w-[40%]">
                                                        {renderDetails(
                                                            propertyOrder,
                                                            item,
                                                            collectionName,
                                                            page,
                                                            handleNavigate,
                                                            handleNavigateMediaType
                                                        )}

                                                        <div className={`mt-2 border-t-2 pt-2 ${Number(session.userId) === item?.author?.id ? 'hidden group-hover:block' : 'block'}`}>
                                                            <GemEngagement
                                                                gem={item}
                                                                showBookmark={Number(session.userId) !== item?.author?.id}
                                                                showComment={showComment}
                                                                user={user}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                        : "No Bookmark"}
                                </InfiniteScroll>
                            </div>
                        </Resizable>


                        <div
                            className={`h-full  ${mobileScreen && 'mb-4'}`}
                            style={{ width: mobileScreen ? '100%' : `calc(100% - ${width})` }}
                            ref={singleItemRef}
                        >
                            <Outlet context={'inboxView'} />
                        </div>
                    </div>

                </>
            }

            {
                page === 'collection' &&
                <>
                    <div className="flex flex-col-reverse md:flex md:flex-row">
                        <Resizable
                            className="!h-[850px] !overflow-y-scroll"
                            size={{ width: mobileScreen ? '100%' : width }}
                            onResizeStop={(e, direction, ref, d) => {
                                setWidth(ref.style.width);
                            }}
                            enable={{
                                top: false, bottom: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false,
                                right: true,
                                left: false,
                            }}
                        >
                            <div>
                                <InfiniteScroll
                                    dataLength={data.length}
                                    next={fetchData}
                                    hasMore={hasMore}
                                    loader={<Loader />}
                                    endMessage={
                                        <p style={{ textAlign: "center" }}>
                                            <b>All data shown</b>
                                        </p>
                                    }
                                >
                                    {data && data.length > 0
                                        ? data.map((item) => {
                                            const thumbSrc = (item?.metaData && item?.metaData?.covers?.length !== 0) ? (item?.metaData?.covers?.[0] || item?.metaData?.app_screenshot) : ''
                                            const favSrc = (item?.metaData && item?.metaData.length !== 0) ? item?.metaData?.icon : ''
                                            const mediaImgsrc = (item?.media && item?.media?.covers && item?.media?.covers?.length !== 0) ? item?.media?.covers[0] : ''
                                const s3Src = (item?.media_type === "Image" || item?.media_type === "Screenshot") && item?.S3_link?.length !== 0 ? item?.S3_link[0]  : null
                                            
                                            return (
                                                <div
                                                    key={item.id}
                                                    className={`bg-white cursor-pointer rounded-[8px] border border-solid border-[#DADEE8] flex items-center mb-[16px] group relative hover:border-2`}
                                                    onClick={() => handleSelect(item)}
                                                    style={{
                                                        background: checkedBookmark?.some(data => data.id === item.id) ? '#E7F2FB' : '#fff',
                                                        color: checkedBookmark?.some(data => data.id === item.id) ? 'black' : 'inherit'
                                                    }}
                                                >
                                                    {
                                                        propertyOrder?.some(data => data.name === 'Thumbnail') ?
                                                            (thumbSrc || mediaImgsrc || s3Src) ?
                                                                <div className="hidden sm:block flex-none w-[10%] m-10" >
                                                                    <img alt={item?.altInfo || item?.title || item?.description || "Curateit"}
                                                                        className={`object-scale-down object-center h-[150px] w-full`}
                                                                        onError={(e) => {
                                                                            e.target.onerror = null;
                                                                            e.target.src     = item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`;
                                                                        }}
                                                                        src={s3Src ? s3Src?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : thumbSrc ? thumbSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : mediaImgsrc ? mediaImgsrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
                                                                    />
                                                                </div>
                                                                :
                                                                <div className="hidden sm:block flex-none w-[10%] m-10" >
                                                                    <img alt={item?.title || item?.description || "Curateit"}
                                                                        className={` object-scale-down h-[150px]`}
                                                                        onError={(e) => {
                                                                            e.target.onerror = null;
                                                                            e.target.src = item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`;
                                                                        }}
                                                                        src={favSrc ? favSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
                                                                    />
                                                                </div>
                                                            : ''
                                                    }
                                                    <div
                                                        style={{
                                                            background: checkedBookmark?.some(data => data.id === item.id) ? 'rgba(231,242,251,0.1)' : '',
                                                        }}
                                                        className="p-1 absolute top-0 left-0 flex justify-between h-full w-full opacity-0 transition-opacity  group-hover:opacity-100 group-hover:shadow-xl shadow-gray-700">

                                                        {isSharedAndAllowEdit ?<div className="checkDiv">
                                                            {<Checkbox
                                                                onChange={(e) => handleCheck(e, item)} onClick={e => e.stopPropagation()}
                                                                checked={checkedBookmark?.some(data => data.id === item.id)}
                                                            />}
                                                        </div> : <div></div>}

                                                        <div className="flex">

                                                            <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Open in new tab" onClick={(e) => {
                                                                e.stopPropagation();
                                                                window.open(item?.url || '', "_blank");
                                                            }}>
                                                                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                                                            </div>

                                                            {/* <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 mx-2" title="Preview"
                                                                onClick={(e) => handleOpenGem(e, item)}
                                                            >
                                                                <EyeIcon className="h-5 w-5" />
                                                            </div> */}

                                                            {isSharedAndAllowEdit ? <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Edit"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setOpenDrawer(true)
                                                                    setGemSingleIdSingleId(item.id)
                                                                }}
                                                            >
                                                                <PencilSquareIcon className="h-5 w-5" />
                                                            </div> : <div></div>}
                                                        </div>

                                                    </div>

                                                    <div className='flex flex-col flex-auto p-2 w-[40%]'>
                                                        {renderDetails(propertyOrder, item, collectionName, page, handleNavigate, handleNavigateMediaType)}

                                                        <div className={`mt-2 border-t-2 pt-2 ${Number(session.userId) === item?.author?.id ? 'hidden group-hover:block' : 'block'}`}>
                                                            <GemEngagement
                                                                gem={item}
                                                                showBookmark={Number(session.userId) !== item?.author?.id}
                                                                showComment={showComment}
                                                                user={user}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        : "No Bookmark"}
                                </InfiniteScroll>
                            </div>
                        </Resizable>


                        <div className={`h-full  ${mobileScreen && 'mb-4'}`}
                            style={{ width: mobileScreen ? '100%' : `calc(100% - ${width})` }}
                            ref={singleItemRef}>
                            <Outlet context={'inboxView'} />
                        </div>
                    </div>

                </>
            }

            {
                (page === 'broken-duplicate' || page === 'filter' || page === 'tags') &&
                <>
                    <div className="flex flex-col-reverse md:flex md:flex-row">
                        <Resizable
                            className="!h-[850px] !overflow-y-scroll"
                            size={{ width: mobileScreen ? '100%' : width }}
                            onResizeStop={(e, direction, ref, d) => {
                                setWidth(ref.style.width);
                            }}
                            enable={{
                                top: false, bottom: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false,
                                right: true,
                                left: false,
                            }}
                        >
                            <div>
                                <InfiniteScroll
                                    dataLength={data.length}
                                    next={fetchData}
                                    hasMore={hasMore}
                                    loader={<Loader />}
                                    endMessage={
                                        <p style={{ textAlign: "center" }}>
                                            <b>All data shown</b>
                                        </p>
                                    }
                                >
                                    {data && data.length > 0
                                        ? data.map((item) => {
                                            const thumbSrc = (item?.metaData && item?.metaData?.covers?.length !== 0) ? (item?.metaData?.covers?.[0] || item?.metaData?.app_screenshot) : ''
                                            const favSrc = (item?.metaData && item?.metaData.length !== 0) ? item?.metaData?.icon : ''
                                            const mediaImgsrc = (item?.media && item?.media?.covers && item?.media?.covers?.length !== 0) ? item?.media?.covers[0] : ''
                                const s3Src = (item?.media_type === "Image" || item?.media_type === "Screenshot") && item?.S3_link?.length !== 0 ? item?.S3_link[0]  : null
                                            
                                            return (
                                                <div
                                                    key={item.id}
                                                    className={`bg-white cursor-pointer rounded-[8px] border border-solid border-[#DADEE8] flex items-center mb-[16px] group relative hover:border-2`}
                                                    onClick={() => handleSelect(item)}
                                                    style={{
                                                        background: checkedBookmark?.some(data => data.id === item.id) ? '#E7F2FB' : '#fff',
                                                        color: checkedBookmark?.some(data => data.id === item.id) ? 'black' : 'inherit'
                                                    }}
                                                >
                                                    {
                                                        propertyOrder?.some(data => data.name === 'Thumbnail') ?
                                                            (thumbSrc || mediaImgsrc || s3Src) ?
                                                                <div className="hidden sm:block flex-none w-[10%] m-10" >
                                                                    <img alt={item?.altInfo || item?.title || item?.description || "Curateit"}
                                                                        className={`object-scale-down object-center h-[150px] w-full`}
                                                                        onError={(e) => {
                                                                            e.target.onerror = null;
                                                                            e.target.src     = item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`;
                                                                        }}
                                                                        src={s3Src ? s3Src?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : thumbSrc ? thumbSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : mediaImgsrc ? mediaImgsrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
                                                                    />
                                                                </div>
                                                                :
                                                                <div className="hidden sm:block flex-none w-[10%] m-10" >
                                                                    <img alt={item?.title || item?.description || "Curateit"}
                                                                        className={` object-scale-down h-[150px]`}
                                                                        onError={(e) => {
                                                                            e.target.onerror = null;
                                                                            e.target.src     = item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`;
                                                                        }}
                                                                        src={favSrc ? favSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
                                                                    />
                                                                </div>
                                                            : ''
                                                    }
                                                    <div
                                                        style={{
                                                            background: checkedBookmark?.some(data => data.id === item.id) ? 'rgba(231,242,251,0.1)' : '',
                                                        }}
                                                        className="p-1 absolute top-0 left-0 flex justify-between h-full w-full opacity-0 transition-opacity  group-hover:opacity-100 group-hover:shadow-xl shadow-gray-700">

                                                        <div className="checkDiv">
                                                            {<Checkbox
                                                                onChange={(e) => handleCheck(e, item)} onClick={e => e.stopPropagation()}
                                                                checked={checkedBookmark?.some(data => data.id === item.id)}
                                                            />}
                                                        </div>

                                                        <div className="flex">

                                                            <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Open in new tab" onClick={(e) => {
                                                                e.stopPropagation();
                                                                window.open(item?.url || '', "_blank");
                                                            }}>
                                                                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                                                            </div>

                                                            {/* <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 mx-2" title="Preview"
                                                                onClick={(e) => handleOpenGem(e, item)}
                                                            >
                                                                <EyeIcon className="h-5 w-5" />
                                                            </div> */}

                                                            {<div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Edit"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setOpenDrawer(true)
                                                                    setGemSingleIdSingleId(item.id)
                                                                }}
                                                            >
                                                                <PencilSquareIcon className="h-5 w-5" />
                                                            </div>}
                                                        </div>

                                                    </div>

                                                    <div className='flex flex-col flex-auto p-2 w-[40%]'>
                                                        {renderDetails(propertyOrder, item, collectionName, page, handleNavigate, handleNavigateMediaType)}

                                                        <div className={`mt-2 border-t-2 pt-2 ${Number(session.userId) === item?.author?.id ? 'hidden group-hover:block' : 'block'}`}>
                                                            <GemEngagement
                                                                gem={item}
                                                                showBookmark={Number(session.userId) !== item?.author?.id}
                                                                showComment={showComment}
                                                                user={user}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        : "No Bookmark"}
                                </InfiniteScroll>
                            </div>
                        </Resizable>


                        <div className={`h-full  ${mobileScreen && 'mb-4'}`}
                            style={{ width: mobileScreen ? '100%' : `calc(100% - ${width})` }}
                            ref={singleItemRef}>
                            <Outlet context={'inboxView'} />
                        </div>
                    </div>
                </>
            }

            {
                page === 'embed' &&
                <>
                    <div className="flex flex-col-reverse md:flex md:flex-row">
                        <div className="w-[100%] md:w-[40%] !h-[850px] !overflow-y-scroll">
                            {
                                (items && items.length > 0) ?
                                    items.map(item => {
                                        const imgSrc = (item?.metaData && item?.metaData.length !== 0) ? item?.metaData?.icon : ''
                                        const thumbSrc = (item?.metaData && item?.metaData?.covers?.length !== 0) ? (item?.metaData?.covers?.[0] || item?.metaData?.app_screenshot) : ''
                                        const favSrc = (item?.metaData && item?.metaData.length !== 0) ? item?.metaData?.icon : ''
                                const s3Src = (item?.media_type === "Image" || item?.media_type === "Screenshot") && item?.S3_link?.length !== 0 ? item?.S3_link[0]  : null
                                        
                                        return (
                                            <div
                                                key={item.id}
                                                className={`bg-white cursor-pointer rounded-[8px] border border-solid border-[#DADEE8] flex items-center mb-[16px] group relative`}
                                                onClick={() => handleSelect(item)}
                                                style={{
                                                    background: checkedBookmark?.some(data => data.id === item.id) ? '#E7F2FB' : 'inherit',
                                                    color: checkedBookmark?.some(data => data.id === item.id) ? 'black' : 'inherit'
                                                }}
                                            >
                                                {
                                                    thumbSrc || s3Src ?
                                                        <div className="hidden sm:block flex-none w-[10%] m-10" >
                                                            <img alt={item?.altInfo || item?.title || item?.description || "Curateit"}
                                                                className={`object-scale-down object-center h-[150px] w-full`}
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src     = item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`;
                                                                }}
                                                                src={s3Src ? s3Src?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : thumbSrc ? thumbSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
                                                            />
                                                        </div>
                                                        :
                                                        <div className="hidden sm:block flex-none w-[10%] m-10" >
                                                            <img alt={item?.title || item?.description || "Curateit"}
                                                                className={` object-scale-down h-[150px]`}
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src     = item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`;
                                                                }}
                                                                src={favSrc ? favSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
                                                            />
                                                        </div>
                                                }
                                                {/* {
                        propertyOrder?.some(data => data.name === 'Thumbnail') ? 
                        <div className="hidden sm:block flex-none w-[10%]" >
                        <img alt="example" 
                        className='object-contain h-[150px]'
                        src={thumbSrc ? thumbSrc : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`} />
                       </div>
                       : ''
                        } */}
                                                {/* <div 
                    style={{background: checkedBookmark?.some(data => data.id === item.id) ? 'rgba(231,242,251,0.1)': '',
                    }}
                    className="p-1 absolute top-0 left-0 flex justify-between h-full w-full opacity-0 transition-opacity group-hover:opacity-100 group-hover:shadow-xl shadow-gray-700">

                        <div className="flex">

                            <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Open in new tab" onClick={(e) => {
                                e.stopPropagation();
                                window.open(item?.url || '', "_blank");
                            }}>
                                <ArrowTopRightOnSquareIcon className="h-5 w-5"/>
                            </div>

                            <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 mx-2" title="Preview" 
                            onClick={(e) => handlePreview(e,item)}
                            >
                                <EyeIcon className="h-5 w-5"/>
                            </div>

                            {<div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Edit" 
                            onClick={(e) => {
                            e.stopPropagation();
                            setOpenDrawer(true)
                            setGemSingleIdSingleId(item.id)
                            }}
                            >
                                <PencilSquareIcon className="h-5 w-5"/>
                            </div>}
                        </div>

                    </div> */}

                                                <div className='flex flex-col flex-auto p-2 w-[40%]'>
                                                    <span
                                                        className={`font-medium pb-[10px] truncate block ${item?.broken_link ? 'line-through' : ''}`}
                                                    >
                                                        {item.title || ''}
                                                    </span>

                                                    <div className='my-1 flex items-center'>
                                                        {imgSrc ? <img alt={item?.altInfo || item?.title || item?.description || "Curateit"}
                                                            className='object-scale-down h-[20px] w-[20px] mr-1'
                                                            src={imgSrc ? imgSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/20x20_contain`) : ''} /> : <GlobeAltIcon className='h-5 w-5 mr-[5px] text-[#97A0B5]' />}
                                                        <Tooltip title={item?.url || ''}>
                                                            <span className='text-[#505050] text-[14px] truncate block'>{item?.url || ''}</span>
                                                        </Tooltip>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })
                                    : 'No Bookmark'
                            }
                        </div>

                        {
                            page === 'profile-bookmark' &&
                            <>
                                <div className="flex flex-col-reverse md:flex md:flex-row">
                                    <Resizable
                                        // className="!h-[850px] !overflow-y-scroll"
                                        className="!h-[100vh] !overflow-y-scroll overflow-x-hidden"
                                        size={{ width: mobileScreen ? '100%' : width }}
                                        onResizeStop={(e, direction, ref, d) => {
                                            setWidth(ref.style.width);
                                        }}
                                        enable={{
                                            top: false, bottom: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false,
                                            right: true,
                                            left: false,
                                        }}
                                    >
                                        <div
                                        >
                                            {
                                                (filteredData && filteredData.length > 0) ?
                                                    filteredData.map(item => {
                                                        const thumbSrc = (item?.metaData && item?.metaData?.covers?.length !== 0) ? item?.metaData?.covers[0] : ''
                                                        const s3Src = (item?.media_type === "Image" || item?.media_type === "Screenshot") && item?.S3_link?.length !== 0 ? item?.S3_link[0]  : null
                                                        
                                                        return (
                                                            <div
                                                                key={item.id}
                                                                className={`bg-white cursor-pointer rounded-[8px] border border-solid border-[#DADEE8] flex items-center mb-[16px] group relative hover:border-2`}
                                                                onClick={() => handleSelect(item)}
                                                                style={{
                                                                    background: checkedBookmark?.some(data => data.id === item.id) ? '#E7F2FB' : 'inherit',
                                                                    color: checkedBookmark?.some(data => data.id === item.id) ? 'black' : 'inherit'
                                                                }}
                                                            >
                                                                {
                                                                    propertyOrder?.some(data => data.name === 'Thumbnail') ?
                                                                        <div className="hidden sm:block flex-none w-[10%]" >
                                                                            <img alt={item?.altInfo || item?.title || item?.description || "Curateit"}
                                                                                className='object-contain h-[150px]'
                                                                                onError={(e) => {
                                                                                    e.target.onerror = null;
                                                                                    e.target.src     = item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`;
                                                                                }}
                                                                                src={s3Src ? s3Src?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : thumbSrc ? thumbSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`} />
                                                                        </div>
                                                                        : ''
                                                                }
                                                                <div
                                                                    style={{
                                                                        background: checkedBookmark?.some(data => data.id === item.id) ? 'rgba(231,242,251,0.1)' : '',
                                                                    }}
                                                                    className="p-1 absolute top-0 left-0 flex justify-between h-full w-full opacity-0 transition-opacity group-hover:opacity-100 group-hover:shadow-xl shadow-gray-700">

                                                                    <div className="checkDiv">
                                                                        {showEdit && <Checkbox
                                                                            onChange={(e) => handleCheck(e, item)} onClick={e => e.stopPropagation()}
                                                                            checked={checkedBookmark?.some(data => data.id === item.id)}
                                                                        />}
                                                                    </div>

                                                                    <div className="flex">

                                                                        <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Open in new tab" onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            window.open(item?.url || '', "_blank");
                                                                        }}>
                                                                            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                                                                        </div>

                                                                        {/* <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 mx-2" title="Preview"
                                                                            onClick={(e) => handleOpenGem(e, item)}
                                                                        >
                                                                            <EyeIcon className="h-5 w-5" />
                                                                        </div> */}

                                                                        {showEdit && <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Edit"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setOpenDrawer(true)
                                                                                setGemSingleIdSingleId(item.id)
                                                                            }}
                                                                        >
                                                                            <PencilSquareIcon className="h-5 w-5" />
                                                                        </div>}
                                                                    </div>

                                                                </div>

                                                                <div className='flex flex-col flex-auto p-2 w-[40%]'>
                                                                    {renderDetails(propertyOrder, item, collectionName, page, () => navigate(`/u/${user?.userName ? user?.userName : user?.username}/g/${item.id}`), handleNavigateMediaType)}

                                                                    <div className={`mt-2 border-t-2 pt-2 ${Number(session.userId) === item?.author?.id ? 'hidden group-hover:block' : 'block'}`}>
                                                            <GemEngagement
                                                                gem={item}
                                                                showBookmark={Number(session.userId) !== item?.author?.id}
                                                                showComment={showComment}
                                                                user={user}
                                                            />
                                                        </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                    : 'No Bookmark'
                                            }
                                        </div>
                                    </Resizable>


                                    <div
                                        className={`h-full  ${mobileScreen && 'mb-4'}`}
                                        style={{ width: mobileScreen ? '100%' : `calc(100% - ${width})` }}
                                        ref={singleItemRef}
                                    >
                                        <Outlet context={'inboxView'} />
                                    </div>
                                </div>

                            </>
                        }
                    </div>
                </>
            }

            {
                page === 'profile-bookmark' &&
                <>
                    <div className="flex flex-col-reverse md:flex md:flex-row">
                        <Resizable
                            className="!h-[100vh] !overflow-y-scroll overflow-x-hidden"
                            size={{ width: mobileScreen ? '100%' : width }}
                            onResizeStop={(e, direction, ref, d) => {
                                setWidth(ref.style.width);
                            }}
                            enable={{
                                top: false, bottom: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false,
                                right: true,
                                left: false,
                            }}
                        >
                            <div>
                                <InfiniteScroll
                                    dataLength={data.length}
                                    next={fetchData}
                                    hasMore={hasMore}
                                    loader={<Loader />}
                                    endMessage={
                                        <p style={{ textAlign: "center" }}>
                                            <b>All data shown</b>
                                        </p>
                                    }
                                >
                                    {data && data.length > 0
                                        ? data.map((item) => {
                                            const thumbSrc = (item?.metaData && item?.metaData?.covers?.length !== 0) ? (item?.metaData?.covers?.[0] || item?.metaData?.app_screenshot) : ''
                                            const favSrc = (item?.metaData && item?.metaData.length !== 0) ? item?.metaData?.icon : ''
                                            const s3Src = (item?.media_type === "Image" || item?.media_type === "Screenshot") && item?.S3_link?.length !== 0 ? item?.S3_link[0]  : null
                                            
                                            return (
                                                <div
                                                    key={item.id}
                                                    className={`bg-white cursor-pointer rounded-[8px] border border-solid border-[#DADEE8] flex items-center mb-[16px] group relative hover:border-2`}
                                                    onClick={() => handleSelect(item)}
                                                    style={{
                                                        background: checkedBookmark?.some(data => data.id === item.id) ? '#E7F2FB' : '#fff',
                                                        color: checkedBookmark?.some(data => data.id === item.id) ? 'black' : 'inherit'
                                                    }}
                                                >
                                                    {
                                                        propertyOrder?.some(data => data.name === 'Thumbnail') ?
                                                            thumbSrc ?
                                                                <div className="hidden sm:block flex-none w-[10%] m-10" >
                                                                    <img alt={item?.altInfo || item?.title || item?.description || "Curateit"}
                                                                        className={`object-scale-down object-center h-[150px] w-full`}
                                                                        onError={(e) => {
                                                                            e.target.onerror = null;
                                                                            e.target.src     = item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`;
                                                                        }}
                                                                        src={s3Src ? s3Src?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : thumbSrc ? thumbSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
                                                                    />
                                                                </div>
                                                                :
                                                                <div className="hidden sm:block flex-none w-[10%] m-10" >
                                                                    <img alt={item?.title || item?.description || "Curateit"}
                                                                        className={` object-scale-down h-[150px]`}
                                                                        onError={(e) => {
                                                                            e.target.onerror = null;
                                                                            e.target.src     = item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`;
                                                                        }}
                                                                        src={favSrc ? favSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
                                                                    />
                                                                </div>
                                                            : ''
                                                    }
                                                    <div
                                                        style={{
                                                            background: checkedBookmark?.some(data => data.id === item.id) ? 'rgba(231,242,251,0.1)' : '',
                                                        }}
                                                        className="p-1 absolute top-0 left-0 flex justify-between h-full w-full opacity-0 transition-opacity group-hover:opacity-100 group-hover:shadow-xl shadow-gray-700">

                                                        <div className="checkDiv">
                                                            {<Checkbox
                                                                onChange={(e) => handleCheck(e, item)} onClick={e => e.stopPropagation()}
                                                                checked={checkedBookmark?.some(data => data.id === item.id)}
                                                            />}
                                                        </div>

                                                        <div className="flex">

                                                            <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Open in new tab" onClick={(e) => {
                                                                e.stopPropagation();
                                                                window.open(item?.url || '', "_blank");
                                                            }}>
                                                                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                                                            </div>

                                                            {/* <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 mx-2" title="Preview"
                                                                onClick={(e) => handleOpenGem(e, item)}
                                                            >
                                                                <EyeIcon className="h-5 w-5" />
                                                            </div> */}

                                                            {<div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Edit"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setOpenDrawer(true)
                                                                    setGemSingleIdSingleId(item.id)
                                                                }}
                                                            >
                                                                <PencilSquareIcon className="h-5 w-5" />
                                                            </div>}
                                                        </div>

                                                    </div>

                                                    <div className='flex flex-col flex-auto p-2 w-[40%]'>
                                                        {renderDetails(propertyOrder, item, collectionName, page, handleNavigate, handleNavigateMediaType)}

                                                        <div className={`mt-2 border-t-2 pt-2 ${Number(session.userId) === item?.author?.id ? 'hidden group-hover:block' : 'block'}`}>
                                                            <GemEngagement
                                                                gem={item}
                                                                showBookmark={Number(session.userId) !== item?.author?.id}
                                                                showComment={showComment}
                                                                user={user}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        : "No Bookmark"}
                                </InfiniteScroll>
                            </div>
                        </Resizable>

                        <div
                            className={`h-full  ${mobileScreen && 'mb-4'}`}
                            style={{ width: mobileScreen ? '100%' : `calc(100% - ${width})` }}
                            ref={singleItemRef}
                        >
                            <Outlet context={'inboxView'} />
                        </div>
                    </div>

                </>
            }

            {
                page === 'collection-public-shared' &&
                <>
                    <div className="flex flex-col-reverse md:flex md:flex-row">
                        <Resizable
                            className="!h-[100vh] !overflow-y-scroll overflow-x-hidden"
                            size={{ width: mobileScreen ? '100%' : width }}
                            onResizeStop={(e, direction, ref, d) => {
                                setWidth(ref.style.width);
                            }}
                            enable={{
                                top: false, bottom: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false,
                                right: true,
                                left: false,
                            }}
                        >
                            <div>
                                <InfiniteScroll
                                    dataLength={data.length}
                                    next={fetchData}
                                    hasMore={hasMore}
                                    loader={<Loader />}
                                    endMessage={
                                        <p style={{ textAlign: "center" }}>
                                            <b>All data shown</b>
                                        </p>
                                    }
                                >
                                    {data && data.length > 0
                                        ? data.map((item) => {
                                            const thumbSrc = (item?.metaData && item?.metaData?.covers?.length !== 0) ? (item?.metaData?.covers?.[0] || item?.metaData?.app_screenshot) : ''
                                            const favSrc = (item?.metaData && item?.metaData.length !== 0) ? item?.metaData?.icon : ''
                                            return (
                                                <div
                                                    key={item.id}
                                                    className={`bg-white cursor-pointer rounded-[8px] border border-solid border-[#DADEE8] flex items-center mb-[16px] group relative hover:border-2`}
                                                    onClick={() => handleSelect(item)}
                                                    style={{
                                                        background: checkedBookmark?.some(data => data.id === item.id) ? '#E7F2FB' : '#fff',
                                                        color: checkedBookmark?.some(data => data.id === item.id) ? 'black' : 'inherit'
                                                    }}
                                                >
                                                    {
                                                        propertyOrder?.some(data => data.name === 'Thumbnail') ?
                                                            thumbSrc ?
                                                                <div className="hidden sm:block flex-none w-[10%] m-10" >
                                                                    <img alt={item?.altInfo || item?.title || item?.description || "Curateit"}
                                                                        className={`object-scale-down object-center h-[150px] w-full`}
                                                                        onError={(e) => {
                                                                            e.target.onerror = null;
                                                                            e.target.src     = item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`;
                                                                        }}
                                                                        src={thumbSrc ? thumbSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
                                                                    />
                                                                </div>
                                                                :
                                                                <div className="hidden sm:block flex-none w-[10%] m-10" >
                                                                    <img alt={item?.title || item?.description || "Curateit"}
                                                                        className={` object-scale-down h-[150px]`}
                                                                        onError={(e) => {
                                                                            e.target.onerror = null;
                                                                            e.target.src     = item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`;
                                                                        }}
                                                                        src={favSrc ? favSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x150_contain`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
                                                                    />
                                                                </div>
                                                            : ''
                                                    }
                                                    <div
                                                        style={{
                                                            background: checkedBookmark?.some(data => data.id === item.id) ? 'rgba(231,242,251,0.1)' : '',
                                                        }}
                                                        className="p-1 absolute top-0 left-0 flex justify-between h-full w-full opacity-0 transition-opacity group-hover:opacity-100 group-hover:shadow-xl shadow-gray-700">
                                                        <div className="flex">

                                                            <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Open in new tab" onClick={(e) => {
                                                                e.stopPropagation();
                                                                window.open(item?.url || '', "_blank");
                                                            }}>
                                                                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                                                            </div>

                                                            {/* <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 mx-2" title="Preview"
                                                                onClick={(e) => handleOpenGem(e, item)}
                                                            >
                                                                <EyeIcon className="h-5 w-5" />
                                                            </div> */}
                                                        </div>

                                                    </div>

                                                    <div className='flex flex-col flex-auto p-2 w-[40%]'>
                                                        {renderDetails(propertyOrder, item, collectionName, page, handleNavigate, handleNavigateMediaType)}
                                                    </div>
                                                </div>
                                            )
                                        })
                                        : "No Bookmark"}
                                </InfiniteScroll>
                            </div>
                        </Resizable>

                        <div
                            className={`h-full  ${mobileScreen && 'mb-4'}`}
                            style={{ width: mobileScreen ? '100%' : `calc(100% - ${width})` }}
                            ref={singleItemRef}
                        >
                            <Outlet context={'inboxView'} />
                        </div>
                    </div>

                </>
            }
        </>
    )
}

export default InboxView