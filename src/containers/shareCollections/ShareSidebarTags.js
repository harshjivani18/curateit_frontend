import { publicSidebarSelected, setIsMobileSidebar } from "@actions/app";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { filterTagByName } from "@utils/find-collection-id";
import { processNestedBookmarksPublic } from "@utils/process-nested-bookmarks-sidebar";
import { Input, Tree } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DownOutlined,
} from '@ant-design/icons';
import { useRouter } from "next/navigation";
import slugify from "slugify";


const ShareSidebarTags = ({subCollectionTags, setOpenTagsToggle, openTagsToggle,handleSelectTagGem=()=>{},isMobile,fromPage}) => {
    const dispatch = useDispatch();
    const navigate = useRouter()
    const { publicSidebarSelectedItem } = useSelector((state) => state.app);
    const [tagSearch,setTagSearch]  = useState('')
    const [tagSearchedData,
           setTagSearchedData]      = useState('')

    const openTag = (obj) => {
        if(fromPage === 'tag'){
          return navigate.push(`/u/${obj?.author?.username}/tags/${obj.id}/${obj?.slug || slugify(obj.tag || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}?public=true`) 
        }
        const id = obj?.id === 'withoutTags' ? null : obj?.id
        handleSelectTagGem(id)
        dispatch(publicSidebarSelected(`Folder-${obj.id}`))
        // dispatch(sidebarSelected(`Folder-${obj.id}`))
        if(isMobile){
          dispatch(setIsMobileSidebar(false))
        }
      };

      const cbsTags = {
        openTag,
      };

      const tagsData = processNestedBookmarksPublic(
        tagSearchedData ? tagSearchedData : subCollectionTags ,
        cbsTags,
        true
      );

      const handleTagsToggle = () => {

        setOpenTagsToggle(!openTagsToggle);
    
      }

      const handleSearch = (value) => {
        if(!value){
            setTagSearchedData('')
            setTagSearch('')
            return;
        }
        setTagSearch(value)
        const result = filterTagByName(subCollectionTags, value)
        setTagSearchedData(result)
    }

  return (
    <>
      <div className="flex flex-col rounded-lg px-2 py-2 gap-y-1 bg-white mt-2 shadow border-[0.6px] border-solid border-[#DFE4EC]">
        <div
          className={`w-full  flex items-start text-sm focus:border focus:border-[#78A6EC]  rounded py-1 px-2 transition-all select-none ease-in-out duration-300 cursor-pointer font-medium ${publicSidebarSelectedItem === 'tags' ? 'bg-[#E5F0FF] border-[0.4px] border-solid border-[#78A6EC]' : 'bg-white'}`}
          onClick={() => handleTagsToggle()}
        >
          Tags
        </div>
        {openTagsToggle && (
          <div className="w-full mt-1">
            <Input
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)} 
              className="w-inherit border border-[#ABB7C9] rounded-lg hover:border-[#ABB7C9]"
              allowClear
              value={tagSearch}
              style={{ borderColor: "#ABB7C9" }}
              prefix={
                <MagnifyingGlassIcon className="h-4 w-4 text-[#97A0B5] mr-1" />
              }
            />
            <div className='property-tree-collection px-1 mt-2'>
              <Tree
                treeData={tagsData}
                className="w-full folder-tree-structure pb-5 pt-2"
                draggable={false}
                switcherIcon={<DownOutlined />}
                blockNode
                selectedKeys={publicSidebarSelectedItem ? [publicSidebarSelectedItem] : null}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShareSidebarTags;
