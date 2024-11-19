"use client";
import styles from  "./CollectionShared.module.css"
import dynamic from "next/dynamic";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios             from "axios";
import { FIELD_REQUIRED } from "@utils/messages";
import session from "@utils/session";
import {
  copyCollection,
  fetchCollectionWiseCounts,
  followCollection,
  getCustomFields,
  getFollowByMeCollection,
  getPublicCollectionFilterGems,
  getPublicCollectionTagsGems,
  getPublicShareCollection,
  unfollowCollection,
} from "@actions/collection";
import { Validator } from "@utils/validations";
import {
  TextMessage,
  defaultPropertyOrder,
  getBackgroundStyle,
} from "@utils/constants";
import { openAuthModal, publicSidebarSelected, setIsMobileSidebar, setIsMobileView, setPublicCollectionView } from "@actions/app";
import { followUser } from "@actions/following";
import { MagnifyingGlassIcon, ShareIcon } from "@heroicons/react/24/outline"
import slugify from "slugify";
import CustomizedHeaderComponent from "./CustomizedHeaderComponent";
import { PiCopy } from "react-icons/pi";
import { Tooltip } from "antd";
// import { message } from "antd";

const Spin         = dynamic(() => import("antd").then((m) => m.Spin ), { ssr: false });
const Modal        = dynamic(() => import("antd").then((m) => m.Modal ), { ssr: false });
const Avatar       = dynamic(() => import("antd").then((m) => m.Avatar ), { ssr: false });
const AntdButton   = dynamic(() => import("antd").then((m) => m.Button ), { ssr: false });
const Dropdown     = dynamic(() => import("antd").then((m) => m.Dropdown ), { ssr: false });
const message      = dynamic(() => import("antd").then((m) => m.message ), { ssr: false })


const CurateitLogo = dynamic(() => import("@components/common/CurateitLogo"), { ssr: false });
const Button = dynamic(() => import("@components/common/Button"), { ssr: false });
const Input = dynamic(() => import("@components/collectionCombobox/Input"), { ssr: false });
const Topbar = dynamic(() => import("@components/layouts/Topbar/Topbar"), { ssr: false });
const MadeWithCurateit = dynamic(() => import("@components/common/FloatingLogos/MadeWithCurateit"), { ssr: false });
const AuthModal = dynamic(() => import("@components/modal/AuthModal"), { ssr: false });
const CommentDrawer = dynamic(() => import("@components/drawers/CommentDrawer"), { ssr: false });
const Views = dynamic(() => import("@components/views/Views"), { ssr: false });
const CoverImageComponent = dynamic(() => import("@components/common/CoverImageComponent"), { ssr: false });
const AddBookmark = dynamic(() => import("@components/drawers/AddBookmark"), { ssr: false });
const CollectionSharedSidebar = dynamic(() => import("./CollectionSharedSidebar"), { ssr: false });
const SubCollectionComponent = dynamic(() => import("@components/common/SubCollectionComponent"), { ssr: false });
const DownloadExtension = dynamic(() => import("@components/common/FloatingLogos/DownloadExtension"), { ssr: false });
const SocialShare = dynamic(() => import("@components/socialShare/SocialShare"), { ssr: false });
const ViewComponent = dynamic(() => import("@components/layouts/Topbar/ViewComponent"), { ssr: false });
const ExceedLimitModal = dynamic(() => import("@components/modal/ExceedLimitModal"), { ssr: false });
const TransactionFailedPopup = dynamic(() => import("@components/common/FloatingLogos/TransactionFailedPopup"), { ssr: false });
const BreadCrumbCollection = dynamic(() => import("@components/common/BreadCrumbCollection"), { ssr: false });
const CookieConsent = dynamic(() => import("@components/cookie/CookieConsent"), { ssr: false });
const Image = dynamic(() => import("next/image"), { ssr: false });

// import "./CollectionShared.css"
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { Spin, Modal, message, Avatar, Button as AntdButton, Dropdown } from "antd";
// import { FIELD_REQUIRED } from "@utils/messages";
// import { useParams, usePathname, useRouter } from "next/navigation";
// import session from "@utils/session";
// import {
//   copyCollection,
//   fetchCollectionWiseCounts,
//   followCollection,
//   getCustomFields,
//   getFollowByMeCollection,
//   getPublicCollectionFilterGems,
//   getPublicCollectionTagsGems,
//   getPublicShareCollection,
//   unfollowCollection,
// } from "@actions/collection";
// import CurateitLogo from "@components/common/CurateitLogo";
// import { Validator } from "@utils/validations";
// import Button from "@components/common/Button";
// import Input from "@components/collectionCombobox/Input";
// import Topbar from "@components/layouts/Topbar/Topbar";
// import {
//   TextMessage,
//   defaultPropertyOrder,
//   getBackgroundStyle,
// } from "@utils/constants";
// import MadeWithCurateit from "@components/common/FloatingLogos/MadeWithCurateit";
// import AuthModal from "@components/modal/AuthModal";
// import CommentDrawer from "@components/drawers/CommentDrawer";
// import Views from "@components/views/Views";
// import { openAuthModal, publicSidebarSelected, setIsMobileSidebar, setIsMobileView, setPublicCollectionView } from "@actions/app";
// import { followUser } from "@actions/following";
// import slugify from "slugify";
// import CoverImageComponent from "@components/common/CoverImageComponent";
// import AddBookmark from "@components/drawers/AddBookmark";
// import CollectionSharedSidebar from "./CollectionSharedSidebar";
// import SubCollectionComponent from "@components/common/SubCollectionComponent";
// import DownloadExtension from "@components/common/FloatingLogos/DownloadExtension";
// import { ShareIcon } from "@heroicons/react/24/outline";
// import SocialShare from "@components/socialShare/SocialShare";
// import ViewComponent from "@components/layouts/Topbar/ViewComponent";
// import ExceedLimitModal from "@components/modal/ExceedLimitModal";
// import TransactionFailedPopup from "@components/common/FloatingLogos/TransactionFailedPopup";
// import BreadCrumbCollection from "@components/common/BreadCrumbCollection";
// import CookieConsent from "@components/cookie/CookieConsent";
// import Image from "next/image";

const CollectionShared = ({ defaultTitle }) => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { authModal,publicCollectionView,showExceedModal } = useSelector((state) => state.app);
  const { customFields, followedCollections } = useSelector(state => state.collections)
  const [bookmarks, setBookmarks] = useState([]);
  const [collectionData, setCollectionData] = useState([]);
  const [layout, setLayout] = useState(publicCollectionView || "moodboard");
  const [propertyOrder, setPropertyOrder] = useState([]);
  const [isPasswordAdded, setIsPasswordAdded] = useState(false);
  const [isPasswordVerified, setIsPasswordVerified] = useState(true);
  const [loadingState, setLoadingState] = useState(false);
  const [collectionIcon, setCollectionIcon] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const [openCommentDrawer, setOpenCommentDrawer] = useState(false);
  const [selectedGem, setSelectedGem] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [followLoading, setFollowLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [copyLoading, setCopyLoading] = useState(false);
  const [wallpaper, setWallpaper] = useState(null);
  const [collectionCoverImage, setCollectionCoverImage] = useState(null);
  const [imagePosition, setImagePosition] = useState(null);
  const [descriptionContent, setDescriptionContent] = useState(
    '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'
  );
  const [openDrawer, setOpenDrawer] = useState(false);

  const [mounted, setMounted] = useState(false);
  // const [subFolder, setSubFolder] = useState([]);
  const [shareSubFolder, setShareSubFolder] = useState(false);
  const [viewSubCollections, setViewSubCollections] = useState(true)
  const [isSubCollection, setIsSubCollection] = useState(false);

  const [showCopyCollectionIcon, setShowCopyCollectionIcon] = useState("")

  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [filterPage, setFilterPage] = useState(1);
  const [filterSelected, setFilterSelected] = useState(null);
  const [filterLoading, setFilterLoading] = useState(false);
  const [isExtensionExist, setIsExtensionExists] = useState(false)

  const observerRef = useRef(null);
  const observerFilterRef = useRef(null);
  const [filterHasMore, setFilterHasMore] = useState(false);

  const [allowUserSubmission, setAllowUserSubmission] = useState(true)
  const [showSocialIcons, setShowSocialIcons] = useState(true)
  const [collapsed, setCollapsed] = useState(false);
  const [openShare, setShowShare] = useState(false);
  const [parentData, setParentData] = useState([]);
  const [otherMediatypes, setOtherMediaTypes] = useState([]);

  //custom nav
  const [headerType, setHeaderType] = useState("default");
  const [headerPosition, setHeaderPosition] = useState("center");
  const [isHeaderSticky, setIsHeaderSticky] = useState(true);
  const [pagesItems, setPagesItems] = useState([]);
  const [showBreadcrumbs, setShowBreadcrumbs] = useState(true
  );
  const [showSearchButton, setShowSearchButton] = useState(true);
  const [showCurateitWatermark, setShowCurateitWatermark] = useState(true);
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showSignUpButton, setShowSignUpButton] = useState(true);

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

  const handleOpen = (flag) => {
    setShowShare(flag);
  };

  // const formatedNumber = (number) =>
  //   Intl.NumberFormat("en", {
  //     notation: "compact",
  //     maximumFractionDigits: 1,
  //   }).format(number);

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
    setMounted(true);
    function onDOMLoaded() {
      const element = document.getElementById("curateit-extension-installed")
      setIsExtensionExists(element !== null)
    }
    onDOMLoaded()
    if (session && session?.userId && followedCollections.length === 0) {
      dispatch(getFollowByMeCollection())
    }
    if (typeof window === "undefined") return;
    function handleResize() {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
        dispatch(setIsMobileView(true))
      } else {
        setIsMobile(false);
        dispatch(setIsMobileView(false))
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const getCall = async () => {
      if (page === 1) {
        setLoadingState(true);
      } else {
        setLoadingState(false);
      }
      setLoading(true);
      const res = await dispatch(getPublicShareCollection(id, page));
      setLoading(false);
      const uniquenData = [
        ...bookmarks,
        ...(res?.payload?.data?.data[0]?.bookmarks || []),
      ].filter(
        (value, index, self) =>
          index === self.findIndex((v) => v.id === value.id)
      );
      setBookmarks(uniquenData || []);
      if (
        res?.payload?.data?.totalCount <=
        bookmarks.length + res?.payload?.data?.data[0]?.bookmarks?.length
      ) {
        setHasMore(false);
      }
      if (page === 1) {
        setCollectionData(res?.payload?.data?.data || []);
        setCollectionIcon(res?.payload?.data?.data[0]?.avatar || '');
        // setSubFolder([res?.payload?.data?.data[0]] || []);
        setShareSubFolder(res?.payload?.data?.data[0]?.showSidebar ? true : false);
        setShowCopyCollectionIcon(res?.payload?.data?.data[0]?.allowCopy ? true : false);
        setAuthorName(res?.payload?.data?.data[0]?.author?.username || '');
        setFollowers(res?.payload?.data?.data[0]?.author?.follower || []);
        setProfilePhoto(res?.payload?.data?.data[0]?.author?.profilePhoto || '');
        setIsPasswordAdded(
          res?.payload?.data?.data[0]?.collectionPassword ? true : false
        );
        setAllowUserSubmission(res?.payload?.data?.data[0]?.allowUserSubmission ? true : false);
        setShowSocialIcons(res?.payload?.data?.data[0]?.showSocialIcons ? true : false);
        setWallpaper(res?.payload?.data?.data[0]?.wallpaper || "");
        setCollectionCoverImage(res?.payload?.data?.data[0]?.background || "");
        setOtherMediaTypes(res?.payload?.data?.data[0]?.otherSupportedMediaTypes || []);
        setHeaderType(
          res?.payload?.data?.data[0]?.siteConfig?.headerType || 'default'
        );
        setHeaderPosition(
          res?.payload?.data?.data[0]?.siteConfig?.headerPosition || 'center'
        );
        setIsHeaderSticky(
          res?.payload?.data?.data[0]?.siteConfig?.isHeaderSticky === true ? true : false
        );
        setPagesItems(res?.payload?.data?.data[0]?.siteConfig?.pagesItems || []);
        setShowBreadcrumbs(
          res?.payload?.data?.data[0]?.siteConfig?.showBreadcrumbs === false ? false : true
        );
        setShowSearchButton(
          res?.payload?.data?.data[0]?.siteConfig?.showSearchButton === false ? false : true
        );
        setShowCurateitWatermark(
          res?.payload?.data?.data[0]?.siteConfig?.showCurateitWatermark === false
            ? false
            : true
        );
        setShowLoginButton(
          res?.payload?.data?.data[0]?.siteConfig?.showLoginButton === false
            ? false
            : true
        );
        setShowSignUpButton(
          res?.payload?.data?.data[0]?.siteConfig?.showSignUpButton === false
            ? false
            : true
        );
        setImagePosition(
          res?.payload?.data?.data[0]?.background &&
            (res?.payload?.data?.data[0]?.background?.type === "upload" ||
              res?.payload?.data?.data[0]?.background?.type === "unsplash")
            ? res?.payload?.data?.data[0]?.background?.imagePosition
            : null
        );
        setDescriptionContent(
          res?.payload?.data?.data[0]?.description
            ? res?.payload?.data?.data[0]?.description
            : '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'
        );
        if (session.isPublicPasswordValidate) {
          setIsPasswordVerified(true);
          session.removeIsPublicPasswordValidate();
        } else {
          setIsPasswordVerified(
            res?.payload?.data?.data[0]?.collectionPassword ? false : true
          );
        }
        setViewSubCollections(res?.payload?.data?.data[0]?.publicSubCollection || "");
        setIsSubCollection(res?.payload?.data?.data[0]?.is_sub_collection || false);
        setLayout(res?.payload?.data?.data[0]?.currentPublicLayout  || "moodboard");
        setParentData(res?.payload?.data?.parentCollection || [])
        dispatch(getCustomFields(id))

      }
      setLoadingState(false);
    };

    if (hasMore && !loading && !isFilter) {
      getCall();
    }
  }, [id, dispatch, page]);

  //filter apis
  useEffect(() => {
    // if(filterPage === 1 || filterPage === 3) return;
    if(!filterSelected) return;

    if(filterSelected && filterSelected?.type === 'filter'){
      const getCall = async () => {
        // if (filterPage === 1) {
        //     setFilterLoading(true)
        //   } else {
        //     setFilterLoading(false)
        // }
        setLoading(true)
        const res = await dispatch(getPublicCollectionFilterGems(id,filterSelected?.value,filterPage))
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
    if(filterSelected && filterSelected?.type === 'tag'){
      const getCall = async () => {
        // if (filterPage === 1) {
        //   setFilterLoading(true)
        //   } else {
        //   setFilterLoading(false)
        // }
        setLoading(true)
        const res = await dispatch(getPublicCollectionTagsGems(id,filterSelected?.value,filterPage))
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
    const customData = (customFields && customFields.length>0 && customFields[0]?.customFieldObj && customFields[0].customFieldObj.length>0) ? customFields[0]?.customFieldObj : []

    const customDataMapped = customData.map(item => {
        return {
            name : item.name,
            type: item.type
        }
    })
    if (layout === "card") {
      const data = defaultPropertyOrder?.card?.propertyOrder;
      setPropertyOrder([...data,...customDataMapped]);
    }
    if (layout === "list") {
      const data = defaultPropertyOrder?.list?.propertyOrder;
      setPropertyOrder([...data,...customDataMapped]);
    }
    if (layout === "table") {
      const data = defaultPropertyOrder?.table?.propertyOrder;
      setPropertyOrder([...data,...customDataMapped]);
    }
    if (layout === "moodboard") {
      const data = defaultPropertyOrder?.moodboard?.propertyOrder;
      setPropertyOrder([...data,...customDataMapped]);
    }
    if (layout === "stream") {
      const data = defaultPropertyOrder?.stream?.propertyOrder;
      setPropertyOrder([...data,...customDataMapped]);
    }
    if (layout === "inbox") {
      const data = defaultPropertyOrder?.inbox?.propertyOrder;
      setPropertyOrder(data);
    }
  },[customFields,layout])

  //filter select
  const handleSelectFilterGem = async (type) => {
    setFilteredBookmarks([])
    setIsFilter(true)
    setFilterPage(1)
    setFilterSelected({
      type: 'filter',
      value: type
    })
    setFilterHasMore(true);
  }

  //tag select
  const handleSelectTagGem = async (tagId) => {
    if(!tagId){
      setFilteredBookmarks([])
      setIsFilter(true)
      setFilterPage(1)
      setFilterSelected({
        type: 'filter',
        value: 'tag'
      })
      setFilterHasMore(true);
    return;
    }
    setFilteredBookmarks([])
    setIsFilter(true)
    setFilterPage(1)
    setFilterSelected({
      type: 'tag',
      value: tagId
    })
    setFilterHasMore(true);
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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(
      Validator.validate("title", e.target.value, null, null, true)
    );
  };

  const handleSubmit = async () => {
    if (!password) {
      setPasswordError(FIELD_REQUIRED);
      return;
    }
    setLoadingState(true);
    setButtonLoading(true);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/collection/${id}/check-password`,
      { password }
    );
    setLoadingState(false);
    setButtonLoading(false);
    setPassword("");
    if (res.error === undefined && res.data?.status === 200) {
      setIsPasswordVerified(true);
      message.success("Password verified successfully");
    } else {
      setIsPasswordVerified(false);
      message.error("Password is incorrect");
    }
  };

  const handleLayout = (item) => {
    setLayout(item);
    dispatch(setPublicCollectionView(item))
  };

  const showComment = (id) => {
    setOpenCommentDrawer(true);
    setSelectedGem(id);
  };

  const handleCopyCollection = async () => {
    if (session && session?.userId) {
      setCopyLoading(true);
      const res = await dispatch(copyCollection(collectionData[0]?.id));
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
    if (session && session?.userId) {
      setFollowLoading(true);
      const data = {
        hierarchyLevel: "user",
        followerUserId: collectionData[0]?.author?.id,
      };
      dispatch(followUser(data)).then((res) => {
        if (res?.payload?.status === 200) {
          handleFollowAction("follow");
          setFollowLoading(false);
        } else {
          setFollowLoading(false);
        }
      });
    } else {
      dispatch(
        openAuthModal({
          open: true,
          action: "login",
          extraInfo: {
            trigger: 'userfollow',
            username: uname,
            id: sourceId,
            module: module,
            slug: slug
        }
        })
      );
    }
  };

  const handleOpenAdd = () => {
    setOpenDrawer(true)
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

const onUnfollowCollection = async () => {
  const res = await dispatch(unfollowCollection(id))
  if (res.error === undefined) {
    message.success("Collection unfollowed successfully.")
  }
  else {
    message.error("An error occured while following the collection")
  }
}

const onFollowCollection = async () => {
  const res = await dispatch(followCollection(id, { id: parseInt(id)}))
  if (res.error === undefined) {
    message.success("Collection followed successfully.")
  }
  else {
    message.error("An error occured while following the collection")
  }
}

const dropdownnRenderUI = () => {
    return (
      <div className="bg-white z-50 p-3 rounded-lg shadow-lg border-[0.5px]">
        <SocialShare
          collectionUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/u/${authorName}/c/${collectionData[0]?.id}/${collectionData?.[0]?.slug ||slugify((collectionData && collectionData[0]?.name) || 'default', { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}?public=true`}
          setShowShare={setShowShare}
          // showCopied={showCopied}
          // handleCopy={handleCopy} html={html}
        />
      </div>
    );
  };

  const renderCollectionContents = () => {
    return (
      <div className={`${isMobile ? 'px-4' : 'ct-px-5'}`}>  
            <div className={`${!isMobile && collapsed ? 'px-4' : ''}`}>
              <Topbar
                  title={defaultTitle}
                  page='collection-public-shared'
                  layout={layout}
                  handleLayout={handleLayout}
                  icon={collectionIcon || ''}
                  permissions={null}
                  checkedBookmark={[]}
                  // collectionUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/u/${authorName}/c/${collectionData[0]?.id}/${collectionData?.[0]?.slug ||slugify((collectionData && collectionData[0]?.name) || 'default', { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}?public=true`}
                  // handleCopyCollection={handleCopyCollection}
                  // showCopyCollectionIcon={showCopyCollectionIcon}
                  // copyLoading={copyLoading}
                  descriptionContent={descriptionContent}
                  shortDescription={(collectionData && collectionData[0]?.shortDescription) || null}
                  type='collection-public'
                  handleOpenAdd={handleOpenAdd}
                  showPublicAdd={((session && session?.userId?.toString()) !== (collectionData && collectionData[0]?.author?.id?.toString())) && allowUserSubmission}
                  isSubCollection={isSubCollection}
                  onFollowCollection={onFollowCollection}
                  onUnfollowCollection={onUnfollowCollection}
                  following={id && followedCollections.length !== 0 && followedCollections.findIndex((f) => f.id === parseInt(id)) !== -1}
                  // parentData={parentData}
              />
            </div>

            {
            filterLoading ? <div className={styles.ctPublicLoader}>
                <Spin size='middle' tip='Loading...'/>
            </div>
              :
            <>
            <div className="h-full rounded-md mt-1 pt-2">
            {
              viewSubCollections && 
                <div className="">
                  <SubCollectionComponent collectionId={id} fromPage='collection-public-shared' wallpaper={wallpaper} hideLoader={true} />
                </div>
            }

            <div 
                className="w-full py-2 mt-4"
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
                    collectionName={(collectionData && collectionData[0]?.name) || ''}
                    showSocialIcons={showSocialIcons}
                    viewSubCollections={viewSubCollections}
                />
            </div>

            </div>

            </>
            }
          </div>
    )
  }
const renderPage = () => {
  // return (<h1>Hellow</h1>)
  return (
    <>
      {headerType === "default" ? (
        <>
          <div
            className={`fixed top-0 bg-[#fcfcfd] z-[100] flex w-full items-center justify-between ${
              isMobile ? "p-2" : "pt-4 px-8 pb-1"
            }`}
          >
            {!isMobile && (
              <div className="w-full">
                <img
                  className={`object-scale-down h-[30px] cursor-pointer`}
                  src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo.png`}
                  alt="curateit"
                  onClick={() => {
                    if (session && session?.userId) {
                      router.push(`/u/${session?.username}/all-bookmarks`);
                    } else {
                      router.push(`/`);
                    }
                  }}
                />
              </div>
            )}
            {/* user details */}
            <div
              className={`flex items-center w-full group ${
                isMobile ? "" : "justify-center"
              }`}
            >
              {profilePhoto ? (
                <Avatar
                  src={
                    !profilePhoto.includes("/40x40")
                      ? profilePhoto.replace(
                          process.env.NEXT_PUBLIC_STATIC_S3_BASE_URL,
                          `${process.env.NEXT_PUBLIC_STATIC_S3_BASE_URL}/40x40`
                        )
                      : profilePhoto
                  }
                  size={40}
                  onClick={() => {
                    router.push(`/u/${authorName}`);
                  }}
                  className="cursor-pointer"
                />
              ) : (
                <Avatar
                  size={40}
                  style={{
                    color: "white",
                    backgroundColor: "#347ae2",
                  }}
                  onClick={() => {
                    router.push(`/u/${authorName}`);
                  }}
                  className="cursor-pointer"
                >
                  {authorName && authorName?.charAt(0)?.toUpperCase()}
                </Avatar>
              )}
              {/* ${isMobile ? 'mx-2' : 'ml-2 mr-8'} */}
              <div
                className={`flex flex-col items-center justify-center mx-2 cursor-pointer`}
              >
                <span
                  className="text-[#101828] font-medium text-base capitalize group-hover:underline group-hover:text-[#347AE2]"
                  onClick={() => {
                    router.push(`/u/${authorName}`);
                  }}
                >
                  {isMobile
                    ? collectionData[0]?.author?.firstname || authorName
                    : authorName}
                </span>

                {session?.userId?.toString() ===
                  collectionData[0]?.author?.id?.toString() ||
                followers?.some(
                  (element) => element.id === Number(session?.userId)
                ) ? (
                  <></>
                ) : (
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
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* {showSearchButton && <MagnifyingGlassIcon className="h-5 w-5" />} */}
              {showCopyCollectionIcon && !copyLoading && (
                <Tooltip
                  title={`${copyLoading ? "Copying..." : "Copy collection"}`}
                >
                  <PiCopy
                    className={`h-5 w-5 ml-1 ${
                      copyLoading
                        ? "text-gray-200 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    onClick={() => {
                      if (copyLoading) {
                        return;
                      } else {
                        handleCopyCollection();
                      }
                    }}
                  />
                </Tooltip>
              )}

              {/* login */}
              {session && session?.userId && !isMobile ? (
                <div className={`flex items-center w-full justify-end`}>
                  <AntdButton
                    type="primary"
                    className={`border-[#105FD3] bg-[#105FD3] hover:bg-[#105FD3] hover:border-[#105FD3] rounded mr-1`}
                    onClick={() =>
                      router.push(`/u/${session?.username}/all-bookmarks`)
                    }
                  >
                    {isMobile ? "Create" : "Create Your Own"}
                  </AntdButton>
                </div>
              ) : (
                <>
                  {isMobile ? (
                    <></>
                  ) : (
                    <div className={`flex items-center w-full justify-end`}>
                      <AntdButton
                        type="text"
                        className={`text-[#105FD3] hover:text-[#105FD3]`}
                        // onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/sign-up`)}
                        onClick={() =>
                          dispatch(
                            openAuthModal({
                              open: true,
                              action: "signup",
                              extraInfo: {
                                trigger: "createyourown",
                                username: uname,
                                id: sourceId,
                                module: module,
                                slug: slug,
                              },
                            })
                          )
                        }
                      >
                        Create Your Own
                      </AntdButton>

                      <AntdButton
                        className="mx-2 rounded border-[#105FD3] text-[#105FD3] hover:border-[#105FD3] hover:text-[#105FD3]"
                        onClick={() => {
                          dispatch(
                            openAuthModal({
                              open: true,
                              action: "login",
                            })
                          );
                        }}
                      >
                        Login
                      </AntdButton>
                      <AntdButton
                        type="primary"
                        className={`border-[#105FD3] bg-[#105FD3] hover:bg-[#105FD3] hover:border-[#105FD3] rounded`}
                        onClick={() => {
                          dispatch(
                            openAuthModal({
                              open: true,
                              action: "signup",
                              extraInfo: {
                                trigger: "signup",
                                username: uname,
                                id: sourceId,
                                module: module,
                                slug: slug,
                              },
                            })
                          );
                        }}
                      >
                        Sign up
                      </AntdButton>
                    </div>
                  )}
                </>
              )}
              {(session && session?.userId?.toString()) !==
                (collectionData && collectionData[0]?.author?.id?.toString()) &&
                allowUserSubmission &&
                isMobile && (
                  // <PlusIcon
                  //   className="h-5 w-5 cursor-pointer text-[#105FD3]"
                  //   onClick={handleOpenAdd}
                  // />
                  <AntdButton
                    type="primary"
                    className={`border-[#105FD3] bg-[#105FD3] hover:bg-[#105FD3] hover:border-[#105FD3] rounded mr-1`}
                    onClick={handleOpenAdd}
                  >
                    + Submit
                  </AntdButton>
                )}
            </div>

            {isMobile && (
              <div className="mx-2">
                <ViewComponent
                  page="collection-public-shared"
                  layout={layout}
                  handleLayout={handleLayout}
                  permissions={null}
                  type="collection-public"
                  isMobile={true}
                />
              </div>
            )}
            {isMobile && (
              <Dropdown
                overlayStyle={{ width: "250px" }}
                trigger={["click"]}
                dropdownRender={() => dropdownnRenderUI()}
                onOpenChange={handleOpen}
                open={openShare}
              >
                <AntdButton className="rounded-md" type="default">
                  <ShareIcon className="h-5 w-5 text-[#105FD3]" />
                </AntdButton>
              </Dropdown>
            )}
          </div>

          <hr
            className={`fixed w-full z-[100] h-[1px] border-[#E4E7EC] 
      ${
        !isMobile &&
        (session && session?.userId?.toString()) !==
          (collectionData && collectionData[0]?.author?.id?.toString())
          ? "top-[76px]"
          : !isMobile &&
            (session && session?.userId?.toString()) ===
              (collectionData && collectionData[0]?.author?.id?.toString())
          ? "top-[60px]"
          : isMobile &&
            (session && session?.userId?.toString()) !==
              (collectionData && collectionData[0]?.author?.id?.toString())
          ? "top-[72px]"
          : isMobile &&
            (session && session?.userId?.toString()) ===
              (collectionData && collectionData[0]?.author?.id?.toString())
          ? "top-[56px]"
          : ""
      }
          `}
          />

          <div
            className={`${
              !isMobile &&
              shareSubFolder &&
              !collapsed &&
              (session && session?.userId?.toString()) !==
                (collectionData && collectionData[0]?.author?.id?.toString())
                ? "ml-[250px] pb-4 pt-[76px] ct-pr-0"
                : !isMobile &&
                  shareSubFolder &&
                  !collapsed &&
                  (session && session?.userId?.toString()) ===
                    (collectionData &&
                      collectionData[0]?.author?.id?.toString())
                ? "pt-[60px] pb-4 ml-[250px]"
                : !isMobile &&
                  shareSubFolder &&
                  collapsed &&
                  (session && session?.userId?.toString()) !==
                    (collectionData &&
                      collectionData[0]?.author?.id?.toString())
                ? "pt-[76px] pb-4"
                : !isMobile &&
                  shareSubFolder &&
                  collapsed &&
                  (session && session?.userId?.toString()) ===
                    (collectionData &&
                      collectionData[0]?.author?.id?.toString())
                ? "pt-[60px] pb-4"
                : isMobile &&
                  (session && session?.userId?.toString()) !==
                    (collectionData &&
                      collectionData[0]?.author?.id?.toString())
                ? "p-2 pt-[72px]"
                : isMobile &&
                  (session && session?.userId?.toString()) ===
                    (collectionData &&
                      collectionData[0]?.author?.id?.toString())
                ? "p-2 pt-[56px]"
                : !isMobile &&
                  !shareSubFolder &&
                  (session && session?.userId?.toString()) !==
                    (collectionData &&
                      collectionData[0]?.author?.id?.toString())
                ? "p-2 pt-[76px]"
                : ""
            } ${bookmarks?.length < 5 ? "h-full" : ""}`}
          >
            {shareSubFolder && (
              <CollectionSharedSidebar
                authorName={authorName}
                isMobile={isMobile}
                collectionId={id}
                handleSelectFilterGem={handleSelectFilterGem}
                handleSelectTagGem={handleSelectTagGem}
                handleResetFilters={handleResetFilters}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                headerType={headerType}
                isOwnUser={
                  (session && session?.userId?.toString()) ===
                  (collectionData && collectionData[0]?.author?.id?.toString())
                    ? true
                    : false
                }
              />
            )}

            {showBreadcrumbs && parentData && parentData.length > 0 && (
              <div className="my-1">
                <BreadCrumbCollection
                  fromPage="collection-public-shared"
                  parentData={parentData}
                  type={"collection-public"}
                  title={(collectionData && collectionData[0]?.name) || ""}
                />
              </div>
            )}

            {collectionCoverImage && (
              <CoverImageComponent
                coverImage={collectionCoverImage}
                imagePosition={imagePosition}
              />
            )}

            {wallpaper?.type &&
              ["unsplash", "upload"].indexOf(wallpaper?.type) !== -1 && (
                <div
                  className={`${
                    !isMobile
                      ? styles.ctCollectionWallpaper
                      : styles.ctCollectionWallpaperMobile
                  } fixed w-full h-full top-[0px]`}
                >
                  <Image
                    className="h-full w-full z-0 absolute left-[25px]"
                    src={
                      wallpaper.icon?.includes("/1000x1000_cover")
                        ? wallpaper.icon
                        : wallpaper.icon?.replace(
                            process.env.NEXT_PUBLIC_STATIC_S3_BASE_URL,
                            `${process.env.NEXT_PUBLIC_STATIC_S3_BASE_URL}/1000x1000_cover`
                          )
                    }
                    alt={collectionData?.[0]?.name || "Collection Bg Image"}
                    layout="fill"
                    objectFit="cover"
                    sizes="100vh 100vw"
                    quality={100}
                    width={1000}
                    height={1000}
                    priority
                  />
                </div>
              )}
            {!loading &&
            !filterLoading &&
            ["unsplash", "upload"].indexOf(wallpaper?.type) === -1 ? (
              <div
                style={{
                  background: getBackgroundStyle(wallpaper, layout),
                }}
              >
                {renderCollectionContents()}
              </div>
            ) : (
              renderCollectionContents()
            )}

            {layout !== "inbox" && loading && (
              <div className={styles.ctPublicLoader}>
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
          </div>
        </>
      ) : (
        <>
          <CustomizedHeaderComponent
            alignment={headerPosition}
            isSticky={isHeaderSticky}
            items={pagesItems}
            collapsed={collapsed}
            isMobile={isMobile}
            uname={uname}
            moduleName={module}
            sourceId={sourceId}
            slug={slug}
            showCurateitWatermark={showCurateitWatermark}
            shareSubFolder={shareSubFolder}
            showLoginButton={showLoginButton}
            showSignUpButton={showSignUpButton}
            showSearchButton={showSearchButton}
            showCopyCollectionIcon={showCopyCollectionIcon}
          />

          <div
            className={`${
              isHeaderSticky && shareSubFolder && !isMobile && !collapsed
                ? "pt-[52px] ml-[250px]"
                : isHeaderSticky && shareSubFolder && !isMobile && collapsed
                ? "pt-[52px]"
                : isHeaderSticky && !shareSubFolder && !isMobile
                ? "pt-[52px]"
                : !isHeaderSticky && shareSubFolder && !isMobile && !collapsed
                ? "ml-[250px]"
                : !isHeaderSticky && shareSubFolder && !isMobile && collapsed
                ? ""
                : !isHeaderSticky && !shareSubFolder && !isMobile
                ? ""
                : isMobile && isHeaderSticky
                ? "ml-0 pt-[52px]"
                : isMobile && !isHeaderSticky
                ? "ml-0"
                : ""
            } ${bookmarks?.length < 5 ? "h-full" : ""}`}
          >
            {shareSubFolder && (
              <CollectionSharedSidebar
                authorName={authorName}
                isMobile={isMobile}
                collectionId={id}
                handleSelectFilterGem={handleSelectFilterGem}
                handleSelectTagGem={handleSelectTagGem}
                handleResetFilters={handleResetFilters}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                headerType={headerType}
                isOwnUser={
                  (session && session?.userId?.toString()) ===
                  (collectionData && collectionData[0]?.author?.id?.toString())
                    ? true
                    : false
                }
                isSticky={isHeaderSticky}
              />
            )}

            {showBreadcrumbs && parentData && parentData.length > 0 && (
              <div className="my-1">
                <BreadCrumbCollection
                  fromPage="collection-public-shared"
                  parentData={parentData}
                  type={"collection-public"}
                  title={(collectionData && collectionData[0]?.name) || ""}
                />
              </div>
            )}

            {collectionCoverImage && (
              <CoverImageComponent
                coverImage={collectionCoverImage}
                imagePosition={imagePosition}
              />
            )}

            {wallpaper?.type &&
              ["unsplash", "upload"].indexOf(wallpaper?.type) !== -1 && (
                <div
                  className={`${
                    !isMobile
                      ? styles.ctCollectionWallpaper
                      : styles.ctCollectionWallpaperMobile
                  } fixed w-full h-full top-[0px]`}
                >
                  <Image
                    className="h-full w-full z-0 absolute left-[25px]"
                    src={
                      wallpaper.icon?.includes("/1000x1000_cover")
                        ? wallpaper.icon
                        : wallpaper.icon?.replace(
                            process.env.NEXT_PUBLIC_STATIC_S3_BASE_URL,
                            `${process.env.NEXT_PUBLIC_STATIC_S3_BASE_URL}/1000x1000_cover`
                          )
                    }
                    alt={collectionData?.[0]?.name || "Collection Bg Image"}
                    layout="fill"
                    objectFit="cover"
                    sizes="100vh 100vw"
                    quality={100}
                    width={1000}
                    height={1000}
                    priority
                  />
                </div>
              )}
            {!loading &&
            !filterLoading &&
            ["unsplash", "upload"].indexOf(wallpaper?.type) === -1 ? (
              <div
                style={{
                  background: getBackgroundStyle(wallpaper, layout),
                }}
              >
                {renderCollectionContents()}
              </div>
            ) : (
              renderCollectionContents()
            )}

            {layout !== "inbox" && loading && (
              <div className={styles.ctPublicLoader}>
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
          </div>
        </>
      )}

      <CommentDrawer
        openDrawer={openCommentDrawer}
        hideCommentDrawer={(val) => setOpenCommentDrawer(val)}
        selectedGem={selectedGem}
        user={{ id: session?.userId, username: session?.username }}
      />

      {authModal?.open && (
        <AuthModal openModal={authModal?.open} page={"collection-public"} />
      )}
      {!isExtensionExist && !isMobile && (
        <div className="fixed z-50 right-4 ct-bottom-4">
          <DownloadExtension />
        </div>
      )}
      <TransactionFailedPopup />
      {showCurateitWatermark && (
        <div className="fixed z-50 right-4 bottom-4">
          <MadeWithCurateit />
        </div>
      )}

      {openDrawer && (
        <AddBookmark
          open={openDrawer}
          setOpen={setOpenDrawer}
          selectedMediaType={collectionData[0]?.media_type}
          selectedCollectionValue={{
            id: collectionData[0]?.id,
            name: collectionData[0]?.name,
          }}
          page="public"
          isLoggedIn={(session && session?.userId) || false}
          // isTypeAiPrompt={collectionData[0]?.media_type === "Ai Prompt" && collectionData[0]?.id === parseInt(process.env.NEXT_PUBLIC_AI_PROMPT_COLLECTION_ID)}
          isTypeAiPrompt={
            collectionData[0]?.media_type === "Ai Prompt" &&
            collectionData[0]?.id === parseInt(session?.aiPromptLibraryId)
          }
          otherMediatypes={otherMediatypes}
        />
      )}
      {showExceedModal && <ExceedLimitModal />}
      <CookieConsent />
    </>
  );
}



  if (!mounted) return <></>;

  return (
    <>
      {loadingState ? (
        <div className="h-screen w-full flex items-center justify-center">
          <Spin tip={"Loading..."} size="large" />
        </div>
      ) : isPasswordAdded && !isPasswordVerified ? (
        renderPasswordPopup()
      ) : (
        renderPage()
      )}
    </>
  );
};

export default CollectionShared;
