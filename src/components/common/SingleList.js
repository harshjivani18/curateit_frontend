import { Avatar, Checkbox } from "antd";
import {
  ArrowTopRightOnSquareIcon,
  EyeIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import GemEngagement from "@components/gemEngagement/GemEngagement";

import { renderDetails } from "@utils/commonFunctions";
import {
  copyText,
  MEDIUM_REGEX,
  MEDIUM_REPLACEMENT_STR,
} from "@utils/constants";
import session from "@utils/session";
import Image from "next/image";
import { useState } from "react";
import { PiCopy } from "react-icons/pi";

const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env;

const SingleList = ({
  item,
  handleOpenGem,
  propertyOrder,
  collectionName,
  setOpenDrawer,
  setGemSingleIdSingleId,
  page,
  checkedBookmark,
  showComment,
  showAddToBookmark,
  user,
  isSharedAndAllowEdit,
  permissions,
  isFilter,
  imgSrc,
  favSrc,
  mediaImgsrc,
  s3Src,
  handleNavigate,
  handleNavigateMediaType,
  isMobileView,
  handleCheck,
  openGemInWindow,
  gemOnClickEvent,
  showEdit,
}) => {
  const [fallbackURL, setFallbackURL] = useState(null);

  const handleCopyUrl = (item) => {
    if (item?.url) {
      copyText(item?.url, "Link copied to clipboard");
    }
  };

  const renderCardImage = (imgSrc, item) => {
    return propertyOrder?.some((data) => data.name === "Thumbnail") ? (
      <div
        className="tweet-image overflow-hidden rounded-md"
        style={{ width: "100%", position: "relative" }}
      >
        <Image
          alt={item?.altInfo || item?.title || item?.description || "Curateit"}
          className={`cardImageEffect object-scale-down max-w-[100%] object-center`}
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
          src={
            fallbackURL
              ? fallbackURL
              : imgSrc
              ? imgSrc
                  ?.replace("resize:fill:112:112", "resize:fit:2400")
                  ?.replace("resize:fill:40:40", "resize:fit:2400")
                  ?.replace("_SY160", "_SY800")
                  ?.replace(MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR)
                  ?.replace(
                    NEXT_PUBLIC_STATIC_S3_BASE_URL,
                    `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`
                  )
              : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
          }
        />
      </div>
    ) : null;
  };

  const renderProfileCardImg = (imgSrc, item) => {
    return propertyOrder?.some((data) => data.name === "Thumbnail") ? (
      <div className="flex items-center justify-center mt-2 overflow-hidden rounded-md">
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
                        `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`
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

  if (
    page === "bookmark" ||
    page === "collection-public-shared" ||
    page === "profile-bookmark"
  ) {
    return (
      <>
        <div
          key={item.id}
          className={`bg-white cursor-pointer rounded-[8px] flex items-center mb-[16px] group relative shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl`}
          onClick={(e) => {
            if (gemOnClickEvent === "gem view") {
              handleOpenGem(e, item);
            } else {
              e.stopPropagation();
              openGemInWindow(item);
            }
          }}
          style={{
            background: checkedBookmark?.some((data) => data.id === item.id)
              ? "#E7F2FB"
              : "#fff",
            color: checkedBookmark?.some((data) => data.id === item.id)
              ? "black"
              : "inherit",
          }}
        >
          {propertyOrder?.some((data) => data.name === "Thumbnail") ? (
            <div className="hidden sm:block flex-none w-[10%] m-10">
              {item?.media_type === "Profile"
                ? renderProfileCardImg(imgSrc || favSrc, item)
                : renderCardImage(
                    imgSrc || mediaImgsrc || favSrc || s3Src,
                    item
                  )}
            </div>
          ) : (
            <></>
          )}

          <div
            style={{
              background: checkedBookmark?.some((data) => data.id === item.id)
                ? "rgba(231,242,251,0.1)"
                : "",
            }}
            className={`p-1 absolute top-0 left-0 flex items-center justify-between h-fit ${
              isMobileView ? "opacity-100 w-full" : "opacity-0 w-[11%]"
            } ${
              !isMobileView && "transition-opacity  group-hover:opacity-100"
            }`}
          >
            <div className="checkDiv">
              {showEdit && (
                <Checkbox
                  onChange={(e) => handleCheck(e, item)}
                  onClick={(e) => e.stopPropagation()}
                  checked={checkedBookmark?.some((data) => data.id === item.id)}
                />
              )}
            </div>

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

              {showEdit && (
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
              )}
            </div>
          </div>

          <div className="flex-auto p-2 w-[90%] overflow-x-hidden">
            <div className="flex flex-col cursor-pointer">
              {renderDetails(
                propertyOrder,
                item,
                "",
                page,
                handleNavigate,
                handleNavigateMediaType
              )}
            </div>

            <div className="mt-2 border-t-2 pt-2 z-50"></div>

            <div
              className={`z-[100] w-full flex items-center justify-between md:w-[30%] ${
                Number(session.userId) === item?.author?.id ||
                page === "collection-public-shared"
                  ? "hidden group-hover:block"
                  : "block"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <GemEngagement
                gem={item}
                showBookmark={
                  (Number(session.userId) !== item?.author?.id &&
                    !permissions) ||
                  permissions?.permissions?.gems?.canAddtoBookmark
                }
                showComment={showComment}
                showAddToBookmark={showAddToBookmark}
                user={user}
                permissions={permissions}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      key={item.id}
      className={`bg-white cursor-pointer rounded-[8px] flex items-center mb-[16px] group relative shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl`}
      onClick={(e) => {
        if (gemOnClickEvent === "gem view") {
          handleOpenGem(e, item);
        } else {
          e.stopPropagation();
          openGemInWindow(item);
        }
      }}
      style={{
        background: checkedBookmark?.some((data) => data.id === item.id)
          ? "#E7F2FB"
          : "#fff",
        color: checkedBookmark?.some((data) => data.id === item.id)
          ? "black"
          : "inherit",
      }}
    >
      {propertyOrder?.some((data) => data.name === "Thumbnail") ? (
        <div className="hidden sm:block flex-none w-[10%] m-10">
          {item?.media_type === "Profile"
            ? renderProfileCardImg(imgSrc, favSrc, item)
            : renderCardImage(imgSrc || mediaImgsrc || favSrc || s3Src, item)}
        </div>
      ) : (
        <></>
      )}

      {/* hover icons */}
      <div
        style={{
          background: checkedBookmark?.some((data) => data.id === item.id)
            ? "rgba(231,242,251,0.1)"
            : "",
        }}
        className={`p-1 absolute top-0 left-0 flex items-center justify-between h-fit ${
          isMobileView ? "opacity-100 w-full" : "opacity-0 w-[11%]"
        } ${!isMobileView && "transition-opacity  group-hover:opacity-100"}`}
      >
        {page === "tags" && permissions ? (
          <div></div>
        ) : (
          <div className="checkDiv">
            <Checkbox
              onChange={(e) => handleCheck(e, item)}
              onClick={(e) => e.stopPropagation()}
              checked={checkedBookmark?.some((data) => data.id === item.id)}
            />
          </div>
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

      <div className="flex-auto p-2 w-[90%] overflow-x-hidden">
        <div className="flex flex-col cursor-pointer">
          {renderDetails(
            propertyOrder,
            item,
            collectionName,
            page,
            handleNavigate,
            handleNavigateMediaType
          )}
        </div>

        <div className="mt-2 border-t-2 pt-2 z-50"></div>

        <div
          className={`z-[100] w-full flex items-center justify-between md:w-[30%] ${
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
            showAddToBookmark={showAddToBookmark}
            user={user}
            permissions={permissions}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleList;
