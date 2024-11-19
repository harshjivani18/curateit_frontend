import { 
    Collapse, 
    Spin, 
    message 
}                                   from "antd";
import { 
    useEffect, 
    useMemo, 
    useState 
}                                   from "react";
import { 
    useDispatch, 
    useSelector 
}                                   from "react-redux";
import { 
    ChevronDownIcon, 
    ChevronRightIcon 
}                                   from "@heroicons/react/24/outline";
import slugify                      from "slugify";
import { useRouter }                from "next/navigation";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverlay
}                                   from "@dnd-kit/core";
import { 
    SortableContext, 
    arrayMove, 
    rectSwappingStrategy, 
    sortableKeyboardCoordinates 
}                                   from "@dnd-kit/sortable";
import { createPortal }             from "react-dom";

import SingleSubItem                from "./SingleSubItem";

import { TextMessage }              from "@utils/constants";

import { sidebarSelected }          from "@actions/app";
import { 
    addSubTagData, 
    getSubTags, 
    updateTag 
}                                   from "@actions/tags";

const { Panel } = Collapse;

const SubTagComponent = ({tagId,setSubTagsCount=() => {},fromPage='',wallpaper='',isSharedAndAllowEdit}) => {
    const { subTagValue } = useSelector(state => state.tags)
    const navigate = useRouter()
    const dispatch = useDispatch()
    const [subTags,setSubTags] = useState([])
    const [page,setPage] = useState(1) 
    const [loading,setLoading] = useState(false) 
    const [totalCount,setTotalCount] = useState(0) 
    const [subTagCollapseKeys, setSubTagCollapseKeys]     = useState(['1'])
    const [buttonLoading, setButtonLoading] = useState(false);

    const itemsId = useMemo(() => subTags?.map((col) => col.id), [subTags])
    const [draggedItem, setDraggedItem] = useState(null);
    const [orderOfSubTags, setOrderOfSubTags] = useState([]);

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
        
        const res = await dispatch(getSubTags(tagId,page))
        if(res){
            setSubTags((prev) => [...prev,...res?.payload?.data?.data || []])
            setTotalCount(res?.payload?.data?.count || 0)
            setSubTagsCount(res?.payload?.data?.count || 0)
            setOrderOfSubTags(res?.payload?.data?.orderOfSubTags || [])
        }

        setLoading(false)
        setButtonLoading(false)
    }

    useEffect(() => {
        getCall(1)
   },[tagId])

   useEffect(() => {
    if(subTagValue && subTagValue?.tag){
        setSubTags([...subTags,subTagValue])
        setSubTagsCount((prev) => prev + 1)
        dispatch(addSubTagData(null))
    }
   },[subTagValue])

   const handleChangeSubTagCollapse = (key) => {
    setSubTagCollapseKeys(key)
  }

    const handleOpenTag = (item) => {
        dispatch(sidebarSelected(`Folder-${item.id}`))
        if(fromPage === 'collection-public-shared'){
            navigate.push(`/u/${item?.author?.username}/tags/${item.id}/${item?.slug || slugify(item.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}?public=true`)  
        }else{
            navigate.push(`/u/${item?.author?.username}/tags/${item.id}/${item?.slug || slugify(item.tag || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}`)
        }
    }

    const getTaskPos = (id) => subTags.findIndex((item) => item.id === id)

    const handleDragStart = (event) => {
        const { active } = event;
        setDraggedItem(subTags.find(item => item.id === active.id));
    };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    setDraggedItem(null)

    if (active.id === over.id) return;

    const originalPos = getTaskPos(active.id);
    const newPos = getTaskPos(over.id)

    const data = arrayMove(subTags, originalPos, newPos)
    getSortedItems(data)
  }

  const getSortedItems = (items) => {
    const initReoderedItemsId = items?.map(item => item.id)
    const order = [...orderOfSubTags]
    const length = subTags?.length

    const getItemsAfter = order.slice(length)
    const reorder = [...initReoderedItemsId,...getItemsAfter]

    setSubTags(items)
    setOrderOfSubTags(reorder)
    const payload = {
        order_of_sub_tags: reorder
    }

    dispatch(updateTag(tagId, payload))
    message.success(TextMessage.SUB_TAG_REORDER_SUCCESS)
  }

    const loadMore = () => {
        const nextPage = page + 1;
        getCall(nextPage);
        setPage(nextPage);
    };

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
        subTags?.length > 0 ? 
        <>
        <div className="xl:px-8 collection-collapse mb-4">
        <Collapse ghost 
                    activeKey={subTagCollapseKeys} onChange={handleChangeSubTagCollapse}
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
                        Sub Tags
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
                strategy={rectSwappingStrategy}
            >
                <div className="grid-container-sub-collection-view px-3 pb-4">
                    {
                    subTags?.map(item => {
                    return(
                        <SingleSubItem
                            handleOpenCollection={handleOpenTag}
                            item={item} isSharedAndAllowEdit={isSharedAndAllowEdit} fromPage={fromPage}
                            isTag={true}
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
        {subTags?.length < totalCount && (
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
    )
}

export default SubTagComponent;