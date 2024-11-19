"use client"
import { 
  Button, 
  Drawer, 
  Space, 
  message, 
  DatePicker, 
  Select, 
  Checkbox
}                                             from "antd"
import { useState, useEffect }                from "react"
import { useSelector, useDispatch }           from "react-redux"
import { WithContext as ReactTags }           from 'react-tag-input';
// import { addTag } from "@actions/tags"
import moment                                 from "moment";

import CheckBox                               from "@components/common/Checkbox"
import ComboBox                               from "@components/collectionCombobox/ComboBox"
import Input                                  from "@components/collectionCombobox/Input";

import { 
  KEY_CODES, 
  TextMessage 
}                                             from "@utils/constants";
import {  
  getAllLevelCollectionPermissions,
  getTagByTagId 
}                                             from "@utils/find-collection-id"
import session                                from "@utils/session"
import { updateTagsPromise }                  from "@utils/update-tags";


import { fetchGemsFilters }                   from "@actions/gems";
import { getUserDetails }                     from "@actions/user"
import { bulkDeleteBookmark }                 from "@actions/bookmark"
import { 
  bulkSelectEdit, 
  deleteBulkBookmarkState, 
  deleteBulkBookmarkStateSharedCollection, 
  fetchCollectionWiseCounts, 
  getSharedCollections,  
  updateBulkBookmarkStateSharedCollection 
}                                             from "@actions/collection"

const Option = Select;

const BookmarkSelectDrawer = ({openSelectBookmarkDrawer,setOpenSelectBookmarkDrawer,checkedBookmark,collectionName='',collectionId='',setCheckedBookmark,page='',submit,customFields=[],tagId='',allTags=[]}) => {
    const dispatch = useDispatch()
    const {userTags} = useSelector(state => state.users)
    const {collectionsAndItsCount,sharedCollections} = useSelector(state => state.collections)
    const {isMobileView} = useSelector(state => state.app)

    const [checkedBookmarkData, setCheckedBookmarkData] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [remarks, setRemarks] = useState('')
    const [loadingBtn, setLoadingBtn] = useState(false)

    const [selectedCollection,setSelectedCollection] = useState({id:collectionId,name:collectionName})
    const [showModal, setShowModal] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [customFieldProperty,setCustomFieldProperty] = useState([])
    const [favorite, setFavorite]           = useState(false);
    const [allCollections,setAllCollections] = useState([])
    const [isCurrentCollectionShared, setIsCurrentCollectionShared] = useState(false)

    useEffect(() => {
        const getCall = async () => {
          dispatch(getUserDetails())
        }
        getCall()
    },[dispatch])

    useEffect(() => {
        if(sharedCollections && sharedCollections.length>0){
            const filtered = sharedCollections?.filter(item => item?.accessType !== 'viewer')
            const currentCollectionShared = getAllLevelCollectionPermissions(sharedCollections,Number(collectionId))
            if(currentCollectionShared){
              setAllCollections([...filtered])
              setIsCurrentCollectionShared(true)
              return;
            }else{
              setAllCollections(collectionsAndItsCount ? [...collectionsAndItsCount,...filtered] : [...filtered])
              setIsCurrentCollectionShared(false)
            }
        }else{
            setAllCollections(collectionsAndItsCount ? [...collectionsAndItsCount,] : [])
            setIsCurrentCollectionShared(false)
        }
    },[sharedCollections,collectionId,collectionsAndItsCount])

    useEffect(() => {
      if(page === ''){
        const data = checkedBookmark?.map(item => {
        let obj = {...item}
        obj = {
          ...obj,
          collection_gems: selectedCollection
        }

        return obj;
      })

      setCheckedBookmarkData(data)
      if(customFields.length>0 && customFields[0]?.customFieldObj && customFields[0]?.customFieldObj.length>0){
        setCustomFieldProperty(customFields[0]?.customFieldObj)
      }
      }else{
        setCheckedBookmarkData(checkedBookmark)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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

  const handleCollectionChange = (value) => {
    setSelectedCollection(value)
    const updatedArray = checkedBookmarkData.map((obj) => ({
      ...obj,
      collection_gems: {
        id: value.id,
        name: value.name
      }
    }));

    setCheckedBookmarkData(updatedArray);
  }

  const handleFavourite = (e) => {
    setFavorite(e.target.checked)
    const updatedArray = checkedBookmarkData.map((obj) => ({
      ...obj,
      is_favourite: e.target.checked 
    }));

    setCheckedBookmarkData(updatedArray);
  }

  const handleSubmit = async() => {
    let tagData= ''
    if(page === 'tags'){
      tagData = getTagByTagId(allTags,Number(tagId))
    }

    let newTags = []
    const filtered = selectedTags.filter(item => typeof item.id === 'string');
    const filteredNumber = selectedTags.filter(item => typeof item.id === 'number');
    const tagNames = filtered?.map(item => item?.tag)
    if(tagNames && tagNames?.length>0){
      newTags = await updateTagsPromise(tagNames, userTags, tagNames?.length)
    }
    newTags=[...newTags,...filteredNumber]
    
    const sTags = newTags?.map((t) => { return t.id })
    const sTagsWithName = newTags?.map((t) => { return {id: t.id, tag: t.tag} })
    const data = checkedBookmarkData?.map(item => {
      const tags = item.tags ? item?.tags?.map((t) => { return t.id }) : []
      const tagsWithName = item.tags ? item?.tags?.map((t) => { return {id: t.id, tag: t.tag} }) : []
      let obj={
        ...item,
        tags: page === 'tags' ? [tagData?.id,...sTags] : [...tags,...sTags],
        remarks: remarks ? remarks : item?.remarks,
        collection_gems: item?.collection_gems?.id,
        tagWithName: page === 'tags' ? [{id:tagData?.id,tag: tagData?.tag},...sTagsWithName] : [...tagsWithName,...sTagsWithName]
      }

      return obj;
    })

    const withTagNameData = data?.map(item => {
      return {
        ...item,
        tags: item?.tagWithName
      }
    })

    for (let i = 0; i < data.length; i++) {
      if(!data[i].collection_gems){
        message.error('Please select collection')
        return;
      }
    }

    const filteredWithAnswer =  customFieldProperty?.filter(item => item?.answer) || []

    for (let i = 0; i < data.length; i++) {
      const arr = data[i].custom_fields_obj || [];
      for (let j = 0; j < filteredWithAnswer.length; j++) {
        const obj1 = arr?.find(obj1 => obj1.id === filteredWithAnswer[j].id);
        if (obj1) {
          obj1.answer = filteredWithAnswer[j].answer;
        } else {
          arr.push(filteredWithAnswer[j]);
        }
      }

      data[i].custom_fields_obj = arr
    }
    const isSelectedCollectionShared = getAllLevelCollectionPermissions(sharedCollections,Number(data[0]?.collection_gems))
    if(!isSelectedCollectionShared){
      const ids = data.map(item => item.id)
      setLoadingBtn(true)
    const res = await dispatch(bulkSelectEdit(data))

    if(res.error === undefined){
      dispatch(fetchCollectionWiseCounts())
      dispatch(fetchGemsFilters())
      setCheckedBookmark([])
      setSelectedTags([])
      setOpenSelectBookmarkDrawer(false)
      setLoadingBtn(false)
      message.success(page === '' ? TextMessage.COLLECTION_UPDATE_TEXT : 'Bookmark updated successfully')
      submit(withTagNameData)
      if(page === '' && collectionId !== data[0]?.collection_gems){
        submit(ids,'delete')
        dispatch(deleteBulkBookmarkState(ids))
        return;
      }
    }else{
      setCheckedBookmark([])
      setSelectedTags([])
      setOpenSelectBookmarkDrawer(false)
      setLoadingBtn(false)
      // message.success(TextMessage.ERROR_TEXT)
      submit(withTagNameData)
    }
    return;
    }

    if(isSelectedCollectionShared){
      const finalData = data?.map(item => {
      let obj={
        ...item,
        author: isSelectedCollectionShared?.author?.id
      }

      return obj;
    })
    const ids = finalData.map(item => item.id)
    setLoadingBtn(true)
    const res = await dispatch(bulkSelectEdit(finalData))

    if(res.error === undefined){
      dispatch(updateBulkBookmarkStateSharedCollection(finalData))
      dispatch(getSharedCollections())
      dispatch(fetchCollectionWiseCounts())
      dispatch(fetchGemsFilters())
      setCheckedBookmark([])
      setSelectedTags([])
      setOpenSelectBookmarkDrawer(false)
      setLoadingBtn(false)
      message.success(page === '' ? TextMessage.COLLECTION_UPDATE_TEXT : 'Bookmark updated successfully')
      if(page === '' && !isCurrentCollectionShared){
        submit(ids,'delete')
        dispatch(deleteBulkBookmarkState(ids))
        return;
      }
      submit(withTagNameData)
      
    }else{
      setCheckedBookmark([])
      setSelectedTags([])
      setOpenSelectBookmarkDrawer(false)
      setLoadingBtn(false)
      // message.success(TextMessage.ERROR_TEXT)
      submit(withTagNameData)
    }
    }
    
  }

  const handleBulkDelete = async () => {
        const isSelectedCollectionShared = getAllLevelCollectionPermissions(sharedCollections,checkedBookmarkData[0]?.collection_gems?.id || checkedBookmarkData[0]?.collection_gems)
        if(!isSelectedCollectionShared){
          setLoadingDelete(true)

          const ids = checkedBookmarkData.map(item => item.id)
          const payload = {
          gemId: ids
        }
          const res = await dispatch(bulkDeleteBookmark(payload))
          if(res.error === undefined){
            dispatch(fetchCollectionWiseCounts())
              dispatch(deleteBulkBookmarkState(ids))
              dispatch(fetchGemsFilters())
              setCheckedBookmark([])
              setSelectedTags([])
              setLoadingDelete(false)
              message.success('Bookmark deleted successfully')
              setOpenSelectBookmarkDrawer(false)
              submit(ids,'delete')
          }else{
              message.error('Error Occured')
              setCheckedBookmark([])
              setSelectedTags([])
              setLoadingDelete(false)
              setOpenSelectBookmarkDrawer(false)
          }
        }

        if(isSelectedCollectionShared){
          setLoadingDelete(true)

          const ids = checkedBookmarkData.map(item => item.id)
          const payload = {
          gemId: ids
        }
          const res = await dispatch(bulkDeleteBookmark(payload))
          if(res.error === undefined){
              dispatch(getSharedCollections())
              dispatch(fetchCollectionWiseCounts())
              dispatch(deleteBulkBookmarkStateSharedCollection(ids))
              dispatch(fetchGemsFilters())
              setCheckedBookmark([])
              setSelectedTags([])
              setLoadingDelete(false)
              message.success('Bookmark deleted successfully')
              setOpenSelectBookmarkDrawer(false)
              submit(ids,'delete')
          }else{
              message.error('Error Occured')
              setCheckedBookmark([])
              setSelectedTags([])
              setLoadingDelete(false)
              setOpenSelectBookmarkDrawer(false)
          }
        }
        
    }

    //custom props
    const updateCustomPropertyValue = (e,i,type) => {
        const arr = [...customFieldProperty]

        if(type === 'text'){
            arr[i] = {
                ...arr[i],
                answer: e.target.value
            }

            setCustomFieldProperty(arr)
        }

        if(type === 'select'){
            arr[i] = {
                ...arr[i],
                answer: e
            }

            setCustomFieldProperty(arr)
        }
        if(type === 'multi'){
            arr[i] = {
                ...arr[i],
                answer: e
            }

            setCustomFieldProperty(arr)
        }

        if(type === 'checkbox'){
            arr[i] = {
                ...arr[i],
                answer: e
            }

            setCustomFieldProperty(arr)
        }

        
    }

    const renderCustomFieldProperty = (item,i) => {
        if(item.type.toLowerCase() === 'text' || item.type.toLowerCase() === 'number' || item.type.toLowerCase() === 'email' || item.type.toLowerCase() === 'url' || item.type.toLowerCase() === 'phone' || item.type.toLowerCase() === 'formula'){
            return <div className='pt-4'>
            <h6 className="block text-xs font-medium text-gray-500 mb-1">{item.name}</h6>
            <Input placeholder={item.name} value={item?.answer || ''} style={{width:'100%'}}
            onChange={(e) => updateCustomPropertyValue(e,i,'text')}
            />
            </div>
        }

        if(item.type.toLowerCase() === 'status' || item.type.toLowerCase() === 'select'){
            return <div className='pt-4'>
            <h6 className="block text-xs font-medium text-gray-500 mb-1">{item.name}</h6>
            <Select className="w-full" placeholder={item.name}
            onChange={(value) => updateCustomPropertyValue(value,i,'select')}
            value={item?.answer || null}
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
            <CheckBox label={item.name} name={item.name}
            darkColor={true} value={item?.answer}  
            onChange={(e) => updateCustomPropertyValue(e,i,'checkbox')}
            />
            </div>
        }

        if(item.type.toLowerCase() === 'date'){
            return <div className='pt-4'>
            <h6 className="block text-xs font-medium text-gray-500 mb-1">{item.name}</h6>
            <DatePicker 
            onChange={(date,dateString) => {
                const arr = [...customFieldProperty]
                arr[i] = {
                ...arr[i],
                answer: dateString
            }

            setCustomFieldProperty(arr)
            }} 
            showToday={false}
            format={'DD-MM-YYYY'}
            value={item?.answer ? moment(item.answer,'DD-MM-YYYY') : null}
            allowClear={false}
            className='w-full'
            />
            </div>
        }
    }

    const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env

    return(
        <>
        <Drawer 
            placement={isMobileView  ? 'bottom' : 'right'}
            height={isMobileView ? '90%' : 'inherit'}
            width={isMobileView ? '90%' : '460px'}
            title="Move Gem" 
            onClose={() => {
                setOpenSelectBookmarkDrawer(false)
            }} 
            open={openSelectBookmarkDrawer}
            maskClosable={isMobileView ? true :false}

            footer={
          <Space className="flex items-center justify-end">
              <Button onClick={() => {
                setOpenSelectBookmarkDrawer(false)
            }}
            disabled={loadingBtn || loadingDelete}
            >
                Cancel
              </Button>

            <Button
              type="primary"
              className="bg-[#40a9ff] border-[#40a9ff]"
              onClick={handleSubmit}
              disabled={loadingBtn || loadingDelete}
            >
            {loadingBtn ? 'Loading' : 'Save'}
            </Button>
          </Space>
        }
        >

        <div>

          <div className="mt-3">
            <h6 className="block text-xs text-gray-500 mb-1 font-medium">Collections (create/select)</h6>
            <div className='w-full'>
              <ComboBox 
                collectionData={allCollections || []} 
                hideCount={true} 
                userId={session.userId} 
                selectedCollection={selectedCollection}
                handleCollectionChange={handleCollectionChange}
                isSelectDrawer={true}
                disabled={isCurrentCollectionShared}
              />
            </div>
          </div>

          <div className='mt-3'>
              <h6 className='text-xs text-gray-500 font-medium'>Tags</h6>
              <div className='w-full bg-white rounded-lg border-2 p-2 mt-2'>
                  <ReactTags 
                    tags={selectedTags?.map((t) => { return { id: t.tag, text: t.tag }})}
                    suggestions={prepareTags()}
                    delimiters={[KEY_CODES.comma, KEY_CODES.enter]}
                    handleDelete={onTagDelete}
                    handleAddition={onTagAdd}
                    inputFieldPosition="bottom"
                    placeholder="Enter Tag"
                    onClearAll={() => setSelectedTags([])}
                    clearAll
                  />
                           
                </div>
          </div>

          <div className='mt-3'>
            <h6 className='text-xs text-gray-500 mb-1 font-medium'>Comment</h6>
              <textarea placeholder='Add your comments' 
              onChange={(e) => setRemarks(e.target.value)}
              className='w-full text-sm p-2 border-2 border-[#e5e7eb] rounded-md h-14 resize-none'></textarea>
          </div>

          <div className="mt-3">
            <Checkbox onChange={handleFavourite} checked={favorite}>Mark as Favorites</Checkbox>
          </div>

          <div className='mt-3'>
            <div className="block text-xs text-gray-500 mb-1 font-medium">Selected gems</div>
            {
              checkedBookmarkData && checkedBookmarkData?.map((bookmark,index) => {
                const imgSrc = (bookmark?.metaData && bookmark?.metaData?.covers?.length !== 0) ? bookmark?.metaData?.covers[0] : ''
                return(
                <>
                <div className='mt-2' key={index}>

                  <div className='text-xs text-gray-800 flex justify-start items-start w-full bg-white border-2 rounded-md p-2 space-x-2'>
                      <img src={imgSrc ? imgSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`} alt={bookmark?.altInfo || "Curateit"} className='h-5 w-5' onError={(e) => {
                        if (bookmark?.metaData?.fallbackURL) {
                          e.target.onerror = null
                          e.target.src = bookmark?.metaData?.fallbackURL
                        }
                      }} />
                      <span>{bookmark?.title || ''}</span>
                  </div>

                </div>
                </>
              )
              })
            }
          </div>
          
          {
          customFieldProperty && customFieldProperty.length>0 &&
          <h6 className='text-xs text-gray-500 mt-4 font-medium'>Custom Properties</h6>
          }

          <div>
            {
              customFieldProperty && customFieldProperty.length>0 && customFieldProperty?.map((item,i) => (
                <>
                  {renderCustomFieldProperty(item,i)}
                </>
              ))
            }
          </div>

          <button
            className="border-none bg-transparent text-red-700 outline-none mt-4"
            onClick={() => setShowModal(true)}
            >
              Remove bookmarks
          </button>


          <div
                className={showModal ? "pop-box2" : ""}
                style={{ marginLeft: 0 }}
                >
                <div className={showModal === true ? "popup-delete-model" : ""}>
                    {showModal && (
                    <div className="border-t-[1px]">
                        <div className="popup-delete bg-white">
                        <span className="content-h">
                            Confirm delete{' '}
                            {checkedBookmarkData?.length} bookmark?
                        </span>
                        <div className="btn-pop">
                            <button
                            className="yes-btn"
                            onClick={() => handleBulkDelete()}
                            disabled={loadingDelete}
                            >
                            Yes
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
        </div>

      </Drawer>
        </>
    )
}

export default BookmarkSelectDrawer;