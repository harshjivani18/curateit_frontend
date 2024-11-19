"use client"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BookmarkIcon,
  ChevronDoubleLeftIcon
} from "@heroicons/react/24/outline";
import { Layout } from "antd";
import { Resizable } from "re-resizable";
import { BiGhost } from "react-icons/bi";
import { HiOutlineDuplicate } from "react-icons/hi";
import { useRouter } from "next/navigation";
import slugify from "slugify";

import Categories from "@components/categories/Categories";
import CollectionList from "@components/collections/CollectionList";
import TagsMenu from "@components/tags/TagsMenu";

import session from "@utils/session";
import { getCategorySeeMore, getExpandedKeys, getExpandedTagKeys, selectedSecondarySidebar, setIsMobileSidebar, sidebarSelected } from "@actions/app";

const { Sider } = Layout;

const InnerSidebar = ({ collapsed='', isMobile, setCollapsed=() => {}, coverImage = '',isFooter=false }) => {
  const dispatch = useDispatch()
  const { secondarySidebarSelected, isMobileView } = useSelector(state => state.app)
  const filtersObj = useSelector(state => state.gems.filtersAndItsCount)
  const { tagsWithGemsCount } = useSelector(state => state.tags)
  const navigate = useRouter();
  const [width, setWidth] = useState(270);
  const handleChangeSidebar = (value) => {
    dispatch(selectedSecondarySidebar(value))
    if (value === 'all') {
      dispatch(sidebarSelected(null))
      dispatch(getExpandedKeys([]))
      dispatch(getExpandedTagKeys([]))
      dispatch(getCategorySeeMore(false))
      navigate.push(`/u/${session.username}/all-bookmarks`)
      return;
    }
    if (value === 'broken') {
      dispatch(sidebarSelected(null))
      dispatch(getExpandedKeys([]))
      dispatch(getExpandedTagKeys([]))
      dispatch(getCategorySeeMore(false))
      navigate.push(`/u/${session.username}/links/broken`);
      return;
    }
    if (value === 'duplicate') {
      dispatch(sidebarSelected(null))
      dispatch(getExpandedKeys([]))
      dispatch(getExpandedTagKeys([]))
      dispatch(getCategorySeeMore(false))
      navigate.push(`/u/${session.username}/links/duplicate`);
      return;
    }
    if (value === 'category') {
      // setShowCategory(!showCategory)
      const url = filtersObj && filtersObj[0]?.link;
      navigate.push(url);
      return;
    }
    if (value === 'collections') {
      // setShowCollections(!showCollections)
      navigate.push(`/u/${session.username}/c/${session.unfiltered_collection_id}/unfiltered`);
      return;
    }
    if (value === 'tags') {
      // setShowTags(!showTags)
      const id = tagsWithGemsCount && tagsWithGemsCount[0]?.id;
      const tagName = tagsWithGemsCount && tagsWithGemsCount[0]?.name;
      const slug = tagsWithGemsCount && tagsWithGemsCount[0]?.slug;
      navigate.push(`/u/${session.username}/tags/${id}/${slug || tagName ? slugify(tagName || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g }) : "default"}`);
      return;
    }
  }

  return (
    <>
      {
      !isFooter ?
      <Resizable
        size={{ width: width }}
        onResizeStop={(e, direction, ref, d) => {
          setWidth(ref.style.width);
        }}
        enable={{
          top: false,
          bottom: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
          left: false,
          right: collapsed ? false : true
        }}
        style={{marginLeft:'50px'}}
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={width}
          className="secondary-sidebar p-2"
          collapsedWidth={0}
          style={{
            height: '100%',
            top: '0px',
          }}
        >
          <div className={`bg-white rounded-lg p-2 w-full flex items-center justify-between mb-2 cursor-pointer`} onClick={() => handleChangeSidebar('all')}>
            <div className={`w-full flex items-center cursor-pointer hover:bg-[#E5F0FF] hover:border-[0.4px] hover:border-solid hover:border-[#78A6EC] rounded py-[2px] px-2 ${secondarySidebarSelected === 'all' ? 'bg-[#E5F0FF] border-[0.4px] border-solid border-[#78A6EC]' : 'bg-white'}`}>
              {/* <BookmarkIcon className="h-4 w-4 text-[#97A0B5]" /> */}
              <div className="ml-2 text-[#1A3D71] font-medium text-sm">All Gems</div>
            </div>
            <div onClick={(e) => {
              e.stopPropagation()
              setCollapsed(true)
            }} className='bg-[#E5F0FF] border-[0.4px] border-solid border-[#78A6EC] w-fit rounded py-1 px-2 ml-2'>
              <ChevronDoubleLeftIcon className="h-4 w-4 text-[#347AE2] cursor-pointer" />
            </div>
          </div>

          {/* category */}
          <Categories
            handleChangeSidebar={handleChangeSidebar}
          />


          {/* collections */}
          <CollectionList
            handleChangeSidebar={handleChangeSidebar}
          />

          {/* tags */}
          <TagsMenu
            handleChangeSidebar={handleChangeSidebar}
          />

          <div className={`${secondarySidebarSelected === 'duplicate' ? 'bg-[#E5F0FF] border-[0.4px] border-solid border-[#78A6EC]' : 'bg-white'} rounded-lg p-2 my-2 w-full flex items-center justify-between  cursor-pointer`} onClick={() => handleChangeSidebar('duplicate')}>
            <div className="flex items-center cursor-pointer">
              <HiOutlineDuplicate className="h-4 w-4 text-[#97A0B5]" />
              <div className="ml-2 text-[#1A3D71] font-medium">Duplicate links</div>
            </div>
          </div>

          <div className={`${secondarySidebarSelected === 'broken' ? 'bg-[#E5F0FF] border-[0.4px] border-solid border-[#78A6EC]' : 'bg-white'} rounded-lg p-2 w-full  my-1 flex items-center justify-between cursor-pointer`} onClick={() => handleChangeSidebar('broken')}>
            <div className="flex items-center cursor-pointer">
              <BiGhost className="h-4 w-4 text-red-400" />
              <div className="ml-2 text-[#1A3D71] font-medium">Broken links</div>
            </div>
          </div>
        </Sider>
      </Resizable>
      :
      <>
      <div className={`bg-white rounded p-2 w-full flex items-center justify-between mb-2 cursor-pointer`} onClick={(e) => {
        e.stopPropagation()
        handleChangeSidebar('all')
        isMobileView && dispatch(setIsMobileSidebar(false))
        }}>
            <div className={`flex items-center cursor-pointer bg-white hover:bg-[#E5F0FF] hover:border-[0.4px] hover:border-solid hover:border-[#78A6EC] rounded py-[2px] px-2 ${secondarySidebarSelected === 'all' ? 'bg-[#E5F0FF] border-[0.4px] border-solid border-[#78A6EC]' : ''}`}>
              <BookmarkIcon className="h-4 w-4 text-[#97A0B5]" />
              <div className="ml-2 text-[#1A3D71] font-medium">All Gems</div>
            </div>
            <div onClick={(e) => {
              e.stopPropagation()
              dispatch(setIsMobileSidebar(false))
            }} className='bg-[#E5F0FF] border-[0.4px] border-solid border-[#78A6EC] rounded py-1 px-2 w-fit'>
              <ChevronDoubleLeftIcon className="h-4 w-4 text-[#347AE2] cursor-pointer" />
            </div>
          </div>

          {/* category */}
          <Categories
            handleChangeSidebar={handleChangeSidebar}
          />


          {/* collections */}
          <CollectionList
            handleChangeSidebar={handleChangeSidebar}
          />

          {/* tags */}
          <TagsMenu
            handleChangeSidebar={handleChangeSidebar}
          />

          <div className={`${secondarySidebarSelected === 'duplicate' ? 'bg-[#E5F0FF] border-[0.4px] border-solid border-[#78A6EC]' : 'bg-white'} rounded-lg p-2 w-full flex items-center justify-between mt-2 cursor-pointer`} onClick={(e) => {
            e.stopPropagation()
            handleChangeSidebar('duplicate')
            isMobileView && dispatch(setIsMobileSidebar(false))
            }}>
            <div className="flex items-center cursor-pointer">
              <HiOutlineDuplicate className="h-4 w-4 text-[#97A0B5]" />
              <div className="ml-2 text-[#1A3D71] font-medium">Duplicate links</div>
            </div>
          </div>

          <div className={`${secondarySidebarSelected === 'broken' ? 'bg-[#E5F0FF] border-[0.4px] border-solid border-[#78A6EC]' : 'bg-white'} rounded-lg p-2   w-full flex items-center justify-between cursor-pointer`} onClick={(e) => {
            e.stopPropagation()
            handleChangeSidebar('broken')
            isMobileView && dispatch(setIsMobileSidebar(false))
            }}>
            <div className="flex items-center cursor-pointer">
              <BiGhost className="h-4 w-4 text-red-400" />
              <div className="ml-2 text-[#1A3D71] font-medium">Broken links</div>
            </div>
          </div>
      </>
      }
    </>
  )
}



export default InnerSidebar;