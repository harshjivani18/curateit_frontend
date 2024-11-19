"use client"

import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useCallback, useEffect, useRef, useState } from "react"
import { Spin, Modal, message,Button as AntdButton, Avatar, Dropdown } from "antd"
import { FIELD_REQUIRED } from "@utils/messages"
import { useParams, usePathname, useRouter } from "next/navigation"
import session from "@utils/session"
import CurateitLogo from "@components/common/CurateitLogo";
import { Validator } from "@utils/validations"
import Button from "@components/common/Button"
import Input from "@components/collectionCombobox/Input"
import Topbar from "@components/layouts/Topbar/Topbar"
import { TextMessage, defaultPropertyOrder, getBackgroundStyle } from "@utils/constants"
import { getPublicShareTag, getSharedTagsCollectionsGems, getSharedTagsFiltersGems } from "@actions/tags"
import MadeWithCurateit from "@components/common/FloatingLogos/MadeWithCurateit"
import CommentDrawer from "@components/drawers/CommentDrawer"
import Views from "@components/views/Views"
import CoverImageComponent from "@components/common/CoverImageComponent"
import { openAuthModal, publicSidebarSelected, setPublicCollectionView } from "@actions/app"
import AuthModal from "@components/modal/AuthModal"
import { followUser } from "@actions/following"
import slugify from "slugify"
import DownloadExtension from "@components/common/FloatingLogos/DownloadExtension"
import SubTagComponent from "@components/common/SubTagComponent"
import { ShareIcon } from "@heroicons/react/24/outline"
import SocialShare from "@components/socialShare/SocialShare"
import ViewComponent from "@components/layouts/Topbar/ViewComponent"
import CollectionSharedSidebar from "@containers/shareCollections/CollectionSharedSidebar"
import TransactionFailedPopup from "@components/common/FloatingLogos/TransactionFailedPopup"
import BreadCrumbCollection from "@components/common/BreadCrumbCollection"
import CookieConsent from "@components/cookie/CookieConsent"

const TagShared = () => {
    const {id} = useParams()
    const router = useRouter()
    const dispatch = useDispatch()
    const { authModal,publicCollectionView } = useSelector( state => state.app)
    const [bookmarks,setBookmarks] = useState([])
    const [collectionData,setCollectionData] = useState([])
    const [layout,setLayout] = useState(publicCollectionView || 'moodboard')
    const [propertyOrder,setPropertyOrder] = useState([])
    const [isPasswordAdded, setIsPasswordAdded] = useState(false)
    const [isPasswordVerified, setIsPasswordVerified] = useState(true)
    const [loading,setLoading] = useState(false)
    const [collectionIcon, setCollectionIcon] = useState('')
    const [authorName, setAuthorName] = useState('')
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [buttonLoading,setButtonLoading] = useState(false)

    const [loadingState,setLoadingState] = useState(false)
    const [openCommentDrawer, setOpenCommentDrawer] = useState(false);
    const [selectedGem, setSelectedGem] = useState(null);
    const [followers, setFollowers] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [followLoading,setFollowLoading] = useState(false)
    const [isMobile, setIsMobile] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [copyLoading, setCopyLoading] = useState(false);
    const [wallpaper, setWallpaper] = useState(null)
    const [collectionCoverImage, setCollectionCoverImage] = useState(null)
    const [imagePosition, setImagePosition] = useState(null);
    const [descriptionContent, setDescriptionContent] = useState('{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}')

    const observerRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    const [isExtensionExist, setIsExtensionExists] = useState(false)
    const [viewSubTags, setViewSubTags] = useState(false)
    const [showSocialIcons, setShowSocialIcons] = useState(true)

    const searchParams = useParams();
    const searchPathname = usePathname();
    const uname = searchParams?.username;
    const module = searchPathname?.includes("/g/") ? "gems" : searchPathname?.includes("/tags/") ? "tags" : searchPathname?.includes("/c/") ? "collections" : null;
    const sourceId = searchParams?.gemId || searchParams?.colllectionId || searchParams?.tagId || searchParams?.id;
    const slug = searchParams?.name;

    // const searchParams = window.location.pathname.split("/");
    // const uname = searchParams[2];
    // const module = searchParams[3] === "tags" ? "tags" : searchParams[3] === "c" ? "collections" : null;
    // const tagId = searchParams[4];
    // const slug = searchParams[5];
    const [showCopyCollectionIcon, setShowCopyCollectionIcon] = useState("")
    const [allowUserSubmission, setAllowUserSubmission] = useState(true)
    const [openShare, setShowShare] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [shareSubFolder, setShareSubFolder] = useState(false);
    const [filteredBookmarks, setFilteredBookmarks] = useState([]);
    const [isFilter, setIsFilter] = useState(false);
    const [filterPage, setFilterPage] = useState(1);
    const [filterSelected, setFilterSelected] = useState(null);
    const [filterLoading, setFilterLoading] = useState(false);

    const observerFilterRef = useRef(null);
    const [filterHasMore, setFilterHasMore] = useState(false);
    const [parentTag, setParentTag] = useState([]);

    useEffect(() => {
        setMounted(true);
        function onDOMLoaded() {
            const element = document.getElementById("curateit-extension-installed")
            setIsExtensionExists(element !== null)
        }
        onDOMLoaded()
    }, []);

    const formatedNumber = (number) =>
    Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(number);

const setObserverRef = useCallback(node => {
      if (node) {
        observerRef.current = node;
        const options = {
          root: null,
          rootMargin: "0px",
          threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore && !loading) {
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
    }, [hasMore,loading]);

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
        if (typeof window === 'undefined') return;
        function handleResize() {
            if (window.innerWidth <= 768) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const getCall = async () => {
            if (page === 1) {
                setLoadingState(true)
            } else {
                setLoadingState(false)
            }
            setLoading(true)
            const res = await dispatch(getPublicShareTag(id,page))
            
            setLoading(false)
            const uniquenData = [...bookmarks, ...res?.payload?.data?.data[0]?.bookmarks || []].filter((value, index, self) => 
              index === self.findIndex((v) => (
                  v.id === value.id
              ))
          );
            setBookmarks(uniquenData || []);
                if (res?.payload?.data?.totalCount <= bookmarks.length + res?.payload?.data?.data[0]?.bookmarks?.length) {
                    setHasMore(false);
                }
            if(page === 1){
                setCollectionData(res?.payload?.data?.data || [])
                setCollectionIcon(res?.payload?.data?.data[0]?.avatar || '')
                setAuthorName(res?.payload?.data?.data[0]?.author?.username || '')
                setFollowers(res?.payload?.data?.data[0]?.author?.follower || [])
                setProfilePhoto(res?.payload?.data?.data[0]?.author?.profilePhoto || '')
                setWallpaper(res?.payload?.data?.data[0]?.wallpaper || '')
                setCollectionCoverImage(res?.payload?.data?.data[0]?.background || '')
                setImagePosition(res?.payload?.data?.data[0]?.background && (res?.payload?.data?.data[0]?.background?.type === 'upload' || res?.payload?.data?.data[0]?.background?.type === 'unsplash') ? res?.payload?.data?.data[0]?.background?.imagePosition : null)
                setDescriptionContent(res?.payload?.data?.data[0]?.description ? res?.payload?.data?.data[0]?.description :
                 '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}')
                setIsPasswordAdded(res?.payload?.data?.data[0]?.tagPassword ? true : false)
                setViewSubTags(res?.payload?.data?.data[0]?.showSubTag === true ? true : false)
                setShowSocialIcons(res?.payload?.data?.data[0]?.showSocialIcon === true ? true : false);
                setShareSubFolder(res?.payload?.data?.data[0]?.showSidebar ? true : false);
                setShowCopyCollectionIcon(res?.payload?.data?.data[0]?.allowCopy ? true : false);
                setAllowUserSubmission(res?.payload?.data?.data[0]?.allowUserSubmission ? true : false);
                setLayout(res?.payload?.data?.data[0]?.currentPublicLayout  || "moodboard");
                setParentTag(res?.payload?.data?.parentTag || [])
                if (session.isTagPublicPasswordValidate) {
                    setIsPasswordVerified(true)
                    session.removeIsTagPublicPasswordValidate()
                }
                else {
                    setIsPasswordVerified(res?.payload?.data?.data[0]?.tagPassword ? false : true)
                }
            }
            setLoadingState(false)
        }

        if(hasMore && !loading && !isFilter){
            getCall()
        }
    },[id,dispatch,page])
    //filter apis
  useEffect(() => {
    // if(filterPage === 1 || filterPage === 3) return;
    if(!filterSelected) return;

    if(filterSelected && filterSelected?.type === 'filter'){
      const getCall = async () => {
        setLoading(true)
        const res = await dispatch(getSharedTagsFiltersGems(id,filterSelected?.value,filterPage))
        setFilteredBookmarks((prevData) => [...prevData, ...res?.payload?.data?.data || []]);
        if (res?.payload?.data?.totalCount <= filteredBookmarks.length + res?.payload?.data?.data?.length) {
          setFilterHasMore(false);
        }
        setLoading(false)
      }

      if(isFilter && filterHasMore){
        getCall()
      }
      return;
    }

    if(filterSelected && filterSelected?.type === 'collection'){
      const getCall = async () => {
        setLoading(true)
        const res = await dispatch(getSharedTagsCollectionsGems(id,filterSelected?.value,filterPage))
        setFilteredBookmarks((prevData) => [...prevData, ...res?.payload?.data?.data?.gems || []]);
        if (res?.payload?.data?.totalCount <= filteredBookmarks.length + res?.payload?.data?.data?.gems?.length) {
        setFilterHasMore(false);
      }
        setLoading(false)
      }

      if(isFilter && filterHasMore){
        getCall()
      }
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch,filterPage,filterSelected,id,isFilter,filterHasMore])

  useEffect(() => {
    if (layout === "card") {
      const data = defaultPropertyOrder?.card?.propertyOrder;
      setPropertyOrder([...data]);
    }
    if (layout === "list") {
      const data = defaultPropertyOrder?.list?.propertyOrder;
      setPropertyOrder([...data]);
    }
    if (layout === "table") {
      const data = defaultPropertyOrder?.table?.propertyOrder;
      setPropertyOrder([...data]);
    }
    if (layout === "moodboard") {
      const data = defaultPropertyOrder?.moodboard?.propertyOrder;
      setPropertyOrder([...data]);
    }
    if (layout === "stream") {
      const data = defaultPropertyOrder?.stream?.propertyOrder;
      setPropertyOrder([...data]);
    }
    if (layout === "inbox") {
      const data = defaultPropertyOrder?.inbox?.propertyOrder;
      setPropertyOrder(data);
    }
  },[layout])

    //filter apis
  useEffect(() => {
    // if(filterPage === 1 || filterPage === 3) return;
    if(!filterSelected) return;

    if(filterSelected && filterSelected?.type === 'filter'){
      const getCall = async () => {
        setLoading(true)
        const res = await dispatch(getSharedTagsFiltersGems(id,filterSelected?.value,filterPage))
        setFilteredBookmarks((prevData) => [...prevData, ...res?.payload?.data?.data || []]);
        if (res?.payload?.data?.totalCount <= filteredBookmarks.length + res?.payload?.data?.data?.length) {
          setFilterHasMore(false);
        }
        setLoading(false)
      }

      if(isFilter && filterHasMore){
        getCall()
      }
      return;
    }

    if(filterSelected && filterSelected?.type === 'collection'){
      const getCall = async () => {
        setLoading(true)
        const res = await dispatch(getSharedTagsCollectionsGems(id,filterSelected?.value,filterPage))
        setFilteredBookmarks((prevData) => [...prevData, ...res?.payload?.data?.data?.gems || []]);
        if (res?.payload?.data?.totalCount <= filteredBookmarks.length + res?.payload?.data?.data?.gems?.length) {
        setFilterHasMore(false);
      }
        setLoading(false)
      }

      if(isFilter && filterHasMore){
        getCall()
      }
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch,filterPage,filterSelected,id,isFilter,filterHasMore])

    const handleLayout= (item) => {
        setLayout(item)
        dispatch(setPublicCollectionView(item))
    }

    const showComment = (id) => {
    setOpenCommentDrawer(true);
    setSelectedGem(id);
  };

  const handleCopyCollection = async () => {
    if(session && session?.userId){
        setCopyLoading(true)
        const res = await dispatch(copyCollection(collectionData[0]?.id))
        setCopyLoading(false)
        if(res?.payload?.data?.status === 200){
            // setCopyLoading(false)
            message.success(TextMessage.COLLECTION_COPY_TEXT)
            dispatch(fetchCollectionWiseCounts())
        }
        // else{
        //     message.error(TextMessage.COLLECTION_COPY_EXISTS_TEXT)
        // }
    }else{
        dispatch(openAuthModal({
            open: true,
            action : 'login',
            extraInfo: {
                trigger: 'copy',
                username: uname,
                id: sourceId,
                module: module,
                slug: slug
              }
        }))
    }
  }

  const handleFollowAction = (type) => {
    const currentId = Number(session?.userId);
    if (type === "follow") {
      if (!followers.includes(currentId)) {
        const newArr = [...followers];
        newArr.push(currentId);
        setFollowers(newArr);
      }
    }
  };

  const handleFollow = () => {
    if(session && session?.userId){
        setFollowLoading(true);
        const data = {
        hierarchyLevel: "user",
        followerUserId: collectionData[0]?.author?.id,
        };
        dispatch(followUser(data)).then((res) => {
        if (res?.payload?.status === 200) {
            handleFollowAction("follow");
            setFollowLoading(false);
        }else{
            setFollowLoading(false);
        }
        });
    }else{
        dispatch(openAuthModal({
            open: true,
            action : 'login',
            extraInfo: {
                trigger: 'userfollow',
                username: uname,
                id: sourceId,
                module: module,
                slug: slug
            }
        }))
    }
  }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError(Validator.validate("title", e.target.value, null, null, true));
    };

    const handleSubmit = async() => {
        if(!password){
            setPasswordError(FIELD_REQUIRED)
            return;
        }
        setLoadingState(true)
        setButtonLoading(true)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tag/${id}/check-password`, { password })
        setLoadingState(false)
        setButtonLoading(false)
        setPassword('')
        if (res.error === undefined && res.data?.status === 200) {
            setIsPasswordVerified(true)
            message.success("Password verified successfully")
        }
        else {
            setIsPasswordVerified(false)
            message.error("Password is incorrect")
        }
    }

    const renderPasswordPopup = () => {
        return (
            <Modal
            open={true}
            closable={false}
            footer={null}
            >
            <CurateitLogo />

            <main className='px-16 mt-[14px]'>
                <div className="border-b border-cyan-100">
                <nav className="-mb-px flex space-x-1 justify-around" aria-label="Tabs">
                    <span className="border-blue-500 text-blue-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm w-[48%] text-center">Enter password to access</span>
                </nav>
                </div>
                <>
                <div className='py-4 flex justify-center'>
                    <div>
                        <Input value={password} onChange={(val) => handlePasswordChange(val)} type="password" name="password" placeholder="Password" />
                    <span className="error-label block">{passwordError}</span>
                    </div>
                </div>
                <div className='mt-4 login-btn-container' >
                    <Button className="login-btn" onClick={handleSubmit} disabled={buttonLoading} variant="primary w-full">{buttonLoading ? `Loading...` : "Submit"}</Button>
                </div>
            </>
            </main>

        </Modal>
        )
    }

    const handleOpen = (flag) => {
    setShowShare(flag);
  };

  const dropdownnRenderUI = () => {
    return (
      <div className="bg-white z-50 p-3 rounded-lg shadow-lg border-[0.5px]">
        <SocialShare
          collectionUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/u/${authorName}/tags/${collectionData[0]?.id}/${collectionData?.[0]?.slug || slugify((collectionData && collectionData[0]?.tag) || 'default', { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`}
          setShowShare={setShowShare}
        />
      </div>
    );
  };


  //filter select
  const handleSelectFilterGem = async (type) => {
    setFilterLoading(true)
    setFilteredBookmarks([])
    setIsFilter(true)
    setFilterPage(1)
    setFilterSelected({
      type: 'filter',
      value: type
    })
    setFilterHasMore(true);
    setFilterLoading(false)
  }

  //tag select
  const handleSelectCollectionGem = async (collectionId) => {
    dispatch(publicSidebarSelected('collection'))
    setFilterLoading(true)
    setFilteredBookmarks([])
    setIsFilter(true)
    setFilterPage(1)
    setFilterSelected({
      type: 'collection',
      value: collectionId
    })
    setFilterHasMore(true);
    setFilterLoading(false)
  }

  const handleResetFilters = () => {
    setIsFilter(false)
    setFilteredBookmarks([])
    setFilterSelected(null)
    setFilterPage(1)
    setFilterHasMore(false)
    dispatch(publicSidebarSelected('all'))
    if(isMobile){
      dispatch(setIsMobileSidebar(false))
    }
  }

    const renderPage = () => {
        return (
        <>
            <div className={`fixed top-0 bg-[#fcfcfd] z-[100] flex w-full items-center justify-between ${isMobile ? 'p-2' : 'pt-4 px-8 pb-1'}`}>

                {!isMobile && <div className="w-full">
                    <img 
                    className={`object-scale-down h-[30px] cursor-pointer`}
                    src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo.png`}
                    alt="curateit" 
                    onClick={() => {
                        if(session && session?.userId){
                            router.push(`/u/${session?.username}/all-bookmarks`)
                        }else{
                            router.push(`/`)
                        }
                    }}
                    />
                    
                </div>}

                {/* user details */}
                <div className={`flex items-center w-full group ${isMobile ? '' : 'justify-center'}`}>
                    {
                    profilePhoto ? <Avatar
                        src={profilePhoto}
                        size={40}
                        onClick={() => {
                            router.push(`/u/${authorName}`)
                        }}
                        className="cursor-pointer"
                        /> : 
                    
                    <Avatar size={40} style={{
                        color: 'white',
                        backgroundColor: '#347ae2',
                    }}
                    onClick={() => {
                        router.push(`/u/${authorName}`)
                    }}
                    className="cursor-pointer"
                    >
                        {authorName && authorName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    }
                    {/* ${isMobile ? 'mx-2' : 'ml-2 mr-8'} */}
                    <div className={`flex flex-col items-center justify-center mx-2 cursor-pointer`}>
                        <span className="text-[#101828] font-medium text-base capitalize group-hover:underline group-hover:text-[#347AE2]" 
                        onClick={() => {
                        router.push(`/u/${authorName}`)
                        }}>{isMobile ? (collectionData[0]?.author?.firstname || authorName) : authorName}</span>

                        {
                        ((session?.userId?.toString() === collectionData[0]?.author?.id?.toString()) || 
                        followers?.some(element => element.id === Number(session?.userId)))  ?
                        <></> :
                        <AntdButton
                            type="text"
                            className="text-[#347AE2] relative hover:text-[#347AE2]"
                            onClick={handleFollow}
                        >
                            Follow
                            {followLoading && (
                            <div className="w-full h-full absolute left-0 top-0 rounded-md flex justify-center items-center">
                                <Spin size="small" />
                            </div>
                            )}
                        </AntdButton>
                    }
                    </div>
                </div>

                {/* login */}
                {
                ((session && session?.userId) && !isMobile) ? <div className={`flex items-center w-full justify-end`}>
                    <AntdButton type="primary" className={`border-[#105FD3] bg-[#105FD3] hover:bg-[#105FD3] hover:border-[#105FD3] rounded mr-1`} 
                    onClick={() => router.push(`/u/${session?.username}/all-bookmarks`)}>
                        {isMobile ? 'Create' : 'Create Your Own'}
                    </AntdButton>
                </div> : 
                <>
                { 
                isMobile ?
                    <></>
                :
                <div className={`flex items-center w-full justify-end`}>
                    <AntdButton type="text" className={`text-[#105FD3] hover:text-[#105FD3]`} 
                        // onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/sign-up`)}
                        onClick={() => dispatch(openAuthModal({
                            open: true,
                            action : 'signup',
                            extraInfo: {
                                trigger: 'createyourown',
                                username: uname,
                                id: sourceId,
                                module: module,
                                slug: slug
                            }
                        }))}
                    >
                        Create Your Own
                    </AntdButton>

                    <AntdButton className="mx-2 rounded border-[#105FD3] text-[#105FD3] hover:border-[#105FD3] hover:text-[#105FD3]" onClick={() => {
                        dispatch(openAuthModal({
                        open: true,
                        action : 'login',
                        extraInfo: {
                            trigger: 'signup',
                            username: uname,
                            id: sourceId,
                            module: module,
                            slug: slug
                          }
                    }))
                    }
                    }>Login</AntdButton>
                    <AntdButton type="primary" className={`border-[#105FD3] bg-[#105FD3] hover:bg-[#105FD3] hover:border-[#105FD3] rounded`} onClick={() => {
                        dispatch(openAuthModal({
                        open: true,
                        action : 'signup',
                        extraInfo: {
                            trigger: 'signup',
                            username: uname,
                            id: sourceId,
                            module: module,
                            slug: slug
                        }
                    }))
                    }
                    }>Sign up</AntdButton>
                </div>
                }
                </>
                }

                {
                ((session && session?.userId?.toString()) !== (collectionData && collectionData[0]?.author?.id?.toString())) && allowUserSubmission && isMobile &&
                    <AntdButton type="primary" className={`border-[#105FD3] bg-[#105FD3] hover:bg-[#105FD3] hover:border-[#105FD3] rounded mr-1`} 
                //   onClick={handleOpenAdd}
                >
                    + Submit
                </AntdButton>
                }

                {
                isMobile &&
                <div className="mx-2">
                <ViewComponent
                    page='collection-public-shared'
                    layout={layout}
                    handleLayout={handleLayout}
                    permissions={null}
                    type='collection-public'
                    isMobile={true}
                />
                </div>
                }

                {isMobile && <Dropdown
                            overlayStyle={{ width: "250px" }}
                            trigger={["click"]}
                            dropdownRender={() => dropdownnRenderUI()}
                            onOpenChange={handleOpen}
                            open={openShare}
                            >
                                <AntdButton className="rounded-md" type="default">
                                <ShareIcon className="h-5 w-5 text-[#105FD3]" />
                            </AntdButton>
                </Dropdown>}
            </div>

            <hr className={`fixed w-full z-[100] h-[1px] border-[#E4E7EC] 
                ${(!isMobile && (session && session?.userId?.toString()) !== (collectionData && collectionData[0]?.author?.id?.toString())) ? 'top-[76px]' : (!isMobile && (session && session?.userId?.toString()) === (collectionData && collectionData[0]?.author?.id?.toString())) ? 'top-[60px]' : (isMobile && (session && session?.userId?.toString()) !== (collectionData && collectionData[0]?.author?.id?.toString())) ? 'top-[72px]' : (isMobile && (session && session?.userId?.toString()) === (collectionData && collectionData[0]?.author?.id?.toString())) ? 'top-[56px]' : ''}
                `}
            />

            <div className={`${(!isMobile && shareSubFolder && !collapsed && (session && session?.userId?.toString()) !== (collectionData && collectionData[0]?.author?.id?.toString())) ? 'ml-[250px] px-8 pb-4 pt-[76px] ct-pr-0' : (!isMobile && shareSubFolder && !collapsed && (session && session?.userId?.toString()) === (collectionData && collectionData[0]?.author?.id?.toString())) ? 'pt-[60px] px-8 pb-4 ml-[250px]' : (!isMobile && shareSubFolder && collapsed && (session && session?.userId?.toString()) !== (collectionData && collectionData[0]?.author?.id?.toString())) ? 'pt-[76px] px-8 pb-4' : (!isMobile && shareSubFolder && collapsed && (session && session?.userId?.toString()) === (collectionData && collectionData[0]?.author?.id?.toString())) ? 'pt-[60px] px-8 pb-4' : (isMobile && (session && session?.userId?.toString()) !== (collectionData && collectionData[0]?.author?.id?.toString())) ? 'p-2 pt-[72px]' : (isMobile && (session && session?.userId?.toString()) === (collectionData && collectionData[0]?.author?.id?.toString())) ? 'p-2 pt-[56px]' : (!isMobile && !shareSubFolder && (session && session?.userId?.toString()) !== (collectionData && collectionData[0]?.author?.id?.toString())) ? 'p-2 pt-[76px]' : ''} ${bookmarks?.length < 5 ? 'h-full' : ''}`}>

                {
                shareSubFolder &&
                <CollectionSharedSidebar
                authorName={authorName}
                isMobile={isMobile}
                tagId={id}
                handleSelectFilterGem={handleSelectFilterGem}
                handleSelectCollectionGem={handleSelectCollectionGem}
                handleResetFilters={handleResetFilters}
                collapsed={collapsed} setCollapsed={setCollapsed}
                isOwnUser={(session && session?.userId?.toString()) === (collectionData && collectionData[0]?.author?.id?.toString()) ? true : false}
                fromPage='tag'
                />
                }

                <div className="my-1">
                  <BreadCrumbCollection fromPage='collection-public-shared' parentData={'tag-public'} type={'collection-public'} title={(collectionData && collectionData[0]?.tag) || ''}/>
                </div>

                {collectionCoverImage && <CoverImageComponent
                coverImage={collectionCoverImage}
                imagePosition={imagePosition}
                />}

                <div className={`${!isMobile && collapsed ? 'px-4' : ''}`}>
                    <Topbar
                        title={(collectionData && collectionData[0]?.tag) || ''}
                        page='collection-public-shared'
                        layout={layout}
                        handleLayout={handleLayout}
                        icon={collectionIcon || ''}
                        permissions={null}
                        checkedBookmark={[]}
                        collectionUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/u/${authorName}/tags/${collectionData[0]?.id}/${collectionData?.[0]?.slug || slugify((collectionData && collectionData[0]?.tag) || 'default', { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`}
                        // handleCopyCollection={handleCopyCollection}
                        copyLoading={copyLoading}
                        descriptionContent={descriptionContent}
                        type='tag-public'
                        showCopyCollectionIcon={showCopyCollectionIcon}
                        // parentData={parentTag}
                    />
                </div>

                {
                filterLoading ? <div className="spinDiv">
                    <Spin size='middle' tip='Loading...'/>
                </div>
                :
                <div 
                className="h-full rounded-md mt-1 pt-2"
                style={{ 
              background: getBackgroundStyle(wallpaper, layout),
              }}>
                {
                viewSubTags && 
                    <div>
                        <SubTagComponent tagId={id} fromPage='collection-public-shared' wallpaper={wallpaper}/>
                    </div>
                }

                <div 
                    className="w-full py-2 px-3 mt-4 xl:px-8"
                    >
                    <Views
                        layout={layout}
                        propertyOrder={propertyOrder}
                        propertyHidden={[]}
                        propertyShown={[]}
                        items={isFilter ? filteredBookmarks : bookmarks}
                        page="collection-public-shared"
                        checkedBookmark={[]}
                        showComment={showComment}
                        showEdit={false}
                        isSharedAndAllowEdit={false}
                        sortArr={[]}
                        filterArr={[]}
                        showSocialIcons={showSocialIcons}
                        viewSubCollections={viewSubTags}
                    />
                </div>

                </div>
                }

                {layout !== "inbox" && loading && (
                <div className="spinDiv">
                    <Spin tip="Loading..." />
                </div>
                )}
                
                {layout !== "inbox" && (
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
            </div>

            <CommentDrawer
                openDrawer={openCommentDrawer}
                hideCommentDrawer={(val) => setOpenCommentDrawer(val)}
                selectedGem={selectedGem}
                user={{ id: session?.userId, username: session?.username }}
              />

            {authModal?.open && <AuthModal
            openModal={authModal?.open}
            page={'collection-public'}
            />}

            {!isExtensionExist && !isMobile && <div className="fixed z-50 right-4 ct-bottom-4">
                <DownloadExtension />    
            </div>}
            <TransactionFailedPopup />
            <div className="fixed z-50 right-4 bottom-4">
                <MadeWithCurateit/>
            </div>
            <CookieConsent />
        </>
        )
    }

    if (!mounted) return <></>;

    return(
        <>
        {
            loadingState ?
                <div className="h-screen w-full flex items-center justify-center">
                    <Spin tip={'Loading...'} size="large"/>
                </div>
            : isPasswordAdded && !isPasswordVerified 
                ? renderPasswordPopup()
                : renderPage()
        
        }
        </>
    )
}

export default TagShared;