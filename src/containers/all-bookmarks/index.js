"use client"
import { enableTourSteps, fromWelcomeModal, inboxViewUpdates, openDrawer, setBookmarkletValue, sidebarMenuClicked } from "@actions/app";
import { gemAdded, getAllBookmarks, getFilteredBookmarks, getPageConfig, resetFilterBookmark, savePageConfig } from "@actions/bookmark";
import { clearCollectionState, resetSharedCollections } from "@actions/collection";
import { disableMsg } from "@actions/login";
import { clearAllTags } from "@actions/tags";
import { updateUser } from "@actions/user";
import BookmarkUpload from "@components/common/BookmarkUpload";
import BookmarkSelectDrawer from "@components/drawers/BookmarkSelectDrawer";
import CommentDrawer from "@components/drawers/CommentDrawer";
import SingleBookmarkDrawer from "@components/drawers/SingleBookmarkDrawer";
import CommonLayout             from "@components/layouts/CommonLayout";
import Topbar from "@components/layouts/Topbar/Topbar";
import Views from "@components/views/Views";
import { TextMessage, aggregateProperties, defaultPropertyHidden, defaultPropertyOrder, defaultPropertyShown, getPropertiesData } from "@utils/constants";
import { deleteBookmarkState, updateBookmarkState } from "@utils/find-collection-id";
import session from "@utils/session";
import { Spin, message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllBookmarks = ({items,pageNumber,configRes,count,hasMoreValue}) => {
    const searchParams = useSearchParams()
    const dispatch = useDispatch()
    const navigate = useRouter()
    const { userTags } = useSelector((state) => state.users);
    const { addedGem } = useSelector((state) => state.allBookmarks);
    const user = useSelector((state) => state?.users?.userData);

    const [filterArr, setFilterArr] = useState([]);
    const [sortArr, setSortArr] = useState([]);
    const [propertyShown, setPropertyShown] = useState([]);
    const [propertyHidden, setPropertyHidden] = useState([]);
    const [propertyOrder, setPropertyOrder] = useState([]);
    const [layout, setLayout] = useState("");
    const [page, setPage] = useState(pageNumber);
    const [OpenDrawer, setOpenDrawer] = useState(false);
    const [gemSingleId, setGemSingleIdSingleId] = useState("");
    const [checkedBookmark, setCheckedBookmark] = useState([]);
    const [openSelectBookmarkDrawer, setOpenSelectBookmarkDrawer] =
      useState(false);

    
    const [pageConfig, setPageConfig] = useState("");
    const [openCommentDrawer, setOpenCommentDrawer] = useState(false);
    const [selectedGem, setSelectedGem] = useState(null);
    const [editPagesIn, setEditPagesIn] = useState(
      session ? session.editPagesInSession : ""
    );
    const [cardSize, setCardSize] = useState("");
    const [showTableVerticalLine, setShowTableVerticalLine] = useState(null);
    const [tableWrapColumns, setTableWrapColumns] = useState(null);
    const [openPagesIn, setOpenPagesIn] = useState(
      session ? session.openPagesInSession : ""
    );
    const [shrink,setShrink] = useState(false)
    const [filterPage, setFilterPage] = useState(1);
    const [isFilter, setIsFilter] = useState(false);
    // const [allCollectionsValue, setAllCollectionsValue] = useState([]);

    const [allBookmarks, setAllBookmarks] = useState(items);
    const [filteredBookmarks, setFilteredBookmarks] = useState([]);
    const [hasMore, setHasMore] = useState(hasMoreValue);
    const [loading, setLoading] = useState(false);
    const [loadingState, setLoadingState] = useState(false);
    const [totalCount, setTotalCount] = useState(count);

    const userId = searchParams.get('userId')
    const url = searchParams.get('url')

    const [mounted, setMounted] = useState(false);
    const [filterHasMore, setFilterHasMore] = useState(false);
    const observerRef = useRef(null);
    const observerFilterRef = useRef(null);
    const [gemOnClickEvent, setGemOnClickEvent] = useState("gem view");
    const [hideBrokenLinks, setHideBrokenLinks] = useState(true);

    useEffect(() => {
    setMounted(true);
    if (session.isNewlyRegistered) {
      dispatch(enableTourSteps(true));
      dispatch(fromWelcomeModal(true));
      session.removeNewlyRegistered()
    }
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

      if(url){
        dispatch(openDrawer('bookmark'))
        dispatch(setBookmarkletValue(url))
      }
    },[userId,navigate,dispatch])

    useEffect(() => {
    const getCall = async () => {
      setLoadingState(true)
      const res1 = await dispatch(getPageConfig());
      if(res1){
        const data = getPropertiesData(res1?.payload?.data,'bookmark')
        setFilterArr(res1?.payload?.data?.data?.filter?.length === 0 ? [{
        filterBy: "",
        termType: "",
        queryBy: "",
        platform: ''
      }] : res1?.payload?.data?.data?.filter);
        setSortArr(res1?.payload?.data?.data?.sort?.length === 0 ? [{
            sortby: 'title',
            orderby: '',
        }] : res1?.payload?.data?.data?.sort);
        setPropertyShown(data?.PS);
        setPropertyOrder(data?.PO);
        setPropertyHidden(data?.PH);
        setLayout(data?.ly);
        setPageConfig(res1?.payload?.data?.data);
        setCardSize(res1?.payload?.data?.data?.cardSize);
        setShowTableVerticalLine(
          res1?.payload?.data?.data?.showTableVerticalLine
        );
        setTableWrapColumns(res1?.payload?.data?.data?.tableWrapColumns);
        setHideBrokenLinks(res1?.payload?.data?.data?.hideBrokenLinks);
        setLoadingState(false);
      }
    };

    getCall()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

    useEffect(() => {
      if(addedGem && addedGem?.page === 'bookmark'){
        const obj = {...addedGem?.value}
        setAllBookmarks([obj,...allBookmarks])
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
      setLoading(true)
      const res = await dispatch(getAllBookmarks(page));
      if (res) {
        setAllBookmarks((prevData) => [...prevData, ...res?.payload?.data?.data?.bookmark || []]);
        setLoading(false);
        if (res?.payload?.data?.totalBookmark <= allBookmarks.length + res?.payload?.data?.data?.bookmark?.length) {
          setHasMore(false);
        }
      }
    };

    if(hasMore && !loading && page !== 1){
      getCall()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);

  //filter pagination
  useEffect(() => {
    if(filterPage === 1) return;
    const getCall = async () => {
      setLoading(true)
      const sortby= sortArr.length>0 ? sortArr[0]?.sortby : ''
      const orderby= sortArr.length>0 ? (sortArr[0]?.orderby || 'asc') : ''

      const aggregatedData = aggregateProperties(filterArr);

      const res = await dispatch(getFilteredBookmarks(aggregatedData.filterBy,aggregatedData.queryBy,aggregatedData.termType,filterPage,sortby,orderby))

      if(res.error === undefined){
        setFilteredBookmarks((prevData) => [...prevData, ...res?.payload?.data?.finalRes || []]);
        setLoading(false);
        if (res?.payload?.data?.totalCount <= filteredBookmarks.length + res?.payload?.data?.finalRes?.length) {
          setHasMore(false);
        }
      }
    }

    if(isFilter && hasMore){
      getCall()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch,filterPage])

  const updatePageConfig = async (obj) => {
    setPageConfig(obj);
    await dispatch(savePageConfig(obj));
  };

  //filter
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
      setLoadingState(true)
      setIsFilter(true)
      dispatch(resetFilterBookmark())
      setFilterPage(1);
      setFilterHasMore(true)
      
      const res = await dispatch(getFilteredBookmarks(aggregatedData.filterBy,aggregatedData.queryBy,aggregatedData.termType,1,sortby,orderby))
      
      if(res.error === undefined){
        setFilteredBookmarks(res?.payload?.data?.finalRes)
        setTotalCount(res?.payload?.data?.totalCount)
      }
      setLoadingState(false)
      const data = {
        ...pageConfig,
        filter: filterArr,
      };
      updatePageConfig(data);
  };

  const handleFilterRemove = async (i) => {
    const arr = [...filterArr];
    if(arr.length === 1 && sortArr.length === 0){
      arr.splice(i, 1);
      setFilterArr([]);
      const data = {
        ...pageConfig,
        filter: [],
      };
      updatePageConfig(data);
      setIsFilter(false)
      dispatch(resetFilterBookmark())
      setFilterPage(1)
      setFilterHasMore(false)
      setFilteredBookmarks([])
      setTotalCount(count)
      return;
    }

    if(arr.length === 1 && sortArr.length === 1){
      const sortby= sortArr.length>0 ? sortArr[0]?.sortby : ''
      const orderby= sortArr.length>0 ? sortArr[0]?.orderby : ''

      arr.splice(i, 1);
      setFilterArr([]);
      const data = {
        ...pageConfig,
        filter: [],
      };
      setFilterPage(1)
      setFilterHasMore(true)
      if(orderby){
        setLoadingState(true);
        const res = await dispatch(getFilteredBookmarks('','','',1,sortby,orderby))
        if(res.error === undefined){
          setFilteredBookmarks(res?.payload?.data?.finalRes)
          setTotalCount(res?.payload?.data?.totalCount)
        }
        setLoadingState(false);
        updatePageConfig(data);
        return
      }

      setIsFilter(false)
      updatePageConfig(data);
      return;
    }

    arr.splice(i, 1);
    setFilterArr(arr);
    const data = {
      ...pageConfig,
      filter: arr,
    };

    updatePageConfig(data);
  };

  const handleFilterRemoveAll = async () => {
    if(sortArr.length === 0){
      setFilterArr([]);
      setIsFilter(false)
      dispatch(resetFilterBookmark())
      const data = {
        ...pageConfig,
        filter: [],
      };
      setFilterPage(1)
      setFilterHasMore(false)
      setFilteredBookmarks([])
      setTotalCount(count)
      updatePageConfig(data);
      return;
    }

    const sortby= sortArr.length>0 ? sortArr[0]?.sortby : ''
    const orderby= sortArr.length>0 ? sortArr[0]?.orderby : ''

    setFilterPage(1)
    setFilterHasMore(true)
    setFilterArr([]);
    if(orderby){
      setLoadingState(true);
      const res = await dispatch(getFilteredBookmarks('','','',1,sortby,orderby,true,false))
      if(res.error === undefined){
        setFilteredBookmarks(res?.payload?.data?.finalRes)
        setTotalCount(res?.payload?.data?.totalCount)
      }

      setLoadingState(false);
      const data = {
      ...pageConfig,
      filter: [],
      };

      updatePageConfig(data);
      return;
    }

    setIsFilter(false)
    const data = {
      ...pageConfig,
      filter: [],
    };

    updatePageConfig(data);
  };

  const changeFilterOrder = (arr) => {
    const a = [...arr];
    setFilterArr(a);
    const data = {
      ...pageConfig,
      filter: a,
    };

    updatePageConfig(data);
  };

  // sort
  const handleSortAdd = () => {
    const newObj = {
      sortby: "",
      orderby: "",
    };
    const arr = [...sortArr, newObj];
    setSortArr(arr);
  };

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
    setFilterPage(1);
    setFilterHasMore(true)
    dispatch(resetFilterBookmark())
    const res = await dispatch(getFilteredBookmarks(filterBy,queryBy,termType,1,sortArr[0].sortby,sortArr[0].orderby))
    if(res.error === undefined){
      setFilteredBookmarks(res?.payload?.data?.finalRes)
      setTotalCount(res?.payload?.data?.totalCount)
    }
    setLoadingState(false);

    const data = {
      ...pageConfig,
      sort: sortArr,
    };
    updatePageConfig(data);
  };

  const handleSortRemove = async (i) => {
    if(filterArr.length === 0){
      const arr = [...sortArr];
      arr.splice(i, 1);
      setSortArr(arr);
      const data = {
        ...pageConfig,
        sort: arr,
      };
      setIsFilter(false)
      dispatch(resetFilterBookmark())
      updatePageConfig(data);
      setFilteredBookmarks([])
      setTotalCount(count)
      setFilterPage(1)
      setFilterHasMore(false)
      return;
    }

    setSortArr([]);
    setFilterPage(1)
    setFilterHasMore(true)
    const aggregatedData = aggregateProperties(filterArr);
    if(aggregatedData.filterBy && aggregatedData.queryBy && aggregatedData.termType){
      setLoadingState(true)
      const res = await dispatch(getFilteredBookmarks(aggregatedData.filterBy,aggregatedData.queryBy,aggregatedData.termType,1,'','',))
      if(res.error === undefined){
        setFilteredBookmarks(res?.payload?.data?.finalRes)
        setTotalCount(res?.payload?.data?.totalCount)
      }
      setLoadingState(false);
      const data = {
      ...pageConfig,
      sort: [],
    };
    updatePageConfig(data);
    return;
    }
    
    setIsFilter(false)
    const data = {
      ...pageConfig,
      sort: [],
    };
    updatePageConfig(data);
  };

  const handleSortRemoveAll = () => {
    setSortArr([]);
    setIsFilter(false)
    dispatch(resetFilterBookmark())
    const data = {
      ...pageConfig,
      sort: [],
    };

    updatePageConfig(data);
  };

  const changeSortOrder = (arr) => {
    const a = [...arr];
    setSortArr(a);
    const data = {
      ...pageConfig,
      sort: a,
    };
    updatePageConfig(data);
  };

  //property
  const handlePropertyHide = async (data) => {
    if (layout !== 'moodboard' && layout !== 'stream' && propertyShown.length === 1) {
      message.info(TextMessage.PROPERTY_HIDE_INFO_TEXT);
      return;
    }
    const filtered = propertyShown.filter((item) => item.name !== data?.name);
    const arr = [...propertyHidden];
    arr.push(data);
    setPropertyShown(filtered);
    setPropertyHidden(arr);
    setPropertyOrder(filtered);

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

      updatePageConfig(obj)
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

      updatePageConfig(obj)
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

      updatePageConfig(obj)
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

      updatePageConfig(obj)
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

      updatePageConfig(obj)
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

      updatePageConfig(obj)
      return;
    }
  };

  const handlePropertyVisible = async (item) => {
    const arr = [...propertyShown];
    arr.push(item);

    const filtered = propertyHidden.filter((data) => data?.name !== item.name);
    setPropertyShown(arr);
    setPropertyHidden(filtered);
    setPropertyOrder(arr);

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

      updatePageConfig(obj)
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

      updatePageConfig(obj)
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

      updatePageConfig(obj)
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

      updatePageConfig(obj)
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

      updatePageConfig(obj)
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

      updatePageConfig(obj)
      return;
    }
  };

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
      updatePageConfig(obj)
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
      updatePageConfig(obj)
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
      updatePageConfig(obj)
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
      updatePageConfig(obj)
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
      updatePageConfig(obj)
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
      updatePageConfig(obj)
      return;
    }
  };

  const handleRefreshProperty = () => {
    if(layout === 'card'){
      setPropertyShown(defaultPropertyShown?.card?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.card?.propertyOrder)
      setPropertyHidden(defaultPropertyHidden?.card?.propertyHidden)

      const obj = {
        ...pageConfig,
        propertyHidden: {
          ...pageConfig.propertyHidden,
          card: {
            propertyHidden: defaultPropertyHidden?.card?.propertyHidden,
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

      updatePageConfig(obj)
      return;
    }
    if(layout === 'list'){
      setPropertyShown(defaultPropertyShown?.list?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.list?.propertyOrder)
      setPropertyHidden(defaultPropertyHidden?.list?.propertyHidden)

      const obj = {
        ...pageConfig,
        propertyHidden: {
          ...pageConfig.propertyHidden,
          list: {
            propertyHidden: defaultPropertyHidden?.list?.propertyHidden,
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

      updatePageConfig(obj)
      return;
    }
    if(layout === 'table'){
      setPropertyShown(defaultPropertyShown?.table?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.table?.propertyOrder)
      setPropertyHidden(defaultPropertyHidden?.table?.propertyHidden)

      const obj = {
        ...pageConfig,
        propertyHidden: {
          ...pageConfig.propertyHidden,
          table: {
            propertyHidden: defaultPropertyHidden?.table?.propertyHidden,
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

      updatePageConfig(obj)
      return;
    }
    if(layout === 'inbox'){
      setPropertyShown(defaultPropertyShown?.inbox?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.inbox?.propertyOrder)
      setPropertyHidden(defaultPropertyHidden?.inbox?.propertyHidden)

      const obj = {
        ...pageConfig,
        propertyHidden: {
          ...pageConfig.propertyHidden,
          inbox: {
            propertyHidden: defaultPropertyHidden?.inbox?.propertyHidden,
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

      updatePageConfig(obj)
      return;
    }
    if(layout === 'moodboard'){
      setPropertyShown(defaultPropertyShown?.moodboard?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.moodboard?.propertyOrder)
      setPropertyHidden(defaultPropertyHidden?.moodboard?.propertyHidden)

      const obj = {
        ...pageConfig,
        propertyHidden: {
          ...pageConfig.propertyHidden,
          moodboard: {
            propertyHidden: defaultPropertyHidden?.moodboard?.propertyHidden,
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

      updatePageConfig(obj)
      return;
    }
    if(layout === 'stream'){
      setPropertyShown(defaultPropertyShown?.stream?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.stream?.propertyOrder)
      setPropertyHidden(defaultPropertyHidden?.stream?.propertyHidden)

      const obj = {
        ...pageConfig,
        propertyHidden: {
          ...pageConfig.propertyHidden,
          stream: {
            propertyHidden: defaultPropertyHidden?.stream?.propertyHidden,
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

      updatePageConfig(obj)
      return;
    }
  };

  //layout
  const handleLayout = async (item) => {
    setLayout(item);
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
      groupBy: "",
      subGroupBy: "",
    };
    updatePageConfig(data);
  };

  const handleOpenSelectBookmarkDrawer = () => {
    setOpenSelectBookmarkDrawer(true);
  };

  const handleCancelSelectedBookmark = () => {
    setCheckedBookmark([]);
  };

  const handleSelectAllSelectedBookmark = () => {
    setCheckedBookmark(isFilter ? filteredBookmarks :allBookmarks);
  };

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
  const submit = async (data,type='edit') => {
    if(type === 'edit'){
      const result = updateBookmarkState(isFilter ? filteredBookmarks : allBookmarks,data)
      isFilter ? setFilteredBookmarks(result) : setAllBookmarks(result)
      if(layout === 'inbox'){
        dispatch(inboxViewUpdates({
          type : 'edit',
          data: data
        }))
      }
    }
    
    if(type === 'delete'){
    const result = deleteBookmarkState(isFilter ? filteredBookmarks : allBookmarks,data)
    isFilter ? setFilteredBookmarks(result) : setAllBookmarks(result)
    if(layout === 'inbox'){
        dispatch(inboxViewUpdates({
          type : 'delete',
          data: data
        }))
      }
    }
  };

  const showComment = (id) => {
    setOpenCommentDrawer(true);
    setSelectedGem(id);
  };

  const handleEditPagesIn = async (item) => {
    setEditPagesIn(item);
    session.setEditPagesInSession(item);
    const data = {
      editPagesIn: item,
    };

    dispatch(updateUser(data));
  };

  const handleHideBrokenLinks = (value) => {
    setHideBrokenLinks(value);

    const data = {
      ...pageConfig,
      hideBrokenLinks: value,
    };

    updatePageConfig(data);
  };

  const handleGemOnClickEvent = async (item) => {
    setGemOnClickEvent(item);

    session.setGemOnClickEventInSession(item);
    const data = {
      preferences: { ...user?.preferences, gemOnClickEvent: item },
    };

    dispatch(updateUser(data));
  };

  const handleCardSize = async (item) => {
    setCardSize(item);

    const data = {
      ...pageConfig,
      cardSize: item,
    };
    updatePageConfig(data);
  };

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

  const handleTableVerticalLine = (checked) => {
    setShowTableVerticalLine(checked);

    const data = {
      ...pageConfig,
      showTableVerticalLine: checked,
    };
    updatePageConfig(data);
  };

  const handleTableWrapColumns = (checked) => {
    setTableWrapColumns(checked);

    const data = {
      ...pageConfig,
      tableWrapColumns: checked,
    };
    updatePageConfig(data);
  };

  if (!mounted) return <></>;

    return (
      <CommonLayout>
        {loadingState ? (
          <div className="spinDiv">
            <Spin size="middle" tip="Loading..." />
          </div>
        ) : (
          <>
            <Topbar
              title={"All Bookmarks"}
              page="bookmark"
              userTags={userTags}
              propertyShown={propertyShown}
              propertyHidden={propertyHidden}
              propertyOrder={propertyOrder}
              updatePageConfig={updatePageConfig}
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
              handleSelectAllSelectedBookmark={handleSelectAllSelectedBookmark}
              handleSortRemoveAll={handleSortRemoveAll}
              handleFilterRemoveAll={handleFilterRemoveAll}
              handleRefreshProperty={handleRefreshProperty}
              editPagesIn={editPagesIn}
              handleEditPagesIn={handleEditPagesIn}
              cardSize={cardSize}
              handleCardSize={handleCardSize}
              openPagesIn={openPagesIn}
              handleOpenPagesIn={handleOpenPagesIn}
              handleFilterAdd={handleFilterAdd}
              handleSortAdd={handleSortAdd}
              // allCollectionsValue={allCollectionsValue}
              showShare={false}
              coverImage={false}
              showTextEditor={false}
              permissions={null}
              handleTableVerticalLine={handleTableVerticalLine}
              handleTableWrapColumns={handleTableWrapColumns}
              showTableVerticalLine={showTableVerticalLine}
              tableWrapColumns={tableWrapColumns}
              setCheckedBookmark={setCheckedBookmark}
              submit={submit}
              handleOpenAllSelectedLinks={handleOpenAllSelectedLinks}
              handleGemOnClickEvent={handleGemOnClickEvent}
              gemOnClickEvent={gemOnClickEvent}
              hideBrokenLinks={hideBrokenLinks}
              handleHideBrokenLinks={handleHideBrokenLinks}
            />

            {Array.isArray(allBookmarks) && allBookmarks?.length === 0 && (
              <>
                <div className="grid place-content-center mt-2">
                  <BookmarkUpload />
                </div>
              </>
            )}

            <Views
              layout={layout}
              propertyOrder={propertyOrder}
              propertyHidden={propertyHidden}
              propertyShown={propertyShown}
              items={isFilter ? filteredBookmarks : allBookmarks}
              page="bookmark"
              openDrawer={OpenDrawer}
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
              pageNumber={isFilter ? filterPage : page}
              count={totalCount}
              isFilter={isFilter}
              sortArr={sortArr}
              filterArr={filterArr}
              gemOnClickEvent={gemOnClickEvent}
            />

            {OpenDrawer && (
              <SingleBookmarkDrawer
                setOpenDrawer={setOpenDrawer}
                setGemSingleIdSingleId={setGemSingleIdSingleId}
                openDrawer={OpenDrawer}
                gemSingleId={gemSingleId}
                submit={submit}
                page="bookmark"
                editPagesIn={editPagesIn}
              />
            )}

            {openSelectBookmarkDrawer && (
              <BookmarkSelectDrawer
                openSelectBookmarkDrawer={openSelectBookmarkDrawer}
                setOpenSelectBookmarkDrawer={setOpenSelectBookmarkDrawer}
                checkedBookmark={checkedBookmark}
                setCheckedBookmark={setCheckedBookmark}
                submit={submit}
                page="bookmark"
              />
            )}

            <CommentDrawer
              openDrawer={openCommentDrawer}
              hideCommentDrawer={(val) => setOpenCommentDrawer(val)}
              selectedGem={selectedGem}
              user={{ id: session.userId, username: session.username }}
            />

            {layout !== "inbox" && loading && (
              <div className="spinDiv">
                <Spin tip="Loading..." />
              </div>
            )}

            {layout !== "inbox" && !isFilter && (
              <div
                ref={setObserverRef}
                style={{ height: "20px", visibility: "hidden" }}
              />
            )}

            {layout !== "inbox" && isFilter && (
              <div
                ref={setObserverFilterRef}
                style={{ height: "20px", visibility: "hidden" }}
              />
            )}
          </>
        )}
      </CommonLayout>
    );
} 

export default AllBookmarks;