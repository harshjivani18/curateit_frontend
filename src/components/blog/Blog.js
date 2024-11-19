import "./Blog.css"
import { 
    Avatar, 
    Collapse, 
    Dropdown, 
    Spin, 
    Tooltip, 
    message, 
    Button, 
    Drawer, 
    Input,
    // Switch
}                                               from "antd";
import React, { 
    useCallback, 
    useEffect, 
    useRef, 
    useState }                                  from "react";
import { useDispatch, useSelector }             from "react-redux";
import StickyBox                                from "react-sticky-box";
import moment                                   from "moment";
import { useParams, usePathname, useRouter }                            from "next/navigation";
import { AiOutlineHeart }                       from "react-icons/ai";
import { 
    // FaGlobeAmericas, 
    FaRegCommentDots }                          from "react-icons/fa";
import { PiShareFat }                           from "react-icons/pi";
// import { IoMdShare }                        from "react-icons/io";
import { IoAnalytics, IoCopyOutline, 
        //  IoLogoTiktok, 
         IoTextOutline }                        from "react-icons/io5";
import { BsBookmarkPlus, 
         BsPlayCircle }                         from "react-icons/bs";
import { MdOutlineFileDownload }                from "react-icons/md";
import { HiColorSwatch }                        from "react-icons/hi";
import { HiPencilSquare }                       from "react-icons/hi2";
import { TbWorldSearch }                        from "react-icons/tb";
import { FiEdit3 }                              from "react-icons/fi";
import { ChevronLeftIcon, 
         EllipsisHorizontalIcon, 
         FolderIcon, 
         FolderPlusIcon, 
         ForwardIcon, 
         GlobeAltIcon, 
         InformationCircleIcon, 
         LinkIcon, 
         MagnifyingGlassIcon, 
         XMarkIcon}                             from "@heroicons/react/24/outline";

import { formatTime }                           from "src/lib/format";

import SocialShare                              from "@components/socialShare/SocialShare";
import CurateitLogo                             from "@components/common/CurateitLogo";
import UserBox                                  from "@components/common/UserBox";
import MoodboardView                            from "@components/views/MoodboardView";
import CommentDrawer                            from "@components/drawers/CommentDrawer";
import FontBox                                  from "@components/common/FontBox";
import ReportBugsModal                          from "@components/report-bugs-modal/ReportBugsModal";
import SettingsMenu                             from "@components/common/settingsMenu";
import SEOModal                                 from "@components/modal/SEOModal";
import SingleBookmarkDrawer                     from "@components/drawers/SingleBookmarkDrawer";
import AuthModal                                from "@components/modal/AuthModal";
import DownloadExtension                        from "@components/common/FloatingLogos/DownloadExtension";
// import AllHighlights                            from "@components/allHighlights/AllHighlights";
import InfoContainer                            from "@components/GemProfile/InfoContainer";
import CodeHighlight                            from "@components/allHighlights/CodeHighlight";
import TextHighlight                            from "@components/allHighlights/TextHighlight";
import ImageHighlight                           from "@components/allHighlights/ImageHighlight";

import Dashboard                                from "@containers/dashboard/Dashboard";

import { speedRead }                            from "@utils/speed-reader";
import session                                  from "@utils/session";
import { COLOR_PALLETE, 
         HIGHLIGHTED_COLORS, 
         TextMessage, 
         copyText }                             from "@utils/constants";
import { 
        literata, 
        piazzolla, 
        sourceSerif, 
        atkinson, 
        inter, 
        ibmPlex, 
        publicSans, 
        sourceSans, 
        rubik }                                 from "@utils/fonts";
import { loadHighlighter }                      from "@utils/load-quill";

import { getOtherUserDetails }                  from "@actions/user";
import { followUser, unfollowUser }             from "@actions/following";
import { addHighlight, 
         fetchTextToSpeech, 
         fetchUrlHighlights, 
         updateBlog, 
         updateGemSeoDetails, 
         updateUsageCount }                     from "@actions/gems";
import { 
    addCollections,
    addGemToSharedCollection,
    checkIsPublicGem, 
    fetchCollectionWiseCounts, 
    getRandomBookmarkGem, 
    getSharedCollections, 
    getSingleBookmarkGem, 
    likeBookmarkGem, 
    removeGemFromCollection, 
    updateBookmarkWithExistingCollection}       from "@actions/collection";
import { addGem, deleteBookmark, 
         getPageConfig, 
         saveOtherGemInCollection}              from "@actions/bookmark";
import { openAuthModal }                        from "@actions/app";
import { checkCollectionExists, 
         getAllLevelCollectionPermissions, 
         getBookmarkPermissions }               from "@utils/find-collection-id";
import { removeGemFromTag }                     from "@actions/tags";
import ExceedLimitModal from "@components/modal/ExceedLimitModal";
// import { RiFacebookCircleFill, RiGithubFill, RiInstagramLine, RiLinkedinBoxFill, RiMediumFill, RiProductHuntFill, RiTwitterXFill, RiYoutubeFill } from "react-icons/ri";
// import { SiSubstack } from "react-icons/si";
// import { on } from "events";
import TransactionFailedPopup from "@components/common/FloatingLogos/TransactionFailedPopup";
import CookieConsent from "@components/cookie/CookieConsent";
import BlogAuthor from "./BlogAuthor";
import BlogProgressBar from "./BlogProgressBar";

const { Panel } = Collapse
const TEXT_BASED_MEDIA_TYPES = [
    "Ai Prompt",
    "Note",
    "Quote",
    "Text Expander",
]

const Blog = (props) => {
    const FONT_CLASSES  = {
        '"Literata VF", Georgia, serif': literata.style.fontFamily,
        '"Piazzolla VF", serif': piazzolla.style.fontFamily,
        '"Source Serif VF", serif': sourceSerif.style.fontFamily,
        '"Atkinson Hyperlegible", sans-serif': atkinson.style.fontFamily,
        '"Inter VF", sans-serif': inter.style.fontFamily,
        '"IBM Plex Sans VF", sans-serif': ibmPlex.style.fontFamily,
        '"Public Sans VF", Helvetica, sans-serif': publicSans.style.fontFamily,
        '"Source Sans VF", sans-serif': sourceSans.style.fontFamily,
        '"Rubik", sans-serif': rubik.style.fontFamily
    }

    let width                           = 0;
    const navigate                      = useRouter()
    const dispatch                      = useDispatch()
    const { authModal, 
            showExceedModal }           = useSelector((state) => state.app)
    const allHighlights                 = useSelector(state => state.gems.highlights);
    const { collectionsAndItsCount, 
            sharedCollections }         = useSelector((state) => state.collections)
    // const user                          = useSelector((state) => state?.users?.userData);
    const { blog, extraDetails,
            gemPublicView,
            isInboxView,
            permissions,
            gemId,
            showBackBtn=true 
          }                             = props
    

    const audioRef                      = useRef();
    const progressRef                   = useRef();
    const articleDiv                    = useRef(null)
    const intervalTime                  = useRef(null);
    const articleContent                = useRef(null)
    let observer                        = null
    
    const [seoDetail, setSeoDetail]     = useState(blog?.seo || null);
    const [showReportBug,
           setShowReportBug]            = useState(false)
    const [activeSection, 
           setActiveSection]            = useState(null)
    const [readingFontSize, 
        setReadingFontSize]             = useState(19)
    const [readingLineHeight, 
            setReadingLineHeight]       = useState(1.8)
    const [lineWidth,
            setLineWidth]               = useState(4)
    const [font, setFont]               = useState('"Source Serif VF", serif')
    const [showShare, setShowShare]     = useState(false);
    const [showText, setShowText]       = useState(false)
    const [audioPlaying, 
           setAudioPlying]              = useState(false);
    const [isMobile, setIsMobile]       = useState(false)
    // const [htmlText, setHtmlText]       = useState(extraDetails?.content)
    const [headers, setHeaders]         = useState([])
    const [audioTime, setAudioTime]     = useState("0");
    const [audioCurrentTime, 
           setAudioCurrentTime]         = useState("00:00");
    const [audioProgress, 
           setAudioProgress]            = useState(0);
    const [audioSpeed, setAudioSpeed]   = useState(1);
    const [audioUrl, setAudioUrl]       = useState("");
    const [fetchingAudio, 
           setFetchingAudio]            = useState(false);
    const [showAudioPlayer, 
           setShowAudioPlayer]          = useState(false);
    const [loadingSEO,
           setLoadingSEO]               = useState(false)
    const [authorPhoto, 
           setAuthorPhoto]              = useState(null)

    const [following, 
           setFollowing]                = useState(false);
    const [userFollowers, 
           setUserFollowers]            = useState(null);
    const [followLoading, 
           setfollowLoading]            = useState(false);

    const [randombookmark, 
           setRandomBookmark]           = useState([]);
    const [allRandomBookmarks, 
           setAllRandomBookmarks]       = useState([]);
    const [propertyOrder, 
           setPropertyOrder]            = useState([]);
    const [showLoadMoreRandom, 
           setShowLoadMoreRandom]       = useState(false);

    const [showComment, 
           setShowComment]              = useState(false)
    const [commentCount, 
           setCommentCount]             = useState(blog?.comments_count || 0)

    const [likeCount, setLikeCount]     = useState(blog?.likes_count || 0)
    const [showCopied, setShowCopied]   = useState(false)
    const [showColors, setShowColors]   = useState(false)
    const [currentBg, setCurrentBg]     = useState("#FFFFFF")
    // const [isFull, setIsFull]           = useState(false)
    const [activeTheme, setActiveTheme] = useState("light")
    const [isPublicGem, setIsPublicGem] = useState(false)
    const [showEditGem, setShowEditGem] = useState(false)
    const [showEditSEO, setEditSEO]     = useState(false)  
    const [altInfo, setAltInfo]         = useState(blog?.altInfo || blog?.title || blog?.description || "")
    const [isExtensionExist, 
            setIsExtensionExists]       = useState(false)

    const [highlightStyle,
           setHighlighterStyle]         = useState({ display: "none" })
    const [highlightText,
           setHighlightText]            = useState("")
    const [boxDetails,
           setBoxDetails]               = useState({})
    const [highlighter, setHighlighter] = useState(null)
    const [isFetchedHighlights, 
           setIsFetchedHighlights]      = useState(false)
        
    const [showAddBk, setShowAddBk]     = useState(false);
    const [existingCollectionSaved, 
           setExistingCollectionSaved]  = useState([]);
    const [collectionSearch,
           setCollectionSearch]         = useState('')
    const [loading, setLoading]         = useState(false);
    const [allCollections,
           setAllCollections]           = useState([])
    const [showInformation,
           setShowInformation]          = useState(false)
    const [showAnalytics,
           setShowAnalytics]            = useState(false)
    const [showHighlights,
           setShowHighlights]           = useState(false)
    const [scrollPos,
           setScrollPos]                = useState(0)
    // const [authorChecked,
    //        setAuthorChecked]            = useState(blog?.media?.showAuthor || false)
    const [userCopyText,
           setUserCopyText]             = useState("Copy article text")
    
    const readTime                      = blog?.media?.readTime || Math.ceil((extraDetails?.textContent?.split(" ")?.length || 0) / 200)
    const totalWords                    = extraDetails?.textContent?.split(" ")?.length || 0
    
    const searchParams = useParams();
    const searchPathname = usePathname();
    const uname = searchParams?.username;
    const module = searchPathname?.includes("/g/") ? "gems" : searchPathname?.includes("/tags/") ? "tags" : searchPathname?.includes("/c/") ? "collections" : null;
    const sourceId = searchParams?.gemId || searchParams?.colllectionId || searchParams?.tagId || searchParams?.id;
    const slug = searchParams?.name;

    // const searchParams = window.location.pathname.split("/");
    // const uname = searchParams[2];
    // const module = searchParams[3] === "tags" ? "tags" : searchParams[3] === "c" ? "collections" : searchParams[3] === "g" ? "gems" : null;
    // const idOfGem = searchParams[4];
    // const slug = searchParams[5];

    useEffect(() => {
        if (extraDetails?.content) {
            const htmlElements = new DOMParser().parseFromString(extraDetails?.content, "text/html")
            const authorPhoto  = htmlElements?.querySelector("img[data-testid='authorPhoto']")?.src || null
            if (authorPhoto) setAuthorPhoto(authorPhoto)
            htmlElements.querySelector("img[data-testid='authorPhoto']")?.remove()
            const h1Elmes   = Array.from(htmlElements.querySelectorAll("h2, h3"))
            h1Elmes.forEach((el, idx) => {
                el.id = `ct-h1-${idx}`
            })
            const headerArr = [ ...h1Elmes ]
            setHeaders(headerArr)
            const blogHtmlElem = document.getElementById("ct-blog-html")
            if (blogHtmlElem) {
                blogHtmlElem.innerHTML += htmlElements.body.innerHTML
            }
            // setHtmlText(new DOMParser().parseFromString(htmlElements.body.innerHTML, "text/html")?.body)
        }
    }, [extraDetails])

    useEffect(() => {
        if (blog?.author?.data?.attributes?.username) {
            dispatch(
                getOtherUserDetails(
                  blog?.author?.data?.attributes?.username
                )
              ).then((res) => {
                if (res?.payload?.data?.status === 200) {
                  setUserFollowers(res?.payload?.data?.followerUsers);
                  if (
                    res?.payload?.data?.followerUsers?.indexOf(
                      parseInt(session.userId)
                    ) !== -1
                  ) {
                    setFollowing(true);
                  } else {
                    setFollowing(false);
                  }
                }
              });
        }
    }, [blog])

    useEffect(() => {
        if (gemId) {
            getRandomGems()
            dispatch(checkIsPublicGem(gemId)).then((res) => {
                if (res.error === undefined) {
                  setIsPublicGem(res.payload.data);
                }
            })
        }
    }, [gemId])

    useEffect(() => {
        //create new instance and pass a callback function
        observer = new IntersectionObserver((entries) => {
            const visibleSection = entries.find((entry) => entry.isIntersecting)?.target;
            //Update state with the visible section ID
            if (visibleSection) {
                setActiveSection(visibleSection.id);
            }
        });

        headers.forEach((section) => {
            const elem = document.getElementById(section.id)
            observer.observe(elem);
        });
    }, [headers])

    useEffect(() => {
        const getCall = async () => {
            if (!highlighter) {
                setHighlighter(await loadHighlighter())
            }
            if(allHighlights.length > 0){
                allHighlights.forEach(s => {
                    if(s?.media?.details?.id){
                        highlighter.fromStore(s?.media?.details.startMeta, s?.media?.details.endMeta, s?.media?.details.text, s?.media?.details.id)
                        if (s?.media?.color?.className){
                            highlighter.addClass(s?.media?.color?.className, s?.media?.details.id)
                        }
                    }
                })
            }
            else if (!isFetchedHighlights) {
                dispatch(fetchUrlHighlights((blog?.media_type === "Blog") ? window.location.href : blog?.url)).then((res) => {
                    setIsFetchedHighlights(true)
                })
            }
        }
        getCall()
    }, [highlighter, allHighlights, extraDetails, isFetchedHighlights])

    useEffect(() => {
        if(sharedCollections && sharedCollections.length>0){
          const filtered = sharedCollections?.filter(item => item?.accessType !== 'viewer')
          setAllCollections(collectionsAndItsCount ? [...collectionsAndItsCount,...filtered] : [...filtered])
        }else{
          setAllCollections(collectionsAndItsCount ? [...collectionsAndItsCount] : [])
        }
    },[sharedCollections,collectionsAndItsCount])

    useEffect(() => {
        function onDOMLoaded() {
            const element = document.getElementById("curateit-extension-installed")
            setIsExtensionExists(element !== null)
        }
        onDOMLoaded()
        function handleResize() {
            if (window?.innerWidth <= 768) {
              setIsMobile(true)
            } else {
              setIsMobile(false)
            }
        }
        function hideMenu() { 
            if (window.getSelection().toString() === ""){
                setHighlighterStyle({ display: "none" }); 
            }
        }
        function getDocHeight() {
            return Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight
            );
        }
        function calculateScrollDistance() {
            const scrollTop = window.pageYOffset; // how much the user has scrolled by
            const winHeight = window.innerHeight;
            const docHeight = getDocHeight();

            const totalDocScrollLength = docHeight - winHeight;
            const scrollPostion = Math.floor(scrollTop / totalDocScrollLength * 100)
            setScrollPos(scrollPostion)
        }
        function onScrollPage() {
            requestAnimationFrame(() => {
                // Calculates the scroll distance
                calculateScrollDistance();
            });
        }
        document.addEventListener('click', hideMenu);
        document.addEventListener("scroll", onScrollPage)
        if (typeof window !== "undefined") {
            width = window.innerWidth;
            window.addEventListener("resize", handleResize);
        }
        
        handleResize();
        //Cleanup function to remove observer
        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener('click', hideMenu)
            document.removeEventListener("scroll", onScrollPage)
            headers.forEach((section) => {
                const elem = document.getElementById(section.id)
                observer.disconnect(elem);
            });
        };
    }, []);

    const onSelectingText = (e) => {
        const selectedArea = window.getSelection();
        if (selectedArea.toString() && articleContent?.current){
            const bound = selectedArea.getRangeAt(0).getBoundingClientRect();
            setHighlightText(selectedArea.toString());
            setBoxDetails(bound);
            const styles = {
                display: "flex",
                top: (bound.y + window.scrollY) - 32,
                left: bound.x
            }
            setHighlighterStyle(styles);
        }
    }

    const onAddHighlight = async (color) => {
        if (!highlightText || !highlighter){
            setHighlighterStyle({ display: "none" });
            window.getSelection()?.removeAllRanges();
            return
        }

        // highlighter.run();
        const s         = window.getSelection()
        const tRange    = s.getRangeAt(0)
        const details   = highlighter.fromRange(tRange)
        highlighter.addClass(color?.className, details.id)

        const payload = {
            color,
            text: highlightText,
            title: highlightText.toString().substr(0, 50),
            description: highlightText,
            link: blog?.url,
            collections: blog?.collection_gems?.data?.id,
            type: "Highlight",
            box: boxDetails,
            _id: details?.id,
            styleClassName: color?.className,
            details,
        }

        await dispatch(addHighlight(blog?.collection_gems?.data?.id, payload))

        setHighlighterStyle({ display: "none" });
        setHighlightText("");
        setBoxDetails({});
        window.getSelection()?.removeAllRanges();
    }

    const onCommentClick = () => {
        if (session?.userId) {
            setShowComment(true)
        }
        else {
            dispatch(openAuthModal({
                open: true,
                action: 'login',
                extraInfo: {
                    trigger: 'comment',
                    username: uname,
                    id: sourceId,
                    module: module,
                    slug: slug
                }
            }))
        }
    }

    const onSEOUpdate = async (data) => {
        setLoadingSEO(true)
        const seoRes = await dispatch(updateGemSeoDetails(gemId, data));
        setShowSeo(false);
        setLoadingSEO(false)
        if (seoRes?.payload?.status === 200) {
            setSeoDetail({ ...seoDetail, ...data });
            setAltInfo(data?.seo?.altInfo)
            // setUser({ ...user, seo: data });
            message.success(`Gem ${TextMessage.SEO_UPDATE}`);
            navigate.push(`/u/${session?.username}/g/${gemId}/${data?.seo?.slug}`)
        }
    }

    const onShareCopyLink = () => {
        setShowCopied(true);
        setTimeout(() => {
          setShowCopied(false);
        }, 1000);
    };

    const onColorPaletteClick = (flag) => {
        setShowColors(flag)
    }

    const onCopyToClipboard = () => {
        if (!extraDetails?.textContent) {
            message.error("Content is not provided")
            return
        }
        let timer = setTimeout(() => {
            setUserCopyText("Copy article text")
            clearTimeout(timer)
        }, 500)
        setUserCopyText("Copied")
        navigator.clipboard.writeText(extraDetails?.textContent)
    }

    const onDownloadArticle = () => {
        if (!extraDetails?.textContent) {
            message.error("Content is not provided")
            return
        }
        const link = document.createElement("a")
        const file = new Blob([extraDetails?.textContent], { type: "text/plian" })
        link.href = URL.createObjectURL(file)
        link.download = "sample.txt"
        link.click()
        URL.revokeObjectURL(link.href)
    }

    const onLikeBlog = async () => {
        if (!session.token) {
            dispatch(openAuthModal({
                open: true,
                action : 'login',
                extraInfo: {
                    trigger: 'like',
                    username: uname,
                    id: sourceId,
                    module: module,
                    slug: slug
                }
            }))
            return
        }
        const res = await dispatch(likeBookmarkGem(blog?.id))
        if (res?.payload?.data?.status === 200) {
            const isLiked = res.payload?.data?.data?.isLike
            if (isLiked !== undefined && isLiked === false) {
                const newCount = Number(likeCount) - 1;
                setLikeCount(newCount)
                // setLiked(false);
            } 
            else if (isLiked !== undefined && isLiked === true) {
                const newCount = Number(likeCount) + 1;
                setLikeCount(newCount)
                // setLiked(true);
            }
            else if (res?.payload?.data?.data?.likes_count !== undefined || res?.payload?.data?.data?.likes_count !== null) {
                setLikeCount(Number(res?.payload?.data?.data?.likes_count))
                // setLiked(false)
            }
        }
    }

    const handleFollow = async () => {
        if (!session?.userId) {
            dispatch(openAuthModal({
                open: true,
                action: 'login',
                extraInfo: {
                    trigger: 'follow',
                    username: uname,
                    id: sourceId,
                    module: module,
                    slug: slug
                }
            }))
            return
        }
        if(session && session?.userId){
            setfollowLoading(true);
            const data = {
                hierarchyLevel: "user",
                followerUserId: session.userId,
            };
            dispatch(followUser(data)).then((res) => {
                if (res?.payload?.status === 200) {
                    setFollowing(true);
                    setfollowLoading(false)
                    message.success('User followed successfully')
                }else{
                    setfollowLoading(false);
                }
            });
        }
    };

    const handleUnfollow = async () => {
        if (!session?.userId) {
            dispatch(openAuthModal({
                open: true,
                action: 'login',
                extraInfo: {
                    trigger: 'unfollow',
                    username: uname,
                    id: sourceId,
                    module: module,
                    slug: slug
                  }
            }))
            return
        }
        setfollowLoading(true);
        const data = {
          hierarchyLevel: "user",
          followerUserId: session.userId,
        };
        dispatch(unfollowUser(data)).then((res) => {
          if (res?.payload?.status === 200) {
            setFollowing(false);
          }
          setfollowLoading(false);
        });
    };

    const handleCreateCollection = async (value) => {
        if(!value){
            message.error('Enter collection')
            return;
        }
    
        const optionData = allCollections?.filter((data) => {
          return data?.name?.toLowerCase().includes(value.toLowerCase())
        })
                
        const result = checkCollectionExists(optionData,value)
        if(result){
            message.error('Collection Already Exists')
            return;
        }
        const res = await dispatch(addCollections({
            data: {
                name: value,
                author: Number(session.userId)
            }
        }))
        if(res.error === undefined){
            handleSaveGem({id: res?.payload?.data?.data?.id,name: res?.payload?.data?.data?.name})
            setCollectionSearch('')
        }else{
            message.error('Error Occured while saving gem')
            setCollectionSearch('')
        }
    }

    const handleSaveGem = async (item) => {
        const isSelectedCollectionShared = getAllLevelCollectionPermissions(sharedCollections,item?.id)
    
        const finalObj = {
          ...blog,
          author: isSelectedCollectionShared ? isSelectedCollectionShared?.data?.author?.id : Number(session.userId),
          collection_gems: item?.id,
          collections: item?.id,
        }   
    
        delete finalObj.id
        delete finalObj.createdAt
        delete finalObj.updatedAt
    
        const gemRes = await dispatch(addGem({ data: finalObj }))
    
        if (gemRes.error === undefined && gemRes.payload.error === undefined) {
          const { data } = gemRes.payload
          if (data.data) {
            const d = data.data;
            const g = {
              id: d?.id,
              title: d?.title,
              media: d?.media,
              media_type: d?.media_type,
              url: d?.url,
              remarks: d?.remarks,
              metaData: d?.metaData,
              description: d?.description,
              S3_link: d?.S3_link,
              is_favourite: d?.is_favourite,
              collection_id: item?.id,
              tags: finalObj.tags,
              showThumbnail: finalObj?.showThumbnail || '',
              fileType: d?.fileType
            }
            if(isSelectedCollectionShared){
              dispatch(addGemToSharedCollection(item?.id,g))
              dispatch(getSharedCollections())
            }
            dispatch(fetchCollectionWiseCounts())
            dispatch(updateBookmarkWithExistingCollection(g, {id:item?.id}, false, "add", null))
            message.success(TextMessage.BOOKMARK_CREATE_TEXT)
            setExistingCollectionSaved([...existingCollectionSaved,{
                id: g?.id,
                title: g?.title,
                collection_gems: {
                    id: item?.id,
                    name: item?.name
                }
            }])
          }
        }else{
        //   message.error(TextMessage.ERROR_TEXT)
        }
    }

    const handleSearch = (value) => {
        if(!value){
          setAllCollections(collectionsAndItsCount ? [...collectionsAndItsCount,...sharedCollections] : [...sharedCollections])
          setCollectionSearch('')
          return;
        }
        setCollectionSearch(value)
        const result = filterCollectionByName(collectionsAndItsCount ? [...collectionsAndItsCount,...sharedCollections] : [...sharedCollections],value)
        setAllCollections(result)
    }

    const handleDeleteGem = async (item) => {
        const isSingleBkShared          = getBookmarkPermissions(sharedCollections,item?.id)
        const currentCollectionShared   = getAllLevelCollectionPermissions(sharedCollections,item?.collection_gems?.id)

        if(!isSingleBkShared){
            const res = await dispatch(deleteBookmark(item?.id))
            if(res.error === undefined){
                const filtered = existingCollectionSaved?.filter(data => data.id !== item.id)
                setExistingCollectionSaved(filtered)
                dispatch(removeGemFromCollection(item?.id, item?.collection_gems?.id))
                dispatch(removeGemFromTag(item?.id))
                dispatch(fetchCollectionWiseCounts())
                message.success('Bookmark removed successfully')
            }else{
                message.error('Error Occured')
            } 
            return;
        }

        if(isSingleBkShared && !isSingleBkShared?.gems?.canDelete){
            message.error('You dont have permission to delete the gem')
            return;
        }

        if(isSingleBkShared && isSingleBkShared?.gems?.canDelete){
            const res = await dispatch(deleteBookmark(item?.id))
            if(res.error === undefined){
                const filtered = existingCollectionSaved?.filter(data => data.id !== item.id)
                setExistingCollectionSaved(filtered)
                dispatch(removeGemFromCollection(item?.id, item?.collection_gems?.id,currentCollectionShared))
                dispatch(getSharedCollections())
                message.success('Bookmark deleted successfully')
            }else{
                message.error('Error Occured')
            }
        }
    }

    const onGemOpen = (obj) => {
        navigate.push(`/u/${blog?.author?.data?.attributes?.username}/g/${obj.id}/${obj?.slug || slugify(obj?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}`)
    }
    
    const openHighlight = (obj) => {
        window.open(obj.url, "_blank");
    }

    const getRandomGems = async () => {

        if(!gemPublicView){
            const res = await dispatch(getRandomBookmarkGem({ gemId: gemId, count: 20 }));
            const res1 = await dispatch(getPageConfig());
          if (
            res?.payload?.data?.data?.id &&
            res?.payload?.data?.data?.attributes?.randomGems &&
            res1
          ) {
            setAllRandomBookmarks(res?.payload?.data?.data?.attributes?.randomGems);
            setPropertyOrder(res1?.payload?.data?.data?.propertyOrder);
            let newArr = [];
            if (width < 500) {
              newArr = res?.payload?.data?.data?.attributes?.randomGems.slice(0, 1);
              if (res?.payload?.data?.data?.attributes?.randomGems.length > 1) {
                setShowLoadMoreRandom(true);
              }
            } else if (width < 801) {
              newArr = res?.payload?.data?.data?.attributes?.randomGems.slice(0, 2);
              if (res?.payload?.data?.data?.attributes?.randomGems.length > 2) {
                setShowLoadMoreRandom(true);
              }
            } else if (width < 1110) {
              newArr = res?.payload?.data?.data?.attributes?.randomGems.slice(0, 3);
              if (res?.payload?.data?.data?.attributes?.randomGems.length > 3) {
                setShowLoadMoreRandom(true);
              }
            } else if (width < 1510) {
              newArr = res?.payload?.data?.data?.attributes?.randomGems.slice(0, 4);
              if (res?.payload?.data?.data?.attributes?.randomGems.length > 4) {
                setShowLoadMoreRandom(true);
              }
            } else {
              newArr = res?.payload?.data?.data?.attributes?.randomGems.slice(0, 5);
              if (res?.payload?.data?.data?.attributes?.randomGems.length > 5) {
                setShowLoadMoreRandom(true);
              }
            }
            setRandomBookmark(newArr);
          }
          return;
        }
        
        const res = await dispatch(getRandomBookmarkGem({ gemId: gemId, count: 20 }));
        if (
            res?.payload?.data?.data?.id &&
            res?.payload?.data?.data?.attributes?.randomGems
          ){
            setAllRandomBookmarks(res?.payload?.data?.data?.attributes?.randomGems);
            let newArr = [];
            if (width < 500) {
              newArr = res?.payload?.data?.data?.attributes?.randomGems.slice(0, 1);
              if (res?.payload?.data?.data?.attributes?.randomGems.length > 1) {
                setShowLoadMoreRandom(true);
              }
            } else if (width < 801) {
              newArr = res?.payload?.data?.data?.attributes?.randomGems.slice(0, 2);
              if (res?.payload?.data?.data?.attributes?.randomGems.length > 2) {
                setShowLoadMoreRandom(true);
              }
            } else if (width < 1110) {
              newArr = res?.payload?.data?.data?.attributes?.randomGems.slice(0, 3);
              if (res?.payload?.data?.data?.attributes?.randomGems.length > 3) {
                setShowLoadMoreRandom(true);
              }
            } else if (width < 1510) {
              newArr = res?.payload?.data?.data?.attributes?.randomGems.slice(0, 4);
              if (res?.payload?.data?.data?.attributes?.randomGems.length > 4) {
                setShowLoadMoreRandom(true);
              }
            } else {
              newArr = res?.payload?.data?.data?.attributes?.randomGems.slice(0, 5);
              if (res?.payload?.data?.data?.attributes?.randomGems.length > 5) {
                setShowLoadMoreRandom(true);
              }
            }
            setRandomBookmark(newArr);
        }
    };

    const getWidthObj = (width) =>{
        if (isMobile) {
            return {
                maxWidth: "366px",
                width: "100%"
            }
        }
        switch (width) {
            case 1:
                return {
                    maxWidth: `530px`,
                    width: "100%"
                }
            case 2:
                return {
                    maxWidth: `604px`,
                    width: "100%"
                }
            case 3: 
                return {
                    maxWidth: `676px`,
                    width: "100%"
                }
            case 4:
                return {
                    maxWidth: `720px`,
                    width: "100%"
                }
            case 5:
                return {
                    maxWidth: `748px`,
                    width: "100%"
                }
            default:
                return {
                    maxWidth: `720px`,
                    width: "100%"
                }
        }
    }

    const handleLoadMoreRandom = () => {
        let newArr = [];
        if (width < 500) {
          newArr = allRandomBookmarks.slice(0, 4);
        } else if (width < 801) {
          newArr = allRandomBookmarks.slice(0, 8);
        } else if (width < 1110) {
          newArr = allRandomBookmarks.slice(0, 12);
        } else if (width < 1510) {
          newArr = allRandomBookmarks.slice(0, 16);
        } else {
          newArr = allRandomBookmarks.slice(0, 20);
        }
        setRandomBookmark(newArr);
        setShowLoadMoreRandom(false);
    };

    const handleDownloadAudio = () => {
        if (!audioUrl) return;
        window.open(audioUrl);
    }

    const onSpeedRow = () => {
        if (!extraDetails?.title || !extraDetails.textContent) {
            message.error("Details not provided")
            return
        }
        const text = extraDetails.title + extraDetails.textContent;
        speedRead(text);
    }

    const onShareClick = (flag) => {
        setShowShare(flag);
    }

    const onTextClick = (flag) => {
        setShowText(flag)
    }

    const handleCopyLink = (blog) => {
        if (blog?.media_type === "Blog") {
            const blogSlug = `${blog?.slug || (blog?.title ? slugify(blog?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g }) : "default")}?bid=${blog?.media?.blogId}`
            let url        = `${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/${blogSlug}` 
            if (session.isInternalUser === "true") {
                url        = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blogSlug}`
            }
            copyText(url,'Link copied to clipboard')
            return;
        }
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/u/${blog?.author?.data?.attributes?.username || 'default'}/g/${blog?.id}/${blog?.slug || (blog?.title ? slugify(blog?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g }) : "default")}?public=true`
        copyText(url,'Link copied to clipboard')
    }

    const onShowEditGem = () => {
        setShowEditGem(true)
    }

    const onShowEditSEO = () => {
        setEditSEO(true)
    }

    // const onAuthorDisplayChanged = async (checked) => {
    //     const payload = {
    //         ...blog.media,
    //         showAuthor: checked
    //     }
    //     const res = await dispatch(updateBlog({ media: payload }, blog.id))
    //     if (res.error === undefined) {
    //         message.success(checked ? "Author details is now visible" : "Author details is now hided")
    //     }
    //     setAuthorChecked(checked)
    // }

    const openGemInNewWindow = () => {
        dispatch(updateUsageCount(blog?.id))

        if (blog?.media_type === "Blog") {
            const blogSlug = `${blog?.slug || (blog?.title ? slugify(blog?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g }) : "default")}?bid=${blog?.media?.blogId}`
            let url        = `${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/${blogSlug}`
            if (session.isInternalUser === "true") {
                url        = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blogSlug}`
            }
            navigate.push(url)
            //  window.open(url, "_blank")
        } 
        else if (blog?.url) {
          window.open(blog?.url, "_blank");
        }
    };

    const onSaveBookmarkClick = (flag) => {
        if(session && session?.userId){
            setShowAddBk(flag);
        }else{
            dispatch(openAuthModal({
                open: true,
                action : 'login',
                extraInfo: {
                    trigger: 'save',
                    username: uname,
                    id: sourceId,
                    module: module,
                    slug: slug
                }
            }))
        }
    }

    const redirectToHighlight = (h) => {
        if (h?.media?._id) {
            const elment = document.querySelector(`[data-highlight-id='${h?.media?._id}']`)
            if (elment) {
                const bb = elment.getBoundingClientRect()
                window.scrollTo({ top: bb?.top || 0 })
            }
        }
    }

    const onLoadedMetadata = useCallback(() => {
        progressRef.current.max = audioRef.current.duration
        setAudioProgress(audioRef.current.currentTime || 0)
        setAudioTime(formatTime(audioRef.current.duration))
        setAudioCurrentTime(formatTime(audioRef.current.currentTime));
    }, []);

    const onSubmitGem = () => {
        if (gemId) {
          dispatch(getSingleBookmarkGem(gemId)).then((res) => {
            if (res?.payload?.data?.data?.id) {
              setBookmark(res?.payload?.data?.data);
            }
          });
        }
    };

    const onUpdateTime = (isPlaying) => {
        if (isPlaying) {
            intervalTime.current = setInterval(() => {
                setAudioProgress(audioRef.current.currentTime)
                setAudioCurrentTime(formatTime(audioRef.current.currentTime))
                if (audioRef.current.currentTime === audioRef.current.duration) {
                    clearInterval(intervalTime.current)
                    setAudioPlying(false)
                }
            }, 100)
        } else {
            setAudioCurrentTime(formatTime(audioRef.current.currentTime))
            setAudioPlying(false)
            clearInterval(intervalTime.current)
        }
    }

    const handleAudioPlayPause = () => {
        if (audioPlaying) {
            //Pause audio
            audioRef.current.pause();
            setAudioPlying(false);
            onUpdateTime(false)
        } else {
            //Play audio
            audioRef.current.play()
            setAudioPlying(true);
            onUpdateTime(true)
        }
    }

    const handleUpdateProgress = (e) => {
        setAudioProgress(e.target.value)
        if (audioPlaying) {
            clearInterval(intervalTime.current)
            audioRef.current.currentTime = e.target.value;
            setAudioProgress(e.target.value)
            setAudioCurrentTime(formatTime(e.target.value));
            audioRef.current.play()
            onUpdateTime(true)
        } else {
            audioRef.current.currentTime = e.target.value;
            setAudioProgress(progressRef.current.value)
            setAudioCurrentTime(formatTime(progressRef.current.value));
        }
    }

    const handleAudioSpeed = () => {
        let newSpeed = 1
        if (audioSpeed === 1) {
            setAudioSpeed(1.5)
            newSpeed = 1.5
        } else if (audioSpeed === 1.5) {
            newSpeed = 2.0
            setAudioSpeed(2.0)
        } else if (audioSpeed === 2.0) {
            newSpeed = 0.5
            setAudioSpeed(0.5)
        } else {
            newSpeed = 1
            setAudioSpeed(1)
        }
        audioRef.current.playbackRate = newSpeed
    }

    const handleClosePlayer = () => {
        if (audioPlaying) {
            audioRef.current.pause();
            setAudioPlying(false);
        }

        setShowAudioPlayer(false);
    } 

    const onReadArticle = async () => {
        if (!session.token) {
            dispatch(openAuthModal({
                open: true,
                action : 'login',
                extraInfo: {
                    trigger: 'readarticle',
                    username: uname,
                    id: sourceId,
                    module: module,
                    slug: slug
                  }
            }))
            return
        }
        setShowAudioPlayer(true)
        if (!audioUrl) {
            setFetchingAudio(true);
            const body = {
                text: extraDetails?.textContent,
                url: blog?.url,
            }
            const res = await dispatch(fetchTextToSpeech(body))
            setFetchingAudio(false);
            if (res?.payload?.data?.data?.audio_url) {
                setAudioUrl(res?.payload?.data?.data?.audio_url);
            } else {
                handleClosePlayer();
            }
        }
    }

    // const onFullScreenClick = () => {
    //     const screenVal  = !isFull
    //     if (screenVal) {
    //         if (document.requestFullscreen) {
    //             document.requestFullscreen();
    //         } else if (document.mozRequestFullScreen) { // Firefox
    //             document.mozRequestFullScreen();
    //         } else if (document.webkitRequestFullscreen) { // Chrome, Safari, and Opera
    //             document.webkitRequestFullscreen();
    //         } else if (document.msRequestFullScreen) {
    //             document.msRequestFullScreen()
    //         }
    //     }
    //     else {
    //         if (document.exitFullscreen) {
    //             document.exitFullscreen();
    //         } else if (document.mozCancelFullScreen) { // Firefox
    //             document.mozCancelFullScreen();
    //         } else if (document.webkitExitFullScreen) { // Chrome, Safari, and Opera
    //             document.webkitExitFullScreen();
    //         } else if (document.msExitFullScreen) {
    //             document.msExitFullScreen()
    //         }
    //     }
    //     setIsFull(screenVal)
    // }

    const renderColors = () => {
        return (
            <div className="bg-white z-50 p-3 rounded-lg shadow-lg border-[0.5px] ct-color-list-container">
                {COLOR_PALLETE.map((c) => {
                    return <button onClick={() => setCurrentBg(c)} className={currentBg === c ? "ct-change-color ct-color-selected" : "ct-change-color"} style={{ backgroundColor: c }}></button>
                })}
            </div>
        )
    }

    const renderTextDropdown = () => {
        return (
            <FontBox activeTheme={activeTheme} 
                     onThemeChange={(theme) => setActiveTheme(theme)}
                     fontSize={readingFontSize}
                     onSetFontSize={(fontSize) => setReadingFontSize(fontSize)}
                     lineHeight={readingLineHeight}
                     onSetLineHeight={(lineHeight) => setReadingLineHeight(lineHeight)}
                     lineWidth={lineWidth}
                     onSetLineWidth={(lineW) => setLineWidth(lineW)}
                     fontFamily={font}
                     setFontFamily={(fontFamily) => setFont(fontFamily)}
                     isMobile={isMobile}
                     fontClasses={FONT_CLASSES} />
        )
    }

    const renderShareDropdown = () => {
        return (<div className="bg-white z-50 p-3 rounded-lg shadow-lg border-[0.5px]">
            <SocialShare
                gem={blog}
                setShowShare={setShowShare}
                showCopied={showCopied}
                handleCopy={onShareCopyLink}
                html={extraDetails?.content}
            />
        </div>)
    }

    const renderUserMenu = () => {
        if (isInboxView) return null
        return <SettingsMenu onShowReportBug={() => setShowReportBug(true)}>
            {/* <Avatar src={session.userProfileImage} className="cursor-pointer">
                {session.username?.charAt(0)?.toUpperCase()}
            </Avatar> */}
            <button className="w-7 h-7 rounded-md bg-white shadow flex justify-center items-center">
                <EllipsisHorizontalIcon className='w-4 h-4' />
            </button>
        </SettingsMenu>
    }

    const renderLoginOptions = () => {
        if (isInboxView) return null
        return (
            <div className="flex">
                <Button className="mx-2 rounded border-[#105FD3] text-[#105FD3] hover:border-[#105FD3] hover:text-[#105FD3]" 
                        onClick={() => dispatch(openAuthModal({
                                open: true,
                                action : 'login',
                                extraInfo: {
                                    trigger: 'signup',
                                    username: uname,
                                    id: sourceId,
                                    module: module,
                                    slug: slug
                                  }
                        }))}>
                    Login
                </Button>
                <Button type="primary" className={`border-[#105FD3] bg-[#105FD3] hover:bg-[#105FD3] hover:border-[#105FD3] rounded`} 
                      onClick={() => dispatch(openAuthModal({
                        open: true,
                        action : 'signup',
                        extraInfo: {
                            trigger: 'signup',
                            username: uname,
                            id: sourceId,
                            module: module,
                            slug: slug
                        }
                      }))}>
                    Sign up
                </Button>
            </div>
        )
    }

    const renderHeader = () => {
        return (
            <div className="flex border-b border-solid border-[#e5e7eb] p-2 md:p-4 md:justify-between items-center">
                <div className="flex items-center justify-start w-full md:mb-0 md:w-fit">
                    {((session && session.openPagesInSession === "full page") || gemPublicView) && !isInboxView && showBackBtn && (
                        <button
                            className="flex items-center"
                            onClick={() => {
                                if (document.referrer === "") {
                                    navigate.push(`/`)
                                }
                                else {
                                    navigate.back()
                                }
                            }}
                            // onClick={handleNavigateBack}
                        >
                            <ChevronLeftIcon className="w-4 h-4 mr-1" />
                            <span>Back</span>
                        </button>
                    )}

                    {!session.token && blog?.media_type !== "Article" && <CurateitLogo />}

                    {!isInboxView  && <div className="flex items-center justify-between ml-4">
                        {(session.token || (!session.token && blog.media_type === "Article")) && <UserBox
                            user={blog?.author?.data}
                            userFollowers={userFollowers}
                            gemPublicView={gemPublicView}
                            className={activeTheme === "dark" ? "text-white" : ""}
                        />}
                        {session && blog?.author?.data?.id?.toString() !== session?.userId?.toString() && blog.media_type === "Article" && (
                            <div
                                className="text-[#347AE2] font-medium relative cursor-pointer ml-2"
                                onClick={following ? handleUnfollow : handleFollow}
                            >
                                {following ? "" : "Follow"}
                                {followLoading && (
                                    <div className="bg-blue-200 w-full h-full absolute left-0 top-0 rounded-lg flex justify-center items-center">
                                    <Spin size="small" />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>}
                </div>
                <div className="flex items-center gap-3">
                    {(!permissions || permissions?.gems?.canUpdate) && !gemPublicView && blog?.media_type === "Blog" && props.onModeChange &&
                        <>
                            {/* <Switch style={{ background: authorChecked ? "#1890ff" : "#00000040" }} checked={authorChecked} onChange={onAuthorDisplayChanged} className="mr-2" checkedChildren="Hide Author" unCheckedChildren={"Show Author"} /> */}
                            <Tooltip title="Edit gem details" placement="bottom">
                                <button onClick={() => props.onModeChange()} className='w-7 h-7 border-[0.5px] border-gray-400 shadow flex justify-center items-center outline-none rounded-md'>
                                    <HiPencilSquare className='w-4 h-4' />
                                </button>
                            </Tooltip>
                            {isPublicGem &&
                                <Tooltip title="Update SEO Details" placement="bottom">
                                    <button onClick={onShowEditSEO} className='w-7 h-7 border-[0.5px] border-gray-400 shadow flex justify-center items-center outline-none rounded-md'>
                                        <TbWorldSearch className='w-4 h-4' />
                                    </button>
                                </Tooltip>
                            }
                        </>
                    }
                    {(!permissions || permissions?.gems?.canUpdate) && !gemPublicView && blog?.media_type === "Article" &&
                        <>
                            <Tooltip title="Edit gem details" placement="bottom">
                                <button onClick={onShowEditGem} className='w-7 h-7 border-[0.5px] border-gray-400 shadow flex justify-center items-center outline-none rounded-md'>
                                    <HiPencilSquare className='w-4 h-4' />
                                </button>
                            </Tooltip>
                            {isPublicGem &&
                                <Tooltip title="Update SEO Details" placement="bottom">
                                    <button onClick={onShowEditSEO} className='w-7 h-7 border-[0.5px] border-gray-400 shadow flex justify-center items-center outline-none rounded-md'>
                                        <TbWorldSearch className='w-4 h-4' />
                                    </button>
                                </Tooltip>
                            }
                        </>
                    }
                    {session.token && <button onClick={() => handleCopyLink(blog)} className='w-7 h-7 border-[0.5px] border-gray-400 shadow flex justify-center items-center outline-none rounded-md'>
                        <LinkIcon className='w-4 h-4' />
                    </button>}
                    {blog?.media_type === "article" && <button
                        onClick={openGemInNewWindow}
                        className="w-7 h-7 border-[0.5px] border-gray-400 shadow flex justify-center items-center outline-none rounded-md"
                    >
                        <GlobeAltIcon className="w-4 h-5" />
                    </button>}
                    {session?.token 
                        ? renderUserMenu()
                        : renderLoginOptions()
                    }
                </div>
            </div>
        )
    }

    const renderRelatedArticles = () => {
        return (
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-center">Related</h2>
            <div>
              <MoodboardView
                items={randombookmark}
                propertyOrder={propertyOrder}
                page="random-bookmark"
                cardSize={"large"}
                user={blog?.author?.data?.attributes}
                // showAddToBookmark={handleShowAddToBookmark}
                // showComment={showComment}
                // openPagesIn={openPagesIn}
                // handleOpenPagesIn={handleOpenPagesIn}
                // shrink={shrink}
                // setShrink={setShrink}
                gemPublicView={gemPublicView}
              />
            </div>
            {showLoadMoreRandom && (
              <div className="flex justify-center items-center py-2">
                <Button
                  className="px-4 py-2 rounded-2xl"
                  onClick={handleLoadMoreRandom}
                  type="text"
                >
                  See more
                </Button>
              </div>
            )}
          </div>
        );
    }

    const renderRelatedGems = () => {
        return (
            <div className="px-4">
                {renderRelatedArticles()}
            </div>
        )
    }

    const renderTableOfContents = () => {
        const activeStyle = {
            fontWeight: 'bold',
            color: '#28313b',
            fontFamily: FONT_CLASSES[font],
        };
        return <StickyBox className="flex flex-col ct-table-content-container">
            {headers.length !== 0 && <h5 className="ct-table-heading mb-5">Table of contents</h5>}  
            {headers.map((h) => {
                return <div className={h.tagName === "H3" ? "ct-table-content-line mb-4 ml-4" : "ct-table-content-line mb-4"}>
                    <a href={`#${h.id}`} style={activeSection === h.id ? activeStyle : { fontFamily: FONT_CLASSES[font] }} onClick={() => setActiveSection(h.id)}>{h.innerText}</a>
                </div>
            })}
        </StickyBox>
    }

    const renderTableOfContentInPanel = () => {
        const activeStyle = {
            fontWeight: 'bold',
            color: '#28313b',
            fontFamily: FONT_CLASSES[font]
        };
        return (<Collapse defaultActiveKey={['1']} className="w-full ct-mobile-panel">
            <Panel header="Table of contents">
                {headers.map((h) => {
                    return <div className="ct-table-content-line mb-4">
                        <a href={`#${h.id}`} style={activeSection === h.id ? activeStyle : { fontFamily: FONT_CLASSES[font] }} onClick={() => setActiveSection(h.id)}>{h.innerText}</a>
                    </div>
                })}
            </Panel>
        </Collapse>)
    }

    const renderSEODrawer = () => {
        return (<Drawer footer={null} 
                        title="SEO" 
                        open={showEditSEO} 
                        onClose={() => setEditSEO(false)}
                        width={isMobile ? '90%' : '460px'}
                        maskClosable={false}
                        bodyStyle={{padding: isMobile ? '24px 8px' : '24px'}}
                        >
            <SEOModal
                onSubmit={onSEOUpdate} 
                seoObj={seoDetail || null}
                defaultImg={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`} 
                isMobile={isMobile}
                loading={loadingSEO}
                baseDetails={{ id: gemId, type: "g" }}
                existingThumbnails={blog?.metaData?.docImages}
                typeId={blog?.id}
                type="gem"
                showAltInfo={TEXT_BASED_MEDIA_TYPES.indexOf(blog?.media_type) === -1}
                altInfo={altInfo}
            />
        </Drawer>)
    }

    const bookmarkAddRender = () => {
        return(
            <div className='bg-white z-[100] rounded-lg shadow-lg border-[0.5px]' onClick={(e) => e.stopPropagation()}>
                <div className='border-b-1 border-[#E9E9E9] p-3 pb-2 flex items-center justify-between w-full'>
                    <span className='font-bold text-sm block'>Collections</span>
                    <XMarkIcon className='text-[#EB5757] h-4 w-4 cursor-pointer' onClick={(e) => {
                        e.stopPropagation()
                        setShowAddBk(false)
                        setExistingCollectionSaved([])
                        setCollectionSearch('')
                    }}/>
                </div>
                {
                loading ? <div className='w-full flex items-center justify-center mt-2'>
                  <Spin tip='Loading' size='small'/>
                </div>
                :
                <div className='p-2'>
                  <div className='w-full p-1'>
                    <Input placeholder="Search or type to create new collection..."
                      onKeyDown={(e) => {
                        e.stopPropagation();
                        if (e.key === 'Enter') {
                          handleCreateCollection(e.target.value);
                        }
                        handleSearch(e.target.value);
                      }} 
                      onChange={(e) => {
                        e.stopPropagation()
                        handleSearch(e.target.value)
                      }} 
                      className="w-inherit border-none border-b p-0 outline-none"
                      value={collectionSearch}
                      allowClear
                      prefix={<MagnifyingGlassIcon className="h-4 w-4 text-[#97A0B5]"/>}
                      />
                  </div>
    
                  <div className='mt-2 h-[180px] overflow-y-auto cursor-pointer'>
                    <div className="flex items-center py-2 px-1 w-full justify-between" onClick={() => handleCreateCollection(collectionSearch)} >
                        <FolderPlusIcon className="h-4 w-4 text-blue-500" aria-hidden="true" />
                        <span className='ml-3 truncate text-sm text-blue-500'>{`${collectionSearch ? `"${collectionSearch}"` : ""} Type to create new collection `}</span>
                    </div>
                    {
                    allCollections.sort((a, b) => (existingCollectionSaved.some(item => item?.collection_gems?.id === b.id) ? 1 : -1) - (existingCollectionSaved.some(item => item?.collection_gems?.id === a.id) ? 1 : -1))?.map((item,i) => {
                      return(
                        <>
                        <div className='flex flex-row items-center justify-between'>
                          <div className={`font-medium text-sm block py-2 px-1 bg-white hover:bg-[#f5f5f5] w-full flex items-center`} key={i}
                          onClick={() => {
                            if(existingCollectionSaved.some(data => data?.collection_gems?.id === item.id)){
                              const filter = existingCollectionSaved.filter(data => data?.collection_gems?.id === item.id)
                              handleDeleteGem(filter[0])
                            }else{
                              handleSaveGem(item)
                            }
                          }}
                          >
                            <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
                            <span className='ml-3'>{item?.name}</span>
                          </div>
                          <div>
                            <span>{existingCollectionSaved.some(data => data?.collection_gems?.id === item.id) && '✅'}</span>
                          </div>
                        </div>
                        </>
                      )
                    })
                    }
                  </div>
                </div>
                }
            </div>
        )
    }

    const renderHighlight = (h) => {
        switch (h.media.type) {
            case "Code":
                return <CodeHighlight obj={h} 
                                    onViewGem={() => onGemOpen(h)} 
                                    user={blog?.author?.data?.attributes} 
                                    openHighlight={() => openHighlight(h)} 
                                    isSidebar={true} 
                                    width={width}/>;
            case "Image":
            case "Screenshot":
                return <ImageHighlight obj={h} 
                                    onViewGem={() => onGemOpen(h)} 
                                    user={blog?.author?.data?.attributes} 
                                    openHighlight={() => openHighlight(h)} />;
            case "Highlight":
            case "Note":
            case "Ai Prompt":
            case "Quote":
                return <TextHighlight key={h?.id} 
                                    obj={h} 
                                    media={h?.media} 
                                    user={blog?.author?.data?.attributes} 
                                    openHighlight={() => openHighlight(h)}
                                    onViewGem={() => onGemOpen(h)} />;
            default:
                return null;
        }
    }

    // const renderSocialLinks = (socialLinks) => {
    //     if (!socialLinks) return null
    //     return Object.keys(socialLinks).map((key, index) => {
    //         switch(key) {
    //             case "facebook":
    //                 return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
    //                             <RiFacebookCircleFill className="h-5 w-5 text-blue-500 ml-2" />
    //                        </a>
    //             case "twitter":
    //                 return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
    //                             <RiTwitterXFill className="h-5 w-5 text-blue-500 ml-2" />
    //                        </a>
    //             case "linkedin":
    //                 return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
    //                             <RiLinkedinBoxFill className="h-5 w-5 text-blue-500 ml-2" />
    //                        </a>
    //             case "instagram":
    //                 return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
    //                             <RiInstagramLine className="h-5 w-5 text-blue-500 ml-2" />
    //                        </a>
    //             case "github":
    //                 return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
    //                             <RiGithubFill className="h-5 w-5 text-blue-500 ml-2" />
    //                        </a>
    //             case "youtube":
    //                 return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
    //                             <RiYoutubeFill className="h-5 w-5 text-blue-500 ml-2" />
    //                        </a>
    //             case "tiktok":
    //                 return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
    //                             <IoLogoTiktok className="h-5 w-5 text-blue-500 ml-2" />
    //                        </a>
    //             case "medium":
    //                 return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
    //                             <RiMediumFill className="h-5 w-5 text-blue-500 ml-2" />
    //                        </a>
    //             case "producthunt":
    //                 return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
    //                             <RiProductHuntFill className="h-5 w-5 text-blue-500 ml-2" />
    //                        </a>
    //             case "substack":
    //                 return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
    //                         <SiSubstack className="h-5 w-5 text-blue-500 ml-2" />
    //                        </a>
    //             default:
    //                 return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
    //                         <FaGlobeAmericas className="h-5 w-5 text-blue-500 ml-2" />
    //                        </a>
    //         }
    //     })
    // }

    const renderAuthorBlock = () => {
        return (
            <BlogAuthor bookmark={blog} authorId={blog?.media?.authorId} isMobile={isMobile} />
        )
        // const a = blog?.author?.data?.attributes
        // if (!a) return null
        // return (
        //     <div className={`flex justify-between items-center ${isMobile ? "flex-col" : "flex-row"} shadow-md md:shadow-lg ct-owner-container`}>
        //         <div className={`ct-blog-owner-photo ${isMobile ? "mt-2" : ""}`}>
        //             <img src={a.profilePhoto} alt={a.firstname && a.lastname ? `${a.firstname} ${a.lastname}` : a.username} className="w-full h-full"/>
        //         </div>
        //         <div className="flex ct-blog-owner-details" style={{ width: isMobile ? "fit-content" : "425px" }}>
        //             <span className="ct-blog-owner-label">Written By</span>
        //             <h3 className="ct-owner-name">{a.firstname && a.lastname ? `${a.firstname} ${a.lastname}` : a.username}</h3>
        //             <div className="ct-owner-description" dangerouslySetInnerHTML={{ __html: a.about }}/> 
        //             <div className="flex justify-start flex-row items-center mt-5">
        //                 {renderSocialLinks(a.socialLinks)}
        //             </div>
        //         </div>
        //     </div>
        // )
    }

    return (
        <div ref={articleDiv} className={activeTheme === "light" ? "" : "ct-blog-dark"}> 
            <BlogProgressBar scrollPos={`${scrollPos}%`} />
            {renderHeader()}
            <div className={isMobile ? "flex ct-blog-table-container" : isInboxView ? "flex justify-center ct-blog-table-container" : "flex justify-between ct-blog-table-container"}>
                {!isMobile && !isInboxView ? renderTableOfContents() : headers.length !== 0 && !isInboxView ? renderTableOfContentInPanel() : null}
                <div className="ct-blog-container">
                    <div className="ct-blog-content" style={getWidthObj(lineWidth)} ref={articleContent}>
                        <div className="ct-title-margin">
                            <h1 className="ct-blog-main-title" style={{ color: activeTheme === "dark" ? "#c1c7ce" : "#242424"}}>{blog.title}</h1>
                        </div>
                        {blog.description && <div>
                            <h2 className="ct-blog-description" style={{ color: activeTheme === "dark" ? "#c1c7ce" : "#6B6B6B"}}>{blog.description}</h2>
                        </div>}
                        <div className="ct-author-publisher flex items-center justify-between">
                            {blog.media?.articleObj?.author && 
                                <div className="ct-article-author-details flex items-center">
                                    <Avatar src={blog.media?.articleObj?.author?.profile || authorPhoto || null} className="">
                                        {blog?.media?.authorId ? blog?.media?.authorId?.charAt(0)?.toUpperCase() : blog.media?.articleObj?.author?.name?.charAt(0)?.toUpperCase()}
                                    </Avatar>
                                    <div className="ct-article-author-personal ml-2">
                                        <div className="ct-article-author-name">
                                            <div className="flex flex-row">
                                                <div className="ct-article-name">
                                                    {(blog?.media?.authorId || blog.media?.articleObj?.author?.url)
                                                        ? <a className="ct-article-author-url" href={blog?.media?.authorId ? `${process.env.NEXT_PUBLIC_BASE_URL}/u/${blog?.media?.authorId}` : blog?.media?.articleObj?.author?.url}>{blog?.media?.authorId || blog?.media?.articleObj?.author?.name}</a>
                                                        : <span>{blog.media?.articleObj?.author?.name}</span>
                                                    }
                                                </div>

                                                {session && blog?.author?.data?.id?.toString() !== session?.userId?.toString() && blog?.media_type === "Blog" && ( 
                                                    <div
                                                        className="text-[#347AE2] font-medium relative cursor-pointer ml-2 ct-fl-ctn"
                                                        onClick={following ? handleUnfollow : handleFollow}
                                                    >
                                                        {following ? "Unfollow" : "Follow"}
                                                        {followLoading && (
                                                            <div className="bg-blue-200 w-full h-full absolute left-0 top-0 rounded-lg flex justify-center items-center">
                                                            <Spin size="small" />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ct-article-read">
                                                {extraDetails?.content &&
                                                    <span className="mr-5">{`${readTime} ${totalWords < 1 ? " min read" : "mins read"}`}</span>
                                                }
                                                {(blog?.media?.publishedAt || blog.media?.articleObj?.datePublished) && 
                                                    <span>{moment(blog?.media?.publishedAt || blog.media?.articleObj?.datePublished).format("MMM DD, YYYY")}</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {blog.media?.articleObj?.publisher && 
                                <div className="ct-article-author-details flex items-center">
                                    <Avatar src={blog.media?.articleObj?.publisher?.logo?.url || blog.media?.articleObj?.publisher?.logo || null} size={"small"} shape="square">
                                        {blog.media?.articleObj?.publisher?.name?.charAt(0)?.toUpperCase()}
                                    </Avatar>
                                    <div className="ct-article-author-personal ml-2">
                                        <a className="ct-article-publisher-url" href={blog?.media?.articleObj?.publisher?.url}>{blog?.media?.articleObj?.publisher?.name}</a>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="ct-article-user-engagement">
                            {!isMobile && <div className={"ct-article-user"}>
                                <div className="flex flex-row items-center mr-5" onClick={onLikeBlog}>
                                    <AiOutlineHeart className="mr-2 w-[24px] h-[24px] ct-blog-cursor" />
                                    <span className="text-sm">{likeCount}</span>
                                </div>
                                <div className="flex flex-row items-center ct-blog-cursor mr-5" onClick={onCommentClick}>
                                    <FaRegCommentDots className="mr-2 w-[24px] h-[24px]" />
                                    <span className="text-sm">{commentCount}</span>
                                </div>
                                <div className="flex flex-row items-center ct-blog-cursor mr-5">
                                    <Tooltip title="Share with others">
                                        <Dropdown overlayStyle={{ width: "250px" }}
                                                trigger={["click"]}
                                                dropdownRender={() => renderShareDropdown()}
                                                onOpenChange={onShareClick}
                                                open={showShare}
                                                placement="bottomRight">
                                            <button
                                                className="w-[24px] h-[24px] rounded-md flex justify-center items-center"
                                            >
                                                <PiShareFat className="w-[24px] h-[24px]" />
                                            </button>
                                        </Dropdown>
                                    </Tooltip>
                                </div>
                                {blog?.author?.data?.id?.toString() !== session?.userId?.toString() && 
                                    <Dropdown
                                        overlayStyle={{ width: '250px' }}
                                        trigger={['click']}
                                        dropdownRender={() => (bookmarkAddRender())}
                                        onOpenChange={onSaveBookmarkClick}
                                        open={showAddBk}
                                        placement="bottomRight"
                                        onClick={async (e) => {
                                            e.stopPropagation()
                                            if(session && session?.userId){
                                                setLoading(true)
                                                collectionsAndItsCount === null && dispatch(fetchCollectionWiseCounts())
                                                const url = encodeURIComponent(blog?.url)
                                                const res = await dispatch(saveOtherGemInCollection(url))
                                                if(res){
                                                    setExistingCollectionSaved(res?.payload?.data?.message || [])
                                                    setLoading(false)
                                                }
                                            }
                                        }}
                                    >
                                        <div className='flex flex-row items-center ct-blog-cursor mr-5' >
                                            <BsBookmarkPlus className="w-[24px] h-[24px]" />
                                        </div>
                                    </Dropdown> 
                                }
                            </div>}
                            <div className="ct-article-actions">
                                <button 
                                    className="w-[24px] h-[24px] rounded-md flex justify-center items-center mr-5"
                                    onClick={() => { 
                                        if (!session.token) {
                                            dispatch(openAuthModal({
                                                open: true,
                                                action: 'login',
                                                extraInfo: {
                                                    trigger: 'signup',
                                                    username: uname,
                                                    id: sourceId,
                                                    module: module,
                                                    slug: slug
                                                  }
                                            }))
                                            return
                                        }
                                        setShowInformation(true)
                                    }}
                                    >
                                    <InformationCircleIcon className="w-[24px] h-[24px]" />
                                </button>
                                <button 
                                    className="w-[24px] h-[24px] rounded-md flex justify-center items-center mr-5"
                                    onClick={() => {
                                        if (!session.token) {
                                            dispatch(openAuthModal({
                                                open: true,
                                                action: 'login',
                                                extraInfo: {
                                                    trigger: 'signup',
                                                    username: uname,
                                                    id: sourceId,
                                                    module: module,
                                                    slug: slug
                                                  }
                                            }))
                                            return
                                        }
                                        setShowAnalytics(true)
                                    }}
                                    >
                                    <IoAnalytics className="w-[24px] h-[24px]" />
                                </button>
                                <button 
                                    className="w-[24px] h-[24px] rounded-md flex justify-center items-center mr-5"
                                    onClick={() => {
                                        if (!session.token) {
                                            dispatch(openAuthModal({
                                                open: true,
                                                action: 'login',
                                                extraInfo: {
                                                    trigger: 'signup',
                                                    username: uname,
                                                    id: sourceId,
                                                    module: module,
                                                    slug: slug
                                                  }
                                            }))
                                            return
                                        }
                                        setShowHighlights(true)
                                    }}
                                    >
                                    <FiEdit3 className="w-[24px] h-[24px]" />
                                </button>
                                {!isMobile && <Tooltip title="Fast Forward">
                                    <button
                                        onClick={onSpeedRow}
                                        className="w-[24px] h-[24px] rounded-md flex justify-center items-center mr-5"
                                    >
                                        <ForwardIcon className="w-[24px] h-[24px]" />
                                    </button>
                                </Tooltip>}
                                <Tooltip title="Listen">
                                    <button
                                        onClick={onReadArticle}
                                        className="w-[24px] h-[24px] rounded-md flex justify-center items-center mr-5"
                                    >
                                        <BsPlayCircle className="w-[24px] h-[24px]" />
                                    </button>
                                </Tooltip>
                                <Tooltip title="Text styling">
                                    <Dropdown overlayStyle={{ width: "300px" }}
                                            trigger={["click"]}
                                            dropdownRender={() => renderTextDropdown()}
                                            onOpenChange={onTextClick}
                                            open={showText}
                                            placement="bottomRight">
                                        <button
                                            className="w-[24px] h-[24px] rounded-md flex justify-center items-center mr-5"
                                        >
                                            <IoTextOutline className="w-[24px] h-[24px]" />
                                        </button>
                                    </Dropdown>
                                </Tooltip>
                                <Tooltip title="Set background">
                                    <Dropdown overlayStyle={{ width: "250px" }}
                                            trigger={["click"]}
                                            dropdownRender={() => renderColors()}
                                            onOpenChange={onColorPaletteClick}
                                            open={showColors}
                                            placement="bottomRight">
                                        <button
                                            className="w-[24px] h-[24px] rounded-md flex justify-center items-center mr-5"
                                        >
                                            <HiColorSwatch className="w-[24px] h-[24px]" />
                                        </button>
                                    </Dropdown>
                                </Tooltip>
                                <Tooltip title="Download as TEXT">
                                    <button
                                        onClick={onDownloadArticle}
                                        className="w-[24px] h-[24px] rounded-md flex justify-center items-center mr-5"
                                    >
                                        <MdOutlineFileDownload className="w-[24px] h-[24px]" />
                                    </button>
                                </Tooltip>
                                <Tooltip title={userCopyText}>
                                    <button
                                        onClick={onCopyToClipboard}
                                        className="w-[24px] h-[24px] rounded-md flex justify-center items-center"
                                    >
                                        <IoCopyOutline className="w-[24px] h-[24px]" />
                                    </button>
                                </Tooltip>
                                {/* <Tooltip title={isFull ? "Exit full screen" : "Open in full screen"}>
                                    <button
                                        onClick={onFullScreenClick}
                                        className="w-[24px] h-[24px] rounded-md flex justify-center items-center"
                                    >
                                        {isFull ? <MdOutlineFullscreenExit className="w-[24px] h-[24px]" /> : <AiOutlineFullscreen className="w-[24px] h-[24px]" />}
                                    </button>
                                </Tooltip> */}
                            </div>
                        </div>
                        <div className="ct-article-main-content" style={{
                            fontSize: `${readingFontSize}px`,
                            fontFamily: FONT_CLASSES[font],
                            lineHeight: readingLineHeight,
                            backgroundColor: activeTheme === "dark" ? "black" : currentBg,
                            color: activeTheme === "dark" ? "#c1c7ce" : "#242424"
                        }}>
                            {blog?.metaData?.defaultThumbnail && <div className="ct-article-cover-image">
                                <img src={blog?.metaData?.defaultThumbnail} alt="Blog cover image" />
                            </div>}
                            <div id="ct-blog-html" style={{ fontFamily: FONT_CLASSES[font] }} onMouseUp={onSelectingText}>
                            </div>
                            {blog?.media?.showAuthor && renderAuthorBlock()}
                            <div style={highlightStyle} className='absolute justify-start items-center z-50 px-1 gap-1 h-8 bg-white'>
                                {HIGHLIGHTED_COLORS.map( color => (
                                    <button key={color?.id} style={{ backgroundColor: color.bg }} onClick={() => onAddHighlight(color)} className={`h-5 w-5 rounded-full`}></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {!isInboxView && <div className="ct-flex-card"></div>}
            </div>
            {showAudioPlayer &&
                <div id='media-player' className={`${fetchingAudio ? 'justify-center' : ''} media-player-container`}>
                    {fetchingAudio ? (
                        <div className='flex justify-center items-center'>
                            <Spin size='small' tip="Loading audio.." />
                        </div>
                    ) : (
                        <>
                            <audio
                                controls
                                style={{ display: "none" }}
                                ref={audioRef}
                                id="audio-player-html"
                                onLoadedMetadata={onLoadedMetadata}
                            >
                                <source src={audioUrl} type="audio/mpeg" />
                            </audio>
                            <button id='close-player-handler' className='close-player' onClick={handleClosePlayer}>
                                <img src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/close.svg`} alt='Audio player close icon' />
                            </button>
                            <div id='drag-controller' className='info-container'>
                                <div>
                                    <span>Word</span>
                                    <span className='info-text'>{totalWords}</span>
                                </div>
                                <div>
                                    <span>Time</span>
                                    <span id='audio-total-duration' className='info-text'>{audioTime}</span>
                                </div>
                            </div>
                            <div className='player-section'>
                                <div className='player-control'>
                                    <button
                                        className='audio-ctrl-btn'
                                        id='audio-ctrl-btn'
                                        onClick={handleAudioPlayPause}
                                    >
                                        {audioPlaying ?
                                            <img id="pause-ctrl-icon" src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/pause-circle-fill.svg`} alt='Audio player pause icon' />
                                            :
                                            <img id="play-ctrl-icon" src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/play-button-solid.svg`} alt='Audio player play icon' />
                                        }

                                    </button >
                                    <span id='audio-current-time'>{audioCurrentTime}</span>
                                </div>
                                <div className='progress-box'>
                                    <input
                                        className='px-0'
                                        onChange={handleUpdateProgress}
                                        ref={progressRef}
                                        type='range'
                                        value={audioProgress}
                                    />
                                </div>
                                <div className='player-control'>
                                    <button onClick={handleDownloadAudio}>
                                        <img src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/download-alt.svg`} alt='Audio player file download icon' />
                                    </button>
                                    <button id='audio-playback-control' current-speed={audioSpeed} onClick={handleAudioSpeed}>
                                        <span id='audio-playback-speed' style={{ fontSize: "20px" }}>{audioSpeed}x</span>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>}
            {randombookmark.length > 0 && renderRelatedGems()}
            {showComment && <CommentDrawer
                  openDrawer={showComment}
                  hideCommentDrawer={(val) => setShowComment(val)}
                  selectedGem={blog?.id}
                  user={{ id: session.userId, username: session.username }}
                  onResponded={() => setCommentCount(parseInt(commentCount) + 1)}
            />}
            {renderSEODrawer()}
            {showEditGem && <SingleBookmarkDrawer
                setOpenDrawer={setShowEditGem}
                setGemSingleIdSingleId={() => true}
                openDrawer={showEditGem}
                gemSingleId={parseInt(gemId)}
                editPagesIn={
                  session ? session?.editPagesInSession : "side peek"
                }
                submit={onSubmitGem}
                page="bookmark"
                gemPublicView={gemPublicView}
                collectionId={blog?.collection_gems?.data?.id || ''}
                isSingleGemPage={true}
            />}
            {authModal?.open && <AuthModal
                  openModal={authModal?.open}
                  page={'single-gem-public'}
            />}
            {showReportBug && <ReportBugsModal showPopup={showReportBug} onCancel={() => setShowReportBug(false)} />}
            {isMobile && 
                <div
                    className={`z-100 flex bg-white p-2 border border-solid border-[#d3d3d3] w-fit rounded-md fixed ${!isInboxView ? 'bottom-14 left-1/2 transform -translate-x-1/2' : 'bottom-5 right-[90px]'}`}
                    style={{
                        boxShadow: "0px 3px 8px 0px rgba(15, 47, 100, 0.20)",
                    }}
                >
                    <div className="flex flex-row items-center mr-5" onClick={onLikeBlog}>
                        <AiOutlineHeart className="mr-2 w-[24px] h-[24px] ct-blog-cursor" />
                        <span className="text-sm">{likeCount}</span>
                    </div>
                    <div className="flex flex-row items-center ct-blog-cursor" onClick={onCommentClick}>
                        <FaRegCommentDots className="mr-2 w-[24px] h-[24px]" />
                        <span className="text-sm">{commentCount}</span>
                    </div> 
                    <div className="flex flex-row items-center ct-blog-cursor">
                        <Dropdown overlayStyle={{ width: "250px" }}
                                trigger={["click"]}
                                dropdownRender={() => renderShareDropdown()}
                                onOpenChange={onShareClick}
                                open={showShare}
                                placement="bottomRight">
                            <button
                                className="w-[24px] h-[24px] rounded-md flex justify-center items-center ml-5"
                            >
                                <PiShareFat className="w-[24px] h-[24px]" />
                            </button>
                        </Dropdown>
                    </div>
                    <Dropdown
                        overlayStyle={{ width: '250px' }}
                        trigger={['click']}
                        dropdownRender={() => (bookmarkAddRender())}
                        onOpenChange={onSaveBookmarkClick}
                        open={showAddBk}
                        placement="bottomRight"
                        onClick={async (e) => {
                            e.stopPropagation()
                            if(session && session?.userId){
                                setLoading(true)
                                collectionsAndItsCount === null && dispatch(fetchCollectionWiseCounts())
                                const url = encodeURIComponent(blog?.url)
                                const res = await dispatch(saveOtherGemInCollection(url))
                                if(res){
                                    setExistingCollectionSaved(res?.payload?.data?.message || [])
                                    setLoading(false)
                                }
                            }
                        }}
                    >
                        <div className='flex flex-row items-center ct-blog-cursor ml-5' >
                            <BsBookmarkPlus className="w-[24px] h-[24px]" />
                        </div>
                    </Dropdown>
                </div>
            }
            {!isExtensionExist && !isInboxView && !isMobile && <div className="fixed z-50 right-4 ct-bottom-4">
                <DownloadExtension />
            </div>}
            <TransactionFailedPopup />
            {showHighlights && 
                <Drawer open={showHighlights} 
                        onClose={() => { setShowHighlights(false) }}
                        width={isMobile ? "100%" : 500}
                        footer={null}
                        title="Highlights">
                    {allHighlights.length > 0 
                        ?   <div className='p-2'>
                                {allHighlights.map((h) => {
                                    return (<div className="mb-2" onClick={() => redirectToHighlight(h)}>
                                        {renderHighlight(h)}
                                    </div>)
                                })}
                            </div>
                        : <div className="text-center p-2">
                            <span>No highlight available</span>
                          </div>
                    }
                </Drawer>}
            {showAnalytics && 
                <Drawer open={showAnalytics}
                        onClose={() => { setShowAnalytics(false) }}
                        width={isMobile ? "100%" : 500}
                        footer={null}
                        title="Analytics"
                        >
                    <Dashboard isSticky={false} dashUrl={window.location.href} showClearFilter={false} isPagePadding={false} />
                </Drawer>
            }
            {showInformation && 
                <Drawer open={showInformation}
                        onClose={() => setShowInformation(false)}
                        width={isMobile ? "100%" : 500}
                        footer={null}
                        title="Site Information">
                    <InfoContainer url={blog?.url} 
                                   mediaType={blog?.media_type} 
                                   title={blog?.title} 
                                   socialFeed={blog?.socialfeed_obj} 
                                   mainBookmark={blog} />
                </Drawer>
            }
            {showExceedModal && <ExceedLimitModal />}
            <CookieConsent />
        </div>
    )
}

export default Blog