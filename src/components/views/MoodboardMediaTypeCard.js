import "./MoodboardCard.css"
import { Avatar, Button, Checkbox } from 'antd'
import { ArrowTopRightOnSquareIcon, CheckIcon, DocumentDuplicateIcon, EyeIcon, PencilSquareIcon, PhoneIcon, PlayCircleIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import TweetDetail from './card/TweetDetail'
import CodeMirror from '@uiw/react-codemirror';
import { javascript }               from '@codemirror/lang-javascript';
import SocialFeedDetailCard from './card/SocialFeedDetailCard'
// import { AiFillGithub, AiFillLinkedin, AiFillMediumSquare, AiFillRedditSquare, AiFillTwitterSquare  } from 'react-icons/ai';
import slugify from "slugify";
import { useDispatch, useSelector } from "react-redux"
import TestimonialCard from "./card/TestimonialCard"
import GemEngagement from "@components/gemEngagement/GemEngagement"
import QuoteCard from "./card/QuoteCard"
import { getColorForProfilePlatform, renderDetails } from "@utils/commonFunctions"
import session from "@utils/session"
import { HIGHLIGHTED_COLORS, MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR, PROFILE_PLATFORMS_ICON, copyText, getDomainFromURL } from "@utils/constants"
import { useRouter } from "next/navigation"
import { convertHtmlToReact } from "@hedgedoc/html-to-react"
import { MdOutlineMail } from "react-icons/md"
import { updateGem } from "@actions/collection"
import { updateUsageCount } from "@actions/gems"
import {  useEffect, useState } from "react";
import { IoColorPaletteOutline } from "react-icons/io5";
import ReactPlayer from 'react-player';
import RatingComponent from "@components/common/RatingComponent"
// import { RiFileCopyFill } from "react-icons/ri";
import FavIconComponent from "@components/common/FavIconComponent";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { PiCopy } from "react-icons/pi";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const MoodboardMediaTypeCard = ({
  item,
  showComment,
  checkedBookmark,
  handleOpenGem,
  setOpenDrawer,
  setGemSingleIdSingleId,
  handleCheck,
  user,
  showEdit = "",
  showAddToBookmark,
  propertyOrder,
  page,
  collectionName = "",
  layout,
  hideGemEngagement = false,
  isSharedAndAllowEdit,
  permissions,
  showSocialIcons = "",
  isFilter,
  gemOnClickEvent = '',
}) => {
  const { isMobileView } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useRouter();

  const [isUrlHovered, setIsUrlHovered] = useState(false);
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [fallbackURL, setFallbackURL] = useState(null);
  const [noteColor, setNoteColor] = useState("");
  const NEXT_PUBLIC_STATIC_S3_BASE_URL =
    process.env.NEXT_PUBLIC_STATIC_S3_BASE_URL;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    background: checkedBookmark?.some((data) => data.id === item.id)
      ? "#E7F2FB"
      : "",
    color: checkedBookmark?.some((data) => data.id === item.id) ? "black" : "",
  };

  useEffect(() => {
    if (item && item?.media_type === "Note") {
      setNoteColor(item?.media?.color || "");
    }
  }, [item]);

  const openGemInWindow = (item) => {
    if (item?.media_type === "Article" && !item?.isRead) {
      const payload = {
        ...item,
        isRead: true,
      };

      delete payload.id;
      dispatch(updateGem(item.id, { data: payload }));
    }
    if (
      session.token &&
      item.author?.id &&
      parseInt(session.userId) === item.author?.id
    ) {
      dispatch(updateUsageCount(item.id));
    }
    window.open(item?.url || "", "_blank");
  };

  const handleUpdateNoteColor = async (color, item) => {
    const media = {
      ...item.media,
      color: color,
      styleClassName: color.className,
    };

    setNoteColor(media?.color);
    setShowColorOptions(false);
    dispatch(updateGem(item.id, { data: { media } }));
  };

  const renderMedia = (item) => {
    const imgSrc =
      item?.metaData &&
      item?.metaData?.covers &&
      item?.metaData?.covers?.length > 0
        ? item?.metaData?.covers[0]
        : "";
    const title = item?.title || "";

    let text = item?.isRead ? "read" : "to Read";
    text = text && text.charAt(0).toUpperCase() + text.slice(1);

    if (item?.media_type === "Link" || item?.media_type === "Article") {
      return (
        <div
          classsName="w-full"
          style={{ position: "relative", background: "white" }}
        >
          {item?.media_type === "Article" && text && (
            <div className="absolute top-0 right-0 block group-hover:hidden pt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="fit-content"
                height="22"
                viewBox="0 0 102 30"
                fill="none"
              >
                <path
                  d="M100 29.8C100.994 29.8 101.8 28.9941 101.8 28V2C101.8 1.00589 100.994 0.200001 100 0.200001L2.81549 0.200001C1.21352 0.200001 0.409668 2.13545 1.54029 3.27037L12.0253 13.7953C12.8961 14.6694 12.8779 16.0886 11.985 16.9401L1.75311 26.6974C0.577606 27.8183 1.37101 29.8 2.99532 29.8L100 29.8Z"
                  fill={text === "Read" ? "#00D863" : `#348EE2`}
                  stroke="white"
                  stroke-width="0.4"
                />
                <text
                  x="50%"
                  y="50%"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  fill="white"
                  font-size="16"
                  font-family="Arial, sans-serif"
                >
                  {text}
                </text>
              </svg>
            </div>
          )}

          <div
            className={`${
              checkedBookmark?.some((data) => data.id === item.id)
                ? "bg-[#E7F2FB]"
                : ""
            } overflow-hidden rounded-md`}
          >
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
                        `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/700x700_min`
                      ) ||
                    `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              }
              alt={
                item?.altInfo || item?.title || item?.description || "Curateit"
              }
              className="w-full object-cover block h-full moodboardImageEffect"
              onError={(e) => {
                // e.target.onerror = null;
                setFallbackURL(
                  item?.metaData?.fallbackURL
                    ? item?.metaData?.fallbackURL
                    : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                );
                // const isFailedBefore = e.target.getAttribute("data-isFailedBefore")
                // if(!isFailedBefore){
                //     e.target.setAttribute("data-isFailedBefore", true)
                //     e.target.src= item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                // }
                // else {
                //     e.target.src = `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                // }
                // console.log("Error ===>", e.target.src)
              }}
              priority={true}
              style={{
                maxWidth: "100%",
              }}
            />
          </div>

          <div className="truncate p-1 font-medium flex-1">{title}</div>

          {/* <div className={`p-1 text-xs absolute bottom-[25px] right-0 text-[#475467] rounded mx-1 mb-2 bg-[#FDFDFD] transition-display ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                    </div> */}

          {/* <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div className='truncate p-1 font-medium flex-1'>{title}</div>
                        {item?.url && !item?.url.includes('curateit') && <div className="transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>}
                    </div> */}
        </div>
      );
    }

    if (item?.media_type === "Image" || item?.media_type === "Screenshot") {
      const s3Src =
        (item?.media_type === "Image" || item?.media_type === "Screenshot") &&
        item?.S3_link
          ? item?.S3_link?.length > 0
            ? item?.S3_link[0]
            : imgSrc
                ?.replace("resize:fill:112:112", "resize:fit:2400")
                ?.replace("resize:fill:40:40", "resize:fit:2400")
                ?.replace("_SY160", "_SY800")
          : imgSrc
              ?.replace("resize:fill:112:112", "resize:fit:2400")
              ?.replace("resize:fill:40:40", "resize:fit:2400")
              ?.replace("_SY160", "_SY800");
      const colors =
        (item?.imageColor &&
          item?.imageColor?.length > 0 &&
          item?.imageColor[0]?.imageColor &&
          item?.imageColor[0]?.imageColor?.length > 0 &&
          item?.imageColor[0]?.imageColor) ||
        (item?.media?.imageColor &&
          item?.media?.imageColor?.length > 0 &&
          item?.media?.imageColor) ||
        [];

      return (
        <div
          classsName="w-full"
          style={{ position: "relative", background: "white" }}
        >
          <div
            className={`${
              checkedBookmark?.some((data) => data.id === item.id)
                ? "bg-[#E7F2FB]"
                : ""
            } overflow-hidden rounded-md`}
          >
            <Image
              src={
                fallbackURL
                  ? fallbackURL
                  : s3Src?.replace(
                      NEXT_PUBLIC_STATIC_S3_BASE_URL,
                      `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/700x700_min`
                    ) ||
                    `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              }
              alt={
                item?.altInfo || item?.title || item?.description || "Curateit"
              }
              className="w-full object-cover block h-full moodboardImageEffect"
              onError={(e) => {
                // e.target.onerror = null;
                setFallbackURL(
                  item?.metaData?.fallbackURL
                    ? item?.metaData?.fallbackURL
                    : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                );
                // const isFailedBefore = e.target.getAttribute("data-isFailedBefore")
                // if(!isFailedBefore){
                //     e.target.setAttribute("data-isFailedBefore", true)
                //     e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                // }
                // else {
                //     e.target.src = `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                // }
              }}
              priority={true}
              style={{
                maxWidth: "100%",
              }}
            />
          </div>

          <div className="truncate p-1 font-medium flex-1">{title}</div>

          {/* <div className={`p-1 text-xs absolute bottom-[25px] right-0 text-[#475467] rounded mx-1 mb-2 bg-[#FDFDFD] transition-display ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                    </div> */}

          {colors && colors?.length > 0 && (
            <div
              className={`absolute bottom-[25px] left-0 ml-2 mb-1 flex items-center group transition`}
            >
              {colors?.map((color, i) => {
                return (
                  <div
                    key={i}
                    title={color}
                    className={`border border-solid border-[#97A0B5] mr-[-5px] z-100 rounded-full h-[20px] w-[20px] cursor-pointer group-hover:mr-1 transition`}
                    style={{ background: color }}
                    onClick={(e) => {
                      e.stopPropagation();
                      copyText(color, "Color copied successfully");
                    }}
                  ></div>
                );
              })}
            </div>
          )}

          {/* <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div className='truncate p-1 font-medium flex-1'>{title}</div>
                        {item?.url && !item?.url.includes('curateit') && <div className="transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>}
                    </div> */}
        </div>
      );
    }

    if (item?.media_type === "Video") {
      const videoLink =
        (item?.S3_link && item?.S3_link?.length) > 0
          ? item?.S3_link[0]
          : item?.media?.videoLink && item?.media?.videoLink !== ""
          ? item?.media?.videoLink
          : item?.url
          ? item?.url
          : "";
      if (item?.fileType === "url") {
        return (
          <div
            classsName="w-full"
            style={{ position: "relative", background: "white" }}
            // onClick={e => e.stopPropagation()}
          >
            <ReactPlayer
              url={item?.url}
              playing={false}
              controls={true}
              width="100%"
              height={"fit-content"}
            />

            {/* <div className={`p-1 text-xs absolute bottom-[25px] right-0 text-[#475467] rounded mx-1 mb-2 bg-[#FDFDFD] transition-display ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                    </div>
                    
                    {item?.url && !item?.url.includes('curateit') && <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div></div>
                        <div className="transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>
                    </div>} */}
          </div>
        );
      }
      return (
        <div
          classsName="w-full"
          style={{ position: "relative", background: "white" }}
          // onClick={e => e.stopPropagation()}
        >
          <ReactPlayer
            url={videoLink}
            playing={false}
            controls={true}
            width="100%"
            height={"fit-content"}
          />
        </div>
      );
    }

    if (item?.media_type === "Note") {
      return (
        <div
          className={`p-1 px-2 w-full rounded-md overflow-ellipsis overflow-hidden`}
          style={{
            background: checkedBookmark?.some((data) => data.id === item.id)
              ? "bg-[#E7F2FB]"
              : noteColor?.colorCode,
          }}
        >
          <div>
            {item?.media?.text?.length > 150
              ? item?.media?.text?.substring(0, 150) + "..."
              : item?.media?.text}
          </div>

          <div className={`flex space-x-4`}>
            <IoColorPaletteOutline
              className="h-5 w-5 cursor-pointer mt-1 opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                setShowColorOptions(!showColorOptions);
              }}
            />

            {showColorOptions && (
              <div className="flex space-x-2 items-center">
                {HIGHLIGHTED_COLORS.map((color) => (
                  <button
                    key={color.id}
                    style={{ backgroundColor: `${color.bg}` }}
                    className={classNames(
                      "flex justify-center items-center h-4 w-4 rounded-full border-[1px] border-gray-400"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateNoteColor(color, item);
                    }}
                  >
                    <CheckIcon
                      className={classNames(
                        color.id === noteColor?.id ? "" : color.text,
                        "h-2 w-2"
                      )}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (item?.media_type === "Book") {
      let text = item?.media?.status ? item?.media?.status : "to-read";
      text = text && text.charAt(0).toUpperCase() + text.slice(1);
      return (
        <div
          classsName="w-full"
          style={{ position: "relative", background: "white" }}
        >
          {text && (
            <div className="absolute top-0 right-0 block group-hover:hidden pt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="fit-content"
                height="22"
                viewBox="0 0 102 30"
                fill="none"
              >
                <path
                  d="M100 29.8C100.994 29.8 101.8 28.9941 101.8 28V2C101.8 1.00589 100.994 0.200001 100 0.200001L2.81549 0.200001C1.21352 0.200001 0.409668 2.13545 1.54029 3.27037L12.0253 13.7953C12.8961 14.6694 12.8779 16.0886 11.985 16.9401L1.75311 26.6974C0.577606 27.8183 1.37101 29.8 2.99532 29.8L100 29.8Z"
                  fill={
                    text === "To-read"
                      ? "#348EE2"
                      : text === "Read"
                      ? "#00D863"
                      : `#EEAF0D`
                  }
                  stroke="white"
                  stroke-width="0.4"
                />
                <text
                  x="50%"
                  y="50%"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  fill="white"
                  font-size="16"
                  font-family="Arial, sans-serif"
                >
                  {text}
                </text>
              </svg>
            </div>
          )}

          <div
            className={`${
              checkedBookmark?.some((data) => data.id === item.id)
                ? "bg-[#E7F2FB]"
                : ""
            } overflow-hidden rounded-md`}
          >
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
                        `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/700x700_min`
                      ) ||
                    `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              }
              alt={
                item?.altInfo || item?.title || item?.description || "Curateit"
              }
              className="w-full object-cover block h-full moodboardImageEffect"
              onError={(e) => {
                // e.target.onerror = null;
                setFallbackURL(
                  item?.metaData?.fallbackURL
                    ? item?.metaData?.fallbackURL
                    : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                );
                // const isFailedBefore = e.target.getAttribute("data-isFailedBefore")
                // if(!isFailedBefore){
                //     e.target.setAttribute("data-isFailedBefore", true)
                //     e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                // }
                // else {
                //     e.target.src = `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                // }
              }}
              priority={true}
              style={{
                maxWidth: "100%",
              }}
            />
          </div>
          {/* <div className={`transition-display p-1 text-xs absolute right-0 text-[#475467] rounded mx-1 mb-2 bg-[#FDFDFD] ${(item?.media?.myRating || item?.entityObj?.averageRating) ? 'bottom-[50px]' : 'bottom-[25px]'} ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                    </div> */}

          <div className="px-1 absolute bottom-[25px] left-0 mb-1">
            {(item?.media?.myRating || item?.entityObj?.averageRating) && (
              <RatingComponent
                value={item?.media?.myRating || item?.entityObj?.averageRating}
                isBigSize={true}
              />
            )}
          </div>
          <div className="truncate p-1 font-medium flex-1">{title}</div>

          {/* <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div className='truncate p-1 font-medium flex-1'>{title}</div>
                        {item?.url && !item?.url.includes('curateit') && <div className="transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>}
                    </div> */}
        </div>
      );
    }

    if (item?.media_type === "Movie") {
      let text = item?.media?.myStatus
        ? item?.media?.myStatus
        : item?.media?.status || "to-watch";
      text = text && text.charAt(0).toUpperCase() + text.slice(1);
      return (
        <div
          classsName="w-full"
          style={{ position: "relative", background: "white" }}
        >
          {text && (
            <div className="absolute top-0 right-0 block group-hover:hidden pt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="fit-content"
                height="22"
                viewBox="0 0 102 30"
                fill="none"
              >
                <path
                  d="M100 29.8C100.994 29.8 101.8 28.9941 101.8 28V2C101.8 1.00589 100.994 0.200001 100 0.200001L2.81549 0.200001C1.21352 0.200001 0.409668 2.13545 1.54029 3.27037L12.0253 13.7953C12.8961 14.6694 12.8779 16.0886 11.985 16.9401L1.75311 26.6974C0.577606 27.8183 1.37101 29.8 2.99532 29.8L100 29.8Z"
                  fill={
                    text === "To-watch"
                      ? "#348EE2"
                      : text === "Watched"
                      ? "#00D863"
                      : `#EEAF0D`
                  }
                  stroke="white"
                  stroke-width="0.4"
                />
                <text
                  x="50%"
                  y="50%"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  fill="white"
                  font-size="16"
                  font-family="Arial, sans-serif"
                >
                  {text}
                </text>
              </svg>
            </div>
          )}
          <div
            className={`${
              checkedBookmark?.some((data) => data.id === item.id)
                ? "bg-[#E7F2FB]"
                : ""
            } overflow-hidden rounded-md`}
          >
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
                        `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/700x700_min`
                      ) ||
                    `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              }
              alt={
                item?.altInfo || item?.title || item?.description || "Curateit"
              }
              className="w-full object-cover block h-full moodboardImageEffect"
              onError={(e) => {
                // e.target.onerror = null;
                setFallbackURL(
                  item?.metaData?.fallbackURL
                    ? item?.metaData?.fallbackURL
                    : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                );
                // const isFailedBefore = e.target.getAttribute("data-isFailedBefore")
                // if(!isFailedBefore){
                //     e.target.setAttribute("data-isFailedBefore", true)
                //     e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                // }
                // else {
                //     e.target.src = `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/webapp/curateit-logo.png`
                // }
              }}
              priority={true}
              style={{
                maxWidth: "100%",
              }}
            />
          </div>

          {/* <div className={`p-1 text-xs absolute right-0 text-[#475467] rounded mx-1 mb-2 bg-[#FDFDFD] transition-display ${item?.entityObj?.ratings ? 'bottom-[40px]' : 'bottom-[25px]'} ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                    </div> */}

          <div className="px-1 absolute bottom-[25px] left-0 flex items-center mb-1">
            <Image
              className="h-5 w-5 mr-1"
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/yellow-star.png`}
              alt="Rating star"
              priority={true}
            />
            {(item?.entityObj?.ratings || item?.media?.myRating) && (
              <span className="text-white font-bold text-xs">
                {item?.media?.myRating
                  ? `${item?.media?.myRating}/5`
                  : `${item?.entityObj?.ratings}/10`}
              </span>
            )}
          </div>

          <div className="truncate p-1 font-medium flex-1">{title}</div>

          {/* <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div className='truncate p-1 font-medium flex-1'>{title}</div>
                        {item?.url && !item?.url.includes('curateit') && <div className="transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>}
                    </div> */}
        </div>
      );
    }

    if (item?.media_type === "Quote") {
      const title = item?.media?.text || item?.title || "";
      return (
        <div style={{ position: "relative", background: "white" }}>
          <QuoteCard quote={title} />

          {/* <div className={`rounded drop-shadow bg-white border border-solid border-[#DFE4EC] p-1 text-xs absolute right-0 text-[#475467] mx-1 mb-2 bg-slate-400 transition-display bottom-[25px] ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                    </div> */}

          {/* {item?.url && !item?.url.includes('curateit') && <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div></div>
                        <div className="drop-shadow transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>
                    </div>} */}
        </div>
      );
    }

    if (item?.media_type === "Testimonial") {
      const avatarImgSrc =
        (item?.media && item?.media?.avatar && item?.media?.avatar) ||
        (item?.metaData &&
          item?.metaData?.covers?.length > 0 &&
          item?.metaData?.covers[0]) ||
        "";
      const iconImgSrc =
        item?.metaData && item?.metaData?.icon ? item?.metaData?.icon : "";
      const tagLine = item?.media?.tagLine || "";
      const author = item?.media?.author || "";
      const product = item?.media?.product || "";
      const attachImage = item?.media?.attachImage || "";
      const platform = item?.media?.platform || item?.platform;
      const rating = item?.media?.rating || "";
      const date = item?.media?.date || "";
      const testimonial = item?.media?.testimonial || "";
      const testimonialType = item?.media?.testimonialType || "";
      const attachAudio = item?.media?.attachAudio || "";
      const attachVideo = item?.media?.attachVideo || "";
      const fileType = item?.media?.fileType || "";
      return (
        <div
          style={{ position: "relative", background: "white" }}
          className="p-2 overflow-hidden"
        >
          <TestimonialCard
            avatar={
              avatarImgSrc ||
              iconImgSrc ||
              `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
            }
            tagLine={tagLine || item?.title || ""}
            author={author}
            product={product}
            attachImage={attachImage}
            platform={platform}
            rating={rating}
            date={date}
            testimonial={testimonial}
            metaData={item?.metaData}
            altInfo={item?.altInfo || item?.title || item?.description || ""}
            showDetailsFull={false}
            testimonialType={testimonialType}
            attachAudio={attachAudio}
            attachVideo={attachVideo}
            fileType={fileType}
            imgSrc={imgSrc}
          />

          {/* <div className={`rounded drop-shadow bg-white border border-solid border-[#DFE4EC] p-1 text-xs absolute right-0 text-[#475467] mx-1 mb-2 transition-display bottom-[25px] ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                    </div> */}
          {/* {item?.url && !item?.url.includes('curateit') && <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div></div>
                        <div className="drop-shadow transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>
                    </div>} */}
        </div>
      );
    }

    if (
      item.media_type === "Profile" &&
      (!item?.media?.type || item?.media?.type === "contact")
    ) {
      const description = item?.description || "";
      const platform = item?.platform || "";
      const avatarName = item?.author?.username?.charAt(0).toUpperCase();
      return (
        <div
          className="flex flex-col items-center justify-center overflow-hidden w-full"
          style={{ position: "relative", background: "white" }}
        >
          {item?.media_type === "Profile" && item?.media?.type === "contact" ? (
            <Avatar
              size={60}
              className="cursor-pointer"
              style={{
                color: "white",
                backgroundColor: "#347ae2",
              }}
            >
              {avatarName}
            </Avatar>
          ) : (
            <Avatar
              icon={
                <Image
                  src={
                    fallbackURL
                      ? fallbackURL
                      : imgSrc?.replace(MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR)
                      ? platform === "Medium"
                        ? imgSrc
                            ?.replace("resize:fill:24:24", "resize:fit:2400")
                            ?.replace("resize:fill:40:40", "resize:fit:2400")
                            ?.replace(
                              NEXT_PUBLIC_STATIC_S3_BASE_URL,
                              `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/700x700_min`
                            )
                        : item?.socialfeed_obj?.profile_image_url
                          ? item?.socialfeed_obj?.profile_image_url
                          : imgSrc?.replace(
                            NEXT_PUBLIC_STATIC_S3_BASE_URL,
                            `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/700x700_min`
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
                    // e.target.onerror = null;
                    // if (item?.socialfeed_obj?.profile_image_url) {
                    //   setFallbackURL(item?.socialfeed_obj?.profile_image_url || item?.metaData?.fallbackURL);
                    //   return
                    // }
                    setFallbackURL(
                      item?.metaData?.fallbackURL
                        ? item?.metaData?.fallbackURL
                        : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    );
                    // const isFailedBefore = e.target.getAttribute("data-isFailedBefore")
                    // if(!isFailedBefore){
                    //     e.target.setAttribute("data-isFailedBefore", true)
                    //     e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    // }
                    // else {
                    //     e.target.src = `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    // }
                  }}
                  priority={true}
                  style={{
                    maxWidth: "100%",
                  }}
                />
              }
              className="moodboardImageEffect cursor-pointer h-20 w-20 md:h-28 md:w-28 border border-solid border-[#ABB7C9]"
            />
          )}

          <div className="flex items-center my-1">
            <div className="text-md font-medium mr-2">{title}</div>
            <div
              style={{ background: getColorForProfilePlatform(platform) }}
              className="rounded w-6 h-6 flex items-center justify-center cursor-pointer relative"
            >
              {
                PROFILE_PLATFORMS_ICON.filter((t) => t.value === platform)[0]
                  ?.icon
              }
            </div>
          </div>
          {/* text-[#4B4F5D] */}
          <div className="text-sm text-gray-500 break-words w-full px-1">
            {description.length > 250
              ? description.slice(0, 250).concat("...")
              : description}
          </div>

          {/* <div className={`drop-shadow bg-white border border-solid border-[#DFE4EC] p-1 text-xs absolute right-0 text-[#475467] rounded mx-1 mb-2 transition-display bottom-[25px] ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                    </div> */}

          {/* {item?.url && !item?.url.includes('curateit') && <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div></div>
                        <div className="drop-shadow transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>
                    </div>} */}
        </div>
      );
    }

    if (item?.media_type === "Profile" && item?.media?.type === "subscriber") {
      const profilePic = item?.media?.subscriber?.profilePic;
      const firstName = item?.media?.subscriber?.firstName;
      const lastName = item?.media?.subscriber?.lastName;
      const email = item?.media?.subscriber?.email;
      const phoneNumber = item?.media?.subscriber?.phoneNumber;
      const avatarName =
        firstName?.charAt(0).toUpperCase() ||
        lastName?.charAt(0).toUpperCase() ||
        email?.split("@")[0]?.charAt(0).toUpperCase();

      return (
        <div className="flex flex-col items-center justify-center overflow-hidden relative">
          {profilePic ? (
            <Avatar
              icon={
                <Image
                  src={
                    fallbackURL
                      ? fallbackURL
                      : item?.socialfeed_obj?.profile_image_url
                        ? item?.socialfeed_obj?.profile_image_url
                        : (profilePic
                          ?.replace(MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR)
                          ?.replace(
                            NEXT_PUBLIC_STATIC_S3_BASE_URL,
                            `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`
                          ) ||
                        `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`)
                  }
                  alt={firstName || "Curateit user"}
                  onError={(e) => {
                    // e.target.onerror = null;
                    setFallbackURL(
                      `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    );
                    // const isFailedBefore = e.target.getAttribute("data-isFailedBefore")
                    // if(!isFailedBefore){
                    //     e.target.setAttribute("data-isFailedBefore", true)
                    //     e.target.src=`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    // }
                  }}
                  priority={true}
                />
              }
              className="cursor-pointer moodboardImageEffect"
              size={60}
            />
          ) : (
            <Avatar
              size={60}
              className="cursor-pointer"
              style={{
                color: "white",
                backgroundColor: "#347ae2",
              }}
            >
              {avatarName}
            </Avatar>
          )}

          <div>
            {(firstName || lastName) && (
              <div className="flex items-center my-1">
                <UserCircleIcon className="h-4 w-4 mr-1" />
                <div className="text-base">
                  {firstName} {lastName}
                </div>
              </div>
            )}

            {email && (
              <div className="flex items-center my-1">
                <MdOutlineMail className="h-4 w-4 mr-1" />
                <div className="text-base">{email}</div>
              </div>
            )}

            {phoneNumber && (
              <div className="flex items-center my-1">
                <PhoneIcon className="h-4 w-4 mr-1" />
                <div className="text-base">{phoneNumber}</div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (item?.media_type === "Audio") {
      const audioLink =
        (item?.S3_link && item?.S3_link?.length) > 0 ? item?.S3_link[0] : "";
      const title = item?.title;
      if (item?.fileType === "url") {
        return (
          <div
            classsName={`flex w-full items-center justify-center `}
            style={{ position: "relative", background: "white" }}
          >
            {/* <ReactPlayer
                    url={audioLink} 
                    playing={false}
                    controls={true}
                    width="100%"
                    height={'fit-content'}
                  /> */}
            <div
              className={`${
                checkedBookmark?.some((data) => data.id === item.id)
                  ? "bg-[#E7F2FB]"
                  : ""
              } overflow-hidden relative`}
            >
              <Image
                src={
                  fallbackURL
                    ? fallbackURL
                    : imgSrc
                        ?.replace(MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR)
                        ?.replace(
                          NEXT_PUBLIC_STATIC_S3_BASE_URL,
                          `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/700x700_min`
                        ) ||
                      `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                }
                alt={
                  item?.altInfo ||
                  item?.title ||
                  item?.description ||
                  "Curateit"
                }
                className="w-full object-cover block h-full moodboardImageEffect"
                onError={(e) => {
                  // e.target.onerror = null;
                  setFallbackURL(
                    item?.metaData?.fallbackURL
                      ? item?.metaData?.fallbackURL
                      : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                  );
                  // const isFailedBefore = e.target.getAttribute("data-isFailedBefore")
                  // if(!isFailedBefore){
                  //     e.target.setAttribute("data-isFailedBefore", true)
                  //     e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                  // }
                  // else {
                  //     e.target.src = `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                  // }
                }}
                priority={true}
                style={{
                  maxWidth: "100%",
                }}
              />

              <div
                className="absolute top-[50%] left-[50%]"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <PlayCircleIcon className="h-10 w-10 text-white" />
              </div>
            </div>

            {/* <div className={`p-1 text-xs absolute bottom-[25px] right-0 text-[#475467] rounded mx-1 mb-2 bg-[#FDFDFD] transition-display ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                    </div>

                    {item?.url && !item?.url.includes('curateit') && <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div></div>
                        <div className="transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>
                    </div>} */}
          </div>
        );
      }
      return (
        <div
          classsName="w-full"
          style={{ position: "relative", background: "white" }}
          // onClick={e => e.stopPropagation()}
        >
          <div className="">
            <audio
              src={audioLink}
              autoPlay={false}
              controls
              className="h-[80px] w-full"
            >
              <source src={audioLink} />
            </audio>

            {item?.fileType === "file" && title && (
              <Button
                type="link"
                className="mt-1"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(audioLink, "_blank");
                }}
              >
                {title}
              </Button>
            )}
          </div>

          {/* <div className={`p-1 text-xs absolute bottom-[25px] right-0 text-[#475467] rounded mx-1 mb-2 bg-[#FDFDFD] transition-display ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                    </div>

                    {item?.url && !item?.url.includes('curateit') && <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div></div>
                        <div className="transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>
                    </div>} */}
        </div>
      );
    }

    if (item?.media_type === "PDF") {
      const pdfSrc = item?.media?.pdfLink;
      const pdfFileName =
        pdfSrc && pdfSrc?.split("/")?.pop().split("?")?.[0].split("#")?.[0];
      return (
        <div
          classsName="w-full"
          style={{ position: "relative", background: "#B2D3FF" }}
        >
          <div className="w-[100%] flex items-center justify-center p-1 h-[120px]">
            <Image
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/pdf.png`}
              alt={item?.title || "PDF icon"}
              className="w-20 h-20"
              priority={true}
            />
          </div>

          <div className="truncate p-1 font-medium flex-1">
            {pdfFileName || item?.title}
          </div>

          {/* <div className={`p-1 text-xs absolute bottom-[25px] right-0 text-[#475467] rounded mx-1 mb-2 bg-[#FDFDFD] transition-display ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                    </div>

                    <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div className='truncate p-1 font-medium flex-1'>{pdfFileName || item?.title}</div>
                        {item?.url && !item?.url.includes('curateit') && <div className="transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>}
                    </div> */}
        </div>
      );
    }

    if (item?.media_type === "App") {
      const techApps =
        (item?.media?.techStack &&
          item?.media?.techStack?.length > 0 &&
          item?.media?.techStack) ||
        [];

      return (
        <div
          classsName="w-full"
          style={{ position: "relative", background: "white" }}
        >
          <div
            className={`${
              checkedBookmark?.some((data) => data.id === item.id)
                ? "bg-[#E7F2FB]"
                : ""
            } overflow-hidden rounded-md`}
          >
            <Image
              src={
                fallbackURL
                  ? fallbackURL
                  : imgSrc
                      ?.replace(MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR)
                      ?.replace(
                        NEXT_PUBLIC_STATIC_S3_BASE_URL,
                        `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/700x700_min`
                      ) ||
                    `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              }
              alt={
                item?.altInfo || item?.title || item?.description || "Curateit"
              }
              className="w-full object-cover block h-full moodboardImageEffect"
              onError={(e) => {
                // e.target.onerror = null;
                setFallbackURL(
                  item?.metaData?.fallbackURL
                    ? item?.metaData?.fallbackURL
                    : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                );
                // const isFailedBefore = e.target.getAttribute("data-isFailedBefore")
                // if (!isFailedBefore) {
                //     e.target.setAttribute("data-isFailedBefore", true)
                //     e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                // }
                // else {
                //     e.target.src = `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                // }
              }}
              priority={true}
              style={{
                maxWidth: "100%",
              }}
            />
          </div>

          {/* <div className={`p-1 text-xs absolute bottom-[25px] right-0 text-[#475467] rounded mx-1 mb-2 bg-[#FDFDFD] transition-display ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                    </div> */}

          {techApps && techApps?.length > 0 && (
            <div
              className={`rounded-sm absolute bottom-[25px] left-0 ml-2 mb-1 flex items-center bg-[#e5f0ff8c] px-1 py-[2px]`}
            >
              {techApps?.map((app, i) => {
                return (
                  <div
                    key={i}
                    title={app?.name}
                    className="cursor-pointer mr-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a href={app.url} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={app.logo}
                        alt={app.name}
                        className="h-5 w-5"
                        priority={true}
                      />
                    </a>
                  </div>
                );
              })}
            </div>
          )}

          <div className="truncate p-1 font-medium flex-1">{title}</div>

          {/* <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div className='truncate p-1 font-medium flex-1'>{title}</div>
                        {item?.url && !item?.url.includes('curateit') && <div className="transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>}
                    </div> */}
        </div>
      );
    }

    if (
      item.media_type === "Text Expander" ||
      item.media_type === "Ai Prompt"
    ) {
      let text =
        item?.expander &&
        item?.expander.filter(
          (ex) => ex.type === "expander" || ex.type === "prompt"
        )[0]?.text;
      let textWithoutSpaces = text;
      textWithoutSpaces = textWithoutSpaces
        ?.replace(
          /(\()([\w\s]+)(\))/g,
          '<span class="variable-container"><span placeholder="$1" id="variable__$1" class="variable-input" list="$1"></span><datalist id="$1"></datalist></span>'
        )
        .replace(
          /(\{)([\w\s]+)(\})/g,
          '<span class="variable-container"><span placeholder="$2" id="variable__$2" class="variable-input" list="$2"></span><datalist id="$2"></datalist></span>'
        );

      const favIconSrc =
        item?.metaData && item?.metaData?.icon ? item?.metaData?.icon : "";

      return (
        <div>
          {imgSrc && (
            <div
              classsName="w-full"
              style={{ position: "relative", background: "white" }}
            >
              <div
                className={`${
                  checkedBookmark?.some((data) => data.id === item.id)
                    ? "bg-[#E7F2FB]"
                    : ""
                } overflow-hidden mb-2`}
              >
                <Image
                  src={
                    fallbackURL
                      ? fallbackURL
                      : imgSrc
                          ?.replace(MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR)
                          ?.replace(
                            NEXT_PUBLIC_STATIC_S3_BASE_URL,
                            `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/700x700_min`
                          ) ||
                        `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                  }
                  alt={
                    item?.altInfo ||
                    item?.title ||
                    item?.description ||
                    "Curateit"
                  }
                  className="w-full object-cover block h-full moodboardImageEffect"
                  onError={(e) => {
                    // e.target.onerror = null;
                    setFallbackURL(
                      item?.metaData?.fallbackURL
                        ? item?.metaData?.fallbackURL
                        : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    );
                    // const isFailedBefore = e.target.getAttribute("data-isFailedBefore")
                    // if(!isFailedBefore){
                    //     e.target.setAttribute("data-isFailedBefore", true)
                    //     e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    // }
                    // else {
                    //     e.target.src = `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    // }
                  }}
                  priority={true}
                  style={{
                    maxWidth: "100%",
                  }}
                />
              </div>

              <div className="w-fit absolute left-2 top-8">
                <FavIconComponent
                  data={favIconSrc || null}
                  renderingPlace="moodboard"
                />
              </div>
            </div>
          )}

          <div className="p-1">
            <div className="font-medium text-[#323543] text-base">
              {item?.title || ""}
            </div>

            <div className="text-sm text-[#575C70] break-words w-full mt-1">
              {item?.description.length > 100
                ? item?.description.slice(0, 100).concat("...")
                : item?.description}
            </div>

            <div className="border border-solid border-[#ABB7C9] rounded-md mt-1 pl-2 pr-3 pt-4 pb-5 relative">
              <div
                className="mood-word-wrap truncate-ai"
                dangerouslySetInnerHTML={{ __html: textWithoutSpaces }}
                data-id={item.id}
              />
              {item?.media_type === "Ai Prompt" && (
                <div className="absolute top-1 right-1 cursor-pointer">
                  <DocumentDuplicateIcon
                    className="h-4 w-4"
                    onClick={(e) => onAITextCopy(e, item)}
                  />
                </div>
              )}
              {text?.length > 30 && (
                <div className="absolute bottom-0 right-1">
                  <div
                    className="text-sm font-medium text-[#40a9ff] cursor-pointer pr-1"
                    onClick={(e) => handleOpenGem(e, item)}
                  >
                    See more
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (item?.media_type === "Citation") {
      return (
        <div
          classsName="w-full"
          style={{ position: "relative", background: "white" }}
        >
          <div
            className={`py-2 px-4 rounded-t-[5px] overflow-ellipsis overflow-hidden`}
          >
            {item?.media?.citation?.length > 150
              ? item?.media?.citation?.substring(0, 150) + "..."
              : item?.media?.citation}
          </div>

          <div className="px-4 my-2">
            <div
              title="Citation style"
              className="bg-[#e6e6e6] text-black text-xs py-[2px] px-[4px] rounded w-fit"
            >
              {item?.media?.citation_format?.length > 30
                ? item?.media?.citation_format?.substring(0, 30) + "..."
                : item?.media?.citation_format}
            </div>
          </div>

          {/* <div className={`rounded drop-shadow bg-white border border-solid border-[#DFE4EC] p-1 text-xs absolute right-0 text-[#475467] mx-1 mb-2 transition-display bottom-[25px] ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                    </div> */}

          {/* {item?.url && !item?.url.includes('curateit') && <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div></div>
                        <div className="drop-shadow transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>
                    </div>} */}
        </div>
      );
    }

    if (item.media_type === "Code") {
      const code = item?.media?.code;
      return (
        <div
          classsName="w-full"
          style={{ position: "relative", background: "white" }}
        >
          <div className=" flex items-end">
            <CodeMirror
              value={
                code
                  ? code.length > 300
                    ? code.substring(0, 300) + "..."
                    : code
                  : ""
              }
              theme={"dark"}
              editable={false}
              readOnly={true}
              extensions={[javascript()]}
              className="mood-code-card"
            />
          </div>

          {/* <div className={`p-1 text-xs absolute bottom-[25px] right-0 text-[#475467] rounded mx-1 mb-2 bg-[#FDFDFD] transition-display ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                    </div>

                    {item?.url && !item?.url.includes('curateit') && <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div></div>
                        <div className="transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>
                    </div>} */}
        </div>
      );
    }

    if (item.media_type === "SocialFeed" && item?.media?.isWeb) {
      const imgSrc =
        item?.metaData && item?.metaData?.covers?.length > 0
          ? item?.metaData?.covers[0]
          : "";
      const description = item?.description;
      return (
        <div className="overflow-hidden relative">
          <Image
            src={
              fallbackURL
                ? fallbackURL
                : imgSrc
                ? imgSrc
                    ?.replace(MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR)
                    ?.replace(
                      NEXT_PUBLIC_STATIC_S3_BASE_URL,
                      `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/700x700_min`
                    )
                : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
            }
            alt={item.altInfo || item?.title || item?.description || "Curateit"}
            className="moodboardImageEffect w-full object-scale-down"
            onError={(e) => {
              // e.target.onerror = null;
              setFallbackURL(
                item?.metaData?.fallbackURL
                  ? item?.metaData?.fallbackURL
                  : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              );
              // const isFailedBefore = e.target.getAttribute("data-isFailedBefore")
              // if(!isFailedBefore){
              //     e.target.setAttribute("data-isFailedBefore", true)
              //     e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              // }
              // else{
              //     e.target.src = `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              // }
            }}
            priority={true}
            style={{
              maxWidth: "100%",
            }}
          />
          <div className="font-medium">{item?.title || ""}</div>

          <div className="text-xs text-[#4B4F5D] break-words w-full text-center mt-1">
            {description.length > 150
              ? description.slice(0, 150).concat("...")
              : description}
          </div>
        </div>
      );
    }

    if (item.media_type === "SocialFeed" && item.platform === "Twitter") {
      const imgSrc =
        item?.metaData && item?.metaData?.covers?.length > 0
          ? item?.metaData?.covers[0]
          : "";
      const title = item?.title || item?.metaData?.title || "";
      const description =
        item?.description || item?.metaData?.description || "";
      if (item?.socialfeed_obj) {
        return (
          <div
            classsName="w-full overflow-hidden"
            style={{ position: "relative", background: "white" }}
          >
            <TweetDetail
              tweet={item?.socialfeed_obj || ""}
              altInfo={item?.altInfo || item?.title || item?.description || ""}
              isMoodboard={true}
              description={item?.description || ""}
            />

            {/* <div className={`rounded drop-shadow bg-white border border-solid border-[#DFE4EC] p-1 text-xs absolute right-0 text-[#475467] mx-1 mb-2 transition-display bottom-[25px] ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                     </div> */}

            {/* {item?.url && !item?.url.includes('curateit') && <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div></div>
                        <div className="drop-shadow transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>
                    </div>} */}
          </div>
        );
      }

      return (
        <div
          classsName="w-full overflow-hidden"
          style={{ position: "relative", background: "white" }}
        >
          <Image
            src={
              fallbackURL
                ? fallbackURL
                : imgSrc
                ? imgSrc
                    ?.replace(MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR)
                    ?.replace(
                      NEXT_PUBLIC_STATIC_S3_BASE_URL,
                      `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/700x700_min`
                    )
                : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
            }
            alt={
              item?.altInfo || item?.title || item?.description || "Curateit"
            }
            className="h-[150px] w-full object-scale-down moodboardImageEffect"
            onError={(e) => {
              // e.target.onerror = null;
              setFallbackURL(
                item?.metaData?.fallbackURL
                  ? item?.metaData?.fallbackURL
                  : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              );
              // const isFailedBefore = e.target.getAttribute("data-isFailedBefore")
              // if (!isFailedBefore) {
              //     e.target.setAttribute("data-isFailedBefore", true)
              //     e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              // }
              // else {
              //     e.target.src = `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              // }
            }}
            priority={true}
            style={{
              maxWidth: "100%",
            }}
          />
          <div className="font-medium">{title || item?.title || ""}</div>
          <div className="text-xs text-[#4B4F5D] break-words w-full text-center mt-1">
            {description.length > 250
              ? description.slice(0, 250).concat("...")
              : description}
          </div>

          {/* <div className={`rounded drop-shadow bg-white border border-solid border-[#DFE4EC] p-1 text-xs absolute right-0 text-[#475467] mx-1 mb-2 transition-display bottom-[25px] ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                     </div> */}

          {/* {item?.url && !item?.url.includes('curateit') && <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div></div>
                        <div className="drop-shadow transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>
                    </div>} */}
        </div>
      );
    }

    if (
      item.media_type === "SocialFeed" &&
      ["Reddit", "Medium", "Github", "LinkedIn"].includes(item.platform)
    ) {
      const imgSrc =
        item?.metaData && item?.metaData?.covers?.length > 0
          ? item?.metaData?.covers[0]
          : "";
      const imgSrc1 =
        item?.media && item?.media?.covers?.length > 0
          ? item?.media?.covers[0]
          : "";
      const title =
        item?.metaData && item?.metaData?.title ? item?.metaData?.title : "";
      if (item?.socialfeed_obj) {
        return (
          <div
            classsName="w-full overflow-hidden"
            style={{ position: "relative", background: "white" }}
          >
            <SocialFeedDetailCard
              tweet={item?.socialfeed_obj || ""}
              url={item?.url || ""}
              item={item}
              platform={item.platform}
            />
            {item.platform !== "Reddit" && (
              <div className="font-medium">{title || item?.title || ""}</div>
            )}

            {/* <div className={`rounded drop-shadow bg-white border border-solid border-[#DFE4EC] p-1 text-xs absolute right-0 text-[#475467] mx-1 mb-2 transition-display bottom-[25px] ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                     </div> */}

            {/* {item?.url && !item?.url.includes('curateit') && <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div></div>
                        <div className="drop-shadow transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>
                    </div>} */}
          </div>
        );
      }

      return (
        <div
          classsName="w-full overflow-hidden"
          style={{ position: "relative", background: "white" }}
        >
          <Image
            src={
              fallbackURL
                ? fallbackURL
                : imgSrc
                ? imgSrc
                    ?.replace("resize:fill:140:140", "resize:fit:2400")
                    ?.replace("resize:fill:40:40", "resize:fit:2400")
                    ?.replace(MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR)
                    ?.replace(
                      NEXT_PUBLIC_STATIC_S3_BASE_URL,
                      `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/700x700_min`
                    )
                : imgSrc1
                ? imgSrc1
                    .replace("resize:fill:140:140", "resize:fit:2400")
                    ?.replace("resize:fill:40:40", "resize:fit:2400")
                    ?.replace(
                      NEXT_PUBLIC_STATIC_S3_BASE_URL,
                      `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/700x700_min`
                    )
                : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
            }
            alt={
              item?.altInfo || item?.title || item?.description || "Curateit"
            }
            className="h-[150px] w-full object-scale-down moodboardImageEffect"
            onError={(e) => {
              // e.target.onerror = null;
              setFallbackURL(
                item?.metaData?.fallbackURL
                  ? item?.metaData?.fallbackURL
                  : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              );
              // const isFailedBefore = e.target.getAttribute("data-isFailedBefore")
              // if (!isFailedBefore) {
              //     e.target.setAttribute("data-isFailedBefore", true)
              //     e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              // }
              // else {
              //     e.target.src = `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              // }
            }}
            priority={true}
            style={{
              maxWidth: "100%",
            }}
          />
          <div className="font-medium">{title || item?.title || ""}</div>

          {/* <div className={`rounded drop-shadow bg-white border border-solid border-[#DFE4EC] p-1 text-xs absolute right-0 text-[#475467] mx-1 mb-2 transition-display bottom-[25px] ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                     </div> */}

          {/* {item?.url && !item?.url.includes('curateit') && <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div></div>
                        <div className="drop-shadow transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>
                    </div>} */}
        </div>
      );
    }

    if (
      item.media_type === "SocialFeed" &&
      !["Twitter", "Reddit", "Medium", "Github", "LinkedIn"].includes(
        item.platform
      )
    ) {
      const imgSrc =
        item?.metaData && item?.metaData?.covers?.length > 0
          ? item?.metaData?.covers[0]
          : "";
      const imgSrc1 =
        item?.media && item?.media?.covers?.length > 0
          ? item?.media?.covers[0]
          : "";
      const title =
        item?.metaData && item?.metaData?.title ? item?.metaData?.title : "";
      return (
        <div
          classsName="w-full overflow-hidden"
          style={{ position: "relative", background: "white" }}
        >
          <Image
            src={
              fallbackURL
                ? fallbackURL
                : imgSrc
                ? imgSrc
                    ?.replace("resize:fill:140:140", "resize:fit:2400")
                    ?.replace("resize:fill:40:40", "resize:fit:2400")
                    ?.replace(MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR)
                    ?.replace(
                      NEXT_PUBLIC_STATIC_S3_BASE_URL,
                      `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/700x700_min`
                    )
                : imgSrc1
                ? imgSrc1
                    .replace("resize:fill:140:140", "resize:fit:2400")
                    ?.replace("resize:fill:40:40", "resize:fit:2400")
                    ?.replace(
                      NEXT_PUBLIC_STATIC_S3_BASE_URL,
                      `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/700x700_min`
                    )
                : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
            }
            alt={
              item?.altInfo || item?.title || item?.description || "Curateit"
            }
            className="object-scale-down moodboardImageEffect"
            style={{
              maxWidth: "100%",
              height: "150px",
            }}
            onError={(e) => {
              // e.target.onerror = null;
              setFallbackURL(
                item?.metaData?.fallbackURL
                  ? item?.metaData?.fallbackURL
                  : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              );
              // const isFailedBefore = e.target.getAttribute("data-isFailedBefore")
              // if (!isFailedBefore) {
              //     e.target.setAttribute("data-isFailedBefore", true)
              //     e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              // }
              // else {
              //     e.target.src = `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              // }
            }}
            priority={true}
          />
          <div className="font-medium">{title || item?.title || ""}</div>

          {/* <div className={`rounded drop-shadow bg-white border border-solid border-[#DFE4EC] p-1 text-xs absolute right-0 text-[#475467] mx-1 mb-2 transition-display bottom-[25px] ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                     </div> */}

          {/* {item?.url && !item?.url.includes('curateit') && <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div></div>
                        <div className="drop-shadow transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>
                    </div>} */}
        </div>
      );
    }

    if (item.media_type === "Highlight") {
      const highlightText =
        item?.media?.text || item?.media?.details?.text || "";
      return (
        <div
          classsName="w-full"
          style={{ position: "relative", background: "white" }}
        >
          <div className="h-fit flex items-end p-1">
            <div
              style={{
                borderLeftColor: item?.media?.color?.colorCode,
                borderLeftWidth: "4px",
                borderLeftStyle: "solid",
              }}
              className="pl-1"
            >
              {convertHtmlToReact(highlightText)}
            </div>
          </div>

          {/* <div className={`drop-shadow bg-white border border-solid border-[#DFE4EC] p-1 text-xs absolute right-0 text-[#475467] rounded mx-1 mb-2 transition-display bottom-[25px] ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                    </div> */}

          {/* {item?.url && !item?.url.includes('curateit') && <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div></div>
                        <div className="drop-shadow transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>
                    </div>} */}
        </div>
      );
    }

    if (item.media_type === "Product") {
      const price = item?.media?.price || "";
      return (
        <div
          classsName="w-full"
          style={{ position: "relative", background: "white" }}
        >
          <div className="absolute top-0 right-0 block group-hover:hidden rounded-[30px] border border-solid border-[#ABB7C9] mt-1 bg-white py-[2px] px-[6px]">
            {price}
          </div>
          <div
            className={`${
              checkedBookmark?.some((data) => data.id === item.id)
                ? "bg-[#E7F2FB]"
                : ""
            } overflow-hidden rounded-md`}
          >
            <Image
              src={
                fallbackURL
                  ? fallbackURL
                  : imgSrc
                      ?.replace("_SS135", "_SS500")
                      ?.replace(MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR)
                      ?.replace(
                        NEXT_PUBLIC_STATIC_S3_BASE_URL,
                        `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/700x700_min`
                      ) ||
                    `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              }
              alt={
                item?.altInfo || item?.title || item?.description || "Curateit"
              }
              className="w-full object-cover block h-full moodboardImageEffect"
              onError={(e) => {
                // e.target.onerror = null;
                setFallbackURL(
                  item?.metaData?.fallbackURL
                    ? item?.metaData?.fallbackURL
                    : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                );
                // const isFailedBefore = e.target.getAttribute("data-isFailedBefore")
                // if (!isFailedBefore) {
                //     e.target.setAttribute("data-isFailedBefore", true)
                //     e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                // }
                // else {
                //     e.target.src = `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                // }
              }}
              priority={true}
              style={{
                maxWidth: "100%",
              }}
            />
          </div>

          {/* <div className={`p-1 text-xs absolute bottom-[25px] right-0 text-[#475467] rounded mx-1 mb-2 bg-[#FDFDFD] transition-display ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                    </div>

                    <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div className='truncate p-1 font-medium flex-1'>{title}</div>
                        {item?.url && !item?.url.includes('curateit') && <div className="transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>}
                    </div> */}
          <div className="truncate p-1 font-medium flex-1">{title}</div>
        </div>
      );
    }
    // console.log('item', permissions)
    return (
      <div
        classsName="w-full"
        style={{ position: "relative", background: "white" }}
      >
        <div
          className={`${
            checkedBookmark?.some((data) => data.id === item.id)
              ? "bg-[#E7F2FB]"
              : ""
          } overflow-hidden rounded-md`}
        >
          <Image
            src={
              fallbackURL
                ? fallbackURL
                : imgSrc
                    ?.replace(MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR)
                    ?.replace(
                      NEXT_PUBLIC_STATIC_S3_BASE_URL,
                      `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/700x700_min`
                    ) ||
                  `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
            }
            alt={
              item?.altInfo || item?.title || item?.description || "Curateit"
            }
            className="w-full object-cover block h-full moodboardImageEffect"
            onError={(e) => {
              // e.target.onerror = null;
              setFallbackURL(
                item?.metaData?.fallbackURL
                  ? item?.metaData?.fallbackURL
                  : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              );
              // const isFailedBefore = e.target.getAttribute("data-isFailedBefore")
              // if (!isFailedBefore) {
              //     e.target.setAttribute("data-isFailedBefore", true)
              //     e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              // }
              // else {
              //     e.target.src = `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              // }
            }}
            priority={true}
            style={{
              maxWidth: "100%",
            }}
          />
        </div>
        {item?.media_type === "Blog" &&
          item?.media?.status &&
          (permissions?.permissions?.gems?.canUpdate ||
            item?.author?.id === parseInt(session.userId)) && (
            <div className="absolute top-0 right-0 block group-hover:hidden pt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="fit-content"
                height="22"
                viewBox="0 0 102 30"
                fill="none"
              >
                <path
                  d="M100 29.8C100.994 29.8 101.8 28.9941 101.8 28V2C101.8 1.00589 100.994 0.200001 100 0.200001L2.81549 0.200001C1.21352 0.200001 0.409668 2.13545 1.54029 3.27037L12.0253 13.7953C12.8961 14.6694 12.8779 16.0886 11.985 16.9401L1.75311 26.6974C0.577606 27.8183 1.37101 29.8 2.99532 29.8L100 29.8Z"
                  fill={
                    item?.media?.status === "Published" ? "#00C000" : `#348EE2`
                  }
                  stroke="white"
                  stroke-width="0.4"
                />
                <text
                  x="50%"
                  y="50%"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  fill="white"
                  font-size="16"
                  font-family="Arial, sans-serif"
                >
                  {item?.media?.status}
                </text>
              </svg>
            </div>
          )}

        {/* <div className={`p-1 text-xs absolute bottom-[25px] right-0 text-[#475467] rounded mx-1 mb-2 bg-[#FDFDFD]  transition-display ${isUrlHovered ? 'block' : 'hidden'}`}>
                        {getDomainFromURL(item?.url || '')}
                    </div>

                    <div className="p-1 text-xs absolute bottom-0 right-0 text-white w-full flex justify-between">
                        <div className='truncate p-1 font-medium flex-1'>{title}</div>
                        {item?.url && !item?.url.includes('curateit') && <div className="transition-display hidden bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] group-hover:block" 
                        onMouseEnter={() => setIsUrlHovered(true)} 
                        onMouseLeave={() => setIsUrlHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            openGemInWindow(item)
                        }}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[#97A0B5]"/>
                        </div>}
                    </div> */}
        <div className="truncate p-1 font-medium flex-1">{title}</div>
      </div>
    );
  };

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

  const renderCardImage = (imgSrc, favSrc, altInfo) => {
    return propertyOrder?.some((data) => data.name === "Thumbnail") ? (
      imgSrc ? (
        <Image
          alt={altInfo}
          className={`object-scale-down h-[150px] max-w-[100%] object-center`}
          priority={true}
          src={
            imgSrc && typeof imgSrc === "string" && imgSrc !== ""
              ? imgSrc?.replace(MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR)?.replace(
                    NEXT_PUBLIC_STATIC_S3_BASE_URL,
                    `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`
                  )
                : imgSrc && typeof imgSrc === "object" && imgSrc?.icon && imgSrc?.icon ?
                  imgSrc?.icon?.replace(MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR)?.replace(
                      NEXT_PUBLIC_STATIC_S3_BASE_URL,
                      `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`
                    )
              : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
          }
        />
      ) : (
        <Image
          alt={altInfo}
          className={` object-scale-down h-[150px]`}
          priority={true}
          src={
            favSrc && typeof favSrc === "string"
              ? favSrc?.replace(
                  NEXT_PUBLIC_STATIC_S3_BASE_URL,
                  `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`
                )
                : favSrc && typeof favSrc === "object" && favSrc?.icon && favSrc?.icon ?
                  favSrc?.icon?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`)
              : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
          }
        />
      )
    ) : null;
  };

  const renderProfileCardImg = (imgSrc, favSrc) => {
    const src = imgSrc
      ? imgSrc
      : favSrc
      ? favSrc
      : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`;
    return propertyOrder?.some((data) => data.name === "Thumbnail") ? (
      <div className="flex items-center justify-center mt-2">
        <Avatar
          src={
            typeof src === "string"
              ? src
                  .replace("resize:fill:24:24", "resize:fit:2400")
                  ?.replace("resize:fill:40:40", "resize:fit:2400")
              : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
          }
          size={100}
        />
      </div>
    ) : null;
  };

  const onAITextCopy = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    let prompt =
      item?.expander &&
      item?.expander.filter(
        (ex) => ex.type === "expander" || ex.type === "prompt"
      )[0]?.plainText;
    copyText(prompt, "Prompt copied to clipboard");
    return false;
  };

  if (page === "approve-reject") {
    return (
      <div className={` cursor-pointer relative `}>{renderMedia(item)}</div>
    );
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-40 bg-[#dedede] rounded-md border border-solid border-[#DADEE8] w-full"
      >
        <div className="opacity-0">{renderMedia(item)}</div>
      </div>
    );
  }

  const handleCopyUrl = (item) => {
    if (item?.url) {
      copyText(item?.url, "Link copied to clipboard");
    }
  };

  if (
    (page === "collection" && isSharedAndAllowEdit && !isFilter) ||
    (page === "tags" && isSharedAndAllowEdit && !isFilter)
  ) {
    return (
      <div
        className={`bg-white rounded-md p-1 cursor-pointer relative group shadow-xl touch-none`}
        onClick={(e) => {
          if (gemOnClickEvent === "gem view") {
            handleOpenGem(e, item);
          } else {
            e.stopPropagation();
            openGemInWindow(item);
          }
        }}
        onMouseLeave={(e) => {
          setIsUrlHovered(false);
        }}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        {renderMedia(item)}

        <div className="px-2">
          {renderDetails(
            propertyOrder || [],
            item,
            collectionName,
            page,
            handleNavigate,
            handleNavigateMediaType,
            "moodboard",
            renderProfileCardImg,
            renderCardImage
          )}
        </div>

        <div
          className={`flex justify-between items-center absolute top-0 left-0 w-full p-2 opacity-0 group-hover:opacity-100 transition-opacity ${
            isMobileView ? "opacity-100" : ""
          }`}
          onMouseEnter={(e) => {
            if (item.media_type === "Ai Prompt") {
              setIsUrlHovered(true);
            }
          }}
        >
          {isSharedAndAllowEdit && page !== "collection-public-shared" ? (
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
          <div className="flex flex-row">
            <div className="flex items-center">
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
              {gemOnClickEvent === "gem view" && (
                <div
                  title="Open"
                  className="bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] mr-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    openGemInWindow(item);
                  }}
                >
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </div>
              )}

              {gemOnClickEvent !== "gem view" &&
                item?.media_type !== "Audio" &&
                item?.media_type !== "Video" && (
                  <div
                    title="Open gem"
                    className="bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] ml-1"
                    onClick={(e) => handleOpenGem(e, item)}
                  >
                    <EyeIcon className="h-5 w-5" />
                  </div>
                )}

              {isSharedAndAllowEdit && page !== "collection-public-shared" ? (
                <div
                  title="Edit"
                  className="bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] ml-1"
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

            {gemOnClickEvent !== "gem view" &&
              (item?.media_type === "Audio" ||
                item?.media_type === "Video") && (
                <div
                  title="Open gem"
                  className="bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] ml-1"
                  onClick={(e) => handleOpenGem(e, item)}
                >
                  <EyeIcon className="h-5 w-5" />
                </div>
              )}
          </div>
        </div>
        {page === "embed" || hideGemEngagement ? (
          <></>
        ) : (
          <div
            onClick={(e) => e.stopPropagation()}
            className={`mt-1 p-1 z-50 ${
              Number(session.userId) === item?.author?.id ||
              (page === "collection-public-shared" && !showSocialIcons)
                ? "hidden group-hover:block"
                : "block"
            }`}
            onMouseEnter={(e) => {
              if (item.media_type === "Ai Prompt") {
                setIsUrlHovered(true);
              }
            }}
          >
            <GemEngagement
              gem={item}
              showBookmark={
                (Number(session.userId) !== item?.author?.id && !permissions) ||
                permissions?.permissions?.gems?.canAddtoBookmark
              }
              showComment={showComment}
              user={user}
              isListView={false}
              showAddToBookmark={showAddToBookmark}
              permissions={permissions}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div
        className={`bg-white rounded-md p-1 cursor-pointer relative group shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl`}
        style={{
          background: checkedBookmark?.some((data) => data.id === item.id)
            ? "#E7F2FB"
            : "",
          color: checkedBookmark?.some((data) => data.id === item.id)
            ? "black"
            : "",
        }}
        onClick={(e) => {
          if (gemOnClickEvent === "gem view") {
            handleOpenGem(e, item);
          } else {
            e.stopPropagation();
            openGemInWindow(item);
          }
        }}
        onMouseLeave={(e) => {
          setIsUrlHovered(false);
        }}
      >
        {renderMedia(item)}

        <div className="px-2">
          {renderDetails(
            propertyOrder || [],
            item,
            collectionName,
            page,
            handleNavigate,
            handleNavigateMediaType,
            "moodboard",
            renderProfileCardImg,
            renderCardImage
          )}
        </div>

        <div
          className={`flex justify-between items-center absolute top-0 left-0 w-full p-2 opacity-0 group-hover:opacity-100 transition-opacity ${
            isMobileView ? "opacity-100" : ""
          }`}
          onMouseEnter={(e) => {
            if (item.media_type === "Ai Prompt") {
              setIsUrlHovered(true);
            }
          }}
        >
          {isSharedAndAllowEdit && page !== "collection-public-shared" ? (
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
          <div className="flex flex-row">
            <div className="flex items-center">
              {item?.url && (
                <div
                  className="bg-white border-1 border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 mx-2"
                  title="Preview"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyUrl(item);
                  }}
                >
                  <PiCopy className="h-5 w-5" />
                </div>
              )}
              {gemOnClickEvent === "gem view" && (
                <div
                  title="Open"
                  className="bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] mr-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    openGemInWindow(item);
                  }}
                >
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </div>
              )}

              {gemOnClickEvent !== "gem view" &&
                item?.media_type !== "Audio" &&
                item?.media_type !== "Video" && (
                  <div
                    title="Open gem"
                    className="bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] ml-1"
                    onClick={(e) => handleOpenGem(e, item)}
                  >
                    <EyeIcon className="h-5 w-5" />
                  </div>
                )}

              {isSharedAndAllowEdit && page !== "collection-public-shared" ? (
                <div
                  title="Edit"
                  className="bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] mr-1"
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

            {gemOnClickEvent !== "gem view" &&
              (item?.media_type === "Audio" ||
                item?.media_type === "Video") && (
                <div
                  title="Open gem"
                  className="bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px] ml-1"
                  onClick={(e) => handleOpenGem(e, item)}
                >
                  <EyeIcon className="h-5 w-5" />
                </div>
              )}
          </div>
        </div>
        {page === "embed" || hideGemEngagement ? (
          <></>
        ) : (
          <div
            onClick={(e) => e.stopPropagation()}
            className={`mt-1 p-1 z-50 ${
              Number(session.userId) === item?.author?.id ||
              (page === "collection-public-shared" && !showSocialIcons)
                ? "hidden group-hover:block"
                : "block"
            }`}
            onMouseEnter={(e) => {
              if (item.media_type === "Ai Prompt") {
                setIsUrlHovered(true);
              }
            }}
          >
            <GemEngagement
              gem={item}
              showBookmark={
                (Number(session.userId) !== item?.author?.id && !permissions) ||
                permissions?.permissions?.gems?.canAddtoBookmark
              }
              showComment={showComment}
              user={user}
              isListView={false}
              showAddToBookmark={showAddToBookmark}
              permissions={permissions}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MoodboardMediaTypeCard;