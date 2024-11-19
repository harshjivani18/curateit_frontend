"use client"
import { useState }                         from 'react'
import {  Input, 
          Spin, 
          message }                         from 'antd';
import slugify                              from 'slugify';
import { useDispatch, useSelector }                          from 'react-redux';
import { MagnifyingGlassIcon }              from '@heroicons/react/24/solid';
import { useRouter }                        from 'next/navigation';

import FolderList                           from './FolderList';
import { processNestedBookmarks }           from '@utils/process-nested-bookmarks';
import session                              from '@utils/session';
import { 
  filterCollectionByName, 
  getAllLevelCollectionPermissions }        from '@utils/find-collection-id';
import { moveCollection, 
         moveCollectionShared, 
         setSubCollectionsPageDetails, 
         updateCollection }                 from '@actions/collection';
import { selectedSecondarySidebar, setIsMobileSidebar, sidebarSelected }         from '@actions/app';

const CollectionSiderList = ({loading,}) => {
  const dispatch = useDispatch()
  const navigate                      = useRouter()
  const [droppedObj, setDroppedObj]   = useState(null)

  const [collectionSearch,
          setCollectionSearch]         = useState('')
  const [collectionSearchedData,
          setCollectionSearchedData]   = useState('')
  
  const importCollections = useSelector((state) => state.collections.collectionsAndItsCount)
  const sharedCollections = useSelector((state) => state.collections.sharedCollections)
  const followedCollections = useSelector((state) => state.collections.followedCollections)
  const {isMobileView,sidebarSelectedItem} = useSelector(state => state.app)

  const onItemDrop = async (e) => {
    const { dragNode, node }      = e
    let isDragObjSharedCollection = null
    let isDropObjSharedCollection = null
    if(dragNode.key === `Folder-${session.unfiltered_collection_id}`){
      setDroppedObj(0)
      return null
    }
    const dragObj            = dragNode.title?.props?.obj
    const dropObj            = node.title?.props?.obj
    const dropProps          = node.title?.props

    if (dragObj?.isFollowerCollection) {
      message.error("You can't move followed collection to your own collection")
      return
    }

    if(dropObj?.name === 'Unfiltered'){
      message.error("You can't move other collection into unfiltered collection")
      return null
    }

    if(dragNode.key === `Folder-${session.unfiltered_collection_id}`){
      message.error("You can't move unfiltered collection into other collection")
      return null
    }

    if(dropObj?.isFollowerCollection === true){
      message.error("You can't move other collection into followed collection")
      return null
    }

    isDragObjSharedCollection = getAllLevelCollectionPermissions(sharedCollections,dragObj?.id)
    isDropObjSharedCollection = getAllLevelCollectionPermissions(sharedCollections,dropObj?.id)
    

    if(isDragObjSharedCollection && !isDropObjSharedCollection){
      message.error('You cant move shared collection to own')
      return;
    }


    if(isDragObjSharedCollection && isDropObjSharedCollection){
      message.error(`You cant move shared collection to other shared collection`)
      return;
    }

    if(!isDragObjSharedCollection && isDropObjSharedCollection){
      const dragObject = {
          ...dragObj,
          collection: {...dropObj},
          is_sub_collection: true
      }
      const payload = {
        ...dragObj,
        author: isDropObjSharedCollection?.data?.author?.id,
        collection: dropObj?.id
      }
      const res = await dispatch(moveCollectionShared(Number(dragObj?.id),dropObj?.id,dragObject,'moveOwnToShare'))
      if(res.error === undefined){
        await dispatch(updateCollection(dragObj?.id,payload))
      }
      return;
    }

    if(!isDragObjSharedCollection && !isDropObjSharedCollection){
      if(node.title?.props?.obj.id.toString() === session.unfiltered_collection_id.toString() && dragNode.title?.props?.obj?.media_type !== "Link"){
          setDroppedObj(0);
          return null
      }
      setDroppedObj(dragObj)
      if (dropObj.folders === undefined && dragNode.title?.props?.obj?.media_type !== "Link") {
        await dispatch(moveCollection(dragObj.id, dropProps.parent.id, dragObj, dropProps.parent))
      }
      await dispatch(moveCollection(dragObj.id, dropObj.id, dragObj, dropObj))
    }
  }

  const onItemLeave = async (e) => {
    const { node }  = e
    const collection_id = node.key.substring(7)
    if(collection_id === session.unfiltered_collection_id){
        return null
    }
  }

  const openCollection = (obj) => {
    dispatch(setSubCollectionsPageDetails(null))
    dispatch(selectedSecondarySidebar('collections'))
    dispatch(sidebarSelected(`Folder-${obj.id}`))
    navigate.push(`/u/${obj?.author?.username || session.username}/c/${obj.id}/${obj?.slug || slugify(obj.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}`)
    isMobileView && dispatch(setIsMobileSidebar(false))
  }

  const editCollection = (obj) => {
    dispatch(selectedSecondarySidebar('collections'))
    dispatch(sidebarSelected(`Folder-${obj.id}`))
    navigate.push(`/u/${obj?.author?.username || session.username}/c/${obj.id}/${obj?.slug || slugify(obj.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}?action=edit`)
  }

  const shareCollection = (obj) => {
    navigate.push(`/u/${obj?.author?.username || session.username}/c/${obj.id}/${obj?.slug || slugify(obj.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}?action=share`)
  }

  const cbs  = {
      openCollection,
      editCollection,
      shareCollection
  } 

  const handleSearch = (value) => {
    if(!value){
      setCollectionSearchedData('')
      setCollectionSearch('')
      return;
    }
    setCollectionSearch(value)
    const result = filterCollectionByName([...importCollections,...sharedCollections,...followedCollections],value)
    setCollectionSearchedData(result)
  }

  const data  = processNestedBookmarks(
    collectionSearchedData 
      ? collectionSearchedData 
      : (sharedCollections && importCollections && followedCollections) 
        ? [...importCollections,...sharedCollections, ...followedCollections]
        : (sharedCollections && importCollections)
          ? [ ...importCollections, ...sharedCollections] 
          : importCollections 
            ? [ ...importCollections] 
            : [],
          cbs, sharedCollections)
  
  // const data  = processNestedBookmarks(collectionSearchedData ? collectionSearchedData : (sharedCollections && importCollections) ? 
  // [...importCollections,...sharedCollections] : importCollections ? [ ...importCollections] : [],cbs,sharedCollections)
  // const data  = processNestedBookmarks(collectionSearchedData ? collectionSearchedData : (sharedCollections) ? 
  // [...importCollections,...sharedCollections] : [ ...importCollections],cbs,sharedCollections)

  return(
    <div className='w-full'>
      {
        loading ?
        <div className='flex items-center justify-center'>
          <Spin size='small' tip="" />
        </div>
        :
        <>
        <div className='w-full px-1 mt-2'>
          <Input placeholder="Search..." 
            size='small'
            onChange={(e) => handleSearch(e.target.value)} 
            className="w-inherit border rounded hover:border-[#ABB7C9] border-[#ABB7C9] p-0"
            value={collectionSearch}
            allowClear
            prefix={<MagnifyingGlassIcon className="h-4 w-4 text-[#97A0B5] mr-1"/>}
          />
        </div>
        <div className='property-tree-collection px-1 mt-2'>
        <FolderList
          list={data}
          onDrop={onItemDrop}
          onDragLeave={onItemLeave}
          selectedKeys={sidebarSelectedItem}
        />
        </div>
        </>
      }
    </div>
  )
}


export default CollectionSiderList;