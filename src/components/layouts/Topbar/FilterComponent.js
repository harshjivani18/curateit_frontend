import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
  ArrowsUpDownIcon,
}                             from "@heroicons/react/24/outline";
import {
  Button,
  Dropdown,
  Tree,
}                             from "antd";
import { 
  BsFilter,
  BsFilterCircle 
}                             from "react-icons/bs";
import {  useState }          from "react";

import { 
  generateFilterTreeData,
  generateSortData 
}                             from "@utils/commonFunctions";


const FilterComponent = ({
  isMobile=false,
  sort,
  filter,
  userTags,
  page,
  handleUpdateCollectionPageConfig,
  handleFilterSave,
  handleFilterRemove,
  changeFilterOrder,
  handleSortSave,
  changeSortOrder,
  handleSortRemove,
  setFilterArr,
  setSortArr,
  handleFilterRemoveAll,
  handleFilterAdd,
  handleSortAdd,
  allCollectionsValue,}) => {
    const [open, setOpen] = useState(false);
    const [showSortSettings, setShowSortSettings] = useState(false);
    const [showFilterSettings, setShowFilterSettings] = useState(false);

    const handleOpen = (flag) => {
        setOpen(flag);
    };

    const handleFilterBy = (value, i) => {
    const arr = [...filter];
    arr[i].filterBy = value;
    setFilterArr(arr);
  };

  const handleTermType = (value, i) => {
    if(value === 'empty' || value === 'notempty'){
      const arr = [...filter];
      arr[i].termType = value;
      arr[i].queryBy = ' ';
      setFilterArr(arr);
      return;
    }
    const arr = [...filter];
    arr[i].termType = value;
    setFilterArr(arr);
  };

  const handleQueryBy = (value, i) => {
    const arr = [...filter];
    if(arr[i].filterBy === 'media_type' && (!value.includes('SocialFeed') || !value.includes('Profile'))){
      arr[i].platform = ''
      arr[i].queryBy = value;
      setFilterArr(arr);
      return;
    }
    if((arr[i].filterBy === 'description' || arr[i].filterBy === 'title') && value?.includes(',')){
      const replacedText = value.replace(/,/g, "&coma");
      arr[i].queryBy = replacedText;
      setFilterArr(arr);
      return;
    }
    arr[i].queryBy = value;
    setFilterArr(arr);
  };

  const handlePlatform = (value, i) => {
    const arr = [...filter];
    arr[i].platform = value;
    setFilterArr(arr);
  };

  const handleDate = (date, dateString, i) => {
    const arr = [...filter];
    arr[i].queryBy = dateString;
    setFilterArr(arr);
  };

  const handleDateRange = (date, dateString, i) => {
    const arr = [...filter];
    arr[i].queryBy = dateString;
    setFilterArr(arr);
  };

  function onDropFilter(info) {
    const { node, dragNode } = info;
    const dragIndex = filterTreeData.findIndex(
      (item) => item.key === dragNode.key
    );
    let dropIndex = filterTreeData.findIndex((item) => item.key === node.key);
    const newTreeData = [...filterTreeData];
    newTreeData.splice(dragIndex, 1);

    newTreeData.splice(dropIndex, 0, dragNode);

    const filtered = newTreeData.map((item) => item.label);

    changeFilterOrder(filtered);
  }

  const filterCallbacks = {
    onDropFilter,
    handleFilterBy,
    handleTermType,
    handleQueryBy,
    handleDate,
    handleDateRange,
    handlePlatform,
    handleRemoveFilter: handleFilterRemove,
  };

  const filterTreeData = generateFilterTreeData(filter, filterCallbacks, userTags, page,allCollectionsValue);

  const handleSortBy = (value, i) => {
    const arr = [...sort];
    arr[i].sortby = value;
    setSortArr(arr);
  };

  const handleSortOrder = (value, i) => {
    const arr = [...sort];
    arr[i].orderby = value;
    setSortArr(arr);
  };

  function onDropSort(info) {
    const { node, dragNode } = info;
    const dragIndex = sortTreeData.findIndex(
      (item) => item.key === dragNode.key
    );
    let dropIndex = sortTreeData.findIndex((item) => item.key === node.key);
    const newTreeData = [...sortTreeData];
    newTreeData.splice(dragIndex, 1);

    newTreeData.splice(dropIndex, 0, dragNode);

    const sorted = newTreeData.map((item) => item.label);
    changeSortOrder(sorted);
  }

  const sortCallbacks = {
    handleRemoveSort: handleSortRemove,
    handleSortBy,
    handleSortOrder,
    onDropSort,
  };
  const sortTreeData = generateSortData(sort, sortCallbacks, page);

  const handleClose = () => {
    setOpen(false);
    setShowSortSettings(false);
    setShowFilterSettings(false);
  };

    const dropdownnRenderUI = () => {
    if (page === "bookmark" || page === 'profile-bookmark') {
      return (
        <div className="dropdown-content px-[16px] rounded-sm flex flex-col mx-2 pt-3 pb-4 gap-y-2">
          {/* default */}
          {
            !showSortSettings &&
            !showFilterSettings &&(
              <>
                <div className="flex items-center justify-between mb-[10px]">
                  <span className="font-[500]">View Options</span>
                  {/* <XMarkIcon
                    className="h-4 w-4 text-[#344054] cursor-pointer"
                    onClick={handleClose}
                  /> */}
                  <span onClick={handleClose} className="font-medium text-red-500 cursor-pointer">Close</span>
                </div>

                <div
                  className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                  onClick={() => {
                    setShowFilterSettings(true);
                  }}
                >
                  <div className="flex items-center">
                    <BsFilterCircle className="h-4 w-4 mr-[5px] text-[#344054]" />
                    <span className="text-[#344054]">Filters</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-green-500 text-[12px] font-medium">
                     {filter &&
                      filter?.length > 0 &&
                      filter?.filter(
                        (item) =>
                          item.filterBy &&
                          item.termType
                      ).length > 1
                        ? `${
                            filter?.filter(
                              (item) =>
                                item.filterBy &&
                                item.termType 
                            ).length
                          } filters`
                        : filter?.filter(
                            (item) =>
                              item.filterBy &&
                              item.termType
                          ).length === 1
                        ? `${
                            filter?.filter(
                              (item) =>
                                item.filterBy &&
                                item.termType 
                            ).length
                          } filter`
                        : ""}
                    </span>
                    <ChevronRightIcon className="h-4 w-4 text-[#344054] m-0" />
                  </div>
                </div>

                <div
                  className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                  onClick={() => {
                    setShowSortSettings(true);
                  }}
                >
                  <div className="flex items-center">
                    <ArrowsUpDownIcon className="h-5 w-5 mr-[5px] text-[#344054]" />
                    <span className="text-[#344054]">Sort</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-green-500 text-[12px] font-medium">
                      {sort &&
                      sort?.length > 0 &&
                      sort?.filter((item) => item.sortby && item.orderby).length > 1
                        ? `${
                            sort?.filter((item) => item.sortby && item.orderby).length
                          } sorts`
                        : sort?.filter((item) => item.sortby && item.orderby)
                            .length === 1
                        ? `${
                            sort?.filter((item) => item.sortby && item.orderby).length
                          } sort`
                        : ""}
                    </span>
                    <ChevronRightIcon className="h-4 w-4  text-[#344054] m-0" />
                  </div>
                </div>
              </>
            )}

          {/* sort */}
          {
            showSortSettings &&
            !showFilterSettings && (
              <>
                <div className="flex items-center justify-between mb-[20px]">
                  <div className="flex items-center">
                    <ChevronLeftIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer mr-[10px]"
                      onClick={() => {
                        setShowSortSettings(false);
                      }}
                    />
                    <span className="font-[500]">Sort</span>
                  </div>
                  <XMarkIcon
                    className="h-4 w-4 text-[#344054] cursor-pointer"
                    onClick={() => {
                      handleClose();
                    }}
                  />
                </div>

                <div className="flex flex-col items-center justify-center property-tree">
                  <Tree
                    treeData={sortTreeData}
                    className="w-full p-[10px]"
                    draggable
                    onDrop={onDropSort}
                    blockNode
                    selectable={false}
                  />

                  <div className="flex items-center mt-2 w-full justify-center">
                    <div className="w-[80%] text-end">
                      <Button className=""
                      onClick={handleSortSave}
                      disabled={sort?.length === 0}
                      >Submit</Button>
                    </div>

                    <div className="flex items-center justify-end w-[50%]">
                      {
                      sort?.length === 0 &&
                      <PlusIcon
                      className="h-4 w-4 cursor-pointer"
                        onClick={handleSortAdd}
                      />
                      }
                    </div>

                  </div>
                </div>
              </>
            )}

          {/* filter */}

          {
            !showSortSettings &&
            showFilterSettings && (
              <>
                <div className="flex items-center justify-between mb-[20px]">
                  <div className="flex items-center">
                    <ChevronLeftIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer mr-[10px]"
                      onClick={() => {
                        setShowFilterSettings(false);
                      }}
                    />
                    <span className="font-[500]">Filter</span>
                  </div>
                  <XMarkIcon
                    className="h-4 w-4 text-[#344054] cursor-pointer"
                    onClick={() => {
                      handleClose();
                    }}
                  />
                </div>

                <div className="flex flex-col items-center justify-center property-tree">
                  <Tree
                    treeData={filterTreeData}
                    className="w-full p-[10px]"
                    draggable
                    onDrop={onDropFilter}
                    blockNode
                    selectable={false}
                  />

                  <div className="flex items-center mt-2 w-full justify-center">
                    <div className="w-[80%] text-end">
                      <Button className=""
                      onClick={handleFilterSave}
                      disabled={filter?.length === 0}
                      >Submit</Button>
                    </div>

                    <div className="flex items-center justify-end w-[50%]">
                      <PlusIcon
                      className="h-4 w-4 cursor-pointer"
                        onClick={handleFilterAdd}
                      />

                      <TrashIcon
                        className="ml-2 h-4 w-4 cursor-pointer hover:text-[#EB5757]"
                        onClick={handleFilterRemoveAll}
                      />
                    </div>

                  </div>
                </div>
              </>
            )}

        </div>
      );
    } else if (page === "collection") {
    //   const data =
    //     customFields.length > 0
    //       ? customFields[0]?.customFieldObj?.map((item) => item.name)
    //       : [];
    //   const groupByOptionsData = ["tag", ...data];

      return (
        <div className="dropdown-content px-[10px] py-[5px]">
          {/* default */}
          {!showSortSettings &&
            !showFilterSettings &&(
              <>
                <div className="flex items-center justify-between mb-[10px]">
                  <span className="font-[500]">View Options</span>
                  <XMarkIcon
                    className="h-4 w-4 text-[#344054] cursor-pointer"
                    onClick={handleClose}
                  />
                </div>

                <div
                  className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                  onClick={() => {
                    setShowFilterSettings(true);
                  }}
                >
                  <div className="flex items-center">
                    <BsFilterCircle className="h-4 w-4 mr-[5px] text-[#344054]" />
                    <span className="text-[#344054]">Filters</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-green-500 text-[12px] font-medium">
                     {filter &&
                      filter?.length > 0 &&
                      filter?.filter(
                        (item) =>
                          item.filterBy &&
                          item.termType
                      ).length > 1
                        ? `${
                            filter?.filter(
                              (item) =>
                                item.filterBy &&
                                item.termType 
                            ).length
                          } filters`
                        : filter?.filter(
                            (item) =>
                              item.filterBy &&
                              item.termType
                          ).length === 1
                        ? `${
                            filter?.filter(
                              (item) =>
                                item.filterBy &&
                                item.termType 
                            ).length
                          } filter`
                        : ""}
                    </span>
                    <ChevronRightIcon className="h-4 w-4 text-[#344054] m-0" />
                  </div>
                </div>

                <div
                  className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                  onClick={() => {
                    setShowSortSettings(true);
                  }}
                >
                  <div className="flex items-center">
                    <ArrowsUpDownIcon className="h-5 w-5 mr-[5px] text-[#344054]" />
                    <span className="text-[#344054]">Sort</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-green-500 text-[12px] font-medium">
                      {sort &&
                      sort?.length > 0 &&
                      sort?.filter((item) => item.sortby && item.orderby).length > 1
                        ? `${
                            sort?.filter((item) => item.sortby && item.orderby).length
                          } sorts`
                        : sort?.filter((item) => item.sortby && item.orderby)
                            .length === 1
                        ? `${
                            sort?.filter((item) => item.sortby && item.orderby).length
                          } sort`
                        : ""}
                    </span>
                    <ChevronRightIcon className="h-4 w-4  text-[#344054] m-0" />
                  </div>
                </div>
                
              </>
            )}

          {/* sort */}
          {
            showSortSettings &&
            !showFilterSettings &&(
              <>
                <div className="flex items-center justify-between mb-[20px]">
                  <div className="flex items-center">
                    <ChevronLeftIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer mr-[10px]"
                      onClick={() => {
                        setShowSortSettings(false);
                      }}
                    />
                    <span className="font-[500]">Sort</span>
                  </div>
                  <XMarkIcon
                    className="h-4 w-4 text-[#344054] cursor-pointer"
                    onClick={() => {
                      handleClose();
                      handleUpdateCollectionPageConfig(sort, "sort", false);
                    }}
                  />
                </div>
                
                <div className="flex flex-col items-center justify-center property-tree">
                  <Tree
                    treeData={sortTreeData}
                    className="w-full p-[10px]"
                    draggable
                    onDrop={onDropSort}
                    blockNode
                    selectable={false}
                  />

                  <div className="flex items-center mt-2 w-full justify-center">
                    <div className="w-[80%] text-end">
                      <Button className=""
                      onClick={handleSortSave}
                      disabled={sort?.length === 0}
                      >Submit</Button>
                    </div>

                    <div className="flex items-center justify-end w-[50%]">
                      {
                      sort?.length === 0 &&
                      <PlusIcon
                      className="h-4 w-4 cursor-pointer"
                        onClick={handleSortAdd}
                      />
                      }
                    </div>

                  </div>
                </div>
              </>
            )}

          {/* filter */}

          {
            !showSortSettings &&
            showFilterSettings &&(
              <>
                <div className="flex items-center justify-between mb-[20px]">
                  <div className="flex items-center">
                    <ChevronLeftIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer mr-[10px]"
                      onClick={() => {
                        setShowFilterSettings(false);
                      }}
                    />
                    <span className="font-[500]">Filter</span>
                  </div>
                  <XMarkIcon
                    className="h-4 w-4 text-[#344054] cursor-pointer"
                    onClick={() => {
                      handleClose();
                      handleUpdateCollectionPageConfig(filter, "filter", false);
                    }}
                  />
                </div>

                <div className="flex flex-col items-center justify-center property-tree">
                  <Tree
                    treeData={filterTreeData}
                    className="w-full p-[10px]"
                    draggable
                    onDrop={onDropFilter}
                    blockNode
                    selectable={false}
                  />

                  <div className="flex items-center mt-2 w-full justify-center">
                    <div className="w-[80%] text-end">
                      <Button className=""
                      onClick={handleFilterSave}
                      disabled={filter?.length === 0}
                      >Submit</Button>
                    </div>

                    <div className="flex items-center justify-end w-[50%]">
                      <PlusIcon
                      className="h-4 w-4 cursor-pointer"
                        onClick={handleFilterAdd}
                      />

                      <TrashIcon
                        className="ml-2 h-4 w-4 cursor-pointer hover:text-[#EB5757]"
                        onClick={handleFilterRemoveAll}
                      />
                    </div>

                  </div>
                </div>
              </>
            )}
          
        </div>
      );
    } else if (
      page === "broken-duplicate" ||
      page === "filter" ||
      page === "tags"
    ) {
      return (
        <div className="dropdown-content px-[10px] py-[5px]">
          {
            !showSortSettings &&
            !showFilterSettings &&(
              <>
                <div className="flex items-center justify-between mb-[10px]">
                  <span className="font-[500]">View Options</span>
                  <XMarkIcon
                    className="h-4 w-4 text-[#344054] cursor-pointer"
                    onClick={handleClose}
                  />
                </div>

               
                <div
                  className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                  onClick={() => {
                    setShowFilterSettings(true);
                  }}
                >
                  <div className="flex items-center">
                    <BsFilterCircle className="h-4 w-4 mr-[5px] text-[#344054]" />
                    <span className="text-[#344054]">Filters</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-green-500 text-[12px] font-medium">
                     {filter &&
                      filter?.length > 0 &&
                      filter?.filter(
                        (item) =>
                          item.filterBy &&
                          item.termType
                      ).length > 1
                        ? `${
                            filter?.filter(
                              (item) =>
                                item.filterBy &&
                                item.termType 
                            ).length
                          } filters`
                        : filter?.filter(
                            (item) =>
                              item.filterBy &&
                              item.termType
                          ).length === 1
                        ? `${
                            filter?.filter(
                              (item) =>
                                item.filterBy &&
                                item.termType 
                            ).length
                          } filter`
                        : ""}
                    </span>
                    <ChevronRightIcon className="h-4 w-4 text-[#344054] m-0" />
                  </div>
                </div>
                
                <div
                  className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                  onClick={() => {
                    setShowSortSettings(true);
                  }}
                >
                  <div className="flex items-center">
                    <ArrowsUpDownIcon className="h-5 w-5 mr-[5px] text-[#344054]" />
                    <span className="text-[#344054]">Sort</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-green-500 text-[12px] font-medium">
                      {sort &&
                      sort?.length > 0 &&
                      sort?.filter((item) => item.sortby && item.orderby).length > 1
                        ? `${
                            sort?.filter((item) => item.sortby && item.orderby).length
                          } sorts`
                        : sort?.filter((item) => item.sortby && item.orderby)
                            .length === 1
                        ? `${
                            sort?.filter((item) => item.sortby && item.orderby).length
                          } sort`
                        : ""}
                    </span>
                    <ChevronRightIcon className="h-4 w-4  text-[#344054] m-0" />
                  </div>
                </div>

               
              </>
            )}

        

          {/* sort */}
          {
            showSortSettings &&
            !showFilterSettings && (
              <>
                <div className="flex items-center justify-between mb-[20px]">
                  <div className="flex items-center">
                    <ChevronLeftIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer mr-[10px]"
                      onClick={() => {
                        setShowSortSettings(false);
                      }}
                    />
                    <span className="font-[500]">Sort</span>
                  </div>
                  <XMarkIcon
                    className="h-4 w-4 text-[#344054] cursor-pointer"
                    onClick={() => {
                      handleClose();
                    }}
                  />
                </div>
                
                <div className="flex flex-col items-center justify-center property-tree">
                  <Tree
                    treeData={sortTreeData}
                    className="w-full p-[10px]"
                    draggable
                    onDrop={onDropSort}
                    blockNode
                    selectable={false}
                  />

                  <div className="flex items-center mt-2 w-full justify-center">
                    <div className="w-[80%] text-end">
                      <Button className=""
                      onClick={handleSortSave}
                      disabled={sort?.length === 0}
                      >Submit</Button>
                    </div>

                    <div className="flex items-center justify-end w-[50%]">
                      {
                      sort?.length === 0 &&
                      <PlusIcon
                      className="h-4 w-4 cursor-pointer"
                        onClick={handleSortAdd}
                      />
                      }
                    </div>

                  </div>
                </div>
              </>
            )}

          {/* filter */}

          {
            !showSortSettings &&
            showFilterSettings && (
              <>
                <div className="flex items-center justify-between mb-[20px]">
                  <div className="flex items-center">
                    <ChevronLeftIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer mr-[10px]"
                      onClick={() => {
                        setShowFilterSettings(false);
                      }}
                    />
                    <span className="font-[500]">Filter</span>
                  </div>
                  <XMarkIcon
                    className="h-4 w-4 text-[#344054] cursor-pointer"
                    onClick={() => {
                      handleClose();
                    }}
                  />
                </div>

                <div className="flex flex-col items-center justify-center property-tree">
                  <Tree
                    treeData={filterTreeData}
                    className="w-full p-[10px]"
                    draggable
                    onDrop={onDropFilter}
                    blockNode
                    selectable={false}
                  />

                  <div className="flex items-center mt-2 w-full justify-center">
                    <div className="w-[80%] text-end">
                      <Button className=""
                      onClick={handleFilterSave}
                      disabled={filter?.length === 0}
                      >Submit</Button>
                    </div>

                    <div className="flex items-center justify-end w-[50%]">
                      <PlusIcon
                      className="h-4 w-4 cursor-pointer"
                        onClick={handleFilterAdd}
                      />

                      <TrashIcon
                        className="ml-2 h-4 w-4 cursor-pointer hover:text-[#EB5757]"
                        onClick={handleFilterRemoveAll}
                      />
                    </div>

                  </div>
                </div>
              </>
            )}

        </div>
      );
    } 
    else {
      return <div>Dropdown</div>;
    }
  };

    return(
        <>
        <Dropdown
            overlayStyle={{ width: isMobile? "100%" : "300px",position: page === 'profile-bookmark' ? 'relative' : 'fixed'}}
            trigger={["click"]}
            dropdownRender={() => dropdownnRenderUI()}
            onOpenChange={handleOpen}
            open={open}
          >
            <div className="cursor-pointer flex items-center mx-2">
              <BsFilter className="h-5 w-5 mr-[5px]" />
              {!isMobile && <span>Filters</span>}
            </div>
          </Dropdown>
        </>
    )
}

export default FilterComponent;