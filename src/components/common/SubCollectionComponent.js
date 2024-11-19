import {  
    Collapse, 
    Spin, 
    message 
}                                       from "antd";
import { 
    useEffect, 
    useMemo, 
    useState 
}                                       from "react";
import { 
    ChevronDownIcon, 
    ChevronRightIcon 
}                                       from "@heroicons/react/24/outline";
import slugify                          from "slugify";
import { useRouter }                    from "next/navigation";
import { 
    useDispatch, 
    useSelector 
}                                       from "react-redux";
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
    DragOverlay 
}                                       from "@dnd-kit/core";
import { 
    SortableContext, 
    arrayMove, 
    rectSwappingStrategy, 
    sortableKeyboardCoordinates 
}                                       from "@dnd-kit/sortable";
import { createPortal }                 from "react-dom";

import SingleSubItem                    from "./SingleSubItem";

import { 
    addSubCollectionData, 
    getParentPublicCollectionInProfile, 
    getSubCollections, 
    setSubCollectionsPageDetails, 
    updateCollection 
}                                       from "@actions/collection";

import { 
    selectedSecondarySidebar, 
    setIsMobileSidebar, 
    sidebarSelected 
}                                       from "@actions/app";

import { TextMessage }                  from "@utils/constants";

const { Panel } = Collapse;


const SubCollectionComponent = ({collectionId='',fromPage='',setSubCollectionsCount=() => {},wallpaper='',isSharedAndAllowEdit=false,type='',userId='', hideLoader=false}) => {
    const { subCollectionValue } = useSelector(state => state.collections)
    const {isMobileView,} = useSelector(state => state.app)
    const navigate = useRouter()
    const dispatch = useDispatch()
    const [subCollections,setSubCollections] = useState([])
    const [page,setPage] = useState(1) 
    const [loading,setLoading] = useState(false) 
    const [totalCount,setTotalCount] = useState(0) 
    const [subCollectionCollapseKeys, setSubCollectionCollapseKeys]     = useState(['1'])
    const [buttonLoading, setButtonLoading] = useState(false);

    const itemsId = useMemo(() => subCollections?.map((col) => col.id), [subCollections])
    const [draggedItem, setDraggedItem] = useState(null);
    const [orderOfSubCollections, setOrderOfSubCollections] = useState([]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
        activationConstraint: {
        distance: 8,
        },
    }),
        useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const getCall = async (page) => {
        if(page === 1){
            setLoading(true)
        }else{
            setLoading(false)
        }
        
        if(page !== 1){
            setButtonLoading(true)
        }
        const res = await dispatch(getSubCollections(collectionId,page))
        if(res){  
            setSubCollections((prev) => [...prev,...res?.payload?.data?.finalCollection || []])
            setTotalCount(res?.payload?.data?.count || 0)
            setSubCollectionsCount(res?.payload?.data?.count || 0)
            setOrderOfSubCollections(res?.payload?.data?.orderOfSubCollections || [])
        }

        setLoading(false)
        setButtonLoading(false)
    }

    const getCollections = async (page) => {
        if(page === 1){
            setLoading(true)
        }else{
            setLoading(false)
        }
        
        if(page !== 1){
            setButtonLoading(true)
        }
        const res = type === 'public' ? await dispatch(getParentPublicCollectionInProfile(page,userId,false)) :  await dispatch(getParentPublicCollectionInProfile(page))
        if(res){
            setSubCollections((prev) => [...prev,...res?.payload?.data?.data || []])
            setTotalCount(res?.payload?.data?.collectionCount || 0)
            setSubCollectionsCount(res?.payload?.data?.collectionCount || 0)
        }

        setLoading(false)
        setButtonLoading(false)
    }

   useEffect(() => {
    if((collectionId && !fromPage) || (collectionId && fromPage === 'collection-public-shared')){
        getCall(1)
    }

    if(fromPage === 'profile' && !collectionId){
        getCollections(1)
    }
   },[collectionId,fromPage])

   useEffect(() => {
    if(subCollectionValue && subCollectionValue?.name){
        setSubCollections([...subCollections,subCollectionValue])
        setSubCollectionsCount((prev) => prev + 1)
        dispatch(addSubCollectionData(null))
    }
   },[subCollectionValue])

   const handleChangeSubCollectionCollapse = (key) => {
    setSubCollectionCollapseKeys(key)
  }

    const handleOpenCollection = (item) => {
        dispatch(sidebarSelected(`Folder-${item.id}`))
        if(fromPage === 'collection-public-shared'){
            navigate.push(`/u/${item?.author?.username}/c/${item.id}/${item?.slug || slugify(item.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}?public=true`)  
        }else if(fromPage === 'profile' && !type){
            dispatch(setSubCollectionsPageDetails(null))
            dispatch(selectedSecondarySidebar('collections'))
            navigate.push(`/u/${item?.author?.username || session.username}/c/${item.id}/${item?.slug || slugify(item.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}`)
            isMobileView && dispatch(setIsMobileSidebar(false))
        }else if(fromPage === 'profile' && type === 'public'){
            navigate.push(`/u/${item?.author?.username || session.username}/c/${item.id}/${item?.slug || slugify(item.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}?public=true`)
        }else{
            navigate.push(`/u/${item?.author?.username}/c/${item.id}/${item?.slug || slugify(item.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}`)
        }
    }

    const getTaskPos = (id) => subCollections.findIndex((item) => item.id === id)

    const handleDragStart = (event) => {
        const { active } = event;
        setDraggedItem(subCollections.find(item => item.id === active.id));
    };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    setDraggedItem(null)

    if (active.id === over.id) return;

    const originalPos = getTaskPos(active.id);
    const newPos = getTaskPos(over.id)

    const data = arrayMove(subCollections, originalPos, newPos)
    getSortedItems(data)
  }

  const getSortedItems = (items) => {
    const initReoderedItemsId = items?.map(item => item.id)
    const order = [...orderOfSubCollections]
    const length = subCollections?.length

    const getItemsAfter = order.slice(length)
    const reorder = [...initReoderedItemsId,...getItemsAfter]

    setSubCollections(items)
    setOrderOfSubCollections(reorder)
    const payload = {
        order_of_sub_collections: reorder
    }

    dispatch(updateCollection(collectionId, payload))
    message.success(TextMessage.SUB_COLLECTION_REORDER_SUCCESS)
  }

    const loadMore = () => {
        if(fromPage === 'profile'){
            const nextPage = page + 1;
            getCollections(nextPage);
            setPage(nextPage);
            return;
        }
        const nextPage = page + 1;
        getCall(nextPage);
        setPage(nextPage);
    };
    
    if (hideLoader && loading) return null
    if(loading){
        return(
            <div className="spinDiv">
                <Spin size='small' tip='Loading sub collections...'/>
            </div>
        )
    }

    return(
        <>
        {
        (!fromPage || fromPage === 'collection-public-shared') && 
        <>
        {
        subCollections?.length > 0 ? 
        <>
        <div className={fromPage === 'collection-public-shared' ? "collection-collapse mb-4" : "xl:px-8 collection-collapse mb-4"}>
        <Collapse ghost 
                    activeKey={subCollectionCollapseKeys} onChange={handleChangeSubCollectionCollapse}
                    expandIcon={(status) => {
                        return (
                            <div>
                            {status.isActive ? (
                                <ChevronDownIcon className={`h-5 w-5 ${wallpaper?.type ? 'text-white' : 'text-[#323543]'}`} />
                            ) : (
                                <ChevronRightIcon className={`h-5 w-5 ${wallpaper?.type ? 'text-white' : 'text-[#323543]'}`} />
                            )}
                            </div>
                        );
                        }}
                    >
                    <Panel header={
                        <div className={`text-base font-medium ${wallpaper?.type ? 'text-white' : 'text-[#323543]'}`}>
                        Sub Collections
                        </div>
                    } key="1">
            <DndContext
                onDragStart={handleDragStart}
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
                sensors={sensors}
                >
                <SortableContext 
                items={itemsId} 
                // items={subCollections?.map((col) => col.id)} 
                strategy={rectSwappingStrategy}
            >
                <div className="grid-container-sub-collection-view px-3 pb-4">
                    {
                    subCollections?.map(item => {
                    return(
                        <SingleSubItem
                            handleOpenCollection={handleOpenCollection}
                            item={item}
                            fromPage={fromPage} isSharedAndAllowEdit={isSharedAndAllowEdit}
                        />
                    )
                    })
                    }   
                </div>
            </SortableContext>
            {createPortal(
                                <DragOverlay>
                                    {draggedItem && (
                                    <SingleSubItem
                                        item={draggedItem}
                                        isDragging={true}
                                        />
                                    )}
                                </DragOverlay>,
                                document.body
            )}
            </DndContext>
        {subCollections?.length < totalCount && (
          <div className="flex justify-center items-center py-2">
            <button
              className={`${buttonLoading && 'cursor-not-allowed'} px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-2xl text-white`}
              onClick={loadMore}
              disabled={buttonLoading}
            >
              {buttonLoading ? 'Loading' : 'Load more'}
            </button>
          </div>
        )}
        </Panel>
        </Collapse>
        </div>
        </>
        :
        <></>
        }
        </>
        }

        {
        fromPage === 'profile' &&
        <>
        {
        subCollections?.length > 0 ? 
        <>
        <div className="grid-container-sub-collection-view px-3 pb-4">
                    {
                    subCollections?.map(item => {
                    return (
                      <SingleSubItem
                        handleOpenCollection={handleOpenCollection}
                        item={item}
                        fromPage={fromPage}
                        isSharedAndAllowEdit={isSharedAndAllowEdit}
                        type={type}
                      />
                    );
                    })
                    }   
        </div>
        {subCollections?.length < totalCount && (
          <div className="flex justify-center items-center mt-2 mb-4">
            <button
              className={`${buttonLoading && 'cursor-not-allowed'} px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-2xl text-white`}
              onClick={loadMore}
              disabled={buttonLoading}
            >
              {buttonLoading ? 'Loading' : 'Load more'}
            </button>
          </div>
        )}
        </>
        :
        <></>
        }
        </>
        }
        </>
    )
}

export default SubCollectionComponent;