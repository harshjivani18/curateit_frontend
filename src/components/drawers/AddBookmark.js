"use client";

import {
  Button,
  Drawer,
  Select,
  Space,
  Spin,
  message,
  Input as AntInput,
  Dropdown,
  DatePicker,
  Checkbox as AntCheckbox,
  Collapse,
  Rate,
  Radio,
  Tooltip,
  Switch,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { WithContext as ReactTags } from "react-tag-input";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import moment from "moment";
import {
  GlobeAltIcon,
  InformationCircleIcon,
  LockClosedIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { BlockPicker } from "react-color";
import { IoColorPaletteOutline, IoRefresh } from "react-icons/io5";
import TextareaAutosize from "react-textarea-autosize";
import { MdOutlineArrowDropDown, MdOutlineArrowRight } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { PiUploadSimpleLight } from "react-icons/pi";
// import { useRouter } from "next/router"

// import slugify from "slugify";

import Input from "@components/collectionCombobox/Input";
import TypeComboBox from "@components/collectionCombobox/TypeComboBox";
import ComboBox from "@components/collectionCombobox/ComboBox";
// import DialogModal from "@components/modal/Dialog";
import FavIconComponent from "@components/common/FavIconComponent";
import ProfileSocialTextField from "@components/common/ProfileSocialTextField";
import ImageModal from "@components/modal/ImageModal";
import FavIcon from "@components/common/bookmarkComponents/FavIcon";
import MediaTypeUI from "@components/common/bookmarkComponents/MediaTypeUI";
import BookmarkOptionComponent from "@components/common/bookmarkComponents/BookmarkOptionComponent";
import TutorialVideoModal from "@components/modal/TutorialVideoModal";

import { updateTagsPromise } from "@utils/update-tags";
import { removeDuplicates } from "@utils/equalChecks";
import {
  HIGHLIGHTED_COLORS,
  KEY_CODES,
  MONTHNAMES,
  TextMessage,
  // countriesCurreny,
  copyText,
  normalizeUrl,
  getPlatformFromURL,
} from "@utils/constants";
import {
  checkBookmarkExists,
  getAllCollectionWithSub,
  getAllLevelCollectionPermissions,
} from "@utils/find-collection-id";
import session from "@utils/session";
import { getHandWUnitsTitle, getProfileUrl } from "@utils/commonFunctions";
import { getAllSiteImages } from "@utils/take-screenshot-site-images";
import { Validator } from "@utils/validations";

import { getPlanService } from "@actions/plan-service";
import { getUserDetails, updateUser } from "@actions/user";
import {
  createBlog,
  fetchDomainDetails,
  updateFilterCount,
} from "@actions/gems";
import { addTagCount } from "@actions/tags";
import {
  addCollectionCount,
  addGemToSharedCollection,
  getCustomFields,
  uploadScreenshots,
} from "@actions/collection";
import {
  addBkFromPage,
  openDrawer,
  setBookmarkletValue,
  setIsMobileSidebar,
  setShowUrlInputFromTourSteps,
  updateTourStepsData,
} from "@actions/app";
import {
  addCode,
  addCodePublic,
  addGem,
  addGemPublic,
  addImage,
  addImagePublic,
  createAudio,
  createAudioPublic,
  createPdf,
  createPdfPublic,
  createVideo,
  createVideoPublic,
  fetchPlatformTypeFromUrl,
  gemAdded,
  getBookmarkDetailsMicrolink,
  getSearchBooks,
  getSearchMovies,
  getSelectedBook,
  getSelectedMovie,
  uploadAllTypeFileInS3,
} from "@actions/bookmark";
import { BsInfoCircle } from "react-icons/bs";
import { AI_SITES, PROMPT_CATEGORY } from "@utils/ai-options";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Option = Select;
const { Panel } = Collapse;

const AddBookmark = ({
  open,
  setOpen = () => {},
  onClose = null,
  onSaveAndClose = null,
  page = "",
  blocksLength = "",
  setBlocks,
  blocks,
  selectedMediaType = "",
  selectedNoteType = "",
  selectedFileType = "",
  screenWidth = "",
  selectedPlatform = "",
  setSocialLinks = () => {},
  socialLinks,
  setSelectedPlatform = () => {},
  setSelectedMediaType = () => {},
  setSelectedFileType = () => {},
  selectedProfileType = "",
  setSelectedProfileType = () => {},
  selectedCollectionValue = "",
  isLoggedIn = false,
  isTypeAiPrompt = false,
  otherMediatypes = [],
}) => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const {
    singleBookmarkGem,
    collectionsAndItsCount,
    sharedCollections,
    customFields,
    followedCollections,
  } = useSelector((state) => state.collections);
  const { userTags } = useSelector((state) => state.users);
  const {
    isMobileView,
    addBkPage,
    tourStepsEnabled,
    showUrlInputFromTourSteps,
    isFromWelcomeModal,
    bookmarklet,
  } = useSelector((state) => state.app);
  const { tagsWithGemsCount } = useSelector((state) => state.tags);

  const imageRef = useRef();
  const favImageRef = useRef();

  const [showTypeInput, setShowTypeInput] = useState(false);
  const [showCollectionInput, setShowCollectionInput] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assetUrl, setAssetUrl] = useState(
    tourStepsEnabled && isFromWelcomeModal ? "curateit.com" : ""
  );
  const [remarks, setRemarks] = useState("");

  const [covers, setCovers] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imgSpinner, setImgSpinner] = useState(false);
  const [favImgSpinner, setFavImgSpinner] = useState(false);
  const [error, setError] = useState(false);
  const [fileType, setFileType] = useState("url");
  const [fetchingSiteInfo, setFetchingSiteInfo] = useState(false);
  const [tabIcon, setTabIcon] = useState("");

  const [selectedCollection, setSelectedCollection] = useState({
    id: "",
    name: "",
  });
  const [selectedType, setSelectedType] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [enableSites, setEnableSites] = useState(true);
  const [prioritySites, setPrioritySites] = useState([]);
  const [prioritySelectSearchQr, setPrioritySelectSearchQr] = useState("");
  // mediatype states
  //highlights,text,notes etc
  const defaultColorObjIdx = HIGHLIGHTED_COLORS.findIndex((h) => {
    return h.id === 4;
  });
  const [highlightedText, setHighlightedText] = useState("");
  const [highlightedColor, setHighlightedColor] = useState(
    HIGHLIGHTED_COLORS[defaultColorObjIdx]
  );
  const [highlightClass, setHighlightClass] = useState("");
  // images
  const [imageSrc, setImageSrc] = useState("");
  //audip
  const [audioSrc, setAudioSrc] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const [code, setCode] = useState("");
  const [codeLanguage, setCodeLanguage] = useState("Javascript");
  const [pdfSrc, setPdfSrc] = useState("");
  const [screenshotImageSrc, setScreenshotImageSrc] = useState("");
  const [tweetType, setTweetType] = useState("");
  const [platformType, setPlatformType] = useState("Twitter");

  const [citationText, setCitationText] = useState("");
  const [credibility, setCredibility] = useState("low");
  const [citationAuthor, setCitationAuthor] = useState("");
  const [citationDate, setCitationDate] = useState("");
  const [citation, setCitation] = useState(null);
  const [fetching, setFetching] = useState(false);

  const [htmlText, setHtmlText] = useState("");
  const [plainText, setPlainText] = useState("");
  const [shortendurl, setShortendurl] = useState("");

  const [productPrice, setProductPrice] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [isReaded, setIsReaded] = useState("to Read");
  const [searchBooks, setSearchBooks] = useState();
  const [searchMovies, setSearchMovies] = useState();
  const [loadingBookMovie, setLoadingBookMovie] = useState(false);
  const [promptCategory, setPromptCategory] = useState(null);

  //pdf,audio,video
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFilename, setPDFFileName] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [testimonialAuthor, setTestimonialAuthor] = useState("");
  const [testimonialTagLine, setTestimonialTagLine] = useState("");
  const [testimonialProduct, setTestimonialProduct] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [testimonialAttachImage, setTestimonialAttachImage] = useState("");
  const [testimonialUrl, setTestimonialUrl] = useState("");
  const [testimonialDate, setTestimonialDate] = useState("");
  const [testimonialRating, setTestimonialRating] = useState("");
  const [testimonialPlatform, setTestimonialPlatform] = useState("Globe");
  const [entityObj, setEntityObj] = useState("");
  const [rate, setRate] = useState(0);
  const [readStatus, setReadStatus] = useState("to-read");
  const [dateRead, setDateRead] = useState(moment().format("YYYY-MM-DD"));
  const [watchStatus, setWatchStatus] = useState("to-watch");

  const [allCollections, setAllCollections] = useState([]);
  const [favIconSrc, setFavIconSrc] = useState(null);
  const [profileContactTitle, setProfileContactTitle] = useState(
    `Subscribe to ${session?.username}`
  );
  const [profileContactDescription, setProfileContactDescription] = useState(
    "Sign up to get exclusive email updates directly from me."
  );

  //favicon
  // const [openIconModal, setOpenIconModal] = useState(false)
  // const [selectedEmoji, setSelectedEmoji] = useState("");
  // const [selectedColor, setSelectedColor] = useState('')
  // const [selectedImage, setSelectedImage] = useState('')
  // const [selectedIcon, setSelectedIcon] = useState('')
  // const [loadingImg, setLoadingImg] = useState(false)
  const [defaultFavIconSrc, setDefaultFavIconSrc] = useState(null);
  const [html, setHtml] = useState(null);
  const [socialUserName, setSocialUsername] = useState("");
  // media type notes state
  const [audioEnhancedText, setAudioEnhancedText] = useState("");
  const [audioOriginalText, setAudioOriginalText] = useState("");
  //bio-contact
  const [openDropdown, setOpenDropdown] = useState(false);
  const [bioContactFields, setBioContactFields] = useState([
    { name: "First Name", key: "firstName" },
    { name: "Last Name", key: "lastName" },
    { name: "Email", key: "email" },
  ]);
  const [loadingCustomFields, setLoadingCustomFields] = useState(false);
  // audio type state
  const [audioRecordSrc, setAudioRecordSrc] = useState("");

  const [customPropertyWithoutAnswer, setCustomPropertyWithoutAnswer] =
    useState([]);

  const [availableFields, setAvailableFields] = useState([
    { name: "Phone Number", key: "phoneNumber" },
  ]);

  const [currentThumbnail, setCurrentThumbnail] = useState("");
  const [defaultThumbnailImg, setDefaultThumbnailImg] = useState("");
  const [currentIcon, setCurrentIcon] = useState("");
  const [docImages, setDocImages] = useState([]);
  const [openImageDialogTab, setCurrentImageTab] = useState(null);
  const [isOpenImageDialog, setIsOpenImageDialog] = useState(false);
  const [ribbon, setRibbon] = useState({ text: "", color: "" });
  const [showRibbonPicker, setShowRibbonPicker] = useState(false);
  const [isPublicPrompt, setIsPublicPrompt] = useState("private");
  const [articleObj, setArticleObj] = useState(null);
  //new
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);

  const [showAssetUrlInput, setShowAssetUrlInput] = useState(false);
  const [showShortEndInput, setShowShortEndInput] = useState(false);
  const [showBookSearchInput, setShowBookSearchInput] = useState(false);
  const [showMovieSearchInput, setShowMovieSearchInput] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [collapseKeys, setCollapseKeys] = useState([]);
  const [showPromptEditor, setShowPromptEditor] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [testimonialType, setTestimonialType] = useState("");
  const [testimonialAvatarImage, setTestimonialAvatarImage] = useState("");
  const [testimonialAvatarImageSrc, setTestimonialAvatarImageSrc] =
    useState("");
  const [techStack, setTechStack] = useState([]);
  const [promptType, setPromptType] = useState("private");
  const [textExtract, setTextExtract] = useState("");
  const [openTutorialVideoModal, setOpenTutorialVideoModal] = useState(false);
  // const [isPublicPrompt, setIsPublicPrompt] = useState("private")

  useEffect(() => {
    if (tourStepsEnabled && showUrlInputFromTourSteps) {
      setShowAssetUrlInput(true);
    }
    if (tourStepsEnabled && !showUrlInputFromTourSteps) {
      setShowAssetUrlInput(false);
    }
  }, [tourStepsEnabled, showUrlInputFromTourSteps]);

  const handleOpenDropdown = (flag) => {
    setOpenDropdown(flag);
  };

  useEffect(() => {
    let collsArr = [];
    if (sharedCollections && sharedCollections.length > 0) {
      const filtered = sharedCollections?.filter(
        (item) => item?.accessType !== "viewer"
      );
      collsArr = collectionsAndItsCount
        ? [...collectionsAndItsCount, ...filtered]
        : [...filtered];
    } else {
      collsArr = collectionsAndItsCount ? [...collectionsAndItsCount] : [];
    }

    if (followedCollections?.length !== 0) {
      collsArr = [...collsArr, ...followedCollections];
    }
    setAllCollections(collsArr);
    page !== "public" && dispatch(getUserDetails());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sharedCollections, collectionsAndItsCount, followedCollections]);

  useEffect(() => {
    if (addBkPage && addBkPage?.page === "collection") {
      const filtered = sharedCollections?.filter(
        (item) => item?.accessType !== "viewer"
      );
      let allColl = collectionsAndItsCount
        ? [...collectionsAndItsCount, ...filtered]
        : [];

      if (followedCollections.length !== 0) {
        allColl = [...allColl, ...followedCollections];
      }

      let allCollections = [...allColl, ...getAllCollectionWithSub(allColl)];
      const uniqueData = allCollections.filter(
        (value, index, self) =>
          index === self.findIndex((v) => v.id === value.id)
      );
      const found = uniqueData?.filter(
        (item) =>
          item?.name?.toLowerCase() === addBkPage?.value?.toLowerCase() &&
          item.id === addBkPage?.collectionId
      );
      const mediaType = found[0]?.media_type || "Link";
      setSelectedType(mediaType);
      setSelectedCollection({ id: found[0]?.id, name: found[0]?.name });
      const tags =
        found[0]?.tags && found[0]?.tags?.length > 0 ? found[0]?.tags : [];
      setSelectedTags([...selectedTags, ...tags]);
      return;
    }

    if (addBkPage && addBkPage?.page === "filter") {
      setSelectedType(addBkPage?.value);
      setSelectedCollection({
        id: Number(session.unfiltered_collection_id),
        name: "Unfiltered",
      });
      return;
    }

    if (addBkPage && addBkPage?.page === "bookmark") {
      setSelectedType("Link");
      setSelectedCollection({
        id: Number(session.unfiltered_collection_id),
        name: "Unfiltered",
      });
      return;
    }

    if (addBkPage && addBkPage?.page === "tags") {
      const allTags = getAllCollectionWithSub(tagsWithGemsCount);
      const found = allTags?.filter(
        (item) => item?.tag?.toLowerCase() === addBkPage?.value?.toLowerCase()
      );
      setSelectedType(found[0]?.media_type || "Link");
      setSelectedCollection({
        id: Number(session.unfiltered_collection_id),
        name: "Unfiltered",
      });
      setSelectedTags([
        ...selectedTags,
        { id: found[0]?.id, tag: found[0]?.tag },
      ]);
      return;
    }

    if (!addBkPage && !page) {
      setSelectedCollection({
        id: Number(session.unfiltered_collection_id),
        name: "Unfiltered",
      });
      setSelectedType("Link");
    }

    if (!addBkPage && page === "bio" && selectedMediaType) {
      setSelectedCollection({ id: session.bio_collection_id, name: "Bio" });
      setSelectedType(selectedMediaType);
      if (selectedPlatform) {
        setPlatformType(selectedPlatform);
      } else {
        setPlatformType("");
      }
      if (selectedFileType) {
        setFileType(selectedFileType);
      } else {
        setFileType("url");
      }
    }

    if (!addBkPage && page === "public") {
      setSelectedCollection({
        id: selectedCollectionValue?.id || "",
        name: selectedCollectionValue?.name || "",
      });
      setSelectedType(selectedMediaType ? selectedMediaType : "Link");
    }

    if (page === "prompt-page") {
      setSelectedCollection({
        id: Number(session.unfiltered_collection_id),
        name: "Unfiltered",
      });
      setSelectedType("Ai Prompt");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addBkPage, page, selectedMediaType]);

  useEffect(() => {
    if (
      selectedCollection &&
      selectedCollection?.id &&
      page !== "public" &&
      page !== "bio"
    ) {
      const getcall = async () => {
        setLoadingCustomFields(true);
        const res = await dispatch(getCustomFields(selectedCollection?.id));
        if (res?.payload?.data && res?.payload?.data?.length > 0) {
          setCustomPropertyWithoutAnswer(
            res?.payload?.data[0]?.customFieldObj || []
          );
          setLoadingCustomFields(false);
        } else {
          setLoadingCustomFields(false);
        }
      };
      getcall();
    }
    // if(parseInt(selectedCollection?.id) === parseInt(process.env.NEXT_PUBLIC_AI_PROMPT_COLLECTION_ID)) {
    if (
      parseInt(selectedCollection?.id) === parseInt(session?.aiPromptLibraryId)
    ) {
      setPromptType("public");
    }
  }, [selectedCollection, page]);

  useEffect(() => {
    if (bookmarklet) {
      setAssetUrl(bookmarklet);
      const getCall = async () => {
        setDocImages(await getAllSiteImages(bookmarklet));
        fetchWebsiteDetails(bookmarklet);
      };

      getCall();
    }
  }, [bookmarklet]);

  let timer = null;

  // useEffect(() => {
  //     if(selectedType?.name === 'App' && assetUrl){
  //      const getCall = async () => {
  //       const res = await dispatch(fetchDomainDetails(assetUrl,false,true))

  //       setTechStack(res?.payload?.data?.technologystack || [])
  //      }

  //      getCall()
  //     }
  // },[selectedType,assetUrl])

  // const onThumbnailChangeClick = async (e) => {
  //     const { files } = e.target

  //     if (files.length !== 0 && checkValidFileTypes(files[0])) {
  //         let   res      = null
  //         const formData = new FormData()
  //         formData.append("files", files[0])
  //         setImgSpinner(true)
  //         res = await dispatch(uploadScreenshots(formData))
  //         setImgSpinner(false)
  //         if (res && res.error === undefined && res.payload.error === undefined) {
  //             const { data } = res.payload
  //             if (data) {
  //               const newCovers = [ ...data ]
  //               setCovers([ ...covers, ...data ])
  //               setImageUrl(newCovers.length > 0 ? newCovers[newCovers.length - 1] : "")
  //             }
  //             e.target.files = null
  //         }
  //     }
  //     else {
  //         message.error("Invalid file type!")
  //     }
  // }

  // for favicons
  // const handleEmoji = (emojiData) => {
  //     setSelectedEmoji(emojiData)
  //     setSelectedColor('')
  //     setSelectedImage('')
  //     setSelectedIcon('')
  // }

  // const handleColor = (newColor) => {
  //     setSelectedColor(newColor.hex);
  //     setSelectedEmoji('')
  //     setSelectedImage('')
  //     setSelectedIcon('')
  // }

  // const handleIcon = (iconName) => {
  //     setSelectedIcon(iconName)
  //     setSelectedColor('');
  //     setSelectedEmoji('')
  //     setSelectedImage('')
  // }

  // const handleIconImageUploadChange = async (files) => {
  //     const fileSize = files.size / 1024 / 1024; // Convert to MB
  //     if (fileSize > 5) {
  //         message.error(TextMessage.FILE_SIZE_ERROR);
  //         return
  //     }
  //     setSelectedImage(files)
  //     setSelectedColor('');
  //     setSelectedEmoji('')
  //     setSelectedIcon('')
  // };

  // const handleIconCoverModalSubmit = async () => {
  //     if(selectedImage){
  //         setLoadingImg(true)
  //         const formData = new FormData();

  //         formData.append('file',selectedImage)

  //         const res = await dispatch(uploadIcons(formData))

  //         if(res.error === undefined){
  //             setLoadingImg(false)
  //             setSelectedImage('')
  //             setFavIconSrc({
  //                 icon: res.payload?.data?.message || '',
  //                 type: 'image'
  //             })
  //             setOpenIconModal(false)
  //         }else{
  //             setLoadingImg(false)
  //             setSelectedImage('')
  //             setOpen(false)
  //             setFavIconSrc('')
  //         }

  //         return;
  //         }

  //         if(selectedColor){
  //             setFavIconSrc({
  //                     icon: selectedColor || '',
  //                     type: 'color'
  //                 })
  //             setOpenIconModal(false)
  //             return;
  //         }

  //         if(selectedEmoji){
  //             setFavIconSrc({
  //                     icon: selectedEmoji.unified || '',
  //                     type: 'emoji'
  //                 })
  //             setOpenIconModal(false)
  //             return;
  //         }

  //         if(selectedIcon){
  //             setFavIconSrc({
  //                     icon: selectedIcon,
  //                     type: 'icon'
  //                 })
  //             setOpenIconModal(false)
  //             return;
  //         }
  // }

  // const resetCancelValues = () => {
  //     setSelectedEmoji(favIconSrc?.type === 'emoji' ? favIconSrc?.icon : '')
  //     setSelectedColor(favIconSrc?.type === 'color' ? favIconSrc?.icon : '')
  //     setSelectedImage(favIconSrc?.type === 'image' ? favIconSrc?.icon : '')
  //     setSelectedIcon(favIconSrc?.type === 'icon' ? favIconSrc?.icon : '')
  //     setOpenIconModal(false)
  // }

  // const handleRemoveIconModalSubmit = async () => {
  //     setSelectedColor('')
  //     setSelectedEmoji('')
  //     setSelectedIcon('')
  //     setSelectedImage('')
  //     setFavIconSrc('')
  //     setOpenIconModal(false)
  // }

  const onOpenImageDialog = (tab) => {
    if (
      assetUrl === "" &&
      selectedType?.name !== "Blog" &&
      selectedType?.name !== "Ai Prompt" &&
      selectedType?.name !== "Text Expander" &&
      fileType !== "file"
    ) {
      message.error("Please enter url first");
      return;
    }
    setCurrentImageTab(tab);
    setIsOpenImageDialog(true);
  };

  const onImageDialogClose = () => {
    setCurrentImageTab(null);
    setIsOpenImageDialog(false);
  };

  const onThumbnailSelect = (src) => {
    if (src === null) {
      setCovers([]);
      setImageUrl("");
      setCurrentThumbnail("");
      setIsOpenImageDialog(false);
      return;
    }
    const newDocImages = [...docImages];
    const idx = newDocImages.findIndex((c) => {
      return c === src;
    });
    if (idx !== -1) {
      newDocImages.splice(idx, 1);
    }
    setDocImages([src, ...newDocImages]);
    setCurrentThumbnail(src);
    setCovers([src, ...covers]);
    setImageUrl(src);
    setIsOpenImageDialog(false);
  };

  const onIconSelect = (iconObj) => {
    if (iconObj === null) {
      setFavIconSrc(null);
      setCurrentIcon("");
      setIsOpenImageDialog(false);
      return;
    }
    setCurrentIcon(iconObj);
    setFavIconSrc(iconObj);
    setIsOpenImageDialog(false);
  };

  const renderThumbnail = () => {
    return (
      <div>
        <div
          className={`bg-white ${
            isMobileView ? "w-fit" : "w-[48px]"
          } h-[48px] rounded-lg pointer text-center`}
          onClick={() => onOpenImageDialog("thumbnail")}
        >
          {imgSpinner && <Spin className="mt-5" />}
          {imageUrl && imageUrl !== "" ? (
            <img
              className={`${
                isMobileView ? "w-[40px]" : "w-[48px]"
              } h-[48px] rounded-lg`}
              src={imageUrl}
              alt={title || "Curateit"}
            />
          ) : (
            <img
              className="w-[40px] h-[40px] rounded-lg fit-image"
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/default-img-paceholder.png`}
              alt={"Curateit"}
            />
          )}
        </div>
        {/* <div onClick={() => imageRef.current.click()} className={`${isMobileView ? 'w-[30px]' : 'w-[48px]'} py-[2px] bg-white flex justify-center align-middle border-2 border-gray-300 rounded-sm my-2 cursor-pointer`}>
                <img src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/image-up.svg`} alt="up icon" className="h-[18px]" />
              </div>
              <input className='hidden' ref={imageRef} onChange={onThumbnailChangeClick} onError={(err)=>message.error(err)} type="file" name="bookmark-image" id="bookmark-image" accept="image/png, image/jpeg" /> */}
        {/* favicon */}
        {favImgSpinner && <Spin className="mt-5" />}
        <div className="mt-5" onClick={() => onOpenImageDialog("favicon")}>
          <FavIconComponent
            data={
              favIconSrc || {
                type: "image",
                icon: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/default-emoji-placeholder.png`,
              }
            }
          />
        </div>
        {/* <div onClick={() => setOpenIconModal(true)} className={`${isMobileView ? 'w-[30px]' : 'w-[48px]'} py-[2px] bg-white flex justify-center align-middle border-2 border-gray-300 rounded-sm my-2 cursor-pointer`}>
                <img src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/image-up.svg`} alt="up icon" className="h-[18px]" />
              </div> */}
      </div>
    );
  };

  const prepareTags = () => {
    const tagArr = [];
    userTags.forEach((t) => {
      if (t?.tag) {
        tagArr.push({
          id: t.tag,
          text: t.tag,
        });
      }
    });
    return tagArr;
  };

  const onResetIcon = async (mode) => {
    if (mode === "icons") {
      setFavIconSrc({
        type: "image",
        icon: tabIcon,
      });
      setDefaultFavIconSrc(tabIcon);
      setIsOpenImageDialog(false);
    } else if (mode === "thumbnail") {
      const docIdx = docImages.findIndex((c) => {
        return c === defaultThumbnailImg;
      });
      if (docIdx !== -1) {
        docImages.splice(docIdx, 1);
      }
      setDocImages([defaultThumbnailImg, ...docImages]);
      const coverIdx = covers.findIndex((c) => {
        return c === defaultThumbnailImg;
      });
      if (coverIdx !== -1) {
        covers.splice(coverIdx, 1);
      }
      setCovers([defaultThumbnailImg, ...covers]);
      setImageUrl(defaultThumbnailImg);
      setCurrentThumbnail(defaultThumbnailImg);
      setIsOpenImageDialog(false);
    }
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
      setSelectedTags([...selectedTags, { id: tag?.text, tag: tag?.text }]);
    }
  };

  const onTagDelete = (i) => {
    selectedTags.splice(i, 1);
    setSelectedTags([...selectedTags]);
  };

  const onLayoutClick = () => {
    setShowCollectionInput(false);
    setShowTypeInput(false);
  };

  const handleCitationChange = async (value) => {
    if (!assetUrl) {
      message.error("Please Enter Url");
      return;
    }
    try {
      setCitation(value);
      setFetching(true);
      const today = new Date();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/openai?isCitation=true`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: `${today.getDate()}`,
            month: `${MONTHNAMES[today.getMonth()]}`,
            year: `${today.getFullYear()}`,
            text: `${value}`,
            url: `${assetUrl}`,
          }),
        }
      );
      const result = await response.json();
      const parsedResult = JSON.parse(result.message);
      setCitationText(parsedResult.citation);
      setCredibility(parsedResult.credibility);
      setCitationAuthor(parsedResult.author);
      setCitationDate(parsedResult.accessed_date);
      setFetching(false);
    } catch (err) {
      message.error("Something went wrong");
      setFetching(false);
    }
  };

  //   const currenyDropdown = () => {
  //     return(
  //       <Select
  //       value={currencySymbol}
  //       onChange={(value) => {
  //         const symbol = value.split('-')[1];
  //         setCurrencySymbol(symbol);
  //       }}
  //       className={`w-[80px]`}
  //       showSearch
  //       optionFilterProp="children"
  //       filterOption={(input, option) => {
  //         return (
  //           option.value.toLowerCase().includes(input.toLowerCase())
  //         );
  //       }}
  //     >
  //       {countriesCurreny.map((item) => (
  //         <Option value={`${item.iso}-${item.symbol}`} key={item.iso}>
  //           {item.symbol}
  //         </Option>
  //       ))}
  //     </Select>
  //     )
  // }

  const onSearchTerm = async (e) => {
    const { value } = e.target;
    let res;

    if (value === "") {
      setSearchMovies([]);
      setSearchBooks([]);
      return;
    } else {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        if (selectedType?.name === "Book") {
          setLoadingBookMovie(true);
          dispatch(getSearchBooks(value)).then((res) => {
            if (value !== "") {
              setSearchBooks(res?.payload?.data || []);
            }
            setLoadingBookMovie(false);
          });
        } else if (selectedType?.name === "Movie") {
          setLoadingBookMovie(true);
          res = await dispatch(getSearchMovies(value));
          setSearchMovies(res?.payload?.data || []);
          setLoadingBookMovie(false);
        }
      }, 300);
    }
  };
  const renderBookList = (item) => {
    const bookInfoArr = [];
    if (item?.volumeInfo?.publisher) {
      bookInfoArr.push(item?.volumeInfo?.publisher);
    }

    if (item?.volumeInfo?.publishedDate) {
      const year = item?.volumeInfo?.publishedDate.split("-")[0];
      bookInfoArr.push(year);
    }

    if (
      item?.volumeInfo?.pageCount &&
      Number(item?.volumeInfo?.pageCount) > 0
    ) {
      let pages = item?.volumeInfo?.pageCount + " pages";
      bookInfoArr.push(pages);
    }

    let formatedBookInfo = "";
    if (bookInfoArr.length > 0) {
      formatedBookInfo = bookInfoArr.join(" . ");
    }
    return (
      <div
        className="grid grid-cols-5 p-2 border-b-[1px] gap-1 cursor-pointer hover:bg-gray-100"
        key={item.id}
        onClick={(e) => onClickBook(e, item.id)}
      >
        <div className="p-[5px] flex justify-center items-center">
          {item?.volumeInfo?.imageLinks?.thumbnail && (
            <img
              className="object-contain"
              src={item?.volumeInfo?.imageLinks?.thumbnail}
              alt={item?.volumeInfo?.title || "Book gem"}
            />
          )}
        </div>
        <div className="col-span-4">
          {item.volumeInfo.title && (
            <h5 className="font-semibold">
              {item.volumeInfo.title.length > 30
                ? `${item.volumeInfo.title.substring(0, 30)}...`
                : item.volumeInfo.title}
            </h5>
          )}
          {item.volumeInfo.authors &&
            Array.isArray(item.volumeInfo.authors) &&
            item.volumeInfo.authors.length > 0 && (
              <h6 className="text-gray-700 text-xs">
                {item.volumeInfo.authors.join(", ")}
              </h6>
            )}
          {formatedBookInfo && (
            <div className="text-gray-700 text-xs">{formatedBookInfo}</div>
          )}
          {item.volumeInfo.industryIdentifiers &&
            Array.isArray(item.volumeInfo.industryIdentifiers) &&
            item.volumeInfo.industryIdentifiers.length > 0 && (
              <h6 className="text-gray-700 text-xs">
                ISBN: {item?.volumeInfo?.industryIdentifiers[0]?.identifier}
              </h6>
            )}
        </div>
      </div>
    );
  };

  const onClickBook = async (e, id) => {
    const res = await dispatch(getSelectedBook(id));
    const imageLink =
      res.payload.data?.volumeInfo?.imageLinks?.smallThumbnail?.replace(
        "http",
        "https"
      );
    setSearchBooks([]);
    setAssetUrl(res.payload?.data?.volumeInfo?.previewLink);
    setTitle(res.payload?.data?.volumeInfo?.title);
    setDescription(res.payload?.data?.volumeInfo?.description);
    setImageUrl(imageLink);
    setEntityObj(res.payload?.data?.volumeInfo);
    setShowReset(true);
  };

  const onClickMovie = async (e, id) => {
    const res = await dispatch(getSelectedMovie(id));
    setSearchMovies([]);
    setAssetUrl(res.payload?.data?.data?.url);
    setTitle(res.payload?.data?.data?.title);
    setDescription(res.payload?.data?.data?.description);
    setImageUrl(res.payload?.data?.data?.image);
    setEntityObj(res.payload?.data?.data);
    setShowReset(true);
  };

  const onFileChange = async (e) => {
    const { files } = e.target;
    const file = files[0];
    const filePath = file.name;
    const fileSize = file.size / 1024 / 1024; // Convert to MB

    // if (fileSize > 25) {
    //     message.error('File size must be less than 25MB');
    //     setPdfFile(null)
    //     return
    // }
    const planFileSize = await dispatch(getPlanService(session.userId));
    const planFileSizeMB =
      parseInt(planFileSize?.payload?.data?.data?.file_upload_size_limit) /
      1024 /
      1024;

    if (fileSize >= planFileSizeMB) {
      message.error("File size must be less than 25MB");
      return;
    }
    setShowReset(true);
    if (selectedType?.name === "PDF") {
      setPdfFile(file);
      setPdfSrc(URL.createObjectURL(file));
      setPDFFileName(file.name);
      const nameArr = filePath.split(".");
      nameArr.splice(-1);
      setTitle(nameArr.join("."));
      return;
    }
    if (selectedType?.name === "Audio") {
      setAudioFile(file);
      setAudioSrc(URL.createObjectURL(file));
      const nameArr = filePath.split(".");
      nameArr.splice(-1);
      setTitle(nameArr.join("."));
      return;
    }
    if (selectedType?.name === "Video") {
      setVideoFile(file);
      setVideoSrc(URL.createObjectURL(file));
      const nameArr = filePath.split(".");
      nameArr.splice(-1);
      setTitle(nameArr.join("."));
      return;
    }
    if (selectedType?.name === "Image") {
      const url = URL.createObjectURL(file);
      setImageFile(file);
      setImageSrc(url);
      URL.revokeObjectURL(file);
      return;
    }
    if (selectedType?.name === "Screenshot") {
      const url = URL.createObjectURL(file);
      setImageFile(file);
      setScreenshotImageSrc(url);
      URL.revokeObjectURL(file);
      return;
    }
    if (selectedType?.name === "Testimonial" && testimonialType === "image") {
      const url = URL.createObjectURL(file);
      setImageFile(file);
      setTestimonialAttachImage(url);
      URL.revokeObjectURL(file);
      return;
    }
    if (selectedType?.name === "Testimonial" && testimonialType === "audio") {
      setAudioFile(file);
      setAudioSrc(URL.createObjectURL(file));
      return;
    }
    if (selectedType?.name === "Testimonial" && testimonialType === "video") {
      setVideoFile(file);
      setVideoSrc(URL.createObjectURL(file));
      return;
    }
  };

  const onFileTestimonialAvatarChange = async (e) => {
    const { files } = e.target;
    const file = files[0];
    const fileSize = file.size / 1024 / 1024; // Convert to MB

    // if (fileSize > 25) {
    //     message.error('File size must be less than 25MB');
    //     setTestimonialAvatarImage(null)
    //     return
    // }
    const planFileSize = await dispatch(getPlanService(session.userId));
    const planFileSizeMB =
      parseInt(planFileSize?.payload?.data?.data?.file_upload_size_limit) /
      1024 /
      1024;

    if (fileSize >= planFileSizeMB) {
      message.error("File size must be less than 25MB");
      return;
    }

    const url = URL.createObjectURL(file);
    setTestimonialAvatarImage(file);
    setTestimonialAvatarImageSrc(url);
    URL.revokeObjectURL(file);
    return;
  };

  const handleSubmit = async (type) => {
    if (
      selectedType === "Link" &&
      checkBookmarkExists([selectedCollection], assetUrl)
    ) {
      message.error("This bookmark already exist!");
      return;
    }

    const NOT_VALIDATING_URLS_TYPE = [
      "Audio",
      "Video",
      "PDF",
      "Quote",
      "Note",
      "Ai Prompt",
      "Text Expander",
      "Blog",
      "Code",
      "Testimonial",
    ];
    if (
      fileType !== "file" &&
      assetUrl?.length === 0 &&
      NOT_VALIDATING_URLS_TYPE.indexOf(selectedType?.name) === -1
    ) {
      message.error("Please enter url");
      return;
    }
    setError(false);
    if (selectedCollection.id === undefined) {
      setError(true);
      return;
    }

    if (
      (selectedType?.name === "Ai Prompt" ||
        selectedType?.name === "Text Expander") &&
      !shortendurl
    ) {
      message.error("Please enter short url");
      return;
    }
    const shortUrlObj = shortendurl
      ? [{ type: "link", keyword: shortendurl, url: assetUrl, text: "" }]
      : [];

    let newTags = [];
    const filtered = selectedTags.filter((item) => typeof item.id === "string");
    const filteredNumber = selectedTags.filter(
      (item) => typeof item.id === "number"
    );
    const tagNames = filtered?.map((item) => item?.tag);
    if (tagNames && tagNames?.length > 0) {
      newTags = await updateTagsPromise(tagNames, userTags, tagNames?.length);
    }
    newTags = [...newTags, ...filteredNumber];

    const obj = {
      title,
      description,
      selectedTags: newTags,
      assetUrl,
      selectedType,
      remarks,
      favorite,
      covers,
      imageUrl,
      selectedCollection,
      shortUrlObj,
      isReaded: isReaded === "read",
      fileType:
        selectedType?.name === "PDF" ||
        selectedType?.name === "Video" ||
        selectedType?.name === "Audio" ||
        selectedType?.name === "Image"
          ? fileType
          : undefined,
      price: `${currencySymbol}${productPrice}`,
      favIconSrc,
      docImages,
      defaultFavIconSrc,
    };

    const mediaCovers =
      obj.covers && obj.covers.length !== 0 ? obj.covers : [obj.imageUrl];
    const finalCovers = removeDuplicates(mediaCovers);

    const data = customPropertyWithoutAnswer?.map((item) => {
      let obj = { ...item };

      if (
        !obj?.answer &&
        (!Array.isArray(obj?.defaultValue) ||
          (Array.isArray(obj?.defaultValue) && obj?.defaultValue?.length > 0))
      ) {
        obj.answer = obj?.defaultValue;
      }

      return obj;
    });

    const filteredWithAnswer = data?.filter((item) => item?.answer) || [];

    const isSelectedCollectionShared = getAllLevelCollectionPermissions(
      sharedCollections,
      obj.selectedCollection.id
    );

    let finalObj = {
      title: obj.title,
      description: obj.description,
      media_type:
        typeof obj.selectedType === "object"
          ? obj.selectedType?.name
          : obj.selectedType,
      author: session.userId ? parseInt(session.userId) : null,
      url: obj.assetUrl,
      metaData: {
        type:
          typeof obj.selectedType === "object"
            ? obj.selectedType?.name
            : obj.selectedType,
        title: obj.heading || obj.title,
        icon: obj?.favIconSrc || "",
        defaultIcon: obj?.defaultFavIconSrc || "",
        url: obj.assetUrl,
        covers: finalCovers,
        docImages: obj.docImages,
        defaultThumbnail: obj.imageUrl,
      },
      collection_gems: obj.selectedCollection.id,
      remarks: obj.remarks,
      tags: obj.selectedTags?.map((t) => {
        return t.id;
      }),
      is_favourite: obj.favorite,
      expander: obj.shortUrlObj,
      fileType: obj.fileType,
      price: obj.price,
      isRead: isReaded === "read" ? true : false,
      media: {
        covers: finalCovers,
        techStack: techStack,
      },
      collections: obj.selectedCollection.id,
      custom_fields_obj: [...filteredWithAnswer],
    };

    if (isSelectedCollectionShared) {
      finalObj = {
        ...finalObj,
        author: isSelectedCollectionShared?.data?.author?.id,
      };
    }

    if (selectedType?.name === "Article") {
      finalObj = {
        ...finalObj,
        media: {
          ...finalObj.media,
          articleObj: articleObj,
        },
      };
    }

    if (selectedType?.name === "Blog") {
      setButtonLoading(true);
      const blogObj = {
        title: finalObj.title,
        description: finalObj.description,
        metaData: finalObj.metaData,
        tags: finalObj.tags,
        remarks: finalObj.remarks,
        is_favourite: finalObj.is_favourite,
        expander: finalObj.expander,
        showThumbnail: finalObj.showThumbnail,
        media: {
          articleObj: {
            author: {
              name:
                session.firstname && session.lastname
                  ? `${session.firstname} ${session.lastname}`
                  : session.username,
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}`,
            },
            datePublished: moment().format(),
            publisher: {
              name: "Curateit",
              url: process.env.NEXT_PUBLIC_BASE_URL,
              logo: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`,
            },
            readingTime: null,
            name: finalObj.title,
            headline: finalObj.title,
            description: finalObj.description,
            identifier:
              session.firstname && session.lastname
                ? `${session.firstname} ${session.lastname}`
                : session.username,
          },
        },
        blogContent:
          '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}',
        blogBanner: finalObj.metaData.defaultThumbnail
          ? {
              type: "upload",
              icon: finalObj.metaData.defaultThumbnail,
              imagePosition: { x: 50, y: 50 },
            }
          : null,
        blogIcon: finalObj.metaData.icon,
      };

      const blogRes = await dispatch(createBlog(blogObj, finalObj.collections));
      if (
        blogRes.error === undefined &&
        blogRes.payload &&
        blogRes.payload.error === undefined
      ) {
        const { data } = blogRes.payload;
        if (data) {
          if (isSelectedCollectionShared) {
            message.success(TextMessage.BOOKMARK_CREATE_TEXT);
            setButtonLoading(false);
            if (bookmarklet) {
              dispatch(setBookmarkletValue(null));
              navigate.push(`/u/${session.username}/all-bookmarks`, undefined, {
                shallow: true,
              });
            }
            if (type === "save") {
              dispatch(openDrawer(""));
              dispatch(addBkFromPage(null));
            } else {
              handleClearFields();
            }
            if (addBkPage && addBkPage?.page === "collection") {
              const details = {
                page: "collection",
                value: {
                  ...data,
                  author: {
                    id: finalObj?.author || parseInt(session?.userId),
                  },
                },
              };
              dispatch(gemAdded(details));
            }
            dispatch(addGemToSharedCollection(obj.selectedCollection.id, data));
            return;
            // return navigate.push(`/u/${session.username}/g/${data?.id}/${data?.title ? slugify(data.title?.substring(0, 10), { lower: true }) : "default"}`)
          }
          message.success(TextMessage.BOOKMARK_CREATE_TEXT);
          setButtonLoading(false);
          if (bookmarklet) {
            dispatch(setBookmarkletValue(null));
            navigate.push(`/u/${session.username}/all-bookmarks`, undefined, {
              shallow: true,
            });
          }
          if (type === "save") {
            dispatch(openDrawer(""));
            dispatch(addBkFromPage(null));
          } else {
            handleClearFields();
          }
          dispatch(updateFilterCount(selectedType?.name, "add"));
          dispatch(addCollectionCount(obj.selectedCollection.id));
          const tagNames = obj.selectedTags?.map((t) => {
            return t?.tag;
          });
          dispatch(addTagCount(tagNames));
          const details = {
            page: !addBkPage ? "bookmark" : addBkPage?.page,
            value: {
              ...data,
              author: {
                id: finalObj?.author || parseInt(session?.userId),
              },
            },
          };
          dispatch(gemAdded(details));

          return navigate.push(
            `/u/${session.username}/g/${data?.id}/${
              data?.slug ||
              (data?.title
                ? slugify(data?.title?.substring(0, 10), {
                    lower: true,
                    remove: /[&,+()$~%.'":*?<>{}]/g,
                  })
                : "default")
            }?isEdit=true`
          );
        }
      } else {
        setButtonLoading(false);
        // message.error(TextMessage.ERROR_TEXT)
      }
      return;
    }

    if (selectedType?.name === "PDF") {
      if (!pdfFile && obj?.fileType === "file") {
        message.error("Please upload a valid pdf file!");
        return;
      }
      if (pdfFile && obj?.fileType === "file") {
        setButtonLoading(true);
        const formData = new FormData();
        formData.append("files", pdfFile);
        formData.append("title", obj.title);
        formData.append("description", obj.description);
        formData.append(
          "metaData",
          JSON.stringify({
            covers: finalCovers,
            icon: obj?.favIconSrc || "",
            defaultIcon: obj?.defaultFavIconSrc || "",
            docImages: obj.docImages,
          })
        );
        formData.append("url", obj.assetUrl);
        formData.append(
          "tags",
          JSON.stringify(
            obj.selectedTags.map((t) => {
              return t.id;
            })
          )
        );
        formData.append("notes", obj.remarks);
        formData.append("is_favourite", obj.favorite);
        formData.append("collections", obj.selectedCollection.id);
        // formData.append("showThumbnail", obj.showThumbnail)
        formData.append("fileType", obj?.fileType);
        formData.append(
          "author",
          isSelectedCollectionShared
            ? isSelectedCollectionShared?.data?.author?.id
            : finalObj?.author
        );
        formData.append(
          "custom_fields_obj",
          JSON.stringify(filteredWithAnswer)
        );

        const audio = await dispatch(createPdf(formData));
        if (
          audio.error === undefined &&
          audio.payload &&
          audio.payload.error === undefined
        ) {
          const { data } = audio.payload;
          if (data) {
            if (isSelectedCollectionShared) {
              message.success(TextMessage.BOOKMARK_CREATE_TEXT);
              setButtonLoading(false);
              if (bookmarklet) {
                dispatch(setBookmarkletValue(null));
                navigate.push(
                  `/u/${session.username}/all-bookmarks`,
                  undefined,
                  { shallow: true }
                );
              }
              if (type === "save") {
                dispatch(openDrawer(""));
                dispatch(addBkFromPage(null));
              } else {
                handleClearFields();
              }
              if (addBkPage && addBkPage?.page === "collection") {
                const details = {
                  page: "collection",
                  value: {
                    ...data,
                    author: {
                      id: finalObj?.author || parseInt(session?.userId),
                    },
                  },
                };
                dispatch(gemAdded(details));
              }
              dispatch(
                addGemToSharedCollection(obj.selectedCollection.id, data)
              );
              return;
              // return navigate.push(`/u/${session.username}/g/${data?.id}/${data?.title ? slugify(data.title?.substring(0, 10), { lower: true }) : "default"}`)
            }
            message.success(TextMessage.BOOKMARK_CREATE_TEXT);
            setButtonLoading(false);
            if (bookmarklet) {
              dispatch(setBookmarkletValue(null));
              navigate.push(`/u/${session.username}/all-bookmarks`, undefined, {
                shallow: true,
              });
            }
            if (type === "save") {
              dispatch(openDrawer(""));
              dispatch(addBkFromPage(null));
            } else {
              handleClearFields();
            }
            dispatch(updateFilterCount(selectedType?.name, "add"));
            dispatch(addCollectionCount(obj.selectedCollection.id));
            const tagNames = obj.selectedTags?.map((t) => {
              return t?.tag;
            });
            dispatch(addTagCount(tagNames));
            const details = {
              page: !addBkPage ? "bookmark" : addBkPage?.page,
              value: {
                ...data,
                author: {
                  id: finalObj?.author || parseInt(session?.userId),
                },
              },
            };
            dispatch(gemAdded(details));
            // return navigate.push(`/u/${session.username}/g/${data?.id}/${data?.title ? slugify(data?.title?.substring(0, 10), { lower: true }) : "default"}`)
          }
        } else {
          setButtonLoading(false);
          // message.error(TextMessage.ERROR_TEXT)
        }
        return;
      }

      if (obj?.fileType === "url") {
        const gemRes = await dispatch(addGem({ data: finalObj }));
        if (gemRes.error === undefined && gemRes.payload.error === undefined) {
          const { data } = gemRes.payload;
          if (data.data) {
            const d = data.data;
            // const gTags  = d.tags.map((t) => { return { id: t.id, tag: t.tag }})
            const g = {
              id: d.id,
              title: d.title,
              media: d.media,
              media_type: d.media_type,
              url: d.url,
              remarks: d.remarks,
              metaData: d.metaData,
              description: d.description,
              S3_link: d.S3_link,
              is_favourite: d.is_favourite,
              collection_id: obj.selectedCollection.id,
              tags: obj.selectedTags,
              showThumbnail: obj?.showThumbnail,
              fileType: d?.fileType,
              custom_fields_obj: d?.custom_fields_obj,
            };
            if (isSelectedCollectionShared) {
              message.success(TextMessage.BOOKMARK_CREATE_TEXT);
              setButtonLoading(false);
              if (bookmarklet) {
                dispatch(setBookmarkletValue(null));
                navigate.push(
                  `/u/${session.username}/all-bookmarks`,
                  undefined,
                  { shallow: true }
                );
              }
              if (type === "save") {
                dispatch(openDrawer(""));
                dispatch(addBkFromPage(null));
              } else {
                handleClearFields();
              }
              if (addBkPage && addBkPage?.page === "collection") {
                const details = {
                  page: "collection",
                  value: {
                    ...g,
                    author: {
                      id: finalObj?.author || parseInt(session?.userId),
                    },
                  },
                };
                dispatch(gemAdded(details));
              }
              dispatch(addGemToSharedCollection(obj.selectedCollection.id, g));
              return;
              // return navigate.push(`/u/${session.username}/g/${g?.id}/${g?.title ? slugify(g?.title?.substring(0, 10), { lower: true }) : "default"}`)
            }
            message.success(TextMessage.BOOKMARK_CREATE_TEXT);
            setButtonLoading(false);
            if (bookmarklet) {
              dispatch(setBookmarkletValue(null));
              navigate.push(`/u/${session.username}/all-bookmarks`, undefined, {
                shallow: true,
              });
            }
            if (type === "save") {
              dispatch(openDrawer(""));
              dispatch(addBkFromPage(null));
            } else {
              handleClearFields();
            }
            dispatch(addCollectionCount(obj.selectedCollection.id));
            dispatch(updateFilterCount(selectedType?.name, "add"));
            const tagNames = obj.selectedTags?.map((t) => {
              return t?.tag;
            });
            dispatch(addTagCount(tagNames));
            const details = {
              page: !addBkPage ? "bookmark" : addBkPage?.page,
              value: {
                ...g,
                author: {
                  id: finalObj?.author || parseInt(session?.userId),
                },
              },
            };
            dispatch(gemAdded(details));
            // return navigate.push(`/u/${session.username}/g/${g?.id}/${g?.title ? slugify(g?.title?.substring(0, 10), { lower: true }) : "default"}`)
            return;
          }
        }
      }
    }

    if (selectedType?.name === "Audio") {
      if (!audioFile && obj?.fileType === "file") {
        message.error("Please upload a valid audio file!");
        return;
      }
      setButtonLoading(true);
      const formData = new FormData();
      formData.append(
        "files",
        obj.fileType === "record" ? audioRecordSrc : audioFile
      );
      formData.append(
        "title",
        obj.fileType === "record" ? audioOriginalText : obj.title
      );
      formData.append("description", obj.description);
      formData.append("expander", obj.shortUrlObj);
      formData.append(
        "metaData",
        JSON.stringify({
          covers: finalCovers,
          icon: obj?.favIconSrc,
          defaultIcon: obj?.defaultFavIconSrc || "",
          docImages: obj.docImages,
        })
      );
      formData.append("url", obj.assetUrl);
      formData.append(
        "tags",
        JSON.stringify(
          obj.selectedTags.map((t) => {
            return t.id;
          })
        )
      );
      formData.append("notes", obj.remarks);
      formData.append("is_favourite", obj.favorite);
      formData.append("collections", obj.selectedCollection.id);
      // formData.append("showThumbnail", obj.showThumbnail)
      formData.append("fileType", obj?.fileType);
      formData.append(
        "author",
        isSelectedCollectionShared
          ? isSelectedCollectionShared?.data?.author?.id
          : finalObj?.author
      );
      formData.append("custom_fields_obj", JSON.stringify(filteredWithAnswer));
      formData.append(
        "media",
        JSON.stringify({
          html: html,
          audioOriginalText: audioOriginalText,
        })
      );
      formData.append("media_type", selectedType?.name || "Audio");

      let isRecord = false;
      if (obj?.fileType === "record") isRecord = true;
      const audio = await dispatch(createAudio(formData, isRecord));
      if (
        audio.error === undefined &&
        audio.payload &&
        audio.payload.error === undefined
      ) {
        const { data } = audio.payload;
        if (data) {
          if (isSelectedCollectionShared) {
            message.success(TextMessage.BOOKMARK_CREATE_TEXT);
            setButtonLoading(false);
            if (bookmarklet) {
              dispatch(setBookmarkletValue(null));
              navigate.push(`/u/${session.username}/all-bookmarks`, undefined, {
                shallow: true,
              });
            }
            if (type === "save") {
              dispatch(openDrawer(""));
              dispatch(addBkFromPage(null));
            } else {
              handleClearFields();
            }
            if (addBkPage && addBkPage?.page === "collection") {
              const details = {
                page: "collection",
                value: {
                  ...data,
                  author: {
                    id: finalObj?.author || parseInt(session?.userId),
                  },
                },
              };
              dispatch(gemAdded(details));
            }
            dispatch(addGemToSharedCollection(obj.selectedCollection.id, data));
            return;
            // return navigate.push(`/u/${session.username}/g/${data?.id}/${data?.title ? slugify(data?.title?.substring(0, 10), { lower: true }) : "default"}`)
          }
          message.success(TextMessage.BOOKMARK_CREATE_TEXT);
          setButtonLoading(false);
          if (bookmarklet) {
            dispatch(setBookmarkletValue(null));
            navigate.push(`/u/${session.username}/all-bookmarks`, undefined, {
              shallow: true,
            });
          }
          if (type === "save") {
            dispatch(openDrawer(""));
            dispatch(addBkFromPage(null));
          } else {
            handleClearFields();
          }
          dispatch(updateFilterCount(selectedType?.name, "add"));
          dispatch(addCollectionCount(obj.selectedCollection.id));
          const tagNames = obj.selectedTags?.map((t) => {
            return t?.tag;
          });
          dispatch(addTagCount(tagNames));
          const details = {
            page: !addBkPage ? "bookmark" : addBkPage?.page,
            value: {
              ...data,
              author: {
                id: finalObj?.author,
              },
            },
          };
          dispatch(gemAdded(details));
          // return navigate.push(`/u/${session.username}/g/${data?.id}/${data?.title ? slugify(data?.title?.substring(0, 10), { lower: true }) : "default"}`)
        }
      } else {
        setButtonLoading(false);
        // message.error(TextMessage.ERROR_TEXT)
      }
      return;
    }

    if (selectedType?.name === "Video") {
      if (!videoFile && obj?.fileType === "file") {
        message.error("Please upload a valid video file!");
        return;
      }
      if (videoFile && obj?.fileType === "file") {
        setButtonLoading(true);
        const formData = new FormData();
        formData.append("files", videoFile);
        formData.append("title", obj.title);
        formData.append("description", obj.description);
        formData.append(
          "metaData",
          JSON.stringify({
            covers: finalCovers,
            icon: obj?.favIconSrc || "",
            defaultIcon: obj?.defaultFavIconSrc || "",
            docImages: obj.docImages,
          })
        );
        formData.append("url", obj.assetUrl);
        formData.append(
          "tags",
          JSON.stringify(
            obj.selectedTags.map((t) => {
              return t.id;
            })
          )
        );
        formData.append("notes", obj.remarks);
        formData.append("is_favourite", obj.favorite);
        formData.append("collections", obj.selectedCollection.id);
        // formData.append("showThumbnail", obj.showThumbnail)
        formData.append("fileType", obj?.fileType);
        formData.append(
          "author",
          isSelectedCollectionShared
            ? isSelectedCollectionShared?.data?.author?.id
            : finalObj?.author
        );
        formData.append(
          "custom_fields_obj",
          JSON.stringify(filteredWithAnswer)
        );

        const audio = await dispatch(createVideo(formData));
        if (
          audio.error === undefined &&
          audio.payload &&
          audio.payload.error === undefined
        ) {
          const { data } = audio.payload;
          if (data) {
            if (isSelectedCollectionShared) {
              message.success(TextMessage.BOOKMARK_CREATE_TEXT);
              setButtonLoading(false);
              if (bookmarklet) {
                dispatch(setBookmarkletValue(null));
                navigate.push(
                  `/u/${session.username}/all-bookmarks`,
                  undefined,
                  { shallow: true }
                );
              }
              if (type === "save") {
                dispatch(openDrawer(""));
                dispatch(addBkFromPage(null));
              } else {
                handleClearFields();
              }
              if (addBkPage && addBkPage?.page === "collection") {
                const details = {
                  page: "collection",
                  value: {
                    ...data,
                    author: {
                      id: finalObj?.author || parseInt(session?.userId),
                    },
                  },
                };
                dispatch(gemAdded(details));
              }
              dispatch(addBkFromPage(null));
              dispatch(
                addGemToSharedCollection(obj.selectedCollection.id, data)
              );
              return;
              // return navigate.push(`/u/${session.username}/g/${data?.id}/${data?.title ? slugify(data?.title?.substring(0, 10), { lower: true }) : "default"}`)
            }
            message.success(TextMessage.BOOKMARK_CREATE_TEXT);
            setButtonLoading(false);
            if (bookmarklet) {
              dispatch(setBookmarkletValue(null));
              navigate.push(`/u/${session.username}/all-bookmarks`, undefined, {
                shallow: true,
              });
            }
            if (type === "save") {
              dispatch(openDrawer(""));
              dispatch(addBkFromPage(null));
            } else {
              handleClearFields();
            }
            dispatch(updateFilterCount(selectedType?.name, "add"));
            dispatch(addCollectionCount(obj.selectedCollection.id));
            const tagNames = obj.selectedTags?.map((t) => {
              return t?.tag;
            });
            dispatch(addTagCount(tagNames));
            const details = {
              page: !addBkPage ? "bookmark" : addBkPage?.page,
              value: {
                ...data,
                author: {
                  id: finalObj?.author || parseInt(session?.userId),
                },
              },
            };
            dispatch(gemAdded(details));
            // return navigate.push(`/u/${session.username}/g/${data?.id}/${data?.title ? slugify(data?.title?.substring(0, 10), { lower: true }) : "default"}`)
          }
        } else {
          setButtonLoading(false);
          // message.error(TextMessage.ERROR_TEXT)
        }
        return;
      }

      if (obj?.fileType === "url") {
        setButtonLoading(true);
        const finalData = {
          ...finalObj,
          media: {
            ...finalObj.media,
            html: html,
          },
        };
        const gemRes = await dispatch(addGem({ data: finalData }));
        if (gemRes.error === undefined && gemRes.payload.error === undefined) {
          const { data } = gemRes.payload;
          if (data.data) {
            const d = data.data;
            // const gTags  = d.tags.map((t) => { return { id: t.id, tag: t.tag }})
            const g = {
              id: d.id,
              title: d.title,
              media: d.media,
              media_type: d.media_type,
              url: d.url,
              remarks: d.remarks,
              metaData: d.metaData,
              description: d.description,
              S3_link: d.S3_link,
              is_favourite: d.is_favourite,
              collection_id: obj.selectedCollection.id,
              tags: obj.selectedTags,
              showThumbnail: obj?.showThumbnail,
              fileType: d?.fileType,
              custom_fields_obj: d?.custom_fields_obj,
            };
            if (isSelectedCollectionShared) {
              message.success(TextMessage.BOOKMARK_CREATE_TEXT);
              setButtonLoading(false);
              if (bookmarklet) {
                dispatch(setBookmarkletValue(null));
                navigate.push(
                  `/u/${session.username}/all-bookmarks`,
                  undefined,
                  { shallow: true }
                );
              }
              if (type === "save") {
                dispatch(openDrawer(""));
                dispatch(addBkFromPage(null));
              } else {
                handleClearFields();
              }
              if (addBkPage && addBkPage?.page === "collection") {
                const details = {
                  page: "collection",
                  value: {
                    ...g,
                    author: {
                      id: finalObj?.author || parseInt(session?.userId),
                    },
                  },
                };
                dispatch(gemAdded(details));
              }
              dispatch(addGemToSharedCollection(obj.selectedCollection.id, g));
              return;
              // return navigate.push(`/u/${session.username}/g/${g?.id}/${g?.title ? slugify(g?.title?.substring(0, 10), { lower: true }) : "default"}`)
            }
            message.success(TextMessage.BOOKMARK_CREATE_TEXT);
            setButtonLoading(false);
            if (bookmarklet) {
              dispatch(setBookmarkletValue(null));
              navigate.push(`/u/${session.username}/all-bookmarks`, undefined, {
                shallow: true,
              });
            }
            if (type === "save") {
              dispatch(openDrawer(""));
              dispatch(addBkFromPage(null));
            } else {
              handleClearFields();
            }
            dispatch(updateFilterCount(selectedType?.name, "add"));
            dispatch(addCollectionCount(obj.selectedCollection.id));
            const tagNames = obj.selectedTags?.map((t) => {
              return t?.tag;
            });
            dispatch(addTagCount(tagNames));
            const details = {
              page: !addBkPage ? "bookmark" : addBkPage?.page,
              value: {
                ...g,
                author: {
                  id: finalObj?.author || parseInt(session?.userId),
                },
              },
            };
            dispatch(gemAdded(details));
            return;
            // return navigate.push(`/u/${session.username}/g/${g?.id}/${g?.title ? slugify(g?.title?.substring(0, 10), { lower: true }) : "default"}`)
          }
        }
      }
    }

    if (selectedType?.name === "Image") {
      if (!imageFile && obj?.fileType === "file") {
        message.error("Please upload valid file!");
        return;
      }
      setButtonLoading(true);
      let finalSrc;
      if (imageFile) {
        const formData = new FormData();
        formData.append("files", imageFile);
        const imgRes = await dispatch(uploadScreenshots(formData));
        if (imgRes.error === undefined && imgRes.payload?.error === undefined) {
          const { data } = imgRes.payload;
          if (data && data.length !== 0) {
            finalSrc = data[0];
          }
        }
      }

      const payload = {
        ...finalObj,
        image: finalSrc || imageUrl || "",
        metaData: {
          ...finalObj.metaData,
          covers: finalCovers?.length > 0 ? finalCovers : [finalSrc],
        },
      };

      const imgPayload = await dispatch(addImage(payload, payload.image, true));
      if (
        imgPayload.error === undefined &&
        imgPayload.payload?.error === undefined
      ) {
        const { data } = imgPayload.payload;
        const g = {
          id: data.id,
          title: data.title,
          media: data.media,
          media_type: data.media_type,
          url: data.url,
          remarks: data.remarks,
          metaData: data.metaData,
          description: data.description,
          S3_link: data.S3_link,
          text: data.text,
          is_favourite: data.is_favourite,
          collection_id: obj.selectedCollection.id,
          collection_gems: obj.selectedCollection,
          tags: obj.selectedTags,
          showThumbnail: data?.showThumbnail,
          fileType: data?.fileType,
          custom_fields_obj: data?.custom_fields_obj,
          imageColor: data?.imageColor || [],
        };
        if (isSelectedCollectionShared) {
          message.success(TextMessage.BOOKMARK_CREATE_TEXT);
          setButtonLoading(false);
          if (bookmarklet) {
            dispatch(setBookmarkletValue(null));
            navigate.push(`/u/${session.username}/all-bookmarks`, undefined, {
              shallow: true,
            });
          }
          if (type === "save") {
            dispatch(openDrawer(""));
            dispatch(addBkFromPage(null));
          } else {
            handleClearFields();
          }
          if (addBkPage && addBkPage?.page === "collection") {
            const details = {
              page: "collection",
              value: {
                ...g,
                author: {
                  id: finalObj?.author || parseInt(session?.userId),
                },
              },
            };
            dispatch(gemAdded(details));
          }
          dispatch(addGemToSharedCollection(obj.selectedCollection.id, g));
          return;
          // return navigate.push(`/u/${session.username}/g/${g.id}/${g.title ? slugify(g.title?.substring(0, 10), { lower: true }) : "default"}`)
        }
        message.success(TextMessage.BOOKMARK_CREATE_TEXT);
        setButtonLoading(false);
        if (bookmarklet) {
          dispatch(setBookmarkletValue(null));
          navigate.push(`/u/${session.username}/all-bookmarks`, undefined, {
            shallow: true,
          });
        }
        if (type === "save") {
          dispatch(openDrawer(""));
          dispatch(addBkFromPage(null));
        } else {
          handleClearFields();
        }
        dispatch(updateFilterCount(selectedType?.name, "add"));
        dispatch(addCollectionCount(obj.selectedCollection.id));
        const tagNames = obj.selectedTags?.map((t) => {
          return t?.tag;
        });
        dispatch(addTagCount(tagNames));
        const details = {
          page: !addBkPage ? "bookmark" : addBkPage?.page,
          value: {
            ...g,
            author: {
              id: finalObj?.author || parseInt(session?.userId),
            },
          },
        };
        dispatch(gemAdded(details));
        // return navigate.push(`/u/${session.username}/g/${g.id}/${g.title ? slugify(g.title?.substring(0, 10), { lower: true }) : "default"}`)
      } else {
        setButtonLoading(false);
        // message.error(TextMessage.ERROR_TEXT)
      }
      return;
    }

    if (selectedType?.name === "Code") {
      setButtonLoading(true);
      const payload = {
        ...finalObj,
        code,
        langugae: codeLanguage,
      };
      const res = await dispatch(addCode(payload));
      if (res.error === undefined && res?.payload?.error === undefined) {
        const { data } = res.payload;
        if (data) {
          const d = data;
          const g = {
            id: d.id,
            title: d.title,
            media: d.media,
            media_type: d.media_type,
            url: d.url,
            remarks: d.remarks,
            metaData: d.metaData,
            description: d.description,
            S3_link: d.S3_link,
            is_favourite: d.is_favourite,
            collection_id: obj.selectedCollection.id,
            tags: obj.selectedTags,
            showThumbnail: d?.showThumbnail,
            code: d.code,
            langugae: d.langugae,
            custom_fields_obj: d?.custom_fields_obj,
          };
          if (isSelectedCollectionShared) {
            message.success(TextMessage.BOOKMARK_CREATE_TEXT);
            setButtonLoading(false);
            if (bookmarklet) {
              dispatch(setBookmarkletValue(null));
              navigate.push(`/u/${session.username}/all-bookmarks`, undefined, {
                shallow: true,
              });
            }
            if (type === "save") {
              dispatch(openDrawer(""));
              dispatch(addBkFromPage(null));
            } else {
              handleClearFields();
            }
            if (addBkPage && addBkPage?.page === "collection") {
              const details = {
                page: "collection",
                value: {
                  ...g,
                  author: {
                    id: finalObj?.author || parseInt(session?.userId),
                  },
                },
              };
              dispatch(gemAdded(details));
            }
            dispatch(addGemToSharedCollection(obj.selectedCollection.id, g));
            return;
            // return navigate.push(`/u/${session.username}/g/${g.id}/${g.title ? slugify(g.title?.substring(0, 10), { lower: true }) : "default"}`)
          }
          message.success(TextMessage.BOOKMARK_CREATE_TEXT);
          setButtonLoading(false);
          if (bookmarklet) {
            dispatch(setBookmarkletValue(null));
            navigate.push(`/u/${session.username}/all-bookmarks`, undefined, {
              shallow: true,
            });
          }
          if (type === "save") {
            dispatch(openDrawer(""));
            dispatch(addBkFromPage(null));
          } else {
            handleClearFields();
          }
          dispatch(updateFilterCount(selectedType?.name, "add"));
          dispatch(addCollectionCount(obj.selectedCollection.id));
          const tagNames = obj.selectedTags?.map((t) => {
            return t?.tag;
          });
          dispatch(addTagCount(tagNames));
          const details = {
            page: !addBkPage ? "bookmark" : addBkPage?.page,
            value: {
              ...g,
              author: {
                id: finalObj?.author || parseInt(session?.userId),
              },
            },
          };
          dispatch(gemAdded(details));
          // return navigate.push(`/u/${session.username}/g/${g.id}/${g.title ? slugify(g.title?.substring(0, 10), { lower: true }) : "default"}`)
        }
      } else {
        setButtonLoading(false);
        // message.error(TextMessage.ERROR_TEXT)
      }
      return;
    }

    if (selectedType?.name === "Profile") {
      finalObj = {
        ...finalObj,
        platform: platformType,
      };
    }

    if (selectedType?.name === "Note" || selectedType?.name === "Quote") {
      const media = {
        notes: obj.remarks,
        color: highlightedColor,
        text: highlightedText || audioEnhancedText,
        originalText: audioOriginalText,
        link: obj.assetUrl,
        collections: obj.selectedCollection?.id,
        tags: obj.selectedTags?.map((t) => {
          return t.id;
        }),
        type:
          typeof obj.selectedType === "object"
            ? obj.selectedType?.name
            : obj.selectedType,
        // box: highlightBox,
        _id: uuidv4(),
        // details: highlightDetails,
        styleClassName: highlightClass,
      };
      finalObj = {
        ...finalObj,
        media,
        title: highlightedText || audioEnhancedText,
      };
    }

    if (selectedType?.name === "Ai Prompt") {
      if (htmlText === "") {
        message.error("Please enter a text for Ai prompt");
        return;
      }
      const expander =
        plainText && obj.shortUrlObj.length > 0
          ? [
              ...obj.shortUrlObj,
              {
                type: "prompt",
                keyword: obj.shortUrlObj[0].keyword,
                url: obj.assetUrl,
                text: htmlText,
                plainText: plainText,
              },
            ]
          : obj.shortUrlObj;

      finalObj = {
        ...finalObj,
        text: htmlText,
        title:
          plainText &&
          obj?.shortUrlObj &&
          Array.isArray(obj?.shortUrlObj) &&
          obj?.shortUrlObj[0]
            ? obj?.shortUrlObj[0]?.keyword + " " + plainText.substring(0, 20)
            : plainText || htmlText || obj.title,
        expander: expander,
        isPublicPrompt: promptType === "public" ? true : false,
        is_enable_for_all_sites: enableSites,
        prompt_priority_sites: prioritySites,
        prompt_category: promptCategory,
      };
    }
    if (selectedType?.name === "Text Expander") {
      if (htmlText === "") {
        message.error("Please enter a text for text expander");
        return;
      }
      const expander =
        plainText && obj.shortUrlObj.length > 0
          ? [
              ...obj.shortUrlObj,
              {
                type: "expander",
                keyword: obj.shortUrlObj[0].keyword,
                url: obj.assetUrl,
                text: htmlText,
                plainText: plainText,
              },
            ]
          : obj.shortUrlObj;
      finalObj = {
        ...finalObj,
        text: htmlText,
        title:
          plainText && obj?.shortUrlObj && Array.isArray(obj?.shortUrlObj)
            ? obj?.shortUrlObj[0]?.keyword + " " + plainText.substring(0, 20)
            : plainText || htmlText || obj.title,
        expander: expander,
        is_enable_for_all_sites: enableSites,
        prompt_priority_sites: prioritySites,
      };
    }

    if (selectedType?.name === "Product") {
      finalObj = {
        ...finalObj,
        media: {
          covers: finalCovers,
          price: obj.price || "",
        },
      };
    }

    if (selectedType?.name === "Citation") {
      finalObj = {
        ...finalObj,
        media: {
          covers: finalCovers,
          citation: citationText,
          credibility: credibility,
          citation_format: citation,
          citationAuthor: citationAuthor,
          citationDate: citationDate,
        },
      };
    }

    if (selectedType?.name === "SocialFeed") {
      finalObj = {
        ...finalObj,
        platform: platformType || "",
        post_type: tweetType,
        socialfeed_obj: obj?.socialfeed_obj || {
          authorDisplayName: "",
          date: "",
          medias: [
            {
              url: obj.imageUrl,
            },
          ],
          text: obj.description,
          tweetUrl: obj.assetUrl,
        },
        media: {
          ...finalObj.media,
          isWeb: true,
          html: html,
        },
      };
    }

    if (selectedType?.name === "Testimonial") {
      let finalSrc;
      let finalSrcAvatar;
      let finalSrcAudio;
      let finalSrcVideo;
      if (testimonialType === "image") {
        if (imageFile && fileType === "file") {
          const formData = new FormData();
          formData.append("files", imageFile);
          const imgRes = await dispatch(uploadScreenshots(formData));
          if (
            imgRes.error === undefined &&
            imgRes.payload?.error === undefined
          ) {
            const { data } = imgRes.payload;
            if (data && data.length !== 0) {
              const src = data[0];
              finalSrc = src;
              setTestimonialAttachImage(src);
            }
          }
        }

        if (fileType === "url") {
          finalSrc = imageUrl;
        }
      }

      if (testimonialType === "audio") {
        if (fileType === "file") {
          const formData = new FormData();
          formData.append("file", audioFile);
          const imgRes = await dispatch(uploadAllTypeFileInS3(formData));
          if (imgRes.error === undefined) {
            const { data } = imgRes.payload;
            finalSrcAudio = data || "";
          }
        }

        if (fileType === "record") {
          const formData = new FormData();
          formData.append("file", audioRecordSrc);
          const imgRes = await dispatch(uploadAllTypeFileInS3(formData));
          if (imgRes.error === undefined) {
            const { data } = imgRes.payload;
            finalSrcAudio = data || "";
          }
        }

        if (fileType === "url") {
          finalSrcAudio = assetUrl;
        }
      }

      if (testimonialType === "video") {
        if (fileType === "file") {
          const formData = new FormData();
          formData.append("file", videoFile);
          const imgRes = await dispatch(uploadAllTypeFileInS3(formData));
          if (imgRes.error === undefined) {
            const { data } = imgRes.payload;
            finalSrcVideo = data || "";
          }
        }

        if (fileType === "url") {
          finalSrcVideo = assetUrl;
        }
      }

      if (testimonialAvatarImage) {
        const formData = new FormData();
        formData.append("files", testimonialAvatarImage);
        const imgRes = await dispatch(uploadScreenshots(formData));
        if (imgRes.error === undefined && imgRes.payload?.error === undefined) {
          const { data } = imgRes.payload;
          if (data && data.length !== 0) {
            const src = data[0];
            finalSrcAvatar = src;
            setTestimonialAvatarImageSrc(src);
          }
        }
      }

      finalObj = {
        ...finalObj,
        title: testimonialTagLine,
        description: testimonial,
        metaData: {
          type:
            typeof obj.selectedType === "object"
              ? obj.selectedType?.name
              : obj.selectedType,
          title: testimonialTagLine,
          icon: obj?.imageUrl || finalSrc || "",
          url: obj.assetUrl,
          covers: obj?.imageUrl ? [obj?.imageUrl] : finalCovers,
          docImages: obj.docImages,
        },
        media: {
          covers: finalCovers,
          testimonial: testimonial,
          attachImage: finalSrc || "",
          author: testimonialAuthor,
          date: testimonialDate,
          platform: testimonialPlatform,
          product: testimonialProduct,
          rating: testimonialRating,
          tagLine: testimonialTagLine,
          url: obj.assetUrl || testimonialUrl,
          testimonialType: testimonialType,
          attachAudio: finalSrcAudio || "",
          fileType: fileType,
          attachVideo: finalSrcVideo || "",
          avatar: finalSrcAvatar || "",
          html: html,
        },
      };

      if (!finalObj?.media?.tagLine) {
        message.error("Please fill required fields");
        return;
      }
      setButtonLoading(true);
      const gemRes = await dispatch(addGem({ data: finalObj }));
      if (gemRes.error === undefined && gemRes.payload.error === undefined) {
        const { data } = gemRes.payload;
        if (data.data) {
          const d = data.data;
          const g = {
            id: d.id,
            title: d.title,
            media: d.media,
            media_type: d.media_type,
            url: d.url,
            remarks: d.remarks,
            metaData: d.metaData,
            description: d.description,
            S3_link: d.S3_link,
            is_favourite: d.is_favourite,
            collection_id: obj.selectedCollection.id,
            tags: obj.selectedTags,
            showThumbnail: d?.showThumbnail,
            custom_fields_obj: d?.custom_fields_obj,
          };
          if (isSelectedCollectionShared) {
            message.success(TextMessage.BOOKMARK_CREATE_TEXT);
            setButtonLoading(false);
            if (bookmarklet) {
              dispatch(setBookmarkletValue(null));
              navigate.push(`/u/${session.username}/all-bookmarks`, undefined, {
                shallow: true,
              });
            }
            if (type === "save") {
              dispatch(openDrawer(""));
              dispatch(addBkFromPage(null));
            } else {
              handleClearFields();
            }
            if (addBkPage && addBkPage?.page === "collection") {
              const details = {
                page: "collection",
                value: {
                  ...g,
                  author: {
                    id: finalObj?.author || parseInt(session?.userId),
                  },
                },
              };
              dispatch(gemAdded(details));
            }
            dispatch(addGemToSharedCollection(obj.selectedCollection.id, g));
            return;
            // return navigate.push(`/u/${session.username}/g/${g.id}/${g.title ? slugify(g.title?.substring(0, 10), { lower: true }) : "default"}`)
          }
          message.success(TextMessage.BOOKMARK_CREATE_TEXT);
          setButtonLoading(false);
          if (bookmarklet) {
            dispatch(setBookmarkletValue(null));
            navigate.push(`/u/${session.username}/all-bookmarks`, undefined, {
              shallow: true,
            });
          }
          if (type === "save") {
            dispatch(openDrawer(""));
            dispatch(addBkFromPage(null));
          } else {
            handleClearFields();
          }
          dispatch(updateFilterCount(selectedType?.name, "add"));
          dispatch(addCollectionCount(obj.selectedCollection.id));
          const tagNames = obj.selectedTags?.map((t) => {
            return t?.tag;
          });
          dispatch(addTagCount(tagNames));
          const details = {
            page: !addBkPage ? "bookmark" : addBkPage?.page,
            value: {
              ...g,
              author: {
                id: finalObj?.author || parseInt(session?.userId),
              },
            },
          };
          dispatch(gemAdded(details));
          // return navigate.push(`/u/${session.username}/g/${g.id}/${g.title ? slugify(g.title?.substring(0, 10), { lower: true }) : "default"}`)
        }
      } else {
        setButtonLoading(false);
        // message.error(TextMessage.ERROR_TEXT)
      }

      return;
    }

    if (selectedType?.name === "Book") {
      finalObj = {
        ...finalObj,
        entityObj: entityObj ? entityObj : [],
        media: {
          ...finalObj.media,
          myRating: rate,
          myStatus: readStatus,
          dateRead: dateRead,
          readStart: dateRead,
          status: readStatus,
        },
      };
    }
    if (selectedType?.name === "Movie") {
      // finalObj = {
      //   ...finalObj,
      //   entityObj: entityObj,
      // }
      finalObj = {
        ...finalObj,
        entityObj: entityObj ? entityObj : [],
        media: {
          ...finalObj.media,
          myRating: rate,
          myStatus: watchStatus,
          dateRead: dateRead,
          readStart: dateRead,
          status: watchStatus,
        },
      };
    }
    // selectedType?.name === 'Link' || selectedType?.name === 'App' || selectedType?.name === 'Article'

    if (!finalObj?.title) {
      setButtonLoading(true);
      let platType = null;
      let techType = null;
      const url = normalizeUrl(assetUrl);
      setAssetUrl(url);
      if (Validator.validate("url", url, true)) {
        message.error(Validator.validate("url", url, true));
        setShowAssetUrlInput(false);
        handleClearFields();
        return;
      }
      const type = await setMediaTypeBasedOnUrl(assetUrl);
      setSelectedType(type);
      if (
        type === "Profile" ||
        selectedType?.name === "Profile" ||
        selectedType?.name === "SocialFeed"
      ) {
        platType = getPlatformFromURL(url);
      }
      if (selectedType?.name === "App" && url) {
        const res = await dispatch(fetchDomainDetails(url, false, true));
        techType = res?.payload?.data?.technologystack || [];
      }
      if (url) {
        let docsImgs = await getAllSiteImages(url);
        const res = await getDetails(url);
        if (!res?.title) {
          setButtonLoading(false);
          message.error(TextMessage.ERROR_TEXT);
          return;
        }
        const mc =
          obj.covers && obj.covers.length !== 0 ? obj.covers : [res?.imageUrl];
        const fc = removeDuplicates(mc);
        finalObj = {
          ...finalObj,
          title: res?.title,
          description: res?.description,
          media_type: type,
          author: session.userId ? parseInt(session.userId) : null,
          url: url,
          metaData: {
            type: type,
            title: res?.title,
            icon: res?.favIconSrc || "",
            defaultIcon: res?.defaultFavIconSrc || "",
            url: url,
            covers: fc,
            docImages: res?.docImages || docsImgs,
            defaultThumbnail: res?.imageUrl,
          },
          collection_gems: obj.selectedCollection.id,
          remarks: obj.remarks,
          tags: obj.selectedTags?.map((t) => {
            return t.id;
          }),
          is_favourite: obj.favorite,
          expander: obj.shortUrlObj,
          fileType: "url",
          price: obj.price,
          isRead: isReaded === "read" ? true : false,
          media: {
            covers: fc,
            techStack: techType,
            articleObj: res?.articleObj,
            platform: platType,
            html: res?.html,
            citation: res?.cText,
            credibility: res?.cCredebility,
            citation_format: res?.citation,
            citationAuthor: res?.cAuthor,
            citationDate: res?.cDate,
          },
          collections: obj.selectedCollection.id,
        };
      }
    }
    setButtonLoading(true);
    const gemRes = await dispatch(addGem({ data: finalObj }));
    if (gemRes.payload?.data?.data?.id) {
      const { data } = gemRes.payload;
      if (data.data) {
        const d = data.data;
        const g = {
          id: d.id,
          title: d.title,
          media: d.media,
          media_type: d.media_type,
          url: d.url,
          remarks: d.remarks,
          metaData: d.metaData,
          description: d.description,
          S3_link: d.S3_link,
          is_favourite: d.is_favourite,
          collection_id: obj.selectedCollection.id,
          tags: obj.selectedTags,
          showThumbnail: d?.showThumbnail,
          expander: d?.expander,
          socialfeed_obj: d?.socialfeed_obj,
          platform: d?.platform,
          custom_fields_obj: d?.custom_fields_obj,
          isRead: d?.isRead,
          entityObj: d?.entityObj,
        };
        onSaveAndClose && onSaveAndClose(gemRes.payload?.data?.data);
        if (isSelectedCollectionShared) {
          message.success(TextMessage.BOOKMARK_CREATE_TEXT);
          setButtonLoading(false);
          if (bookmarklet) {
            dispatch(setBookmarkletValue(null));
            navigate.push(`/u/${session.username}/all-bookmarks`, undefined, {
              shallow: true,
            });
          }
          if (type === "save") {
            dispatch(openDrawer(""));
            dispatch(addBkFromPage(null));
          } else {
            handleClearFields();
          }
          if (addBkPage && addBkPage?.page === "collection") {
            const details = {
              page: "collection",
              value: {
                ...g,
                author: {
                  id: finalObj?.author || parseInt(session?.userId),
                },
              },
            };
            dispatch(gemAdded(details));
          }
          dispatch(addGemToSharedCollection(obj.selectedCollection.id, g));
          return;
          // return navigate.push(`/u/${session.username}/g/${g.id}/${g?.title ? slugify(g?.title?.substring(0, 10), { lower: true }) : "default"}`)
        }
        message.success(TextMessage.BOOKMARK_CREATE_TEXT);
        setButtonLoading(false);
        if (bookmarklet) {
          dispatch(setBookmarkletValue(null));
          navigate.push(`/u/${session.username}/all-bookmarks`, undefined, {
            shallow: true,
          });
        }
        if (type === "save") {
          dispatch(openDrawer(""));
          dispatch(addBkFromPage(null));
          tourStepsEnabled && dispatch(setIsMobileSidebar(true));
          tourStepsEnabled && dispatch(updateTourStepsData(7));
        } else {
          handleClearFields();
        }
        dispatch(updateFilterCount(selectedType?.name, "add"));
        dispatch(addCollectionCount(obj.selectedCollection.id));
        const tagNames = obj.selectedTags?.map((t) => {
          return t?.tag;
        });
        dispatch(addTagCount(tagNames));
        const details = {
          page: !addBkPage ? "bookmark" : addBkPage?.page,
          value: {
            ...g,
            author: {
              id: finalObj?.author || parseInt(session?.userId),
            },
          },
        };
        dispatch(gemAdded(details));
        // return navigate.push(`/u/${session.username}/g/${g.id}/${g.title ? slugify(g.title?.substring(0, 10), { lower: true }) : "default"}`)
      }
    } else if (gemRes.payload?.data?.status === 400) {
      setButtonLoading(false);
      message.error(TextMessage.GEM_EXISTS_ERROR_TEXT);
    } else {
      setButtonLoading(false);
      message.error(TextMessage.ERROR_TEXT);
    }
    return;
  };

  const handleClearFields = () => {
    setDescription("");
    setTitle("");
    setAssetUrl("");
    setRemarks("");
    setSelectedTags([]);
    setCovers([]);
    setImageUrl(null);
    setRate(0);
    setReadStatus("to-read");
    setWatchStatus("to-watch");
    setDateRead("");
    setImageUrl("");
    setFavIconSrc("");
    setDefaultFavIconSrc("");
    setCode("");
    setCodeLanguage("");
    setShowReset(false);
    setShowAssetUrlInput(false);
    setShowShortEndInput(false);
    setVideoFile("");
    setVideoSrc("");
    setAudioFile("");
    setAudioSrc("");
    setImageFile("");
    setImageSrc("");
    setPdfFile("");
    setPDFFileName("");
    setPdfSrc("");
    setFileType("url");
    setShowBookSearchInput(false);
    setShowMovieSearchInput(false);
    setShowPromptEditor(false);
    setShowCodeEditor(false);
    setCode("");
    setHtmlText("");
    setPlainText("");
    setCitation(null);
    setCredibility("low");
    setCitationAuthor("");
    setCitationDate("");
    setCitationText("");
    setTestimonialType("");
    setTestimonial("");
    setTestimonialAttachImage("");
    setTestimonialAuthor("");
    setTestimonialDate("");
    setTestimonialPlatform("");
    setTestimonialRating(0);
    setTestimonialTagLine("");
    setTestimonialUrl("");
    setTextExtract("");
    setHtml("");
  };

  const handlefileTypeChange = (type) => {
    setFileType(type);
    // if (type === "file") handleClearFields();
  };

  const debounce = (func, delay = 300) => {
    let timerId;
    return (...args) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchWebsiteDetails = debounce(async (value) => {
    const mainUrl =
      value && value.startsWith("http:")
        ? value.replace("http:", "https:")
        : value || "";
    const url = encodeURIComponent(`${mainUrl}`);

    setFetchingSiteInfo(true);
    const res = await dispatch(getBookmarkDetailsMicrolink(url));
    if (res?.payload?.data?.data && selectedType?.name === "Article") {
      const articleData = res.payload?.data?.data;
      const aObj = {
        author: {
          name:
            articleData.iframely?.meta?.author ||
            articleData.microlink?.data?.author ||
            null,
          url: articleData.iframely?.meta?.author_url || null,
        },
        datePublished:
          articleData.iframely?.meta?.date ||
          articleData.microlink?.data?.date ||
          null,
        publisher: {
          name: articleData.microlink?.data?.publisher || "",
          url: new URL(articleData.microlink?.data?.url).origin || "",
          logo: articleData.microlink?.data?.logo || null,
        },
        readingTime:
          articleData.iframely?.meta?.["label1-Reading time"] || null,
        name:
          articleData.iframely?.meta?.title ||
          articleData?.microlink?.data?.title ||
          null,
        headline:
          articleData.iframely?.meta?.title ||
          articleData?.microlink?.data?.title ||
          null,
        description:
          articleData.iframely?.meta?.description ||
          articleData?.microlink?.data?.description ||
          null,
        identifier:
          articleData?.iframely?.meta?.author ||
          articleData?.microlink?.data?.author ||
          null,
      };
      setArticleObj(aObj);
    }
    setHtml(res?.payload?.data?.data?.iframely?.html || null);

    if (
      res?.payload?.data?.data?.iframely ||
      (res?.payload?.data?.data?.microlink &&
        res?.payload?.data?.data?.microlink?.status === "success")
    ) {
      const imgFb =
        selectedType?.name === "SocialFeed" && url.includes("facebook")
          ? res?.payload?.data?.data?.microlink?.data?.image?.url
          : "";
      setHtml(res?.payload?.data?.data?.iframely?.html || null);
      const { meta, links } = res?.payload?.data?.data?.iframely;
      const imgData =
        links?.thumbnail && links?.thumbnail?.length > 0
          ? links?.thumbnail[0]?.href
          : links?.icon && links?.icon?.length > 0
          ? links?.icon[0]?.href
          : "";
      const favIconData =
        links?.icon && links?.icon?.length > 0 ? links?.icon[0]?.href : "";

      const data =
        res?.payload?.data?.data?.microlink &&
        res?.payload?.data?.data?.microlink?.data;

      setTabIcon(favIconData || data?.logo?.url || "");
      setTitle(meta?.title || data?.title || "");
      setDescription(meta?.description || data?.description || "");
      setImageUrl(imgFb ? imgFb : imgData || data?.image?.url || "");
      setFavIconSrc({
        type: "image",
        icon: favIconData || data?.logo?.url || "",
      });
      setDefaultFavIconSrc(favIconData || data?.logo?.url || "");
      setDefaultThumbnailImg(imgFb ? imgFb : imgData || data?.image?.url || "");
      setDocImages([
        imgFb ? imgFb : imgData || data?.image?.url || "",
        ...docImages,
      ]);
      setFetchingSiteInfo(false);
      setShowAssetUrlInput(false);
      setShowReset(true);
    } else {
      setTitle("");
      setDescription("");
      setImageUrl("");
      setFavIconSrc(null);
      setDefaultFavIconSrc(null);
      setFetchingSiteInfo(false);
      setShowAssetUrlInput(false);
      setShowReset(false);
      message.error("Could not fetch the given URL.");
    }

    if (selectedType?.name === "Citation" && url) {
      const getCitationDataOnLoad = async () => {
        try {
          setCitation("Harvard");
          setFetching(true);
          const today = new Date();
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/openai?isCitation=true`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                date: `${today.getDate()}`,
                month: `${MONTHNAMES[today.getMonth()]}`,
                year: `${today.getFullYear()}`,
                text: `Harvard`,
                url: `${url}`,
              }),
            }
          );
          const result = await response.json();
          const parsedResult = JSON.parse(result.message);
          setCitationText(parsedResult.citation);
          setCredibility(parsedResult.credibility);
          setCitationAuthor(parsedResult.author);
          setCitationDate(parsedResult.accessed_date);
          setFetching(false);
        } catch (err) {
          message.error("Something went wrong");
          setFetching(false);
        }
      };
      getCitationDataOnLoad();
    }
  });

  const handleChangeAssetUrl = (e) => {
    const { value } = e.target;
    setAssetUrl(value);
  };

  const handleChangeAssetUrlForCode = async (e) => {
    const { value } = e.target;
    setAssetUrl(value);

    if (!value) return;
    const url = normalizeUrl(value);
    if (Validator.validate("url", url, true)) {
      message.error(Validator.validate("url", url, true));
      setShowAssetUrlInput(false);
      handleClearFields();
      return;
    }
    if (url) {
      setDocImages(await getAllSiteImages(url));
      fetchWebsiteDetails(url);
    }
  };

  const onAssetURLBlur = async () => {
    if (!assetUrl) return;
    const url = normalizeUrl(assetUrl);
    setAssetUrl(url);
    if (Validator.validate("url", url, true)) {
      message.error(Validator.validate("url", url, true));
      setShowAssetUrlInput(false);
      handleClearFields();
      return;
    }
    if (
      selectedType?.name === "Profile" ||
      selectedType?.name === "SocialFeed"
    ) {
      const data = getPlatformFromURL(url);
      setPlatformType(data);
    }
    if (selectedType?.name === "App" && url) {
      const res = await dispatch(fetchDomainDetails(url, false, true));
      setTechStack(res?.payload?.data?.technologystack || []);
    }
    if (url) {
      setDocImages(await getAllSiteImages(url));
      fetchWebsiteDetails(url);
      if (tourStepsEnabled) {
        dispatch(setShowUrlInputFromTourSteps(false));
      }
    }
  };

  const getDetails = async (value) => {
    const url = encodeURIComponent(value);
    const res = await dispatch(getBookmarkDetailsMicrolink(url));
    let aObj = null;
    let cText = null;
    let cCredebility = null;
    let cAuthor = null;
    let cDate = null;
    if (res?.payload?.data?.data && selectedType?.name === "Article") {
      const articleData = res.payload?.data?.data;
      aObj = {
        author: {
          name:
            articleData.iframely?.meta?.author ||
            articleData.microlink?.data?.author ||
            null,
          url: articleData.iframely?.meta?.author_url || null,
        },
        datePublished:
          articleData.iframely?.meta?.date ||
          articleData.microlink?.data?.date ||
          null,
        publisher: {
          name: articleData.microlink?.data?.publisher || "",
          url: new URL(articleData.microlink?.data?.url).origin || "",
          logo: articleData.microlink?.data?.logo || null,
        },
        readingTime:
          articleData.iframely?.meta?.["label1-Reading time"] || null,
        name:
          articleData.iframely?.meta?.title ||
          articleData?.microlink?.data?.title ||
          null,
        headline:
          articleData.iframely?.meta?.title ||
          articleData?.microlink?.data?.title ||
          null,
        description:
          articleData.iframely?.meta?.description ||
          articleData?.microlink?.data?.description ||
          null,
        identifier:
          articleData?.iframely?.meta?.author ||
          articleData?.microlink?.data?.author ||
          null,
      };
    }
    if (selectedType?.name === "Citation" && url) {
      const today = new Date();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/openai?isCitation=true`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: `${today.getDate()}`,
            month: `${MONTHNAMES[today.getMonth()]}`,
            year: `${today.getFullYear()}`,
            text: `Harvard`,
            url: `${url}`,
          }),
        }
      );
      const result = await response.json();
      const parsedResult = JSON.parse(result.message);
      cText = parsedResult?.citation;
      cCredebility = parsedResult?.credibility;
      cAuthor = parsedResult?.author;
      cDate = parsedResult?.accessed_date;
    }
    const imgFb =
      selectedType?.name === "SocialFeed" && url.includes("facebook")
        ? res?.payload?.data?.data?.microlink?.data?.image?.url
        : "";
    const { meta, links } = res?.payload?.data?.data?.iframely;
    const imgData =
      links?.thumbnail && links?.thumbnail?.length > 0
        ? links?.thumbnail[0]?.href
        : links?.icon && links?.icon?.length > 0
        ? links?.icon[0]?.href
        : "";
    const favIconData =
      links?.icon && links?.icon?.length > 0 ? links?.icon[0]?.href : "";

    const data =
      res?.payload?.data?.data?.microlink &&
      res?.payload?.data?.data?.microlink?.data;
    return {
      tabIcon: favIconData || data?.logo?.url || "",
      title: meta?.title || data?.title || "",
      description: meta?.description || data?.description || "",
      imageUrl: imgFb ? imgFb : imgData || data?.image?.url || "",
      favIconSrc: {
        type: "image",
        icon: favIconData || data?.logo?.url || "",
      },
      defaultFavIconSrc: favIconData || data?.logo?.url || "",
      defaultThumbnailImg: imgFb ? imgFb : imgData || data?.image?.url || "",
      docImages: [
        imgFb ? imgFb : imgData || data?.image?.url || "",
        ...docImages,
      ],
      articleObj: aObj,
      html: res?.payload?.data?.data?.iframely?.html || null,
      cText,
      cCredebility,
      cAuthor,
      cDate,
      citation: "Harvard",
    };
  };

  const handleSubmitBio = async () => {
    if (selectedType?.name === "Profile" && selectedProfileType === "contact") {
      if (!profileContactTitle) {
        message.error("Title is required");
        return;
      }
      if (!profileContactDescription) {
        message.error("Description is required");
        return;
      }
      if (profileContactTitle?.length > 30) {
        message.error("Title cannot exceed 30 characters");
        return;
      }
      if (profileContactDescription?.length > 90) {
        message.error("Description cannot exceed 30 characters");
        return;
      }
    }

    if (
      selectedType === "Link" &&
      checkBookmarkExists([selectedCollection], assetUrl)
    ) {
      message.error("This bookmark already exist!");
      return;
    }

    const NOT_VALIDATING_URLS_TYPE = [
      "Audio",
      "Video",
      "PDF",
      "Quote",
      "Note",
      "Ai Prompt",
      "Text Expander",
    ];
    if (
      selectedType?.name !== "Profile" &&
      fileType !== "file" &&
      assetUrl?.length === 0 &&
      NOT_VALIDATING_URLS_TYPE.indexOf(selectedType?.name) === -1
    ) {
      message.error("Please enter url");
      return;
    }
    setError(false);
    if (selectedCollection.id === undefined) {
      setError(true);
      return;
    }

    if (
      (selectedType?.name === "Ai Prompt" ||
        selectedType?.name === "Text Expander") &&
      !shortendurl
    ) {
      message.error("Please enter short url");
      return;
    }

    const shortUrlObj = shortendurl
      ? [{ type: "link", keyword: shortendurl, url: assetUrl, text: "" }]
      : [];

    const obj = {
      title,
      description,
      selectedTags,
      assetUrl,
      selectedType,
      remarks,
      favorite,
      covers,
      imageUrl,
      selectedCollection,
      shortUrlObj,
      isReaded: isReaded === "read",
      fileType:
        selectedType?.name === "PDF" ||
        selectedType?.name === "Video" ||
        selectedType?.name === "Audio" ||
        selectedType?.name === "Image"
          ? fileType
          : undefined,
      price: `${currencySymbol}${productPrice}`,
      favIconSrc,
      defaultFavIconSrc,
    };

    const mediaCovers =
      obj.covers && obj.covers.length !== 0 ? obj.covers : [obj.imageUrl];
    const finalCovers = removeDuplicates(mediaCovers);
    const shapes = ["square", "rectangle", "pipe"];

    let finalObj = {
      title: obj.title,
      description: obj.description,
      media_type:
        typeof obj.selectedType === "object"
          ? obj.selectedType?.name
          : obj.selectedType,
      author: session.userId ? parseInt(session.userId) : null,
      url: obj.assetUrl,
      metaData: {
        type:
          typeof obj.selectedType === "object"
            ? obj.selectedType?.name
            : obj.selectedType,
        title: obj.heading || obj.title,
        icon: obj?.favIconSrc || "",
        defaultIcon: obj?.defaultFavIconSrc || "",
        docImages: finalCovers,
        defaultThumbnail: obj.imageUrl,
        url: obj.assetUrl,
        covers: finalCovers,
      },
      collection_gems: obj.selectedCollection.id,
      remarks: obj.remarks,
      tags: obj.selectedTags?.map((t) => {
        return t.id;
      }),
      is_favourite: obj.favorite,
      expander: obj.shortUrlObj,
      fileType: obj.fileType,
      price: obj.price,
      isRead: isReaded === "read" ? true : false,
      media: {
        covers: finalCovers,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        x: (blocksLength * 2) % (getHandWUnitsTitle(screenWidth).width || 10),
        y: Infinity,
        ribbon: {
          text: ribbon?.text || "",
          color: ribbon?.color || "#0693e3",
        },
        techStack: techStack,
      },
      collections: obj.selectedCollection.id,
    };

    if (selectedType?.name === "Article") {
      finalObj = {
        ...finalObj,
        media: {
          ...finalObj.media,
          articleObj: articleObj,
        },
      };
    }

    if (selectedType?.name === "PDF") {
      if (!pdfFile && obj?.fileType === "file") {
        message.error("Please upload a valid pdf file!");
        return;
      }
      if (pdfFile && obj?.fileType === "file") {
        setButtonLoading(true);
        const formData = new FormData();
        formData.append("files", pdfFile);
        formData.append("title", obj.title);
        formData.append("description", obj.description);
        formData.append(
          "metaData",
          JSON.stringify({
            covers: finalCovers,
            icon: obj?.favIconSrc || "",
            defaultIcon: obj?.defaultFavIconSrc || "",
          })
        );
        formData.append("url", obj.assetUrl);
        formData.append(
          "tags",
          JSON.stringify(
            obj.selectedTags.map((t) => {
              return t.id;
            })
          )
        );
        formData.append("notes", obj.remarks);
        formData.append("is_favourite", obj.favorite);
        formData.append("collections", obj.selectedCollection.id);
        // formData.append("showThumbnail", obj.showThumbnail)
        formData.append("fileType", obj?.fileType);
        formData.append("author", finalObj?.author);
        formData.append(
          "media",
          JSON.stringify({
            covers: finalCovers,
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            x:
              (blocksLength * 2) %
              (getHandWUnitsTitle(screenWidth).width || 10),
            y: Infinity,
          })
        );

        const audio = await dispatch(createPdf(formData));
        if (
          audio.error === undefined &&
          audio.payload &&
          audio.payload.error === undefined
        ) {
          const { data } = audio.payload;
          if (data) {
            message.success(TextMessage.BOOKMARK_CREATE_TEXT);
            setButtonLoading(false);
            setOpen(false);
            setSelectedFileType("");
            setSelectedMediaType("");
            setSelectedPlatform("");
            setSelectedProfileType("");
            setBlocks([
              ...blocks,
              {
                ...data,
                author: {
                  id: parseInt(session?.userId),
                },
              },
            ]);
          }
        } else {
          setButtonLoading(false);
          // message.error(TextMessage.ERROR_TEXT)
        }
        return;
      }

      if (obj?.fileType === "url") {
        const gemRes = await dispatch(addGem({ data: finalObj }));
        if (gemRes.error === undefined && gemRes.payload.error === undefined) {
          const { data } = gemRes.payload;
          if (data.data) {
            const d = data.data;
            // const gTags  = d.tags.map((t) => { return { id: t.id, tag: t.tag }})
            const g = {
              id: d.id,
              title: d.title,
              media: d.media,
              media_type: d.media_type,
              url: d.url,
              remarks: d.remarks,
              metaData: d.metaData,
              description: d.description,
              S3_link: d.S3_link,
              is_favourite: d.is_favourite,
              collection_id: obj.selectedCollection.id,
              tags: obj.selectedTags,
              showThumbnail: obj?.showThumbnail,
              fileType: d?.fileType,
            };

            message.success(TextMessage.BOOKMARK_CREATE_TEXT);
            setButtonLoading(false);
            setOpen(false);
            setSelectedFileType("");
            setSelectedMediaType("");
            setSelectedPlatform("");
            setSelectedProfileType("");
            setBlocks([
              ...blocks,
              {
                ...g,
                author: {
                  id: parseInt(session?.userId),
                },
              },
            ]);
          }
        }
        return;
      }
    }

    if (selectedType?.name === "Audio") {
      if (!audioFile && obj?.fileType === "file") {
        message.error("Please upload a valid audio file!");
        return;
      }
      setButtonLoading(true);
      const formData = new FormData();
      formData.append("files", audioFile);
      formData.append("title", obj.title);
      formData.append("description", obj.description);
      formData.append("expander", obj.shortUrlObj);
      formData.append(
        "metaData",
        JSON.stringify({
          covers: finalCovers,
          icon: obj?.favIconSrc || "",
          defaultIcon: obj?.defaultFavIconSrc || "",
        })
      );
      formData.append("url", obj.assetUrl);
      formData.append(
        "tags",
        JSON.stringify(
          obj.selectedTags.map((t) => {
            return t.id;
          })
        )
      );
      formData.append("notes", obj.remarks);
      formData.append("is_favourite", obj.favorite);
      formData.append("collections", obj.selectedCollection.id);
      // formData.append("showThumbnail", obj.showThumbnail)
      formData.append("fileType", obj?.fileType);
      formData.append("author", finalObj?.author);
      formData.append(
        "media",
        JSON.stringify({
          covers: finalCovers,
          shape: obj.assetUrl?.includes("spotify") ? "rectangle" : "square",
          x: (blocksLength * 2) % (getHandWUnitsTitle(screenWidth).width || 10),
          y: Infinity,
          html: html,
        })
      );
      formData.append("media_type", selectedType?.name || "Audio");

      let isRecord = false;
      if (obj?.fileType === "record") isRecord = true;
      const audio = await dispatch(createAudio(formData, isRecord));
      if (
        audio.error === undefined &&
        audio.payload &&
        audio.payload.error === undefined
      ) {
        const { data } = audio.payload;
        if (data) {
          message.success(TextMessage.BOOKMARK_CREATE_TEXT);
          setButtonLoading(false);
          setOpen(false);
          setSelectedFileType("");
          setSelectedMediaType("");
          setSelectedPlatform("");
          setSelectedProfileType("");
          setBlocks([
            ...blocks,
            {
              ...data,
              author: {
                id: parseInt(session?.userId),
              },
            },
          ]);
        }
      } else {
        setButtonLoading(false);
        // message.error(TextMessage.ERROR_TEXT)
      }
      return;
    }

    if (selectedType?.name === "Video") {
      if (!videoFile && obj?.fileType === "file") {
        message.error("Please upload a valid video file!");
        return;
      }
      if (videoFile && obj?.fileType === "file") {
        setButtonLoading(true);
        const formData = new FormData();
        formData.append("files", videoFile);
        formData.append("title", obj.title);
        formData.append("description", obj.description);
        formData.append(
          "metaData",
          JSON.stringify({
            covers: finalCovers,
            icon: obj?.favIconSrc || "",
            defaultIcon: obj?.defaultFavIconSrc || "",
          })
        );
        formData.append("url", obj.assetUrl);
        formData.append(
          "tags",
          JSON.stringify(
            obj.selectedTags.map((t) => {
              return t.id;
            })
          )
        );
        formData.append("notes", obj.remarks);
        formData.append("is_favourite", obj.favorite);
        formData.append("collections", obj.selectedCollection.id);
        // formData.append("showThumbnail", obj.showThumbnail)
        formData.append("fileType", obj?.fileType);
        formData.append("author", finalObj?.author);
        formData.append(
          "media",
          JSON.stringify({
            covers: finalCovers,
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            x:
              (blocksLength * 2) %
              (getHandWUnitsTitle(screenWidth).width || 10),
            y: Infinity,
          })
        );

        const audio = await dispatch(createVideo(formData));
        if (
          audio.error === undefined &&
          audio.payload &&
          audio.payload.error === undefined
        ) {
          const { data } = audio.payload;
          if (data) {
            message.success(TextMessage.BOOKMARK_CREATE_TEXT);
            setButtonLoading(false);
            setOpen(false);
            setSelectedFileType("");
            setSelectedMediaType("");
            setSelectedPlatform("");
            setSelectedProfileType("");
            setBlocks([
              ...blocks,
              {
                ...data,
                author: {
                  id: parseInt(session?.userId),
                },
              },
            ]);
          }
        } else {
          setButtonLoading(false);
          // message.error(TextMessage.ERROR_TEXT)
        }
        return;
      }

      if (obj?.fileType === "url") {
        setButtonLoading(true);
        const finalData = {
          ...finalObj,
          media: {
            ...finalObj.media,
            html: html,
          },
        };
        const gemRes = await dispatch(addGem({ data: finalData }));
        if (gemRes.error === undefined && gemRes.payload.error === undefined) {
          const { data } = gemRes.payload;
          if (data.data) {
            const d = data.data;
            const g = {
              id: d.id,
              title: d.title,
              media: d.media,
              media_type: d.media_type,
              url: d.url,
              remarks: d.remarks,
              metaData: d.metaData,
              description: d.description,
              S3_link: d.S3_link,
              is_favourite: d.is_favourite,
              collection_id: obj.selectedCollection.id,
              tags: obj.selectedTags,
              showThumbnail: obj?.showThumbnail,
              fileType: d?.fileType,
            };

            message.success(TextMessage.BOOKMARK_CREATE_TEXT);
            setButtonLoading(false);
            setOpen(false);
            setSelectedFileType("");
            setSelectedMediaType("");
            setSelectedPlatform("");
            setSelectedProfileType("");
            setBlocks([
              ...blocks,
              {
                ...g,
                author: {
                  id: parseInt(session?.userId),
                },
              },
            ]);
            return;
          }
        }
      }
    }

    if (selectedType?.name === "Image" && finalObj.url.includes("pinterest")) {
      setButtonLoading(true);
      const payload = {
        ...finalObj,
        image: imageUrl,
        metaData: {
          ...finalObj.metaData,
          covers: finalCovers?.length > 0 ? finalCovers : [finalSrc],
        },
      };

      const imgPayload = await dispatch(
        addImage(payload, payload.image, false)
      );
      if (
        imgPayload.error === undefined &&
        imgPayload.payload?.error === undefined
      ) {
        const { data } = imgPayload.payload;
        const g = {
          id: data.id,
          title: data.title,
          media: data.media,
          media_type: data.media_type,
          url: data.url,
          remarks: data.remarks,
          metaData: data.metaData,
          description: data.description,
          S3_link: data.S3_link,
          text: data.text,
          is_favourite: data.is_favourite,
          collection_id: obj.selectedCollection.id,
          collection_gems: obj.selectedCollection,
          tags: obj.selectedTags,
          showThumbnail: data?.showThumbnail,
          fileType: data?.fileType,
          imageColor: data?.imageColor || [],
        };
        message.success(TextMessage.BOOKMARK_CREATE_TEXT);
        setButtonLoading(false);
        setOpen(false);
        setSelectedFileType("");
        setSelectedMediaType("");
        setSelectedPlatform("");
        setSelectedProfileType("");
        setBlocks([
          ...blocks,
          {
            ...g,
            author: {
              id: parseInt(session?.userId),
            },
          },
        ]);
      } else {
        setButtonLoading(false);
        // message.error(TextMessage.ERROR_TEXT)
      }
      return;
    }

    if (selectedType?.name === "Image") {
      if (!imageFile && obj?.fileType === "file") {
        message.error("Please upload valid file!");
        return;
      }
      setButtonLoading(true);
      let finalSrc;
      if (imageFile) {
        const formData = new FormData();
        formData.append("files", imageFile);
        const imgRes = await dispatch(uploadScreenshots(formData));
        if (imgRes.error === undefined && imgRes.payload?.error === undefined) {
          const { data } = imgRes.payload;
          if (data && data.length !== 0) {
            finalSrc = data[0];
          }
        }
      }

      const payload = {
        ...finalObj,
        image: finalSrc || imageUrl,
        metaData: {
          ...finalObj.metaData,
          covers: finalCovers?.length > 0 ? finalCovers : [finalSrc],
        },
      };

      const imgPayload = await dispatch(addImage(payload, payload.image, true));
      if (
        imgPayload.error === undefined &&
        imgPayload.payload?.error === undefined
      ) {
        const { data } = imgPayload.payload;
        const g = {
          id: data.id,
          title: data.title,
          media: data.media,
          media_type: data.media_type,
          url: data.url,
          remarks: data.remarks,
          metaData: data.metaData,
          description: data.description,
          S3_link: data.S3_link,
          text: data.text,
          is_favourite: data.is_favourite,
          collection_id: obj.selectedCollection.id,
          collection_gems: obj.selectedCollection,
          tags: obj.selectedTags,
          showThumbnail: data?.showThumbnail,
          fileType: data?.fileType,
          imageColor: data?.imageColor || [],
        };
        message.success(TextMessage.BOOKMARK_CREATE_TEXT);
        setButtonLoading(false);
        setOpen(false);
        setSelectedFileType("");
        setSelectedMediaType("");
        setSelectedPlatform("");
        setSelectedProfileType("");
        setBlocks([
          ...blocks,
          {
            ...g,
            author: {
              id: parseInt(session?.userId),
            },
          },
        ]);
      } else {
        setButtonLoading(false);
        // message.error(TextMessage.ERROR_TEXT)
      }
      return;
    }

    if (selectedType?.name === "Code") {
      setButtonLoading(true);
      const payload = {
        ...finalObj,
        code,
        langugae: codeLanguage,
      };
      const res = await dispatch(addCode(payload));
      if (res.error === undefined && res?.payload?.error === undefined) {
        const { data } = res.payload;
        if (data) {
          const d = data;
          const g = {
            id: d.id,
            title: d.title,
            media: d.media,
            media_type: d.media_type,
            url: d.url,
            remarks: d.remarks,
            metaData: d.metaData,
            description: d.description,
            S3_link: d.S3_link,
            is_favourite: d.is_favourite,
            collection_id: obj.selectedCollection.id,
            tags: obj.selectedTags,
            showThumbnail: d?.showThumbnail,
            code: d.code,
            langugae: d.langugae,
          };

          message.success(TextMessage.BOOKMARK_CREATE_TEXT);
          setButtonLoading(false);
          setOpen(false);
          setSelectedFileType("");
          setSelectedMediaType("");
          setSelectedPlatform("");
          setSelectedProfileType("");
          setBlocks([
            ...blocks,
            {
              ...g,
              author: {
                id: parseInt(session?.userId),
              },
            },
          ]);
        }
      } else {
        setButtonLoading(false);
        // message.error(TextMessage.ERROR_TEXT)
      }
      return;
    }

    if (
      selectedType?.name === "Profile" &&
      selectedPlatform &&
      !selectedProfileType
    ) {
      if (!socialUserName) {
        message.error("Username is required");
        return;
      }
      let url = null;
      setButtonLoading(true);
      //get url from platform
      if (
        platformType !== "Medium" &&
        platformType !== "LinkedIn" &&
        platformType !== "Steam" &&
        platformType !== "Mastodon" &&
        platformType !== "Goodreads"
      ) {
        url = getProfileUrl(platformType, socialUserName);
      }

      const res = await getDetails(url || socialUserName);

      if (!res?.title) {
        setButtonLoading(false);
        // message.error(TextMessage.ERROR_TEXT)
        setSocialUsername("");
        return;
      }

      finalObj = {
        ...finalObj,
        platform: platformType,
        title: res?.title || "",
        description: res?.description || "",
        metaData: {
          type: "Profile",
          title: res?.title || "",
          icon: res?.favIconSrc || "",
          defaultIcon: res?.defaultFavIconSrc || "",
          url: url,
          covers: [res?.imageUrl] || null,
        },
        url: url || socialUserName || res?.url,
        media: {
          ...finalObj.media,
          // cardBgColor: getColorForProfilePlatform(platformType)
        },
      };

      const gemRes = await dispatch(addGem({ data: finalObj }));
      if (gemRes.error === undefined && gemRes.payload.error === undefined) {
        const { data } = gemRes.payload;
        if (data.data) {
          const d = data.data;
          const g = {
            id: d.id,
            title: d.title,
            media: d.media,
            media_type: d.media_type,
            url: d.url,
            remarks: d.remarks,
            metaData: d.metaData,
            description: d.description,
            S3_link: d.S3_link,
            is_favourite: d.is_favourite,
            collection_id: obj.selectedCollection.id,
            tags: obj.selectedTags,
            showThumbnail: d?.showThumbnail,
            expander: d?.expander,
            socialfeed_obj: d?.socialfeed_obj,
            platform: d?.platform,
          };
          message.success(TextMessage.BOOKMARK_CREATE_TEXT);
          setButtonLoading(false);
          // setOpen(false)
          setBlocks([
            ...blocks,
            {
              ...g,
              author: {
                id: parseInt(session?.userId),
              },
            },
          ]);
          setSelectedFileType("");
          setSelectedMediaType("");
          setSelectedPlatform("");
          setSelectedProfileType("");
        }

        const key = platformType.toLowerCase();

        if (
          socialLinks.hasOwnProperty(key) &&
          socialLinks[key].hasOwnProperty("username") &&
          socialLinks[key].username
        ) {
          setOpen(false);
          return;
        }

        const socialsLinksObj = {
          ...socialLinks,
          [key]: {
            username: socialUserName,
          },
        };
        const payload = {
          socialLinks: socialsLinksObj,
        };
        setOpen(false);
        setSocialLinks(payload.socialLinks);
        dispatch(updateUser(payload));
        setSocialUsername("");
      } else {
        setButtonLoading(false);
        // message.error(TextMessage.ERROR_TEXT)
        setSocialUsername("");
      }
      return;
    }

    if (selectedType?.name === "Profile" && selectedProfileType) {
      const finalObj = {
        title: profileContactTitle,
        description: profileContactDescription,
        media_type: "Profile",
        author: session.userId ? parseInt(session.userId) : null,
        url: "",
        metaData: {
          type: "Profile",
          title: profileContactTitle,
          icon: "",
          defaultIcon: "",
          url: "",
          covers: [""],
        },
        collection_gems: selectedCollection.id,
        remarks: "",
        tags: [],
        is_favourite: false,
        media: {
          covers: [""],
          bioContactFields: bioContactFields,
          type: "contact",
          shape: "square",
          x: (blocksLength * 2) % (getHandWUnitsTitle(screenWidth).width || 10),
          y: Infinity,
        },
        collections: selectedCollection.id,
      };
      setButtonLoading(true);
      const gemRes = await dispatch(addGem({ data: finalObj }));
      if (gemRes.error === undefined && gemRes.payload.error === undefined) {
        const { data } = gemRes.payload;
        if (data.data) {
          const d = data.data;
          const g = {
            id: d.id,
            title: d.title,
            media: d.media,
            media_type: d.media_type,
            url: d.url,
            remarks: d.remarks,
            metaData: d.metaData,
            description: d.description,
            S3_link: d.S3_link,
            is_favourite: d.is_favourite,
            collection_id: selectedCollection.id,
            tags: [],
          };
          message.success(TextMessage.BOOKMARK_CREATE_TEXT);
          setButtonLoading(false);
          setOpen(false);
          setSelectedFileType("");
          setSelectedMediaType("");
          setSelectedPlatform("");
          setSelectedProfileType("");
          setBlocks([
            ...blocks,
            {
              ...g,
              author: {
                id: parseInt(session?.userId),
                username: session?.username,
              },
            },
          ]);
        }
      } else {
        setButtonLoading(false);
        // message.error(TextMessage.ERROR_TEXT)
      }
      return;
    }

    if (
      selectedType?.name === "Profile" &&
      !selectedPlatform &&
      !selectedProfileType
    ) {
      finalObj = {
        ...finalObj,
        platform: platformType,
      };
    }

    if (selectedType?.name === "Quote") {
      const media = {
        ...finalObj.media,
        notes: obj.remarks,
        color: highlightedColor,
        text: highlightedText,
        link: obj.assetUrl,
        collections: obj.selectedCollection?.id,
        tags: obj.selectedTags?.map((t) => {
          return t.id;
        }),
        type:
          typeof obj.selectedType === "object"
            ? obj.selectedType?.name
            : obj.selectedType,
        // box: highlightBox,
        _id: uuidv4(),
        // details: highlightDetails,
        styleClassName: highlightClass,
        shape: "square",
      };
      finalObj = {
        ...finalObj,
        media,
        title: highlightedText,
      };
    }
    if (selectedType?.name === "Note") {
      const media = {
        ...finalObj.media,
        notes: obj.remarks,
        color: highlightedColor,
        text: highlightedText || audioEnhancedText,
        originalText: audioOriginalText,
        link: obj.assetUrl,
        collections: obj.selectedCollection?.id,
        tags: obj.selectedTags?.map((t) => {
          return t.id;
        }),
        type:
          typeof obj.selectedType === "object"
            ? obj.selectedType?.name
            : obj.selectedType,
        _id: uuidv4(),
        styleClassName: highlightClass,
        noteType: selectedNoteType,
        shape:
          selectedNoteType === "title" ? "small-rectangle" : "small-square",
        textAlign: "left",
        justifyContent: "flex-start",
        fontWeight: false,
        textUnderline: false,
        textItalic: false,
        fontSize: "14px",
      };
      finalObj = {
        ...finalObj,
        media,
        title: highlightedText || audioEnhancedText,
      };
    }

    if (selectedType?.name === "Ai Prompt") {
      if (htmlText === "") {
        message.error("Please enter a text for Ai prompt");
        return;
      }
      const expander =
        plainText && obj.shortUrlObj.length > 0
          ? [
              ...obj.shortUrlObj,
              {
                type: "prompt",
                keyword: obj.shortUrlObj[0].keyword,
                url: obj.assetUrl,
                text: htmlText,
                plainText: plainText,
              },
            ]
          : obj.shortUrlObj;

      finalObj = {
        ...finalObj,
        text: htmlText,
        title:
          plainText && obj?.shortUrlObj && Array.isArray(obj?.shortUrlObj)
            ? obj?.shortUrlObj[0]?.keyword + " " + plainText.substring(0, 20)
            : plainText || htmlText || obj.title,
        expander: expander,
        isPublicPrompt: promptType === "public" ? true : false,
        is_enable_for_all_sites: enableSites,
        prompt_priority_sites: prioritySites,
        prompt_category: promptCategory,
      };
    }
    if (selectedType?.name === "Text Expander") {
      if (htmlText === "") {
        message.error("Please enter a text for text expander");
        return;
      }
      const expander =
        plainText && obj.shortUrlObj.length > 0
          ? [
              ...obj.shortUrlObj,
              {
                type: "expander",
                keyword: obj.shortUrlObj[0].keyword,
                url: obj.assetUrl,
                text: htmlText,
                plainText: plainText,
              },
            ]
          : obj.shortUrlObj;
      finalObj = {
        ...finalObj,
        text: htmlText,
        title:
          plainText && obj?.shortUrlObj && Array.isArray(obj?.shortUrlObj)
            ? obj?.shortUrlObj[0]?.keyword + " " + plainText.substring(0, 20)
            : plainText || htmlText || obj.title,
        expander: expander,
        is_enable_for_all_sites: enableSites,
        prompt_priority_sites: prioritySites,
      };
    }

    if (selectedType?.name === "Product") {
      finalObj = {
        ...finalObj,
        media: {
          ...finalObj.media,
          covers: finalCovers,
          price: obj.price || "",
        },
      };
    }

    if (selectedType?.name === "Citation") {
      finalObj = {
        ...finalObj,
        media: {
          ...finalObj.media,
          covers: finalCovers,
          citation: citationText,
          credibility: credibility,
          citation_format: citation,
          citationAuthor: citationAuthor,
          citationDate: citationDate,
        },
      };
    }

    if (selectedType?.name === "SocialFeed") {
      finalObj = {
        ...finalObj,
        platform: platformType || "",
        post_type: tweetType,
        socialfeed_obj: obj?.socialfeed_obj || {
          authorDisplayName: "",
          date: "",
          medias: [
            {
              url: obj.imageUrl,
            },
          ],
          text: obj.description,
          tweetUrl: obj.assetUrl,
        },
        media: {
          ...finalObj.media,
          isWeb: true,
          shape: "square",
          html: html,
        },
      };
    }

    if (selectedType?.name === "Testimonial") {
      let finalSrc;
      let finalSrcAudio;
      let finalSrcVideo;
      if (testimonialType === "image") {
        if (imageFile && fileType === "file") {
          const formData = new FormData();
          formData.append("files", imageFile);
          const imgRes = await dispatch(uploadScreenshots(formData));
          if (
            imgRes.error === undefined &&
            imgRes.payload?.error === undefined
          ) {
            const { data } = imgRes.payload;
            if (data && data.length !== 0) {
              const src = data[0];
              finalSrc = src;
              setTestimonialAttachImage(src);
            }
          }
        }

        if (fileType === "url") {
          finalSrc = imageUrl;
        }
      }

      if (testimonialType === "audio") {
        if (fileType === "file") {
          finalSrcAudio = audioFile;
        }

        if (fileType === "record") {
          finalSrcAudio = audioRecordSrc;
        }

        if (fileType === "url") {
          finalSrcAudio = assetUrl;
        }
      }

      if (testimonialType === "video") {
        if (fileType === "file") {
          finalSrcVideo = videoFile;
        }

        if (fileType === "url") {
          finalSrcVideo = assetUrl;
        }
      }

      finalObj = {
        ...finalObj,
        title: testimonialTagLine,
        description: testimonial,
        metaData: {
          type:
            typeof obj.selectedType === "object"
              ? obj.selectedType?.name
              : obj.selectedType,
          title: testimonialTagLine,
          icon: obj.imageUrl || "",
          url: obj.assetUrl,
          covers: finalCovers,
          docImages: obj.docImages,
        },
        media: {
          covers: finalCovers,
          testimonial: testimonial,
          attachImage: finalSrc || "",
          author: testimonialAuthor,
          date: testimonialDate,
          platform: testimonialPlatform,
          product: testimonialProduct,
          rating: testimonialRating,
          tagLine: testimonialTagLine,
          url: obj.assetUrl || testimonialUrl,
          testimonialType: testimonialType,
          attachAudio: finalSrcAudio || "",
          fileType: fileType,
          attachVideo: finalSrcVideo || "",
          avatar: testimonialAvatarImage || "",
          html: html,
        },
      };

      if (!finalObj?.media?.tagLine) {
        message.error("Please fill required fields");
        return;
      }

      setButtonLoading(true);
      const gemRes = await dispatch(addGem({ data: finalObj }));
      if (gemRes.payload?.data?.data?.id) {
        const { data } = gemRes.payload;
        if (data.data) {
          const d = data.data;
          const g = {
            id: d.id,
            title: d.title,
            media: d.media,
            media_type: d.media_type,
            url: d.url,
            remarks: d.remarks,
            metaData: d.metaData,
            description: d.description,
            S3_link: d.S3_link,
            is_favourite: d.is_favourite,
            collection_id: obj.selectedCollection.id,
            tags: obj.selectedTags,
            showThumbnail: d?.showThumbnail,
            platform: d?.platform,
          };

          message.success(TextMessage.BOOKMARK_CREATE_TEXT);
          setButtonLoading(false);
          setOpen(false);
          setSelectedFileType("");
          setSelectedMediaType("");
          setSelectedPlatform("");
          setSelectedProfileType("");
          setBlocks([
            ...blocks,
            {
              ...g,
              author: {
                id: parseInt(session?.userId),
              },
            },
          ]);
        }
      } else {
        setButtonLoading(false);
        message.error(TextMessage.ERROR_TEXT);
      }

      return;
    }

    if (selectedType?.name === "Book") {
      finalObj = {
        ...finalObj,
        entityObj: entityObj ? entityObj : [],
        media: {
          ...finalObj.media,
          myRating: rate,
          myStatus: readStatus,
          dateRead: dateRead,
          readStart: dateRead,
          status: readStatus,
        },
      };
    }
    if (selectedType?.name === "Movie") {
      // finalObj = {
      //   ...finalObj,
      //   entityObj: entityObj,
      // }
      finalObj = {
        ...finalObj,
        entityObj: entityObj ? entityObj : [],
        media: {
          ...finalObj.media,
          myRating: rate,
          myStatus: watchStatus,
          dateRead: dateRead,
          readStart: dateRead,
          status: watchStatus,
        },
      };
    }

    if (!finalObj?.title) {
      setButtonLoading(true);
      let platType = null;
      let techType = null;
      const url = normalizeUrl(assetUrl);
      setAssetUrl(url);
      if (Validator.validate("url", url, true)) {
        message.error(Validator.validate("url", url, true));
        setShowAssetUrlInput(false);
        handleClearFields();
        return;
      }
      const type = await setMediaTypeBasedOnUrl(url);
      setSelectedTags(type);
      if (
        type === "Profile" ||
        selectedType?.name === "Profile" ||
        selectedType?.name === "SocialFeed"
      ) {
        platType = getPlatformFromURL(url);
      }
      if (selectedType?.name === "App" && url) {
        const res = await dispatch(fetchDomainDetails(url, false, true));
        techType = res?.payload?.data?.technologystack || [];
      }
      if (url) {
        let docsImgs = await getAllSiteImages(url);
        const res = await getDetails(url);
        if (!res?.title) {
          setButtonLoading(false);
          message.error(TextMessage.ERROR_TEXT);
          return;
        }
        const mc =
          obj.covers && obj.covers.length !== 0 ? obj.covers : [res?.imageUrl];
        const fc = removeDuplicates(mc);
        finalObj = {
          ...finalObj,
          title: res?.title,
          description: res?.description,
          media_type: type,
          author: session.userId ? parseInt(session.userId) : null,
          url: url,
          metaData: {
            type: type,
            title: res?.title,
            icon: res?.favIconSrc || "",
            defaultIcon: res?.defaultFavIconSrc || "",
            url: url,
            covers: fc,
            docImages: res?.docImages || docsImgs,
            defaultThumbnail: res?.imageUrl,
          },
          collection_gems: obj.selectedCollection.id,
          remarks: obj.remarks,
          tags: obj.selectedTags?.map((t) => {
            return t.id;
          }),
          is_favourite: obj.favorite,
          expander: obj.shortUrlObj,
          fileType: "url",
          price: obj.price,
          isRead: isReaded === "read" ? true : false,
          media: {
            covers: fc,
            techStack: techType,
            articleObj: res?.articleObj,
            platform: platType,
            html: res?.html,
            citation: res?.cText,
            credibility: res?.cCredebility,
            citation_format: res?.citation,
            citationAuthor: res?.cAuthor,
            citationDate: res?.cDate,
          },
          collections: obj.selectedCollection.id,
        };
      }
    }

    // selectedType?.name === 'Link' || selectedType?.name === 'App' || selectedType?.name === 'Article'
    setButtonLoading(true);
    const gemRes = await dispatch(addGem({ data: finalObj }));
    if (gemRes.payload?.data?.data?.id) {
      const { data } = gemRes.payload;
      if (data.data) {
        const d = data.data;
        const g = {
          id: d.id,
          title: d.title,
          media: d.media,
          media_type: d.media_type,
          url: d.url,
          remarks: d.remarks,
          metaData: d.metaData,
          description: d.description,
          S3_link: d.S3_link,
          is_favourite: d.is_favourite,
          collection_id: obj.selectedCollection.id,
          tags: obj.selectedTags,
          showThumbnail: d?.showThumbnail,
          expander: d?.expander,
          socialfeed_obj: d?.socialfeed_obj,
          platform: d?.platform,
          custom_fields_obj: d?.custom_fields_obj,
          isRead: d?.isRead,
          entityObj: d?.entityObj,
        };
        message.success(TextMessage.BOOKMARK_CREATE_TEXT);
        setButtonLoading(false);
        setOpen(false);
        setSelectedFileType("");
        setSelectedMediaType("");
        setSelectedPlatform("");
        setSelectedProfileType("");
        setBlocks([
          ...blocks,
          {
            ...g,
            author: {
              id: parseInt(session?.userId),
            },
          },
        ]);
      }
    } else if (gemRes.payload?.data?.status === 400) {
      setButtonLoading(false);
      message.error(TextMessage.GEM_EXISTS_ERROR_TEXT);
    } else {
      setButtonLoading(false);
      // message.error(TextMessage.ERROR_TEXT)
    }
    return;
  };

  const handleAddField = (fieldKey) => {
    const fieldToAdd = availableFields.find((field) => field.key === fieldKey);
    setBioContactFields([...bioContactFields, fieldToAdd]);
    setAvailableFields(
      availableFields.filter((field) => field.key !== fieldKey)
    );
  };

  const handleRemoveField = (fieldKey) => {
    const fieldToRemove = bioContactFields.find(
      (field) => field.key === fieldKey
    );
    setAvailableFields([...availableFields, fieldToRemove]);
    setBioContactFields(
      bioContactFields.filter((field) => field.key !== fieldKey)
    );
  };
  ////not answered
  const updateCustomPropertyValue = (e, i, type) => {
    const arr = [...customPropertyWithoutAnswer];

    if (type === "text") {
      arr[i] = {
        ...arr[i],
        answer: e.target.value,
      };

      setCustomPropertyWithoutAnswer(arr);
    }

    if (type === "select") {
      arr[i] = {
        ...arr[i],
        answer: e,
      };

      setCustomPropertyWithoutAnswer(arr);
    }
    if (type === "multi") {
      arr[i] = {
        ...arr[i],
        answer: e,
      };

      setCustomPropertyWithoutAnswer(arr);
    }

    if (type === "checkbox") {
      arr[i] = {
        ...arr[i],
        answer: e.target.checked,
      };

      setCustomPropertyWithoutAnswer(arr);
    }
  };

  const renderCustomFieldProperty = (item, i) => {
    if (
      item.type.toLowerCase() === "text" ||
      item.type.toLowerCase() === "number" ||
      item.type.toLowerCase() === "email" ||
      item.type.toLowerCase() === "url" ||
      item.type.toLowerCase() === "phone" ||
      item.type.toLowerCase() === "formula"
    ) {
      return (
        <div className="pt-4">
          <h6 className="block text-xs font-medium text-gray-500 mb-1">
            {item.name}
          </h6>
          <AntInput
            placeholder={item.name}
            style={{ width: "100%" }}
            onChange={(e) => updateCustomPropertyValue(e, i, "text")}
            // value={item?.answer || ''}
            defaultValue={item?.defaultValue || ""}
            className="rounded-md"
            size="small"
          />
        </div>
      );
    }

    if (
      item.type.toLowerCase() === "status" ||
      item.type.toLowerCase() === "select"
    ) {
      return (
        <div className="pt-4">
          <h6 className="block text-xs font-medium text-gray-500 mb-1">
            {item.name}
          </h6>
          <Select
            className="w-full"
            placeholder={item.name}
            onChange={(value) => updateCustomPropertyValue(value, i, "select")}
            // value={item?.answer || null}
            defaultValue={item?.defaultValue || null}
          >
            {item.options.map((item, i) => (
              <Option value={item.value} key={item.value}>
                {item.value}
              </Option>
            ))}
          </Select>
        </div>
      );
    }

    if (item.type.toLowerCase() === "multi-select") {
      return (
        <div className="pt-4">
          <h6 className="block text-xs font-medium text-gray-500 mb-1">
            {item.name}
          </h6>
          <Select
            className="w-full"
            placeholder={item.name}
            onChange={(value) => updateCustomPropertyValue(value, i, "multi")}
            // value={item?.answer || []}
            defaultValue={item?.defaultValue || []}
            mode={"multiple"}
          >
            {item.options.map((item, i) => (
              <Option value={item.value} key={item.value}>
                {item.value}
              </Option>
            ))}
          </Select>
        </div>
      );
    }

    if (item.type.toLowerCase() === "checkbox") {
      return (
        <div className="pt-4">
          <AntCheckbox
            darkColor={true}
            // value={item?.answer}
            // defaultValue={item?.defaultValue}
            defaultChecked={item?.defaultValue}
            onChange={(e) => updateCustomPropertyValue(e, i, "checkbox")}
          >
            {item.name}
          </AntCheckbox>
        </div>
      );
    }

    if (item.type.toLowerCase() === "date") {
      return (
        <div className="pt-4">
          <h6 className="block text-xs font-medium text-gray-500 mb-1">
            {item.name}
          </h6>
          <DatePicker
            onChange={(date, dateString) => {
              const arr = [...customPropertyWithoutAnswer];
              arr[i] = {
                ...arr[i],
                answer: dateString,
              };

              setCustomPropertyWithoutAnswer(arr);
            }}
            showToday={false}
            format={"DD-MM-YYYY"}
            // value={item?.answer ? moment(item.answer,'DD-MM-YYYY') : null}
            defaultValue={
              item?.defaultValue
                ? moment(item.defaultValue, "DD-MM-YYYY")
                : null
            }
            // allowClear={false}
            className="w-full"
          />
        </div>
      );
    }

    // if(item.type.toLowerCase() === 'created time'){
    //     return <div className='pt-4'>
    //     <h6 className="block text-xs font-medium text-gray-500 mb-1">{item.name}</h6>
    //     <div className="flex items-center justify-between">
    //         <div>{singleBookmarkGem.createdAt}</div>
    //         <DocumentDuplicateIcon className="h-5 w-5 cursor-pointer" onClick={() => handleCopy(singleBookmarkGem.createdAt)}/>
    //     </div>
    //     </div>
    // }
    // if(item.type.toLowerCase() === 'last edited time'){
    //     return <div className='pt-4'>
    //     <h6 className="block text-xs font-medium text-gray-500 mb-1">{item.name}</h6>
    //     <div className="flex items-center justify-between">
    //         <div>{singleBookmarkGem.updatedAt}</div>
    //         <DocumentDuplicateIcon className="h-5 w-5 cursor-pointer" onClick={() => handleCopy(singleBookmarkGem.updatedAt)}/>
    //     </div>
    //     </div>
    // }
    // if(item.type.toLowerCase() === 'created by' || item.type.toLowerCase() === 'last edited by'){
    //     return <div className='pt-4'>
    //     <h6 className="block text-xs font-medium text-gray-500 mb-1">{item.name}</h6>
    //     <div className="flex items-center justify-between">
    //         <div>{singleBookmarkGem?.author?.data?.attributes?.username}</div>
    //         <DocumentDuplicateIcon className="h-5 w-5 cursor-pointer" onClick={() => handleCopy(singleBookmarkGem?.author?.data?.attributes?.username)}/>
    //     </div>
    //     </div>
    // }
  };

  const handleSubmitPublic = async (type) => {
    if (
      selectedType === "Link" &&
      checkBookmarkExists([selectedCollection], assetUrl)
    ) {
      message.error("This bookmark already exist!");
      return;
    }

    const NOT_VALIDATING_URLS_TYPE = [
      "Audio",
      "Video",
      "PDF",
      "Quote",
      "Note",
      "Ai Prompt",
      "Text Expander",
    ];
    if (
      fileType !== "file" &&
      assetUrl?.length === 0 &&
      NOT_VALIDATING_URLS_TYPE.indexOf(selectedType?.name) === -1
    ) {
      message.error("Please enter url");
      return;
    }
    setError(false);
    if (selectedCollection.id === undefined) {
      setError(true);
      return;
    }

    if (
      (selectedType?.name === "Ai Prompt" ||
        selectedType?.name === "Text Expander") &&
      !shortendurl
    ) {
      message.error("Please enter short url");
      return;
    }
    const shortUrlObj = shortendurl
      ? [{ type: "link", keyword: shortendurl, url: assetUrl, text: "" }]
      : [];

    const obj = {
      title,
      description,
      selectedTags,
      assetUrl,
      selectedType,
      remarks,
      favorite,
      covers,
      imageUrl,
      selectedCollection,
      shortUrlObj,
      isReaded: isReaded === "read",
      fileType:
        selectedType?.name === "PDF" ||
        selectedType?.name === "Video" ||
        selectedType?.name === "Audio" ||
        selectedType?.name === "Image"
          ? fileType
          : undefined,
      price: `${currencySymbol}${productPrice}`,
      favIconSrc,
      docImages,
      defaultFavIconSrc,
    };

    const mediaCovers =
      obj.covers && obj.covers.length !== 0 ? obj.covers : [obj.imageUrl];
    const finalCovers = removeDuplicates(mediaCovers);

    const data = customPropertyWithoutAnswer?.map((item) => {
      let obj = { ...item };

      if (
        !obj?.answer &&
        (!Array.isArray(obj?.defaultValue) ||
          (Array.isArray(obj?.defaultValue) && obj?.defaultValue?.length > 0))
      ) {
        obj.answer = obj?.defaultValue;
      }

      return obj;
    });

    const filteredWithAnswer = data?.filter((item) => item?.answer) || [];

    let finalObj = {
      title: obj.title,
      description: obj.description,
      media_type:
        typeof obj.selectedType === "object"
          ? obj.selectedType?.name
          : obj.selectedType,
      author: session?.userId || null,
      url: obj.assetUrl,
      metaData: {
        type:
          typeof obj.selectedType === "object"
            ? obj.selectedType?.name
            : obj.selectedType,
        title: obj.heading || obj.title,
        icon: obj?.favIconSrc || "",
        defaultIcon: obj?.defaultFavIconSrc || "",
        url: obj.assetUrl,
        covers: finalCovers,
        docImages: obj.docImages,
        defaultThumbnail: obj.imageUrl,
      },
      collection_gems: obj.selectedCollection.id,
      remarks: obj.remarks,
      tags: obj.selectedTags?.map((t) => {
        return t.id;
      }),
      is_favourite: obj.favorite,
      expander: obj.shortUrlObj,
      fileType: obj.fileType,
      price: obj.price,
      isRead: isReaded === "read" ? true : false,
      media: {
        covers: finalCovers,
        techStack: techStack,
      },
      collections: obj.selectedCollection.id,
      custom_fields_obj: [...filteredWithAnswer],
    };

    if (selectedType?.name === "Article") {
      finalObj = {
        ...finalObj,
        media: {
          ...finalObj.media,
          articleObj: articleObj,
        },
      };
    }

    if (selectedType?.name === "PDF") {
      if (!pdfFile && obj?.fileType === "file") {
        message.error("Please upload a valid pdf file!");
        return;
      }
      if (pdfFile && obj?.fileType === "file") {
        setButtonLoading(true);
        const formData = new FormData();
        formData.append("files", pdfFile);
        formData.append("title", obj.title);
        formData.append("description", obj.description);
        formData.append(
          "metaData",
          JSON.stringify({
            covers: finalCovers,
            icon: obj?.favIconSrc || "",
            defaultIcon: obj?.defaultFavIconSrc || "",
            docImages: obj.docImages,
          })
        );
        formData.append("url", obj.assetUrl);
        formData.append(
          "tags",
          JSON.stringify(
            obj.selectedTags.map((t) => {
              return t.id;
            })
          )
        );
        formData.append("notes", obj.remarks);
        formData.append("is_favourite", obj.favorite);
        formData.append("collections", obj.selectedCollection.id);
        // formData.append("showThumbnail", obj.showThumbnail)
        formData.append("fileType", obj?.fileType);
        formData.append("author", finalObj?.author);
        formData.append(
          "custom_fields_obj",
          JSON.stringify(filteredWithAnswer)
        );

        const audio = isLoggedIn
          ? await dispatch(createPdf(formData))
          : await dispatch(createPdfPublic(formData));
        if (
          audio.error === undefined &&
          audio.payload &&
          audio.payload.error === undefined
        ) {
          message.success(TextMessage.BOOKMARK_APPROVE_REQUEST_TEXT);
          setButtonLoading(false);
          setOpen(false);
          return;
        } else {
          setButtonLoading(false);
          // message.error(TextMessage.ERROR_TEXT)
          setOpen(false);
        }
        return;
      }

      if (obj?.fileType === "url") {
        const gemRes = isLoggedIn
          ? await dispatch(addGem({ data: finalObj }))
          : await dispatch(addGemPublic({ data: finalObj }));
        if (gemRes.error === undefined && gemRes.payload.error === undefined) {
          message.success(TextMessage.BOOKMARK_APPROVE_REQUEST_TEXT);
          setButtonLoading(false);
          setOpen(false);
          return;
        } else {
          setButtonLoading(false);
          // message.error(TextMessage.ERROR_TEXT)
          setOpen(false);
          return;
        }
      }
    }

    if (selectedType?.name === "Audio") {
      if (!audioFile && obj?.fileType === "file") {
        message.error("Please upload a valid audio file!");
        return;
      }
      setButtonLoading(true);
      const formData = new FormData();
      formData.append(
        "files",
        obj.fileType === "record" ? audioRecordSrc : audioFile
      );
      formData.append(
        "title",
        obj.fileType === "record" ? audioOriginalText : obj.title
      );
      formData.append("description", obj.description);
      formData.append("expander", obj.shortUrlObj);
      formData.append(
        "metaData",
        JSON.stringify({
          covers: finalCovers,
          icon: obj?.favIconSrc,
          defaultIcon: obj?.defaultFavIconSrc || "",
          docImages: obj.docImages,
        })
      );
      formData.append("url", obj.assetUrl);
      formData.append(
        "tags",
        JSON.stringify(
          obj.selectedTags.map((t) => {
            return t.id;
          })
        )
      );
      formData.append("notes", obj.remarks);
      formData.append("is_favourite", obj.favorite);
      formData.append("collections", obj.selectedCollection.id);
      formData.append("fileType", obj?.fileType);
      formData.append("author", finalObj?.author);
      formData.append("custom_fields_obj", JSON.stringify(filteredWithAnswer));
      formData.append(
        "media",
        JSON.stringify({
          html: html,
        })
      );
      formData.append("media_type", selectedType?.name || "Audio");

      let isRecord = false;
      if (obj?.fileType === "record") isRecord = true;
      const audio = isLoggedIn
        ? await dispatch(createAudio(formData, isRecord))
        : await dispatch(createAudioPublic(formData));
      if (
        audio.error === undefined &&
        audio.payload &&
        audio.payload.error === undefined
      ) {
        message.success(TextMessage.BOOKMARK_APPROVE_REQUEST_TEXT);
        setButtonLoading(false);
        setOpen(false);
        return;
      } else {
        setButtonLoading(false);
        // message.error(TextMessage.ERROR_TEXT)
        setOpen(false);
      }
      return;
    }

    if (selectedType?.name === "Video") {
      if (!videoFile && obj?.fileType === "file") {
        message.error("Please upload a valid video file!");
        return;
      }
      if (videoFile && obj?.fileType === "file") {
        setButtonLoading(true);
        const formData = new FormData();
        formData.append("files", videoFile);
        formData.append("title", obj.title);
        formData.append("description", obj.description);
        formData.append(
          "metaData",
          JSON.stringify({
            covers: finalCovers,
            icon: obj?.favIconSrc || "",
            defaultIcon: obj?.defaultFavIconSrc || "",
            docImages: obj.docImages,
          })
        );
        formData.append("url", obj.assetUrl);
        formData.append(
          "tags",
          JSON.stringify(
            obj.selectedTags.map((t) => {
              return t.id;
            })
          )
        );
        formData.append("notes", obj.remarks);
        formData.append("is_favourite", obj.favorite);
        formData.append("collections", obj.selectedCollection.id);
        // formData.append("showThumbnail", obj.showThumbnail)
        formData.append("fileType", obj?.fileType);
        formData.append("author", finalObj?.author);
        formData.append(
          "custom_fields_obj",
          JSON.stringify(filteredWithAnswer)
        );

        const audio = isLoggedIn
          ? await dispatch(createVideo(formData))
          : await dispatch(createVideoPublic(formData));
        if (
          audio.error === undefined &&
          audio.payload &&
          audio.payload.error === undefined
        ) {
          message.success(TextMessage.BOOKMARK_APPROVE_REQUEST_TEXT);
          setButtonLoading(false);
          setOpen(false);
          return;
        } else {
          setButtonLoading(false);
          // message.error(TextMessage.ERROR_TEXT)
          setOpen(false);
        }
        return;
      }

      if (obj?.fileType === "url") {
        setButtonLoading(true);
        const finalData = {
          ...finalObj,
          media: {
            ...finalObj.media,
            html: html,
          },
        };
        const gemRes = isLoggedIn
          ? await dispatch(addGem({ data: finalData }))
          : await dispatch(addGemPublic({ data: finalObj }));
        if (gemRes.error === undefined && gemRes.payload.error === undefined) {
          message.success(TextMessage.BOOKMARK_APPROVE_REQUEST_TEXT);
          setButtonLoading(false);
          setOpen(false);
          return;
        } else {
          setButtonLoading(false);
          // message.error(TextMessage.ERROR_TEXT)
          setOpen(false);
        }
      }
    }

    if (selectedType?.name === "Image") {
      if (!imageFile && obj?.fileType === "file") {
        message.error("Please upload valid file!");
        return;
      }
      setButtonLoading(true);
      let finalSrc;
      if (imageFile) {
        const formData = new FormData();
        formData.append("files", imageFile);
        const imgRes = await dispatch(uploadScreenshots(formData));
        if (imgRes.error === undefined && imgRes.payload?.error === undefined) {
          const { data } = imgRes.payload;
          if (data && data.length !== 0) {
            finalSrc = data[0];
          }
        }
      }

      const payload = {
        ...finalObj,
        image: finalSrc || imageUrl,
        metaData: {
          ...finalObj.metaData,
          covers: finalCovers?.length > 0 ? finalCovers : [finalSrc],
        },
      };

      const imgPayload = isLoggedIn
        ? await dispatch(addImage(payload, payload.image))
        : await dispatch(addImagePublic(payload, payload.image));
      if (
        imgPayload.error === undefined &&
        imgPayload.payload?.error === undefined
      ) {
        message.success(TextMessage.BOOKMARK_APPROVE_REQUEST_TEXT);
        setButtonLoading(false);
        setOpen(false);
        return;
      } else {
        setButtonLoading(false);
        // message.error(TextMessage.ERROR_TEXT)
        setOpen(false);
      }
      return;
    }

    if (selectedType?.name === "Code") {
      setButtonLoading(true);
      const payload = {
        ...finalObj,
        code,
        langugae: codeLanguage,
      };
      const res = isLoggedIn
        ? await dispatch(addCode(payload))
        : await dispatch(addCodePublic(payload));
      if (res.error === undefined && res?.payload?.error === undefined) {
        message.success(TextMessage.BOOKMARK_APPROVE_REQUEST_TEXT);
        setButtonLoading(false);
        setOpen(false);
        return;
      } else {
        setButtonLoading(false);
        // message.error(TextMessage.ERROR_TEXT)
        setOpen(false);
      }
      return;
    }

    if (selectedType?.name === "Profile") {
      finalObj = {
        ...finalObj,
        platform: platformType,
      };
    }

    if (selectedType?.name === "Note" || selectedType?.name === "Quote") {
      const media = {
        notes: obj.remarks,
        color: highlightedColor,
        text: highlightedText || audioEnhancedText,
        originalText: audioOriginalText,
        link: obj.assetUrl,
        collections: obj.selectedCollection?.id,
        tags: obj.selectedTags?.map((t) => {
          return t.id;
        }),
        type:
          typeof obj.selectedType === "object"
            ? obj.selectedType?.name
            : obj.selectedType,
        // box: highlightBox,
        _id: uuidv4(),
        // details: highlightDetails,
        styleClassName: highlightClass,
      };
      finalObj = {
        ...finalObj,
        media,
        title: highlightedText || audioEnhancedText,
      };
    }

    if (selectedType?.name === "Ai Prompt") {
      const expander =
        plainText && obj.shortUrlObj.length > 0
          ? [
              ...obj.shortUrlObj,
              {
                type: "prompt",
                keyword: obj.shortUrlObj[0].keyword,
                url: obj.assetUrl,
                text: htmlText,
                plainText: plainText,
              },
            ]
          : obj.shortUrlObj;

      finalObj = {
        ...finalObj,
        text: htmlText,
        title:
          plainText && obj?.shortUrlObj && Array.isArray(obj?.shortUrlObj)
            ? obj?.shortUrlObj[0]?.keyword + " " + plainText.substring(0, 20)
            : plainText || htmlText || obj.title,
        expander: expander,
        isPublicPrompt: promptType === "public" ? true : false,
        is_enable_for_all_sites: enableSites,
        prompt_priority_sites: prioritySites,
        prompt_category: promptCategory,
      };
    }
    if (selectedType?.name === "Text Expander") {
      const expander =
        plainText && obj.shortUrlObj.length > 0
          ? [
              ...obj.shortUrlObj,
              {
                type: "expander",
                keyword: obj.shortUrlObj[0].keyword,
                url: obj.assetUrl,
                text: htmlText,
                plainText: plainText,
              },
            ]
          : obj.shortUrlObj;
      finalObj = {
        ...finalObj,
        text: htmlText,
        title:
          plainText && obj?.shortUrlObj && Array.isArray(obj?.shortUrlObj)
            ? obj?.shortUrlObj[0]?.keyword + " " + plainText.substring(0, 20)
            : plainText || htmlText || obj.title,
        expander: expander,
        is_enable_for_all_sites: enableSites,
        prompt_priority_sites: prioritySites,
      };
    }

    if (selectedType?.name === "Product") {
      finalObj = {
        ...finalObj,
        media: {
          covers: finalCovers,
          price: obj.price || "",
        },
      };
    }

    if (selectedType?.name === "Citation") {
      finalObj = {
        ...finalObj,
        media: {
          covers: finalCovers,
          citation: citationText,
          credibility: credibility,
          citation_format: citation,
          citationAuthor: citationAuthor,
          citationDate: citationDate,
        },
      };
    }

    if (selectedType?.name === "SocialFeed") {
      finalObj = {
        ...finalObj,
        platform: platformType || "",
        post_type: tweetType,
        socialfeed_obj: obj?.socialfeed_obj || {
          authorDisplayName: "",
          date: "",
          medias: [
            {
              url: obj.imageUrl,
            },
          ],
          text: obj.description,
          tweetUrl: obj.assetUrl,
        },
        media: {
          ...finalObj.media,
          isWeb: true,
          html: html,
        },
      };
    }

    if (selectedType?.name === "Testimonial") {
      let finalSrc;
      let finalSrcAudio;
      let finalSrcVideo;
      if (testimonialType === "image") {
        if (imageFile && fileType === "file") {
          const formData = new FormData();
          formData.append("files", imageFile);
          const imgRes = await dispatch(uploadScreenshots(formData));
          if (
            imgRes.error === undefined &&
            imgRes.payload?.error === undefined
          ) {
            const { data } = imgRes.payload;
            if (data && data.length !== 0) {
              const src = data[0];
              finalSrc = src;
              setTestimonialAttachImage(src);
            }
          }
        }

        if (fileType === "url") {
          finalSrc = imageUrl;
        }
      }

      if (testimonialType === "audio") {
        if (fileType === "file") {
          finalSrcAudio = audioFile;
        }

        if (fileType === "record") {
          finalSrcAudio = audioRecordSrc;
        }

        if (fileType === "url") {
          finalSrcAudio = assetUrl;
        }
      }

      if (testimonialType === "video") {
        if (fileType === "file") {
          finalSrcVideo = videoFile;
        }

        if (fileType === "url") {
          finalSrcVideo = assetUrl;
        }
      }

      finalObj = {
        ...finalObj,
        title: testimonialTagLine,
        description: testimonial,
        metaData: {
          type:
            typeof obj.selectedType === "object"
              ? obj.selectedType?.name
              : obj.selectedType,
          title: testimonialTagLine,
          icon: obj.imageUrl || "",
          url: obj.assetUrl,
          covers: finalCovers,
          docImages: obj.docImages,
        },
        media: {
          covers: finalCovers,
          testimonial: testimonial,
          attachImage: finalSrc || "",
          author: testimonialAuthor,
          date: testimonialDate,
          platform: testimonialPlatform,
          product: testimonialProduct,
          rating: testimonialRating,
          tagLine: testimonialTagLine,
          url: obj.assetUrl || testimonialUrl,
          testimonialType: testimonialType,
          attachAudio: finalSrcAudio || "",
          fileType: fileType,
          attachVideo: finalSrcVideo || "",
          avatar: testimonialAvatarImage || "",
          html: html,
        },
      };

      if (!finalObj?.media?.tagLine) {
        message.error("Please fill required fields");
        return;
      }

      setButtonLoading(true);
      const gemRes = isLoggedIn
        ? await dispatch(addGem({ data: finalObj }))
        : await dispatch(addGemPublic({ data: finalObj }));
      if (gemRes.error === undefined && gemRes.payload.error === undefined) {
        message.success(TextMessage.BOOKMARK_APPROVE_REQUEST_TEXT);
        setButtonLoading(false);
        setOpen(false);
      } else {
        setButtonLoading(false);
        // message.error(TextMessage.ERROR_TEXT)
        setOpen(false);
      }

      return;
    }

    if (selectedType?.name === "Book") {
      finalObj = {
        ...finalObj,
        entityObj: entityObj ? entityObj : [],
        media: {
          ...finalObj.media,
          myRating: rate,
          myStatus: readStatus,
          dateRead: dateRead,
        },
      };
    }
    if (selectedType?.name === "Movie") {
      // finalObj = {
      //   ...finalObj,
      //   entityObj: entityObj,
      // }
      finalObj = {
        ...finalObj,
        entityObj: entityObj ? entityObj : [],
        media: {
          ...finalObj.media,
          myRating: rate,
          myStatus: watchStatus,
          dateRead: dateRead,
        },
      };
    }

    if (!finalObj?.title) {
      setButtonLoading(true);
      let platType = null;
      let techType = null;
      const url = normalizeUrl(assetUrl);
      setAssetUrl(url);
      if (Validator.validate("url", url, true)) {
        message.error(Validator.validate("url", url, true));
        setShowAssetUrlInput(false);
        handleClearFields();
        return;
      }
      const type = await setMediaTypeBasedOnUrl(url);
      setSelectedTags(type);
      if (
        type === "Profile" ||
        selectedType?.name === "Profile" ||
        selectedType?.name === "SocialFeed"
      ) {
        platType = getPlatformFromURL(url);
      }
      if (selectedType?.name === "App" && url) {
        const res = await dispatch(fetchDomainDetails(url, false, true));
        techType = res?.payload?.data?.technologystack || [];
      }
      if (url) {
        let docsImgs = await getAllSiteImages(url);
        const res = await getDetails(url);
        if (!res?.title) {
          setButtonLoading(false);
          message.error(TextMessage.ERROR_TEXT);
          return;
        }
        const mc =
          obj.covers && obj.covers.length !== 0 ? obj.covers : [res?.imageUrl];
        const fc = removeDuplicates(mc);
        finalObj = {
          ...finalObj,
          title: res?.title,
          description: res?.description,
          media_type: type,
          author: session.userId ? parseInt(session.userId) : null,
          url: url,
          metaData: {
            type: type,
            title: res?.title,
            icon: res?.favIconSrc || "",
            defaultIcon: res?.defaultFavIconSrc || "",
            url: url,
            covers: fc,
            docImages: res?.docImages || docsImgs,
            defaultThumbnail: res?.imageUrl,
          },
          collection_gems: obj.selectedCollection.id,
          remarks: obj.remarks,
          tags: obj.selectedTags?.map((t) => {
            return t.id;
          }),
          is_favourite: obj.favorite,
          expander: obj.shortUrlObj,
          fileType: "url",
          price: obj.price,
          isRead: isReaded === "read" ? true : false,
          media: {
            covers: fc,
            techStack: techType,
            articleObj: res?.articleObj,
            platform: platType,
            html: res?.html,
            citation: res?.cText,
            credibility: res?.cCredebility,
            citation_format: res?.citation,
            citationAuthor: res?.cAuthor,
            citationDate: res?.cDate,
          },
          collections: obj.selectedCollection.id,
        };
      }
    }

    if (!finalObj?.title) {
      message.error("Please fill required fields");
      return;
    }
    setButtonLoading(true);
    const gemRes = isLoggedIn
      ? await dispatch(addGem({ data: finalObj }, true))
      : await dispatch(addGemPublic({ data: finalObj }));
    if (gemRes.payload?.data?.data?.id) {
      message.success(TextMessage.BOOKMARK_APPROVE_REQUEST_TEXT);
      setButtonLoading(false);
      setOpen(false);
    } else if (gemRes.payload?.data?.status === 400) {
      setButtonLoading(false);
      message.error(TextMessage.GEM_EXISTS_ERROR_TEXT);
      setOpen(false);
    } else {
      setButtonLoading(false);
      message.error(TextMessage.ERROR_TEXT);
      setOpen(false);
    }
    return;
  };

  const handleRibbonText = (e) => {
    const { value } = e.target;

    if (value.length > 15) {
      message.error("Text cant exceed more than 15 characters");
      return;
    }
    setRibbon({ ...ribbon, text: value });
  };

  //new functions
  const enableTitleInput = () => {
    setIsTitleEditing(true);
  };

  const disableTitleInput = () => {
    setIsTitleEditing(false);
  };

  const onKeyDownTitle = (event) => {
    if (event.key === "Enter") {
      disableTitleInput();
    }
  };

  const enableDescriptionInput = () => {
    setIsDescriptionEditing(true);
  };

  const disableDescriptionInput = () => {
    setIsDescriptionEditing(false);
  };

  const onKeyDownDescription = (event) => {
    if (event.key === "Enter") {
      disableDescriptionInput();
    }
  };

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

  const setMediaTypeBasedOnUrl = async (url) => {
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
      const payload = {
        url: url,
      };
      const value = await dispatch(fetchPlatformTypeFromUrl(payload));
      const mediaType = value?.payload?.data?.media_type;
      return mediaType;
    }
  };

  const onKeyDownUrl = async (event) => {
    if (event.key === "Enter") {
      if (!assetUrl) return;
      const url = normalizeUrl(assetUrl);
      setAssetUrl(url);
      if (Validator.validate("url", url, true)) {
        message.error(Validator.validate("url", url, true));
        setShowAssetUrlInput(false);
        handleClearFields();
        return;
      }

      if (
        selectedType?.name === "Profile" ||
        selectedType?.name === "SocialFeed"
      ) {
        const data = getPlatformFromURL(url);
        setPlatformType(data);
      }

      if (selectedType?.name === "App" && url) {
        const res = await dispatch(fetchDomainDetails(url, false, true));
        setTechStack(res?.payload?.data?.technologystack || []);
      }

      if (url) {
        setDocImages(await getAllSiteImages(url));
        fetchWebsiteDetails(url);
        const type = await setMediaTypeBasedOnUrl(assetUrl);
        if (type) setSelectedType(type);

        if (tourStepsEnabled) {
          dispatch(setShowUrlInputFromTourSteps(false));
        }
      }
    }
  };

  const onKeyDownShortUrl = async (event) => {
    if (event.key === "Enter") {
      setShowShortEndInput(false);
    }
  };

  const handleChangeCollapse = (key) => {
    setCollapseKeys(key);
  };

  const onCopyCode = () => {
    if (selectedType?.name === "Code" && code) {
      try {
        copyText(code, "Code copied to clipboard");
      } catch (err) {
        message.error("An error occured while copying this code", "error");
      }
    }

    if (selectedType?.name === "Quote" && highlightedText) {
      try {
        copyText(highlightedText, "Quote copied to clipboard");
      } catch (err) {
        message.error("An error occured while copying this quote", "error");
      }
    }

    if (selectedType?.name === "Citation" && citationText) {
      try {
        copyText(citationText, "Citation copied to clipboard");
      } catch (err) {
        message.error("An error occured while copying this quote", "error");
      }
    }
  };

  const handlePromptType = (e) => {
    setPromptType(e.target.value);
  };

  return (
    <div className="relative">
      <Drawer
        placement={isMobileView ? "bottom" : "right"}
        height={isMobileView ? "90%" : "inherit"}
        // style={isMobileView && {
        //   borderTopLeftRadius:'24px',
        //   borderTopRightRadius:'24px'
        // }}
        width={isMobileView ? "90%" : "460px"}
        title={
          page === "bio"
            ? "Add Bio"
            : page === "bio-contact"
            ? "Add Contact Form"
            : selectedType?.name === "Blog"
            ? "Write your blog"
            : "Add Bookmark"
        }
        onClose={() => {
          if (!page) {
            dispatch(openDrawer(""));
            dispatch(addBkFromPage(null));
          } else {
            setOpen(false);
            setSelectedFileType("");
            setSelectedMediaType("");
            setSelectedPlatform("");
            setSelectedProfileType("");
          }
          onClose && onClose();
        }}
        open={open}
        maskClosable={isMobileView ? true : false}
        bodyStyle={{
          padding: isMobileView ? "24px 12px" : "24px",
        }}
        footer={
          <Space className="flex items-center justify-end">
            <Button
              onClick={() => {
                if (!page) {
                  dispatch(openDrawer(""));
                  dispatch(addBkFromPage(null));
                } else {
                  setOpen(false);
                  setSelectedFileType("");
                  setSelectedMediaType("");
                  setSelectedPlatform("");
                  setSelectedProfileType("");
                }
              }}
              disabled={buttonLoading}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              className="bg-[#40a9ff] border-[#40a9ff]"
              onClick={() => {
                if (!page || page === "prompt-page") {
                  handleSubmit("save");
                } else if (page === "public") {
                  handleSubmitPublic();
                } else {
                  handleSubmitBio();
                }
              }}
              disabled={buttonLoading}
              id="tour-collection-save-gem-button"
            >
              {buttonLoading
                ? "Loading"
                : selectedType?.name === "Blog"
                ? "Start writing"
                : "Save"}
            </Button>

            {!page && selectedType?.name !== "Blog" && (
              <Button
                type="primary"
                className="bg-[#40a9ff] border-[#40a9ff]"
                onClick={() => handleSubmit("saveAndAdd")}
                disabled={buttonLoading}
              >
                {buttonLoading ? "Loading" : "Save and Add"}
              </Button>
            )}
          </Space>
        }
      >
        {(page !== "bio" ||
          (page === "bio" &&
            (selectedType?.name !== "Profile" ||
              (selectedType?.name === "Profile" && !selectedPlatform)))) && (
          <>
            {(fetchingSiteInfo || fetching) && (
              <div className="custom-spin-overlay">
                <Spin tip={"Fetching data..."} />
              </div>
            )}
            <div onClick={onLayoutClick}>
              <div className="mb-2 flex justify-between space-x-2">
                <div
                  className={classNames("flex-1", showTypeInput && "hidden")}
                >
                  <h6 className="block text-xs font-medium text-gray-500 mb-1">
                    Collections
                  </h6>
                  <div
                    className="relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      onClick={() => setShowCollectionInput(true)}
                      className="w-full"
                    >
                      <ComboBox
                        inputShown={showCollectionInput}
                        setShowCollectionInput={setShowCollectionInput}
                        collectionData={allCollections || []}
                        userId={session.userId}
                        setSelectedCollection={setSelectedCollection}
                        selectedCollection={selectedCollection}
                        error={error}
                        disabled={page === "bio" || page === "public"}
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
                        action="add"
                        disabled={page === "bio"}
                        page={page}
                        publicOptionData={[
                          selectedMediaType,
                          ...otherMediatypes,
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* new changes */}
              <div className="mt-6 max-md:max-w-full flex items-center justify-between">
                <div className="text-md text-zinc-600">Editable Preview</div>

                <div className="flex items-center">
                  <InformationCircleIcon
                    className="text-[#347AE2] h-5 w-5 cursor-pointer"
                    title="Tutorial video"
                    onClick={() => setOpenTutorialVideoModal(true)}
                  />

                  {showReset && (
                    <div
                      className="flex items-center cursor-pointer ml-2"
                      onClick={handleClearFields}
                    >
                      <IoRefresh className="text-[#FF4444] h-4 w-4 mr-1" />
                      <div className="text-sm text-[#FF4444]">Reset</div>
                    </div>
                  )}
                </div>
              </div>

              {(selectedType?.name === "Ai Prompt" ||
                selectedType?.name === "Text Expander") && (
                <div className="mt-1">
                  <div className="aiInput mb-2">
                    <AntInput
                      type="text"
                      name="shortendurl"
                      addonBefore={"c:"}
                      placeholder={
                        selectedType?.name === "Text Expander"
                          ? "Enter expander name"
                          : selectedType?.name === "Ai Prompt"
                          ? "Enter prompt name"
                          : "Enter Shortend URL"
                      }
                      value={shortendurl}
                      error
                      onChange={(e) => setShortendurl(e.target.value)}
                      className="rounded-md"
                    />
                  </div>

                  {selectedType?.name === "Ai Prompt" && (
                    <div className="w-full flex items-center justify-end">
                      <Radio.Group
                        value={promptType}
                        onChange={handlePromptType}
                        optionType="button"
                        buttonStyle="solid"
                        className="rounded-md"
                        // disabled={parseInt(selectedCollection?.id) === parseInt(process.env.NEXT_PUBLIC_AI_PROMPT_COLLECTION_ID)}
                        disabled={
                          parseInt(selectedCollection?.id) ===
                          parseInt(session?.aiPromptLibraryId)
                        }
                      >
                        <Radio.Button value={`public`}>
                          <div className="flex items-center">
                            <GlobeAltIcon className="h-4 w-4 mr-1" />{" "}
                            <div>Public</div>
                          </div>
                        </Radio.Button>
                        <Radio.Button value={`private`}>
                          <div className="flex items-center">
                            <LockClosedIcon className="h-4 w-4 mr-1" />{" "}
                            <div>Private</div>
                          </div>
                        </Radio.Button>
                      </Radio.Group>
                    </div>
                  )}
                </div>
              )}
              <div
                className={`flex flex-col mt-2 bg-white rounded-lg max-md:max-w-full ${
                  selectedType?.name !== "Note"
                    ? "border border-solid border-[color:var(--greyscale-200,#ABB7C9)] p-3"
                    : ""
                }`}
              >
                <MediaTypeUI
                  // onAssetURLBlur={onAssetURLBlur}
                  imageUrl={imageUrl}
                  title={title}
                  description={description}
                  assetUrl={assetUrl}
                  handleChangeAssetUrl={handleChangeAssetUrl}
                  onKeyDownUrl={onKeyDownUrl}
                  selectedType={selectedType}
                  shortendurl={shortendurl}
                  setShortendurl={setShortendurl}
                  setFavorite={setFavorite}
                  favorite={favorite}
                  showAssetUrlInput={showAssetUrlInput}
                  setShowAssetUrlInput={setShowAssetUrlInput}
                  showShortEndInput={showShortEndInput}
                  setShowShortEndInput={setShowShortEndInput}
                  onFileChange={onFileChange}
                  handlefileTypeChange={handlefileTypeChange}
                  fileType={fileType}
                  audioSrc={audioSrc}
                  videoSrc={videoSrc}
                  handleClearFields={handleClearFields}
                  imageSrc={imageSrc}
                  pdfSrc={pdfSrc}
                  pdfFilename={pdfFilename}
                  onOpenImageDialog={onOpenImageDialog}
                  audioEnhancedText={audioEnhancedText}
                  setAudioEnhancedText={setAudioEnhancedText}
                  audioOriginalText={audioOriginalText}
                  setAudioOriginalText={setAudioOriginalText}
                  audioRecordSrc={audioRecordSrc}
                  setAudioRecordSrc={setAudioRecordSrc}
                  highlightedText={highlightedText}
                  highlightedColor={highlightedColor}
                  setHighlightedColor={setHighlightedColor}
                  setHighlightClass={setHighlightClass}
                  setHighlightedText={setHighlightedText}
                  setShowReset={setShowReset}
                  showBookSearchInput={showBookSearchInput}
                  setShowBookSearchInput={setShowBookSearchInput}
                  onSearchTerm={onSearchTerm}
                  searchBooks={searchBooks}
                  onClickBook={onClickBook}
                  setSearchBooks={setSearchBooks}
                  loadingBookMovie={loadingBookMovie}
                  readStatus={readStatus}
                  setReadStatus={setReadStatus}
                  showMovieSearchInput={showMovieSearchInput}
                  setShowMovieSearchInput={setShowMovieSearchInput}
                  searchMovies={searchMovies}
                  onClickMovie={onClickMovie}
                  watchStatus={watchStatus}
                  setWatchStatus={setWatchStatus}
                  setIsReaded={setIsReaded}
                  isReaded={isReaded}
                  showPromptEditor={showPromptEditor}
                  setShowPromptEditor={setShowPromptEditor}
                  setHtmlText={setHtmlText}
                  htmlText={htmlText}
                  setPlainText={setPlainText}
                  showCodeEditor={showCodeEditor}
                  setShowCodeEditor={setShowCodeEditor}
                  code={code}
                  setCode={setCode}
                  citation={citation}
                  handleCitationChange={handleCitationChange}
                  citationText={citationText}
                  setCitationText={setCitationText}
                  testimonial={testimonial}
                  testimonialAttachImage={testimonialAttachImage}
                  testimonialAuthor={testimonialAuthor}
                  testimonialDate={testimonialDate}
                  testimonialProduct={testimonialProduct}
                  testimonialRating={testimonialRating}
                  testimonialTagLine={testimonialTagLine}
                  testimonialUrl={testimonialUrl}
                  testimonialPlatform={testimonialPlatform}
                  setTestimonial={setTestimonial}
                  setTestimonialAttachImage={setTestimonialAttachImage}
                  setTestimonialAuthor={setTestimonialAuthor}
                  setTestimonialDate={setTestimonialDate}
                  setTestimonialProduct={setTestimonialProduct}
                  setTestimonialRating={setTestimonialRating}
                  setTestimonialTagLine={setTestimonialTagLine}
                  setTestimonialUrl={setTestimonialUrl}
                  setTestimonialPlatform={setTestimonialPlatform}
                  testimonialType={testimonialType}
                  setTestimonialType={setTestimonialType}
                  onFileTestimonialAvatarChange={onFileTestimonialAvatarChange}
                  testimonialAvatarImageSrc={testimonialAvatarImageSrc}
                  setTestimonialAvatarImageSrc={setTestimonialAvatarImageSrc}
                  codeLanguage={codeLanguage}
                  onKeyDownShortUrl={onKeyDownShortUrl}
                  credibility={credibility}
                  setCredibility={setCredibility}
                  promptType={promptType}
                  html={html}
                  setImageUrl={setImageUrl}
                  setVideoSrc={setVideoSrc}
                  setAudioSrc={setAudioSrc}
                  setHtml={setHtml}
                />

                {selectedType?.name === "Note" ||
                selectedType?.name === "Testimonial" ||
                selectedType?.name === "Ai Prompt" ||
                selectedType?.name === "Text Expander" ||
                (selectedType?.name === "Citation" && !citationText) ? (
                  <></>
                ) : (
                  <div className="flex items-center justify-between">
                    <div
                      onClick={() => onOpenImageDialog("favicon")}
                      className="w-fit"
                    >
                      <FavIcon data={favIconSrc || null} />
                    </div>

                    <div>
                      <BookmarkOptionComponent
                        selectedType={selectedType}
                        currencySymbol={currencySymbol}
                        setCurrencySymbol={setCurrencySymbol}
                        setProductPrice={setProductPrice}
                        productPrice={productPrice}
                        fileType={fileType}
                        setFavorite={setFavorite}
                        favorite={favorite}
                        rate={rate}
                        setRate={setRate}
                        setPlatformType={setPlatformType}
                        platformType={platformType}
                        onCopyCode={onCopyCode}
                        assetUrl={assetUrl}
                        handleChangeAssetUrl={handleChangeAssetUrl}
                        page={page}
                        tweetType={tweetType}
                        setTweetType={setTweetType}
                        imageSrc={fileType === "url" ? assetUrl : imageSrc}
                        handleChangeAssetUrlForCode={
                          handleChangeAssetUrlForCode
                        }
                      />
                    </div>
                  </div>
                )}

                {selectedType?.name === "Note" ||
                selectedType?.name === "Testimonial" ||
                selectedType?.name === "Ai Prompt" ||
                selectedType?.name === "Text Expander" ||
                (selectedType?.name === "Audio" && fileType === "record") ||
                (selectedType?.name === "Citation" && !citationText) ? (
                  <></>
                ) : (
                  <>
                    {isTitleEditing ? (
                      <TextareaAutosize
                        onBlur={disableTitleInput}
                        onKeyDown={onKeyDownTitle}
                        value={title || ""}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-xl font-medium text-gray-500 resize-none mt-2 !outline-none !focus:outline-none textarea-border"
                        autoFocus={true}
                      />
                    ) : (
                      <div
                        className="mt-2 text-xl font-medium text-gray-500 break-words"
                        onClick={enableTitleInput}
                      >
                        {title?.length > 50
                          ? title?.slice(0, 50)?.concat("...")
                          : title || "Enter a title"}
                      </div>
                    )}

                    {isDescriptionEditing ? (
                      <TextareaAutosize
                        onBlur={disableDescriptionInput}
                        onKeyDown={onKeyDownDescription}
                        value={description || ""}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-2 text-base text-gray-500 resize-none !outline-none !focus:outline-none textarea-border"
                        autoFocus={true}
                      />
                    ) : (
                      <div
                        className="mt-2 text-base text-gray-500 break-words"
                        onClick={enableDescriptionInput}
                      >
                        {description?.length > 150
                          ? description?.slice(0, 150)?.concat("...")
                          : description ||
                            (selectedType?.name === "Blog"
                              ? "Enter short description"
                              : "Enter description")}
                      </div>
                    )}
                  </>
                )}

                {selectedType?.name === "Testimonial" && (
                  <>
                    <Input
                      size="medium w-full"
                      type="text"
                      name="tagLine"
                      placeholder="Enter tag line"
                      value={testimonialTagLine}
                      onChange={(e) => setTestimonialTagLine(e.target.value)}
                      className="!border-[#97A0B5] w-full rounded-md mt-4"
                    />

                    <TextareaAutosize
                      value={testimonial}
                      onChange={(e) => setTestimonial(e.target.value)}
                      placeholder="Enter testimonial"
                      minRows={4}
                      className="w-full rounded-md resize-none !outline-none !focus:outline-none my-4 !border-[#97A0B5]"
                    />

                    <Input
                      size="medium w-full mb-2"
                      type="text"
                      name="product"
                      placeholder="Enter product"
                      value={testimonialProduct}
                      onChange={(e) => setTestimonialProduct(e.target.value)}
                      className="!border-[#97A0B5] w-full rounded-md"
                    />

                    <div className="flex items-center justify-between mt-4 w-full">
                      <Rate
                        value={testimonialRating}
                        onChange={(value) => setTestimonialRating(value)}
                        allowHalf
                      />
                      <div className="bookStatus">
                        <DatePicker
                          value={
                            !testimonialDate
                              ? testimonialDate
                              : moment(testimonialDate)
                          }
                          onChange={(date, dateStirng) =>
                            setTestimonialDate(dateStirng)
                          }
                          format={"YYYY-MM-DD"}
                          // allowClear={false}
                          showToday={false}
                          className="rounded-full border border-solid border-[#97A0B5] w-fit "
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedType?.name === "Citation" && (
                  <>
                    {citationText && (
                      <>
                        <div className="my-2">
                          <AntInput
                            value={citationAuthor}
                            onChange={(e) => setCitationAuthor(e.target.value)}
                            placeholder="Enter citation author"
                            className="rounded-md"
                            size="medium"
                            prefix={
                              <AiOutlineUser className="h-5 w-5 text-[#4B4F5D]" />
                            }
                          />
                        </div>

                        <div className="w-full flex items-center justify-between">
                          <div className="w-full flex items-center justify-between mt-2 bookStatus">
                            <DatePicker
                              value={
                                !citationDate
                                  ? citationDate
                                  : moment(citationDate)
                              }
                              onChange={(date, dateStirng) =>
                                setCitationDate(dateStirng)
                              }
                              format={"YYYY-MM-DD"}
                              // allowClear={false}
                              showToday={false}
                              className="rounded-full border border-solid border-[#97A0B5] w-fit "
                            />
                          </div>

                          <div className="bookStatus">
                            <Select
                              onChange={(value) => setCredibility(value)}
                              value={credibility}
                              className={"w-full"}
                              placeholder="Select credibility"
                            >
                              <Option value={"low"}>Low</Option>
                              <Option value={"high"}>High</Option>
                              <Option value={"medium"}>Medium</Option>
                            </Select>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                {selectedType?.name === "Code" && (
                  <div className="mt-4">
                    <Input
                      size="medium w-full mb-2"
                      value={codeLanguage}
                      onChange={(e) => setCodeLanguage(e.target.value)}
                      placeholder="Enter Language"
                    />
                  </div>
                )}

                {(selectedType?.name === "Book" ||
                  selectedType?.name === "Movie") && (
                  <div className="w-full flex mt-2 bookStatus flex-col">
                    <h6 className="block text-xs font-medium text-gray-500 mb-1">
                      {selectedType?.name === "Book"
                        ? "Read date"
                        : "Watch date"}
                    </h6>
                    <DatePicker
                      value={!dateRead ? dateRead : moment(dateRead)}
                      onChange={(date, dateStirng) => setDateRead(dateStirng)}
                      format={"YYYY-MM-DD"}
                      // allowClear={false}
                      showToday={false}
                      className="rounded-full border border-solid border-[#97A0B5] w-fit"
                      placeholder={
                        selectedType?.name === "Book"
                          ? "Read date"
                          : "Watch date"
                      }
                    />
                  </div>
                )}

                {page !== "public" &&
                  selectedType?.name !== "Note" &&
                  selectedType?.name !== "Ai Prompt" &&
                  selectedType?.name !== "Text Expander" && (
                    <div className="my-2 addBk-tag-wrapper bg-white p-2">
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
                        inputFieldPosition="inline"
                        placeholder="Type to enter tags"
                        onClearAll={() => setSelectedTags([])}
                        clearAll
                        autocomplete
                        inline={true}
                      />
                    </div>
                  )}
              </div>

              <div className="addbk-collapse mt-4">
                <Collapse
                  ghost
                  expandIcon={(status) => {
                    return (
                      <div>
                        {status.isActive ? (
                          <MdOutlineArrowDropDown className="h-6 w-6 text-[#141B34]" />
                        ) : (
                          <MdOutlineArrowRight className="h-6 w-6 text-[#141B34]" />
                        )}
                      </div>
                    );
                  }}
                  activeKey={collapseKeys}
                  onChange={handleChangeCollapse}
                >
                  <Panel
                    header={
                      <div className="text-[#4B4F5D] text-base">
                        Advanced Options
                      </div>
                    }
                    key="1"
                  >
                    {(selectedType?.name === "Ai Prompt" ||
                      selectedType?.name === "Text Expander") && (
                      <>
                        {imageUrl && (
                          <div className="relative mb-1">
                            <div className="">
                              <img
                                src={imageUrl}
                                alt={
                                  title ||
                                  description ||
                                  "Text manipaulation gem"
                                }
                                className="w-full object-cover block h-[200px] rounded-lg"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`;
                                }}
                              />
                            </div>

                            <div className="px-1 absolute bottom-[10px] flex items-center justify-between w-full md:px-2">
                              <div></div>
                              <div
                                className=" border border-solid border-[#97A0B5] rounded-full w-fit p-1 bg-white cursor-pointer"
                                onClick={() => onOpenImageDialog("thumbnail")}
                              >
                                <PiUploadSimpleLight className="text-[#74778B] h-4 w-4 aspect-square" />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div
                            onClick={() => onOpenImageDialog("favicon")}
                            className="w-fit"
                          >
                            <FavIcon data={favIconSrc || null} />
                          </div>

                          <div>
                            <BookmarkOptionComponent
                              // onAssetURLBlur={onAssetURLBlur}
                              selectedType={selectedType}
                              currencySymbol={currencySymbol}
                              setCurrencySymbol={setCurrencySymbol}
                              setProductPrice={setProductPrice}
                              productPrice={productPrice}
                              fileType={fileType}
                              setFavorite={setFavorite}
                              favorite={favorite}
                              rate={rate}
                              setRate={setRate}
                              setPlatformType={setPlatformType}
                              platformType={platformType}
                              onCopyCode={onCopyCode}
                              assetUrl={assetUrl}
                              page={page}
                              tweetType={tweetType}
                              setTweetType={setTweetType}
                              imageSrc={
                                fileType === "url" ? assetUrl : imageSrc
                              }
                              textExtract={textExtract}
                              setTextExtract={setTextExtract}
                              handleChangeAssetUrlForCode={
                                handleChangeAssetUrlForCode
                              }
                            />
                          </div>
                        </div>

                        <>
                          {isTitleEditing ? (
                            <TextareaAutosize
                              onBlur={disableTitleInput}
                              onKeyDown={onKeyDownTitle}
                              value={title || ""}
                              onChange={(e) => setTitle(e.target.value)}
                              className="text-xl font-medium text-gray-500 resize-none mt-2 !outline-none !focus:outline-none textarea-border w-full"
                              autoFocus={true}
                            />
                          ) : (
                            <div
                              className="mt-2 text-xl font-medium text-gray-500 break-words"
                              onClick={enableTitleInput}
                            >
                              {title?.length > 50
                                ? title?.slice(0, 50)?.concat("...")
                                : title || "Enter a title"}
                            </div>
                          )}

                          {isDescriptionEditing ? (
                            <TextareaAutosize
                              onBlur={disableDescriptionInput}
                              onKeyDown={onKeyDownDescription}
                              value={description || ""}
                              onChange={(e) => setDescription(e.target.value)}
                              className="mt-2 text-base text-gray-500 resize-none !outline-none !focus:outline-none textarea-border w-full"
                              autoFocus={true}
                            />
                          ) : (
                            <div
                              className="mt-2 text-base text-gray-500 break-words"
                              onClick={enableDescriptionInput}
                            >
                              {description?.length > 150
                                ? description?.slice(0, 150)?.concat("...")
                                : description || "Enter description"}
                            </div>
                          )}
                        </>
                      </>
                    )}

                    {page !== "public" &&
                      (selectedType?.name === "Note" ||
                        selectedType?.name === "Ai Prompt" ||
                        selectedType?.name === "Text Expander") && (
                        <div className="my-2 addBk-tag-wrapper bg-white p-2">
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
                            inputFieldPosition="inline"
                            placeholder="Type to enter tags"
                            onClearAll={() => setSelectedTags([])}
                            clearAll
                            autocomplete
                            inline={true}
                          />
                        </div>
                      )}

                    <div className="pt-4">
                      <h6 className="block text-xs font-medium text-gray-500 mb-1">
                        Remarks
                      </h6>
                      <TextareaAutosize
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Add your remarks"
                        minRows={4}
                        className="w-full rounded-md resize-none !outline-none !focus:outline-none textarea-border"
                      />
                    </div>

                    {page !== "bio" && loadingCustomFields && (
                      <div className="flex items-center justify-center w-full pt-4">
                        <Spin size="small" tip="Fetching custom fields..." />
                      </div>
                    )}

                    {page !== "bio" &&
                      !loadingCustomFields &&
                      customPropertyWithoutAnswer &&
                      customPropertyWithoutAnswer.length > 0 && (
                        <div className="pt-4">
                          {customPropertyWithoutAnswer?.map((item, i) => (
                            <>{renderCustomFieldProperty(item, i)}</>
                          ))}
                        </div>
                      )}

                    {page === "bio" &&
                      (selectedType?.name === "Link" ||
                        selectedType?.name === "App" ||
                        selectedType?.name === "Product") && (
                        <div className="my-2 flex justify-between space-x-2">
                          <div
                            className={`${
                              showRibbonPicker ? "flex-[0.5]" : "flex-1"
                            }`}
                          >
                            <h6 className="block text-xs font-medium text-gray-500 mb-1">
                              Label
                            </h6>
                            <AntInput
                              placeholder="Enter Label"
                              value={ribbon?.text || ""}
                              onChange={(e) => handleRibbonText(e)}
                              suffix={
                                <>
                                  <div className="flex items-center">
                                    {ribbon?.color ? (
                                      <div
                                        className={`h-4 w-4 mx-2 cursor-pointer`}
                                        style={{ background: ribbon?.color }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setShowRibbonPicker(
                                            !showRibbonPicker
                                          );
                                        }}
                                      ></div>
                                    ) : (
                                      <IoColorPaletteOutline
                                        className="h-4 w-4 cursor-pointer mx-2"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setShowRibbonPicker(
                                            !showRibbonPicker
                                          );
                                        }}
                                      />
                                    )}

                                    <TrashIcon
                                      className="h-4 w-4 cursor-pointer text-[#EB5757]"
                                      onClick={() =>
                                        setRibbon({
                                          ...ribbon,
                                          text: "",
                                          color: "",
                                        })
                                      }
                                    />
                                  </div>
                                </>
                              }
                            />
                          </div>

                          {showRibbonPicker && (
                            <div
                              className={`${
                                showRibbonPicker ? "flex-[0.5] block" : "hidden"
                              }`}
                            >
                              <BlockPicker
                                color={ribbon?.color || ""}
                                onChangeComplete={(color) =>
                                  setRibbon({ ...ribbon, color: color.hex })
                                }
                                triangle="hide"
                                colors={[
                                  "#FF6900",
                                  "#FCB900",
                                  "#7BDCB5",
                                  "#00D084",
                                  "#8ED1FC",
                                  "#0693E3",
                                  "#EB144C",
                                  "#F78DA7",
                                  "#9900EF",
                                  "#000000",
                                ]}
                              />
                            </div>
                          )}
                        </div>
                      )}
                  </Panel>
                </Collapse>
              </div>

              {(selectedType?.name === "Ai Prompt" ||
                selectedType?.name === "Text Expander") && (
                <div className="mt-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <label className="text-xs font-medium text-gray-500 mr-2">
                        Enabled all sites
                      </label>
                      <Tooltip title="It will enable on all sites">
                        <BsInfoCircle className="text-[#347AE2] h-4 w-4 cursor-pointer" />
                      </Tooltip>
                    </div>
                    <Switch
                      checked={enableSites}
                      onChange={(checked) => setEnableSites(checked)}
                      style={{
                        background: enableSites ? "#1890ff" : "#00000040",
                      }}
                    />
                  </div>
                  <div className="flex justify-between flex-col w-full mt-4">
                    <label className="text-xs font-medium text-gray-500 mb-2">
                      Priority Sites
                    </label>
                    <div className="w-full">
                      <Select
                        value={prioritySites}
                        onChange={(items) => {
                          setPrioritySites(items);
                        }}
                        mode="tags"
                        placeholder="Select sites"
                        className="w-full"
                        maxTagCount={3}
                        options={AI_SITES.map((site) => {
                          return {
                            label: (
                              <div className="flex items-center">
                                <img
                                  src={site.icon}
                                  alt={site.site}
                                  className="h-5 w-5 mr-2"
                                />
                                <div>{site.label}</div>
                              </div>
                            ),
                            value: site.site,
                          };
                        })}
                      />
                    </div>
                  </div>
                  {selectedType?.name === "Ai Prompt" && <div className="flex justify-between flex-col w-full mt-4">
                    <label className="text-xs font-medium text-gray-500 mb-2">
                      Prompt Category
                    </label>
                    <div className="w-full">
                      <Select
                        value={promptCategory}
                        onChange={(val) => {
                          setPromptCategory(val);
                        }}
                        placeholder="Select prompt category"
                        className="w-full"
                        options={PROMPT_CATEGORY.map((category) => { return { label: category, value: category } })}
                      />
                    </div>
                  </div>}
                </div>
              )}
            </div>
          </>
        )}

        {page === "bio" &&
          selectedType?.name === "Profile" &&
          selectedPlatform &&
          !selectedProfileType && (
            <>
              <div className={"grid grid-cols-6 gap-2"} onClick={onLayoutClick}>
                <div className="col-span-7">
                  <div className="mb-2 flex justify-between space-x-2">
                    <div
                      className={classNames(
                        "flex-1",
                        showTypeInput && "hidden"
                      )}
                    >
                      <h6 className="block text-xs font-medium text-gray-500 mb-1">
                        Collections
                      </h6>
                      <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          onClick={() => setShowCollectionInput(true)}
                          className="w-full"
                        >
                          <ComboBox
                            inputShown={showCollectionInput}
                            setShowCollectionInput={setShowCollectionInput}
                            collectionData={allCollections || []}
                            userId={session.userId}
                            setSelectedCollection={setSelectedCollection}
                            selectedCollection={selectedCollection}
                            error={error}
                            disabled={page === "bio"}
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
                            action="add"
                            disabled={page === "bio"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <ProfileSocialTextField
                      platform={platformType}
                      socialUserName={socialUserName}
                      setSocialUsername={setSocialUsername}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

        {page === "bio" &&
          selectedType?.name === "Profile" &&
          selectedProfileType && (
            <>
              <div className={"grid grid-cols-6 gap-2"} onClick={onLayoutClick}>
                <div className="col-span-7">
                  <div className="mb-2 flex justify-between space-x-2">
                    <div
                      className={classNames(
                        "flex-1",
                        showTypeInput && "hidden"
                      )}
                    >
                      <h6 className="block text-xs font-medium text-gray-500 mb-1">
                        Collections
                      </h6>
                      <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          onClick={() => setShowCollectionInput(true)}
                          className="w-full"
                        >
                          <ComboBox
                            inputShown={showCollectionInput}
                            setShowCollectionInput={setShowCollectionInput}
                            collectionData={allCollections || []}
                            userId={session.userId}
                            setSelectedCollection={setSelectedCollection}
                            selectedCollection={selectedCollection}
                            error={error}
                            disabled={true}
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
                            action="add"
                            disabled={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Input
                    size="medium w-full my-2"
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    value={profileContactTitle || ""}
                    onChange={(e) => setProfileContactTitle(e.target.value)}
                  />

                  <Input
                    size="medium w-full"
                    type="text"
                    name="description"
                    placeholder="Enter description"
                    value={profileContactDescription || ""}
                    onChange={(e) =>
                      setProfileContactDescription(e.target.value)
                    }
                  />

                  {bioContactFields.map((field) => (
                    <div className="pt-4">
                      <div className="p-2 pl-4 border border-solid border-gray-300 rounded-md flex items-center justify-between">
                        <div className="font-medium">{field.name}</div>
                        {bioContactFields.length > 1 ? (
                          <TrashIcon
                            className="h-4 w-4 cursor-pointer"
                            onClick={() => handleRemoveField(field.key)}
                          />
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  ))}

                  {availableFields?.length > 0 ? (
                    <div className="pt-4">
                      <Dropdown
                        overlayStyle={{ width: "fit-content" }}
                        dropdownRender={() => (
                          <div className="dropdown-content py-4 rounded-sm flex flex-col gap-y-2 cursor-pointer">
                            {availableFields.map((option) => (
                              <div
                                key={option.key}
                                onClick={() => handleAddField(option.key)}
                                className="px-4 py-2 hover:bg-[#f5f5f5]"
                              >
                                {option.name}
                              </div>
                            ))}
                          </div>
                        )}
                        onOpenChange={handleOpenDropdown}
                        open={openDropdown}
                        trigger={["click"]}
                      >
                        <Button>Add Fields</Button>
                      </Dropdown>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </>
          )}
        {isOpenImageDialog && (
          <ImageModal
            isOpenImageDialog={isOpenImageDialog}
            currentTab={openImageDialogTab}
            onClose={onImageDialogClose}
            siteImages={docImages}
            currentIcon={currentIcon}
            currentThumbnail={currentThumbnail}
            onThumbnailSelect={onThumbnailSelect}
            currentURL={assetUrl}
            onIconSelect={onIconSelect}
            onResetIcon={onResetIcon}
            isSetResetOpt={true}
            platform={"gem"}
            isBlogType={selectedType?.name === "Blog" ? true : false}
          />
        )}
        {/* {
              openIconModal && <DialogModal
                  open={openIconModal}
                  setOpen={setOpenIconModal}
                  handleEmoji={handleEmoji}
                  handleColor={handleColor}
                  handleImageUploadChange={handleIconImageUploadChange}
                  selectedEmoji={selectedEmoji}
                  selectedColor={selectedColor}
                  setSelectedEmoji={setSelectedEmoji}
                  setSelectedColor={setSelectedColor}
                  handleCoverModalSubmit={handleIconCoverModalSubmit}
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  resetCancelValues={resetCancelValues}
                  loadingImg={loadingImg}
                  handleIcon={handleIcon}
                  selectedIcon={selectedIcon}
                  handleRemoveIconModalSubmit={handleRemoveIconModalSubmit}
                  />
            } */}
      </Drawer>

      {openTutorialVideoModal && (
        <TutorialVideoModal
          selectedType={selectedType}
          isMobileView={isMobileView}
          openTutorialVideoModal={openTutorialVideoModal}
          setOpenTutorialVideoModal={setOpenTutorialVideoModal}
        />
      )}
    </div>
  );
};

export default AddBookmark;
