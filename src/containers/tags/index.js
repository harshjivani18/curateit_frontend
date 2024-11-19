'use client'

import { inboxViewUpdates } from "@actions/app";
import { gemAdded } from "@actions/bookmark";
import { UploadCoverS3Link, UploadUnsplashCoverS3Link, deleteCoverS3Link } from "@actions/collection";
import { UploadCoverS3LinkTag, UploadUnsplashCoverS3LinkTag, fetchTagsWithGemsCount, getGemsInTag, getSharedTags, getSingleTagDetails, getTagPageFilteredBookmarks, resetTagPageFilteredBookmark, updateConfigTag, updateTag, uploadIconsTag, deleteTag } from "@actions/tags";
import { updateUser } from "@actions/user";
import BookmarkUpload from "@components/common/BookmarkUpload";
import SubTagComponent from "@components/common/SubTagComponent";
import BookmarkSelectDrawer from "@components/drawers/BookmarkSelectDrawer";
import CommentDrawer from "@components/drawers/CommentDrawer";
import ShareTagDrawer from "@components/drawers/ShareTagDrawer";
import SingleBookmarkDrawer from "@components/drawers/SingleBookmarkDrawer";
import TagDrawer from "@components/drawers/TagDrawer";
import BreadCrumbNav from "@components/layouts/BreadCrumbNav";
import CommonLayout from "@components/layouts/CommonLayout";
import HeaderComponent from "@components/layouts/InnerHeader";
import Topbar from "@components/layouts/Topbar/Topbar";
import CoverModal from "@components/modal/CoverModal";
import DialogModal from "@components/modal/Dialog";
import Views from "@components/views/Views";
import { TextMessage, aggregateProperties, defaultPropertyHidden, defaultPropertyOrder, defaultPropertyShown, getBackgroundStyle, getPropertiesData, rgbToHex } from "@utils/constants";
import { deleteBookmarkState, getAllLevelCollectionPermissions, getTagByTagId, updateBookmarkState } from "@utils/find-collection-id";
import session from "@utils/session";
import { Modal, Spin, message } from "antd";
import { useSearchParams,useRouter } from "next/navigation";
import { useCallback, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const Tags = ({id,name,permissionsRes,authorName=''}) => {
    const navigate = useRouter()
    const dispatch = useDispatch()
    const searchParams  = useSearchParams()
    const actionType = searchParams.get('action')

    const observerRef = useRef(null);
    const observerFilterRef = useRef(null);

    const {userTags} = useSelector(state => state.users)
    const user = useSelector((state) => state?.users?.userData);
    const {tagsWithGemsCount,singleTag,sharedTags} = useSelector(state => state.tags)
    const { addedGem } = useSelector((state) => state.allBookmarks);

    const [tagBookmarks, setTagBookmarks] = useState([]);
    const [loadingState,setLoadingState] = useState(false)
    const [openEditTagDrawer,setOpenTagCollectionDrawer] = useState(false)
    const [checkedBookmark,setCheckedBookmark] = useState([])
    const [openSelectBookmarkDrawer,setOpenSelectBookmarkDrawer] = useState(false)
    const [openDrawer,setOpenDrawer] = useState(false)
    const [gemSingleId,setGemSingleIdSingleId] = useState('')
    const [page,setPage] = useState(1)

    const [filterArr,setFilterArr] = useState([])
    const [sortArr,setSortArr] = useState([])
    const [propertyShown,setPropertyShown] = useState([])
    const [propertyHidden,setPropertyHidden] = useState([])
    const [propertyOrder,setPropertyOrder] = useState([])
    const [layout,setLayout] = useState('')
    const [tagConfig,setTagConfig] = useState('')
    const [singleTagData,setSingleTagData] = useState('')
    const [editPagesIn,setEditPagesIn] = useState(session ? session.editPagesInSession : '')
    const [cardSize,setCardSize] = useState('')
    const [showTableVerticalLine,setShowTableVerticalLine] = useState(null)
    const [tableWrapColumns,setTableWrapColumns] = useState(null)
    const [openPagesIn, setOpenPagesIn] = useState(
    session ? session.openPagesInSession : ""
  );
  const [shrink,setShrink] = useState(false)
  const [gemOnClickEvent, setGemOnClickEvent] = useState("gem view");

  const [openWallpaperModal, setOpenWallpaperModal] = useState(false)
    const [selectedWallpaperImage, setSelectedWallpaperImage] = useState('')
    const [selectedWallpaperUnSplash, setSelectedWallpaperUnSplash] = useState('')
    const [selectedWallpaperGallery, setSelectedWallpaperGallery] = useState('')
    const [loadingWallpaperImg, setLoadingWallpaperImg] = useState(false)
    const [wallpaper, setWallpaper] = useState('')
    const [filterPage, setFilterPage] = useState(1);
    const [isFilter, setIsFilter] = useState(false);
    const [allCollectionsValue, setAllCollectionsValue] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filteredBookmarks, setFilteredBookmarks] = useState([]);

    const [selectedCoverImage, setSelectedCoverImage] = useState('')
    const [selectedCoverUnSplash, setSelectedCoverUnSplash] = useState('')
    const [selectedCoverGallery, setSelectedCoverGallery] = useState('')
    const [loadingCoverImg, setLoadingCoverImg] = useState(false)
    const [coverImage, setCoverImage] = useState('')
    const [showTextEditor, setShowTextEditor] = useState(false)
    const [descriptionContent, setDescriptionContent] = useState(null)
    const [openCoverModal, setOpenCoverModal] = useState(false)
    //icon
    const [icon, setIcon] = useState('')
    const [openIcon, setOpenIcon] = useState('')
    const [selectedEmoji, setSelectedEmoji] = useState("");
    const [selectedColor, setSelectedColor] = useState('')
    const [selectedImage, setSelectedImage] = useState('')
    const [selectedIcon, setSelectedIcon] = useState('')
    const [loadingImg, setLoadingImg] = useState(false)
    const [isDragging, setIsDragging] = useState(false);
    const [repositionMode, setRepositionMode] = useState(false);
    const [imagePosition, setImagePosition] = useState(null);
    const imageRef = useRef(null);

    const [openCommentDrawer, setOpenCommentDrawer] = useState(false);
    const [selectedGem, setSelectedGem] = useState(null);
    const [title,setTitle] = useState('')
    const [openShareTagDrawer, setOpenShareTagDrawer] = useState(false)
    const [openShareTagWithDrawer,setOpenShareTagWithDrawer] = useState(true)
    const [permissions,setPermissions] = useState(null)
    const [totalCount, setTotalCount] = useState(0);
    const [filterHasMore, setFilterHasMore] = useState(false);
    
    const [mounted, setMounted] = useState(false);
    const [orderOfGems, setOrderOfGems] = useState([]);
    const [showShareMobileView, setShowShareMobileView] = useState(false);
    const [viewSubTags, setViewSubTags] = useState(true)
    const [subTagsCount, setSubTagsCount] = useState(0);
    const [isSubTag, setIsSubTag] = useState(false);

    const [hideGems,setHideGems] = useState(false)
    const [showGems, setShowGems] = useState(true);
    const [hideBrokenLinks, setHideBrokenLinks] = useState(true);
    const [coverSize, setCoverSize] = useState("default");

    useEffect(() => {
    setMounted(true);
  }, []);

    useEffect(() => {
      if(addedGem && addedGem?.page === 'tags'){
        const obj = {...addedGem?.value}
        setTagBookmarks([obj,...tagBookmarks])
        dispatch(gemAdded(null))
      }
    },[addedGem])

  const setObserverRef = useCallback(node => {
      if (node) {
        observerRef.current = node;
        const options = {
          root: null,
          rootMargin: "0px",
          threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore && !loading && !isFilter) {
            setPage((prevPage) => prevPage + 1);
          }
        }, options);

        if (observerRef.current) {
          observer.observe(observerRef.current);
        }

        return () => {
          if (observerRef.current) {
            observer.unobserve(observerRef.current);
          }
        };
      }
    }, [hasMore,loading,isFilter]);

  const setObserverFilterRef = useCallback(node => {
      if (node) {
        observerFilterRef.current = node;
        const options = {
          root: null,
          rootMargin: "0px",
          threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && filterHasMore && !loading && isFilter) {
            setFilterPage((prevPage) => prevPage + 1);
          }
        }, options);

        if (observerFilterRef.current) {
          observer.observe(observerFilterRef.current);
        }

        return () => {
          if (observerFilterRef.current) {
            observer.unobserve(observerFilterRef.current);
          }
        };
      }
    }, [filterHasMore,loading,isFilter]);

    useEffect(() => {
        const getCall = async () => {
            if (page === 1) {
              setLoadingState(true)
            } else {
              setLoadingState(false)
            }
            setLoading(true)
            const res   = await dispatch(getGemsInTag(id,page))
            if(res){
              setTagBookmarks((prevData) => [...prevData, ...res?.payload?.data?.data?.gems || []]);
              setLoading(false);
              if (res?.payload?.data?.totalCount <= tagBookmarks.length + res?.payload?.data?.data?.gems?.length) {
                setHasMore(false);
              }
            }
            setOrderOfGems(res?.payload?.data?.data?.order_of_gems || [])
            setPermissions(permissionsRes)
            const configRes = res?.payload?.data?.data
            const data = getPropertiesData(configRes,'tag')
            setLayout(data?.ly)
            setFilterArr(configRes?.configTag?.filter?.length === 0 ? [{
            filterBy: "",
            termType: "",
            queryBy: "",
            platform: ''
          }] : configRes?.configTag?.filter)
            setSortArr(configRes?.configTag?.sort?.length === 0 ? [{
                sortby: 'title',
                orderby: '',
            }] : configRes?.configTag?.sort)
            setPropertyShown(data?.PS)
            setPropertyOrder(data?.PO)
            setPropertyHidden(data?.PH)
            // setPropertyShown(data?.PS?.filter(item => item.name !== 'Tags'))
            // setPropertyOrder(data?.PO?.filter(item => item.name !== 'Tags'))
            // setPropertyHidden(data?.PH?.filter(item => item.name !== 'Tags'))
            setTagConfig(configRes?.configTag)
            setCardSize(configRes?.configTag?.cardSize)
            setHideBrokenLinks(configRes?.configTag?.hideBrokenLinks);
            setShowTableVerticalLine(configRes?.configTag?.showTableVerticalLine)
            setTableWrapColumns(configRes?.configTag?.tableWrapColumns)
            setWallpaper(configRes?.wallpaper || '')
            setCoverImage(configRes?.background || '')
            setCoverSize(configRes?.background?.size || "default");
            setImagePosition(configRes?.background && (configRes?.background.type === 'upload' || configRes?.background.type === 'unsplash') ? configRes?.background?.imagePosition : null)
            setDescriptionContent(configRes?.description ?
                        configRes?.description :
                        '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}')
            setIcon(configRes?.avatar || '')
            setSelectedEmoji(configRes?.avatar?.type === 'emoji' ? configRes?.avatar?.icon : '')
            setSelectedColor(configRes?.avatar?.type === 'color' ? configRes?.avatar?.icon : '')
            setSelectedImage(configRes?.avatar?.type === 'image' ? configRes?.avatar?.icon : '')
            setSelectedIcon(configRes?.avatar?.type === 'icon' ? configRes?.avatar?.icon : '')
            setShowTextEditor(configRes?.configTag?.showTextEditor)
            setTitle(res?.payload?.data?.data?.tag || false)
            setViewSubTags(configRes?.viewSubTag === null ? true : configRes?.viewSubTag)
            setIsSubTag(configRes?.is_sub_tag)
            setTotalCount(res?.payload?.data?.totalCount)
            setHideGems(res?.payload?.data?.data?.hideGem || false)
            setGemOnClickEvent(configRes?.gemOnClickEvent || 'gem view');
            setShowGems(configRes?.showGem === false ? false : true);
            setLoadingState(false)
        }

        if(!isFilter && hasMore){
          getCall()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch,id,page,hasMore])

    //filter page
    useEffect(() => {
    if(filterPage === 1) return;
    const getCall = async () => {
      setLoading(true)
      const sortby= sortArr.length>0 ? sortArr[0]?.sortby : ''
      const orderby= sortArr.length>0 ? (sortArr[0]?.orderby || 'asc') : ''
      const aggregatedData = aggregateProperties(filterArr);
      const filterBy= aggregatedData?.filterBy || ''
      const queryBy= aggregatedData?.queryBy || ''
      const termType= aggregatedData?.termType || ''

      const res = await dispatch(getTagPageFilteredBookmarks(filterBy,queryBy,termType,filterPage,name,sortby,orderby))

      if(res.error === undefined){
        setFilteredBookmarks((prevData) => [...prevData, ...res?.payload?.data?.finalRes || []]);
        setLoading(false);
        if (res?.payload?.data?.totalCount <= filteredBookmarks.length + res?.payload?.data?.finalRes?.length) {
          setFilterHasMore(false);
        }
      }
    }

    if(isFilter && filterHasMore){
      getCall()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch,filterPage,filterHasMore,isFilter])

    useEffect(() => {
        if(actionType === 'edit'){
            const data = getTagByTagId(tagsWithGemsCount ? [...tagsWithGemsCount,...sharedTags] : [...sharedTags], Number(id))
            setSingleTagData(data)
            dispatch(getSingleTagDetails(id))
            setOpenTagCollectionDrawer(true)
        }
    },[dispatch,id,actionType])

    const handleEditCall = async() => {
      if (tagsWithGemsCount && tagsWithGemsCount.length > 0) {
            const data = getTagByTagId(tagsWithGemsCount ? [...tagsWithGemsCount,...sharedTags] : [...sharedTags], Number(id))
            dispatch(getSingleTagDetails(id))
            setSingleTagData(data)
            setOpenTagCollectionDrawer(true)
            return;
        }

        setLoading(true)
        const res = await dispatch(fetchTagsWithGemsCount())
        dispatch(getSharedTags())
        dispatch(getSingleTagDetails(id))

        if (res) {
            setLoading(false)
            const data = getTagByTagId(tagsWithGemsCount ? [...tagsWithGemsCount,...sharedTags] : [...sharedTags], Number(id))
            setSingleTagData(data)
            setOpenTagCollectionDrawer(true);
        }
    }

    const handleLayout = async (item) => {
        setLayout(item)
        if(item === 'card'){
      setPropertyHidden(tagConfig?.propertyHidden?.card?.propertyHidden)
      setPropertyOrder(tagConfig?.propertyOrder?.card?.propertyOrder)
      setPropertyShown(tagConfig?.propertyShown?.card?.propertyShown)
    }
    if(item === 'table'){
      setPropertyHidden(tagConfig?.propertyHidden?.table?.propertyHidden)
      setPropertyOrder(tagConfig?.propertyOrder?.table?.propertyOrder)
      setPropertyShown(tagConfig?.propertyShown?.table?.propertyShown)
    }
    if(item === 'list'){
      setPropertyHidden(tagConfig?.propertyHidden?.list?.propertyHidden)
      setPropertyOrder(tagConfig?.propertyOrder?.list?.propertyOrder)
      setPropertyShown(tagConfig?.propertyShown?.list?.propertyShown)
    }
    if(item === 'inbox'){
      setPropertyHidden(tagConfig?.propertyHidden?.inbox?.propertyHidden)
      setPropertyOrder(tagConfig?.propertyOrder?.inbox?.propertyOrder)
      setPropertyShown(tagConfig?.propertyShown?.inbox?.propertyShown)
    }
    if(item === 'moodboard'){
      setPropertyHidden(tagConfig?.propertyHidden?.moodboard?.propertyHidden)
      setPropertyOrder(tagConfig?.propertyOrder?.moodboard?.propertyOrder)
      setPropertyShown(tagConfig?.propertyShown?.moodboard?.propertyShown)
    }
    if(item === 'stream'){
      setPropertyHidden(tagConfig?.propertyHidden?.stream?.propertyHidden)
      setPropertyOrder(tagConfig?.propertyOrder?.stream?.propertyOrder)
      setPropertyShown(tagConfig?.propertyShown?.stream?.propertyShown)
    }

        const data = {
            ...tagConfig,
            layout:item,
            tagId: id,
            groupBy:''
            }
        setTagConfig(data)
        await dispatch(updateConfigTag(data))

        const payload = {
          currentPublicLayout: item
        }
        dispatch(updateTag(id, payload))
    }

    //property
    const handlePropertyHide = async (data) => {
    if (layout !== 'moodboard' && layout !== 'stream' && propertyShown.length === 1) {
        message.info(TextMessage.PROPERTY_HIDE_INFO_TEXT)
        return;
    }
    const filtered = propertyShown.filter(item => item.name !== data.name)
    const arr = [...propertyHidden]
    arr.push(data)
    setPropertyShown(filtered)
    setPropertyHidden(arr)
    setPropertyOrder(filtered)

    if(layout === 'card'){
      const obj = {
        ...tagConfig,
        propertyHidden: {
          ...tagConfig.propertyHidden,
          card: {
            propertyHidden: arr,
          }
        },
        propertyOrder: {
          ...tagConfig.propertyOrder,
          card: {
            propertyOrder: filtered,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          card: {
            propertyShown: filtered,
          }
        },
      }

      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }

    if(layout === 'table'){
      const obj = {
        ...tagConfig,
        propertyHidden: {
          ...tagConfig.propertyHidden,
          table: {
            propertyHidden: arr,
          }
        },
        propertyOrder: {
          ...tagConfig.propertyOrder,
          table: {
            propertyOrder: filtered,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          table: {
            propertyShown: filtered,
          }
        },
      }

      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }

    if(layout === 'list'){
      const obj = {
        ...tagConfig,
        propertyHidden: {
          ...tagConfig.propertyHidden,
          list: {
            propertyHidden: arr,
          }
        },
        propertyOrder: {
          ...tagConfig.propertyOrder,
          list: {
            propertyOrder: filtered,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          list: {
            propertyShown: filtered,
          }
        },
      }

      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }

    if(layout === 'inbox'){
      const obj = {
        ...tagConfig,
        propertyHidden: {
          ...tagConfig.propertyHidden,
          inbox: {
            propertyHidden: arr,
          }
        },
        propertyOrder: {
          ...tagConfig.propertyOrder,
          inbox: {
            propertyOrder: filtered,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          inbox: {
            propertyShown: filtered,
          }
        },
      }

      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }

    if(layout === 'moodboard'){
      const obj = {
        ...tagConfig,
        propertyHidden: {
          ...tagConfig.propertyHidden,
          moodboard: {
            propertyHidden: arr,
          }
        },
        propertyOrder: {
          ...tagConfig.propertyOrder,
          moodboard: {
            propertyOrder: filtered,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          moodboard: {
            propertyShown: filtered,
          }
        },
      }

      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }
    if(layout === 'stream'){
      const obj = {
        ...tagConfig,
        propertyHidden: {
          ...tagConfig.propertyHidden,
          stream: {
            propertyHidden: arr,
          }
        },
        propertyOrder: {
          ...tagConfig.propertyOrder,
          stream: {
            propertyOrder: filtered,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          stream: {
            propertyShown: filtered,
          }
        },
      }

      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }
   
  }

  

  const handlePropertyVisible = async (item) => {
    const arr = [...propertyShown]
    arr.push(item)

    const filtered = propertyHidden.filter(data => data.name !== item.name)
    setPropertyShown(arr)
    setPropertyHidden(filtered)
    setPropertyOrder(arr)

    if(layout === 'card'){
      const obj = {
        ...tagConfig,
        propertyHidden: {
          ...tagConfig.propertyHidden,
          card: {
            propertyHidden: filtered,
          }
        },
        propertyOrder: {
          ...tagConfig.propertyOrder,
          card: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          card: {
            propertyShown: arr,
          }
        },
      }

      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }
    if(layout === 'table'){
      const obj = {
        ...tagConfig,
        propertyHidden: {
          ...tagConfig.propertyHidden,
          table: {
            propertyHidden: filtered,
          }
        },
        propertyOrder: {
          ...tagConfig.propertyOrder,
          table: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          table: {
            propertyShown: arr,
          }
        },
      }

      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }

    if(layout === 'list'){
      const obj = {
        ...tagConfig,
        propertyHidden: {
          ...tagConfig.propertyHidden,
          list: {
            propertyHidden: filtered,
          }
        },
        propertyOrder: {
          ...tagConfig.propertyOrder,
          list: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          list: {
            propertyShown: arr,
          }
        },
      }

      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }

    if(layout === 'inbox'){
      const obj = {
        ...tagConfig,
        propertyHidden: {
          ...tagConfig.propertyHidden,
          inbox: {
            propertyHidden: filtered,
          }
        },
        propertyOrder: {
          ...tagConfig.propertyOrder,
          inbox: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          inbox: {
            propertyShown: arr,
          }
        },
      }

      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }

    if(layout === 'moodboard'){
      const obj = {
        ...tagConfig,
        propertyHidden: {
          ...tagConfig.propertyHidden,
          moodboard: {
            propertyHidden: filtered,
          }
        },
        propertyOrder: {
          ...tagConfig.propertyOrder,
          moodboard: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          moodboard: {
            propertyShown: arr,
          }
        },
      }

      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }
    if(layout === 'stream'){
      const obj = {
        ...tagConfig,
        propertyHidden: {
          ...tagConfig.propertyHidden,
          stream: {
            propertyHidden: filtered,
          }
        },
        propertyOrder: {
          ...tagConfig.propertyOrder,
          stream: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          stream: {
            propertyShown: arr,
          }
        },
      }

      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }
  }

  const updatePropertyOnDrop = async (arr) =>{
    if(layout === 'card'){
      setPropertyOrder(arr)
      const obj = {
        ...tagConfig,
        propertyOrder: {
          ...tagConfig.propertyOrder,
          card: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          card: {
            propertyShown: arr,
          }
        },
      }
      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }
    if(layout === 'list'){
      setPropertyOrder(arr)
      const obj = {
        ...tagConfig,
        propertyOrder: {
          ...tagConfig.propertyOrder,
          list: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          list: {
            propertyShown: arr,
          }
        },
      }
      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }
    if(layout === 'table'){
      setPropertyOrder(arr)
      const obj = {
        ...tagConfig,
        propertyOrder: {
          ...tagConfig.propertyOrder,
          table: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          table: {
            propertyShown: arr,
          }
        },
      }
      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }
    if(layout === 'inbox'){
      setPropertyOrder(arr)
      const obj = {
        ...tagConfig,
        propertyOrder: {
          ...tagConfig.propertyOrder,
          inbox: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          inbox: {
            propertyShown: arr,
          }
        },
      }
      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }
    if(layout === 'moodboard'){
      setPropertyOrder(arr)
      const obj = {
        ...tagConfig,
        propertyOrder: {
          ...tagConfig.propertyOrder,
          moodboard: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          moodboard: {
            propertyShown: arr,
          }
        },
      }
      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }
    if(layout === 'stream'){
      setPropertyOrder(arr)
      const obj = {
        ...tagConfig,
        propertyOrder: {
          ...tagConfig.propertyOrder,
          stream: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          stream: {
            propertyShown: arr,
          }
        },
      }
      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }
  }

  const handleRefreshProperty = async () => {
    if(layout === 'card'){
      setPropertyShown(defaultPropertyShown?.card?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.card?.propertyOrder)
      setPropertyHidden(defaultPropertyHidden?.card?.propertyHidden)

      const obj = {
        ...tagConfig,
        propertyHidden: {
          ...tagConfig.propertyHidden,
          card: {
            propertyHidden: defaultPropertyHidden?.card?.propertyHidden,
          }
        },
        propertyOrder: {
          ...tagConfig.propertyOrder,
          card: {
            propertyOrder: defaultPropertyOrder?.card?.propertyOrder,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          card: {
            propertyShown: defaultPropertyShown?.card?.propertyShown,
          }
        },
      }

      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }
    if(layout === 'list'){
      setPropertyShown(defaultPropertyShown?.list?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.list?.propertyOrder)
      setPropertyHidden(defaultPropertyHidden?.list?.propertyHidden)

      const obj = {
        ...tagConfig,
        propertyHidden: {
          ...tagConfig.propertyHidden,
          list: {
            propertyHidden: defaultPropertyHidden?.list?.propertyHidden,
          }
        },
        propertyOrder: {
          ...tagConfig.propertyOrder,
          list: {
            propertyOrder: defaultPropertyOrder?.list?.propertyOrder,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          list: {
            propertyShown: defaultPropertyShown?.list?.propertyShown,
          }
        },
      }

      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }
    if(layout === 'table'){
      setPropertyShown(defaultPropertyShown?.table?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.table?.propertyOrder)
      setPropertyHidden(defaultPropertyHidden?.table?.propertyHidden)

      const obj = {
        ...tagConfig,
        propertyHidden: {
          ...tagConfig.propertyHidden,
          table: {
            propertyHidden: defaultPropertyHidden?.table?.propertyHidden,
          }
        },
        propertyOrder: {
          ...tagConfig.propertyOrder,
          table: {
            propertyOrder: defaultPropertyOrder?.table?.propertyOrder,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          table: {
            propertyShown: defaultPropertyShown?.table?.propertyShown,
          }
        },
      }

      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }
    if(layout === 'inbox'){
      setPropertyShown(defaultPropertyShown?.inbox?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.inbox?.propertyOrder)
      setPropertyHidden(defaultPropertyHidden?.inbox?.propertyHidden)

      const obj = {
        ...tagConfig,
        propertyHidden: {
          ...tagConfig.propertyHidden,
          inbox: {
            propertyHidden: defaultPropertyHidden?.inbox?.propertyHidden,
          }
        },
        propertyOrder: {
          ...tagConfig.propertyOrder,
          inbox: {
            propertyOrder: defaultPropertyOrder?.inbox?.propertyOrder,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          inbox: {
            propertyShown: defaultPropertyShown?.inbox?.propertyShown,
          }
        },
      }

      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }
    if(layout === 'moodboard'){
      setPropertyShown(defaultPropertyShown?.moodboard?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.moodboard?.propertyOrder)
      setPropertyHidden(defaultPropertyHidden?.moodboard?.propertyHidden)

      const obj = {
        ...tagConfig,
        propertyHidden: {
          ...tagConfig.propertyHidden,
          moodboard: {
            propertyHidden: defaultPropertyHidden?.moodboard?.propertyHidden,
          }
        },
        propertyOrder: {
          ...tagConfig.propertyOrder,
          moodboard: {
            propertyOrder: defaultPropertyOrder?.moodboard?.propertyOrder,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          moodboard: {
            propertyShown: defaultPropertyShown?.moodboard?.propertyShown,
          }
        },
      }

      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }
    if(layout === 'stream'){
      setPropertyShown(defaultPropertyShown?.stream?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.stream?.propertyOrder)
      setPropertyHidden(defaultPropertyHidden?.stream?.propertyHidden)

      const obj = {
        ...tagConfig,
        propertyHidden: {
          ...tagConfig.propertyHidden,
          stream: {
            propertyHidden: defaultPropertyHidden?.stream?.propertyHidden,
          }
        },
        propertyOrder: {
          ...tagConfig.propertyOrder,
          stream: {
            propertyOrder: defaultPropertyOrder?.stream?.propertyOrder,
          }
        },
        propertyShown: {
          ...tagConfig.propertyShown,
          stream: {
            propertyShown: defaultPropertyShown?.stream?.propertyShown,
          }
        },
      }

      setTagConfig({...obj,tagId:id})
       await dispatch(updateConfigTag({...obj,tagId:id}))
      return;
    }
  };

  // sort
    const handleSortAdd = async() => {
        const newObj = {
        sortby: '',
        orderby: '',
        }
        const arr = [...sortArr,newObj]
        setSortArr(arr)
    }

    const handleSortSave = async() => {
        if(sortArr.length === 0) return;
        for (let obj of sortArr) {
            if (obj.sortby.trim() === "" || obj.orderby.trim() === "") {
                message.error('Both fields are required')
                return;
            }
        }

        const aggregatedData = aggregateProperties(filterArr);
        const filterBy= aggregatedData?.filterBy || ''
        const queryBy= aggregatedData?.queryBy || ''
        const termType= aggregatedData?.termType || ''

        setLoadingState(true)
        setIsFilter(true)
        dispatch(resetTagPageFilteredBookmark())
        setFilterPage(1);
        setFilterHasMore(true)
        const res = await dispatch(getTagPageFilteredBookmarks(filterBy,queryBy,termType,1,name,sortArr[0].sortby,sortArr[0].orderby))
        if(res.error === undefined){
          setFilteredBookmarks(res?.payload?.data?.finalRes)
          setTotalCount(res?.payload?.data?.totalCount)
        }

        setLoadingState(false);

        const payload = {
            ...tagConfig,
            tagId:id,
            sort: sortArr
        }
        setTagConfig(payload)
        await dispatch(updateConfigTag(payload))
    }

    const handleSortRemove = async (i) => {
      if(filterArr.length === 0){
        const arr = [...sortArr]
        arr.splice(i,1)
        setSortArr(arr)
        const payload = {
            ...tagConfig,
            tagId:id,
            sort: []
        }
        setIsFilter(false)
        dispatch(resetTagPageFilteredBookmark())
        setFilteredBookmarks([])
        setTotalCount(tagBookmarks?.length)
        setFilterPage(1)
        setFilterHasMore(false)
        setTagConfig(payload)
        await dispatch(updateConfigTag(payload))
        return;
      }

        setSortArr([])
        const payload = {
            ...tagConfig,
            tagId:id,
            sort: []
        }
        setFilterPage(1)
        setFilterHasMore(true)
        const aggregatedData = aggregateProperties(filterArr);
        if(aggregatedData.filterBy && aggregatedData.queryBy && aggregatedData.termType){
          setLoadingState(true)
        
          const res = await dispatch(getTagPageFilteredBookmarks(aggregatedData?.filterBy,aggregatedData?.queryBy,aggregatedData?.termType,1,name,'',''))
          if(res.error === undefined){
            setFilteredBookmarks(res?.payload?.data?.finalRes)
            setTotalCount(res?.payload?.data?.totalCount)
          }
          setLoadingState(false)

          setTagConfig(payload)
          dispatch(updateConfigTag(payload))
          return;
        }
        
        setIsFilter(false)
        setTagConfig(payload)
        dispatch(updateConfigTag(payload))
    }

    const handleSortRemoveAll = async () => {
        setSortArr([])
        const payload = {
            ...tagConfig,
            tagId:id,
            sort: []
        }
        setTagConfig(payload)
       await dispatch(updateConfigTag(payload))
    }

    const changeSortOrder = async (arr) => {
        const a = [...arr]
        setSortArr(a)
        const payload = {
            ...tagConfig,
            tagId:id,
            sort: a
        }
        setTagConfig(payload)
        await dispatch(updateConfigTag(payload))
    }

    const handleOpenSelectBookmarkDrawer = () => {
    setOpenSelectBookmarkDrawer(true)
  }

    const handleCancelSelectedBookmark = () => {
    setCheckedBookmark([])
  }

    const handleFilterAdd = () => {
    const newObj = {
      filterBy: "",
      termType: "",
      queryBy: "",
      platform: ''
    };

    const arr = [...filterArr, newObj];

    setFilterArr(arr);
  };
   
    const handleFilterSave = async () => {
      if(filterArr.length === 0) return;

        for (let obj of filterArr) {
            if (obj.filterBy.trim() === "" || obj.termType.trim() === "") {
                message.error('Filterby and condition are required')
                return;
            }
        }

        const sortby= sortArr.length>0 ? sortArr[0]?.sortby : ''
        const orderby= sortArr.length>0 ? (sortArr[0]?.orderby || 'asc') : ''

        const aggregatedData = aggregateProperties(filterArr);
        dispatch(resetTagPageFilteredBookmark())
        setLoadingState(true)
        setIsFilter(true)

        setFilterPage(1);
        setFilterHasMore(true)
        const res = await dispatch(getTagPageFilteredBookmarks(aggregatedData.filterBy,aggregatedData.queryBy,aggregatedData.termType,1,name,sortby,orderby))

        if(res.error === undefined){
          setFilteredBookmarks(res?.payload?.data?.finalRes)
          setTotalCount(res?.payload?.data?.totalCount)
        }

        setLoadingState(false);

        const data = {
          ...tagConfig,
            tagId:id,
          filter: filterArr,
        };
        setTagConfig(data)
        await dispatch(updateConfigTag(data))
    }

    const handleFilterRemove = async (i) => {
        const arr = [...filterArr]
        if(arr.length === 1 && sortArr.length === 0){
          arr.splice(i, 1);
          setFilterArr([]);
          const data = {
            ...tagConfig,
            tagId:id,
            filter: []
          }

          setIsFilter(false)
          setTagConfig(data)
          await dispatch(updateConfigTag(data))
          dispatch(resetTagPageFilteredBookmark())
          setFilterPage(1)
          setFilterHasMore(false)
          setFilteredBookmarks([])
          setTotalCount(tagBookmarks?.length)
          return;
        }

        if(arr.length === 1 && sortArr.length === 1){
          const sortby= sortArr.length>0 ? sortArr[0]?.sortby : ''
          const orderby= sortArr.length>0 ? sortArr[0]?.orderby : ''

          arr.splice(i, 1);
          setFilterArr([]);
          setFilterPage(1)
          setFilterHasMore(true)

          if(orderby){
            setLoadingState(true)
            const res = await dispatch(getTagPageFilteredBookmarks('','','',1,name,sortby,orderby))
            if(res.error === undefined){
              setFilteredBookmarks(res?.payload?.data?.finalRes)
              setTotalCount(res?.payload?.data?.totalCount)
            }

            setLoadingState(false);

            const data = {
              ...tagConfig,
              tagId:id,
              filter: []
            }

            setTagConfig(data)
            dispatch(updateConfigTag(data))
            return;
          }
          
          setIsFilter(false)
          const data = {
              ...tagConfig,
              tagId:id,
              filter: []
          }

          setTagConfig(data)
          dispatch(updateConfigTag(data))
        }

        arr.splice(i,1)
        setFilterArr(arr)
        const data = {
            ...tagConfig,
            tagId:id,
            filter: arr
        }
        setTagConfig(data)
        await dispatch(updateConfigTag(data))
    }

    const handleFilterRemoveAll = async() => {
      if(sortArr.length === 0){
        setFilterArr([])
        setIsFilter(false)
        dispatch(resetTagPageFilteredBookmark())
        const data = {
            ...tagConfig,
            tagId:id,
            filter: []
        }
        setFilterPage(1)
        setFilterHasMore(false)
        setFilteredBookmarks([])
        setTotalCount(tagBookmarks?.length)
        setTagConfig(data)
        dispatch(updateConfigTag(data))
        return;
      }

      const sortby= sortArr.length>0 ? sortArr[0]?.sortby : ''
      const orderby= sortArr.length>0 ? sortArr[0]?.orderby : ''

        setFilterArr([])
        setFilterPage(1)
        setFilterHasMore(true)

        if(orderby){
          setLoadingState(true)
          const res = await dispatch(getTagPageFilteredBookmarks('','','',1,name,sortby,orderby))
          if(res.error === undefined){
            setFilteredBookmarks(res?.payload?.data?.finalRes)
            setTotalCount(res?.payload?.data?.totalCount)
          }

          setLoadingState(false);
          const data = {
              ...tagConfig,
              tagId:id,
              filter: []
          }
          setTagConfig(data)
          dispatch(updateConfigTag(data))
          return;
        }

        setIsFilter(false)
        const data = {
              ...tagConfig,
              tagId:id,
              filter: []
          }
          setTagConfig(data)
          dispatch(updateConfigTag(data))
        
    }

    const changeFilterOrder = async (arr) => {
        const a = [...arr]
        setFilterArr(a)
        const data = {
            ...tagConfig,
            tagId:id,
            filter: a
        }
        setTagConfig(data)
        await dispatch(updateConfigTag(data))
    }

    const handleSelectAllSelectedBookmark = () => {
    setCheckedBookmark(isFilter ? filteredBookmarks : (tagBookmarks || []))
  }

  const handleOpenAllSelectedLinks = () => {
    const urls = checkedBookmark
      .filter((item) => item?.url)
      .map((item) => item.url);

    let popupBlocked = false;

    if (urls.length) {
      urls.forEach((url) => {
        const newWindow = window.open(url, "_blank");
        if (
          !newWindow ||
          newWindow.closed ||
          typeof newWindow.closed === "undefined"
        ) {
          popupBlocked = true;
        }
      });

      if (popupBlocked) {
        alert(
          "Your browser is blocking pop-ups. Please allow pop-ups for this site to open all links."
        );
      }
    }
  };

    const submit = async(data,type='edit') => {
        if(type === 'edit'){
          const result = updateBookmarkState(isFilter ? filteredBookmarks : tagBookmarks,data)
          isFilter ? setFilteredBookmarks(result) : setTagBookmarks(result)
          if(layout === 'inbox'){
            dispatch(inboxViewUpdates({
              type : 'edit',
              data: data
            }))
          }
        }
        if(type === 'delete'){
          const result = deleteBookmarkState(isFilter ? filteredBookmarks : tagBookmarks,data)
          isFilter ? setFilteredBookmarks(result) : setTagBookmarks(result)
          if(layout === 'inbox'){
            dispatch(inboxViewUpdates({
              type : 'delete',
              data: data
            }))
          }
        }
    }


    const handleEditPagesIn = async(item) => {
        setEditPagesIn(item)
        session.setEditPagesInSession(item)
        const data = {
            editPagesIn:item,
        }

        dispatch(updateUser(data))
    }

    const handleGemOnClickEvent = async (item) => {
      setGemOnClickEvent(item);
      const payload = {
        gemOnClickEvent: item,
      };
      dispatch(updateTag(id, payload));
    };

  const handleCardSize = async(item) => {
        setCardSize(item)

        const data = {
            ...tagConfig,
            tagId:id,
            cardSize:item,
        }
        setTagConfig(data)
        await dispatch(updateConfigTag(data))
    }

    const handleTableVerticalLine = async(checked) => {
        setShowTableVerticalLine(checked)

        const data = {
            ...tagConfig,
            tagId:id,
            showTableVerticalLine:checked,
        }
        setTagConfig(data)
        await dispatch(updateConfigTag(data))
    }

    const handleTableWrapColumns = async (checked) => {
        setTableWrapColumns(checked)

       
        const data = {
            ...tagConfig,
            tagId:id,
            tableWrapColumns:checked,
        }
        setTagConfig(data)
        await dispatch(updateConfigTag(data))
    }

    const handleOpenPagesIn = async (item) => {
    if(item === 'full page'){
      setShrink(false)
    }
    setOpenPagesIn(item);
    session.setOpenPagesInSession(item);
    const data = {
      openPagesIn: item,
    };

    dispatch(updateUser(data));
  };

  const handleSaveCoverSize = async (value) => {
    setCoverSize(value);
    const payload = {
      background: {
        ...coverImage,
        size: value,
      },
    };
    const res1 = await dispatch(updateTag(id, payload));
    if (res1.error === undefined) {
      setLoadingCoverImg(false);
      setSelectedCoverImage("");
      setSelectedCoverGallery("");
      setSelectedCoverUnSplash("");
      setOpenCoverModal(false);
      setOpenTagCollectionDrawer(false)
      setCoverImage(
        res1?.payload?.data?.data?.attributes?.background || ""
      );
    } else {
      setLoadingCoverImg(false);
      setSelectedCoverImage("");
      setSelectedCoverGallery("");
      setSelectedCoverUnSplash("");
      setOpenCoverModal(false);
      setOpenTagCollectionDrawer(false);
    }
  };

  //wallpaper
  const handleWallpaperImageUploadChange = (files) => {
        const fileSize = files.size / 1024 / 1024; // Convert to MB
        // if (fileSize > 5) {
        //     message.error(TextMessage.FILE_SIZE_ERROR);
        //     return
        // }
        setSelectedWallpaperUnSplash('')
        setSelectedWallpaperGallery('')
        setSelectedWallpaperImage(files)
    }
    const handleWallpaperUnSplashUploadChange = (files) => {
        setSelectedWallpaperImage('')
        setSelectedWallpaperGallery('')
        setSelectedWallpaperUnSplash(files)
    }
    const handleWallpaperGalleryUploadChange = (e) => {
        setSelectedWallpaperImage('')
        setSelectedWallpaperUnSplash('')
        const hexColor = rgbToHex(e.target.style.background)
        setSelectedWallpaperGallery(hexColor)
    }

    const handleWallpaperModalSubmit = async () => {
        if (selectedWallpaperImage) {
            setLoadingWallpaperImg(true)
            const formData = new FormData();

            formData.append('files', selectedWallpaperImage)

            const res = await dispatch(UploadCoverS3Link(formData, id))
            if (res.error === undefined) {
              const payload = {
                  wallpaper: {
                    type: 'upload',
                    icon: res.payload.data.media[0],
                  }
              }
              const res1 = await dispatch(updateTag(id,payload))
                if (res1.error === undefined) {
                    setLoadingWallpaperImg(false)
                    setSelectedWallpaperImage('')
                    setSelectedWallpaperGallery('')
                    setSelectedWallpaperUnSplash('')
                    setOpenWallpaperModal(false)
                    setWallpaper(res1?.payload?.data?.data?.attributes?.wallpaper || '')
                } else {
                    setLoadingWallpaperImg(false)
                    setSelectedWallpaperImage('')
                    setSelectedWallpaperGallery('')
                    setSelectedWallpaperUnSplash('')
                    setOpenWallpaperModal(false)
                }
            }
            return;
        }

        if (selectedWallpaperUnSplash) {
            setLoadingWallpaperImg(true)
            const res = await dispatch(UploadUnsplashCoverS3Link(selectedWallpaperUnSplash, id))
            
            if (res.error === undefined) {
                const payload = {
                  wallpaper: {
                    type: 'unsplash',
                    icon: res.payload.data.media[0],
                  }
                }
                const res1 = await dispatch(updateTag(id,payload))

                if (res1.error === undefined) {
                    setLoadingWallpaperImg(false)
                    setSelectedWallpaperImage('')
                    setSelectedWallpaperUnSplash('')
                    setSelectedWallpaperGallery('')
                    setOpenWallpaperModal(false)
                    setWallpaper(res1?.payload?.data?.data?.attributes?.wallpaper || '')
                } else {
                    setSelectedWallpaperGallery('')
                    setLoadingWallpaperImg(false)
                    setSelectedWallpaperImage('')
                    setSelectedWallpaperUnSplash('')
                    setOpenWallpaperModal(false)
                }
            }
            return;
        }

        if (selectedWallpaperGallery) {
            setLoadingWallpaperImg(true)
            const payload = {
                  wallpaper: {
                    type: 'gallery',
                    icon: selectedWallpaperGallery,
                  }
                }
            const res1 = await dispatch(updateTag(id,payload))
            if (res1.error === undefined) {
                setLoadingWallpaperImg(false)
                setSelectedWallpaperImage('')
                setSelectedWallpaperUnSplash('')
                setSelectedWallpaperGallery('')
                setOpenWallpaperModal(false)
                setWallpaper(res1?.payload?.data?.data?.attributes?.wallpaper || '')
            } else {
                setSelectedWallpaperGallery('')
                setLoadingWallpaperImg(false)
                setSelectedWallpaperImage('')
                setSelectedWallpaperUnSplash('')
                setOpenWallpaperModal(false)
            }
        }
    }

    const handleDeleteCoverS3Link = async (type) => {
      if(type === 'cover'){
      if (coverImage?.type === 'upload' || coverImage?.type === 'unsplash') {
            setLoadingCoverImg(true)
            const res = await dispatch(deleteCoverS3Link(coverImage?.icon))

            if (res.error === undefined) {
                const payload = {
                    background: null,
                }

                const res1 = await dispatch(updateTag(id, payload))
                if (res1.error === undefined) {
                    setCoverImage('')
                    setSelectedCoverGallery('')
                    setSelectedCoverImage('')
                    setSelectedCoverUnSplash('')
                    setLoadingCoverImg(false)
                    setOpenCoverModal(false)
                } else {
                    setSelectedCoverGallery('')
                    setSelectedCoverImage('')
                    setSelectedCoverUnSplash('')
                    setLoadingCoverImg(false)
                    setOpenCoverModal(false)
                }
            } else {
                setLoadingCoverImg(false)
                setOpenCoverModal(false)
            }
            return;
        }

        setLoadingCoverImg(true)
        const payload = {
            background: null,
        }
        const res1 = await dispatch(updateTag(id, payload))
        if (res1.error === undefined) {
            setCoverImage('')
            setSelectedCoverGallery('')
            setSelectedCoverImage('')
            setSelectedCoverUnSplash('')
            setLoadingCoverImg(false)
            setOpenCoverModal(false)
        } else {
            setSelectedCoverGallery('')
            setSelectedCoverImage('')
            setSelectedCoverUnSplash('')
            setLoadingCoverImg(false)
            setOpenCoverModal(false)
        }
    }

        if (wallpaper?.type === 'upload' || wallpaper?.type === 'unsplash') {
            setLoadingWallpaperImg(true)
            const res = await dispatch(deleteCoverS3Link(wallpaper?.icon))

            if (res.error === undefined) {
                const payload = {
                  wallpaper: null
                }

                const res1 = await dispatch(updateTag(id,payload))
                if (res1.error === undefined) {
                    setWallpaper(payload.wallpaper)
                    setSelectedWallpaperGallery('')
                    setSelectedWallpaperImage('')
                    setSelectedWallpaperUnSplash('')
                    setLoadingWallpaperImg(false)
                    setOpenWallpaperModal(false)
                } else {
                    setSelectedWallpaperGallery('')
                    setSelectedWallpaperImage('')
                    setSelectedWallpaperUnSplash('')
                    setLoadingWallpaperImg(false)
                    setOpenWallpaperModal(false)
                }
            } else {
                setLoadingWallpaperImg(false)
                setOpenWallpaperModal(false)
            }
            return;
        }

        setLoadingWallpaperImg(true)
        const payload = {
                  wallpaper: null
                }

        const res1 = await dispatch(updateTag(id,payload))
        if (res1.error === undefined) {
            setWallpaper(payload.wallpaper)
            setSelectedWallpaperGallery('')
            setSelectedWallpaperImage('')
            setSelectedWallpaperUnSplash('')
            setLoadingWallpaperImg(false)
            setOpenWallpaperModal(false)
        } else {
            setSelectedWallpaperGallery('')
            setSelectedWallpaperImage('')
            setSelectedWallpaperUnSplash('')
            setLoadingWallpaperImg(false)
            setOpenWallpaperModal(false)
        }
    }

    const handleCoverModal = () => {
        setOpenCoverModal(true)
    }

  //for covers
  const handleImageUploadChange = (files) => {
        const fileSize = files.size / 1024 / 1024; // Convert to MB
        // if (fileSize > 5) {
        //     message.error(TextMessage.FILE_SIZE_ERROR);
        //     return
        // }
        setSelectedCoverUnSplash('')
        setSelectedCoverGallery('')
        setSelectedCoverImage(files)
    }
    const handleUnSplashUploadChange = (files) => {
        setSelectedCoverImage('')
        setSelectedCoverGallery('')
        setSelectedCoverUnSplash(files)
    }
    const handleGalleryUploadChange = (e) => {
        setSelectedCoverImage('')
        setSelectedCoverUnSplash('')
        const hexColor = rgbToHex(e.target.style.background)
        setSelectedCoverGallery(hexColor)
    }

    const handleCoverModalSubmit = async () => {
        if (selectedCoverImage) {
            setLoadingCoverImg(true)
            const formData = new FormData();

            formData.append('files', selectedCoverImage)

            const res = await dispatch(UploadCoverS3LinkTag(formData, id))

            if (res.error === undefined) {
                const payload = {
                  background: {
                    type: "upload",
                    icon: res.payload.data.media[0],
                    imagePosition: { x: 50, y: 50 },
                    size: coverSize,
                  },
                };

                const res1 = await dispatch(updateTag(id, payload))
                if (res1.error === undefined) {
                    setLoadingCoverImg(false)
                    setSelectedCoverImage('')
                    setSelectedCoverGallery('')
                    setSelectedCoverUnSplash('')
                    setOpenCoverModal(false)
                    setCoverImage(res1?.payload?.data?.data?.attributes?.background || '')
                    setOpenTagCollectionDrawer(false)
                } else {
                    setLoadingCoverImg(false)
                    setSelectedCoverImage('')
                    setSelectedCoverGallery('')
                    setSelectedCoverUnSplash('')
                    setOpenCoverModal(false)
                    setOpenTagCollectionDrawer(false)
                }
            }
            return;
        }

        if (selectedCoverUnSplash) {
            setLoadingCoverImg(true)
            const res = await dispatch(UploadUnsplashCoverS3LinkTag(selectedCoverUnSplash, id))

            if (res.error === undefined) {
                const payload = {
                  background: {
                    type: "unsplash",
                    icon: res.payload.data.media[0],
                    imagePosition: { x: 50, y: 50 },
                    size: coverSize,
                  },
                };

                const res1 = await dispatch(updateTag(id, payload))
                if (res1.error === undefined) {
                    setLoadingCoverImg(false)
                    setSelectedCoverImage('')
                    setSelectedCoverUnSplash('')
                    setSelectedCoverGallery('')
                    setOpenCoverModal(false)
                    setCoverImage(res1?.payload?.data?.data?.attributes?.background || '')
                    setOpenTagCollectionDrawer(false)
                } else {
                    setSelectedCoverGallery('')
                    setLoadingCoverImg(false)
                    setSelectedCoverImage('')
                    setSelectedCoverUnSplash('')
                    setOpenCoverModal(false)
                    setOpenTagCollectionDrawer(false)
                }
            }
            return;
        }

        if (selectedCoverGallery) {
            setLoadingCoverImg(true)
            const payload = {
              background: {
                type: "gallery",
                icon: selectedCoverGallery,
                size: coverSize,
              },
            };

            const res1 = await dispatch(updateTag(id, payload))
            if (res1.error === undefined) {
                setLoadingCoverImg(false)
                setSelectedCoverImage('')
                setSelectedCoverUnSplash('')
                setSelectedCoverGallery('')
                setOpenCoverModal(false)
                setCoverImage(res1?.payload?.data?.data?.attributes?.background || '')
                setOpenTagCollectionDrawer(false)
            } else {
                setSelectedCoverGallery('')
                setLoadingCoverImg(false)
                setSelectedCoverImage('')
                setSelectedCoverUnSplash('')
                setOpenCoverModal(false)
                setOpenTagCollectionDrawer(false)
            }
        }
    }

  // for collection icons 

    const handleEmoji = (emojiData) => {
        setSelectedEmoji(emojiData)
        setSelectedColor('')
        setSelectedImage('')
        setSelectedIcon('')
    }

    const handleColor = (newColor) => {
        setSelectedColor(newColor.hex);
        setSelectedEmoji('')
        setSelectedImage('')
        setSelectedIcon('')
    }

    const handleIcon = (iconName) => {
        setSelectedIcon(iconName)
        setSelectedColor('');
        setSelectedEmoji('')
        setSelectedImage('')
    }

    const handleIconImageUploadChange = async (files) => {
        const fileSize = files.size / 1024 / 1024; // Convert to MB
        // if (fileSize > 5) {
        //     message.error(TextMessage.FILE_SIZE_ERROR);
        //     return
        // }
        setSelectedImage(files)
        setSelectedColor('');
        setSelectedEmoji('')
        setSelectedIcon('')
    };

    const handleIconCoverModalSubmit = async () => {
        if (selectedImage) {
            setLoadingImg(true)
            const formData = new FormData();

            formData.append('file', selectedImage)

            const res = await dispatch(uploadIconsTag(formData))

            if (res.error === undefined) {
                const payload = {
                    avatar: {
                        icon: res.payload?.data?.message || '',
                        type: 'image'
                    }
                }
                const res1 = await dispatch(updateTag(id, payload))

                if (res1.error === undefined) {
                    setLoadingImg(false)
                    setOpenIcon(false)
                    setIcon(res1?.payload?.data?.data?.attributes?.avatar)
                    return;
                }
            } else {
                setLoadingImg(false)
                setSelectedImage('')
                setOpenIcon(false)
            }

            return;
        }

        if (selectedColor) {
            setLoadingImg(true)
            const payload = {
                avatar: {
                    icon: selectedColor || '',
                    type: 'color'
                }
            }
            const res = await dispatch(updateTag(id, payload))

            if (res.error === undefined) {
                setLoadingImg(false)
                setOpenIcon(false)
                setIcon(res?.payload?.data?.data?.attributes?.avatar)
                return;
            }

        }

        if (selectedEmoji) {
            setLoadingImg(true)
            const payload = {
                avatar: {
                    icon: selectedEmoji.unified || '',
                    type: 'emoji'
                }
            }
            const res = await dispatch(updateTag(id, payload))

            if (res.error === undefined) {
                setLoadingImg(false)
                setOpenIcon(false)
                setIcon(res?.payload?.data?.data?.attributes?.avatar)
                return;
            }
        }

        if (selectedIcon) {
            setLoadingImg(true)
            const payload = {
                avatar: {
                    icon: selectedIcon || '',
                    type: 'icon'
                }
            }
            const res = await dispatch(updateTag(id, payload))

            if (res.error === undefined) {
                setLoadingImg(false)
                setOpenIcon(false)
                setIcon(res?.payload?.data?.data?.attributes?.avatar)
                return;
            }
        }
    }

    const resetCancelValues = () => {
        setSelectedEmoji(icon?.type === 'emoji' ? icon?.icon : '')
        setSelectedColor(icon?.type === 'color' ? icon?.icon : '')
        setSelectedImage(icon?.type === 'image' ? icon?.icon : '')
        setSelectedIcon(icon?.type === 'icon' ? icon?.icon : '')
        setOpenIcon(false)
    }

    const handleRemoveIconModalSubmit = async () => {
        setLoadingImg(true)
        const payload = {
            avatar: null
        }
        const res = await dispatch(updateTag(id, payload))
        if (res.error === undefined) {
            setLoadingImg(false)
            setOpenIcon(false)
            setIcon('')
            setSelectedEmoji('')
            setSelectedColor('')
            setSelectedImage('')
            setSelectedIcon('')
        }
    }

    const handleMouseDown = e => {
        if (repositionMode) {
            setIsDragging(true);
        }
    };

    const handleMouseUp = e => {
        setIsDragging(false);
    };

    const handleMouseMove = e => {
        if (isDragging) {
            const rect = imageRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            setImagePosition({ x, y });
        }
    };

    const handleSaveReposition = async () => {
        const payload = {
            background: {
                type: coverImage?.type,
                icon: coverImage?.icon,
                imagePosition: { x: imagePosition.x, y: imagePosition.y }
            },
        }

        const res = await dispatch(updateTag(id, payload))
        if (res.error === undefined) {
            setCoverImage(res?.payload?.data?.data?.attributes?.background || '')
            setRepositionMode(false)
            setIsDragging(false)
        } else {
            setRepositionMode(false)
            setIsDragging(false)
        }
    }

    const handleRepositionMode = () => {
        setRepositionMode(true)
    }

    const handleCancelPosition = () => {
        setIsDragging(false);
        setRepositionMode(false);
        setImagePosition({ x: coverImage?.imagePosition?.x, y: coverImage?.imagePosition?.y })
    }

    const handleOpenCoverModal = () => {
        setOpenCoverModal(true)
    }

    const handleTextEditor = async(value) => {
      setShowTextEditor(value)

      const data = {
            ...tagConfig,
            tagId:id,
            showTextEditor:value,
        }
        setTagConfig(data)
        await dispatch(updateConfigTag(data))
        setOpenTagCollectionDrawer(false)
    }

    const showComment = (id) => {
    setOpenCommentDrawer(true);
    setSelectedGem(id);
  };

  const handleShareClick = async () => {
        setLoadingState(true)
        const res = await dispatch(getSingleTagDetails(id))

        if (res) {
            setLoadingState(false)
            setOpenShareTagDrawer(true)
        }
    }

    const getSortedItems = (items) => {
    //initItemsId --> items id we have loaded per page only
    const initReoderedItemsId = items?.map(item => item.id)
    const order = [...orderOfGems]
    const length = tagBookmarks?.length

    //getItemsAfter --> rest id of ordersGems not loaded in page
    const getItemsAfter = order.slice(length)
    const reorder = [...initReoderedItemsId,...getItemsAfter]

    setTagBookmarks(items)
    setOrderOfGems(reorder)
      const payload = {
        order_of_gems: reorder
      }

     dispatch(updateTag(id, payload))
  }

    const handleDeleteCollection = async () => {
    Modal.confirm({
            title: TextMessage.CONFIRM_TEXT,
            okText: 'Yes',
            cancelText: 'No',
            onOk: () =>deleteYes(),
            okType:'primary',
        });
  }

  const deleteYes = async () => {
      const isSelectedTagShared = getAllLevelCollectionPermissions(sharedTags,id)

        if(!isSelectedTagShared){
            const res = await dispatch(deleteTag(id))

            if(res.error === undefined){
                message.success(TextMessage.TAG_DELETE_TEXT)
                navigate.push(`/u/${session.username}/all-bookmarks`)
            }
            return;
        }

        if((isSelectedTagShared?.accessType === 'viewer') || (isSelectedTagShared?.accessType === 'editor' && isSelectedTagShared.topLevel)){
            message.error('You dont have permission to delete this shared tag')
            return;
        }

        if(isSelectedTagShared?.accessType === 'owner' || (isSelectedTagShared?.accessType === 'editor' && !isSelectedTagShared.topLevel)){
            const res = await dispatch(deleteTag(id,isSelectedTagShared))

            if(res.error === undefined){
                message.success(TextMessage.TAG_DELETE_TEXT)
                return navigate.push(`/u/${session.username}/all-bookmarks`)
            }else{
            }
        }
    }

    const handleShareMobileView = async () => {
        setLoadingState(true)
        const res = await dispatch(getSingleTagDetails(id))

        if (res) {
            setLoadingState(false)
            setShowShareMobileView(true)
        }
    }

    const handleViewSubTag = async(value) => {
        setViewSubTags(value)

        const payload = {
          viewSubTag: value,
        };

        dispatch(updateTag(id, payload));
    }

    const handleHideGems = (value) => {
        setHideGems(value)

        const payload = {
          hideGem: value,
        };

        dispatch(updateTag(id, payload));
    }

    const handleShowGems = (value) => {
      setShowGems(value);

      const payload = {
        showGem: value,
      };

      dispatch(updateTag(id, payload));
    };

    const handleHideBrokenLinks = (value) => {
      setHideBrokenLinks(value);

      const data = {
        ...tagConfig,
        tagId: id,
        hideBrokenLinks: value,
      };
        setTagConfig(data)
        dispatch(updateConfigTag(data))
    };

    if (!mounted) return <></>;
    
    return (
      <CommonLayout
        coverImage={coverImage}
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        handleMouseMove={handleMouseMove}
        repositionMode={repositionMode}
        imagePosition={imagePosition}
        isDragging={isDragging}
        handleCancelPosition={handleCancelPosition}
        handleRepositionMode={handleRepositionMode}
        handleSaveReposition={handleSaveReposition}
        handleOpenCoverModal={handleOpenCoverModal}
        loading={loadingState}
        imageRef={imageRef}
        // page='tags'
        // isSharedAndAllowEdit={(!permissions || (permissions && (permissions?.accessType === 'editor' || permissions?.accessType === 'owner')))}
        // handleShareClick={handleShareClick} handleEditCall={handleEditCall}
        // copyUrl= {`${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/tags/${id}/${title}`}
        // addEditIcon={(!permissions || ((permissions && permissions?.permissions?.existingCollections?.canUpdate) || (permissions && permissions?.accessType === 'owner'))) ? true : false}
        // handleDeleteCollection={handleDeleteCollection}
      >
        <>
          {loadingState ? (
            <div className="spinDiv">
              <Spin size="middle" tip="Loading..." />
            </div>
          ) : (
            <>
              {/* header area */}

              <div className="sticky top-0 w-full bg-white z-[100]">
                <BreadCrumbNav
                  page="tags"
                  targetId={id}
                  isSharedAndAllowEdit={
                    !permissions ||
                    (permissions &&
                      (permissions?.accessType === "editor" ||
                        permissions?.accessType === "owner"))
                  }
                  handleShareClick={handleShareClick}
                  handleEditCall={handleEditCall}
                  copyUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/u/${authorName}/tags/${id}/${title}`}
                  addEditIcon={
                    !permissions ||
                    (permissions &&
                      permissions?.permissions?.existingCollections
                        ?.canUpdate) ||
                    (permissions && permissions?.accessType === "owner")
                      ? true
                      : false
                  }
                  handleDeleteCollection={handleDeleteCollection}
                  title={title}
                  isSubTag={isSubTag}
                  handleShareMobileView={handleShareMobileView}
                  // isMobile={isMobile} collapsed={collapsed}
                  userTags={userTags}
                  propertyShown={propertyShown}
                  propertyHidden={propertyHidden}
                  propertyOrder={propertyOrder}
                  layout={layout}
                  sort={sortArr}
                  filter={filterArr}
                  handleFilterSave={handleFilterSave}
                  handleFilterRemove={handleFilterRemove}
                  changeFilterOrder={changeFilterOrder}
                  setFilterArr={setFilterArr}
                  setSortArr={setSortArr}
                  handleSortSave={handleSortSave}
                  handleSortRemove={handleSortRemove}
                  changeSortOrder={changeSortOrder}
                  updatePropertyOnDrop={updatePropertyOnDrop}
                  handlePropertyVisible={handlePropertyVisible}
                  handlePropertyHide={handlePropertyHide}
                  handleLayout={handleLayout}
                  handleSortRemoveAll={handleSortRemoveAll}
                  handleFilterRemoveAll={handleFilterRemoveAll}
                  handleRefreshProperty={handleRefreshProperty}
                  editPagesIn={editPagesIn}
                  handleEditPagesIn={handleEditPagesIn}
                  cardSize={cardSize}
                  handleCardSize={handleCardSize}
                  handleTableVerticalLine={handleTableVerticalLine}
                  showTableVerticalLine={showTableVerticalLine}
                  handleTableWrapColumns={handleTableWrapColumns}
                  tableWrapColumns={tableWrapColumns}
                  openPagesIn={openPagesIn}
                  handleOpenPagesIn={handleOpenPagesIn}
                  handleFilterAdd={handleFilterAdd}
                  handleSortAdd={handleSortAdd}
                  showTextEditor={showTextEditor}
                  handleTextEditor={handleTextEditor}
                  handleCoverModal={handleCoverModal}
                  setOpenIcon={setOpenIcon}
                  descriptionContent={descriptionContent}
                  setDescriptionContent={setDescriptionContent}
                  permissions={permissions}
                  icon={icon}
                  tagId={id}
                  viewSubTags={viewSubTags}
                  handleViewSubTag={handleViewSubTag}
                  coverImage={coverImage}
                  hideGems={hideGems}
                  handleHideGems={handleHideGems}
                  showGems={showGems}
                  handleShowGems={handleShowGems}
                  hideBrokenLinks={hideBrokenLinks}
                  handleHideBrokenLinks={handleHideBrokenLinks}
                  handleGemOnClickEvent={handleGemOnClickEvent}
                  gemOnClickEvent={gemOnClickEvent}
                  isFollowedCollection={false}
                  showInviteAndShare={
                    !permissions ||
                    (permissions &&
                      (permissions?.accessType === "editor" ||
                        permissions?.accessType === "owner"))
                  }
                />
              </div>

              {coverImage && (
                <HeaderComponent
                  coverImage={coverImage}
                  handleMouseDown={handleMouseDown}
                  handleMouseUp={handleMouseUp}
                  handleMouseMove={handleMouseMove}
                  repositionMode={repositionMode}
                  imagePosition={imagePosition}
                  isDragging={isDragging}
                  handleCancelPosition={handleCancelPosition}
                  handleRepositionMode={handleRepositionMode}
                  handleSaveReposition={handleSaveReposition}
                  handleOpenCoverModal={handleOpenCoverModal}
                  loading={loading}
                  imageRef={imageRef}
                  // collapsed={collapsed}
                />
              )}

              <Topbar
                title={title || ""}
                page="tags"
                userTags={userTags}
                propertyShown={propertyShown}
                propertyHidden={propertyHidden}
                propertyOrder={propertyOrder}
                layout={layout}
                sort={sortArr}
                filter={filterArr}
                handleFilterSave={handleFilterSave}
                handleFilterRemove={handleFilterRemove}
                changeFilterOrder={changeFilterOrder}
                setFilterArr={setFilterArr}
                setSortArr={setSortArr}
                handleSortSave={handleSortSave}
                handleSortRemove={handleSortRemove}
                changeSortOrder={changeSortOrder}
                updatePropertyOnDrop={updatePropertyOnDrop}
                handlePropertyVisible={handlePropertyVisible}
                handlePropertyHide={handlePropertyHide}
                handleLayout={handleLayout}
                checkedBookmark={checkedBookmark}
                handleOpenSelectBookmarkDrawer={handleOpenSelectBookmarkDrawer}
                handleCancelSelectedBookmark={handleCancelSelectedBookmark}
                handleSelectAllSelectedBookmark={
                  handleSelectAllSelectedBookmark
                }
                handleSortRemoveAll={handleSortRemoveAll}
                handleFilterRemoveAll={handleFilterRemoveAll}
                handleRefreshProperty={handleRefreshProperty}
                editPagesIn={editPagesIn}
                handleEditPagesIn={handleEditPagesIn}
                cardSize={cardSize}
                handleCardSize={handleCardSize}
                handleTableVerticalLine={handleTableVerticalLine}
                showTableVerticalLine={showTableVerticalLine}
                handleTableWrapColumns={handleTableWrapColumns}
                tableWrapColumns={tableWrapColumns}
                openPagesIn={openPagesIn}
                handleOpenPagesIn={handleOpenPagesIn}
                handleFilterAdd={handleFilterAdd}
                handleSortAdd={handleSortAdd}
                allCollectionsValue={allCollectionsValue}
                showShare={true}
                coverImage={coverImage}
                showTextEditor={showTextEditor}
                handleTextEditor={handleTextEditor}
                handleCoverModal={handleCoverModal}
                setOpenIcon={setOpenIcon}
                descriptionContent={descriptionContent}
                setDescriptionContent={setDescriptionContent}
                permissions={permissions}
                icon={icon}
                tagId={id}
                handleEditCall={handleEditCall}
                addEditIcon={
                  !permissions ||
                  (permissions &&
                    permissions?.permissions?.existingCollections?.canUpdate) ||
                  (permissions && permissions?.accessType === "owner")
                    ? true
                    : false
                }
                handleShareClick={handleShareClick}
                setCheckedBookmark={setCheckedBookmark}
                submit={submit}
                setOpenWallpaperModal={setOpenWallpaperModal}
                collectionUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/u/${authorName}/tags/${id}/${title}`}
                viewSubTags={viewSubTags}
                handleViewSubTag={handleViewSubTag}
                hideGems={hideGems}
                handleHideGems={handleHideGems}
                showGems={showGems}
                handleShowGems={handleShowGems}
                hideBrokenLinks={hideBrokenLinks}
                handleHideBrokenLinks={handleHideBrokenLinks}
                handleGemOnClickEvent={handleGemOnClickEvent}
                gemOnClickEvent={gemOnClickEvent}
                handleOpenAllSelectedLinks={handleOpenAllSelectedLinks}
              />

              {subTagsCount === 0 &&
                Array.isArray(tagBookmarks) &&
                tagBookmarks?.length === 0 && (
                  <>
                    <div className="grid place-content-center mt-2">
                      <BookmarkUpload />
                    </div>
                  </>
                )}

              <div
                style={{
                  background: getBackgroundStyle(wallpaper, layout),
                }}
                className="h-full rounded-md pt-2"
              >
                {viewSubTags && (
                  <SubTagComponent
                    setSubTagsCount={setSubTagsCount}
                    tagId={id}
                    wallpaper={wallpaper}
                    isSharedAndAllowEdit={
                      !permissions ||
                      (permissions &&
                        (permissions?.accessType === "editor" ||
                          permissions?.accessType === "owner"))
                    }
                  />
                )}

                {showGems && (
                  <div className="py-2 px-3 xl:px-8">
                    <Views
                      layout={layout}
                      propertyOrder={propertyOrder}
                      propertyHidden={propertyHidden}
                      propertyShown={propertyShown}
                      items={isFilter ? filteredBookmarks : tagBookmarks || []}
                      page="tags"
                      openDrawer={openDrawer}
                      setOpenDrawer={setOpenDrawer}
                      setGemSingleIdSingleId={setGemSingleIdSingleId}
                      checkedBookmark={checkedBookmark}
                      setCheckedBookmark={setCheckedBookmark}
                      showComment={showComment}
                      showEdit={true}
                      shrink={shrink}
                      setShrink={setShrink}
                      cardSize={cardSize}
                      openPagesIn={openPagesIn}
                      showTableVerticalLine={showTableVerticalLine}
                      tableWrapColumns={tableWrapColumns}
                      isSharedAndAllowEdit={
                        !permissions ||
                        (permissions &&
                          (permissions?.accessType === "editor" ||
                            permissions?.accessType === "owner"))
                      }
                      permissions={permissions}
                      pageNumber={isFilter ? filterPage : page}
                      count={totalCount}
                      isFilter={isFilter}
                      tagId={id}
                      sortArr={sortArr}
                      filterArr={filterArr}
                      tagName={name}
                      getSortedItems={getSortedItems}
                      subTagsCount={subTagsCount}
                      gemOnClickEvent={gemOnClickEvent}
                    />
                  </div>
                )}
              </div>

              {openDrawer && (
                <SingleBookmarkDrawer
                  setOpenDrawer={setOpenDrawer}
                  setGemSingleIdSingleId={setGemSingleIdSingleId}
                  openDrawer={openDrawer}
                  gemSingleId={gemSingleId}
                  submit={submit}
                  page="tags"
                  editPagesIn={editPagesIn}
                  user={{ username: session.username }}
                  showEdit={true}
                  tagId={id}
                />
              )}

              {openSelectBookmarkDrawer && (
                <BookmarkSelectDrawer
                  openSelectBookmarkDrawer={openSelectBookmarkDrawer}
                  setOpenSelectBookmarkDrawer={setOpenSelectBookmarkDrawer}
                  checkedBookmark={checkedBookmark}
                  setCheckedBookmark={setCheckedBookmark}
                  page="tags"
                  submit={submit}
                  tagId={id}
                  allTags={
                    tagsWithGemsCount
                      ? [...tagsWithGemsCount, ...sharedTags]
                      : [...sharedTags]
                  }
                />
              )}

              {/* icon modal */}
              {openIcon && (
                <DialogModal
                  open={openIcon}
                  setOpen={setOpenIcon}
                  handleEmoji={handleEmoji}
                  handleColor={handleColor}
                  handleImageUploadChange={handleIconImageUploadChange}
                  selectedEmoji={selectedEmoji}
                  selectedColor={selectedColor}
                  setSelectedEmoji={setSelectedEmoji}
                  setSelectedColor={setSelectedColor}
                  handleCoverModalSubmit={handleIconCoverModalSubmit}
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  resetCancelValues={resetCancelValues}
                  loadingImg={loadingImg}
                  handleIcon={handleIcon}
                  selectedIcon={selectedIcon}
                  handleRemoveIconModalSubmit={handleRemoveIconModalSubmit}
                />
              )}

              {/* cover modal */}
              {openCoverModal && (
                <CoverModal
                  openCoverModal={openCoverModal}
                  setOpenCoverModal={setOpenCoverModal}
                  selectedCoverImage={selectedCoverImage}
                  setSelectedCoverImage={setSelectedCoverImage}
                  handleImageUploadChange={handleImageUploadChange}
                  handleUnSplashUploadChange={handleUnSplashUploadChange}
                  handleGalleryUploadChange={handleGalleryUploadChange}
                  loadingCoverImg={loadingCoverImg}
                  handleCoverModalSubmit={handleCoverModalSubmit}
                  collectionCoverImage={coverImage}
                  handleDeleteCoverS3Link={() =>
                    handleDeleteCoverS3Link("cover")
                  }
                  selectedCoverUnSplash={selectedCoverUnSplash}
                  setSelectedCoverUnSplash={setSelectedCoverUnSplash}
                  selectedCoverGallery={selectedCoverGallery}
                  setSelectedCoverGallery={setSelectedCoverGallery}
                  title="Choose cover"
                  setCoverSize={setCoverSize}
                  coverSize={coverSize}
                  handleSaveCoverSize={handleSaveCoverSize}
                />
              )}

              {/* wallpaper */}
              {openWallpaperModal && (
                <CoverModal
                  openCoverModal={openWallpaperModal}
                  setOpenCoverModal={setOpenWallpaperModal}
                  selectedCoverImage={selectedWallpaperImage}
                  setSelectedCoverImage={setSelectedWallpaperImage}
                  handleImageUploadChange={handleWallpaperImageUploadChange}
                  handleUnSplashUploadChange={
                    handleWallpaperUnSplashUploadChange
                  }
                  handleGalleryUploadChange={handleWallpaperGalleryUploadChange}
                  loadingCoverImg={loadingWallpaperImg}
                  handleCoverModalSubmit={handleWallpaperModalSubmit}
                  collectionCoverImage={wallpaper}
                  handleDeleteCoverS3Link={() =>
                    handleDeleteCoverS3Link("wallpaper")
                  }
                  selectedCoverUnSplash={selectedWallpaperUnSplash}
                  setSelectedCoverUnSplash={setSelectedWallpaperUnSplash}
                  selectedCoverGallery={selectedWallpaperGallery}
                  setSelectedCoverGallery={setSelectedWallpaperGallery}
                  title="Choose wallpaper"
                />
              )}

              {openEditTagDrawer && (
                <TagDrawer
                  open={openEditTagDrawer}
                  setOpenDrawer={setOpenTagCollectionDrawer}
                  title={"Edit Tag"}
                  action="edit"
                  id={Number(id)}
                  singleTagData={singleTagData}
                  userTags={userTags}
                  pageNumber={page}
                  setTitle={setTitle}
                  isSharedAndAllowDelete={
                    !permissions ||
                    (permissions &&
                      permissions?.permissions?.existingCollections?.canDelete)
                  }
                  isSharedAndAllowShare={
                    !permissions ||
                    (permissions &&
                      (permissions?.accessType === "editor" ||
                        permissions?.accessType === "owner"))
                  }
                  setOpenShareTagWithDrawer={setOpenShareTagWithDrawer}
                  openShareTagWithDrawer={openShareTagWithDrawer}
                  singleTagDetails={singleTag}
                  handleCoverModal={handleCoverModal}
                  setIcon={setIcon}
                  showTextEditor={showTextEditor}
                  handleTextEditor={handleTextEditor}
                  setCoverImage={setCoverImage}
                  setCoverSize={setCoverSize}
                  coverSize={coverSize}
                />
              )}

              <CommentDrawer
                openDrawer={openCommentDrawer}
                hideCommentDrawer={(val) => setOpenCommentDrawer(val)}
                selectedGem={selectedGem}
                user={{ id: session.userId, username: session.username }}
              />

              {(openShareTagDrawer || showShareMobileView) && (
                <ShareTagDrawer
                  openDrawer={openShareTagDrawer}
                  setOpenDrawer={setOpenShareTagDrawer}
                  singleTagDetails={singleTag || ""}
                  tagId={id || ""}
                  openShareTagWithDrawer={openShareTagWithDrawer}
                  tagName={title}
                  showShareMobileView={showShareMobileView}
                  setShowShareMobileView={setShowShareMobileView}
                  tagUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/tags/${id}/${title}`}
                />
              )}

              {showGems && layout !== "inbox" && loading && (
                <div className="spinDiv">
                  <Spin tip="Loading..." />
                </div>
              )}

              {/* Refs for observing infinite scroll */}
              {showGems && layout !== "inbox" && !isFilter && (
                <div
                  ref={setObserverRef}
                  style={{ height: "20px", visibility: "hidden" }}
                />
              )}

              {showGems && layout !== "inbox" && isFilter && (
                <div
                  ref={setObserverFilterRef}
                  style={{ height: "20px", visibility: "hidden" }}
                />
              )}
            </>
          )}
        </>
      </CommonLayout>
    );
}

export default Tags;