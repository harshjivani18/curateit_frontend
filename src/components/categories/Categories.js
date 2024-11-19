import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, Input, Button, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronUpIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import { fetchGemsFilters } from "@actions/gems";
import {
  getCategorySeeMore,
  selectedSecondarySidebar,
  setIsMobileSidebar,
  sidebarSelected,
} from "@actions/app";
import { MdOutlineRefresh } from "react-icons/md";
import { getUserDetails } from "@actions/user";

const Categories = ({ handleChangeSidebar }) => {
  const dispatch = useDispatch();
  const {
    secondarySidebarSelected,
    isMobileView,
    sidebarSelectedItem,
    categorySeeMore,
  } = useSelector((state) => state.app);
  const filtersObj = useSelector((state) => state.gems.filtersAndItsCount);
  const navigate = useRouter();
  const [showCategory, setShowCategory] = useState(true);
  const [filterSearch, setFilterSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    if (filtersObj === null) {
      dispatch(fetchGemsFilters());
      dispatch(getUserDetails());
    }
  }, []);

  const onMenuClick = (item) => {
    dispatch(selectedSecondarySidebar("category"));
    dispatch(sidebarSelected(item.title));
    navigate.push(item.link);
    isMobileView && dispatch(setIsMobileSidebar(false));
  };

  const onSearchCategory = (value) => {
    setFilterSearch(value);
  };

  const onRefreshCollection = async (e) => {
    e.stopPropagation();
    setRefreshing(true);
    await dispatch(fetchGemsFilters());
    setRefreshing(false);
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

  const searchedItems = () => {
    return (
      filtersObj &&
      filtersObj
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
      filtersObj &&
      filtersObj?.map((item) => {
        return renderFilterMenuItem(item);
      })
    );
  };

  const showSplitCategories = () => {
    return (
      filtersObj &&
      filtersObj.slice(0, 3).map((item) => {
        return renderFilterMenuItem(item);
      })
    );
  };

  return (
    <>
      <div className="bg-white rounded-lg px-2 py-2 border-[0.6px] border-solid border-[#DFE4EC] shadow">
        {/* category */}
        <div
          className={`${
            secondarySidebarSelected === "category"
              ? "bg-[#E5F0FF]"
              : "bg-white"
          } w-full rounded flex items-center px-1 py-1  justify-between cursor-pointer`}
          onClick={(e) => {
            e.stopPropagation();
            handleChangeSidebar("category");
            isMobileView && dispatch(setIsMobileSidebar(false));
          }}
        >
          <div className="flex items-center cursor-pointer">
            {/* <AdjustmentsHorizontalIcon className="h-4 w-4 text-[#97A0B5]" /> */}
            <div className="ml-2 text-[#1A3D71] font-medium">Category</div>
          </div>
          <div className="flex items-center">
            <MdOutlineRefresh
              className="h-4 w-4 cursor-pointer mr-1"
              onClick={onRefreshCollection}
            />
            {showCategory ? (
              <ChevronUpIcon
                className="h-4 w-4 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCategory(!showCategory);
                }}
              />
            ) : (
              <ChevronDownIcon
                className="h-4 w-4 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCategory(!showCategory);
                }}
              />
            )}
          </div>
        </div>
        {showCategory && (
          <div className="bg-white flex flex-col category-wrapper">
            <div className="w-full px-2 mb-2">
              <Input
                placeholder="Search..."
                size="small"
                onChange={(e) => onSearchCategory(e.target.value)}
                className="w-inherit border rounded  mt-2 hover:border-[#ABB7C9] border-[#ABB7C9] p-0"
                value={filterSearch}
                allowClear
                prefix={
                  <MagnifyingGlassIcon className="h-4 w-4 text-[#97A0B5] mr-1" />
                }
              />
            </div>
            {refreshing ? (
              <div className="flex items-center justify-center">
                <Spin size="small" tip="" />
              </div>
            ) : (
              <Menu
                // onClick={onMenuClick}
                defaultOpenKeys={filtersObj?.map((f) => f.title)}
                selectedKeys={sidebarSelectedItem}
                mode="inline"
              >
                {filterSearch !== ""
                  ? searchedItems()
                  : categorySeeMore
                  ? showAllCategories()
                  : showSplitCategories()}
              </Menu>
            )}
          </div>
        )}
        {showCategory && (
          <Button
            type="link"
            onClick={() => dispatch(getCategorySeeMore(!categorySeeMore))}
            className="flex text-xs items-center justify-center w-fit "
          >
            {!categorySeeMore ? "See more" : "See less"}
          </Button>
        )}
      </div>
    </>
  );
};

export default Categories;
