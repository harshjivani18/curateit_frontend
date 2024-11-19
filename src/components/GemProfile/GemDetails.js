'use client'

import React, { useState }                from 'react'
import { CheckIcon, FolderOpenIcon }      from '@heroicons/react/24/outline'
import { RiFileCopyLine }                 from 'react-icons/ri';
import { useNavigate }                    from 'react-router-dom';
import { useDispatch }                    from 'react-redux';
import CopyToClipboard                    from 'react-copy-to-clipboard'
import slugify                            from 'slugify';

import GemEngagement                      from '../gemEngagement/GemEngagement'

import session                            from '../../utils/session';
import { renderMediaTypeUI }              from '../../utils/commonFunctions';

import { sidebarMenuClicked }             from '../../actions/app';


function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const NOT_AVAILABLE_URLS = [
  "Note",
  "Quote",
  "Text Expander",
  "Ai Prompt"
]

const GemDetails = ({ bookmark, showAddToBookmark, showComment,permissions,gemPublicView=false }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showCopied, setShowCopied] = useState(false)

  const handleCopy = () => {
    setShowCopied(true)
    setTimeout(() => {
      setShowCopied(false)
    }, 1000)
  }

  const handleNavigate = (id, name, slug) => {
    navigate(`/u/${session.username}/c/${id}/${slug || slugify(name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}/full`)
    dispatch(sidebarMenuClicked('collection'))
  }

  const handleNavigateMediaType = (item) => {
    navigate(`/u/${session.username}/filters/${slugify(item || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}?type=${item}`)
    dispatch(sidebarMenuClicked('filter'))
  }

  const getDomainFromURL = (url) => {
    if (url) {
      const urlObj = new URL(url)
      return urlObj.hostname.replace("www.", "")
    }
    return ''
  }

  const onParentGemClick = (gem, gemId) => {
    navigate(`/u/${session.username}/g/${gemId}/${gem?.slug || slugify(gem?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}`)
  }

  return (
    <div className='mt-2 md:flex md:justify-between md:items-center'>
      <GemEngagement
        gem={{ id: bookmark?.id, ...bookmark?.attributes }}
        showBookmark={bookmark?.attributes?.author?.data?.id?.toString() !== session?.userId?.toString()}
        showComment={showComment}
        isListView={true}
        user={bookmark?.attributes?.author?.data?.attributes}
        // hideComment={true}
        showAddToBookmark={showAddToBookmark}
        permissions={permissions}
        gemPublicView={gemPublicView}
      />
      <div className='flex justify-between md:justify-end items-center gap-3 mt-4 md:mt-0'>
        {bookmark?.attributes?.parent_gem_id?.data?.attributes && <div className='flex justify-start items-center gap-2 cursor-pointer max-content-width' onClick={() => {
          if(gemPublicView){
            return;
          }
          onParentGemClick(bookmark?.attributes?.parent_gem_id?.data?.attributes, bookmark?.attributes?.parent_gem_id?.data?.id)
        }} >
          <div className='text-[#1890ff] hover:text-[#40a9ff]'>Go to parent gem</div>
        </div>}
        <div className='flex justify-start items-center gap-2 cursor-pointer' onClick={() => {
          if(gemPublicView){
            return;
          }
          handleNavigateMediaType(bookmark?.attributes?.media_type)
        }}>
          <div className='text-[#1890ff] hover:text-[#40a9ff] w-[max-content]'>{renderMediaTypeUI(bookmark?.attributes?.media_type)}</div>
        </div>
        <div className='flex justify-start items-center gap-2 cursor-pointer text-[#1890ff] hover:text-[#40a9ff]' onClick={() => {
          if(gemPublicView){
            return;
          }
          handleNavigate(bookmark?.attributes?.collection_gems?.data?.id, bookmark?.attributes?.collection_gems?.data?.attributes?.name, bookmark?.attributes?.collection_gems?.data?.attributes?.slug)
        }}>
          <FolderOpenIcon className='w-4 h-4' />
          <span className='whitespace-nowrap'>{bookmark?.attributes?.collection_gems?.data?.attributes?.name}</span>
        </div>
        {NOT_AVAILABLE_URLS.indexOf(bookmark?.attributes?.media_type) === -1 && <CopyToClipboard
          text={bookmark?.attributes?.url}
          onCopy={handleCopy}
        >
          <div className='flex justify-start items-center gap-2 relative cursor-pointer text-[#1890ff] hover:text-[#40a9ff] hover:underline'>
            <RiFileCopyLine className='w-4 h-4' />
            <span className='truncate block'>{getDomainFromURL(bookmark?.attributes?.url)}</span>
            {/* <span className='truncate block'>{bookmark?.attributes?.url && bookmark?.attributes?.url.length > 30 ? stripHttp(bookmark?.attributes?.url).substring(0, 30) + '...' : stripHttp(bookmark?.attributes?.url)}</span> */}
            {showCopied && <div
              className={classNames(
                showCopied ? "" : "hidden",
                "text-xs font-bold text-green-800 bg-green-400 absolute break-words text-center rounded-md p-1 -right-3 -top-7 flex justify-center items-center gap-1"
              )}
            >
              <CheckIcon className="w-4 h-4" />
              Link Copied
            </div>}
          </div>
        </CopyToClipboard>}
      </div>
    </div>
  )
}

export default GemDetails