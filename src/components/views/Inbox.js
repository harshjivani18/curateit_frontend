'use client'
import GemEngagement from '@components/gemEngagement/GemEngagement';
import { renderDetails } from '@utils/commonFunctions';
import session from '@utils/session';
import { Spin } from 'antd';
import { Resizable } from 're-resizable';
import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { ArrowTopRightOnSquareIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
// import { Tooltip } from "antd"
import { Checkbox } from "antd";
import slugify from 'slugify';
import { useRouter } from 'next/navigation';
import { getAllBookmarks, getAllBookmarksByUserId, getBookmarkByFilters, getFilterPageFilteredBookmarks, getFilteredBookmarks, profilePageFilteredBookmarks } from '@actions/bookmark';
import { useDispatch, useSelector } from 'react-redux';
import { getBookmarkInCollections, getCollectionFilteredBookmark, updateGem } from '@actions/collection';
import SingleGem from '@containers/gem/SingleGem';
import { deleteBookmarkState, updateBookmarkState } from '@utils/find-collection-id';
import { inboxViewUpdates } from '@actions/app';
import { MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR, aggregateProperties } from '@utils/constants';
import { getBrokenLinks, getDuplicateLinks, getFilteredBrokenBookmarks } from '@actions/broken-duplicate';
import { getGemsInTag, getTagPageFilteredBookmarks } from '@actions/tags';
import { updateUsageCount } from '@actions/gems';
// import Blog from '@components/blog/Blog';
import ArticlePage from '@containers/gem/ArticlePage';
// import BlogPage from '@containers/gem/BlogPage';
import SingleBlogPage from '@containers/gem/SingleBlogPage';
import ReactPlayer from 'react-player';
import Image from 'next/image';

const Inbox = ({ page, items, propertyOrder, totalCount, collectionName, setOpenDrawer, setGemSingleIdSingleId, setIsPreviewVisible, setPreviewBookmark, checkedBookmark, setCheckedBookmark, showComment, collectionId = '', type = '', tagId = '', tagName = "", handleLayout = '', user, showEdit = false,isSharedAndAllowEdit=true,permissions,authorName='' ,pageNumber,count,isFilter,sortArr,filterArr,userId}) => {
    const singleItemRef = useRef(null)
    const {inboxViewUpdateData} = useSelector(state => state.app)
    const dispatch = useDispatch()
    const navigate = useRouter()
    const [hasMore, setHasMore] = useState(true);
    const [width, setWidth] = useState('40%');
    const [mobileScreen, setMobileScreen] = useState(false);
    const [data,setData] = useState(items)
    const [pageNo,setPageNo] = useState(pageNumber)
    const [selected, setSelected] = useState('')
    const [fallbackURL, setFallbackURL] = useState(null);
    // const [bookmark, setBookmark] = useState(null);

    const openGemInWindow = (item) => {
        if(item?.media_type === 'Article' && !item?.isRead){
            const payload = {
                ...item,
                isRead: true
            }
           
            delete payload.id
            dispatch(updateGem(item.id, { data: payload }))
        }
        dispatch(updateUsageCount(item.id))
        window.open(item?.url || '', "_blank");
    }

    useEffect(() => {
        setData(items)
        setSelected((items && items.length > 0) ? items[0] : '')
        setHasMore(count <= items?.length ? false : true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isFilter,page])

    useEffect(() => {
        if(inboxViewUpdateData && inboxViewUpdateData.type === 'edit'){
            const result = updateBookmarkState(data,inboxViewUpdateData.data)
            setData(result)

            dispatch(inboxViewUpdates(null))
        }
        if(inboxViewUpdateData && inboxViewUpdateData.type === 'delete'){
            const result = deleteBookmarkState(data,inboxViewUpdateData.data)
            setData(result)
            
            dispatch(inboxViewUpdates(null))
        }
    },[inboxViewUpdateData])

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

    const fetchData = async () => {
        if(page === 'bookmark'){
            if(!isFilter){
                if(count <= data?.length){
                setHasMore(false)
                }else{
                    setHasMore(true)
                    setPageNo(pageNo + 1)
                    const res = await dispatch(getAllBookmarks(pageNo + 1));
                    if (res) {
                    setData((prevData) => [...prevData, ...res?.payload?.data?.data?.bookmark || []]);
                    }
                }
            }

            if(isFilter){
                if(count <= data?.length){
                setHasMore(false)
                }else{
                    setHasMore(true)
                    setPageNo(pageNo + 1)
                    const sortby= sortArr.length>0 ? sortArr[0]?.sortby : ''
                    const orderby= sortArr.length>0 ? sortArr[0]?.orderby : ''

                    const aggregatedData = aggregateProperties(filterArr);

                    const res = await dispatch(getFilteredBookmarks(aggregatedData.filterBy,aggregatedData.queryBy,aggregatedData.termType,pageNo + 1,sortby,orderby))
                    if (res) {
                        setData((prevData) => [...prevData, ...res?.payload?.data?.finalRes || []]);
                    }
                }
            }
        }
        
        if(page === 'collection'){
            if(!isFilter){
                if(count <= data?.length){
                    setHasMore(false)
                }else{
                    setHasMore(true)
                    setPageNo(pageNo + 1)
                    const res = await dispatch(getBookmarkInCollections(collectionId,pageNo + 1));
                    if (res) {
                    setData((prevData) => [...prevData, ...res?.payload?.data?.collection?.gems || []]);
                    }
                }
            }

            if(isFilter){
                if(count <= data?.length){
                    setHasMore(false)
                }else{
                    setHasMore(true)
                    setPageNo(pageNo + 1)
                    const sortby= sortArr.length>0 ? sortArr[0]?.sortby : ''
                    const orderby= sortArr.length>0 ? sortArr[0]?.orderby : ''
                    const aggregatedData = aggregateProperties(filterArr);
                    const filterBy= aggregatedData?.filterBy || ''
                    const queryBy= aggregatedData?.queryBy || ''
                    const termType= aggregatedData?.termType || ''

                    const res = await dispatch(getCollectionFilteredBookmark(filterBy,queryBy,termType,pageNo + 1,collectionName,sortby,orderby))
                    if (res) {
                    setData((prevData) => [...prevData, ...res?.payload?.data?.finalRes || []]);
                    }
                }

            }
        }

        if(page === 'filter'){
            if(!isFilter){
                if (type === 'Favourites') {
                if(count <= data?.length){
                    setHasMore(false)
                }else{
                    setHasMore(true)
                    setPageNo(pageNo + 1)
                    const res = await dispatch(getBookmarkByFilters('', pageNo + 1, false, true, false));
                    if (res) {
                    setData((prevData) => [...prevData, ...res?.payload?.data?.message || []]);
                    }
                }
                }

                if (type === 'without tags') {
                    if(count <= data?.length){
                        setHasMore(false)
                    }else{
                        setHasMore(true)
                        setPageNo(pageNo + 1)
                        const res = await dispatch(getBookmarkByFilters('', pageNo + 1, false, false, true))
                        if (res) {
                        setData((prevData) => [...prevData, ...res?.payload?.data?.message || []]);
                        }
                    }
                }

                if(type !== 'without tags' &&  type !== 'Favourites'){
                    if(count <= data?.length){
                        setHasMore(false)
                    }else{
                        setHasMore(true)
                        setPageNo(pageNo + 1)
                        const res = await dispatch(getBookmarkByFilters(type, pageNo + 1, true, false, false))
                        if (res) {
                        setData((prevData) => [...prevData, ...res?.payload?.data?.message || []]);
                        }
                    }
                }
            }

            if(isFilter){
                if(count <= data?.length){
                    setHasMore(false)
                }else{
                    setHasMore(true)
                    setPageNo(pageNo + 1)
                    const sortby= sortArr.length>0 ? sortArr[0]?.sortby : ''
                    const orderby= sortArr.length>0 ? sortArr[0]?.orderby : ''
                    const aggregatedData = aggregateProperties(filterArr);
                    const filterBy= aggregatedData?.filterBy || ''
                    const queryBy= aggregatedData?.queryBy || ''
                    const termType= aggregatedData?.termType || ''

                    const res = await dispatch(getFilterPageFilteredBookmarks(filterBy,queryBy,termType,pageNo + 1,type,sortby,orderby))
                    if (res) {
                    setData((prevData) => [...prevData, ...res?.payload?.data?.finalRes || []]);
                    }
                }
            
            }
        }

        if(page === 'tags'){
            if(!isFilter){
                if(count <= data?.length){
                    setHasMore(false)
                }else{
                    setHasMore(true)
                    setPageNo(pageNo + 1)
                    const res = await dispatch(getGemsInTag(tagId,pageNo + 1))
                    if (res) {
                    setData((prevData) => [...prevData, ...res?.payload?.data?.data?.gems || []]);
                    }
                }
            }

            if(isFilter){
                if(count <= data?.length){
                    setHasMore(false)
                }else{
                    setHasMore(true)
                    setPageNo(pageNo + 1)
                    const sortby= sortArr.length>0 ? sortArr[0]?.sortby : ''
                    const orderby= sortArr.length>0 ? sortArr[0]?.orderby : ''
                    const aggregatedData = aggregateProperties(filterArr);
                    const filterBy= aggregatedData?.filterBy || ''
                    const queryBy= aggregatedData?.queryBy || ''
                    const termType= aggregatedData?.termType || ''

                    const res = await dispatch(getTagPageFilteredBookmarks(filterBy,queryBy,termType,pageNo + 1,tagName,sortby,orderby))
                    if (res) {
                    setData((prevData) => [...prevData, ...res?.payload?.data?.finalRes || []]);
                    }
                }
                
            }
        }
        
        if(page === 'broken-duplicate'){
            if(!isFilter){
                if(type === 'broken'){
                if(count <= data?.length){
                setHasMore(false)
                }else{
                    setHasMore(true)
                    setPageNo(pageNo + 1)
                    const res = await dispatch(getBrokenLinks(pageNo + 1))
                    if (res) {
                    setData((prevData) => [...prevData, ...res?.payload?.data?.data || []]);
                    }
                }
            }
            if(type === 'duplicate'){
                if(count <= data?.length){
                setHasMore(false)
                }else{
                    setHasMore(true)
                    setPageNo(pageNo + 1)
                    const res = await dispatch(getDuplicateLinks(pageNo + 1))
                    if (res) {
                    setData((prevData) => [...prevData, ...res?.payload?.data?.data || []]);
                    }
                }
            }
            }

            if(isFilter){
                if(count <= data?.length){
                    setHasMore(false)
                }else{
                    setHasMore(true)
                    setPageNo(pageNo + 1)
                    const sortby= sortArr.length>0 ? sortArr[0]?.sortby : ''
                    const orderby= sortArr.length>0 ? sortArr[0]?.orderby : ''
                    const aggregatedData = aggregateProperties(filterArr);
                    const filterBy= aggregatedData?.filterBy || ''
                    const queryBy= aggregatedData?.queryBy || ''
                    const termType= aggregatedData?.termType || ''

                    const res = await dispatch(getFilteredBrokenBookmarks(filterBy,queryBy,termType,pageNo + 1,sortby,orderby))
                    if (res) {
                    setData((prevData) => [...prevData, ...res?.payload?.data?.finalRes || []]);
                    }
                }
                
            }
        }

        if(page === 'profile-bookmark'){
            if(!isFilter){
                if(count <= data?.length){
                setHasMore(false)
                }else{
                    setHasMore(true)
                    setPageNo(pageNo + 1)
                    const res = await dispatch(getAllBookmarksByUserId({ page: pageNo + 1, userId }));
                    if (res) {
                    setData((prevData) => [...prevData, ...res?.payload?.data?.data?.bookmark || []]);
                    }
                }
            }

            if(isFilter){
                if(count <= data?.length){
                setHasMore(false)
                }else{
                    setHasMore(true)
                    setPageNo(pageNo + 1)
                    const sortby = sortArr.length > 0 ? sortArr[0]?.sortby : "";
                    const orderby = sortArr.length > 0 ? sortArr[0]?.orderby : "";

                    const aggregatedData = aggregateProperties(filterArr);

                    const res = await dispatch(
                    profilePageFilteredBookmarks(
                        aggregatedData.filterBy,
                        aggregatedData.queryBy,
                        aggregatedData.termType,
                        pageNo + 1,
                        sortby,
                        orderby
                        )
                    )
                    if (res) {
                        setData((prevData) => [...prevData, ...res?.payload?.data?.finalRes || []]);
                    }
                }
            }
        }
    }

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

        // const rect = singleItemRef.current.getBoundingClientRect();

        // const isOutOfView = rect.top < 0 || rect.bottom > window.innerHeight;

        // if (isOutOfView) {
        //     const offsetTop = rect.top;
        //     window.scrollTo({
        //         top: offsetTop,
        //         behavior: "smooth",
        //     });
        // }
    };

    const handleNavigate = (item) => {
        navigate.push(`/u/${session.username}/c/${item?.collection_gems?.id}/${item?.slug || slugify(item?.collection_gems?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}/full`)
    }

    const handleNavigateMediaType = (item) => {
        navigate.push(`/u/${session.username}/filters/${slugify(item.media_type || "", { lower: true, remove: /[0-9&,+()$~%.'":*?<>{}/\/]/g })}?type=${item.media_type}`)
    }
    const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
    return(
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
                id="scrollable-target"
            >
                <InfiniteScroll
                    dataLength={data.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={<div className='w-full flex items-center justify-center'>
                        <Spin />
                    </div>}
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
                                                const favSrc = (item?.metaData && item?.metaData.length !== 0) ?
                                typeof item?.metaData?.icon === 'string' ?
                                item?.metaData?.icon
                                : (typeof item?.metaData?.icon === 'object' &&  item?.metaData?.icon?.type === 'image') ? item?.metaData?.icon?.icon : 
                                item?.metaData?.defaultIcon ? item?.metaData?.defaultIcon : '' : ''
                                                const mediaImgsrc = (item?.media && item?.media?.covers && item?.media?.covers?.length !== 0) ? item?.media?.covers[0] : ''
                                                const s3Src = (item?.media_type === "Image" || item?.media_type === "Screenshot") && item?.S3_link?.length !== 0 ? item?.S3_link[0]  : null
                                                
                                                return (
                                                  <div
                                                    key={item.id}
                                                    className={`bg-white cursor-pointer rounded-[8px] border border-solid border-[#DADEE8] flex items-center mb-[16px] group relative hover:border-2`}
                                                    onClick={() =>
                                                      handleSelect(item)
                                                    }
                                                    style={{
                                                      background:
                                                        checkedBookmark?.some(
                                                          (data) =>
                                                            data.id === item.id
                                                        )
                                                          ? "#E7F2FB"
                                                          : "#fff",
                                                      color:
                                                        checkedBookmark?.some(
                                                          (data) =>
                                                            data.id === item.id
                                                        )
                                                          ? "black"
                                                          : "inherit",
                                                    }}
                                                  >
                                                    {propertyOrder?.some(
                                                      (data) =>
                                                        data.name ===
                                                        "Thumbnail"
                                                    ) ? (
                                                      thumbSrc ||
                                                      mediaImgsrc ||
                                                      s3Src ? (
                                                        <div className="hidden sm:block flex-none w-[10%] m-10">
                                                          {item?.socialfeed_obj
                                                            ?.postType ===
                                                          "video" ? (
                                                            <ReactPlayer
                                                              url={
                                                                item
                                                                  ?.socialfeed_obj
                                                                  ?.image_url
                                                              }
                                                              width="100%"
                                                              height="150px"
                                                              controls={true}
                                                            />
                                                          ) : (
                                                            <Image
                                                              alt={
                                                                item?.altInfo ||
                                                                item?.title ||
                                                                item?.description ||
                                                                "Curateit item"
                                                              }
                                                              className={`object-scale-down object-center h-[150px] w-full`}
                                                              style={{
                                                                maxWidth:
                                                                  "100%",
                                                              }}
                                                              onError={(e) => {
                                                                setFallbackURL(
                                                                  item
                                                                    ?.metaData
                                                                    ?.fallbackURL
                                                                    ? item
                                                                        ?.metaData
                                                                        ?.fallbackURL
                                                                    : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                                                                );
                                                              }}
                                                              priority={true}
                                                              src={
                                                                fallbackURL
                                                                  ? fallbackURL
                                                                  : s3Src
                                                                  ? s3Src?.replace(
                                                                      NEXT_PUBLIC_STATIC_S3_BASE_URL,
                                                                      `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/150x150_min`
                                                                    )
                                                                  : thumbSrc
                                                                  ? thumbSrc
                                                                      ?.replace(
                                                                        "resize:fill:112:112",
                                                                        "resize:fit:2400"
                                                                      )
                                                                      ?.replace(
                                                                        "resize:fill:40:40",
                                                                        "resize:fit:2400"
                                                                      )
                                                                      ?.replace(
                                                                        "_SY160",
                                                                        "_SY800"
                                                                      )
                                                                      ?.replace(
                                                                        MEDIUM_REGEX,
                                                                        MEDIUM_REPLACEMENT_STR
                                                                      )
                                                                      ?.replace(
                                                                        NEXT_PUBLIC_STATIC_S3_BASE_URL,
                                                                        `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/150x150_min`
                                                                      )
                                                                  : mediaImgsrc
                                                                  ? mediaImgsrc
                                                                      ?.replace(
                                                                        "resize:fill:112:112",
                                                                        "resize:fit:2400"
                                                                      )
                                                                      ?.replace(
                                                                        "resize:fill:40:40",
                                                                        "resize:fit:2400"
                                                                      )
                                                                      ?.replace(
                                                                        "_SY160",
                                                                        "_SY800"
                                                                      )
                                                                      ?.replace(
                                                                        MEDIUM_REGEX,
                                                                        MEDIUM_REPLACEMENT_STR
                                                                      )
                                                                      ?.replace(
                                                                        NEXT_PUBLIC_STATIC_S3_BASE_URL,
                                                                        `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/150x150_min`
                                                                      )
                                                                  : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                                                              }
                                                            />
                                                          )}
                                                        </div>
                                                      ) : (
                                                        <div className="hidden sm:block flex-none w-[10%] m-10">
                                                          <Image
                                                            alt={
                                                              item?.title ||
                                                              item?.description ||
                                                              "Curateit"
                                                            }
                                                            className={` object-scale-down h-[150px]`}
                                                            style={{
                                                              maxWidth: "100%",
                                                            }}
                                                            onError={(e) => {
                                                              setFallbackURL(
                                                                item?.metaData
                                                                  ?.fallbackURL
                                                                  ? item
                                                                      ?.metaData
                                                                      ?.fallbackURL
                                                                  : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                                                              );
                                                            }}
                                                            priority={true}
                                                            src={
                                                            fallbackURL ? fallbackURL :
                                                              favSrc
                                                                ? favSrc?.replace(
                                                                    NEXT_PUBLIC_STATIC_S3_BASE_URL,
                                                                    `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/150x150_min`
                                                                  )
                                                                : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                                                            }
                                                          />
                                                        </div>
                                                      )
                                                    ) : (
                                                      ""
                                                    )}
                                                    <div
                                                      style={{
                                                        background:
                                                          checkedBookmark?.some(
                                                            (data) =>
                                                              data.id ===
                                                              item.id
                                                          )
                                                            ? "rgba(231,242,251,0.1)"
                                                            : "",
                                                      }}
                                                      className="p-1 absolute top-0 left-0 flex justify-between h-full w-full opacity-0 transition-opacity group-hover:opacity-100 group-hover:shadow-xl shadow-gray-700"
                                                    >
                                                      <div className="checkDiv">
                                                        {
                                                          <Checkbox
                                                            onChange={(e) =>
                                                              handleCheck(
                                                                e,
                                                                item
                                                              )
                                                            }
                                                            onClick={(e) =>
                                                              e.stopPropagation()
                                                            }
                                                            checked={checkedBookmark?.some(
                                                              (data) =>
                                                                data.id ===
                                                                item.id
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
                                                            openGemInWindow(
                                                              item
                                                            );
                                                          }}
                                                        >
                                                          <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                                                        </div>
                                                        {
                                                          <div
                                                            className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1"
                                                            title="Edit"
                                                            onClick={(e) => {
                                                              e.stopPropagation();
                                                              setOpenDrawer(
                                                                true
                                                              );
                                                              setGemSingleIdSingleId(
                                                                item.id
                                                              );
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

                                                      <div
                                                        className={`mt-2 border-t-2 pt-2 ${
                                                          Number(
                                                            session.userId
                                                          ) ===
                                                            item?.author?.id ||
                                                          page ===
                                                            "collection-public-shared"
                                                            ? "hidden group-hover:block"
                                                            : "block"
                                                        }`}
                                                      >
                                                        <GemEngagement
                                                          gem={item}
                                                          showBookmark={
                                                            Number(
                                                              session.userId
                                                            ) !==
                                                            item?.author?.id
                                                          }
                                                          showComment={
                                                            showComment
                                                          }
                                                          user={user}
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                        })
                        : "No Bookmark"}
                </InfiniteScroll>
            </Resizable>
            <div
                className={`!h-[100vh] !overflow-y-scroll  ${mobileScreen && 'mb-4'}`}
                style={{ width: mobileScreen ? '100%' : `calc(100% - ${width})` }}
                ref={singleItemRef}
            >   
            <div id="lbth_main" style={{zIndex:'999999',display:'none'}}>
                <div id="lbthmydiv" class="lbthmodal">
                    <div>
                    <div id="full-width" class="lbthmodal" tabindex="">
                        <div id="lbthmydivheader" class="lbthmodal-header" style={{position:'relative'}}>
                        <span style={{fontSize:'40px'}} id="myTextModalLabel"></span> 
                        <span id="removePopup" title="close" style={{position:'absolute',top:'4px',right:'9px',zIndex:'99999'}}>X</span>
                        <img id="closePopup" alt="Close icon" title="minimize"
                        style={{position:'absolute',top:'4px',right:'80px',zIndex:'99999'}}
                        />
                        </div>
                        <div class="lbthmodal-body">
                        <div class="lbth-flex">
                            <img id="undoImg" 
                            style={{maxWidth:'30px',cursor:'pointer',marginRight:'8px'}} src="#" alt="Undo img icon" /> 
                            <span id="lbthchange" style={{fontSize:'17px',cursor:'pointer'}}>Start</span> 
                            <img id="redoImg" style={{maxWidth:'30px',cursor:'pointer',marginLeft:'8px'}}src="#" alt="Redo img icon" />
                        </div>
                        <div class="lbth-flex" style={{fontSize:'17px',}}>WPM : &nbsp; 
                            <select name="selectorId" id="lbthSelectorId"></select>
                        </div>
                        <div class="lbth-flex" style={{fontSize:'17px',}}>Font Size : &nbsp; 
                            <select name="fontSize" id="fontSize"></select>
                        </div>
                        <div class="lbth-flex" style={{fontSize:'17px',}}>Words at a time : &nbsp; 
                            <select name="no_words" id="no_words"></select>
                        </div>
                        </div>
                    </div>
                    </div>
                        
                </div>
            </div>
            {(selected?.media_type === "Article") 
                ? <ArticlePage items={{ id: selected?.id, attributes: { ...selected}}}
                               gemId={selected?.id}
                               isInboxView={true} />
                : (selected?.media_type === "Blog") 
                    ? <SingleBlogPage items={selected}
                                gemId={selected?.id}
                                isInboxView={true} /> 
                    : <SingleGem
                        gemId={selected?.id}
                        isInboxView={true}
                    />
            }
            
            </div>
        </div>
        </>
    )
}

export default Inbox;