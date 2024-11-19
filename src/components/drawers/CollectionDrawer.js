"use client";
// import * as ReactIcons                          from "react-icons/ri";
import React, { useEffect, useState }           from "react";
import { 
  Button, 
  Checkbox, 
  Drawer, 
  Space, 
  Spin, 
  message,
  Input as AntInput 
}                                               from "antd";
import { useDispatch, useSelector }             from "react-redux";
import { usePathname, useRouter }               from "next/navigation";
import { Emoji, EmojiStyle }                    from "emoji-picker-react";
import { WithContext as ReactTags }             from "react-tag-input";
import { PhotoIcon }                            from "@heroicons/react/24/outline";
// import DialogModal from "@components/modal/Dialog";

import Input                                    from "@components/collectionCombobox/Input";
import ParentComboBox                           from "@components/collectionCombobox/ParentComboBox";
import TypeComboBox                             from "@components/collectionCombobox/TypeComboBox";
import ShareCollectionDrawer                    from "./ShareCollectionDrawer";
import ImageModal                               from "@components/modal/ImageModal";

import { updateTagsPromise }                    from "@utils/update-tags";
import {
  getAllCollectionWithSub,
  getAllLevelCollectionPermissions,
  getCollectionById,
}                                               from "@utils/find-collection-id";
import { KEY_CODES, TextMessage }               from "@utils/constants";
import session                                  from "@utils/session";

import { 
  addBkFromPage, 
  openDrawer, 
  setIsMobileSidebar, 
  setParentCollectionData, 
  updateTourStepsData 
}                                               from "@actions/app";
import {
  addSubCollectionData,
  collectionMove,
  createCollection,
  deleteCollection,
  moveCollection,
  moveCollectionShared,
  moveToRoot,
  removeAccessEmail,
  removeSharedCollection,
  sharedCollectionMove,
  updateCollection,
  updateSharedCollection,
}                                               from "@actions/collection";
import MultiSelectTypeComboBox from "@components/collectionCombobox/MultiSelectTypeComboBox";

const { TextArea } = AntInput;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env;

const CollectionDrawer = ({
  open,
  title,
  setOpenDrawer,
  action = "",
  singleCollectionDetails,
  id,
  pageNumber,
  setCollectionIcon = "",
  isSharedAndAllowDelete,
  isSharedAndAllowShare,
  setOpenShareCollWithDrawer = () => {},
  openShareCollWithDrawer,
  shareCollectionDetails,
  setTitle = () => {},
  existingThumbnails,
  handleCoverModal,
  handleTextEditor,
  showTextEditor,
  loading=false,
  setCollectionCoverImage=()=>{},setCoverSize=()=>{},
  coverSize='default'
}) => {
  const pathname = usePathname();
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { userTags } = useSelector((state) => state.users);
  const { sharedCollections, collectionsAndItsCount } = useSelector(
    (state) => state.collections
  );
  const { isMobileView,tourStepsEnabled,parentCollectionValue } = useSelector((state) => state.app);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [showTypeInput, setShowTypeInput] = useState(false);
  const [showCollectionInput, setShowCollectionInput] = useState(false);

  const [collectionName, setCollectionName] = useState(tourStepsEnabled ? "My first collection" : '');
  const [collectionDescription, setCollectionDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  // const [selectedType, setSelectedType] = useState([]);
  const [selectedType, setSelectedType] = useState(
    action === "create" ? [{id:6,name:'Link'}] : []
  );
  const [defaultSelectedType, setDefaultSelectedType] = useState(
    action === "create" ? "Link" : singleCollectionDetails?.media_type
  );
  const [otherSelectedType,setOtherSelectedType] = useState([])

  const [selectedCollection, setSelectedCollection] = useState(
    (action === "create" && !parentCollectionValue?.collectionId)
      ? "Parent folder" :
      (action === 'create' && parentCollectionValue?.collectionId) ? {id: parentCollectionValue?.collectionId ||'', name: parentCollectionValue?.collectionName ||''}
      : action === "edit" && singleCollectionDetails?.is_sub_collection
      ? {
          id: singleCollectionDetails?.collection?.id || singleCollectionDetails?.collection?.data?.id ||"",
          name: singleCollectionDetails?.collection?.name || singleCollectionDetails?.collection?.data?.attributes?.name || "",
        }
      : "Parent folder"
  );
  const [openModal, setOpen] = useState(false);
  const [avatarCoverData, setAvatarCoverData] = useState(null);
  const [backgroundCoverData, setBackgroundCoverData] = useState(null);

  // const [selectedEmoji, setSelectedEmoji] = useState("");
  // const [selectedColor, setSelectedColor] = useState("");
  // const [selectedImage, setSelectedImage] = useState("");
  // const [selectedIcon, setSelectedIcon] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSubCollection, setIsSubCollection] = useState(false);
  //edit
  const [avatarCoverDataEdit, setAvatarCoverDataEdit] = useState(null);
  const [allCollectionsData, setAllCollectionsData] = useState([]);
  const [isCurrentCollectionShared, setIsCurrentCollectionShared] =
    useState(false);
  const [currentCollectionAccessType, setCurrentCollectionAccessType] =
    useState(null);
  // const [collectionCoverImage, setCollectionCoverImage] = useState("");
  // const [collectionCoverImageType, setCollectionCoverImageType] = useState("");
  const [currentIcon, setCurrentIcon] = useState("");
  const [currentThumbnail, setCurrentThumbnail] = useState("");
  const [currentTab, setCurrentTab] = useState("covers");
  const [shortDescription, setShortDescription] = useState("");


  useEffect(() => {
    if (sharedCollections && sharedCollections.length > 0) {
      const filtered = sharedCollections?.filter(
        (item) => item?.accessType !== "viewer"
      );
      const currentCollectionShared = getAllLevelCollectionPermissions(
        sharedCollections,
        singleCollectionDetails?.id || id
      );
      if (currentCollectionShared) {
        setAllCollectionsData([...filtered]);
        setIsCurrentCollectionShared(true);
        setCurrentCollectionAccessType(currentCollectionShared);
        return;
      }
      setAllCollectionsData(
        collectionsAndItsCount
          ? [...collectionsAndItsCount, ...filtered]
          : [...filtered]
      );
      setIsCurrentCollectionShared(false);
      setCurrentCollectionAccessType(null);
    } else {
      setAllCollectionsData(
        collectionsAndItsCount ? [...collectionsAndItsCount] : []
      );
      setIsCurrentCollectionShared(false);
      setCurrentCollectionAccessType(null);
    }
  }, [sharedCollections, singleCollectionDetails, collectionsAndItsCount, id]);

  useEffect(() => {
    if (action === "edit") {
      setCollectionName(singleCollectionDetails?.name || "");
      setCollectionDescription(singleCollectionDetails?.description || "");
      setSelectedTags(singleCollectionDetails?.tags?.data || []);
      setAvatarCoverDataEdit(singleCollectionDetails?.avatar || "");
      setBackgroundCoverData(singleCollectionDetails?.background || null);
      // setCollectionCoverImage(singleCollectionDetails?.background?.icon || "");
      // setCollectionCoverImageType(
      //   singleCollectionDetails?.background?.type || ""
      // );
      // console.log("singleCollectionDetails?.background?.icon", singleCollectionDetails)
      setCurrentIcon(singleCollectionDetails?.avatar || null)
      setCurrentThumbnail(singleCollectionDetails?.background || null)
      setShortDescription(singleCollectionDetails?.shortDescription || '')
      // setSelectedEmoji(
      //   singleCollectionDetails?.avatar?.type === "emoji"
      //     ? singleCollectionDetails?.avatar?.icon
      //     : ""
      // );
      // setSelectedColor(
      //   singleCollectionDetails?.avatar?.type === "color"
      //     ? singleCollectionDetails?.avatar?.icon
      //     : ""
      // );
      // setSelectedImage(
      //   singleCollectionDetails?.avatar?.type === "image"
      //     ? singleCollectionDetails?.avatar?.icon
      //     : ""
      // );
      // setSelectedIcon(
      //   singleCollectionDetails?.avatar?.type === "icon"
      //     ? singleCollectionDetails?.avatar?.icon
      //     : ""
      // );

      const otherMediatypes = Array.isArray(
        singleCollectionDetails?.otherSupportedMediaTypes
      )
        ? [...singleCollectionDetails?.otherSupportedMediaTypes]
        : [];
      const mt = singleCollectionDetails?.media_type ? [singleCollectionDetails?.media_type] : []
      setSelectedType([...mt,...otherMediatypes]);
      setDefaultSelectedType(singleCollectionDetails?.media_type);
      setSelectedCollection(
        singleCollectionDetails?.is_sub_collection
          ? {
          id: singleCollectionDetails?.collection?.id || singleCollectionDetails?.collection?.data?.id ||"",
          name: singleCollectionDetails?.collection?.name || singleCollectionDetails?.collection?.data?.attributes?.name || "",
        }
          : "Parent folder"
      );
      setIsSubCollection(singleCollectionDetails?.is_sub_collection || false);
    }
  }, [action, singleCollectionDetails, id]);

  const resetValues = () => {
    // setSelectedEmoji("");
    // setSelectedColor("");
    // setSelectedImage("");
    setAvatarCoverDataEdit("");
    setCollectionName();
    setCollectionDescription("");
    setSelectedTags([]);
    setAvatarCoverData("");
    setSelectedType("");
    // setSelectedIcon("");
    setIsSubCollection(false);
    setSelectedCollection("");
    setOpenShareCollWithDrawer(true);
  };

  const prepareTags = () => {
    const tagArr = [];
    userTags.forEach((t) => {
      if (t.tag) {
        tagArr.push({
          id: t.tag,
          text: t.tag,
        });
      }
    });
    return tagArr;
  };

  const onTagAdd = async (tag) => {
    const existingIdx = userTags?.findIndex((t) => {
      return t.tag === tag.text;
    });
    if (existingIdx !== -1) {
      setSelectedTags([
        ...selectedTags,
        { id: userTags[existingIdx].id, tag: userTags[existingIdx].tag },
      ]);
    } else {
      setSelectedTags([ ...selectedTags, { id: tag?.text, tag: tag?.text } ])
    }
  };

  const onTagDelete = (i) => {
    selectedTags.splice(i, 1);
    setSelectedTags([...selectedTags]);
  };

  const handleDefaultType = (item) => {
    setDefaultSelectedType(item.name)

    const isExists = selectedType.filter((p) => {
      if (typeof p === "object" && p !== null) {
        return p.name === item.name;
      } else if (typeof p === "string") {
        return p === item.name;
      }
      return true;
    });

    if (isExists && isExists?.length === 0) {
      setSelectedType((prev) => [...prev, item]);
    }
  }

  const renderThumbnail = () => {
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
                src={backgroundCoverData?.icon}
                alt={collectionName || "Curateit"}
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
                src={backgroundCoverData?.icon}
                alt={collectionName || "Curateit"}
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
                  src={avatarCoverData?.icon?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/48x48_contain`) || ""}
                  alt={collectionName || "Curateit"}
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

        {/* <div
          onClick={() => setOpen((prev) => !prev)}
          className="w-48px py-[2px] bg-white flex justify-center align-middle border-2 border-gray-300 rounded-sm mt-1 cursor-pointer"
        >
          <img
            src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/image-up.svg`}
            alt="up icon"
            className="h-[18px]"
          />
        </div> */}
      </div>
    );
  };
  //edit
  const renderThumbnailEdit = () => {
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
                alt={collectionName || "Curateit"}
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
                src={backgroundCoverData?.icon?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/48x48_contain`)}
                alt={collectionName || "Curateit"}
              />
            </>
          )}
        </div>
        {/* <div
          onClick={handleCoverModal}
          className="w-48px py-[2px] bg-white flex justify-center align-middle border-2 border-gray-300 rounded-sm cursor-pointer mt-1"
        >
          <img
            src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/image-up.svg`}
            alt="up icon"
            className="h-[18px]"
          />
        </div> */}
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
                  src={avatarCoverDataEdit?.icon?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/48x48_contain`)}
                  alt={collectionName || "Curateit"}
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
        {/* <div
          
          className="w-48px py-[2px] bg-white flex justify-center align-middle border-2 border-gray-300 rounded-sm cursor-pointer mt-1"
        >
          <img
            src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/image-up.svg`}
            alt="up icon"
            className="h-[18px]"
          />
        </div> */}
      </div>
    );
  };
  // const handleEmoji = (emojiData) => {
  //   setSelectedEmoji(emojiData);
  //   setSelectedColor("");
  //   setSelectedImage("");
  //   setSelectedIcon("");
  // };

  // const handleColor = (newColor) => {
  //   setSelectedColor(newColor.hex);
  //   setSelectedEmoji("");
  //   setSelectedImage("");
  //   setSelectedIcon("");
  // };

  // const handleIcon = (iconName) => {
  //   setSelectedIcon(iconName);
  //   setSelectedColor("");
  //   setSelectedEmoji("");
  //   setSelectedImage("");
  // };

  // const handleImageUploadChange = async (files) => {
  //   const fileSize = files.size / 1024 / 1024; // Convert to MB
  //   if (fileSize > 5) {
  //     message.error(TextMessage.FILE_SIZE_ERROR);
  //     return;
  //   }
  //   setSelectedImage(files);
  //   setSelectedColor("");
  //   setSelectedEmoji("");
  //   setSelectedIcon("");
  // };

  // const handleCoverModalSubmit = async () => {
  //   if (action === "create") {
  //     if (selectedImage) {
  //       setLoadingImg(true);
  //       const formData = new FormData();

  //       formData.append("file", selectedImage);

  //       const res = await dispatch(uploadIcons(formData));

  //       if (res.error === undefined) {
  //         setLoadingImg(false);
  //         setSelectedImage("");
  //         setAvatarCoverData({
  //           icon: res.payload?.data?.message || "",
  //           type: "image",
  //         });
  //         setOpen(false);
  //       } else {
  //         setLoadingImg(false);
  //         setSelectedImage("");
  //         setOpen(false);
  //         setAvatarCoverData("");
  //       }

  //       return;
  //     }

  //     if (selectedColor) {
  //       setAvatarCoverData({
  //         icon: selectedColor || "",
  //         type: "color",
  //       });
  //       setOpen(false);
  //       return;
  //     }

  //     if (selectedEmoji) {
  //       setAvatarCoverData({
  //         icon: selectedEmoji.unified || "",
  //         type: "emoji",
  //       });
  //       setOpen(false);
  //       return;
  //     }

  //     if (selectedIcon) {
  //       setAvatarCoverData({
  //         icon: selectedIcon,
  //         type: "icon",
  //       });
  //       setOpen(false);
  //       return;
  //     }
  //   }

  //   if (action === "edit") {
  //     if (selectedImage) {
  //       setLoadingImg(true);
  //       const formData = new FormData();

  //       formData.append("file", selectedImage);

  //       const res = await dispatch(uploadIcons(formData));

  //       if (res.error === undefined) {
  //         setLoadingImg(false);
  //         setSelectedImage(res.payload?.data?.message || "");
  //         setAvatarCoverDataEdit({
  //           icon: res.payload?.data?.message || "",
  //           type: "image",
  //         });
  //         setOpen(false);
  //       } else {
  //         setLoadingImg(false);
  //         setSelectedImage("");
  //         setOpen(false);
  //         setAvatarCoverData("");
  //       }

  //       return;
  //     }

  //     if (selectedColor) {
  //       setAvatarCoverDataEdit({
  //         icon: selectedColor || "",
  //         type: "color",
  //       });
  //       setOpen(false);
  //       return;
  //     }

  //     if (selectedEmoji) {
  //       setAvatarCoverDataEdit({
  //         icon: selectedEmoji.unified || "",
  //         type: "emoji",
  //       });
  //       setOpen(false);
  //       return;
  //     }

  //     if (selectedIcon) {
  //       setAvatarCoverDataEdit({
  //         icon: selectedIcon,
  //         type: "icon",
  //       });
  //       setOpen(false);
  //       return;
  //     }
  //   }
  // };

  const onSubmitClick = async () => {
    if (action === "create") {
      if (!collectionName) {
        message.error("Please enter collection name");
        return;
      }
      if (collectionName?.toLowerCase() === "bio") {
        message.error("Bio collection name already taken.");
        return;
      }
      let isDuplicateName = false;
      let allCollections = getAllCollectionWithSub(allCollectionsData);
      allCollections.forEach((col) => {
        if (
          col?.name &&
          col.name.toLowerCase() === collectionName.toLowerCase()
        ) {
          isDuplicateName = true;
          return false;
        }
      });

      if (isDuplicateName) {
        message.error(
          `${collectionName} already exist. Collection name must be unique.`
        );
        return;
      }
      let payload;
      let isSharedCollection = null;

      let newTags = []
      const filtered = selectedTags.filter(item => typeof item.id === 'string');
      const filteredNumber = selectedTags.filter(item => typeof item.id === 'number');
      const tagNames = filtered?.map(item => item?.tag)
      if(tagNames && tagNames?.length>0){
        newTags = await updateTagsPromise(tagNames, userTags, tagNames?.length)
      }
      newTags=[...newTags,...filteredNumber]

      setButtonLoading(true);

      let bgObj = null;
      if(typeof backgroundCoverData === "object"){
        bgObj = {
          ...backgroundCoverData,
          size:coverSize
        };
      }

      const filteredType = selectedType.filter((p) => {
        if (typeof p === "object" && p !== null) {
          return p.name !== defaultSelectedType;
        } else if (typeof p === "string") {
          return p !== defaultSelectedType;
        }
        return true; // handle any other types if necessary
      });

      const mapped = filteredType.map((item) => {
        if (typeof item === "object" && item !== null) {
          return item.name;
        } else if (typeof item === "string") {
          return item;
        }
        return null; // Handle other types if necessary
      });

      payload = {
        name: collectionName,
        description: collectionDescription,
        tags: newTags?.map((t) => {
          return t.id;
        }),
        author: session.userId,
        avatar: typeof avatarCoverData === "object" ? avatarCoverData : null,
        background: typeof bgObj === "object" ? bgObj : null,
        media_type:
          typeof defaultSelectedType === "object"
            ? defaultSelectedType?.name
            : defaultSelectedType,
        // typeof selectedType === "object" ? selectedType?.name : selectedType,
        collection: selectedCollection?.id ? selectedCollection?.id : null,
        is_sub_collection: selectedCollection?.id ? true : false,
        shortDescription: shortDescription,
        otherSupportedMediaTypes: mapped,
        siteConfig: {
          headerType: "default",
          headerPosition: "center",
          isHeaderSticky: true,
          pagesItems: [],
          showBreadcrumbs: true,
          showSearchButton: true,
          showCurateitWatermark: true,
          showLoginButton: true,
          showSignUpButton: true,
        },
      };

      if (selectedCollection?.id) {
        isSharedCollection = getAllLevelCollectionPermissions(
          sharedCollections,
          Number(selectedCollection?.id)
        );
        if (isSharedCollection) {
          payload = {
            ...payload,
            author: isSharedCollection?.data?.author?.id,
          };
        }
      }

      const isParent = selectedCollection?.id ? false : true;

      const res = await dispatch(
        createCollection(payload, selectedTags, isSharedCollection, isParent)
      );
      if (res.error === undefined) {
        if (selectedCollection?.id) {
          if (!isSharedCollection) {
            const dropObj = getCollectionById(
              collectionsAndItsCount,
              selectedCollection?.id
            );
            const dragObj = {
              ...res.payload.data.data,
              folders: [],
              collection: dropObj,
              tags: selectedTags,
              gems_count: 0,
            };
            dispatch(
              collectionMove(
                res.payload.data.data.id,
                selectedCollection?.id,
                dragObj,
                dropObj
              )
            );
            if(parentCollectionValue && parentCollectionValue?.collectionId){
              dispatch(addSubCollectionData(dragObj))
            }
            setButtonLoading(false);
            message.success(TextMessage.COLLECTION_CREATE_TEXT);
            resetValues();
            dispatch(openDrawer(""));
            dispatch(setParentCollectionData(null))
            return navigate.push(`/u/${session.username}/c/${res?.payload?.data?.data?.id}/${collectionName}/`)
          }
          if (isSharedCollection) {
            const dropObj = getCollectionById(
              collectionsAndItsCount,
              selectedCollection?.id
            );
            const dragObj = {
              ...res.payload.data.data,
              folders: [],
              collection: dropObj,
              tags: selectedTags,
              gems_count: 0,
            };
            dispatch(
              sharedCollectionMove(
                res.payload.data.data.id,
                selectedCollection?.id,
                dragObj
              )
            );
            if(parentCollectionValue && parentCollectionValue?.collectionId){
              dispatch(addSubCollectionData(dragObj))
            }
            setButtonLoading(false);
            message.success(TextMessage.COLLECTION_CREATE_TEXT);
            resetValues();
            dispatch(openDrawer(""));
            dispatch(setParentCollectionData(null))
            return navigate.push(`/u/${isSharedCollection?.data?.author?.id}/c/${res?.payload?.data?.data?.id}/${collectionName}/`)
          }
        } else {
          setButtonLoading(false);
          message.success(TextMessage.COLLECTION_CREATE_TEXT);
          resetValues();
          dispatch(openDrawer(""));
          tourStepsEnabled && dispatch(updateTourStepsData(3))
          tourStepsEnabled && dispatch(addBkFromPage({page: 'collection',value: collectionName,
                          collectionId: res?.payload?.data?.data?.id,
                        }))
          tourStepsEnabled && isMobileView && dispatch(setIsMobileSidebar(false))
          return navigate.push(`/u/${session.username}/c/${res?.payload?.data?.data?.id}/${collectionName}/`)
        }
      } else {
        setButtonLoading(false);
        // message.error(TextMessage.ERROR_TEXT);
        resetValues();
        dispatch(openDrawer(""));
      }

      return;
    }

    if (action === "edit") {
      if (!collectionName) {
        message.error("Please enter collection name");
        return;
      }
      if (collectionName?.toLowerCase() === "bio") {
        message.error("Bio collection name already taken.");
        return;
      }
      let isDuplicateName = false;
      let allCollections = getAllCollectionWithSub(allCollectionsData);
      allCollections.forEach((col) => {
        if (
          col?.name &&
          col.name.toLowerCase() === collectionName.toLowerCase() &&
          Number(id) !== col?.id
        ) {
          isDuplicateName = true;
          return false;
        }
      });

      if (isDuplicateName) {
        message.error(
          `${collectionName} already exist. Collection name must be unique.`
        );
        return;
      }

      if(!defaultSelectedType){
        message.error('Please select default media type')
        return;
      }

        let newTags = []
        const filtered = selectedTags.filter(item => typeof item.id === 'string');
        const filteredNumber = selectedTags.filter(item => typeof item.id === 'number');
        const tagNames = filtered?.map(item => item?.tag)
        if(tagNames && tagNames?.length>0){
          newTags = await updateTagsPromise(tagNames, userTags, tagNames?.length)
        }
        newTags=[...newTags,...filteredNumber]

        const filteredType = selectedType.filter((p) => {
          if (typeof p === "object" && p !== null) {
            return p.name !== defaultSelectedType;
          } else if (typeof p === "string") {
            return p !== defaultSelectedType;
          }
          return true; // handle any other types if necessary
        });

        const mapped = filteredType.map((item) => {
          if (typeof item === "object" && item !== null) {
            return item.name;
          } else if (typeof item === "string") {
            return item;
          }
          return null; // Handle other types if necessary
        });

      if (
        typeof selectedCollection === "string" &&
        selectedCollection.toLowerCase() === "parent folder"
      ) {
        const isSelectedCollectionShared = getAllLevelCollectionPermissions(
          sharedCollections,
          id
        );
        let bgObj = null;
        if (typeof backgroundCoverData === "object") {
          bgObj = {
            ...backgroundCoverData,
            size: coverSize,
          };
        }
        setButtonLoading(true);

        let payload = {
          name: collectionName,
          tags: newTags?.map((t) => {
            return t.id;
          }),
          author: session.userId,
          avatar:
            typeof avatarCoverDataEdit === "object"
              ? avatarCoverDataEdit
              : null,
          background: typeof bgObj === "object" ? bgObj : null,
          media_type:
            typeof defaultSelectedType === "object"
              ? defaultSelectedType?.name
              : defaultSelectedType,
          shortDescription: shortDescription,
          otherSupportedMediaTypes: mapped,
        };

        if (isSelectedCollectionShared) {
          payload = {
            ...payload,
            author: isSelectedCollectionShared?.data?.author?.id,
          };
          const res = await dispatch(
            updateCollection(id, payload, selectedTags)
          );

          if (res.error === undefined) {
            
            const data = getCollectionById(collectionsAndItsCount ? [...collectionsAndItsCount,...sharedCollections] : [],Number(id))
            const g = {
                ...data,
                ...res.payload.data.data.attributes,
                tags: selectedTags
            }
            dispatch(updateSharedCollection(id,g))
            setButtonLoading(false);
            setOpenDrawer(false);
            message.success(TextMessage.COLLECTION_UPDATE_TEXT);
            resetValues();
            setCollectionIcon(res?.payload?.data?.data?.attributes?.avatar);
            setTitle(collectionName);
            setCollectionCoverImage(res?.payload?.data?.data?.attributes?.background)
          } else {
            setButtonLoading(false);
            // message.error(TextMessage.ERROR_TEXT);
            resetValues();
            setOpenDrawer(false);
          }
          return;
        }

        if (!isSelectedCollectionShared) {
          const res = await dispatch(
            updateCollection(id, payload, selectedTags)
          );

          if (res.error === undefined) {
            setButtonLoading(false);
            setOpenDrawer(false);
            message.success(TextMessage.COLLECTION_UPDATE_TEXT);
            resetValues();
            setCollectionIcon(res?.payload?.data?.data?.attributes?.avatar);
            setTitle(collectionName);
            setCollectionCoverImage(res?.payload?.data?.data?.attributes?.background)
          } else {
            setButtonLoading(false);
            // message.error(TextMessage.ERROR_TEXT);
            resetValues();
            setOpenDrawer(false);
          }
          return;
        }

        return;
      }

      if (
        typeof selectedCollection === "string" &&
        selectedCollection.toLowerCase() === "make it parent folder"
      ) {
        const isSelectedCollectionShared = getAllLevelCollectionPermissions(
          sharedCollections,
          id
        );
        
        if (isSelectedCollectionShared) {
          message.error(`You cant move shared collection to parent folder`);
          return;
        }
        let bgObj = null;
        if (typeof backgroundCoverData === "object") {
          bgObj = {
            ...backgroundCoverData,
            size: coverSize,
          };
        }
        setButtonLoading(true);
        const payload = {
          name: collectionName,
          tags: newTags?.map((t) => {
            return t.id;
          }),
          author: session.userId,
          avatar:
            typeof avatarCoverDataEdit === "object"
              ? avatarCoverDataEdit
              : null,
          background: typeof bgObj === "object" ? bgObj : null,
          media_type:
            typeof defaultSelectedType === "object"
              ? defaultSelectedType?.name
              : defaultSelectedType,
          shortDescription: shortDescription,
          otherSupportedMediaTypes: mapped,
        };

        const res = await dispatch(updateCollection(id, payload, selectedTags));

        if (res.error === undefined) {
          if (!isSelectedCollectionShared) {
            const data = getCollectionById(collectionsAndItsCount ? [...collectionsAndItsCount,...sharedCollections] : [],Number(id))
            const dragObj = {
              ...data,
              ...res.payload.data.data.attributes,
              tags: selectedTags,
            };
            await dispatch(moveToRoot(id, dragObj));
            setButtonLoading(false);
            message.success(TextMessage.COLLECTION_UPDATE_TEXT);
            resetValues();
            setOpenDrawer(false);
            setTitle(collectionName);
            setCollectionCoverImage(res?.payload?.data?.data?.attributes?.background)
            setCollectionIcon(res?.payload?.data?.data?.attributes?.avatar);
            return;
          }
        } else {
          setButtonLoading(false);
          // message.error(TextMessage.ERROR_TEXT);
          resetValues();
          setOpenDrawer(false);
        }
        return;
      }

      if (
        typeof selectedCollection === "object" &&
        selectedCollection.id === (singleCollectionDetails?.collection?.id || singleCollectionDetails?.collection?.data?.id)
      ) {
        const isSelectedCollectionShared = getAllLevelCollectionPermissions(
          sharedCollections,
          id
        );
        let bgObj = null;
        if (typeof backgroundCoverData === "object") {
          bgObj = {
            ...backgroundCoverData,
            size: coverSize,
          };
        }
        setButtonLoading(true);
        let payload = {
          name: collectionName,
          description: collectionDescription,
          tags: newTags?.map((t) => {
            return t.id;
          }),
          author: session.userId,
          avatar:
            typeof avatarCoverDataEdit === "object"
              ? avatarCoverDataEdit
              : null,
          background: typeof bgObj === "object" ? bgObj : null,
          media_type:
            typeof defaultSelectedType === "object"
              ? defaultSelectedType?.name
              : defaultSelectedType,
          shortDescription: shortDescription,
          otherSupportedMediaTypes: mapped,
        };

        if (!isSelectedCollectionShared) {
          const res = await dispatch(
            updateCollection(id, payload, selectedTags)
          );

          if (res.error === undefined) {
            setButtonLoading(false);
            setOpenDrawer(false);
            message.success(TextMessage.COLLECTION_UPDATE_TEXT);
            resetValues();
            setCollectionIcon(res?.payload?.data?.data?.attributes?.avatar);
            setTitle(collectionName);
            setCollectionCoverImage(res?.payload?.data?.data?.attributes?.background)
          } else {
            setButtonLoading(false);
            // message.error(TextMessage.ERROR_TEXT);
            resetValues();
            setOpenDrawer(false);
          }
        }

        if (isSelectedCollectionShared) {
          payload = {
            ...payload,
            author: isSelectedCollectionShared?.data?.author?.id,
          };
          const res = await dispatch(
            updateCollection(id, payload, selectedTags)
          );

          if (res.error === undefined) {
            const data = getCollectionById(collectionsAndItsCount ? [...collectionsAndItsCount,...sharedCollections] : [],Number(id))
            const g = {
              ...data,
              ...res.payload.data.data.attributes,
              tags: selectedTags
            }
            dispatch(updateSharedCollection(id,g))
            setButtonLoading(false);
            setOpenDrawer(false);
            message.success(TextMessage.COLLECTION_UPDATE_TEXT);
            resetValues();
            setCollectionIcon(res?.payload?.data?.data?.attributes?.avatar);
            setTitle(collectionName);
            setCollectionCoverImage(res?.payload?.data?.data?.attributes?.background)
          } else {
            setButtonLoading(false);
            // message.error(TextMessage.ERROR_TEXT);
            resetValues();
            setOpenDrawer(false);
          }
          return;
        }

        return;
      }

      if (
        typeof selectedCollection == "object" &&
        selectedCollection?.id !==
          (singleCollectionDetails?.collection?.data?.id || singleCollectionDetails?.collection?.id ||
            singleCollectionDetails?.id)
      ) {
        const isSelectedCollectionShared = getAllLevelCollectionPermissions(
          sharedCollections,
          selectedCollection.id
        );

        if (isSelectedCollectionShared && isCurrentCollectionShared) {
          message.error(
            `You cant move shared collection to other shared collection`
          );
          return;
        }
        let bgObj = null;
        if (typeof backgroundCoverData === "object") {
          bgObj = {
            ...backgroundCoverData,
            size: coverSize,
          };
        }
        setButtonLoading(true);
        let payload = {
          name: collectionName,
          description: collectionDescription,
          tags: newTags?.map((t) => {
            return t.id;
          }),
          author: session.userId,
          avatar:
            typeof avatarCoverDataEdit === "object"
              ? avatarCoverDataEdit
              : null,
          background: typeof bgObj === "object" ? bgObj : null,
          media_type:
            typeof defaultSelectedType === "object"
              ? defaultSelectedType?.name
              : defaultSelectedType,
          shortDescription: shortDescription,
          otherSupportedMediaTypes: mapped,
        };

        if (isSelectedCollectionShared && !isCurrentCollectionShared) {
          const data = getCollectionById(collectionsAndItsCount ? [...collectionsAndItsCount,...sharedCollections] : [],Number(id))
            const dropObj = getCollectionById(
              allCollectionsData,
              selectedCollection?.id
            );
            let dragObj = {
              ...data,
              collection: { ...dropObj },
              is_sub_collection: true,
              tags:selectedTags,
            };
            const res = await dispatch(
              moveCollectionShared(
                Number(id),
                selectedCollection?.id,
                dragObj,
                "moveOwnToShare"
              )
            );
            if(res.error === undefined){
              payload = {
                ...payload,
                author: isSelectedCollectionShared?.data?.author?.id,
                collection: selectedCollection?.id
              }
              await dispatch(updateCollection(id, payload, selectedTags));
              setOpenDrawer(false);
              setButtonLoading(false);
              setCollectionIcon(res?.payload?.data?.data?.attributes?.avatar);
              message.success(TextMessage.COLLECTION_UPDATE_TEXT);
              setCollectionCoverImage(res?.payload?.data?.data?.attributes?.background)
            }
            return;
        }

        const res = await dispatch(updateCollection(id, payload, selectedTags));

        if (res.error === undefined) {
          const data = getCollectionById(collectionsAndItsCount ? [...collectionsAndItsCount,...sharedCollections] : [],Number(id))
          setTitle(collectionName);
          let dragObj = {
            ...data,
            ...res.payload.data.data.attributes,
            tags: selectedTags,
          };

          if (!isSelectedCollectionShared) {
            const dropObj = getCollectionById(
              allCollectionsData,
              selectedCollection?.id
            );
            await dispatch(
              moveCollection(
                Number(id),
                selectedCollection?.id,
                dragObj,
                dropObj
              )
            );
            setOpenDrawer(false);
            setButtonLoading(false);
            message.success(TextMessage.COLLECTION_UPDATE_TEXT);
            resetValues();
            setCollectionIcon(res?.payload?.data?.data?.attributes?.avatar);
            setCollectionCoverImage(res?.payload?.data?.data?.attributes?.background)
            return;
          }
        } else {
          setButtonLoading(false);
          // message.error(TextMessage.ERROR_TEXT);
          resetValues();
          setOpenDrawer(false);
        }
        return;
      }
    }
  };

  // const resetCancelValues = () => {
  //   if (action === "edit") {
  //     setSelectedEmoji(
  //       singleCollectionDetails?.avatar?.type === "emoji"
  //         ? singleCollectionDetails?.avatar?.icon
  //         : ""
  //     );
  //     setSelectedColor(
  //       singleCollectionDetails?.avatar?.type === "color"
  //         ? singleCollectionDetails?.avatar?.icon
  //         : ""
  //     );
  //     setSelectedImage(
  //       singleCollectionDetails?.avatar?.type === "image"
  //         ? singleCollectionDetails?.avatar?.icon
  //         : ""
  //     );
  //     setSelectedIcon(
  //       singleCollectionDetails?.avatar?.type === "icon"
  //         ? singleCollectionDetails?.avatar?.icon
  //         : ""
  //     );
  //     setOpen(false);
  //   } else {
  //     setSelectedEmoji(selectedEmoji);
  //     setSelectedColor(selectedColor);
  //     setSelectedImage(selectedImage);
  //     setSelectedIcon(selectedIcon);
  //     setOpen(false);
  //   }
  // };
  const handleRemoveCollection = async (id) => {
    const isSelectedCollectionShared = getAllLevelCollectionPermissions(
      sharedCollections,
      id
    );

    if (!isSelectedCollectionShared) {
      setButtonLoading(true);
      const res = await dispatch(deleteCollection(id));

      if (res.error === undefined) {
        message.success(TextMessage.COLLECTION_DELETE_TEXT);
        setButtonLoading(false);
        return navigate.push(`/u/${session.username}/all-bookmarks`);
      } else {
        setButtonLoading(false);
        // message.success(TextMessage.ERROR_TEXT);
      }
    }

    if (isSelectedCollectionShared?.accessType === "viewer") {
      message.error(
        "You dont have permission to delete this shared collection"
      );
      return;
    }

    if (isSelectedCollectionShared?.accessType === "editor") {
      setButtonLoading(true);
      const parsed = currentCollectionAccessType
        ? JSON.parse(currentCollectionAccessType?.data?.usersViaMail)
        : [];
      const userToken = parsed?.filter(
        (item) => {
          return (item?.members && item.members.findIndex((m) => m.id === Number(session?.userId)) !== -1) || item?.id === Number(session?.userId) }
      );
      const res = await dispatch(removeAccessEmail(userToken[0].token, id));

      if (res.error === undefined) {
        dispatch(removeSharedCollection(id));
        setButtonLoading(false);
        message.success("Access removed successfully");
        return navigate.push(`/u/${session.username}/all-bookmarks`);
      } else {
        setButtonLoading(false);
        // message.success(TextMessage.ERROR_TEXT);
      }
    }

    if (isSelectedCollectionShared?.accessType === "owner") {
      setButtonLoading(true);
      const res = await dispatch(
        deleteCollection(id, isSelectedCollectionShared)
      );

      if (res.error === undefined) {
        message.success(TextMessage.COLLECTION_DELETE_TEXT);
        setButtonLoading(false);
        return navigate.push(`/u/${session.username}/all-bookmarks`);
      } else {
        setButtonLoading(false);
        // message.success(TextMessage.ERROR_TEXT);
      }
    }
  };

  const onLayoutClick = () => {
    setShowCollectionInput(false);
    setShowTypeInput(false);
  };

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
      // setCollectionCoverImage("")
      // setCollectionCoverImageType("")
      setOpen(false);
      setCurrentTab("covers");
    }
    setCurrentThumbnail(thumbnail);
    setBackgroundCoverData(thumbnail);
    // setCollectionCoverImage(thumbnail.icon)
    // setCollectionCoverImageType(thumbnail.type)
    setOpen(false);
    setCurrentTab("covers");
    // action === "edit" && setCollectionCoverImage(thumbnail)
    // action === "edit" && setOpenDrawer(false)
  }

  // const handleRemoveIconModalSubmit = async () => {
  //   setLoadingImg(true);
  //   const payload = {
  //     avatar: null,
  //   };
  //   const res = await dispatch(updateCollection(id, payload));
  //   if (res.error === undefined) {
  //     setLoadingImg(false);
  //     setOpen(false);
  //     setSelectedEmoji("");
  //     setSelectedColor("");
  //     setSelectedImage("");
  //     setAvatarCoverDataEdit(null);
  //     setSelectedIcon("");
  //     setCollectionIcon("");
  //   }
  // };

  return (
    <div className="relative">
      <Drawer
        placement={isMobileView ? "bottom" : "right"}
        height={isMobileView ? "90%" : "inherit"}
        width={isMobileView ? "90%" : "460px"}
        title={title}
        onClose={() => {
          if (action === "edit") {
            navigate.push(pathname);
            setOpenDrawer(false);
            return;
          }
          dispatch(openDrawer(""));
          dispatch(setParentCollectionData(null));
        }}
        open={open}
        maskClosable={isMobileView ? true : false}
        bodyStyle={{
          padding: action !== "create" && isMobileView ? "24px 8px" : "24px",
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
                dispatch(openDrawer(""));
                dispatch(setParentCollectionData(null));
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
              id={"tour-collection-save-button"}
            >
              {buttonLoading ? "Loading" : "Save"}
            </Button>
          </Space>
        }
      >
        {loading && (
          <div className="spinDiv">
            <Spin size="middle" tip="Loading..." />
          </div>
        )}

        {!loading && action === "create" && (
          <div className="grid grid-cols-8 gap-2" onClick={onLayoutClick}>
            {renderThumbnail()}
            <div className="col-span-7">
              <Input
                size="medium w-full mb-2"
                type="text"
                name="title"
                placeholder="Enter collection name"
                value={collectionName || ""}
                onChange={(e) => setCollectionName(e.target.value)}
                id="tour-collection-name-input"
              />

              <div className="pt-6 flex justify-between space-x-2">
                <div
                  className={classNames("flex-1", showTypeInput && "hidden")}
                >
                  <h6 className="block text-xs font-medium text-gray-500 mb-1">
                    Parent collection
                  </h6>
                  <div
                    className="relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      onClick={() => setShowCollectionInput(true)}
                      className="w-full"
                    >
                      <ParentComboBox
                        inputShown={showCollectionInput}
                        setShowCollectionInput={setShowCollectionInput}
                        collectionData={allCollectionsData || []}
                        userId={session.userId}
                        setSelectedCollection={setSelectedCollection}
                        selectedCollection={selectedCollection}
                        action={"create"}
                        disabled={
                          parentCollectionValue &&
                          parentCollectionValue?.collectionId
                        }
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
                      <MultiSelectTypeComboBox
                        inputShown={showTypeInput}
                        setShowTypeInput={setShowTypeInput}
                        updateInputShow={setShowTypeInput}
                        setSelectedType={setSelectedType}
                        // type={selectedType}
                        selectedType={selectedType}
                        action={action}
                        defaultSelectedType={defaultSelectedType}
                        setDefaultSelectedType={setDefaultSelectedType}
                        otherSelectedType={otherSelectedType}
                        setOtherSelectedType={setOtherSelectedType}
                        handleDefaultType={handleDefaultType}
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

              <div className="pt-4">
                <h6 className="block text-xs font-medium text-gray-500 mb-1">
                  Tags
                </h6>
                <div className="bg-white border-2 border-gary-400 p-2 rounded-lg">
                  <ReactTags
                    tags={selectedTags?.map((t) => {
                      return {
                        id: t?.attributes?.tag || t?.tag,
                        text: t?.attributes?.tag || t?.tag,
                      };
                    })}
                    suggestions={prepareTags()}
                    delimiters={[KEY_CODES.enter, KEY_CODES.comma]}
                    handleDelete={onTagDelete}
                    handleAddition={onTagAdd}
                    inputFieldPosition="bottom"
                    placeholder="Enter Tag"
                    onClearAll={() => setSelectedTags([])}
                    clearAll
                    autocomplete
                  />
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
                    siteImages={existingThumbnails || []}
                    isBlogType={true}
                    setCoverSize={setCoverSize}
                    coverSize={coverSize}
                    action={action}
                  />
                </div>
              )}

              {/* {openModal && (
                <div>
                  <DialogModal
                    open={openModal}
                    setOpen={setOpen}
                    handleEmoji={handleEmoji}
                    handleColor={handleColor}
                    handleImageUploadChange={handleImageUploadChange}
                    selectedEmoji={selectedEmoji}
                    selectedColor={selectedColor}
                    setSelectedEmoji={setSelectedEmoji}
                    setSelectedColor={setSelectedColor}
                    handleCoverModalSubmit={handleCoverModalSubmit}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    resetCancelValues={resetCancelValues}
                    loadingImg={loadingImg}
                    handleIcon={handleIcon}
                    selectedIcon={selectedIcon}
                    action="create"
                  />
                </div>
              )} */}
            </div>
          </div>
        )}

        {!loading && action === "edit" && (
          <>
            <div className="grid grid-cols-8 gap-2" onClick={onLayoutClick}>
              {renderThumbnailEdit()}
              <div className="col-span-7">
                <Input
                  size="medium w-full mb-2"
                  type="text"
                  name="title"
                  placeholder="Enter collection name"
                  value={collectionName || ""}
                  onChange={(e) => setCollectionName(e.target.value)}
                />

                <div className="pt-6 flex justify-between space-x-2">
                  <div
                    className={classNames("flex-1", showTypeInput && "hidden")}
                  >
                    <h6 className="block text-xs font-medium text-gray-500 mb-1">
                      Parent collection
                    </h6>
                    <div
                      className="relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        onClick={() => setShowCollectionInput(true)}
                        className="w-full"
                      >
                        <ParentComboBox
                          inputShown={showCollectionInput}
                          setShowCollectionInput={setShowCollectionInput}
                          collectionData={allCollectionsData || []}
                          userId={session.userId}
                          setSelectedCollection={setSelectedCollection}
                          selectedCollection={selectedCollection}
                          action="edit"
                          isSubCollection={isSubCollection}
                          id={id}
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
                        <MultiSelectTypeComboBox
                        inputShown={showTypeInput}
                        setShowTypeInput={setShowTypeInput}
                        updateInputShow={setShowTypeInput}
                        setSelectedType={setSelectedType}
                        // type={selectedType}
                        selectedType={selectedType}
                        action={action}
                        defaultSelectedType={defaultSelectedType}
                        setDefaultSelectedType={setDefaultSelectedType}
                        otherSelectedType={otherSelectedType}
                        setOtherSelectedType={setOtherSelectedType}
                        handleDefaultType={handleDefaultType}
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

                <div className="pt-4">
                  <h6 className="block text-xs font-medium text-gray-500 mb-1">
                    Tags
                  </h6>
                  <div className="bg-white border-2 border-gary-400 p-2 rounded-lg">
                    <ReactTags
                      tags={selectedTags?.map((t) => {
                        return {
                          id: t?.attributes?.tag || t?.tag,
                          text: t?.attributes?.tag || t?.tag,
                        };
                      })}
                      suggestions={prepareTags()}
                      delimiters={[KEY_CODES.enter, KEY_CODES.comma]}
                      handleDelete={onTagDelete}
                      handleAddition={onTagAdd}
                      inputFieldPosition="bottom"
                      placeholder="Enter Tag"
                      onClearAll={() => setSelectedTags([])}
                      clearAll
                      autocomplete
                    />
                  </div>
                </div>
                <div className="flex px-1 mt-2 items-center justify-between">
                  <Checkbox
                    onChange={(e) => handleTextEditor(e.target.checked)}
                    checked={showTextEditor}
                  >
                    <span className="text-gray-500 font-medium text-sm">
                      Show description
                    </span>
                  </Checkbox>
                </div>

                <div className="pt-4 flex items-center justify-between w-full">
                  <div
                    className="text-[#1890ff] font-medium cursor-pointer"
                    onClick={() => {
                      setOpenShareCollWithDrawer(!openShareCollWithDrawer);
                      setShowDeleteConfirm(false);
                    }}
                  >
                    Share collection
                  </div>
                  {collectionName?.toLowerCase() === "unfiltered" ||
                  currentCollectionAccessType?.accessType === "viewer" ? (
                    ""
                  ) : (
                    <div
                      onClick={() => {
                        setShowDeleteConfirm(true);
                        setOpenShareCollWithDrawer(true);
                      }}
                      className="text-[#EB5757] font-medium cursor-pointer"
                    >
                      Remove collection
                    </div>
                  )}
                </div>
                {showDeleteConfirm && (
                  <div className="pt-4 fixed bottom-[60px]">
                    <div className="font-medium">Confirm Delete?</div>
                    <div className="flex items-center mt-1">
                      <Button
                        onClick={() => handleRemoveCollection(id)}
                        danger
                        type="primary"
                        disabled={buttonLoading}
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
                      siteImages={existingThumbnails || []}
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

                {/* {openModal && (
                  <DialogModal
                    open={openModal}
                    setOpen={setOpen}
                    handleEmoji={handleEmoji}
                    handleColor={handleColor}
                    handleImageUploadChange={handleImageUploadChange}
                    selectedEmoji={selectedEmoji}
                    selectedColor={selectedColor}
                    setSelectedEmoji={setSelectedEmoji}
                    setSelectedColor={setSelectedColor}
                    handleCoverModalSubmit={handleCoverModalSubmit}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    resetCancelValues={resetCancelValues}
                    loadingImg={loadingImg}
                    handleIcon={handleIcon}
                    selectedIcon={selectedIcon}
                    handleRemoveIconModalSubmit={handleRemoveIconModalSubmit}
                  />
                )} */}
              </div>
            </div>
            {!openShareCollWithDrawer && (
              <div className="relative">
                <div className="pointer-ui"></div>
                <div className="mt-4 border border-solid border-[#DADEE8] rounded-[6px] p-2 relative">
                  <ShareCollectionDrawer
                    openDrawer={false}
                    singleCollectionDetails={shareCollectionDetails}
                    collectionId={Number(id)}
                    openShareCollWithDrawer={openShareCollWithDrawer}
                    existingThumbnails={existingThumbnails}
                    collectionName={collectionName}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </Drawer>
    </div>
  );
};

export default CollectionDrawer;
