'use client'

// import * as ReactIcons                    from "react-icons/ri";
import React, { useState, useEffect }     from "react";
import { 
  Button, 
  Checkbox, 
  Drawer, 
  Input, 
  Space, 
  message 
}                                         from "antd";
import { useDispatch, useSelector }       from "react-redux";
import { usePathname, useRouter }         from "next/navigation";
import { SketchPicker }                   from 'react-color'
import { Emoji, EmojiStyle }              from "emoji-picker-react";
import { 
  PhotoIcon, 
  ShareIcon, 
  TrashIcon 
}                                         from "@heroicons/react/24/outline";
import { IoColorPaletteOutline }          from "react-icons/io5";

import ParentTagComboBox                  from "@components/collectionCombobox/ParentTagComboBox";
import TypeComboBox                       from "@components/collectionCombobox/TypeComboBox";
import ShareTagDrawer                     from "./ShareTagDrawer";
import ImageModal                         from "@components/modal/ImageModal";

import { 
  getAllLevelCollectionPermissions, 
  getTagByTagId 
}                                         from "@utils/find-collection-id";
import { TextMessage }                    from "@utils/constants";
// import slugify from "slugify";
import session                            from "@utils/session";

import { 
  addSubTagData, 
  addTag, 
  deleteTag, 
  fetchTagsWithGemsCount, 
  getSuggestedTagColors, 
  moveTag, 
  moveToRootTag, 
  updateTag, 
  uploadIconsTag 
}                                         from "@actions/tags";
import { openDrawer, setParentTagData }   from "@actions/app";
import { getUserDetails }                 from "@actions/user";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const { TextArea } = Input;

const TagDrawer = ({ open,title,setOpenDrawer,action,id,singleTagData,pageNumber,setTitle=() => {},setOpenShareTagWithDrawer=()=>{},openShareTagWithDrawer,singleTagDetails='',handleCoverModal=()=>{},setIcon=()=>{},handleTextEditor=()=>{},showTextEditor='',setCoverImage=()=>{},setCoverSize=()=>{},coverSize='default' }) => {
  const dispatch   = useDispatch()
  const pathname = usePathname()
  const navigate = useRouter()
  const {userTags} = useSelector(state => state.users)
  const {tagsWithGemsCount,suggestedTagColors,sharedTags} = useSelector((state) => state.tags)
  const {isMobileView,parentTagValue} = useSelector(state => state.app)

  const [showCollectionInput, 
           setShowCollectionInput]          = useState(false);
    const [tagName,setTagName] = useState('')
    const [selectedTag, 
           setSelectedTag]           = useState((action === 'create' && !parentTagValue?.tagId) ? 'Parent folder' : 
           (action === 'create' && parentTagValue?.tagId) ? {id: parentTagValue?.tagId ||'', tag: parentTagValue?.tagName ||''} : (action === 'edit' && singleTagData?.is_sub_tag) ? 
                {id: singleTagData?.parent_tag?.id || singleTagData?.collection?.id || '', tag: singleTagData?.parent_tag?.tag || singleTagData?.collection?.tag || ''} : 'Parent folder');
    const [isSubTag,setIsSubTag]= useState(false)

    const [tagColor,setTagColor] = useState('')
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [buttonLoading,setButtonLoading] = useState(false)
    const [showTypeInput, setShowTypeInput] = useState(false);
    const [selectedType, setSelectedType]   = useState(action === 'create' ? 'Link' : '');
    const [isCurrentTagShared, setIsCurrentTagShared] = useState(false)

    const [openModal, setOpen] = useState(false);
    const [avatarCoverData, setAvatarCoverData] = useState(null);
    const [currentIcon, setCurrentIcon] = useState("");
    const [currentThumbnail, setCurrentThumbnail] = useState("");
    const [currentTab, setCurrentTab] = useState("covers");
    const [backgroundCoverData, setBackgroundCoverData] = useState(null);

    const [selectedEmoji, setSelectedEmoji] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");
    //edit
    const [avatarCoverDataEdit, setAvatarCoverDataEdit] = useState(null);
    const [collectionCoverImage, setCollectionCoverImage] = useState("");
    const [collectionCoverImageType, setCollectionCoverImageType] = useState("");
    const [loadingImg, setLoadingImg] = useState(false);
    const [shortDescription, setShortDescription] = useState("");
    const [showColorPalette, setShowColorPalette] = useState(false);

    useEffect(() => {
        dispatch(getUserDetails())
        dispatch(getSuggestedTagColors())
    },[dispatch])

    useEffect(() => {
        if(sharedTags && sharedTags.length>0){
            const currentTagShared = getAllLevelCollectionPermissions(sharedTags,singleTagDetails?.id || id)
            if(currentTagShared){
                setIsCurrentTagShared(true)
                return;
            }
        }
    },[sharedTags,singleTagDetails,id])

    useEffect(() => {
        if(action === 'edit'){
            setTagName(singleTagData?.tag || '')
            setTagColor(singleTagData?.tagColor || '')
            setIsSubTag(singleTagData?.is_sub_tag || false)
            setSelectedTag(singleTagData?.is_sub_tag ? {id: singleTagData?.parent_tag?.id || singleTagData?.collection?.id || '', tag: singleTagData?.parent_tag?.tag || singleTagData?.collection?.tag || ''} :'Parent folder' )
            setSelectedType(singleTagData?.media_type || 'Link')
            setAvatarCoverDataEdit(singleTagData?.avatar || "");
            setCollectionCoverImage(singleTagData?.background?.icon || "");
            setCollectionCoverImageType(singleTagData?.background?.type || "");
            setSelectedEmoji(singleTagData?.avatar?.type === "emoji" ? singleTagData?.avatar?.icon: "");
            setSelectedColor(singleTagData?.avatar?.type === "color"? singleTagData?.avatar?.icon: "");
            setSelectedImage(singleTagData?.avatar?.type === "image"? singleTagData?.avatar?.icon: "");
            setSelectedIcon(singleTagData?.avatar?.type === "icon"? singleTagData?.avatar?.icon: "");
            setShortDescription(singleTagData?.shortDescription || '')
            setCurrentIcon(singleTagData?.avatar || null)
            setCurrentThumbnail(singleTagData?.background || null)
            setBackgroundCoverData(singleTagData?.background || null);
        }
    },[action,singleTagData,id])

    const onLayoutClick = () => {
        setShowCollectionInput(false)
    }

    const resetValues = () => {
        setTagName('')
        setTagColor('')
        setIsSubTag(false)
        setOpenShareTagWithDrawer(true)
        setSelectedEmoji("");
        setSelectedImage("");
        setSelectedIcon("");
    }

    const onIconSelect = (icon) => {
    setCurrentIcon(icon);
    setAvatarCoverData(icon)
    setOpen(false);
    setCurrentTab("covers");
  }

  const onIconSelectEdit = (icon) => {
    setCurrentIcon(icon);
    setAvatarCoverDataEdit(icon)
    setOpen(false);
    setCurrentTab("covers");
  }

  const onThumbnailSelect = (thumbnail) => {
    if (!thumbnail) {
      setCurrentThumbnail(null);
      setBackgroundCoverData(null)
      setOpen(false);
      setCurrentTab("covers");
    }
    setCurrentThumbnail(thumbnail);
    setBackgroundCoverData(thumbnail)
    setOpen(false);
    setCurrentTab("covers");
  }

    const renderThumbnail = () => {
      const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
    // const Icon =
    //   avatarCoverData &&
    //   avatarCoverData?.type === "icon" &&
    //   ReactIcons[avatarCoverData?.icon];
    return (
      <div>
        <div className="relative">
        <div onClick={() => { setOpen(true); setCurrentTab("covers"); }}>
          {!backgroundCoverData && (
            <div
              className="flex justify-center align-middle border-2 p-1 mt-1 border-gray-300 rounded-sm cursor-pointer"
            >
              <PhotoIcon className="h-5 w-5 text-gray-400" />
            </div>
          )}

          {backgroundCoverData && backgroundCoverData?.type === "unsplash" && (
            <>
              <img
                className="w-[48px] h-[48px] rounded-lg"
                src={backgroundCoverData?.icon?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/48x48_contain`)}
                alt={"Curateit"}
              />
            </>
          )}

          {backgroundCoverData && backgroundCoverData?.type === "gallery" && (
            <div className="flex items-center justify-center">
              <div
                style={{
                  height: "20px",
                  width: "40px",
                  // borderRadius: "50%",
                  background: backgroundCoverData?.icon,
                }}
              ></div>
            </div>
          )}

          {backgroundCoverData && backgroundCoverData?.type === "upload" && (
            <>
              <img
                className="w-[48px] h-[48px] rounded-lg"
                src={backgroundCoverData?.icon?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/48x48_contain`) || ""}
                alt={"Curateit"}
              />
            </>
          )}
        </div>
          <div
            className="bg-white rounded-lg pointer text-center mt-2"
            style={{
              height:
                avatarCoverData && avatarCoverData?.type === "image"
                  ? "48px"
                  : " inherit",
              width:
                avatarCoverData && avatarCoverData?.type === "image"
                  ? "48px"
                  : " inherit",
            }}
            onClick={() => { setOpen(true); setCurrentTab("favicon"); }}
          >
            {/* img */}
            {!avatarCoverData &&
               <img className='w-[40px] h-[40px] rounded-lg fit-image' src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/default-emoji-placeholder.png`} alt={"Curateit"} />
            }
            {avatarCoverData && avatarCoverData?.type === "image" && (
              <>
                <img
                  className="w-[48px] h-[48px] rounded-lg"
                  src={avatarCoverData?.icon?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/48x48_contain`) || "Tag image icon"}
                  alt={"Curateit"}
                />
              </>
            )}

            {/* emoji */}
            {avatarCoverData && avatarCoverData?.type === "emoji" && (
              <div className="flex items-center justify-center">
                <Emoji
                  unified={avatarCoverData?.icon || ""}
                  emojiStyle={EmojiStyle.APPLE}
                  size={22}
                />
              </div>
            )}

            {avatarCoverData && avatarCoverData?.type === "color" && (
              <div className="flex items-center justify-center">
                <div
                  style={{
                    height: "20px",
                    width: "20px",
                    borderRadius: "50%",
                    background: avatarCoverData?.icon || "",
                  }}
                ></div>
              </div>
            )}

            {/* {avatarCoverData && avatarCoverData?.type === "icon" && (
              <div className="flex items-center justify-center">
                <Icon style={{ fontSize: "20px" }} />
              </div>
            )} */}
          </div>
        </div>
      </div>
    );
  };
  //edit
  const renderThumbnailEdit = () => {
    const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
    // const Icon =
    //   avatarCoverDataEdit &&
    //   avatarCoverDataEdit?.type === "icon" &&
    //   ReactIcons[avatarCoverDataEdit?.icon];
    return (
      <div>
        <div onClick={() => { setOpen(true); setCurrentTab("covers"); }}>
          {!backgroundCoverData && (
            <div
              className="flex justify-center align-middle border-2 p-1 mt-1 border-gray-300 rounded-sm cursor-pointer"
            >
              <PhotoIcon className="h-5 w-5 text-gray-400" />
            </div>
          )}

          {backgroundCoverData && backgroundCoverData?.type === "unsplash" && (
            <>
              <img
                className="w-[48px] h-[48px] rounded-lg"
                src={backgroundCoverData?.icon?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/48x48_contain`)}
                alt={"Curateit"}
              />
            </>
          )}

          {backgroundCoverData && backgroundCoverData?.type === "gallery" && (
            <div className="flex items-center justify-center">
              <div
                style={{
                  height: "20px",
                  width: "40px",
                  // borderRadius: "50%",
                  background: backgroundCoverData?.icon,
                }}
              ></div>
            </div>
          )}

          {backgroundCoverData && backgroundCoverData?.type === "upload" && (
            <>
              <img
                className="w-[48px] h-[48px] rounded-lg"
                src={backgroundCoverData?.icon?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/48x48_contain`) || ""}
                alt={"Curateit"}
              />
            </>
          )}
        </div>
        <div className="relative">
          <div
            className="bg-white  rounded-lg pointer text-center mt-2"
            style={{
              height:
                avatarCoverDataEdit && avatarCoverDataEdit?.type === "image"
                  ? "48px"
                  : " inherit",
              width:
                avatarCoverDataEdit && avatarCoverDataEdit?.type === "image"
                  ? "48px"
                  : " inherit",
            }}
            onClick={() => { setOpen(true); setCurrentTab("favicon"); }}
          >
            {!avatarCoverDataEdit &&
              <img className='w-[40px] h-[40px] rounded-lg fit-image' src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/default-emoji-placeholder.png`} alt={"Curateit"} />
            }
            {/* img */}
            {avatarCoverDataEdit && avatarCoverDataEdit?.type === "image" && (
              <>
                <img
                  className="w-[48px] h-[48px] rounded-lg"
                  src={avatarCoverDataEdit?.icon?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/48x48_contain`) || "Tag image icon"}
                  alt={"Curateit"}
                />
              </>
            )}
            {/* emoji */}
            {avatarCoverDataEdit && avatarCoverDataEdit?.type === "emoji" && (
              <div className="flex items-center justify-center">
                <Emoji
                  unified={avatarCoverDataEdit?.icon}
                  emojiStyle={EmojiStyle.APPLE}
                  size={22}
                />
              </div>
            )}
            {avatarCoverDataEdit && avatarCoverDataEdit?.type === "color" && (
              <div className="flex items-center justify-center">
                <div
                  style={{
                    height: "20px",
                    width: "20px",
                    borderRadius: "50%",
                    background: avatarCoverDataEdit?.icon,
                  }}
                ></div>
              </div>
            )}
            {/* {avatarCoverDataEdit && avatarCoverDataEdit?.type === "icon" && (
              <div className="flex items-center justify-center">
                <Icon style={{ fontSize: "20px" }} />
              </div>
            )} */}
          </div>
        </div>
      </div>
    );
  };
  const handleEmoji = (emojiData) => {
    setSelectedEmoji(emojiData);
    setSelectedColor("");
    setSelectedImage("");
    setSelectedIcon("");
  };

  const handleColor = (newColor) => {
    setSelectedColor(newColor.hex);
    setSelectedEmoji("");
    setSelectedImage("");
    setSelectedIcon("");
  };

  const handleIcon = (iconName) => {
    setSelectedIcon(iconName);
    setSelectedColor("");
    setSelectedEmoji("");
    setSelectedImage("");
  };

  const handleImageUploadChange = async (files) => {
    const fileSize = files.size / 1024 / 1024; // Convert to MB
    // if (fileSize > 5) {
    //   message.error(TextMessage.FILE_SIZE_ERROR);
    //   return;
    // }
    setSelectedImage(files);
    setSelectedColor("");
    setSelectedEmoji("");
    setSelectedIcon("");
  };

  const handleCoverModalSubmit = async () => {
    if (action === "create") {
      if (selectedImage) {
        setLoadingImg(true);
        const formData = new FormData();

        formData.append("file", selectedImage);

        const res = await dispatch(uploadIconsTag(formData));

        if (res.error === undefined) {
          setLoadingImg(false);
          setSelectedImage("");
          setAvatarCoverData({
            icon: res.payload?.data?.message || "",
            type: "image",
          });
          setOpen(false);
        } else {
          setLoadingImg(false);
          setSelectedImage("");
          setOpen(false);
          setAvatarCoverData("");
        }

        return;
      }

      if (selectedColor) {
        setAvatarCoverData({
          icon: selectedColor || "",
          type: "color",
        });
        setOpen(false);
        return;
      }

      if (selectedEmoji) {
        setAvatarCoverData({
          icon: selectedEmoji.unified || "",
          type: "emoji",
        });
        setOpen(false);
        return;
      }

      if (selectedIcon) {
        setAvatarCoverData({
          icon: selectedIcon,
          type: "icon",
        });
        setOpen(false);
        return;
      }
    }

    if (action === "edit") {
      if (selectedImage) {
        setLoadingImg(true);
        const formData = new FormData();

        formData.append("file", selectedImage);

        const res = await dispatch(uploadIconsTag(formData));

        if (res.error === undefined) {
          setLoadingImg(false);
          setSelectedImage(res.payload?.data?.message || "");
          setAvatarCoverDataEdit({
            icon: res.payload?.data?.message || "",
            type: "image",
          });
          setOpen(false);
        } else {
          setLoadingImg(false);
          setSelectedImage("");
          setOpen(false);
          setAvatarCoverData("");
        }

        return;
      }

      if (selectedColor) {
        setAvatarCoverDataEdit({
          icon: selectedColor || "",
          type: "color",
        });
        setOpen(false);
        return;
      }

      if (selectedEmoji) {
        setAvatarCoverDataEdit({
          icon: selectedEmoji.unified || "",
          type: "emoji",
        });
        setOpen(false);
        return;
      }

      if (selectedIcon) {
        setAvatarCoverDataEdit({
          icon: selectedIcon,
          type: "icon",
        });
        setOpen(false);
        return;
      }
    }
  };

  const resetCancelValues = () => {
    if (action === "edit") {
      setSelectedEmoji(singleTagData?.avatar?.type === "emoji" ? singleTagData?.avatar?.icon : "");
      setSelectedColor(singleTagData?.avatar?.type === "color" ? singleTagData?.avatar?.icon : "");
      setSelectedImage(singleTagData?.avatar?.type === "image" ? singleTagData?.avatar?.icon : "");
      setSelectedIcon(singleTagData?.avatar?.type === "icon" ? singleTagData?.avatar?.icon : "");
      setOpen(false);
    } else {
      setSelectedEmoji(selectedEmoji);
      setSelectedColor(selectedColor);
      setSelectedImage(selectedImage);
      setSelectedIcon(selectedIcon);
      setOpen(false);
    }
  };

  const onSubmitClick = async () => {
    if(action === 'create'){
            let isDuplicateName = false;
            userTags.forEach(col => {
            if (
                col?.tag &&
                col.tag.toLowerCase() === tagName.toLowerCase() 
            ) {
                isDuplicateName = true
                return false
            }
            })

            if(isDuplicateName){
            message.error(`${tagName} already exist. Collection name must be unique.`)
            return;
            }

            if(!tagName) {
                message.error('Please enter tag name')
                return
            }

            let bgObj = null;
            if (typeof backgroundCoverData === "object") {
              bgObj = {
                ...backgroundCoverData,
                size: coverSize,
              };
            }

            setButtonLoading(true)

            const payload = {
              tag: tagName,
              users: session.userId,
              tagColor: tagColor,
              media_type: selectedType?.name || null,
              avatar:
                typeof avatarCoverData === "object" ? avatarCoverData : null,
              is_sub_tag: selectedTag?.id ? true : false,
              shortDescription: shortDescription,
              background: typeof bgObj === "object" ? bgObj : null,
            };
            
            const res = await dispatch(addTag({ data: payload}))

            if(res.error === undefined){
                if(selectedTag?.id){
                    const dropObj = getTagByTagId(tagsWithGemsCount,selectedTag?.id)
                    const dragObj = {
                        ...res.payload.data.data,
                        folders: [], bookmarks: [], parent_tag: dropObj,
                    }
                    const res1 = await dispatch(moveTag(res.payload.data.data.id,selectedTag?.id,dragObj,dropObj))
                    if(res1.error === undefined){
                        // dispatch(fetchTagsWithGemsCount())
                        setButtonLoading(false)
                        message.success(TextMessage.TAG_CREATE_TEXT)
                        resetValues()
                        dispatch(openDrawer(''))
                        dispatch(setParentTagData(null))
                        if(parentTagValue && parentTagValue?.tagId){
                          dispatch(addSubTagData(dragObj))
                        }
                    }else{
                        setButtonLoading(false)
                        // message.error(TextMessage.ERROR_TEXT)
                        resetValues()
                        dispatch(openDrawer(''))
                        dispatch(setParentTagData(null))
                    }
                }else{
                    dispatch(fetchTagsWithGemsCount())
                    setButtonLoading(false)
                    message.success(TextMessage.TAG_CREATE_TEXT)
                    resetValues()
                    dispatch(openDrawer(''))
                }
                dispatch(getUserDetails())
            }else{
                setButtonLoading(false)
                // message.error(TextMessage.ERROR_TEXT)
                resetValues()
                dispatch(openDrawer(''))
            }

            return;
        }
        
        if(action === 'edit'){
            let isDuplicateName = false;
            userTags.forEach(col => {
            if (
                col?.tag &&
                col.tag.toLowerCase() === tagName.toLowerCase() &&
                Number(id) !== col?.id
            ) {
                isDuplicateName = true
                return false
            }
            })

            if(isDuplicateName){
            message.error(`${tagName} already exist. Tag name must be unique.`)
            return;
            }

            if(!tagName) {
                message.error('Please enter tag name')
                return
            }
            setButtonLoading(true)
    

            if(typeof selectedTag === 'string' &&  selectedTag.toLowerCase() === 'make it parent folder'){
              let bgObj = null;
              if (typeof backgroundCoverData === "object") {
                bgObj = {
                  ...backgroundCoverData,
                  size: coverSize,
                };
              }
            setButtonLoading(true)
            const payload = {
              tag: tagName,
              tagColor: tagColor,
              media_type: selectedType?.name || null,
              avatar:
                typeof avatarCoverDataEdit === "object"
                  ? avatarCoverDataEdit
                  : null,
              shortDescription: shortDescription,
              background: typeof bgObj === "object" ? bgObj : null,
            };

            const res = await dispatch(updateTag(id,payload))

            if(res.error === undefined){
                setTitle(tagName)
                setIcon(payload?.avatar || null)
                setCoverImage(payload?.background || null)
                const dragObj = {
                    ...singleTagData,
                    ...res.payload.data.data.attributes,
                }
                const res1 = await dispatch(moveToRootTag(id,dragObj))
                if(res1.error === undefined){
                    dispatch(fetchTagsWithGemsCount())
                    setOpenDrawer(false)
                    setButtonLoading(false)
                    message.success(TextMessage.TAG_UPDATE_TEXT)
                    resetValues()
                }else{
                setButtonLoading(false)
                // message.error(TextMessage.ERROR_TEXT)
                resetValues()
                setOpenDrawer(false)
                }
            } else{
                setButtonLoading(false)
                // message.error(TextMessage.ERROR_TEXT)
                resetValues()
                setOpenDrawer(false)
            }
            return;
            }

            if(typeof selectedTag == 'object' && selectedTag?.id !== id){
              let bgObj = null;
              if (typeof backgroundCoverData === "object") {
                bgObj = {
                  ...backgroundCoverData,
                  size: coverSize,
                };
              }
            setButtonLoading(true)
            const payload = {
              tag: tagName,
              tagColor: tagColor,
              media_type: selectedType?.name || null,
              avatar:
                typeof avatarCoverDataEdit === "object"
                  ? avatarCoverDataEdit
                  : null,
              shortDescription: shortDescription,
              background: typeof bgObj === "object" ? bgObj : null,
            };

            const res = await dispatch(updateTag(id,payload))

            if(res.error === undefined){
                setTitle(tagName)
                setIcon(payload?.avatar || null)
                setCoverImage(payload?.background || null)
                const dragObj = {
                    ...singleTagData,
                    ...res.payload.data.data.attributes,
                }
                const dropObj = getTagByTagId(tagsWithGemsCount,selectedTag?.id)

                const res1 = await dispatch(moveTag(id,selectedTag?.id,dragObj,dropObj))
                if(res1){
                    dispatch(fetchTagsWithGemsCount())
                    setOpenDrawer(false)
                    setButtonLoading(false)
                    resetValues()
                    message.success(TextMessage.TAG_UPDATE_TEXT)
                }
            } else{
                setButtonLoading(false)
                // message.error(TextMessage.ERROR_TEXT)
                resetValues()
                setOpenDrawer(false)
            }
            return;
            }

            const isSelectedTagShared = getAllLevelCollectionPermissions(sharedTags,id)
            let bgObj = null;
            if (typeof backgroundCoverData === "object") {
              bgObj = {
                ...backgroundCoverData,
                size: coverSize,
              };
            }
            const payload = {
              tag: tagName,
              tagColor: tagColor,
              media_type: selectedType?.name || null,
              author: isSelectedTagShared
                ? isSelectedTagShared?.data?.author?.id
                : session.userId,
              avatar:
                typeof avatarCoverDataEdit === "object"
                  ? avatarCoverDataEdit
                  : null,
              shortDescription: shortDescription,
              background: typeof bgObj === "object" ? bgObj : null,
            };
            const res = await dispatch(updateTag(id,payload,isSelectedTagShared))
            if(res.error === undefined){
                dispatch(fetchTagsWithGemsCount())
                setOpenDrawer(false)
                message.success(TextMessage.TAG_UPDATE_TEXT)
                setTitle(tagName)
                setIcon(payload?.avatar || null)
                setCoverImage(payload?.background || null)
            } else{
                setButtonLoading(false)
                // message.error(TextMessage.ERROR_TEXT)
                resetValues()
                setOpenDrawer(false)
            }

        }
  }

  const handleRemoveTag = async(id) => {
        const isSelectedTagShared = getAllLevelCollectionPermissions(sharedTags,id)

        if(!isSelectedTagShared){
            setButtonLoading(true)
            const res = await dispatch(deleteTag(id))

            if(res.error === undefined){
                message.success(TextMessage.TAG_DELETE_TEXT)
                setButtonLoading(false)
                navigate.push(`/u/${session.username}/all-bookmarks`)
            }
            return;
        }

        if((isSelectedTagShared?.accessType === 'viewer') || (isSelectedTagShared?.accessType === 'editor' && isSelectedTagShared.topLevel)){
            message.error('You dont have permission to delete this shared tag')
            return;
        }

        if(isSelectedTagShared?.accessType === 'owner' || (isSelectedTagShared?.accessType === 'editor' && !isSelectedTagShared.topLevel)){
            setButtonLoading(true)
            const res = await dispatch(deleteTag(id,isSelectedTagShared))

            if(res.error === undefined){
                message.success(TextMessage.TAG_DELETE_TEXT)
                setButtonLoading(false)
                return navigate.push(`/u/${session.username}/all-bookmarks`)
            }else{
                setButtonLoading(false)
                // message.success(TextMessage.ERROR_TEXT)
            }
        }

    }

    const handleRemoveIconModalSubmit = async () => {
    setLoadingImg(true);
    const payload = {
      avatar: null,
    };
    const res = await dispatch(updateTag(id, payload));
    if (res.error === undefined) {
      setLoadingImg(false);
      setOpen(false);
      setSelectedEmoji("");
      setSelectedColor("");
      setSelectedImage("");
      setAvatarCoverDataEdit(null);
      setSelectedIcon("");
      setCollectionIcon("");
    }
  };

  return (
    <div className="relative">
      <Drawer
        placement={isMobileView ? "bottom" : "right"}
        height={isMobileView ? "90%" : "inherit"}
        width={isMobileView ? "90%" : "460px"}
        title={title}
        open={open}
        maskClosable={isMobileView ? true : false}
        bodyStyle={{
          padding: action !== "create" && isMobileView ? "24px 8px" : "24px",
        }}
        onClose={() => {
          if (action === "edit") {
            navigate.push(pathname);
            setOpenDrawer(false);
            return;
          }
          dispatch(setParentTagData(null));
          dispatch(openDrawer(""));
        }}
        footer={
          <Space className="flex items-center justify-end">
            <Button
              onClick={() => {
                if (action === "edit") {
                  navigate.push(pathname);
                  setOpenDrawer(false);
                  return;
                }
                dispatch(setParentTagData(null));
                dispatch(openDrawer(""));
              }}
              disabled={buttonLoading}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              className="bg-[#40a9ff] border-[#40a9ff]"
              onClick={onSubmitClick}
              disabled={buttonLoading}
            >
              {buttonLoading ? "Loading" : "Save"}
            </Button>
          </Space>
        }
      >
        {action === "create" ? (
          <div
            onClick={onLayoutClick}
            className="h-full grid grid-cols-8 gap-2"
          >
            {renderThumbnail()}
            <div className="col-span-7">
              <Input
                type="text"
                name="title"
                placeholder="Enter tag name"
                value={tagName || ""}
                onChange={(e) => setTagName(e.target.value)}
              />

              <div className="pt-4 flex justify-between space-x-2">
                <div className={classNames("flex-1")}>
                  <h6 className="block text-xs font-medium text-gray-500 mb-1">
                    Parent Tag
                  </h6>
                  <div
                    className="relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      onClick={() => setShowCollectionInput(true)}
                      className="w-full"
                    >
                      <ParentTagComboBox
                        inputShown={showCollectionInput}
                        setShowCollectionInput={setShowCollectionInput}
                        tagData={userTags}
                        userId={session.userId}
                        setSelectedTag={setSelectedTag}
                        selectedTag={selectedTag}
                        action="create"
                        disabled={parentTagValue && parentTagValue?.tagId}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={classNames(
                    "flex-1",
                    showCollectionInput && "hidden"
                  )}
                >
                  <h6 className="block text-xs font-medium text-gray-500 mb-1">
                    Type
                  </h6>
                  <div
                    className="relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      onClick={() => setShowTypeInput(true)}
                      className="w-full"
                    >
                      <TypeComboBox
                        inputShown={showTypeInput}
                        setShowTypeInput={setShowTypeInput}
                        updateInputShow={setShowTypeInput}
                        setSelectedType={setSelectedType}
                        type={selectedType}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h6 className="block text-xs font-medium text-gray-500 mb-1">
                  Short Description
                </h6>
                <TextArea
                  placeholder="Add short description"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="rounded-md w-full border border-solid border-gray-400 outline-none"
                  rows={4}
                />
              </div>

              <div className="pt-4 flex justify-between space-x-2">
                <div className={classNames("flex-1")}></div>
                <div className={classNames("flex-1")}>
                  <h6 className="block text-xs font-medium text-gray-500 mb-1">
                    Tag color
                  </h6>
                  <div
                    className="relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Input
                      placeholder="Enter tag color"
                      value={tagColor || ""}
                      onChange={(e) => setTagColor(e.target.value)}
                      prefix={
                        <>
                          <div
                            className={`h-4 w-4 mr-1`}
                            style={{ background: tagColor }}
                          ></div>
                        </>
                      }
                      suffix={
                        <IoColorPaletteOutline
                          className="h-4 w-4 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowColorPalette(!showColorPalette);
                          }}
                        />
                      }
                    />
                  </div>
                </div>
              </div>

              {showColorPalette && (
                <div className="pt-4 flex justify-between space-x-2">
                  <div></div>
                  {/* color picker */}
                  <div>
                    <SketchPicker
                      color={tagColor}
                      onChangeComplete={(color) => setTagColor(color.hex)}
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-between space-x-2">
                <div></div>

                <div style={{ flex: "0.5" }}>
                  <div>
                    {suggestedTagColors && suggestedTagColors?.length > 0 && (
                      <div className="block text-xs font-medium text-gray-500 mb-1">
                        Suggested colors
                      </div>
                    )}
                  </div>

                  <div className="w-full flex flex-wrap py-0 mt-2">
                    {suggestedTagColors &&
                      suggestedTagColors?.length > 0 &&
                      suggestedTagColors?.map((item, i) => (
                        <div onClick={() => setTagColor(item)} className=" p-1">
                          <div
                            style={{ backgroundColor: item, boxShadow: item }}
                            className={`rounded-[3px] h-[16px] w-[16px] cursor-pointer`}
                          ></div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            {openModal && (
              <div>
                <ImageModal
                  currentTab={currentTab}
                  onClose={() => setOpen(false)}
                  currentIcon={currentIcon}
                  onIconSelect={onIconSelect}
                  currentThumbnail={currentThumbnail}
                  onThumbnailSelect={onThumbnailSelect}
                  platform={"collection"}
                  siteImages={[]}
                  isBlogType={true}
                  setCoverSize={setCoverSize}
                  coverSize={coverSize}
                  action={action}
                />
              </div>
            )}
          </div>
        ) : (
          <>
            <div onClick={onLayoutClick} className="grid grid-cols-8 gap-2">
              {renderThumbnailEdit()}
              <div className="col-span-7">
                <Input
                  type="text"
                  name="title"
                  placeholder="Enter tag name"
                  value={tagName || ""}
                  onChange={(e) => setTagName(e.target.value)}
                />

                <div className="pt-4 flex justify-between space-x-2">
                  <div className={classNames("flex-1")}>
                    <h6 className="block text-xs font-medium text-gray-500 mb-1">
                      Parent Tag
                    </h6>
                    <div
                      className="relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        onClick={() => setShowCollectionInput(true)}
                        className="w-full"
                      >
                        <ParentTagComboBox
                          inputShown={showCollectionInput}
                          setShowCollectionInput={setShowCollectionInput}
                          tagData={userTags}
                          userId={session.userId}
                          setSelectedTag={setSelectedTag}
                          selectedTag={selectedTag}
                          isSubTag={isSubTag}
                          disabled={isCurrentTagShared}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={classNames(
                      "flex-1",
                      showCollectionInput && "hidden"
                    )}
                  >
                    <h6 className="block text-xs font-medium text-gray-500 mb-1">
                      Type
                    </h6>
                    <div
                      className="relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        onClick={() => setShowTypeInput(true)}
                        className="w-full"
                      >
                        <TypeComboBox
                          inputShown={showTypeInput}
                          setShowTypeInput={setShowTypeInput}
                          updateInputShow={setShowTypeInput}
                          setSelectedType={setSelectedType}
                          type={selectedType}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h6 className="block text-xs font-medium text-gray-500 mb-1">
                    Short Description
                  </h6>
                  <TextArea
                    placeholder="Add short description"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    className="rounded-md w-full border border-solid border-gray-400 outline-none"
                    rows={4}
                  />
                </div>

                <div className="pt-4 flex justify-between space-x-2">
                  <div className={classNames("flex-1", "flex-col flex")}>
                    <div>
                      <Checkbox
                        onChange={(e) => handleTextEditor(e.target.checked)}
                        checked={showTextEditor}
                      >
                        <span className="text-gray-500 font-medium text-sm">
                          Show description
                        </span>
                      </Checkbox>
                    </div>

                    <div className="flex mt-1">
                      <Button
                        onClick={() => {
                          setOpenShareTagWithDrawer(!openShareTagWithDrawer);
                          setShowDeleteConfirm(false);
                        }}
                        className="mr-2"
                      >
                        <ShareIcon className="h-5 w-5 cursor-pointer text-[#1890ff]" />
                      </Button>

                      <Button
                        onClick={() => {
                          setShowDeleteConfirm(true);
                          setOpenShareTagWithDrawer(true);
                        }}
                      >
                        <TrashIcon className="h-5 w-5 text-[#EB5757] cursor-pointer" />
                      </Button>
                    </div>
                  </div>
                  <div className={classNames("flex-1")}>
                    <h6 className="block text-xs font-medium text-gray-500 mb-1">
                      Tag color
                    </h6>
                    <div
                      className="relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Input
                        placeholder="Enter tag color"
                        value={tagColor || ""}
                        onChange={(e) => setTagColor(e.target.value)}
                        prefix={
                          <>
                            <div
                              className={`h-4 w-4 mr-1`}
                              style={{ background: tagColor }}
                            ></div>
                          </>
                        }
                        suffix={
                          <IoColorPaletteOutline
                            className="h-4 w-4 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowColorPalette(!showColorPalette);
                            }}
                          />
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between space-x-2">
                  <div></div>

                  {/* color picker */}
                  {openShareTagWithDrawer && showColorPalette ? (
                    <div className={`${isMobileView ? "sketchDiv" : ""} `}>
                      <SketchPicker
                        color={tagColor}
                        onChangeComplete={(color) => setTagColor(color.hex)}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                {openShareTagWithDrawer ? (
                  <div className="pt-4 flex justify-between space-x-2">
                    <div></div>

                    <div style={{ flex: "0.5" }}>
                      <div>
                        {suggestedTagColors &&
                          suggestedTagColors?.length > 0 && (
                            <div className="block text-xs font-medium text-gray-500 mb-1">
                              Suggested colors
                            </div>
                          )}
                      </div>

                      <div className="w-full flex flex-wrap py-0 mt-2">
                        {suggestedTagColors &&
                          suggestedTagColors?.length > 0 &&
                          suggestedTagColors?.map((item, i) => (
                            <div
                              onClick={() => setTagColor(item)}
                              className=" p-1"
                            >
                              <div
                                style={{
                                  backgroundColor: item,
                                  boxShadow: item,
                                }}
                                className={`rounded-[3px] h-[16px] w-[16px] cursor-pointer`}
                              ></div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                {showDeleteConfirm && (
                  <div className="pt-4 fixed bottom-[60px]">
                    <div className="font-medium">Confirm Delete?</div>
                    <div className="flex items-center mt-1">
                      <Button
                        onClick={() => handleRemoveTag(id)}
                        disabled={buttonLoading}
                        danger
                        type="primary"
                      >
                        Yes
                      </Button>
                      <Button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="ml-2"
                        disabled={buttonLoading}
                      >
                        No
                      </Button>
                    </div>
                  </div>
                )}

                {openModal && (
                  <div>
                    <ImageModal
                      currentTab={currentTab}
                      onClose={() => setOpen(false)}
                      currentIcon={currentIcon}
                      siteImages={[]}
                      onIconSelect={onIconSelectEdit}
                      currentThumbnail={currentThumbnail}
                      onThumbnailSelect={onThumbnailSelect}
                      platform={"collection"}
                      isBlogType={true}
                      setCoverSize={setCoverSize}
                      coverSize={coverSize}
                      action={action}
                    />
                  </div>
                )}
              </div>
            </div>
            {!openShareTagWithDrawer && (
              <div className="relative">
                <div className="pointer-ui"></div>
                <div className="mt-4 border border-solid border-[#DADEE8] rounded-[6px] p-2 relative">
                  <ShareTagDrawer
                    openDrawer={false}
                    singleTagDetails={singleTagDetails || ""}
                    tagId={id || ""}
                    openShareTagWithDrawer={openShareTagWithDrawer}
                    tagName={tagName}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </Drawer>
    </div>
  );
}

export default TagDrawer;