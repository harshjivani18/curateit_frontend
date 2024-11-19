'use client'

import { Dropdown, Spin, Tag, Typography, Card, Avatar, Tabs,Input } from 'antd'
import GemHeader from "./GemHeader";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUrlHighlights, getArticle, getSingleFile } from '@actions/gems';
import { updateGem } from '@actions/collection';
import { CheckIcon } from '@heroicons/react/24/outline';
import { RiFileCopyLine } from 'react-icons/ri';
import ReactPlayer from 'react-player';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { AiFillGithub, AiFillLinkedin, AiFillMediumSquare, AiOutlineTwitter } from 'react-icons/ai';
import { FaReddit } from 'react-icons/fa';
import axios from 'axios';
import { HIGHLIGHTED_COLORS, getDomainFromURL } from '@utils/constants';
// import GemBottomDetails from './GemBottomDetails';
import { convertHtmlToReact } from '@hedgedoc/html-to-react';
import TestimonialCard from '@components/views/card/TestimonialCard';
import QuoteCard from '@components/views/card/QuoteCard';
import session from '@utils/session';
import CodeEditor from '@components/allHighlights/CodeEditor';
import ArticleContainer from '@components/GemProfile/ArticleContainer';
import GemTab from '@components/GemProfile/GemTab';
import { useRouter } from 'next/navigation';
import RenderPdf from '@components/common/RenderPdf';
import ImageContainer from '../../components/GemProfile/ImageContainer';
import Transcript from '@components/transcript/Transcript';
import AllHighlights from '@components/allHighlights/AllHighlights';
import slugify from 'slugify';
// import TextareaAutosize from "react-textarea-autosize";
const { TextArea } = Input;

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const { Paragraph } = Typography
const { Meta } = Card

const DEFAULT_STATUS = {
    dark_mode : false,
    showFontSize: false,
    showFontFamily: false,
    showColorPallate: false
}

const GemDetails = ({id,collapsed,bookmark,editClicked,openPreview,handleShowAddToBookmark,showComment,videoSeekTime, onSEOShow,
                      permissions,gemPublicView=false,videoSeekTo,isInboxView,onCountUpdate,isFeedBackGem=false,allComments}) => {

  const dispatch = useDispatch();
  const  navigate = useRouter();
  const videoPlayer = useRef();
  const [html, setHtml] = useState(null);
  const [articleLoading,setArticleLoading] = useState(false)
  const [profileError, setProfileError] = useState("")
  const [colorCode,setColorCode] = useState((bookmark?.media_type === 'Note' || bookmark?.attributes?.media_type === "Note") ? bookmark?.attributes?.media?.color?.colorCode : '')
  const [colorClass, setColorClass] = useState((bookmark?.media_type === 'Note' || bookmark?.attributes?.media_type === "Note") ? bookmark?.attributes?.media?.color?.className : '')
  const [open, setOpen] = useState(false);
  const [urlFile, setUrlFile] = useState("");
  const [article, setArticle] = useState({});
  const [downloadLink, setDownloadLink] = useState("");
  const [readArticle, setReadArticle] = useState(false);
  //for articles
  const [setting, setSetting] = useState(DEFAULT_STATUS);
  const [fontSize, setFontSize] = useState(1);
  const [fontFamily, setFontFamily] = useState("sans-font");
  const [textColor, setTextColor] = useState("#000000");
  const [articleLoader,setArticleLoader] = useState(false)
  const [tabKey,setTabKey] = useState('Highlight')
  const [highlights, setHighlights] = useState([]);
  const {isMobileView} = useSelector(state => state.app)
  const currentGem = useSelector(state => state.gems?.currentGem);

  useEffect(() => {
    if (bookmark?.attributes?.url?.startsWith("https://www.youtube.com/") && isMobileView) {
      const bData = (bookmark?.attributes?.media_type !== "Article" && bookmark?.attributes?.media_type !== "Link") ? currentGem?.attributes?.child_gem_id?.data : []
      if ((!bData || bData.length === 0) && bookmark?.attributes?.url) {
        const NOT_HIGHLIGHT_TYPES = [
          "Note",
          "Quote",
          "Image",
          "Text Expander",
          "Ai Prompt",
          "Highlight"
        ]
        const bData = (bookmark?.attributes?.media_type !== "Article" && bookmark?.attributes?.media_type !== "Link") ? currentGem?.attributes?.child_gem_id?.data : []
        if ((!bData || bData.length === 0) && bookmark?.attributes?.url && NOT_HIGHLIGHT_TYPES.indexOf(bookmark?.attributes?.media_type) === -1) {
          dispatch(fetchUrlHighlights(bookmark?.attributes?.url)).then((res) => {
            if (res.error === undefined) {
              setHighlights(res?.payload?.data?.map((h) => ({ id: h?.id, attributes: h })))
            }
          })
        }
      }
    }
  }, [dispatch, currentGem, bookmark,isMobileView])

  const handleTabChange = (key) => {
        setTabKey(key)
    }

  const onEditImage = () => {
    const imageCover = bookmark?.attributes?.metaData?.covers && Array.isArray(bookmark?.attributes?.metaData.covers) && bookmark?.attributes?.metaData.covers.length > 0 ? bookmark?.attributes?.metaData.covers[0] : null;
    const imgSrc = bookmark?.attributes?.S3_link && bookmark?.attributes?.S3_link?.length > 0 ? bookmark?.attributes?.S3_link[0] : bookmark?.attributes?.media?.imageLink || imageCover;

    if (imgSrc === null) return;
    navigate.push(`/u/${session.username}/image-editor/${bookmark?.id}/${session.token}?url=${imgSrc}`)
  }

  const extractContent = async () => {
    try {
      setArticleLoader(true);
      // dispatch(getArticle(bookmark.attributes?.url)).then(res => {
      //   if(res.payload?.data?.article){
      //     setArticle(res.payload?.data?.article);
      //     setArticleLoading(false);
      //   }else{
      //     setArticle({})
      //     setArticleLoading(false);
      //   }
      // })
      const res = await dispatch(getArticle(bookmark.attributes?.url))
      if(res.error === undefined){
        setArticle(res.payload?.data?.article)
        setArticleLoader(false)
      }else{
        setArticle({})
        setArticleLoader(false);
      }
    } catch (error) {
      setArticle({})
      setArticleLoader(false);
    }
  };

  useEffect(() => {
    if(bookmark?.attributes){
      const getCall = async () => {
        if(bookmark?.attributes?.media_type === "Article"){
          extractContent();
        }
      
        if (bookmark?.attributes?.media_type !== "Profile") { 
          setArticleLoading(true)
          const oUrl    = bookmark?.attributes?.url
          const mainUrl = oUrl && oUrl.startsWith("http:") ? oUrl.replace("http:", "https:") : oUrl || ""
          const url     = encodeURIComponent(
            `${mainUrl}`
          );
          const KEY = process.env.NEXT_PUBLIC_IFRAMELY_API_KEY;
          try{
            const res = await axios.get(`https://cdn.iframe.ly/api/iframely/?url=${url}&api_key=${KEY}&iframe=1&omit_script=1`, {
              'Accept': 'application/json',
              'Accept-Encoding': 'identity'
            })
            if (res.error === undefined && res?.data) {
              if (res.data.links?.player?.length > 0 && res.data.links?.player[0]?.html) {
                setHtml(res.data.links?.player[0]?.html)
              }
              else if (res.data.links?.summary?.length > 0 && res.data.links?.summary[0]?.message) {
                setHtml(res.data.links?.summary[0]?.html)
                setProfileError(res.data.links?.summary[0]?.message)
              }
              else if (res.data.error) {
                setProfileError(res.data.error)
              }
              else {
                setHtml(res?.data?.html);
              }
              setArticleLoading(false)
            }
            else {
              setHtml(null)
              setArticleLoading(false)
              setProfileError("")
            }
          }catch(error){
            setHtml(null)
            setArticleLoading(false)
            setProfileError("")
          }
          
        }
      }

    getCall();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmark, dispatch])

  const handleOpen = (flag) => {
    setOpen(flag);
  };

  const handleUpdateNoteColor = async (color) => {
      const media  = {
          ...bookmark?.attributes.media,
          color: color,
          styleClassName:color.className
      }

      await dispatch(updateGem(id, { data: {media} }))
      setColorCode(color.colorCode)  
      setColorClass(color.className)
      setOpen(false)
  }

  const dropdownnRenderUI = () => {
    return(
      <div className='dropdown-content px-[10px] py-[5px] rounded z-9999'>
        <div className='flex items-center'>
        {HIGHLIGHTED_COLORS.map(color => (
          <button 
            key={color.id} 
            style={{backgroundColor: `${color.bg}`}}
            className={classNames('flex justify-center items-center h-5 w-5 rounded-full border-[1px] border-gray-400 mx-1')}
            onClick={() => handleUpdateNoteColor(color)}
          >
            {
              color.colorCode === colorCode ? 
              <CheckIcon className='h-2 w-2'
            /> : ''
            }
          </button>
        ))}
      </div>
      </div>
    )
  }

  const onCopyClick = (text) => {
    navigator.clipboard.writeText(text)
  }

  const renderTextHighlight = () => {
    const media         = bookmark?.media || bookmark?.attributes?.media || null
    if (media === null) return null
    const highlightText = media.text || media.details?.text || ''
    return (
      <div className='h-fit flex items-end mb-5 mt-5'>
          <div 
          style={{
              borderLeftColor: media.color?.colorCode,
              borderLeftWidth: '4px',
              borderLeftStyle: 'solid'
          }}
          className='pl-1 flex flex-col items-center'
          >
              {/* {highlightText || ""} */}
              {convertHtmlToReact(highlightText)}

          </div>

          <div className='flex items-center justify-center flex-col ml-2 cursor-pointer'>
              <div className={`h-3 w-3 rounded-[50%] bg-[${media.color?.colorCode}]`}></div>
              <RiFileCopyLine className='h-4 w-4 mt-2' onClick={() => onCopyClick(highlightText)} />
          </div>
      </div>
    )
  }

  const renderProfile = () => {
    return articleLoading 
        ? <div className='flex item-center justify-center mt-10 mb-10'><Spin tip="Loading..." /></div> 
        : (html && profileError === "") ?
            <div className='mt-10 mb-10'>
              {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
            </div>
          : <div className='flex item-center justify-center mt-10 mb-10'>{profileError !== "" ? profileError : "No Profile Found"}</div>
  }

  const renderPDFViewer = () => {
    const pdfUrl = bookmark?.attributes?.S3_link?.length > 0 ? bookmark?.attributes?.S3_link[0] : bookmark?.attributes?.media?.pdfLink ? bookmark?.attributes?.media?.pdfLink : bookmark?.attributes?.url ? bookmark?.attributes?.url : null
      return <RenderPdf bookmark={{ ...bookmark, ...bookmark.attributes }} url={ pdfUrl } />
  }

  const renderCodeViewer = () => {

    return (
      bookmark?.attributes?.media ? <div className='mt-2'><CodeEditor media={bookmark?.attributes?.media} /></div> : null
    )
  }

  useEffect(() => {
    if(videoSeekTime){
      const [minutes, seconds] = videoSeekTime.split(':');
      const timeInSeconds = parseInt(minutes) * 60 + parseInt(seconds);
      
      if (videoPlayer && videoPlayer.current) {
        videoPlayer.current.seekTo(timeInSeconds);
      }
    }
  }, [videoSeekTime])

  const renderTranscript = () => {
        return(
            <div className="w-full h-[400px]">
              <Transcript
                url={bookmark?.attributes?.url} 
                mediaType={bookmark?.attributes?.media_type}
                user={{ id: bookmark?.attributes?.author?.data?.id, username: bookmark?.attributes?.author?.data?.attributes?.username }}
                videoSeekTo={videoSeekTo}
              />
            </div>
        )
    }

  const renderHighlight = () => {
        return(
            <div className="w-full h-[400px] overflow-y-scroll">
              {currentGem?.attributes?.media_type !== "Article" && bookmark?.attributes?.media_type !== "Link" && currentGem?.attributes?.child_gem_id &&
                      currentGem?.attributes?.child_gem_id?.data &&
                      Array.isArray(currentGem?.attributes?.child_gem_id?.data) &&
                      currentGem?.attributes?.child_gem_id?.data.length > 0 ? (
                        <div className='p-2'>
                          <AllHighlights
                            allHighlights={currentGem?.attributes?.child_gem_id?.data}
                            user={currentGem?.attributes?.author?.data?.attributes}
                            isSidebar={true}
                            width={'100%'}
                          />
                        </div>
                      )
                      : highlights.length !== 0 ? (
                        <div className='p-2'>
                          <span className='font-bold text-lg mb-2'>Highlights</span>
                          <AllHighlights
                            allHighlights={highlights}
                            user={currentGem?.attributes?.author?.data?.attributes}
                          />
                        </div>
                        ) : (
                          <div className="text-center py-4">
                            <span>No highlight available</span>
                          </div>
                        )
                      }
            </div>
        )
    }

  const renderVideoViewer = () => {
    const videoSrc = bookmark?.attributes?.media?.videoLink || (bookmark?.attributes?.S3_link && bookmark?.attributes?.S3_link?.length>0 && bookmark?.attributes?.S3_link[0] ) || bookmark?.attributes?.metaData?.url || bookmark?.attributes?.url || bookmark?.attributes?.media?.mediaEndpoint || ''
    const fileType = bookmark?.attributes?.fileType || ''
    const isYoutube = bookmark?.attributes?.url?.startsWith("https://www.youtube.com/")
    if (videoSrc === '') return <div className='flex items-center mt-2 mb-2'><h4>No Preview Available!</h4></div> 
    if(videoSrc && fileType === 'url'){
      return (
      <>
      <div className='mt-2 mb-2 flex w-full items-center justify-center'>
        <ReactPlayer url={videoSrc}
                    controls={true}
                    // height={'500px'} 
                    ref={videoPlayer} />
      </div>
      {
      (isYoutube && isMobileView) ? 
      <>
      <Tabs
        defaultActiveKey={tabKey}
        onChange={handleTabChange}
        items={[
          {
            label: `Highlight`,
            key: 'Highlight',
            children: renderHighlight(),
          },
          {
            label: `Transcript`,
            key: 'Transcript',
            children: renderTranscript(),
          },
        ]}
      />
      </>
      : <></>
      }
      </>
    )
    }

    if(videoSrc && fileType === 'file'){
      return(
        <div className="flex items-center justify-center">
          <ReactPlayer url={videoSrc}
            controls={true}
            height={'500px'} 
            ref={videoPlayer} />
        </div>
      )
    }
  }

  const renderAudioViewer = () => {
    const fileType = bookmark?.attributes?.fileType || ''
    const title = bookmark?.attributes?.title || bookmark?.media?.audioOriginalText || ''
    const audioSrc = bookmark?.attributes?.media?.audioLink || (bookmark?.attributes?.S3_link && bookmark?.attributes?.S3_link?.length>0 && bookmark?.attributes?.S3_link[0] ) || bookmark?.attributes?.metaData?.url || bookmark?.attributes?.url || bookmark?.attributes?.media?.mediaEndpoint || ''
    if (fileType === "url" && html) return (
      <div className='mt-10 mb-10 flex w-full items-center justify-center'>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    )
    if (audioSrc === '') return <div className='flex items-center mt-2 mb-2'><h4>No Preview Available!</h4></div> 
    return (
      <>
      <div className='mt-2 mb-2 flex flex-col items-center justify-center'>
        <audio controls>
            <source src={audioSrc} type="audio/mp3" />
        </audio>

      {
      fileType === 'record' && title &&
      <TextArea
          className="w-full rounded-md md:w-[50%] mt-2 text-xs overflow-auto border-[#ABB7C9] focus:border-none hover:border-[#ABB7C9] "
          type="text"
          name="original text"
          placeholder="Original Transcript"
          contentEditable={false}
          size="large"
          value={title}
        />
      }
      </div>
      
      </>
    )
  }

  const renderNoteViewer = () => {
    return (
      <>
      <div className={`bg-[${colorCode}] ${colorClass} p-4 rounded-[5px] shadow-md my-2`}>
        <div className='mb-4'>
          {bookmark?.attributes?.media?.text}
        </div>

        <div className='flex items-center justify-end'>
          <Dropdown
            overlayStyle={{ zIndex: 9999 }}
            trigger={["click"]}
            dropdownRender={() => dropdownnRenderUI()}
            onOpenChange={handleOpen}
            open={open}
          >
          <IoColorPaletteOutline className='h-5 w-5 cursor-pointer'/>
        </Dropdown>
        </div>
      </div>
      </>
    )
  }

  const renderCitationViewer = () => {
    const credibility = bookmark?.attributes?.media?.credibility || ''
    const citationDate= bookmark?.attributes?.media?.citationDate || ''
    const citationAuthor= bookmark?.attributes?.media?.citationAuthor || ''
    const citation_format= bookmark?.attributes?.media?.citation_format || ''
    return (
      <>
      <div className={`bg-white p-4 rounded-[5px] shadow-md my-2 border border-solid border-[#d9d9d9]`}>
        <div className='mb-4'>
          {bookmark?.attributes?.media?.citation}
        </div>

        <div className='flex flex-col items-start justify-start w-full md:flex-row md:items-center md:justify-between'>
            <div className='mb-1 flex flex-col items-start justify-start md:mb-0'>
              <div className='block text-xs font-medium text-gray-500 md:mb-1'>Citation style</div>
              <div>{citation_format.length > 50 ? citation_format.substring(0, 50) + '...' : citation_format}</div>
            </div>

            <div className='mb-1 flex flex-col items-start justify-start md:mb-0'>
              <div className='block text-xs font-medium text-gray-500 md:mb-1'>Author</div>
              <div>{citationAuthor}</div>
            </div>

            <div className='mb-1 flex flex-col items-start justify-start md:mb-0'>
              <div className='block text-xs font-medium text-gray-500 md:mb-1'>Accessed date</div>
              <div>{citationDate}</div>
            </div>

            <div className='mb-1 flex flex-col items-start justify-start md:mb-0'>
              <div className='block text-xs font-medium text-gray-500 md:mb-1'>Credibility</div>
              <Tag className='capitalize' color={credibility === 'low' ? 'green' : credibility === 'medium' ? 'orange' : 'red' }>{credibility}</Tag>
            </div>
            
        </div>
      </div>
      </>
    )
  }

  const fetchFile = async () => {
    try{
      setArticleLoading(true)
      dispatch(getSingleFile(bookmark?.id)).then(res => {
        if(res?.payload?.data?.data){
          setUrlFile(res?.payload?.data?.data)
          setDownloadLink(res?.payload?.data?.s3Link);
          setArticleLoading(false)
        }else{
          setUrlFile("");
          setDownloadLink("");
          setArticleLoading(false)
        }
      })
    }catch(error){
      setUrlFile("");
      setDownloadLink("");
      setArticleLoading(false)
    }
  } 

  const onRefreshedContent = async () => {
    setArticleLoading(true)
    const urlFileRes = await dispatch(getSingleFile(bookmark?.id, true))
    setArticleLoading(false)
    if(urlFileRes?.payload?.data?.data){
      setUrlFile(urlFileRes?.payload?.data?.data)
      setDownloadLink(urlFileRes?.payload?.data?.s3Link);
    }
  }


  // const renderMoodboardView = () => {
  //   return (
  //       <MoodboardMediaTypeCard
  //         item={{ ...bookmark, ...bookmark.attributes }}
  //         showComment={false}
  //         checkedBookmark={[]}
  //         showEdit={false}
  //         showAddToBookmark={false}
  //         hideGemEngagement = {true}
  //       />)
  // }

  const renderTextExpanderView = () => {
    let text = bookmark?.attributes?.expander && bookmark?.attributes?.expander.filter(ex => ex.type === 'expander' || ex.type === 'prompt')[0]?.text

    // let textWithoutSpaces = text?.replace(/\s/g, '');
    let textWithoutSpaces = text;
    textWithoutSpaces = textWithoutSpaces?.replace(/(\()([\w\s]+)(\))/g, '<span class="variable-container"><span placeholder="$1" id="variable__$1" class="variable-input" list="$1"></span><datalist id="$1"></datalist></span>')
                    .replace(/(\{)([\w\s]+)(\})/g, '<span class="variable-container"><span placeholder="$2" id="variable__$2" class="variable-input" list="$2"></span><datalist id="$2"></datalist></span>');

    return (
      <div className='mt-2 flex items-center flex-col'>
        <div className="mood-word-wrap" dangerouslySetInnerHTML={{__html: textWithoutSpaces}} />
      </div>
    )
  }

  const renderProductViewer = () => {
    const image = bookmark?.attributes?.metaData?.covers && Array.isArray(bookmark?.attributes?.metaData.covers) && bookmark?.attributes?.metaData.covers.length > 0 ? bookmark?.attributes?.metaData.covers[0] : null
    const price = bookmark?.attributes?.media?.price || ''
    const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
    return(
      <div className='w-full flex justify-center items-center my-4 rounded-lg relative flex-col'>
        
        <div className="font-medium text-end w-full text-xl my-2">
          {price}
        </div>

        <img src={image ? image.replace("_SY160", "_SY800")?.replace("_SS135", "_SS500")?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/800x800_contain`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`} className='object-contain max-h-[25rem] max-w-full rounded-lg' 
        alt={bookmark?.attributes?.altInfo || bookmark?.attributes?.title || bookmark?.attributes?.description || 'Curateit'} 
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src=bookmark?.attributes?.metaData?.fallbackURL ? bookmark?.attributes?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
        }} />
    </div>
    )
  }

  const renderProfileIcon = (platform) => {
    switch(platform) {
      case "Twitter":
        return <AiOutlineTwitter className='h-5 w-5 text-[#50b7f5]'/>
      case "Reddit":
        return <FaReddit className='h-5 w-5 text-[#ff4500]'/>
      case "Medium":
        return <AiFillMediumSquare className='h-5 w-5 text-[#000]'/>
      case "Github":
        return <AiFillGithub className='h-5 w-5'/>
      case "LinkedIn":
        return <AiFillLinkedin className='h-5 w-5 text-[#50b7f5]'/>
      default:
        return null
    }
  }

  const renderName = (name, platform) => {
    return (
      <div className="profile-card-name-container">
        <div className="profile-card-name">{name}</div>
        <div className="profile-card-verified-icon">
          {renderProfileIcon(platform)}
        </div>
      </div>
    )
  }

  const renderProfileView = () => {
    const name     = bookmark?.attributes?.title
    const platform = bookmark?.attributes?.platform
    const desc     = bookmark?.attributes?.description
    const coverImg = bookmark?.attributes?.metaData?.covers && bookmark.attributes?.metaData?.covers.length > 0 ? bookmark?.attributes?.metaData?.covers[0].replace("resize:fill:48:48", "resize:fit:200") : ""
    return (
      <div className='flex flex-col items-center justify-center w-full'>
        <Card cover={
          <div className='w-full flex items-center justify-center mt-3'>
            <Avatar src={coverImg !== "" ? coverImg : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/user.png`} className='w-[100px] h-[100px]' />
          </div>
        }
            className='w-[250px] h-auto mt-4'
            >
          <Meta title={renderName(name, platform)} description={desc} />
          <div className='profile-link-container mt-2'>
            <a href={bookmark?.attributes?.url} target='_blank' rel="noreferrer" className='text-blue-500 hover:text-blue-600'>View Profile</a>
          </div>
        </Card>
      </div>
    )
  }

  const renderQuoteViewer = () => {
    return (
      <div>
        <QuoteCard quote={bookmark?.attributes?.media?.text || ""} />
      </div>
    )
  }

  const renderTestimonialViewer = () => {
    const avatarImgSrc = (bookmark?.attributes?.metaData && bookmark?.attributes?.metaData?.covers?.length !== 0) ? bookmark?.attributes?.metaData?.covers[0] : ''
    const iconImgSrc = (bookmark?.attributes?.metaData && bookmark?.attributes?.metaData.length !== 0) ? bookmark?.attributes?.metaData?.icon : ''
    const tagLine = bookmark?.attributes?.media?.tagLine || ''
    const author = bookmark?.attributes?.media?.author || ''
    const product = bookmark?.attributes?.media?.product || ''
    const attachImage = bookmark?.attributes?.media?.attachImage || ''
    const platform = bookmark?.attributes?.media?.platform || bookmark?.attributes?.platform
    const rating = bookmark?.attributes?.media?.rating || ''
    const date = bookmark?.attributes?.media?.date || ''
    const testimonial = bookmark?.attributes?.media?.testimonial || ''
    const testimonialType = bookmark?.attributes?.media?.testimonialType || ''
    const attachAudio = bookmark?.attributes?.media?.attachAudio || ''
    const attachVideo = bookmark?.attributes?.media?.attachVideo || ''
    const fileType = bookmark?.attributes?.media?.fileType || ''
    const html = bookmark?.attributes?.media?.html || ''
    return (
      <div className='w-full flex items-center justify-center'>
        <TestimonialCard
          avatar={avatarImgSrc || iconImgSrc || `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
          tagLine={tagLine || bookmark?.attributes?.title || ''}
          author={author} product={product} attachImage={attachImage}
          platform={platform} rating={rating} date={date} testimonial={testimonial}
          altInfo={bookmark?.attributes?.altInfo || bookmark?.attributes?.title || bookmark?.attributes?.description || ''}
          showDetailsFull={true}
          testimonialType={testimonialType} 
          attachAudio={attachAudio} attachVideo={attachVideo} fileType={fileType} html={html}
          />
      </div>
    )
  }
  
  const mediaType = bookmark?.media_type || bookmark?.attributes?.media_type || null
  const renderMainContent = () => {
    switch(mediaType) {
      case "Highlight":
        return renderTextHighlight()
      case "Profile":
        return renderProfileView()
      case "SocialFeed":
        return renderProfile()
      case "PDF":
        return renderPDFViewer()
      case "Code":
        return renderCodeViewer()
      case "Video":
        return renderVideoViewer()
      case "Audio":
        return renderAudioViewer()
      case "Note":
        return renderNoteViewer()
      case "Article":
        return <ArticleContainer bookmark={bookmark} loading={articleLoader} article={article} readArticle={readArticle} 
        setReadArticle={setReadArticle} setting={setting} fontSize={fontSize} fontFamily={fontFamily} textColor={textColor} gemPublicView={gemPublicView}
        />
      case "Citation":
        return renderCitationViewer()
      case "Quote":
        return renderQuoteViewer()
      case "Text Expander":
      case "Ai Prompt":
        return renderTextExpanderView()
      case "Product":
        return renderProductViewer()
      case "Testimonial":
        return renderTestimonialViewer()
      default:
        return <ImageContainer pageId={id} onFetchURL={fetchFile} bookmark={bookmark} openPreview={openPreview} onEditImage={onEditImage} html={html} loading={articleLoading}  urlFile={urlFile} downloadLink={downloadLink} onRefreshedClick={onRefreshedContent}
        // onOfflineView={fetchFile}
        />
    }
  }

  
  const HighlightPreview = () => {
    return (
      <div>
        <ImageContainer
          pageId={id}
          onFetchURL={fetchFile}
          bookmark={bookmark}
          openPreview={openPreview}
          onEditImage={onEditImage}
          html={html}
          loading={articleLoading}
          urlFile={urlFile}
          downloadLink={downloadLink}
          onRefreshedClick={onRefreshedContent}
          isFeedBackGem={isFeedBackGem}
          allComments={allComments}
        />
      </div>
    );
  };

  const onParentGemClick = (gem, gemId) => {
    navigate.push(`/u/${session.username}/g/${gemId}/${gem?.slug || slugify(gem?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}`)
    // const author =  gem?.attributes?.author?.data?.attributes?.username || 'default'
    // const title =  gem?.attributes?.title
    // const gemId =  gem?.id
    // navigate.push(`/u/${author}/g/${gemId}/${slugify(title || 'default', { lower: true, remove: /[0-9&,+()$~%.'":*?<>{}/\/]/g })}`)
  }
  
    return(
        <div>
        {/* header */}
        <GemHeader
        bookmark={bookmark}
        setReadArticle={setReadArticle}
        html={html}
        editClicked={editClicked}
        permissions={permissions} gemPublicView={gemPublicView}
        article={article}
        setting={setting}
        onSEOShow={onSEOShow}
        setSetting={setSetting} setFontFamily={setFontFamily} setFontSize={setFontSize} setTextColor={setTextColor}
        onOfflineView={fetchFile} isInboxView={isInboxView}
        onCountUpdate={onCountUpdate}
        />

        {/* details */}
        {!isFeedBackGem && 
        <div className='px-4 mt-4 relative'>
            {
            (mediaType === 'Ai Prompt' ||  mediaType === 'Text Expander') ? <></> :
            <>
            <h1 className='text-lg font-semibold text-custom-black'>{(bookmark?.attributes?.title && bookmark?.attributes?.title.length > 150 ? bookmark?.attributes?.title.substring(0, 150) + '...' : bookmark?.attributes?.title) || 'No Title'}</h1>
            <Paragraph className='text-sm text-gray-700 mb-2'
                        ellipsis={{
                            rows: 2,
                            expandable: true,
                            symbol: 'Read More',
                        }}>
                {bookmark?.attributes?.description}
            </Paragraph>
            </>

            }
            <div className='mb-2 flex items-center'>
              {mediaType !== 'Article' && <div className='truncate text-[#1890ff] hover:text-[#40a9ff] underline cursor-pointer' onClick={() => window.open(bookmark?.attributes?.url)}>{`${getDomainFromURL(bookmark?.attributes?.url)}`}</div>}
              {bookmark?.attributes?.parent_gem_id?.data?.attributes && <div className='ml-2 cursor-pointer' onClick={() => {
                if(gemPublicView){
                  return;
                }
                onParentGemClick(bookmark?.attributes?.parent_gem_id?.data?.attributes, bookmark?.attributes?.parent_gem_id?.data?.id)
              }} >
                <div className='text-[#1890ff] hover:text-[#40a9ff]'>Go to parent gem</div>
              </div>}
            </div>
            {renderMainContent()}
            {/* <GemBottomDetails bookmark={bookmark} showAddToBookmark={handleShowAddToBookmark} permissions={permissions} gemPublicView={gemPublicView} /> */}
            {!isMobileView &&  <GemTab bookmark={bookmark} gemPublicView={gemPublicView}  />}
        </div>
        }
        {isFeedBackGem && <HighlightPreview/> }
        </div>
    )
}

export default GemDetails;