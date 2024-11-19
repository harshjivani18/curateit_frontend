import {
  ArrowsUpDownIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ListBulletIcon,
  RectangleGroupIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
  PhotoIcon,
}                                 from "@heroicons/react/24/outline";
import moment                     from "moment";
import { BsFilterCircle }         from "react-icons/bs";
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Dropdown,
  Input,
  message,
  Select,
  Switch,
  Tree,
  Layout
}                                 from "antd";
import { useEffect, useState }    from "react";
import { useDispatch }            from "react-redux";
import { v4 as uuidv4 }           from "uuid";
import { MdOutlineRefresh, MdOutlineViewComfy, MdWallpaper }       from "react-icons/md";
import { AiOutlineLayout }        from "react-icons/ai";

import DropDownComponent          from "@components/common/DropdownComponent";
import LayoutOptionComponent      from "@components/common/LayoutOptionComponent";

import { 
  renderTitle,
  generateFilterTreeData, 
  generateSortData 
}                                 from "@utils/commonFunctions";
import { 
  ColorForNewProperty,
  NEW_PROPERTY, 
  TextMessage
}                                 from "@utils/constants";

import {
  createCustomFields,
  deleteCustomFieldsProperty,
  exportCollection,
  getCustomFields,
  updateCustomFieldsProperty,
}                                 from "@actions/collection";
import { FaIcons } from "react-icons/fa";


const Option = Select;

const ViewComponent = ({
  isMobile = false,
  propertyShown,
  propertyHidden,
  layout,
  page,
  collectionId,
  customFields,
  handlePropertyHide,
  handlePropertyVisible,
  updatePropertyOnDrop,
  handleLayout,
  isUnfilteredCollection,
  setPropertyShown,
  setPropertyOrder,
  updateCustomPropertyDataInConfig,
  propertyOrder,
  setPropertyHidden,
  handleRefreshProperty,
  editPagesIn,
  handleEditPagesIn,
  handleCardSize,
  cardSize,
  handleTableVerticalLine,
  showTableVerticalLine,
  handleTableWrapColumns,
  tableWrapColumns,
  openPagesIn,
  handleOpenPagesIn,
  setOpenWallpaperModal,
  wallpaper,
  handleTextEditor,
  showTextEditor,
  permissions = null,
  handleViewSubCollection = () => {},
  viewSubCollections = "",
  type = "",
  sort,
  filter,
  userTags,
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
  allCollectionsValue,
  handleViewSubTag,
  viewSubTags,
  hideGems = "",
  handleHideGems = () => {},
  setOpenIcon = () => {},
  handleCoverModal = () => {},
  showGems = "",
  handleShowGems = () => {},
  hideBrokenLinks = "",
  handleHideBrokenLinks = () => {},
  handleGemOnClickEvent = () => {},
  gemOnClickEvent = '',
}) => {
  const { Content } = Layout;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [showPropertySettings, setShowPropertySettings] = useState(false);
  const [showViewSettings, setShowViewSettings] = useState(false);
  const [showLayoutSettings, setShowLayoutSettings] = useState(false);
  const [showNewPropertySettings, setShowNewPropertySettings] = useState(false);
  const [newPropertyData, setNewPropertyData] = useState(null);
  const [newPropertyUI, setNewPropertyUI] = useState(false);
  const [openNewPropertyColorDropdown, setOpenNewPropertyColorDropdown] =
    useState({
      item: "",
      flag: false,
    });
  const [isEditCustomProperty, setIsEditCustomProperty] = useState(false);
  const [singleCustomPropertyEditObj, setSingleCustomPropertyEditObj] =
    useState(null);
  const [singleEditTempOptionValue, setSingleEditTempOptionValue] =
    useState("");

  const [treeData, setTreeData] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [showAnalyticsSidebar, setShowAnalyticsSidebar] = useState(false);
  const [openAnalyticsDrawer, setOpenAnalyticsDrawer] = useState(false);
  const [exportPopup, setExportPopup] = useState(false);
  const export_type = [
    {
      label: "CSV",
      key: "0",
    },
  ];

  //filters
  const [showSortSettings, setShowSortSettings] = useState(false);
  const [showFilterSettings, setShowFilterSettings] = useState(false);

  const handleFilterBy = (value, i) => {
    const arr = [...filter];
    arr[i].filterBy = value;
    setFilterArr(arr);
  };

  const handleTermType = (value, i) => {
    if (value === "empty" || value === "notempty") {
      const arr = [...filter];
      arr[i].termType = value;
      arr[i].queryBy = " ";
      setFilterArr(arr);
      return;
    }
    const arr = [...filter];
    arr[i].termType = value;
    setFilterArr(arr);
  };

  const handleQueryBy = (value, i) => {
    const arr = [...filter];
    if (
      arr[i].filterBy === "media_type" &&
      (!value.includes("SocialFeed") || !value.includes("Profile"))
    ) {
      arr[i].platform = "";
      arr[i].queryBy = value;
      setFilterArr(arr);
      return;
    }
    if (
      (arr[i].filterBy === "description" || arr[i].filterBy === "title") &&
      value?.includes(",")
    ) {
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

  const filterTreeData = generateFilterTreeData(
    filter,
    filterCallbacks,
    userTags,
    page,
    allCollectionsValue
  );

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

  useEffect(() => {
    let arr = [];
    if (propertyShown && propertyShown.length > 0) {
      propertyShown &&
        propertyShown.forEach((item, i) => {
          const obj = {
            title: renderTitle(
              item,
              "visible",
              handlePropertyHide,
              "",
              handleEditCustomFieldProperty
            ),
            key: i,
            label: item,
          };
          arr.push(obj);
        });

      setTreeData(arr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyShown, dispatch, layout, customFields]);

  const handleOpen = (flag) => {
    setOpen(flag);
  };

  const handleLayoutOptions = (value) => {
    handleLayout && handleLayout(value);
  };

  const onDrop = async (info) => {
    const { node, dragNode } = info;
    const dragIndex = treeData.findIndex((item) => item.key === dragNode.key);
    let dropIndex = treeData.findIndex((item) => item.key === node.key);
    const newTreeData = [...treeData];
    newTreeData.splice(dragIndex, 1);

    newTreeData.splice(dropIndex, 0, dragNode);

    const filtered = newTreeData.map((item) => item.label);
    setTreeData(newTreeData);
    updatePropertyOnDrop(filtered);
  };

  const handleSaveCustomFields = async (type) => {
    if (type === "text") {
      if (newPropertyData.name === "") {
        message.error("Enter name to create");
        return;
      }

      const data = {
        customFieldObj: [
          {
            ...newPropertyData,
            id: uuidv4(),
          },
        ],
        collection: collectionId,
      };

      setLoadingDelete(true);
      const res = await dispatch(createCustomFields(data));
      if (res.error === undefined) {
        const res1 = await dispatch(getCustomFields(collectionId));
        if (res1.error === undefined) {
          if (layout === "moodboard" || layout === "stream") {
            setPropertyHidden((prev) => [
              {
                name: data?.customFieldObj[0]?.name,
                type: data?.customFieldObj[0]?.type,
                id: data?.customFieldObj[0]?.id,
              },
              ...prev,
            ]);
          }

          if (layout !== "moodboard" && layout !== "stream") {
            setPropertyShown((prev) => [
              {
                name: data?.customFieldObj[0]?.name,
                type: data?.customFieldObj[0]?.type,
                id: data?.customFieldObj[0]?.id,
              },
              ...prev,
            ]);
            setPropertyOrder((prev) => [
              {
                name: data?.customFieldObj[0]?.name,
                type: data?.customFieldObj[0]?.type,
                id: data?.customFieldObj[0]?.id,
              },
              ...prev,
            ]);
          }
          updateCustomPropertyDataInConfig(
            {
              name: data?.customFieldObj[0]?.name,
              type: data?.customFieldObj[0]?.type,
              id: data?.customFieldObj[0]?.id,
            },
            "create"
          );
          message.success(TextMessage.CUSTOM_PROPERTY_CREATE_TEXT);
          setNewPropertyUI(false);
          setNewPropertyData(null);
          setShowPropertySettings(true);
          setLoadingDelete(false);
        } else {
          setLoadingDelete(false);
          // message.error(TextMessage.ERROR_TEXT);
          setNewPropertyUI(false);
          setNewPropertyData(null);
          setShowPropertySettings(true);
        }
      } else {
        setLoadingDelete(false);
        // message.error(TextMessage.ERROR_TEXT);
        await dispatch(getCustomFields(collectionId));
        setNewPropertyData(null);
        setNewPropertyUI(false);
        setShowPropertySettings(true);
      }
    }

    if (type === "select") {
      if (newPropertyData.name === "" && newPropertyData.options.length === 0) {
        message.error(TextMessage.MULTI_SELECT_BOTH);
        return;
      }
      if (newPropertyData.name === "") {
        message.error(TextMessage.MULTI_SELECT_NAME);
        return;
      }
      if (newPropertyData.options.length === 0) {
        message.error(TextMessage.MULTI_SELECT_OPTIONS);
        return;
      }

      const data = {
        customFieldObj: [
          {
            ...newPropertyData,
            id: uuidv4(),
          },
        ],
        collection: collectionId,
      };

      setLoadingDelete(true);
      const res = await dispatch(createCustomFields(data));

      if (res.error === undefined) {
        const res1 = await dispatch(getCustomFields(collectionId));
        if (res1.error === undefined) {
          if (layout === "moodboard" || layout === "stream") {
            setPropertyHidden((prev) => [
              {
                name: data?.customFieldObj[0]?.name,
                type: data?.customFieldObj[0]?.type,
                id: data?.customFieldObj[0]?.id,
              },
              ...prev,
            ]);
          }

          if (layout !== "moodboard" && layout !== "stream") {
            setPropertyShown((prev) => [
              {
                name: data?.customFieldObj[0]?.name,
                type: data?.customFieldObj[0]?.type,
                id: data?.customFieldObj[0]?.id,
              },
              ...prev,
            ]);
            setPropertyOrder((prev) => [
              {
                name: data?.customFieldObj[0]?.name,
                type: data?.customFieldObj[0]?.type,
                id: data?.customFieldObj[0]?.id,
              },
              ...prev,
            ]);
          }

          updateCustomPropertyDataInConfig(
            {
              name: data?.customFieldObj[0]?.name,
              type: data?.customFieldObj[0]?.type,
              id: data?.customFieldObj[0]?.id,
            },
            "create"
          );
          setLoadingDelete(false);
          message.success(TextMessage.CUSTOM_PROPERTY_CREATE_TEXT);
          await dispatch(getCustomFields(collectionId));
          setNewPropertyUI(false);
          setNewPropertyData(null);
          setShowPropertySettings(true);
        } else {
          setLoadingDelete(false);
          // message.error(TextMessage.ERROR_TEXT);
          setNewPropertyUI(false);
          setNewPropertyData(null);
          setShowPropertySettings(true);
        }
      } else {
        setLoadingDelete(false);
        // message.error(TextMessage.ERROR_TEXT);
        await dispatch(getCustomFields(collectionId));
        setNewPropertyUI(false);
        setNewPropertyData(null);
        setShowPropertySettings(true);
      }
    }
  };

  const handleOptionAnswer = () => {
    if (!newPropertyData.tempOptionValue) {
      message.error("Enter option value");
      return;
    }
    const randomColor =
      ColorForNewProperty[
        Math.floor(Math.random() * ColorForNewProperty.length)
      ];
    setNewPropertyData({
      ...newPropertyData,
      options: [
        ...newPropertyData.options,
        {
          value: newPropertyData.tempOptionValue,
          color: randomColor.color || "rgba(227, 226, 224, 0.5)",
        },
      ],
      tempOptionValue: "",
    });
  };

  const handleKeyDownOption = (event) => {
    if (event.key === "Enter") {
      handleOptionAnswer();
    }
  };

  const handleOptionAnswerEdit = () => {
    if (!singleEditTempOptionValue) {
      message.error("Enter option value");
      return;
    }
    const randomColor =
      ColorForNewProperty[
        Math.floor(Math.random() * ColorForNewProperty.length)
      ];
    setSingleCustomPropertyEditObj({
      ...singleCustomPropertyEditObj,
      options: [
        ...singleCustomPropertyEditObj.options,
        {
          value: singleEditTempOptionValue,
          color: randomColor.color || "rgba(227, 226, 224, 0.5)",
        },
      ],
    });
    setSingleEditTempOptionValue("");
  };

  const handleKeyDownOptionEdit = (event) => {
    if (event.key === "Enter") {
      handleOptionAnswerEdit();
    }
  };

  //new property ui
  const handleNewPropertyUI = () => {
    if (
      newPropertyData &&
      (newPropertyData.type === "Select" ||
        newPropertyData.type === "Multi-select" ||
        newPropertyData.type === "Status")
    ) {
      return (
        <>
          <div className="my-2">
            <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
              Name
            </div>
            <Input
              className="h-[30px]"
              value={(newPropertyData && newPropertyData.name) || ""}
              onChange={(e) =>
                setNewPropertyData({ ...newPropertyData, name: e.target.value })
              }
              placeholder="Enter Name"
            />
          </div>

          <div className="font-[500] text-[12px] text-[#37352fa6] mb-1">
            Default Value
          </div>
          <Select
            className="h-[30px] w-full"
            mode={newPropertyData.type === "Multi-select" ? "multiple" : ""}
            value={(newPropertyData && newPropertyData.defaultValue) || ""}
            onChange={(value) =>
              setNewPropertyData({
                ...newPropertyData,
                defaultValue: value,
              })
            }
            placeholder={`Select Default value`}
          >
            {newPropertyData &&
              newPropertyData.options.map((item, i) => (
                <Option key={item.value} value={item.value}>
                  {item.value}
                </Option>
              ))}
          </Select>

          {newPropertyData.type === "Select" && (
            <div className="mt-2">
              <Checkbox
                onChange={(e) => {
                  setNewPropertyData({
                    ...newPropertyData,
                    isLabel: e.target.checked === true ? true : false,
                  });
                }}
                checked={
                  (newPropertyData && newPropertyData?.isLabel) === true
                    ? true
                    : false
                }
              >
                Mark it as label
              </Checkbox>
            </div>
          )}

          <Divider className="my-[10px]" />

          <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
            Option
          </div>
          <div className="flex items-center justify-center">
            <Input
              className="h-[30px] mr-1"
              placeholder="Enter Option"
              onChange={(e) => {
                setNewPropertyData({
                  ...newPropertyData,
                  tempOptionValue: e.target.value,
                });
              }}
              value={(newPropertyData && newPropertyData.tempOptionValue) || ""}
              onKeyDown={handleKeyDownOption}
            />
            <PlusIcon
              className="h-5 w-5 cursor-pointer"
              onClick={handleOptionAnswer}
            />
          </div>

          <div>
            {newPropertyData &&
              newPropertyData.options.map((item, i) => (
                <>
                  <div className="flex items-center justify-between mt-2">
                    <span
                      style={{ backgroundColor: item.color }}
                      className={`font-[500] text-[12px] text-[#37352fa6] mb-[5px] p-[5px] rounded-[2px]`}
                    >
                      {item.value}
                    </span>
                    <ChevronRightIcon
                      className="h-4 w-4 cursor-pointer"
                      onClick={() =>
                        setOpenNewPropertyColorDropdown({ flag: true, item })
                      }
                    />
                  </div>
                  {openNewPropertyColorDropdown.flag === true &&
                    openNewPropertyColorDropdown.item === item && (
                      <div
                        className="bg-white p-[6px] relative rounded-[4px] overflow-y-auto"
                        style={{
                          boxShadow:
                            "rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <Input
                            className="h-[30px] mr-1"
                            placeholder="Enter Option"
                            value={(item && item.value) || ""}
                            onChange={(e) => {
                              const arr = [...newPropertyData.options];

                              arr[i] = {
                                ...arr[i],
                                value: e.target.value,
                              };
                              setNewPropertyData({
                                ...newPropertyData,
                                options: arr,
                              });
                            }}
                          />
                          <TrashIcon
                            className="h-4 w-4 cursor-pointer hover:text-[#EB5757]"
                            onClick={() => {
                              const arr = [...newPropertyData.options];

                              arr.splice(i, 1);

                              setNewPropertyData({
                                ...newPropertyData,
                                options: arr,
                              });
                              setOpenNewPropertyColorDropdown({
                                flag: false,
                                item: "",
                              });
                            }}
                          />
                        </div>

                        <Divider className="my-[10px]" />

                        {ColorForNewProperty.map((data, icolor) => (
                          <div
                            key={icolor}
                            className="flex items-center justify-between cursor-pointer hover:bg-[#f5f5f5] my-1"
                            onClick={() => {
                              const arr = [...newPropertyData.options];

                              arr[i] = {
                                ...arr[i],
                                color: data.color,
                              };

                              setNewPropertyData({
                                ...newPropertyData,
                                options: arr,
                              });
                            }}
                          >
                            <div className="flex items-center">
                              <div
                                style={{
                                  backgroundColor: data.color,
                                  boxShadow: data.boxShadow,
                                }}
                                className={`rounded-[2px] h-[20px] w-[20px] mr-1`}
                              ></div>
                              <span>{data.name}</span>
                            </div>
                            {data.color === item.color && (
                              <CheckIcon className="h-5 w-5" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                </>
              ))}
          </div>

          {/* <Divider className="my-[10px]" />

          <div className="text-right">
            <Button onClick={() => handleSaveCustomFields("select")} disabled={loadingDelete}>
              Save
            </Button>
          </div> */}
        </>
      );
    }

    return (
      <>
        <div className="my-2">
          <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
            Name
          </div>
          <Input
            className="h-[30px]"
            value={(newPropertyData && newPropertyData.name) || ""}
            onChange={(e) =>
              setNewPropertyData({ ...newPropertyData, name: e.target.value })
            }
            placeholder="Enter Name"
          />
        </div>

        {newPropertyData?.type === "Text" ||
        newPropertyData?.type === "Number" ||
        newPropertyData?.type === "URL" ||
        newPropertyData?.type === "Email" ||
        newPropertyData?.type === "Phone" ? (
          <>
            <div className="my-2">
              <div className="font-[500] text-[12px] text-[#37352fa6] mb-1">
                Default Value
              </div>
              <Input
                className="h-[30px]"
                value={(newPropertyData && newPropertyData.defaultValue) || ""}
                onChange={(e) =>
                  setNewPropertyData({
                    ...newPropertyData,
                    defaultValue: e.target.value,
                  })
                }
                placeholder={`Enter default value`}
              />
            </div>

            {newPropertyData.type === "Text" && (
              <div className="mt-2">
                <Checkbox
                  onChange={(e) => {
                    setNewPropertyData({
                      ...newPropertyData,
                      isLabel: e.target.checked === true ? true : false,
                    });
                  }}
                  checked={
                    (newPropertyData && newPropertyData?.isLabel) === true
                      ? true
                      : false
                  }
                >
                  Mark it as label
                </Checkbox>
              </div>
            )}
          </>
        ) : newPropertyData?.type === "Date" ? (
          <div className="mb-1">
            <div className="font-[500] text-[12px] text-[#37352fa6] mb-1">
              Default Value
            </div>
            <DatePicker
              value={
                (newPropertyData && newPropertyData.defaultValue) === ""
                  ? newPropertyData.defaultValue
                  : moment(newPropertyData.defaultValue, "YYYY-MM-DD")
              }
              onChange={(date, dateStirng) =>
                setNewPropertyData({
                  ...newPropertyData,
                  defaultValue: dateStirng,
                })
              }
              format={"YYYY-MM-DD"}
              allowClear={false}
              showToday={false}
              className="w-full"
            />
          </div>
        ) : newPropertyData?.type === "Checkbox" ? (
          <div className="mb-1">
            <div className="font-[500] text-[12px] text-[#37352fa6] mb-1">
              Default Value
            </div>
            <Checkbox
              onChange={(e) => {
                setNewPropertyData({
                  ...newPropertyData,
                  defaultValue: e.target.checked === true ? true : false,
                });
              }}
              checked={
                (newPropertyData && newPropertyData.defaultValue) === true
                  ? true
                  : false
              }
            />
          </div>
        ) : (
          <></>
        )}

        {/* <div className="text-right">
          <Button onClick={() => handleSaveCustomFields("text")} disabled={loadingDelete}>Save</Button>
        </div> */}
      </>
    );
  };

  const handleSaveCustomFieldsEdit = async (type) => {
    if (type === "text") {
      if (singleCustomPropertyEditObj.name === "") {
        message.error("Enter name");
        return;
      }

      const data = {
        ...singleCustomPropertyEditObj,
      };

      setLoadingDelete(true);
      const res = await dispatch(
        updateCustomFieldsProperty(customFields[0].id, data)
      );
      if (res.error === undefined) {
        const res1 = await dispatch(getCustomFields(collectionId));

        if (res1.error === undefined) {
          if (propertyHidden?.some((item) => item?.id?.includes(data?.id))) {
            const filteredHidden = propertyHidden.filter(
              (prop) => prop?.id !== data?.id
            );
            const hiddenData = [
              ...filteredHidden,
              { name: data?.name, type: data?.type, id: data?.id },
            ];
            setPropertyHidden(hiddenData);
            updateCustomPropertyDataInConfig(data, "update");
            setLoadingDelete(false);
            message.success(TextMessage.CUSTOM_PROPERTY_UPDATE_TEXT);
            setNewPropertyUI(false);
            setIsEditCustomProperty(false);
            setSingleCustomPropertyEditObj(null);
            setShowPropertySettings(true);
            return;
          }
          const filterOrder = propertyOrder.filter(
            (prop) => prop?.id !== data?.id
          );
          const filterShown = propertyShown.filter(
            (prop) => prop?.id !== data?.id
          );
          const orderData = [
            ...filterOrder,
            { name: data?.name, type: data?.type, id: data?.id },
          ];
          const shownData = [
            ...filterShown,
            { name: data?.name, type: data?.type, id: data?.id },
          ];
          setPropertyShown(shownData);
          setPropertyOrder(orderData);
          updateCustomPropertyDataInConfig(data, "update");
          setLoadingDelete(false);
          message.success(TextMessage.CUSTOM_PROPERTY_UPDATE_TEXT);
          setNewPropertyUI(false);
          setIsEditCustomProperty(false);
          setSingleCustomPropertyEditObj(null);
          setShowPropertySettings(true);
        } else {
          setLoadingDelete(false);
          // message.error(TextMessage.ERROR_TEXT);
          setNewPropertyUI(false);
          setIsEditCustomProperty(false);
          setSingleCustomPropertyEditObj(null);
          setShowPropertySettings(true);
        }
      } else {
        setLoadingDelete(false);
        // message.error(TextMessage.ERROR_TEXT);
        setNewPropertyUI(false);
        setIsEditCustomProperty(false);
        setSingleCustomPropertyEditObj(null);
        setShowPropertySettings(true);
      }
    }

    if (type === "select") {
      if (
        singleCustomPropertyEditObj.name === "" &&
        singleCustomPropertyEditObj.options.length === 0
      ) {
        message.error(TextMessage.MULTI_SELECT_BOTH);
        return;
      }
      if (singleCustomPropertyEditObj.name === "") {
        message.error(TextMessage.MULTI_SELECT_NAME);
        return;
      }
      if (singleCustomPropertyEditObj.options.length === 0) {
        message.error(TextMessage.MULTI_SELECT_OPTIONS);
        return;
      }
      const data = {
        ...singleCustomPropertyEditObj,
      };
      setLoadingDelete(true);
      const res = await dispatch(
        updateCustomFieldsProperty(customFields[0].id, data)
      );

      if (res.error === undefined) {
        const res1 = await dispatch(getCustomFields(collectionId));
        if (res1.error === undefined) {
          if (propertyHidden?.some((item) => item?.id?.includes(data?.id))) {
            const filteredHidden = propertyHidden.filter(
              (prop) => prop?.id !== data?.id
            );
            const hiddenData = [
              ...filteredHidden,
              { name: data?.name, type: data?.type, id: data?.id },
            ];
            setPropertyHidden(hiddenData);
            updateCustomPropertyDataInConfig(data, "update");
            setLoadingDelete(false);
            message.success(TextMessage.CUSTOM_PROPERTY_UPDATE_TEXT);
            setNewPropertyUI(false);
            setIsEditCustomProperty(false);
            setSingleCustomPropertyEditObj(null);
            setShowPropertySettings(true);
            return;
          }
          const filterOrder = propertyOrder.filter(
            (prop) => prop?.id !== data?.id
          );
          const filterShown = propertyShown.filter(
            (prop) => prop?.id !== data?.id
          );
          const orderData = [
            ...filterOrder,
            { name: data?.name, type: data?.type, id: data?.id },
          ];
          const shownData = [
            ...filterShown,
            { name: data?.name, type: data?.type, id: data?.id },
          ];
          setPropertyShown(shownData);
          setPropertyOrder(orderData);
          updateCustomPropertyDataInConfig(data, "update");
          setLoadingDelete(false);
          message.success(TextMessage.CUSTOM_PROPERTY_UPDATE_TEXT);
          setNewPropertyUI(false);
          setIsEditCustomProperty(false);
          setSingleCustomPropertyEditObj(null);
          setShowPropertySettings(true);
        } else {
          setLoadingDelete(false);
          // message.error(TextMessage.ERROR_TEXT);
          setNewPropertyUI(false);
          setIsEditCustomProperty(false);
          setSingleCustomPropertyEditObj(null);
          setShowPropertySettings(true);
        }
      } else {
        setLoadingDelete(false);
        // message.error(TextMessage.ERROR_TEXT);
        setNewPropertyUI(false);
        setIsEditCustomProperty(false);
        setSingleCustomPropertyEditObj(null);
        setShowPropertySettings(true);
      }
    }
  };

  const handleNewPropertyUIEdit = () => {
    if (
      singleCustomPropertyEditObj &&
      (singleCustomPropertyEditObj.type === "Select" ||
        singleCustomPropertyEditObj.type === "Multi-select" ||
        singleCustomPropertyEditObj.type === "Status")
    ) {
      return (
        <>
          <div className="my-2">
            <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
              Name
            </div>
            <Input
              className="h-[30px]"
              value={
                (singleCustomPropertyEditObj &&
                  singleCustomPropertyEditObj.name) ||
                ""
              }
              onChange={(e) =>
                setSingleCustomPropertyEditObj({
                  ...singleCustomPropertyEditObj,
                  name: e.target.value,
                })
              }
              placeholder="Enter Name"
            />
          </div>

          <div className="my-2">
            <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
              Default Value
            </div>
            <Select
              className="h-[30px] w-full"
              mode={
                singleCustomPropertyEditObj.type === "Multi-select"
                  ? "multiple"
                  : ""
              }
              value={
                (singleCustomPropertyEditObj &&
                  singleCustomPropertyEditObj.defaultValue) ||
                ""
              }
              onChange={(value) =>
                setSingleCustomPropertyEditObj({
                  ...singleCustomPropertyEditObj,
                  defaultValue: value,
                })
              }
              placeholder={`Select Default value`}
            >
              {singleCustomPropertyEditObj &&
                singleCustomPropertyEditObj.options.map((item, i) => (
                  <Option key={item.value} value={item.value}>
                    {item.value}
                  </Option>
                ))}
            </Select>
          </div>

          {singleCustomPropertyEditObj?.type === "Select" && (
            <div className="mt-2">
              <Checkbox
                onChange={(e) => {
                  setSingleCustomPropertyEditObj({
                    ...singleCustomPropertyEditObj,
                    isLabel: e.target.checked === true ? true : false,
                  });
                }}
                checked={
                  (singleCustomPropertyEditObj &&
                    singleCustomPropertyEditObj?.isLabel) === true
                    ? true
                    : false
                }
              >
                Mark it as label
              </Checkbox>
            </div>
          )}

          <Divider className="my-[10px]" />

          <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
            Option
          </div>
          <div className="flex items-center justify-center">
            <Input
              className="h-[30px] mr-1"
              placeholder="Enter Option"
              onChange={(e) => setSingleEditTempOptionValue(e.target.value)}
              value={singleEditTempOptionValue || ""}
              onKeyDown={handleKeyDownOptionEdit}
            />
            <PlusIcon
              className="h-5 w-5 cursor-pointer"
              onClick={handleOptionAnswerEdit}
            />
          </div>

          <div>
            {singleCustomPropertyEditObj &&
              singleCustomPropertyEditObj.options.map((item, i) => (
                <>
                  <div className="flex items-center justify-between mt-2">
                    <span
                      style={{ backgroundColor: item.color }}
                      className={`font-[500] text-[12px] text-[#37352fa6] mb-[5px] p-[5px] rounded-[2px]`}
                    >
                      {item.value}
                    </span>
                    <ChevronRightIcon
                      className="h-4 w-4 cursor-pointer"
                      onClick={() =>
                        setOpenNewPropertyColorDropdown({ flag: true, item })
                      }
                    />
                  </div>
                  {openNewPropertyColorDropdown.flag === true &&
                    openNewPropertyColorDropdown.item === item && (
                      <div
                        className="bg-white p-[6px] relative rounded-[4px] overflow-y-auto"
                        style={{
                          boxShadow:
                            "rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <Input
                            className="h-[30px] mr-1"
                            placeholder="Enter Option"
                            value={(item && item.value) || ""}
                            onChange={(e) => {
                              const arr = [
                                ...singleCustomPropertyEditObj.options,
                              ];

                              arr[i] = {
                                ...arr[i],
                                value: e.target.value,
                              };

                              setSingleCustomPropertyEditObj({
                                ...singleCustomPropertyEditObj,
                                options: arr,
                              });
                            }}
                          />
                          <TrashIcon
                            className="h-4 w-4 cursor-pointer hover:text-[#EB5757]"
                            onClick={() => {
                              const arr = [
                                ...singleCustomPropertyEditObj.options,
                              ];

                              arr.splice(i, 1);

                              setSingleCustomPropertyEditObj({
                                ...singleCustomPropertyEditObj,
                                options: arr,
                              });
                              setOpenNewPropertyColorDropdown({
                                flag: false,
                                item: "",
                              });
                            }}
                          />
                        </div>

                        <Divider className="my-[10px]" />

                        {ColorForNewProperty.map((data, icolor) => (
                          <div
                            key={icolor}
                            className="flex items-center justify-between cursor-pointer hover:bg-[#f5f5f5] my-1"
                            onClick={() => {
                              const arr = [
                                ...singleCustomPropertyEditObj.options,
                              ];

                              arr[i] = {
                                ...arr[i],
                                color: data.color,
                              };

                              setSingleCustomPropertyEditObj({
                                ...singleCustomPropertyEditObj,
                                options: arr,
                              });
                            }}
                          >
                            <div className="flex items-center">
                              <div
                                style={{
                                  backgroundColor: data.color,
                                  boxShadow: data.boxShadow,
                                }}
                                className={`rounded-[2px] h-[20px] w-[20px] mr-1`}
                              ></div>
                              <span>{data.name}</span>
                            </div>
                            {data.color === item.color && (
                              <CheckIcon className="h-5 w-5" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                </>
              ))}
          </div>

          {/* <Divider className="my-[10px]" />

          <div className="text-right">
            <Button onClick={() => handleSaveCustomFieldsEdit("select")} disabled={loadingDelete}>
              Save
            </Button>
          </div> */}
        </>
      );
    }

    return (
      <>
        <div className="my-2">
          <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
            Name
          </div>
          <Input
            className="h-[30px]"
            value={
              (singleCustomPropertyEditObj &&
                singleCustomPropertyEditObj.name) ||
              ""
            }
            onChange={(e) =>
              setSingleCustomPropertyEditObj({
                ...singleCustomPropertyEditObj,
                name: e.target.value,
              })
            }
            placeholder="Enter Name"
          />
        </div>

        {singleCustomPropertyEditObj?.type === "Text" ||
        singleCustomPropertyEditObj?.type === "Number" ||
        singleCustomPropertyEditObj?.type === "URL" ||
        singleCustomPropertyEditObj?.type === "Email" ||
        singleCustomPropertyEditObj?.type === "Phone" ? (
          <>
            <div className="my-2">
              <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
                Default Value
              </div>
              <Input
                className="h-[30px]"
                value={
                  (singleCustomPropertyEditObj &&
                    singleCustomPropertyEditObj.defaultValue) ||
                  ""
                }
                onChange={(e) =>
                  setSingleCustomPropertyEditObj({
                    ...singleCustomPropertyEditObj,
                    defaultValue: e.target.value,
                  })
                }
                placeholder={`Enter Default value`}
              />
            </div>
            {singleCustomPropertyEditObj?.type === "Text" && (
              <div className="mt-2">
                <Checkbox
                  onChange={(e) => {
                    setSingleCustomPropertyEditObj({
                      ...singleCustomPropertyEditObj,
                      isLabel: e.target.checked === true ? true : false,
                    });
                  }}
                  checked={
                    (singleCustomPropertyEditObj &&
                      singleCustomPropertyEditObj?.isLabel) === true
                      ? true
                      : false
                  }
                >
                  Mark it as label
                </Checkbox>
              </div>
            )}
          </>
        ) : singleCustomPropertyEditObj?.type === "Date" ? (
          <div className="mb-1">
            <DatePicker
              value={
                (singleCustomPropertyEditObj &&
                  singleCustomPropertyEditObj?.defaultValue) === ""
                  ? singleCustomPropertyEditObj?.defaultValue || null
                  : moment(
                      singleCustomPropertyEditObj?.defaultValue,
                      "YYYY-MM-DD"
                    )
              }
              onChange={(date, dateStirng) =>
                setSingleCustomPropertyEditObj({
                  ...singleCustomPropertyEditObj,
                  defaultValue: dateStirng,
                })
              }
              format={"YYYY-MM-DD"}
              allowClear={false}
              showToday={false}
              className="w-full"
            />
          </div>
        ) : singleCustomPropertyEditObj?.type === "Checkbox" ? (
          <div className="mb-1">
            <Checkbox
              onChange={(e) => {
                setSingleCustomPropertyEditObj({
                  ...singleCustomPropertyEditObj,
                  defaultValue: e.target.checked === true ? true : false,
                });
              }}
              checked={
                (singleCustomPropertyEditObj &&
                  singleCustomPropertyEditObj.defaultValue) === true
                  ? true
                  : false
              }
            />
          </div>
        ) : (
          <></>
        )}

        {/* <div className="text-right">
          <Button onClick={() => handleSaveCustomFieldsEdit("text")} disabled={loadingDelete}>
            Save
          </Button>
        </div> */}
      </>
    );
  };

  const handleDeleteCustomFieldProperty = async (item) => {
    setLoadingDelete(true);
    const res = await dispatch(
      deleteCustomFieldsProperty(customFields[0].id, item.id)
    );
    if (res.error === undefined) {
      const filteredOrder = propertyOrder.filter(
        (prop) => prop?.id !== item?.id
      );
      const filteredShown = propertyOrder.filter(
        (prop) => prop?.id !== item?.id
      );
      const filteredHidden = propertyHidden.filter(
        (prop) => prop?.id !== item?.id
      );
      setPropertyShown(filteredShown);
      setPropertyOrder(filteredOrder);
      setPropertyHidden(filteredHidden);
      updateCustomPropertyDataInConfig(item, "delete");
      message.success(TextMessage.CUSTOM_PROPERTY_DELETE_TEXT);
      await dispatch(getCustomFields(collectionId));
      setNewPropertyUI(false);
      setIsEditCustomProperty(false);
      setSingleCustomPropertyEditObj(null);
      setShowPropertySettings(true);
      setLoadingDelete(false);
    } else {
      setLoadingDelete(false);
      setNewPropertyUI(false);
      setIsEditCustomProperty(false);
      setSingleCustomPropertyEditObj(null);
      setShowPropertySettings(true);
      // message.error(TextMessage.ERROR_TEXT);
    }
  };

  const handleEditCustomFieldProperty = (item) => {
    const found =
      customFields &&
      customFields?.length > 0 &&
      customFields[0]?.customFieldObj?.filter((data) => data?.id === item?.id);

    setNewPropertyUI(true);
    setShowPropertySettings(false);
    setIsEditCustomProperty(true);
    setSingleCustomPropertyEditObj(found[0]);
  };

  const handleClose = () => {
    setOpen(false);
    setShowPropertySettings(false);
    setShowLayoutSettings(false);
    setShowNewPropertySettings(false);
    setNewPropertyUI(false);
    setNewPropertyData(null);
    setShowSortSettings(false);
    setShowFilterSettings(false);
    setShowViewSettings(false);
  };

  const onExport = async () => {
    const res = await dispatch(exportCollection(collectionId));
    if (res?.payload?.data?.path) {
      const elem = document.createElement("a");
      elem.href = res?.payload?.data?.path;
      elem.download = true;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    }
    setExportPopup(false);
  };

  const dropdownnRenderUI = () => {
    if (page === "bookmark" || (page === "profile-bookmark" && !type)) {
      return (
        <div className="dropdown-content px-[16px] rounded-sm flex flex-col mx-2 pt-3 pb-4 gap-y-2">
          {/* default */}
          {!showPropertySettings &&
            !showLayoutSettings &&
            !showNewPropertySettings &&
            !showSortSettings &&
            !showFilterSettings &&
            !showViewSettings && (
              <>
                <div className="flex items-center justify-between mb-[10px]">
                  <span className="font-[500]">View Options</span>
                  {/* <XMarkIcon
                    className="h-4 w-4 text-[#344054] cursor-pointer"
                    onClick={handleClose}
                  /> */}
                  <span
                    onClick={handleClose}
                    className="text-red-500 font-medium cursor-pointer"
                  >
                    Close
                  </span>
                </div>

                <div
                  className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                  onClick={() => {
                    setShowLayoutSettings(true);
                  }}
                >
                  <div className="flex items-center">
                    <RectangleGroupIcon className="h-5 w-5 mr-[5px] text-[#344054]" />
                    <span className="text-[#344054]"> Layout</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-[#344054] capitalize">{layout}</span>
                    <ChevronRightIcon className="h-4 w-4 text-[#344054] m-0" />
                  </div>
                </div>

                {/* {page === 'bookmark' && <div
                  className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                  onClick={() => {
                    setShowViewSettings(true);
                  }}
                >
                  <div className="flex items-center">
                    <MdOutlineViewComfy className="h-5 w-5 mr-[5px] text-[#344054]" />
                    <span className="text-[#344054]">View Settings</span>
                  </div>

                  <div className="flex items-center">
                    <ChevronRightIcon className="h-4 w-4  text-[#344054] m-0" />
                  </div>
                </div>} */}

                <div
                  className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                  onClick={() => {
                    setShowPropertySettings(true);
                  }}
                >
                  <div className="flex items-center">
                    <ListBulletIcon className="h-5 w-5 mr-[5px] text-[#344054]" />
                    <span className="text-[#344054]">Properties</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-[#344054]">
                      {propertyShown !== "" &&
                        propertyShown?.filter((item) => item !== "Icon")
                          ?.length}{" "}
                      shown
                    </span>
                    <ChevronRightIcon className="h-4 w-4  text-[#344054] m-0" />
                  </div>
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
                      filter?.filter((item) => item.filterBy && item.termType)
                        .length > 1
                        ? `${
                            filter?.filter(
                              (item) => item.filterBy && item.termType
                            ).length
                          } filters`
                        : filter?.filter(
                            (item) => item.filterBy && item.termType
                          ).length === 1
                        ? `${
                            filter?.filter(
                              (item) => item.filterBy && item.termType
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
                    <span className="text-[#344054]">Sort Gems</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-green-500 text-[12px] font-medium">
                      {sort &&
                      sort?.length > 0 &&
                      sort?.filter((item) => item.sortby && item.orderby)
                        .length > 1
                        ? `${
                            sort?.filter((item) => item.sortby && item.orderby)
                              .length
                          } sorts`
                        : sort?.filter((item) => item.sortby && item.orderby)
                            .length === 1
                        ? `${
                            sort?.filter((item) => item.sortby && item.orderby)
                              .length
                          } sort`
                        : ""}
                    </span>
                    <ChevronRightIcon className="h-4 w-4  text-[#344054] m-0" />
                  </div>
                </div>
              </>
            )}

          {/* property */}
          {showPropertySettings &&
            !showLayoutSettings &&
            !showNewPropertySettings &&
            !showSortSettings &&
            !showFilterSettings &&
            !showViewSettings && (
              <>
                <div className="flex items-center justify-between mb-[10px]">
                  <div className="flex items-center">
                    <ChevronLeftIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer mr-[10px]"
                      onClick={() => {
                        setShowPropertySettings(false);
                      }}
                    />
                    <span className="font-[500]">Properties</span>
                  </div>
                  <div className="flex items-center">
                    <MdOutlineRefresh
                      className="h-5 w-5 cursor-pointer mr-1"
                      onClick={handleRefreshProperty}
                    />
                    <XMarkIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer"
                      onClick={() => {
                        handleClose();
                      }}
                    />
                  </div>
                </div>

                <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
                  Visible
                </div>

                <div className="property-tree">
                  {propertyShown && propertyShown.length > 0 && (
                    <Tree
                      treeData={treeData}
                      draggable
                      onDrop={onDrop}
                      blockNode
                      selectable={false}
                    />
                  )}
                </div>

                {propertyHidden && propertyHidden.length > 0 && (
                  <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
                    Hidden
                  </div>
                )}
                {propertyHidden &&
                  propertyHidden.length > 0 &&
                  propertyHidden.map((item) =>
                    renderTitle(item, "hidden", "", handlePropertyVisible)
                  )}
              </>
            )}

          {/* layout */}
          {!showPropertySettings &&
            showLayoutSettings &&
            !showNewPropertySettings &&
            !showSortSettings &&
            !showFilterSettings &&
            !showViewSettings && (
              <>
                <div className="flex items-center justify-between mb-[20px]">
                  <div className="flex items-center">
                    <ChevronLeftIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer mr-[10px]"
                      onClick={() => setShowLayoutSettings(false)}
                    />
                    <span className="font-[500]">Layout</span>
                  </div>
                  <XMarkIcon
                    className="h-4 w-4 text-[#344054] cursor-pointer"
                    onClick={handleClose}
                  />
                </div>

                <div>
                  <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
                    Layout
                  </div>
                  <LayoutOptionComponent
                    layout={layout}
                    handleLayout={handleLayoutOptions}
                  />
                </div>

                <Divider className="my-2" />

                {/* layout more options */}
                {layout === "card" && (
                  <div>
                    <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                      <div className="flex items-center">
                        <span className="text-[#344054]">Card size</span>
                      </div>

                      <DropDownComponent
                        type="card size"
                        handleCardSize={handleCardSize}
                        cardSize={cardSize}
                      >
                        <div className="flex items-center">
                          <span className="text-[#344054] capitalize mr-1">
                            {cardSize}
                          </span>
                          <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                        </div>
                      </DropDownComponent>
                    </div>

                    {/* <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                      <div className="flex items-center">
                        <span className="text-[#344054]">Open pages in</span>
                      </div>

                      <DropDownComponent
                        type="open pages in"
                        handleOpenPagesIn={handleOpenPagesIn}
                        openPagesIn={openPagesIn}
                      >
                        <div className="flex items-center">
                          <span className="text-[#344054] capitalize mr-1">
                            {openPagesIn}
                          </span>
                          <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                        </div>
                      </DropDownComponent>
                    </div> */}

                    <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                      <div className="flex items-center">
                        <span className="text-[#344054]">Edit pages in</span>
                      </div>

                      <DropDownComponent
                        type="edit pages in"
                        handleEditPagesIn={handleEditPagesIn}
                        editPagesIn={editPagesIn}
                      >
                        <div className="flex items-center">
                          <span className="text-[#344054] capitalize mr-1">
                            {editPagesIn}
                          </span>
                          <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                        </div>
                      </DropDownComponent>
                    </div>
                  </div>
                )}

                {(layout === "list" ||
                  layout === "inbox" ||
                  layout === "moodboard") && (
                  <div>
                    {/* <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                      <div className="flex items-center">
                        <span className="text-[#344054]">Open pages in</span>
                      </div>

                      <DropDownComponent
                        type="open pages in"
                        handleOpenPagesIn={handleOpenPagesIn}
                        openPagesIn={openPagesIn}
                      >
                        <div className="flex items-center">
                          <span className="text-[#344054] capitalize mr-1">
                            {openPagesIn}
                          </span>
                          <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                        </div>
                      </DropDownComponent>
                    </div> */}

                    <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                      <div className="flex items-center">
                        <span className="text-[#344054]">Edit pages in</span>
                      </div>

                      <DropDownComponent
                        type="edit pages in"
                        handleEditPagesIn={handleEditPagesIn}
                        editPagesIn={editPagesIn}
                      >
                        <div className="flex items-center">
                          <span className="text-[#344054] capitalize mr-1">
                            {editPagesIn}
                          </span>
                          <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                        </div>
                      </DropDownComponent>
                    </div>
                  </div>
                )}

                {layout === "table" && (
                  <div>
                    <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                      <div className="flex items-center">
                        <span className="text-[#344054]">
                          Show vertical lines
                        </span>
                      </div>

                      <Switch
                        size="small"
                        style={{
                          background: showTableVerticalLine
                            ? "#1890ff"
                            : "#00000040",
                        }}
                        checked={showTableVerticalLine}
                        onChange={handleTableVerticalLine}
                      />
                    </div>

                    <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                      <div className="flex items-center">
                        <span className="text-[#344054]">Wrap all columns</span>
                      </div>

                      <Switch
                        size="small"
                        style={{
                          background: tableWrapColumns
                            ? "#1890ff"
                            : "#00000040",
                        }}
                        checked={tableWrapColumns}
                        onChange={handleTableWrapColumns}
                      />
                    </div>

                    <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                      <div className="flex items-center">
                        <span className="text-[#344054]">Edit pages in</span>
                      </div>

                      <DropDownComponent
                        type="edit pages in"
                        handleEditPagesIn={handleEditPagesIn}
                        editPagesIn={editPagesIn}
                      >
                        <div className="flex items-center">
                          <span className="text-[#344054] capitalize mr-1">
                            {editPagesIn}
                          </span>
                          <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                        </div>
                      </DropDownComponent>
                    </div>
                  </div>
                )}

                {layout === "stream" && (
                  <div>
                    <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                      <div className="flex items-center">
                        <span className="text-[#344054]">Edit pages in</span>
                      </div>

                      <DropDownComponent
                        type="edit pages in"
                        handleEditPagesIn={handleEditPagesIn}
                        editPagesIn={editPagesIn}
                      >
                        <div className="flex items-center">
                          <span className="text-[#344054] capitalize mr-1">
                            {editPagesIn}
                          </span>
                          <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                        </div>
                      </DropDownComponent>
                    </div>
                  </div>
                )}
              </>
            )}

          {/* sort */}
          {!showPropertySettings &&
            !showLayoutSettings &&
            !showNewPropertySettings &&
            showSortSettings &&
            !showFilterSettings &&
            !showViewSettings && (
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
                      <Button
                        className=""
                        onClick={handleSortSave}
                        disabled={sort?.length === 0}
                      >
                        Submit
                      </Button>
                    </div>

                    <div className="flex items-center justify-end w-[50%]">
                      {sort?.length === 0 && (
                        <PlusIcon
                          className="h-4 w-4 cursor-pointer"
                          onClick={handleSortAdd}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

          {/* filter */}

          {!showPropertySettings &&
            !showLayoutSettings &&
            !showNewPropertySettings &&
            !showSortSettings &&
            showFilterSettings &&
            !showViewSettings && (
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
                      <Button
                        className=""
                        onClick={handleFilterSave}
                        disabled={filter?.length === 0}
                      >
                        Submit
                      </Button>
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

          {/* view */}
          {!showPropertySettings &&
            !showLayoutSettings &&
            !showNewPropertySettings &&
            !showSortSettings &&
            !showFilterSettings &&
            showViewSettings && (
              <>
                <div className="flex items-center justify-between mb-[20px]">
                  <div className="flex items-center">
                    <ChevronLeftIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer mr-[10px]"
                      onClick={() => setShowViewSettings(false)}
                    />
                    <span className="font-[500]">View Settings</span>
                  </div>
                  <XMarkIcon
                    className="h-4 w-4 text-[#344054] cursor-pointer"
                    onClick={handleClose}
                  />
                </div>

                <div>
                  {/* <div className="flex px-3 py-1 items-center justify-between">
                    <span className="text-[#344054] font-medium text-sm">
                      On Click Event
                    </span>

                    <DropDownComponent
                      type="click event"
                      handleGemOnClickEvent={handleGemOnClickEvent}
                      gemOnClickEvent={gemOnClickEvent}
                    >
                      <div className="flex items-center cursor-pointer">
                        <span className="text-[#344054] capitalize mr-1">
                          {gemOnClickEvent}
                        </span>
                        <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                      </div>
                    </DropDownComponent>
                  </div> */}

                  <div className="flex px-3 py-1 items-center justify-between">
                    <span className="text-[#344054] font-medium text-sm">
                      Hide Broken Links
                    </span>
                    <Switch
                      size="small"
                      style={{
                        background: hideBrokenLinks ? "#1890ff" : "#E6E8EA",
                      }}
                      onChange={handleHideBrokenLinks}
                      checked={hideBrokenLinks}
                    />
                  </div>
                </div>
              </>
            )}
        </div>
      );
    } else if (page === "collection") {
      return (
        <div className="dropdown-content px-[10px] py-[5px]">
          {/* default */}
          {!showPropertySettings &&
            !showLayoutSettings &&
            !showNewPropertySettings &&
            !newPropertyUI &&
            !showSortSettings &&
            !showFilterSettings &&
            !showViewSettings && (
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
                    setShowLayoutSettings(true);
                  }}
                >
                  <div className="flex items-center">
                    <RectangleGroupIcon className="h-5 w-5 mr-[5px] text-[#344054]" />
                    <span className="text-[#344054]"> Layout</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-[#344054] capitalize">{layout}</span>
                    <ChevronRightIcon className="h-4 w-4 text-[#344054] m-0" />
                  </div>
                </div>

                {(!permissions ||
                  permissions?.accessType === "editor" ||
                  permissions?.accessType === "owner") && (
                  <div
                    className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                    onClick={() => {
                      setShowViewSettings(true);
                    }}
                  >
                    <div className="flex items-center">
                      <MdOutlineViewComfy className="h-5 w-5 mr-[5px] text-[#344054]" />
                      <span className="text-[#344054]">View Settings</span>
                    </div>

                    <div className="flex items-center">
                      <ChevronRightIcon className="h-4 w-4  text-[#344054] m-0" />
                    </div>
                  </div>
                )}

                {(!permissions ||
                  permissions?.accessType === "editor" ||
                  permissions?.accessType === "owner") && (
                  <div
                    className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                    onClick={() => {
                      setShowPropertySettings(true);
                    }}
                  >
                    <div className="flex items-center">
                      <ListBulletIcon className="h-5 w-5 mr-[5px] text-[#344054]" />
                      <span className="text-[#344054]">Properties</span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-[#344054]">
                        {propertyShown !== "" &&
                          propertyShown?.filter((item) => item !== "Icon")
                            ?.length}{" "}
                        shown
                      </span>
                      <ChevronRightIcon className="h-4 w-4  text-[#344054] m-0" />
                    </div>
                  </div>
                )}

                {/* filter */}
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
                      filter?.filter((item) => item.filterBy && item.termType)
                        .length > 1
                        ? `${
                            filter?.filter(
                              (item) => item.filterBy && item.termType
                            ).length
                          } filters`
                        : filter?.filter(
                            (item) => item.filterBy && item.termType
                          ).length === 1
                        ? `${
                            filter?.filter(
                              (item) => item.filterBy && item.termType
                            ).length
                          } filter`
                        : ""}
                    </span>
                    <ChevronRightIcon className="h-4 w-4 text-[#344054] m-0" />
                  </div>
                </div>

                {/* sort */}
                <div
                  className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                  onClick={() => {
                    setShowSortSettings(true);
                  }}
                >
                  <div className="flex items-center">
                    <ArrowsUpDownIcon className="h-5 w-5 mr-[5px] text-[#344054]" />
                    <span className="text-[#344054]">Sort Gems</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-green-500 text-[12px] font-medium">
                      {sort &&
                      sort?.length > 0 &&
                      sort?.filter((item) => item.sortby && item.orderby)
                        .length > 1
                        ? `${
                            sort?.filter((item) => item.sortby && item.orderby)
                              .length
                          } sorts`
                        : sort?.filter((item) => item.sortby && item.orderby)
                            .length === 1
                        ? `${
                            sort?.filter((item) => item.sortby && item.orderby)
                              .length
                          } sort`
                        : ""}
                    </span>
                    <ChevronRightIcon className="h-4 w-4  text-[#344054] m-0" />
                  </div>
                </div>

                {/* <div className="flex px-3 py-1 items-center" 
                      
                >
                  <IoAnalytics className="h-5 w-5 mr-[5px] text-[#344054]" />
                  <span className="text-[#344054] font-medium text-sm"
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowAnalyticsSidebar(true);
                            setOpen(false);
                          }}
                  >Analytics</span> 
                </div>

                <div className="flex px-3 py-1 items-center" 
                      
                >
                  <PiExportThin className="h-5 w-5 mr-[5px] text-[#344054]" />
                  <span className="text-[#344054] font-medium text-sm"
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setExportPopup(true);
                            setOpen(false);
                          }}
                  >Export</span> 
                </div> */}
              </>
            )}
          {/* property */}
          {showPropertySettings &&
            !showLayoutSettings &&
            !showNewPropertySettings &&
            !newPropertyUI &&
            !showSortSettings &&
            !showFilterSettings &&
            !showViewSettings && (
              <>
                <div className="flex items-center justify-between mb-[10px]">
                  <div className="flex items-center">
                    <ChevronLeftIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer mr-[10px]"
                      onClick={() => {
                        setShowPropertySettings(false);
                      }}
                    />
                    <span className="font-[500]">Properties</span>
                  </div>
                  <div className="flex items-center">
                    <MdOutlineRefresh
                      className="h-5 w-5 cursor-pointer mr-1"
                      onClick={handleRefreshProperty}
                    />
                    <XMarkIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer"
                      onClick={() => {
                        handleClose();
                      }}
                    />
                  </div>
                </div>

                <div className="h-auto max-h-[300px] overflow-y-auto">
                  <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
                    Visible
                  </div>

                  <div className="h-[auto] overflow-y-auto property-tree">
                    {propertyShown && propertyShown.length > 0 && (
                      <Tree
                        treeData={treeData}
                        draggable
                        onDrop={onDrop}
                        blockNode
                        selectable={false}
                      />
                    )}
                  </div>

                  {propertyHidden && propertyHidden.length > 0 && (
                    <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
                      Hidden
                    </div>
                  )}
                  <div className="h-[auto] overflow-y-auto">
                    {propertyHidden &&
                      propertyHidden.length > 0 &&
                      propertyHidden.map((item, i) =>
                        renderTitle(
                          item,
                          "hidden",
                          "",
                          handlePropertyVisible,
                          handleEditCustomFieldProperty
                        )
                      )}
                  </div>
                </div>

                {!isUnfilteredCollection && <Divider className="my-[10px]" />}
                {!isUnfilteredCollection && (
                  <div
                    className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                    onClick={() => {
                      setShowNewPropertySettings(true);
                      setShowPropertySettings(false);
                    }}
                  >
                    <div className="flex items-center">
                      <PlusIcon className="h-5 w-5 mr-[5px] text-[#344054]" />
                      <span className="text-[#344054]">New Property</span>
                    </div>
                  </div>
                )}
              </>
            )}
          {/* layout */}
          {!showPropertySettings &&
            showLayoutSettings &&
            !showNewPropertySettings &&
            !newPropertyUI &&
            !showSortSettings &&
            !showFilterSettings &&
            !showViewSettings && (
              <>
                <div className="flex items-center justify-between mb-[20px]">
                  <div className="flex items-center">
                    <ChevronLeftIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer mr-[10px]"
                      onClick={() => setShowLayoutSettings(false)}
                    />
                    <span className="font-[500]">Layout</span>
                  </div>
                  <XMarkIcon
                    className="h-4 w-4 text-[#344054] cursor-pointer"
                    onClick={handleClose}
                  />
                </div>

                <div>
                  <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
                    Layout
                  </div>
                  <LayoutOptionComponent
                    layout={layout}
                    handleLayout={handleLayoutOptions}
                  />

                  <Divider className="my-2" />
                  {/* layout more options */}
                  {layout === "card" && (
                    <div>
                      <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                        <div className="flex items-center">
                          <span className="text-[#344054]">Card size</span>
                        </div>

                        <DropDownComponent
                          type="card size"
                          handleCardSize={handleCardSize}
                          cardSize={cardSize}
                        >
                          <div className="flex items-center">
                            <span className="text-[#344054] capitalize mr-1">
                              {cardSize}
                            </span>
                            <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                          </div>
                        </DropDownComponent>
                      </div>

                      {/* <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                      <div className="flex items-center">
                        <span className="text-[#344054]">Open pages in</span>
                      </div>

                      <DropDownComponent
                        type="open pages in"
                        handleOpenPagesIn={handleOpenPagesIn}
                        openPagesIn={openPagesIn}
                      >
                        <div className="flex items-center">
                          <span className="text-[#344054] capitalize mr-1">
                            {openPagesIn}
                          </span>
                          <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                        </div>
                      </DropDownComponent>
                    </div> */}

                      <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                        <div className="flex items-center">
                          <span className="text-[#344054]">Edit pages in</span>
                        </div>

                        <DropDownComponent
                          type="edit pages in"
                          handleEditPagesIn={handleEditPagesIn}
                          editPagesIn={editPagesIn}
                        >
                          <div className="flex items-center">
                            <span className="text-[#344054] capitalize mr-1">
                              {editPagesIn}
                            </span>
                            <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                          </div>
                        </DropDownComponent>
                      </div>

                      {(!permissions ||
                        permissions?.accessType === "editor" ||
                        permissions?.accessType === "owner") && (
                        <>
                          <div
                            className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                            onClick={() => setOpenWallpaperModal(true)}
                          >
                            <div className="flex items-center">
                              <MdWallpaper className="h-4 w-4 text-[#344054] mr-1" />
                              <span className="text-[#344054]">Wallpaper</span>
                            </div>

                            <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                          </div>

                          <div
                            className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                            onClick={() => handleCoverModal()}
                          >
                            <div className="flex items-center">
                              <PhotoIcon className="h-4 w-4 text-[#344054] mr-1" />
                              <span className="text-[#344054]">Cover</span>
                            </div>

                            <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                          </div>

                          <div
                            className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                            onClick={() => setOpenIcon(true)}
                          >
                            <div className="flex items-center">
                              <FaIcons className="h-4 w-4 text-[#344054] mr-1" />
                              <span className="text-[#344054]">Icon</span>
                            </div>

                            <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  {(layout === "list" ||
                    layout === "inbox" ||
                    layout === "moodboard") && (
                    <div>
                      {/* <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                      <div className="flex items-center">
                        <span className="text-[#344054]">Open pages in</span>
                      </div>

                      <DropDownComponent
                        type="open pages in"
                        handleOpenPagesIn={handleOpenPagesIn}
                        openPagesIn={openPagesIn}
                      >
                        <div className="flex items-center">
                          <span className="text-[#344054] capitalize mr-1">
                            {openPagesIn}
                          </span>
                          <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                        </div>
                      </DropDownComponent>
                    </div> */}

                      <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                        <div className="flex items-center">
                          <span className="text-[#344054]">Edit pages in</span>
                        </div>

                        <DropDownComponent
                          type="edit pages in"
                          handleEditPagesIn={handleEditPagesIn}
                          editPagesIn={editPagesIn}
                        >
                          <div className="flex items-center">
                            <span className="text-[#344054] capitalize mr-1">
                              {editPagesIn}
                            </span>
                            <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                          </div>
                        </DropDownComponent>
                      </div>

                      {(!permissions ||
                        permissions?.accessType === "editor" ||
                        permissions?.accessType === "owner") && (
                        <>
                          <div
                            className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                            onClick={() => setOpenWallpaperModal(true)}
                          >
                            <div className="flex items-center">
                              <MdWallpaper className="h-4 w-4 text-[#344054] mr-1" />
                              <span className="text-[#344054]">Wallpaper</span>
                            </div>

                            <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                          </div>

                          <div
                            className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                            onClick={() => handleCoverModal()}
                          >
                            <div className="flex items-center">
                              <PhotoIcon className="h-4 w-4 text-[#344054] mr-1" />
                              <span className="text-[#344054]">Cover</span>
                            </div>

                            <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                          </div>

                          <div
                            className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                            onClick={() => setOpenIcon(true)}
                          >
                            <div className="flex items-center">
                              <FaIcons className="h-4 w-4 text-[#344054] mr-1" />
                              <span className="text-[#344054]">Icon</span>
                            </div>

                            <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {layout === "table" && (
                    <div>
                      <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                        <div className="flex items-center">
                          <span className="text-[#344054]">
                            Show vertical lines
                          </span>
                        </div>

                        <Switch
                          size="small"
                          style={{
                            background: showTableVerticalLine
                              ? "#1890ff"
                              : "#00000040",
                          }}
                          checked={showTableVerticalLine}
                          onChange={handleTableVerticalLine}
                        />
                      </div>

                      <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                        <div className="flex items-center">
                          <span className="text-[#344054]">
                            Wrap all columns
                          </span>
                        </div>

                        <Switch
                          size="small"
                          style={{
                            background: tableWrapColumns
                              ? "#1890ff"
                              : "#00000040",
                          }}
                          checked={tableWrapColumns}
                          onChange={handleTableWrapColumns}
                        />
                      </div>

                      <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                        <div className="flex items-center">
                          <span className="text-[#344054]">Edit pages in</span>
                        </div>

                        <DropDownComponent
                          type="edit pages in"
                          handleEditPagesIn={handleEditPagesIn}
                          editPagesIn={editPagesIn}
                        >
                          <div className="flex items-center">
                            <span className="text-[#344054] capitalize mr-1">
                              {editPagesIn}
                            </span>
                            <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                          </div>
                        </DropDownComponent>
                      </div>

                      {(!permissions ||
                        permissions?.accessType === "editor" ||
                        permissions?.accessType === "owner") && (
                        <>
                          <div
                            className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                            onClick={() => handleCoverModal()}
                          >
                            <div className="flex items-center">
                              <PhotoIcon className="h-4 w-4 text-[#344054] mr-1" />
                              <span className="text-[#344054]">Cover</span>
                            </div>

                            <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                          </div>

                          <div
                            className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                            onClick={() => setOpenIcon(true)}
                          >
                            <div className="flex items-center">
                              <FaIcons className="h-4 w-4 text-[#344054] mr-1" />
                              <span className="text-[#344054]">Icon</span>
                            </div>

                            <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {layout === "stream" && (
                    <div>
                      <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                        <div className="flex items-center">
                          <span className="text-[#344054]">Edit pages in</span>
                        </div>

                        <DropDownComponent
                          type="edit pages in"
                          handleEditPagesIn={handleEditPagesIn}
                          editPagesIn={editPagesIn}
                        >
                          <div className="flex items-center">
                            <span className="text-[#344054] capitalize mr-1">
                              {editPagesIn}
                            </span>
                            <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                          </div>
                        </DropDownComponent>
                      </div>

                      {(!permissions ||
                        permissions?.accessType === "editor" ||
                        permissions?.accessType === "owner") && (
                        <>
                          <div
                            className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                            onClick={() => setOpenWallpaperModal(true)}
                          >
                            <div className="flex items-center">
                              <MdWallpaper className="h-4 w-4 text-[#344054] mr-1" />
                              <span className="text-[#344054]">Wallpaper</span>
                            </div>

                            <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                          </div>

                          <div
                            className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                            onClick={() => handleCoverModal()}
                          >
                            <div className="flex items-center">
                              <PhotoIcon className="h-4 w-4 text-[#344054] mr-1" />
                              <span className="text-[#344054]">Cover</span>
                            </div>

                            <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                          </div>

                          <div
                            className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                            onClick={() => setOpenIcon(true)}
                          >
                            <div className="flex items-center">
                              <FaIcons className="h-4 w-4 text-[#344054] mr-1" />
                              <span className="text-[#344054]">Icon</span>
                            </div>

                            <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}

          {/* view */}
          {!showPropertySettings &&
            !showLayoutSettings &&
            !showNewPropertySettings &&
            !newPropertyUI &&
            !showSortSettings &&
            !showFilterSettings &&
            showViewSettings && (
              <>
                <div className="flex items-center justify-between mb-[20px]">
                  <div className="flex items-center">
                    <ChevronLeftIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer mr-[10px]"
                      onClick={() => setShowViewSettings(false)}
                    />
                    <span className="font-[500]">View Settings</span>
                  </div>
                  <XMarkIcon
                    className="h-4 w-4 text-[#344054] cursor-pointer"
                    onClick={handleClose}
                  />
                </div>

                <div>
                  <div className="flex px-3 py-1 items-center justify-between">
                    <span className="text-[#344054] font-medium text-sm">
                      On Click Event
                    </span>

                    <DropDownComponent
                      type="click event"
                      handleGemOnClickEvent={handleGemOnClickEvent}
                      gemOnClickEvent={gemOnClickEvent}
                    >
                      <div className="flex items-center cursor-pointer">
                        <span className="text-[#344054] capitalize mr-1">
                          {gemOnClickEvent}
                        </span>
                        <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                      </div>
                    </DropDownComponent>
                  </div>

                  <div className="flex px-3 py-1 items-center justify-between">
                    <span className="text-[#344054] font-medium text-sm">
                      Show description
                    </span>
                    <Switch
                      size="small"
                      style={{
                        background: showTextEditor ? "#1890ff" : "#E6E8EA",
                      }}
                      onChange={handleTextEditor}
                      checked={showTextEditor}
                    />
                  </div>

                  <div className="flex px-3 py-1 items-center justify-between">
                    <span className="text-[#344054] font-medium text-sm">
                      View sub collection
                    </span>
                    <Switch
                      size="small"
                      style={{
                        background: viewSubCollections ? "#1890ff" : "#E6E8EA",
                      }}
                      onChange={handleViewSubCollection}
                      checked={viewSubCollections}
                    />
                  </div>

                  <div className="flex px-3 py-1 items-center justify-between">
                    <span className="text-[#344054] font-medium text-sm">
                      Show Gems
                    </span>
                    <Switch
                      size="small"
                      style={{
                        background: showGems ? "#1890ff" : "#E6E8EA",
                      }}
                      onChange={handleShowGems}
                      checked={showGems}
                    />
                  </div>

                  {/* <div className="flex px-3 py-1 items-center justify-between">
                    <span className="text-[#344054] font-medium text-sm">
                      Hide Broken Links
                    </span>
                    <Switch
                      size="small"
                      style={{
                        background: hideBrokenLinks ? "#1890ff" : "#E6E8EA",
                      }}
                      onChange={handleHideBrokenLinks}
                      checked={hideBrokenLinks}
                    />
                  </div> */}
                </div>
              </>
            )}
          {/* new property settings*/}
          {!showPropertySettings &&
            !showLayoutSettings &&
            showNewPropertySettings &&
            !newPropertyUI &&
            !showSortSettings &&
            !showFilterSettings &&
            !showViewSettings && (
              <>
                <div className="flex items-center justify-between mb-[20px]">
                  <div className="flex items-center">
                    <ChevronLeftIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer mr-[10px]"
                      onClick={() => setShowNewPropertySettings(false)}
                    />
                    <span className="font-[500]">New Property</span>
                  </div>
                  <XMarkIcon
                    className="h-4 w-4 text-[#344054] cursor-pointer"
                    onClick={handleClose}
                  />
                </div>

                <div className="">
                  <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
                    Type
                  </div>

                  {NEW_PROPERTY.map((item, i) => (
                    <div
                      className="flex items-center cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                      key={i}
                      onClick={() => {
                        setNewPropertyUI(true);
                        setNewPropertyData({
                          type: item.type,
                          name: "",
                          options: [],
                          tempOptionValue: "",
                          defaultValue:
                            item?.type === "Select" ||
                            item?.type === "Multi-select" ||
                            item?.type === "Status"
                              ? []
                              : "",
                        });
                        setShowNewPropertySettings(false);
                      }}
                    >
                      {item.icon}
                      <span className="text-[#37352f] text-[14px]">
                        {item.type}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          {/* new property ui */}
          {!showPropertySettings &&
            !showLayoutSettings &&
            !showNewPropertySettings &&
            newPropertyUI &&
            !showSortSettings &&
            !showFilterSettings &&
            !showViewSettings && (
              <>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <ChevronLeftIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer mr-[10px]"
                      onClick={() => {
                        setNewPropertyUI(false);
                        setNewPropertyData(null);
                        setIsEditCustomProperty(false);
                      }}
                    />

                    <span className="font-[500]">Edit Property</span>
                  </div>
                  <div className="flex items-center">
                    {isEditCustomProperty && (
                      <TrashIcon
                        className="h-4 w-4 cursor-pointer mr-2 hover:text-[#EB5757]"
                        onClick={() =>
                          handleDeleteCustomFieldProperty(
                            singleCustomPropertyEditObj
                          )
                        }
                      />
                    )}
                    <XMarkIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer"
                      onClick={handleClose}
                    />
                  </div>
                </div>

                {!isEditCustomProperty ? (
                  <div className="h-auto max-h-[300px] overflow-y-auto overflow-x-hidden">
                    <div className="h-auto overflow-y-auto">
                      <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
                        Type: {newPropertyData && newPropertyData.type}
                      </div>
                    </div>

                    <div>{handleNewPropertyUI()}</div>
                  </div>
                ) : (
                  <div className="h-auto max-h-[300px] overflow-y-auto overflow-x-hidden">
                    <div className="h-auto overflow-y-auto">
                      <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
                        Type:{" "}
                        {singleCustomPropertyEditObj &&
                          singleCustomPropertyEditObj.type}
                      </div>
                    </div>

                    <div>{handleNewPropertyUIEdit()}</div>
                  </div>
                )}

                {!isEditCustomProperty ? (
                  <>
                    <Divider className="my-2" />
                    <div className="text-right">
                      <Button
                        onClick={() => {
                          if (
                            newPropertyData &&
                            (newPropertyData.type === "Select" ||
                              newPropertyData.type === "Multi-select" ||
                              newPropertyData.type === "Status")
                          ) {
                            handleSaveCustomFields("select");
                          } else {
                            handleSaveCustomFields("text");
                          }
                        }}
                        disabled={loadingDelete}
                      >
                        Save
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Divider className="my-[10px]" />
                    <div className="text-right">
                      <Button
                        onClick={() => {
                          if (
                            singleCustomPropertyEditObj &&
                            (singleCustomPropertyEditObj.type === "Select" ||
                              singleCustomPropertyEditObj.type ===
                                "Multi-select" ||
                              singleCustomPropertyEditObj.type === "Status")
                          ) {
                            handleSaveCustomFieldsEdit("select");
                          } else {
                            handleSaveCustomFieldsEdit("text");
                          }
                        }}
                        disabled={loadingDelete}
                      >
                        Save
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}
          {/* sort */}
          {!showPropertySettings &&
            !showLayoutSettings &&
            !showNewPropertySettings &&
            !newPropertyUI &&
            showSortSettings &&
            !showFilterSettings &&
            !showViewSettings && (
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
                      <Button
                        className=""
                        onClick={handleSortSave}
                        disabled={sort?.length === 0}
                      >
                        Submit
                      </Button>
                    </div>

                    <div className="flex items-center justify-end w-[50%]">
                      {sort?.length === 0 && (
                        <PlusIcon
                          className="h-4 w-4 cursor-pointer"
                          onClick={handleSortAdd}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          {/* filter */}
          {!showPropertySettings &&
            !showLayoutSettings &&
            !showNewPropertySettings &&
            !newPropertyUI &&
            !showSortSettings &&
            showFilterSettings &&
            !showViewSettings && (
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
                      <Button
                        className=""
                        onClick={handleFilterSave}
                        disabled={filter?.length === 0}
                      >
                        Submit
                      </Button>
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
          {!showPropertySettings &&
            !showLayoutSettings &&
            !showNewPropertySettings &&
            !showSortSettings &&
            !showFilterSettings &&
            !showViewSettings && (
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
                    setShowLayoutSettings(true);
                  }}
                >
                  <div className="flex items-center">
                    <RectangleGroupIcon className="h-5 w-5 mr-[5px] text-[#344054]" />
                    <span className="text-[#344054]"> Layout</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-[#344054] capitalize">{layout}</span>
                    <ChevronRightIcon className="h-4 w-4 text-[#344054] m-0" />
                  </div>
                </div>

                {(!permissions ||
                  permissions?.accessType === "editor" ||
                  permissions?.accessType === "owner") &&
                  page === "tags"  && (
                  <div
                    className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                    onClick={() => {
                      setShowViewSettings(true);
                    }}
                  >
                    <div className="flex items-center">
                      <MdOutlineViewComfy className="h-5 w-5 mr-[5px] text-[#344054]" />
                      <span className="text-[#344054]">View Settings</span>
                    </div>

                    <div className="flex items-center">
                      <ChevronRightIcon className="h-4 w-4  text-[#344054] m-0" />
                    </div>
                  </div>
                )}

                {(!permissions ||
                  permissions?.accessType === "editor" ||
                  permissions?.accessType === "owner") && (
                  <div
                    className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                    onClick={() => {
                      setShowPropertySettings(true);
                    }}
                  >
                    <div className="flex items-center">
                      <ListBulletIcon className="h-5 w-5 mr-[5px] text-[#344054]" />
                      <span className="text-[#344054]">Properties</span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-[#344054]">
                        {propertyShown !== "" &&
                          propertyShown?.filter((item) => item !== "Icon")
                            ?.length}{" "}
                        shown
                      </span>
                      <ChevronRightIcon className="h-4 w-4  text-[#344054] m-0" />
                    </div>
                  </div>
                )}

                {/* filter */}
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
                      filter?.filter((item) => item.filterBy && item.termType)
                        .length > 1
                        ? `${
                            filter?.filter(
                              (item) => item.filterBy && item.termType
                            ).length
                          } filters`
                        : filter?.filter(
                            (item) => item.filterBy && item.termType
                          ).length === 1
                        ? `${
                            filter?.filter(
                              (item) => item.filterBy && item.termType
                            ).length
                          } filter`
                        : ""}
                    </span>
                    <ChevronRightIcon className="h-4 w-4 text-[#344054] m-0" />
                  </div>
                </div>

                {/* sort */}
                <div
                  className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                  onClick={() => {
                    setShowSortSettings(true);
                  }}
                >
                  <div className="flex items-center">
                    <ArrowsUpDownIcon className="h-5 w-5 mr-[5px] text-[#344054]" />
                    <span className="text-[#344054]">Sort Gems</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-green-500 text-[12px] font-medium">
                      {sort &&
                      sort?.length > 0 &&
                      sort?.filter((item) => item.sortby && item.orderby)
                        .length > 1
                        ? `${
                            sort?.filter((item) => item.sortby && item.orderby)
                              .length
                          } sorts`
                        : sort?.filter((item) => item.sortby && item.orderby)
                            .length === 1
                        ? `${
                            sort?.filter((item) => item.sortby && item.orderby)
                              .length
                          } sort`
                        : ""}
                    </span>
                    <ChevronRightIcon className="h-4 w-4  text-[#344054] m-0" />
                  </div>
                </div>
              </>
            )}

          {/* view */}
          {!showPropertySettings &&
            !showLayoutSettings &&
            !showNewPropertySettings &&
            !showSortSettings &&
            !showFilterSettings &&
            showViewSettings && (
              <>
                <div className="flex items-center justify-between mb-[20px]">
                  <div className="flex items-center">
                    <ChevronLeftIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer mr-[10px]"
                      onClick={() => setShowViewSettings(false)}
                    />
                    <span className="font-[500]">View Settings</span>
                  </div>
                  <XMarkIcon
                    className="h-4 w-4 text-[#344054] cursor-pointer"
                    onClick={handleClose}
                  />
                </div>

                <div>
                  {page === "tags" && (
                    <div className="flex px-3 py-1 items-center justify-between">
                      <span className="text-[#344054] font-medium text-sm">
                        On Click Event
                      </span>

                      <DropDownComponent
                        type="click event"
                        handleGemOnClickEvent={handleGemOnClickEvent}
                        gemOnClickEvent={gemOnClickEvent}
                      >
                        <div className="flex items-center cursor-pointer">
                          <span className="text-[#344054] capitalize mr-1">
                            {gemOnClickEvent}
                          </span>
                          <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                        </div>
                      </DropDownComponent>
                    </div>
                  )}

                  {/* <div className="flex px-3 py-1 items-center justify-between">
                    <span className="text-[#344054] font-medium text-sm">
                      Hide Broken Links
                    </span>
                    <Switch
                      size="small"
                      style={{
                        background: hideBrokenLinks ? "#1890ff" : "#E6E8EA",
                      }}
                      onChange={handleHideBrokenLinks}
                      checked={hideBrokenLinks}
                    />
                  </div> */}
                  {page === "tags" && (
                    <>
                      <div className="flex px-3 py-1 items-center justify-between">
                        <span className="text-[#344054] font-medium text-sm">
                          Show description
                        </span>
                        <Switch
                          size="small"
                          style={{
                            background: showTextEditor ? "#1890ff" : "#E6E8EA",
                          }}
                          onChange={handleTextEditor}
                          checked={showTextEditor}
                        />
                      </div>

                      <div className="flex px-3 py-1 items-center justify-between">
                        <span className="text-[#344054] font-medium text-sm">
                          View sub tag
                        </span>
                        <Switch
                          size="small"
                          style={{
                            background: viewSubTags ? "#1890ff" : "#E6E8EA",
                          }}
                          onChange={handleViewSubTag}
                          checked={viewSubTags}
                        />
                      </div>

                      <div className="flex px-3 py-1 items-center justify-between">
                        <span className="text-[#344054] font-medium text-sm">
                          Show Gems
                        </span>
                        <Switch
                          size="small"
                          style={{
                            background: showGems ? "#1890ff" : "#E6E8EA",
                          }}
                          onChange={handleShowGems}
                          checked={showGems}
                        />
                      </div>
                    </>
                  )}
                </div>
              </>
            )}

          {!showPropertySettings &&
            showLayoutSettings &&
            !showNewPropertySettings &&
            !showSortSettings &&
            !showFilterSettings &&
            !showViewSettings && (
              <>
                <div className="flex items-center justify-between mb-[20px]">
                  <div className="flex items-center">
                    <ChevronLeftIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer mr-[10px]"
                      onClick={() => setShowLayoutSettings(false)}
                    />
                    <span className="font-[500]">Layout</span>
                  </div>
                  <XMarkIcon
                    className="h-4 w-4 text-[#344054] cursor-pointer"
                    onClick={handleClose}
                  />
                </div>

                <div>
                  <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
                    Layout
                  </div>
                  <LayoutOptionComponent
                    layout={layout}
                    handleLayout={handleLayoutOptions}
                  />

                  <Divider className="my-2" />

                  {/* layout more options */}
                  {layout === "card" && (
                    <div>
                      <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                        <div className="flex items-center">
                          <span className="text-[#344054]">Card size</span>
                        </div>

                        <DropDownComponent
                          type="card size"
                          handleCardSize={handleCardSize}
                          cardSize={cardSize}
                        >
                          <div className="flex items-center">
                            <span className="text-[#344054] capitalize mr-1">
                              {cardSize}
                            </span>
                            <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                          </div>
                        </DropDownComponent>
                      </div>

                      {/* <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                      <div className="flex items-center">
                        <span className="text-[#344054]">Open pages in</span>
                      </div>

                      <DropDownComponent
                        type="open pages in"
                        handleOpenPagesIn={handleOpenPagesIn}
                        openPagesIn={openPagesIn}
                      >
                        <div className="flex items-center">
                          <span className="text-[#344054] capitalize mr-1">
                            {openPagesIn}
                          </span>
                          <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                        </div>
                      </DropDownComponent>
                    </div> */}

                      <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                        <div className="flex items-center">
                          <span className="text-[#344054]">Edit pages in</span>
                        </div>

                        <DropDownComponent
                          type="edit pages in"
                          handleEditPagesIn={handleEditPagesIn}
                          editPagesIn={editPagesIn}
                        >
                          <div className="flex items-center">
                            <span className="text-[#344054] capitalize mr-1">
                              {editPagesIn}
                            </span>
                            <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                          </div>
                        </DropDownComponent>
                      </div>
                      {page === "tags" &&
                        (!permissions ||
                          permissions?.accessType === "editor" ||
                          permissions?.accessType === "owner") && (
                          <>
                            <div
                              className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                              onClick={() => setOpenWallpaperModal(true)}
                            >
                              <div className="flex items-center">
                                <MdWallpaper className="h-4 w-4 text-[#344054] mr-1" />
                                <span className="text-[#344054]">
                                  Wallpaper
                                </span>
                              </div>

                              <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                            </div>

                            <div
                              className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                              onClick={() => handleCoverModal()}
                            >
                              <div className="flex items-center">
                                <PhotoIcon className="h-4 w-4 text-[#344054] mr-1" />
                                <span className="text-[#344054]">Cover</span>
                              </div>

                              <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                            </div>

                            <div
                              className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                              onClick={() => setOpenIcon(true)}
                            >
                              <div className="flex items-center">
                                <FaIcons className="h-4 w-4 text-[#344054] mr-1" />
                                <span className="text-[#344054]">Icon</span>
                              </div>

                              <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                            </div>
                          </>
                        )}
                    </div>
                  )}

                  {(layout === "list" ||
                    layout === "inbox" ||
                    layout === "moodboard") && (
                    <div>
                      {/* <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                      <div className="flex items-center">
                        <span className="text-[#344054]">Open pages in</span>
                      </div>

                      <DropDownComponent
                        type="open pages in"
                        handleOpenPagesIn={handleOpenPagesIn}
                        openPagesIn={openPagesIn}
                      >
                        <div className="flex items-center">
                          <span className="text-[#344054] capitalize mr-1">
                            {openPagesIn}
                          </span>
                          <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                        </div>
                      </DropDownComponent>
                    </div> */}

                      <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                        <div className="flex items-center">
                          <span className="text-[#344054]">Edit pages in</span>
                        </div>

                        <DropDownComponent
                          type="edit pages in"
                          handleEditPagesIn={handleEditPagesIn}
                          editPagesIn={editPagesIn}
                        >
                          <div className="flex items-center">
                            <span className="text-[#344054] capitalize mr-1">
                              {editPagesIn}
                            </span>
                            <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                          </div>
                        </DropDownComponent>
                      </div>

                      {page === "tags" &&
                        (!permissions ||
                          permissions?.accessType === "editor" ||
                          permissions?.accessType === "owner") && (
                          <>
                            <div
                              className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                              onClick={() => setOpenWallpaperModal(true)}
                            >
                              <div className="flex items-center">
                                <MdWallpaper className="h-4 w-4 text-[#344054] mr-1" />
                                <span className="text-[#344054]">
                                  Wallpaper
                                </span>
                              </div>

                              <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                            </div>

                            <div
                              className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                              onClick={() => handleCoverModal()}
                            >
                              <div className="flex items-center">
                                <PhotoIcon className="h-4 w-4 text-[#344054] mr-1" />
                                <span className="text-[#344054]">Cover</span>
                              </div>

                              <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                            </div>

                            <div
                              className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                              onClick={() => setOpenIcon(true)}
                            >
                              <div className="flex items-center">
                                <FaIcons className="h-4 w-4 text-[#344054] mr-1" />
                                <span className="text-[#344054]">Icon</span>
                              </div>

                              <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                            </div>
                          </>
                        )}
                    </div>
                  )}

                  {layout === "table" && (
                    <div>
                      <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                        <div className="flex items-center">
                          <span className="text-[#344054]">
                            Show vertical lines
                          </span>
                        </div>

                        <Switch
                          size="small"
                          style={{
                            background: showTableVerticalLine
                              ? "#1890ff"
                              : "#00000040",
                          }}
                          checked={showTableVerticalLine}
                          onChange={handleTableVerticalLine}
                        />
                      </div>

                      <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                        <div className="flex items-center">
                          <span className="text-[#344054]">
                            Wrap all columns
                          </span>
                        </div>

                        <Switch
                          size="small"
                          style={{
                            background: tableWrapColumns
                              ? "#1890ff"
                              : "#00000040",
                          }}
                          checked={tableWrapColumns}
                          onChange={handleTableWrapColumns}
                        />
                      </div>

                      <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                        <div className="flex items-center">
                          <span className="text-[#344054]">Edit pages in</span>
                        </div>

                        <DropDownComponent
                          type="edit pages in"
                          handleEditPagesIn={handleEditPagesIn}
                          editPagesIn={editPagesIn}
                        >
                          <div className="flex items-center">
                            <span className="text-[#344054] capitalize mr-1">
                              {editPagesIn}
                            </span>
                            <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                          </div>
                        </DropDownComponent>
                      </div>

                      {page === "tags" &&
                        (!permissions ||
                          permissions?.accessType === "editor" ||
                          permissions?.accessType === "owner") && (
                          <>
                            <div
                              className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                              onClick={() => handleCoverModal()}
                            >
                              <div className="flex items-center">
                                <PhotoIcon className="h-4 w-4 text-[#344054] mr-1" />
                                <span className="text-[#344054]">Cover</span>
                              </div>

                              <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                            </div>

                            <div
                              className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                              onClick={() => setOpenIcon(true)}
                            >
                              <div className="flex items-center">
                                <FaIcons className="h-4 w-4 text-[#344054] mr-1" />
                                <span className="text-[#344054]">Icon</span>
                              </div>

                              <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                            </div>
                          </>
                        )}
                    </div>
                  )}

                  {layout === "stream" && (
                    <div>
                      <div className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                        <div className="flex items-center">
                          <span className="text-[#344054]">Edit pages in</span>
                        </div>

                        <DropDownComponent
                          type="edit pages in"
                          handleEditPagesIn={handleEditPagesIn}
                          editPagesIn={editPagesIn}
                        >
                          <div className="flex items-center">
                            <span className="text-[#344054] capitalize mr-1">
                              {editPagesIn}
                            </span>
                            <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                          </div>
                        </DropDownComponent>
                      </div>

                      {page === "tags" &&
                        (!permissions ||
                          permissions?.accessType === "editor" ||
                          permissions?.accessType === "owner") && (
                          <>
                            <div
                              className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                              onClick={() => setOpenWallpaperModal(true)}
                            >
                              <div className="flex items-center">
                                <MdWallpaper className="h-4 w-4 text-[#344054] mr-1" />
                                <span className="text-[#344054]">
                                  Wallpaper
                                </span>
                              </div>

                              <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                            </div>

                            <div
                              className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                              onClick={() => handleCoverModal()}
                            >
                              <div className="flex items-center">
                                <PhotoIcon className="h-4 w-4 text-[#344054] mr-1" />
                                <span className="text-[#344054]">Cover</span>
                              </div>

                              <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                            </div>

                            <div
                              className="flex items-center justify-between cursor-pointer py-[5px] px-[12px] hover:bg-[#f5f5f5]"
                              onClick={() => setOpenIcon(true)}
                            >
                              <div className="flex items-center">
                                <FaIcons className="h-4 w-4 text-[#344054] mr-1" />
                                <span className="text-[#344054]">Icon</span>
                              </div>

                              <ChevronRightIcon className="h-4 w-4 text-[#344054]" />
                            </div>
                          </>
                        )}
                    </div>
                  )}
                </div>
              </>
            )}

          {showPropertySettings &&
            !showLayoutSettings &&
            !showNewPropertySettings &&
            !showSortSettings &&
            !showFilterSettings &&
            !showViewSettings && (
              <>
                <div className="flex items-center justify-between mb-[10px]">
                  <div className="flex items-center">
                    <ChevronLeftIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer mr-[10px]"
                      onClick={() => {
                        setShowPropertySettings(false);
                      }}
                    />
                    <span className="font-[500]">Properties</span>
                  </div>
                  <div className="flex items-center">
                    <MdOutlineRefresh
                      className="h-5 w-5 cursor-pointer mr-1"
                      onClick={handleRefreshProperty}
                    />
                    <XMarkIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer"
                      onClick={() => {
                        handleClose();
                      }}
                    />
                  </div>
                </div>

                <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
                  Visible
                </div>

                <div className="property-tree">
                  {propertyShown && propertyShown.length > 0 && (
                    <Tree
                      treeData={treeData}
                      draggable
                      onDrop={onDrop}
                      blockNode
                      selectable={false}
                    />
                  )}
                </div>

                {propertyHidden && propertyHidden.length > 0 && (
                  <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
                    Hidden
                  </div>
                )}
                {propertyHidden &&
                  propertyHidden.length > 0 &&
                  propertyHidden.map((item, i) =>
                    renderTitle(item, "hidden", "", handlePropertyVisible)
                  )}
              </>
            )}

          {/* sort */}
          {!showPropertySettings &&
            !showLayoutSettings &&
            !showNewPropertySettings &&
            showSortSettings &&
            !showFilterSettings &&
            !showViewSettings && (
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
                      <Button
                        className=""
                        onClick={handleSortSave}
                        disabled={sort?.length === 0}
                      >
                        Submit
                      </Button>
                    </div>

                    <div className="flex items-center justify-end w-[50%]">
                      {sort?.length === 0 && (
                        <PlusIcon
                          className="h-4 w-4 cursor-pointer"
                          onClick={handleSortAdd}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

          {/* filter */}

          {!showPropertySettings &&
            !showLayoutSettings &&
            !showNewPropertySettings &&
            !showSortSettings &&
            showFilterSettings &&
            !showViewSettings && (
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
                      <Button
                        className=""
                        onClick={handleFilterSave}
                        disabled={filter?.length === 0}
                      >
                        Submit
                      </Button>
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
    } else if (page === "embed") {
      return (
        <div className="dropdown-content px-[10px] py-[5px]">
          {/* default */}
          {!showPropertySettings &&
            !showLayoutSettings &&
            !showNewPropertySettings &&
            !newPropertyUI && (
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
                    setShowLayoutSettings(true);
                  }}
                >
                  <div className="flex items-center">
                    <RectangleGroupIcon className="h-5 w-5 mr-[5px] text-[#344054]" />
                    <span className="text-[#344054]"> Layout</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-[#344054] capitalize">{layout}</span>
                    <ChevronRightIcon className="h-4 w-4 text-[#344054] m-0" />
                  </div>
                </div>
              </>
            )}

          {/* layout */}
          {!showPropertySettings &&
            showLayoutSettings &&
            !showNewPropertySettings &&
            !newPropertyUI && (
              <>
                <div className="flex items-center justify-between mb-[20px]">
                  <div className="flex items-center">
                    <ChevronLeftIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer mr-[10px]"
                      onClick={() => setShowLayoutSettings(false)}
                    />
                    <span className="font-[500]">Layout</span>
                  </div>
                  <XMarkIcon
                    className="h-4 w-4 text-[#344054] cursor-pointer"
                    onClick={handleClose}
                  />
                </div>

                <div>
                  <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
                    Layout
                  </div>
                  <LayoutOptionComponent
                    layout={layout}
                    handleLayout={handleLayoutOptions}
                    page={page}
                  />
                </div>
              </>
            )}
        </div>
      );
    } else if (
      page === "collection-public-shared" ||
      (page === "profile-bookmark" && type === "public")
    ) {
      return (
        <div className="dropdown-content px-[10px] py-[5px]">
          {/* default */}
          {!showPropertySettings &&
            !showLayoutSettings &&
            !showNewPropertySettings && (
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
                    setShowLayoutSettings(true);
                  }}
                >
                  <div className="flex items-center">
                    <RectangleGroupIcon className="h-5 w-5 mr-[5px] text-[#344054]" />
                    <span className="text-[#344054]"> Layout</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-[#344054] capitalize">{layout}</span>
                    <ChevronRightIcon className="h-4 w-4 text-[#344054] m-0" />
                  </div>
                </div>
              </>
            )}
          {/* layout */}
          {!showPropertySettings &&
            showLayoutSettings &&
            !showNewPropertySettings && (
              <>
                <div className="flex items-center justify-between mb-[20px]">
                  <div className="flex items-center">
                    <ChevronLeftIcon
                      className="h-4 w-4 text-[#344054] cursor-pointer mr-[10px]"
                      onClick={() => setShowLayoutSettings(false)}
                    />
                    <span className="font-[500]">Layout</span>
                  </div>
                  <XMarkIcon
                    className="h-4 w-4 text-[#344054] cursor-pointer"
                    onClick={handleClose}
                  />
                </div>

                <div>
                  <div className="font-[500] text-[12px] text-[#37352fa6] mb-[5px]">
                    Layout
                  </div>
                  <LayoutOptionComponent
                    layout={layout}
                    handleLayout={handleLayoutOptions}
                    page={page}
                  />
                </div>

                <Divider className="my-2" />
              </>
            )}
        </div>
      );
    } else {
      return <div>Dropdown</div>;
    }
  };

  return (
    <>
      <Dropdown
        overlayStyle={{
          width: isMobile ? "100%" : "300px",
          position: page === "profile-bookmark" ? "relative" : "fixed",
        }}
        trigger={["click"]}
        dropdownRender={() => dropdownnRenderUI()}
        onOpenChange={handleOpen}
        open={open}
      >
        <div className="cursor-pointer flex items-center relative">
          <AiOutlineLayout className="h-5 w-5 mr-1" />
          {!isMobile && <span>Views</span>}
        </div>
      </Dropdown>

      {showAnalyticsSidebar && (
        <>
          {/* <AnalyticsDrawer 
                open={showAnalyticsSidebar} setOpenDrawer={setShowAnalyticsSidebar}
              /> */}
          {/* <div className="h-full">
                <Content style={{
                  padding: '16px',
                  paddingLeft: '16px',
                  backgroundColor: '#FCFCFD',
                  paddingTop: '110px'
                }}>
                  <AnalyticsDrawer 
                    open={showAnalyticsSidebar} setOpenDrawer={setShowAnalyticsSidebar}
                  />
                </Content>
              </div>   */}
          {/* <AnalyticsDrawer open={showAnalyticsSidebar} setOpenDrawer={setShowAnalyticsSidebar} /> */}
        </>
      )}

      {/* {exportPopup &&
              <Modal 
                  width={300}
                  open={exportPopup} 
                  onCancel={() => {setExportPopup(false)}}
                  centered
                  onOk={onExport} 
                  okText="Export" 
                  title={"Export Your Collection"} 
                  okButtonProps={{
                    className: "bg-[#40a9ff] border-[#40a9ff]"
                  }}
                >
                    <div className="flex felx-col justify-between">
                      <div>Export Format</div>
                      <div>
                      <Dropdown
                        menu={{
                          items: export_type,
                        }}
                        trigger={['click']}
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            CSV
                            
                          </Space>
                        </a>
                      </Dropdown>
                      </div>
                    </div>

              </Modal>
          } */}
    </>
  );
};

export default ViewComponent;