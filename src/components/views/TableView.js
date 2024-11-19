import { ArrowTopRightOnSquareIcon, EyeIcon, GlobeAltIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Avatar, Checkbox, Table, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import CheckBox from "@components/common/Checkbox";
// import { sidebarMenuClicked } from "../../../actions/app";
import slugify from "slugify";
import GemEngagement from "@components/gemEngagement/GemEngagement";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import session from "@utils/session";
import { renderMediaTypeUI } from "@utils/commonFunctions";
import { updateGem } from "@actions/collection";
import { updateUsageCount } from "@actions/gems";
import { setPreviousPathName } from "@actions/app";
import FavIconComponent from "@components/common/FavIconComponent";
import ReactPlayer from "react-player";
import { copyText, MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR } from "@utils/constants";
import TagBlock from "@components/common/TagBlock";
import Image from "next/image";
import { PiCopy } from "react-icons/pi";

const TableView = ({ items, propertyOrder = [], setOpenDrawer, setGemSingleIdSingleId, page = '', checkedBookmark, setCheckedBookmark, collectionName, showComment, showTableVerticalLine, tableWrapColumns, showEdit = true, user,isSharedAndAllowEdit=true,authorName='',permissions='',showSocialIcons='',gemOnClickEvent='' }) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const navigate = useRouter()
    const dispatch = useDispatch()
    const [columns,setColumns] = useState([])
    const [dataSource,setDataSource] = useState([])
    const [fallbackURL, setFallbackURL] = useState(null);
    const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env

    const openGemInWindow = (item) => {
        if(item?.media_type === 'Article' && !item?.isRead){
            const payload = {
                ...item,
                isRead: true
            }
           
            delete payload.id
            dispatch(updateGem(item.id, { data: payload }))
        }
        dispatch(updateUsageCount(item.id))
        window.open(item?.url || '', "_blank");
    }

    const handleNavigate = (item) => {
        navigate.push(`/u/${session.username}/c/${item?.collection_gems?.id}/${item?.collection_gems?.slug || slugify(item?.collection_gems?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}`)
        // dispatch(sidebarMenuClicked('collection'))
    }

    const handleNavigateMediaType = (item) => {
        navigate.push(`/u/${session.username}/filters/${slugify(item.media_type || "", { lower: true, remove: /[0-9&,+()$~%.'":*?<>{}/\/]/g })}?type=${item.media_type}`)
        // dispatch(sidebarMenuClicked('filter'))
    }

    const handleCopyUrl = (item) => {
      if (item?.url) {
        copyText(item?.url, "Link copied to clipboard");
      }
    };

    const handleCheck = (e,item,) => {
        if(e.target.checked === true){
            setCheckedBookmark((prev) => [...prev,item])
            return;
        }

        if(e.target.checked === false){
            const filtered = checkedBookmark?.filter(data => data.id !== item.id)
            setCheckedBookmark(filtered)
            return
        }
    }

    // const handlePreview = (e,item) => {
    //     e.stopPropagation();
    //     setIsPreviewVisible(true)
    //     setPreviewBookmark(item)
    // }
    const handleOpenGem = (e,item) => {
        const queryString = new URLSearchParams(searchParams).toString();
        const url = `${pathname}${queryString ? `?${queryString}` : ''}`;
        dispatch(setPreviousPathName(url))
        if (page === 'collection-public-shared') {
            navigate.push(`/u/${item?.author?.username || 'default'}/g/${item.id}/${item?.slug || (item.title ? slugify(item.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g }) : "default")}?public=true`)
            return;
        }
        e.stopPropagation();
        navigate.push(`/u/${item?.author?.username || 'default'}/g/${item.id}/${item?.slug || (item.title ? slugify(item.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g }) : "default")}`)
    }

    useEffect(() => {
        setDataSource(items)
    },[items,])

    useEffect(() => {
        const staticData = propertyOrder?.filter(item => item.name === 'Title' || item.name === 'Tags' || item.name === 'Description' || item.name === 'Thumbnail'  || item.name === 'Url' || item.name === 'Collection' || item.name === 'Media Type' || item?.name === 'Author').map(item => { 
            const obj = {
            title: item.name.toLowerCase() === 'url' ? 'URL' : item.name,
            dataIndex: item.name.toLowerCase() === 'url' ? 'url' : item.name,
            key: item.name.toLowerCase() === 'url' ? 'url' : item.name,
            width: tableWrapColumns ? 'fit-content' : 250,
            ellipsis: tableWrapColumns ? false : true,
            render: (text, record, index) => {
                if(item.name.toLowerCase() === 'thumbnail'){
                 const imgSrc = (record?.metaData && record?.metaData?.covers?.length !== 0) ? (record?.metaData?.covers?.[0] || record?.metaData?.app_screenshot) : ''
                 const favSrc = (record?.metaData && record?.metaData.length !== 0) ?
                                typeof record?.metaData?.icon === 'string' ?
                                record?.metaData?.icon
                                : (typeof record?.metaData?.icon === 'object' &&  record?.metaData?.icon?.type === 'image') ? record?.metaData?.icon?.icon : 
                                record?.metaData?.defaultIcon ? record?.metaData?.defaultIcon : '' : ''
                 const mediaImgsrc = (record?.media && record?.media?.covers && record?.media?.covers?.length !== 0) ? record?.media?.covers[0] : ''
                 if (record?.socialfeed_obj?.postType === "video") {
                    return (
                        <ReactPlayer url={record?.socialfeed_obj?.image_url} controls={true} width="100%" height="100px" />
                    )
                 }
                 else if(imgSrc || mediaImgsrc){
                    return record?.media_type === "Screenshot" ||
                      record?.media_type === "Image" ? (
                      <Image
                        alt={
                          record?.altInfo ||
                          record?.title ||
                          record?.description ||
                          "Curateit"
                        }
                        className={`object-scale-down h-[100px] w-full`}
                        onError={(e) => {
                          setFallbackURL(
                            record?.metaData?.fallbackURL
                              ? record?.metaData?.fallbackURL
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
                            : record?.S3_link?.length !== 0
                            ? record?.S3_link?.[0]?.replace(
                                NEXT_PUBLIC_STATIC_S3_BASE_URL,
                                `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/200x200_min`
                              )
                            : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                        }
                      />
                    ) : (
                      <Image
                        alt={
                          record?.altInfo ||
                          record?.title ||
                          record?.description ||
                          "Curateit"
                        }
                        className={`object-scale-down h-[100px] w-full`}
                        onError={(e) => {
                          setFallbackURL(
                            record?.metaData?.fallbackURL
                              ? record?.metaData?.fallbackURL
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
                                ?.replace(
                                  "resize:fill:112:112",
                                  "resize:fit:2400"
                                )
                                ?.replace(
                                  "resize:fill:40:40",
                                  "resize:fit:2400"
                                )
                                ?.replace("_SY160", "_SY800")
                                ?.replace(MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR)
                                ?.replace(
                                  NEXT_PUBLIC_STATIC_S3_BASE_URL,
                                  `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/200x200_min`
                                )
                            : mediaImgsrc
                            ? mediaImgsrc
                                ?.replace(
                                  "resize:fill:112:112",
                                  "resize:fit:2400"
                                )
                                ?.replace(
                                  "resize:fill:40:40",
                                  "resize:fit:2400"
                                )
                                ?.replace("_SY160", "_SY800")
                                ?.replace(
                                  NEXT_PUBLIC_STATIC_S3_BASE_URL,
                                  `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/200x200_min`
                                )
                            : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                        }
                      />
                    );
                 }else if(favSrc){
                    const s = record?.media_type === "Screenshot" && record?.S3_link?.length !== 0 ? record?.S3_link[0] : favSrc ? favSrc : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    return (
                      <Image
                        alt={
                          record?.altInfo ||
                          record?.title ||
                          record?.description ||
                          "Curateit"
                        }
                        className={` object-scale-down object-center h-[100px] w-full`}
                        onError={(e) => {
                          setFallbackURL(
                            record?.metaData?.fallbackURL
                              ? record?.metaData?.fallbackURL
                              : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                          );
                        }}
                        priority={true}
                        src={
                          fallbackURL
                            ? fallbackURL
                            : s
                                ?.replace(
                                  NEXT_PUBLIC_STATIC_S3_BASE_URL,
                                  `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/150x150_min`
                                )
                        }
                        style={{ maxWidth: "100%" }}
                      />
                    );
                 }else{
                    const c = record?.media_type === "Screenshot" && record?.S3_link?.length !== 0 ? record?.S3_link[0] : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                   return (
                     <Image
                       alt={
                         record?.altInfo ||
                         record?.title ||
                         record?.description ||
                         "Curateit"
                       }
                       className={` object-scale-down object-center h-[100px] w-full`}
                       onError={(e) => {
                         setFallbackURL(
                           record?.metaData?.fallbackURL
                             ? record?.metaData?.fallbackURL
                             : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                         );
                       }}
                       priority={true}
                       style={{ maxWidth: "100%" }}
                       src={c?.replace(
                         NEXT_PUBLIC_STATIC_S3_BASE_URL,
                         `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/150x150_min`
                       )}
                     />
                   ); 
                 }
                }
                else if(item.name.toLowerCase() === 'tags'){
                    return(
                        <div className=''>
                            <TagBlock tags={record?.tags || []}/>
                        </div>
                    )
                }
                else if(item.name.toLowerCase() === 'url'){
                    const imgSrc = (record?.metaData && record?.metaData.length !== 0) ? record?.metaData?.icon : ''
                        return(
                        <>
                            <div className='mr-[10px] flex items-center'>
                                {record?.metaData?.icon ? <FavIconComponent data={record?.metaData?.icon || null} renderingPlace="listing"/> : <GlobeAltIcon className='h-5 w-5 mr-[5px] text-[#97A0B5]'/>}
                                {
                                tableWrapColumns ? <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{record?.url || ''}</div> 
                                :
                                <Tooltip title={record?.url || ''}><div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{record?.url || ''}</div></Tooltip>
                                }
                                
                            </div>
                        </>
                    )
                }
                else if(item.name.toLowerCase() === 'title'){
                return(
                <>
                {
                tableWrapColumns ? <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{record?.title || ''}</div> 
                    :
                <Tooltip title={record?.title || ''}><div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{record?.title || ''}</div></Tooltip>
                }
                </>
                )
                }
                else if(item.name.toLowerCase() === 'description'){
                return(
                <>
                {
                tableWrapColumns ? <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{record?.description || ''}</div> 
                    :
                <Tooltip title={record?.description || ''}><div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{record?.description || ''}</div></Tooltip>
                }
                </>
                )  
                }
                else if(item.name.toLowerCase() === 'collection'){
                return(
                (page !== 'collection' && (record?.collection_gems?.name || collectionName)) ? <div onClick={(e) => {
                    e.stopPropagation();
                    // handleNavigate(record)
                }}>
                 <Tooltip placement="topLeft" title={record?.collection_gems?.name || collectionName || ''}>
                 <span className='cursor-pointer text-[#1890ff] hover:text-[#40a9ff]'>
                     {record?.collection_gems?.name || collectionName || 'No Collection'}
                 </span>
                </Tooltip>
                </div> : 
                <Tooltip placement="topLeft" title={record?.collection_gems?.name || collectionName || ''}>
                <span>
                    {record?.collection_gems?.name || collectionName || 'No Collection'}
                </span>
                </Tooltip>
                )  
                }
                else if(item.name.toLowerCase() === 'media type'){
                return(
                page !== 'filter' ? 
                <div onClick={(e) => {
                    e.stopPropagation();
                    handleNavigateMediaType(record)
                }}>
                 <Tooltip placement="topLeft" title={record?.media_type || ''}>
                 <div className='cursor-pointer text-[#1890ff] hover:text-[#40a9ff]'>
                    <div>{renderMediaTypeUI(record?.media_type)}</div>
                 </div>
                </Tooltip>
                </div> : 
                <Tooltip placement="topLeft" title={record?.media_type || ''}>
                <div>
                    <div>{renderMediaTypeUI(record?.media_type)}</div>
                 </div>
                </Tooltip>
                )  
                } else if(item?.name?.toLowerCase() === 'author'){
                  if (record?.author?.username) {
                    return (
                      <div className="flex items-center my-1">
                        <Avatar
                          size={"small"}
                          style={{ background: "#347ae2", color: "white" }}
                        >
                          {record?.author?.username?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        <div className="ml-1 font-medium text-sm">
                          {record?.author?.username}
                        </div>
                      </div>
                    );
                  }else{
                    return ''
                  }
                }
                return ''
            } 
            }

            return obj;
        });

        const customData = propertyOrder?.filter(item => item.name !== 'Title' && item.name !== 'Tags' && item.name !== 'Description' && item.name !== 'Thumbnail' && item.name !== 'Url' && item.name !== 'Collection' && item.name !== 'Media Type').map(item => {
            const obj = {
            title: item.name,
            dataIndex: item.name,
            key: item.name,
            width:100,
            render: (text, record, index) => {
                if(record?.custom_fields_obj && record?.custom_fields_obj.length>0){
                    const filtered = record?.custom_fields_obj?.filter(custom => custom.name === item.name)

                    if(filtered?.length>0 && (filtered[0]?.type?.toLowerCase() === 'select' || filtered[0]?.type?.toLowerCase() === 'status')){
                        const color = filtered[0]?.options?.filter(op => op.value === filtered[0]?.answer)
                        return(
                        <div>
                            <Tag color={color[0]?.color} style={{color:'black',width:'fit-content'}}>{filtered[0]?.answer || ''}</Tag>
                        </div>
                        )
                    }

                    else if(filtered?.length>0 && filtered[0]?.type?.toLowerCase() === 'multi-select'){
                    return(
                        <div>
                            {
                            filtered[0]?.answer?.map((d,k) => {
                                const color = filtered[0].options.filter(op => op.value === d)
                                return(<Tag key={k} color={color[0].color} style={{color:'black'}}>{d}</Tag>)
                            })
                            }
                        </div>
                    )
                    }

                    else if(filtered?.length>0 && filtered[0]?.type?.toLowerCase() === 'checkbox'){
                    return(<CheckBox label={filtered[0]?.name} name={filtered[0]?.name}
                        darkColor={true} value={filtered[0]?.answer}  
                        disabled
                        />)
                    }

                    return(
                        <div>
                            {filtered[0]?.answer || '-'}
                        </div>
                    )
                }
            } 
            }

            return obj;
        });

        const brokenDuplicatePageData = ['Title','Tags','Description','Folder'].map(item => {
            const obj = {
            title: item.toLowerCase() === 'folder' ? 'URL' : item,
            dataIndex: item.toLowerCase() === 'folder' ? 'url' : item,
            key: item.toLowerCase() === 'folder' ? 'url' : item,
            width: (item.toLowerCase() === 'description' || item.toLowerCase() === 'title') ? 250 : 200,
            ellipsis: {
                showTitle: false,
            },
            render: (text, record, index) => {
                if(item.toLowerCase() === 'tags'){
                    return(
                        <div className='flex items-center flex-wrap'>
                        {
                            record?.tags?.map((data,i) => (
                                <Tag key={i} style={{display:'block',margin:'3px'}}>{data.tag}</Tag>
                            ))
                        }
                        </div>
                    )
                }
                else if(item.toLowerCase() === 'folder'){
                    return(
                        <div className='flex items-center flex-wrap'>
                        <Tooltip placement="topLeft" title={record?.url}>
                        <span className='text-[#505050] text-[14px]'>
                            {record?.url || ''}
                        </span>
                        </Tooltip>
                        </div>
                    )
                }
                else if(item.toLowerCase() === 'title'){
                return(
                    <Tooltip placement="topLeft" title={record?.title}>
                    <span className={`font-medium ${record?.broken_link ? 'line-through' :''}`}>
                    {record.title || ''}
                    </span>
                    </Tooltip>
                )
                }
                else if(item.toLowerCase() === 'description'){
                return(
                <Tooltip placement="topLeft" title={record?.description}>
                <span>
                    {record.description || ''}
                </span>
                </Tooltip>
                )  
                }
                return ''
            } 
            }

            return obj;
        });

        if(page === 'collection'){

        setColumns([
          {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            width: 120,
            className: "actionColumnBg",
            render: (text, record, index) => (
              <div className="flex items-center pointer-events-auto">
                {isSharedAndAllowEdit && (
                  <Checkbox
                    className="cursor-pointer mr-1 pointer-events-auto"
                    onChange={(e) => handleCheck(e, record)}
                    onClick={(e) => e.stopPropagation()}
                    checked={checkedBookmark?.some(
                      (data) => data.id === record.id
                    )}
                  />
                )}
                {record?.url && (
                    <PiCopy
                      className="h-5 w-5 pointer-events-auto"
                      title="Copy"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyUrl(record);
                      }}
                    />
                )}

                {gemOnClickEvent === "gem view" ? (
                  <ArrowTopRightOnSquareIcon
                    className="h-5 w-5 mr-1 pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      openGemInWindow(record);
                    }}
                  />
                ) : (
                  <EyeIcon
                    className="h-5 w-5 mr-1"
                    onClick={(e) => handleOpenGem(e, record)}
                  />
                )}
                {isSharedAndAllowEdit && (
                  <PencilSquareIcon
                    className="h-5 w-5 pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDrawer(true);
                      setGemSingleIdSingleId(record.id);
                    }}
                  />
                )}
              </div>
            ),
          },
          {
            title: "Social",
            dataIndex: "social",
            key: "social",
            width: 180,
            render: (text, record, index) => (
              <div className="flex items-center justify-between">
                <GemEngagement
                  gem={record}
                  // showBookmark={!showEdit}
                  showComment={showComment}
                  user={user}
                />
              </div>
            ),
          },
          ...staticData,
          ...customData,
        ]);

        }
        else if(page === 'broken-duplicate' || page === 'filter' || page === 'tags'){
            setColumns([
              {
                title: "Actions",
                dataIndex: "actions",
                key: "actions",
                width: 120,
                className: "actionColumnBg",
                render: (text, record, index) => (
                  <div className="flex items-center pointer-events-auto">
                    {page === "tags" && permissions ? (
                      <></>
                    ) : (
                      <Checkbox
                        className="cursor-pointer mr-1 pointer-events-auto"
                        onChange={(e) => handleCheck(e, record)}
                        onClick={(e) => e.stopPropagation()}
                        checked={checkedBookmark?.some(
                          (data) => data.id === record.id
                        )}
                      />
                    )}
                    {record?.url && (
                      <PiCopy
                        className="h-5 w-5 pointer-events-auto"
                        title="Copy"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyUrl(record);
                        }}
                      />
                    )}
                    {gemOnClickEvent === "gem view" ? (
                      <ArrowTopRightOnSquareIcon
                        className="h-5 w-5 mr-1 pointer-events-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          openGemInWindow(record);
                        }}
                      />
                    ) : (
                      <EyeIcon
                        className="h-5 w-5 mr-1"
                        onClick={(e) => handleOpenGem(e, record)}
                      />
                    )}
                    <PencilSquareIcon
                      className="h-5 w-5 pointer-events-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDrawer(true);
                        setGemSingleIdSingleId(record.id);
                      }}
                    />
                  </div>
                ),
              },
              {
                title: "Social",
                dataIndex: "social",
                key: "social",
                width: 180,
                render: (text, record, index) => (
                  <div className="flex items-center justify-between">
                    <GemEngagement
                      gem={record}
                      // showBookmark={!showEdit}
                      showComment={showComment}
                      user={user}
                    />
                  </div>
                ),
              },
              ...staticData,
            ]);
        }
        else if(page === 'embed'){
          setColumns([
            {
              title: "Actions",
              dataIndex: "actions",
              key: "actions",
              width: 120,
              className: "actionColumnBg",
              render: (text, record, index) => (
                <div className="flex items-center pointer-events-auto">
                  {record?.url && (
                    <PiCopy
                      className="h-5 w-5 pointer-events-auto"
                      title="Copy"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyUrl(record);
                      }}
                    />
                  )}
                  <ArrowTopRightOnSquareIcon
                    className="h-5 w-5 mr-1 pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      openGemInWindow(record);
                    }}
                  />
                </div>
              ),
            },
            {
              title: "Cover",
              dataIndex: "media",
              key: "media",
              width: 100,
              render: (text, record, index) => {
                const imgSrc =
                  record?.metaData && record?.metaData?.covers?.length !== 0
                    ? record?.metaData?.covers?.[0] ||
                      record?.metaData?.app_screenshot
                    : "";
                const favSrc =
                  record?.metaData && record?.metaData.length !== 0
                    ? typeof record?.metaData?.icon === "string"
                      ? record?.metaData?.icon
                      : typeof record?.metaData?.icon === "object" &&
                        record?.metaData?.icon?.type === "image"
                      ? record?.metaData?.icon?.icon
                      : record?.metaData?.defaultIcon
                      ? record?.metaData?.defaultIcon
                      : ""
                    : "";
                if (imgSrc) {
                  return (
                    <Image
                      alt={
                        record?.altInfo ||
                        record?.title ||
                        record?.description ||
                        "Curateit"
                      }
                      className={`object-cover object-center h-[100px] w-full`}
                      style={{ maxWidth: "100%" }}
                      onError={(e) => {
                        setFallbackURL(
                          record?.metaData?.fallbackURL
                            ? record?.metaData?.fallbackURL
                            : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                        );
                      }}
                      priority={true}
                      src={
                        fallbackURL
                          ? fallbackURL
                          : imgSrc
                          ? imgSrc
                              ?.replace(MEDIUM_REGEX, MEDIUM_REPLACEMENT_STR)
                              ?.replace(
                                NEXT_PUBLIC_STATIC_S3_BASE_URL,
                                `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/150x150_min`
                              )
                          : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                      }
                    />
                  );
                } else {
                  <Image
                    alt={
                      record?.altInfo ||
                      record?.title ||
                      record?.description ||
                      "Curateit"
                    }
                    className={`object-scale-down h-[100px] w-full`}
                    style={{ maxWidth: "100%" }}
                    onError={(e) => {
                      setFallbackURL(
                        record?.metaData?.fallbackURL
                          ? record?.metaData?.fallbackURL
                          : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                      );
                    }}
                    priority={true}
                    src={
                      fallbackURL
                        ? fallbackURL
                        : favSrc
                        ? favSrc?.replace(
                            NEXT_PUBLIC_STATIC_S3_BASE_URL,
                            `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/150x150_min`
                          )
                        : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    }
                  />;
                }
              },
            },
            ...brokenDuplicatePageData,
          ]);  
        }
        else if(page === 'collection-public-shared' && !showSocialIcons){
          setColumns([
            {
              title: "Actions",
              dataIndex: "actions",
              key: "actions",
              width: 120,
              render: (text, record, index) => (
                <div className="flex items-center">
                  {record?.url && (
                    <PiCopy
                      className="h-5 w-5 pointer-events-auto"
                      title="Copy"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyUrl(record);
                      }}
                    />
                  )}
                  <ArrowTopRightOnSquareIcon
                    className="h-5 w-5 mr-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      openGemInWindow(record);
                    }}
                  />
                  {/* <EyeIcon className="h-5 w-5 mr-1" onClick={(e) => handleOpenGem(e,record)}/> */}
                </div>
              ),
            },
            {
              title: "Social",
              dataIndex: "social",
              key: "social",
              width: 180,
              render: (text, record, index) => (
                <div className="flex items-center justify-between">
                  <GemEngagement
                    gem={record}
                    // showBookmark={!showEdit}
                    showComment={showComment}
                    user={user}
                  />
                </div>
              ),
            },
            ...staticData,
            ...customData,
          ]); 
        }
        else if(page === 'profile-bookmark'){
        setColumns([
          {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            width: 120,
            className: "actionColumnBg",
            render: (text, record, index) => (
              <div className="flex items-center pointer-events-auto">
                {record?.author?.id === Number(session?.userId) && (
                  <Checkbox
                    className="cursor-pointer mr-1 pointer-events-auto"
                    onChange={(e) => handleCheck(e, record)}
                    onClick={(e) => e.stopPropagation()}
                    checked={checkedBookmark?.some(
                      (data) => data.id === record.id
                    )}
                  />
                )}
                {record?.url && (
                  <PiCopy
                    className="h-5 w-5 pointer-events-auto"
                    title="Copy"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyUrl(record);
                    }}
                  />
                )}
                {gemOnClickEvent === "gem view" ? (
                  <ArrowTopRightOnSquareIcon
                    className="h-5 w-5 mr-1 pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      openGemInWindow(record);
                    }}
                  />
                ) : (
                  <EyeIcon
                    className="h-5 w-5 mr-1"
                    onClick={(e) => handleOpenGem(e, record)}
                  />
                )}
                {record?.author?.id === Number(session?.userId) && (
                  <PencilSquareIcon
                    className="h-5 w-5 pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDrawer(true);
                      setGemSingleIdSingleId(record.id);
                    }}
                  />
                )}
              </div>
            ),
          },
          {
            title: "Social",
            dataIndex: "social",
            key: "social",
            width: 180,
            render: (text, record, index) => (
              <div className="flex items-center justify-between">
                <GemEngagement
                  gem={record}
                  // showBookmark={!showEdit}
                  showComment={showComment}
                  user={user}
                />
              </div>
            ),
          },
          ...staticData,
        ]);
        }
        else{

        setColumns([
          {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            width: 120,
            className: "actionColumnBg",
            render: (text, record, index) => (
              <div className="flex items-center pointer-events-auto">
                {showEdit && (
                  <Checkbox
                    className="cursor-pointer mr-1 pointer-events-auto"
                    onChange={(e) => handleCheck(e, record)}
                    onClick={(e) => e.stopPropagation()}
                    checked={checkedBookmark?.some(
                      (data) => data.id === record.id
                    )}
                  />
                )}
                {record?.url && (
                  <PiCopy
                    className="h-5 w-5 pointer-events-auto"
                    title="Copy"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyUrl(record);
                    }}
                  />
                )}
                {gemOnClickEvent === "gem view" ? (
                  <ArrowTopRightOnSquareIcon
                    className="h-5 w-5 mr-1 pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      openGemInWindow(record);
                    }}
                  />
                ) : (
                  <EyeIcon
                    className="h-5 w-5 mr-1"
                    onClick={(e) => handleOpenGem(e, record)}
                  />
                )}
                {showEdit && (
                  <PencilSquareIcon
                    className="h-5 w-5 pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDrawer(true);
                      setGemSingleIdSingleId(record.id);
                    }}
                  />
                )}
              </div>
            ),
          },
          {
            title: "Social",
            dataIndex: "social",
            key: "social",
            width: 180,
            render: (text, record, index) => (
              <div className="flex items-center justify-between">
                <GemEngagement
                  gem={record}
                  // showBookmark={!showEdit}
                  showComment={showComment}
                  user={user}
                />
              </div>
            ),
          },
          ...staticData,
        ]);

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[propertyOrder,checkedBookmark,tableWrapColumns,showTableVerticalLine])

    const getRowClassName = (record, index) => {
    for (let i = 0; i < checkedBookmark.length; i++) {
        if(checkedBookmark[i].id === record.id) {
            return'table-view-selected-row'
        } 
    }
    };

    return(
        <>
        {
        page === 'bookmark'  && <>
        <div className="w-full" >
        <div className="overflow-x-auto"> 
        <Table 
        columns={columns} 
        dataSource={dataSource} 
        pagination={false}
        rowClassName={(record, index) => getRowClassName(record, index)}
        onRow={(record, rowIndex) => {
          return {
            onClick: (e) => {
              if (gemOnClickEvent === "gem view") {
                handleOpenGem(e, record);
              } else {
                e.stopPropagation();
                openGemInWindow(record);
              }
            },
          };
        }}
        className={`${showTableVerticalLine ? 'view-table-border-show' : 'view-table-border-hide'} cursor-pointer`}
        />
        </div>
        </div>
        </>
        }

        {
        page === 'collection' && <>
        <div className="w-full" >
        <div className="overflow-x-auto"> 
        <Table 
        columns={columns} 
        dataSource={dataSource} 
        pagination={false}
        rowClassName={(record, index) => getRowClassName(record, index)}
        onRow={(record, rowIndex) => {
          return {
            onClick: (e) => {
              if (gemOnClickEvent === "gem view") {
                handleOpenGem(e, record);
              } else {
                e.stopPropagation();
                openGemInWindow(record);
              }
            },
          };
        }}
        className={`${showTableVerticalLine ? 'view-table-border-show' : 'view-table-border-hide'} cursor-pointer`}
        />
        </div>
        </div>
        </>
        }

        {
        (page === 'broken-duplicate' || page === 'filter' || page === 'tags') && <>
        <div className="w-full" >
        <div className="overflow-x-auto"> 
        <Table 
        columns={columns} 
        dataSource={dataSource} 
        pagination={false}
        rowClassName={(record, index) => getRowClassName(record, index)}
        onRow={(record, rowIndex) => {
          return {
            onClick: (e) => {
              if (gemOnClickEvent === "gem view") {
                handleOpenGem(e, record);
              } else {
                e.stopPropagation();
                openGemInWindow(record);
              }
            },
          };
        }}
        className={`${showTableVerticalLine ? 'view-table-border-show' : 'view-table-border-hide'} cursor-pointer`}
        />
        </div>
        </div>
        </>
        }

        {
        page === 'embed' && <>
        <div className="w-full" >
        <div className="overflow-x-auto"> 
        <Table 
        columns={columns} 
        dataSource={dataSource} 
        pagination={false}
        rowClassName={(record, index) => getRowClassName(record, index)}
        />
        </div>
        </div>
        </>
        }

            {
                page === 'profile-bookmark' && <>
                    <div className="w-full" >
                        <div className="overflow-x-auto">
                            <Table
                                columns={columns}
                                dataSource={dataSource}
                                pagination={false}
                                rowClassName={(record, index) => getRowClassName(record, index)}
                                onRow={(record, rowIndex) => {
                                    return {
                                        onClick: (e) => {
                                          if(gemOnClickEvent === 'gem view'){
                                            if (
                                              record?.author?.id ===
                                              Number(session?.userId)
                                            ) {
                                              navigate.push(
                                                `/u/${
                                                  record?.author?.username ||
                                                  "default"
                                                }/g/${record.id}/${
                                                  record?.slug ||
                                                  (record.title
                                                    ? slugify(
                                                        record.title || "",
                                                        {
                                                          lower: true,
                                                          remove:
                                                            /[&,+()$~%.'":*?<>{}/\/]/g,
                                                        }
                                                      )
                                                    : "default")
                                                }`
                                              );
                                              return;
                                            } else {
                                              navigate.push(
                                                `/u/${
                                                  record?.author?.username ||
                                                  "default"
                                                }/g/${record.id}/${
                                                  record?.slug ||
                                                  (record.title
                                                    ? slugify(
                                                        record.title || "",
                                                        {
                                                          lower: true,
                                                          remove:
                                                            /[&,+()$~%.'":*?<>{}/\/]/g,
                                                        }
                                                      )
                                                    : "default")
                                                }?public=true`
                                              );
                                            }
                                          }else{
                                            e.stopPropagation();
                                            openGemInWindow(record);
                                          }
                                        }
                                    };
                                }}
                                className={`${showTableVerticalLine ? 'view-table-border-show' : 'view-table-border-hide'} cursor-pointer`}
                            />
                        </div>
                    </div>
                </>
            }

        {
        page === 'collection-public-shared' && <>
        <div className="w-full" >
        <div className="overflow-x-auto"> 
        <Table 
        columns={columns} 
        dataSource={dataSource} 
        pagination={false}
        rowClassName={(record, index) => getRowClassName(record, index)}
        onRow={(record, rowIndex) => {
          return {
            onClick: (e) => {
              handleOpenGem(e,record)
            },
          };
        }}
        className={`view-table-border-hide cursor-pointer`}
        />
        </div>
        </div>
        </>
        }
        </>
    )
}

export default TableView
