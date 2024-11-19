"use client";

import {
  ChevronLeftIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  ForwardIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  LinkIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { followUser, unfollowUser } from "@actions/following";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Spin, message, Drawer, Tooltip, Button, Switch } from "antd";
// import { HiSearch } from "react-icons/hi";
import { getOtherUserDetails } from "@actions/user";
// import { PiArrowBendUpRightBold } from "react-icons/pi";
import session from "@utils/session";
import SocialShare from "@components/socialShare/SocialShare";
import ReportBug from "@components/modal/ReportBug";
import ReaderSettingModal from "@components/modal/ReaderSettingModal";
import InfoContainer from "@components/GemProfile/InfoContainer";
import AllHighlights from "@components/allHighlights/AllHighlights";
import BookDetails from "@components/info/BookDetails";
import UserBox from "@components/common/UserBox";
import { useParams, usePathname, useRouter } from "next/navigation";
import { speedRead } from "@utils/speed-reader";
import { TextMessage, copyText } from "@utils/constants";
import slugify from "slugify";
import { openAuthModal } from "@actions/app";
import { checkIsPublicGem, updateGem } from "@actions/collection";
import { publishBlog, updateUsageCount } from "@actions/gems";

const NOT_AVAILABLE_URLS = ["Note", "Quote", "Text Expander", "Ai Prompt"];

const GemHeader = ({
  bookmark,
  html = "",
  setReadArticle,
  editClicked,
  permissions,
  article,
  setting,
  setSetting,
  setFontFamily,
  setFontSize,
  setTextColor,
  gemPublicView = false,
  blogStatus=null,
  isBlogEditorMode=false,
  onBlogStatusChange=null,
  onOfflineView,
  isInboxView, 
  onSEOShow,
  onModeChange,
  onCountUpdate,
  onAuthorDisplayChanged=null,
  blogAuthorChecked=false
}) => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [following, setFollowing] = useState(false);
  const [userFollowers, setUserFollowers] = useState(null);
  const [followLoading, setfollowLoading] = useState(false);
  const [showShare, setShowShare] = useState(false);
  // const shareRef = useRef();
  const [isPublicGem, setIsPublicGem] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [showReportBug, setShowReportBug] = useState(false);
  const [openReaderSettings, setOpenReaderSettings] = useState(false);
  const [openInfoDrawer, setOpenInfoDrawer] = useState(false);
  const [openHighlightDrawer, setOpenHighlightDrawer] = useState(false);
  const [highlights, setHighlights] = useState([]);
  const { isMobileView,previousPathName } = useSelector((state) => state.app);
  const currentGem = useSelector((state) => state.gems?.currentGem) || bookmark;

  const [btnLoading, setBtnLoading] = useState(false);
  const [isGemPublic, seIsGemPublic] = useState(bookmark?.attributes?.isPublic || false);

  const searchParams = useParams();
  const searchPathname = usePathname();
  const uname = searchParams?.username;
  const module = searchPathname?.includes("/g/") ? "gems" : searchPathname?.includes("/tags/") ? "tags" : searchPathname?.includes("/c/") ? "collections" : null;
  const sourceId = searchParams?.gemId || searchParams?.colllectionId || searchParams?.tagId || searchParams?.id;
  const slug = searchParams?.name;

  // const searchParams = window.location.pathname.split("/");
  // const uname = searchParams[2];
  // const module = searchParams[3] === "tags" ? "tags" : searchParams[3] === "c" ? "collections" : searchParams[3] === "g" ? "gems" : null;
  // const sourceId = searchParams[4];
  // const slug = searchParams[5];

  useEffect(() => {
    if (bookmark?.id) {
      dispatch(checkIsPublicGem(bookmark.id)).then((res) => {
        if (res.error === undefined) {
          setIsPublicGem(res.payload.data);
        }
      })
    }
    if (bookmark?.attributes?.author?.data?.attributes?.username) {
      dispatch(
        getOtherUserDetails(
          bookmark?.attributes?.author?.data?.attributes?.username
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmark]);
  const handleFollow = async () => {
    if(session && session?.userId){
      setfollowLoading(true);
      const data = {
        hierarchyLevel: "user",
        followerUserId: bookmark?.attributes?.author?.data?.id,
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
    }else{
      dispatch(openAuthModal({
            open: true,
            action : 'login',
            extraInfo: {
              trigger: 'follow',
              username: uname,
              id: sourceId,
              module: module,
              slug: slug
            }
            
        }))
    }
  };

  const showInfoDrawer = () => {
    setOpenInfoDrawer(true);
  };

  const onClose = () => {
    setOpenInfoDrawer(false);
  };

  const onCloseHighlight = () => {
    setOpenHighlightDrawer(false);
  };

  const handleUnfollow = async () => {
    setfollowLoading(true);
    const data = {
      hierarchyLevel: "user",
      followerUserId: bookmark?.attributes?.author?.data?.id,
    };
    dispatch(unfollowUser(data)).then((res) => {
      if (res?.payload?.status === 200) {
        setFollowing(false);
      }
      setfollowLoading(false);
    });
  };

  const handleOpen = (flag) => {
    setShowShare(flag);
  };

  const handleOpenSetting = (flag) => {
    setOpenSetting(flag);
  };

  const dropdownnRenderUI = () => {
    return (
      <div className="bg-white z-50 p-3 rounded-lg shadow-lg border-[0.5px]">
        <SocialShare
          gem={{ id: bookmark?.id, ...bookmark?.attributes }}
          setShowShare={setShowShare}
          showCopied={showCopied}
          handleCopy={handleCopy}
          html={html}
        />
      </div>
    );
  };

  const handleCopy = () => {
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 1000);
  };

  const openGemInNewWindow = () => {
    // const count = !bookmark.attributes.usageCount ? 1 : parseInt(bookmark.attributes.usageCount) + 1
    dispatch(updateUsageCount(bookmark.id))

    // const payload = {
    //   usageCount: count
    // }
    // dispatch(updateGem(bookmark.id, { data: payload }))
    
    // onCountUpdate({...bookmark, attributes: { ...bookmark.attributes, usageCount: count} })
    if (bookmark?.attributes?.media_type === "Blog") {
      const blogSlug = `${bookmark?.attributes?.slug || (bookmark?.attributes?.title ? slugify(bookmark?.attributes?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g }) : "default")}?bid=${bookmark?.attributes?.media?.blogId}`
      let url        = `${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/${blogSlug}`
      if (bookmark?.attributes?.author?.data?.attributes?.isInternalUser) {
        url          = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blogSlug}`
      }
      window.open(url, "_blank")
    } 
    else if (bookmark?.attributes?.url) {
      window.open(bookmark?.attributes?.url, "_blank");
    }
  };

  const dropdownnRenderSettingUI = () => {
    return (
      <div className="bg-white z-50 p-3 rounded-lg shadow-lg border-[0.5px] cursor-pointer flex flex-col gap-2">
        {!isInboxView && <div
          className="font-medium"
          onClick={() => {
            editClicked();
            setOpenSetting(false);
          }}
        >
          Edit gem
        </div>}

        {(bookmark?.attributes?.media_type === "Image" ||
          bookmark?.attributes?.media_type === "Screenshot") && (
          <div
            className="font-medium"
            onClick={() => {
              setOpenSetting(false);
              const url =
                (bookmark?.attributes?.S3_link &&
                  bookmark?.attributes?.S3_link?.length > 0 &&
                  bookmark?.attributes?.S3_link[0]) ||
                "";
              if (url) {
                window.open(
                  `/u/${bookmark?.attributes?.author?.data?.attributes?.username}/image-editor/${bookmark?.id}/${session?.token}?url=${url}`
                );
              } else {
                message.error("No file to open in editor");
              }
            }}
          >
            Edit image
          </div>
        )}

        {/* {(bookmark?.attributes?.media_type === "Link" ||
          bookmark?.attributes?.media_type === "Product") && (
          <div
            className="font-medium"
            onClick={() => {
              setOpenSetting(false);
              onOfflineView();
            }}
          >
            Offline view
          </div>
        )} */}

        {bookmark?.attributes?.media_type === "Article" &&
          article?.textContent && (
            <div
              className="font-medium"
              onClick={() => {
                try {
                  window.navigator.clipboard.writeText(article?.textContent);
                  message.success("Text Copied to clipboard");
                } catch (err) {
                  message.error("Not have permission");
                }
                setOpenSetting(false);
              }}
            >
              Copy text
            </div>
          )}

        {NOT_AVAILABLE_URLS.indexOf(bookmark?.attributes?.media_type) ===
          -1 && (
          <div
            className="font-medium"
            onClick={() => {
              try {
                if (bookmark?.attributes?.media_type === "Blog" && bookmark?.attributes?.media?.blogId) {
                  const blogSlug = `${bookmark?.attributes?.slug || (bookmark?.attributes?.title ? slugify(bookmark?.attributes?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g }) : "default")}?bid=${bookmark?.attributes?.media?.blogId}`
                  let url        = `${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/${blogSlug}`
                  if (session.isInternalUser === "true") {
                    url          = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blogSlug}`
                  }
                  window.navigator.clipboard.writeText(url);
                }
                else {
                  window.navigator.clipboard.writeText(bookmark?.attributes?.url);
                }
                message.success("URL Copied to clipboard");
              } catch (err) {
                message.error("Not have permission");
              }
              setOpenSetting(false);
            }}
          >
            Copy URL
          </div>
        )}

        {bookmark?.attributes?.media_type === "Article" && (
          <div
            className="font-medium"
            onClick={() => {
              setOpenReaderSettings(true);
              setOpenSetting(false);
            }}
          >
            Reader settings
          </div>
        )}

        <div
          className="font-medium"
          onClick={() => {
            setOpenSetting(false);
            setShowReportBug(true);
          }}
        >
          Report issue
        </div>

        {(isPublicGem || bookmark?.attributes?.media_type === "Blog") && <div
          className="font-medium"
          onClick={() => {
            setOpenSetting(false);
            onSEOShow()
          }}
        >
          SEO
        </div>}

        {isMobileView && (
          <div
            className="font-medium"
            onClick={() => {
              setOpenHighlightDrawer(true);
              setOpenSetting(false);
            }}
          >
            Highlights
          </div>
        )}
      </div>
    );
  };

  const handleSpeedRead = () => {
    const text = article.title + article.textContent;
    speedRead(text);
  };     

  const handleCopyLink = (bookmark) => {
    if (bookmark?.attributes?.media_type === "Blog") {
      const blogSlug = `${bookmark?.attributes?.slug || (bookmark?.attributes?.title ? slugify(bookmark?.attributes?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g }) : "default")}?bid=${bookmark?.attributes?.media?.blogId}`
      let url = `${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/${blogSlug}` 
      if (bookmark?.attributes?.author?.data?.attributes?.isInternalUser === true) {
        url = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blogSlug}`;
      }
      copyText(url,'Link copied to clipboard')
      return;
    }
  }

  const handleNavigateBack = () => {
    const url = previousPathName || `/u/${session.username}/all-bookmarks`
    navigate.push(`${url}`)
  }

  const handleMakePublic = async (bookmark) => {
    const payload = {
      isPublic : true
    }

    setBtnLoading(true)
    const res= await dispatch(updateGem(bookmark.id, { data: payload }))

    if(res.error === undefined){
      seIsGemPublic(true)
      message.success(TextMessage.GEM_PUBLIC_TEXT)
      setBtnLoading(false)
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/u/${bookmark?.attributes?.author?.data?.attributes?.username || 'default'}/g/${bookmark?.id}/${bookmark?.attributes?.slug || (bookmark?.attributes?.title ? slugify(bookmark?.attributes?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g }) : "default")}?public=true`
      copyText(url,'Link copied to clipboard')
    }else{
      seIsGemPublic(false)
      setBtnLoading(false)
      message.error(TextMessage.ERROR_TEXT)
    }
  }

  const handleMakePrivate = async (bookmark) => {
    const payload = {
      isPublic : false
    }
    setBtnLoading(true)
    const res= await dispatch(updateGem(bookmark.id, { data: payload }))
    if(res.error === undefined){
      seIsGemPublic(false)
      message.success(TextMessage.GEM_PRIVATE_TEXT)
      setBtnLoading(false)
    }else{
      seIsGemPublic(false)
      setBtnLoading(false)
      message.error(TextMessage.ERROR_TEXT)
    }
  }

  const onBlogPublish = () => {
    editClicked();
    setOpenSetting(false);
    // const res = await dispatch(publishBlog(bookmark.id))
    // if (res.error === undefined) {
    //   onBlogStatusChange && onBlogStatusChange("Published")
    //   message.success("Blog published successfully")
    // }
  }

  return (
    <>
      <div className="flex border-b border-solid border-[#e5e7eb] p-2 md:p-4 md:justify-between items-center">
        <div className="flex items-center justify-start w-full md:mb-0 md:w-fit">
          {((session && session.openPagesInSession === "full page") ||
            gemPublicView) && !isInboxView && (
            <button
              className="flex items-center"
              onClick={() => navigate.back()}
              // onClick={handleNavigateBack}
            >
              <ChevronLeftIcon className="w-4 h-4 mr-1" />
              <span>Back</span>
            </button>
          )}

          <div className="flex items-center justify-between ml-4">
            <UserBox
              user={bookmark?.attributes?.author?.data}
              userFollowers={userFollowers}
              gemPublicView={gemPublicView}
            />
            {session &&
              bookmark?.attributes?.author?.data?.id?.toString() !==
                session?.userId?.toString() && (
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
          </div>
        </div>

        <div className="flex items-center gap-3">
          {bookmark?.attributes?.media_type === "Article" && (
            <button
              onClick={handleSpeedRead}
              className="h-6 w-6 rounded-md bg-white shadow flex justify-center items-center"
            >
              <ForwardIcon className="h-4 w-4" />
            </button>
          )}
          {bookmark?.attributes?.media_type === "Article" && (
            <button
              onClick={() => setReadArticle((prev) => !prev)}
              className="h-6 w-6 rounded-md bg-white shadow flex justify-center items-center"
            >
              <img
                className="h-5 w-5"
                src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/play-button-outline.svg`}
                alt="play button icon"
              />
            </button>
          )}
          {isMobileView && (
            <>
              <button onClick={showInfoDrawer}>
                <InformationCircleIcon className="h5 w-5" />
              </button>
              <Drawer
                width={"90%"}
                title="Exit"
                placement="right"
                onClose={onClose}
                open={openInfoDrawer}
              >
                {bookmark?.attributes?.media_type === "Book" ? (
                  <BookDetails title={bookmark?.attributes?.title} altInfo={bookmark?.attributes?.altInfo || bookmark?.attributes?.title || bookmark?.attributes?.description || ""} />
                ) : (
                  <InfoContainer
                    url={bookmark?.attributes?.url}
                    mediaType={bookmark?.attributes?.media_type}
                    title={bookmark?.attributes?.title}
                  />
                )}
              </Drawer>
            </>
          )}

          {/* {bookmark?.attributes?.media_type === "Blog" && 
            <Switch style={{ background: blogAuthorChecked ? "#1890ff" : "#00000040" }} checked={blogAuthorChecked} onChange={onAuthorDisplayChanged} className="mr-2" checkedChildren="Hide Author" unCheckedChildren={"Show Author"} />
            
          } */}

          {isBlogEditorMode && bookmark?.attributes?.media_type === "Blog" && blogStatus === "Draft" && 
            <Button type="link" onClick={onBlogPublish}>Save and Publish</Button>}

          {
          bookmark?.attributes?.media_type !== 'Blog' && !isGemPublic && <button onClick={() => handleMakePublic(bookmark)} className='w-7 h-7 border-[0.5px] border-gray-400 shadow flex justify-center items-center outline-none rounded-md' disabled={btnLoading}>
            <LockOpenIcon className='w-4 h-4' />
          </button> 
          }

          {
          bookmark?.attributes?.media_type !== 'Blog' && isGemPublic && <button onClick={() => handleMakePrivate(bookmark)} className='w-7 h-7 border-[0.5px] border-gray-400 shadow flex justify-center items-center outline-none rounded-md' disabled={btnLoading}>
            <LockClosedIcon className='w-4 h-4' />
          </button>
          }

          {bookmark?.attributes?.media_type === 'Blog' && <button onClick={() => handleCopyLink(bookmark)} className='w-7 h-7 border-[0.5px] border-gray-400 shadow flex justify-center items-center outline-none rounded-md'>
            <LinkIcon className='w-4 h-4' />
          </button>}
          {/* settings */}
          {(!permissions || permissions?.gems?.canUpdate) && !gemPublicView ? (
            <Dropdown
              overlayStyle={{ width: "150px" }}
              trigger={["click"]}
              dropdownRender={() => dropdownnRenderSettingUI()}
              onOpenChange={handleOpenSetting}
              open={openSetting}
              placement="bottom"
            >
              <button className="h-6 w-6 rounded-md bg-white shadow flex justify-center items-center">
                <EllipsisHorizontalIcon className="w-4 h-5" />
              </button>
            </Dropdown>
          ) : (
            <div></div>
          )}
          {bookmark?.attributes?.media_type === "Blog" &&
            <Tooltip title="Preview Mode">
              <button
                onClick={() => onModeChange && onModeChange()}
                className="w-7 h-7 border-[0.5px] border-gray-400 shadow flex justify-center items-center outline-none rounded-md"
              >
                <EyeIcon className="w-4 h-5" />
              </button>
            </Tooltip>
          }
          <button
            onClick={openGemInNewWindow}
            className="w-7 h-7 border-[0.5px] border-gray-400 shadow flex justify-center items-center outline-none rounded-md"
          >
            <GlobeAltIcon className="w-4 h-5" />
          </button>
          {/* <Dropdown
            overlayStyle={{ width: "250px" }}
            trigger={["click"]}
            dropdownRender={() => dropdownnRenderUI()}
            onOpenChange={handleOpen}
            open={showShare}
            placement="bottomRight"
          >
            <button className="px-3 h-8 shadow flex justify-center items-center outline-none rounded-md text-white bg-[#1E9CFD] gap-2 relative">
              <PiArrowBendUpRightBold className="w-4 h-5" />
              <span className="hidden md:block">Share</span>
            </button>
          </Dropdown> */}
        </div>
      </div>
      {openHighlightDrawer && (
        <Drawer
          width={"90%"}
          title="Exit"
          placement="right"
          onClose={onCloseHighlight}
          open={openHighlightDrawer}
        >
          {currentGem?.attributes?.media_type !== "Article" &&
          bookmark?.attributes?.media_type !== "Link" &&
          currentGem?.attributes?.child_gem_id &&
          currentGem?.attributes?.child_gem_id?.data &&
          Array.isArray(currentGem?.attributes?.child_gem_id?.data) &&
          currentGem?.attributes?.child_gem_id?.data.length > 0 ? (
            <div className="p-2">
              <span className="font-bold text-lg mb-2">Highlights</span>
              <AllHighlights
                allHighlights={currentGem?.attributes?.child_gem_id?.data}
                user={currentGem?.attributes?.author?.data?.attributes}
                isSidebar={true}
                width={60}
              />
            </div>
          ) : (
            <div className="text-center py-4">
              <span>No highlight available</span>
            </div>
          )}
        </Drawer>
      )}

      {showReportBug && (
        <ReportBug
          showPopup={showReportBug}
          onCancel={() => setShowReportBug(false)}
        />
      )}
      {openReaderSettings && (
        <ReaderSettingModal
          open={openReaderSettings}
          onCancel={() => setOpenReaderSettings(false)}
          article={article}
          setting={setting}
          setSetting={setSetting}
          setFontFamily={setFontFamily}
          setFontSize={setFontSize}
          setTextColor={setTextColor}
        />
      )}
    </>
  );
};

export default GemHeader;
