"use client";
import "./BlogPage.css";
import { Drawer, Layout, Spin, message, Typography, notification } from "antd";
import { debounce } from "@components/common/TextEditor/utils/debounce";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
//   getRandomBookmarkGem,
  getSharedCollections,
  getSingleBookmarkGem,
  updateGem,
} from "@actions/collection";
import { setCurrentGem, updateBlog, updateGemSeoDetails } from "@actions/gems";
// import { updateUser } from "@actions/user";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";
// import ErrorPage from "../../components/error/ErrorPage";
import MainSidebar from "@components/sidebars/MainSidebar";
import SingleBookmarkDrawer from "@components/drawers/SingleBookmarkDrawer";
// import CommentDrawer from "@components/drawers/CommentDrawer";
// import GemSocialDetails from "./GemSocialDetails";
import session from "@utils/session";
// import GemSideBar from "@components/GemProfile/GemSideBar";
// import MoodboardView from "@components/views/MoodboardView";
// import BookmarkPreviewDrawer from "@components/drawers/BookmarkPreviewDrawer";
import { getBookmarkPermissions } from "@utils/find-collection-id";
// import { getPageConfig } from "@actions/bookmark";
// import GemDetails from "./GemDetails";
import MobileFooter from "@components/footer/MobileFooter";
import { setIsMobileView } from "@actions/app";
import AddBookmark from "@components/drawers/AddBookmark";
import { TextMessage } from "@utils/constants";
import MadeWithCurateit from "@components/common/FloatingLogos/MadeWithCurateit";
import AuthModal from "@components/modal/AuthModal";
import SEOModal from "@components/modal/SEOModal";
import GemHeader from "./GemHeader";
import Editor from "@components/common/TextEditor/Editor";
import HeaderComponent from "@components/layouts/InnerHeader";
import ImageModal from "@components/modal/ImageModal";
import DownloadExtension from "@components/common/FloatingLogos/DownloadExtension";
import ExceedLimitModal from "@components/modal/ExceedLimitModal";
import SingleBlogPage from "./SingleBlogPage";
import { PencilIcon } from "@heroicons/react/24/outline";
import { extractText } from "@utils/commonFunctions";
import TransactionFailedPopup from "@components/common/FloatingLogos/TransactionFailedPopup";
import CookieConsent from "@components/cookie/CookieConsent";
import RelatedCollection from "@components/common/RelatedCollection";
import RelatedGems from "@components/common/RelatedGems";

const { Content } = Layout;
const { Paragraph } = Typography;

const DEFAULT_STATUS = {
    dark_mode : false,
    showFontSize: false,
    showFontFamily: false,
    showColorPallate: false
}

const BlogPage = ({ gemPublicView = false, gemId, items,isInboxView=false }) => {
    let width = 0;
    const dispatch = useDispatch();
    const imageRef = useRef(null);
    const navigate = useRouter()
    const searchParams = useSearchParams()
    //   const { drawerType,inboxViewUpdateData,authModal, isMobileView } = useSelector(state => state.app)
    const { drawerType,inboxViewUpdateData,authModal, isMobileView, showExceedModal } = useSelector(state => state.app)
    const [collapsed, setCollapsed] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showSeo, setShowSeo] = useState(false);
    const [setting, setSetting] = useState(DEFAULT_STATUS);
    const [seoDetail, setSeoDetail] = useState(items?.attributes?.seo || null);
    const [bookmark, setBookmark] = useState({});
    const [showEdit, setShowEdit] = useState(false);
    const [descriptionContent, setDescriptionContent] = useState(items?.attributes?.media?.blogContent || '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}');
    const [permissions, setPermissions] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [loadingSEO,setLoadingSEO] = useState(false)
    const [isDragging, setIsDragging] = useState(false);
    const [repositionMode, setRepositionMode] = useState(false);
    const [openCoverModal, setOpenCoverModal] = useState(false);
    const [showError, setShowError] = useState(false);
    const [openImageDialogTab, setCurrentImageTab] = useState(null)
    const [imagePosition, setImagePosition] = useState(items?.attributes?.media?.blogBanner?.imagePosition || { x: 50, y: 50 });
    const [isSaving, setIsSaving] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isExtensionExist, setIsExtensionExists] = useState(false)
    // const [authorChecked,
    //        setAuthorChecked]    = useState(items?.attributes?.media?.showAuthor || false)
    const [altInfo, setAltInfo] = useState(items?.attributes?.altInfo || items?.attributes?.title || items?.attributes?.description || "")
    const [isEditMode, setIsEditMode] = useState(searchParams.get("isEdit") === 'true' ? true : false)
    const [blogStatus, setBlogStatus] = useState(items?.attributes?.media?.status || "Draft")
    const [coverSize, setCoverSize] = useState(items?.attributes?.media?.blogBanner?.size || "default");

    useEffect(() => {
        function onDOMLoaded() {
            const element = document.getElementById("curateit-extension-installed")
            setIsExtensionExists(element !== null)
        }
        onDOMLoaded()
        setMounted(true);
        if (typeof window === 'undefined') return;
        width = window.innerWidth;
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

    useEffect(() => {
        if (!isInboxView && gemId) {
            setLoading(true);
            setBookmark(items || "");
            dispatch(setCurrentGem(items));
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
                    setDescriptionContent(res?.payload?.data?.data?.attributes?.blogContent || '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}');
                    setSeoDetail(res?.payload?.data?.data?.attributes?.seo)
                    dispatch(setCurrentGem(res?.payload?.data?.data))
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

    const editClicked = () => {
        setShowEdit((prev) => !prev);
    };

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

    const onContentChange = async (content) => {
        const parsedData = JSON.parse(content);
        const textContent = extractText(parsedData.root);
        const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
        const wordsPerMinute = 200;
        const estimatedReadingTime = Math.ceil(wordCount / wordsPerMinute);
        const payload = {
            ...bookmark?.attributes?.media,
            publishedContent: bookmark?.attributes?.media?.publishedContent || null,
            blogContent: content,
            readTime: estimatedReadingTime,
            status: "Draft"
        }
        setIsSaving(true);
        notification.info({ message: "Saving...", duration: 2, style: {width: "fit-content" }, placement: "bottomRight" })
        const res = await dispatch(updateBlog({ media: payload }, gemId))
        setIsSaving(false);
        if (res.error === undefined) {
            setBlogStatus("Draft")
            setBookmark({ ...bookmark, attributes: { ...bookmark.attributes, media: payload } })
        }
        setDescriptionContent(content);
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

    const handleRepositionMode = () => {
        setRepositionMode(true)
    }

    const handleCancelPosition = () => {
        setIsDragging(false);
        setRepositionMode(false);
        setImagePosition({ x: bookmark?.attributes?.media?.blogBanner?.imagePosition?.x || 50, y: bookmark?.attributes?.media?.blogBanner?.imagePosition?.y || 50 })
    }

    const handleSaveReposition = async () => {
        const payload = {
            ...bookmark?.attributes?.media,
            blogBanner: {
                type: bookmark?.attributes?.media?.blogBanner?.type,
                icon: bookmark?.attributes?.media?.blogBanner?.icon,
                imagePosition: { x: imagePosition.x, y: imagePosition.y }
            },
        }

        const res = await dispatch(updateBlog({ media: payload }, gemId))
        if (res.error === undefined) {
            setBookmark({ ...bookmark, attributes: { ...bookmark.attributes, media: payload } })
            setRepositionMode(false)
            setIsDragging(false)
        } else {
            setRepositionMode(false)
            setIsDragging(false)
        }
    }

    const handleOpenCoverModal = () => {
        setOpenCoverModal(true)
        setCurrentImageTab('cover')
    }

    const onImageDialogClose = () => {
        setOpenCoverModal(false)
        setCurrentImageTab(null)
    }

    const onThumbnailSelect = async (thumbnail) => {
        const metaDataPayload = {
            ...bookmark?.attributes?.metaData,
            defaultThumbnail: thumbnail?.icon || null,
            docImages: thumbnail?.icon ? [ thumbnail.icon, ...bookmark?.attributes?.metaData?.docImages ] : [ ...bookmark?.attributes?.metaData?.docImages ],
            covers: thumbnail?.icon ? [ thumbnail.icon, ...bookmark?.attributes?.metaData?.covers ] : [ '', ...bookmark?.attributes?.metaData?.covers ]
        }
        const mediaPayload = {
            ...bookmark?.attributes?.media,
            blogBanner: thumbnail
        }
        const res = await dispatch(updateBlog({ metaData: metaDataPayload, media: mediaPayload }, gemId))
        if (res.error === undefined) {
            setBookmark({ ...bookmark, attributes: { ...bookmark.attributes, metaData: metaDataPayload, media: mediaPayload } })
        }
        setOpenCoverModal(false)
    }

    const handleSaveCoverSize = async (value) => {
      setCoverSize(value);
      const mediaPayload = {
        ...bookmark?.attributes?.media,
        blogBanner: {
          ...bookmark?.attributes?.media?.blogBanner,
          size: value
        },
      };
      const res = await dispatch(
        updateBlog({ media: mediaPayload }, gemId)
      );
      if (res.error === undefined) {
        setBookmark({
          ...bookmark,
          attributes: {
            ...bookmark.attributes,
            media: mediaPayload,
          },
        });
      }
      setOpenCoverModal(false); 
    }

    const onIconSelect = async (icon) => {
        const payload = {
            ...bookmark?.attributes?.metaData,
            defaultIcon: icon?.icon,
            icon
        }
        const res = await dispatch(updateBlog({ metaData: payload }, gemId))
        if (res.error === undefined) {
            setBookmark({ ...bookmark, attributes: { ...bookmark.attributes, metaData: payload } })
        }
        setOpenCoverModal(false)
    }

    // const onAuthorDisplayChanged = async (checked) => {
    //     const payload = {
    //         ...items?.attributes?.media,
    //         showAuthor: checked
    //     }
    //     const res = await dispatch(updateBlog({ media: payload }, gemId))
    //     if (res.error === undefined) {
    //         message.success(checked ? "Author details is now visible" : "Author details is now hided")
    //     }
    //     setAuthorChecked(checked)
    // }

    const submit = () => {
        if (gemId) {
            setLoading(true);
            dispatch(getSingleBookmarkGem(gemId)).then((res) => {
                setLoading(false)
                if (res?.payload?.data?.data?.id) {
                    setBookmark(res?.payload?.data?.data);
                    setBlogStatus(res?.payload?.data?.data?.attributes?.media?.status || "Draft")
                    setDescriptionContent(res?.payload?.data?.data?.attributes?.media?.blogContent || '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}');
                }
            });
        }
    };

    const debouncedOnChange = debounce(onContentChange, 700);

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
            baseDetails={{ id: gemId, type: "g" }}
            defaultImg={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`} 
            isMobile={isMobile}
            loading={loadingSEO}
            existingThumbnails={bookmark?.attributes?.metaData?.docImages}
            typeId={bookmark?.id}
            type="gem"
            showAltInfo={true}
            altInfo={altInfo}
            />
        </Drawer>)
    }

    if (!mounted) return <></>;

    if (!isEditMode && bookmark) {
        return (
          <>
            <SingleBlogPage
              items={{ ...bookmark.attributes, id: bookmark.id }}
              gemPublicView={gemPublicView}
              gemId={gemId}
              onModeChange={() => {
                setIsEditMode(true);
              }}
              isPreviewMode={true}
            />
            <RelatedCollection gemId={gemId} gemPublicView={gemPublicView} />
            <div className="px-4">
                <RelatedGems
                  bookmark={bookmark}
                  gemPublicView={gemPublicView}
                  gemId={gemId}
                />
            </div>
          </>
        );
    }

    return (
      <>
        {loading ? (
          <div className="spinDiv">
            <Spin size="middle" tip="Loading..." />
          </div>
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
                    <MainSidebar setCollapsed={setCollapsed} page="singleGem" />
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
                  <GemHeader
                    bookmark={bookmark}
                    editClicked={editClicked}
                    permissions={permissions}
                    gemPublicView={gemPublicView}
                    setting={setting}
                    onSEOShow={() => setShowSeo(true)}
                    setSetting={setSetting}
                    isInboxView={isInboxView}
                    blogStatus={blogStatus}
                    isBlogEditorMode={isEditMode}
                    onBlogStatusChange={setBlogStatus}
                    // blogAuthorChecked={authorChecked}
                    // onAuthorDisplayChanged={onAuthorDisplayChanged}
                    onModeChange={() => {
                      setIsEditMode(false);
                      if (searchParams.get("isEdit") === "true") {
                        navigate.push(
                          `/u/${bookmark?.attributes?.author?.data?.attributes?.username}/g/${gemId}/${bookmark?.attributes?.slug}`
                        );
                      }
                    }}
                  />
                  {bookmark?.attributes?.media?.blogBanner ? (
                    <>
                      <HeaderComponent
                        coverImage={bookmark?.attributes?.media?.blogBanner}
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
                        isLeftMargin={false}
                        divPosition="absolute"
                        loading={loading}
                        imageRef={imageRef}
                      />
                      <div className="flex justify-center items-center flex-col">
                        <div className="px-4 mt-4 ct-editor-max-width">
                          <div className="flex items-center justify-between">
                            <Typography.Title
                              level={1}
                              className="text-lg font-semibold text-custom-black ct-blog-edit-title"
                              editable={{
                                icon: (
                                  <PencilIcon className="h-3 w-3 text-gray-500" />
                                ),
                                onChange: async (value) => {
                                  if (value !== bookmark?.attributes?.title) {
                                    const payload = {
                                      title: value,
                                    };
                                    const res = await dispatch(
                                      updateGem(gemId, { data: payload })
                                    );
                                    if (res.error === undefined) {
                                      setBookmark({
                                        ...bookmark,
                                        attributes: {
                                          ...bookmark.attributes,
                                          title: value,
                                        },
                                      });
                                      message.success(
                                        "Gem updated successfully"
                                      );
                                    }
                                  }
                                },
                              }}
                            >
                              {(bookmark?.attributes?.title &&
                              bookmark?.attributes?.title.length > 150
                                ? bookmark?.attributes?.title.substring(
                                    0,
                                    150
                                  ) + "..."
                                : bookmark?.attributes?.title) || "No Title"}
                            </Typography.Title>
                            {/* <h1 className='text-lg font-semibold text-custom-black'>
                                            </h1> */}
                            {/* {isSaving ? <label>Saving ...</label> : null} */}
                          </div>
                          <Paragraph
                            className="text-sm text-gray-700 mb-2"
                            ellipsis={{
                              rows: 2,
                              expandable: true,
                              symbol: "Read More",
                            }}
                            editable={{
                              icon: (
                                <PencilIcon className="h-3 w-3 text-gray-500" />
                              ),
                              onChange: async (value) => {
                                if (
                                  value !== bookmark?.attributes?.description
                                ) {
                                  const payload = {
                                    description: value,
                                  };
                                  const res = await dispatch(
                                    updateGem(gemId, { data: payload })
                                  );
                                  if (res.error === undefined) {
                                    setBookmark({
                                      ...bookmark,
                                      attributes: {
                                        ...bookmark.attributes,
                                        description: value,
                                      },
                                    });
                                    message.success("Gem updated successfully");
                                  }
                                }
                              },
                            }}
                          >
                            {bookmark?.attributes?.description}
                          </Paragraph>
                        </div>
                        <div className="ct-editor-max-width">
                          <Editor
                            descriptionContent={descriptionContent}
                            setDescriptionContent={debouncedOnChange}
                            collectionId={
                              bookmark?.attributes?.collection_gems?.data?.id ||
                              ""
                            }
                            page="gem"
                            tagId={""}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-center items-center flex-col">
                      <div className="px-4 mt-4 relative ct-editor-max-width">
                        <div className="flex items-center justify-between">
                          <Typography.Title
                            level={1}
                            className="text-lg font-semibold text-custom-black ct-blog-edit-title"
                            editable={{
                              icon: (
                                <PencilIcon className="h-3 w-3 text-gray-500" />
                              ),
                              onChange: async (value) => {
                                if (value !== bookmark?.attributes?.title) {
                                  const payload = {
                                    title: value,
                                  };
                                  const res = await dispatch(
                                    updateGem(gemId, { data: payload })
                                  );
                                  if (res.error === undefined) {
                                    setBookmark({
                                      ...bookmark,
                                      attributes: {
                                        ...bookmark.attributes,
                                        title: value,
                                      },
                                    });
                                    message.success("Gem updated successfully");
                                  }
                                }
                              },
                            }}
                          >
                            {(bookmark?.attributes?.title &&
                            bookmark?.attributes?.title.length > 150
                              ? bookmark?.attributes?.title.substring(0, 150) +
                                "..."
                              : bookmark?.attributes?.title) || "No Title"}
                          </Typography.Title>
                          {/* <h1 className='text-lg font-semibold text-custom-black'>
                                            </h1> */}
                          {/* {isSaving ? <label>Saving ...</label> : null} */}
                        </div>
                        <Paragraph
                          className="text-sm text-gray-700 mb-2"
                          ellipsis={{
                            rows: 2,
                            expandable: true,
                            symbol: "Read More",
                          }}
                          editable={{
                            icon: (
                              <PencilIcon className="h-3 w-3 text-gray-500" />
                            ),
                            text: "Edit Description",
                            onChange: async (value) => {
                              if (value !== bookmark?.attributes?.description) {
                                const payload = {
                                  description: value,
                                };
                                const res = await dispatch(
                                  updateGem(gemId, { data: payload })
                                );
                                if (res.error === undefined) {
                                  setBookmark({
                                    ...bookmark,
                                    attributes: {
                                      ...bookmark.attributes,
                                      description: value,
                                    },
                                  });
                                  message.success("Gem updated successfully");
                                }
                              }
                            },
                          }}
                        >
                          {bookmark?.attributes?.description}
                        </Paragraph>
                      </div>
                      <div className="ct-editor-max-width">
                        <Editor
                          descriptionContent={descriptionContent}
                          setDescriptionContent={debouncedOnChange}
                          collectionId={
                            bookmark?.attributes?.collection_gems?.data?.id ||
                            ""
                          }
                          page="gem"
                          tagId={""}
                        />
                      </div>
                    </div>
                  )}
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
                altInfo={altInfo}
              />
            )}

            {openCoverModal && (
              <ImageModal
                isOpenImageDialog={openCoverModal}
                currentTab={openImageDialogTab}
                onClose={onImageDialogClose}
                siteImages={bookmark?.attributes?.metaData?.docImages || []}
                currentIcon={bookmark?.attributes?.metaData?.defaultIcon || ""}
                currentThumbnail={
                  bookmark?.attributes?.metaData?.defaultThumbnail || ""
                }
                onThumbnailSelect={onThumbnailSelect}
                onIconSelect={onIconSelect}
                platform={"collection"}
                hideGallery={true}
                coverSize={coverSize}
                setCoverSize={setCoverSize}
                action="blog"
                handleSaveCoverSize={handleSaveCoverSize}
              />
            )}

            {drawerType === "bookmark" && (
              <AddBookmark open={drawerType === "bookmark"} />
            )}
            {showExceedModal && <ExceedLimitModal />}
            <CookieConsent />
          </Layout>
        )}
      </>
    );
};

export default BlogPage;
