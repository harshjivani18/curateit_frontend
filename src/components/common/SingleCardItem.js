import { Avatar, Card, Checkbox }           from "antd";
import ReactPlayer                          from "react-player";
import { useSortable }                      from "@dnd-kit/sortable";
import { CSS }                              from "@dnd-kit/utilities";
import moment                               from "moment";
import { BsDot }                            from "react-icons/bs";
import {
    PencilSquareIcon,
    ArrowTopRightOnSquareIcon,
    EyeIcon
}                                           from '@heroicons/react/24/outline'

import GemEngagement                        from "@components/gemEngagement/GemEngagement";

import { renderDetails }                    from "@utils/commonFunctions";
import session                              from "@utils/session";
import { 
  copyText,
    MEDIUM_REGEX, 
    MEDIUM_REPLACEMENT_STR 
}                                           from "@utils/constants";
import { useState } from "react";
import Image from "next/image";
import { PiCopy } from "react-icons/pi";

const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env;

const SingleCardItem = ({item,propertyOrder, setOpenDrawer, setGemSingleIdSingleId, page = '', collectionName = '', checkedBookmark, showComment, user,isSharedAndAllowEdit,permissions,isFilter,handleOpenGem,handleCheck,handleNavigateMediaType,openGemInWindow,imgSrc, favSrc, mediaImgsrc,s3Src,isMobileView,gemOnClickEvent}) => {
    const { attributes, listeners, setNodeRef, transform, transition,isDragging } =
    useSortable({id: item.id});
    const [fallbackURL, setFallbackURL] = useState(null);

    const handleCopyUrl = (item) => {
      if (item?.url) {
        copyText(item?.url, "Link copied to clipboard");
      }
    };

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

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
                  item?.altInfo ||
                  item?.title ||
                  item?.description ||
                  "Curateit"
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

    if(isDragging){
        return(
            <div
            ref={setNodeRef}
            style={style}
            className="opacity-40 bg-[#dedede] rounded-md border border-solid border-[#DADEE8]"
            >

            </div>
        )
    }

    if((page === 'collection' && isSharedAndAllowEdit && !isFilter) || (page === 'tags' && isSharedAndAllowEdit && !isFilter)){
        return (
          <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            key={item.id}
            className="touch-none"
          >
            <Card
              cover={
                item?.media_type === "Profile"
                  ? renderProfileCardImg(imgSrc || favSrc, item)
                  : renderCardImage(
                      s3Src || imgSrc || mediaImgsrc || favSrc,
                      item
                    )
              }
              // key={i}
              className={
                "group overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl"
              }
              style={{
                height: "100%",
                cursor: "pointer",
                background: checkedBookmark?.some((data) => data.id === item.id)
                  ? "#E7F2FB"
                  : "#fff",
                color: checkedBookmark?.some((data) => data.id === item.id)
                  ? "black"
                  : "inherit",
              }}
              onClick={(e) => {
                if (gemOnClickEvent === "gem view") {
                  handleOpenGem(e, item);
                } else {
                  e.stopPropagation();
                  openGemInWindow(item);
                }
              }}
              bodyStyle={{
                padding:
                  item?.media_type === "Blog" || item?.media_type === "Article"
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
                  !isMobileView && "transition-opacity  group-hover:opacity-100"
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
                  <div></div>
                )}

                <div className="flex">
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

                  {gemOnClickEvent === "gem view" ? (
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
                  ) : (
                    <div
                      className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 mx-2"
                      title="Preview"
                      onClick={(e) => handleOpenGem(e, item)}
                    >
                      <EyeIcon className="h-5 w-5" />
                    </div>
                  )}

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
                    (Number(session.userId) !== item?.author?.id &&
                      !permissions) ||
                    permissions?.permissions?.gems?.canAddtoBookmark
                  }
                  showComment={showComment}
                  user={user}
                  permissions={permissions}
                />
              </div>
            </Card>
          </div>
        );
    }

    return (
      <div>
        <Card
          cover={
            item?.media_type === "Profile"
              ? renderProfileCardImg(imgSrc || favSrc, item)
              : renderCardImage(s3Src || imgSrc || mediaImgsrc || favSrc, item)
          }
          // key={i}
          className={
            "group overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl"
          }
          style={{
            height: "100%",
            cursor: "pointer",
            background: checkedBookmark?.some((data) => data.id === item.id)
              ? "#E7F2FB"
              : "#fff",
            color: checkedBookmark?.some((data) => data.id === item.id)
              ? "black"
              : "inherit",
          }}
          onClick={(e) => {
            if (gemOnClickEvent === "gem view") {
              handleOpenGem(e, item);
            } else {
              e.stopPropagation();
              openGemInWindow(item);
            }
          }}
          bodyStyle={{
            padding:
              item?.media_type === "Blog" || item?.media_type === "Article"
                ? "8px 8px 24px 8px"
                : "24px",
          }}
        >
          {/* hover icons */}
          <div
            style={{
              background: checkedBookmark?.some((data) => data.id === item.id)
                ? "rgba(231,242,251,0.1)"
                : "",
            }}
            className={`p-1 absolute top-0 left-0 flex justify-between h-fit w-full ${
              isMobileView ? "opacity-100" : "opacity-0"
            } ${
              !isMobileView && "transition-opacity  group-hover:opacity-100"
            }`}
          >
            {isSharedAndAllowEdit ? (
              <div className="checkDiv">
                <Checkbox
                  onChange={(e) => handleCheck(e, item)}
                  onClick={(e) => e.stopPropagation()}
                  checked={checkedBookmark?.some((data) => data.id === item.id)}
                />
              </div>
            ) : (
              <div></div>
            )}

            <div className="flex">
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

              {gemOnClickEvent === "gem view" ? (
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
              ) : (
                <div
                  className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 mx-2"
                  title="Preview"
                  onClick={(e) => handleOpenGem(e, item)}
                >
                  <EyeIcon className="h-5 w-5" />
                </div>
              )}

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
                <div></div>
              )}
            </div>
          </div>

          {item?.media_type === "Blog" ||
            (item?.media_type === "Article" && (
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
            ))}

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
                (Number(session.userId) !== item?.author?.id && !permissions) ||
                permissions?.permissions?.gems?.canAddtoBookmark
              }
              showComment={showComment}
              user={user}
              permissions={permissions}
            />
          </div>
        </Card>
      </div>
    );
}

export default SingleCardItem;