'use client'

import "./styles.css";
import React, { useEffect, useState }                     from 'react'
import { Layout }                                         from 'antd' 
import { Resizable }                                      from 're-resizable';
import { InformationCircleIcon, ChatBubbleOvalLeftIcon }  from '@heroicons/react/24/outline'
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon }  from '@heroicons/react/20/solid';
import { FiEdit3 }                                        from "react-icons/fi"
import { RiYoutubeLine }                                  from "react-icons/ri";
import { useSelector, useDispatch }                       from "react-redux";
import { IoAnalytics }                                    from "react-icons/io5";
import { useParams, usePathname }                         from "next/navigation";

import InfoContainer                                      from "./InfoContainer";
import MainContainer                                      from "@components/comment/MainContainer";
import BookDetails                                        from "@components/info/BookDetails";
import AllHighlights                                      from "@components/allHighlights/AllHighlights";
import Transcript                                         from "@components/transcript/Transcript";
import Dashboard                                          from "@containers/dashboard/Dashboard";

import session                                            from "@utils/session";
import { MediaTypesInfoButton }                           from "@utils/constants";

import { fetchUrlHighlights }                             from "@actions/gems";
import { openAuthModal }                                  from "@actions/app";


const  { Sider, Content } = Layout;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



const GemSideBar = ({ collapsed, handleChangeCollapse, bookmark, selectedTab = "info", videoSeekTo,gemPublicView=false }) => {
  const currentGem = useSelector(state => state.gems?.currentGem) || bookmark;
  const [width, setWidth] = useState(60);
  const [selectedItem, setselectedItem] = useState(selectedTab)
  const dispatch = useDispatch();
  const [highlights, setHighlights] = useState([]);
  const [modal, setModal]            = useState(false);
  const [showAnalyticsSidebar, setShowAnalyticsSidebar] = useState(false);

  const searchParams = useParams();
  const searchPathname = usePathname();
  const uname = searchParams?.username;
  const module = searchPathname?.includes("/g/") ? "gems" : searchPathname?.includes("/tags/") ? "tags" : searchPathname?.includes("/c/") ? "collections" : null;
  const sourceId = searchParams?.gemId || searchParams?.colllectionId || searchParams?.tagId || searchParams?.id;
  const slug = searchParams?.name;

  // const searchParams = window.location.pathname.split("/");
  // const uname = searchParams[2];
  // const module = searchParams[3] === "tags" ? "tags" : searchParams[3] === "c" ? "collections" : searchParams[3] === "g" ? "gems" : null;
  // const sourceId = searchParams[4];
  // const slug = searchParams[5];


  useEffect(() =>{
    setselectedItem(selectedTab)
  },[selectedTab])

  const showModal = () => {
    setModal(false);
  }

  const closeModal = () => {
    setModal(false);
  }

  const openModal = () => {
    setModal(true);
  }

  useEffect(() => {
    
    const bData = (bookmark?.attributes?.media_type !== "Article" && bookmark?.attributes?.media_type !== "Link") ? currentGem?.attributes?.child_gem_id?.data : []
    if ((!bData || bData.length === 0) && bookmark?.attributes?.url) {
      const NOT_HIGHLIGHT_TYPES = [
        "Note",
        "Quote",
        "Image",
        "Text Expander",
        "Ai Prompt",
        "Highlight"
      ]
      const bData = (bookmark?.attributes?.media_type !== "Article" && bookmark?.attributes?.media_type !== "Link") ? currentGem?.attributes?.child_gem_id?.data : []
      if ((!bData || bData.length === 0) && bookmark?.attributes?.url && NOT_HIGHLIGHT_TYPES.indexOf(bookmark?.attributes?.media_type) === -1) {
        !gemPublicView && dispatch(fetchUrlHighlights(bookmark?.attributes?.url)).then((res) => {
          if (res.error === undefined) {
            setHighlights(res?.payload?.data?.map((h) => ({ id: h?.id, attributes: h })))
          }
        })
      }
    }
  }, [dispatch, currentGem, bookmark])

  useEffect(() => {
    setWidth(collapsed ? 60 : 400)
  }, [collapsed])

  const handleCollapse = () => {
    handleChangeCollapse(!collapsed)
    setWidth(!collapsed ? 60 : 400)
    setShowAnalyticsSidebar(false)
  }

  const handleSelectedItem = (item) => {
    setselectedItem(item);
    if(collapsed){
      handleChangeCollapse(!collapsed);
    }
  }

  return (
    <Resizable
      size={{ width, height: '100%' }}
      onResizeStop={(e, direction, ref, d) => {
        setWidth(ref.style.width);
      }}
      enable={{
        top: false, bottom: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false,
        right: false,
        left: collapsed ? false : true
      }}
    >
      <Sider
        className="gem-sidebar"
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={60}
        width={width}
      >
        <div className='flex justsify-end h-full'>
          {!collapsed && <div className="flex-1 p-4">
            {selectedItem === 'info' ? (
              bookmark?.attributes?.media_type === "Book" ? <BookDetails title={bookmark?.attributes?.title} altInfo={bookmark?.attributes?.altInfo || bookmark?.attributes?.title || bookmark?.attributes?.description || ""} /> : <InfoContainer url={bookmark?.attributes?.url} mediaType={bookmark?.attributes?.media_type} title={bookmark?.attributes?.title} socialFeed={bookmark?.attributes?.socialfeed_obj} mainBookmark={bookmark?.attributes} />
            ) : selectedItem === 'highlight' ? (
              <div>
                  {/* <h1 className='font-bold text-lg mb-2'>Highlights</h1>
                  {bookmark?.attributes?.child_gem_id && 
                    bookmark?.attributes?.child_gem_id?.data &&
                    Array.isArray(bookmark?.attributes?.child_gem_id?.data) &&
                    bookmark?.attributes?.child_gem_id?.data.length > 0 ? (
                      <AllHighlights allHighlights={bookmark?.attributes?.child_gem_id?.data} user={bookmark?.attributes?.author?.data?.attributes} />
                    ) : (
                      <h2 className="py-4 text-center text-xs">No highlights found</h2>
                    )} */}
                  <>
                    {currentGem?.attributes?.media_type !== "Article" && bookmark?.attributes?.media_type !== "Link" && currentGem?.attributes?.child_gem_id &&
                      currentGem?.attributes?.child_gem_id?.data &&
                      Array.isArray(currentGem?.attributes?.child_gem_id?.data) &&
                      currentGem?.attributes?.child_gem_id?.data.length > 0 ? (
                        <div className='p-2'>
                          <span className='font-bold text-lg mb-2'>Highlights</span>
                          <AllHighlights
                            allHighlights={currentGem?.attributes?.child_gem_id?.data}
                            user={currentGem?.attributes?.author?.data?.attributes}
                            isSidebar={true}
                            width={width}
                          />
                        </div>
                      )
                      : highlights.length !== 0 ? (
                        <div className='p-2'>
                          <span className='font-bold text-lg mb-2'>Highlights</span>
                          <AllHighlights
                            allHighlights={highlights}
                            user={currentGem?.attributes?.author?.data?.attributes}
                            isSidebar={true}
                            width={width}
                          />
                        </div>
                        ) : (
                          <div className="text-center py-4">
                            <span>No highlight available</span>
                          </div>
                        )
                      }
                    {/* {(bookmark?.attributes?.media_type === "Code" || bookmark?.attributes?.media_type === "Image") && (
                      <div className='p-2'>
                        <h1 className='font-bold text-lg mb-2'>Highlights</h1>
                        <AllHighlights
                          allHighlights={[bookmark]}
                          user={bookmark?.attributes?.author?.data?.attributes}
                        />
                      </div>
                    )} */}
                  </>
              </div>
            ) 
            : 
            selectedItem === "comment" ? (
              <div className="h-full">
                  <MainContainer 
                    hideCloseButton={true}
                    openDrawer={selectedItem === "comment"} 
                    selectedGem={bookmark?.id} 
                    user={{ id: bookmark?.attributes?.author?.data?.id, username: bookmark?.attributes?.author?.data?.attributes?.username }} 
                  />
              </div>
            ) 
            : 
            selectedItem === "transcript" ? (
              <div className="h-full">
                  <Transcript
                    url={bookmark?.attributes?.url} 
                    mediaType={bookmark?.attributes?.media_type}
                    user={{ id: bookmark?.attributes?.author?.data?.id, username: bookmark?.attributes?.author?.data?.attributes?.username }}
                    width={width}
                    videoSeekTo={videoSeekTo}
                  />
              </div>
            ) 
            : 
            selectedItem === "analytics" ? (
              // <div className="h-full">
              //     <Dashboard />
              // </div>
              <div className="h-full">
                <Content style={{
                  backgroundColor: '#FCFCFD',
                }}>
                  <Dashboard isSticky={false} dashUrl={window.location.href} showClearFilter={false} isPagePadding={false} />
                </Content>
                {/* <AnalyticsDrawer open={showAnalyticsSidebar} setOpenDrawer={setShowAnalyticsSidebar} /> */}

              </div>
            ) 
            : null }
          </div>}
          <div style={{ width: 60 }} className={classNames(!collapsed && "border-l-[0.7px] py-4 border-gray-200", 'h-full flex flex-col justify-start items-center gap-4' )}>
            <button className="outline-none w-8 h-8 flex justify-center items-center">
              {collapsed ? (
                <ChevronDoubleLeftIcon
                  className="h-5 w-5 text-gray-500"
                  onClick={handleCollapse}
                  
                />
              ) : (
                <ChevronDoubleRightIcon
                  className="h-5 w-5 text-gray-500"
                  onClick={handleCollapse}
                />
              )}
            </button>
            {MediaTypesInfoButton.includes(bookmark?.attributes?.media_type) && <button 
              className={classNames(!collapsed && selectedItem === "info" && "bg-light-blue","w-8 h-8 flex justify-center items-center border-[0.3px] border-gray-200 rounded-md")}
              onClick={() => { 
                handleSelectedItem("info")
                setShowAnalyticsSidebar(false)
              }}
              >
              <InformationCircleIcon className={classNames(!collapsed && selectedItem === "info" && "text-white", "h-5 w-5")} />
            </button>}
            <button 
              className={classNames(!collapsed && selectedItem === "highlight" && "bg-light-blue", "w-8 h-8 flex justify-center items-center border-[0.3px] border-gray-200 rounded-md")}
              onClick={() => {
                handleSelectedItem("highlight")
                setShowAnalyticsSidebar(false)
              }}
              >
              <FiEdit3 className={classNames(!collapsed && selectedItem === "highlight" && "text-white", "h-5 w-5")} />
            </button>
            {<button 
              className={classNames(!collapsed && selectedItem === "comment" && "bg-light-blue", "w-8 h-8 flex justify-center items-center border-[0.3px] border-gray-200 rounded-md")}
              onClick={() => {
                if(session && session?.userId){
                  handleSelectedItem("comment")
                }else{
                  dispatch(openAuthModal({
                      open: true,
                      action : 'login',
                      extraInfo: {
                        trigger: 'comment',
                        username: uname,
                        id: sourceId,
                        module: module,
                        slug: slug
                      }
                  }))
                }
                setShowAnalyticsSidebar(false)
              }}
              >
              <ChatBubbleOvalLeftIcon className={classNames(!collapsed && selectedItem === "comment" && "text-white", "h-5 w-5")} />
            </button>}


            <button 
              className={classNames(!collapsed && selectedItem === "analytics" && "bg-light-blue", "w-8 h-8 flex justify-center items-center border-[0.3px] border-gray-200 rounded-md")}
              onClick={() => {
                handleSelectedItem("analytics")
                setShowAnalyticsSidebar(true)
              }}
              >
              <IoAnalytics className={classNames(!collapsed && selectedItem === "analytics" && "text-white", "h-5 w-5")} />
            </button>



            {bookmark?.attributes?.media_type === "Video" && bookmark?.attributes?.url.startsWith("https://www.youtube.com/") && <button
              className={classNames(!collapsed && selectedItem === "transcript" && "bg-light-blue", "w-8 h-8 flex justify-center items-center border-[0.3px] border-gray-200 rounded-md")}
              onClick={() => {
                handleSelectedItem("transcript")
                setShowAnalyticsSidebar(false)
              }}
            >
              <RiYoutubeLine className={classNames(!collapsed && selectedItem === "transcript" && "text-white", "h-5 w-5")} />
            </button>}
            {/* {bookmark?.attributes?.media_type !== "Video" && (bookmark?.attributes?.media?.videoLink?.includes("youtube") || bookmark?.attributes?.metaData?.url?.includes("youtube"))  && bookmark?.attributes?.media_type !== "Code" && <button 
              className={classNames(!collapsed && selectedItem === "transcript" && "bg-light-blue","w-8 h-8 flex justify-center items-center border-[0.3px] border-gray-200 rounded-md")}
              onClick={() => handleSelectedItem("transcript")}
              >
              <InformationCircleIcon className={classNames(!collapsed && selectedItem === "info" && "text-white", "h-5 w-5")} />
            </button>} */}
            {/* <button className="w-8 h-8 flex justify-center items-center border-[0.3px] border-gray-200 rounded-md">
              <InformationCircleIcon className="h-5 w-5" />
            </button> */}
          </div>
        </div>
        
        {/* {modal && (
          <Modals modal={modal} showModal={showModal} closeModal={closeModal} currentAction={null}/>
        )} */}
      </Sider>
      </Resizable>
  )
}

export default GemSideBar;