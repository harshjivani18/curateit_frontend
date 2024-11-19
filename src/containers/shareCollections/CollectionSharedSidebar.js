import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
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
import session from "@utils/session";
import { getSharedTagPublicSidebar, getSharedTagsCollectionsCounts, getSharedTagsFilterCounts } from "@actions/tags";

const { Sider } = Layout;

const CollectionSharedSidebar = ({
  authorName,
  isMobile,
  collectionId = "",
  handleSelectFilterGem = () => {},
  handleSelectTagGem = () => {},
  handleResetFilters = () => {},
  collapsed,
  setCollapsed,
  isOwnUser = false,
  fromPage = "collection",
  tagId = "",
  handleSelectCollectionGem = () => {},
  headerType = "default",
  isSticky=true,
}) => {
  const dispatch = useDispatch();
  const { isMobileSidebar, publicSidebarSelectedItem } = useSelector(
    (state) => state.app
  );

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
      const resCollection = await dispatch(
        sharedCollectionSubCollection(collectionId)
      );
      setSubCollections(resCollection?.payload?.data?.data || []);

      // tags
      const res = await dispatch(sharedSubCollectionsTagsCount(collectionId));
      setSubCollectionTags(res?.payload?.data || []);

      //category
      const filterRes = await dispatch(
        sharedSubCollectionsFilter(collectionId)
      );
      const filterData = filterRes?.payload?.data;

      const arr = [];
      if (filterData) {
        Object.keys(filterData).forEach((key) => {
          const o = MEDIA_TYPES_ICONS_OBJ[key];
          arr.push({ ...o, count: filterData[key] });
        });
        const result = arr.sort((a, b) => b.count - a.count);

        setSubCollectionFilters(result);
      }
    };

    if (collectionId && fromPage === "collection") {
      getCall();
    }

    const getCallTag = async () => {
      //get filters
      const res1 = await dispatch(getSharedTagsFilterCounts(tagId));
      const filterData = res1?.payload?.data;

      const arr = [];
      if (filterData) {
        Object.keys(filterData).forEach((key) => {
          const o = MEDIA_TYPES_ICONS_OBJ[key];
          arr.push({ ...o, count: filterData[key] });
        });
        const result = arr.sort((a, b) => b.count - a.count);

        setSubCollectionFilters(result);
      }

      //get coll
      const res2 = await dispatch(getSharedTagsCollectionsCounts(tagId));
      setSubCollections(res2?.payload?.data?.data || []);

      //get tags
      const res = await dispatch(getSharedTagPublicSidebar(tagId));
      setSubCollectionTags(res?.payload?.data?.data || []);
    };

    if (tagId && fromPage === "tag") {
      getCallTag();
    }
  }, [collectionId, fromPage, tagId]);

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
    handleSelectFilterGem(item?.title);
    dispatch(publicSidebarSelected(item?.title));
    if (isMobile) {
      dispatch(setIsMobileSidebar(false));
    }
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

  const fetchAIPrompt = () => {
    const idx = subCollectionFilters.findIndex((s) => s.title === "Ai Prompt");
    if (idx !== -1) {
      return renderFilterMenuItem(subCollectionFilters[idx]);
    }
    return null;
  };

  const handleCategoryToggle = () => {
    setOpenCategoryToggle(!openCategoryToggle);
  };

  return (
    <>
      {!isMobile && (
        <>
          {!collapsed ? (
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
                  height: `100%`,
                  top: isOwnUser
                    ? "60px"
                    : headerType === "default"
                    ? "76px"
                    : !isSticky && headerType === "custom"
                    ? "0px"
                    : "",
                  scrollbarWidth: "3px",
                  zIndex : 999
                }}
              >
                <div
                  className={`ng-white rounded-lg p-2 w-full flex items-center justify-between mb-2 cursor-pointer`}
                  onClick={handleResetFilters}
                >
                  <div
                    className={`w-full flex items-center cursor-pointer hover:bg-[#E5F0FF] hover:border-[0.4px] hover:border-solid hover:border-[#78A6EC] rounded py-[2px] px-2 ${
                      publicSidebarSelectedItem === "all"
                        ? "bg-[#E5F0FF] border-[0.4px] border-solid border-[#78A6EC]"
                        : "bg-white"
                    }`}
                  >
                    <div className="ml-2 text-[#1A3D71] font-medium text-sm">
                      All Gems
                    </div>
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setCollapsed(true);
                    }}
                    className="bg-[#E5F0FF] border-[0.4px] border-solid border-[#78A6EC] w-fit rounded py-1 px-2 ml-2"
                  >
                    <ChevronDoubleLeftIcon className="h-4 w-4 text-[#347AE2] cursor-pointer" />
                  </div>
                </div>

                {/* category */}
                {
                  <div className="flex flex-col rounded-lg px-2 py-2 gap-y-1 bg-white mt-2 border-[0.6px] border-solid border-[#DFE4EC] shadow">
                    <div
                      className={` w-full  flex items-start text-sm focus:border focus:border-[#78A6EC] bg-[#E5F0FF] rounded py-1 px-2 transition-all select-none ease-in-out duration-300 cursor-pointer font-medium ${
                        publicSidebarSelectedItem === "category"
                          ? "bg-[#E5F0FF] border-[0.4px] border-solid border-[#78A6EC]"
                          : "bg-white"
                      }`}
                      onClick={() => handleCategoryToggle()}
                    >
                      Category
                    </div>
                    {openCategoryToggle && (
                      <div>
                        {/* {parseInt(collectionId) !== parseInt(process.env.NEXT_PUBLIC_AI_PROMPT_COLLECTION_ID) &&  */}
                        {parseInt(collectionId) !==
                          parseInt(session?.aiPromptLibraryId) && (
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
                        )}

                        <div>
                          <Menu
                            defaultOpenKeys={subCollectionFilters?.map(
                              (f) => f.title
                            )}
                            mode="inline"
                            selectedKeys={publicSidebarSelectedItem}
                          >
                            {/* {parseInt(collectionId) === parseInt(process.env.NEXT_PUBLIC_AI_PROMPT_COLLECTION_ID) ? fetchAIPrompt() : */}
                            {parseInt(collectionId) ===
                            parseInt(session?.aiPromptLibraryId)
                              ? fetchAIPrompt()
                              : filterSearch !== ""
                              ? searchedItems()
                              : categorySeeMore
                              ? showAllCategories()
                              : showSplitCategories()}
                          </Menu>
                        </div>
                      </div>
                    )}
                    {/* {parseInt(collectionId) !== parseInt(process.env.NEXT_PUBLIC_AI_PROMPT_COLLECTION_ID) && <Button */}
                    {parseInt(collectionId) !==
                      parseInt(session?.aiPromptLibraryId) && (
                      <Button
                        type="link"
                        onClick={() =>
                          dispatch(getCategorySeeMore(!categorySeeMore))
                        }
                        className="flex text-xs items-center justify-center w-fit "
                      >
                        {!categorySeeMore ? "See more" : "See less"}
                      </Button>
                    )}
                  </div>
                }

                {/* collections */}
                <ShareSidebarCollections
                  setOpenCollectionToggle={setOpenCollectionToggle}
                  subFolder={subCollections}
                  authorName={authorName}
                  openCollectionToggle={openCollectionToggle}
                  handleSelectCollectionGem={handleSelectCollectionGem}
                  fromPage={fromPage}
                />

                {/* Tags */}
                <ShareSidebarTags
                  subCollectionTags={subCollectionTags}
                  openTagsToggle={openTagsToggle}
                  setOpenTagsToggle={setOpenTagsToggle}
                  handleSelectTagGem={handleSelectTagGem}
                  isMobile={isMobile}
                  fromPage={fromPage}
                />
              </Sider>
            </Resizable>
          ) : (
            <Sider
              trigger={null}
              width={50}
              className="bg-white fixed left-[5px] overflow-auto pt-2 border-none"
              style={{
                height: `90%`,
                top: isOwnUser ? "60px" : "76px",
                // scrollbarWidth: "3px",
              }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setCollapsed(false);
                }}
                className="bg-[#E5F0FF] border-[0.4px] border-solid border-[#78A6EC] w-fit rounded py-1 px-2 ml-2"
              >
                <ChevronDoubleRightIcon className="h-4 w-4 text-[#347AE2] cursor-pointer" />
              </div>
            </Sider>
          )}
        </>
      )}

      {isMobile && (
        <Drawer
          width={"90%"}
          closable={false}
          placement="left"
          onClose={() => dispatch(setIsMobileSidebar(false))}
          open={isMobileSidebar}
          footer={null}
        >
          {/* <div className={`${publicSidebarSelectedItem === 'all' ? 'bg-[#E5F0FF]' : 'bg-white'} w-full px-4 py-2 flex items-center justify-between text-sm focus:border focus:border-[#78A6EC] hover:bg-[#E5F0FF] transition-all select-none ease-in-out duration-300 cursor-pointer font-medium rounded-lg mt-2`} onClick={handleResetFilters}>
              All 
              <div onClick={(e) => {
                e.stopPropagation()
                dispatch(setIsMobileSidebar(false))
              }}>
              <ChevronDoubleLeftIcon className="h-4 w-4 text-[#347AE2] cursor-pointer" />
            </div>
            </div> */}

          <div
            className={`ng-white rounded-lg p-2 w-full flex items-center justify-between mb-2 cursor-pointer`}
            onClick={handleResetFilters}
          >
            <div
              className={`w-full flex items-center cursor-pointer hover:bg-[#E5F0FF] hover:border-[0.4px] hover:border-solid hover:border-[#78A6EC] rounded py-[2px] px-2 ${
                publicSidebarSelectedItem === "all"
                  ? "bg-[#E5F0FF] border-[0.4px] border-solid border-[#78A6EC]"
                  : "bg-white"
              }`}
            >
              <div className="ml-2 text-[#1A3D71] font-medium text-sm">
                All Gems
              </div>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setIsMobileSidebar(false));
              }}
              className="bg-[#E5F0FF] border-[0.4px] border-solid border-[#78A6EC] w-fit rounded py-1 px-2 ml-2"
            >
              <ChevronDoubleLeftIcon className="h-4 w-4 text-[#347AE2] cursor-pointer" />
            </div>
          </div>

          {parseInt(collectionId) !== parseInt(session?.aiPromptLibraryId) && (
            <div className="flex flex-col rounded-lg px-2 py-2 gap-y-1 bg-white mt-2 border-[0.6px] border-solid border-[#DFE4EC] shadow">
              <div
                className={`w-full  flex items-start text-sm focus:border focus:border-[#78A6EC] rounded py-1 px-2 transition-all select-none ease-in-out duration-300 cursor-pointer font-medium ${
                  publicSidebarSelectedItem === "category"
                    ? "bg-[#E5F0FF] border-[0.4px] border-solid border-[#78A6EC]"
                    : "bg-white"
                }`}
              >
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
          )}

          <ShareSidebarCollections
            setOpenCollectionToggle={setOpenCollectionToggle}
            subFolder={subCollections}
            authorName={authorName}
            openCollectionToggle={openCollectionToggle}
            handleSelectCollectionGem={handleSelectCollectionGem}
            fromPage={fromPage}
          />

          <ShareSidebarTags
            subCollectionTags={subCollectionTags}
            openTagsToggle={openTagsToggle}
            setOpenTagsToggle={setOpenTagsToggle}
            handleSelectTagGem={handleSelectTagGem}
            isMobile={isMobile}
          />
        </Drawer>
      )}
    </>
  );
};

export default CollectionSharedSidebar;
