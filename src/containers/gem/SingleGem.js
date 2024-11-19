"use client";

import { Drawer, Layout, Spin, message } from "antd";
import { useEffect, useState } from "react";
import {
  getSharedCollections,
  getSingleBookmarkGem,
} from "@actions/collection";
import { setCurrentGem, updateGemSeoDetails } from "@actions/gems";
import { updateUser } from "@actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux";
// import ErrorPage from "../../components/error/ErrorPage";
import MainSidebar from "@components/sidebars/MainSidebar";
import SingleBookmarkDrawer from "@components/drawers/SingleBookmarkDrawer";
import CommentDrawer from "@components/drawers/CommentDrawer";
import GemSocialDetails from "./GemSocialDetails";
import session from "@utils/session";
import GemSideBar from "@components/GemProfile/GemSideBar";
import BookmarkPreviewDrawer from "@components/drawers/BookmarkPreviewDrawer";
import { getBookmarkPermissions } from "@utils/find-collection-id";
// import { getPageConfig } from "@actions/bookmark";
import GemDetails from "./GemDetails";
import MobileFooter from "@components/footer/MobileFooter";
import { setIsMobileView } from "@actions/app";
import AddBookmark from "@components/drawers/AddBookmark";
import { TextMessage } from "@utils/constants";
import MadeWithCurateit from "@components/common/FloatingLogos/MadeWithCurateit";
import AuthModal from "@components/modal/AuthModal";
import SEOModal from "@components/modal/SEOModal";
import DownloadExtension from "@components/common/FloatingLogos/DownloadExtension";
import RelatedGems from "@components/common/RelatedGems";
import TransactionFailedPopup from "@components/common/FloatingLogos/TransactionFailedPopup";
import CookieConsent from "@components/cookie/CookieConsent";
import RelatedCollection from "@components/common/RelatedCollection";

const { Content } = Layout;

const TEXT_BASED_MEDIA_TYPES = [
  "Ai Prompt",
  "Note",
  "Quote",
  "Text Expander",
]

const SingleGem = ({ gemPublicView = false, gemId,isFeedBackGem=false, allComments, items,isInboxView=false }) => {
  let width = 0;
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { drawerType,inboxViewUpdateData,authModal, isMobileView } = useSelector(state => state.app)
  // const { collectionsAndItsCount } = useSelector(state => state.collections)
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showSeo, setShowSeo] = useState(false);
  const [seoDetail, setSeoDetail] = useState(items?.attributes?.seo || null);
  const [bookmark, setBookmark] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [showError, setShowError] = useState(false);
  const [openAddToBookmarkDrawer, setOpenAddToBookmarkDrawer] = useState(false);
  const [openCommentDrawer, setOpenCommentDrawer] = useState(false);
  const [selectedTab, setSelectedTab] = useState("info");
  const [videoSeekTime, setVideoSeekTime] = useState(0);
  const [shrink, setShrink] = useState(false);
  const [openPagesIn, setOpenPagesIn] = useState(
    session ? session.openPagesInSession : ""
  );
  const [isMobile, setIsMobile] = useState(false);
  const [loadingSEO,setLoadingSEO] = useState(false)

  const [mounted, setMounted] = useState(false);
  const [isExtensionExist, setIsExtensionExists] = useState(false)
  const [altInfo, setAltInfo] = useState(items?.attributes?.altInfo || items?.attributes?.title || items?.attributes?.description || "")
  

    useEffect(() => {
      function onDOMLoaded() {
        const element = document.getElementById("curateit-extension-installed")
        setIsExtensionExists(element !== null)
      }
      onDOMLoaded()
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    function handleResize() {
        if (window.innerWidth <= 768) {
            setIsMobile(true)
            dispatch(setIsMobileView(true))
        } else {
            setIsMobile(false)
            dispatch(setIsMobileView(false))
        }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
}, []);
  const [permissions, setPermissions] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      width = window.innerWidth;
    }
  }, []);
  useEffect(() => {
    if(!isInboxView && gemId){
      setLoading(true);
    setBookmark(items || "");
    dispatch(setCurrentGem(items));
    if (items?.attributes?.url?.startsWith("https://www.youtube.com/")) {
      setSelectedTab("transcript");
    }
    setLoading(false);
    const getCall = async () => {
      const res1 = await dispatch(getSharedCollections());
      if (res1.error === undefined) {
        const { data } = res1?.payload?.data;
        const value = getBookmarkPermissions(data, Number(gemId));
        setPermissions(value);
      }
    };

    if(!gemPublicView){
      getCall();
    }
    }

    if((isInboxView && gemId) || (inboxViewUpdateData && inboxViewUpdateData?.type === 'edit')){
      setLoading(true);
      setShowError(false);
      const getCall = async () => {
        const res = await dispatch(getSingleBookmarkGem(gemId))
        if(res.error === undefined){
            setLoading(false)
            setBookmark(res?.payload?.data?.data || '')
            setSeoDetail(res?.payload?.data?.data?.attributes?.seo)
            dispatch(setCurrentGem(res?.payload?.data?.data))
            if (res?.payload?.data?.data?.attributes?.url?.startsWith("https://www.youtube.com/")){
                setSelectedTab("transcript");
            }
        }
        else {
          setShowError(true);
          setLoading(false)
        }

      if(!gemPublicView){
        const res1 = await dispatch(getSharedCollections())
          if(res1.error === undefined){
            const {data} = res1?.payload?.data;
            const value = getBookmarkPermissions(data,Number(gemId))
            setPermissions(value)
          }
      }
      }
      getCall();
    }

  }, [gemId,isInboxView,inboxViewUpdateData,gemPublicView]);

  const onCountUpdate = (updateObj) => {
    setBookmark({ ...updateObj })
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

  //   useEffect(() => {
  //   if (gemId) {
  //     setLoading(true);
  //     setShowError(false);
  //     const getCall = async () => {
  //       const res = await dispatch(getSingleBookmarkGem(gemId))
  //       if(res.error === undefined){
  //           setLoading(false)
  //           setBookmark(res?.payload?.data?.data || '')
  //           dispatch(setCurrentGem(res?.payload?.data?.data))
  //           if (res?.payload?.data?.data?.attributes?.url?.startsWith("https://www.youtube.com/")){
  //               setSelectedTab("transcript");
  //           }
  //         getRandomGems();
  //       }
  //       else {
  //         setShowError(true);
  //         setLoading(false)
  //       }

  //     const res1 = await dispatch(getSharedCollections())
  //     if(res1.error === undefined){
  //       const {data} = res1?.payload?.data;
  //       const value = getBookmarkPermissions(data,Number(gemId))
  //       setPermissions(value)
  //     }
  //     }
  //     getCall()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [gemId]);


  const handleChangeCollapse = (type) => {
    setCollapsed(type);
  };

  const videoSeekTo = (time) => {
    setVideoSeekTime(time);
  };

  const handleShowAddToBookmark = () => {
    setOpenAddToBookmarkDrawer(true);
  };

  const handleOpenPagesIn = async (item) => {
    if (item === "full page") {
      setShrink(false);
    }
    setOpenPagesIn(item);
    session.setOpenPagesInSession(item);
    const data = {
      openPagesIn: item,
    };

    dispatch(updateUser(data));
  };

  const showComment = () => {
    setSelectedTab("comment");
    setCollapsed(false);
  };


  const editClicked = () => {
    setShowEdit((prev) => !prev);
  };

  const openPreview = () => {
    setIsPreviewVisible(true);
  };

  const submit = () => {
    if (gemId) {
      setLoading(true);
      dispatch(getSingleBookmarkGem(gemId)).then((res) => {
        if (res?.payload?.data?.data?.id) {
          setBookmark(res?.payload?.data?.data);
        } else {
          alert("Gem not found!");
        }
        setLoading(false)
      });
    }
  };

  const renderSEODrawer = () => {
    return (<Drawer footer={null} 
                    title="SEO" 
                    open={showSeo} 
                    onClose={() => setShowSeo(false)}
                    width={isMobileView ? '90%' : '460px'}
                    maskClosable={false}
                    bodyStyle={{padding: isMobileView ? '24px 8px' : '24px'}}
                    >
      <SEOModal
        onSubmit={onSEOUpdate} 
        seoObj={seoDetail || null}
        defaultImg={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`} 
        isMobile={isMobile}
        loading={loadingSEO}
        baseDetails={{ id: gemId, type: "g" }}
        existingThumbnails={bookmark?.attributes?.metaData?.docImages}
        typeId={bookmark?.id}
        type="gem"
        showAltInfo={TEXT_BASED_MEDIA_TYPES.indexOf(bookmark?.attributes?.media_type) === -1}
        altInfo={altInfo}
      />
    </Drawer>)
  }

  if (!mounted) return <></>;

  return (
    <>
      {loading ? (
        <div className="spinDiv">
          <Spin size="middle" tip="Loading..." />
        </div>
      ) : (
        <>
          {showError ? (
            // <ErrorPage message="Bookmark not found" />
            ""
          ) : (
            <Layout style={{ minHeight: "100vh" }} className="ct-pure-white">
              {session &&
                session.openPagesInSession === "full page" &&
                !isInboxView && (
                  <>
                    {isMobile ? (
                      <MobileFooter
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                        coverImage={false}
                      />
                    ) : (
                      <MainSidebar
                        setCollapsed={setCollapsed}
                        page="singleGem"
                      />
                    )}
                  </>
                )}
              <Layout className="ct-pure-white">
                <Content
                  style={{
                    // background: "#FCFCFD"
                    backgroundColor: "rgba(255,255,255,.8)",
                  }}
                >
                  <div
                    className={`${
                      session &&
                      session.openPagesInSession === "full page" &&
                      !isInboxView
                        ? isMobile
                          ? "ml-[5px]"
                          : "ml-[50px]"
                        : "ml-0"
                    } flex flex-col pb-28 lg:pb-0`}
                  >
                    <GemDetails
                      id={gemId}
                      collapsed={collapsed}
                      bookmark={bookmark}
                      editClicked={editClicked}
                      openPreview={openPreview}
                      handleShowAddToBookmark={handleShowAddToBookmark}
                      showComment={showComment}
                      videoSeekTime={videoSeekTime}
                      permissions={permissions}
                      gemPublicView={gemPublicView}
                      videoSeekTo={videoSeekTo}
                      isInboxView={isInboxView}
                      onSEOShow={() => setShowSeo(true)}
                      onCountUpdate={onCountUpdate}
                      isFeedBackGem={isFeedBackGem}
                      allComments={allComments}
                    />
                    {!isFeedBackGem && (
                      <RelatedCollection gemId={gemId} gemPublicView={gemPublicView}/>
                    )}
                    {!isFeedBackGem && (
                      <div className="px-4">
                        <RelatedGems
                          bookmark={bookmark}
                          handleShowAddToBookmark={handleShowAddToBookmark}
                          shrink={shrink}
                          setShrink={setShrink}
                          gemPublicView={gemPublicView}
                          openPagesIn={openPagesIn}
                          handleOpenPagesIn={handleOpenPagesIn}
                          showComment={showComment}
                          gemId={gemId}
                        />
                      </div>
                    )}
                  </div>

                  <div
                    className={`z-100 bg-white p-2 border border-solid border-[#d3d3d3] w-fit rounded-md fixed ${
                      !isInboxView
                        ? "bottom-14 left-1/2 transform -translate-x-1/2"
                        : "bottom-5 right-[90px]"
                    }`}
                    style={{
                      boxShadow: "0px 3px 8px 0px rgba(15, 47, 100, 0.20)",
                    }}
                  >
                    <GemSocialDetails
                      gem={{ id: bookmark?.id, ...bookmark?.attributes }}
                      showBookmark={
                        bookmark?.attributes?.author?.data?.id?.toString() !==
                        session?.userId?.toString()
                      }
                      user={bookmark?.attributes?.author?.data?.attributes}
                      setOpenCommentDrawer={setOpenCommentDrawer}
                    />
                  </div>

                  {!isExtensionExist && !isMobile && (
                    <div className="fixed z-50 right-4 ct-bottom-4">
                      <DownloadExtension />
                    </div>
                  )}
                  <TransactionFailedPopup />
                  {gemPublicView && (
                    <div className="fixed z-50 right-4 bottom-4">
                      <MadeWithCurateit />
                    </div>
                  )}

                  {authModal?.open && (
                    <AuthModal
                      openModal={authModal?.open}
                      page={"single-gem-public"}
                    />
                  )}
                </Content>
              </Layout>

              {/* more details sidebar */}
              <div className="hidden md:block">
                <GemSideBar
                  bookmark={bookmark}
                  collapsed={collapsed}
                  handleChangeCollapse={handleChangeCollapse}
                  selectedTab={selectedTab}
                  isSidebar={true}
                  videoSeekTo={videoSeekTo}
                  gemPublicView={gemPublicView}
                />
              </div>
              {/* SEO */}
              {renderSEODrawer()}
              {showEdit && (
                <SingleBookmarkDrawer
                  setOpenDrawer={setShowEdit}
                  setGemSingleIdSingleId={() => true}
                  openDrawer={showEdit}
                  gemSingleId={bookmark?.id}
                  editPagesIn={
                    session ? session?.editPagesInSession : "side peek"
                  }
                  submit={submit}
                  page="bookmark"
                  gemPublicView={gemPublicView}
                  collectionId={
                    bookmark?.attributes?.collection_gems?.data?.id || ""
                  }
                  isSingleGemPage={true}
                />
              )}
              {isPreviewVisible && (
                <BookmarkPreviewDrawer
                  isPreviewVisible={isPreviewVisible}
                  setIsPreviewVisible={setIsPreviewVisible}
                  previewBookmark={{
                    id: bookmark?.id,
                    ...bookmark?.attributes,
                  }}
                  setPreviewBookmark={() => true}
                />
              )}
              {/* {openAddToBookmarkDrawer &&
        <AddBookmarkDrawer
          setOpenDrawer={setOpenAddToBookmarkDrawer}
          setGemSingleIdSingleId={() => true}
          openDrawer={openAddToBookmarkDrawer}
          gemSingleId={bookmark?.id}
          submit={submit}
          page='bookmark'
          collectionData={collectionsAndItsCount}
        />} */}

              {openCommentDrawer && (
                <CommentDrawer
                  openDrawer={openCommentDrawer}
                  hideCommentDrawer={(val) => setOpenCommentDrawer(val)}
                  selectedGem={bookmark?.id}
                  user={{ id: session.userId, username: session.username }}
                />
              )}

              {drawerType === "bookmark" && (
                <AddBookmark open={drawerType === "bookmark"} />
              )}
              <CookieConsent />
            </Layout>
          )}
        </>
      )}
    </>
  );
};

export default SingleGem;
