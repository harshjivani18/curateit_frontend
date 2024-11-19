import {
  ChevronDoubleLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Input, Menu, Layout, Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    sharedCollectionSubCollection,
  sharedSubCollectionsFilter,
  sharedSubCollectionsTagsCount,
} from "@actions/collection";
import { MEDIA_TYPES_ICONS_OBJ } from "@utils/media-types";
import { Resizable } from "re-resizable";
import "./publicTags.css";
import ShareSidebarTags from "./ShareSidebarTags";
import ShareSidebarCollections from "./ShareSidebarCollections";
import { getCategorySeeMore, publicSidebarSelected, setIsMobileSidebar } from "@actions/app";

const { Sider } = Layout;

const NewCollectionSharedSidebar = ({authorName,isMobile,collectionId,handleSelectFilterGem=()=>{},handleSelectTagGem=()=>{},handleResetFilters=() => {}}) => {
  const dispatch = useDispatch();
  const { isMobileSidebar,publicSidebarSelectedItem } = useSelector((state) => state.app);

  const [subCollectionTags, setSubCollectionTags] = useState([]);
  const [subCollectionFilters, setSubCollectionFilters] = useState([]);
  const [subCollections, setSubCollections] = useState([]);
  const [filterSearch, setFilterSearch] = useState("");
  const { categorySeeMore } = useSelector((state) => state.app);
  const [width, setWidth] = useState(270);
  const [openTagsToggle, setOpenTagsToggle] = useState(true);
  const [openCollectionToggle, setOpenCollectionToggle] = useState(true);
  const [openCategoryToggle, setOpenCategoryToggle] = useState(true);

  useEffect(() => {
    const getCall = async () => {
        //get collections
        const resCollection = await dispatch(sharedCollectionSubCollection(collectionId))
        setSubCollections(resCollection?.payload?.data?.data || []);

        // tags
        const res = await dispatch(sharedSubCollectionsTagsCount(collectionId));
        setSubCollectionTags(res?.payload?.data || []);


        //category
        const filterRes = await dispatch(sharedSubCollectionsFilter(collectionId));
        const filterData = filterRes?.payload?.data;

        const arr = [];
        if(filterData){
          Object.keys(filterData).forEach((key) => {
            const o = MEDIA_TYPES_ICONS_OBJ[key];
            arr.push({ ...o, count: filterData[key] });
          });
          const result = arr.sort((a, b) => b.count - a.count);

          setSubCollectionFilters(result);
        }
        
    }
    
    if(collectionId){
        getCall()
    }
  },[collectionId])

  const onSearchCategory = (value) => {
    setFilterSearch(value);
  };

  const renderFilterMenuItem = (item) => {
    return (
      <Menu.Item key={item.title} icon={item.icon}>
        <div
          className="flex items-center justify-between"
          onClick={() => onMenuClick(item)}
        >
          <span className="text-sm font-normal">{item.title}</span>
          <span className="font-normal text-xs  text-[#74778B] py-[2px] px-[12px] rounded-[53px] border border-[#ABB7C9] group-hover:opacity-0 h-fit">
            {item.count}
          </span>
        </div>
      </Menu.Item>
    );
  };

  const onMenuClick = (item) => {
    handleSelectFilterGem(item?.title)
    dispatch(publicSidebarSelected(item?.title))
  };

  const searchedItems = () => {
    return (
      subCollectionFilters &&
      subCollectionFilters
        ?.filter((item) =>
          item.title.toLowerCase().includes(filterSearch.toLowerCase())
        )
        .map((item) => {
          return renderFilterMenuItem(item);
        })
    );
  };

  const showAllCategories = () => {
    return (
      subCollectionFilters &&
      subCollectionFilters?.map((item) => {
        return renderFilterMenuItem(item);
      })
    );
  };

  const showSplitCategories = () => {
    return (
      subCollectionFilters &&
      subCollectionFilters.slice(0, 3).map((item) => {
        return renderFilterMenuItem(item);
      })
    );
  };

  const handleCategoryToggle = () => {
    setOpenCategoryToggle(!openCategoryToggle);
  };

  
  return (
    <>
      {!isMobile ? (
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
            left: true,
            right: false,
          }}
        >
          <Sider
            trigger={null}
            width={width}
            className="secondary-sidebar-public p-2"
            style={{
              height: `90%`,
              top: "52px",
              scrollbarWidth: "3px",
            }}
          >

            <div className={`${publicSidebarSelectedItem === 'all' ? 'bg-[#E5F0FF]' : 'bg-white'} w-full px-4 py-2 flex items-center justify-between text-sm focus:border focus:border-[#78A6EC] hover:bg-[#E5F0FF] transition-all select-none ease-in-out duration-300 cursor-pointer font-medium rounded-lg mt-2`}
            onClick={handleResetFilters}
            >
              All 
            </div>

            {/* category */}
            <div className="flex flex-col rounded-lg px-2 py-2 gap-y-1 bg-white mt-2">
              <div
                className=" w-full  flex items-start text-sm focus:border focus:border-[#78A6EC] bg-[#E5F0FF] rounded py-1 px-2 transition-all select-none ease-in-out duration-300 cursor-pointer font-medium "
                onClick={() => handleCategoryToggle()}
              >
                Category
              </div>
              {openCategoryToggle && (
                <div>
                  <div className="w-full mt-1">
                    <Input
                      placeholder="Search..."
                      onChange={(e) => onSearchCategory(e.target.value)}
                      className="w-inherit border border-[#ABB7C9] rounded-lg hover:border-[#ABB7C9]"
                      value={filterSearch}
                      allowClear
                      style={{ borderColor: "#ABB7C9" }}
                      prefix={
                        <MagnifyingGlassIcon className="h-4 w-4 text-[#97A0B5] mr-1" />
                      }
                    />
                  </div>

                  <div>
                    <Menu
                      defaultOpenKeys={subCollectionFilters?.map(
                        (f) => f.title
                      )}
                      mode="inline"
                      selectedKeys={publicSidebarSelectedItem}
                    >
                      {filterSearch !== ""
                        ? searchedItems()
                        : categorySeeMore
                        ? showAllCategories()
                        : showSplitCategories()}
                    </Menu>
                  </div>
                </div>
              )}
                <Button
                    type="link"
                    onClick={() => dispatch(getCategorySeeMore(!categorySeeMore))}
                    className="flex text-xs items-center justify-center w-fit "
                >
                    {!categorySeeMore ? "See more" : "See less"}
                </Button>
            </div>

            {/* collections */}
            <ShareSidebarCollections
              setOpenCollectionToggle={setOpenCollectionToggle}
              subFolder={subCollections}
              authorName={authorName}
              openCollectionToggle={openCollectionToggle}
            />

            {/* Tags */}
            <ShareSidebarTags
              subCollectionTags={subCollectionTags}
              openTagsToggle={openTagsToggle}
              setOpenTagsToggle={setOpenTagsToggle}
              handleSelectTagGem={handleSelectTagGem}
            />
          </Sider>
        </Resizable>
      ) : (
        <>
        <Drawer
          width={"90%"}
          closable={false}
          placement="left"
          onClose={() => dispatch(setIsMobileSidebar(false))}
          open={isMobileSidebar}
          footer={null}
        >
          {/* <div className="flex justify-end px-2">
              <ChevronDoubleLeftIcon className="h-4 w-4 text-[#347AE2] cursor-pointer" onClick={() => dispatch(setIsMobileSidebar(false))}/>
          </div> */}
          <div className={`${publicSidebarSelectedItem === 'all' ? 'bg-[#E5F0FF]' : 'bg-white'} w-full px-4 py-2 flex items-center justify-between text-sm focus:border focus:border-[#78A6EC] hover:bg-[#E5F0FF] transition-all select-none ease-in-out duration-300 cursor-pointer font-medium rounded-lg mt-2`} onClick={handleResetFilters}>
              All 
              <div onClick={(e) => {
                e.stopPropagation()
                dispatch(setIsMobileSidebar(false))
              }}>
              <ChevronDoubleLeftIcon className="h-4 w-4 text-[#347AE2] cursor-pointer" />
            </div>
            </div>

          {/* category */}
          <div className="flex flex-col rounded-lg px-2 py-2 gap-y-1 bg-white mt-2">
            <div className=" w-full  flex items-start text-sm focus:border focus:border-[#78A6EC] bg-[#E5F0FF] rounded py-1 px-2 transition-all select-none ease-in-out duration-300 cursor-pointer font-medium ">
              Category
            </div>
            <div className="w-full mt-1">
              <Input
                placeholder="Search..."
                onChange={(e) => onSearchCategory(e.target.value)}
                className="w-inherit border border-[#ABB7C9] rounded-lg hover:border-[#ABB7C9]"
                value={filterSearch}
                allowClear
                style={{ borderColor: "#ABB7C9" }}
                prefix={
                  <MagnifyingGlassIcon className="h-4 w-4 text-[#97A0B5] mr-1" />
                }
              />
            </div>

            <div>
              <Menu
                // onClick={onMenuClick}
                defaultOpenKeys={subCollectionFilters?.map((f) => f.title)}
                selectedKeys={publicSidebarSelectedItem}
                mode="inline"
              >
                {filterSearch !== ""
                  ? searchedItems()
                  : categorySeeMore
                  ? showAllCategories()
                  : showSplitCategories()}
              </Menu>
            </div>
          </div>

          {/* collections */}
          <ShareSidebarCollections
            setOpenCollectionToggle={setOpenCollectionToggle}
            subFolder={subCollections}
            authorName={authorName}
            openCollectionToggle={openCollectionToggle}
          />

          {/* Tags */}
          <ShareSidebarTags
            subCollectionTags={subCollectionTags}
            openTagsToggle={openTagsToggle}
            setOpenTagsToggle={setOpenTagsToggle}
            handleSelectTagGem={handleSelectTagGem}
          />
          </Drawer>
        </>
      )}
    </>
  );
};

export default NewCollectionSharedSidebar;
