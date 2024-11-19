import {
  AtSymbolIcon,
  Bars3BottomLeftIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  CheckIcon,
  PencilSquareIcon,
  ClockIcon,
  CubeTransparentIcon,
  EyeIcon,
  EyeSlashIcon,
  FolderIcon,
  GlobeAltIcon,
  HashtagIcon,
  LinkIcon,
  ListBulletIcon,
  PhoneIcon,
  PhotoIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Divider, Select, DatePicker, Input, Tooltip, Tag,Checkbox as AntCheckbox, Avatar } from "antd";
import moment from "moment";
import {
  VideoCameraIcon,
  SpeakerWaveIcon,
  BookOpenIcon,
  CodeBracketIcon,
  FilmIcon,
  ShoppingBagIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

import { BiNotepad } from "react-icons/bi";
import { AiOutlineFilePdf } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import {
  RiAlignCenter,
  RiArticleLine,
  RiDiscordFill,
  RiDoubleQuotesL,
  RiEdit2Line,
  RiFacebookFill,
  RiGithubFill,
  RiGitlabFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiMastodonFill,
  RiMediumFill,
  RiPinterestFill,
  RiProductHuntFill,
  RiRedditFill,
  RiRobotLine,
  RiScreenshot2Line,
  RiSteamFill,
  RiTelegramFill,
  RiTextSpacing,
  RiThreadsFill,
  RiTiktokFill,
  RiTumblrFill,
  RiTwitchFill,
  RiTwitterXFill,
  RiWhatsappFill,
  RiYoutubeFill,
} from "react-icons/ri";
import { TbSocial } from "react-icons/tb";
import { MEDIA_TYPES, defaultPropertyOrder } from "./constants";
// import session from "./session";
import { TfiWrite } from "react-icons/tfi";

const { Option } = Select;
const { RangePicker } = DatePicker;
// import CheckBox from "@components/common/Checkbox";
import { SiSubstack } from "react-icons/si";
import { FaGoodreads } from "react-icons/fa";
import FavIconComponent from "@components/common/FavIconComponent";
import TagBlock from "@components/common/TagBlock";
import { PiUser } from "react-icons/pi";

export const renderDetails = (
  propertyOrder=[],
  item,
  collectionName = "",
  page = "",
  handleNavigate = "",
  handleNavigateMediaType = "",
  layout='',
  renderProfileCardImg='',
  renderCardImage=''
) => {

  let finalData = [];
  const imgSrc = (item?.metaData && item?.metaData?.covers?.length > 0) ? (item?.metaData?.covers?.[0] || item?.metaData?.app_screenshot) : ''
  const favSrc = (item?.metaData && item?.metaData?.icon) ? item?.metaData?.icon : ''
  if (propertyOrder.length <= 2) {
    const staticData = propertyOrder
      .filter(
        (p) =>
          p.name === "Title" ||
          p.name === "Tags" ||
          p.name === "Description" ||
          p.name === "Thumbnail" ||
          p.name === "Url" ||
          p.name === "Collection" ||
          p.name === "Media Type" || 
          p.name === 'Remarks' ||
          p.name === 'Author'
      )
      .map((property, i) => {
        if (property.name.toLowerCase() === "tags") {
          if (item.tags && item.tags.length !== 0) {
            return (
              <div
                className="flex items-center flex-wrap my-1 tag-listing"
                key={i}
              >
                <TagBlock tags={item?.tags} />
              </div>
            );
          }
        } else if (property.name.toLowerCase() === "url") {
          const imgSrc =
            item?.metaData?.icon?.icon || item?.metaData?.defaultIcon || "";
          return (
            <>
              <div className="my-1 flex items-center">
                {item?.metaData?.icon ? (
                  <FavIconComponent
                    data={item?.metaData?.icon || null}
                    renderingPlace="tag"
                  />
                ) : (
                  <GlobeAltIcon className="h-5 w-5 mr-[5px] text-[#97A0B5]" />
                )}
                <Tooltip title={item?.url || ""}>
                  <span className="text-[#505050] text-[14px] truncate block ml-1">
                    {item?.url || "No Url"}
                  </span>
                </Tooltip>
              </div>
            </>
          );
        } else if (property.name.toLowerCase() === "collection") {
          return (
            <div className="z-50">
              {page !== "collection" &&
              (item?.collection_gems?.name || collectionName) ? (
                <div
                  className="my-1 flex items-center text-[#1890ff] hover:text-[#40a9ff] w-fit"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(item);
                  }}
                >
                  <FolderIcon className="h-5 w-5 mr-[5px] " />
                  <span className=" text-[14px] ">
                    {item?.collection_gems?.name ||
                      collectionName ||
                      "No Collection"}
                  </span>
                </div>
              ) : (
                <div className="my-1 flex items-center">
                  <FolderIcon className="h-5 w-5 mr-[5px] text-[#97A0B5]" />
                  <span className="text-[#505050] text-[14px]">
                    {item?.collection_gems?.name ||
                      collectionName ||
                      "No Collection"}
                  </span>
                </div>
              )}
            </div>
          );
        } else if (property.name.toLowerCase() === "title") {
          if (item.title) {
            return (
              <span
                className={`${
                  item?.media_type === "Blog" || item?.media_type === "Article"
                    ? "font-bold"
                    : "font-bold"
                }  my-1 block break-words ${
                  item?.broken_link && page === "broken-duplicate"
                    ? "line-through"
                    : ""
                }`}
              >
                {item.title.length > 100
                  ? item.title.slice(0, 100).concat("...")
                  : item.title || "No Title"}
              </span>
            );
          }
        } else if (property.name.toLowerCase() === "description") {
          if (item.description) {
            return (
              <span className="my-1 block break-words">
                {item.description.length > 150
                  ? item.description.slice(0, 150).concat("...")
                  : item.description}
              </span>
            );
          }
        } else if (property.name.toLowerCase() === "media type") {
          if (item.media_type) {
            return (
              <div className="z-50 my-1">
                {page !== "filter" ? (
                  <div
                    className="text-[#1890ff] hover:text-[#40a9ff] w-fit"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigateMediaType(item);
                    }}
                  >
                    {renderMediaTypeUI(item.media_type)}
                  </div>
                ) : (
                  <div>{renderMediaTypeUI(item.media_type)}</div>
                )}
              </div>
            );
          }
        } else if (
          (layout === "moodboard" || layout === "stream") &&
          property.name.toLowerCase() === "thumbnail"
        ) {
          if (item?.media_type === "Profile") {
            return renderProfileCardImg(imgSrc, favSrc);
          } else {
            return renderCardImage(
              imgSrc,
              favSrc,
              item?.altInfo || item?.title || item?.description || ""
            );
          }
        } else if (property.name.toLowerCase() === "remarks") {
          if (item?.remarks) {
            return (
              <span className={`font-medium my-1 block break-words`}>
                {item.remarks.length > 100
                  ? item.remarks.slice(0, 100).concat("...")
                  : item.remarks || "No Remarks"}
              </span>
            );
          }
        } else if (property?.name?.toLowerCase() === "author") {
          if (item?.author?.username) {
            return (
              <div className="flex items-center my-1">
                <Avatar size={'small'} style={{background:'#347ae2',color:'white'}}>
                  {item?.author?.username?.charAt(0)?.toUpperCase()}
                </Avatar>
                <div className="ml-1 font-medium text-sm">
                  {item?.author?.username}
                </div>
              </div>
            );
          }
        }
        return (
          ''
        );
      });

    //custom
    const customData = propertyOrder
      .filter(
        (p) =>
          p.name !== "Title" &&
          p !== "Tags" &&
          p.name !== "Description" &&
          p.name !== "Url" &&
          p.name !== "Collection" &&
          p.name !== "Thumbnail"
      )
      .map((property, i) => {
        let data = "";
        if (item?.custom_fields_obj && item?.custom_fields_obj.length > 0) {
          const filtered = item?.custom_fields_obj?.filter(
            (custom) => custom?.id === property?.id
          );
          if (filtered && filtered.length > 0) {
            if((filtered[0]?.type?.toLowerCase() === "select" && filtered[0]?.isLabel && layout === 'moodboard' && filtered[0]?.answer)){
              const color = filtered[0]?.options?.filter(
                (op) => op.value === filtered[0]?.answer
              );
              return(
                <div className='absolute top-[10px] left-0 block group-hover:hidden px-2 py-1 rounded-tr-md rounded-br-md text-xs' 
                style={{background:color[0]?.color}}>
                    {filtered[0]?.answer || ""}
              </div>
              )
            }
            else if((filtered[0]?.type?.toLowerCase() === "text" && filtered[0]?.isLabel && layout === 'moodboard' && filtered[0]?.answer)){
            return(
              <div className='absolute top-[40px] left-0 block group-hover:hidden px-2 py-1 rounded-tr-md rounded-br-md bg-[#348EE2] text-xs text-white'>
                    {filtered[0]?.answer || ""}
              </div>
            )
          }
            else if (
              (filtered[0]?.type?.toLowerCase() === "select" && !filtered[0]?.isLabel) ||
              filtered[0]?.type?.toLowerCase() === "status"
            ) {
              const color = filtered[0]?.options?.filter(
                (op) => op.value === filtered[0]?.answer
              );
              return (data = (
                <div className="my-1]">
                  <Tooltip
                    title={filtered[0]?.name || ""}
                    placement="top"
                    arrowPointAtCenter
                  >
                    <Tag
                      color={color[0]?.color}
                      style={{ color: "black", width: "fit-content" }}
                    >
                      {filtered[0]?.answer || ""}
                    </Tag>
                  </Tooltip>
                </div>
              ));
            } else if (filtered[0]?.type?.toLowerCase() === "multi-select") {
              return (data = (
                <div className="my-1 fit-content">
                  <Tooltip
                    title={filtered[0]?.name || ""}
                    placement="top"
                    arrowPointAtCenter
                  >
                    {filtered[0]?.answer?.map((d, k) => {
                      const color = filtered[0].options.filter(
                        (op) => op.value === d
                      );
                      return (
                        <Tag
                          key={k}
                          color={color[0].color}
                          style={{ color: "black" }}
                        >
                          {d}
                        </Tag>
                      );
                    })}
                  </Tooltip>
                </div>
              ));
            } else if (filtered[0]?.type?.toLowerCase() === "checkbox") {
              return (data = (
                <AntCheckbox
                  value={filtered[0]?.answer}
                  disabled={true}
                  checked={filtered[0]?.answer}
                >{filtered[0].name}</AntCheckbox>
              ));
            }
            else if((filtered[0]?.type?.toLowerCase() === "text" && !filtered[0]?.isLabel)){
              return (data = (
                  <Tooltip
                    title={filtered[0]?.name || ""}
                    placement="top"
                    arrowPointAtCenter
                  >
                    <div
                      className="my-1 text-xs"
                      key={i}
                      style={{ width: "fit-content" }}
                    >
                      {filtered[0]?.answer || ""}
                    </div>
                  </Tooltip>
                ))
            }
            else if(filtered[0]?.type?.toLowerCase() !== "multi-select" && filtered[0]?.type?.toLowerCase() !== "checkbox" && filtered[0]?.type?.toLowerCase() !== "status" && filtered[0]?.type?.toLowerCase() !== "select" && filtered[0]?.type?.toLowerCase() !== "text"){
              return (data = (
              <Tooltip
                title={filtered[0]?.name || ""}
                placement="top"
                arrowPointAtCenter
              >
                <div
                  className="my-1 text-xs"
                  key={i}
                  style={{ width: "fit-content" }}
                >
                  {filtered[0]?.answer || ""}
                </div>
              </Tooltip>
            ))
            }
          } else {
            return ''
          }
        }
        if (!item?.custom_fields_obj || item?.custom_fields_obj.length === 0) {
          return ''
        }
        return data;
      });

    finalData = [...staticData, ...customData];
    return finalData;
  }

  const staticData = propertyOrder
    .filter(
      (p) =>
        p.name === "Title" ||
        p.name === "Tags" ||
        p.name === "Description" ||
        p.name === "Thumbnail" ||
        p.name === "Url" ||
        p.name === "Collection" ||
        p.name === "Media Type" ||
        p.name === 'Remarks' ||
        p.name === 'Author'
    )
    .map((property, i) => {
      if (property.name.toLowerCase() === "tags") {
        if (item.tags && item.tags.length !== 0) {
          return (
            <div className="flex items-center flex-wrap my-1 tag-listing" key={i}>
              <TagBlock tags={item?.tags}/>
            </div>
          );
        }
      } else if (property.name.toLowerCase() === "url") {
        const imgSrc =
          item?.metaData && item?.metaData.length !== 0
            ? item?.metaData?.icon
            : "";
        return (
          <>
            <div className="my-1 flex items-center">
              {item?.metaData?.icon ? (
                  <FavIconComponent data={item?.metaData?.icon || null} renderingPlace="tag"/>
                ) : (
                <GlobeAltIcon className="h-5 w-5 mr-[5px] text-[#97A0B5]" />
              )}
              <Tooltip title={item?.url || ""}>
                <span className="text-[#505050] text-[14px] truncate block ml-1">
                  {item?.url || "No Url"}
                </span>
              </Tooltip>
            </div>
          </>
        );
      } else if (property.name.toLowerCase() === "collection") {
        return (
          <div className="z-50">
            {page !== "collection" &&
            (item?.collection_gems?.name || collectionName) ? (
              <div
                className="my-1 w-fit flex items-center text-[#1890ff] hover:text-[#40a9ff]"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate(item);
                }}
              >
                <FolderIcon className="h-5 w-5 mr-[5px] " />
                <span className=" text-[14px] ">
                  {item?.collection_gems?.name ||
                    collectionName ||
                    "No Collection"}
                </span>
              </div>
            ) : (
              <div className="my-1 flex items-center">
                <FolderIcon className="h-5 w-5 mr-[5px] text-[#97A0B5]" />
                <span className="text-[#505050] text-[14px]">
                  {item?.collection_gems?.name ||
                    collectionName ||
                    "No Collection"}
                </span>
              </div>
            )}
          </div>
        );
      } else if (property.name.toLowerCase() === "title") {
        if (item.title) {
          return (
            <span
              className={`${(item?.media_type === 'Blog' || item?.media_type === 'Article') ? 'font-bold' : 'font-bold'} my-1 block break-words ${
                (item?.broken_link && page === "broken-duplicate") ? "line-through" : ""
              }`}
            >
              {item.title.length > 100
                  ? item.title.slice(0, 100).concat("...")
                  : (item.title || "No Title")}
            </span>
          );
        }
      } else if (property.name.toLowerCase() === "description") {
        if (item.description) {
          return (
            <span className="my-1 block break-words">
              {item.description.length > 150
                ? item.description.slice(0, 150).concat("...")
                : item.description}
            </span>
          );
        }
      } else if (property.name.toLowerCase() === "media type") {
        if (item.media_type) {
          return (
            <div className="z-50 my-1">
              {page !== "filter" ? (
                <div
                  className="text-[#1890ff] hover:text-[#40a9ff] w-fit"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigateMediaType(item);
                  }}
                >
                  {renderMediaTypeUI(item.media_type)}
                </div>
              ) : (
                <div>{renderMediaTypeUI(item.media_type)}</div>
              )}
            </div>
          );
        }
      }
      else if ((layout === 'moodboard' || layout === 'stream') && property.name.toLowerCase() === "thumbnail") {
          if (item?.media_type === "Profile") {
            return (
              renderProfileCardImg(imgSrc, favSrc)
            )
          }else{
            return renderCardImage(imgSrc, favSrc)
          }
      }
      else if (property.name.toLowerCase() === "remarks") {
          if (item?.remarks) {
            return (
              <span
                className={`font-medium my-1 block break-words`}
              >
                {item.remarks.length > 100
                  ? item.remarks.slice(0, 100).concat("...")
                  : (item.remarks || "No Remarks")}
              </span>
            );
          }
        }
      else if(property?.name?.toLowerCase() === 'author'){
        if(item?.author?.username){
          return (
            <div className="flex items-center my-1">
              <Avatar
                size={"small"}
                style={{ background: "#347ae2", color: "white" }}
              >
                {item?.author?.username?.charAt(0)?.toUpperCase()}
              </Avatar>
              <div className="ml-1 font-medium text-sm">
                {item?.author?.username}
              </div>
            </div>
          );
        }
      }
      return "";
    });

  //custom
  const customData = propertyOrder
    .filter(
      (p) =>
        p.name !== "Title" &&
        p.name !== "Tags" &&
        p.name !== "Description" &&
        p.name !== "Url" &&
        p.name !== "Collection" &&
        p.name !== "Thumbnail"
    )
    .map((property, i) => {
      let data = "";
      if (item?.custom_fields_obj && item?.custom_fields_obj.length > 0) {
        const filtered = item?.custom_fields_obj?.filter(
          (custom) => custom?.id === property?.id
        );

        if (filtered && filtered.length > 0) {
          if((filtered[0]?.type?.toLowerCase() === "select" && filtered[0]?.isLabel && layout === 'moodboard' && filtered[0]?.answer)){
              const color = filtered[0]?.options?.filter(
                (op) => op.value === filtered[0]?.answer
              );
              return(
                <div className='absolute top-[10px] left-0 block group-hover:hidden px-2 py-1 rounded-tr-md rounded-br-md text-xs' style={{background:color[0]?.color}}>
                  {filtered[0]?.answer || ""}
              </div>
              )
          }
          else if((filtered[0]?.type?.toLowerCase() === "text" && filtered[0]?.isLabel && layout === 'moodboard' && filtered[0]?.answer)){
            return(<div className='absolute top-[40px] left-0 block group-hover:hidden px-2 py-1 rounded-tr-md rounded-br-md text-xs bg-[#348EE2] text-white'>
                    {filtered[0]?.answer || ""}
              </div>)
          }
          else if (
            (filtered[0]?.type?.toLowerCase() === "select" && !filtered[0]?.isLabel) ||
            filtered[0]?.type?.toLowerCase() === "status"
          ) {
            const color = filtered[0]?.options?.filter(
              (op) => op.value === filtered[0]?.answer
            );
            return (data = (
              <div className="my-1]">
                <Tooltip
                  title={filtered[0]?.name || ""}
                  placement="top"
                  arrowPointAtCenter
                >
                  <Tag
                    color={color[0]?.color}
                    style={{ color: "black", width: "fit-content" }}
                  >
                    {filtered[0]?.answer || ""}
                  </Tag>
                </Tooltip>
              </div>
            ));
          } else if (filtered[0]?.type?.toLowerCase() === "multi-select") {
            return (data = (
              <div className="my-1 fit-content">
                <Tooltip
                  title={filtered[0]?.name || ""}
                  placement="top"
                  arrowPointAtCenter
                >
                  {filtered[0]?.answer?.map((d, k) => {
                    const color = filtered[0].options.filter(
                      (op) => op.value === d
                    );
                    return (
                      <Tag
                        key={k}
                        color={color[0].color}
                        style={{ color: "black" }}
                      >
                        {d}
                      </Tag>
                    );
                  })}
                </Tooltip>
              </div>
            ));
          } else if (filtered[0]?.type?.toLowerCase() === "checkbox") {
            return (data = (
              <AntCheckbox
                  value={filtered[0]?.answer}
                  disabled={true}
                  checked={filtered[0]?.answer}
                >{filtered[0].name}</AntCheckbox>
            ));
          }
          else if((filtered[0]?.type?.toLowerCase() === "text" && !filtered[0]?.isLabel)){
          return (data = (
              <Tooltip
                title={filtered[0]?.name || ""}
                placement="top"
                arrowPointAtCenter
              >
                <div
                  className="my-1 text-xs"
                  key={i}
                  style={{ width: "fit-content" }}
                >
                  {filtered[0]?.answer || ""}
                </div>
              </Tooltip>
            ))
          }
          else if(filtered[0]?.type?.toLowerCase() !== "multi-select" && filtered[0]?.type?.toLowerCase() !== "checkbox" && filtered[0]?.type?.toLowerCase() !== "status" && filtered[0]?.type?.toLowerCase() !== "select" && filtered[0]?.type?.toLowerCase() !== "text"){
              return (data = (
              <Tooltip
                title={filtered[0]?.name || ""}
                placement="top"
                arrowPointAtCenter
              >
                <div
                  className="my-1 text-xs"
                  key={i}
                  style={{ width: "fit-content" }}
                >
                  {filtered[0]?.answer || ""}
                </div>
              </Tooltip>
            ))
            }
        } else {
          return "";
        }
      }
      return data;
    });

  finalData = [...staticData, ...customData];
  return finalData;
};

export const renderDetailsWithoutProperty = (item, collectionName = "") => {
  return (
    <>
      <span
        className={`font-medium my-1 block ${
          (item?.broken_link && page === "broken-duplicate") ? "line-through" : ""
        }`}
      >
        {item.title}
      </span>

      <span className="text-[#505050] my-1 text-[14px]">
        {item.description}
      </span>

      <div className="my-1 flex items-center truncate">
        <div className="mr-[10px] flex items-center">
          <FolderIcon className="h-5 w-5 mr-[5px] text-[#97A0B5]" />
          <span className="text-[#505050] text-[14px]">
            {item?.collection_gems?.name || collectionName || ""}
          </span>
        </div>

        <div className="mr-[10px] flex items-center">
          <GlobeAltIcon className="h-5 w-5 mr-[5px] text-[#97A0B5]" />
          <Tooltip title={item?.url || ""}>
            <span className="text-[#505050] text-[14px] truncate block">
              {item?.url || ""}
            </span>
          </Tooltip>
        </div>
      </div>

      <div className="my-1 tagWrapper flex items-center flex-wrap">
        {item?.tags?.map((data, i) => (
          <Tag key={i} style={{ display: "block", margin: "3px" }}>
            {data?.tag || data?.attributes?.tag}
          </Tag>
        ))}
      </div>
    </>
  );
};

export const renderMediaTypeLogo = (mediaType) => {
  if (mediaType === "") {
    return "";
  }
  if (mediaType === "Link") {
    return <LinkIcon className="h-4 w-4" />;
  }
  if (mediaType === "Text Expander") {
    return <RiTextSpacing className="h-4 w-4" />;
  }
  if (mediaType === "SocialFeed") {
    return <TbSocial className="h-4 w-4" />;
  }
  if (mediaType === "Book") {
    return <BookOpenIcon className="h-4 w-4" />;
  }
  if (mediaType === "Profile") {
    return <BiUserCircle className="h-4 w-4" />;
  }
  if (mediaType === "Movie") {
    return <FilmIcon className="h-4 w-4" />;
  }
  if (mediaType === "Note") {
    return <BiNotepad className="h-4 w-4" />;
  }
  if (mediaType === "Quote") {
    return <RiDoubleQuotesL className="h-4 w-4" />;
  }
  if (mediaType === "Ai Prompt") {
    return <RiRobotLine className="h-4 w-4" />;
  }
  if (mediaType === "Product") {
    return <ShoppingBagIcon className="h-4 w-4" />;
  }
  if (mediaType === "App") {
    return <DevicePhoneMobileIcon className="h-4 w-4" />;
  }
  // if (mediaType === "Text") {
  //   return <RxText className="h-4 w-4" />;
  // }
  if (mediaType === "Screenshot") {
    return <RiScreenshot2Line className="h-4 w-4" />;
  }
  if (mediaType === "Audio") {
    return <SpeakerWaveIcon className="h-4 w-4" />;
  }
  if (mediaType === "Image") {
    return <PhotoIcon className="h-4 w-4" />;
  }
  if (mediaType === "Video") {
    return <VideoCameraIcon className="h-4 w-4" />;
  }
  if (mediaType === "PDF") {
    return <AiOutlineFilePdf className="h-4 w-4" />;
  }
  if (mediaType === "Favourites") {
    return <RiArticleLine className="h-4 w-4" />;
  }
  if (mediaType === "Article") {
    return <RiArticleLine className="h-4 w-4" />;
  }
  if (mediaType === "Highlight") {
    return <RiEdit2Line className="h-4 w-4" />;
  }
  if (mediaType === "Code") {
    return <CodeBracketIcon className="h-4 w-4" />;
  }
  if (mediaType === 'Citation') {
    return <RiAlignCenter className="h-4 w-4" />;
  }
  if (mediaType === 'Testimonial') {
    return <TfiWrite className="h-4 w-4" />;
  }
};

export const generateFilterTreeData = (
  filter,
  callbacks,
  userTags,
  page = "",
  allCollections=[]
) => {
  const arr = [];

  filter?.forEach((item, i) => {
    const obj = {
      title: (
        <div>
          <div className="my-1" key={i}>
            <div className="flex items-start justify-between flex-wrap w-full">
              <div className="flex flex-col mr-[5px]">
                <span className="text-[500]">Filter By</span>
                {(page === "bookmark" || page === 'broken-duplicate' || page === 'profile-bookmark') ? (
                  <Select
                    placeholder="Filter By"
                    className="w-full"
                    value={item?.filterBy || null}
                    onChange={(value) => callbacks.handleFilterBy(value, i)}
                  >
                    <Option value="title">Title</Option>
                    <Option value="description">Description</Option>
                    <Option value="tags">Tags</Option>
                    <Option value="url">Links</Option>
                    <Option value="collectionName">Collections</Option>
                    <Option value="createddate">Date Added</Option>
                    <Option value="updateddate">Date Updated</Option>
                    <Option value="media_type">Media Type</Option>
                  </Select>
                ) : 
                page === 'filter' ?
                (
                  <Select
                    placeholder="Filter By"
                    className="w-full"
                    value={item?.filterBy || null}
                    onChange={(value) => callbacks.handleFilterBy(value, i)}
                  >
                    <Option value="title">Title</Option>
                    <Option value="description">Description</Option>
                    <Option value="tags">Tags</Option>
                    <Option value="url">Links</Option>
                    <Option value="collectionName">Collections</Option>
                    <Option value="createddate">Date Added</Option>
                    <Option value="updateddate">Date Updated</Option>
                  </Select>
                )
                : 
                page === 'tags' ?
                (
                  <Select
                    placeholder="Filter By"
                    className="w-full"
                    value={item?.filterBy || null}
                    onChange={(value) => callbacks.handleFilterBy(value, i)}
                  >
                    <Option value="title">Title</Option>
                    <Option value="description">Description</Option>
                    <Option value="media_type">Media Type</Option>
                    <Option value="url">Links</Option>
                    <Option value="collectionName">Collections</Option>
                    <Option value="createddate">Date Added</Option>
                    <Option value="updateddate">Date Updated</Option>
                  </Select>
                ) :
                page === 'collection' ?
                <Select
                  placeholder="Filter By"
                  className="w-full"
                  value={item?.filterBy || null}
                  onChange={(value) => callbacks.handleFilterBy(value, i)}
                >
                  <Option value="title">Title</Option>
                  <Option value="description">Description</Option>
                  <Option value="tags">Tags</Option>
                  <Option value="url">Links</Option>
                  <Option value="media_type">Media Type</Option>
                  <Option value="createddate">Date Added</Option>
                  <Option value="updateddate">Date Updated</Option>
                </Select> :
                ''
              }
              </div>

              {item?.filterBy !== "createddate" && item?.filterBy !== "updateddate" && item?.filterBy !== 'tags' && item?.filterBy !== 'media_type' && item?.filterBy !== 'url' && item?.filterBy !== 'collectionName' ? (
                <div className="flex flex-col mr-[5px]">
                  <span className="text-[500]">Condition</span>
                  <Select
                    className="w-full"
                    placeholder="Condition"
                    value={item?.termType || null}
                    onChange={(value) =>
                      callbacks.handleTermType(value, i)
                    }
                  >
                    <Option value="contains">Contains</Option>
                    <Option value="doesnotcontains">Does not contains</Option>
                    <Option value="startswith">Starts with</Option>
                    <Option value="endswith">Ends with</Option>
                    <Option value="is">Is</Option>
                    <Option value="isnot">Is not</Option>
                    <Option value="empty">Empty</Option>
                    <Option value="notempty">Not empty</Option>
                  </Select>
                </div>
              ) : 
              (item?.filterBy === 'createddate' || item?.filterBy === 'updateddate') ?
              (
                <div className="flex flex-col mr-[5px]">
                  <span className="text-[500]">Condition</span>
                  <Select
                    className="w-full"
                    placeholder="Condition"
                    value={item?.termType || null}
                    onChange={(value) =>
                      callbacks.handleTermType(value, i)
                    }
                  >
                    <Option value="is">Is</Option>
                    <Option value="isbefore">Is before</Option>
                    <Option value="isafter">Is after</Option>
                    <Option value="isonbefore">Is on or before</Option>
                    <Option value="isonafter">Is on or after</Option>
                    <Option value="isbetween">Is between</Option>
                    {/* <Option value="empty">Empty</Option>
                    <Option value="notempty">Not empty</Option>
                    <Option value="Is relative to today">
                      Is relative to today
                    </Option> */}
                  </Select>
                </div>
              ) :
              item?.filterBy === 'media_type' ? (
                <div className="flex flex-col mr-[5px]">
                  <span className="text-[500]">Condition</span>
                  <Select
                    className="w-full"
                    placeholder="Condition"
                    value={item?.termType || null}
                    onChange={(value) =>
                      callbacks.handleTermType(value, i)
                    }
                  >
                    <Option value="is">Is</Option>
                    {/* <Option value="contains">Contains</Option>
                    <Option value="doesnotcontains">Does not contains</Option>
                     */}
                  </Select>
                </div>
              ) 
              :
              item?.filterBy === 'tags' ? (
                <div className="flex flex-col mr-[5px]">
                  <span className="text-[500]">Condition</span>
                  <Select
                    className="w-full"
                    placeholder="Condition"
                    value={item?.termType || null}
                    onChange={(value) =>
                      callbacks.handleTermType(value, i)
                    }
                  >
                    <Option value="is">Is</Option>
                    <Option value="empty">Empty</Option>
                    <Option value="notempty">Not empty</Option>
                    {/* <Option value="contains">Contains</Option>
                    <Option value="doesnotcontains">Does not contains</Option>
                     */}
                  </Select>
                </div>
              )
              : 
              item?.filterBy === 'url' ? <div className="flex flex-col mr-[5px]">
                  <span className="text-[500]">Condition</span>
                  <Select
                    className="w-full"
                    placeholder="Condition"
                    value={item?.termType || null}
                    onChange={(value) =>
                      callbacks.handleTermType(value, i)
                    }
                  >
                    <Option value="contains">Contains</Option>
                    <Option value="doesnotcontains">Does not contains</Option>
                    <Option value="is">Is</Option>
                    <Option value="isnot">Is not</Option>
                  </Select>
                </div> :
              item?.filterBy === 'collectionName' ? <div className="flex flex-col mr-[5px]">
                  <span className="text-[500]">Condition</span>
                  <Select
                    className="w-full"
                    placeholder="Condition"
                    value={item?.termType || null}
                    onChange={(value) =>
                      callbacks.handleTermType(value, i)
                    }
                  >
                    {/* <Option value="contains">Contains</Option>
                    <Option value="doesnotcontains">Does not contains</Option>
                    <Option value="startswith">Starts with</Option>
                    <Option value="endswith">Ends with</Option> */}
                    <Option value="is">Is</Option>
                    {/* <Option value="isnot">Is not</Option> */}
                  </Select>
                </div> :
              ''
              }

              <span
                className="text-[14px] cursor-pointer text-red-600 font-medium"
                onClick={() => callbacks.handleRemoveFilter(i)}
              >
                x
              </span>
            </div>

            {
            item?.filterBy === 'tags' && item?.termType === 'is'  &&
            <div className="flex flex-col w-full mb-[10px]">
                <span className="text-[500] mb-[5px]">Select</span>
                <Select
                  className="w-full"
                  placeholder="Select"
                  value={item.queryBy || []}
                  mode="multiple"
                  onChange={(value) =>
                    callbacks.handleQueryBy(value, i)
                  }
                >
                  {userTags?.map((item, i) => (
                    <Option value={item.tag} key={item.id}>
                      {item.tag}
                    </Option>
                  ))}
                </Select>
              </div>
            }

            {
            item?.filterBy === 'media_type' && (item?.termType === 'is') &&
            <div className="flex flex-col w-full mb-[10px]">
                <span className="text-[500] mb-[5px]">Select</span>
                <Select
                  className="w-full"
                  placeholder="Select"
                  mode="multiple"
                  value={item.queryBy || []}
                  onChange={(value) =>
                    callbacks.handleQueryBy(value, i)
                  }
                >
                  {MEDIA_TYPES.map((item) => (
                    <Option value={item} key={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </div>
            }

            {
            (item?.filterBy === 'createddate' || item?.filterBy === 'updateddate') && 
            (item?.termType !== 'isbetween' && item?.termType !== 'empty' && item?.termType !== 'notempty') &&
            <div className="flex flex-col w-full">
                <span className="text-[500] my-1">Choose date</span>
                <DatePicker
                  onChange={(date, dateString) =>
                    callbacks.handleDate(date, dateString, i)
                  }
                  showToday={false}
                  format={"YYYY-MM-DD"}
                  value={item?.queryBy ? moment(item.queryBy, "YYYY-MM-DD") : null}
                  allowClear={false}
                />
              </div>
            }

            {
            (item?.filterBy === 'createddate' || item?.filterBy === 'updateddate') && 
            item?.termType === 'isbetween' &&
            <div className="flex flex-col w-full">
                <span className="text-[500] my-1">Choose Range</span>
                <RangePicker
                  allowClear={false}
                  onChange={(date, dateString) =>
                    callbacks.handleDateRange(date, dateString, i)
                  }
                  format={"YYYY-MM-DD"}
                  value={
                    item?.queryBy?.length > 0
                      ? [
                          moment(item.queryBy[0], "YYYY-MM-DD"),
                          moment(item.queryBy[1], "YYYY-MM-DD"),
                        ]
                      : []
                  }
                />
              </div>
            }

            {
            item?.filterBy === 'collectionName' && (item?.termType === 'is') &&
            <div className="flex flex-col w-full mb-[10px]">
                <span className="text-[500] mb-[5px]">Select</span>
                <Select
                  className="w-full"
                  placeholder="Select"
                  mode="multiple"
                  value={item.queryBy || []}
                  onChange={(value) =>
                    callbacks.handleQueryBy(value, i)
                  }
                >
                  {allCollections?.map((item) => (
                    <Option value={item.name} key={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </div>
            }

            {
            (item?.filterBy !== 'tags' && item?.filterBy !== 'createddate' && item?.filterBy !== 'updateddate' && item?.filterBy !== 'media_type' && item?.filterBy !=='collectionName') 
            && (item?.termType !== 'empty' && item?.termType !== 'notempty') &&
            <div className="flex flex-col w-full">
                  <span className="text-[500] mb-[5px]">Text</span>
                  <Input
                    className="h-[30px]"
                    placeholder="Filter text"
                    value={item?.queryBy}
                    onChange={(e) =>
                      callbacks.handleQueryBy(e.target.value, i)
                    }
                />
            </div>
            }

            {
              item?.filterBy === 'media_type' && (item?.queryBy?.includes('SocialFeed') || item?.queryBy === item?.queryBy?.includes('Profile')) &&
              <div className='flex flex-col mr-[5px]'>
                <span className='text-[500]'>Platform</span>
                <Select
                  className='w-full'
                  placeholder='Platform'
                  value={item?.platform || null}
                  onChange={(value) => callbacks.handlePlatform(value, i)}
                >
                  {/* <Option value=''>All</Option> */}
                  <Option value='Twitter'>Twitter</Option>
                  <Option value='LinkedIn'>LinkedIn</Option>
                  <Option value='Reddit'>Reddit</Option>
                  <Option value='Producthunt'>Producthunt</Option>
                  <Option value='Medium'>Medium</Option>
                  <Option value='Hacker News'>Hacker News</Option>
                  <Option value='Github'>Github</Option>
                  <Option value='Tiktok'>Tiktok</Option>
                  <Option value='Instagram'>Instagram</Option>
                  <Option value='YouTube'>YouTube</Option>
                </Select>
              </div>
            }
          </div>

          <Divider className="m-0" />
        </div>
      ),
      key: i,
      label: item,
    };
    arr.push(obj);
  });

  return arr;
};

export const generateSortData = (sort, callbacks, page = "") => {
  let arr = [];

  sort?.forEach((item, i) => {
    const obj = {
      title: (
        <>
          <div className="my-[10px] flex items-center justify-between w-full">
            <div className="flex flex-col w-full mr-[5px]">
              {(page === "bookmark" || page === 'broken-duplicate' || page === 'profile-bookmark') ? (
                <Select
                  placeholder="Sort By"
                  className="w-full"
                  value={item?.sortby || null}
                  onChange={(value) => callbacks.handleSortBy(value, i)}
                >
                    <Option value="title">Title</Option>
                    <Option value="description">Description</Option>
                    <Option value="tags">Tags</Option>
                    <Option value="url">Links</Option>
                    <Option value="collectionName">Collections</Option>
                    <Option value="createddate">Date Added</Option>
                    <Option value="updateddate">Date Updated</Option>
                    <Option value="media_type">Media Type</Option>
                </Select>
              ) : 
              page === 'filter' ?
              <Select
                  placeholder="Sort By"
                  className="w-full"
                  value={item?.sortby || null}
                  onChange={(value) => callbacks.handleSortBy(value, i)}
                >
                    <Option value="title">Title</Option>
                    <Option value="description">Description</Option>
                    <Option value="tags">Tags</Option>
                    <Option value="url">Links</Option>
                    <Option value="collectionName">Collections</Option>
                    <Option value="createddate">Date Added</Option>
                    <Option value="updateddate">Date Updated</Option>
              </Select>
              :
              page === 'collection' ?
              <Select
                  placeholder="Sort By"
                  className="w-full"
                  value={item?.sortby || null}
                  onChange={(value) => callbacks.handleSortBy(value, i)}
                >
                    <Option value="title">Title</Option>
                    <Option value="description">Description</Option>
                    <Option value="tags">Tags</Option>
                    <Option value="url">Links</Option>
                    <Option value="createddate">Date Added</Option>
                    <Option value="updateddate">Date Updated</Option>
                    <Option value="media_type">Media Type</Option>
                </Select> :
              page === 'tags' ?
              <Select
                  placeholder="Sort By"
                  className="w-full"
                  value={item?.sortby || null}
                  onChange={(value) => callbacks.handleSortBy(value, i)}
                >
                    <Option value="title">Title</Option>
                    <Option value="description">Description</Option>
                    <Option value="url">Links</Option>
                    <Option value="collectionName">Collections</Option>
                    <Option value="createddate">Date Added</Option>
                    <Option value="updateddate">Date Updated</Option>
                    <Option value="media_type">Media Type</Option>
                </Select> :
                <Select
                  placeholder="Sort By"
                  className="w-full"
                  value={item?.sortby || null}
                  onChange={(value) => callbacks.handleSortBy(value, i)}
                >
                    <Option value="title">Title</Option>
                    <Option value="description">Description</Option>
                    <Option value="tags">Tags</Option>
                    <Option value="url">Links</Option>
                    <Option value="collectionName">Collections</Option>
                    <Option value="createddate">Date Added</Option>
                    <Option value="updateddate">Date Updated</Option>
                    <Option value="media_type">Media Type</Option>
                </Select>
              }
            </div>

            <div className="flex flex-col w-full mr-[5px]">
              <Select
                className="w-full"
                placeholder="Order"
                value={item?.orderby || null}
                onChange={(value) => callbacks.handleSortOrder(value, i)}
              >
                <Option value="asc">Ascending</Option>
                <Option value="desc">Descending</Option>
              </Select>
            </div>

            <span
              className="text-[14px] cursor-pointer text-red-600 font-medium"
              onClick={() => callbacks.handleRemoveSort(i)}
            >
              x
            </span>
          </div>
        </>
      ),
      key: i,
      label: item,
    };
    arr.push(obj);
  });

  return arr;
};

export const renderTitle = (
  item,
  type,
  handlePropertyHide,
  handlePropertyVisible,
  handleEditCustomFieldProperty=() =>{}
) => {
  if (type === "visible") {
    if (
      item.type === "text" ||
      item.type === "Text" ||
      item.type === "mediaType" || 
      item.type === "remarks"
    ) {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <Bars3BottomLeftIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeIcon
              className="h-5 w-5 text-[#347AE2] cursor-pointer mr-1"
              onClick={() => {
                handlePropertyHide(item);
              }}
            />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "tags" || item.type === "Number") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <HashtagIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeIcon
              className="h-5 w-5 text-[#347AE2] cursor-pointer mr-1"
              onClick={() => {
                handlePropertyHide(item);
              }}
            />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "image") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <PhotoIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeIcon
              className="h-5 w-5 text-[#347AE2] cursor-pointer mr-1"
              onClick={() => {
                handlePropertyHide(item);
              }}
            />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "url" || item.type === "URL") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <LinkIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeIcon
              className="h-5 w-5 text-[#347AE2] cursor-pointer mr-1"
              onClick={() => {
                handlePropertyHide(item);
              }}
            />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "folder") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <FolderIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeIcon
              className="h-5 w-5 text-[#347AE2] cursor-pointer mr-1"
              onClick={() => {
                handlePropertyHide(item);
              }}
            />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Select") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <CheckIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeIcon
              className="h-5 w-5 text-[#347AE2] cursor-pointer mr-1"
              onClick={() => {
                handlePropertyHide(item);
              }}
            />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Multi-select") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <ListBulletIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeIcon
              className="h-5 w-5 text-[#347AE2] cursor-pointer mr-1"
              onClick={() => {
                handlePropertyHide(item);
              }}
            />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Status") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <CubeTransparentIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeIcon
              className="h-5 w-5 text-[#347AE2] cursor-pointer mr-1"
              onClick={() => {
                handlePropertyHide(item);
              }}
            />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Date") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <CalendarDaysIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeIcon
              className="h-5 w-5 text-[#347AE2] cursor-pointer mr-1"
              onClick={() => {
                handlePropertyHide(item);
              }}
            />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Checkbox") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <CheckCircleIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeIcon
              className="h-5 w-5 text-[#347AE2] cursor-pointer mr-1"
              onClick={() => {
                handlePropertyHide(item);
              }}
            />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Email") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <AtSymbolIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeIcon
              className="h-5 w-5 text-[#347AE2] cursor-pointer mr-1"
              onClick={() => {
                handlePropertyHide(item);
              }}
            />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Phone") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <PhoneIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeIcon
              className="h-5 w-5 text-[#347AE2] cursor-pointer mr-1"
              onClick={() => {
                handlePropertyHide(item);
              }}
            />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Created time") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeIcon
              className="h-5 w-5 text-[#347AE2] cursor-pointer mr-1"
              onClick={() => {
                handlePropertyHide(item);
              }}
            />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Created by") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <UserCircleIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeIcon
              className="h-5 w-5 text-[#347AE2] cursor-pointer mr-1"
              onClick={() => {
                handlePropertyHide(item);
              }}
            />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Last edited time") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeIcon
              className="h-5 w-5 text-[#347AE2] cursor-pointer mr-1"
              onClick={() => {
                handlePropertyHide(item);
              }}
            />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Last edited by") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <UserCircleIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeIcon
              className="h-5 w-5 text-[#347AE2] cursor-pointer mr-1"
              onClick={() => {
                handlePropertyHide(item);
              }}
            />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "author") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <PiUser className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeIcon
              className="h-5 w-5 text-[#347AE2] cursor-pointer mr-1"
              onClick={() => {
                handlePropertyHide(item);
              }}
            />
            {item?.id ? (
              <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              />
            ) : (
              <div className="h-5 w-5"></div>
            )}
          </div>
        </div>
      );
    }
  }

  if (type === "hidden") {
    if (
      item.type === "text" ||
      item.type === "Text" ||
      item.type === "mediaType" ||
      item.type === "remarks"
    ) {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <Bars3BottomLeftIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeSlashIcon
            className="h-5 w-5 text-[#97A0B5] cursor-pointer"
            onClick={() => handlePropertyVisible(item)}
          />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "tags" || item.type === "Number") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <HashtagIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeSlashIcon
            className="h-5 w-5 text-[#97A0B5] cursor-pointer"
            onClick={() => handlePropertyVisible(item)}
          />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "image") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <PhotoIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeSlashIcon
            className="h-5 w-5 text-[#97A0B5] cursor-pointer"
            onClick={() => handlePropertyVisible(item)}
          />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "url" || item.type === "URL") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <LinkIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeSlashIcon
            className="h-5 w-5 text-[#97A0B5] cursor-pointer"
            onClick={() => handlePropertyVisible(item)}
          />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "folder") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <FolderIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeSlashIcon
            className="h-5 w-5 text-[#97A0B5] cursor-pointer"
            onClick={() => handlePropertyVisible(item)}
          />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Select") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <CheckIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeSlashIcon
            className="h-5 w-5 text-[#97A0B5] cursor-pointer"
            onClick={() => handlePropertyVisible(item)}
          />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Multi-select") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <ListBulletIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeSlashIcon
            className="h-5 w-5 text-[#97A0B5] cursor-pointer"
            onClick={() => handlePropertyVisible(item)}
          />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Status") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <CubeTransparentIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeSlashIcon
            className="h-5 w-5 text-[#97A0B5] cursor-pointer"
            onClick={() => handlePropertyVisible(item)}
          />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Date") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <CalendarDaysIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeSlashIcon
            className="h-5 w-5 text-[#97A0B5] cursor-pointer"
            onClick={() => handlePropertyVisible(item)}
          />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Checkbox") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <CheckCircleIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeSlashIcon
            className="h-5 w-5 text-[#97A0B5] cursor-pointer"
            onClick={() => handlePropertyVisible(item)}
          />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Email") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <AtSymbolIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeSlashIcon
            className="h-5 w-5 text-[#97A0B5] cursor-pointer"
            onClick={() => handlePropertyVisible(item)}
          />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Phone") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <PhoneIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeSlashIcon
            className="h-5 w-5 text-[#97A0B5] cursor-pointer"
            onClick={() => handlePropertyVisible(item)}
          />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Created time") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeSlashIcon
            className="h-5 w-5 text-[#97A0B5] cursor-pointer"
            onClick={() => handlePropertyVisible(item)}
          />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Created by") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <UserCircleIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeSlashIcon
            className="h-5 w-5 text-[#97A0B5] cursor-pointer"
            onClick={() => handlePropertyVisible(item)}
          />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Last edited time") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeSlashIcon
            className="h-5 w-5 text-[#97A0B5] cursor-pointer"
            onClick={() => handlePropertyVisible(item)}
          />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "Last edited by") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <UserCircleIcon className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeSlashIcon
            className="h-5 w-5 text-[#97A0B5] cursor-pointer"
            onClick={() => handlePropertyVisible(item)}
          />
            {
              item?.id ? <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              /> : <div className="h-5 w-5"></div>
            }
          </div>
        </div>
      );
    }
    if (item.type === "author") {
      return (
        <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
          <div className="flex items-center">
            <PiUser className="h-5 w-5 mr-1 text-[#344054]" />
            <span className="text-[#344054]">{item.name}</span>
          </div>
          <div className="flex items-center">
            <EyeSlashIcon
              className="h-5 w-5 text-[#97A0B5] cursor-pointer"
              onClick={() => handlePropertyVisible(item)}
            />
            {item?.id ? (
              <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleEditCustomFieldProperty(item)}
              />
            ) : (
              <div className="h-5 w-5"></div>
            )}
          </div>
        </div>
      );
    }
  }
};

export const renderCustomPropertyTitle = (item) => {
  if (item.type === "Text") {
    return (
      <div className="flex items-center">
        <Bars3BottomLeftIcon className="h-5 w-5 mr-1 text-[#344054]" />
        <span className="text-[#344054]">{item.name}</span>
      </div>
    );
  }
  if (item.type === "Select") {
    return (
      <div className="flex items-center">
        <CheckIcon className="h-5 w-5 mr-1 text-[#344054]" />
        <span className="text-[#344054]">{item.name}</span>
      </div>
    );
  }
  if (item.type === "Multi-select") {
    return (
      <div className="flex items-center">
        <ListBulletIcon className="h-5 w-5 mr-1 text-[#344054]" />
        <span className="text-[#344054]">{item.name}</span>
      </div>
    );
  }
  if (item.type === "Status") {
    return (
      <div className="flex items-center">
        <CubeTransparentIcon className="h-5 w-5 mr-1 text-[#344054]" />
        <span className="text-[#344054]">{item.name}</span>
      </div>
    );
  }
  if (item.type === "Date") {
    return (
      <div className="flex items-center">
        <CalendarDaysIcon className="h-5 w-5 mr-1 text-[#344054]" />
        <span className="text-[#344054]">{item.name}</span>
      </div>
    );
  }
  if (item.type === "Checkbox") {
    return (
      <div className="flex items-center">
        <CheckCircleIcon className="h-5 w-5 mr-1 text-[#344054]" />
        <span className="text-[#344054]">{item.name}</span>
      </div>
    );
  }
  if (item.type === "Email") {
    return (
      <div className="flex items-center">
        <AtSymbolIcon className="h-5 w-5 mr-1 text-[#344054]" />
        <span className="text-[#344054]">{item.name}</span>
      </div>
    );
  }
  if (item.type === "Phone") {
    return (
      <div className="flex items-center">
        <PhoneIcon className="h-5 w-5 mr-1 text-[#344054]" />
        <span className="text-[#344054]">{item.name}</span>
      </div>
    );
  }
  if (item.type === "Created time") {
    return (
      <div className="flex items-center">
        <ClockIcon className="h-5 w-5 mr-1 text-[#344054]" />
        <span className="text-[#344054]">{item.name}</span>
      </div>
    );
  }
  if (item.type === "Created by") {
    return (
      <div className="flex items-center">
        <UserCircleIcon className="h-5 w-5 mr-1 text-[#344054]" />
        <span className="text-[#344054]">{item.name}</span>
      </div>
    );
  }
  if (item.type === "Last edited time") {
    return (
      <div className="flex items-center">
        <ClockIcon className="h-5 w-5 mr-1 text-[#344054]" />
        <span className="text-[#344054]">{item.name}</span>
      </div>
    );
  }
  if (item.type === "Last edited by") {
    return (
      <div className="flex items-center">
        <UserCircleIcon className="h-5 w-5 mr-1 text-[#344054]" />
        <span className="text-[#344054]">{item.name}</span>
      </div>
    );
  }
  if (item.type === "Number") {
    return (
      <div className="flex items-center">
        <HashtagIcon className="h-5 w-5 mr-1 text-[#344054]" />
        <span className="text-[#344054]">{item.name}</span>
      </div>
    );
  }
  if (item.type === "URL") {
    return (
      <div className="flex items-center">
        <LinkIcon className="h-5 w-5 mr-1 text-[#344054]" />
        <span className="text-[#344054]">{item.name}</span>
      </div>
    );
  }
};

export const getFilteredData = (items, propertyOrder, page) => {
  if (
    page === "bookmark" ||
    page === "broken-duplicate" ||
    page === "filter" ||
    page === "parent-child" ||
    page === "profile-bookmark"
  ) {
    const data = items
      .filter((item) => {
        if (propertyOrder[0]?.name?.toLowerCase() !== "tags") {
          return (
            item[propertyOrder[0]?.name?.toLowerCase()] !== "" &&
            item[propertyOrder[0]?.name?.toLowerCase()] !== null
          );
        }
        return true;
      })
      .filter((item) => {
        if (propertyOrder[0]?.name?.toLowerCase() === "tags") {
          return item[propertyOrder[0]?.name?.toLowerCase()]?.length !== 0;
        }
        return true;
      });

    return data;
  }

  if (page === "collection") {
    const data = items
      .filter((item) => {
        if (
          propertyOrder[0]?.name?.toLowerCase() !== "title" &&
          propertyOrder[0]?.name?.toLowerCase() !== "tags" &&
          propertyOrder[0]?.name?.toLowerCase() !== "description" &&
          propertyOrder[0]?.name?.toLowerCase() !== "url" &&
          propertyOrder[0]?.name?.toLowerCase() !== "collection"
        ) {
          const filtered =
            item?.custom_fields_obj &&
            item?.custom_fields_obj?.length > 0 &&
            item?.custom_fields_obj?.filter(
              (custom) =>
                custom?.name?.toLowerCase() ===
                propertyOrder[0]?.name?.toLowerCase()
            );
          if (
            filtered &&
            filtered.length > 0 &&
            filtered[0]?.answer !== "" &&
            filtered[0]?.answer !== null
          ) {
            return (
              filtered &&
              filtered[0]?.answer !== "" &&
              filtered[0]?.answer !== null
            );
          }
        }
        return true;
      })
      .filter((item) => {
        if (
          propertyOrder[0]?.name?.toLowerCase() === "title" ||
          propertyOrder[0]?.name?.toLowerCase() === "description" ||
          propertyOrder[0]?.name?.toLowerCase() === "url" ||
          propertyOrder[0]?.name?.toLowerCase() === "collection"
        ) {
          return (
            (item[propertyOrder[0]?.name?.toLowerCase()] !== "" &&
              item[propertyOrder[0]?.name?.toLowerCase()] !== null) ||
            item[propertyOrder[0]?.name?.toLowerCase()]?.length !== 0
          );
        }
        return true;
      })
      .filter((item) => {
        if (propertyOrder[0]?.name?.toLowerCase() === "tags") {
          return item[propertyOrder[0]?.name?.toLowerCase()]?.length !== 0;
        }
        return true;
      });

    return data;
  }
};

export const renderMediaTypeUI = (mediaType) => {
  if (mediaType === "") {
    return "";
  }
  if (mediaType === "Link") {
    return (
      <div className="flex items-center">
        <LinkIcon className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
  if (mediaType === "Text Expander") {
    return (
      <div className="flex items-center">
        <RiTextSpacing className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
  if (mediaType === "SocialFeed") {
    return (
      <div className="flex items-center">
        <TbSocial className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
  if (mediaType === "Book") {
    return (
      <div className="flex items-center">
        <BookOpenIcon className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
  if (mediaType === "Profile") {
    return (
      <div className="flex items-center">
        <BiUserCircle className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
  if (mediaType === "Movie") {
    return (
      <div className="flex items-center">
        <FilmIcon className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
  if (mediaType === "Note") {
    return (
      <div className="flex items-center">
        <BiNotepad className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
  if (mediaType === "Quote") {
    return (
      <div className="flex items-center">
        <RiDoubleQuotesL className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
  if (mediaType === "Ai Prompt") {
    return (
      <div className="flex items-center">
        <RiRobotLine className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
  if (mediaType === "Product") {
    return (
      <div className="flex items-center">
        <ShoppingBagIcon className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
  if (mediaType === "App") {
    return (
      <div className="flex items-center">
        <DevicePhoneMobileIcon className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
  // if (mediaType === "Text") {
  //   return (
  //     <div className="flex items-center">
  //       <RxText className="h-5 w-5" />
  //       <div className="ml-1">{mediaType}</div>
  //     </div>
  //   );
  // }
  if (mediaType === "Screenshot") {
    return (
      <div className="flex items-center">
        <RiScreenshot2Line className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
  if (mediaType === "Audio") {
    return (
      <div className="flex items-center">
        <SpeakerWaveIcon className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
  if (mediaType === "Image") {
    return (
      <div className="flex items-center">
        <PhotoIcon className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
  if (mediaType === "Video") {
    return (
      <div className="flex items-center">
        <VideoCameraIcon className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
  if (mediaType === "PDF") {
    return (
      <div className="flex items-center">
        <AiOutlineFilePdf className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
  if (mediaType === "Favourites") {
    return (
      <div className="flex items-center">
        <RiArticleLine className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
  if (mediaType === "Article") {
    return (
      <div className="flex items-center">
        <RiArticleLine className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
  if (mediaType === "Highlight") {
    return (
      <div className="flex items-center">
        <RiEdit2Line className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
  if (mediaType === "Code") {
    return (
      <div className="flex items-center">
        <CodeBracketIcon className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
  if (mediaType === 'Citation') {
    return (
      <div className="flex items-center">
        <RiAlignCenter className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
  if (mediaType === 'Testimonial') {
    return (
      <div className="flex items-center">
        <TfiWrite className="h-5 w-5" />
        <div className="ml-1">{mediaType}</div>
      </div>
    );
  }
};

export const handleSorted = (items, sort) => {
  let arr = items;

  if (sort?.length > 0) {
    for (let i = 0; i < sort.length; i++) {
      if (sort[i].by && sort[i].order) {
        arr = items.sort((a, b) => {
          if (
            sort[i].order === "ascending" &&
            sort[i].by !== "tags" &&
            sort[i].by !== "date" &&
            sort[i].by !== "dateupdated" &&
            sort[i].by !== "mediaType" &&
            sort[i].by !== "collections"
          ) {
            if (a[sort[i].by] === "" && b[sort[i].by] === "") {
              return 0;
            } else if (a[sort[i].by] === "" || !a[sort[i].by]) {
              return 1;
            } else if (b[sort[i].by] === "" || !b[sort[i].by]) {
              return -1;
            } else if (
              a[sort[i].by]?.toLowerCase() < b[sort[i].by]?.toLowerCase()
            ) {
              return -1;
            } else if (
              a[sort[i].by]?.toLowerCase() > b[sort[i].by]?.toLowerCase()
            ) {
              return 1;
            } else {
              return 0;
            }
          } else if (
            sort[i].order === "descending" &&
            sort[i].by !== "tags" &&
            sort[i].by !== "date" &&
            sort[i].by !== "dateupdated" &&
            sort[i].by !== "mediaType" &&
            sort[i].by !== "collections"
          ) {
            if (a[sort[i].by] === "" && b[sort[i].by] === "") {
              return 0;
            } else if (a[sort[i].by] === "" || !a[sort[i].by]) {
              return 1;
            } else if (b[sort[i].by] === "" || !b[sort[i].by]) {
              return -1;
            } else if (
              a[sort[i].by]?.toLowerCase() > b[sort[i].by]?.toLowerCase()
            ) {
              return -1;
            } else if (
              a[sort[i].by]?.toLowerCase() < b[sort[i].by]?.toLowerCase()
            ) {
              return 1;
            } else {
              return 0;
            }
          } else if (sort[i].order === "ascending" && sort[i].by === "tags") {
            if (a.tags.length === 0 && b.tags.length === 0) {
              return 0;
            } else if (a.tags.length === 0) {
              return 1;
            } else if (b.tags.length === 0) {
              return -1;
            } else if (a.tags.length < b.tags.length) {
              return -1;
            } else if (a.tags.length > b.tags.length) {
              return 1;
            } else {
              return 0;
            }
          } else if (sort[i].order === "descending" && sort[i].by === "tags") {
            if (a.tags.length === 0 && b.tags.length === 0) {
              return 0;
            } else if (a.tags.length === 0) {
              return 1;
            } else if (b.tags.length === 0) {
              return -1;
            } else if (a.tags.length > b.tags.length) {
              return -1;
            } else if (a.tags.length < b.tags.length) {
              return 1;
            } else {
              return 0;
            }
          }

          //date ascending
          else if (sort[i].order === "ascending" && sort[i].by === "date") {
            const dateA = a.createdAt
              ? new Date(a.createdAt.split("-").reverse().join("-"))
              : null;
            const dateB = b.createdAt
              ? new Date(b.createdAt.split("-").reverse().join("-"))
              : null;
            if (!dateA) {
              return 1;
            }
            if (!dateB) {
              return -1;
            }
            return dateA - dateB;
          }
          //date descending
          else if (sort[i].order === "descending" && sort[i].by === "date") {
            const dateA = a.createdAt
              ? new Date(a.createdAt.split("-").reverse().join("-"))
              : null;
            const dateB = b.createdAt
              ? new Date(b.createdAt.split("-").reverse().join("-"))
              : null;
            if (!dateA) {
              return 1;
            }
            if (!dateB) {
              return -1;
            }
            return dateB - dateA;
          }

          //date ascending
          else if (
            sort[i].order === "ascending" &&
            sort[i].by === "dateupdated"
          ) {
            const dateA = a.createdAt
              ? new Date(a.createdAt.split("-").reverse().join("-"))
              : null;
            const dateB = b.createdAt
              ? new Date(b.createdAt.split("-").reverse().join("-"))
              : null;
            if (!dateA) {
              return 1;
            }
            if (!dateB) {
              return -1;
            }
            return dateA - dateB;
          }
          //date descending
          else if (
            sort[i].order === "descending" &&
            sort[i].by === "dateupdated"
          ) {
            const dateA = a.createdAt
              ? new Date(a.createdAt.split("-").reverse().join("-"))
              : null;
            const dateB = b.createdAt
              ? new Date(b.createdAt.split("-").reverse().join("-"))
              : null;
            if (!dateA) {
              return 1;
            }
            if (!dateB) {
              return -1;
            }
            return dateB - dateA;
          }

          //colelctions
          if (sort[i].order === "ascending" && sort[i].by === "collections") {
            if (
              a.collection_gems.name === "" &&
              b.collection_gems.name === ""
            ) {
              return 0;
            } else if (a.collection_gems.name === "" || !a.collection_gems) {
              return 1;
            } else if (b.collection_gems.name === "" || !b.collection_gems) {
              return -1;
            } else if (
              a.collection_gems.name?.toLowerCase() <
              b.collection_gems.name?.toLowerCase()
            ) {
              return -1;
            } else if (
              a.collection_gems.name?.toLowerCase() >
              b.collection_gems.name?.toLowerCase()
            ) {
              return 1;
            } else {
              return 0;
            }
          } else if (
            sort[i].order === "descending" &&
            sort[i].by === "collections"
          ) {
            if (
              a.collection_gems.name === "" &&
              b.collection_gems.name === ""
            ) {
              return 0;
            } else if (a.collection_gems.name === "" || !a.collection_gems) {
              return 1;
            } else if (b.collection_gems.name === "" || !b.collection_gems) {
              return -1;
            } else if (
              a.collection_gems.name?.toLowerCase() >
              b.collection_gems.name?.toLowerCase()
            ) {
              return -1;
            } else if (
              a.collection_gems.name?.toLowerCase() <
              b.collection_gems.name?.toLowerCase()
            ) {
              return 1;
            } else {
              return 0;
            }
          }
          if (sort[i].order === "ascending" && sort[i].by === "mediaType") {
            if (a.media_type === "" && b.media_type === "") {
              return 0;
            } else if (a.media_type === "" || !a.media_type) {
              return 1;
            } else if (b.media_type === "" || !b.media_type) {
              return -1;
            } else if (
              a.media_type?.toLowerCase() < b.media_type?.toLowerCase()
            ) {
              return -1;
            } else if (
              a.media_type?.toLowerCase() > b.media_type?.toLowerCase()
            ) {
              return 1;
            } else {
              return 0;
            }
          } else if (
            sort[i].order === "descending" &&
            sort[i].by === "mediaType"
          ) {
            if (a.media_type === "" && b.media_type === "") {
              return 0;
            } else if (a.media_type === "" || !a.media_type) {
              return 1;
            } else if (b.media_type === "" || !b.media_type) {
              return -1;
            } else if (
              a.media_type?.toLowerCase() > b.media_type?.toLowerCase()
            ) {
              return -1;
            } else if (
              a.media_type?.toLowerCase() < b.media_type?.toLowerCase()
            ) {
              return 1;
            } else {
              return 0;
            }
          }

          return [];
        });
      }
    }
  }

  return arr;
};

export const handleTimelineFilter = (items, value) => {
  moment.locale("en", {
    week: {
      dow: 1,
    },
  });

  if (value === "all time") {
    return items;
  }

  if (value === "today") {
    const today = items.filter((item) =>
      moment(item.createdAt).isSame(moment(), "day")
    );
    return today;
  }

  if (value === "weekly") {
    const thisWeek = items.filter((item) =>
      moment(item.createdAt).isSame(moment(), "week")
    );
    return thisWeek;
  }

  if (value === "monthly") {
    const thisMonth = items.filter((item) =>
      moment(item.createdAt).isSame(moment(), "month")
    );
    return thisMonth;
  }
};

export const getHandWUnits = (shape) => {
 if(shape === 'small-square'){
      return {
        "width": 1,
        "height": 1,
    }
    }
    if(shape === 'square'){
      return {
        "width": 2,
        "height": 2,
    }
    }
    if(shape === 'rectangle'){
      return  {
        "width": 2,
        "height": 1,
    }
    }
    if(shape === 'small-rectangle'){
      return{
        "width": 2,
        "height": 0.5,
    }
    }
    if(shape === 'pipe'){
      return {
        "width": 1,
        "height": 2,
    }
    }
}

export const getHandWUnitsTitle = (screenWidth) => {
  if(screenWidth >= 1800){
    return{
      "width" : 10,
      "height": 0.5
    }
  }

  if(screenWidth >= 1200 && screenWidth < 1800){
    return{
      "width" : 8,
      "height": 0.5
    }
  }

  if(screenWidth >= 768 && screenWidth < 1200){
    return{
      "width" : 6,
      "height": 0.5
    }
  }

  if(screenWidth > 0 && screenWidth < 768){
    return{
      "width" : 4,
      "height": 0.5
    }
  }
}

export function extractUsernameFromUrl(url) {
 const patterns = {
    'twitter.com': /twitter\.com\/([^/?]+)/,
    'pinterest.com': /pinterest\.com\/([^/?]+)/,
    'producthunt.com': /producthunt\.com\/@([^/?]+)/,
    'linkedin.com': /linkedin\.com\/in\/([^/?]+)/,
    'facebook.com': /facebook\.com\/([^/?]+)/,
    'instagram.com': /instagram\.com\/([^/?]+)/,
    'tiktok.com': /tiktok\.com\/@([^/?]+)/,
    'github.com': /github\.com\/([^/?]+)/,
    'youtube.com': /youtube\.com\/@([^/?]+)/,
    'substack.com': /substack\.com\/@([^/?]+)/,
    'twitch.tv': /twitch\.tv\/([^/?]+)/,
    'reddit.com': /reddit\.com\/user\/([^/?]+)/,
    'threads.net': /threads\.net\/@([^/?]+)/,
    // Add more patterns for other platforms here
  };

  // Extract the hostname from the URL
  const hostname = new URL(url).hostname;

  // Find the matching pattern and extract the username
  for (const [platform, pattern] of Object.entries(patterns)) {
    if (hostname.includes(platform)) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1]; // Return the username
      }
    }
  }

  return null; // No matching pattern found
}

export const rendeProfilePlatfromLogo = (platform,value='') => {
  if (platform === "") {
    return "";
  }
  if(platform === 'Facebook'){
    return <RiFacebookFill className={`h-5 w-5 ${value ? 'text-[#23599B]' : 'text-gray-400'}`}/>
  }
  if(platform === 'Tiktok'){
    return <RiTiktokFill className={`h-5 w-5 ${value ? 'text-blue-500' : 'text-gray-400'}`}/>
  }
  if(platform === 'Twitch'){
    return <RiTwitchFill className={`h-5 w-5 ${value ? 'text-[#64449E]' : 'text-gray-400'}`}/>
  }
  if(platform === 'Instagram'){
    return <RiInstagramFill className={`h-5 w-5 ${value ? 'text-[#F50C96]' : 'text-gray-400'}`}/>
  }
  if(platform === 'Twitter'){
    return <RiTwitterXFill className={`h-5 w-5 ${value ? 'text-[#000000]' : 'text-gray-400'}`}/>
  }
  if(platform === 'LinkedIn'){
    return <RiLinkedinFill className={`h-5 w-5 ${value ? 'text-[#0A66C2]' : 'text-gray-400'}`}/>
  }
  if(platform === 'Threads'){
    return <RiThreadsFill className={`h-5 w-5 ${value ? 'text-[#000000]' : 'text-gray-400'}`}/>
  }
  if(platform === 'Github'){
    return <RiGithubFill className={`h-5 w-5 ${value ? 'text-[#161614]' : 'text-gray-400'}`}/>
  }
  if(platform === 'Medium'){
    return <RiMediumFill className={`h-5 w-5 ${value ? 'text-blue-500' : 'text-gray-400'}`}/>
  }
  if(platform === 'YouTube'){
    return <RiYoutubeFill className={`h-5 w-5 ${value ? 'text-[#ED1D24]' : 'text-gray-400'}`}/>
  }
  if(platform === 'Pinterest'){
    return <RiPinterestFill className={`h-5 w-5 ${value ? 'text-[#CB2027]' : 'text-gray-400'}`}/>
  }
  if(platform === 'Reddit'){
    return <RiRedditFill className={`h-5 w-5 ${value ? 'text-[#FE3F19]' : 'text-gray-400'}`}/>
  }
  if(platform === 'Producthunt'){
    return <RiProductHuntFill className={`h-5 w-5 ${value ? 'text-[#DA552F]' : 'text-gray-400'}`}/>
  }
  if(platform === 'Substack'){
    return <SiSubstack className={`h-5 w-5 ${value ? 'text-[#FF6718]' : 'text-gray-400'}`}/>
  }
  if(platform === 'Discord'){
    return <RiDiscordFill className={`h-5 w-5 ${value ? 'text-[#7289DA]' : 'text-gray-400'}`}/>
  }
  if(platform === 'Whatsapp'){
    return <RiWhatsappFill className={`h-5 w-5 ${value ? 'text-[#58F775]' : 'text-gray-400'}`}/>
  }
  if(platform === 'Telegram'){
    return <RiTelegramFill className={`h-5 w-5 ${value ? 'text-[#23A0DD]' : 'text-gray-400'}`}/>
  }
  if(platform === 'Steam'){
    return <RiSteamFill className={`h-5 w-5 ${value ? 'text-[#13588A]' : 'text-gray-400'}`}/>
  }
  if(platform === 'Tumblr'){
    return <RiTumblrFill className={`h-5 w-5 ${value ? 'text-[#000000]' : 'text-gray-400'}`}/>
  }
  if(platform === 'Gitlab'){
    return <RiGitlabFill className={`h-5 w-5 ${value ? 'text-[#E14228]' : 'text-gray-400'}`}/>
  }
  if(platform === 'Goodreads'){
    return <FaGoodreads className={`h-5 w-5 ${value ? 'text-[#824707]' : 'text-gray-400'}`}/>
  }
  if(platform === 'Mastodon'){
    return <RiMastodonFill className={`h-5 w-5 ${value ? 'text-[#5A46DB]' : 'text-gray-400'}`}/>
  }
};

export function getProfileUrl(platform, username) {
  const urlFormats = {
    'Facebook': `https://www.facebook.com/${username}`,
    'Tiktok': `https://www.tiktok.com/@${username}`,
    'Twitch': `https://www.twitch.tv/${username}`,
    'Instagram': `https://www.instagram.com/${username}`,
    'Twitter': `https://twitter.com/${username}`,
    'Threads': `https://threads.net/@${username}`,
    'Github': `https://github.com/${username}`,
    'YouTube': `https://www.youtube.com/@${username}`,
    'Pinterest': `https://www.pinterest.com/${username}`,
    'Reddit': `https://www.reddit.com/user/${username}`,
    'Producthunt': `https://www.producthunt.com/@${username}`,
    'Substack': `https://www.substack.com/@${username}`,
    'Discord': `https://discord.com/invite/${username}`, 
    'Whatsapp': `https://wa.me/${username}`,
    'Tumblr': `https://${username}.tumblr.com/`,
    'Gitlab': `https://gitlab.com/${username}`,
  };

  return urlFormats[platform] || "Platform not supported";
}

export const getHandWUnitsSocialFeed = (shape) => {
    if(shape === 'square'){
      return {
        "width": 2,
        "height": 4,
    }
    }
}

export const getColorForProfilePlatform = (platform) => {
  if(platform === 'Twitter'){
    return '#000000'
  }
  if(platform === 'LinkedIn'){
    return '#0077B5'
  }
  if(platform === 'Reddit'){
    return '#FF4500'
  }
  if(platform === 'Producthunt'){
    return '#DA552F'
  }
  if(platform === 'Medium'){
    return '#3b82f6'
  }
  if(platform === 'Hacker News'){
    return '#FF6600'
  }
  if(platform === 'Github'){
    return '#181717'
  }
  if(platform === 'Tiktok'){
    return '#000000'
  }
  if(platform === 'Instagram'){
    return '#F50C96'
  }
  if(platform === 'Youtube' || platform === 'YouTube'){
    return '#FF0000'
  }
  if(platform === 'Threads'){
    return '#000000'
  }
  if(platform === 'Facebook'){
    return '#1877F2'
  }
  if(platform === 'Twitch'){
    return '#6441A4'
  }
  if(platform === 'Substack'){
    return '#FF6719'
  }
  if(platform === 'Pinterest'){
    return '#E60023'
  }
  if(platform === 'Discord'){
    return '#5865F2'
  }
  if(platform === 'Whatsapp'){
    return '#25D366'
  }
  if(platform === 'Telegram'){
    return '#26A5E4'
  }
  if(platform === 'Steam'){
    return '#000000'
  }
  if(platform === 'Tumblr'){
    return '#34526f'
  }
  if(platform === 'Gitlab'){
    return '#FC6D26'
  }
  if(platform === 'Goodreads'){
    return '#372213'
  }
  if(platform === 'Mastodon'){
    return '#3088D4'
  }
  if(platform === 'Quora'){
    return '#B92B27'
  }
  if(platform === 'PlayStore'){
    return '#414141'
  }
  if(platform === 'G2'){
    return '#00AB6C'
  }
  if(platform === 'Capterra'){
    return '#0084BF'
  }
  if(platform === 'Trustpilot'){
    return '#000'
  }
  if(platform === 'Google'){
    return '#4285F4'
  }
  if(platform === 'AppSumo'){
    return '#40A944'
  }
  if(platform === 'TripAdvisor'){
    return '#00AF87'
  }
  if(platform === 'Yelp'){
    return '#D32323'
  }
  if(platform === 'Shopify'){
    return '#96BF48'
  }
  if(platform === 'Snapchat'){
    return '#FFFC00'
  }
  if(platform === 'Amazon'){
    return '#FF9900'
  }
  if(platform === 'AppStore'){
    return '##007AFF'
  }
  return '#000'
}

export const getPO = (item) => {
  if (item === "card") {
    return defaultPropertyOrder?.card?.propertyOrder
  }
  if (item === "list") {
    return defaultPropertyOrder?.list?.propertyOrder
  }
  if (item === "table") {
    return defaultPropertyOrder?.table?.propertyOrder
  }
  if (item === "moodboard") {
    return defaultPropertyOrder?.moodboard?.propertyOrder
  }
  if (item === "stream") {
    return defaultPropertyOrder?.stream?.propertyOrder
  }
  if (layout === "inbox") {
    return defaultPropertyOrder?.inbox?.propertyOrder
  }
}

export const getTutorialVideoForMediaTypes = (mediaType) => {
  if(mediaType === "Text Expander"){
    return 'https://www.youtube.com/watch?v=ilH1-_Xg9sw'
  }
  if(mediaType === "SocialFeed"){
    return 'https://www.youtube.com/watch?v=cFW4G9bV82c'
  }
  if(mediaType === "Book"){
    return 'https://www.youtube.com/watch?v=Vbede7l1tCE'
  }
  if(mediaType === "Profile"){
    return 'https://www.youtube.com/watch?v=mWBZp2qXSSk'
  }
  if(mediaType === "Movie"){
    return 'https://www.youtube.com/watch?v=2yO0xLvFmww'
  }
  if(mediaType === "Note"){
    return 'https://www.youtube.com/watch?v=etlQ8r04ldE'
  }
  if(mediaType === "Quote"){
    return 'https://www.youtube.com/watch?v=N7_wIQGUIKs'
  }
  if(mediaType === "Ai Prompt"){
    return 'https://www.youtube.com/watch?v=OHiJPmQty6U'
  }
  if(mediaType === "Product"){
    return 'https://www.youtube.com/watch?v=JN-m200qDnw'
  }
  if(mediaType === "App"){
    return 'https://www.youtube.com/watch?v=9mXqgBVaSnk'
  }
  if(mediaType === "Screenshot"){
    return 'https://www.youtube.com/watch?v=8hKjzNTziN0'
  }
  if(mediaType === "Audio"){
    return 'https://www.youtube.com/watch?v=C94RAVGmcFg'
  }
  if(mediaType === "Image"){
    return 'https://www.youtube.com/watch?v=ZEP7IjCkP_8'
  }
  if(mediaType === "Video"){
    return 'https://www.youtube.com/watch?v=kUFmHL583S4'
  }
  if(mediaType === "PDF"){
    return 'https://www.youtube.com/watch?v=tALdOq2o5hA'
  }
  if(mediaType === "Article"){
    return 'https://www.youtube.com/watch?v=NnmIfNA7qNY'
  }
  if(mediaType === "Highlight"){
    return 'https://www.youtube.com/watch?v=N6l58HK3ic4'
  }
  if(mediaType === "Code"){
    return 'https://www.youtube.com/watch?v=o6S7HxsZiyc'
  }
  if(mediaType === "Link"){
    return 'https://www.youtube.com/watch?v=Y5uBhec8IbU'
  }
  if(mediaType === "Citation"){
    return ''
  }
  if(mediaType === "Testimonial"){
    return 'https://www.youtube.com/watch?v=fwH4D44dav4'
  }
}

export function extractText(node) {
    let textContent = '';
    if (node.text) {
        textContent += node.text;
    }
    if (node.children && node.children.length > 0) {
        for (const child of node.children) {
            textContent += ' ' + extractText(child);
        }
    }
    return textContent.trim();
}

export function groupByParentAndCollection(arr) {
  const groupedByParent = {};

  arr.forEach((item) => {
    const parent = item["Parent Collection"] || "";
    const collection =
      item.Collection || `Import - ${moment().format("MM-DD-YYYY")}`;

    if (parent) {
      if (!groupedByParent[parent]) {
        groupedByParent[parent] = {
          title: parent,
          folders: {},
          bookmarks: [],
        };
      }

      if (!groupedByParent[parent].folders[collection]) {
        groupedByParent[parent].folders[collection] = {
          title: collection,
          folders: [],
          bookmarks: [],
        };
      }

      groupedByParent[parent].folders[collection].bookmarks.push({ ...item });
    } else {
      if (!groupedByParent[collection]) {
        groupedByParent[collection] = {
          title: collection,
          folders: [],
          bookmarks: [],
        };
      }

      groupedByParent[collection].bookmarks.push({ ...item });
    }
  });

  const result = Object.values(groupedByParent).map((parentGroup) => {
    if (parentGroup.folders) {
      parentGroup.folders = Object.values(parentGroup.folders);
      parentGroup.folders.forEach((folder) => {
        folder.folders = folder.folders.map((subfolder) => subfolder);
      });
    }
    return parentGroup;
  });

  return result;
}

function classifyIMDbURL(url) {
  const parsedUrl = new URL(url);
  if (parsedUrl.hostname === "www.imdb.com") {
    if (parsedUrl.pathname.startsWith("/title")) {
      return "Movie";
    } else if (parsedUrl.pathname.startsWith("/name")) {
      return "Profile";
    }
  }
  return null;
}

export const setMediaTypeBasedOnUrl = (url) => {
  if (!url) {
    return "Link";
  }
  url = url.trim();

  if (
    url.startsWith("https://www.youtube.com/watch") ||
    url.startsWith("https://vimeo.com/")
  ) {
    return "Video";
  } else if (
    url.startsWith("https://www.amazon.in/") ||
    url.startsWith("https://www.amazon.com/") ||
    url.startsWith("https://www.amazon.co.uk/") ||
    url.startsWith("https://www.amazon.co.in/")
  ) {
    return "Product";
  } else if (url.startsWith("https://www.imdb.com/")) {
    const type = classifyIMDbURL(url);
    if (type === "Profile") {
      return "Profile";
    } else if (type === "Movie") {
      return "Movie";
    } else {
      return "Link";
    }
  } else {
    return 'Link';
  }
};