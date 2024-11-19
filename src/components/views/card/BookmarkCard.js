import { Avatar, Card, Checkbox } from "antd";
import {
    PencilSquareIcon,
    ArrowTopRightOnSquareIcon, XMarkIcon,
    EyeIcon
} from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from "react-redux";
// import { sidebarMenuClicked } from "../../../actions/app";
import slugify from "slugify";
import { Resizable } from "re-resizable";
import { useEffect, useMemo, useState } from "react";
import { Outlet } from 'react-router-dom';
import { getFilteredData,renderDetails,renderDetailsWithoutProperty } from "@utils/commonFunctions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import session from "@utils/session";
import GemEngagement from "@components/gemEngagement/GemEngagement";
import { updateGem } from "@actions/collection";
import { updateUsageCount } from "@actions/gems";
import { setPreviousPathName } from "@actions/app";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverlay
} from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSwappingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import SingleCardItem from "@components/common/SingleCardItem";
import { createPortal } from "react-dom";
import moment from "moment";
import { BsDot } from "react-icons/bs";
import ReactPlayer from "react-player";
import { copyText, MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR } from "@utils/constants";
import Image from "next/image";
import { PiCopy } from "react-icons/pi";
import SingleCard from "@components/common/SingleCard";

const BookmarkCard = ({
  items,
  propertyOrder,
  setOpenDrawer,
  setGemSingleIdSingleId,
  page = "",
  collectionName = "",
  checkedBookmark,
  setCheckedBookmark,
  showComment,
  user,
  collectionId = "",
  type = "",
  tagId = "",
  tagName = "",
  shrink,
  setShrink,
  cardSize,
  openPagesIn,
  isSharedAndAllowEdit = true,
  authorName = "",
  permissions = null,
  getSortedItems = () => {},
  isFilter,
  showSocialIcons = "",
  gemOnClickEvent = '',
}) => {
  const itemsId = useMemo(() => items.map((col) => col.id), [items]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [width, setWidth] = useState("40%");
  const [mobileScreen, setMobileScreen] = useState(false);
  const [fallbackURL, setFallbackURL] = useState(null);
  const { isMobileView } = useSelector((state) => state.app);

  const [draggedItem, setDraggedItem] = useState(null);
  const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const openGemInWindow = (item) => {
    if (item?.media_type === "Article" && !item?.isRead) {
      const payload = {
        ...item,
        isRead: true,
      };

      delete payload.id;
      dispatch(updateGem(item.id, { data: payload }));
    }
    dispatch(updateUsageCount(item.id));
    window.open(item?.url || "", "_blank");
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 600) {
        setMobileScreen(true);
      } else {
        setMobileScreen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCheck = (e, item) => {
    if (e.target.checked === true) {
      setCheckedBookmark((prev) => [...prev, item]);
      return;
    }

    if (e.target.checked === false) {
      const filtered = checkedBookmark?.filter((data) => data.id !== item.id);
      setCheckedBookmark(filtered);
      return;
    }
  };

  const handleOpenGem = (e, item) => {
    const queryString = new URLSearchParams(searchParams).toString();
    const url = `${pathname}${queryString ? `?${queryString}` : ""}`;
    dispatch(setPreviousPathName(url));
    if (page === "collection-public-shared") {
      e.stopPropagation();
      navigate.push(
        `/u/${item?.author?.username || "default"}/g/${item.id}/${
          item?.slug ||
          (item.title
            ? slugify(item.title || "", {
                lower: true,
                remove: /[&,+()$~%.'":*?<>{}/\/]/g,
              })
            : "default")
        }?public=true`
      );
      return;
    }
    if (page === "profile-bookmark") {
      if (item?.author?.id === Number(session?.userId)) {
        navigate.push(
          `/u/${item?.author?.username || "default"}/g/${item.id}/${
            item?.slug ||
            (item.title
              ? slugify(item.title || "", {
                  lower: true,
                  remove: /[&,+()$~%.'":*?<>{}/\/]/g,
                })
              : "default")
          }`
        );
        return;
      } else {
        navigate.push(
          `/u/${item?.author?.username || "default"}/g/${item.id}/${
            item?.slug ||
            (item.title
              ? slugify(item.title || "", {
                  lower: true,
                  remove: /[&,+()$~%.'":*?<>{}/\/]/g,
                })
              : "default")
          }?public=true`
        );
        return;
      }
    }
    if (openPagesIn === "full page") {
      e.stopPropagation();
      navigate.push(
        `/u/${item?.author?.username || "default"}/g/${item.id}/${
          item?.slug ||
          (item.title
            ? slugify(item.title || "", {
                lower: true,
                remove: /[&,+()$~%.'":*?<>{}/\/]/g,
              })
            : "default")
        }`
      );
      return;
    }
    if (openPagesIn === "side peek") {
      e.stopPropagation();
      setShrink(true);
      if (page === "bookmark") {
        navigate.push(
          `/u/${item?.author?.username || "default"}/all-bookmarks/${item.id}`
        );
        return;
      }
      if (page === "collection") {
        navigate.push(
          `/u/${item?.author?.username || "default"}/c/${collectionId}/${
            item?.collection_gems?.slug ||
            slugify(collectionName || "", {
              lower: true,
              remove: /[&,+()$~%.'":*?<>{}/\/]/g,
            })
          }/${item.id}`
        );
        return;
      }
      if (page === "filter") {
        navigate.push(
          `/u/${item?.author?.username || "default"}/filters/${slugify(
            type || "",
            { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g }
          )}/${item.id}?type=${type}`
        );
        return;
      }
      if (page === "broken-duplicate") {
        navigate.push(
          `/u/${item?.author?.username || "default"}/links/${
            item.id
          }?type=${type}`
        );
        return;
      }
      if (page === "tags") {
        if (item && item.id) {
          navigate.push(
            `/u/${item?.author?.username || "default"}/tags/${tagId}/${slugify(
              tagName || "",
              { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g }
            )}/${item.id}`
          );
        } else {
          // handleLayout('card')
          navigate.push(
            `/u/${item?.author?.username || "default"}/tags/${tagId}/${slugify(
              tagName || "",
              { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g }
            )}`
          );
        }
        return;
      }
      if (page === "profile-bookmark") {
        if (item?.author?.id === Number(session?.userId)) {
          navigate.push(
            `/u/${item?.author?.username || "default"}/g/${item.id}/${
              item?.slug ||
              (item.title
                ? slugify(item.title || "", {
                    lower: true,
                    remove: /[&,+()$~%.'":*?<>{}/\/]/g,
                  })
                : "default")
            }`
          );
          return;
        } else {
          navigate.push(
            `/u/${item?.author?.username || "default"}/g/${item.id}/${
              item?.slug ||
              (item.title
                ? slugify(item.title || "", {
                    lower: true,
                    remove: /[&,+()$~%.'":*?<>{}/\/]/g,
                  })
                : "default")
            }?public=true`
          );
        }
      }
    }
  };
  // const handlePreview = (e,item) => {
  //     e.stopPropagation();
  //     setIsPreviewVisible(true)
  //     setPreviewBookmark(item)
  // }

  const handleNavigate = (item) => {
    navigate.push(
      `/u/${session.username}/c/${item?.collection_gems?.id}/${
        item?.collection_gems?.slug ||
        slugify(item?.collection_gems?.name || "", {
          lower: true,
          remove: /[&,+()$~%.'":*?<>{}/\/]/g,
        })
      }`
    );
    // dispatch(sidebarMenuClicked('collection'))
  };

  const handleNavigateMediaType = (item) => {
    navigate.push(
      `/u/${session.username}/filters/${slugify(item.media_type || "", {
        lower: true,
        remove: /[&,+()$~%.'":*?<>{}/\/]/g,
      })}?type=${item.media_type}`
    );
    // dispatch(sidebarMenuClicked('filter'))
  };

  const filteredData =
    Array.isArray(propertyOrder) && propertyOrder.length === 1
      ? getFilteredData(items, propertyOrder, page)
      : items;

  const renderCardImage = (imgSrc, item) => {
    return propertyOrder?.some((data) => data.name === "Thumbnail") ? (
      <div
        className="tweet-image overflow-hidden"
        style={{
          width: "100%",
          position: "relative",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
      >
        {item?.socialfeed_obj?.postType === "video" ? (
          <ReactPlayer
            url={item?.socialfeed_obj?.image_url}
            width="100%"
            height="150px"
            controls={true}
          />
        ) : (
          <Image
            src={
              fallbackURL
                ? fallbackURL
                : imgSrc
                    ?.replace("resize:fill:112:112", "resize:fit:2400")
                    ?.replace("resize:fill:40:40", "resize:fit:2400")
                    ?.replace("_SY160", "_SY800")
                    ?.replace(MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR)
                    ?.replace(
                      NEXT_PUBLIC_STATIC_S3_BASE_URL,
                      `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/300x300_min`
                    ) ||
                  `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
            }
            alt={
              item?.altInfo || item?.title || item?.description || "Curateit"
            }
            className={`h-[150px] w-full cardImageEffect`}
            onError={(e) => {
              setFallbackURL(
                item?.metaData?.fallbackURL
                  ? item?.metaData?.fallbackURL
                  : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              );
            }}
            priority={true}
            style={{
              maxWidth: "100%",
            }}
          />
        )}
      </div>
    ) : null;
  };

  const renderProfileCardImg = (imgSrc, item) => {
    return propertyOrder?.some((data) => data.name === "Thumbnail") ? (
      <div className="flex items-center justify-center mt-2 overflow-hidden">
        <Avatar
          icon={
            <Image
              src={
                fallbackURL
                  ? fallbackURL
                  : imgSrc?.replace(MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR)
                  ? imgSrc
                      ?.replace("resize:fill:24:24", "resize:fit:2400")
                      ?.replace("resize:fill:40:40", "resize:fit:2400")
                      ?.replace(
                        NEXT_PUBLIC_STATIC_S3_BASE_URL,
                        `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/600x600_min`
                      )
                  : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              }
              alt={
                item?.altInfo || item?.title || item?.description || "Curateit"
              }
              onError={(e) => {
                setFallbackURL(
                  item?.metaData?.fallbackURL
                    ? item?.metaData?.fallbackURL
                    : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                );
              }}
              priority={true}
              style={{
                maxWidth: "100%",
              }}
            />
          }
          size={100}
          className="cardImageEffect"
        />
      </div>
    ) : null;
  };

  const handleResetShrink = (e) => {
    e.stopPropagation();
    setShrink(false);
  };

  const getTaskPos = (id) => items.findIndex((item) => item.id === id);

  const handleDragStart = (event) => {
    const { active } = event;
    setDraggedItem(items.find((item) => item.id === active.id));
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    setDraggedItem(null);

    if (active.id === over.id) return;

    const originalPos = getTaskPos(active.id);
    const newPos = getTaskPos(over.id);

    const data = arrayMove(items, originalPos, newPos);

    getSortedItems(data);
  };

  const handleCopyUrl = (item) => {
    if(item?.url){
      copyText(item?.url, "Link copied to clipboard");
    }
  }

  return (
    <>
      {(page === "bookmark" ||
        page === "profile-bookmark" ||
        page === "collection-public-shared") && (
        <>
          {shrink ? (
            <>
              <div className="flex flex-col-reverse md:flex md:flex-row">
                <Resizable
                  className="!h-[100vh] !overflow-y-scroll overflow-x-hidden"
                  size={{ width: mobileScreen ? "100%" : width }}
                  onResizeStop={(e, direction, ref, d) => {
                    setWidth(ref.style.width);
                  }}
                  enable={{
                    top: false,
                    bottom: false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                    right: true,
                    left: false,
                  }}
                >
                  <div
                    className={`${
                      cardSize === "medium"
                        ? "grid-container"
                        : cardSize === "large"
                        ? "grid-container-large"
                        : "grid-container-small"
                    }`}
                  >
                    {filteredData && filteredData.length > 0 ? (
                      filteredData.map((item, i) => {
                        const imgSrc =
                          item?.metaData && item?.metaData?.covers?.length > 0
                            ? item?.metaData?.covers[0] ||
                              item?.metaData?.app_screenshot
                            : "";
                        const favSrc =
                          item?.metaData && item?.metaData.length > 0
                            ? typeof item?.metaData?.icon === "string"
                              ? item?.metaData?.icon
                              : typeof item?.metaData?.icon === "object" &&
                                item?.metaData?.icon?.type === "image"
                              ? item?.metaData?.icon?.icon
                              : item?.metaData?.defaultIcon
                              ? item?.metaData?.defaultIcon
                              : ""
                            : "";
                        const mediaImgsrc =
                          item?.media &&
                          item?.media?.covers &&
                          item?.media?.covers?.length > 0
                            ? item?.media?.covers[0]
                            : "";
                        const s3Src =
                          (item?.media_type === "Image" ||
                            item?.media_type === "Screenshot") &&
                          item?.S3_link &&
                          item?.S3_link?.length > 0
                            ? item?.S3_link[0]
                            : null;

                        return (
                          <Card
                            cover={
                              item?.media_type === "Profile"
                                ? renderProfileCardImg(imgSrc || favSrc, item)
                                : renderCardImage(
                                    s3Src || imgSrc || mediaImgsrc,
                                    favSrc,
                                    item?.altInfo ||
                                      item?.title ||
                                      item?.description ||
                                      "",
                                    "",
                                    "",
                                    item
                                  )
                            }
                            key={i}
                            className={
                              "border-1 border-solid border-[#DADEE8] group hover:border-2 relative"
                            }
                            style={{
                              height: "100%",
                              cursor: "pointer",
                              background: checkedBookmark?.some(
                                (data) => data.id === item.id
                              )
                                ? "#E7F2FB"
                                : "#fff",
                              color: checkedBookmark?.some(
                                (data) => data.id === item.id
                              )
                                ? "black"
                                : "inherit",
                            }}
                            onClick={(e) => handleOpenGem(e, item)}
                            bodyStyle={{
                              padding:
                                item?.media_type === "Blog" ||
                                item?.media_type === "Article"
                                  ? "8px 8px 24px 8px"
                                  : "24px",
                            }}
                          >
                            <div
                              style={{
                                background: checkedBookmark?.some(
                                  (data) => data.id === item.id
                                )
                                  ? "rgba(231,242,251,0.1)"
                                  : "",
                              }}
                              className={`p-1 absolute top-0 left-0 flex justify-between h-fit w-full ${
                                isMobileView ? "opacity-100" : "opacity-0"
                              } ${
                                !isMobileView &&
                                "transition-opacity  group-hover:opacity-100 "
                              }`}
                            >
                              {item?.author?.id === Number(session?.userId) ? (
                                <div className="checkDiv">
                                  <Checkbox
                                    onChange={(e) => handleCheck(e, item)}
                                    onClick={(e) => e.stopPropagation()}
                                    checked={checkedBookmark?.some(
                                      (data) => data.id === item.id
                                    )}
                                  />
                                </div>
                              ) : (
                                <></>
                              )}

                              <div className="flex">
                                <div
                                  className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1"
                                  title="Open in new tab"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openGemInWindow(item);
                                  }}
                                >
                                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                                </div>

                                {/* <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 mx-2" title="Preview" onClick={(e) => handleOpenGem(e, item)}>
                                                                        <EyeIcon className="h-5 w-5" />
                                                                    </div> */}

                                {item?.author?.id ===
                                Number(session?.userId) ? (
                                  <div
                                    className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 ml-1"
                                    title="Edit"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenDrawer(true);
                                      setGemSingleIdSingleId(item.id);
                                    }}
                                  >
                                    <PencilSquareIcon className="h-5 w-5" />
                                  </div>
                                ) : (
                                  <div></div>
                                )}
                              </div>
                            </div>

                            {(item?.media_type === "Blog" ||
                              item?.media_type === "Article") && (
                              <div className="items center flex">
                                <div className="text-xs font-medium">
                                  {moment(
                                    item?.media?.publishedAt ||
                                      item.media?.articleObj?.datePublished
                                  ).format("MMM DD, YYYY")}
                                </div>
                                {item?.media?.readTime && (
                                  <>
                                    <BsDot className="h-4 w-4 mx-1" />
                                    <div className="text-xs font-medium">
                                      {item?.media?.readTime} min read
                                    </div>
                                  </>
                                )}
                              </div>
                            )}

                            <div className="flex flex-col py-1 mb-1">
                              {renderDetails(
                                propertyOrder || [],
                                item,
                                "",
                                page,
                                handleNavigate,
                                handleNavigateMediaType
                              )}
                            </div>

                            <div
                              className={`mt-2 border-t-2 p-2 z-50 absolute bottom-0 w-full left-0 ${
                                Number(session.userId) === item?.author?.id ||
                                page === "collection-public-shared"
                                  ? "hidden group-hover:block"
                                  : "block"
                              }`}
                            >
                              <GemEngagement
                                gem={item}
                                showBookmark={
                                  (Number(session.userId) !==
                                    item?.author?.id &&
                                    !permissions) ||
                                  permissions?.permissions?.gems
                                    ?.canAddtoBookmark
                                }
                                showComment={showComment}
                                user={user}
                                permissions={permissions}
                              />
                            </div>
                          </Card>
                        );
                      })
                    ) : (
                      <p>No Bookmarks</p>
                    )}
                  </div>
                </Resizable>

                <div
                  className={`h-full  ${mobileScreen && "mb-4"}`}
                  style={{
                    width: mobileScreen ? "100%" : `calc(100% - ${width})`,
                  }}
                >
                  <div
                    className="mb-2 ml-1"
                    style={{
                      borderBottomColor: "#d9d9d9",
                      borderBottomStyle: "solid",
                      borderBottomWidth: "1px",
                    }}
                  >
                    <div className="p-2 w-fit hover:bg-[#f2f2f2] hover:rounded-[2px]">
                      <XMarkIcon
                        className="cursor-pointer h-5 w-5"
                        onClick={handleResetShrink}
                      />
                    </div>
                  </div>
                  <Outlet context={"inboxView"} />
                </div>
              </div>
            </>
          ) : filteredData && filteredData.length > 0 ? (
            filteredData.map((item, i) => {
              const imgSrc =
                (item?.metaData && item?.metaData?.covers?.length > 0)
                  ? (item?.metaData?.covers[0] || item?.metaData?.app_screenshot)
                  : "";
              const favSrc =
                (item?.metaData && item?.metaData.length > 0)
                  ? typeof item?.metaData?.icon === "string"
                    ? item?.metaData?.icon
                    : typeof item?.metaData?.icon === "object" &&
                      item?.metaData?.icon?.type === "image"
                    ? item?.metaData?.icon?.icon
                    : item?.metaData?.defaultIcon
                    ? item?.metaData?.defaultIcon
                    : ""
                  : "";
              const mediaImgsrc =
                (item?.media &&
                item?.media?.covers &&
                item?.media?.covers?.length > 0)
                  ? item?.media?.covers[0]
                  : "";
              const s3Src =
                ((item?.media_type === "Image" ||
                  item?.media_type === "Screenshot") &&
                (item?.S3_link &&
                item?.S3_link?.length > 0))
                  ? item?.S3_link[0]
                  : null;

              return (
                <SingleCard
                  item={item}
                  propertyOrder={propertyOrder}
                  setOpenDrawer={setOpenDrawer}
                  setGemSingleIdSingleId={setGemSingleIdSingleId}
                  page={page}
                  collectionName={collectionName}
                  checkedBookmark={checkedBookmark}
                  showComment={showComment}
                  user={user}
                  isSharedAndAllowEdit={isSharedAndAllowEdit}
                  permissions={permissions}
                  isFilter={isFilter}
                  handleOpenGem={handleOpenGem}
                  handleCheck={handleCheck}
                  handleNavigateMediaType={handleNavigateMediaType}
                  openGemInWindow={openGemInWindow}
                  imgSrc={imgSrc}
                  favSrc={favSrc}
                  mediaImgsrc={mediaImgsrc}
                  s3Src={s3Src}
                  isMobileView={isMobileView}
                  gemOnClickEvent={gemOnClickEvent}
                  handleNavigate={handleNavigate}
                  showSocialIcons={showSocialIcons}
                />
              );
            })
          ) : (
            <p>No Bookmarks</p>
          )}
        </>
      )}

      {page === "collection" && (
        <>
          {shrink ? (
            <>
              <div className="flex flex-col-reverse md:flex md:flex-row">
                <Resizable
                  className="!h-[100vh] !overflow-y-scroll overflow-x-hidden"
                  size={{ width: mobileScreen ? "100%" : width }}
                  onResizeStop={(e, direction, ref, d) => {
                    setWidth(ref.style.width);
                  }}
                  enable={{
                    top: false,
                    bottom: false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                    right: true,
                    left: false,
                  }}
                >
                  <div
                    className={`${
                      cardSize === "medium"
                        ? "grid-container"
                        : cardSize === "large"
                        ? "grid-container-large"
                        : "grid-container-small"
                    }`}
                  >
                    {filteredData && filteredData.length > 0 ? (
                      filteredData.map((item, i) => {
                        const imgSrc =
                          item?.metaData && item?.metaData?.covers?.length > 0
                            ? item?.metaData?.covers[0] ||
                              item?.metaData?.app_screenshot
                            : "";
                        const favSrc =
                          item?.metaData && item?.metaData.length > 0
                            ? typeof item?.metaData?.icon === "string"
                              ? item?.metaData?.icon
                              : typeof item?.metaData?.icon === "object" &&
                                item?.metaData?.icon?.type === "image"
                              ? item?.metaData?.icon?.icon
                              : item?.metaData?.defaultIcon
                              ? item?.metaData?.defaultIcon
                              : ""
                            : "";
                        const mediaImgsrc =
                          item?.media &&
                          item?.media?.covers &&
                          item?.media?.covers?.length > 0
                            ? item?.media?.covers[0]
                            : "";
                        const s3Src =
                          (item?.media_type === "Image" ||
                            item?.media_type === "Screenshot") &&
                          item?.S3_link &&
                          item?.S3_link?.length > 0
                            ? item?.S3_link[0]
                            : null;

                        return (
                          <Card
                            cover={
                              item?.media_type === "Profile"
                                ? renderProfileCardImg(imgSrc, favSrc, "", item)
                                : renderCardImage(
                                    s3Src || imgSrc || mediaImgsrc,
                                    favSrc,
                                    item?.altInfo ||
                                      item?.title ||
                                      item?.description ||
                                      "",
                                    "",
                                    "",
                                    item
                                  )
                            }
                            key={i}
                            className={`border-1 border-solid border-[#DADEE8] group hover:border-2 relative`}
                            style={{
                              height: "100%",
                              cursor: "pointer",
                              background: checkedBookmark?.some(
                                (data) => data.id === item.id
                              )
                                ? "#E7F2FB"
                                : "#fff",
                              color: checkedBookmark?.some(
                                (data) => data.id === item.id
                              )
                                ? "black"
                                : "inherit",
                            }}
                            onClick={(e) => handleOpenGem(e, item)}
                            bodyStyle={{
                              padding:
                                item?.media_type === "Blog" ||
                                item?.media_type === "Article"
                                  ? "8px 8px 24px 8px"
                                  : "24px",
                            }}
                          >
                            {/* hover icons */}
                            <div
                              style={{
                                background: checkedBookmark?.some(
                                  (data) => data.id === item.id
                                )
                                  ? "rgba(231,242,251,0.1)"
                                  : "",
                              }}
                              className={`p-1 absolute top-0 left-0 flex justify-between h-fit w-full ${
                                isMobileView ? "opacity-100" : "opacity-0"
                              } ${
                                !isMobileView &&
                                "transition-opacity  group-hover:opacity-100"
                              }`}
                            >
                              {isSharedAndAllowEdit ? (
                                <div className="checkDiv">
                                  <Checkbox
                                    onChange={(e) => handleCheck(e, item)}
                                    onClick={(e) => e.stopPropagation()}
                                    checked={checkedBookmark?.some(
                                      (data) => data.id === item.id
                                    )}
                                  />
                                </div>
                              ) : (
                                <></>
                              )}

                              <div className="flex">
                                <div
                                  className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1"
                                  title="Open in new tab"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openGemInWindow(item);
                                  }}
                                >
                                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                                </div>

                                {/* <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 mx-2" title="Preview" onClick={(e) => handleOpenGem(e, item)}>
                                                        <EyeIcon className="h-5 w-5" />
                                                    </div> */}

                                {isSharedAndAllowEdit ? (
                                  <div
                                    className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 ml-1"
                                    title="Edit"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenDrawer(true);
                                      setGemSingleIdSingleId(item.id);
                                    }}
                                  >
                                    <PencilSquareIcon className="h-5 w-5" />
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>

                            {(item?.media_type === "Blog" ||
                              item?.media_type === "Article") && (
                              <div className="items center flex">
                                <div className="text-xs font-medium">
                                  {moment(
                                    item?.media?.publishedAt ||
                                      item.media?.articleObj?.datePublished
                                  ).format("MMM DD, YYYY")}
                                </div>
                                {item?.media?.readTime && (
                                  <>
                                    <BsDot className="h-4 w-4 mx-1" />
                                    <div className="text-xs font-medium">
                                      {item?.media?.readTime} min read
                                    </div>
                                  </>
                                )}
                              </div>
                            )}

                            <div className="flex flex-col py-1 mb-1">
                              {renderDetails(
                                propertyOrder,
                                item,
                                collectionName,
                                page,
                                "",
                                handleNavigateMediaType
                              )}
                            </div>

                            <div
                              className={`mt-2 border-t-2 p-2 z-50 absolute bottom-0 w-full left-0 ${
                                Number(session.userId) === item?.author?.id
                                  ? "hidden group-hover:block"
                                  : "block"
                              }`}
                            >
                              <GemEngagement
                                gem={item}
                                showBookmark={
                                  (Number(session.userId) !==
                                    item?.author?.id &&
                                    !permissions) ||
                                  permissions?.permissions?.gems
                                    ?.canAddtoBookmark
                                }
                                showComment={showComment}
                                user={user}
                                permissions={permissions}
                              />
                            </div>
                          </Card>
                        );
                      })
                    ) : (
                      <p>No Bookmarks</p>
                    )}
                  </div>
                </Resizable>

                <div
                  className={`h-full  ${mobileScreen && "mb-4"}`}
                  style={{
                    width: mobileScreen ? "100%" : `calc(100% - ${width})`,
                  }}
                >
                  <div
                    className="mb-2 ml-1"
                    style={{
                      borderBottomColor: "#d9d9d9",
                      borderBottomStyle: "solid",
                      borderBottomWidth: "1px",
                    }}
                  >
                    <div className="p-2 w-fit hover:bg-[#f2f2f2] hover:rounded-[2px]">
                      <XMarkIcon
                        className="cursor-pointer h-5 w-5"
                        onClick={handleResetShrink}
                      />
                    </div>
                  </div>
                  <Outlet context={"inboxView"} />
                </div>
              </div>
            </>
          ) : filteredData && filteredData.length > 0 ? (
            <DndContext
              onDragStart={handleDragStart}
              collisionDetection={closestCorners}
              onDragEnd={handleDragEnd}
              sensors={sensors}
            >
              <SortableContext items={itemsId} strategy={rectSwappingStrategy}>
                <>
                  {filteredData.map((item, i) => {
                    const imgSrc =
                      (item?.metaData && item?.metaData?.covers?.length > 0)
                        ? (item?.metaData?.covers[0] ||
                          item?.metaData?.app_screenshot)
                        : "";
                    const favSrc =
                      (item?.metaData && item?.metaData.length > 0)
                        ? typeof item?.metaData?.icon === "string"
                          ? item?.metaData?.icon
                          : typeof item?.metaData?.icon === "object" &&
                            item?.metaData?.icon?.type === "image"
                          ? item?.metaData?.icon?.icon
                          : item?.metaData?.defaultIcon
                          ? item?.metaData?.defaultIcon
                          : ""
                        : "";
                    const mediaImgsrc =
                      (item?.media &&
                      item?.media?.covers &&
                      item?.media?.covers?.length > 0)
                        ? item?.media?.covers[0]
                        : "";
                    const s3Src =
                      ((item?.media_type === "Image" ||
                        item?.media_type === "Screenshot") &&
                      (item?.S3_link &&
                      item?.S3_link?.length > 0))
                        ? item?.S3_link[0]
                        : null;

                    return (
                      <SingleCardItem
                        item={item}
                        propertyOrder={propertyOrder}
                        setOpenDrawer={setOpenDrawer}
                        setGemSingleIdSingleId={setGemSingleIdSingleId}
                        page={page}
                        collectionName={collectionName}
                        checkedBookmark={checkedBookmark}
                        showComment={showComment}
                        user={user}
                        isSharedAndAllowEdit={isSharedAndAllowEdit}
                        permissions={permissions}
                        isFilter={isFilter}
                        handleOpenGem={handleOpenGem}
                        handleCheck={handleCheck}
                        handleNavigateMediaType={handleNavigateMediaType}
                        openGemInWindow={openGemInWindow}
                        imgSrc={imgSrc}
                        favSrc={favSrc}
                        mediaImgsrc={mediaImgsrc}
                        s3Src={s3Src}
                        isMobileView={isMobileView}
                        gemOnClickEvent={gemOnClickEvent}
                      />
                    );
                  })}
                </>
              </SortableContext>
              {createPortal(
                <DragOverlay>
                  {draggedItem && (
                    <SingleCardItem
                      item={draggedItem}
                      page={page}
                      key={draggedItem.id}
                      isDragging={true}
                      isMobileView={isMobileView}
                      propertyOrder={propertyOrder}
                      imgSrc={
                        draggedItem?.metaData &&
                        draggedItem?.metaData?.covers?.length > 0
                          ? draggedItem?.metaData?.covers[0] ||
                            draggedItem?.metaData?.app_screenshot
                          : ""
                      }
                      favSrc={
                        draggedItem?.metaData &&
                        draggedItem?.metaData.length > 0
                          ? typeof draggedItem?.metaData?.icon === "string"
                            ? draggedItem?.metaData?.icon
                            : typeof draggedItem?.metaData?.icon === "object" &&
                              draggedItem?.metaData?.icon?.type === "image"
                            ? draggedItem?.metaData?.icon?.icon
                            : draggedItem?.metaData?.defaultIcon
                            ? draggedItem?.metaData?.defaultIcon
                            : ""
                          : ""
                      }
                    />
                  )}
                </DragOverlay>,
                document.body
              )}
            </DndContext>
          ) : (
            <p>No Bookmarks</p>
          )}
        </>
      )}
      {(page === "broken-duplicate" || page === "filter") && (
        <>
          {shrink ? (
            <>
              <div className="flex flex-col-reverse md:flex md:flex-row">
                <Resizable
                  className="!h-[100vh] !overflow-y-scroll overflow-x-hidden"
                  size={{ width: mobileScreen ? "100%" : width }}
                  onResizeStop={(e, direction, ref, d) => {
                    setWidth(ref.style.width);
                  }}
                  enable={{
                    top: false,
                    bottom: false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                    right: true,
                    left: false,
                  }}
                >
                  <div
                    className={`${
                      cardSize === "medium"
                        ? "grid-container"
                        : cardSize === "large"
                        ? "grid-container-large"
                        : "grid-container-small"
                    }`}
                  >
                    {filteredData && filteredData.length > 0 ? (
                      filteredData.map((item, i) => {
                        const imgSrc =
                          item?.metaData && item?.metaData?.covers?.length > 0
                            ? item?.metaData?.covers[0] ||
                              item?.metaData?.app_screenshot
                            : "";
                        const favSrc =
                          item?.metaData && item?.metaData.length > 0
                            ? typeof item?.metaData?.icon === "string"
                              ? item?.metaData?.icon
                              : typeof item?.metaData?.icon === "object" &&
                                item?.metaData?.icon?.type === "image"
                              ? item?.metaData?.icon?.icon
                              : item?.metaData?.defaultIcon
                              ? item?.metaData?.defaultIcon
                              : ""
                            : "";
                        const mediaImgsrc =
                          item?.media &&
                          item?.media?.covers &&
                          item?.media?.covers?.length > 0
                            ? item?.media?.covers[0]
                            : "";
                        const s3Src =
                          (item?.media_type === "Image" ||
                            item?.media_type === "Screenshot") &&
                          item?.S3_link &&
                          item?.S3_link?.length > 0
                            ? item?.S3_link[0]
                            : null;

                        return (
                          <Card
                            cover={
                              item?.media_type === "Profile"
                                ? renderProfileCardImg(imgSrc, favSrc, "", item)
                                : renderCardImage(
                                    s3Src || imgSrc || mediaImgsrc,
                                    favSrc,
                                    item?.altInfo ||
                                      item?.title ||
                                      item?.description ||
                                      "",
                                    "",
                                    "",
                                    item
                                  )
                            }
                            key={i}
                            className={
                              "border-1 border-solid border-[#DADEE8] group hover:border-2 relative"
                            }
                            style={{
                              height: "100%",
                              cursor: "pointer",
                              background: checkedBookmark?.some(
                                (data) => data.id === item.id
                              )
                                ? "#E7F2FB"
                                : "#fff",
                              color: checkedBookmark?.some(
                                (data) => data.id === item.id
                              )
                                ? "black"
                                : "inherit",
                            }}
                            onClick={(e) => handleOpenGem(e, item)}
                            bodyStyle={{
                              padding:
                                item?.media_type === "Blog" ||
                                item?.media_type === "Article"
                                  ? "8px 8px 24px 8px"
                                  : "24px",
                            }}
                          >
                            <div
                              style={{
                                background: checkedBookmark?.some(
                                  (data) => data.id === item.id
                                )
                                  ? "rgba(231,242,251,0.1)"
                                  : "",
                              }}
                              className={`p-1 absolute top-0 left-0 flex justify-between h-fit w-full ${
                                isMobileView ? "opacity-100" : "opacity-0"
                              } ${
                                !isMobileView &&
                                "transition-opacity  group-hover:opacity-100"
                              }`}
                            >
                              {page === "tags" && permissions ? (
                                <div></div>
                              ) : (
                                <div className="checkDiv">
                                  <Checkbox
                                    onChange={(e) => handleCheck(e, item)}
                                    onClick={(e) => e.stopPropagation()}
                                    checked={checkedBookmark?.some(
                                      (data) => data.id === item.id
                                    )}
                                  />
                                </div>
                              )}

                              <div className="flex">
                                <div
                                  className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1"
                                  title="Open in new tab"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openGemInWindow(item);
                                  }}
                                >
                                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                                </div>

                                {/* <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 mx-2" title="Preview" onClick={(e) => handleOpenGem(e, item)}>
                                                        <EyeIcon className="h-5 w-5" />
                                                    </div> */}

                                <div
                                  className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 ml-1"
                                  title="Edit"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenDrawer(true);
                                    setGemSingleIdSingleId(item.id);
                                  }}
                                >
                                  <PencilSquareIcon className="h-5 w-5" />
                                </div>
                              </div>
                            </div>

                            {(item?.media_type === "Blog" ||
                              item?.media_type === "Article") && (
                              <div className="items center flex">
                                <div className="text-xs font-medium">
                                  {moment(
                                    item?.media?.publishedAt ||
                                      item.media?.articleObj?.datePublished
                                  ).format("MMM DD, YYYY")}
                                </div>
                                {item?.media?.readTime && (
                                  <>
                                    <BsDot className="h-4 w-4 mx-1" />
                                    <div className="text-xs font-medium">
                                      {item?.media?.readTime} min read
                                    </div>
                                  </>
                                )}
                              </div>
                            )}

                            <div className="flex flex-col py-1 mb-1">
                              {renderDetails(
                                propertyOrder || [],
                                item,
                                "",
                                page,
                                handleNavigate,
                                ""
                              )}
                            </div>

                            <div
                              className={`mt-2 border-t-2 p-2 z-50 absolute bottom-0 w-full left-0 ${
                                Number(session.userId) === item?.author?.id
                                  ? "hidden group-hover:block"
                                  : "block"
                              }`}
                            >
                              <GemEngagement
                                gem={item}
                                showBookmark={
                                  (Number(session.userId) !==
                                    item?.author?.id &&
                                    !permissions) ||
                                  permissions?.permissions?.gems
                                    ?.canAddtoBookmark
                                }
                                showComment={showComment}
                                user={user}
                                permissions={permissions}
                              />
                            </div>
                          </Card>
                        );
                      })
                    ) : (
                      <p>No Bookmarks</p>
                    )}
                  </div>
                </Resizable>

                <div
                  className={`h-full  ${mobileScreen && "mb-4"}`}
                  style={{
                    width: mobileScreen ? "100%" : `calc(100% - ${width})`,
                  }}
                >
                  <div
                    className="mb-2 ml-1"
                    style={{
                      borderBottomColor: "#d9d9d9",
                      borderBottomStyle: "solid",
                      borderBottomWidth: "1px",
                    }}
                  >
                    <div className="p-2 w-fit hover:bg-[#f2f2f2] hover:rounded-[2px]">
                      <XMarkIcon
                        className="cursor-pointer h-5 w-5"
                        onClick={handleResetShrink}
                      />
                    </div>
                  </div>
                  <Outlet context={"inboxView"} />
                </div>
              </div>
            </>
          ) : filteredData && filteredData.length > 0 ? (
            filteredData.map((item, i) => {
              const imgSrc =
                (item?.metaData && item?.metaData?.covers?.length > 0)
                  ? (item?.metaData?.covers[0] || item?.metaData?.app_screenshot)
                  : "";
              const favSrc =
                (item?.metaData && item?.metaData.length > 0)
                  ? typeof item?.metaData?.icon === "string"
                    ? item?.metaData?.icon
                    : typeof item?.metaData?.icon === "object" &&
                      item?.metaData?.icon?.type === "image"
                    ? item?.metaData?.icon?.icon
                    : item?.metaData?.defaultIcon
                    ? item?.metaData?.defaultIcon
                    : ""
                  : "";
              const mediaImgsrc =
                (item?.media &&
                item?.media?.covers &&
                item?.media?.covers?.length > 0)
                  ? item?.media?.covers[0]
                  : "";
              const s3Src =
                ((item?.media_type === "Image" ||
                  item?.media_type === "Screenshot") &&
                (item?.S3_link &&
                item?.S3_link?.length > 0))
                  ? item?.S3_link[0]
                  : null;

              return (
                <SingleCard
                  item={item}
                  propertyOrder={propertyOrder}
                  setOpenDrawer={setOpenDrawer}
                  setGemSingleIdSingleId={setGemSingleIdSingleId}
                  page={page}
                  collectionName={collectionName}
                  checkedBookmark={checkedBookmark}
                  showComment={showComment}
                  user={user}
                  isSharedAndAllowEdit={isSharedAndAllowEdit}
                  permissions={permissions}
                  isFilter={isFilter}
                  handleOpenGem={handleOpenGem}
                  handleCheck={handleCheck}
                  handleNavigateMediaType={handleNavigateMediaType}
                  openGemInWindow={openGemInWindow}
                  imgSrc={imgSrc}
                  favSrc={favSrc}
                  mediaImgsrc={mediaImgsrc}
                  s3Src={s3Src}
                  isMobileView={isMobileView}
                  gemOnClickEvent={gemOnClickEvent}
                  handleNavigate={handleNavigate}
                />
              );
            })
          ) : (
            <p>No Bookmarks</p>
          )}
        </>
      )}

      {page === "tags" && (
        <>
          {shrink ? (
            <>
              <div className="flex flex-col-reverse md:flex md:flex-row">
                <Resizable
                  className="!h-[100vh] !overflow-y-scroll overflow-x-hidden"
                  size={{ width: mobileScreen ? "100%" : width }}
                  onResizeStop={(e, direction, ref, d) => {
                    setWidth(ref.style.width);
                  }}
                  enable={{
                    top: false,
                    bottom: false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                    right: true,
                    left: false,
                  }}
                >
                  <div
                    className={`${
                      cardSize === "medium"
                        ? "grid-container"
                        : cardSize === "large"
                        ? "grid-container-large"
                        : "grid-container-small"
                    }`}
                  >
                    {filteredData && filteredData.length > 0 ? (
                      filteredData.map((item, i) => {
                        const imgSrc =
                          item?.metaData && item?.metaData?.covers?.length > 0
                            ? item?.metaData?.covers[0] ||
                              item?.metaData?.app_screenshot
                            : "";
                        const favSrc =
                          item?.metaData && item?.metaData?.length > 0
                            ? typeof item?.metaData?.icon === "string"
                              ? item?.metaData?.icon
                              : typeof item?.metaData?.icon === "object" &&
                                item?.metaData?.icon?.type === "image"
                              ? item?.metaData?.icon?.icon
                              : item?.metaData?.defaultIcon
                              ? item?.metaData?.defaultIcon
                              : ""
                            : "";
                        const mediaImgsrc =
                          item?.media &&
                          item?.media?.covers &&
                          item?.media?.covers?.length > 0
                            ? item?.media?.covers[0]
                            : "";
                        const s3Src =
                          (item?.media_type === "Image" ||
                            item?.media_type === "Screenshot") &&
                          item?.S3_link &&
                          item?.S3_link?.length > 0
                            ? item?.S3_link[0]
                            : null;

                        return (
                          <Card
                            cover={
                              item?.media_type === "Profile"
                                ? renderProfileCardImg(imgSrc, favSrc, "", item)
                                : renderCardImage(
                                    s3Src || imgSrc || mediaImgsrc,
                                    favSrc,
                                    item?.altInfo ||
                                      item?.title ||
                                      item?.description ||
                                      "",
                                    "",
                                    "",
                                    item
                                  )
                            }
                            key={i}
                            className={
                              "border-1 border-solid border-[#DADEE8] group hover:border-2 relative"
                            }
                            style={{
                              height: "100%",
                              cursor: "pointer",
                              background: checkedBookmark?.some(
                                (data) => data.id === item.id
                              )
                                ? "#E7F2FB"
                                : "#fff",
                              color: checkedBookmark?.some(
                                (data) => data.id === item.id
                              )
                                ? "black"
                                : "inherit",
                            }}
                            onClick={(e) => handleOpenGem(e, item)}
                            bodyStyle={{
                              padding:
                                item?.media_type === "Blog" ||
                                item?.media_type === "Article"
                                  ? "8px 8px 24px 8px"
                                  : "24px",
                            }}
                          >
                            <div
                              style={{
                                background: checkedBookmark?.some(
                                  (data) => data.id === item.id
                                )
                                  ? "rgba(231,242,251,0.1)"
                                  : "",
                              }}
                              className={`p-1 absolute top-0 left-0 flex justify-between h-fit w-full ${
                                isMobileView ? "opacity-100" : "opacity-0"
                              } ${
                                !isMobileView &&
                                "transition-opacity  group-hover:opacity-100"
                              }`}
                            >
                              {page === "tags" && permissions ? (
                                <div></div>
                              ) : (
                                <div className="checkDiv">
                                  <Checkbox
                                    onChange={(e) => handleCheck(e, item)}
                                    onClick={(e) => e.stopPropagation()}
                                    checked={checkedBookmark?.some(
                                      (data) => data.id === item.id
                                    )}
                                  />
                                </div>
                              )}

                              <div className="flex">
                                <div
                                  className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1"
                                  title="Open in new tab"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openGemInWindow(item);
                                  }}
                                >
                                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                                </div>

                                {/* <div className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 mx-2" title="Preview" onClick={(e) => handleOpenGem(e, item)}>
                                                        <EyeIcon className="h-5 w-5" />
                                                    </div> */}

                                <div
                                  className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 ml-1"
                                  title="Edit"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenDrawer(true);
                                    setGemSingleIdSingleId(item.id);
                                  }}
                                >
                                  <PencilSquareIcon className="h-5 w-5" />
                                </div>
                              </div>
                            </div>

                            {(item?.media_type === "Blog" ||
                              item?.media_type === "Article") && (
                              <div className="items center flex">
                                <div className="text-xs font-medium">
                                  {moment(
                                    item?.media?.publishedAt ||
                                      item.media?.articleObj?.datePublished
                                  ).format("MMM DD, YYYY")}
                                </div>
                                {item?.media?.readTime && (
                                  <>
                                    <BsDot className="h-4 w-4 mx-1" />
                                    <div className="text-xs font-medium">
                                      {item?.media?.readTime} min read
                                    </div>
                                  </>
                                )}
                              </div>
                            )}

                            <div className="flex flex-col py-1 mb-1">
                              {renderDetails(
                                propertyOrder || [],
                                item,
                                "",
                                page,
                                handleNavigate,
                                ""
                              )}
                            </div>

                            <div
                              className={`mt-2 border-t-2 p-2 z-50 absolute bottom-0 w-full left-0 ${
                                Number(session.userId) === item?.author?.id
                                  ? "hidden group-hover:block"
                                  : "block"
                              }`}
                            >
                              <GemEngagement
                                gem={item}
                                showBookmark={
                                  (Number(session.userId) !==
                                    item?.author?.id &&
                                    !permissions) ||
                                  permissions?.permissions?.gems
                                    ?.canAddtoBookmark
                                }
                                showComment={showComment}
                                user={user}
                                permissions={permissions}
                              />
                            </div>
                          </Card>
                        );
                      })
                    ) : (
                      <p>No Bookmarks</p>
                    )}
                  </div>
                </Resizable>

                <div
                  className={`h-full  ${mobileScreen && "mb-4"}`}
                  style={{
                    width: mobileScreen ? "100%" : `calc(100% - ${width})`,
                  }}
                >
                  <div
                    className="mb-2 ml-1"
                    style={{
                      borderBottomColor: "#d9d9d9",
                      borderBottomStyle: "solid",
                      borderBottomWidth: "1px",
                    }}
                  >
                    <div className="p-2 w-fit hover:bg-[#f2f2f2] hover:rounded-[2px]">
                      <XMarkIcon
                        className="cursor-pointer h-5 w-5"
                        onClick={handleResetShrink}
                      />
                    </div>
                  </div>
                  <Outlet context={"inboxView"} />
                </div>
              </div>
            </>
          ) : filteredData && filteredData.length > 0 ? (
            <DndContext
              onDragStart={handleDragStart}
              collisionDetection={closestCorners}
              onDragEnd={handleDragEnd}
              sensors={sensors}
            >
              <SortableContext items={itemsId} strategy={rectSwappingStrategy}>
                <>
                  {filteredData.map((item, i) => {
                    const imgSrc =
                      (item?.metaData && item?.metaData?.covers?.length > 0)
                        ? item?.metaData?.covers[0] ||
                          item?.metaData?.app_screenshot
                        : "";
                    const favSrc =
                      (item?.metaData && item?.metaData.length > 0)
                        ? typeof item?.metaData?.icon === "string"
                          ? item?.metaData?.icon
                          : typeof item?.metaData?.icon === "object" &&
                            item?.metaData?.icon?.type === "image"
                          ? item?.metaData?.icon?.icon
                          : item?.metaData?.defaultIcon
                          ? item?.metaData?.defaultIcon
                          : ""
                        : "";
                    const mediaImgsrc =
                      (item?.media &&
                      item?.media?.covers &&
                      item?.media?.covers?.length > 0)
                        ? item?.media?.covers[0]
                        : "";
                    const s3Src =
                      ((item?.media_type === "Image" ||
                        item?.media_type === "Screenshot") &&
                      (item?.S3_link &&
                      item?.S3_link?.length > 0))
                        ? item?.S3_link[0]
                        : null;

                    return (
                      <SingleCardItem
                        item={item}
                        propertyOrder={propertyOrder}
                        setOpenDrawer={setOpenDrawer}
                        setGemSingleIdSingleId={setGemSingleIdSingleId}
                        page={page}
                        collectionName={collectionName}
                        checkedBookmark={checkedBookmark}
                        showComment={showComment}
                        user={user}
                        isSharedAndAllowEdit={isSharedAndAllowEdit}
                        permissions={permissions}
                        isFilter={isFilter}
                        handleOpenGem={handleOpenGem}
                        handleCheck={handleCheck}
                        handleNavigateMediaType={handleNavigateMediaType}
                        openGemInWindow={openGemInWindow}
                        imgSrc={imgSrc}
                        favSrc={favSrc}
                        mediaImgsrc={mediaImgsrc}
                        s3Src={s3Src}
                        isMobileView={isMobileView}
                        gemOnClickEvent={gemOnClickEvent}
                      />
                    );
                  })}
                </>
              </SortableContext>
              {createPortal(
                <DragOverlay>
                  {draggedItem && (
                    <SingleCardItem
                      item={draggedItem}
                      page={page}
                      key={draggedItem.id}
                      isDragging={true}
                      isMobileView={isMobileView}
                      propertyOrder={propertyOrder}
                      imgSrc={
                        draggedItem?.metaData &&
                        draggedItem?.metaData?.covers?.length > 0
                          ? draggedItem?.metaData?.covers[0] ||
                            draggedItem?.metaData?.app_screenshot
                          : ""
                      }
                      favSrc={
                        draggedItem?.metaData &&
                        draggedItem?.metaData.length > 0
                          ? typeof draggedItem?.metaData?.icon === "string"
                            ? draggedItem?.metaData?.icon
                            : typeof draggedItem?.metaData?.icon === "object" &&
                              draggedItem?.metaData?.icon?.type === "image"
                            ? draggedItem?.metaData?.icon?.icon
                            : draggedItem?.metaData?.defaultIcon
                            ? draggedItem?.metaData?.defaultIcon
                            : ""
                          : ""
                      }
                    />
                  )}
                </DragOverlay>,
                document.body
              )}
            </DndContext>
          ) : (
            <p>No Bookmarks</p>
          )}
        </>
      )}

      {page === "embed" && (
        <>
          {items && items.length > 0 ? (
            items.map((item, i) => {
              const imgSrc =
                (item?.metaData && item?.metaData?.covers?.length > 0)
                  ? (item?.metaData?.covers[0] || item?.metaData?.app_screenshot)
                  : "";
              const favSrc =
                (item?.metaData && item?.metaData?.length > 0)
                  ? typeof item?.metaData?.icon === "string"
                    ? item?.metaData?.icon
                    : typeof item?.metaData?.icon === "object" &&
                      item?.metaData?.icon?.type === "image"
                    ? item?.metaData?.icon?.icon
                    : item?.metaData?.defaultIcon
                    ? item?.metaData?.defaultIcon
                    : ""
                  : "";
              const s3Src =
                ((item?.media_type === "Image" ||
                  item?.media_type === "Screenshot") &&
                (item?.S3_link &&
                item?.S3_link?.length > 0))
                  ? item?.S3_link[0]
                  : null;

              return (
                <Card
                  cover={
                    item?.media_type === "Profile"
                      ? renderProfileCardImg(imgSrc || favSrc, item)
                      : renderCardImage(
                          imgSrc || s3Src || mediaImgsrc || favSrc,
                          item
                        )
                  }
                  key={i}
                  className={
                    "group rounded-2xl bg-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                  }
                  style={{
                    height: "100%",
                    cursor: "pointer",
                    background: "#fff",
                    color: "black",
                  }}
                >
                  {/* hover icons */}
                  <div
                    className={`p-1 absolute top-0 left-0 flex justify-between h-fit w-full ${
                      isMobileView ? "opacity-100" : "opacity-0"
                    } ${
                      !isMobileView &&
                      "transition-opacity  group-hover:opacity-100"
                    }`}
                  >
                    <div className="flex justify-end w-full">
                      {item?.url && (
                        <div
                          className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 mx-2"
                          title="Copy"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyUrl(item);
                          }}
                        >
                          <PiCopy className="h-5 w-5" />
                        </div>
                      )}
                      <div
                        className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1"
                        title="Open in new tab"
                        onClick={(e) => {
                          e.stopPropagation();
                          openGemInWindow(item);
                        }}
                      >
                        <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col py-1">
                    {renderDetailsWithoutProperty(item, collectionName)}
                  </div>
                </Card>
              );
            })
          ) : (
            <p>No Bookmarks</p>
          )}
        </>
      )}

      {page === "parent-child" && (
        <>
          {filteredData && filteredData.length > 0
            ? filteredData
                .map((item, i) => {
                  const imgSrc =
                    item?.metaData && item?.metaData?.covers?.length > 0
                      ? item?.metaData?.covers[0] ||
                        item?.metaData?.app_screenshot
                      : "";
                  const favSrc =
                    item?.metaData && item?.metaData?.length > 0
                      ? typeof item?.metaData?.icon === "string"
                        ? item?.metaData?.icon
                        : typeof item?.metaData?.icon === "object" &&
                          item?.metaData?.icon?.type === "image"
                        ? item?.metaData?.icon?.icon
                        : item?.metaData?.defaultIcon
                        ? item?.metaData?.defaultIcon
                        : ""
                      : "";
                  const s3Src =
                    (item?.media_type === "Image" ||
                      item?.media_type === "Screenshot") &&
                    item?.S3_link &&
                    item?.S3_link?.length > 0
                      ? item?.S3_link[0]
                      : null;

                  return (
                    <Card
                      cover={
                        item?.media_type === "Profile"
                          ? renderProfileCardImg(imgSrc, favSrc, "", item)
                          : renderCardImage(
                              s3Src || imgSrc,
                              favSrc,
                              item?.altInfo ||
                                item?.title ||
                                item?.description ||
                                ""
                            )
                      }
                      key={i}
                      className={
                        "border-1 border-solid border-[#DADEE8] group hover:border-2"
                      }
                      style={{
                        height: "100%",
                        cursor: "pointer",
                        background: "inherit",
                        color: "inherit",
                      }}
                    >
                      {/* hover icons */}
                      <div
                        className={`p-1 absolute top-0 left-0 flex justify-between h-fit w-full opacity-0 transition-opacity  group-hover:opacity-100`}
                      >
                        <div className="flex justify-end w-full">
                          <div
                            className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1"
                            title="Open in new tab"
                            onClick={(e) => {
                              e.stopPropagation();
                              openGemInWindow(item);
                            }}
                          >
                            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                          </div>
                        </div>
                      </div>

                      {(item?.media_type === "Blog" ||
                        item?.media_type === "Article") && (
                        <div className="items center flex">
                          <div className="text-xs font-medium">
                            {moment(
                              item?.media?.publishedAt ||
                                item.media?.articleObj?.datePublished
                            ).format("MMM DD, YYYY")}
                          </div>
                          {item?.media?.readTime && (
                            <>
                              <BsDot className="h-4 w-4 mx-1" />
                              <div className="text-xs font-medium">
                                {item?.media?.readTime} min read
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      <div className="flex flex-col">
                        {renderDetails(propertyOrder, item, collectionName)}
                      </div>
                    </Card>
                  );
                })
                .slice(0, 5)
            : "No Bookmark"}
        </>
      )}
    </>
  );
};

export default BookmarkCard;