'use client'

import { inboxViewUpdates, sidebarMenuClicked } from "@actions/app";
import { gemAdded } from "@actions/bookmark";
import { UploadCoverS3Link, UploadUnsplashCoverS3Link, clearCollectionState, deleteCoverS3Link, fetchCollectionWiseCounts, getBookmarkInCollections, getCollectionFilteredBookmark, getCustomFields, getSharedCollections, getSingleCollection, resetCollectionFilteredBookmark, resetSharedCollections, updateCollection, updateCollectionPageConfig, uploadIcons, getPendingGems, copyCollection, followCollection, unfollowCollection, deleteCollection, removeAccessEmail } from "@actions/collection";
import { disableMsg } from "@actions/membership";
import { clearAllTags } from "@actions/tags";
import { updateUser } from "@actions/user";
import SubCollectionComponent from "@components/common/SubCollectionComponent";
import ApprovalRejectDrawer from "@components/drawers/ApprovalRejectDrawer";
import BookmarkSelectDrawer from "@components/drawers/BookmarkSelectDrawer";
import CollectionDrawer from "@components/drawers/CollectionDrawer";
import CommentDrawer from "@components/drawers/CommentDrawer";
import ShareCollectionDrawer from "@components/drawers/ShareCollectionDrawer";
import SingleBookmarkDrawer from "@components/drawers/SingleBookmarkDrawer";
import CommonLayout from "@components/layouts/CommonLayout";
import Topbar from "@components/layouts/Topbar/Topbar";
import CoverModal from "@components/modal/CoverModal";
import DialogModal from "@components/modal/Dialog";
import Views from "@components/views/Views";
import { TextMessage, aggregateProperties, defaultPropertyHidden, defaultPropertyOrder, defaultPropertyShown, getBackgroundStyle, getPropertiesData, rgbToHex } from "@utils/constants";
import { deleteBookmarkState, getAllLevelCollectionPermissions, removeSharedCollection, updateBookmarkState } from "@utils/find-collection-id";
import session from "@utils/session";
import { Spin, message, Collapse, Modal } from "antd";
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddBookmark from "@components/drawers/AddBookmark";
import { findFollowCollection } from "@utils/find-follow-collection";
import BreadCrumbNav from "@components/layouts/BreadCrumbNav";
import HeaderComponent from "@components/layouts/InnerHeader";
import BookmarkUpload from "@components/common/BookmarkUpload";

const { Panel } = Collapse;

const Collections = ({id,permissionsRes,authorName=''}) => {
    // let followCooll               = null
    const dispatch = useDispatch()
    const navigate = useRouter()
    const searchParams  = useSearchParams()
    const actionType = searchParams.get('action')
    const userId = searchParams.get('userId')
    const { userTags } = useSelector((state) => state.users);
    const user = useSelector((state) => state?.users?.userData);
    const { collectionData, singleCollection,collectionsAndItsCount,customFields,sharedCollections, followedCollections } = useSelector(state => state.collections)
    const { addedGem } = useSelector((state) => state.allBookmarks);
    const [loadingState, setLoadingState] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [gemSingleId, setGemSingleIdSingleId] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingConfig, setLoadingConfig] = useState(false)
    const [openEditCollectionDrawer, setOpenEditCollectionDrawer] = useState(false)
    //settings state
    const [filterArr, setFilterArr] = useState([])
    const [sortArr, setSortArr] = useState([])
    const [propertyShown, setPropertyShown] = useState([])
    const [propertyHidden, setPropertyHidden] = useState([])
    const [propertyOrder, setPropertyOrder] = useState([])
    const [layout, setLayout] = useState('')
    const [isUnfilteredCollection, setIsUnfilteredCollection] = useState(false)
    const [checkedBookmark, setCheckedBookmark] = useState([])
    const [openSelectBookmarkDrawer, setOpenSelectBookmarkDrawer] = useState(false)
    const [openCoverModal, setOpenCoverModal] = useState(false)
    const [selectedCoverImage, setSelectedCoverImage] = useState('')
    const [selectedCoverUnSplash, setSelectedCoverUnSplash] = useState('')
    const [selectedCoverGallery, setSelectedCoverGallery] = useState('')
    const [loadingCoverImg, setLoadingCoverImg] = useState(false)
    const [collectionCoverImage, setCollectionCoverImage] = useState('')
    const [showTextEditor, setShowTextEditor] = useState(false)
    const [copyLoading, setCopyLoading] = useState(false)
    const [isFollowerChildCollection, setIsFollowerChildCollection] = useState(false)

    const [descriptionContent, setDescriptionContent] = useState('')
    const [openShareCollectionDrawer, setOpenShareCollectionDrawer] = useState(false)
    const [page, setPage] = useState(1)
    const observerRef = useRef(null);
    const observerFilterRef = useRef(null);

    //for icons upload
    const [collectionIcon, setCollectionIcon] = useState('')
    const [openCollectionIcon, setOpenCollectionIcon] = useState('')
    const [selectedEmoji, setSelectedEmoji] = useState("");
    const [selectedColor, setSelectedColor] = useState('')
    const [selectedImage, setSelectedImage] = useState('')
    const [selectedIcon, setSelectedIcon] = useState('')
    const [loadingImg, setLoadingImg] = useState(false)
    const [singleCollectionData, setSingleCollectionData] = useState('')

    const [isDragging, setIsDragging] = useState(false);
    const imageRef = useRef(null);
    const [repositionMode, setRepositionMode] = useState(false);
    const [imagePosition, setImagePosition] = useState(null);

    const [openCommentDrawer, setOpenCommentDrawer] = useState(false)
    const [selectedGem, setSelectedGem] = useState(null);

    const [editPagesIn, setEditPagesIn] = useState(session ? session.editPagesInSession : '')
    const [cardSize, setCardSize] = useState('')
    const [showTableVerticalLine, setShowTableVerticalLine] = useState(null)
    const [tableWrapColumns, setTableWrapColumns] = useState(null)
    const [pageConfig, setPageConfig] = useState(null)
    const [openPagesIn, setOpenPagesIn] = useState(
    session ? session.openPagesInSession : ""
  );
  const [shrink,setShrink] = useState(false)
  const [isFilter, setIsFilter] = useState(false);
  const [filterPage, setFilterPage] = useState(1);

    const [openWallpaperModal, setOpenWallpaperModal] = useState(false)
    const [selectedWallpaperImage, setSelectedWallpaperImage] = useState('')
    const [selectedWallpaperUnSplash, setSelectedWallpaperUnSplash] = useState('')
    const [selectedWallpaperGallery, setSelectedWallpaperGallery] = useState('')
    const [loadingWallpaperImg, setLoadingWallpaperImg] = useState(false)
    const [wallpaper, setWallpaper] = useState('')
    const [permissions,setPermissions] = useState(null)
    const [openShareCollWithDrawer,setOpenShareCollWithDrawer] = useState(true)
    const [bookmarkData,setBookmarkData] = useState([])
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [filteredBookmarkData,setFilteredBookmarkData] = useState([])
    const [title,setTitle] = useState('')
    const [collSlug, setCollSlug] = useState('')
    const [totalCount, setTotalCount] = useState(0);

    const [openApprovalRejectDrawer, setOpenApprovalRejectDrawer] = useState(false)
    const [pendingGemsCount, setPendingGemsCount] = useState(0)
    const [loadingDrawer, setLoadingDrawer] = useState(false)
    const [viewSubCollections, setViewSubCollections] = useState(true)
    const [mounted, setMounted] = useState(false);
    const [isShareable, setIsShareable] = useState(false);
    const [subCollectionsCount, setSubCollectionsCount] = useState(0);
    const [isSubCollection, setIsSubCollection] = useState(false);
    const [collectionsData,setCollectionsData]=useState();
    const [isAprrovalEdit, setIsApprovalEdit] = useState(false)
    const [filterHasMore, setFilterHasMore] = useState(false);
    const [isFollowedCollection, setIsFollowedCollection] = useState(false)
    const [followCooll, setFollowColl] = useState(null)
    const [showFollowerAddBookmark, 
          setShowFollowerAddBookmark] = useState(false)
    const [showFollowerCopy, setShowFollowerCopy] = useState(true)
    const [showFollowerSub, setShowFollowerSub] = useState(true)
    const [collectionCollapseKeys, setCollectionCollapseKeys]     = useState(['1'])
    const [orderOfGems, setOrderOfGems] = useState([]);
    const [showShareMobileView, setShowShareMobileView] = useState(false);

    const [hideGems,setHideGems] = useState(false)
    const [showGems,setShowGems] = useState(true)
    const [hideBrokenLinks,setHideBrokenLinks] = useState(true)
    const [gemOnClickEvent, setGemOnClickEvent] = useState("gem view");
    const [coverSize,setCoverSize] = useState('default')

    const searchParamsTrack = useParams();
    const searchPathname = usePathname();
    const uname = searchParamsTrack?.username;
    const module = searchPathname?.includes("/g/") ? "gems" : searchPathname?.includes("/tags/") ? "tags" : searchPathname?.includes("/c/") ? "collections" : null;
    const sourceId = searchParamsTrack?.gemId || searchParamsTrack?.colllectionId || searchParamsTrack?.tagId || searchParamsTrack?.id;
    const slug = searchParamsTrack?.name;

    // const searchParamsTrack = window.location.pathname.split("/");
    // const uname = searchParamsTrack[2];
    // const module = searchParamsTrack[3] === "tags" ? "tags" : searchParamsTrack[3] === "c" ? "collections" : searchParamsTrack[3] === "g" ? "gems" : null;
    // const sourceId = searchParamsTrack[4];
    // const slug = searchParamsTrack[5];
    
    useEffect(() => {
      const data = JSON.parse(localStorage.getItem("collectionsData"));
      setCollectionsData(data)
      if(!data){
        dispatch(fetchCollectionWiseCounts()).then((res) => {
          if(res?.payload?.data){
            let collectionsData = JSON.stringify(res?.payload?.data)
            setCollectionsData(res?.payload?.data)
            localStorage.setItem("collectionsData", collectionsData);
          }
        });
      }
    }, [])
    // const [folders, setFolders] = useState(collectionsData)

    useEffect(() => {
      // const isFollowedCollection = followedCollections?.findIndex((f) => { return parseInt(f.id) === parseInt(id) }) !== -1
      const followRes           = findFollowCollection(parseInt(id), followedCollections)
      setFollowColl(followRes.followCollection)
      setIsFollowedCollection(followRes.isFollowedCollection)
      setIsFollowerChildCollection(followRes.isChildCollection)
    }, [followedCollections])

    
  const deleteFolderById = (id, foldersList) => {
    return foldersList?.reduce((result, folder) => {
      if (folder.id !== id) {
        // If the folder does not match the id, check its subfolders
        if (folder?.folders && folder?.folders?.length > 0) {
          folder = { ...folder, folders: deleteFolderById(id, folder?.folders) };
        }
        result.push(folder);
      }
      return result;
    }, []);
  };

  const handleDeleteFolder = (id) => {
    setCollectionsData((currentFolders) => deleteFolderById(id, currentFolders));
  };

  useEffect(() => {
    const bioCollId = session.bio_collection_id;
    const bioCollIdInt = parseInt(bioCollId, 10); 
    handleDeleteFolder(bioCollIdInt);
  }, []); 

    useEffect(() => {
    setMounted(true);
  }, []);

    useEffect(() => {
      if(userId && (userId !== session.userId)){
        message.error(TextMessage.LOGIN_TEXT)
        session.clear();
        dispatch(sidebarMenuClicked("all"))
        dispatch(clearCollectionState());
        dispatch(clearAllTags());
        dispatch(disableMsg())
        dispatch(resetSharedCollections())
        navigate.push('/');
      }
    },[userId,navigate,dispatch])

    useEffect(() => {
      if(addedGem && addedGem?.page === 'collection'){
        const obj = {...addedGem?.value}
        setBookmarkData([obj,...bookmarkData])
        dispatch(gemAdded(null))
      }
    },[addedGem])

    useEffect(() => {
      if(userId && (userId !== session.userId)){
        message.error(TextMessage.LOGIN_TEXT)
        session.clear();
        dispatch(clearCollectionState());
        dispatch(clearAllTags());
        dispatch(disableMsg())
        dispatch(resetSharedCollections())
        navigate.push('/');
      }
    },[userId,navigate,dispatch])

    useEffect(() => {
        if (actionType === 'edit') {

            const getCall = async () => {
              setOpenEditCollectionDrawer(true)
              setLoadingDrawer(true)
              await dispatch(getSingleCollection(id))
              setLoadingDrawer(false)
            }
            getCall()
        }
    }, [dispatch, id, actionType,])

    const setObserverRef = useCallback(node => {
      if (node) {
        observerRef.current = node;
        const options = {
          root: null,
          rootMargin: "0px",
          threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore && !loadingMore && !isFilter) {
            setPage(prev => prev + 1);
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
    }, [hasMore,loadingMore,isFilter]);

  const setObserverFilterRef = useCallback(node => {
      if (node) {
        observerFilterRef.current = node;

        const options = {
          root: null,
          rootMargin: "0px",
          threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && filterHasMore && !loadingMore && isFilter) {
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
    }, [filterHasMore,loadingMore,isFilter]);

    useEffect(() => {
        const getCall = async () => {
            if (page === 1) {
              setLoadingState(true)
            } else {
              setLoadingState(false)
            }
            setLoadingMore(true);
            setCheckedBookmark([])
            const res = await dispatch(getBookmarkInCollections(id, page))
            if(res){
              setBookmarkData((prevData) => [...prevData, ...res?.payload?.data?.collection?.gems || []]);
              setLoadingMore(false);
              if ((res?.payload?.data?.totalBookmark <= bookmarkData.length + res?.payload?.data?.collection?.gems?.length) || res?.payload?.data?.collection?.gems?.length === 0) {
                  setHasMore(false);
              }
            }
            setOrderOfGems(res?.payload?.data?.collection?.order_of_gems || [])
            setCollSlug(res?.payload?.data?.collection?.slug)
            const configRes = res?.payload?.data?.collection
            const data = getPropertiesData(configRes,'collection')
            setPageConfig(configRes?.configColl)
            setFilterArr(configRes?.configColl?.filter?.length === 0 ? [{
              filterBy: "",
              termType: "",
              queryBy: "",
              platform: ''
            }] : configRes?.configColl?.filter)
            setSortArr(configRes?.configColl?.sort?.length === 0 ? [{
                  sortby: 'title',
                  orderby: '',
              }] : configRes?.configColl?.sort)
            setPropertyShown(data?.PS)
            setPropertyOrder(data?.PO)
            setPropertyHidden(data?.PH)
            setLayout(data?.ly)
            setIsUnfilteredCollection(configRes?.name?.toLowerCase() === 'unfiltered' ? true : false)
            setCollectionIcon(configRes?.avatar || '')
            setSelectedEmoji(configRes?.avatar?.type === 'emoji' ? configRes?.avatar?.icon : '')
            setSelectedColor(configRes?.avatar?.type === 'color' ? configRes?.avatar?.icon : '')
            setSelectedImage(configRes?.avatar?.type === 'image' ? configRes?.avatar?.icon : '')
            setSelectedIcon(configRes?.avatar?.type === 'icon' ? configRes?.avatar?.icon : '')
            setCardSize(configRes?.configColl?.cardSize)
            setHideBrokenLinks(configRes?.configColl?.hideBrokenLinks);
            setGemOnClickEvent(configRes?.gemOnClickEvent || 'gem view');
            setShowTableVerticalLine(configRes?.configColl?.showTableVerticalLine)
            setTableWrapColumns(configRes?.configColl?.tableWrapColumns)
            setCollectionCoverImage(configRes?.background || '')
            setCoverSize(configRes?.background?.size || 'default')
            setImagePosition(configRes?.background && (configRes?.background.type === 'upload' || configRes?.background.type === 'unsplash') ? configRes?.background?.imagePosition : null)
            setDescriptionContent(configRes?.description ? configRes?.description :
              '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}')
            setShowTextEditor(configRes?.configColl?.showTextEditor)
            setWallpaper(configRes?.wallpaper || '')
            setPermissions(permissionsRes)
            setTitle(configRes?.name)
            setViewSubCollections(configRes?.viewSubCollection === null ? true : configRes?.viewSubCollection)
            setIsShareable(configRes?.sharable_links)
            setTotalCount(res?.payload?.data?.totalBookmark)
            setIsSubCollection(configRes?.is_sub_collection || false)
            setLoadingState(false)
            setShowFollowerCopy(configRes?.allowCopy)
            setShowFollowerSub(configRes?.publicSubCollection)
            setHideGems(res?.payload?.data?.collection?.hideGem || false)
            setShowGems(configRes?.showGem === false ? false : true)
            if(page === 1){
              await dispatch(getCustomFields(id))
              if(configRes?.sharable_links){
                const res = await dispatch(getPendingGems(id,1))
                if(res.error === undefined){
                  setPendingGemsCount(res?.payload?.data?.totalCount || 0)
                }
              }
            }
            
        }
        if(!isFilter && hasMore){
          getCall()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasMore,page,id])

    //filter apis
    useEffect(() => {
    if(filterPage === 1) return;
    const getCall = async () => {
      setLoadingMore(true)
      const sortby= sortArr.length>0 ? sortArr[0]?.sortby : ''
      const orderby= sortArr.length>0 ? (sortArr[0]?.orderby || 'asc') : ''
      const aggregatedData = aggregateProperties(filterArr);
      const filterBy= aggregatedData?.filterBy || ''
      const queryBy= aggregatedData?.queryBy || ''
      const termType= aggregatedData?.termType || ''

      const res = await dispatch(getCollectionFilteredBookmark(filterBy,queryBy,termType,filterPage,title,sortby,orderby))
      if(res.error === undefined){
        setFilteredBookmarkData((prevData) => [...prevData, ...res?.payload?.data?.finalRes || []]);
        setLoadingMore(false);
        if (res?.payload?.data?.totalCount <= filteredBookmarkData.length + res?.payload?.data?.finalRes?.length) {
          setFilterHasMore(false);
        }
      }
      return;
    }

    if(isFilter && filterHasMore){
      getCall()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch,filterPage,isFilter,filterHasMore])

    const handleEditCall = async () => {
        setOpenEditCollectionDrawer(true)
        setLoadingDrawer(true)
        await dispatch(getSingleCollection(id))
        setLoadingDrawer(false)
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
                type: collectionCoverImage?.type,
                icon: collectionCoverImage?.icon,
                imagePosition: { x: imagePosition.x, y: imagePosition.y }
            },
        }

        const res = await dispatch(updateCollection(id, payload))
        if (res.error === undefined) {
            setCollectionCoverImage(res?.payload?.data?.data?.attributes?.background || '')
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
        setImagePosition({ x: collectionCoverImage?.imagePosition?.x, y: collectionCoverImage?.imagePosition?.y })
    }

    const handleOpenCoverModal = () => {
        setOpenCoverModal(true)
    }

    const handleUpdateCollectionPageConfig = async (value, type, isLoad = true) => {
        if (isLoad) {
            setLoadingConfig(true)

            let data = {
                ...pageConfig,
                pageId: id
            }

            if (type === 'groupBy' || type === 'subGroupBy') {
                data['layout'] = 'card'
            }
            data[type] = value
            const res = await dispatch(updateCollectionPageConfig(data))
            setPageConfig({...data })
            setLoadingConfig(false)
            return;
        } else {
            let data = {
                ...pageConfig,
                pageId: id
            }
            data[type] = value
            const res = await dispatch(updateCollectionPageConfig(data))
            setPageConfig({ ...data })
        }

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
      dispatch(resetCollectionFilteredBookmark())
      setLoadingState(true)
      setIsFilter(true)
      setFilterPage(1);
      setFilterHasMore(true)
      const res = await dispatch(getCollectionFilteredBookmark(aggregatedData.filterBy,aggregatedData.queryBy,aggregatedData.termType,1,title,sortby,orderby))
      if(res.error === undefined){
        setFilteredBookmarkData(res?.payload?.data?.finalRes)
        setTotalCount(res?.payload?.data?.totalCount)
      }
      setLoadingState(false);

      handleUpdateCollectionPageConfig(filterArr, 'filter', false)
    }

    const handleFilterRemove = async (i) => {
        const arr = [...filterArr]
        if(arr.length === 1 && sortArr.length === 0){
          arr.splice(i, 1);
          setFilterArr([]);
          handleUpdateCollectionPageConfig([], 'filter', false)
          setIsFilter(false)
          dispatch(resetCollectionFilteredBookmark())
          setFilterPage(1)
          setFilterHasMore(false)
          setFilteredBookmarkData([])
          setTotalCount(bookmarkData?.length || 0)
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
          const res = await dispatch(getCollectionFilteredBookmark('','','',1,title,sortby,orderby))
          if(res.error === undefined){
            setFilteredBookmarkData(res?.payload?.data?.finalRes)
            setTotalCount(res?.payload?.data?.totalCount)
          }
          setLoadingState(false)
          handleUpdateCollectionPageConfig([], 'filter', false)
          return;
          }
          
          setIsFilter(false)
          handleUpdateCollectionPageConfig([], 'filter', false)
          return;
        }

        arr.splice(i, 1)
        setFilterArr(arr)
        handleUpdateCollectionPageConfig(arr, 'filter', false)
    }

    const handleFilterRemoveAll = async () => {
      if(sortArr.length === 0){
        setFilterArr([])
        setIsFilter(false)
        dispatch(resetCollectionFilteredBookmark())
        setFilterPage(1)
        setFilterHasMore(false)
        setFilteredBookmarkData([])
        setTotalCount(bookmarkData?.length)
        handleUpdateCollectionPageConfig([], 'filter', false)
        return;
      }
      
      const sortby= sortArr.length>0 ? sortArr[0]?.sortby : ''
      const orderby= sortArr.length>0 ? sortArr[0]?.orderby : ''

      setFilterArr([])
      setFilterPage(1)
      setFilterHasMore(true)

      if(orderby){
        setLoadingState(true)
        const res = await dispatch(getCollectionFilteredBookmark('','','',1,title,sortby,orderby))
        if(res.error === undefined){
          setFilteredBookmarkData(res?.payload?.data?.finalRes)
          setTotalCount(res?.payload?.data?.totalCount)
        }
        setLoadingState(false)
        handleUpdateCollectionPageConfig([], 'filter', false)
        return;
      }
      setIsFilter(false)
      handleUpdateCollectionPageConfig([], 'filter', false)
    }

    const changeFilterOrder = (arr) => {
        const a = [...arr]
        setFilterArr(a)
        handleUpdateCollectionPageConfig(a, 'filter', false)
    }

    //sort

    const handleSortAdd = () => {
        const newObj = {
            sortby: '',
            orderby: '',
        }
        const arr = [...sortArr, newObj]

        setSortArr(arr)
    }

    const handleSortSave = async () => {
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
        // dispatch(resetCollectionFilteredBookmark())
        setFilterPage(1);
        setFilterHasMore(true)
        const res = await dispatch(getCollectionFilteredBookmark(filterBy,queryBy,termType,1,title,sortArr[0].sortby,sortArr[0].orderby))
        if(res.error === undefined){
          setFilteredBookmarkData(res?.payload?.data?.finalRes)
          setTotalCount(res?.payload?.data?.totalCount)
        }
        setLoadingState(false);
        handleUpdateCollectionPageConfig(sortArr, 'sort', false)
    }

    const handleSortRemove = async(i) => {
      if(filterArr.length === 0){
        const arr = [...sortArr]
        arr.splice(i, 1)
        setSortArr(arr)
        setIsFilter(false)
        dispatch(resetCollectionFilteredBookmark())
        handleUpdateCollectionPageConfig(arr, 'sort', false)
        setFilteredBookmarkData([])
        setTotalCount(bookmarkData?.length)
        setFilterPage(1)
        setFilterHasMore(false)
        return
      }

      setSortArr([]);
      setFilterPage(1)
      setFilterHasMore(true)
      const aggregatedData = aggregateProperties(filterArr);
      if(aggregatedData.filterBy && aggregatedData.queryBy && aggregatedData.termType){
        setLoadingState(true)
        const res = await dispatch(getCollectionFilteredBookmark(aggregatedData.filterBy,aggregatedData.queryBy,aggregatedData.termType,1,title,'',''))
        if(res.error === undefined){
          setFilteredBookmarkData(res?.payload?.data?.finalRes)
          setTotalCount(res?.payload?.data?.totalCount)
        }
        setLoadingState(false);
        handleUpdateCollectionPageConfig([], 'sort', false)
        return;
      }
      
      setFilteredBookmarkData([])
      setIsFilter(false)
      handleUpdateCollectionPageConfig([], 'sort', false)
    }

    const changeSortOrder = (arr) => {
        const a = [...arr]
        setSortArr(a)
        handleUpdateCollectionPageConfig(a, 'sort', false)
    }

    //property
    const handlePropertyHide = async (data) => {
        if (layout !== 'moodboard' && layout !== 'stream' && propertyShown.length === 1) {
            message.info(TextMessage.PROPERTY_HIDE_INFO_TEXT)
            return;
        }
        const filtered = propertyShown?.filter(item => item.name !== data.name)
        const arr = [...propertyHidden]
        arr.unshift(data)
        setPropertyShown(filtered)
        setPropertyHidden(arr)
        setPropertyOrder(filtered)

        if(layout === 'card'){
      const obj = {
        ...pageConfig,
        propertyHidden: {
          ...pageConfig.propertyHidden,
          card: {
            propertyHidden: arr,
          }
        },
        propertyOrder: {
          ...pageConfig.propertyOrder,
          card: {
            propertyOrder: filtered,
          }
        },
        propertyShown: {
          ...pageConfig.propertyShown,
          card: {
            propertyShown: filtered,
          }
        },
      }

      setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
      return;
        }

        if(layout === 'table'){
        const obj = {
            ...pageConfig,
            propertyHidden: {
            ...pageConfig.propertyHidden,
            table: {
                propertyHidden: arr,
            }
            },
            propertyOrder: {
            ...pageConfig.propertyOrder,
            table: {
                propertyOrder: filtered,
            }
            },
            propertyShown: {
            ...pageConfig.propertyShown,
            table: {
                propertyShown: filtered,
            }
            },
        }

        setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
        return;
        }

        if(layout === 'list'){
        const obj = {
            ...pageConfig,
            propertyHidden: {
            ...pageConfig.propertyHidden,
            list: {
                propertyHidden: arr,
            }
            },
            propertyOrder: {
            ...pageConfig.propertyOrder,
            list: {
                propertyOrder: filtered,
            }
            },
            propertyShown: {
            ...pageConfig.propertyShown,
            list: {
                propertyShown: filtered,
            }
            },
        }

        setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
        return;
        }

        if(layout === 'inbox'){
        const obj = {
            ...pageConfig,
            propertyHidden: {
            ...pageConfig.propertyHidden,
            inbox: {
                propertyHidden: arr,
            }
            },
            propertyOrder: {
            ...pageConfig.propertyOrder,
            inbox: {
                propertyOrder: filtered,
            }
            },
            propertyShown: {
            ...pageConfig.propertyShown,
            inbox: {
                propertyShown: filtered,
            }
            },
        }

        setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
        return;
        }

        if(layout === 'moodboard'){
        const obj = {
            ...pageConfig,
            propertyHidden: {
            ...pageConfig.propertyHidden,
            moodboard: {
                propertyHidden: arr,
            }
            },
            propertyOrder: {
            ...pageConfig.propertyOrder,
            moodboard: {
                propertyOrder: filtered,
            }
            },
            propertyShown: {
            ...pageConfig.propertyShown,
            moodboard: {
                propertyShown: filtered,
            }
            },
        }
        
        setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
        return;
        }

        if(layout === 'stream'){
        const obj = {
            ...pageConfig,
            propertyHidden: {
            ...pageConfig.propertyHidden,
            stream: {
                propertyHidden: arr,
            }
            },
            propertyOrder: {
            ...pageConfig.propertyOrder,
            stream: {
                propertyOrder: filtered,
            }
            },
            propertyShown: {
            ...pageConfig.propertyShown,
            stream: {
                propertyShown: filtered,
            }
            },
        }
        
        setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
        return;
        }
    }

    const handlePropertyVisible = async (item) => {
        const arr = [...propertyShown]
        arr.unshift(item)

        const filtered = propertyHidden.filter(data => data.name !== item.name)
        setPropertyShown(arr)
        setPropertyHidden(filtered)
        setPropertyOrder(arr)

        if(layout === 'card'){
      const obj = {
        ...pageConfig,
        propertyHidden: {
          ...pageConfig.propertyHidden,
          card: {
            propertyHidden: filtered,
          }
        },
        propertyOrder: {
          ...pageConfig.propertyOrder,
          card: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...pageConfig.propertyShown,
          card: {
            propertyShown: arr,
          }
        },
      }

      setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
      return;
    }
    if(layout === 'table'){
      const obj = {
        ...pageConfig,
        propertyHidden: {
          ...pageConfig.propertyHidden,
          table: {
            propertyHidden: filtered,
          }
        },
        propertyOrder: {
          ...pageConfig.propertyOrder,
          table: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...pageConfig.propertyShown,
          table: {
            propertyShown: arr,
          }
        },
      }

      setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
      return;
    }

    if(layout === 'list'){
      const obj = {
        ...pageConfig,
        propertyHidden: {
          ...pageConfig.propertyHidden,
          list: {
            propertyHidden: filtered,
          }
        },
        propertyOrder: {
          ...pageConfig.propertyOrder,
          list: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...pageConfig.propertyShown,
          list: {
            propertyShown: arr,
          }
        },
      }

      setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
      return;
    }

    if(layout === 'inbox'){
      const obj = {
        ...pageConfig,
        propertyHidden: {
          ...pageConfig.propertyHidden,
          inbox: {
            propertyHidden: filtered,
          }
        },
        propertyOrder: {
          ...pageConfig.propertyOrder,
          inbox: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...pageConfig.propertyShown,
          inbox: {
            propertyShown: arr,
          }
        },
      }

      setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
      return;
    }

    if(layout === 'moodboard'){
      const obj = {
        ...pageConfig,
        propertyHidden: {
          ...pageConfig.propertyHidden,
          moodboard: {
            propertyHidden: filtered,
          }
        },
        propertyOrder: {
          ...pageConfig.propertyOrder,
          moodboard: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...pageConfig.propertyShown,
          moodboard: {
            propertyShown: arr,
          }
        },
      }

      setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
      return;
    }
    if(layout === 'stream'){
      const obj = {
        ...pageConfig,
        propertyHidden: {
          ...pageConfig.propertyHidden,
          stream: {
            propertyHidden: filtered,
          }
        },
        propertyOrder: {
          ...pageConfig.propertyOrder,
          stream: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...pageConfig.propertyShown,
          stream: {
            propertyShown: arr,
          }
        },
      }

      setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
      return;
    }

    }

    const updatePropertyOnDrop = async (arr) => {
        if(layout === 'card'){
      setPropertyOrder(arr)
      const obj = {
        ...pageConfig,
        propertyOrder: {
          ...pageConfig.propertyOrder,
          card: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...pageConfig.propertyShown,
          card: {
            propertyShown: arr,
          }
        },
      }
      setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
      return;
    }
    if(layout === 'list'){
      setPropertyOrder(arr)
      const obj = {
        ...pageConfig,
        propertyOrder: {
          ...pageConfig.propertyOrder,
          list: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...pageConfig.propertyShown,
          list: {
            propertyShown: arr,
          }
        },
      }
      setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
      return;
    }
    if(layout === 'table'){
      setPropertyOrder(arr)
      const obj = {
        ...pageConfig,
        propertyOrder: {
          ...pageConfig.propertyOrder,
          table: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...pageConfig.propertyShown,
          table: {
            propertyShown: arr,
          }
        },
      }
     setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
      return;
    }
    if(layout === 'inbox'){
      setPropertyOrder(arr)
      const obj = {
        ...pageConfig,
        propertyOrder: {
          ...pageConfig.propertyOrder,
          inbox: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...pageConfig.propertyShown,
          inbox: {
            propertyShown: arr,
          }
        },
      }
      setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
      return;
    }
    if(layout === 'moodboard'){
      setPropertyOrder(arr)
      const obj = {
        ...pageConfig,
        propertyOrder: {
          ...pageConfig.propertyOrder,
          moodboard: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...pageConfig.propertyShown,
          moodboard: {
            propertyShown: arr,
          }
        },
      }
      setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
      return;
    }

    if(layout === 'stream'){
      setPropertyOrder(arr)
      const obj = {
        ...pageConfig,
        propertyOrder: {
          ...pageConfig.propertyOrder,
          stream: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...pageConfig.propertyShown,
          stream: {
            propertyShown: arr,
          }
        },
      }
      setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
      return;
    }

    }

    const handleRefreshProperty = async () => {
        const data = (customFields && customFields.length>0 && customFields[0]?.customFieldObj && customFields[0].customFieldObj.length>0) ? customFields[0]?.customFieldObj : []

        const mapped = data.map(item => {
            return {
                name : item.name,
                type: item.type,
                id: item?.id || null
            }
        })

    if(layout === 'card'){
      setPropertyShown(defaultPropertyShown?.card?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.card?.propertyOrder)
      setPropertyHidden([...defaultPropertyHidden?.card?.propertyHidden,...mapped])

      const obj = {
        ...pageConfig,
        propertyHidden: {
          ...pageConfig.propertyHidden,
          card: {
            propertyHidden: [...defaultPropertyHidden?.card?.propertyHidden,...mapped],
          }
        },
        propertyOrder: {
          ...pageConfig.propertyOrder,
          card: {
            propertyOrder: defaultPropertyOrder?.card?.propertyOrder,
          }
        },
        propertyShown: {
          ...pageConfig.propertyShown,
          card: {
            propertyShown: defaultPropertyShown?.card?.propertyShown,
          }
        },
      }

      setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
      return;
    }
    if(layout === 'list'){
      setPropertyShown(defaultPropertyShown?.list?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.list?.propertyOrder)
      setPropertyHidden([...defaultPropertyHidden?.list?.propertyHidden,...mapped])

      const obj = {
        ...pageConfig,
        propertyHidden: {
          ...pageConfig.propertyHidden,
          list: {
            propertyHidden: [...defaultPropertyHidden?.list?.propertyHidden,...mapped],
          }
        },
        propertyOrder: {
          ...pageConfig.propertyOrder,
          list: {
            propertyOrder: defaultPropertyOrder?.list?.propertyOrder,
          }
        },
        propertyShown: {
          ...pageConfig.propertyShown,
          list: {
            propertyShown: defaultPropertyShown?.list?.propertyShown,
          }
        },
      }

      setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
      return;
    }
    if(layout === 'table'){
      setPropertyShown(defaultPropertyShown?.table?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.table?.propertyOrder)
      setPropertyHidden([...defaultPropertyHidden?.table?.propertyHidden,...mapped])

      const obj = {
        ...pageConfig,
        propertyHidden: {
          ...pageConfig.propertyHidden,
          table: {
            propertyHidden: [...defaultPropertyHidden?.table?.propertyHidden,...mapped],
          }
        },
        propertyOrder: {
          ...pageConfig.propertyOrder,
          table: {
            propertyOrder: defaultPropertyOrder?.table?.propertyOrder,
          }
        },
        propertyShown: {
          ...pageConfig.propertyShown,
          table: {
            propertyShown: defaultPropertyShown?.table?.propertyShown,
          }
        },
      }

      setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
      return;
    }
    if(layout === 'inbox'){
      setPropertyShown(defaultPropertyShown?.inbox?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.inbox?.propertyOrder)
      setPropertyHidden([...defaultPropertyHidden?.inbox?.propertyHidden,...mapped])

      const obj = {
        ...pageConfig,
        propertyHidden: {
          ...pageConfig.propertyHidden,
          inbox: {
            propertyHidden: [...defaultPropertyHidden?.inbox?.propertyHidden,...mapped],
          }
        },
        propertyOrder: {
          ...pageConfig.propertyOrder,
          inbox: {
            propertyOrder: defaultPropertyOrder?.inbox?.propertyOrder,
          }
        },
        propertyShown: {
          ...pageConfig.propertyShown,
          inbox: {
            propertyShown: defaultPropertyShown?.inbox?.propertyShown,
          }
        },
      }

      setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
      return;
    }
    if(layout === 'moodboard'){
      setPropertyShown(defaultPropertyShown?.moodboard?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.moodboard?.propertyOrder)
      setPropertyHidden([...defaultPropertyHidden?.moodboard?.propertyHidden,...mapped])

      const obj = {
        ...pageConfig,
        propertyHidden: {
          ...pageConfig.propertyHidden,
          moodboard: {
            propertyHidden: [...defaultPropertyHidden?.moodboard?.propertyHidden,...mapped],
          }
        },
        propertyOrder: {
          ...pageConfig.propertyOrder,
          moodboard: {
            propertyOrder: defaultPropertyOrder?.moodboard?.propertyOrder,
          }
        },
        propertyShown: {
          ...pageConfig.propertyShown,
          moodboard: {
            propertyShown: defaultPropertyShown?.moodboard?.propertyShown,
          }
        },
      }

      setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
      return;
    }

    if(layout === 'stream'){
      setPropertyShown(defaultPropertyShown?.stream?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.stream?.propertyOrder)
      setPropertyHidden([...defaultPropertyHidden?.stream?.propertyHidden,...mapped])

      const obj = {
        ...pageConfig,
        propertyHidden: {
          ...pageConfig.propertyHidden,
          stream: {
            propertyHidden: [...defaultPropertyHidden?.stream?.propertyHidden,...mapped],
          }
        },
        propertyOrder: {
          ...pageConfig.propertyOrder,
          stream: {
            propertyOrder: defaultPropertyOrder?.stream?.propertyOrder,
          }
        },
        propertyShown: {
          ...pageConfig.propertyShown,
          stream: {
            propertyShown: defaultPropertyShown?.stream?.propertyShown,
          }
        },
      }

      setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
      return;
    }

    }

    //layout
    const handleLayout = async (item) => {
        setLayout(item)
        if(item === 'card'){
      setPropertyHidden(pageConfig?.propertyHidden?.card?.propertyHidden)
      setPropertyOrder(pageConfig?.propertyOrder?.card?.propertyOrder)
      setPropertyShown(pageConfig?.propertyShown?.card?.propertyShown)
    }
    if(item === 'table'){
      setPropertyHidden(pageConfig?.propertyHidden?.table?.propertyHidden)
      setPropertyOrder(pageConfig?.propertyOrder?.table?.propertyOrder)
      setPropertyShown(pageConfig?.propertyShown?.table?.propertyShown)
    }
    if(item === 'list'){
      setPropertyHidden(pageConfig?.propertyHidden?.list?.propertyHidden)
      setPropertyOrder(pageConfig?.propertyOrder?.list?.propertyOrder)
      setPropertyShown(pageConfig?.propertyShown?.list?.propertyShown)
    }
    if(item === 'inbox'){
      setPropertyHidden(pageConfig?.propertyHidden?.inbox?.propertyHidden)
      setPropertyOrder(pageConfig?.propertyOrder?.inbox?.propertyOrder)
      setPropertyShown(pageConfig?.propertyShown?.inbox?.propertyShown)
    }
    if(item === 'moodboard'){
      setPropertyHidden(pageConfig?.propertyHidden?.moodboard?.propertyHidden)
      setPropertyOrder(pageConfig?.propertyOrder?.moodboard?.propertyOrder)
      setPropertyShown(pageConfig?.propertyShown?.moodboard?.propertyShown)
    }
    if(item === 'stream'){
      setPropertyHidden(pageConfig?.propertyHidden?.stream?.propertyHidden)
      setPropertyOrder(pageConfig?.propertyOrder?.stream?.propertyOrder)
      setPropertyShown(pageConfig?.propertyShown?.stream?.propertyShown)
    }

        const data = {
            ...pageConfig,
            layout: item,
            pageId: id,
        }
        setPageConfig(data)
        await dispatch(updateCollectionPageConfig(data))
        const payload = {
          currentPublicLayout: item
        }
        dispatch(updateCollection(id, payload))
    }
    const updateCustomPropertyDataInConfig = async (data,type) => {
      if(type === 'create'){
        const obj = {
        ...pageConfig,
        propertyOrder: {
          ...pageConfig.propertyOrder,
          card: {
            propertyOrder: [data,...pageConfig.propertyOrder.card.propertyOrder,],
          },
          table: {
            propertyOrder: [data,...pageConfig.propertyOrder.table.propertyOrder,],
          },
          list: {
            propertyOrder: [data,...pageConfig.propertyOrder.list.propertyOrder,],
          },
          inbox: {
            propertyOrder: [data,...pageConfig.propertyOrder.inbox.propertyOrder],
          },
        },
        propertyShown: {
          ...pageConfig.propertyShown,
          card: {
            propertyShown:  [data,...pageConfig.propertyShown.card.propertyShown,],
          },
          list: {
            propertyShown: [data,...pageConfig.propertyShown.list.propertyShown,],
          },
          table: {
            propertyShown: [data,...pageConfig.propertyShown.table.propertyShown,],
          },
          inbox: {
            propertyShown: [data,...pageConfig.propertyShown.inbox.propertyShown,],
          },
        },
        propertyHidden: {
          ...pageConfig.propertyHidden,
          moodboard: {
            propertyHidden: [data,...pageConfig.propertyHidden.moodboard.propertyHidden,],
          },
          stream: {
            propertyHidden: [data,...pageConfig.propertyHidden.stream.propertyHidden,],
          },
        }
      }

      setPageConfig({...obj,pageId: id})
      await dispatch(updateCollectionPageConfig({...obj,pageId: id}))
      }

      if(type === 'update'){
        const clonedData = JSON.parse(JSON.stringify(pageConfig));

        ['propertyOrder', 'propertyShown', 'propertyHidden'].forEach(property => {
          Object.keys(clonedData[property]).forEach((key) => {
            clonedData[property][key][property] = clonedData[property][key][property]?.map((obj) => 
              obj?.id === data.id ? { ...obj, name: data.name } : obj
            );
          });
        });
        setPageConfig({...clonedData,pageId: id})
        await dispatch(updateCollectionPageConfig({...clonedData,pageId: id}))

      }

      if(type === 'delete'){
      
      const clonedData = JSON.parse(JSON.stringify(pageConfig));

      ['propertyOrder', 'propertyShown', 'propertyHidden'].forEach(property => {
        Object.keys(clonedData[property]).forEach((key) => {
          clonedData[property][key][property] = clonedData[property][key][property]?.filter((obj) => 
            obj?.id !== data?.id
          );
        });
      });
      setPageConfig({...clonedData,pageId: id})
      await dispatch(updateCollectionPageConfig({...clonedData,pageId: id}))
      }
    }

    const handleOpenSelectBookmarkDrawer = () => {
        setOpenSelectBookmarkDrawer(true)
    }

    const handleCancelSelectedBookmark = () => {
        setCheckedBookmark([])
    }

    const handleSelectAllSelectedBookmark = () => {
        setCheckedBookmark(isFilter ? filteredBookmarkData : bookmarkData)
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

    const showComment = (id) => {
        setOpenCommentDrawer(true);
        setSelectedGem(id);
    }

    const handleEditPagesIn = async (item) => {
        setEditPagesIn(item)

        session.setEditPagesInSession(item)
        const data = {
            editPagesIn: item,
        }

        dispatch(updateUser(data))
    }

    const handleCardSize = async (item) => {
        setCardSize(item)

        const data = {
            ...pageConfig,
            pageId: id,
            cardSize: item,
        }
        setPageConfig({ ...pageConfig, ...data })
        await dispatch(updateCollectionPageConfig(data))
    }

    const handleTableVerticalLine = async (checked) => {
        setShowTableVerticalLine(checked)

        const data = {
            ...pageConfig,
            pageId: id,
            showTableVerticalLine: checked,
        }
        setPageConfig({ ...pageConfig, ...data })
        await dispatch(updateCollectionPageConfig(data))
    }

    const handleTableWrapColumns = async (checked) => {
        setTableWrapColumns(checked)

        const data = {
            ...pageConfig,
            pageId: id,
            tableWrapColumns: checked,
        }
        setPageConfig({ ...pageConfig, ...data })
        await dispatch(updateCollectionPageConfig(data))
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

  const handleCoverModal = () => {
        setOpenCoverModal(true)
    }

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

            const res = await dispatch(UploadCoverS3Link(formData, id))

            if (res.error === undefined) {
                const payload = {
                    background: {
                        type: 'upload',
                        icon: res.payload.data.media[0],
                        imagePosition: { x: 50, y: 50 },
                        size: coverSize
                    },
                }

                const res1 = await dispatch(updateCollection(id, payload))
                if (res1.error === undefined) {
                    setLoadingCoverImg(false)
                    setSelectedCoverImage('')
                    setSelectedCoverGallery('')
                    setSelectedCoverUnSplash('')
                    setOpenCoverModal(false)
                    setOpenEditCollectionDrawer(false)
                    setCollectionCoverImage(res1?.payload?.data?.data?.attributes?.background || '')
                } else {
                    setLoadingCoverImg(false)
                    setSelectedCoverImage('')
                    setSelectedCoverGallery('')
                    setSelectedCoverUnSplash('')
                    setOpenCoverModal(false)
                    setOpenEditCollectionDrawer(false)
                }
            }
            return;
        }

        if (selectedCoverUnSplash) {
            setLoadingCoverImg(true)
            const res = await dispatch(UploadUnsplashCoverS3Link(selectedCoverUnSplash, id))

            if (res.error === undefined) {
                const payload = {
                  background: {
                    type: "unsplash",
                    icon: res.payload.data.media[0],
                    imagePosition: { x: 50, y: 50 },
                    size: coverSize,
                  },
                };

                const res1 = await dispatch(updateCollection(id, payload))
                if (res1.error === undefined) {
                    setLoadingCoverImg(false)
                    setSelectedCoverImage('')
                    setSelectedCoverUnSplash('')
                    setSelectedCoverGallery('')
                    setOpenCoverModal(false)
                    setOpenEditCollectionDrawer(false)
                    setCollectionCoverImage(res1?.payload?.data?.data?.attributes?.background || '')
                } else {
                    setSelectedCoverGallery('')
                    setLoadingCoverImg(false)
                    setSelectedCoverImage('')
                    setSelectedCoverUnSplash('')
                    setOpenCoverModal(false)
                    setOpenEditCollectionDrawer(false)
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

            const res1 = await dispatch(updateCollection(id, payload))
            if (res1.error === undefined) {
                setLoadingCoverImg(false)
                setSelectedCoverImage('')
                setSelectedCoverUnSplash('')
                setSelectedCoverGallery('')
                setOpenCoverModal(false)
                setCollectionCoverImage(res1?.payload?.data?.data?.attributes?.background || '')
                setOpenEditCollectionDrawer(false)
            } else {
                setSelectedCoverGallery('')
                setLoadingCoverImg(false)
                setSelectedCoverImage('')
                setSelectedCoverUnSplash('')
                setOpenCoverModal(false)
                setOpenEditCollectionDrawer(false)
            }
        }
    }

    const handleDeleteCoverS3Link = async (type) => {
    if(type === 'cover'){
      if (collectionCoverImage?.type === 'upload' || collectionCoverImage?.type === 'unsplash') {
            setLoadingCoverImg(true)
            const res = await dispatch(deleteCoverS3Link(collectionCoverImage?.icon))

            if (res.error === undefined) {
                const payload = {
                    background: null,
                }

                const res1 = await dispatch(updateCollection(id, payload))
                if (res1.error === undefined) {
                    setCollectionCoverImage('')
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
        const res1 = await dispatch(updateCollection(id, payload))
        if (res1.error === undefined) {
            setCollectionCoverImage('')
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

    if(type === 'wallpaper'){
      if (wallpaper?.type === 'upload' || wallpaper?.type === 'unsplash') {
            setLoadingWallpaperImg(true)
            const res = await dispatch(deleteCoverS3Link(wallpaper?.icon))

            if (res.error === undefined) {
                const payload = {
                    wallpaper: null
                }

                const res1 = await dispatch(updateCollection(id, payload))
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

        setLoadingCoverImg(true)
        const payload = {
            wallpaper: null
        }
        const res1 = await dispatch(updateCollection(id, payload))
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
    }

    const handleSaveCoverSize = async (value) => {
      setCoverSize(value)
      const payload = {
        background: {
          ...collectionCoverImage,
          size: value
        }
      }
      const res1 = await dispatch(updateCollection(id, payload));
      if (res1.error === undefined) {
        setLoadingCoverImg(false);
        setSelectedCoverImage("");
        setSelectedCoverGallery("");
        setSelectedCoverUnSplash("");
        setOpenCoverModal(false);
        setOpenEditCollectionDrawer(false);
        setCollectionCoverImage(
          res1?.payload?.data?.data?.attributes?.background || ""
        );
      } else {
        setLoadingCoverImg(false);
        setSelectedCoverImage("");
        setSelectedCoverGallery("");
        setSelectedCoverUnSplash("");
        setOpenCoverModal(false);
        setOpenEditCollectionDrawer(false);
      }
    }

    const handleTextEditor = async(value) => {
      setShowTextEditor(value)

      const data = {
            ...pageConfig,
            pageId: id,
            showTextEditor: value,
        }
        setPageConfig({ ...pageConfig, ...data })
        await dispatch(updateCollectionPageConfig(data))
        setOpenEditCollectionDrawer(false)
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

            const res = await dispatch(uploadIcons(formData))

            if (res.error === undefined) {
                const payload = {
                    avatar: {
                        icon: res.payload?.data?.message || '',
                        type: 'image'
                    }
                }
                const res1 = await dispatch(updateCollection(id, payload))

                if (res1.error === undefined) {
                    dispatch(fetchCollectionWiseCounts())
                    dispatch(getSharedCollections())
                    setLoadingImg(false)
                    setOpenCollectionIcon(false)
                    setCollectionIcon(res1?.payload?.data?.data?.attributes?.avatar)
                    return;
                }
            } else {
                setLoadingImg(false)
                setSelectedImage('')
                setOpenCollectionIcon(false)
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
            const res = await dispatch(updateCollection(id, payload))

            if (res.error === undefined) {
                dispatch(fetchCollectionWiseCounts())
                dispatch(getSharedCollections())
                setLoadingImg(false)
                setOpenCollectionIcon(false)
                setCollectionIcon(res?.payload?.data?.data?.attributes?.avatar)
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
            const res = await dispatch(updateCollection(id, payload))

            if (res.error === undefined) {
                dispatch(fetchCollectionWiseCounts())
                dispatch(getSharedCollections())
                setLoadingImg(false)
                setOpenCollectionIcon(false)
                setCollectionIcon(res?.payload?.data?.data?.attributes?.avatar)
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
            const res = await dispatch(updateCollection(id, payload))

            if (res.error === undefined) {
                dispatch(fetchCollectionWiseCounts())
                dispatch(getSharedCollections())
                setLoadingImg(false)
                setOpenCollectionIcon(false)
                setCollectionIcon(res?.payload?.data?.data?.attributes?.avatar)
                return;
            }
        }
    }

    const resetCancelValues = () => {
        setSelectedEmoji(collectionIcon?.type === 'emoji' ? collectionIcon?.icon : '')
        setSelectedColor(collectionIcon?.type === 'color' ? collectionIcon?.icon : '')
        setSelectedImage(collectionIcon?.type === 'image' ? collectionIcon?.icon : '')
        setSelectedIcon(collectionIcon?.type === 'icon' ? collectionIcon?.icon : '')
        setOpenCollectionIcon(false)
    }

    const handleRemoveIconModalSubmit = async () => {
        setLoadingImg(true)
        const payload = {
            avatar: null
        }
        const res = await dispatch(updateCollection(id, payload))
        if (res.error === undefined) {
            setLoadingImg(false)
            setOpenCollectionIcon(false)
            setCollectionIcon('')
            setSelectedEmoji('')
            setSelectedColor('')
            setSelectedImage('')
            setSelectedIcon('')
        }
    }

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
                    },
                }

                const res1 = await dispatch(updateCollection(id, payload))
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
                    },
                }

                const res1 = await dispatch(updateCollection(id, payload))
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
                    icon: selectedWallpaperGallery
                },
            }
            const res1 = await dispatch(updateCollection(id, payload))
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

    const handleShareClick = async () => {
        setLoading(true)
        const res = await dispatch(getSingleCollection(id))

        if (res) {
            setLoading(false)
            setOpenShareCollectionDrawer(true)
        }
    }

    const submit = async (data,type='edit') => {
      if(type === 'edit'){
        const result = updateBookmarkState(isFilter ? filteredBookmarkData : bookmarkData,data)
        isFilter ? setFilteredBookmarkData(result) : setBookmarkData(result)
        if(layout === 'inbox'){
            dispatch(inboxViewUpdates({
              type : 'edit',
              data: data
            }))
          }
      }
      
      if(type === 'delete'){
      const result = deleteBookmarkState(isFilter ? filteredBookmarkData : bookmarkData,data)
      isFilter ? setFilteredBookmarkData(result) : setBookmarkData(result)
      if(layout === 'inbox'){
            dispatch(inboxViewUpdates({
              type : 'delete',
              data: data
            }))
          }
      }

      if (isAprrovalEdit) {
        setOpenDrawer(false)
        setOpenApprovalRejectDrawer(true)
        setIsApprovalEdit(false)
        setBookmarkData([...data,...bookmarkData])

        if(pendingGemsCount > 0){
          setPendingGemsCount(pendingGemsCount - 1)
          }else{
          setPendingGemsCount(0)
        }
      }
    }
    const imagesArr = collectionCoverImage !== "" && collectionCoverImage?.icon && (collectionCoverImage?.type === "upload" || collectionCoverImage?.type === "unsplash") ? [collectionCoverImage?.icon] : []
    if (bookmarkData.length > 0) {
      bookmarkData.forEach(item => {
        if (item?.metaData?.docImages) {
          item?.metaData?.docImages.forEach(image => {
            imagesArr.push(image)
          })
        }
      })
    }

    const handleOpenApproveReject = () => {
      setOpenApprovalRejectDrawer(true)
    }

    const handleViewSubCollection = async(value) => {
        setViewSubCollections(value)

        const payload = {
          viewSubCollection: value,
        };

        dispatch(updateCollection(id, payload));
    }

    const onGemEditClick = (gemId) => {
      setGemSingleIdSingleId(gemId)
      setOpenDrawer(true)
      setOpenApprovalRejectDrawer(false)
      setIsApprovalEdit(true)
    }

    const handleCopyCollection = async () => {
      if (session && session?.userId) {
        setCopyLoading(true);
        const res = await dispatch(copyCollection(id));
        setCopyLoading(false);
        if (res?.payload?.data?.status === 200) {
          // setCopyLoading(false);
          message.success(TextMessage.COLLECTION_COPY_TEXT);
          dispatch(fetchCollectionWiseCounts());
        } 
        // else {
        //   message.error(TextMessage.COLLECTION_COPY_EXISTS_TEXT);
        // }
      } else {
        dispatch(
          openAuthModal({
            open: true,
            action: "login",
            extraInfo: {
              trigger: 'copy',
              username: uname,
              id: sourceId,
              module: module,
              slug: slug
            }
          })
        );
      }
    };

    const onFollowCollection = async () => {
      if (!collectionData) return
      const res = await dispatch(followCollection(id, collectionData))
      if (res.error === undefined) {
        message.success("Collection followed successfully.")
      }
      else {
        message.error("An error occured while following the collection")
      }
    }

    const onUnfollowCollection = async () => {
      if (!id) return
      const res = await dispatch(unfollowCollection(id))
      if (res.error === undefined) {
        message.success("Collection unfollowed successfully.")
        navigate(`/u/${session.username}/all-bookmarks`)
      }
      else {
        message.error("An error occured while following the collection")
      }
    }

    const onFollowerAddBookmark = () => {
      setShowFollowerAddBookmark(true)
    }


    const handleChangeCollectionCollapse = (key) => {
    setCollectionCollapseKeys(key)
  }

  const getSortedItems = (items) => {
    //initItemsId --> items id we have loaded per page only
    const initReoderedItemsId = items?.map(item => item.id)
    const order = [...orderOfGems]
    const length = bookmarkData?.length
    //getItemsAfter --> rest id of ordersGems not loaded in page
    const getItemsAfter = order.slice(length)
    const reorder = [...initReoderedItemsId,...getItemsAfter]

    setBookmarkData(items)
    setOrderOfGems(reorder)
      const payload = {
        order_of_gems: reorder
      }

     dispatch(updateCollection(id, payload))
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
      let currentCollectionAccessType = null;

      const isSelectedCollectionShared = getAllLevelCollectionPermissions(
        sharedCollections,
        id
      );

      currentCollectionAccessType = isSelectedCollectionShared

    if (!isSelectedCollectionShared) {
      const res = await dispatch(deleteCollection(id));

      if (res.error === undefined) {
        message.success(TextMessage.COLLECTION_DELETE_TEXT);
        return navigate.push(`/u/${session.username}/all-bookmarks`);
      } else {
        message.success(TextMessage.ERROR_TEXT);
      }
    }

    if (isSelectedCollectionShared?.accessType === "viewer") {
      message.error(
        "You dont have permission to delete this shared collection"
      );
      return;
    }

    if (isSelectedCollectionShared?.accessType === "editor") {
      const parsed = currentCollectionAccessType
        ? JSON.parse(currentCollectionAccessType?.data?.usersViaMail)
        : [];
      const userToken = parsed?.filter(
        (item) => {
          return (item?.members && item.members.findIndex((m) => m.id === Number(session?.userId)) !== -1) || item?.id === Number(session?.userId) }
      );
      const res = await dispatch(removeAccessEmail(userToken[0].token, id));

      if (res.error === undefined) {
        dispatch(removeSharedCollection(id));
        message.success("Access removed successfully");
        return navigate.push(`/u/${session.username}/all-bookmarks`);
      } else {
        message.success(TextMessage.ERROR_TEXT);
      }
    }

    if (isSelectedCollectionShared?.accessType === "owner") {
      const res = await dispatch(
        deleteCollection(id, isSelectedCollectionShared)
      );

      if (res.error === undefined) {
        message.success(TextMessage.COLLECTION_DELETE_TEXT);
        return navigate.push(`/u/${session.username}/all-bookmarks`);
      } else {
        message.success(TextMessage.ERROR_TEXT);
      }
    }
    }

    const handleShareMobileView = async () => {
        setLoading(true)
        const res = await dispatch(getSingleCollection(id))

        if (res) {
            setLoading(false)
            setShowShareMobileView(true)
        }
    }

    const handleHideGems = (value) => {
        setHideGems(value)

        const payload = {
          hideGem: value,
        };

        dispatch(updateCollection(id, payload));
    }

    const handleShowGems = (value) => {
        setShowGems(value);

        const payload = {
          showGem: value,
        };

        dispatch(updateCollection(id, payload));
    }

    const handleHideBrokenLinks = (value) => {
        setHideBrokenLinks(value);

        const data = {
            ...pageConfig,
            pageId: id,
            hideBrokenLinks: value,
        }
        setPageConfig({ ...pageConfig, ...data })
        dispatch(updateCollectionPageConfig(data))
    }

    const handleGemOnClickEvent = async (item) => {
      setGemOnClickEvent(item);
      const payload = {
        gemOnClickEvent: item,
      };
      dispatch(updateCollection(id, payload));
    };

    if (!mounted) return <></>;

    return (
      <>
        <CommonLayout
          coverImage={collectionCoverImage}
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
          // page='collection'  folders={collectionsData || []} targetId={id || ''}
          // isSharedAndAllowEdit={(!permissions || (permissions && (permissions?.accessType === 'editor' || permissions?.accessType === 'owner')))}
          // handleShareClick={handleShareClick}
          // addEditIcon={((title !== 'Unfiltered' && !permissions) || (permissions && permissions?.permissions?.existingCollections?.canUpdate)) ? true : false}
          // handleEditCall={handleEditCall}
          // copyUrl= {`${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/c/${id}/${title}`}
          // handleDeleteCollection={handleDeleteCollection}
        >
          {loadingState || loading || loadingConfig ? (
            <div className="spinDiv">
              <Spin size="middle" tip="Loading..." />
            </div>
          ) : (
            <>
              {/* header area */}
              <div className="sticky top-0 w-full bg-white z-[100]">
                <BreadCrumbNav
                  targetId={id}
                  folders={collectionsData || []}
                  isSharedAndAllowEdit={
                    !permissions ||
                    (permissions &&
                      (permissions?.accessType === "editor" ||
                        permissions?.accessType === "owner"))
                  }
                  handleShareClick={handleShareClick}
                  page={"collection"}
                  addEditIcon={
                    (title !== "Unfiltered" && !permissions) ||
                    (permissions &&
                      permissions?.permissions?.existingCollections?.canUpdate)
                      ? true
                      : false
                  }
                  handleEditCall={handleEditCall}
                  copyUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/u/${authorName}/c/${id}/${title}`}
                  handleDeleteCollection={handleDeleteCollection}
                  title={title}
                  isSubCollection={isSubCollection}
                  // isMobile={isMobile} collapsed={collapsed}
                  setOpenIcon={setOpenCollectionIcon}
                  handleCoverModal={handleCoverModal}
                  icon={collectionIcon}
                  coverImage={collectionCoverImage}
                  handleOpenApproveReject={handleOpenApproveReject}
                  showNotificationIcon={
                    isShareable && pendingGemsCount > 0 && !isFollowedCollection
                      ? true
                      : false
                  }
                  pendingGemsCount={pendingGemsCount}
                  handleShareMobileView={handleShareMobileView}
                  isFollowedCollection={isFollowedCollection}
                  //view
                  propertyShown={propertyShown}
                  propertyHidden={propertyHidden}
                  layout={layout}
                  collectionId={id}
                  customFields={customFields}
                  handlePropertyHide={handlePropertyHide}
                  handlePropertyVisible={handlePropertyVisible}
                  updatePropertyOnDrop={updatePropertyOnDrop}
                  handleLayout={handleLayout}
                  isUnfilteredCollection={isUnfilteredCollection}
                  setPropertyShown={setPropertyShown}
                  setPropertyOrder={setPropertyOrder}
                  updateCustomPropertyDataInConfig={
                    updateCustomPropertyDataInConfig
                  }
                  propertyOrder={propertyOrder}
                  setPropertyHidden={setPropertyHidden}
                  handleRefreshProperty={handleRefreshProperty}
                  editPagesIn={editPagesIn}
                  handleEditPagesIn={handleEditPagesIn}
                  handleCardSize={handleCardSize}
                  cardSize={cardSize}
                  handleTableVerticalLine={handleTableVerticalLine}
                  showTableVerticalLine={showTableVerticalLine}
                  handleTableWrapColumns={handleTableWrapColumns}
                  tableWrapColumns={tableWrapColumns}
                  openPagesIn={openPagesIn}
                  handleOpenPagesIn={handleOpenPagesIn}
                  setOpenWallpaperModal={setOpenWallpaperModal}
                  wallpaper={wallpaper}
                  permissions={permissions}
                  handleViewSubCollection={handleViewSubCollection}
                  viewSubCollections={viewSubCollections}
                  handleTextEditor={handleTextEditor}
                  showTextEditor={showTextEditor}
                  sort={sortArr}
                  filter={filterArr}
                  userTags={userTags}
                  handleUpdateCollectionPageConfig={
                    handleUpdateCollectionPageConfig
                  }
                  handleFilterSave={handleFilterSave}
                  handleFilterRemove={handleFilterRemove}
                  changeFilterOrder={changeFilterOrder}
                  handleSortSave={handleSortSave}
                  changeSortOrder={changeSortOrder}
                  handleSortRemove={handleSortRemove}
                  setFilterArr={setFilterArr}
                  setSortArr={setSortArr}
                  handleFilterRemoveAll={handleFilterRemoveAll}
                  handleFilterAdd={handleFilterAdd}
                  handleSortAdd={handleSortAdd}
                  hideGems={hideGems}
                  handleHideGems={handleHideGems}
                  showGems={showGems}
                  handleShowGems={handleShowGems}
                  hideBrokenLinks={hideBrokenLinks}
                  handleHideBrokenLinks={handleHideBrokenLinks}
                  handleGemOnClickEvent={handleGemOnClickEvent}
                  gemOnClickEvent={gemOnClickEvent}
                  showInviteAndShare={
                    title !== "Unfiltered" &&
                    (!permissions ||
                      (permissions &&
                        (permissions?.accessType === "editor" ||
                          permissions?.accessType === "owner")))
                  }
                />
              </div>

              {collectionCoverImage && (
                <HeaderComponent
                  coverImage={collectionCoverImage}
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
                page="collection"
                userTags={userTags}
                propertyShown={propertyShown}
                propertyHidden={propertyHidden}
                propertyOrder={propertyOrder}
                layout={layout}
                sort={sortArr}
                filter={filterArr}
                collectionId={id}
                customFields={customFields?.length > 0 ? customFields : []}
                addEditIcon={
                  (title !== "Unfiltered" && !permissions) ||
                  (permissions &&
                    permissions?.permissions?.existingCollections?.canUpdate)
                    ? true
                    : false
                }
                handleEditCall={handleEditCall}
                handleUpdateCollectionPageConfig={
                  handleUpdateCollectionPageConfig
                }
                handleFilterSave={handleFilterSave}
                handleFilterRemove={handleFilterRemove}
                changeFilterOrder={changeFilterOrder}
                handleSortSave={handleSortSave}
                handleSortRemove={handleSortRemove}
                changeSortOrder={changeSortOrder}
                handlePropertyHide={handlePropertyHide}
                handlePropertyVisible={handlePropertyVisible}
                updatePropertyOnDrop={updatePropertyOnDrop}
                setFilterArr={setFilterArr}
                setSortArr={setSortArr}
                handleLayout={handleLayout}
                isUnfilteredCollection={isUnfilteredCollection}
                setPropertyShown={setPropertyShown}
                setPropertyOrder={setPropertyOrder}
                setPropertyHidden={setPropertyHidden}
                updateCustomPropertyDataInConfig={
                  updateCustomPropertyDataInConfig
                }
                checkedBookmark={checkedBookmark}
                handleOpenSelectBookmarkDrawer={handleOpenSelectBookmarkDrawer}
                handleCancelSelectedBookmark={handleCancelSelectedBookmark}
                handleSelectAllSelectedBookmark={
                  handleSelectAllSelectedBookmark
                }
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
                setOpenWallpaperModal={setOpenWallpaperModal}
                wallpaper={wallpaper}
                handleFilterAdd={handleFilterAdd}
                handleSortAdd={handleSortAdd}
                permissions={permissions}
                showShare={true}
                handleShareClick={handleShareClick}
                icon={collectionIcon}
                coverImage={collectionCoverImage}
                showTextEditor={showTextEditor}
                handleTextEditor={handleTextEditor}
                handleCoverModal={handleCoverModal}
                setOpenIcon={setOpenCollectionIcon}
                descriptionContent={descriptionContent}
                setDescriptionContent={setDescriptionContent}
                setCheckedBookmark={setCheckedBookmark}
                submit={submit}
                handleOpenApproveReject={handleOpenApproveReject}
                showNotificationIcon={
                  isShareable && pendingGemsCount > 0 && !isFollowedCollection
                    ? true
                    : false
                }
                pendingGemsCount={pendingGemsCount}
                handleViewSubCollection={handleViewSubCollection}
                viewSubCollections={viewSubCollections}
                isSubCollection={isSubCollection}
                isFollowedCollection={isFollowedCollection}
                handleCopyCollection={handleCopyCollection}
                copyLoading={copyLoading}
                following={isFollowedCollection}
                onFollowCollection={onFollowCollection}
                onUnfollowCollection={onUnfollowCollection}
                handleFollowerAddBookmark={onFollowerAddBookmark}
                isFollowerChildCollection={isFollowerChildCollection}
                collectionUrl={
                  followCooll
                    ? `${process.env.NEXT_PUBLIC_BASE_URL}/u/${followCooll?.author?.username}/c/${id}/${followCooll?.slug}`
                    : `${process.env.NEXT_PUBLIC_BASE_URL}/u/${authorName}/c/${id}/${collSlug}`
                }
                showFollowerCopy={showFollowerCopy}
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

              {subCollectionsCount === 0 &&
                Array.isArray(bookmarkData) &&
                bookmarkData?.length === 0 && (
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
                {/* subcollections */}
                {isFollowedCollection &&
                !showFollowerSub ? null : viewSubCollections &&
                  !isUnfilteredCollection ? (
                  <SubCollectionComponent
                    collectionId={id}
                    setSubCollectionsCount={setSubCollectionsCount}
                    wallpaper={wallpaper}
                    isSharedAndAllowEdit={
                      !permissions ||
                      (permissions &&
                        (permissions?.accessType === "editor" ||
                          permissions?.accessType === "owner"))
                    }
                  />
                ) : null}

                {showGems && (
                  <div className={`py-2 px-3 xl:px-8`}>
                    <Views
                      layout={layout}
                      propertyOrder={propertyOrder}
                      propertyHidden={propertyHidden}
                      propertyShown={propertyShown}
                      items={
                        isFilter ? filteredBookmarkData : bookmarkData || []
                      }
                      page="collection"
                      openDrawer={openDrawer}
                      setOpenDrawer={setOpenDrawer}
                      setGemSingleIdSingleId={setGemSingleIdSingleId}
                      checkedBookmark={checkedBookmark}
                      setCheckedBookmark={setCheckedBookmark}
                      showComment={showComment}
                      // showEdit={true}
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
                      collectionId={id}
                      sortArr={sortArr}
                      filterArr={filterArr}
                      collectionName={title}
                      subCollectionsCount={subCollectionsCount}
                      getSortedItems={getSortedItems}
                      gemOnClickEvent={gemOnClickEvent}
                    />
                  </div>
                )}
              </div>

              {showFollowerAddBookmark && collectionData && (
                <AddBookmark
                  open={showFollowerAddBookmark}
                  setOpen={setShowFollowerAddBookmark}
                  selectedMediaType={collectionData?.media_type}
                  selectedCollectionValue={{ id: parseInt(id), name: title }}
                  page="public"
                  isLoggedIn={(session && session?.userId) || false}
                  // isTypeAiPrompt={collectionData[0]?.media_type === "Ai Prompt" && collectionData[0]?.id === parseInt(process.env.NEXT_PUBLIC_AI_PROMPT_COLLECTION_ID)}
                  isTypeAiPrompt={
                    collectionData?.media_type === "Ai Prompt" &&
                    parseInt(id) === parseInt(session?.aiPromptLibraryId)
                  }
                />
              )}

              {openDrawer && (
                <SingleBookmarkDrawer
                  setOpenDrawer={setOpenDrawer}
                  setGemSingleIdSingleId={setGemSingleIdSingleId}
                  openDrawer={openDrawer}
                  gemSingleId={gemSingleId}
                  customFields={customFields}
                  submit={submit}
                  editPagesIn={editPagesIn}
                  collectionId={id}
                  onClose={() => {
                    if (isAprrovalEdit) {
                      setOpenDrawer(false);
                      setOpenApprovalRejectDrawer(true);
                      setIsApprovalEdit(false);
                    }
                  }}
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
                  collectionCoverImage={collectionCoverImage}
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

              {openSelectBookmarkDrawer && (
                <BookmarkSelectDrawer
                  openSelectBookmarkDrawer={openSelectBookmarkDrawer}
                  setOpenSelectBookmarkDrawer={setOpenSelectBookmarkDrawer}
                  checkedBookmark={checkedBookmark}
                  collectionName={title || ""}
                  collectionId={id}
                  setCheckedBookmark={setCheckedBookmark}
                  submit={submit}
                  customFields={customFields?.length > 0 ? customFields : []}
                />
              )}

              {/* collection icon modal */}
              {openCollectionIcon && (
                <DialogModal
                  open={openCollectionIcon}
                  setOpen={setOpenCollectionIcon}
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

              {openEditCollectionDrawer && (
                <CollectionDrawer
                  open={openEditCollectionDrawer}
                  setOpenDrawer={setOpenEditCollectionDrawer}
                  title={"Edit Collection"}
                  action="edit"
                  singleCollectionDetails={singleCollection?.attributes || ""}
                  id={Number(id)}
                  collections={collectionData}
                  setOpenShareCollectionDrawer={setOpenShareCollectionDrawer}
                  pageNumber={page}
                  setCollectionIcon={setCollectionIcon}
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
                  setOpenShareCollWithDrawer={setOpenShareCollWithDrawer}
                  openShareCollWithDrawer={openShareCollWithDrawer}
                  shareCollectionDetails={singleCollection?.attributes || ""}
                  setTitle={setTitle}
                  handleCoverModal={handleCoverModal}
                  handleTextEditor={handleTextEditor}
                  showTextEditor={showTextEditor}
                  existingThumbnails={imagesArr.length > 0 ? imagesArr : []}
                  loading={loadingDrawer}
                  setCollectionCoverImage={setCollectionCoverImage}
                  setCoverSize={setCoverSize}
                  coverSize={coverSize}
                />
              )}

              {/* share collection drawer */}
              {(openShareCollectionDrawer || showShareMobileView) && (
                <ShareCollectionDrawer
                  openDrawer={openShareCollectionDrawer}
                  setOpenDrawer={setOpenShareCollectionDrawer}
                  singleCollectionDetails={singleCollection?.attributes || ""}
                  collectionId={id || ""}
                  openShareCollWithDrawer={openShareCollWithDrawer}
                  existingThumbnails={imagesArr.length > 0 ? imagesArr : []}
                  collectionName={title}
                  showShareMobileView={showShareMobileView}
                  setShowShareMobileView={setShowShareMobileView}
                  collectionUrl={
                    followCooll
                      ? `${process.env.NEXT_PUBLIC_BASE_URL}/u/${followCooll?.author?.username}/c/${id}/${followCooll?.slug}`
                      : `${process.env.NEXT_PUBLIC_BASE_URL}/u/${authorName}/c/${id}/${title}`
                  }
                />
              )}

              <CommentDrawer
                openDrawer={openCommentDrawer}
                hideCommentDrawer={(val) => setOpenCommentDrawer(val)}
                selectedGem={selectedGem}
                user={{ id: session.userId, username: session.username }}
              />

              {openApprovalRejectDrawer && (
                <ApprovalRejectDrawer
                  openDrawer={openApprovalRejectDrawer}
                  setOpenDrawer={setOpenApprovalRejectDrawer}
                  collectionId={id}
                  setPendingGemsCount={setPendingGemsCount}
                  setBookmarkData={setBookmarkData}
                  bookmarkData={bookmarkData}
                  pendingGemsCount={pendingGemsCount}
                  onGemEditClick={onGemEditClick}
                />
              )}

              {showGems && layout !== "inbox" && loadingMore && (
                <div className="spinDiv">
                  <Spin tip="Loading..." />
                </div>
              )}

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
        </CommonLayout>
      </>
    );
}

export default Collections;