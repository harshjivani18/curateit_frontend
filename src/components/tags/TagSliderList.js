"use client"
import { useEffect, useState }                 from "react";
import {  
    Button,
    Input, 
    Spin, 
    message
}                                   from "antd";
import slugify                      from "slugify";
import { MagnifyingGlassIcon }      from "@heroicons/react/24/solid";
import { useRouter }                from "next/navigation";

import TagList                      from "./TagList";

import { processNestedBookmarks }   from "@utils/process-nested-bookmarks";
import session                      from "@utils/session";
import { filterTagByName, getAllLevelCollectionPermissions }          from "@utils/find-collection-id";

import { fetchTagsWithGemsCount, moveTag }                  from "@actions/tags";
import { selectedSecondarySidebar, setIsMobileSidebar, sidebarSelected } from "@actions/app";
import { useDispatch, useSelector } from "react-redux";

const TagSliderList = ({ loading, currentPage,setCurrentPage }) => {
    const {tagsWithGemsCount,sharedTags} = useSelector(state => state.tags)
    const dispatch  = useDispatch()
    const navigate                  = useRouter()
    const [tagSearch,setTagSearch]  = useState('')
    const [tagSearchedData,
           setTagSearchedData]      = useState('')
    const [tagData,setTagData]      = useState([])
    const {isMobileView,sidebarSelectedItem} = useSelector(state => state.app)

    const itemsPerPage = 10;

    useEffect(() => {
        const withoutTags = tagsWithGemsCount?.find(item => item?.id === "withoutTags");
        const sortedData = tagsWithGemsCount?.filter(item => item?.id !== "withoutTags")?.sort((a, b) => b.gems_count - a.gems_count);
        withoutTags && sortedData?.unshift(withoutTags);

        const paginatedItems = sortedData?.slice(0, currentPage * itemsPerPage);
        setTagData(paginatedItems)
    },[tagsWithGemsCount,currentPage])

    const onItemDrop = async (e) => {
        const { dragNode, node } = e
        let isDragObjSharedCollection = null
        let isDropObjSharedCollection = null
  
        const dragObj            = dragNode.title?.props?.obj
        const dropObj            = node.title?.props?.obj

        if(dragObj?.id === 'withoutTags' || dropObj?.id === 'withoutTags') return;

        isDragObjSharedCollection = getAllLevelCollectionPermissions(sharedTags,dragObj?.id)
        isDropObjSharedCollection = getAllLevelCollectionPermissions(sharedTags,dropObj?.id)

        if(isDragObjSharedCollection && !isDropObjSharedCollection){
        message.error('You cant move shared tag to own')
        return;
        }

        if (!isDragObjSharedCollection && isDropObjSharedCollection) {
        message.error('You cant move own tag to shared tag')
        return;
        }

        if(isDragObjSharedCollection && isDropObjSharedCollection){
        message.error(`You cant move shared tag to other shared tag`)
        return;
        }

        if(!isDragObjSharedCollection && isDropObjSharedCollection){
        return;
        }

        if(!isDragObjSharedCollection && !isDropObjSharedCollection){
            const sourceId = dragObj.id
            const destinationId = dropObj.id

            await dispatch(moveTag(sourceId,destinationId,dragObj,dropObj))
            dispatch(fetchTagsWithGemsCount())
        }
    }

    

    const openTag = (obj) => {
        dispatch(selectedSecondarySidebar('tags'))
        if(obj?.id === 'withoutTags'){
            dispatch(sidebarSelected(`Folder-${obj.id}`))
            navigate.push(`/u/${obj?.author?.username || session.username}/filters/without tags?type=without tags`)
            isMobileView && dispatch(setIsMobileSidebar(false))
        }else{
            dispatch(sidebarSelected(`Folder-${obj.id}`))
            navigate.push(`/u/${obj?.author?.username || session.username}/tags/${obj.id}/${obj?.slug || slugify(obj.tag || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}`)
            isMobileView && dispatch(setIsMobileSidebar(false))
        }
    }

    const editTag = (obj) => {
        dispatch(sidebarSelected(`Folder-${obj.id}`))
        navigate.push(`/u/${obj?.author?.username || session.username}/tags/${obj.id}/${obj?.slug || slugify(obj.tag || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}?action=edit`)
    }

    const cbs  = {
        openTag,
        editTag,
    }


    const handleSearch = (value) => {
        if(!value){
            setTagSearchedData('')
            setTagSearch('')
            return;
        }
        setTagSearch(value)
        const result = filterTagByName([...tagData,...sharedTags], value)
        setTagSearchedData(result)
    }

    // const data  = processNestedBookmarks(tagSearchedData ? tagSearchedData : tagData, cbs)
const data  = processNestedBookmarks(tagSearchedData ? tagSearchedData : (sharedTags && tagData) ? 
  [...sharedTags,...tagData] : tagData ? [ ...tagData] : [],cbs,sharedTags || [])
    return(
        <div className='w-full'>

            {
              loading ?
                <div className='flex items-center justify-center'>
                    <Spin size='small' tip="" />
                </div>
              :
                <>
                    <div className='w-full'>
                        <Input placeholder="Search..." 
                        size="small"
                        onChange={(e) => handleSearch(e.target.value)} 
                        className="w-inherit border rounded hover:border-[#ABB7C9] border-[#ABB7C9] p-0"
                        value={tagSearch}
                        allowClear
                        prefix={<MagnifyingGlassIcon className="h-4 w-4 text-[#97A0B5] mr-1"/>}
                        />
                    </div>
                    <div className='property-tree-collection mt-1 tag-tree'>
                        <TagList
                            list={data}
                            onDrop={onItemDrop}
                            selectedKeys={sidebarSelectedItem}
                            // onDragLeave={onItemLeave}
                        />
                    </div>

                    {currentPage * itemsPerPage < tagsWithGemsCount?.length &&
                        <Button type="link" onClick={() => setCurrentPage(prev => prev + 1)} className="mt-2 flex items-center justify-start w-full p-0 pl-2"
                        >Load more</Button>
                    }
                </>
            }
    
        </div>
    )
}
  
export default TagSliderList;