import React, { 
  useEffect, 
  useRef, 
  useState 
}                                               from 'react'
import { 
  ChatBubbleOvalLeftIcon, 
  FolderIcon, 
  FolderPlusIcon, 
  HeartIcon, 
  MagnifyingGlassIcon, 
  XMarkIcon 
}                                               from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon }          from '@heroicons/react/20/solid'
import { RiShareForwardLine }                   from 'react-icons/ri'
import { BsBookmarkPlus }                       from 'react-icons/bs'
// import SocialShare from '../socialShare/SocialShare';
// import { addCollections, addGemToSharedCollection, likeBookmarkGem, removeGemFromCollection, updateBookmarkWithExistingCollection } from '../../actions/collection'
// import { addGem, deleteBookmark, resetExistingGem, saveOtherGemInCollection } from '../../actions/bookmark'
import { useDispatch, useSelector }             from 'react-redux'
import {  Dropdown, Input, Spin, message }      from 'antd'
import { useParams, usePathname }               from 'next/navigation'

import SocialShare                              from '@components/socialShare/SocialShare'

import session                                  from '../../utils/session'
import { 
  checkCollectionExists, 
  filterCollectionByName, 
  getAllLevelCollectionPermissions, 
  getBookmarkPermissions 
}                                               from '@utils/find-collection-id'
import { TextMessage }                          from '@utils/constants'

import { 
  addCollections, 
  addGemToSharedCollection, 
  fetchCollectionWiseCounts, 
  getSharedCollections, 
  likeBookmarkGem, 
  removeGemFromCollection, 
  updateBookmarkWithExistingCollection 
}                                               from '@actions/collection'
import { 
  addGem, 
  deleteBookmark, 
  resetExistingGem, 
  saveOtherGemInCollection 
}                                               from '@actions/bookmark'
import { removeGemFromTag }                     from '@actions/tags'
import { openAuthModal }                        from '@actions/app'

// import {  checkCollectionExists, filterCollectionByName, getAllLevelCollectionPermissions, getBookmarkPermissions } from '../../utils/find-collection-id'
// import { TextMessage } from '../../utils/constants'
// import { removeGemFromTag } from '../../actions/tags'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const GemEngagement = ({ showBookmark = false, showAddToBookmark, isListView = false, showComment, gem, hideComment = false, user,permissions,gemPublicView=false }) => {
  const dispatch = useDispatch();
  const shareRef = useRef(null);
  const totalCount = useSelector(state => state.comments?.totalComments);
  const getAllComments = useSelector(state => state.comments.comments)
  const collectionsAndItsCount = useSelector((state) => state.collections.collectionsAndItsCount)
  const sharedCollections = useSelector((state) => state.collections.sharedCollections)
  const [allCollections,setAllCollections] = useState([])
  const [collectionSearch,setCollectionSearch] = useState('')
  const [liked, setLiked] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loadingLike, setLoadingLike] = useState(false);
  const [commentCount, setCommentCount] = useState(gem?.comments_count || 0)
  const [showAddBk, setShowAddBk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [existingCollectionSaved, setExistingCollectionSaved] = useState([]);
  
  const [open, setOpen] = useState(false);

  const searchParams = useParams();
  const searchPathname = usePathname();
  const uname = searchParams?.username;
  const module = searchPathname?.includes("/g/") ? "gems" : searchPathname?.includes("/tags/") ? "tags" : searchPathname?.includes("/c/") ? "collections" : null;
  const sourceId = searchParams?.gemId || searchParams?.colllectionId || searchParams?.tagId || searchParams?.id;
  const slug = searchParams?.name;

  // const searchParams = window.location.pathname.split("/");
  // const uname = searchParams[2];
  // const module = searchParams[3] === "tags" ? "tags" : searchParams[3] === "c" ? "collections" : null;
  // const tagId = searchParams[4];
  // const slug = searchParams[5];

  useEffect(() => {
    if(sharedCollections && sharedCollections.length>0){
      const filtered = sharedCollections?.filter(item => item?.accessType !== 'viewer')
      setAllCollections(collectionsAndItsCount ? [...collectionsAndItsCount,...filtered] : [...filtered])
    }else{
      setAllCollections(collectionsAndItsCount ? [...collectionsAndItsCount] : [])
    }
    },[sharedCollections,collectionsAndItsCount])
  
  useEffect(() => {
    if (getAllComments.length > 0 && getAllComments[0].page_id === gem?.id){
      setCommentCount(totalCount);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCount, getAllComments])

  const handleLiked = () => {
    if (loadingLike) return false;
    setLoadingLike(true);
    dispatch(likeBookmarkGem(gem?.id)).then(res => {
      if (res?.payload?.data?.status === 200) {
        if (liked) {
          const newCount = Number(likeCount) - 1;
          setLikeCount(newCount)
          dispatch(resetExistingGem(gem?.id))
        } else {
          const newCount = Number(likeCount) + 1;
          setLikeCount(newCount)
        }
        setLiked(prev => !prev);
        setLoadingLike(false);

      } else {
        setLoadingLike(false);
      }
    })
  }

  const openComment = () => {
    showComment(gem?.id)
  }

  const handleClick = (e) => {
    if (shareRef.current && !shareRef.current.contains(e.target)) {
      setShowShare(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    let likedUsers = gem?.like_users?.data ? gem?.like_users?.data : gem?.like_users ? gem?.like_users : [];
    setLikeCount(likedUsers.length);
    let index = likedUsers.findIndex(user => user?.id.toString() === session.userId.toString());
    if (index !== -1) {
      setLiked(true)
    } else {
      setLiked(false);
    }

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpenShare = (flag) =>{
    setOpen(flag)
  }

  const handleOpen = (flag) => {
    if(session && session?.userId){
      setShowAddBk(flag);
    }else{
      dispatch(openAuthModal({
            open: true,
            action : 'login',
            extraInfo: {
              trigger: 'save',
              username: uname,
              id: sourceId,
              module: module,
              slug: slug
          }
        }))
    }
  };

  const handleSearch = (value) => {
      if(!value){
        setAllCollections(collectionsAndItsCount ? [...collectionsAndItsCount,...sharedCollections] : [...sharedCollections])
        setCollectionSearch('')
        return;
      }
      setCollectionSearch(value)
      const result = filterCollectionByName(collectionsAndItsCount ? [...collectionsAndItsCount,...sharedCollections] : [...sharedCollections],value)
      setAllCollections(result)
  }

  const handleSaveGem = async (item) => {
    const isSelectedCollectionShared = getAllLevelCollectionPermissions(sharedCollections,item?.id)

    const finalObj = {
      ...gem,
      author: isSelectedCollectionShared ? isSelectedCollectionShared?.data?.author?.id : Number(session.userId),
      collection_gems: item?.id,
      collections: item?.id,
    }   

    delete finalObj.id
    delete finalObj.createdAt
    delete finalObj.updatedAt

    const gemRes = await dispatch(addGem({ data: finalObj }))

    if (gemRes.error === undefined && gemRes.payload.error === undefined) {
      const { data } = gemRes.payload
      if (data.data) {
        const d = data.data;
        const g = {
          id: d?.id,
          title: d?.title,
          media: d?.media,
          media_type: d?.media_type,
          url: d?.url,
          remarks: d?.remarks,
          metaData: d?.metaData,
          description: d?.description,
          S3_link: d?.S3_link,
          is_favourite: d?.is_favourite,
          collection_id: item?.id,
          tags: finalObj.tags,
          showThumbnail: finalObj?.showThumbnail || '',
          fileType: d?.fileType
        }
        if(isSelectedCollectionShared){
          dispatch(addGemToSharedCollection(item?.id,g))
          dispatch(getSharedCollections())
        }
        dispatch(fetchCollectionWiseCounts())
        dispatch(updateBookmarkWithExistingCollection(g, {id:item?.id}, false, "add", null))
        message.success(TextMessage.BOOKMARK_CREATE_TEXT)
        setExistingCollectionSaved([...existingCollectionSaved,{
          id: g?.id,
          title: g?.title,
          collection_gems: {
            id: item?.id,
            name: item?.name
          }
        }])
      }
    }else{
      // message.error(TextMessage.ERROR_TEXT)
    }
  }

  const handleCreateCollection = async (value) => {
    if(!value){
      message.error('Enter collection')
      return;
    }

    const optionData = allCollections?.filter((data) => {
      return data?.name?.toLowerCase().includes(value.toLowerCase())
    })
            
    const result = checkCollectionExists(optionData,value)
    if(result){
      message.error('Collection Already Exists')
      return;
    }
    const res = await dispatch(addCollections({
      data: {
          name: value,
          author: Number(session.userId)
        }
    }))
    if(res.error === undefined){
      handleSaveGem({id: res?.payload?.data?.data?.id,name: res?.payload?.data?.data?.name})
      setCollectionSearch('')
    }else{
      message.error('Error Occured while saving gem')
      setCollectionSearch('')
    }
  }

  const handleDeleteGem = async (item) => {
        const isSingleBkShared = getBookmarkPermissions(sharedCollections,item?.id)
        const currentCollectionShared = getAllLevelCollectionPermissions(sharedCollections,item?.collection_gems?.id)

        if(!isSingleBkShared){
        const res = await dispatch(deleteBookmark(item?.id))
        if(res.error === undefined){
            const filtered = existingCollectionSaved?.filter(data => data.id !== item.id)
            setExistingCollectionSaved(filtered)
            dispatch(removeGemFromCollection(item?.id, item?.collection_gems?.id))
            dispatch(removeGemFromTag(item?.id))
            dispatch(fetchCollectionWiseCounts())
            message.success('Bookmark removed successfully')
        }else{
            message.error('Error Occured')
        } 
        return;
        }

        if(isSingleBkShared && !isSingleBkShared?.gems?.canDelete){
            message.error('You dont have permission to delete the gem')
            return;
        }

        if(isSingleBkShared && isSingleBkShared?.gems?.canDelete){

        const res = await dispatch(deleteBookmark(item?.id))
        if(res.error === undefined){
            const filtered = existingCollectionSaved?.filter(data => data.id !== item.id)
            setExistingCollectionSaved(filtered)
            dispatch(removeGemFromCollection(item?.id, item?.collection_gems?.id,currentCollectionShared))
            dispatch(getSharedCollections())
            message.success('Bookmark deleted successfully')
        }else{
            message.error('Error Occured')
        }
        }
  }

  const dropdownnRenderShareUI = () => {
    return(
    <div className='bg-white z-[100] rounded-lg shadow-lg border-[0.5px]' onClick={(e) => e.stopPropagation()}>
      <SocialShare gem={gem} user={user} />
    </div>
    )
  }

  const dropdownnRenderUI = () => {
       return(
        <div className='bg-white z-[100] rounded-lg shadow-lg border-[0.5px]' onClick={(e) => e.stopPropagation()}>
            <div className='border-b-1 border-[#E9E9E9] p-3 pb-2 flex items-center justify-between w-full'>
              <span className='font-bold text-sm block'>Collections</span>
              <XMarkIcon className='text-[#EB5757] h-4 w-4 cursor-pointer' onClick={(e) => {
                e.stopPropagation()
                setShowAddBk(false)
                setExistingCollectionSaved([])
                setCollectionSearch('')
              }}/>
            </div>
            {
            loading ? <div className='w-full flex items-center justify-center mt-2'>
              <Spin tip='Loading' size='small'/>
            </div>
            :
            <div className='p-2'>
              <div className='w-full p-1'>
                <Input placeholder="Search or type to create new collection..."
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === 'Enter') {
                      handleCreateCollection(e.target.value);
                    }
                    handleSearch(e.target.value);
                  }} 
                  onChange={(e) => {
                    e.stopPropagation()
                    handleSearch(e.target.value)
                  }} 
                  className="w-inherit border-none border-b p-0 outline-none"
                  value={collectionSearch}
                  allowClear
                  prefix={<MagnifyingGlassIcon className="h-4 w-4 text-[#97A0B5]"/>}
                  />
              </div>

              <div className='mt-2 h-[180px] overflow-y-auto cursor-pointer'>
                <div className="flex items-center py-2 px-1 w-full justify-between" onClick={() => handleCreateCollection(collectionSearch)} >
                    <FolderPlusIcon className="h-4 w-4 text-blue-500" aria-hidden="true" />
                    <span className='ml-3 truncate text-sm text-blue-500'>{`${collectionSearch ? `"${collectionSearch}"` : ""} Type to create new collection `}</span>
                </div>
                {
                allCollections.sort((a, b) => (existingCollectionSaved.some(item => item?.collection_gems?.id === b.id) ? 1 : -1) - (existingCollectionSaved.some(item => item?.collection_gems?.id === a.id) ? 1 : -1))?.map((item,i) => {
                  return(
                    <>
                    <div className='flex flex-row items-center justify-between'>
                      <div className={`font-medium text-sm block py-2 px-1 bg-white hover:bg-[#f5f5f5] w-full flex items-center`} key={i}
                      onClick={() => {
                        if(existingCollectionSaved.some(data => data?.collection_gems?.id === item.id)){
                          const filter = existingCollectionSaved.filter(data => data?.collection_gems?.id === item.id)
                          handleDeleteGem(filter[0])
                        }else{
                          handleSaveGem(item)
                        }
                      }}
                      >
                        <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
                        <span className='ml-3'>{item?.name}</span>
                      </div>
                      <div>
                        <span>{existingCollectionSaved.some(data => data?.collection_gems?.id === item.id) && '✅'}</span>
                      </div>
                    </div>
                    </>
                  )
                })
                }
              </div>
            </div>
            }
        </div>
       )
  }

  return (
    <div className={classNames(isListView ? 'justify-start gap-4' : 'justify-between', 'flex items-center text-gray-700 w-full')}>
        <div className='flex items-center gap-4'>

          <div className='flex justify-start items-center gap-[0.1rem] cursor-pointer' onClick={
          (e) => {
          e.stopPropagation();
          // if(gemPublicView){
          //   return;
          // }
          if(session && session?.userId){
            handleLiked()
          }else{
            dispatch(openAuthModal({
                open: true,
                action: 'login',
                extraInfo: {
                  trigger: 'like',
                  username: uname,
                  id: sourceId,
                  module: module,
                  slug: slug
              }
              }))
          }
        }}>
          {liked ? <HeartSolidIcon className='w-4 h-4 text-red-600' /> : <HeartIcon className='w-4 h-4' />}
          <span className='text-xs'>{likeCount}</span>
          </div>
          {!hideComment && <div className='flex justify-start items-center gap-[0.1rem] cursor-pointer' onClick={(e) => {
            // if(gemPublicView){
            //   return;
            // }
            e.stopPropagation();
            openComment()
          }}>
            <ChatBubbleOvalLeftIcon className='w-4 h-4' />
            <span className='text-xs'>{commentCount}</span>
          </div>}
          {/* <div className='flex justify-start items-center gap-[0.1rem] cursor-pointer'>
            <EyeIcon className='w-4 h-4' />
            <span className='text-xs'>2.7M</span>
          </div> */}
          {(!permissions || permissions?.permissions?.gems?.canShare === true) && <div className='flex justify-start items-center gap-[0.1rem] cursor-pointer relative' onClick={(e) => {
            e.stopPropagation();
            setShowShare(true)
          }}>
            <Dropdown
              overlayStyle={{ width: '250px' }}
              trigger={['click']}
              dropdownRender={() => (dropdownnRenderShareUI())}
              onOpenChange={handleOpenShare}
              open={open}
              onClick={e => e.stopPropagation()}
            >
              <RiShareForwardLine className='w-4 h-4' />
            </Dropdown>
          </div>}

        </div>
        {showBookmark && <Dropdown
          overlayStyle={{ width: '250px' }}
          trigger={['click']}
          dropdownRender={() => (dropdownnRenderUI())}
          onOpenChange={handleOpen}
          open={showAddBk}
          placement="bottomRight"
          onClick={async (e) => {
            e.stopPropagation()
            if(session && session?.userId){
              setLoading(true)
              collectionsAndItsCount === null && dispatch(fetchCollectionWiseCounts())
              const url = encodeURIComponent(gem?.url)
              const res = await dispatch(saveOtherGemInCollection(url))
              if(res){
                setExistingCollectionSaved(res?.payload?.data?.message || [])
                setLoading(false)
              }
            }
          }}
        >
          <div className='flex justify-start items-center gap-[0.1rem] cursor-pointer' >
              <BsBookmarkPlus className='w-4 h-4'/>
              {/* <span className='text-xs'>32</span> */}
          </div>
        </Dropdown>}
    </div>
  )
}

export default GemEngagement