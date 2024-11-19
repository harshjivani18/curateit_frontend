'use client'



import { 
  ArrowLeftIcon, 
  BellIcon, 
  ChevronRightIcon, 
  EllipsisHorizontalIcon, 
  PencilSquareIcon, 
  PhotoIcon, 
  ShareIcon, 
  TrashIcon 
}                                               from "@heroicons/react/24/outline";
import { 
  Badge, 
  Button, 
  Dropdown, 
  Modal, 
  Space 
}                                               from "antd";
import { useRouter }                            from "next/navigation";
import { useEffect, useState }                  from "react";
import { FaIcons }                              from "react-icons/fa6";
import { PiExportThin }                         from "react-icons/pi";
import { RiFileCopyLine, RiLineChartLine }      from "react-icons/ri";
import { useDispatch, useSelector }             from "react-redux";

import AddDropdown                              from "./Topbar/AddDropdown";
import ViewComponent                            from "./Topbar/ViewComponent";
import BreadCrumbCollection                     from "@components/common/BreadCrumbCollection";
import AnalyticsDrawer                          from "@components/drawers/Analytics";

import { copyText }                             from "@utils/constants";

import { exportCollection }                     from "@actions/collection";

const BreadCrumbNav = ({
  folders,
  targetId,
  isFollowedCollection = false,
  isSharedAndAllowEdit = false,
  handleShareClick = () => {},
  page,
  addEditIcon,
  handleEditCall,
  copyUrl = "",
  handleDeleteCollection,
  isSubCollection = "",
  coverImage = "",
  icon = "",
  handleCoverModal = () => {},
  setOpenIcon = () => {},
  handleOpenApproveReject = () => {},
  showNotificationIcon = "",
  pendingGemsCount = "",
  propertyShown = "",
  propertyHidden = "",
  layout = "",
  collectionId = "",
  customFields = [],
  handlePropertyHide = () => {},
  handlePropertyVisible = () => {},
  updatePropertyOnDrop = () => {},
  handleLayout = () => {},
  isUnfilteredCollection = "",
  setPropertyShown = () => {},
  setPropertyOrder = () => {},
  updateCustomPropertyDataInConfig = () => {},
  propertyOrder = [],
  setPropertyHidden = () => {},
  handleRefreshProperty = () => {},
  editPagesIn = "",
  handleEditPagesIn = () => {},
  handleCardSize = () => {},
  cardSize,
  handleTableVerticalLine = () => {},
  showTableVerticalLine = "",
  handleTableWrapColumns = () => {},
  tableWrapColumns = "",
  openPagesIn = "",
  handleOpenPagesIn = () => {},
  setOpenWallpaperModal = () => {},
  wallpaper = "",
  permissions = "",
  handleViewSubCollection = () => {},
  viewSubCollections = "",
  handleTextEditor = () => {},
  showTextEditor = "",
  sort = [],
  filter = [],
  userTags = [],
  handleUpdateCollectionPageConfig = () => {},
  handleFilterSave = () => {},
  handleFilterRemove = () => {},
  changeFilterOrder = () => {},
  handleSortSave = () => {},
  changeSortOrder = () => {},
  handleSortRemove = () => {},
  setFilterArr = () => {},
  setSortArr = () => {},
  handleFilterRemoveAll = () => {},
  handleFilterAdd = () => {},
  handleSortAdd = () => {},
  title = "",
  tagId = "",
  handleShareMobileView = () => {},
  viewSubTags = "",
  handleViewSubTag = () => {},
  isSubTag = "",
  hideGems = "",
  handleHideGems = () => {},
  showInviteAndShare = "",
  showGems = "",
  handleShowGems = () => {},
  hideBrokenLinks = "",
  handleHideBrokenLinks = () => {},
  handleGemOnClickEvent = () => {},
  gemOnClickEvent = '',
}) => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { isMobileView } = useSelector((state) => state.app);
  const { subCollectionsPageDetails } = useSelector(
    (state) => state.collections
  );
  const { subTagsPageDetails } = useSelector((state) => state.tags);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [showAnalyticsSidebar, setShowAnalyticsSidebar] = useState(false);

  const [exportPopup, setExportPopup] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = (flag) => {
    setOpen(flag);
  };

  const export_type = [
    {
      label: "CSV",
      key: "0",
    },
  ];

  const dropdownnRenderUI = () => {
    if (page === "collection") {
      return (
        <div className="dropdown-content px-[16px] rounded-sm flex flex-col mx-2 pt-3 pb-4 gap-y-2">
          {addEditIcon && (
            <div
              className="flex px-3 py-1 items-center hover:bg-[#f5f5f5] cursor-pointer"
              onClick={() => {
                setOpen(false);
                handleEditCall();
              }}
            >
              <PencilSquareIcon className="h-5 w-5 mr-[5px] text-[#4B4F5D]" />
              <span className="text-[#344054] font-medium text-sm">
                Edit collection
              </span>
            </div>
          )}

          {isSharedAndAllowEdit && (
            <div
              className="flex px-3 py-1 items-center hover:bg-[#f5f5f5] cursor-pointer"
              onClick={() => {
                setOpen(false);
                setOpenIcon(true);
              }}
            >
              <FaIcons className="h-5 w-5 mr-[5px] text-[#4B4F5D]" />
              <span className="text-[#344054] font-medium text-sm">
                {icon ? "Update Icon" : "Add Icon"}
              </span>
            </div>
          )}

          {isSharedAndAllowEdit && (
            <div
              className="flex px-3 py-1 items-center hover:bg-[#f5f5f5] cursor-pointer"
              onClick={() => {
                setOpen(false);
                handleCoverModal();
              }}
            >
              <PhotoIcon className="h-5 w-5 mr-[5px] text-[#4B4F5D]" />
              <span className="text-[#344054] font-medium text-sm">
                {coverImage ? "Update cover" : "Add cover"}
              </span>
            </div>
          )}

          {showNotificationIcon && (
            <div
              className="flex px-3 py-1 items-center hover:bg-[#f5f5f5] cursor-pointer"
              onClick={() => {
                setOpen(false);
                handleOpenApproveReject();
              }}
            >
              <Badge count={pendingGemsCount} size="small" offset={[-5, 0]}>
                <BellIcon className="h-5 w-5 mr-[5px] text-[#4B4F5D]" />
              </Badge>

              <span className="text-[#344054] font-medium text-sm ml-2">
                Approvals
              </span>
            </div>
          )}

          <div
            className="flex items-center justify-between hover:bg-[#f5f5f5] cursor-pointer"
            onClick={() => {
              setOpen(false);
              setShowAnalyticsSidebar(true);
            }}
          >
            <div className="flex px-3 py-1 items-center">
              <RiLineChartLine className="h-5 w-5 mr-[5px] text-[#4B4F5D]" />
              <span className="text-[#344054] font-medium text-sm">
                View Analytics
              </span>
            </div>
            <ChevronRightIcon className="h-4 w-4 mr-[5px] text-[#344054]" />
          </div>

          <div
            className="flex px-3 py-1 items-center hover:bg-[#f5f5f5] cursor-pointer"
            onClick={() => {
              setOpen(false);
              setExportPopup(true);
            }}
          >
            <PiExportThin className="h-5 w-5 mr-[5px] text-[#4B4F5D]" />
            <span className="text-[#344054] font-medium text-sm">Export</span>
          </div>

          <div
            className="flex px-3 py-1 items-center hover:bg-[#f5f5f5] cursor-pointer"
            onClick={() => {
              setOpen(false);
              copyText(copyUrl, "Link copied to clipboard");
            }}
          >
            <RiFileCopyLine className="h-5 w-5 mr-[5px] text-[#4B4F5D]" />
            <span className="text-[#344054] font-medium text-sm">
              Copy Link
            </span>
          </div>

          {addEditIcon && (
            <div
              className="flex px-3 py-1 items-center hover:bg-[#f5f5f5] cursor-pointer"
              onClick={() => {
                setOpen(false);
                handleDeleteCollection();
              }}
            >
              <TrashIcon className="h-5 w-5 mr-[5px] text-[#4B4F5D]" />
              <span className="text-[#344054] font-medium text-sm">Delete</span>
            </div>
          )}
        </div>
      );
    }

    if (page === "tags") {
      return (
        <div className="dropdown-content px-[16px] rounded-sm flex flex-col mx-2 pt-3 pb-4 gap-y-2">
          {addEditIcon && (
            <div
              className="flex px-3 py-1 items-center hover:bg-[#f5f5f5] cursor-pointer"
              onClick={() => {
                setOpen(false);
                handleEditCall();
              }}
            >
              <PencilSquareIcon className="h-5 w-5 mr-[5px] text-[#4B4F5D]" />
              <span className="text-[#344054] font-medium text-sm">
                Edit tag
              </span>
            </div>
          )}

          {isSharedAndAllowEdit && (
            <div
              className="flex px-3 py-1 items-center hover:bg-[#f5f5f5] cursor-pointer"
              onClick={() => {
                setOpen(false);
                setOpenIcon(true);
              }}
            >
              <FaIcons className="h-5 w-5 mr-[5px] text-[#4B4F5D]" />
              <span className="text-[#344054] font-medium text-sm">
                {icon ? "Update Icon" : "Add Icon"}
              </span>
            </div>
          )}

          {isSharedAndAllowEdit && (
            <div
              className="flex px-3 py-1 items-center hover:bg-[#f5f5f5] cursor-pointer"
              onClick={() => {
                setOpen(false);
                handleCoverModal();
              }}
            >
              <PhotoIcon className="h-5 w-5 mr-[5px] text-[#4B4F5D]" />
              <span className="text-[#344054] font-medium text-sm">
                {coverImage ? "Update cover" : "Add cover"}
              </span>
            </div>
          )}

          <div
            className="flex items-center justify-between hover:bg-[#f5f5f5] cursor-pointer"
            onClick={() => {
              setOpen(false);
              setShowAnalyticsSidebar(true);
            }}
          >
            <div className="flex px-3 py-1 items-center">
              <RiLineChartLine className="h-5 w-5 mr-[5px] text-[#4B4F5D]" />
              <span className="text-[#344054] font-medium text-sm">
                View Analytics
              </span>
            </div>
            <ChevronRightIcon className="h-4 w-4 mr-[5px] text-[#344054]" />
          </div>

          <div
            className="flex px-3 py-1 items-center hover:bg-[#f5f5f5] cursor-pointer"
            onClick={() => {
              setOpen(false);
              copyText(copyUrl, "Link copied to clipboard");
            }}
          >
            <RiFileCopyLine className="h-5 w-5 mr-[5px] text-[#4B4F5D]" />
            <span className="text-[#344054] font-medium text-sm">
              Copy Link
            </span>
          </div>

          {addEditIcon && (
            <div
              className="flex px-3 py-1 items-center hover:bg-[#f5f5f5] cursor-pointer"
              onClick={() => {
                setOpen(false);
                handleDeleteCollection();
              }}
            >
              <TrashIcon className="h-5 w-5 mr-[5px] text-[#4B4F5D]" />
              <span className="text-[#344054] font-medium text-sm">Delete</span>
            </div>
          )}
        </div>
      );
    }
  };

  const onExport = async () => {
    const res = await dispatch(exportCollection(targetId));
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

  if (!mounted) return <></>;

  return (
    <>
      <div
        style={{
          height: "50px",
        }}
        className="flex w-full items-center justify-between bg-white"
      >
        {(page === "collection" || page === "tags") && !isMobileView ? (
          <BreadCrumbCollection id={targetId} page={page} />
        ) : (
          <>
            {page === "collection" &&
            isMobileView &&
            subCollectionsPageDetails &&
            subCollectionsPageDetails?.page &&
            isSubCollection ? (
              <ArrowLeftIcon
                className="h-4 w-4 cursor-pointer"
                onClick={() => navigate.back()}
              />
            ) : (
              <div></div>
            )}
            {page === "tags" &&
            isMobileView &&
            subTagsPageDetails &&
            subTagsPageDetails?.page &&
            isSubTag ? (
              <ArrowLeftIcon
                className="h-4 w-4 cursor-pointer"
                onClick={() => navigate.back()}
              />
            ) : (
              <div></div>
            )}
          </>
        )}
        {isMobileView &&
          page === "collection-public-shared" &&
          subCollectionsPageDetails &&
          subCollectionsPageDetails?.page &&
          isSubCollection && (
            <ArrowLeftIcon
              className="h-4 w-4 cursor-pointer"
              onClick={() => navigate.back()}
            />
          )}

        <div className="flex items-center">
          {(isMobileView &&
            page === "tags" &&
            (!permissions || permissions?.accessType !== "viewer")) ||
          (isMobileView &&
            page === "collection" &&
            (!permissions || permissions?.accessType !== "viewer")) ? (
            <AddDropdown
              isMobile={true}
              page={page}
              title={title}
              collectionId={collectionId}
              tagId={tagId}
            />
          ) : (
            <></>
          )}

          {isMobileView && (page === "collection" || page === "tags") && (
            <div className="ml-3">
              <ViewComponent
                isMobile={true}
                propertyShown={propertyShown}
                propertyHidden={propertyHidden}
                layout={layout}
                page={page}
                collectionId={collectionId}
                customFields={customFields}
                handlePropertyHide={handlePropertyHide}
                handlePropertyVisible={handlePropertyVisible}
                updatePropertyOnDrop={updatePropertyOnDrop}
                handleLayout={handleLayout}
                isUnfilteredCollection={isUnfilteredCollection}
                setPropertyShown={setPropertyShown}
                setPropertyOrder={setPropertyOrder}
                updateCustomPropertyDataInConfig={
                  updateCustomPropertyDataInConfig
                }
                propertyOrder={propertyOrder}
                setPropertyHidden={setPropertyHidden}
                handleRefreshProperty={handleRefreshProperty}
                editPagesIn={editPagesIn}
                handleEditPagesIn={handleEditPagesIn}
                handleCardSize={handleCardSize}
                cardSize={cardSize}
                handleTableVerticalLine={handleTableVerticalLine}
                showTableVerticalLine={showTableVerticalLine}
                handleTableWrapColumns={handleTableWrapColumns}
                tableWrapColumns={tableWrapColumns}
                openPagesIn={openPagesIn}
                handleOpenPagesIn={handleOpenPagesIn}
                setOpenWallpaperModal={setOpenWallpaperModal}
                wallpaper={wallpaper}
                permissions={permissions}
                handleTextEditor={handleTextEditor}
                showTextEditor={showTextEditor}
                handleViewSubCollection={handleViewSubCollection}
                viewSubCollections={viewSubCollections}
                handleViewSubTag={handleViewSubTag}
                viewSubTags={viewSubTags}
                hideGems={hideGems}
                handleHideGems={handleHideGems}
                //filters
                sort={sort}
                filter={filter}
                userTags={userTags}
                handleUpdateCollectionPageConfig={
                  handleUpdateCollectionPageConfig
                }
                handleFilterSave={handleFilterSave}
                handleFilterRemove={handleFilterRemove}
                changeFilterOrder={changeFilterOrder}
                handleSortSave={handleSortSave}
                changeSortOrder={changeSortOrder}
                handleSortRemove={handleSortRemove}
                setFilterArr={setFilterArr}
                setSortArr={setSortArr}
                handleFilterRemoveAll={handleFilterRemoveAll}
                handleFilterAdd={handleFilterAdd}
                handleSortAdd={handleSortAdd}
                showGems={showGems}
                handleShowGems={handleShowGems}
                hideBrokenLinks={hideBrokenLinks}
                handleHideBrokenLinks={handleHideBrokenLinks}
                handleGemOnClickEvent={handleGemOnClickEvent}
                gemOnClickEvent={gemOnClickEvent}
              />
            </div>
          )}

          <div className="flex items-center ml-3">
            {!isFollowedCollection && showInviteAndShare && (
              <Button
                className="hidden md:block rounded border border-solid border-[#347AE2] text-[#347AE2] hover:text-[#347AE2] hover:border-[#347AE2]"
                size="small"
                onClick={handleShareClick}
              >
                Invite
              </Button>
            )}

            <Button
              size="small"
              className="block md:hidden bg-[#347AE2] hover:bg-[#347AE2] rounded"
              type="primary"
              onClick={handleShareMobileView}
            >
              <ShareIcon className="h-4 w-4 text-white" />
            </Button>

            {isSharedAndAllowEdit && (
              <Dropdown
                overlayStyle={{
                  width: isMobileView ? "100%" : "300px",
                  position: "fixed",
                }}
                trigger={["click"]}
                dropdownRender={() => dropdownnRenderUI()}
                onOpenChange={handleOpen}
                open={open}
              >
                <EllipsisHorizontalIcon className="ml-4 text-[#343330] h-4 w-4 cursor-pointer" />
              </Dropdown>
            )}
          </div>
        </div>
      </div>

      {showAnalyticsSidebar && (
        <AnalyticsDrawer
          open={showAnalyticsSidebar}
          setOpenDrawer={setShowAnalyticsSidebar}
        />
      )}

      {exportPopup && (
        <Modal
          width={300}
          open={exportPopup}
          onCancel={() => {
            setExportPopup(false);
          }}
          centered
          onOk={onExport}
          okText="Export"
          title={"Export Your Collection"}
          okButtonProps={{
            className: "bg-[#40a9ff] border-[#40a9ff]",
          }}
        >
          <div className="flex felx-col justify-between">
            <div>Export Format</div>
            <div>
              <Dropdown
                menu={{
                  items: export_type,
                }}
                trigger={["click"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>CSV</Space>
                </a>
              </Dropdown>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default BreadCrumbNav;