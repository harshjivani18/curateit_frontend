import { 
  ArrowTopRightOnSquareIcon, 
  CheckIcon, 
  DocumentTextIcon, 
  GlobeAltIcon, 
  HeartIcon, 
  LockClosedIcon,  
  TrashIcon, 
  XMarkIcon 
}                                           from "@heroicons/react/24/outline";

import { 
  Input as AntInput, 
  Avatar, 
  Dropdown, 
  Select 
}                                           from "antd"
import { 
  useCallback, 
  useEffect, 
  useRef, 
  useState 
}                                           from "react";
import { BsLightningCharge }                from "react-icons/bs";
import { IoColorPaletteOutline }            from "react-icons/io5";
import { 
  PiPencilSimple, 
  PiUploadSimpleLight 
}                                           from "react-icons/pi";
import ReactPlayer                          from "react-player";
import TextareaAutosize                     from "react-textarea-autosize";
import dynamic                              from "next/dynamic";
import { AiOutlineUser }                    from "react-icons/ai";
import CodeMirror                           from '@uiw/react-codemirror';
import { javascript }                       from '@codemirror/lang-javascript';

import Input                                from "@components/collectionCombobox/Input";
import ComboBoxSelect                       from "@components/collectionCombobox/ComboBoxSelect";

import { 
  CITATIONS, 
  HIGHLIGHTED_COLORS, 
  getDomainFromURL, 
  getDomainFromURLForBookmark,
  TESTIMONIAL_PLATFORMS_ICON,
  TESTIMONIAL_PLATFORMS,
  LANGUAGES, 
  THEMES 
}                                           from "@utils/constants";
import { getColorForProfilePlatform }       from "@utils/commonFunctions";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const { Option } = Select;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MediaTypeUIEdit = ({imageUrl='', blogStatus="", setBlogStatus=()=>{}, fallbackURL='', title='',description='',assetUrl='',selectedType='',shortendurl='',setShortendurl,setFavorite,favorite='',showShortEndInput='', setShowShortEndInput,onFileChange,fileType='',videoSrc='',audioSrc='',imageSrc='',pdfSrc='',onOpenImageDialog=()=>{},
audioEnhancedText='', setFallbackURL=()=>{}, setAudioEnhancedText=()=>{},setAudioOriginalText=()=>{},highlightedText='',highlightedColor='',setHighlightedColor=()=>{},setHighlightClass=()=>{},setHighlightedText=()=>{},readStatus='',setReadStatus=()=>{},watchStatus='',setWatchStatus=()=>{},setIsReaded=()=>{},isReaded='',setHtmlText=()=>{},htmlText='',setPlainText=()=>{},code='',setCode=()=>{},citation=null,handleCitationChange=()=>{},citationText='',setCitationText=()=>{},testimonialAttachImage,testimonialAuthor,setTestimonialAuthor,setTestimonialPlatform,testimonialPlatform,testimonialType='',onFileTestimonialAvatarChange,testimonialAvatarImageSrc, codeLanguage='',setCredibility=()=>{},testimonialAvatar='',onKeyDownShortUrl=()=>{},testimonialAttachAudio='', testimonialAttachVideo='',promptType='',html,setTestimonialAttachImage,setTestimonialAttachAudio,setHtml,setTestimonialAttachVideo}) => {
  const fileRef = useRef();
  const fileAvatarRef = useRef();
  const highlightRef = useRef();
  
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [showAudioNoteOptions, setShowAudioNoteOptions] = useState(false);

  const [theme, setTheme]     = useState("dark");
  const [extentionLng, 
           setExtentionsLng]    = useState(javascript())
    
  const lowerLang             = codeLanguage ? codeLanguage.toLowerCase() : "javascript"

  const [open, setOpen] = useState(false);
    const handleOpen = (flag) => {
        setOpen(flag);
    };

  useEffect(() => {
      if(codeLanguage){
        handleLanguageChange(codeLanguage);

        //Set initaila theme
        handleThemeChange("dracula")
      }
    }, [codeLanguage]);

    const handleThemeChange = (e) => {
        const value = e?.target?.value || e;
        const selectedObj = THEMES.filter(lng => lng.mode === value)[0];
        if (selectedObj) {
            setTheme(selectedObj.theme);
        } else {
            setTheme("dark");
        }
    }

    const handleLanguageChange = (e) => {
        const selectedObj = LANGUAGES.filter(lng => lng.mode === lowerLang)[0];
        if (selectedObj) {
            setExtentionsLng(selectedObj.lng);
        } else {
            setExtentionsLng(javascript());
        }
    }

    const onCodeChange = useCallback((val, viewUpdate) => {
    setCode(val);
    }, []);

    const [showTestimonialPlatform, setShowTestimonialPlatform] = useState(false);
    const [selectedTestimonialPlatform, setSelectedTestimonialPlatform] =
      useState(
        testimonialPlatform
          ? TESTIMONIAL_PLATFORMS.filter(
              (t) =>
                t.value === testimonialPlatform || t.name === testimonialPlatform
            )[0]
          : TESTIMONIAL_PLATFORMS[0]
      );

    const onTestimonialPlatformChange = (e) => {
    setSelectedTestimonialPlatform(
      TESTIMONIAL_PLATFORMS.filter((platform) => platform.value === e)[0]
    );
    setShowTestimonialPlatform(false);
    setTestimonialPlatform(e);
  };

    const renderFileUpload = () => {
    if (selectedType?.name === "PDF") {
      return (
        <>
          <input
            type={"file"}
            className={"hidden"}
            onChange={onFileChange}
            ref={fileRef}
            accept="application/pdf"
          />
        </>
      );
    }
    if (selectedType?.name === "Audio") {
      return (
        <>
          <input
            type={"file"}
            className={"hidden"}
            onChange={onFileChange}
            ref={fileRef}
            accept="audio/*"
          />
        </>
      );
    }
    if (selectedType?.name === "Video") {
      return (
        <>
          <input
            type={"file"}
            className={"hidden"}
            onChange={onFileChange}
            ref={fileRef}
            accept="video/*"
          />
        </>
      );
    }
    if (selectedType?.name === "Image") {
      return (
        <>
          <input
            type={"file"}
            className={"hidden"}
            onChange={onFileChange}
            ref={fileRef}
            accept="image/*"
          />
        </>
      );
    }
    if (selectedType?.name === "Testimonial") {
      return (
        <>
          <input
            type={"file"}
            className={"hidden"}
            onChange={onFileChange}
            ref={fileRef}
            accept={testimonialType === 'image'? "image/*" : testimonialType === 'audio' ? 'audio/*' : 'video/*'}
          />
        </>
      );
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

const bookStatusItems = [
  {
    label: <div onClick={e => {
      e.stopPropagation()
      setReadStatus('read')
    }} className="text-[#00D863]">Read</div>,
    key: '0',
  },
  {
    label: <div onClick={e => {
      e.stopPropagation()
      setReadStatus('reading')
    }} className="text-[#EEAF0D]">Reading</div>,
    key: '1',
  },
  {
    label: <div onClick={e => {
      e.stopPropagation()
      setReadStatus('to-read')
    }} className="text-[#348EE2]">To Read</div>,
    key: '2',
  },
  ]

  const movieStatusItems = [
  {
    label: <div onClick={e => {
      e.stopPropagation()
      setWatchStatus('watched')
    }} className="text-[#00D863]">Watched</div>,
    key: '0',
  },
  {
    label: <div onClick={e => {
      e.stopPropagation()
      setWatchStatus('watching')
    }} className="text-[#EEAF0D]">Watching</div>,
    key: '1',
  },
  {
    label: <div onClick={e => {
      e.stopPropagation()
      setWatchStatus('to-watch')
    }} className="text-[#348EE2]">To Watch</div>,
    key: '2',
  },
  ]

  const articleStatusItems = [
  {
    label: <div onClick={e => {
      e.stopPropagation()
      setIsReaded('read')
    }} className="text-[#00D863]">Read</div>,
    key: '0',
  },
   {
    label: <div onClick={e => {
      e.stopPropagation()
      setIsReaded('to Read')
    }} className="text-[#348EE2]">To Read</div>,
    key: '1',
  },
  ]

  const blogStatusItems = [
    {
      label: <div onClick={e => {
        e.stopPropagation()
        setBlogStatus('Published')
      }} className="text-[#00D863]">Published</div>,
      key: '0',
    },
     {
      label: <div onClick={e => {
        e.stopPropagation()
        setBlogStatus('Draft')
      }} className="text-[#348EE2]">Draft</div>,
      key: '1',
    },
    ]

  const citationStatusItems = [
  {
    label: <div onClick={e => {
      e.stopPropagation()
      setCredibility('low')
    }} className="text-[#348EE2]">Low</div>,
    key: '0',
  },
   {
    label: <div onClick={e => {
      e.stopPropagation()
      setCredibility('high')
    }} className="text-[#AC3D3E]">High</div>,
    key: '1',
  },
   {
    label: <div onClick={e => {
      e.stopPropagation()
      setCredibility('medium')
    }} className="text-[#EEAF0D]">Medium</div>,
    key: '2',
  },
  ]

  const renderPDFThumbnail = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <img
          src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/pdf.png`}
          alt="PDF file icon"
          className="w-20 h-20"
        />
        <a href={pdfSrc} target="_blank" rel="noreferrer" className="block mt-1">
          <span>{pdfSrc?.split("/")?.pop()}</span>
        </a>
      </div>
    );
  }

  const handleColorToggle = () => {
    setShowColorOptions(!showColorOptions);
  };

  const handleShowNoteAudio = () => {
    setShowAudioNoteOptions(!showAudioNoteOptions);
  };

  const onTextDelete = () => {
    setHighlightedText("");
    setAudioEnhancedText("");
    setAudioOriginalText("");
  };

  const onExpnaderChange = (content, delta, source, editor) => {
    setHtmlText(content);
    setPlainText(editor.getText());
  };

  const onUploadFileTestimonialAvatarClick = () => {
      if (fileAvatarRef) {
        fileAvatarRef.current.click();
      }
  };

  const renderFileTestimonialAvatarUpload = () => {
      return (<>
          <input
            type={"file"}
            className={"hidden"}
            onChange={onFileTestimonialAvatarChange}
            ref={fileAvatarRef}
            accept="image/*"
          />
        </>)
  };

  const dropdownnRender = () => {
    return(
      <ComboBoxSelect
              inputShown={showTestimonialPlatform}
              hideInput={(e) => setShowTestimonialPlatform(e)}
              tweetData={TESTIMONIAL_PLATFORMS}
              onTweetChange={onTestimonialPlatformChange}
              selectedTweet={selectedTestimonialPlatform}
              error={false}
      />
    )
  }

  const onHighlightBlur = () => {
    if (highlightRef) {
      setHighlightedText(highlightRef.current.innerText);
    }
  };
  const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env;
    return(
        <>
        {
        (selectedType?.name === 'Link' || selectedType?.name === 'Article' || selectedType?.name === 'App' || selectedType?.name === 'Product') &&
        <>
        <div className="relative">
                <div className="gradient-add-bookmark-div">
                  <img src={imageUrl?.replace("_SS135", "_SS500")?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`)}
                    alt={title || description || "Curateit gem"} 
                    className='w-full object-cover block h-[200px] rounded-lg'
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src= fallbackURL && fallbackURL !== "" ? fallbackURL?.replace("_SS135", "_SS500") : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    }}
                  />
                </div>
                {selectedType?.name === 'Article' && 
                <div className="absolute top-0 right-0 pt-2">
                  <Dropdown
                    menu={{
                      items:articleStatusItems,
                    }}
                    trigger={['click']}
                  >
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="max-content" height="22" viewBox="0 0 102 30" fill="none">
                        <path d="M100 29.8C100.994 29.8 101.8 28.9941 101.8 28V2C101.8 1.00589 100.994 0.200001 100 0.200001L2.81549 0.200001C1.21352 0.200001 0.409668 2.13545 1.54029 3.27037L12.0253 13.7953C12.8961 14.6694 12.8779 16.0886 11.985 16.9401L1.75311 26.6974C0.577606 27.8183 1.37101 29.8 2.99532 29.8L100 29.8Z" fill={isReaded === 'read' ? '#00D863'  : `#348EE2`} stroke="white" stroke-width="0.4"/>
                        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16" font-family="Arial, sans-serif" cursor={'pointer'}>
                            {isReaded && isReaded.charAt(0).toUpperCase() + isReaded.slice(1)}
                        </text>
                    </svg>
                    </div>
                  </Dropdown>
                    
                </div>
                }

                
                {
                showShortEndInput &&
                <div className="absolute bottom-[50%] w-full items-center px-2 aiInput">
                  <AntInput  addonBefore={"c:"} className='rounded-lg shadow-md outline-none w-full text-black' 
                    size="large"
                    type="text" 
                    style={{background:'white'}}
                    suffix={<XMarkIcon className="text-[#74778B] h-5 w-5 ml-1 aspect-square cursor-pointer" 
                    onClick={e => {
                      e.stopPropagation()
                      setShowShortEndInput(false)
                    }}/>}
                    name="shortendurl"
                    placeholder={selectedType?.name === "Text Expander" ? "Enter expander name" : selectedType?.name === "Ai Prompt" ? "Enter prompt name" : "Enter Shortend URL"}
                    value={shortendurl}
                    onChange={(e) => setShortendurl(e.target.value)}
                    onKeyDown={onKeyDownShortUrl}
                  />
                </div>
                }

                <div className="px-1 absolute bottom-[10px] flex items-center justify-between w-full md:px-2">
                  <div className="bg-white rounded-[60px] p-1 cursor-pointer flex items-center justofy-center border border-solid border-[#97A0B5]" onClick={(e) => {
                    e.stopPropagation()
                    setFavorite(prev => !prev)
                  }}>
                    {
                    favorite ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22.5 8.8125C22.5 15.375 12.7697 20.6869 12.3553 20.9062C12.2461 20.965 12.124 20.9958 12 20.9958C11.876 20.9958 11.7539 20.965 11.6447 20.9062C11.2303 20.6869 1.5 15.375 1.5 8.8125C1.50174 7.27146 2.11468 5.79404 3.20436 4.70436C4.29404 3.61468 5.77146 3.00174 7.3125 3C9.24844 3 10.9434 3.8325 12 5.23969C13.0566 3.8325 14.7516 3 16.6875 3C18.2285 3.00174 19.706 3.61468 20.7956 4.70436C21.8853 5.79404 22.4983 7.27146 22.5 8.8125Z" fill="#E50000"/>
                      </svg> :
                    <HeartIcon className={`h-5 w-5 text-[#74778B]}`}/>
                    }
                    
                  </div>

                  <div className="flex items-center">
                    <div className="cursor-pointer bg-[#FDFDFD] rounded-md flex items-center p-1 border border-solid border-[#97A0B5]" onClick={() => window.open(assetUrl|| '', "_blank")}>
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1 text-[#74778B]"/>
                      <div className="text-[#475467] text-sm">{assetUrl && getDomainFromURL(assetUrl)}</div>
                    </div>
                    
                    <div className={`ml-1 md:ml-2 border border-solid border-[#97A0B5] rounded-full w-fit p-1 cursor-pointer ${showShortEndInput ? 'bg-[#B8D4FE]' : 'bg-white'}`} onClick={(e) => {
                        e.stopPropagation()
                        setShowShortEndInput(!showShortEndInput)
                      }}>
                      <BsLightningCharge className="text-[#74778B] h-4 w-4 aspect-square" />
                    </div>

                    <div className="ml-1 md:ml-2 border border-solid border-[#97A0B5] rounded-full w-fit p-1 bg-white cursor-pointer" onClick={() => onOpenImageDialog("thumbnail")}>
                      <PiUploadSimpleLight className="text-[#74778B] h-4 w-4 aspect-square"/>
                    </div>

                  </div>

                </div>

        </div>
        </>
        }

        {
        selectedType?.name === 'Video' &&
        <>
        <div className="relative">
                <div className="">
                  <ReactPlayer
                    url={videoSrc || assetUrl} 
                    playing={false}
                    controls={true}
                    width="100%"
                    height={'200px'}
                  />
                </div>

                <div className="px-1 absolute top-[5px] right-0 flex items-center justify-between w-full md:px-2">
                  {/* <div className="bg-white rounded-[60px] p-1 cursor-pointer flex items-center justofy-center border border-solid border-[#97A0B5]" onClick={(e) => {
                    e.stopPropagation()
                    setFavorite(prev => !prev)
                  }}>
                    {
                    favorite ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22.5 8.8125C22.5 15.375 12.7697 20.6869 12.3553 20.9062C12.2461 20.965 12.124 20.9958 12 20.9958C11.876 20.9958 11.7539 20.965 11.6447 20.9062C11.2303 20.6869 1.5 15.375 1.5 8.8125C1.50174 7.27146 2.11468 5.79404 3.20436 4.70436C4.29404 3.61468 5.77146 3.00174 7.3125 3C9.24844 3 10.9434 3.8325 12 5.23969C13.0566 3.8325 14.7516 3 16.6875 3C18.2285 3.00174 19.706 3.61468 20.7956 4.70436C21.8853 5.79404 22.4983 7.27146 22.5 8.8125Z" fill="#E50000"/>
                      </svg> :
                    <HeartIcon className={`h-5 w-5 text-[#74778B]}`}/>
                    }
                    
                  </div> */}
                  <div></div>

                  {fileType !== 'file' && <div className="flex items-center">
                    <div className="cursor-pointer bg-[#FDFDFD] rounded-md flex items-center p-1 border border-solid border-[#97A0B5]" onClick={() => window.open(assetUrl|| '', "_blank")}>
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1 text-[#74778B]"/>
                      <div className="text-[#475467] text-sm">{assetUrl && getDomainFromURL(assetUrl)}</div>
                    </div>
                    
                    {/* <div className="ml-1 md:ml-2 border border-solid border-[#97A0B5] rounded-full w-fit p-1 bg-white cursor-pointer" onClick={() => onOpenImageDialog("thumbnail")}>
                      <PiUploadSimpleLight className="text-[#74778B] h-4 w-4 aspect-square"/>
                    </div> */}

                  </div>}

                </div>

        </div>
        </>
        }

        {
        selectedType?.name === 'Audio' &&
        <div className="relative">
                <div className="">
                  {
                  fileType === 'url' ?  
                  <>
                  {
                    html ? <div dangerouslySetInnerHTML={{ __html: html }}/> :
                    <ReactPlayer
                    url={assetUrl} 
                    playing={false}
                    controls={true}
                    width="100%"
                    height={'200px'}
                  />
                  }
                  </>
                  :
                  <div className="px-1 md:px-2 flex items-center justify-center h-[150px]">
                    <audio src={audioSrc} autoPlay={false} controls>
                      <source src={audioSrc} />
                    </audio>
                  </div>
                }
                </div>

                {/* <div className="px-1 absolute bottom-[10px] flex items-center justify-end w-full md:px-2">
                  {fileType === 'url' && <div className="bg-white rounded-[60px] p-1 cursor-pointer flex items-center justofy-center border border-solid border-[#97A0B5]" onClick={(e) => {
                    e.stopPropagation()
                    setFavorite(prev => !prev)
                  }}>
                    {
                    favorite ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22.5 8.8125C22.5 15.375 12.7697 20.6869 12.3553 20.9062C12.2461 20.965 12.124 20.9958 12 20.9958C11.876 20.9958 11.7539 20.965 11.6447 20.9062C11.2303 20.6869 1.5 15.375 1.5 8.8125C1.50174 7.27146 2.11468 5.79404 3.20436 4.70436C4.29404 3.61468 5.77146 3.00174 7.3125 3C9.24844 3 10.9434 3.8325 12 5.23969C13.0566 3.8325 14.7516 3 16.6875 3C18.2285 3.00174 19.706 3.61468 20.7956 4.70436C21.8853 5.79404 22.4983 7.27146 22.5 8.8125Z" fill="#E50000"/>
                      </svg> :
                    <HeartIcon className={`h-5 w-5 text-[#74778B]}`}/>
                    }
                    
                  </div>}

                  <div className="flex items-center">
                    <div className="cursor-pointer bg-[#FDFDFD] rounded-md flex items-center p-1 border border-solid border-[#97A0B5]" onClick={() => window.open(assetUrl|| '', "_blank")}>
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1 text-[#74778B]"/>
                      <div className="text-[#475467] text-sm">{assetUrl && getDomainFromURL(assetUrl)}</div>
                    </div>
                    
                    <div className="ml-1 md:ml-2 border border-solid border-[#97A0B5] rounded-full w-fit p-1 bg-white cursor-pointer" onClick={() => onOpenImageDialog("thumbnail")}>
                      <PiUploadSimpleLight className="text-[#74778B] h-4 w-4 aspect-square"/>
                    </div>

                  </div>

                </div> */}

        </div>
        }

        {
        selectedType?.name === 'Image' &&
        <div className="relative">
                <div className="gradient-add-bookmark-div">
                  <img src={imageSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) || imageUrl?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`)}
                    alt={title || description || "Image gem"} 
                    className='w-full object-cover block h-[200px] rounded-lg'
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = fallbackURL && fallbackURL !== "" ? fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    }}
                  />
                </div>

                <div className="px-1 absolute bottom-[10px] flex items-center justify-between w-full md:px-2">
                  <div className="bg-white rounded-[60px] p-1 cursor-pointer flex items-center justofy-center border border-solid border-[#97A0B5]" onClick={(e) => {
                    e.stopPropagation()
                    setFavorite(prev => !prev)
                  }}>
                    {
                    favorite ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22.5 8.8125C22.5 15.375 12.7697 20.6869 12.3553 20.9062C12.2461 20.965 12.124 20.9958 12 20.9958C11.876 20.9958 11.7539 20.965 11.6447 20.9062C11.2303 20.6869 1.5 15.375 1.5 8.8125C1.50174 7.27146 2.11468 5.79404 3.20436 4.70436C4.29404 3.61468 5.77146 3.00174 7.3125 3C9.24844 3 10.9434 3.8325 12 5.23969C13.0566 3.8325 14.7516 3 16.6875 3C18.2285 3.00174 19.706 3.61468 20.7956 4.70436C21.8853 5.79404 22.4983 7.27146 22.5 8.8125Z" fill="#E50000"/>
                      </svg> :
                    <HeartIcon className={`h-5 w-5 text-[#74778B]}`}/>
                    }
                    
                  </div>

                  <div className="flex items-center">
                    <div className="cursor-pointer bg-[#FDFDFD] rounded-md flex items-center p-1 border border-solid border-[#97A0B5]" onClick={() => window.open(assetUrl|| '', "_blank")}>
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1 text-[#74778B]"/>
                      <div className="text-[#475467] text-sm">{assetUrl && getDomainFromURL(assetUrl)}</div>
                    </div>

                    <div className="ml-1 md:ml-2 border border-solid border-[#97A0B5] rounded-full w-fit p-1 bg-white cursor-pointer" onClick={() => onOpenImageDialog("thumbnail")}>
                      <PiUploadSimpleLight className="text-[#74778B] h-4 w-4 aspect-square"/>
                    </div>

                  </div>

                </div>

        </div>
        }

        {
        selectedType?.name === 'PDF' &&
        <div>{renderPDFThumbnail()}</div>
        }

        {
        selectedType?.name === 'Note' &&
        <>
        <div className="pt-4">
          <div
            style={{ backgroundColor: `${highlightedColor.bg}` }}
            className=" rounded-md py-2 px-3 border border-[#ABB7C9] relative"
          >
            <div>
              <div
                style={{
                  minHeight: "50px",
                  overflow: "visible",
                  wordBreak: "break-word",
                }}
                ref={highlightRef}
                id="highlightbox"
                onBlur={onHighlightBlur}
                contentEditable={true}
                className={classNames(
                  highlightedColor?.border,
                  "flex-1 text-xs text-black  pl-2 py-0 outline-none highlight-content-container"
                )}
              >
                {highlightedText || audioEnhancedText}
              </div>
            </div>
            <div className="flex justify-between items-center mt-2 space-x-3">
              <div className={`flex space-x-4`}>
                <div
                  className={`cursor-pointer select-none text-xs rounded-full p-[4px] ${
                    showColorOptions && "bg-blue-100 text-blue-500"
                  }`}
                  onClick={handleColorToggle}
                >
                  <IoColorPaletteOutline className="h-5 w-5" />
                </div>
                {showColorOptions && (
                  <div className="flex space-x-2 items-center">
                    {HIGHLIGHTED_COLORS.map((color) => (
                      <button
                        key={color.id}
                        style={{ backgroundColor: `${color.bg}` }}
                        className={classNames(
                          "flex justify-center items-center h-4 w-4 rounded-full border-[1px] border-gray-400"
                        )}
                        onClick={() => {
                          setHighlightedColor(color);
                          setHighlightClass(color.className);
                        }}
                      >
                        <CheckIcon
                          className={classNames(
                            color.id === highlightedColor?.id ? "" : color.text,
                            "h-2 w-2"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <div className="cursor-pointer mr-2" onClick={(e) => {
                    e.stopPropagation()
                    setFavorite(prev => !prev)
                  }}>
                    {
                    favorite ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22.5 8.8125C22.5 15.375 12.7697 20.6869 12.3553 20.9062C12.2461 20.965 12.124 20.9958 12 20.9958C11.876 20.9958 11.7539 20.965 11.6447 20.9062C11.2303 20.6869 1.5 15.375 1.5 8.8125C1.50174 7.27146 2.11468 5.79404 3.20436 4.70436C4.29404 3.61468 5.77146 3.00174 7.3125 3C9.24844 3 10.9434 3.8325 12 5.23969C13.0566 3.8325 14.7516 3 16.6875 3C18.2285 3.00174 19.706 3.61468 20.7956 4.70436C21.8853 5.79404 22.4983 7.27146 22.5 8.8125Z" fill="#E50000"/>
                      </svg> :
                    <HeartIcon className={`h-5 w-5`}/>
                    }
                    
              </div>

              <div
                className="cursor-pointer text-red-500"
                onClick={onTextDelete}
              >
                <TrashIcon className="h-5 w-5 text-red-400" />
              </div>
              </div>
            </div>
          </div>
        </div>
        </>
        }

        {
        selectedType?.name === "Book" &&
        <div className="relative">
                <div className="gradient-add-bookmark-div">
                  <img src={imageUrl?.replace("resize:fill:112:112", "resize:fit:2400")?.replace("resize:fill:40:40", "resize:fit:2400")?.replace("_SY160", "_SY800")?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`)}
                    alt={title || description || "Book gem"} 
                    className='w-full object-cover block rounded-lg'
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src= fallbackURL && fallbackURL !== "" ? fallbackURL?.replace("resize:fill:112:112", "resize:fit:2400")?.replace("resize:fill:40:40", "resize:fit:2400")?.replace("_SY160", "_SY800")?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    }}
                  />
                </div>

                <div className="absolute top-0 right-0 pt-2">
                  <Dropdown
                    menu={{
                      items:bookStatusItems,
                    }}
                    trigger={['click']}
                  >
                    
                    <div >
                      <svg xmlns="http://www.w3.org/2000/svg" width="max-content" height="22" viewBox="0 0 102 30" fill="none">
                        <path d="M100 29.8C100.994 29.8 101.8 28.9941 101.8 28V2C101.8 1.00589 100.994 0.200001 100 0.200001L2.81549 0.200001C1.21352 0.200001 0.409668 2.13545 1.54029 3.27037L12.0253 13.7953C12.8961 14.6694 12.8779 16.0886 11.985 16.9401L1.75311 26.6974C0.577606 27.8183 1.37101 29.8 2.99532 29.8L100 29.8Z" fill={readStatus === 'to-read' ? '#348EE2' : readStatus === 'read' ? '#00D863' : `#EEAF0D`} stroke="white" stroke-width="0.4"/>
                        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16" font-family="Arial, sans-serif" cursor={'pointer'}>
                            {readStatus && readStatus.charAt(0).toUpperCase() + readStatus.slice(1)}
                        </text>
                    </svg>
                    </div>
                  </Dropdown>
                    
                </div>

                <div className="px-1 absolute bottom-[10px] flex items-center justify-between w-full md:px-2">
                  <div className="bg-white rounded-[60px] p-1 cursor-pointer flex items-center justofy-center border border-solid border-[#97A0B5]" onClick={(e) => {
                    e.stopPropagation()
                    setFavorite(prev => !prev)
                  }}>
                    {
                    favorite ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22.5 8.8125C22.5 15.375 12.7697 20.6869 12.3553 20.9062C12.2461 20.965 12.124 20.9958 12 20.9958C11.876 20.9958 11.7539 20.965 11.6447 20.9062C11.2303 20.6869 1.5 15.375 1.5 8.8125C1.50174 7.27146 2.11468 5.79404 3.20436 4.70436C4.29404 3.61468 5.77146 3.00174 7.3125 3C9.24844 3 10.9434 3.8325 12 5.23969C13.0566 3.8325 14.7516 3 16.6875 3C18.2285 3.00174 19.706 3.61468 20.7956 4.70436C21.8853 5.79404 22.4983 7.27146 22.5 8.8125Z" fill="#E50000"/>
                      </svg> :
                    <HeartIcon className={`h-5 w-5 text-[#74778B]}`}/>
                    }
                    
                  </div>

                  <div className="flex items-center">
                    <div className="cursor-pointer bg-[#FDFDFD] rounded-md flex items-center p-1 border border-solid border-[#97A0B5]" onClick={() => window.open(assetUrl|| '', "_blank")}>
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1 text-[#74778B]"/>
                      <div className="text-[#475467] text-sm">{assetUrl && getDomainFromURL(assetUrl)}</div>
                    </div>
                    
                    <div className="ml-1 md:ml-2 border border-solid border-[#97A0B5] rounded-full w-fit p-1 bg-white cursor-pointer" onClick={() => onOpenImageDialog("thumbnail")}>
                      <PiUploadSimpleLight className="text-[#74778B] h-4 w-4 aspect-square"/>
                    </div>

                  </div>

                </div>

        </div>
        }

        {
        selectedType?.name === "Movie" &&
        <div className="relative">
                <div className="gradient-add-bookmark-div">
                  <img src={imageUrl?.replace("resize:fill:112:112", "resize:fit:2400")?.replace("resize:fill:40:40", "resize:fit:2400")?.replace("_SY160", "_SY800")?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`)}
                    alt={title || description || "Movie gem"} 
                    className='w-full object-cover block rounded-lg'
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src=fallbackURL && fallbackURL !== "" ? fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    }}
                  />
                </div>

                <div className="absolute top-0 right-0 pt-2">
                  <Dropdown
                    menu={{
                      items:movieStatusItems,
                    }}
                    trigger={['click']}
                  >
                    
                    <div >
                      <svg xmlns="http://www.w3.org/2000/svg" width="max-content" height="22" viewBox="0 0 102 30" fill="none">
                        <path d="M100 29.8C100.994 29.8 101.8 28.9941 101.8 28V2C101.8 1.00589 100.994 0.200001 100 0.200001L2.81549 0.200001C1.21352 0.200001 0.409668 2.13545 1.54029 3.27037L12.0253 13.7953C12.8961 14.6694 12.8779 16.0886 11.985 16.9401L1.75311 26.6974C0.577606 27.8183 1.37101 29.8 2.99532 29.8L100 29.8Z" fill={watchStatus === 'to-watch' ? '#348EE2' : watchStatus === 'watched' ? '#00D863' : `#EEAF0D`} stroke="white" stroke-width="0.4"/>
                        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16" font-family="Arial, sans-serif" cursor={'pointer'}>
                            {watchStatus && watchStatus.charAt(0).toUpperCase() + watchStatus.slice(1)}
                        </text>
                    </svg>
                    </div>
                  </Dropdown>
                    
                </div>
          
                <div className="px-1 absolute bottom-[10px] flex items-center justify-between w-full md:px-2">
                  <div className="bg-white rounded-[60px] p-1 cursor-pointer flex items-center justofy-center border border-solid border-[#97A0B5]" onClick={(e) => {
                    e.stopPropagation()
                    setFavorite(prev => !prev)
                  }}>
                    {
                    favorite ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22.5 8.8125C22.5 15.375 12.7697 20.6869 12.3553 20.9062C12.2461 20.965 12.124 20.9958 12 20.9958C11.876 20.9958 11.7539 20.965 11.6447 20.9062C11.2303 20.6869 1.5 15.375 1.5 8.8125C1.50174 7.27146 2.11468 5.79404 3.20436 4.70436C4.29404 3.61468 5.77146 3.00174 7.3125 3C9.24844 3 10.9434 3.8325 12 5.23969C13.0566 3.8325 14.7516 3 16.6875 3C18.2285 3.00174 19.706 3.61468 20.7956 4.70436C21.8853 5.79404 22.4983 7.27146 22.5 8.8125Z" fill="#E50000"/>
                      </svg> :
                    <HeartIcon className={`h-5 w-5 text-[#74778B]}`}/>
                    }
                    
                  </div>

                  <div className="flex items-center">
                    <div className="cursor-pointer bg-[#FDFDFD] rounded-md flex items-center p-1 border border-solid border-[#97A0B5]" onClick={() => window.open(assetUrl|| '', "_blank")}>
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1 text-[#74778B]"/>
                      <div className="text-[#475467] text-sm">{assetUrl && getDomainFromURL(assetUrl)}</div>
                    </div>

                    <div className="ml-1 md:ml-2 border border-solid border-[#97A0B5] rounded-full w-fit p-1 bg-white cursor-pointer" onClick={() => onOpenImageDialog("thumbnail")}>
                      <PiUploadSimpleLight className="text-[#74778B] h-4 w-4 aspect-square"/>
                    </div>

                  </div>

                </div>

        </div>
        }

        {
        selectedType?.name === 'Profile' &&
        <div className="relative">
                <div className="gradient-add-bookmark-profile-div flex h-[200px] items-center justify-center border border-solid border-[#97A0B5] rounded-md relative">
                  <Avatar
                        icon={
                            <img
                            src={imageUrl?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`)}
                            alt={title || description || "Profile gem"} 
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src=fallbackURL && fallbackURL !== "" ? fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                            }}
                            />
                        }
                        className="cursor-pointer h-20 w-20 md:h-28 md:w-28 border border-solid border-[#ABB7C9] mb-1"
                    />
                    <div className='cursor-pointer rounded-full bg-[#347AE2] p-1 absolute right-[37%] z-100 bottom-[25%]'
                    onClick={() => onOpenImageDialog("thumbnail")}
                    style={{zIndex:100}}
                    >
                        <PiPencilSimple className="text-white h-3 w-3 aspect-square"/>
                    </div>
                </div>

                {
                showShortEndInput &&
                <div className="absolute bottom-[50%] w-full items-center px-2 z-10 aiInput">
                  <AntInput  addonBefore={"c:"} className='rounded-lg shadow-md outline-none w-full text-black' 
                    size="large"
                    type="text" 
                    style={{background:'white'}}
                    suffix={<XMarkIcon className="text-[#74778B] h-5 w-5 ml-1 aspect-square cursor-pointer" 
                    onClick={e => {
                      e.stopPropagation()
                      setShowShortEndInput(false)
                    }}/>}
                    name="shortendurl"
                    placeholder={selectedType?.name === "Text Expander" ? "Enter expander name" : selectedType?.name === "Ai Prompt" ? "Enter prompt name" : "Enter Shortend URL"}
                    value={shortendurl}
                    onChange={(e) => setShortendurl(e.target.value)}
                    onKeyDown={onKeyDownShortUrl}
                  />
                </div>
                }

                <div className="z-10 px-1 absolute bottom-[10px] flex items-center justify-between w-full md:px-2">
                  <div className="bg-white rounded-[60px] p-1 cursor-pointer flex items-center justofy-center border border-solid border-[#97A0B5]" onClick={(e) => {
                    e.stopPropagation()
                    setFavorite(prev => !prev)
                  }}>
                    {
                    favorite ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22.5 8.8125C22.5 15.375 12.7697 20.6869 12.3553 20.9062C12.2461 20.965 12.124 20.9958 12 20.9958C11.876 20.9958 11.7539 20.965 11.6447 20.9062C11.2303 20.6869 1.5 15.375 1.5 8.8125C1.50174 7.27146 2.11468 5.79404 3.20436 4.70436C4.29404 3.61468 5.77146 3.00174 7.3125 3C9.24844 3 10.9434 3.8325 12 5.23969C13.0566 3.8325 14.7516 3 16.6875 3C18.2285 3.00174 19.706 3.61468 20.7956 4.70436C21.8853 5.79404 22.4983 7.27146 22.5 8.8125Z" fill="#E50000"/>
                      </svg> :
                    <HeartIcon className={`h-5 w-5 text-[#74778B]}`}/>
                    }
                    
                  </div>

                  <div className="flex items-center">
                    <div className="cursor-pointer bg-[#FDFDFD] rounded-md flex items-center p-1 border border-solid border-[#97A0B5]" onClick={() => window.open(assetUrl|| '', "_blank")}>
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1 text-[#74778B]"/>
                      <div className="text-[#475467] text-sm">{assetUrl && getDomainFromURLForBookmark(assetUrl)}</div>
                    </div>

                    <div className={`ml-1 md:ml-2 border border-solid border-[#97A0B5] rounded-full w-fit p-1 cursor-pointer ${showShortEndInput ? 'bg-[#B8D4FE]' : 'bg-white'}`} onClick={(e) => {
                        e.stopPropagation()
                        setShowShortEndInput(!showShortEndInput)
                      }}>
                      <BsLightningCharge className="text-[#74778B] h-4 w-4 aspect-square" />
                    </div>

                    <div className="ml-1 md:ml-2 border border-solid border-[#97A0B5] rounded-full w-fit p-1 bg-white cursor-pointer" onClick={() => onOpenImageDialog("thumbnail")}>
                      <PiUploadSimpleLight className="text-[#74778B] h-4 w-4 aspect-square"/>
                    </div>

                  </div>

                </div>

        </div>
        }

        {
        (selectedType?.name === 'Ai Prompt' || selectedType?.name === 'Text Expander') &&
        <div className="relative">
          {selectedType?.name === 'Ai Prompt' && <div className="flex w-full justify-end group">
            <div className="cursor-pointer ">
              {promptType === 'private' ? <LockClosedIcon className="h-4 w-4"/> : <GlobeAltIcon className="h-4 w-4"/>}
            </div>

            <div className="hidden group-hover:block rounded bg-[#FDFDFD] text-[#475467] py-1 px-2 border border-solid border-[#ABB7C9] shadow absolute top-[-35px] right-0 z-10 text-xs">
              {promptType === 'private' ? 'Private prompt' : 'Public prompt'}
            </div>
          </div>}
          <div className="relative">
          <div className="bg-white p-2 mediaAiDiv">
              <ReactQuill
                theme="snow"
                value={htmlText}
                onChange={onExpnaderChange}
                modules={quillModules}
                style={{ height: 200 }}
              />
        </div>
          </div>
        </div>
        }

        {
        selectedType?.name === 'Code' &&
        <div className="relative">
          <div className='max-h-full w-full bg-gradient-to-t from-[#256F6C] to-[#50BF91] py-[1.2rem] rounded-md'>
                <div className='flex justify-center items-center'>
                    <div className={`bg-[#1A3D71] rounded-md shadow-sm w-full`}>
                        <div className='flex justify-start h-8 pt-[2px] scrollbar-hide'>
                            
                            <div className='bg-gray-700 flex justify-between items-center gap-2 px-2 h-full text-white cursor-pointer'>
                                <button className='flex justify-start items-center gap-1'>
                                    <DocumentTextIcon className='h-3 w-3' />
                                    <span className='text-xs'>index.js</span>
                                </button>
                            </div>
                        </div>
                        <div className='text-[0.7rem] overflow-auto'>
                            <CodeMirror
                                style={{
                                  overflow: 'hidden',
                                  wordBreak: 'break-all',
                                  wordWrap: 'break-word',
                                  flexWrap: 'wrap',
                              }}
                                width={"100%"}
                                indentWithTab={true}
                                value={code}
                                theme={theme}
                                extensions={[extentionLng]}
                                onChange={onCodeChange}
                                minHeight="200px"
                            />
                        </div>
                    </div>
                </div>
          </div>
        </div>
        }

        {
        selectedType?.name === 'Quote' &&
        <>
        {
          <TextareaAutosize
            value={highlightedText}
            onChange={(e) => setHighlightedText(e.target.value)}
            placeholder="Enter quote"
            minRows={4}
            className="w-full rounded-md resize-none !outline-none !focus:outline-none textarea-border h-auto"
          />
        }
        </>
        }

        {
        selectedType?.name === 'SocialFeed' &&
        <div className="relative">
                <div className="gradient-add-bookmark-div">
                  <img src={imageUrl?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`)}
                    alt={title || description || "Socialfeed gem"} 
                    className='w-full object-cover block h-[200px] rounded-lg'
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src=fallbackURL && fallbackURL !== "" ? fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    }}
                  />
                </div>
                <div className="px-1 absolute bottom-[10px] flex items-center justify-between w-full md:px-2">
                  <div className="bg-white rounded-[60px] p-1 cursor-pointer flex items-center justofy-center border border-solid border-[#97A0B5]" onClick={(e) => {
                    e.stopPropagation()
                    setFavorite(prev => !prev)
                  }}>
                    {
                    favorite ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22.5 8.8125C22.5 15.375 12.7697 20.6869 12.3553 20.9062C12.2461 20.965 12.124 20.9958 12 20.9958C11.876 20.9958 11.7539 20.965 11.6447 20.9062C11.2303 20.6869 1.5 15.375 1.5 8.8125C1.50174 7.27146 2.11468 5.79404 3.20436 4.70436C4.29404 3.61468 5.77146 3.00174 7.3125 3C9.24844 3 10.9434 3.8325 12 5.23969C13.0566 3.8325 14.7516 3 16.6875 3C18.2285 3.00174 19.706 3.61468 20.7956 4.70436C21.8853 5.79404 22.4983 7.27146 22.5 8.8125Z" fill="#E50000"/>
                      </svg> :
                    <HeartIcon className={`h-5 w-5 text-[#74778B]}`}/>
                    }
                    
                  </div>

                  <div className="flex items-center">
                    <div className="cursor-pointer bg-[#FDFDFD] rounded-md flex items-center p-1 border border-solid border-[#97A0B5]" onClick={() => window.open(assetUrl|| '', "_blank")}>
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1 text-[#74778B]"/>
                      <div className="text-[#475467] text-sm">{assetUrl && getDomainFromURLForBookmark(assetUrl)}</div>
                    </div>
                    
                    <div className="ml-1 md:ml-2 border border-solid border-[#97A0B5] rounded-full w-fit p-1 bg-white cursor-pointer" onClick={() => onOpenImageDialog("thumbnail")}>
                      <PiUploadSimpleLight className="text-[#74778B] h-4 w-4 aspect-square"/>
                    </div>

                  </div>

                </div>
        </div>
        }

        {
        selectedType?.name === 'Citation' &&
        <>
          <div className="">

          <Select
                value={citation}
                onChange={handleCitationChange}
                placeholder="Select citation"
                showSearch={true}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? "").includes(
                    input.toLowerCase()
                  )
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={CITATIONS.map((c) => {
                  return { value: c, label: c };
                })}
                className={"w-full border border-solid border-[#d9d9d9] my-2"}
              >
                {CITATIONS.map((c) => {
                  return (
                    <Option key={c} value={c}>
                      {c}
                    </Option>
                  );
                })}
          </Select>
          <div className="relative">
            <TextareaAutosize
            value={citationText}
            onChange={(e) => setCitationText(e.target.value)}
            placeholder="Enter citation text"
            minRows={4}
            className="w-full rounded-md resize-none !outline-none !focus:outline-none textarea-border h-auto"
            />
          </div>
          </div>
        </> 
        }

        {
        selectedType?.name === 'Testimonial' &&
        <>
        {
        <div>

          <div className="mb-4">
            <div className="flex items-center justify-between">

            {
            (testimonialAvatar || testimonialAvatarImageSrc) ?
            <div className="cursor-pointer relative border border-solid border-[#97A0B5] rounded-full mr-2 w-fit text-start flex items-center justify-center p-[6px]" onClick={e => {
              e.stopPropagation()
              onUploadFileTestimonialAvatarClick()
            }}>
              <img className={`w-[30px] h-[30px]  rounded-[3px]`} src={testimonialAvatar?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) ||testimonialAvatarImageSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`)} alt={"Curateit - Curate, Save, Search gems of web, 10x your productivity"} onError={(e) => {
                e.target.onerror = null; 
                e.target.src=fallbackURL && fallbackURL !== "" ? fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
              }}/>
              {renderFileTestimonialAvatarUpload()}
              <div className='cursor-pointer rounded-full bg-[#347AE2] p-1 absolute right-[-5px] bottom-[-6px]'>
                  <PiPencilSimple className="text-white h-3 w-3 aspect-square"/>
              </div>
            </div>
            :
            <div className="relative" onClick={e => {
              e.stopPropagation()
              onUploadFileTestimonialAvatarClick()
            }}>
              {renderFileTestimonialAvatarUpload()}
              <div className="border border-solid border-[#97A0B5] rounded-full w-fit p-2 cursor-pointer mr-2">
              <AiOutlineUser className="text-[#74778B] h-6 w-6 aspect-square"/>
              </div>
              <div className='cursor-pointer border border-solid border-[#97A0B5] bg-white rounded-full  p-1 absolute right-[3px] bottom-[-5px]'
              >
                  <PiPencilSimple className="h-3 w-3 aspect-square"/>
              </div>
            </div>
            }

              <Input
              size="medium w-full"
              type="text"
              name="author"
              placeholder="Enter author name"
              value={testimonialAuthor}
              onChange={(e) => setTestimonialAuthor(e.target.value)}
              className='!border-[#97A0B5] w-full rounded-md'
              />
            </div>

            <div className="flex items-center mt-4 justify-end w-full">
              <div className="bg-white rounded-[60px] p-1 cursor-pointer flex items-center justofy-center border border-solid border-[#97A0B5]" onClick={(e) => {
                    e.stopPropagation()
                    setFavorite(prev => !prev)
                  }}>
                    {
                    favorite ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22.5 8.8125C22.5 15.375 12.7697 20.6869 12.3553 20.9062C12.2461 20.965 12.124 20.9958 12 20.9958C11.876 20.9958 11.7539 20.965 11.6447 20.9062C11.2303 20.6869 1.5 15.375 1.5 8.8125C1.50174 7.27146 2.11468 5.79404 3.20436 4.70436C4.29404 3.61468 5.77146 3.00174 7.3125 3C9.24844 3 10.9434 3.8325 12 5.23969C13.0566 3.8325 14.7516 3 16.6875 3C18.2285 3.00174 19.706 3.61468 20.7956 4.70436C21.8853 5.79404 22.4983 7.27146 22.5 8.8125Z" fill="#E50000"/>
                      </svg> :
                    <HeartIcon className={`h-5 w-5 text-[#74778B]}`}/>
                    }
                    
              </div>

              <div className="flex justify-end relative ml-4">
              <Dropdown
              trigger={["click"]}
              dropdownRender={() => dropdownnRender()}
              onOpenChange={handleOpen}
              open={open}
              >
                <div style={{background: getColorForProfilePlatform(testimonialPlatform)}} className="rounded w-7 h-7 flex items-center justify-center cursor-pointer relative">
                {TESTIMONIAL_PLATFORMS_ICON.filter(
                  (t) => t.value === testimonialPlatform || t.name === testimonialPlatform
                )[0]?.icon}
                <div className='cursor-pointer rounded-full bg-[#347AE2] p-1 absolute right-[-10px] bottom-[-8px]'>
                  <PiPencilSimple className="text-white h-3 w-3 aspect-square"/>
                </div>
                </div>
              </Dropdown>
            </div>
            </div>
            
          </div>
          
        {
        testimonialType === 'image' && testimonialAttachImage &&
        <>
        <div className="relative">
                <div className="gradient-add-bookmark-div">
                  <img src={testimonialAttachImage?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`)}
                    alt={title || description || "Testimonial attached image"} 
                    className='w-full object-cover block h-[200px] rounded-lg'
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src=fallbackURL && fallbackURL !== "" ? fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    }}
                  />
                </div>

                <div className={`absolute top-1 right-1 border border-solid border-[#97A0B5] rounded-md w-fit p-1 cursor-pointer bg-white`} onClick={e => {
                    e.stopPropagation()
                    setTestimonialAttachImage('')
                  }}>
                      <TrashIcon className="text-red-400 h-4 w-4 " />
                  </div>
        </div>
        </>
        }

        {
        testimonialType === 'audio' &&
        <>
        {
        (fileType === 'url' && (testimonialAttachAudio || html)) ? 
        <div className="relative">
                <div className="">
                  {html ? <div dangerouslySetInnerHTML={{ __html: html }}/> :
                  <ReactPlayer
                    url={testimonialAttachAudio} 
                    playing={false}
                    controls={true}
                    width="100%"
                    height={'200px'}
                  />}
                </div>

                <div className={`absolute top-[10px] left-1 border border-solid border-[#97A0B5] rounded-md w-fit p-1 cursor-pointer bg-white`} onClick={e => {
                    e.stopPropagation()
                    setHtml('')
                    setTestimonialAttachAudio('')
                  }}>
                      <TrashIcon className="text-red-400 h-4 w-4 " />
                </div>

                {!html && <div className="px-1 absolute bottom-[10px] flex items-center justify-end w-full md:px-2">
                 
                  {testimonialAttachAudio && <div className="flex items-center">
                    <div className="cursor-pointer bg-[#FDFDFD] rounded-md flex items-center p-1 border border-solid border-[#97A0B5]" onClick={() => window.open(testimonialAttachAudio|| '', "_blank")}>
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1 text-[#74778B]"/>
                      <div className="text-[#475467] text-sm">{testimonialAttachAudio && getDomainFromURL(testimonialAttachAudio)}</div>
                    </div>
  
                  </div>}

                </div>}

        </div>
        :
        <></>
        // <div className="relative">
        //         <div className="px-1 md:px-2 flex items-center justify-center h-[100px]">
        //             <audio src={testimonialAttachAudio} autoPlay={false} controls>
        //               <source src={testimonialAttachAudio} />
        //             </audio>
        //           </div>

        //           <div className={`absolute top-[10px] left-1 border border-solid border-[#97A0B5] rounded-md w-fit p-1 cursor-pointer bg-white`} onClick={e => {
        //             e.stopPropagation()
        //             setHtml('')
        //             setTestimonialAttachAudio('')
        //           }}>
        //               <TrashIcon className="text-red-400 h-4 w-4 " />
        //         </div>
        // </div>
        }

        {
        fileType !== 'url' && testimonialAttachAudio &&
        <div className="relative">
                <div className="px-1 md:px-2 flex items-center justify-center h-[100px]">
                    <audio src={testimonialAttachAudio} autoPlay={false} controls>
                      <source src={testimonialAttachAudio} />
                    </audio>
                  </div>

                  <div className={`absolute top-[10px] left-1 border border-solid border-[#97A0B5] rounded-md w-fit p-1 cursor-pointer bg-white`} onClick={e => {
                    e.stopPropagation()
                    setTestimonialAttachAudio('')
                  }}>
                      <TrashIcon className="text-red-400 h-4 w-4 " />
                </div>
        </div>
        }
        </>
        }

        {
        testimonialType === 'video' &&
        <>
        {
        (fileType === 'url' && testimonialAttachVideo) ? 
        <div className="relative">
                <div className="">
                  <ReactPlayer
                    url={testimonialAttachVideo} 
                    playing={false}
                    controls={true}
                    width="100%"
                    height={'200px'}
                  />
                </div>

                <div className={`md:mx-2 absolute top-[10px] left-0 border border-solid border-[#97A0B5] rounded-md w-fit p-1 cursor-pointer bg-white`} onClick={e => {
                    e.stopPropagation()
                    setTestimonialAttachVideo('')
                  }}>
                      <TrashIcon className="text-red-400 h-4 w-4 " />
                </div>

                <div className="px-1 absolute bottom-[10px] flex items-center justify-end w-full md:px-2">
                  <div className="flex items-center">
                    <div className="cursor-pointer bg-[#FDFDFD] rounded-md flex items-center p-1 border border-solid border-[#97A0B5]" onClick={() => window.open(testimonialAttachVideo|| '', "_blank")}>
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1 text-[#74778B]"/>
                      <div className="text-[#475467] text-sm">{testimonialAttachVideo && getDomainFromURLForBookmark(testimonialAttachVideo)}</div>
                    </div>
                  </div>

                </div>

        </div>
        :
        (fileType === 'file' && testimonialAttachVideo) ?
        <div className="relative">
                <div className="">
                  <div className="px-1 md:px-2 flex items-center justify-center">
                    <video autoPlay={false} controls>
                      <source src={testimonialAttachVideo} />
                    </video>
                  </div>
                </div>

                <div className={`md:mx-2 absolute top-[10px] left-5 border border-solid border-[#97A0B5] rounded-md w-fit p-1 cursor-pointer bg-white`} onClick={e => {
                    e.stopPropagation()
                    setTestimonialAttachVideo('')
                  }}>
                      <TrashIcon className="text-red-400 h-4 w-4 " />
                </div>
        </div>
        :
        <></>
        }
        </>
        }

        </div>
        }
        </>
        }


        {
        selectedType?.name === 'Blog'  &&
        <div className="relative">
          <div className="gradient-add-bookmark-div">
                  <img src={imageUrl?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`)}
                    alt={title || description || "Blog cover image"} 
                    className='w-full object-cover block h-[200px] rounded-lg'
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src=fallbackURL && fallbackURL !== "" ? fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                    }}
                  />
          </div>
          <div className="absolute top-0 right-0 pt-2">
            <Dropdown
              menu={{
                items: blogStatusItems,
              }}
              trigger={['click']}
            >
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="max-content" height="22" viewBox="0 0 102 30" fill="none">
                  <path d="M100 29.8C100.994 29.8 101.8 28.9941 101.8 28V2C101.8 1.00589 100.994 0.200001 100 0.200001L2.81549 0.200001C1.21352 0.200001 0.409668 2.13545 1.54029 3.27037L12.0253 13.7953C12.8961 14.6694 12.8779 16.0886 11.985 16.9401L1.75311 26.6974C0.577606 27.8183 1.37101 29.8 2.99532 29.8L100 29.8Z" fill={isReaded === 'read' ? '#00D863'  : `#348EE2`} stroke="white" stroke-width="0.4"/>
                  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16" font-family="Arial, sans-serif" cursor={'pointer'}>
                      {blogStatus && blogStatus.charAt(0).toUpperCase() + blogStatus.slice(1)}
                  </text>
              </svg>
              </div>
            </Dropdown>
              
          </div>
          <div className="px-1 absolute bottom-[10px] flex items-center justify-between w-full md:px-2">
                  <div></div>

                  <div className="flex items-center">
                    <div className="ml-1 md:ml-2 border border-solid border-[#97A0B5] rounded-full w-fit p-1 bg-white cursor-pointer" onClick={() => onOpenImageDialog("thumbnail")}>
                      <PiUploadSimpleLight className="text-[#74778B] h-4 w-4 aspect-square"/>
                    </div>

                  </div>

                </div>
        </div>
        }
        </>
    )
}

export default MediaTypeUIEdit;