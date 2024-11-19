import { useState, useEffect }          from 'react'
// import { AiOutlineTag }                 from 'react-icons/ai'
import { MdOutlineRefresh }             from 'react-icons/md'
import { PlusIcon,
         ChevronDownIcon, 
         ChevronUpIcon }                from '@heroicons/react/24/outline'
import { useDispatch, useSelector }                      from 'react-redux'

import TagSliderList                    from './TagSliderList'

import { selectedSecondarySidebar,
         openDrawer, 
         setIsMobileSidebar}                   from "@actions/app"
import { fetchTagsWithGemsCount, getSharedTags }       from "@actions/tags"

const TagsMenu = ({handleChangeSidebar}) => {
    const dispatch = useDispatch()
    const {secondarySidebarSelected} = useSelector(state => state.app)
    const {tagsWithGemsCount} = useSelector(state => state.tags)
    const {isMobileView} = useSelector(state => state.app)

    const [showTags, setShowTags]       = useState(true)
    const [refreshing, setRefreshing]   = useState(false)
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (tagsWithGemsCount === null) {
            setRefreshing(true)
            dispatch(fetchTagsWithGemsCount()).then((res) => {
                setRefreshing(false)
            })
            dispatch(getSharedTags())
        }
    }, [])

    const onTagRefresh = async (e) => {
        e.stopPropagation()
        setRefreshing(true)
        setCurrentPage(1)
        await dispatch(fetchTagsWithGemsCount())
        await dispatch(getSharedTags())
        setRefreshing(false)
    }

    return (
        <>
            <div className='flex flex-col mt-2 px-2 py-2 bg-white rounded-lg border-[0.6px] border-solid border-[#DFE4EC] shadow'>
            <div className={`${secondarySidebarSelected === 'tags' ? 'bg-[#E5F0FF]' : 'bg-white'} rounded w-full p-[3px] flex items-center justify-between  cursor-pointer`} onClick={(e) => {
                e.stopPropagation()
                isMobileView && dispatch(setIsMobileSidebar(false))
                handleChangeSidebar('tags')}}>
                <div className="flex items-center cursor-pointer">
                    {/* <AiOutlineTag className="h-4 w-4 text-[#97A0B5]"/> */}
                    <div className="ml-2 text-[#1A3D71] font-medium">Tags</div>
                </div>

                
                <div className='flex items-center'>
                    <MdOutlineRefresh className="h-4 w-4 cursor-pointer" onClick={onTagRefresh} />
                    <PlusIcon className="h-4 w-4 cursor-pointer mx-1" onClick={(e) => {
                        e.stopPropagation()
                        dispatch(selectedSecondarySidebar('tags'))
                        dispatch(openDrawer('tags'))
                        isMobileView && dispatch(setIsMobileSidebar(false))
                    }}/>
                    {
                        showTags 
                            ? <ChevronUpIcon className="h-4 w-4 cursor-pointer" onClick={(e) => {
                                e.stopPropagation()
                                setShowTags(!showTags)
                            }}/> 
                            : <ChevronDownIcon className="h-4 w-4 cursor-pointer" onClick={(e) => {
                                e.stopPropagation()
                                setShowTags(!showTags)
                            }}/>
                    }
                </div>
            </div>
            {
                showTags && <div className="bg-white rounded-lg flex mt-2 px-1 flex-col">
                    <TagSliderList loading={refreshing} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                </div>
            }
            </div>
        </>
    )
}

export default TagsMenu