'use client'

import { inboxViewUpdates } from "@actions/app";
import { gemAdded, getBookmarkByFilters, getFilterPageFilteredBookmarks, resetFilterPageFilteredBookmark, updateBookmarkFilterConfig } from "@actions/bookmark";
import { updateUser } from "@actions/user";
import BookmarkSelectDrawer from "@components/drawers/BookmarkSelectDrawer";
import CommentDrawer from "@components/drawers/CommentDrawer";
import SingleBookmarkDrawer from "@components/drawers/SingleBookmarkDrawer";
import CommonLayout from "@components/layouts/CommonLayout";
import Topbar from "@components/layouts/Topbar/Topbar";
import Views from "@components/views/Views";
import { TextMessage, aggregateProperties, defaultPropertyHidden, defaultPropertyOrder, defaultPropertyShown, getPropertiesData } from "@utils/constants";
import { deleteBookmarkState, updateBookmarkState } from "@utils/find-collection-id";
import session from "@utils/session";
import { Spin } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Filters = ({type}) => {
    const dispatch = useDispatch()
    const { userTags } = useSelector((state) => state.users);
    const { addedGem } = useSelector((state) => state.allBookmarks);
    const user = useSelector((state) => state?.users?.userData);
    const observerRef = useRef(null);
    const observerFilterRef = useRef(null);

    const [bookmarkByFilters, setBookmarkByFilters] = useState([]);

    const [loadingState, setLoadingState] = useState(false)
    const [checkedBookmark, setCheckedBookmark] = useState([])
    const [openSelectBookmarkDrawer, setOpenSelectBookmarkDrawer] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [gemSingleId, setGemSingleIdSingleId] = useState('')
    const [page, setPage] = useState(1)

    const [filterArr, setFilterArr] = useState([])
    const [sortArr, setSortArr] = useState([])
    const [propertyShown, setPropertyShown] = useState([])
    const [propertyHidden, setPropertyHidden] = useState([])
    const [propertyOrder, setPropertyOrder] = useState([])
    const [layout, setLayout] = useState('')
    const [bookmarkConfig, setBookmarkConfig] = useState(null)

    const [openCommentDrawer, setOpenCommentDrawer] = useState(false)
    const [selectedGem, setSelectedGem] = useState(null);

    const [editPagesIn, setEditPagesIn] = useState(session ? session.editPagesInSession : '')
    const [cardSize, setCardSize] = useState('')
    const [showTableVerticalLine, setShowTableVerticalLine] = useState(null)
    const [tableWrapColumns, setTableWrapColumns] = useState(null)
    const [openPagesIn, setOpenPagesIn] = useState(
    session ? session.openPagesInSession : ""
  );
  const [shrink,setShrink] = useState(false)
  const [isFilter, setIsFilter] = useState(false);
  const [filterPage, setFilterPage] = useState(1);
  // const [allCollectionsValue, setAllCollectionsValue] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [mounted, setMounted] = useState(false);
  const [filterHasMore, setFilterHasMore] = useState(false);
  const [gemOnClickEvent, setGemOnClickEvent] = useState(
    session ? session.gemOnClickEventInSession : "gem view"
  );
  const [hideBrokenLinks, setHideBrokenLinks] = useState(true);

    useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
      if(addedGem && addedGem?.page === 'filter'){
        const obj = {...addedGem?.value}
        setBookmarkByFilters([obj,...bookmarkByFilters])
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
            if (type === 'Favourites') {
                if (page === 1) {
                  setLoadingState(true)
                } else {
                  setLoadingState(false)
                }
                setLoading(true)
                const res = await dispatch(getBookmarkByFilters('', page, false, true, false))
                if (res.error === undefined) {
                    setBookmarkByFilters((prevData) => [...prevData, ...res?.payload?.data?.message || []]);
                    setLoading(false);
                    if (res?.payload?.data?.totalCount <= bookmarkByFilters.length + res?.payload?.data?.message?.length) {
                      setHasMore(false);
                    }
                }
                const configRes = res?.payload?.data?.bookmarkConfig
                setBookmarkConfig(configRes)
                const data = getPropertiesData(configRes,'filter')
                setFilterArr(configRes?.filter?.length === 0 ? [{
                    filterBy: "",
                    termType: "",
                    queryBy: "",
                    platform: ''
                  }] : configRes?.filter)
                setSortArr(configRes?.sort?.length === 0 ? [{
                        sortby: 'title',
                        orderby: '',
                    }] : configRes?.sort)
                setPropertyShown(data?.PS)
                setPropertyOrder(data?.PO)
                setPropertyHidden(data?.PH)
                setLayout(data?.ly)
                setCardSize(configRes?.cardSize)
                setShowTableVerticalLine(configRes?.showTableVerticalLine)
                setTableWrapColumns(configRes?.tableWrapColumns)
                setTotalCount(res?.payload?.data?.totalCount)
                setLoadingState(false)
                return;
            }

            if (type === 'without tags') {
              if (page === 1) {
              setLoadingState(true)
            } else {
              setLoadingState(false)
            }
              setLoading(true)
                const res = await dispatch(getBookmarkByFilters('', page, false, false, true))
                if (res.error === undefined) {
                    setBookmarkByFilters((prevData) => [...prevData, ...res?.payload?.data?.message || []]);
                    setLoading(false);
                    if (res?.payload?.data?.totalCount <= bookmarkByFilters.length + res?.payload?.data?.message?.length) {
                      setHasMore(false);
                    }
                }
                const configRes = res?.payload?.data?.bookmarkConfig
                const data = getPropertiesData(configRes,'filter')
                setBookmarkConfig(configRes)
                setFilterArr(configRes?.filter?.length === 0 ? [{
                    filterBy: "",
                    termType: "",
                    queryBy: "",
                    platform: ''
                  }] : configRes?.filter)
                setSortArr(configRes?.sort?.length === 0 ? [{
                        sortby: 'title',
                        orderby: '',
                    }] : configRes?.sort)
                setPropertyShown(data?.PS)
                setPropertyOrder(data?.PO)
                setPropertyHidden(data?.PH)
                setLayout(data?.ly)
                setCardSize(configRes?.cardSize)
                setShowTableVerticalLine(configRes?.showTableVerticalLine)
                setTableWrapColumns(configRes?.tableWrapColumns)
                setTotalCount(res?.payload?.data?.totalCount)
                setLoadingState(false)
                return;
            }

            if (page === 1) {
              setLoadingState(true)
            } else {
              setLoadingState(false)
            }
            setLoading(true)
            const res = await dispatch(getBookmarkByFilters(type, page, true, false, false))
            if (res.error === undefined) {
              setBookmarkByFilters((prevData) => [...prevData, ...res?.payload?.data?.message || []]);
              setLoading(false);
              if (res?.payload?.data?.totalCount <= bookmarkByFilters.length + res?.payload?.data?.message?.length) {
                setHasMore(false);
              }
            }
            const configRes = res?.payload?.data?.bookmarkConfig
            const data = getPropertiesData(configRes,'filter')
            setBookmarkConfig(configRes)
            setFilterArr(configRes?.filter?.length === 0 ? [{
                filterBy: "",
                termType: "",
                queryBy: "",
                platform: ''
              }] : configRes?.filter)
            setSortArr(configRes?.sort?.length === 0 ? [{
                    sortby: 'title',
                    orderby: '',
                }] : configRes?.sort)
            setPropertyShown(data?.PS)
            setPropertyOrder(data?.PO)
            setPropertyHidden(data?.PH)
            setLayout(data?.ly)
            setCardSize(configRes?.cardSize)
            setShowTableVerticalLine(configRes?.showTableVerticalLine)
            setTableWrapColumns(configRes?.tableWrapColumns)
            setTotalCount(res?.payload?.data?.totalCount)
            setLoadingState(false)
        }

        if(hasMore && !loading && !isFilter){
          getCall()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, type,page])

    //filter pagination
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

    const res = await dispatch(getFilterPageFilteredBookmarks(filterBy,queryBy,termType,filterPage,type,sortby,orderby))
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

    const updatePageConfig = async (obj) => {
        await dispatch(updateBookmarkFilterConfig(obj))
    }

    const handleLayout = async (item) => {
        setLayout(item)
        if(item === 'card'){
      setPropertyHidden(bookmarkConfig?.propertyHidden?.card?.propertyHidden)
      setPropertyOrder(bookmarkConfig?.propertyOrder?.card?.propertyOrder)
      setPropertyShown(bookmarkConfig?.propertyShown?.card?.propertyShown)
    }
    if(item === 'table'){
      setPropertyHidden(bookmarkConfig?.propertyHidden?.table?.propertyHidden)
      setPropertyOrder(bookmarkConfig?.propertyOrder?.table?.propertyOrder)
      setPropertyShown(bookmarkConfig?.propertyShown?.table?.propertyShown)
    }
    if(item === 'list'){
      setPropertyHidden(bookmarkConfig?.propertyHidden?.list?.propertyHidden)
      setPropertyOrder(bookmarkConfig?.propertyOrder?.list?.propertyOrder)
      setPropertyShown(bookmarkConfig?.propertyShown?.list?.propertyShown)
    }
    if(item === 'inbox'){
      setPropertyHidden(bookmarkConfig?.propertyHidden?.inbox?.propertyHidden)
      setPropertyOrder(bookmarkConfig?.propertyOrder?.inbox?.propertyOrder)
      setPropertyShown(bookmarkConfig?.propertyShown?.inbox?.propertyShown)
    }
    if(item === 'moodboard'){
      setPropertyHidden(bookmarkConfig?.propertyHidden?.moodboard?.propertyHidden)
      setPropertyOrder(bookmarkConfig?.propertyOrder?.moodboard?.propertyOrder)
      setPropertyShown(bookmarkConfig?.propertyShown?.moodboard?.propertyShown)
    }
    if(item === 'stream'){
      setPropertyHidden(bookmarkConfig?.propertyHidden?.stream?.propertyHidden)
      setPropertyOrder(bookmarkConfig?.propertyOrder?.stream?.propertyOrder)
      setPropertyShown(bookmarkConfig?.propertyShown?.stream?.propertyShown)
    }
        const data = {
            ...bookmarkConfig,
            layout: item,
            groupBy: '',
            subGroupBy: ''
        }
        setBookmarkConfig(data)
        updatePageConfig(data)
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
        ...bookmarkConfig,
        propertyHidden: {
          ...bookmarkConfig.propertyHidden,
          card: {
            propertyHidden: arr,
          }
        },
        propertyOrder: {
          ...bookmarkConfig.propertyOrder,
          card: {
            propertyOrder: filtered,
          }
        },
        propertyShown: {
          ...bookmarkConfig.propertyShown,
          card: {
            propertyShown: filtered,
          }
        },
      }

      setBookmarkConfig(obj)
      updatePageConfig(obj)
      return;
        }

        if(layout === 'table'){
        const obj = {
            ...bookmarkConfig,
            propertyHidden: {
            ...bookmarkConfig.propertyHidden,
            table: {
                propertyHidden: arr,
            }
            },
            propertyOrder: {
            ...bookmarkConfig.propertyOrder,
            table: {
                propertyOrder: filtered,
            }
            },
            propertyShown: {
            ...bookmarkConfig.propertyShown,
            table: {
                propertyShown: filtered,
            }
            },
        }

        setBookmarkConfig(obj)
        updatePageConfig(obj)
        return;
        }

        if(layout === 'list'){
        const obj = {
            ...bookmarkConfig,
            propertyHidden: {
            ...bookmarkConfig.propertyHidden,
            list: {
                propertyHidden: arr,
            }
            },
            propertyOrder: {
            ...bookmarkConfig.propertyOrder,
            list: {
                propertyOrder: filtered,
            }
            },
            propertyShown: {
            ...bookmarkConfig.propertyShown,
            list: {
                propertyShown: filtered,
            }
            },
        }

        setBookmarkConfig(obj)
        updatePageConfig(obj)
        return;
        }

        if(layout === 'inbox'){
        const obj = {
            ...bookmarkConfig,
            propertyHidden: {
            ...bookmarkConfig.propertyHidden,
            inbox: {
                propertyHidden: arr,
            }
            },
            propertyOrder: {
            ...bookmarkConfig.propertyOrder,
            inbox: {
                propertyOrder: filtered,
            }
            },
            propertyShown: {
            ...bookmarkConfig.propertyShown,
            inbox: {
                propertyShown: filtered,
            }
            },
        }

        setBookmarkConfig(obj)
        updatePageConfig(obj)
        return;
        }

        if(layout === 'moodboard'){
        const obj = {
            ...bookmarkConfig,
            propertyHidden: {
            ...bookmarkConfig.propertyHidden,
            moodboard: {
                propertyHidden: arr,
            }
            },
            propertyOrder: {
            ...bookmarkConfig.propertyOrder,
            moodboard: {
                propertyOrder: filtered,
            }
            },
            propertyShown: {
            ...bookmarkConfig.propertyShown,
            moodboard: {
                propertyShown: filtered,
            }
            },
        }

        setBookmarkConfig(obj)
        updatePageConfig(obj)
        return;
        }
        if(layout === 'stream'){
        const obj = {
            ...bookmarkConfig,
            propertyHidden: {
            ...bookmarkConfig.propertyHidden,
            stream: {
                propertyHidden: arr,
            }
            },
            propertyOrder: {
            ...bookmarkConfig.propertyOrder,
            stream: {
                propertyOrder: filtered,
            }
            },
            propertyShown: {
            ...bookmarkConfig.propertyShown,
            stream: {
                propertyShown: filtered,
            }
            },
        }

        setBookmarkConfig(obj)
        updatePageConfig(obj)
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
        ...bookmarkConfig,
        propertyHidden: {
          ...bookmarkConfig.propertyHidden,
          card: {
            propertyHidden: filtered,
          }
        },
        propertyOrder: {
          ...bookmarkConfig.propertyOrder,
          card: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...bookmarkConfig.propertyShown,
          card: {
            propertyShown: arr,
          }
        },
      }

      setBookmarkConfig(obj)
      updatePageConfig(obj)
      return;
    }
    if(layout === 'table'){
      const obj = {
        ...bookmarkConfig,
        propertyHidden: {
          ...bookmarkConfig.propertyHidden,
          table: {
            propertyHidden: filtered,
          }
        },
        propertyOrder: {
          ...bookmarkConfig.propertyOrder,
          table: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...bookmarkConfig.propertyShown,
          table: {
            propertyShown: arr,
          }
        },
      }

      setBookmarkConfig(obj)
      updatePageConfig(obj)
      return;
    }

    if(layout === 'list'){
      const obj = {
        ...bookmarkConfig,
        propertyHidden: {
          ...bookmarkConfig.propertyHidden,
          list: {
            propertyHidden: filtered,
          }
        },
        propertyOrder: {
          ...bookmarkConfig.propertyOrder,
          list: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...bookmarkConfig.propertyShown,
          list: {
            propertyShown: arr,
          }
        },
      }

      setBookmarkConfig(obj)
      updatePageConfig(obj)
      return;
    }

    if(layout === 'inbox'){
      const obj = {
        ...bookmarkConfig,
        propertyHidden: {
          ...bookmarkConfig.propertyHidden,
          inbox: {
            propertyHidden: filtered,
          }
        },
        propertyOrder: {
          ...bookmarkConfig.propertyOrder,
          inbox: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...bookmarkConfig.propertyShown,
          inbox: {
            propertyShown: arr,
          }
        },
      }

      setBookmarkConfig(obj)
      updatePageConfig(obj)
      return;
    }

    if(layout === 'moodboard'){
      const obj = {
        ...bookmarkConfig,
        propertyHidden: {
          ...bookmarkConfig.propertyHidden,
          moodboard: {
            propertyHidden: filtered,
          }
        },
        propertyOrder: {
          ...bookmarkConfig.propertyOrder,
          moodboard: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...bookmarkConfig.propertyShown,
          moodboard: {
            propertyShown: arr,
          }
        },
      }

      setBookmarkConfig(obj)
      updatePageConfig(obj)
      return;
    }
    if(layout === 'stream'){
      const obj = {
        ...bookmarkConfig,
        propertyHidden: {
          ...bookmarkConfig.propertyHidden,
          stream: {
            propertyHidden: filtered,
          }
        },
        propertyOrder: {
          ...bookmarkConfig.propertyOrder,
          stream: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...bookmarkConfig.propertyShown,
          stream: {
            propertyShown: arr,
          }
        },
      }

      setBookmarkConfig(obj)
      updatePageConfig(obj)
      return;
    }
    }

    const updatePropertyOnDrop = async (arr) => {
        if(layout === 'card'){
      setPropertyOrder(arr)
      const obj = {
        ...bookmarkConfig,
        propertyOrder: {
          ...bookmarkConfig.propertyOrder,
          card: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...bookmarkConfig.propertyShown,
          card: {
            propertyShown: arr,
          }
        },
      }
      setBookmarkConfig(obj)
      updatePageConfig(obj)
      return;
    }
    if(layout === 'list'){
      setPropertyOrder(arr)
      const obj = {
        ...bookmarkConfig,
        propertyOrder: {
          ...bookmarkConfig.propertyOrder,
          list: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...bookmarkConfig.propertyShown,
          list: {
            propertyShown: arr,
          }
        },
      }
      setBookmarkConfig(obj)
      updatePageConfig(obj)
      return;
    }
    if(layout === 'table'){
      setPropertyOrder(arr)
      const obj = {
        ...bookmarkConfig,
        propertyOrder: {
          ...bookmarkConfig.propertyOrder,
          table: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...bookmarkConfig.propertyShown,
          table: {
            propertyShown: arr,
          }
        },
      }
      setBookmarkConfig(obj)
      updatePageConfig(obj)
      return;
    }
    if(layout === 'inbox'){
      setPropertyOrder(arr)
      const obj = {
        ...bookmarkConfig,
        propertyOrder: {
          ...bookmarkConfig.propertyOrder,
          inbox: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...bookmarkConfig.propertyShown,
          inbox: {
            propertyShown: arr,
          }
        },
      }
      setBookmarkConfig(obj)
      updatePageConfig(obj)
      return;
    }
    if(layout === 'moodboard'){
      setPropertyOrder(arr)
      const obj = {
        ...bookmarkConfig,
        propertyOrder: {
          ...bookmarkConfig.propertyOrder,
          moodboard: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...bookmarkConfig.propertyShown,
          moodboard: {
            propertyShown: arr,
          }
        },
      }
      setBookmarkConfig(obj)
      updatePageConfig(obj)
      return;
    }
    if(layout === 'stream'){
      setPropertyOrder(arr)
      const obj = {
        ...bookmarkConfig,
        propertyOrder: {
          ...bookmarkConfig.propertyOrder,
          stream: {
            propertyOrder: arr,
          }
        },
        propertyShown: {
          ...bookmarkConfig.propertyShown,
          stream: {
            propertyShown: arr,
          }
        },
      }
      setBookmarkConfig(obj)
      updatePageConfig(obj)
      return;
    }
    }

    const handleRefreshProperty = async () => {
        if(layout === 'card'){
      setPropertyShown(defaultPropertyShown?.card?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.card?.propertyOrder)
      setPropertyHidden(defaultPropertyHidden?.card?.propertyHidden)

      const obj = {
        ...bookmarkConfig,
        propertyHidden: {
          ...bookmarkConfig.propertyHidden,
          card: {
            propertyHidden: defaultPropertyHidden?.card?.propertyHidden,
          }
        },
        propertyOrder: {
          ...bookmarkConfig.propertyOrder,
          card: {
            propertyOrder: defaultPropertyOrder?.card?.propertyOrder,
          }
        },
        propertyShown: {
          ...bookmarkConfig.propertyShown,
          card: {
            propertyShown: defaultPropertyShown?.card?.propertyShown,
          }
        },
      }

      setBookmarkConfig(obj)
      updatePageConfig(obj)
      return;
    }
    if(layout === 'list'){
      setPropertyShown(defaultPropertyShown?.list?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.list?.propertyOrder)
      setPropertyHidden(defaultPropertyHidden?.list?.propertyHidden)

      const obj = {
        ...bookmarkConfig,
        propertyHidden: {
          ...bookmarkConfig.propertyHidden,
          list: {
            propertyHidden: defaultPropertyHidden?.list?.propertyHidden,
          }
        },
        propertyOrder: {
          ...bookmarkConfig.propertyOrder,
          list: {
            propertyOrder: defaultPropertyOrder?.list?.propertyOrder,
          }
        },
        propertyShown: {
          ...bookmarkConfig.propertyShown,
          list: {
            propertyShown: defaultPropertyShown?.list?.propertyShown,
          }
        },
      }

      setBookmarkConfig(obj)
      updatePageConfig(obj)
      return;
    }
    if(layout === 'table'){
      setPropertyShown(defaultPropertyShown?.table?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.table?.propertyOrder)
      setPropertyHidden(defaultPropertyHidden?.table?.propertyHidden)

      const obj = {
        ...bookmarkConfig,
        propertyHidden: {
          ...bookmarkConfig.propertyHidden,
          table: {
            propertyHidden: defaultPropertyHidden?.table?.propertyHidden,
          }
        },
        propertyOrder: {
          ...bookmarkConfig.propertyOrder,
          table: {
            propertyOrder: defaultPropertyOrder?.table?.propertyOrder,
          }
        },
        propertyShown: {
          ...bookmarkConfig.propertyShown,
          table: {
            propertyShown: defaultPropertyShown?.table?.propertyShown,
          }
        },
      }

      setBookmarkConfig(obj)
      updatePageConfig(obj)
      return;
    }
    if(layout === 'inbox'){
      setPropertyShown(defaultPropertyShown?.inbox?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.inbox?.propertyOrder)
      setPropertyHidden(defaultPropertyHidden?.inbox?.propertyHidden)

      const obj = {
        ...bookmarkConfig,
        propertyHidden: {
          ...bookmarkConfig.propertyHidden,
          inbox: {
            propertyHidden: defaultPropertyHidden?.inbox?.propertyHidden,
          }
        },
        propertyOrder: {
          ...bookmarkConfig.propertyOrder,
          inbox: {
            propertyOrder: defaultPropertyOrder?.inbox?.propertyOrder,
          }
        },
        propertyShown: {
          ...bookmarkConfig.propertyShown,
          inbox: {
            propertyShown: defaultPropertyShown?.inbox?.propertyShown,
          }
        },
      }

      setBookmarkConfig(obj)
      updatePageConfig(obj)
      return;
    }
    if(layout === 'moodboard'){
      setPropertyShown(defaultPropertyShown?.moodboard?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.moodboard?.propertyOrder)
      setPropertyHidden(defaultPropertyHidden?.moodboard?.propertyHidden)

      const obj = {
        ...bookmarkConfig,
        propertyHidden: {
          ...bookmarkConfig.propertyHidden,
          moodboard: {
            propertyHidden: defaultPropertyHidden?.moodboard?.propertyHidden,
          }
        },
        propertyOrder: {
          ...bookmarkConfig.propertyOrder,
          moodboard: {
            propertyOrder: defaultPropertyOrder?.moodboard?.propertyOrder,
          }
        },
        propertyShown: {
          ...bookmarkConfig.propertyShown,
          moodboard: {
            propertyShown: defaultPropertyShown?.moodboard?.propertyShown,
          }
        },
      }

      setBookmarkConfig(obj)
      updatePageConfig(obj)
      return;
    }
    if(layout === 'stream'){
      setPropertyShown(defaultPropertyShown?.stream?.propertyShown)
      setPropertyOrder(defaultPropertyOrder?.stream?.propertyOrder)
      setPropertyHidden(defaultPropertyHidden?.stream?.propertyHidden)

      const obj = {
        ...bookmarkConfig,
        propertyHidden: {
          ...bookmarkConfig.propertyHidden,
          stream: {
            propertyHidden: defaultPropertyHidden?.stream?.propertyHidden,
          }
        },
        propertyOrder: {
          ...bookmarkConfig.propertyOrder,
          stream: {
            propertyOrder: defaultPropertyOrder?.stream?.propertyOrder,
          }
        },
        propertyShown: {
          ...bookmarkConfig.propertyShown,
          stream: {
            propertyShown: defaultPropertyShown?.stream?.propertyShown,
          }
        },
      }

      setBookmarkConfig(obj)
      updatePageConfig(obj)
      return;
    }
    }

    // sort

    const handleSortAdd = async () => {
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
        setFilterPage(1);
        setFilterHasMore(true)
        const res = await dispatch(getFilterPageFilteredBookmarks(filterBy,queryBy,termType,1,type,sortArr[0].sortby,sortArr[0].orderby))
        if(res.error === undefined){
          setFilteredBookmarks(res?.payload?.data?.finalRes)
          setTotalCount(res?.payload?.data?.totalCount)
        }
        setLoadingState(false);

        const payload = {
            ...bookmarkConfig,
            sort: sortArr
        }
        setBookmarkConfig(payload)
        updatePageConfig(payload)
    }

    const handleSortRemove = async (i) => {
      if(filterArr.length === 0){
        const arr = [...sortArr]
        arr.splice(i, 1)
        setSortArr(arr)
        const payload = {
            ...bookmarkConfig,
            sort: arr
        }
        setIsFilter(false)
        dispatch(resetFilterPageFilteredBookmark())
        setFilteredBookmarks([])
        setTotalCount(bookmarkByFilters?.length)
        setFilterPage(1)
        setBookmarkConfig(payload)
        updatePageConfig(payload)
        setFilterHasMore(false)
        return;
      }

      setSortArr([])
      const payload = {
            ...bookmarkConfig,
            sort: []
      }
      setFilterPage(1);
      setFilterHasMore(true)
      const aggregatedData = aggregateProperties(filterArr);
      if(aggregatedData.filterBy && aggregatedData.queryBy && aggregatedData.termType){
        setLoadingState(true)
        const res = await dispatch(getFilterPageFilteredBookmarks(aggregatedData?.filterBy,aggregatedData?.queryBy,aggregatedData?.termType,1,type,'',''))
        if(res.error === undefined){
          setFilteredBookmarks(res?.payload?.data?.finalRes)
          setTotalCount(res?.payload?.data?.totalCount)
        }

        setLoadingState(false);
        setBookmarkConfig(payload)
        updatePageConfig(payload)
        return;
      }
      
      setIsFilter(false)
      setBookmarkConfig(payload)
      updatePageConfig(payload)
    }

    const handleSortRemoveAll = async () => {
        setSortArr([])
        const payload = {
            ...bookmarkConfig,
            sort: []
        }
        setBookmarkConfig(payload)
        updatePageConfig(payload)
    }

    const changeSortOrder = async (arr) => {
        const a = [...arr]
        setSortArr(a)
        const payload = {
            ...bookmarkConfig,
            sort: a
        }
        setBookmarkConfig(payload)
        updatePageConfig(payload)
    }

    const handleOpenSelectBookmarkDrawer = () => {
        setOpenSelectBookmarkDrawer(true)
    }

    const handleCancelSelectedBookmark = () => {
        setCheckedBookmark([])
    }

    const handleSelectAllSelectedBookmark = () => {
        setCheckedBookmark(isFilter ? filteredBookmarks :bookmarkByFilters)
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

    dispatch(resetFilterPageFilteredBookmark())
    setLoadingState(true)
    setIsFilter(true)
    setFilterPage(1);
    setFilterHasMore(true)
    const res = await dispatch(getFilterPageFilteredBookmarks(aggregatedData.filterBy,aggregatedData.queryBy,aggregatedData.termType,1,type,sortby,orderby))
    if(res.error === undefined){
      setFilteredBookmarks(res?.payload?.data?.finalRes)
      setTotalCount(res?.payload?.data?.totalCount)
    }

    setLoadingState(false);

        const data = {
            ...bookmarkConfig,
            filter: filterArr
        }
        setBookmarkConfig(data)
        updatePageConfig(data)
    }

    const handleFilterRemove = async (i) => {
        const arr = [...filterArr]
        if(arr.length === 1 && sortArr.length === 0){
          arr.splice(i, 1);
          setFilterArr([]);
          const data = {
            ...bookmarkConfig,
            filter: []
          }
          setBookmarkConfig(data)
          updatePageConfig(data)
          setIsFilter(false)
          setFilterPage(1)
          setFilterHasMore(false)
          setFilteredBookmarks([])
          setTotalCount(bookmarkByFilters?.length)
          dispatch(resetFilterPageFilteredBookmark())
          return;
        }

        if(arr.length === 1 && sortArr.length === 1){
          const sortby= sortArr.length>0 ? sortArr[0]?.sortby : ''
          const orderby= sortArr.length>0 ? sortArr[0]?.orderby : ''

          arr.splice(i, 1);
          setFilterArr([]);
          const data = {
            ...bookmarkConfig,
            filter: []
          }
          setFilterPage(1)
          setFilterHasMore(true)
          if(orderby){
            setLoadingState(true)
            const res = await dispatch(getFilterPageFilteredBookmarks('','','',1,type,sortby,orderby))
            if(res.error === undefined){
              setFilteredBookmarks(res?.payload?.data?.finalRes)
              setTotalCount(res?.payload?.data?.totalCount)
            }
            setLoadingState(false);
            setBookmarkConfig(data)
            updatePageConfig(data)
            return;
          }
          
          setIsFilter(false)
          setBookmarkConfig(data)
          updatePageConfig(data)
        }

        arr.splice(i, 1)
        setFilterArr(arr)
        const data = {
            ...bookmarkConfig,
            filter: arr
        }
        setBookmarkConfig(data)
        updatePageConfig(data)
    }

    const handleFilterRemoveAll = async () => {
        if(sortArr.length === 0){
          setFilterArr([])
          setIsFilter(false)
          dispatch(resetFilterPageFilteredBookmark())
          setFilterPage(1)
          setFilterHasMore(false)
          setFilteredBookmarks([])
          setTotalCount(bookmarkByFilters?.length)
          const data = {
              ...bookmarkConfig,
              filter: []
          }
          setBookmarkConfig(data)
          updatePageConfig(data)
          return;
        }

        const sortby= sortArr.length>0 ? sortArr[0]?.sortby : ''
        const orderby= sortArr.length>0 ? sortArr[0]?.orderby : ''

        setFilterArr([])
        const data = {
            ...bookmarkConfig,
            filter: []
        }
        setFilterPage(1);
        setFilterHasMore(true)

        if(orderby){
          setLoadingState(true)
        const res = await dispatch(getFilterPageFilteredBookmarks('','','',1,type,sortby,orderby))
        if(res.error === undefined){
          setFilteredBookmarks(res?.payload?.data?.finalRes)
          setTotalCount(res?.payload?.data?.totalCount)
        }
        
        setLoadingState(false);
        setBookmarkConfig(data)
        updatePageConfig(data)
        return;
      }
        setBookmarkConfig(data)
        updatePageConfig(data)
        setIsFilter(false)
    }

    const changeFilterOrder = async (arr) => {
        const a = [...arr]
        setFilterArr(a)
        const data = {
            ...bookmarkConfig,
            filter: a
        }
        setBookmarkConfig(data)
        updatePageConfig(data)
    }

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
    const handleGemOnClickEvent = async (item) => {
      setGemOnClickEvent(item);

      session.setGemOnClickEventInSession(item);
      const data = {
        preferences: { ...user?.preferences, gemOnClickEvent: item },
      };

      dispatch(updateUser(data));
    };
    const handleHideBrokenLinks = (value) => {
      setHideBrokenLinks(value);

      const payload = {
        hideBrokenLinks: value,
      };

      // dispatch(updateCollection(id, payload));
    };

    const handleCardSize = async (item) => {
        setCardSize(item)

        const data = {
            ...bookmarkConfig,
            cardSize: item,
        }
        setBookmarkConfig(data)
        updatePageConfig(data)
    }

    const handleTableVerticalLine = (checked) => {
        setShowTableVerticalLine(checked)

        const data = {
            ...bookmarkConfig,
            showTableVerticalLine: checked,
        }
        setBookmarkConfig(data)
        updatePageConfig(data)
    }

    const handleTableWrapColumns = (checked) => {
        setTableWrapColumns(checked)

        const data = {
            ...bookmarkConfig,
            tableWrapColumns: checked,
        }
        setBookmarkConfig(data)
        updatePageConfig(data)
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

    const submit = async (data,type='edit') => {
        if(type === 'edit'){
          const result = updateBookmarkState(isFilter ? filteredBookmarks :bookmarkByFilters,data)
          isFilter ? setFilteredBookmarks(result) : setBookmarkByFilters(result)
          if(layout === 'inbox'){
            dispatch(inboxViewUpdates({
              type : 'edit',
              data: data
            }))
          }
        }
        if(type === 'delete'){
          const result = deleteBookmarkState(isFilter ? filteredBookmarks :bookmarkByFilters,data)
          isFilter ? setFilteredBookmarks(result) : setBookmarkByFilters(result)
          if(layout === 'inbox'){
            dispatch(inboxViewUpdates({
              type : 'delete',
              data: data
            }))
          }
        }
    }

    if (!mounted) return <></>;

    return (
      <CommonLayout>
        <div>
          {loadingState ? (
            <div className="spinDiv">
              <Spin size="middle" tip="Loading..." />
            </div>
          ) : (
            <>
              <Topbar
                title={type}
                page="filter"
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
                showAILibraryBtn={type === "Ai Prompt"}
                // allCollectionsValue={allCollectionsValue}
                showShare={false}
                coverImage={false}
                showTextEditor={false}
                setCheckedBookmark={setCheckedBookmark}
                submit={submit}
                showTextExpanderBtn={type === "Text Expander"}
                handleOpenAllSelectedLinks={handleOpenAllSelectedLinks}
                handleGemOnClickEvent={handleGemOnClickEvent}
                gemOnClickEvent={gemOnClickEvent}
                hideBrokenLinks={hideBrokenLinks}
                handleHideBrokenLinks={handleHideBrokenLinks}
              />
              <Views
                layout={layout}
                propertyOrder={propertyOrder}
                propertyHidden={propertyHidden}
                propertyShown={propertyShown}
                items={isFilter ? filteredBookmarks : bookmarkByFilters}
                page="filter"
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
                pageNumber={isFilter ? filterPage : page}
                count={totalCount}
                isFilter={isFilter}
                type={type}
                sortArr={sortArr}
                filterArr={filterArr}
                gemOnClickEvent={gemOnClickEvent}
              />

              {openDrawer && (
                <SingleBookmarkDrawer
                  setOpenDrawer={setOpenDrawer}
                  setGemSingleIdSingleId={setGemSingleIdSingleId}
                  openDrawer={openDrawer}
                  gemSingleId={gemSingleId}
                  submit={submit}
                  page="filter"
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
                  page="filter"
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
        </div>
      </CommonLayout>
    );
}

export default Filters;