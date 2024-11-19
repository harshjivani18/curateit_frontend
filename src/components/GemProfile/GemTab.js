'use client'

import React, { 
    useEffect, 
    useState 
}                                           from 'react'
import { 
    ChatBubbleOvalLeftIcon, 
    InformationCircleIcon 
}                                           from '@heroicons/react/24/outline'
import { FiEdit3 }                          from 'react-icons/fi'
import { useDispatch, useSelector }         from 'react-redux'
import { RiYoutubeLine }                    from 'react-icons/ri'

import InfoContainer                        from './InfoContainer'
import MainContainer                        from '@components/comment/MainContainer'
import AllHighlights                        from '@components/allHighlights/AllHighlights'
import Transcript                           from '@components/transcript/Transcript'
import BookDetails                          from '@components/info/BookDetails'

import { fetchUrlHighlights }               from '@actions/gems'


const TABS = [
    {
        name: "Info",
        current: false,
        disabled: true,
        icon: <InformationCircleIcon className="h-5 w-5" />
    },
    {
        name: "Highlight",
        current: true,
        disabled: false,
        icon: <FiEdit3 className="h-5 w-5" />
    },
    {
        name: "Comment",
        current: false,
        disabled: true,
        icon: <ChatBubbleOvalLeftIcon className="h-5 w-5" />
    },
    {
        name: "Transcript",
        current: false,
        disabled: true,
        icon: <RiYoutubeLine className="h-5 w-5" />
    }
]

const GemTab = ({ bookmark,gemPublicView='' }) => {
    const currentGem = useSelector(state => state.gems?.currentGem) || bookmark
    const dispatch                      = useDispatch();
    const [highlights, setHighlights]   = useState([]);
    // const [tabs, setTabs] = useState(TABS);

    // const activateTab = (name) => {
    //     const newTab = tabs.map(t => {
    //         if (t.name === name) {
    //             return { ...t, current: true }
    //         } else {
    //             return { ...t, current: false }
    //         }
    //     })

    //     setTabs(newTab);
    // }
    useEffect(() => {
        const bData = currentGem?.attributes?.child_gem_id?.data
        if ((!bData || bData.length === 0) && bookmark?.attributes?.url) {
        const NOT_HIGHLIGHT_TYPES = [
            "Note",
            "Quote",
            "Image",
            "Text Expander",
            "Ai Prompt",
            "Highlight"
        ]
        const bData = bookmark?.attributes?.child_gem_id?.data
        if ((!bData || bData.length === 0) && bookmark?.attributes?.url && NOT_HIGHLIGHT_TYPES.indexOf(bookmark?.attributes?.media_type) === -1) {
            !gemPublicView && dispatch(fetchUrlHighlights(bookmark?.attributes?.url)).then((res) => {
                if (res.error === undefined) {
                    setHighlights(res?.payload?.data?.map((h) => ({ id: h?.id, attributes: h })))
                }
            })
        }
        }
    }, [dispatch, currentGem, bookmark])
    
    return (
        <div className='mt-2'>
            {/* <div className='flex justify-start items-center px-2'>
                <Tabs showTabs={tabs} activateTab={activateTab} />
            </div> */}
            <div>
                {TABS[0]?.current === true ? (
                    bookmark?.attributes?.media_type === "Book" ? <BookDetails title={bookmark?.attributes?.title} altInfo={bookmark?.attributes?.altInfo || bookmark?.attributes?.title || bookmark?.attributes?.description || ""} /> : <InfoContainer url={bookmark?.attributes?.url} mediaType={bookmark?.attributes?.media_type} />

                ) : TABS[1]?.current === true ? (
                    // <div className='p-2'>
                    //     <h1 className='font-bold text-lg mb-2'>Highlights</h1>
                    //     {bookmark?.attributes?.child_gem_id &&
                    //         bookmark?.attributes?.child_gem_id?.data &&
                    //         Array.isArray(bookmark?.attributes?.child_gem_id?.data) &&
                    //         bookmark?.attributes?.child_gem_id?.data.length > 0 ? (
                    //         bookmark?.attributes?.child_gem_id?.data.map(book => (
                    //             <div className="mb-2" key={book?.id}>
                    //                 <TextHighlight media={book?.attributes?.media} obj={{ id: book?.id, ...book?.attributes }} />
                    //             </div>
                    //         ))
                    //     ) : (
                    //         <h2 className="py-4 text-center text-xs">No highlights found</h2>
                    //     )}
                    // </div>
                    <>
                        {currentGem?.attributes?.child_gem_id &&
                            currentGem?.attributes?.child_gem_id?.data &&
                            Array.isArray(currentGem?.attributes?.child_gem_id?.data) &&
                            currentGem?.attributes?.child_gem_id?.data.length > 0 ? (
                                <div className='p-2'>
                                    <span className='font-bold text-lg mb-2'>Highlights</span>
                                    <AllHighlights 
                                        allHighlights={currentGem?.attributes?.child_gem_id?.data} 
                                        user={currentGem?.attributes?.author?.data?.attributes} 
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
                            ) : null
                        }
                            {/* {(bookmark?.attributes?.media_type === "Image") && (
                                <div className='p-2'>
                                    <h1 className='font-bold text-lg mb-2'>Highlights</h1>
                                    <AllHighlights
                                        allHighlights={[bookmark]}
                                        user={bookmark?.attributes?.author?.data?.attributes}
                                    />
                                </div>
                            )} */}
                    </>
                ) 
                : 
                TABS[2]?.current === true ?(
                    <div className="h-full p-2">
                        <MainContainer
                            hideCloseButton={true}
                            openDrawer={true}
                            selectedGem={bookmark?.id}
                            user={{ id: bookmark?.attributes?.author?.data?.id, username: bookmark?.attributes?.author?.data?.attributes?.username }}
                        />
                    </div>
                )
                :
                    TABS[3]?.current === true && bookmark?.attributes?.url.startsWith("https://www.youtube.com/") && (
                    <div className="h-full p-2">
                        <Transcript
                            url={bookmark?.attributes?.url} mediaType={bookmark?.attributes?.media_type}
                            user={{ id: bookmark?.attributes?.author?.data?.id, username: bookmark?.attributes?.author?.data?.attributes?.username }}
                        />
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default GemTab