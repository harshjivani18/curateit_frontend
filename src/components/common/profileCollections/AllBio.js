'use client'
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveGridLayout = WidthProvider(Responsive);

import { getHandWUnits, getHandWUnitsSocialFeed, getHandWUnitsTitle } from "@utils/commonFunctions";
import React, { useState, useEffect } from "react";

import BlockContainer from "./BlockContainer";
import AddBookmark from '@components/drawers/AddBookmark';
import { HiOutlinePlus } from 'react-icons/hi';
import SingleBookmarkDrawer from '@components/drawers/SingleBookmarkDrawer';
import { Spin } from 'antd';
import { bulkSelectEdit, getBookmarkInBio, updateGem } from '@actions/collection';
import { useDispatch } from 'react-redux';
import session from '@utils/session';
import { debounceFunc } from '@utils/constants';
import { updateColorOptions, updateNoteOptions } from '@utils/find-collection-id';
import BioModal from '@components/modal/BioModal';
import BioMoreOptionModal from '@components/modal/BioMoreOptionModal';

const AllBio = ({bioId,userName,setSocialLinks,socialLinks,bioContactId}) => {
    const dispatch = useDispatch()
    const [loadingState, setLoadingState] = useState(false);
    const [blocks, setBlocks] = useState([]);
    const [openDrawer, setOpenDrawer]           = useState(false)
    const [openEditDrawer, setOpenEditDrawer]           = useState(false)
    const [gemSingleId, setGemSingleIdSingleId] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isDraggable, setIsDraggable] = useState(true); 
    const [isMobile, setIsMobile] = useState(false);
    const [selectedBlock, setSelectedBlock] = useState(null);
    const [screenWidth, setScreenWidth] = useState(null);
    const [openModal, setOpenModal] = useState(null);
    const [selectedMediaType, setSelectedMediaType] = useState(null);
    const [selectedNoteType, setSelectedNoteType] = useState(null);
    const [selectedFileType, setSelectedFileType] = useState(null);
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [name, setName] = useState(userName?.startsWith("@") ? userName?.substring(1) : userName);
    const [moveable, setMovable] = useState(true); 
    const [openMoreOptionModal, setOpenMoreOptionModal] = useState(false); 
    const [selectedItem, setSelectedItem] = useState(null); 
    const [optionType, setOptionType] = useState('');
    const [selectedProfileType, setSelectedProfileType] = useState(null); 
    useEffect(() => {
        if (typeof window === 'undefined') return;
        function handleResize() {
          setScreenWidth(window.innerWidth)
          if (window.innerWidth <= 768) {
            setIsMobile(true)
          } else {
            setIsMobile(false)
          }
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
      if(bioId){
        setName(userName?.startsWith("@") ? userName?.substring(1) : userName)
        setIsDraggable((userName?.startsWith("@") ? userName?.substring(1) : userName) === session?.username ? true : false)
        const getCall = async() => {
        if (page === 1) {
          setLoadingState(true)
        } else {
          setLoadingState(false)
        }
        setLoading(true)
        const res = await dispatch(getBookmarkInBio(bioId, page))
        if(res){
          setLoadingState(false)
          const uniqueData = [...blocks, ...res?.payload?.data?.collection?.gems || []].filter((value, index, self) => 
              index === self.findIndex((v) => (
                  v.id === value.id
              ))
          );
          
          let newUniqueArr = [ ...uniqueData ]
          newUniqueArr.forEach((u) => {
              const parentIndex = newUniqueArr.findIndex((n) => { return n?.id === u?.parent_gem_id?.id })
              if (parentIndex !== -1) {
                newUniqueArr.splice(parentIndex, 1)
                newUniqueArr = [...newUniqueArr]
              }
          })
          
          
          setBlocks(newUniqueArr || []);
          if (res?.payload?.data?.totalBookmark <= blocks.length + res?.payload?.data?.collection?.gems?.length) {
            setHasMore(false);
          }
          setLoading(false);
        }
        }

      getCall()
      }
    },[bioId,page])

    useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight = e.target.documentElement.scrollTop + window.innerHeight;
      if (loading) return;
      if(currentHeight + 1 >= scrollHeight && hasMore && !loading){
        setPage((prev) => prev + 1)
      }
    }

      const debouncedHandleScroll = debounceFunc(handleScroll, 200);

      window.addEventListener('scroll', debouncedHandleScroll);
      return () => {
        window.removeEventListener('scroll', debouncedHandleScroll);
      };
  }, [hasMore, loading]);

    const onDragStop = (layout,oldItem,newItem) => {
      // const data = updatePosition(blocks,newItem.i,{x: newItem.x , y: newItem.y})
      // setBlocks(data)

      // const itemObj = data.filter(item => item.id ===  Number(newItem.i))
      // dispatch(updateGem(newItem.i, { data: itemObj[0] }))
      if(moveable){
        const newBlocks = blocks.map(block => {
        const layoutItem = layout.find(item => item.i === block.id.toString());
        if (layoutItem) {
          return { 
            ...block, 
            media: {...block.media,x: layoutItem.x, y: layoutItem.y} 
          };
        }
        return block;
        });
        // setBlocks(newBlocks);

        const data = newBlocks.map(item => {
          return {
              custom_fields_obj: item.custom_fields_obj,
              tags: item.tags,
              is_favourite: item.is_favourite,
              collection_gems: bioId,
              remarks: item.remarks,
              media: item.media,
              id: item.id
          }
        })
        dispatch(bulkSelectEdit(data))
      }
    };

  const handleShowMenu = (block) => {
    setSelectedBlock(block)
  }

  const handleChangeOtherOptions = (e,type,value,item) => {
    e.stopPropagation()
    const data = updateNoteOptions(blocks,item.id,type,value)
    setBlocks(data)
    
    let finalObj = {
            title: item?.title,
            description: item?.description,
            media_type: item.media_type,
            author: item?.author?.id,
            url: item.url,
            metaData: {
                ...item?.metaData,
            },
            collection_gems: Number(session.bio_collection_id),
            remarks: item.remarks,
            tags: item?.tags?.map((t) => { return t.id }),
            is_favourite: item.favorite,
            media : item.media
    }

    if(type === 'text-align'){
        finalObj = {
            ...finalObj,
            media: {
                ...finalObj.media,
                textAlign: value
            }
        }
    }
    if(type === 'justify-content'){
        finalObj = {
            ...finalObj,
            media: {
                ...finalObj.media,
                justifyContent: value
            }
        }
    }
    if(type === 'color'){
        finalObj = {
            ...finalObj,
            media: {
                ...finalObj.media,
                color: value
            }
        }
    }

    if(type === 'bold'){
      finalObj = {
            ...finalObj,
            media: {
                ...finalObj.media,
                fontWeight: value
            }
        }
    }

    if(type === 'italic'){
      finalObj = {
            ...finalObj,
            media: {
                ...finalObj.media,
                textItalic: value
            }
        }
    }

    if(type === 'underline'){
      finalObj = {
            ...finalObj,
            media: {
                ...finalObj.media,
                textUnderline: value
            }
        }
    }

    if(type === 'fontSize'){
      finalObj = {
            ...finalObj,
            media: {
                ...finalObj.media,
                fontSize: value
            }
        }
    }

    dispatch(updateGem(item.id, { data: finalObj }))
    setSelectedItem({
      id: item?.id,
      ...finalObj
    })
    // setOpenMoreOptionModal(false)
  }

  const handleChangeColorOptions = (value,item) => {
    const val = value?.startsWith('#') ? value : `#${value}`
    const data = updateColorOptions(blocks,item.id,val)
    setBlocks(data)
    
    let finalObj = {
            title: item?.title,
            description: item?.description,
            media_type: item.media_type,
            author: item?.author?.id,
            url: item.url,
            metaData: {
                ...item?.metaData,
            },
            collection_gems: Number(session.bio_collection_id),
            remarks: item.remarks,
            tags: item?.tags?.map((t) => { return t.id }),
            is_favourite: item.favorite,
            media : {
              ...item.media,
              // cardBgColor: val
            }
    }

    dispatch(updateGem(item.id, { data: finalObj }))
    setSelectedItem({
      id: item?.id,
      ...finalObj
    })
    // setOpenMoreOptionModal(false)
  }

    return (
    <>
    {
    loadingState ? <div className="spinDiv">
                  <Spin size="middle" tip="Loading..." />
              </div> :
    <>
        {
        blocks?.length >0 ? 
        <div style={{ width: '100%',margin:'auto'}}>
        <ResponsiveGridLayout
            className="layout"
            breakpoints={{xl:1800, lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ xl:10, lg: 8, md: 6, sm: 6, xs: 4, xxs: 2 }}
            isResizable={false}
            margin={[10,20]}
            width={'100%'}
            containerPadding={[5,5]}
            onDragStop={onDragStop}
            draggableHandle=".drag-handle"
            draggableCancel=".drag-cancel"
            isDraggable={isDraggable}
            rowHeight={150}
            onDragStart={() => 
              {
                setIsDraggable(false)
                setMovable(false)
              }
            }
            onDrag={() => {
              setIsDraggable(true)
              setMovable(true)
            }}
            >
            {   
              blocks.
              map((block,i) => {
                  const { width, height } = (block?.media_type === 'Note' && block?.media?.noteType === 'title') ? getHandWUnitsTitle(screenWidth) : (block?.media_type === 'SocialFeed' && (block?.platform === 'Twitter' || block?.platform === 'Tiktok' || block?.platform === 'Instagram')) ? getHandWUnitsSocialFeed(block?.media?.shape || 'square') :
                  getHandWUnits(block?.media?.shape || 'square');

                  // const bgClr = block?.media?.cardBgColor ? hexToRGBA(block?.media?.cardBgColor) : ''

                  const l = {
                      x: block?.media?.x || 0,
                      y: block?.media?.y || Infinity,
                      // x: !block?.media?.x ? block?.media?.x : 0,
                      // y: !block?.media?.y ? block?.media?.y : 0,
                      w: isMobile ? 4 : width, 
                      h: height,
                      i: block.id.toString(),
                      minH:0.5,
                      maxH:2,
                      // maxW:2,
                      // minW:1
                  }
                  return(
                  <div key={block.id} data-grid={l}
                      className={`select-none shadow relative group rounded-[24px] bg-white opcaity-100 border border-solid p-2 ${(isMobile && block.id === selectedBlock?.id) ? 'border border-solid border-black shadow-lg' : ''} 
                      ${(isMobile && block.id !== selectedBlock?.id) ? 'drag-cancel' : ''}
                      `}
                      onClick={(e) => {
                        e.stopPropagation()
                        setMovable(false)
                        if(!isMobile && !isDraggable && block?.url) {
                          window.open(block?.url,'_blank')
                          // setIsDraggable(true)
                        };
                        if(isMobile){
                          handleShowMenu(block)
                        }
                        setMovable(true)
                      }}
                      style={{
                        backgroundColor: (block?.media_type === 'Note' && block?.media?.noteType === 'description') ? block.media.color.colorCode : 'white'
                      }}
                  >
                      <BlockContainer
                      block={block}
                      setBlocks={setBlocks}
                      blocks={blocks}
                      setOpenEditDrawer={setOpenEditDrawer}
                      setGemSingleIdSingleId={setGemSingleIdSingleId}
                      isMobile={isMobile}
                      selectedBlock={selectedBlock}
                      setSelectedBlock={setSelectedBlock}
                      setOpenMoreOptionModal={setOpenMoreOptionModal}
                      setSelectedItem={setSelectedItem}
                      setOptionType={setOptionType}
                      bioContactId={bioContactId}
                      />
                  </div>
                  )
              })
            }
        </ResponsiveGridLayout>
        </div>
        :
        <div className="text-xl flex justify-center items-center">
          <div className="relative mt-2">
                <img
                  className="h-50 w-50 my-0 mx-auto"
                  src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/upload-error.svg`}
                  alt="Cloud ellipse icons"
                />
                <div className="justify-center w-full text-xs text-center text-gray-400">
                  No data!
                </div>
          </div>
        </div>
        }

        {name === session.username && <div className={`fixed bottom-10 right-5 cursor-pointer bg-[#347AE2] text-white p-3 rounded-xl shadow-lg z-[999]`} onClick={() => {
            setOpenModal(true)
        }}>
            <HiOutlinePlus className="h-6 w-6 text-white"/>
        </div>}

        {hasMore && loading && <div className="spinDiv">
            <Spin size='middle' tip='Loading...'/>
          </div> }

        {
        openModal &&
        <BioModal openModal={openModal} setOpenModal={setOpenModal}
        setSelectedMediaType={setSelectedMediaType}
        setOpenDrawer={setOpenDrawer}
        setSelectedNoteType={setSelectedNoteType} setSelectedFileType={setSelectedFileType}
        setSelectedPlatform={setSelectedPlatform}
        setSelectedProfileType={setSelectedProfileType}
        />
        }

        {
        openDrawer && <AddBookmark open={openDrawer} setOpen={setOpenDrawer} page={'bio'} blocksLength={blocks?.length}
        setBlocks={setBlocks}
        blocks={blocks}
        selectedMediaType={selectedMediaType}
        selectedNoteType={selectedNoteType}
        selectedFileType={selectedFileType}
        screenWidth={screenWidth}
        selectedPlatform={selectedPlatform}
        socialLinks={socialLinks}
        setSocialLinks={setSocialLinks}
        setSelectedPlatform={setSelectedPlatform}
        setSelectedMediaType={setSelectedMediaType}
        setSelectedFileType={setSelectedFileType}
        selectedProfileType={selectedProfileType} setSelectedProfileType={setSelectedProfileType}
        />
        }

        {
        openEditDrawer && <SingleBookmarkDrawer 
        openDrawer={openEditDrawer} setOpenDrawer={setOpenEditDrawer} page={'bio'}
        gemSingleId={gemSingleId} setGemSingleIdSingleId={setGemSingleIdSingleId}
        editPagesIn='side peek'
        setBlocks={setBlocks} blocks={blocks}
        />
        }

        {
        openMoreOptionModal &&
        <BioMoreOptionModal
        openMoreOptionModal={openMoreOptionModal} setOpenMoreOptionModal={setOpenMoreOptionModal}
        selectedItem={selectedItem}
        handleChangeOtherOptions={handleChangeOtherOptions}
        setSelectedItem={setSelectedItem}
        optionType={optionType}
        handleChangeColorOptions={handleChangeColorOptions}
        setOptionType={setOptionType}
        setSelectedBlock={setSelectedBlock}
        />
        }

    </>
    }
    </>
    )
};

export default AllBio;