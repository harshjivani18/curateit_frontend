import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { filterCollectionByName } from "@utils/find-collection-id";
import { processNestedBookmarksPublic } from "@utils/process-nested-bookmarks-sidebar";
import { Input, Tree } from "antd";
import { useState } from "react";
// import { PiCaretRight } from "react-icons/pi";
import { useRouter } from "next/navigation";
import {
  DownOutlined,
} from '@ant-design/icons';
import slugify from "slugify";
import { useDispatch, useSelector } from "react-redux";
import { sidebarSelected } from "@actions/app";


const ShareSidebarCollections = ({
  setOpenCollectionToggle,
  openCollectionToggle,
  authorName,
  subFolder,
  handleSelectCollectionGem=()=>{},
  fromPage=''
}) => {
  const dispatch = useDispatch()
  const { publicSidebarSelectedItem, sidebarSelectedItem } = useSelector((state) => state.app);
  const navigate = useRouter();
  // collection searchbox states
  const [collectionSearch, setCollectionSearch] = useState("");
  const [collectionSearchedData, setCollectionSearchedData] = useState("");

  const openCollection = (obj) => {
    dispatch(sidebarSelected(`Folder-${obj.id}`))
    if(fromPage === 'tag'){
      handleSelectCollectionGem(obj?.id)
      return;
    }
    navigate.push(`/u/${obj?.author?.username}/c/${obj.id}/${obj?.slug || slugify(obj.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}?public=true`)  

    // navigate.push(`/sign-in`);
  };

  const handleCollectionToggle = () => {
    setOpenCollectionToggle(!openCollectionToggle);
  };

  const cbs = {
    openCollection,
  };

  const data = processNestedBookmarksPublic(
    collectionSearchedData ? collectionSearchedData : subFolder,
    cbs,
    false
  );

  // function to search collection
  const handleSearch = (value) => {
    if (!value) {
      setCollectionSearchedData("");
      setCollectionSearch("");
      return;
    }
    setCollectionSearch(value);
    const result = filterCollectionByName(subFolder, value);
    setCollectionSearchedData(result);
  };

  return (
    <>
      <div className="flex flex-col rounded-lg px-2 py-2 gap-y-1 bg-white mt-2 shadow border-[0.6px] border-solid border-[#DFE4EC]">
        <div
          className={`w-full  flex items-start text-sm focus:border focus:border-[#78A6EC] rounded py-1 px-2 transition-all select-none ease-in-out duration-300 cursor-pointer font-medium ${publicSidebarSelectedItem === 'collection' ? 'bg-[#E5F0FF] border-[0.4px] border-solid border-[#78A6EC]' : 'bg-white'}`}
          onClick={() => handleCollectionToggle()}
        >
          Collections
        </div>
        {openCollectionToggle && (
          <div className=" flex flex-col">
            <div className="w-full mt-1">
              <Input
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
                className="w-inherit border border-[#ABB7C9] rounded-lg hover:border-[#ABB7C9]"
                value={collectionSearch}
                allowClear
                style={{ borderColor: "#ABB7C9" }}
                prefix={
                  <MagnifyingGlassIcon className="h-4 w-4 text-[#97A0B5] mr-1" />
                }
              />
            </div>
            <div className='property-tree-collection px-1 mt-2'>
              <Tree
                showIcon
                treeData={data}
                switcherIcon={
                  <DownOutlined />
                }
                className="w-full folder-tree-structure pt-2"
                draggable={false}
                blockNode
                selectedKeys={sidebarSelectedItem ? [sidebarSelectedItem] : null}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShareSidebarCollections;
