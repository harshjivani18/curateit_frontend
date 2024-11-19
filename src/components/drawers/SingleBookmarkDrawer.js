"use client"
import { 
    Button, 
    DatePicker, 
    Drawer, 
    message, 
    Modal, 
    Select, 
    Space, 
    Spin, 
    Rate, 
    Input as AntInput, 
    Dropdown,
    Checkbox as AntCheckbox, 
    Collapse, 
    Radio, 
    Switch,
    Tooltip
}                                                       from "antd"
import { WithContext as ReactTags }                     from 'react-tag-input';
import { useEffect, useState, useRef }                  from "react";
import { useDispatch, useSelector }                     from "react-redux";
import moment                                           from "moment";
import { 
    DocumentDuplicateIcon, 
    GlobeAltIcon, 
    InformationCircleIcon, 
    LockClosedIcon, 
    TrashIcon 
}                                                       from "@heroicons/react/24/outline";
// import { Configuration, OpenAIApi }             from "openai";
import { 
    MdOutlineArrowDropDown, 
    MdOutlineArrowRight, 
    MdOutlineOpenInNew 
}                                                       from "react-icons/md";
import dayjs                                            from 'dayjs';
import customParseFormat                                from 'dayjs/plugin/customParseFormat';
import weekday                                          from "dayjs/plugin/weekday"
import localeData                                       from "dayjs/plugin/localeData"
// import DialogModal from "@components/modal/Dialog";
import { useRouter }                                    from "next/navigation";
import { BlockPicker }                                  from "react-color";
import { IoColorPaletteOutline }                        from "react-icons/io5";
// import { getAllSiteImages } from "@utils/take-screenshot-site-images";
import TextareaAutosize                                 from "react-textarea-autosize";
import { AiOutlineUser }                                from "react-icons/ai";
import { PiUploadSimpleLight }                          from "react-icons/pi";

import FavIcon                                          from "@components/common/bookmarkComponents/FavIcon";
import BookmarkOptionComponent                          from "@components/common/bookmarkComponents/BookmarkOptionComponent";
import MediaTypeUIEdit                                  from "@components/common/bookmarkComponents/MediaTypeUIEdit";
import TutorialVideoModal                               from "@components/modal/TutorialVideoModal";
import ComboBox                                         from "@components/collectionCombobox/ComboBox";
import TypeComboBox                                     from "@components/collectionCombobox/TypeComboBox";
import Input                                            from "@components/collectionCombobox/Input";
import FavIconComponent                                 from "@components/common/FavIconComponent";
import ImageModal                                       from "@components/modal/ImageModal";

import { updateTagsPromise }                            from "@utils/update-tags";
import {  removeDuplicates }                            from "@utils/equalChecks";
import { 
    copyText, 
    countriesCurreny, 
    defaultBioContactFields, 
    getCurrencyAndPrice, 
    HIGHLIGHTED_COLORS, 
    KEY_CODES, 
    MONTHNAMES
}                                                       from "@utils/constants";
import session                                          from "@utils/session";
import { 
    getBookmarkPermissions, 
    getAllLevelCollectionPermissions, 
    updateBookmarkState 
}                                                       from "@utils/find-collection-id";

import { updateFilterCount }                            from "@actions/gems";
import { getPlanService }                               from "@actions/plan-service";
import { 
    deleteBookmark, 
    getSearchBooks, 
    getSearchMovies, 
    getSelectedBook, 
    getSelectedMovie 
}                                                       from "@actions/bookmark";
import { 
    getCustomFields, 
    getSingleBookmarkGem, 
    moveGemToSharedCollection, 
    reduceCollectionWiseCount, 
    removeGemFromCollection, 
    updateCollectionWiseCount, 
    updateGem, 
    uploadScreenshots 
}                                                       from "@actions/collection";
import { addTagCount, removeGemFromSharedTags }         from "@actions/tags";
import { getUserDetails }                               from "@actions/user";
import { getAllPublicUsers } from "@actions/group";
import { AI_SITES, PROMPT_CATEGORY } from "@utils/ai-options";
import { BsInfoCircle } from "react-icons/bs";


dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';

// const configuration     = new Configuration({
//     apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
// });
// const openai            = new OpenAIApi(configuration);
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const { Option } = Select;
const { Panel }  = Collapse

const SingleBookmarkDrawer = ({setOpenDrawer,setGemSingleIdSingleId,openDrawer,gemSingleId,submit, onClose, page='',editPagesIn,collectionId='',tagId='',setBlocks=() => {},blocks=[],gemPublicView='',isSingleGemPage=false}) => {
    const dispatch = useDispatch();
    const navigate = useRouter()
    const {singleBookmarkGem,collectionsAndItsCount,sharedCollections,customFields} = useSelector(state => state.collections)
    const {userTags} = useSelector(state => state.users)
    const {isMobileView} = useSelector(state => state.app)
    const {sharedTags} = useSelector(state => state.tags)
    const imageRef                  = useRef()
    const favImageRef               = useRef()

    const [showTypeInput, setShowTypeInput] = useState(false);
    const [showCollectionInput, 
           setShowCollectionInput]          = useState(false);
    const [loadingState,setLoadingState]    = useState(false)
    const [title,setTitle]                  = useState('')
    const [description,setDescription]      = useState('')
    const [assetUrl, setAssetUrl]           = useState("")
    const [remarks,setRemarks]              = useState('')
    
    const [covers, setCovers]               = useState([])
    const [selectedTags, setSelectedTags]   = useState([])
    const [imageUrl, setImageUrl]           = useState("")
    const [imgSpinner, setImgSpinner]       = useState(false)
    const [error, setError]                 = useState(false)
    const [enableSites, setEnableSites]     = useState(false)
    const [promptCategory, setPromptCategory] = useState(null)
    const [prioritySites, 
              setPrioritySites]                = useState([])
    
    const [selectedCollection, 
           setSelectedCollection]           = useState('');
    const [selectedType, setSelectedType]   = useState('');
    const [favorite, setFavorite]           = useState(false);
    const [buttonLoading, setButtonLoading]           = useState(false);
    const [customPropertyAnswered,setCustomPropertyAnswered] = useState([])

    const [customPropertyWithoutAnswer,setCustomPropertyWithoutAnswer] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [mediaType, setMediaType] = useState('');
    const [mediaData, setMediaData] = useState('');
    const [readStatus, setReadStatus]=useState('to-read');
    const [watchStatus, setWatchStatus]=useState('to-watch');
    const [rate, setRate]=useState();
    const [dateRead, setDateRead]=useState('')
    
    //collection with own and shared
    const [allCollections,setAllCollections] = useState([])

    //highlights,text,notes etc
    const defaultColorObjIdx            = HIGHLIGHTED_COLORS.findIndex((h) => { return h.id === 4})
    const [highlightedText, 
           setHighlightedText]          = useState("")
    const [highlightedColor,
           setHighlightedColor]         = useState(HIGHLIGHTED_COLORS[defaultColorObjIdx])
    const [highlightDetails,
           setHighlightDetails]         = useState(null)
    const [highlightClass,
           setHighlightClass]           = useState("")
    const [highlightBox,
           setHighlightBox]             = useState(null)
    // images
    const [imageSrc, setImageSrc]       = useState("")
    const [fallbackURL, setFallbackURL] = useState("")
    //audip
    const [audioSrc, setAudioSrc]       = useState("")
    const [videoSrc, setVideoSrc]       = useState("")
    const [code, setCode]       = useState("")
    const [codeLanguage, setCodeLanguage]       = useState("")
    const [pdfSrc, setPdfSrc]       = useState("")
    const [screenshotImageSrc, setScreenshotImageSrc]       = useState("")
    const [tweetType, setTweetType]       = useState("")
    const [platformType, setPlatformType]       = useState("")

    const [citationText, 
           setCitationText]             = useState("")
    const [credibility,
           setCredibility]              = useState("")
    const [citationAuthor, 
           setCitationAuthor]           = useState("")
    const [citationDate,
           setCitationDate]             = useState("")
    const [citation,
           setCitation]             = useState("")
    const [fetching, setFetching]       = useState(false)

    const [htmlText, setHtmlText] = useState("")
    const [plainText, setPlainText] = useState("")
    const [shortendurl, setShortendurl] = useState("");

    const [productPrice,setProductPrice]              = useState('')
    const [currencySymbol, setCurrencySymbol] = useState('')
    const [fileType, setFileType]       = useState("")
    const [isReaded, setIsReaded] = useState("")
    const [searchBooks, setSearchBooks] = useState()
    const [searchMovies, setSearchMovies] = useState()
    const [loadingBookMovie, setLoadingBookMovie] = useState(false);
    let timer = null
    const [isCurrentCollectionShared, setIsCurrentCollectionShared] = useState(false)

    const [testimonialAuthor, setTestimonialAuthor] = useState('');
    const [testimonialTagLine, setTestimonialTagLine] = useState('');
    const [testimonialProduct, setTestimonialProduct] = useState('');
    const [testimonial, setTestimonial] = useState('');
    const [testimonialAttachImage, setTestimonialAttachImage] = useState('')
    const [testimonialUrl, setTestimonialUrl] = useState('');
    const [testimonialDate, setTestimonialDate] = useState('');
    const [testimonialRating, setTestimonialRating] = useState('');
    const [testimonialPlatform, setTestimonialPlatform] = useState('');
    const [favIconSrc,setFavIconSrc] = useState(null)
    const [favImgSpinner, setFavImgSpinner] = useState(false)
    const [isCurrentTagShared, setIsCurrentTagShared] = useState(false)

    const [blogPublishedDate, setBlogPublishedDate] = useState(moment().format(dateFormat))
    const [blogStatus, setBlogStatus] = useState('Draft')
    const [blogAuthor, setBlogAuthor] = useState(null)
    const [showBlogAuthor, setShowBlogAuthor] = useState(false)
    const [allPublicUsers, setAllPublicUsers] = useState([])    

    const [openIconModal, setOpenIconModal] = useState(false)
    const [selectedEmoji, setSelectedEmoji] = useState("");
    const [selectedColor, setSelectedColor] = useState('')
    const [selectedImage, setSelectedImage] = useState('')
    const [selectedIcon, setSelectedIcon] = useState('')
    const [loadingImg, setLoadingImg] = useState(false)
    const [defaultFavIconSrc,setDefaultFavIconSrc] = useState(null)
    const [audioMediaPlayer, setAudioMediaPlayer] = useState('');

    const [currentThumbnail, setCurrentThumbnail]   = useState("")
    const [currentIcon, setCurrentIcon]             = useState("")
    const [docImages, setDocImages]                 = useState([])
    const [openImageDialogTab, setCurrentImageTab]  = useState(null)
    const [isOpenImageDialog, setIsOpenImageDialog] = useState(false)
    
    const [openDropdown, setOpenDropdown] = useState(false);
    const [bioContactFields, setBioContactFields] = useState([]);
    const [availableFields, setAvailableFields] = useState([]);
    const [ribbon,setRibbon] = useState({text:'',color:''})
    const [showRibbonPicker,setShowRibbonPicker]        = useState(false)
    // const [isPublicPrompt, setIsPublicPrompt] = useState(parseInt(collectionId) === parseInt(process.env.NEXT_PUBLIC_AI_PROMPT_COLLECTION_ID) ? "public" : "")
    const [isPublicPrompt, setIsPublicPrompt] = useState(parseInt(collectionId) === parseInt(session?.aiPromptLibraryId) ? "public" : "")


    //new
    const [collapseKeys, setCollapseKeys]     = useState([])
    const [isTitleEditing, setIsTitleEditing] = useState(false);
    const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
    const [showShortEndInput, setShowShortEndInput]     = useState(false)
    const [testimonialType, setTestimonialType] = useState('');
    const [testimonialAvatarImage, setTestimonialAvatarImage] = useState('');
    const [testimonialAvatarImageSrc, setTestimonialAvatarImageSrc] = useState('');
    const [testimonialAttachVideo, setTestimonialAttachVideo] = useState('')
    const [testimonialAttachAudio, setTestimonialAttachAudio] = useState('')
    const [testimonialAvatar, setTestimonialAvatar] = useState('')
    const [promptType, setPromptType] = useState('')
    const [textExtract, setTextExtract] = useState("");
    const [html,setHtml] = useState(null)
    const [openTutorialVideoModal, setOpenTutorialVideoModal] = useState(false);

    useEffect(() => {
        dispatch(getAllPublicUsers()).then((res) => {
            if (res?.payload?.data?.data) {
                const pUsersArr = [];
                res?.payload?.data?.data?.forEach((u) => {
                  if (u.firstname !== null && u.lastname !== null) {
                    pUsersArr.push({
                      id: u.id,
                      username: u.username,
                      name: `${u.firstname} ${u.lastname}`,
                      email: u.email,
                      avatar: u.profilePhoto,
                    });
                  }
                });
                setAllPublicUsers([...pUsersArr]);
            }
        })
    }, [])

    useEffect(() => {
        setLoadingState(true)
        const getCall = async () => {
            if (gemSingleId) {
                const res = await dispatch(getSingleBookmarkGem(gemSingleId))
                !gemPublicView && dispatch(getUserDetails())
                if(res){
                const res1 =  await dispatch(getCustomFields(res?.payload?.data?.data?.attributes?.collection_gems?.data?.id) || Number(collectionId))
                    if(res1){
                        setLoadingState(false)
                    }
                }
            }
        }
        getCall()
    },[gemSingleId,dispatch])

    useEffect(() => {
        if(tagId && sharedTags && sharedTags?.length>0){
            const currentTagShared = getAllLevelCollectionPermissions(sharedTags,tagId)
            if(currentTagShared){
                setIsCurrentTagShared(true)
                return;
            }
        }
    },[tagId,gemSingleId])

    useEffect(() => {
        if(sharedCollections && sharedCollections.length>0){
            const filtered = sharedCollections?.filter(item => item?.accessType !== 'viewer')
            const currentCollectionShared = getAllLevelCollectionPermissions(sharedCollections,Number(singleBookmarkGem?.collection_gems?.data?.id) || Number(collectionId))
            if(currentCollectionShared){
              setAllCollections([...filtered])
              setIsCurrentCollectionShared(true)
              return;
            }else{
              setIsCurrentCollectionShared(false)
              setAllCollections(collectionsAndItsCount ? [...collectionsAndItsCount,...filtered] : [...filtered])
            }
        }else{
            setIsCurrentCollectionShared(false)
            setAllCollections(collectionsAndItsCount ? [...collectionsAndItsCount] : [])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[sharedCollections,gemSingleId,singleBookmarkGem,collectionId])
    useEffect(() => {
        // console.log("singleBookmarkGem",singleBookmarkGem)
        if(page === '' && singleBookmarkGem){
            setTitle(singleBookmarkGem?.title || '')
            setAssetUrl(singleBookmarkGem?.url || '')
            setDescription(singleBookmarkGem?.description || '')
            setRemarks(singleBookmarkGem.remarks)
            setCovers(singleBookmarkGem && singleBookmarkGem.metaData?.covers ? singleBookmarkGem.metaData?.covers : [])
            setImageUrl(singleBookmarkGem && singleBookmarkGem.metaData?.covers && singleBookmarkGem.metaData?.covers?.length > 0 ? singleBookmarkGem.metaData?.covers[0] : '')
            setSelectedTags(singleBookmarkGem ? singleBookmarkGem?.tags?.data : [])
            setFallbackURL(singleBookmarkGem?.metaData?.fallbackURL || singleBookmarkGem?.media?.fallbackURL || '')
            setSelectedCollection((singleBookmarkGem && singleBookmarkGem?.collection_gems?.data) ? {id: singleBookmarkGem?.collection_gems?.data?.id, name: singleBookmarkGem?.collection_gems?.data?.attributes?.name} : {id:'',name:""})
            setSelectedType(singleBookmarkGem ? singleBookmarkGem.media_type  : "")
            setFavorite(singleBookmarkGem ? singleBookmarkGem.is_favourite : false)
            setCustomPropertyAnswered((singleBookmarkGem.custom_fields_obj && singleBookmarkGem.custom_fields_obj.length>0) ? singleBookmarkGem.custom_fields_obj : [])
            setMediaType(singleBookmarkGem ? singleBookmarkGem?.media_type : '')
            setMediaData(singleBookmarkGem ? singleBookmarkGem?.media : '')
            setDocImages(singleBookmarkGem && singleBookmarkGem.metaData?.docImages ? singleBookmarkGem.metaData?.docImages : [])
            setFavIconSrc(singleBookmarkGem && singleBookmarkGem.metaData?.icon ? singleBookmarkGem.metaData?.icon : '')
            setCurrentIcon(singleBookmarkGem && singleBookmarkGem.metaData?.icon ? singleBookmarkGem.metaData?.icon : '')
            setCurrentThumbnail(singleBookmarkGem && singleBookmarkGem.metaData?.covers && singleBookmarkGem.metaData?.covers?.length > 0 ? singleBookmarkGem.metaData?.covers[0] : '')
            // setSelectedColor((singleBookmarkGem && singleBookmarkGem.metaData?.icon && singleBookmarkGem.metaData?.icon?.type === 'color') ? singleBookmarkGem.metaData?.icon?.icon : '')
            // setSelectedEmoji((singleBookmarkGem && singleBookmarkGem.metaData?.icon && singleBookmarkGem.metaData?.icon?.type === 'emoji') ? singleBookmarkGem.metaData?.icon?.icon : '')
            // setSelectedIcon((singleBookmarkGem && singleBookmarkGem.metaData?.icon && singleBookmarkGem.metaData?.icon?.type === 'icon') ? singleBookmarkGem.metaData?.icon?.icon : '')
            // setSelectedImage((singleBookmarkGem && singleBookmarkGem.metaData?.icon && singleBookmarkGem.metaData?.icon?.type === 'image') ? singleBookmarkGem.metaData?.icon?.icon : '')
            setDefaultFavIconSrc(singleBookmarkGem && singleBookmarkGem.metaData?.defaultIcon ? singleBookmarkGem.metaData?.defaultIcon : '')
            setRibbon(singleBookmarkGem && singleBookmarkGem.media?.ribbon ? singleBookmarkGem.media?.ribbon : {text:'',color:''})
            const expanderArrIdx = singleBookmarkGem && singleBookmarkGem.expander ? singleBookmarkGem.expander.findIndex((e) => { return e.type === "link" }) : -1
            setShortendurl(expanderArrIdx !== -1 ? singleBookmarkGem.expander[expanderArrIdx].keyword : "")

            if(singleBookmarkGem.media_type === 'Highlight' || singleBookmarkGem.media_type === 'Note' || singleBookmarkGem.media_type === 'Quote'){
                setHighlightedText(singleBookmarkGem?.media?.text || '')
                setHighlightedColor(singleBookmarkGem?.media?.color || '')
                setHighlightDetails(singleBookmarkGem?.media?.details || '')
                setHighlightClass(singleBookmarkGem?.media?.styleClassName || '')
                setHighlightBox(singleBookmarkGem?.media?.box || '')
            }

            if(singleBookmarkGem.media_type === 'Image'){
                setImageSrc((singleBookmarkGem.S3_link && singleBookmarkGem.S3_link.length !== 0) ? singleBookmarkGem.S3_link[0] : '')
                setFileType(singleBookmarkGem?.fileType || '')
            }

            if(singleBookmarkGem.media_type === 'Audio'){
                setAudioSrc(singleBookmarkGem?.media?.audioLink || (singleBookmarkGem?.S3_link && singleBookmarkGem?.S3_link?.length>0 && singleBookmarkGem?.S3_link[0] )|| '')
                // setAudioMediaPlayer((singleBookmarkGem.S3_link && singleBookmarkGem.S3_link.length !== 0) ? singleBookmarkGem.S3_link[0] : '')
                setFileType(singleBookmarkGem?.fileType || '')
                setHtml(singleBookmarkGem?.media?.html || null)
            }

            if(singleBookmarkGem.media_type === 'Video'){
                setVideoSrc(singleBookmarkGem?.media?.videoLink || (singleBookmarkGem?.S3_link && singleBookmarkGem?.S3_link?.length>0 && singleBookmarkGem?.S3_link[0] ) || '')
                setFileType(singleBookmarkGem?.fileType || '')
                setHtml(singleBookmarkGem?.media?.html || null)
            }

            if(singleBookmarkGem.media_type === 'Code'){
                setCodeLanguage(singleBookmarkGem?.media?.langugae || '')
                setCode(singleBookmarkGem?.media?.code || '')
            }

            if(singleBookmarkGem.media_type === 'PDF'){
                setPdfSrc(singleBookmarkGem?.media?.pdfLink || (singleBookmarkGem?.S3_link && singleBookmarkGem?.S3_link?.length>0 && singleBookmarkGem?.S3_link[0] ) || '')
                setFileType(singleBookmarkGem?.fileType || '')
            }

            if(singleBookmarkGem.media_type === 'Screenshot'){
                setScreenshotImageSrc((singleBookmarkGem.S3_link && singleBookmarkGem.S3_link.length !== 0) ? singleBookmarkGem.S3_link[0] : '')
            }

            if(singleBookmarkGem.media_type === 'SocialFeed'){
                setTweetType(singleBookmarkGem?.post_type || '')
                setPlatformType(singleBookmarkGem?.platform || '')
                setHtml(singleBookmarkGem?.media?.html)
            }

            if(singleBookmarkGem.media_type === 'Profile' ){
                setPlatformType(singleBookmarkGem?.platform || '')
            }

            if(singleBookmarkGem.media_type === "Citation"){
                setCitationText(singleBookmarkGem?.media?.citation)
                setCredibility(singleBookmarkGem?.media?.credibility)
                setCitationAuthor(singleBookmarkGem?.media?.citationAuthor)
                setCitationDate(singleBookmarkGem?.media?.citationDate)
                setCitation(singleBookmarkGem?.media?.citation_format)
            }

            if (singleBookmarkGem.media_type === 'Ai Prompt' ) {
                const promptIdx = singleBookmarkGem.expander ? singleBookmarkGem.expander.findIndex((e) => { return e.type === "prompt" }) : -1
                const promptObj = promptIdx !== -1 ? singleBookmarkGem.expander[promptIdx] : null
                
                setHtmlText(promptObj?.text || '')
                setPlainText(promptObj?.plainText || '')
                const expanderArrIdx = singleBookmarkGem.expander ? singleBookmarkGem.expander.findIndex((e) => { return e.type === "link" }) : -1
                setShortendurl(expanderArrIdx !== -1 ? singleBookmarkGem.expander[expanderArrIdx].keyword : "")
                setPromptType(singleBookmarkGem?.isPublicPrompt === true ? 'public' : 'private')
            }

            if (singleBookmarkGem.media_type === 'Text Expander') {
                const expanderIdx = singleBookmarkGem.expander ? singleBookmarkGem.expander.findIndex((e) => { return e.type === "expander" }) : -1
                const expanderObj = expanderIdx !== -1 ? singleBookmarkGem.expander[expanderIdx] : null

                setHtmlText(expanderObj?.text || '')
                setPlainText(expanderObj?.plainText || '')
                const expanderArrIdx = singleBookmarkGem.expander ? singleBookmarkGem.expander.findIndex((e) => { return e.type === "link" }) : -1
                setShortendurl(expanderArrIdx !== -1 ? singleBookmarkGem.expander[expanderArrIdx].keyword : "")
            }

            if(singleBookmarkGem.media_type === 'Product'){
                const symbolAndPrice = singleBookmarkGem?.media?.price ? getCurrencyAndPrice(singleBookmarkGem?.media?.price) : ""
                setProductPrice(symbolAndPrice?.price || '')
                setCurrencySymbol(symbolAndPrice?.symbol || '')
            }
            if(singleBookmarkGem.media_type === 'Article'){
                setIsReaded(singleBookmarkGem?.isRead ? 'read' : 'to Read')
            }

            if(singleBookmarkGem.media_type === 'Ai Prompt'){
                setIsPublicPrompt(singleBookmarkGem?.isPublicPrompt ? 'public' : 'private')
                setEnableSites(singleBookmarkGem?.is_enable_for_all_sites || false)
                setPrioritySites(singleBookmarkGem?.prompt_priority_sites || [])
                setPromptCategory(singleBookmarkGem?.prompt_category || null)
            }

            if(singleBookmarkGem.media_type === 'Blog'){
                setBlogPublishedDate(singleBookmarkGem?.media?.publishedAt || moment().format(dateFormat))
                setBlogStatus(singleBookmarkGem?.media?.status || 'Draft')
                setBlogAuthor(singleBookmarkGem?.media?.authorId || session.username || null)
                setShowBlogAuthor(singleBookmarkGem?.media?.showAuthor || false)
            }

            if(singleBookmarkGem.media_type === 'Testimonial'){
                setTestimonialAuthor(singleBookmarkGem?.media?.author)
                setTestimonialTagLine(singleBookmarkGem?.media?.tagLine)
                setTestimonialProduct(singleBookmarkGem?.media?.product)
                setTestimonial(singleBookmarkGem?.media?.testimonial)
                setTestimonialAttachImage(singleBookmarkGem?.media?.attachImage)
                setTestimonialUrl(singleBookmarkGem?.media?.url)
                setTestimonialDate(singleBookmarkGem?.media?.date)
                setTestimonialRating(singleBookmarkGem?.media?.rating)
                setTestimonialPlatform(singleBookmarkGem?.media?.platform)
                setTestimonialType(singleBookmarkGem?.media?.testimonialType || 'image')
                setTestimonialAttachVideo(singleBookmarkGem?.media?.attachVideo || '')
                setTestimonialAttachAudio(singleBookmarkGem?.media?.attachAudio || '') 
                setTestimonialAvatar(singleBookmarkGem?.media?.avatar || '') 
                setFileType(singleBookmarkGem?.media?.fileType || 'file')
                setHtml(singleBookmarkGem?.media?.html || null)
                // setVideoSrc(singleBookmarkGem?.media?.attachVideo || '')
                // setAudioSrc(singleBookmarkGem?.media?.attachAudio || '')
            }

            if(singleBookmarkGem.media_type === 'Book'){
                setRate(singleBookmarkGem?.media?.myRating || 0)
                setDateRead(singleBookmarkGem?.media?.readStart || '')
                setReadStatus(singleBookmarkGem?.media?.status || null)
            }

            if(singleBookmarkGem.media_type === 'Movie'){
                setRate(singleBookmarkGem?.media?.myRating || 0)
                setDateRead(singleBookmarkGem?.media?.readStart || '')
                setWatchStatus(singleBookmarkGem?.media?.status || null)
            }

            if(singleBookmarkGem?.media_type === 'Profile' && singleBookmarkGem?.media?.type === 'contact'){
                setBioContactFields(singleBookmarkGem?.media?.bioContactFields || [])
                const missingObjects = defaultBioContactFields.filter(defItem => 
                !singleBookmarkGem?.media?.bioContactFields.find(apiItem => apiItem.key === defItem.key)
                );
                setAvailableFields(missingObjects)
            }

            if(singleBookmarkGem.custom_fields_obj && singleBookmarkGem.custom_fields_obj.length>0 && singleBookmarkGem.custom_fields_obj.length === customFields[0]?.customFieldObj?.length){
                setCustomPropertyWithoutAnswer([])
                return;
            }
            else if(singleBookmarkGem.custom_fields_obj && singleBookmarkGem.custom_fields_obj.length>0 &&  singleBookmarkGem.custom_fields_obj.length !== customFields[0]?.customFieldObj?.length){
                const filteredArray = customFields[0]?.customFieldObj?.filter(obj => singleBookmarkGem.custom_fields_obj.every(o => o.id !== obj.id));

                setCustomPropertyWithoutAnswer(filteredArray)
                return;
            }else{
                setCustomPropertyWithoutAnswer(customFields[0]?.customFieldObj)
            }
            return;
    }
        
        if((page === 'broken-duplicate' || page === 'bookmark' || page === 'filter' || page === 'tags' || page === 'bio') && singleBookmarkGem){
            setTitle(singleBookmarkGem?.title || '')
            setAssetUrl(singleBookmarkGem?.url || '')
            setDescription(singleBookmarkGem?.description || '')
            setRemarks(singleBookmarkGem.remarks)
            setCovers(singleBookmarkGem && singleBookmarkGem.metaData?.covers ? singleBookmarkGem.metaData?.covers : [])
            setFallbackURL(singleBookmarkGem?.metaData?.fallbackURL || singleBookmarkGem?.media?.fallbackURL || '')
            setImageUrl(singleBookmarkGem && singleBookmarkGem.metaData?.covers && singleBookmarkGem.metaData?.covers?.length > 0 ? singleBookmarkGem.metaData?.covers[0] : '')
            setSelectedTags(singleBookmarkGem ? singleBookmarkGem?.tags?.data : [])
            setSelectedCollection((singleBookmarkGem && singleBookmarkGem?.collection_gems?.data) ? {id: singleBookmarkGem?.collection_gems?.data?.id, name: singleBookmarkGem?.collection_gems?.data?.attributes?.name} : {id:'',name:""})
            setSelectedCollection((singleBookmarkGem && singleBookmarkGem?.collection_gems?.data) ? {id: singleBookmarkGem?.collection_gems?.data?.id, name: singleBookmarkGem?.collection_gems?.data?.attributes?.name} : {id:'',name:""})
            setSelectedType(singleBookmarkGem ? singleBookmarkGem.media_type  : "")
            setFavorite(singleBookmarkGem ? singleBookmarkGem.is_favourite : false)
            setMediaType(singleBookmarkGem ? singleBookmarkGem?.media_type : '')
            setMediaData(singleBookmarkGem ? singleBookmarkGem?.media : '')
            setDocImages(singleBookmarkGem && singleBookmarkGem.metaData?.docImages ? singleBookmarkGem.metaData?.docImages : [])
            setFavIconSrc(singleBookmarkGem && singleBookmarkGem.metaData?.icon ? singleBookmarkGem.metaData?.icon : '')
            setCurrentIcon(singleBookmarkGem && singleBookmarkGem.metaData?.icon ? singleBookmarkGem.metaData?.icon : '')
            setCurrentThumbnail(singleBookmarkGem && singleBookmarkGem.metaData?.covers && singleBookmarkGem.metaData?.covers?.length > 0 ? singleBookmarkGem.metaData?.covers[0] : '')
            // setSelectedColor((singleBookmarkGem && singleBookmarkGem.metaData?.icon && singleBookmarkGem.metaData?.icon?.type === 'color') ? singleBookmarkGem.metaData?.icon?.icon : '')
            // setSelectedEmoji((singleBookmarkGem && singleBookmarkGem.metaData?.icon && singleBookmarkGem.metaData?.icon?.type === 'emoji') ? singleBookmarkGem.metaData?.icon?.icon : '')
            // setSelectedIcon((singleBookmarkGem && singleBookmarkGem.metaData?.icon && singleBookmarkGem.metaData?.icon?.type === 'icon') ? singleBookmarkGem.metaData?.icon?.icon : '')
            // setSelectedImage((singleBookmarkGem && singleBookmarkGem.metaData?.icon && singleBookmarkGem.metaData?.icon?.type === 'image') ? singleBookmarkGem.metaData?.icon?.icon : '')
            setDefaultFavIconSrc(singleBookmarkGem && singleBookmarkGem.metaData?.defaultIcon ? singleBookmarkGem.metaData?.defaultIcon : '')
            setRibbon(singleBookmarkGem && singleBookmarkGem.media?.ribbon ? singleBookmarkGem.media?.ribbon : {text:'',color:''})

            setCustomPropertyAnswered((singleBookmarkGem.custom_fields_obj && singleBookmarkGem.custom_fields_obj.length>0) ? singleBookmarkGem.custom_fields_obj : [])

            const expanderArrIdx = singleBookmarkGem && singleBookmarkGem.expander ? singleBookmarkGem.expander.findIndex((e) => { return e.type === "link" }) : -1
            setShortendurl(expanderArrIdx !== -1 ? singleBookmarkGem.expander[expanderArrIdx].keyword : "")

            // if(singleBookmarkGem.media_type === 'Highlight' || singleBookmarkGem.media_type === 'Ai Prompt' || singleBookmarkGem.media_type === 'Note' || singleBookmarkGem.media_type === 'Quote' || singleBookmarkGem.media_type === 'Text'){
            if(singleBookmarkGem.media_type === 'Highlight' || singleBookmarkGem.media_type === 'Note' || singleBookmarkGem.media_type === 'Quote'){
                setHighlightedText(singleBookmarkGem?.media?.text || '')
                setHighlightedColor(singleBookmarkGem?.media?.color || '')
                setHighlightDetails(singleBookmarkGem?.media?.details || '')
                setHighlightClass(singleBookmarkGem?.media?.styleClassName || '')
                setHighlightBox(singleBookmarkGem?.media?.box || '')
            }

            if(singleBookmarkGem.media_type === 'Image'){
                setImageSrc((singleBookmarkGem.S3_link && singleBookmarkGem.S3_link.length !== 0) ? singleBookmarkGem.S3_link[0] : '')
                setFileType(singleBookmarkGem?.fileType || '')
            }

            if(singleBookmarkGem.media_type === 'Audio'){
                setAudioSrc(singleBookmarkGem?.media?.audioLink || '')
                // setAudioMediaPlayer((singleBookmarkGem.S3_link && singleBookmarkGem.S3_link.length !== 0) ? singleBookmarkGem.S3_link[0] : '')
                setAudioSrc(singleBookmarkGem?.media?.audioLink || (singleBookmarkGem?.S3_link && singleBookmarkGem?.S3_link?.length>0 && singleBookmarkGem?.S3_link[0] )|| '')
                setFileType(singleBookmarkGem?.fileType || '')
                setHtml(singleBookmarkGem?.media?.html || null)
            }

            if(singleBookmarkGem.media_type === 'Video'){
                setVideoSrc(singleBookmarkGem?.media?.videoLink || (singleBookmarkGem?.S3_link && singleBookmarkGem?.S3_link?.length>0 && singleBookmarkGem?.S3_link[0] )|| '')
                setFileType(singleBookmarkGem?.fileType || '')
                setHtml(singleBookmarkGem?.media?.html || null)
            }

            if(singleBookmarkGem.media_type === 'Code'){
                setCodeLanguage(singleBookmarkGem?.media?.langugae || '')
                setCode(singleBookmarkGem?.media?.code || '')
                setFileType(singleBookmarkGem?.fileType || '')
            }

            if(singleBookmarkGem.media_type === 'PDF'){
                setPdfSrc(singleBookmarkGem?.media?.pdfLink || (singleBookmarkGem?.S3_link && singleBookmarkGem?.S3_link?.length>0 && singleBookmarkGem?.S3_link[0] ) || '')
                setFileType(singleBookmarkGem?.fileType || '')
            }

            if(singleBookmarkGem.media_type === 'Screenshot'){
                setScreenshotImageSrc((singleBookmarkGem.S3_link && singleBookmarkGem.S3_link.length !== 0) ? singleBookmarkGem.S3_link[0] : '')
            }

            if(singleBookmarkGem.media_type === 'SocialFeed'){
                setTweetType(singleBookmarkGem?.post_type || '')
                setPlatformType(singleBookmarkGem?.platform || '')
                setHtml(singleBookmarkGem?.media?.html)
            }

            // if(singleBookmarkGem.media_type === 'SocialFeed' && (singleBookmarkGem?.platform === 'Medium' || singleBookmarkGem?.platform === 'Github' || singleBookmarkGem?.platform === 'Reddit' || singleBookmarkGem?.platform === 'LinkedIn')){
            //     setPlatformType(singleBookmarkGem?.platform || '')
            // }

            if(singleBookmarkGem.media_type === 'Profile' ){
                setPlatformType(singleBookmarkGem?.platform || '')
            }

            if(singleBookmarkGem.media_type === "Citation"){
                setCitationText(singleBookmarkGem?.media?.citation)
                setCredibility(singleBookmarkGem?.media?.credibility)
                setCitationAuthor(singleBookmarkGem?.media?.citationAuthor)
                setCitationDate(singleBookmarkGem?.media?.citationDate)
                setCitation(singleBookmarkGem?.media?.citation_format)
            }

            if (singleBookmarkGem.media_type === 'Ai Prompt') {
                const promptIdx = singleBookmarkGem.expander ? singleBookmarkGem.expander.findIndex((e) => { return e.type === "prompt" }) : -1
                const promptObj = promptIdx !== -1 ? singleBookmarkGem.expander[promptIdx] : null

                setHtmlText(promptObj?.text || '')
                setPlainText(promptObj?.plainText || '')
                const expanderArrIdx = singleBookmarkGem.expander ? singleBookmarkGem.expander.findIndex((e) => { return e.type === "link" }) : -1
                setShortendurl(expanderArrIdx !== -1 ? singleBookmarkGem.expander[expanderArrIdx].keyword : "")
                setPromptType(singleBookmarkGem?.isPublicPrompt === true ? 'public' : 'private')
                setEnableSites(singleBookmarkGem?.is_enable_for_all_sites || false)
                setPrioritySites(singleBookmarkGem?.prompt_priority_sites || [])
                setPromptCategory(singleBookmarkGem?.prompt_category || null)
            }

            if (singleBookmarkGem.media_type === 'Text Expander') {
                const expanderIdx = singleBookmarkGem.expander ? singleBookmarkGem.expander.findIndex((e) => { return e.type === "expander" }) : -1
                const expanderObj = expanderIdx !== -1 ? singleBookmarkGem.expander[expanderIdx] : null

                setHtmlText(expanderObj?.text || '')
                setPlainText(expanderObj?.plainText || '')
                const expanderArrIdx = singleBookmarkGem.expander ? singleBookmarkGem.expander.findIndex((e) => { return e.type === "link" }) : -1
                setShortendurl(expanderArrIdx !== -1 ? singleBookmarkGem.expander[expanderArrIdx].keyword : "")
            }
            if(singleBookmarkGem.media_type === 'Product'){
                const symbolAndPrice = singleBookmarkGem?.media?.price ? getCurrencyAndPrice(singleBookmarkGem?.media?.price) : ""
                setProductPrice(symbolAndPrice?.price || '')
                setCurrencySymbol(symbolAndPrice?.symbol || '')
            }
            if(singleBookmarkGem.media_type === 'Article'){
                setIsReaded(singleBookmarkGem?.isRead ? 'read' : 'to Read')
            }

            if(singleBookmarkGem.media_type === 'Ai Prompt'){
                setIsPublicPrompt(singleBookmarkGem?.isPublicPrompt ? 'public' : 'private')
                setEnableSites(singleBookmarkGem?.is_enable_for_all_sites || false)
                setPrioritySites(singleBookmarkGem?.prompt_priority_sites || [])
                setPromptCategory(singleBookmarkGem?.prompt_category || null)
            }

            if (singleBookmarkGem.media_type === 'Blog') {
                setBlogPublishedDate(singleBookmarkGem?.media?.publishedAt || moment().format(dateFormat))
                setBlogStatus(singleBookmarkGem?.media?.status || 'Draft')
                setBlogAuthor(singleBookmarkGem?.media?.authorId || session.username || null)
                setShowBlogAuthor(singleBookmarkGem?.media?.showAuthor || false)
            }

            if(singleBookmarkGem.media_type === 'Testimonial'){
                setTestimonialAuthor(singleBookmarkGem?.media?.author)
                setTestimonialTagLine(singleBookmarkGem?.media?.tagLine)
                setTestimonialProduct(singleBookmarkGem?.media?.product)
                setTestimonial(singleBookmarkGem?.media?.testimonial)
                setTestimonialAttachImage(singleBookmarkGem?.media?.attachImage)
                setTestimonialUrl(singleBookmarkGem?.media?.url)
                setTestimonialDate(singleBookmarkGem?.media?.date)
                setTestimonialRating(singleBookmarkGem?.media?.rating)
                setTestimonialPlatform(singleBookmarkGem?.media?.platform)
                setTestimonialType(singleBookmarkGem?.media?.testimonialType || 'image')
                setTestimonialAttachVideo(singleBookmarkGem?.media?.attachVideo || '')
                setTestimonialAttachAudio(singleBookmarkGem?.media?.attachAudio || '') 
                setTestimonialAvatar(singleBookmarkGem?.media?.avatar || '') 
                setFileType(singleBookmarkGem?.media?.fileType || 'file')
                setHtml(singleBookmarkGem?.media?.html || null)
            }

            if(singleBookmarkGem.media_type === 'Book'){
                setRate(singleBookmarkGem?.media?.myRating || 0)
                setDateRead(singleBookmarkGem?.media?.readStart || '')
                setReadStatus(singleBookmarkGem?.media?.status || null)
            }

            if(singleBookmarkGem.media_type === 'Movie'){
                setRate(singleBookmarkGem?.media?.myRating || 0)
                setDateRead(singleBookmarkGem?.media?.readStart || '')
                setWatchStatus(singleBookmarkGem?.media?.status || null)
            }

            if(singleBookmarkGem?.media_type === 'Profile' && singleBookmarkGem?.media?.type === 'contact'){
                setBioContactFields(singleBookmarkGem?.media?.bioContactFields || [])
                const missingObjects = defaultBioContactFields.filter(defItem => 
                !singleBookmarkGem?.media?.bioContactFields.find(apiItem => apiItem.key === defItem.key)
                );
                setAvailableFields(missingObjects)
            }

            if(singleBookmarkGem.custom_fields_obj && singleBookmarkGem.custom_fields_obj.length>0 && singleBookmarkGem.custom_fields_obj.length === customFields[0]?.customFieldObj?.length){
                setCustomPropertyWithoutAnswer([])
                return;
            }
            else if(singleBookmarkGem.custom_fields_obj && singleBookmarkGem.custom_fields_obj.length>0 &&  singleBookmarkGem.custom_fields_obj.length !== customFields[0]?.customFieldObj?.length){
                const filteredArray = customFields[0]?.customFieldObj?.filter(obj => singleBookmarkGem.custom_fields_obj.every(o => o.id !== obj.id));

                setCustomPropertyWithoutAnswer(filteredArray)
                return;
            }else{
                setCustomPropertyWithoutAnswer(customFields[0]?.customFieldObj)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [singleBookmarkGem,page])

    //current gem

    // const onThumbnailChangeClick = async (e) => {
    //     const { files } = e.target

    //     if (files.length !== 0 && checkValidFileTypes(files[0])) {
    //         let   res      = null
    //         const formData = new FormData()
    //         formData.append("files", files[0])
    //         setImgSpinner(true)
    //         if (gemSingleId) {
    //             res = await dispatch(uploadBookmarkCover(gemSingleId, formData))
    //         }
    //         else {
    //             res = await dispatch(uploadScreenshots(formData))
    //         }
    //         setImgSpinner(false)
    //         if (res && res.error === undefined && res.payload.error === undefined) {
    //             const { data } = res.payload
    //             if (data) {
    //               const newCovers = singleBookmarkGem ? [ ...data.media.covers ] : [ ...data ] 
    //               setCovers((singleBookmarkGem) ? [ ...newCovers ] : [ ...covers, ...data ])
    //               setImageUrl(newCovers.length > 0 ? newCovers[newCovers.length - 1] : "")
    //             }
    //             e.target.files = null
    //         }
    //     }
    //     else {
    //         message.error("Invalid file type!")
    //     }
    // }

    const onOpenImageDialog = (tab) => {
        if (assetUrl === "" && selectedType?.name !== "Blog" && selectedType?.name !== "Ai Prompt" && selectedType?.name !== "Text Expander") {
            message.error("Please enter url first")
            return
        }
        setCurrentImageTab(tab)
        setIsOpenImageDialog(true)
      }
    
      const onImageDialogClose = () => {
        setCurrentImageTab(null)
        setIsOpenImageDialog(false)
      }

    const onThumbnailSelect = (src) => {
        if (src === null) {
          setCovers([])
          setImageUrl("")
          setFallbackURL('')
          setIsOpenImageDialog(false)
          setCurrentThumbnail(null)
          return
        }
        const newDocImages   = [...docImages]
        const idx            = newDocImages.findIndex((c) => { return c === src })
        if (idx !== -1) {
          newDocImages.splice(idx, 1)
        }
        setDocImages([ src, ...newDocImages ])
        setCurrentThumbnail(src)
        setCovers([ src, ...covers ])
        setImageUrl(src)
        setFallbackURL(src)
        setIsOpenImageDialog(false)
      }
    
      const onIconSelect = (iconObj) => {
        if (iconObj === null) {
          setFavIconSrc(null)
          setCurrentIcon("")
          setDefaultFavIconSrc(null)
          setIsOpenImageDialog(false)
          return
        }
        setCurrentIcon(iconObj)
        setFavIconSrc(iconObj)
        // setDefaultFavIconSrc(iconObj.icon)
        setIsOpenImageDialog(false)
    }

    const renderThumbnail = () => {
        return (
            <div>
              <div className={`bg-white ${isMobileView ? 'w-fit' : 'w-[48px]'} h-[48px] rounded-lg pointer text-center`} 
                   onClick={() => onOpenImageDialog("thumbnail")}>
                {imgSpinner && <Spin className="mt-5" />}
                {imageUrl && imageUrl !== "" 
                    ? <img className={`${isMobileView ? 'w-[40px]' : 'w-[48px]'} h-[48px] rounded-lg`} src={imageUrl} alt={singleBookmarkGem?.altInfo || singleBookmarkGem?.title || "Curateit"} />
                    : <img className='w-[40px] h-[40px] rounded-lg fit-image' src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/default-img-paceholder.png`} alt={"Curateit"} />
                }
              </div>
              {/* <div onClick={() => imageRef.current.click()} className={`${isMobileView ? 'w-[30px]' : 'w-[48px]'} py-[2px] bg-white flex justify-center align-middle border-2 border-gray-300 rounded-sm my-2 cursor-pointer`}>
                <img src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/image-up.svg`} alt="up icon" className="h-[18px]" />
              </div>
              <input className='hidden' ref={imageRef} onChange={onThumbnailChangeClick} onError={(err)=>message.error(err)} type="file" name="bookmark-image" id="bookmark-image" accept="image/png, image/jpeg" /> */}
              {favImgSpinner && <Spin className="mt-5" />}
              <div className="mt-5" onClick={() => onOpenImageDialog("favicon")}>
                    <FavIconComponent data={favIconSrc || { type: "image", icon: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/default-emoji-placeholder.png`}} />
              </div>
              {/* <div onClick={() => setOpenIconModal(true)} className={`${isMobileView ? 'w-[30px]' : 'w-[48px]'} py-[2px] bg-white flex justify-center align-middle border-2 border-gray-300 rounded-sm my-2 cursor-pointer`}>
                <img src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/image-up.svg`} alt="up icon" className="h-[18px]" />
              </div> */}
              <div 
                onClick={(e) => {
                    e.stopPropagation();
                    window.open(singleBookmarkGem?.url || '', "_blank");
                }}
              className={`${isMobileView ? 'w-[30px]' : 'w-[40px]'} py-[2px] bg-white flex justify-center align-middle border-2 border-gray-300 rounded-sm mt-1 cursor-pointer`}>
                <MdOutlineOpenInNew className='text-gray-600 h-5 w-5 cursor-pointer' />
              </div>
            </div>
        )
    }

    const prepareTags = () => {
        const tagArr = []
        userTags.forEach((t) => {
          if (t.tag) {
            tagArr.push({
              id: t.tag,
              text: t.tag
            })
          }
        })
        return tagArr
    }

    const onTagAdd = async (tag) => {
        const existingIdx = userTags?.findIndex((t) => { return t.tag === tag.text })
        if (existingIdx !== -1) {
            setSelectedTags([ ...selectedTags, { id: userTags[existingIdx].id, tag: userTags[existingIdx].tag }])
        }
        else {
            setSelectedTags([ ...selectedTags, { id: tag?.text, tag: tag?.text } ])
        }
    }
    
    const onTagDelete = (i) => {
        selectedTags.splice(i, 1)
        setSelectedTags([ ...selectedTags ])
    }

    const onLayoutClick = () => {
        setShowCollectionInput(false)
        setShowTypeInput(false)
    }

    const handleCopy = (text) => {
        window.navigator.clipboard.writeText(text)
        .then(() => message.success('Text copied'))
        .error(() => message.error('Not have permission'))
    }

    ////not answered

    const updateCustomPropertyValue = (e,i,type) => {
        const arr = [...customPropertyWithoutAnswer]

        if(type === 'text'){
            arr[i] = {
                ...arr[i],
                answer: e.target.value
            }

            setCustomPropertyWithoutAnswer(arr)
        }

        if(type === 'select'){
            arr[i] = {
                ...arr[i],
                answer: e
            }

            setCustomPropertyWithoutAnswer(arr)
        }
        if(type === 'multi'){
            arr[i] = {
                ...arr[i],
                answer: e
            }

            setCustomPropertyWithoutAnswer(arr)
        }

        if(type === 'checkbox'){
            arr[i] = {
                ...arr[i],
                answer: e.target.checked
            }

            setCustomPropertyWithoutAnswer(arr)
        }

        
    }

    const renderCustomFieldProperty = (item,i) => {
        if(item.type.toLowerCase() === 'text' || item.type.toLowerCase() === 'number' || item.type.toLowerCase() === 'email' || item.type.toLowerCase() === 'url' || item.type.toLowerCase() === 'phone' || item.type.toLowerCase() === 'formula'){
            return <div className='pt-4'>
            <h6 className="block text-xs font-medium text-gray-500 mb-1">{item.name}</h6>
            <AntInput placeholder={item.name} 
            // value={item?.answer || ''} 
            style={{width:'100%'}}
            size="small"
            onChange={(e) => updateCustomPropertyValue(e,i,'text')} defaultValue={item?.defaultValue || ''}
            className="rounded-md"
            />
            </div>
        }

        if(item.type.toLowerCase() === 'status' || item.type.toLowerCase() === 'select'){
            return <div className='pt-4'>
            <h6 className="block text-xs font-medium text-gray-500 mb-1">{item.name}</h6>
            <Select className="w-full" placeholder={item.name}
            onChange={(value) => updateCustomPropertyValue(value,i,'select')}
            // value={item?.answer || null}
            defaultValue={item?.defaultValue || null}
            >
                {item.options.map((item,i) => (
                    <Option value={item.value} key={item.value}>{item.value}</Option>
                ))}
            </Select>
            </div>
        }

        if(item.type.toLowerCase() === 'multi-select'){
            return <div className='pt-4'>
            <h6 className="block text-xs font-medium text-gray-500 mb-1">{item.name}</h6>
            <Select className="w-full" placeholder={item.name}
            onChange={(value) => updateCustomPropertyValue(value,i,'multi')}
            // value={item?.answer || []}
            mode={'multiple'}
            defaultValue={item?.defaultValue || []}
            >
                {item.options.map((item,i) => (
                    <Option value={item.value} key={item.value}>{item.value}</Option>
                ))}
            </Select>
            </div>
        }

        if(item.type.toLowerCase() === 'checkbox'){
            return <div className='pt-4'>
            <AntCheckbox
            // value={item?.answer}  
            onChange={(e) => updateCustomPropertyValue(e,i,'checkbox')}
            defaultValue={item?.defaultValue}
            defaultChecked={item?.defaultValue}
            >
                {item.name}
            </AntCheckbox>
            </div>
        }

        if(item.type.toLowerCase() === 'date'){
            return <div className='pt-4'>
            <h6 className="block text-xs font-medium text-gray-500 mb-1">{item.name}</h6>
            <DatePicker 
            onChange={(date,dateString) => {
                const arr = [...customPropertyWithoutAnswer]
                arr[i] = {
                ...arr[i],
                answer: dateString
            }

            setCustomPropertyWithoutAnswer(arr)
            }} 
            showToday={false}
            format={'DD-MM-YYYY'}
            // value={item?.answer ? moment(item.answer,'DD-MM-YYYY') : null}
            // allowClear={false}
            className='w-full'
            defaultValue={item?.defaultValue ? moment(item?.defaultValue,'DD-MM-YYYY') : null}
            />
            </div>
        }

        if(item.type.toLowerCase() === 'created time'){
            return <div className='pt-4'>
            <h6 className="block text-xs font-medium text-gray-500 mb-1">{item.name}</h6>
            <div className="flex items-center justify-between">
                <div>{singleBookmarkGem.createdAt}</div>
                <DocumentDuplicateIcon className="h-5 w-5 cursor-pointer" onClick={() => handleCopy(singleBookmarkGem.createdAt)}/>
            </div>
            </div>
        }
        if(item.type.toLowerCase() === 'last edited time'){
            return <div className='pt-4'>
            <h6 className="block text-xs font-medium text-gray-500 mb-1">{item.name}</h6>
            <div className="flex items-center justify-between">
                <div>{singleBookmarkGem.updatedAt}</div>
                <DocumentDuplicateIcon className="h-5 w-5 cursor-pointer" onClick={() => handleCopy(singleBookmarkGem.updatedAt)}/>
            </div>
            </div>
        }
        if(item.type.toLowerCase() === 'created by' || item.type.toLowerCase() === 'last edited by'){
            return <div className='pt-4'>
            <h6 className="block text-xs font-medium text-gray-500 mb-1">{item.name}</h6>
            <div className="flex items-center justify-between">
                <div>{singleBookmarkGem?.author?.data?.attributes?.username}</div>
                <DocumentDuplicateIcon className="h-5 w-5 cursor-pointer" onClick={() => handleCopy(singleBookmarkGem?.author?.data?.attributes?.username)}/>
            </div>
            </div>
        }
    }


    //answered
    const updateCustomPropertyValueAnswered = (e,i,type) => {
        const arr = [...customPropertyAnswered]

        if(type === 'text'){
            arr[i] = {
                ...arr[i],
                answer: e.target.value
            }

            setCustomPropertyAnswered(arr)
        }

        if(type === 'select'){
            arr[i] = {
                ...arr[i],
                answer: e
            }

            setCustomPropertyAnswered(arr)
        }

        if(type === 'multi'){
            arr[i] = {
                ...arr[i],
                answer: e
            }

            setCustomPropertyAnswered(arr)
        }
        if(type === 'checkbox'){
            arr[i] = {
                ...arr[i],
                answer: e.target.checked
            }

            setCustomPropertyAnswered(arr)
        }
    }

    const renderCustomFieldPropertyAnswered = (item,i) => {
        if(item.type.toLowerCase() === 'text' || item.type.toLowerCase() === 'number' || item.type.toLowerCase() === 'email' || item.type.toLowerCase() === 'url' || item.type.toLowerCase() === 'phone' || item.type.toLowerCase() === 'formula'){
            return <div className='pt-4'>
            <h6 className="block text-xs font-medium text-gray-500 mb-1">{item.name}</h6>
            <Input placeholder={item.name} value={item?.answer || ''} style={{width:'100%'}}
            onChange={(e) => updateCustomPropertyValueAnswered(e,i,'text')}
            />
            </div>
        }

        if(item.type.toLowerCase() === 'status' || item.type.toLowerCase() === 'select'){
            return <div className='pt-4'>
            <h6 className="block text-xs font-medium text-gray-500 mb-1">{item.name}</h6>
            <Select className="w-full" placeholder={item.name} 
            onChange={(value) => updateCustomPropertyValueAnswered(value,i,'select')} value={item?.answer || null}>
                {item.options.map((item,i) => (
                    <Option value={item.value} key={item.value}>{item.value}</Option>
                ))}
            </Select>
            </div>
        }

        if(item.type.toLowerCase() === 'multi-select'){
            return <div className='pt-4'>
            <h6 className="block text-xs font-medium text-gray-500 mb-1">{item.name}</h6>
            <Select className="w-full" placeholder={item.name}
            onChange={(value) => updateCustomPropertyValueAnswered(value,i,'multi')}
            value={item?.answer || []}
            mode={'multiple'}
            >
                {item.options.map((item,i) => (
                    <Option value={item.value} key={item.value}>{item.value}</Option>
                ))}
            </Select>
            </div>
        }

        if(item.type.toLowerCase() === 'checkbox'){
            return <div className='pt-4'>
            <AntCheckbox 
            value={item?.answer}  
            onChange={(e) => updateCustomPropertyValueAnswered(e,i,'checkbox')}
            checked={item?.answer}
            >
                {item.name}
            </AntCheckbox>
            </div>
        }

        if(item.type.toLowerCase() === 'date'){
            return <div className='pt-4'>
            <h6 className="block text-xs font-medium text-gray-500 mb-1">{item.name}</h6>
            <DatePicker 
            onChange={(date,dateString) => {
                const arr = [...customPropertyAnswered]
                arr[i] = {
                ...arr[i],
                answer: dateString
            }

            setCustomPropertyAnswered(arr)
            }} 
            showToday={false}
            format={'DD-MM-YYYY'}
            value={item?.answer ? moment(item?.answer,'DD-MM-YYYY') : null}
            // allowClear={false}
            className='w-full'
            />
            </div>
        }

        if(item.type.toLowerCase() === 'created time'){
            return <div className='pt-4'>
            <h6 className="block text-xs font-medium text-gray-500 mb-1">{item.name}</h6>
            <div className="flex items-center justify-between">
                <div>{singleBookmarkGem.createdAt}</div>
                <DocumentDuplicateIcon className="h-5 w-5 cursor-pointer" onClick={() => handleCopy(singleBookmarkGem.createdAt)}/>
            </div>
            </div>
        }
        if(item.type.toLowerCase() === 'last edited time'){
            return <div className='pt-4'>
            <h6 className="block text-xs font-medium text-gray-500 mb-1">{item.name}</h6>
            <div className="flex items-center justify-between">
                <div>{singleBookmarkGem.updatedAt}</div>
                <DocumentDuplicateIcon className="h-5 w-5 cursor-pointer" onClick={() => handleCopy(singleBookmarkGem.updatedAt)}/>
            </div>
            </div>
        }
        if(item.type.toLowerCase() === 'created by' || item.type.toLowerCase() === 'last edited by'){
            return <div className='pt-4'>
            <h6 className="block text-xs font-medium text-gray-500 mb-1">{item.name}</h6>
            <div className="flex items-center justify-between">
                <div>{singleBookmarkGem?.author?.data?.attributes?.username}</div>
                <DocumentDuplicateIcon className="h-5 w-5 cursor-pointer" onClick={() => handleCopy(singleBookmarkGem?.author?.data?.attributes?.username)}/>
            </div>
            </div>
        }
    }

    const handleSubmit = async() => {
        setError(false)
        if (!selectedCollection.id) {
            setError(true)
            return;
        }
        if(mediaType === 'Profile' && singleBookmarkGem?.media?.type === 'contact'){
            if(!title){
                message.error('Title is required')
                return;
            }
            if(!description){
                message.error('Description is required')
                return;
            }
            if(title?.length > 30){
                message.error('Title cannot exceed 30 characters')
                return;
            }
            if(description?.length > 90){
                message.error('Description cannot exceed 30 characters')
                return;
            }
        }

        if((mediaType === 'Ai Prompt' || mediaType === 'Text Expander') && !shortendurl){
            message.error("Please enter short url")
            return
        }

        let newTags = []
        const filtered = selectedTags.filter(item => typeof item.id === 'string');
        const filteredNumber = selectedTags.filter(item => typeof item.id === 'number');
        const tagNames = filtered?.map(item => item?.tag)
        if(tagNames && tagNames?.length>0){
            newTags = await updateTagsPromise(tagNames, userTags, tagNames?.length) 
        }
        newTags = [...newTags,...filteredNumber]

        setButtonLoading(true)
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
            favIconSrc
        }

        const mediaCovers  = singleBookmarkGem?.metaData?.covers ? [ obj.imageUrl, ...singleBookmarkGem?.metaData?.covers ] : obj.covers && obj.covers.length !== 0 ? obj.covers : [obj.imageUrl]
        const finalCovers  = removeDuplicates(mediaCovers)

        const data = customPropertyWithoutAnswer?.map(item => {
        let obj = {...item};

        if(item?.type?.toLowerCase() === 'created by' || item?.type?.toLowerCase() === 'last edited by'){
            obj.answer = singleBookmarkGem?.author?.data?.attributes?.username || ''
        }
        else if(item?.type?.toLowerCase() === 'created time'){
            obj.answer = singleBookmarkGem?.createdAt || ''
        }       
        else if(item?.type?.toLowerCase() === 'last edited time'){
            obj.answer = singleBookmarkGem?.updatedAt || ''
        }

        if(!obj?.answer && obj?.defaultValue){
          obj.answer = obj?.defaultValue
        }

        return obj;
        })

        const customDataAnswered = customPropertyAnswered?.map(item => {
        let obj = {...item};

        if(item?.type?.toLowerCase() === 'created by' || item?.type?.toLowerCase() === 'last edited by'){
            obj.answer = singleBookmarkGem?.author?.data?.attributes?.username || ''
        }
        else if(item?.type?.toLowerCase() === 'created time'){
            obj.answer = singleBookmarkGem?.createdAt || ''
        }       
        else if(item?.type?.toLowerCase() === 'last edited time'){
            obj.answer = singleBookmarkGem?.updatedAt || ''
        }

        return obj;
        })

        const filteredWithAnswer =  data?.filter(item => item?.answer) || []

        let finalObj = {
            title: obj.title,
            description: obj.description,
            media_type: typeof obj.selectedType === "object" ? obj.selectedType?.name : obj.selectedType,
            author: singleBookmarkGem?.isPublicPrompt ? singleBookmarkGem?.author?.data?.id : session.userId ? parseInt(session.userId) : null,
            url: obj.assetUrl,
            metaData: {
                ...singleBookmarkGem?.metaData,
                type: typeof obj.selectedType === "object" ? obj.selectedType?.name : obj.selectedType,
                title: obj.heading || obj.title,
                icon: obj?.favIconSrc || "",
                url: obj.assetUrl,
                covers: finalCovers
            },
            collection_gems: obj.selectedCollection.id,
            remarks: obj.remarks,
            tags: obj.selectedTags?.map((t) => { return t.id }),
            is_favourite: obj.favorite,
            custom_fields_obj: [...customDataAnswered,...filteredWithAnswer],
            media: singleBookmarkGem.media,
            isPublicPrompt: isPublicPrompt === "public" ? true : false
        }

        const isSingleBkShared = getBookmarkPermissions(sharedCollections,Number(gemSingleId))

        const isSelectedCollectionShared = getAllLevelCollectionPermissions(sharedCollections,obj.selectedCollection.id)
        const isSelectedTagShared = getAllLevelCollectionPermissions(sharedTags,tagId)

        if(isSingleBkShared && !isSelectedCollectionShared){
            message.error('You cant move shared collection gem to own collection')
            setError(true)
            setButtonLoading(false)
            return;
        }

        if(isSelectedCollectionShared || isSelectedTagShared){
            finalObj ={
                ...finalObj,
                author: isSelectedCollectionShared?.data?.author?.id || isSelectedTagShared?.data?.author?.id || ''
            }
        }

        if (mediaType === "Blog") {
            const mainObj = {
                title: finalObj.title,
                author: finalObj.author,
                description: finalObj.description,
                expander: shortendurl ? [{ type: "link", keyword: shortendurl, url: obj.assetUrl, text: '' }] : [],
                tags: finalObj.tags,
                collection_gems: finalObj.collection_gems,
                remarks: finalObj.remarks,
                custom_fields_obj: [...customDataAnswered,...filteredWithAnswer],
                media: singleBookmarkGem?.media,
                metaData: singleBookmarkGem?.metaData,
                is_favourite: finalObj.is_favourite,
            }
            const isThumbnailChanged = singleBookmarkGem?.metaData?.defaultThumbnail !== currentThumbnail && currentThumbnail !== ""
            const isIconChanged      = JSON.stringify(singleBookmarkGem?.metaData?.icon) !== JSON.stringify(currentIcon)
            let mediaO = {
                ...singleBookmarkGem?.media,
                status: blogStatus,
                publishedAt: blogPublishedDate,
                authorId: blogAuthor,
                showAuthor: showBlogAuthor
            }
            if (blogStatus === "Published") {
                mediaO = {
                    ...mediaO,
                    publishedContent: singleBookmarkGem?.media?.blogContent || "",
                }
            }
            if (currentThumbnail === "") { 
                mainObj["media"] = {
                    ...mediaO,
                    blogBanner: null
                }
            }
            if (isThumbnailChanged || isIconChanged) {
                const mObj =  {
                    ...singleBookmarkGem?.metaData,
                    type: typeof obj.selectedType === "object" ? obj.selectedType?.name : obj.selectedType,
                    title: obj.heading || obj.title,
                    icon: obj?.favIconSrc || "",
                    url: obj.assetUrl,
                    covers: finalCovers,
                    defaultThumbnail: currentThumbnail,
                    docImages: [ currentThumbnail, ...singleBookmarkGem?.metaData?.docImages ]
                }
                if (isThumbnailChanged && currentThumbnail !== "") {
                    mObj["covers"] = finalCovers
                    mObj["defaultThumbnail"] = currentThumbnail
                    mObj["docImages"] = [ currentThumbnail, ...singleBookmarkGem?.metaData?.docImages ]

                    mediaO = {
                        ...mediaO,
                        blogBanner: {
                            type: "upload",
                            icon: currentThumbnail,
                            imagePosition: { x: 50, y: 50}
                        }
                    }
                }
                if(isThumbnailChanged && !currentThumbnail){
                    mediaO = {
                        ...mediaO,
                        blogBanner: null
                    }
                }
                if (isIconChanged) {
                    mObj["icon"] = obj.favIconSrc
                    mObj["defaultIcon"] = obj.defaultFavIconSrc
                }
                mainObj["metaData"] = mObj
            }
            mainObj["media"]    = mediaO

            const blogRes = await dispatch(updateGem(gemSingleId, { data: mainObj }))
            if(blogRes.error === undefined){
                const parent              = singleBookmarkGem?.collection_gems
                const isCollectionChanged = (parent?.data?.id || parent?.id) !== obj.selectedCollection.id;
                
                const o = {
                    ...mainObj,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: mainObj?.author
                    }
                }
                if(!isSelectedCollectionShared && !isSelectedTagShared){
                    if(isCollectionChanged){
                        dispatch(updateCollectionWiseCount(parent?.data?.id || parent?.id,obj.selectedCollection.id))
                        if(page === ''){
                            submit([gemSingleId],'delete')
                            setButtonLoading(false)
                            message.success('Bookmark updated')
                            setOpenDrawer(false)
                            return;
                        }
                        submit([o])
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }else{
                        submit([o])
                        // dispatch(updateAddNewGemInTag(o.tags,gemSingleId,{...singleBookmarkGem, ...o}))
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }
                }

                if(isSelectedCollectionShared || isSelectedTagShared){
                    dispatch(reduceCollectionWiseCount(singleBookmarkGem?.collection_gems?.data?.id))
                    dispatch(moveGemToSharedCollection(mainObj?.collection_gems,gemSingleId,(singleBookmarkGem) ? { ...singleBookmarkGem, ...o } : {...mainObj,id:gemSingleId}))
                    setButtonLoading(false)
                    message.success('Bookmark updated')
                    setOpenDrawer(false)
                    setGemSingleIdSingleId('')
                    if(isCurrentCollectionShared || isSelectedTagShared){
                        submit([o])
                        return;
                    }
                    submit([gemSingleId],'delete')
                    return;
                }
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        }

        if(mediaType === 'Highlight'){
        const media  = {
            ...singleBookmarkGem?.media,
            notes: obj.remarks,
            color: highlightedColor,
            text: highlightedText,
            link:  obj.assetUrl,
            collections: obj.selectedCollection?.id,
            tags: obj.selectedTags?.map((t) => { return t.id }),
            type: typeof obj.selectedType === "object" ? obj.selectedType?.name : obj.selectedType,
            box: highlightBox,
            _id: mediaData?._id || highlightDetails?.id,
            details: highlightDetails,
            styleClassName: highlightClass,
        }
            const shortUrlObj = shortendurl ? [{ type: "link", keyword: shortendurl, url: assetUrl, text: '' }] : []
            const finalData = {...finalObj,media,expander:shortUrlObj}

            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const parent              = singleBookmarkGem?.collection_gems
                const isCollectionChanged = (parent?.data?.id || parent?.id) !== obj.selectedCollection.id;
                
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                if(!isSelectedCollectionShared && !isSelectedTagShared){
                    if(isCollectionChanged){
                        dispatch(updateCollectionWiseCount(parent?.data?.id || parent?.id,obj.selectedCollection.id))
                        if(page === ''){
                            submit([gemSingleId],'delete')
                            setButtonLoading(false)
                            message.success('Bookmark updated')
                            setOpenDrawer(false)
                            return;
                        }
                        submit([o])
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }else{
                        submit([o])
                        // dispatch(updateAddNewGemInTag(o.tags,gemSingleId,{...singleBookmarkGem, ...o}))
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }
                }

                if(isSelectedCollectionShared || isSelectedTagShared){
                    dispatch(reduceCollectionWiseCount(singleBookmarkGem?.collection_gems?.data?.id))
                    dispatch(moveGemToSharedCollection(finalObj?.collection_gems,gemSingleId,(singleBookmarkGem) ? { ...singleBookmarkGem, ...o } : {...finalData,id:gemSingleId}))
                    setButtonLoading(false)
                    message.success('Bookmark updated')
                    setOpenDrawer(false)
                    setGemSingleIdSingleId('')
                    if(isCurrentCollectionShared || isSelectedTagShared){
                        submit([o])
                        return;
                    }
                    submit([gemSingleId],'delete')
                    return;
                }
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;

        }

        if(mediaType === 'Note' || 
        mediaType === 'Quote'){
        const media  = {
            ...singleBookmarkGem?.media,
            notes: obj.remarks,
            color: highlightedColor,
            text: highlightedText,
            link:  obj.assetUrl,
            collections: obj.selectedCollection?.id,
            tags: obj.selectedTags?.map((t) => { return t.id }),
            type: typeof obj.selectedType === "object" ? obj.selectedType?.name : obj.selectedType,
            box: highlightBox,
            _id: mediaData?._id || highlightDetails?.id,
            details: highlightDetails,
            styleClassName: highlightClass,
        }

            const finalData = {...finalObj,media,title: media?.text}

            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const parent              = singleBookmarkGem?.collection_gems
                const isCollectionChanged = (parent?.data?.id || parent?.id) !== obj.selectedCollection.id;
                
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                if(!isSelectedCollectionShared && !isSelectedTagShared){
                    if(isCollectionChanged){
                        dispatch(updateCollectionWiseCount(parent?.data?.id || parent?.id,obj.selectedCollection.id))
                        if(page === ''){
                            submit([gemSingleId],'delete')
                            setButtonLoading(false)
                            message.success('Bookmark updated')
                            setOpenDrawer(false)
                            return;
                        }
                        submit([o])
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }else{
                        submit([o])
                        // dispatch(updateAddNewGemInTag(o.tags,gemSingleId,{...singleBookmarkGem, ...o}))
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }
                }

                if(isSelectedCollectionShared || isSelectedTagShared){
                    dispatch(reduceCollectionWiseCount(singleBookmarkGem?.collection_gems?.data?.id))
                    dispatch(moveGemToSharedCollection(finalObj?.collection_gems,gemSingleId,(singleBookmarkGem) ? { ...singleBookmarkGem, ...o } : {...finalData,id:gemSingleId}))
                    setButtonLoading(false)
                    message.success('Bookmark updated')
                    setOpenDrawer(false)
                    setGemSingleIdSingleId('')
                    if(isCurrentCollectionShared || isSelectedTagShared){
                        submit([o])
                        return;
                    }
                    submit([gemSingleId],'delete')
                    return;
                }
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        }

        if (mediaType === 'Ai Prompt' || mediaType === 'Text Expander') {
            if (htmlText === "") {
                message.error(mediaType === 'Ai Prompt' ? "Please enter a text for Ai prompt" :"Please enter a text for text expander")
                return
            }
            const media = {
                ...singleBookmarkGem?.media,
                notes: obj.remarks,
                color: highlightedColor,
                text: htmlText,
                link: obj.assetUrl,
                collections: obj.selectedCollection?.id,
                tags: obj.selectedTags?.map((t) => { return t.id }),
                type: typeof obj.selectedType === "object" ? obj.selectedType?.name : obj.selectedType,
                box: highlightBox,
                _id: mediaData?._id || highlightDetails?.id,
                details: highlightDetails,
                styleClassName: highlightClass,
            }
            // let type = mediaType === 'Ai Prompt' ? "prompt" : "expander"

            const newExpander = singleBookmarkGem?.expander && singleBookmarkGem.expander.length > 0 && singleBookmarkGem.expander.map(exp => {
                if(exp.type === "link"){
                    return { ...exp, keyword: shortendurl }
                }else{
                    return { ...exp, keyword: shortendurl, plainText, text: htmlText }
                }
            })

            const expanderObj = {
                text: htmlText,
                expander: newExpander
            }

            const finalData = { 
                ...finalObj, 
                ...expanderObj, 
                media,
                isPublicPrompt: promptType === "public" ? true : false,
                is_enable_for_all_sites: enableSites,
                prompt_priority_sites: prioritySites,
                prompt_category: promptCategory,
            }

            const res = await dispatch(updateGem(gemSingleId, { data: finalData }))

            if (res.error === undefined) {
                const parent = singleBookmarkGem?.collection_gems
                const isCollectionChanged = (parent?.data?.id || parent?.id) !== obj.selectedCollection.id;

                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id: gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                if(!isSelectedCollectionShared && !isSelectedTagShared){
                    if(isCollectionChanged){
                        dispatch(updateCollectionWiseCount(parent?.data?.id || parent?.id,obj.selectedCollection.id))
                        if(page === ''){
                            submit([gemSingleId],'delete')
                            setButtonLoading(false)
                            message.success('Bookmark updated')
                            setOpenDrawer(false)
                            return;
                        }
                        submit([o])
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }else{
                        submit([o])
                        // dispatch(updateAddNewGemInTag(o.tags,gemSingleId,{...singleBookmarkGem, ...o}))
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }
                }

                if(isSelectedCollectionShared || isSelectedTagShared){
                    dispatch(reduceCollectionWiseCount(singleBookmarkGem?.collection_gems?.data?.id))
                    dispatch(moveGemToSharedCollection(finalObj?.collection_gems,gemSingleId,(singleBookmarkGem) ? { ...singleBookmarkGem, ...o } : {...finalData,id:gemSingleId}))
                    setButtonLoading(false)
                    message.success('Bookmark updated')
                    setOpenDrawer(false)
                    setGemSingleIdSingleId('')
                    if(isCurrentCollectionShared || isSelectedTagShared){
                        submit([o])
                        return;
                    }
                    submit([gemSingleId],'delete')
                    return;
                }

                setButtonLoading(false)
                setOpenDrawer(false)
            } else {
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }

            onClose && onClose()
            return;
        }

        if(mediaType === 'Link' || mediaType === 'Article' || mediaType === 'App' || mediaType === 'Book' || mediaType === 'Movie') {
            let media= {
                ...singleBookmarkGem?.media,
                covers: finalCovers,
                ribbon: {
                text: ribbon?.text || '',
                color: ribbon?.color || '#0693e3'
              }
            }
            if(mediaType === 'Book'){
                media = {
                    ...singleBookmarkGem?.media,
                    myRating: rate,
                    status: readStatus,
                    readStart: dateRead,
                    dateRead: dateRead
                }
            }
            if(mediaType === 'Movie'){
                media = {
                    ...singleBookmarkGem.media,
                    myRating: rate,
                    status: watchStatus,
                    readStart: dateRead,
                    dateRead: dateRead,
                    myStatus: watchStatus
                }
            }
            
            const shortUrlObj = shortendurl ? [{ type: "link", keyword: shortendurl, url: assetUrl, text: '' }] : []

            const finalData = {...finalObj,media,expander:shortUrlObj,isRead: isReaded === 'read' ? true : false, isPublicPrompt: isPublicPrompt === 'public' ? true : false}
            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const parent              = singleBookmarkGem?.collection_gems
                const isCollectionChanged = (parent?.data?.id || parent?.id) !== obj.selectedCollection.id;
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                
                if(!isSelectedCollectionShared && !isSelectedTagShared){
                    if(isCollectionChanged){
                        dispatch(updateCollectionWiseCount(parent?.data?.id || parent?.id,obj.selectedCollection.id))
                        if(page === ''){
                            submit([gemSingleId],'delete')
                            setButtonLoading(false)
                            message.success('Bookmark updated')
                            setOpenDrawer(false)
                            return;
                        }
                        submit([o])
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }else{
                        submit([o])
                        // dispatch(updateAddNewGemInTag(o.tags,gemSingleId,{...singleBookmarkGem, ...o}))
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }
                }

                if(isSelectedCollectionShared || isSelectedTagShared){
                    dispatch(reduceCollectionWiseCount(singleBookmarkGem?.collection_gems?.data?.id))
                    dispatch(moveGemToSharedCollection(finalObj?.collection_gems,gemSingleId,(singleBookmarkGem) ? { ...singleBookmarkGem, ...o } : {...finalData,id:gemSingleId}))
                    setButtonLoading(false)
                    message.success('Bookmark updated')
                    setOpenDrawer(false)
                    setGemSingleIdSingleId('')
                    if(isCurrentCollectionShared || isSelectedTagShared){
                        submit([o])
                        return;
                    }
                    submit([gemSingleId],'delete')
                    return;
                }
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        }

        if(mediaType === 'PDF' || mediaType === 'Audio' || mediaType === 'Video'){
            let media = {}
            if(mediaType === 'PDF'){
                media= {
                    ...singleBookmarkGem?.media,
                    pdfLink: pdfSrc
                }
            }

            if(mediaType === 'Audio'){
                media= {
                    ...singleBookmarkGem?.media,
                    audioLink: audioSrc
                }
            }

            if(mediaType === 'Video'){
                media= {
                    ...singleBookmarkGem?.media,
                    videoLink: videoSrc
                }
            }
            

            const finalData = {...finalObj,media}
            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const parent              = singleBookmarkGem?.collection_gems
                const isCollectionChanged = (parent?.data?.id || parent?.id) !== obj.selectedCollection.id;
                
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                if(!isSelectedCollectionShared && !isSelectedTagShared){
                    if(isCollectionChanged){
                        dispatch(updateCollectionWiseCount(parent?.data?.id || parent?.id,obj.selectedCollection.id))
                        if(page === ''){
                            submit([gemSingleId],'delete')
                            setButtonLoading(false)
                            message.success('Bookmark updated')
                            setOpenDrawer(false)
                            return;
                        }
                        submit([o])
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }else{
                        submit([o])
                        // dispatch(updateAddNewGemInTag(o.tags,gemSingleId,{...singleBookmarkGem, ...o}))
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }
                }

                if(isSelectedCollectionShared || isSelectedTagShared){
                    dispatch(reduceCollectionWiseCount(singleBookmarkGem?.collection_gems?.data?.id))
                    dispatch(moveGemToSharedCollection(finalObj?.collection_gems,gemSingleId,(singleBookmarkGem) ? { ...singleBookmarkGem, ...o } : {...finalData,id:gemSingleId}))
                    setButtonLoading(false)
                    message.success('Bookmark updated')
                    setOpenDrawer(false)
                    setGemSingleIdSingleId('')
                    if(isCurrentCollectionShared || isSelectedTagShared){
                        submit([o])
                        return;
                    }
                    submit([gemSingleId],'delete')
                    return;
                }
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        }

        if(mediaType === 'Image'){
            const media = {
                ...singleBookmarkGem?.media,
                covers: finalCovers,
            }
            const finalData = {...finalObj,media}
            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const parent              = singleBookmarkGem?.collection_gems
                const isCollectionChanged = (parent?.data?.id || parent?.id) !== obj.selectedCollection.id;
                
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                if(!isSelectedCollectionShared && !isSelectedTagShared){
                    if(isCollectionChanged){
                        dispatch(updateCollectionWiseCount(parent?.data?.id || parent?.id,obj.selectedCollection.id))
                        if(page === ''){
                            submit([gemSingleId],'delete')
                            setButtonLoading(false)
                            message.success('Bookmark updated')
                            setOpenDrawer(false)
                            return;
                        }
                        submit([o])
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }else{
                        submit([o])
                        // dispatch(updateAddNewGemInTag(o.tags,gemSingleId,{...singleBookmarkGem, ...o}))
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }
                }

                if(isSelectedCollectionShared || isSelectedTagShared){
                    dispatch(reduceCollectionWiseCount(singleBookmarkGem?.collection_gems?.data?.id))
                    dispatch(moveGemToSharedCollection(finalObj?.collection_gems,gemSingleId,(singleBookmarkGem) ? { ...singleBookmarkGem, ...o } : {...finalData,id:gemSingleId}))
                    setButtonLoading(false)
                    message.success('Bookmark updated')
                    setOpenDrawer(false)
                    setGemSingleIdSingleId('')
                    if(isCurrentCollectionShared || isSelectedTagShared){
                        submit([o])
                        return;
                    }
                    submit([gemSingleId],'delete')
                    return;
                }
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        }

        if(mediaType === 'Screenshot'){
            const media = {
                ...singleBookmarkGem?.media,
                covers: finalCovers,
            }
            const shortUrlObj = shortendurl ? [{ type: "link", keyword: shortendurl, url: assetUrl, text: '' }] : []
            const finalData = {...finalObj,media,expander:shortUrlObj}
            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const parent              = singleBookmarkGem?.collection_gems
                const isCollectionChanged = (parent?.data?.id || parent?.id) !== obj.selectedCollection.id;
                
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                if(!isSelectedCollectionShared && !isSelectedTagShared){
                    if(isCollectionChanged){
                        dispatch(updateCollectionWiseCount(parent?.data?.id || parent?.id,obj.selectedCollection.id))
                        if(page === ''){
                            submit([gemSingleId],'delete')
                            setButtonLoading(false)
                            message.success('Bookmark updated')
                            setOpenDrawer(false)
                            return;
                        }
                        submit([o])
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }else{
                        submit([o])
                        // dispatch(updateAddNewGemInTag(o.tags,gemSingleId,{...singleBookmarkGem, ...o}))
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }
                }

                if(isSelectedCollectionShared || isSelectedTagShared){
                    dispatch(reduceCollectionWiseCount(singleBookmarkGem?.collection_gems?.data?.id))
                    dispatch(moveGemToSharedCollection(finalObj?.collection_gems,gemSingleId,(singleBookmarkGem) ? { ...singleBookmarkGem, ...o } : {...finalData,id:gemSingleId}))
                    setButtonLoading(false)
                    message.success('Bookmark updated')
                    setOpenDrawer(false)
                    setGemSingleIdSingleId('')
                    if(isCurrentCollectionShared || isSelectedTagShared){
                        submit([o])
                        return;
                    }
                    submit([gemSingleId],'delete')
                    return;
                }
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        }

        if(mediaType === 'Code'){
            const media = {
                ...singleBookmarkGem?.media,
                code: code,
                language: codeLanguage,
            }
            const shortUrlObj = shortendurl ? [{ type: "link", keyword: shortendurl, url: assetUrl, text: '' }] : []

            const finalData = {...finalObj,media,expander:shortUrlObj}
            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const parent              = singleBookmarkGem?.collection_gems
                const isCollectionChanged = (parent?.data?.id || parent?.id) !== obj.selectedCollection.id;
                
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                if(!isSelectedCollectionShared && !isSelectedTagShared){
                    if(isCollectionChanged){
                        dispatch(updateCollectionWiseCount(parent?.data?.id || parent?.id,obj.selectedCollection.id))
                        if(page === ''){
                            submit([gemSingleId],'delete')
                            setButtonLoading(false)
                            message.success('Bookmark updated')
                            setOpenDrawer(false)
                            return;
                        }
                        submit([o])
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }else{
                        submit([o])
                        // dispatch(updateAddNewGemInTag(o.tags,gemSingleId,{...singleBookmarkGem, ...o}))
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }
                }

                if(isSelectedCollectionShared || isSelectedTagShared){
                    dispatch(reduceCollectionWiseCount(singleBookmarkGem?.collection_gems?.data?.id))
                    dispatch(moveGemToSharedCollection(finalObj?.collection_gems,gemSingleId,(singleBookmarkGem) ? { ...singleBookmarkGem, ...o } : {...finalData,id:gemSingleId}))
                    setButtonLoading(false)
                    message.success('Bookmark updated')
                    setOpenDrawer(false)
                    setGemSingleIdSingleId('')
                    if(isCurrentCollectionShared || isSelectedTagShared){
                        submit([o])
                        return;
                    }
                    submit([gemSingleId],'delete')
                    return;
                }
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        } 

        if(mediaType === 'SocialFeed'){
            const post_type = tweetType
            const platform = platformType
            const shortUrlObj = shortendurl ? [{ type: "link", keyword: shortendurl, url: assetUrl, text: '' }] : []
            const finalData = {...finalObj,post_type,platform,expander:shortUrlObj}

            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const parent              = singleBookmarkGem?.collection_gems
                const isCollectionChanged = (parent?.data?.id || parent?.id) !== obj.selectedCollection.id;
                
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                if(!isSelectedCollectionShared && !isSelectedTagShared){
                    if(isCollectionChanged){
                        dispatch(updateCollectionWiseCount(parent?.data?.id || parent?.id,obj.selectedCollection.id))
                        if(page === ''){
                            submit([gemSingleId],'delete')
                            setButtonLoading(false)
                            message.success('Bookmark updated')
                            setOpenDrawer(false)
                            return;
                        }
                        submit([o])
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }else{
                        submit([o])
                        // dispatch(updateAddNewGemInTag(o.tags,gemSingleId,{...singleBookmarkGem, ...o}))
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }
                }

                if(isSelectedCollectionShared || isSelectedTagShared){
                    dispatch(reduceCollectionWiseCount(singleBookmarkGem?.collection_gems?.data?.id))
                    dispatch(moveGemToSharedCollection(finalObj?.collection_gems,gemSingleId,(singleBookmarkGem) ? { ...singleBookmarkGem, ...o } : {...finalData,id:gemSingleId}))
                    setButtonLoading(false)
                    message.success('Bookmark updated')
                    setOpenDrawer(false)
                    setGemSingleIdSingleId('')
                    if(isCurrentCollectionShared || isSelectedTagShared){
                        submit([o])
                        return;
                    }
                    submit([gemSingleId],'delete')
                    return;
                }
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        } 

        if(mediaType === 'Profile' && singleBookmarkGem?.media?.type === 'contact'){
            const media = {
                ...singleBookmarkGem.media,
                bioContactFields: bioContactFields
            }
            const finalData = {...finalObj,media}

            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const o = {
                    ...finalData,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                message.success('Bookmark updated')
                setOpenDrawer(false)
                const data = updateBookmarkState(blocks,[o])
                setBlocks(data)
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        }
        
        if(mediaType === 'Profile'){
            const platform = platformType
            const shortUrlObj = shortendurl ? [{ type: "link", keyword: shortendurl, url: assetUrl, text: '' }] : []
            const finalData = {...finalObj,platform,expander:shortUrlObj}

            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const parent              = singleBookmarkGem?.collection_gems
                const isCollectionChanged = (parent?.data?.id || parent?.id) !== obj.selectedCollection.id;
                
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                if(!isSelectedCollectionShared && !isSelectedTagShared){
                    if(isCollectionChanged){
                        dispatch(updateCollectionWiseCount(parent?.data?.id || parent?.id,obj.selectedCollection.id))
                        if(page === ''){
                            submit([gemSingleId],'delete')
                            setButtonLoading(false)
                            message.success('Bookmark updated')
                            setOpenDrawer(false)
                            return;
                        }
                        submit([o])
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }else{
                        submit([o])
                        // dispatch(updateAddNewGemInTag(o.tags,gemSingleId,{...singleBookmarkGem, ...o}))
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }
                }

                if(isSelectedCollectionShared || isSelectedTagShared){
                    dispatch(reduceCollectionWiseCount(singleBookmarkGem?.collection_gems?.data?.id))
                    dispatch(moveGemToSharedCollection(finalObj?.collection_gems,gemSingleId,(singleBookmarkGem) ? { ...singleBookmarkGem, ...o } : {...finalData,id:gemSingleId}))
                    setButtonLoading(false)
                    message.success('Bookmark updated')
                    setOpenDrawer(false)
                    setGemSingleIdSingleId('')
                    if(isCurrentCollectionShared || isSelectedTagShared){
                        submit([o])
                        return;
                    }
                    submit([gemSingleId],'delete')
                    return;
                }
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        } 

        if(mediaType === 'Citation'){
            const media= {
                ...singleBookmarkGem?.media,
                covers: finalCovers,
                citation: citationText,
                credibility: credibility,
                citation_format: citation,
                citationAuthor: citationAuthor,
                citationDate: citationDate
            }

            const finalData = {...finalObj,media}
            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const parent              = singleBookmarkGem?.collection_gems
                const isCollectionChanged = (parent?.data?.id || parent?.id) !== obj.selectedCollection.id;
                
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                if(!isSelectedCollectionShared && !isSelectedTagShared){
                    if(isCollectionChanged){
                        dispatch(updateCollectionWiseCount(parent?.data?.id || parent?.id,obj.selectedCollection.id))
                        if(page === ''){
                            submit([gemSingleId],'delete')
                            setButtonLoading(false)
                            message.success('Bookmark updated')
                            setOpenDrawer(false)
                            return;
                        }
                        submit([o])
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }else{
                        submit([o])
                        // dispatch(updateAddNewGemInTag(o.tags,gemSingleId,{...singleBookmarkGem, ...o}))
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }
                }

                if(isSelectedCollectionShared || isSelectedTagShared){
                    dispatch(reduceCollectionWiseCount(singleBookmarkGem?.collection_gems?.data?.id))
                    dispatch(moveGemToSharedCollection(finalObj?.collection_gems,gemSingleId,(singleBookmarkGem) ? { ...singleBookmarkGem, ...o } : {...finalData,id:gemSingleId}))
                    setButtonLoading(false)
                    message.success('Bookmark updated')
                    setOpenDrawer(false)
                    setGemSingleIdSingleId('')
                    if(isCurrentCollectionShared || isSelectedTagShared){
                        submit([o])
                        return;
                    }
                    submit([gemSingleId],'delete')
                    return;
                }
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        }

        if(mediaType === 'Product') {
            const media= {
                ...singleBookmarkGem?.media,
                covers: finalCovers,
                price: `${currencySymbol}${productPrice}`,
                ribbon: {
                text: ribbon?.text || '',
                color: ribbon?.color || '#0693e3'
              }
            }
            const shortUrlObj = shortendurl ? [{ type: "link", keyword: shortendurl, url: assetUrl, text: '' }] : []
            const finalData = {...finalObj,media,expander:shortUrlObj}
            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const parent              = singleBookmarkGem?.collection_gems
                const isCollectionChanged = (parent?.data?.id || parent?.id) !== obj.selectedCollection.id;
                
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                if(!isSelectedCollectionShared && !isSelectedTagShared){
                    if(isCollectionChanged){
                        dispatch(updateCollectionWiseCount(parent?.data?.id || parent?.id,obj.selectedCollection.id))
                        if(page === ''){
                            submit([gemSingleId],'delete')
                            setButtonLoading(false)
                            message.success('Bookmark updated')
                            setOpenDrawer(false)
                            return;
                        }
                        submit([o])
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }else{
                        submit([o])
                        // dispatch(updateAddNewGemInTag(o.tags,gemSingleId,{...singleBookmarkGem, ...o}))
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }
                }

                if(isSelectedCollectionShared || isSelectedTagShared){
                    dispatch(reduceCollectionWiseCount(singleBookmarkGem?.collection_gems?.data?.id))
                    dispatch(moveGemToSharedCollection(finalObj?.collection_gems,gemSingleId,(singleBookmarkGem) ? { ...singleBookmarkGem, ...o } : {...finalData,id:gemSingleId}))
                    setButtonLoading(false)
                    message.success('Bookmark updated')
                    setOpenDrawer(false)
                    setGemSingleIdSingleId('')
                    if(isCurrentCollectionShared || isSelectedTagShared){
                        submit([o])
                        return;
                    }
                    submit([gemSingleId],'delete')
                    return;
                }
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        }

        if(mediaType === 'Testimonial'){
        let finalSrcAvatar;
        if(testimonialAvatarImage){
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
        const media  = {
            ...singleBookmarkGem?.media,
            // testimonial: testimonial,
            // attachImage: testimonialAttachImage,
            // author: testimonialAuthor,
            // date: testimonialDate,
            // platform: testimonialPlatform,
            // product: testimonialProduct,
            // rating: testimonialRating,
            // tagLine: testimonialTagLine,
            // url: testimonialUrl,
            covers: finalCovers,
            testimonial: testimonial,
            attachImage: testimonialAttachImage || '',
            author: testimonialAuthor,
            date: testimonialDate,
            platform: testimonialPlatform,
            product: testimonialProduct,
            rating: testimonialRating,
            tagLine: testimonialTagLine,
            url: testimonialUrl,
            testimonialType: testimonialType,
            attachAudio: testimonialAttachAudio || '',
            fileType: fileType,
            attachVideo: testimonialAttachVideo || '',
            avatar: finalSrcAvatar || testimonialAvatar || '',
            html:html
        }
            const finalData = {...finalObj,media,}

            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const parent              = singleBookmarkGem?.collection_gems
                const isCollectionChanged = (parent?.data?.id || parent?.id) !== obj.selectedCollection.id;
                
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                if(!isSelectedCollectionShared && !isSelectedTagShared){
                    if(isCollectionChanged){
                        dispatch(updateCollectionWiseCount(parent?.data?.id || parent?.id,obj.selectedCollection.id))
                        if(page === ''){
                            submit([gemSingleId],'delete')
                            setButtonLoading(false)
                            message.success('Bookmark updated')
                            setOpenDrawer(false)
                            return;
                        }
                        submit([o])
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }else{
                        submit([o])
                        // dispatch(updateAddNewGemInTag(o.tags,gemSingleId,{...singleBookmarkGem, ...o}))
                        setButtonLoading(false)
                        message.success('Bookmark updated')
                        setOpenDrawer(false)
                        return;
                    }
                }

                if(isSelectedCollectionShared || isSelectedTagShared){
                    dispatch(reduceCollectionWiseCount(singleBookmarkGem?.collection_gems?.data?.id))
                    dispatch(moveGemToSharedCollection(finalObj?.collection_gems,gemSingleId,(singleBookmarkGem) ? { ...singleBookmarkGem, ...o } : {...finalData,id:gemSingleId}))
                    setButtonLoading(false)
                    message.success('Bookmark updated')
                    setOpenDrawer(false)
                    setGemSingleIdSingleId('')
                    if(isCurrentCollectionShared || isSelectedTagShared){
                        submit([o])
                        return;
                    }
                    submit([gemSingleId],'delete')
                    return;
                }
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;

        }
       
    }

    const handleDelete = async () => {
        if(page === 'bio') {
            setLoadingDelete(true)
            const data = blocks.filter(item => item.id !== Number(gemSingleId))
            setBlocks(data)
            dispatch(deleteBookmark(gemSingleId))
            setLoadingDelete(false)
            setOpenDrawer(false)
            return;
        }
        const isSingleBkShared = getBookmarkPermissions(sharedCollections,Number(gemSingleId))
        const isSingleBkTagShared = getBookmarkPermissions(sharedTags,Number(gemSingleId))

        if(!isSingleBkShared && !isSingleBkTagShared){
        setLoadingDelete(true)

        const res = await dispatch(deleteBookmark(gemSingleId))
        if(res.error === undefined){
            // dispatch(removeGemFromCollection(gemSingleId, singleBookmarkGem?.collection_gems?.data?.id))
            dispatch(reduceCollectionWiseCount(singleBookmarkGem?.collection_gems?.data?.id))
            setLoadingDelete(false)
            message.success('Bookmark deleted successfully')
            setOpenDrawer(false)
            setGemSingleIdSingleId('')
            submit([gemSingleId],'delete')
            dispatch(updateFilterCount(singleBookmarkGem?.media_type,'delete'))
            const tagNames = singleBookmarkGem?.tags?.data?.map((t) => { return t?.tag || t?.attributes?.tag})
            dispatch(addTagCount(tagNames,'delete'))
            isSingleGemPage && navigate.push(`/u/${session.username}/all-bookmarks`)
        }else{
            message.error('Error Occured')
            setLoadingDelete(false)
            setOpenDrawer(false)
            setGemSingleIdSingleId('')
        } 
        return;
        }

        if(isSingleBkShared && !isSingleBkShared?.gems?.canDelete){
            message.error('You dont have permission to delete the gem')
            return;
        }

        if(isSingleBkTagShared && !isSingleBkTagShared?.gems?.canDelete){
            message.error('You dont have permission to delete the gem')
            return;
        }

        if(!isSingleBkTagShared && isSingleBkShared && isSingleBkShared?.gems?.canDelete){
         setLoadingDelete(true)

        const res = await dispatch(deleteBookmark(gemSingleId))
        if(res.error === undefined){
            dispatch(removeGemFromCollection(Number(gemSingleId), singleBookmarkGem?.collection_gems?.data?.id,isCurrentCollectionShared))
            setLoadingDelete(false)
            message.success('Bookmark deleted successfully')
            setOpenDrawer(false)
            setGemSingleIdSingleId('')
            submit([gemSingleId],'delete')
            dispatch(updateFilterCount(singleBookmarkGem?.media_type,'delete'))
            const tagNames = singleBookmarkGem?.tags?.data?.map((t) => { return t?.tag })
            dispatch(addTagCount(tagNames,'delete'))
            isSingleGemPage && navigate.push(`/u/${session.username}/all-bookmarks`)
        }else{
            message.error('Error Occured')
            setLoadingDelete(false)
            setOpenDrawer(false).
            setGemSingleIdSingleId('')
        }
        }

        if(!isSingleBkShared && isSingleBkTagShared && isSingleBkTagShared?.gems?.canDelete){
         setLoadingDelete(true)

        const res = await dispatch(deleteBookmark(gemSingleId))
        if(res.error === undefined){
            dispatch(removeGemFromSharedTags(Number(tagId),Number(gemSingleId)))
            setLoadingDelete(false)
            message.success('Bookmark deleted successfully')
            setOpenDrawer(false)
            setGemSingleIdSingleId('')
            submit([gemSingleId],'delete')
        }else{
            message.error('Error Occured')
            setLoadingDelete(false)
            setOpenDrawer(false)
            setGemSingleIdSingleId('')
        }
        }
        
    }

    const handleCitationChange = async (value) => {
        try {
            setCitation(value)
            setFetching(true)
            const today      = new Date()
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/openai?isCitation=true`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "date": `${today.getDate()}`,
                    "month": `${MONTHNAMES[today.getMonth()]}`,
                    "year": `${today.getFullYear()}`,
                    "text": `${value}`,
                    "url": `${singleBookmarkGem.url}`
                  }),
            });
            const result = await response.json();
            const parsedResult  = JSON.parse(result.message);
            setCitationText(parsedResult.citation)
            setCredibility(parsedResult.credibility)
            setCitationAuthor(parsedResult.author)
            setCitationDate(parsedResult.accessed_date)
            setFetching(false)
        }
        catch(err) {
            message.error("Something went wrong")
        }
    }

    const currenyDropdown = () => {
      return(
        <Select
        value={currencySymbol}
        onChange={(value) => {
          const symbol = value.split('-')[1];
          setCurrencySymbol(symbol);
        }}
        className={`w-[80px]`}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) => {
          return (
            option.value.toLowerCase().includes(input.toLowerCase())
          );
        }}
      >
        {countriesCurreny.map((item) => (
          <Option value={`${item.iso}-${item.symbol}`} key={item.iso}>
            {item.symbol}
          </Option>
        ))}
      </Select>
      )
  }
  const onSearchTerm = async (e) => {
    const { value } = e.target
    let res;

    if (value === '') {
      setSearchMovies([])
      setSearchBooks([])
      return
    } else {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(async () => {
        if (mediaType === "Book") {
          setLoadingBookMovie(true)
          dispatch(getSearchBooks(value)).then(res => {
            if (value !== '') {
              setSearchBooks(res.payload.data)
            }
            setLoadingBookMovie(false)
          })
        }
        else if (mediaType === "Movie") {
            setLoadingBookMovie(true)
          res = await dispatch(getSearchMovies(value))
          setSearchMovies(res.payload.data)
          setLoadingBookMovie(false)
        }
      }, 300);
    }
  }
  const renderBookList = (item) => {
    const bookInfoArr = [];
    if (item?.volumeInfo?.publisher) {
      bookInfoArr.push(item?.volumeInfo?.publisher);
    }

    if (item?.volumeInfo?.publishedDate) {
      const year = item?.volumeInfo?.publishedDate.split('-')[0]
      bookInfoArr.push(year);
    }

    if (item?.volumeInfo?.pageCount && Number(item?.volumeInfo?.pageCount) > 0) {
      let pages = item?.volumeInfo?.pageCount + ' pages'
      bookInfoArr.push(pages);
    }

    let formatedBookInfo = "";
    if (bookInfoArr.length > 0) {
      formatedBookInfo = bookInfoArr.join(' . ');
    }
    return (
      <div className="grid grid-cols-5 p-2 border-b-[1px] gap-1 cursor-pointer hover:bg-gray-100" key={item.id} onClick={(e) => onClickBook(e, item.id)}>
        <div className="p-[5px] flex justify-center items-center">
          {item?.volumeInfo?.imageLinks?.thumbnail &&
            <img className="object-contain" src={item?.volumeInfo?.imageLinks?.thumbnail} alt={item?.volumeInfo?.title || "Book gem"} />
          }
        </div>
        <div className="col-span-4">
          {item.volumeInfo.title && <h5 className="font-semibold">{item.volumeInfo.title.length > 30 ? `${item.volumeInfo.title.substring(0, 30)}...` : item.volumeInfo.title}</h5>}
          {item.volumeInfo.authors && Array.isArray(item.volumeInfo.authors) && item.volumeInfo.authors.length > 0 && (
            <h6 className="text-gray-700 text-xs">{item.volumeInfo.authors.join(', ')}</h6>
          )}
          {formatedBookInfo && <div className="text-gray-700 text-xs">{formatedBookInfo}</div>}
          {item.volumeInfo.industryIdentifiers &&
            Array.isArray(item.volumeInfo.industryIdentifiers) &&
            item.volumeInfo.industryIdentifiers.length > 0 && (
              <h6 className="text-gray-700 text-xs">ISBN: {item?.volumeInfo?.industryIdentifiers[0]?.identifier}</h6>
            )}
        </div>
      </div>
    )
  }

  const onClickBook = async (e, id) => {
    const res = await dispatch(getSelectedBook(id))
    const imageLink = res.payload.data?.volumeInfo?.imageLinks?.smallThumbnail?.replace("http", "https")
    setSearchBooks([])
    // setShowThumbnail(true);
    setAssetUrl(res.payload?.data?.volumeInfo?.previewLink)
    setTitle(res.payload?.data?.volumeInfo?.title)
    setDescription(res.payload?.data?.volumeInfo?.description)
    setImageUrl(imageLink)
    setFallbackURL(imageLink)
    // setObject(res.payload?.data?.volumeInfo)
  }

  const handleSelectChange = (value) => {
    setReadStatus(value)
};

  const onClickMovie = async (e, id) => {
    // setShowThumbnail(true);
    const res = await dispatch(getSelectedMovie(id))
    setSearchMovies([])
    setAssetUrl(res.payload?.data?.data?.url)
    setTitle(res.payload?.data?.data?.title)
    setDescription(res.payload?.data?.data?.description)
    // setObject(res.payload?.data?.data)
    setImageUrl(res.payload?.data?.data?.image)
    setFallbackURL(res.payload?.data?.data?.image)
  }

  const handleSubmitBio = async() => {
    if(mediaType === 'Profile' && singleBookmarkGem?.media?.type === 'contact'){
            if(!title){
                message.error('Title is required')
                return;
            }
            if(!description){
                message.error('Description is required')
                return;
            }
            if(title?.length > 30){
                message.error('Title cannot exceed 30 characters')
                return;
            }
            if(description?.length > 90){
                message.error('Description cannot exceed 30 characters')
                return;
            }
        }

        if((mediaType === 'Ai Prompt' || mediaType === 'Text Expander') && !shortendurl){
            message.error("Please enter short url")
            return
        }
        setButtonLoading(true)
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
            favIconSrc
        }

        const mediaCovers  = singleBookmarkGem?.metaData?.covers ? [ obj.imageUrl, ...singleBookmarkGem?.metaData?.covers ] : obj.covers && obj.covers.length !== 0 ? obj.covers : [obj.imageUrl]
        const finalCovers  = removeDuplicates(mediaCovers)

        const data = customPropertyWithoutAnswer?.map(item => {
        let obj = {...item};

        if(item?.type?.toLowerCase() === 'created by' || item?.type?.toLowerCase() === 'last edited by'){
            obj.answer = singleBookmarkGem?.author?.data?.attributes?.username || ''
        }
        else if(item?.type?.toLowerCase() === 'created time'){
            obj.answer = singleBookmarkGem?.createdAt || ''
        }       
        else if(item?.type?.toLowerCase() === 'last edited time'){
            obj.answer = singleBookmarkGem?.updatedAt || ''
        }

        return obj;
        })

        const customDataAnswered = customPropertyAnswered?.map(item => {
        let obj = {...item};

        if(item?.type?.toLowerCase() === 'created by' || item?.type?.toLowerCase() === 'last edited by'){
            obj.answer = singleBookmarkGem?.author?.data?.attributes?.username || ''
        }
        else if(item?.type?.toLowerCase() === 'created time'){
            obj.answer = singleBookmarkGem?.createdAt || ''
        }       
        else if(item?.type?.toLowerCase() === 'last edited time'){
            obj.answer = singleBookmarkGem?.updatedAt || ''
        }

        return obj;
        })

        const filteredWithAnswer =  data?.filter(item => item?.answer) || []

        let finalObj = {
            title: obj.title,
            description: obj.description,
            media_type: typeof obj.selectedType === "object" ? obj.selectedType?.name : obj.selectedType,
            author: session.userId ? parseInt(session.userId) : null,
            url: obj.assetUrl,
            metaData: {
                ...singleBookmarkGem?.metaData,
                type: typeof obj.selectedType === "object" ? obj.selectedType?.name : obj.selectedType,
                title: obj.heading || obj.title,
                icon: obj?.favIconSrc || "",
                url: obj.assetUrl,
                covers: finalCovers
            },
            collection_gems: obj.selectedCollection.id,
            remarks: obj.remarks,
            tags: obj.selectedTags?.map((t) => { return t.id }),
            is_favourite: obj.favorite,
            custom_fields_obj: [...customDataAnswered,...filteredWithAnswer],
            media: singleBookmarkGem?.media,
        }

        if(mediaType === 'Highlight'){
        const media  = {
            ...singleBookmarkGem.media,
            notes: obj.remarks,
            color: highlightedColor,
            text: highlightedText,
            link:  obj.assetUrl,
            collections: obj.selectedCollection?.id,
            tags: obj.selectedTags?.map((t) => { return t.id }),
            type: typeof obj.selectedType === "object" ? obj.selectedType?.name : obj.selectedType,
            box: highlightBox,
            _id: mediaData?._id || highlightDetails?.id,
            details: highlightDetails,
            styleClassName: highlightClass,
        }
            const shortUrlObj = shortendurl ? [{ type: "link", keyword: shortendurl, url: assetUrl, text: '' }] : []
            const finalData = {...finalObj,media,expander:shortUrlObj}

            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                message.success('Bookmark updated')
                setOpenDrawer(false)
                const data = updateBookmarkState(blocks,[o])
                setBlocks(data)
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;

        }

        if(mediaType === 'Note' || 
        mediaType === 'Quote'){
            const media  = {
                ...singleBookmarkGem.media,
                notes: obj.remarks,
                color: highlightedColor,
                text: highlightedText,
                link:  obj.assetUrl,
                collections: obj.selectedCollection?.id,
                tags: obj.selectedTags?.map((t) => { return t.id }),
                type: typeof obj.selectedType === "object" ? obj.selectedType?.name : obj.selectedType,
                box: highlightBox,
                _id: mediaData?._id || highlightDetails?.id,
                details: highlightDetails,
                styleClassName: highlightClass,
            }

            const finalData = {...finalObj,media,title: media?.text}

            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                message.success('Bookmark updated')
                setOpenDrawer(false)
                const data = updateBookmarkState(blocks,[o])
                setBlocks(data)
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        }

        if (mediaType === 'Ai Prompt' || mediaType === 'Text Expander') {
            if (htmlText === "") {
                message.error(mediaType === 'Ai Prompt' ? "Please enter a text for Ai prompt" :"Please enter a text for text expander")
                return
            }
            const media = {
                ...singleBookmarkGem.media,
                notes: obj.remarks,
                color: highlightedColor,
                text: htmlText,
                link: obj.assetUrl,
                collections: obj.selectedCollection?.id,
                tags: obj.selectedTags?.map((t) => { return t.id }),
                type: typeof obj.selectedType === "object" ? obj.selectedType?.name : obj.selectedType,
                box: highlightBox,
                _id: mediaData?._id || highlightDetails?.id,
                details: highlightDetails,
                styleClassName: highlightClass,
            }

            const newExpander = singleBookmarkGem?.expander && singleBookmarkGem.expander.length > 0 && singleBookmarkGem.expander.map(exp => {
                if(exp.type === "link"){
                    return { ...exp, keyword: shortendurl }
                }else{
                    return { ...exp, keyword: shortendurl, plainText, text: htmlText }
                }
            })

            const expanderObj = {
                text: htmlText,
                expander: newExpander
            }

            const finalData = { ...finalObj, ...expanderObj, media,isPublicPrompt: promptType === "public" ? true : false }

            const res = await dispatch(updateGem(gemSingleId, { data: finalData }))

            if (res.error === undefined) {
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                message.success('Bookmark updated')
                setOpenDrawer(false)
                const data = updateBookmarkState(blocks,[o])
                setBlocks(data)
            } else {
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        }

        if(mediaType === 'Link' || mediaType === 'Article' || mediaType === 'App' || mediaType === 'Book' || mediaType === 'Movie') {
            let media= {
                ...singleBookmarkGem.media,
                covers: finalCovers,
                ribbon: {
                text: ribbon?.text || '',
                color: ribbon?.color || '#0693e3'
              }
            }
            if(mediaType === 'Book'){
                media = {
                    ...singleBookmarkGem.media,
                    myRating: rate,
                    status: readStatus,
                    readStart: dateRead,
                    dateRead: dateRead
                }
            }
            if(mediaType === 'Movie'){
                media = {
                    ...singleBookmarkGem.media,
                    myRating: rate,
                    status: watchStatus,
                    readStart: dateRead,
                    dateRead: dateRead,
                    myStatus: watchStatus
                }
            }
            
            const shortUrlObj = shortendurl ? [{ type: "link", keyword: shortendurl, url: assetUrl, text: '' }] : []

            const finalData = {...finalObj,media,expander:shortUrlObj,isRead: isReaded === 'read' ? true : false, isPublicPrompt: isPublicPrompt === 'public' ? true : false}
            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                message.success('Bookmark updated')
                setOpenDrawer(false)
                const data = updateBookmarkState(blocks,[o])
                setBlocks(data)
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        }

        if(mediaType === 'PDF' || mediaType === 'Audio' || mediaType === 'Video'){
            let media = {}
            if(mediaType === 'PDF'){
                media= {
                    ...singleBookmarkGem.media,
                    pdfLink: pdfSrc
                }
            }

            if(mediaType === 'Audio'){
                media= {
                    ...singleBookmarkGem.media,
                    audioLink: audioSrc
                }
            }

            if(mediaType === 'Video'){
                media= {
                    ...singleBookmarkGem.media,
                    videoLink: videoSrc
                }
            }
            

            const finalData = {...finalObj,media}
            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                message.success('Bookmark updated')
                setOpenDrawer(false)
                const data = updateBookmarkState(blocks,[o])
                setBlocks(data)
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        }

        if(mediaType === 'Image'){
            const media = {
                ...singleBookmarkGem.media,
                covers: finalCovers,
            }
            const finalData = {...finalObj,media}
            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                message.success('Bookmark updated')
                setOpenDrawer(false)
                const data = updateBookmarkState(blocks,[o])
                setBlocks(data)
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        }

        if(mediaType === 'Screenshot'){
            const media = {
                ...singleBookmarkGem.media,
                covers: finalCovers,
            }
            const shortUrlObj = shortendurl ? [{ type: "link", keyword: shortendurl, url: assetUrl, text: '' }] : []
            const finalData = {...finalObj,media,expander:shortUrlObj}
            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                message.success('Bookmark updated')
                setOpenDrawer(false)
                const data = updateBookmarkState(blocks,[o])
                setBlocks(data)
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        }

        if(mediaType === 'Code'){
            const media = {
                ...singleBookmarkGem.media,
                code: code,
                language: codeLanguage,
            }
            const shortUrlObj = shortendurl ? [{ type: "link", keyword: shortendurl, url: assetUrl, text: '' }] : []

            const finalData = {...finalObj,media,expander:shortUrlObj}
            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                message.success('Bookmark updated')
                setOpenDrawer(false)
                const data = updateBookmarkState(blocks,[o])
                setBlocks(data)
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        } 

        if(mediaType === 'SocialFeed'){
            const post_type = tweetType
            const platform = platformType
            const shortUrlObj = shortendurl ? [{ type: "link", keyword: shortendurl, url: assetUrl, text: '' }] : []
            const finalData = {...finalObj,post_type,platform,expander:shortUrlObj}

            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                message.success('Bookmark updated')
                setOpenDrawer(false)
                const data = updateBookmarkState(blocks,[o])
                setBlocks(data)
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        } 

        if(mediaType === 'Profile' && singleBookmarkGem?.media?.type === 'contact'){
            const media = {
                ...singleBookmarkGem.media,
                bioContactFields: bioContactFields
            }
            const finalData = {...finalObj,media}

            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const o = {
                    ...finalData,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                message.success('Bookmark updated')
                setOpenDrawer(false)
                const data = updateBookmarkState(blocks,[o])
                setBlocks(data)
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        }

        if(mediaType === 'Profile'){
            const platform = platformType
            const shortUrlObj = shortendurl ? [{ type: "link", keyword: shortendurl, url: assetUrl, text: '' }] : []
            const finalData = {...finalObj,platform,expander:shortUrlObj}

            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                message.success('Bookmark updated')
                setOpenDrawer(false)
                const data = updateBookmarkState(blocks,[o])
                setBlocks(data)
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        } 

        if(mediaType === 'Citation'){
            const media= {
                ...singleBookmarkGem.media,
                covers: finalCovers,
                citation: citationText,
                credibility: credibility,
                citation_format: citation,
                citationAuthor: citationAuthor,
                citationDate: citationDate
            }

            const finalData = {...finalObj,media}
            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                message.success('Bookmark updated')
                setOpenDrawer(false)
                const data = updateBookmarkState(blocks,[o])
                setBlocks(data)
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        }

        if(mediaType === 'Product') {
            const media= {
                ...singleBookmarkGem.media,
                covers: finalCovers,
                price: `${currencySymbol}${productPrice}`,
                ribbon: {
                text: ribbon?.text || '',
                color: ribbon?.color || '#0693e3'
              }
            }
            const shortUrlObj = shortendurl ? [{ type: "link", keyword: shortendurl, url: assetUrl, text: '' }] : []
            const finalData = {...finalObj,media,expander:shortUrlObj}
            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                message.success('Bookmark updated')
                setOpenDrawer(false)
                const data = updateBookmarkState(blocks,[o])
                setBlocks(data)
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;
        }

        if(mediaType === 'Testimonial'){
        let finalSrcAvatar;
        if(testimonialAvatarImage){
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
        const media  = {
            ...singleBookmarkGem?.media,
            // testimonial: testimonial,
            // attachImage: testimonialAttachImage,
            // author: testimonialAuthor,
            // date: testimonialDate,
            // platform: testimonialPlatform,
            // product: testimonialProduct,
            // rating: testimonialRating,
            // tagLine: testimonialTagLine,
            // url: testimonialUrl,
            covers: finalCovers,
            testimonial: testimonial,
            attachImage: testimonialAttachImage || '',
            author: testimonialAuthor,
            date: testimonialDate,
            platform: testimonialPlatform,
            product: testimonialProduct,
            rating: testimonialRating,
            tagLine: testimonialTagLine,
            url: testimonialUrl,
            testimonialType: testimonialType,
            attachAudio: testimonialAttachAudio || '',
            fileType: fileType,
            attachVideo: testimonialAttachVideo || '',
            avatar: finalSrcAvatar || testimonialAvatar || ''
        }
            const finalData = {...finalObj,media,}

            const res= await dispatch(updateGem(gemSingleId, { data: finalData }))
        
            if(res.error === undefined){
                const o = {
                    ...finalData,
                    tags: obj.selectedTags,
                    id:gemSingleId,
                    author: {
                        id: finalData?.author
                    }
                }
                message.success('Bookmark updated')
                setOpenDrawer(false)
                const data = updateBookmarkState(blocks,[o])
                setBlocks(data)
            }else{
                message.error('Error Occured')
                setButtonLoading(false)
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }
            return;

        }
       
    }

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
    //             setOpenIconModal(false)
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

    const handleAddField = (fieldKey) => {
    const fieldToAdd = availableFields.find(field => field.key === fieldKey);
    setBioContactFields([...bioContactFields, fieldToAdd]);
    setAvailableFields(availableFields.filter(field => field.key !== fieldKey));
  };

  const handleRemoveField = (fieldKey) => {
    const fieldToRemove = bioContactFields.find(field => field.key === fieldKey);
    setAvailableFields([...availableFields, fieldToRemove]);
    setBioContactFields(bioContactFields.filter(field => field.key !== fieldKey));
  };

  const handleOpenDropdown = (flag) => {
        setOpenDropdown(flag);
    };

    const handleRibbonText = (e) => {
    const { value } = e.target;

    if(value.length > 15) {
      message.error('Text cant exceed more than 15 characters')
      return;
    }
    setRibbon({...ribbon, text: value})
  }

  const onResetIcon = async (mode) => {
      if (mode === "icons") {
        setFavIconSrc({
        type:'image',
        icon: defaultFavIconSrc
        })
        setDefaultFavIconSrc(defaultFavIconSrc)
        setIsOpenImageDialog(false)
      }
    }

    const handleChangeCollapse = (key) => {
    setCollapseKeys(key)
  }

  //new functions
  const onKeyDownShortUrl = async(event) => {
    if (event.key === "Enter") {
      setShowShortEndInput(false)
    }
  };

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

  const onCopyCode = () => {
    if (selectedType?.name === 'Code' && code) {
      try {
        copyText(code, "Code copied to clipboard");
      } catch (err) {
        message.error("An error occured while copying this code", "error");
      }
    }

    if (selectedType?.name === 'Quote' && highlightedText) {
      try {
        copyText(highlightedText, "Quote copied to clipboard");
      } catch (err) {
        message.error("An error occured while copying this quote", "error");
      }
    }

    if (selectedType?.name === 'Citation' && citationText) {
      try {
        copyText(citationText, "Citation copied to clipboard");
      } catch (err) {
        message.error("An error occured while copying this quote", "error");
      }
    }
  };

  const onFileTestimonialAvatarChange = async (e) => {
        const { files } = e.target
        const file = files[0]
        const fileSize = file.size / 1024 / 1024; // Convert to MB
        const planFileSize = await dispatch(getPlanService(session.userId))
        const planFileSizeMB = parseInt(planFileSize?.payload?.data?.data?.file_upload_size_limit) / 1024 / 1024; 
        if (fileSize > planFileSizeMB) {
            message.error('File size must be less than 25MB');
            setTestimonialAvatarImage(null)
            return
        }
        // if (fileSize > 25) {
        //     message.error('File size must be less than 25MB');
        //     setTestimonialAvatarImage(null)
        //     return
        // }
        
        const url = URL.createObjectURL(file)
        setTestimonialAvatarImage(file)
        setTestimonialAvatarImageSrc(url)
        URL.revokeObjectURL(file)
        return;
  }

  const handlefileTypeChange = (type) => {
    setFileType(type)
  };

  const handlePromptType = (e) => {
    setPromptType(e.target.value)
  }

  const onAuthorDisplayChanged = (checked) => {
    setShowBlogAuthor(checked)
    if (!checked) {
        setBlogAuthor(singleBookmarkGem?.media?.authorId || session.username)
    }
  }

  const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env

    return(
        <>
        {
        editPagesIn === 'side peek' &&
        <Drawer 
            placement={isMobileView  ? 'bottom' : 'right'}
            height={isMobileView ? '90%' : 'inherit'}
            width={isMobileView ? '90%' : '460px'}
            // headerStyle={{paddingLeft:50}}
            // bodyStyle={{paddingLeft:50}}
            title={page === 'bio' ? 'Edit Bio'  :"Edit Gem"} 
            onClose={() => {
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
                onClose && onClose()
            }} 
            open={openDrawer}
            maskClosable={isMobileView ? true :false}

            footer={
          <Space className="flex items-center justify-end">
              <Button onClick={() => {
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
                onClose && onClose()
            }}
            disabled={buttonLoading || loadingDelete}
            >
                Cancel
              </Button>

            <Button
              type="primary"
              className="bg-[#40a9ff] border-[#40a9ff]"
              onClick={page === 'bio' ? handleSubmitBio : handleSubmit}
              disabled={buttonLoading || loadingDelete}
            >
            {buttonLoading ? 'Loading' : 'Save'}
            </Button>
          </Space>
        }
            >
            {
            loadingState ? 
            <div className="spinDiv">
                <Spin size='middle' tip='Loading...'/>
            </div>
            :         
            <>
            {(mediaType !== 'Profile' || (mediaType === 'Profile' && !singleBookmarkGem?.media?.type))&&  
            <>

            {fetching &&<div className="custom-spin-overlay">
                  <Spin tip={'Fetching data...'} />
              </div>}
            <div onClick={onLayoutClick}>

                <div className='mb-2 flex justify-between space-x-2'>
                                <div className={classNames("flex-1", showTypeInput && "hidden")}>
                                    <h6 className="block text-xs font-medium text-gray-500 mb-1">Collections</h6>
                                    <div className='relative' onClick={e => e.stopPropagation()}>
                                        <div 
                                        onClick={() => setShowCollectionInput(true)} 
                                        className="w-full">
                                            <ComboBox 
                                            inputShown={showCollectionInput} 
                                            setShowCollectionInput={setShowCollectionInput} 
                                            collectionData={allCollections || []} 
                                            userId={session.userId} 
                                            setSelectedCollection={setSelectedCollection} 
                                            selectedCollection={selectedCollection} 
                                            error={error} 
                                            disabled={isCurrentCollectionShared || isCurrentTagShared || page === 'bio' || selectedCollection?.name?.toLowerCase() === 'bio'}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={classNames("flex-1", showCollectionInput && 'hidden')}>
                                    <h6 className="block text-xs font-medium text-gray-500 mb-1">Type</h6>
                                    <div className='relative' onClick={e => e.stopPropagation()}>
                                        <div 
                                        onClick={() => {
                                            if(mediaType) {
                                                setShowTypeInput(false)
                                            }else{
                                                setShowTypeInput(true)
                                            }
                                        }} 
                                        className="w-full">
                                            <TypeComboBox 
                                            inputShown={showTypeInput} setShowTypeInput={setShowTypeInput} updateInputShow={setShowTypeInput} setSelectedType = {setSelectedType} type={selectedType} disabled={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                </div>

                {/* new changes */}
                <div className="mt-6 max-md:max-w-full flex items-center justify-between">
                    <div className="text-md text-zinc-600">
                        Editable Preview
                    </div>
                    
                    <div className="flex items-center">
                        <InformationCircleIcon className="text-[#347AE2] h-5 w-5 cursor-pointer" title="Tutorial video" onClick={() => setOpenTutorialVideoModal(true)}/>

                        <div className="cursor-pointer ml-2" 
                            onClick={() => setShowModal(true)}
                            disabled={loadingDelete}
                        >
                            <TrashIcon className="text-red-400 h-4 w-4 mr-1"/>
                        </div>
                    </div>

                </div>

            {
                (selectedType?.name === 'Ai Prompt' || selectedType?.name === 'Text Expander') &&
                <div className="mt-1">
                    <div className="mb-2 aiInput">
                <AntInput
                type="text"
                name="shortendurl"
                addonBefore={"c:"}
                placeholder={selectedType?.name === "Text Expander" ? "Enter expander name" : selectedType?.name === "Ai Prompt" ? "Enter prompt name" : "Enter Shortend URL"}
                value={shortendurl}
                error
                onChange={(e) => setShortendurl(e.target.value)}
                className="rounded-md"
                />
                </div>
                {selectedType?.name === 'Ai Prompt' && 
                <div className="w-full flex items-center justify-end">
                <Radio.Group 
                value={promptType} 
                onChange={handlePromptType}
                buttonStyle="solid"
                className="rounded-md"
                // disabled={parseInt(collectionId) === parseInt(process.env.NEXT_PUBLIC_AI_PROMPT_COLLECTION_ID)}
                disabled={parseInt(collectionId) === parseInt(session?.aiPromptLibraryId)}
                >
                  <Radio.Button value={`public`}><div className="flex items-center"><GlobeAltIcon className="h-4 w-4 mr-1"/> <div>Public</div></div></Radio.Button>
                  <Radio.Button value={`private`}><div className="flex items-center"><LockClosedIcon className="h-4 w-4 mr-1"/> <div>Private</div></div></Radio.Button>
                </Radio.Group>
                </div>
                }
                </div>
            }

                <div className={`flex flex-col mt-2 bg-white rounded-lg max-md:max-w-full ${selectedType?.name !== "Note" ? 'border border-solid border-[color:var(--greyscale-200,#ABB7C9)] p-3' : ''}`}>
              <MediaTypeUIEdit
              fallbackURL={fallbackURL} setFallbackURL={setFallbackURL}
              imageUrl={imageUrl} title={title} description={description} assetUrl={assetUrl} selectedType={selectedType} shortendurl={shortendurl} setShortendurl={setShortendurl} setFavorite={setFavorite} 
              favorite={favorite} showShortEndInput={showShortEndInput} setShowShortEndInput={setShowShortEndInput}
              handlefileTypeChange={handlefileTypeChange} fileType={fileType} audioSrc={audioSrc} 
              videoSrc={videoSrc} imageSrc={imageSrc}pdfSrc={pdfSrc} 
              onOpenImageDialog={onOpenImageDialog} highlightedText={highlightedText} 
              highlightedColor={highlightedColor} setHighlightedColor={setHighlightedColor} setHighlightClass={setHighlightClass} setHighlightedText={setHighlightedText} onSearchTerm={onSearchTerm} 
              searchBooks={searchBooks} onClickBook={onClickBook} setSearchBooks={setSearchBooks} loadingBookMovie={loadingBookMovie} readStatus={readStatus} setReadStatus={setReadStatus} 
              searchMovies={searchMovies} onClickMovie={onClickMovie} watchStatus={watchStatus} setWatchStatus={setWatchStatus} setIsReaded={setIsReaded} isReaded={isReaded}
              setHtmlText={setHtmlText} htmlText={htmlText} setPlainText={setPlainText}
              code={code} setCode={setCode}
              citation={citation} handleCitationChange={handleCitationChange} citationText={citationText} setCitationText={setCitationText} testimonial={testimonial} testimonialAttachImage={testimonialAttachImage} testimonialAuthor={testimonialAuthor} testimonialDate={testimonialDate}testimonialProduct={testimonialProduct} testimonialRating={testimonialRating} testimonialTagLine={testimonialTagLine} testimonialUrl={testimonialUrl} testimonialPlatform={testimonialPlatform}
              setTestimonial={setTestimonial} setTestimonialAttachImage={setTestimonialAttachImage} setTestimonialAuthor={setTestimonialAuthor} setTestimonialDate={setTestimonialDate} setTestimonialProduct={setTestimonialProduct} setTestimonialRating={setTestimonialRating}
              setTestimonialTagLine={setTestimonialTagLine} setTestimonialUrl={setTestimonialUrl} setTestimonialPlatform={setTestimonialPlatform}  codeLanguage={codeLanguage} credibility={credibility}
              setCredibility={setCredibility}
              blogPublishedDate={blogPublishedDate} setBlogPublishedDate={setBlogPublishedDate}
              blogStatus={blogStatus} setBlogStatus={setBlogStatus}
              blogAuthor={blogAuthor} setBlogAuthor={setBlogAuthor}
              testimonialType={testimonialType} setTestimonialType={setTestimonialType} 
              onFileTestimonialAvatarChange={onFileTestimonialAvatarChange}
              testimonialAvatarImageSrc={testimonialAvatarImageSrc} setTestimonialAvatarImageSrc={setTestimonialAvatarImageSrc} testimonialAvatar={testimonialAvatar} onKeyDownShortUrl={onKeyDownShortUrl} testimonialAttachAudio={testimonialAttachAudio} testimonialAttachVideo={testimonialAttachVideo} promptType={promptType} html={html} setHtml={setHtml} setTestimonialAttachAudio={setTestimonialAttachAudio} setTestimonialAttachVideo={setTestimonialAttachVideo}
              />


              {selectedType?.name !== 'Note' &&  selectedType?.name !== 'Testimonial' && selectedType?.name !== 'Ai Prompt' && selectedType?.name !== 'Text Expander' && <div className="flex items-center justify-between">
                <div onClick={() => onOpenImageDialog("favicon")} className="w-fit">
                  <FavIcon data={favIconSrc || null}/>
                </div>

                <div>
                  <BookmarkOptionComponent selectedType={selectedType}
                  currencySymbol={currencySymbol} setCurrencySymbol={setCurrencySymbol} setProductPrice={setProductPrice} productPrice={productPrice} fileType={fileType}
                  setFavorite={setFavorite} favorite={favorite} rate={rate} setRate={setRate} setPlatformType={setPlatformType} platformType={platformType} onCopyCode={onCopyCode} assetUrl={assetUrl}
                  page={page} tweetType={tweetType} setTweetType={setTweetType} 
                  imageSrc={imageSrc}
                  action="edit" id={gemSingleId} textExtract={textExtract} setTextExtract={setTextExtract} html={html}
                  />
                </div>
              </div>}
              
              {
              (selectedType?.name === 'Note' || selectedType?.name === 'Testimonial' || selectedType?.name === 'Ai Prompt' || selectedType?.name === 'Text Expander') ? <></> :
              <>
              {selectedType?.name === "Blog" &&
                <div className="flex items-center justify-between bookStatus mt-2">
                    <label className="text-md text-zinc-600">Published At:</label>
                    <DatePicker
                        value={
                            !blogPublishedDate ? blogPublishedDate : moment(blogPublishedDate)
                        }
                        onChange={(date, dateStirng) => setBlogPublishedDate(dateStirng)}
                        format={"YYYY-MM-DD"}
                        className="rounded-full border border-solid border-[#97A0B5] w-fit "
                    />
                </div>
              }
              {
              isTitleEditing ? 
              <TextareaAutosize
                  onBlur={disableTitleInput}
                  onKeyDown={onKeyDownTitle}
                  value={title || ''}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-xl font-medium text-gray-500 resize-none mt-2 !outline-none !focus:outline-none textarea-border"
                  autoFocus={true}
                />
                :
              <div className="mt-2 text-xl font-medium text-gray-500 break-words" onClick={enableTitleInput}>
                {title?.length > 50
                  ? title?.slice(0, 50)?.concat("...")
                  : (title || 'Enter a title')}
              </div>
              }

              {
              isDescriptionEditing ? 
              <TextareaAutosize
                  onBlur={disableDescriptionInput}
                  onKeyDown={onKeyDownDescription}
                  value={description || ''}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 text-base text-gray-500 resize-none !outline-none !focus:outline-none textarea-border"
                  autoFocus={true}
                />
                :
              <div className="mt-2 text-base text-gray-500 break-words" onClick={enableDescriptionInput}>
                {description?.length > 150
                  ? description?.slice(0, 150)?.concat("...")
                  : (description || 'Enter description')}
              </div>
              }
              </>
              }

             

              {
              selectedType?.name === 'Testimonial' && 
              <>
              <Input
                size="medium w-full"
                type="text"
                name="tagLine"
                placeholder="Enter tag line"
                value={testimonialTagLine}
                onChange={(e) => setTestimonialTagLine(e.target.value)}
                className='!border-[#97A0B5] w-full rounded-md mt-4'
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
                className='!border-[#97A0B5] w-full rounded-md'
              />

              <div className="flex items-center justify-between mt-4 w-full">
                <Rate value={testimonialRating} onChange={(value) => setTestimonialRating(value)} allowHalf />
                <div className="bookStatus">
                    <DatePicker
                      value={
                        !testimonialDate ? testimonialDate : moment(testimonialDate)
                      }
                      onChange={(date, dateStirng) => setTestimonialDate(dateStirng)}
                      format={"YYYY-MM-DD"}
                    //   allowClear={false}
                      showToday={false}
                      className="rounded-full border border-solid border-[#97A0B5] w-fit "
                    />
                </div>
              </div>
              </>
              }

              {
              selectedType?.name === 'Citation' &&
              <>

              <div className="my-2">
                <Input
                value={citationAuthor}
                onChange={(e) => setCitationAuthor(e.target.value)}
                placeholder="Enter citation author"
                className="rounded-md"
                size="medium"
                prefix={<AiOutlineUser className="h-5 w-5 text-[#4B4F5D]"/>}
              />
              </div>

              <div className="w-full flex items-center justify-between">
                  <div className="w-full flex items-center justify-between mt-2 bookStatus">
                    <DatePicker
                      value={
                        !citationDate ? citationDate : moment(citationDate)
                      }
                      onChange={(date, dateStirng) => setCitationDate(dateStirng)}
                      format={"YYYY-MM-DD"}
                    //   allowClear={false}
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
              }

              {
              selectedType?.name === 'Code' &&
              <div className="mt-4">
                <AntInput
                size="medium w-full mb-2"
                value={codeLanguage}
                onChange={(e) => setCodeLanguage(e.target.value)}
                placeholder="Enter Language"
                />
              </div>
              }

              {
              (selectedType?.name === 'Book' || selectedType?.name === 'Movie') &&
              <div className="w-full flex mt-2 bookStatus flex-col">
                <h6 className="block text-xs font-medium text-gray-500 mb-1">{selectedType?.name === 'Book' ? 'Read date' : 'Watch date'}</h6>
                <DatePicker
                  value={
                    !dateRead ? dateRead : moment(dateRead)
                  }
                  onChange={(date, dateStirng) => setDateRead(dateStirng)}
                  format={"YYYY-MM-DD"}
                //   allowClear={false}
                  showToday={false}
                  className="rounded-full border border-solid border-[#97A0B5] w-fit"
                  placeholder={selectedType?.name === 'Book' ? 'Read date' : 'Watch date'}
                />
            
              </div>
              }

              {selectedType?.name !== 'Note' && selectedType?.name !== 'Ai Prompt' && selectedType?.name !== 'Text Expander' && <div className='my-2 addBk-tag-wrapper bg-white p-2'>
                <ReactTags 
                  tags={selectedTags?.map((t) => { return { id: t?.attributes?.tag || t?.tag, text: t?.attributes?.tag || t?.tag}  })}
                suggestions={prepareTags()}
                delimiters={[KEY_CODES.enter, KEY_CODES.comma]}
                handleDelete={onTagDelete}
                handleAddition={onTagAdd}
                inputFieldPosition="bottom"
                placeholder="Enter Tag"
                onClearAll={() => setSelectedTags([])}
                clearAll
                autocomplete
                readOnly={isCurrentTagShared}
                />
              </div>}
            </div>
            {selectedType?.name === "Blog" &&
                <div className="w-full justify-between mt-3">
                    <Switch style={{ background: showBlogAuthor ? "#1890ff" : "#00000040" }} checked={showBlogAuthor} onChange={onAuthorDisplayChanged} className="mr-2" checkedChildren="Hide Author" unCheckedChildren={"Show Author"} />
                    {showBlogAuthor && <div className="w-full flex-col flex justify-between mt-3">
                        <label className="text-md text-zinc-600 mb-1">Author:</label>
                        <Select value={blogAuthor} 
                                onChange={(value) => {
                                    setBlogAuthor(value)
                                }}
                                className="w-full"
                                placeholder="Select author"
                                filterOption={(input, option) => {
                                    return option.title.toLowerCase().includes(input.toLowerCase()); 
                                }}
                                showSearch
                        >
                            {allPublicUsers?.map((user) => {
                                return <Option key={user.username} value={user.username} title={`${user.name} - ${user.email} - ${user.username}`}>{user.name}</Option>
                            })}
                        </Select> 
                    </div>}
                </div>
              }
                <div className="addbk-collapse mt-4">
                    <Collapse ghost 
                    expandIcon={(status) => {
                        return (
                            <div>
                                {status.isActive ? (
                                    <MdOutlineArrowDropDown  className="h-6 w-6 text-[#141B34]" />
                                ) : (
                                    <MdOutlineArrowRight className="h-6 w-6 text-[#141B34]" />
                                )}
                            </div>
                        )
                    }}
                    activeKey={collapseKeys} onChange={handleChangeCollapse}
                    >
                    <Panel header={
                        <div className="text-[#4B4F5D] text-base">
                        Advanced Options
                        </div>
                    } key="1">

                        {
                        (selectedType?.name === 'Ai Prompt' || selectedType?.name === 'Text Expander') &&
                        <>

                        {imageUrl && <div className="relative mb-1">
                            <div className="">
                            <img src={imageUrl?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`)}
                                alt={title || description || "Text manipulation gem"} 
                                className='w-full object-cover block h-[200px] rounded-lg'
                                onError={(e) => {
                                    e.target.onerror = null; 
                                    e.target.src=singleBookmarkGem?.metaData?.fallbackURL ? singleBookmarkGem?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                                }}
                            />
                            </div>
                            
                            <div className="px-1 absolute bottom-[10px] flex items-center justify-between w-full md:px-2">
                                <div></div>
                                <div className="border border-solid border-[#97A0B5] rounded-full w-fit p-1 bg-white cursor-pointer" onClick={() => onOpenImageDialog("thumbnail")}>
                                <PiUploadSimpleLight className="text-[#74778B] h-4 w-4 aspect-square"/>
                                </div>
                            </div>
                        </div>}

                        <div className="flex items-center justify-between">
                            <div onClick={() => onOpenImageDialog("favicon")} className="w-fit">
                            <FavIcon data={favIconSrc || null}/>
                            </div>

                            <div>
                            <BookmarkOptionComponent selectedType={selectedType}
                            currencySymbol={currencySymbol} setCurrencySymbol={setCurrencySymbol} setProductPrice={setProductPrice} productPrice={productPrice} fileType={fileType}
                            setFavorite={setFavorite} favorite={favorite} rate={rate} setRate={setRate} setPlatformType={setPlatformType} platformType={platformType} onCopyCode={onCopyCode} assetUrl={assetUrl}
                            page={page} tweetType={tweetType} setTweetType={setTweetType} imageSrc={fileType === 'url' ? assetUrl : imageSrc}
                            action="edit"
                            />
                            </div>
                        </div>

                        <>
              {
              isTitleEditing ? 
              <TextareaAutosize
                  onBlur={disableTitleInput}
                  onKeyDown={onKeyDownTitle}
                  value={title || ''}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-xl font-medium text-gray-500 resize-none mt-2 !outline-none !focus:outline-none textarea-border w-full"
                  autoFocus={true}
                />
                :
              <div className="mt-2 text-xl font-medium text-gray-500 break-words" onClick={enableTitleInput}>
                {title?.length > 50
                  ? title?.slice(0, 50)?.concat("...")
                  : (title || 'Enter a title')}
              </div>
              }

              {
              isDescriptionEditing ? 
              <TextareaAutosize
                  onBlur={disableDescriptionInput}
                  onKeyDown={onKeyDownDescription}
                  value={description || ''}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 text-base text-gray-500 resize-none !outline-none !focus:outline-none textarea-border w-full"
                  autoFocus={true}
                />
                :
              <div className="mt-2 text-base text-gray-500 break-words" onClick={enableDescriptionInput}>
                {description?.length > 150
                  ? description?.slice(0, 150)?.concat("...")
                  : (description || 'Enter description')}
              </div>
              }
              </>
                        
                        </>
                        }

                        {(selectedType?.name === 'Note' || selectedType?.name === 'Ai Prompt' || selectedType?.name === 'Text Expander') && <div className='my-2 addBk-tag-wrapper bg-white p-2'>
                        <ReactTags 
                            tags={selectedTags?.map((t) => { return { id: t?.attributes?.tag || t?.tag, text: t?.attributes?.tag || t?.tag}  })}
                            suggestions={prepareTags()}
                            delimiters={[KEY_CODES.enter, KEY_CODES.comma]}
                            handleDelete={onTagDelete}
                            handleAddition={onTagAdd}
                            inputFieldPosition="bottom"
                            placeholder="Enter Tag"
                            onClearAll={() => setSelectedTags([])}
                            clearAll
                            autocomplete
                            readOnly={isCurrentTagShared}
                        />
                        </div>}

                        <div className='pt-4'>
                                    <h6 className="block text-xs font-medium text-gray-500 mb-1">Remarks</h6>
                                    <TextareaAutosize
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        placeholder="Add your remarks"
                                        minRows={4}
                                        className="w-full rounded-md resize-none !outline-none !focus:outline-none textarea-border"
                                    />
                                </div>
                    
                    {
                    page !== 'broken-duplicate' && page !== 'bio' &&
                    <div className="pt-4">
                    {
                        customPropertyAnswered && customPropertyAnswered.length>0 && customPropertyAnswered?.map((item,i) => (
                            <>
                            {renderCustomFieldPropertyAnswered(item,i)}
                            </>
                        ))
                    }
                    </div>
                    }     

                    
                    {
                    page !== 'broken-duplicate' && page !== 'bio' &&
                    <div className="pt-4">
                    {
                        customPropertyWithoutAnswer && customPropertyWithoutAnswer.length>0 && customPropertyWithoutAnswer?.map((item,i) => (
                            <>
                            {renderCustomFieldProperty(item,i)}
                            </>
                        ))
                    }
                    </div>
                    }
                    
                    {
                    page === 'bio' && (selectedType?.name === 'Link' || selectedType?.name === 'App' || selectedType?.name === 'Product') &&
                        singleBookmarkGem && singleBookmarkGem?.media && singleBookmarkGem?.media?.ribbon && 
                        <div className='my-2 flex justify-between space-x-2'>
                        <div className={`${showRibbonPicker ? 'flex-[0.5]' : 'flex-1'}`}>
                        <h6 className="block text-xs font-medium text-gray-500 mb-1">Label</h6>
                        <AntInput placeholder="Enter Label"
                            value={ribbon?.text || ''}
                            onChange={(e) => handleRibbonText(e)}
                            suffix={<>
                                <div className="flex items-center"> 
                                    {
                                    ribbon?.color ? <div className={`h-4 w-4 mx-2 cursor-pointer`} style={{background: ribbon?.color}} 
                                    onClick={(e) => {
                                    e.stopPropagation()
                                    setShowRibbonPicker(!showRibbonPicker)
                                    }}>
                                    </div> : <IoColorPaletteOutline className="h-4 w-4 cursor-pointer mx-2" onClick={(e) => {
                                    e.stopPropagation()
                                    setShowRibbonPicker(!showRibbonPicker)
                                    }}/>
                                    }
                                    <TrashIcon className="h-4 w-4 cursor-pointer text-[#EB5757]" onClick={() => setRibbon({...ribbon, text: '',color:''})}/>
                                </div>
                            </>}
                        />
                        </div>

                    {showRibbonPicker &&  <div className={`${showRibbonPicker ? 'flex-[0.5] block' : 'hidden'}`}>
                        <BlockPicker
                        color={ribbon?.color || ''}
                        onChangeComplete={(color) => setRibbon({...ribbon, color: color.hex})}
                        triangle="hide"
                        colors={['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#EB144C', '#F78DA7', '#9900EF','#000000']}
                        />
                    </div>}
                    </div>
                    }
                    </Panel>
                    </Collapse>
                </div>
            </div>

            {(selectedType?.name === "Ai Prompt" ||
               selectedType?.name === "Text Expander") && 
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
                    <Switch checked={enableSites} 
                            onChange={(checked) => setEnableSites(checked)}
                            style={{ background: enableSites ? "#1890ff" : "#00000040" }} />
                  </div>
                  <div className="flex justify-between flex-col w-full mt-4">
                    <label className="text-xs font-medium text-gray-500 mb-2">Priority Sites</label>
                    <div className="w-full">
                      <Select value={prioritySites}
                              onChange={(items) => {
                                setPrioritySites(items);
                              }}
                              mode="tags"
                              placeholder="Select sites"
                              className="w-full"
                              maxTagCount={3}
                              options={AI_SITES.map((site) => {
                                return {
                                  label: <div className="flex items-center">
                                            {site.icon && <img src={site.icon} alt={site.site} className="h-5 w-5 mr-2" />}
                                            <div>{site.label}</div>
                                          </div>,
                                  value: site.site
                                }
                              })} />
                    </div>
                  </div>
                  {selectedType?.name === "Ai Prompt" && 
                    <div className="flex justify-between flex-col w-full mt-4">
                        <label className="text-xs font-medium text-gray-500 mb-2">Prompt Category</label>
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
            }

            <div
                className={showModal ? "pop-box2" : ""}
                style={{ marginLeft: 0 }}
                >
                <div className={showModal === true ? "popup-delete-model" : ""}>
                    {showModal && (
                    <div className="border-t-[1px]">
                        <div className="popup-delete bg-white">
                        <span className="content-h">
                            Confirm delete{" "}
                            {singleBookmarkGem.title && singleBookmarkGem.title.length > 35
                            ? singleBookmarkGem.title.slice(0, 35).concat("...")
                            : singleBookmarkGem.title}
                            ?
                        </span>
                        <div className="btn-pop">
                            <button
                            className="yes-btn"
                            onClick={() => handleDelete()}
                            disabled={loadingDelete}
                            >
                            {loadingDelete ? "Loading" : `Yes`}
                            </button>
                            <button
                            className="no-btn"
                            onClick={() => setShowModal(false)}
                            disabled={loadingDelete}
                            >
                            No
                            </button>
                        </div>
                        </div>
                    
                    </div>
                    )}
                </div>
            </div>
            </>
            }

            {
            mediaType === 'Profile' && singleBookmarkGem?.media?.type === 'contact' &&
            <div className={"grid grid-cols-6 gap-2"} onClick={onLayoutClick}>
                <div className='col-span-7'>
                    <div className='mb-2 flex justify-between space-x-2'>
                                <div className={classNames("flex-1", showTypeInput && "hidden")}>
                                    <h6 className="block text-xs font-medium text-gray-500 mb-1">Collections</h6>
                                    <div className='relative' onClick={e => e.stopPropagation()}>
                                        <div 
                                        onClick={() => setShowCollectionInput(true)} 
                                        className="w-full">
                                            <ComboBox 
                                            inputShown={showCollectionInput} 
                                            setShowCollectionInput={setShowCollectionInput} 
                                            collectionData={allCollections || []} 
                                            userId={session.userId} 
                                            setSelectedCollection={setSelectedCollection} 
                                            selectedCollection={selectedCollection} 
                                            error={error} 
                                            disabled={isCurrentCollectionShared || isCurrentTagShared || page === 'bio' || selectedCollection?.name?.toLowerCase() === 'bio'}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={classNames("flex-1", showCollectionInput && 'hidden')}>
                                    <h6 className="block text-xs font-medium text-gray-500 mb-1">Type</h6>
                                    <div className='relative' onClick={e => e.stopPropagation()}>
                                        <div 
                                        onClick={() => {
                                            if(mediaType) {
                                                setShowTypeInput(false)
                                            }else{
                                                setShowTypeInput(true)
                                            }
                                        }} 
                                        className="w-full">
                                            <TypeComboBox 
                                            inputShown={showTypeInput} setShowTypeInput={setShowTypeInput} updateInputShow={setShowTypeInput} setSelectedType = {setSelectedType} type={selectedType} disabled={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                </div>
                <Input size="medium w-full my-2" 
                                type="text" 
                                name="title" 
                                placeholder="Enter title"
                                value={title || ''}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                <Input size="medium w-full" 
                                type="text" 
                                name="description" 
                                placeholder="Enter description" 
                                value={description || ''} 
                                onChange={(e) => setDescription(e.target.value)}
                            />
                    <>
                    {bioContactFields?.map(field => (
                    <div className="pt-4">
                        <div className="p-2 pl-4 border border-solid border-gray-300 rounded-md flex items-center justify-between">
                        <div className="font-medium">{field.name}</div>
                        {bioContactFields.length > 1 ? 
                        <TrashIcon className="h-4 w-4 cursor-pointer" onClick={() => handleRemoveField(field.key)}/> : 
                        <div></div>}
                        </div>
                    </div>
                    ))}

                    {
                    availableFields?.length > 0 ?
                    <div className="pt-4">
                    <Dropdown
                        overlayStyle={{ width: 'fit-content' }}
                        dropdownRender={() => (
                        <div className="dropdown-content py-4 rounded-sm flex flex-col gap-y-2 cursor-pointer">
                            {availableFields.map(option => (
                            <div key={option.key} onClick={() => handleAddField(option.key)} className= "px-4 py-2 hover:bg-[#f5f5f5]">{option.name}</div>
                        ))}
                        </div>
                        )}
                        onOpenChange={handleOpenDropdown}
                        open={openDropdown}
                        trigger={['click']}
                    >
                        <Button>
                        Add Fields
                        </Button>
                        </Dropdown>
                    </div>
                    :
                    <></>
                    }
                    </>
                </div>
            </div>
            }

            {
            mediaType === 'Profile' && singleBookmarkGem?.media?.type === 'subscriber' &&
            <>
            <p className="font-bold">This is bio contact subscriber gem</p>
            <p className="mt-4">{singleBookmarkGem?.description}</p>
            </>
            }

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
                  defaultFavIconSrc={defaultFavIconSrc}
                  singleBookmarkGem={singleBookmarkGem}
                  setOpenIconModal={setOpenIconModal}
                  setFavIconSrc={setFavIconSrc}
                  setDefaultFavIconSrc={setDefaultFavIconSrc}
                  setLoadingImg={setLoadingImg}
                  setSelectedIcon={setSelectedIcon}
                  />
            } */}
            {
                isOpenImageDialog && <ImageModal 
                    isOpenImageDialog={isOpenImageDialog}
                    currentTab={openImageDialogTab} 
                    onClose={onImageDialogClose}
                    siteImages={docImages}
                    currentIcon={currentIcon}
                    currentThumbnail={currentThumbnail}
                    onThumbnailSelect={onThumbnailSelect}
                    currentURL={assetUrl}
                    onIconSelect={onIconSelect}
                    isSetResetOpt={false}
                    platform={"gem"}
                    isBlogType={mediaType === 'Blog' ? true : false}
                    onResetIcon={onResetIcon}
                    showResetIcon={true}
                />
            }
            </>
            
            }
        </Drawer>
        }

        {
        editPagesIn === 'center peek' &&
        <Modal 
            width={isMobileView ? 'w-[90%]' : '550px'}
            title="Edit Gem" 
            centered
            onCancel={() => {
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }} 
            open={openDrawer}
            maskClosable={false}
            style={{margin:'10px auto'}}
            footer={
          <Space className="flex items-center justify-end">
              <Button onClick={() => {
                setOpenDrawer(false)
                setGemSingleIdSingleId('')
            }}
            disabled={buttonLoading || loadingDelete}
            >
                Cancel
              </Button>

            <Button
              type="primary"
              className="bg-[#40a9ff] border-[#40a9ff]"
              onClick={handleSubmit}
              disabled={buttonLoading || loadingDelete}
            >
            {buttonLoading ? 'Loading' : 'Save'}
            </Button>
          </Space>
        }
            >
            {
            loadingState ? 
            <div className="spinDiv">
                <Spin size='middle' tip='Loading...'/>
            </div>
            :         
            <>
            {(mediaType !== 'Profile' || (mediaType === 'Profile' && !singleBookmarkGem?.media?.type)) &&
            <>
            {fetching &&<div className="custom-spin-overlay">
                  <Spin tip={'Fetching data...'} />
              </div>}
            <div onClick={onLayoutClick}>

                <div className='mb-2 flex justify-between space-x-2'>
                                <div className={classNames("flex-1", showTypeInput && "hidden")}>
                                    <h6 className="block text-xs font-medium text-gray-500 mb-1">Collections</h6>
                                    <div className='relative' onClick={e => e.stopPropagation()}>
                                        <div 
                                        onClick={() => setShowCollectionInput(true)} 
                                        className="w-full">
                                            <ComboBox 
                                            inputShown={showCollectionInput} 
                                            setShowCollectionInput={setShowCollectionInput} 
                                            collectionData={allCollections || []} 
                                            userId={session.userId} 
                                            setSelectedCollection={setSelectedCollection} 
                                            selectedCollection={selectedCollection} 
                                            error={error} 
                                            disabled={isCurrentCollectionShared || isCurrentTagShared || page === 'bio' || selectedCollection?.name?.toLowerCase() === 'bio'}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={classNames("flex-1", showCollectionInput && 'hidden')}>
                                    <h6 className="block text-xs font-medium text-gray-500 mb-1">Type</h6>
                                    <div className='relative' onClick={e => e.stopPropagation()}>
                                        <div 
                                        onClick={() => {
                                            if(mediaType) {
                                                setShowTypeInput(false)
                                            }else{
                                                setShowTypeInput(true)
                                            }
                                        }} 
                                        className="w-full">
                                            <TypeComboBox 
                                            inputShown={showTypeInput} setShowTypeInput={setShowTypeInput} updateInputShow={setShowTypeInput} setSelectedType = {setSelectedType} type={selectedType} disabled={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                </div>

                {/* new changes */}
                <div className="mt-6 max-md:max-w-full flex items-center justify-between">
                    <div className="text-md text-zinc-600">
                        Editable Preview
                    </div>
                    
                    <div className="flex items-center">
                        <InformationCircleIcon className="text-[#347AE2] h-5 w-5 cursor-pointer" title="Tutorial video" onClick={() => setOpenTutorialVideoModal(true)}/>

                        <div className="cursor-pointer ml-2" 
                            onClick={() => setShowModal(true)}
                            disabled={loadingDelete}
                        >
                            <TrashIcon className="text-red-400 h-4 w-4 mr-1"/>
                        </div>
                    </div>
                </div>

            {
                (selectedType?.name === 'Ai Prompt' || selectedType?.name === 'Text Expander') &&
                <div className="mt-1">
                    <div className="mb-2 aiInput">
                <AntInput
                type="text"
                name="shortendurl"
                addonBefore={"c:"}
                placeholder={selectedType?.name === "Text Expander" ? "Enter expander name" : selectedType?.name === "Ai Prompt" ? "Enter prompt name" : "Enter Shortend URL"}
                value={shortendurl}
                error
                onChange={(e) => setShortendurl(e.target.value)}
                className="rounded-md"
                />
                </div>
                {selectedType?.name === 'Ai Prompt' && <Radio.Group 
                value={promptType} 
                onChange={handlePromptType}
                buttonStyle="solid"
                className="rounded-md"
                // disabled={parseInt(collectionId) === parseInt(process.env.NEXT_PUBLIC_AI_PROMPT_COLLECTION_ID)}
                disabled={parseInt(collectionId) === parseInt(session?.aiPromptLibraryId)}
                >
                  <Radio.Button value={`public`}><div className="flex items-center"><GlobeAltIcon className="h-4 w-4 mr-1"/> <div>Public</div></div></Radio.Button>
                  <Radio.Button value={`private`}><div className="flex items-center"><LockClosedIcon className="h-4 w-4 mr-1"/> <div>Private</div></div></Radio.Button>
                </Radio.Group>}
                </div>
            }

                <div className={`flex flex-col mt-2 bg-white rounded-lg max-md:max-w-full ${selectedType?.name !== "Note" ? 'border border-solid border-[color:var(--greyscale-200,#ABB7C9)] p-3' : ''}`}>
              <MediaTypeUIEdit
              fallbackURL={fallbackURL} setFallbackURL={setFallbackURL}
              imageUrl={imageUrl} title={title} description={description} assetUrl={assetUrl} selectedType={selectedType} shortendurl={shortendurl} setShortendurl={setShortendurl} setFavorite={setFavorite} 
              favorite={favorite} showShortEndInput={showShortEndInput} setShowShortEndInput={setShowShortEndInput}
              handlefileTypeChange={handlefileTypeChange} 
              fileType={fileType}
              audioSrc={audioSrc} videoSrc={videoSrc} 
              imageSrc={imageSrc}
              pdfSrc={pdfSrc} 
              onOpenImageDialog={onOpenImageDialog}
            highlightedText={highlightedText} highlightedColor={highlightedColor} setHighlightedColor={setHighlightedColor} setHighlightClass={setHighlightClass}
              setHighlightedText={setHighlightedText} 
              onSearchTerm={onSearchTerm} searchBooks={searchBooks} onClickBook={onClickBook} setSearchBooks={setSearchBooks} loadingBookMovie={loadingBookMovie} readStatus={readStatus} setReadStatus={setReadStatus} 
              searchMovies={searchMovies} onClickMovie={onClickMovie} watchStatus={watchStatus} setWatchStatus={setWatchStatus} setIsReaded={setIsReaded} isReaded={isReaded}
              setHtmlText={setHtmlText} htmlText={htmlText} setPlainText={setPlainText}
              code={code} setCode={setCode}
              citation={citation} handleCitationChange={handleCitationChange} citationText={citationText} setCitationText={setCitationText} testimonial={testimonial} testimonialAttachImage={testimonialAttachImage} testimonialAuthor={testimonialAuthor} testimonialDate={testimonialDate}testimonialProduct={testimonialProduct} testimonialRating={testimonialRating} testimonialTagLine={testimonialTagLine} testimonialUrl={testimonialUrl} testimonialPlatform={testimonialPlatform}
              setTestimonial={setTestimonial} setTestimonialAttachImage={setTestimonialAttachImage} setTestimonialAuthor={setTestimonialAuthor} setTestimonialDate={setTestimonialDate} setTestimonialProduct={setTestimonialProduct} setTestimonialRating={setTestimonialRating}
              setTestimonialTagLine={setTestimonialTagLine} setTestimonialUrl={setTestimonialUrl} setTestimonialPlatform={setTestimonialPlatform}  codeLanguage={codeLanguage} credibility={credibility}
              setCredibility={setCredibility}
              blogAuthor={blogAuthor} setBlogAuthor={setBlogAuthor} 
              blogPublishedDate={blogPublishedDate} setBlogPublishedDate={setBlogPublishedDate} 
              blogStatus={blogStatus} setBlogStatus={setBlogStatus}
              testimonialType={testimonialType} setTestimonialType={setTestimonialType} 
              onFileTestimonialAvatarChange={onFileTestimonialAvatarChange}
              testimonialAvatarImageSrc={testimonialAvatarImageSrc} setTestimonialAvatarImageSrc={setTestimonialAvatarImageSrc} testimonialAvatar={testimonialAvatar} onKeyDownShortUrl={onKeyDownShortUrl} testimonialAttachAudio={testimonialAttachAudio} testimonialAttachVideo={testimonialAttachVideo} promptType={promptType} html={html}
              />

              {selectedType?.name !== 'Note' &&  selectedType?.name !== 'Testimonial' && selectedType?.name !== 'Ai Prompt' && selectedType?.name !== 'Text Expander' && <div className="flex items-center justify-between">
                <div onClick={() => onOpenImageDialog("favicon")} className="w-fit">
                  <FavIcon data={favIconSrc || null}/>
                </div>

                <div>
                  <BookmarkOptionComponent selectedType={selectedType}
                  currencySymbol={currencySymbol} setCurrencySymbol={setCurrencySymbol} setProductPrice={setProductPrice} productPrice={productPrice} fileType={fileType}
                  setFavorite={setFavorite} favorite={favorite} rate={rate} setRate={setRate} setPlatformType={setPlatformType} platformType={platformType} onCopyCode={onCopyCode} assetUrl={assetUrl}
                  page={page} tweetType={tweetType} setTweetType={setTweetType} 
                  imageSrc={imageSrc}
                  action="edit" id={gemSingleId} textExtract={textExtract} setTextExtract={setTextExtract}
                  />
                </div>
              </div>}
              
              {
              (selectedType?.name === 'Note' || selectedType?.name === 'Testimonial' || selectedType?.name === 'Ai Prompt' || selectedType?.name === 'Text Expander') ? <></> :
              <>
              {
              isTitleEditing ? 
              <TextareaAutosize
                  onBlur={disableTitleInput}
                  onKeyDown={onKeyDownTitle}
                  value={title || ''}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-xl font-medium text-gray-500 resize-none mt-2 !outline-none !focus:outline-none textarea-border"
                  autoFocus={true}
                />
                :
              <div className="mt-2 text-xl font-medium text-gray-500 break-words" onClick={enableTitleInput}>
                {title?.length > 50
                  ? title?.slice(0, 50)?.concat("...")
                  : (title || 'Enter a title')}
              </div>
              }

              {
              isDescriptionEditing ? 
              <TextareaAutosize
                  onBlur={disableDescriptionInput}
                  onKeyDown={onKeyDownDescription}
                  value={description || ''}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 text-base text-gray-500 resize-none !outline-none !focus:outline-none textarea-border"
                  autoFocus={true}
                />
                :
              <div className="mt-2 text-base text-gray-500 break-words" onClick={enableDescriptionInput}>
                {description?.length > 150
                  ? description?.slice(0, 150)?.concat("...")
                  : (description || 'Enter description')}
              </div>
              }
              </>
              }

              {
              selectedType?.name === 'Testimonial' && 
              <>
              <Input
                size="medium w-full"
                type="text"
                name="tagLine"
                placeholder="Enter tag line"
                value={testimonialTagLine}
                onChange={(e) => setTestimonialTagLine(e.target.value)}
                className='!border-[#97A0B5] w-full rounded-md mt-4'
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
                className='!border-[#97A0B5] w-full rounded-md'
              />

              <div className="flex items-center justify-between mt-4 w-full">
                <Rate value={testimonialRating} onChange={(value) => setTestimonialRating(value)} allowHalf />
                <div className="bookStatus">
                    <DatePicker
                      value={
                        !testimonialDate ? testimonialDate : moment(testimonialDate)
                      }
                      onChange={(date, dateStirng) => setTestimonialDate(dateStirng)}
                      format={"YYYY-MM-DD"}
                    //   allowClear={false}
                      showToday={false}
                      className="rounded-full border border-solid border-[#97A0B5] w-fit "
                    />
                </div>
              </div>
              </>
              }

              {
              selectedType?.name === 'Citation' &&
              <>

              <div className="my-2">
                <Input
                value={citationAuthor}
                onChange={(e) => setCitationAuthor(e.target.value)}
                placeholder="Enter citation author"
                className="rounded-md"
                size="medium"
                prefix={<AiOutlineUser className="h-5 w-5 text-[#4B4F5D]"/>}
              />
              </div>

              <div className="w-full flex items-center justify-between">
                  <div className="w-full flex items-center justify-between mt-2 bookStatus">
                    <DatePicker
                      value={
                        !citationDate ? citationDate : moment(citationDate)
                      }
                      onChange={(date, dateStirng) => setCitationDate(dateStirng)}
                      format={"YYYY-MM-DD"}
                    //   allowClear={false}
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
              }

              {
              selectedType?.name === 'Code' &&
              <div className="mt-4">
                <AntInput
                size="medium w-full mb-2"
                value={codeLanguage}
                onChange={(e) => setCodeLanguage(e.target.value)}
                placeholder="Enter Language"
                />
              </div>
              }

              {
              (selectedType?.name === 'Book' || selectedType?.name === 'Movie') &&
              <div className="w-full flex mt-2 bookStatus flex-col">
                <h6 className="block text-xs font-medium text-gray-500 mb-1">{selectedType?.name === 'Book' ? 'Read date' : 'Watch date'}</h6>
                <DatePicker
                  value={
                    !dateRead ? dateRead : moment(dateRead)
                  }
                  onChange={(date, dateStirng) => setDateRead(dateStirng)}
                  format={"YYYY-MM-DD"}
                //   allowClear={false}
                  showToday={false}
                  className="rounded-full border border-solid border-[#97A0B5] w-fit"
                  placeholder={selectedType?.name === 'Book' ? 'Read date' : 'Watch date'}
                />
            
              </div>
              }

              {selectedType?.name !== 'Note' && selectedType?.name !== 'Ai Prompt' && selectedType?.name !== 'Text Expander' && <div className='my-2 addBk-tag-wrapper bg-white p-2'>
                <ReactTags 
                  tags={selectedTags?.map((t) => { return { id: t?.attributes?.tag || t?.tag, text: t?.attributes?.tag || t?.tag}  })}
                suggestions={prepareTags()}
                delimiters={[KEY_CODES.enter, KEY_CODES.comma]}
                handleDelete={onTagDelete}
                handleAddition={onTagAdd}
                inputFieldPosition="bottom"
                placeholder="Enter Tag"
                onClearAll={() => setSelectedTags([])}
                clearAll
                autocomplete
                readOnly={isCurrentTagShared}
                />
              </div>}
            </div>

                <div className="addbk-collapse mt-4">
                    <Collapse ghost 
                    expandIcon={(status) => {
                        return (
                            <div>
                                {status.isActive ? (
                                    <MdOutlineArrowDropDown  className="h-6 w-6 text-[#141B34]" />
                                ) : (
                                    <MdOutlineArrowRight className="h-6 w-6 text-[#141B34]" />
                                )}
                            </div>
                        )
                    }}
                    activeKey={collapseKeys} onChange={handleChangeCollapse}
                    >
                    <Panel header={
                        <div className="text-[#4B4F5D] text-base">
                        Advanced Options
                        </div>
                    } key="1">

                        {
                        (selectedType?.name === 'Ai Prompt' || selectedType?.name === 'Text Expander') &&
                        <>
                        {imageUrl && <div className="relative mb-1">
                        <div className="">
                          <img src={imageUrl?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`)}
                            alt={title || description || "Text maniputlation gem"} 
                            className='w-full object-cover block h-[200px] rounded-lg'
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src=singleBookmarkGem?.metaData?.fallbackURL ? singleBookmarkGem?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                            }}
                          />
                        </div>

                        <div className="px-1 absolute bottom-[10px] flex items-center justify-between w-full md:px-2">
                                <div></div>
                                <div className="border border-solid border-[#97A0B5] rounded-full w-fit p-1 bg-white cursor-pointer" onClick={() => onOpenImageDialog("thumbnail")}>
                                <PiUploadSimpleLight className="text-[#74778B] h-4 w-4 aspect-square"/>
                                </div>
                            </div>
                      </div>}

                        <div className="flex items-center justify-between">
                            <div onClick={() => onOpenImageDialog("favicon")} className="w-fit">
                            <FavIcon data={favIconSrc || null}/>
                            </div>

                            <div>
                            <BookmarkOptionComponent selectedType={selectedType}
                            currencySymbol={currencySymbol} setCurrencySymbol={setCurrencySymbol} setProductPrice={setProductPrice} productPrice={productPrice} fileType={fileType}
                            setFavorite={setFavorite} favorite={favorite} rate={rate} setRate={setRate} setPlatformType={setPlatformType} platformType={platformType} onCopyCode={onCopyCode} assetUrl={assetUrl}
                            page={page} tweetType={tweetType} setTweetType={setTweetType} imageSrc={fileType === 'url' ? assetUrl : imageSrc}
                            action="edit"
                            />
                            </div>
                        </div>

                        <>
              {
              isTitleEditing ? 
              <TextareaAutosize
                  onBlur={disableTitleInput}
                  onKeyDown={onKeyDownTitle}
                  value={title || ''}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-xl font-medium text-gray-500 resize-none mt-2 !outline-none !focus:outline-none textarea-border w-full"
                  autoFocus={true}
                />
                :
              <div className="mt-2 text-xl font-medium text-gray-500 break-words" onClick={enableTitleInput}>
                {title?.length > 50
                  ? title?.slice(0, 50)?.concat("...")
                  : (title || 'Enter a title')}
              </div>
              }

              {
              isDescriptionEditing ? 
              <TextareaAutosize
                  onBlur={disableDescriptionInput}
                  onKeyDown={onKeyDownDescription}
                  value={description || ''}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 text-base text-gray-500 resize-none !outline-none !focus:outline-none textarea-border w-full"
                  autoFocus={true}
                />
                :
              <div className="mt-2 text-base text-gray-500 break-words" onClick={enableDescriptionInput}>
                {description?.length > 150
                  ? description?.slice(0, 150)?.concat("...")
                  : (description || 'Enter description')}
              </div>
              }
              </>
                        
                        </>
                        }

                        {(selectedType?.name === 'Note' || selectedType?.name === 'Ai Prompt' || selectedType?.name === 'Text Expander') && <div className='my-2 addBk-tag-wrapper bg-white p-2'>
                        <ReactTags 
                            tags={selectedTags?.map((t) => { return { id: t?.attributes?.tag || t?.tag, text: t?.attributes?.tag || t?.tag}  })}
                            suggestions={prepareTags()}
                            delimiters={[KEY_CODES.enter, KEY_CODES.comma]}
                            handleDelete={onTagDelete}
                            handleAddition={onTagAdd}
                            inputFieldPosition="bottom"
                            placeholder="Enter Tag"
                            onClearAll={() => setSelectedTags([])}
                            clearAll
                            autocomplete
                            readOnly={isCurrentTagShared}
                        />
                        </div>}

                        <div className='pt-4'>
                                    <h6 className="block text-xs font-medium text-gray-500 mb-1">Remarks</h6>
                                    <TextareaAutosize
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        placeholder="Add your remarks"
                                        minRows={4}
                                        className="w-full rounded-md resize-none !outline-none !focus:outline-none textarea-border"
                                    />
                                </div>
                    
                    {
                    page !== 'broken-duplicate' && page !== 'bio' &&
                    <div className="pt-4">
                    {
                        customPropertyAnswered && customPropertyAnswered.length>0 && customPropertyAnswered?.map((item,i) => (
                            <>
                            {renderCustomFieldPropertyAnswered(item,i)}
                            </>
                        ))
                    }
                    </div>
                    }     

                    
                    {
                    page !== 'broken-duplicate' && page !== 'bio' &&
                    <div className="pt-4">
                    {
                        customPropertyWithoutAnswer && customPropertyWithoutAnswer.length>0 && customPropertyWithoutAnswer?.map((item,i) => (
                            <>
                            {renderCustomFieldProperty(item,i)}
                            </>
                        ))
                    }
                    </div>
                    }
                    
                    {
                    page === 'bio' && (selectedType?.name === 'Link' || selectedType?.name === 'App' || selectedType?.name === 'Product') &&
                        singleBookmarkGem && singleBookmarkGem?.media && singleBookmarkGem?.media?.ribbon && 
                        <div className='my-2 flex justify-between space-x-2'>
                        <div className={`${showRibbonPicker ? 'flex-[0.5]' : 'flex-1'}`}>
                        <h6 className="block text-xs font-medium text-gray-500 mb-1">Label</h6>
                        <AntInput placeholder="Enter Label"
                            value={ribbon?.text || ''}
                            onChange={(e) => handleRibbonText(e)}
                            suffix={<>
                                <div className="flex items-center"> 
                                    {
                                    ribbon?.color ? <div className={`h-4 w-4 mx-2 cursor-pointer`} style={{background: ribbon?.color}} 
                                    onClick={(e) => {
                                    e.stopPropagation()
                                    setShowRibbonPicker(!showRibbonPicker)
                                    }}>
                                    </div> : <IoColorPaletteOutline className="h-4 w-4 cursor-pointer mx-2" onClick={(e) => {
                                    e.stopPropagation()
                                    setShowRibbonPicker(!showRibbonPicker)
                                    }}/>
                                    }
                                    <TrashIcon className="h-4 w-4 cursor-pointer text-[#EB5757]" onClick={() => setRibbon({...ribbon, text: '',color:''})}/>
                                </div>
                            </>}
                        />
                        </div>

                    {showRibbonPicker &&  <div className={`${showRibbonPicker ? 'flex-[0.5] block' : 'hidden'}`}>
                        <BlockPicker
                        color={ribbon?.color || ''}
                        onChangeComplete={(color) => setRibbon({...ribbon, color: color.hex})}
                        triangle="hide"
                        colors={['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#EB144C', '#F78DA7', '#9900EF','#000000']}
                        />
                    </div>}
                    </div>
                    }
                    </Panel>
                    </Collapse>
                </div>
            </div>
            </>
            }

            <div
                className={showModal ? "w-full bg-white" : ""}
                style={{ marginLeft: 0 }}
                >
                <div className={showModal === true ? "popup-delete-model" : ""}>
                    {showModal && (
                    <div className="border-t-[1px]">
                        <div className="popup-delete bg-white">
                        <span className="content-h">
                            Confirm delete{" "}
                            {singleBookmarkGem.title && singleBookmarkGem.title.length > 35
                            ? singleBookmarkGem.title.slice(0, 35).concat("...")
                            : singleBookmarkGem.title}
                            ?
                        </span>
                        <div className="btn-pop">
                            <button
                            className="yes-btn"
                            onClick={() => handleDelete()}
                            disabled={loadingDelete}
                            >
                            {loadingDelete ? "Loading" : `Yes`}
                            </button>
                            <button
                            className="no-btn"
                            onClick={() => setShowModal(false)}
                            disabled={loadingDelete}
                            >
                            No
                            </button>
                        </div>
                        </div>
                    
                    </div>
                    )}
                </div>
            </div>

            {
            mediaType === 'Profile' && singleBookmarkGem?.media?.type === 'contact' &&
            <div className={"grid grid-cols-6 gap-2"} onClick={onLayoutClick}>
                <div className='col-span-7'>
                    <div className='mb-2 flex justify-between space-x-2'>
                                <div className={classNames("flex-1", showTypeInput && "hidden")}>
                                    <h6 className="block text-xs font-medium text-gray-500 mb-1">Collections</h6>
                                    <div className='relative' onClick={e => e.stopPropagation()}>
                                        <div 
                                        onClick={() => setShowCollectionInput(true)} 
                                        className="w-full">
                                            <ComboBox 
                                            inputShown={showCollectionInput} 
                                            setShowCollectionInput={setShowCollectionInput} 
                                            collectionData={allCollections || []} 
                                            userId={session.userId} 
                                            setSelectedCollection={setSelectedCollection} 
                                            selectedCollection={selectedCollection} 
                                            error={error} 
                                            disabled={isCurrentCollectionShared || isCurrentTagShared || page === 'bio' || selectedCollection?.name?.toLowerCase() === 'bio'}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={classNames("flex-1", showCollectionInput && 'hidden')}>
                                    <h6 className="block text-xs font-medium text-gray-500 mb-1">Type</h6>
                                    <div className='relative' onClick={e => e.stopPropagation()}>
                                        <div 
                                        onClick={() => {
                                            if(mediaType) {
                                                setShowTypeInput(false)
                                            }else{
                                                setShowTypeInput(true)
                                            }
                                        }} 
                                        className="w-full">
                                            <TypeComboBox 
                                            inputShown={showTypeInput} setShowTypeInput={setShowTypeInput} updateInputShow={setShowTypeInput} setSelectedType = {setSelectedType} type={selectedType} disabled={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                </div>
                <Input size="medium w-full mb-2" 
                                type="text" 
                                name="title" 
                                placeholder="Enter title"
                                value={title || ''}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                <Input size="medium w-full mb-2" 
                                type="text" 
                                name="description" 
                                placeholder="Enter description" 
                                value={description || ''} 
                                onChange={(e) => setDescription(e.target.value)}
                            />
                    <>
                    {bioContactFields?.map(field => (
                    <div className="pt-4">
                        <div className="p-2 pl-4 border border-solid border-gray-300 rounded-md flex items-center justify-between">
                        <div className="font-medium">{field.name}</div>
                        {bioContactFields.length > 1 ? 
                        <TrashIcon className="h-4 w-4 cursor-pointer" onClick={() => handleRemoveField(field.key)}/> : 
                        <div></div>}
                        </div>
                    </div>
                    ))}

                    {
                    availableFields?.length > 0 ?
                    <div className="pt-4">
                    <Dropdown
                        overlayStyle={{ width: 'fit-content' }}
                        dropdownRender={() => (
                        <div className="dropdown-content py-4 rounded-sm flex flex-col gap-y-2 cursor-pointer">
                            {availableFields.map(option => (
                            <div key={option.key} onClick={() => handleAddField(option.key)} className= "px-4 py-2 hover:bg-[#f5f5f5]">{option.name}</div>
                        ))}
                        </div>
                        )}
                        onOpenChange={handleOpenDropdown}
                        open={openDropdown}
                        trigger={['click']}
                    >
                        <Button>
                        Add Fields
                        </Button>
                        </Dropdown>
                    </div>
                    :
                    <></>
                    }
                    </>
                </div>
            </div>
            }

            {
            mediaType === 'Profile' && singleBookmarkGem?.media?.type === 'subscriber' &&
            <>
            <p className="font-bold">This is bio contact subscriber gem</p>
            <p className="mt-4">{singleBookmarkGem?.description}</p>
            </>
            }

            {
                isOpenImageDialog && <ImageModal 
                    isOpenImageDialog={isOpenImageDialog}
                    currentTab={openImageDialogTab} 
                    onClose={onImageDialogClose}
                    siteImages={docImages}
                    currentIcon={currentIcon}
                    currentThumbnail={currentThumbnail}
                    onThumbnailSelect={onThumbnailSelect}
                    currentURL={assetUrl}
                    onIconSelect={onIconSelect}
                    isSetResetOpt={false}
                    platform={"gem"}
                    isBlogType={mediaType === 'Blog' ? true : false}
                    onResetIcon={onResetIcon}
                    showResetIcon={true}
                />
            }
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
                  defaultFavIconSrc={defaultFavIconSrc}
                  singleBookmarkGem={singleBookmarkGem}
                  setOpenIconModal={setOpenIconModal}
                  setFavIconSrc={setFavIconSrc}
                  setDefaultFavIconSrc={setDefaultFavIconSrc}
                  setLoadingImg={setLoadingImg}
                  setSelectedIcon={setSelectedIcon}
                  />
            } */}
            </>
            
            }
        </Modal>
        }


        {
        openTutorialVideoModal &&
        <TutorialVideoModal selectedType={selectedType} isMobileView={isMobileView} openTutorialVideoModal={openTutorialVideoModal} setOpenTutorialVideoModal={setOpenTutorialVideoModal}/>
        }
        </>
    )
}

export default SingleBookmarkDrawer;