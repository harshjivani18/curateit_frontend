'use client'

import './GemProfileContainer.css'
import React, { 
  useEffect, 
  useState, 
  useRef 
}                                       from 'react'
import { useDispatch }                  from 'react-redux'
import axios                            from "axios"
import { 
  Dropdown, 
  Spin, 
  Tag, 
  Typography, 
  Card, 
  Avatar 
}                                       from 'antd'
import ReactPlayer                      from 'react-player';
import { CheckIcon }                    from '@heroicons/react/24/outline';
import { IoColorPaletteOutline }        from 'react-icons/io5';
import { useNavigate, useParams }       from 'react-router-dom';
import { FaReddit }                     from 'react-icons/fa';
import { RiFileCopyLine }               from 'react-icons/ri';
import { 
  AiFillGithub, 
  AiFillLinkedin, 
  AiFillMediumSquare, 
  AiOutlineTwitter 
}                                       from 'react-icons/ai';
import { convertHtmlToReact }           from '@hedgedoc/html-to-react'

import UserHeader                       from './UserHeader'
import ImageCotainer                    from './ImageCotainer'
import GemDetails                       from './GemDetails'
import GemTab                           from './GemTab'
// import { getPlatformProfile } from '../../actions/bookmark'
import CodeEditor                       from '../allHighlights/CodeEditor';
// import MoodboardMediaTypeCard from '../common/views/MoodboardMediaTypeCard';
import QuoteCard                        from '../common/Card/QuoteCard';
import ArticleContainer                 from './ArticleContainer';
import RenderPdf                        from '../pdfComponent/RenderPdf';
import TestimonialCard                  from '../common/Card/TestimonialCard'

import session                          from '../../utils/session';
import { HIGHLIGHTED_COLORS }           from '../../utils/constants';

import { getArticle, getSingleFile }    from '../../actions/gem';
import { updateGem }                    from '../../actions/collection';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const { Paragraph } = Typography
const { Meta } = Card

const GemProfileContainer = ({ collapsed, bookmark, editClicked, openPreview, handleShowAddToBookmark, isInbox = false, videoSeekTime,permissions,gemPublicView=false }) => {
  const dispatch = useDispatch();
  const  navigate = useNavigate();
  const { gemId }            = useParams();
  const videoPlayer = useRef();
  const [html, setHtml] = useState(null);
  const [loading,setLoading] = useState(false)
  const [profileError, setProfileError] = useState("")
  const [colorCode,setColorCode] = useState((bookmark?.media_type === 'Note' || bookmark?.attributes?.media_type === "Note") ? bookmark?.attributes?.media?.color?.colorCode : '')
  const [open, setOpen] = useState(false);
  const [urlFile, setUrlFile] = useState("");
  const [article, setArticle] = useState({});
  const [downloadLink, setDownloadLink] = useState("");
  const [readArticle, setReadArticle] = useState(false);

  const onEditImage = () => {
    const imageCover = bookmark?.attributes?.metaData?.covers && Array.isArray(bookmark?.attributes?.metaData?.covers) && bookmark?.attributes?.metaData?.covers?.length > 0 ? bookmark?.attributes?.metaData?.covers[0] : null;
    const imgSrc = bookmark?.attributes?.S3_link && bookmark?.attributes?.S3_link?.length > 0 ? bookmark?.attributes?.S3_link[0] : bookmark?.attributes?.media?.imageLink || imageCover;

    if (imgSrc === null) return;
    navigate(`/u/${session.username}/image-editor/${bookmark?.id}/${session.token}?url=${imgSrc}`)
  }

  const extractContent = async () => {
    try {
      setLoading(true);
      dispatch(getArticle(bookmark.attributes?.url)).then(res => {
        if(res.payload?.data?.article){
          setArticle(res.payload?.data?.article);
          setLoading(false);
        }else{
          setArticle({})
          setLoading(false);
        }
      })
    } catch (error) {
      setArticle({})
      setLoading(false);
    }
  };

  useEffect(() => {
    if(bookmark?.attributes){
      const getCall = async () => {
        setLoading(true)
        // const url = encodeURIComponent(
        //   `${bookmark?.attributes?.url}`
        // );
        // if(bookmark?.attributes?.media_type === "Link" || bookmark?.attributes?.media_type === "Product"){
        //   fetchFile();
        // }
        if(bookmark?.attributes?.media_type === "Article"){
          extractContent();
        }
        // const text = await fetchTranscript("jLHpTVLifMk");
        // const res = await dispatch(getPlatformProfile(url))
        // if(res.error === undefined && res?.payload?.data?.data?.html){
        //   setHtml(res.payload.data.data.html);
        //   setLoading(false)
        // }
        // else{
        //   setHtml(null)
        //   setLoading(false)
        // }
        if (bookmark?.attributes?.media_type !== "Profile") { 
          setLoading(true)
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
              setLoading(false)
            }
            else {
              setHtml(null)
              setLoading(false)
              setProfileError("")
            }
          }catch(error){
            setHtml(null)
            setLoading(false)
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

      await dispatch(updateGem(gemId, { data: {media} }))
      setColorCode(color.colorCode)  
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
              {convertHtmlToReact(highlightText)}
              {/* {highlightText || ""} */}
          </div>

          <div className='flex items-center justify-center flex-col ml-2 cursor-pointer'>
              <div className={`h-3 w-3 rounded-[50%] bg-[${media.color?.colorCode}]`}></div>
              <RiFileCopyLine className='h-4 w-4 mt-2' onClick={() => onCopyClick(highlightText)} />
          </div>
      </div>
    )
  }

  const renderProfile = () => {
    return loading 
        ? <div className='flex item-center justify-center mt-10 mb-10'><Spin tip="Loading..." /></div> 
        : html && profileError === "" ?
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
    const time =  parseFloat(videoSeekTime.toString().replace(":", ".")).toFixed(2);
    if (videoSeekTime && videoPlayer.current){
      videoPlayer.current.seekTo(time, "seconds");
    }
  }, [videoSeekTime])

  const renderVideoViewer = () => {
    const videoSrc = bookmark?.attributes?.media?.videoLink || bookmark?.attributes?.metaData?.url || ''
    if (videoSrc === '') return <div className='flex items-center mt-2 mb-2'><h4>No Preview Available!</h4></div> 
    return (
      <div className='mt-2 mb-2'>
        <ReactPlayer url={videoSrc}
                    controls={true}
                    width={'100%'}
                    height={'500px'} 
                    ref={videoPlayer} />
      </div>
    )
  }

  const renderAudioViewer = () => {
    const fileType = bookmark?.attributes?.fileType || ''
    const audioSrc = bookmark?.attributes?.media?.audioLink || bookmark?.attributes?.metaData?.url || ''
    if (fileType === "url" && html) return (
      <div className='mt-10 mb-10'>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    )
    if (audioSrc === '') return <div className='flex items-center mt-2 mb-2'><h4>No Preview Available!</h4></div> 
    return (
      <div className='mt-2 mb-2 flex items-center justify-center'>
        <audio controls>
            <source src={audioSrc} type="audio/mp3" />
        </audio>
      </div>
    )
  }

  const renderNoteViewer = () => {
    return (
      <>
      <div className={`bg-[${colorCode}] p-4 rounded-[5px] shadow-md my-2`}>
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
      setLoading(true);
      dispatch(getSingleFile(bookmark?.id)).then(res => {
        if(res?.payload?.data?.data){
          setUrlFile(res?.payload?.data?.data)
          setDownloadLink(res?.payload?.data?.s3Link);
          setLoading(false);
        }else{
          setUrlFile("");
          setDownloadLink("");
          setLoading(false);
        }
      })
    }catch(error){
      setUrlFile("");
      setDownloadLink("");
      setLoading(false);
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
    const image = bookmark?.attributes?.metaData?.covers && Array.isArray(bookmark?.attributes?.metaData?.covers) && bookmark?.attributes?.metaData?.covers?.length > 0 ? bookmark?.attributes?.metaData?.covers[0] : null
    const price = bookmark?.attributes?.media?.price || ''
    const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
    return(
      <div className='w-full flex justify-center items-center my-4 rounded-lg relative flex-col'>
        
        <div className="font-medium text-end w-full text-xl my-2">
          {price}
        </div>

        <img src={image ? image.replace("_SY160", "_SY800")?.replace("_SS135", "_SS500")?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`} className='object-contain max-h-[25rem] max-w-full rounded-lg' 
        alt={bookmark?.attributes?.altInfo || bookmark?.attributes?.title || 'Curateit'} 
        />
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
    const coverImg = bookmark?.attributes?.metaData?.covers && bookmark.attributes?.metaData?.covers?.length > 0 ? bookmark?.attributes?.metaData?.covers[0].replace("resize:fill:48:48", "resize:fit:200") : ""
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
    return (
      <div>
        <TestimonialCard
          avatar={avatarImgSrc || iconImgSrc || `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
          tagLine={tagLine || bookmark?.attributes?.title || ''}
          author={author} product={product} attachImage={attachImage}
          altInfo={bookmark?.attributes?.altInfo || bookmark?.attributes?.title || bookmark?.attributes?.description || 'Curateit'}
          platform={platform} rating={rating} date={date} testimonial={testimonial}
          showDetailsFull={true}
          />
      </div>
    )
  }
  
  const mediaType = bookmark?.media_type || bookmark?.attributes?.media_type || null
  const renderMainContent = () => {
    switch(mediaType) {
      case "Highlight":
        return renderTextHighlight()
      // case "Link":
      // case "Product":
      //   return renderUrl()
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
        return <ArticleContainer bookmark={bookmark} loading={loading} article={article} readArticle={readArticle} />
      case "Citation":
        return renderCitationViewer()
      case "Quote":
        return renderQuoteViewer()
      case "Text Expander":
      case "Ai Prompt":
        return renderTextExpanderView();
      case "Product":
        return renderProductViewer();
      case "Testimonial":
        return renderTestimonialViewer()
      default:
        return <ImageCotainer bookmark={bookmark} openPreview={openPreview} onEditImage={onEditImage} html={html} loading={loading} onOfflineView={fetchFile} urlFile={urlFile} downloadLink={downloadLink} />
    }
  }


    return (
        <div 
        className={`m-4 md:mt-0 ${(collapsed && !isInbox) ? 'mx-2 md:mx-4 lg:mx-[15rem]' : (!collapsed && !isInbox) ? 'ml-2 md:ml-4 lg:ml-[15rem] mr-2 mt-4' :'' }`}
        >
            <h1 className='text-lg font-semibold text-custom-black'>{(bookmark?.attributes?.title && bookmark?.attributes?.title.length > 150 ? bookmark?.attributes?.title.substring(0, 150) + '...' : bookmark?.attributes?.title) || 'No Title'}</h1>
            <Paragraph className='text-sm text-gray-700 mb-2'
                       ellipsis={{
                        rows: 2,
                        expandable: true,
                        symbol: 'Read More',
                       }}>
              {bookmark?.attributes?.description}
            </Paragraph>
            <UserHeader bookmark={bookmark} editClicked={editClicked} html={html} setReadArticle={setReadArticle} permissions={permissions} gemPublicView={gemPublicView}/>
            {renderMainContent()}
            <GemDetails bookmark={bookmark} showAddToBookmark={handleShowAddToBookmark} videoPlayer={videoPlayer} permissions={permissions} gemPublicView={gemPublicView}/>
            <GemTab bookmark={bookmark} gemPublicView={gemPublicView}/>
        </div>
    )
}

export default GemProfileContainer