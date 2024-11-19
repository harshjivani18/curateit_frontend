"use client";
import "./Topbar.css";
import { useParams, usePathname }             from "next/navigation";
import { RiMenuFill }                         from "react-icons/ri";
import {
  EllipsisHorizontalIcon,
  InformationCircleIcon,
  PencilSquareIcon,
  PlusIcon,
  ShareIcon,
}                                             from "@heroicons/react/24/outline";
import { HiSearch }                           from "react-icons/hi";

import { 
  Button, 
  Dropdown, 
  message 
}                                             from "antd";
import { useDispatch, useSelector }                        from "react-redux";
import { useEffect, useState }                from "react";
import { Delete02Icon }                       from "src/hugeicons/Stroke";

import AddDropdown                            from "./AddDropdown";
import SocialShare                            from "@components/socialShare/SocialShare";
import CollectionDescriptionArea              from "@components/common/CollectionDescriptionArea";
import Editor                                 from "@components/common/TextEditor/Editor";
import TitleComponent                         from "./TitleComponent";
import ViewComponent                          from "./ViewComponent";

import session                                from "@utils/session";

import { bulkDeleteBookmark }                 from "@actions/bookmark";
import {
  configCollections,
  deleteBulkBookmarkStateSharedCollection,
  fetchCollectionWiseCounts,
  getSharedCollections,
}                                             from "@actions/collection";
import { fetchGemsFilters }                   from "@actions/gems";
import { 
  addBkFromPage, 
  openAuthModal, 
  openDrawer, 
  setIsMobileSidebar, 
  setPercentageData, 
  setSyncingCollection
}                                             from "@actions/app";
import ImportProgressBar from "@components/common/ImportProgressBar";

const Topbar = ({
  title,
  page,
  userTags,
  onSEOShow,
  propertyShown,
  propertyHidden,
  propertyOrder,
  layout,
  sort,
  filter,
  collectionId,
  customFields,
  addEditIcon,
  handleEditCall,
  handleUpdateCollectionPageConfig,
  handleFilterSave,
  handleFilterRemove,
  changeFilterOrder,
  handleSortSave,
  handleSortRemove,
  changeSortOrder,
  handlePropertyHide,
  handlePropertyVisible,
  updatePropertyOnDrop,
  setFilterArr,
  setSortArr,
  handleLayout,
  isUnfilteredCollection,
  setPropertyShown,
  setPropertyOrder,
  setPropertyHidden,
  updateCustomPropertyDataInConfig,
  checkedBookmark,
  handleOpenSelectBookmarkDrawer,
  handleCancelSelectedBookmark,
  handleSelectAllSelectedBookmark,
  handleFilterRemoveAll,
  handleRefreshProperty,
  editPagesIn,
  handleEditPagesIn,
  cardSize,
  handleCardSize,
  handleTableVerticalLine,
  showTableVerticalLine,
  handleTableWrapColumns,
  tableWrapColumns,
  openPagesIn,
  handleOpenPagesIn,
  setOpenWallpaperModal,
  wallpaper,
  handleFilterAdd,
  handleSortAdd,
  permissions = null,
  shortDescription = null,
  showShare = false,
  allCollectionsValue,
  // handleShareClick = "",
  handleCoverModal,
  icon,
  coverImage,
  showTextEditor,
  handleTextEditor,
  setOpenIcon,
  descriptionContent,
  setDescriptionContent,
  tagId = "",
  collectionUrl = "",
  handleCopyCollection = () => {},
  copyLoading = "",
  setCheckedBookmark,
  submit,
  type = "",
  handleOpenAdd = () => {},
  showPublicAdd = "",
  // handleOpenApproveReject=()=>{},
  // showNotificationIcon='',
  // pendingGemsCount=0,
  handleViewSubCollection = () => {},
  viewSubCollections = "",
  isSubCollection = "",
  showCopyCollectionIcon = "",
  handleSelectSubCollection = () => {},
  showBackArrow = "",
  showAILibraryBtn = false,
  onFollowCollection = null,
  onUnfollowCollection = null,
  following = false,
  isFollowedCollection = false,
  handleFollowerAddBookmark = null,
  isPrivateProfile = false,
  isFollowerChildCollection = false,
  showFollowerCopy = true,
  showTextExpanderBtn = false,
  viewSubTags = "",
  handleViewSubTag = () => {},
  hideGems = "",
  handleHideGems = () => {},
  handleOpenAllSelectedLinks = () => {},
  showGems = "",
  handleShowGems = () => {},
  hideBrokenLinks = "",
  handleHideBrokenLinks = () => {},
  handleGemOnClickEvent = () => {},
  gemOnClickEvent=''
}) => {
  const dispatch = useDispatch();
  const [openShare, setShowShare] = useState(false);
  const [showCheckOptions, setShowCheckOptions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isSyncing = useSelector((state) => state.app.isSyncing);
  const percentage = useSelector((state) => state.app.percentage);
  const showNoLoaderOnboarding = useSelector(
    (state) => state.app.showNoLoaderOnboarding
  );

  const searchParams = useParams();
  const searchPathname = usePathname();
  const uname = searchParams?.username;
  const module = searchPathname?.includes("/g/")
    ? "gems"
    : searchPathname?.includes("/tags/")
    ? "tags"
    : searchPathname?.includes("/c/")
    ? "collections"
    : null;
  const sourceId =
    searchParams?.gemId ||
    searchParams?.colllectionId ||
    searchParams?.tagId ||
    searchParams?.id;
  const slug = searchParams?.name;

  // const searchParams = window.location.pathname.split("/");
  // const uname = searchParams[2];
  // const module = searchParams[3] === "tags" ? "tags" : searchParams[3] === "c" ? "collections" : searchParams[3] === "g" ? "gems" : null;
  // const sourceId = searchParams[4];
  // const slug = searchParams[5];

  useEffect(() => {
    if (typeof window === "undefined") return;
    function handleResize() {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (percentage && percentage >= 100) {
      dispatch(setSyncingCollection(false));
      dispatch(setPercentageData(0));
      if (!showNoLoaderOnboarding) {
        window.location.reload();
      }
    }
  }, [percentage]);

  const onCancellingSync = async () => {
    dispatch(setSyncingCollection(false));
  };

  const handleOpen = (flag) => {
    setShowShare(flag);
  };

  const handleBulkDelete = async () => {
    const ids = checkedBookmark.map((item) => item.id);
    const payload = {
      gemId: ids,
    };
    const res = await dispatch(bulkDeleteBookmark(payload));
    if (res.error === undefined) {
      dispatch(getSharedCollections());
      dispatch(fetchCollectionWiseCounts());
      dispatch(deleteBulkBookmarkStateSharedCollection(ids));
      dispatch(fetchGemsFilters());
      setCheckedBookmark([]);
      message.success("Bookmark deleted successfully");
      submit(ids, "delete");
    } else {
      message.error("Error Occured");
      setCheckedBookmark([]);
    }
  };

  const onAiPromptLibraryClick = () => {
    dispatch(configCollections()).then((data) => {
      const aiLibraryId = data?.payload?.data?.data?.aiPromptLibraryId;
      const username = data?.payload?.data?.data?.username;
      window.open(
        `${process.env.NEXT_PUBLIC_BASE_URL}/u/${username}/c/${aiLibraryId}/ai-prompt-library`,
        "_blank"
      );
    });
  };

  const onTextExpanderClick = () => {
    dispatch(configCollections()).then((data) => {
      const textExpanderId = data?.payload?.data?.data?.textExpanderId;
      const username = data?.payload?.data?.data?.username;
      window.open(
        `${process.env.NEXT_PUBLIC_BASE_URL}/u/${username}/c/${textExpanderId}/text-expander-library`,
        "_blank"
      );
    });
  };

  const dropdownnRenderUI = () => {
    return (
      <div className="bg-white z-50 p-3 rounded-lg shadow-lg border-[0.5px]">
        <SocialShare
          collectionUrl={collectionUrl}
          setShowShare={setShowShare}
          // showCopied={showCopied}
          // handleCopy={handleCopy} html={html}
        />
      </div>
    );
  };

  const handleOpenCheck = (flag) => {
    setShowCheckOptions(flag);
  };

  const dropdownnRenderUICheck = () => {
    return (
      <div className="dropdown-content px-[16px] rounded-sm flex flex-col mx-2 pt-3 pb-4 gap-y-2">
        <div
          className="flex px-3 py-1 items-center hover:bg-[#f5f5f5] cursor-pointer"
          onClick={() => {
            setShowCheckOptions(false);
            handleOpenSelectBookmarkDrawer();
          }}
        >
          {/* <PencilSquareIcon className="h-5 w-5 mr-[5px] text-[#4B4F5D]" /> */}
          <span className="text-[#344054] font-medium text-sm">Edit</span>
        </div>

        <div
          className="flex px-3 py-1 items-center hover:bg-[#f5f5f5] cursor-pointer"
          onClick={() => {
            // setShowCheckOptions(false);
            handleSelectAllSelectedBookmark();
          }}
        >
          {/* <PencilSquareIcon className="h-5 w-5 mr-[5px] text-[#4B4F5D]" /> */}
          <span className="text-[#344054] font-medium text-sm">Select All</span>
        </div>

        <div
          className="flex px-3 py-1 items-center hover:bg-[#f5f5f5] cursor-pointer"
          onClick={() => {
            setShowCheckOptions(false);
            handleOpenAllSelectedLinks();
          }}
        >
          {/* <PencilSquareIcon className="h-5 w-5 mr-[5px] text-[#4B4F5D]" /> */}
          <span className="text-[#344054] font-medium text-sm">
            Open selected links
          </span>
        </div>

        <div
          className="flex px-3 py-1 items-center hover:bg-[#f5f5f5] cursor-pointer"
          onClick={() => {
            setShowCheckOptions(false);
            handleCancelSelectedBookmark();
          }}
        >
          {/* <PencilSquareIcon className="h-5 w-5 mr-[5px] text-[#4B4F5D]" /> */}
          <span className="text-[#344054] font-medium text-sm">Cancel</span>
        </div>

        <div
          className="flex px-3 py-1 items-center hover:bg-[#f5f5f5] cursor-pointer"
          onClick={() => {
            setShowCheckOptions(false);
            handleBulkDelete();
          }}
        >
          {/* <PencilSquareIcon className="h-5 w-5 mr-[5px] text-[#4B4F5D]" /> */}
          <span className="text-[#344054] font-medium text-sm">Delete</span>
        </div>
      </div>
    );
  };
  return (
    <div className="">
      <div
        className={`${
          page !== "collection-public-shared" ? "sticky" : ""
        }  z-[100] ${
          page === "collection-public-shared"
            ? "bg-[transparent]"
            : "bg-[#fcfcfd]"
        } ${
          (page === "collection" || page === "tags") && coverImage && !isMobile
            ? "top-[50px] pt-1"
            : (page === "collection" || page === "tags") &&
              coverImage &&
              isMobile
            ? "top-[50px] pt-1"
            : (page === "collection" || page === "tags") && !coverImage
            ? "top-[50px] pt-1"
            : "top-0 pt-1"
        }`}
      >
        {isMobile ? (
          <>
            <div className="flex flex-col">
              <div className="flex w-full items-center justify-between">
                <div className={`flex items-center justify-between`}>
                  {page === "collection-public-shared" && (
                    <RiMenuFill
                      className="h-5 w-5 cursor-pointer text-[#575C70] mr-2 z-[50]"
                      onClick={() => {
                        if (!session?.userId) {
                          dispatch(
                            openAuthModal({
                              open: true,
                              action: "login",
                              extraInfo: {
                                trigger: "signup",
                                username: uname,
                                id: sourceId,
                                module: module,
                                slug: slug,
                              },
                            })
                          );
                          return;
                        }
                        dispatch(setIsMobileSidebar(true));
                      }}
                    />
                  )}
                  {/* {checkedBookmark &&
                    checkedBookmark.length === 0 &&
                     (
                      <RiMenuFill
                        className="h-5 w-5 cursor-pointer text-[#575C70] mr-2"
                        onClick={() => {
                          if(!session?.userId){
                              dispatch(openAuthModal({
                                  open: true,
                                  action : 'login'
                              }))
                              return;
                          }
                          dispatch(setIsMobileSidebar(true))
                        }}
                      />
                    )} */}
                  <TitleComponent
                    title={title}
                    avatarCoverData={icon}
                    checkedBookmark={checkedBookmark}
                    handleEditCall={handleEditCall}
                    addEditIcon={addEditIcon}
                    permissions={permissions}
                    shortDescription={shortDescription}
                    icon={icon}
                    coverImage={coverImage}
                    setOpenIcon={setOpenIcon}
                    handleCoverModal={handleCoverModal}
                    page={page}
                    showCopyCollectionIcon={showCopyCollectionIcon}
                    handleCopyCollection={handleCopyCollection}
                    copyLoading={copyLoading}
                    isMobile={isMobile}
                    type={type}
                    isSubCollection={isSubCollection}
                    handleSelectSubCollection={handleSelectSubCollection}
                    showBackArrow={showBackArrow}
                    onFollowCollection={onFollowCollection}
                    onUnfollowCollection={onUnfollowCollection}
                    following={following}
                    isFollowedCollection={isFollowedCollection}
                    isPrivateProfile={isPrivateProfile}
                    isFollowerChildCollection={isFollowerChildCollection}
                    showFollowerCopy={showFollowerCopy}
                    showShare={showShare}
                    collectionUrl={collectionUrl}
                  />
                  {/* {
                    page === "collection-public-shared" && type === 'collection-public' && showPublicAdd &&
                    <Button className={`border-[#105FD3] bg-[#105FD3] hover:bg-[#105FD3] hover:border-[#105FD3] rounded mr-2`} type="primary" onClick={handleOpenAdd} size='small'>+ Submit</Button>
                  } */}
                  {showAILibraryBtn && (
                    <Button
                      className={`rounded mr-2`}
                      type="link"
                      onClick={onAiPromptLibraryClick}
                      size="small"
                    >
                      + Ai Templates
                    </Button>
                  )}
                  {showTextExpanderBtn && (
                    <Button
                      className={`rounded mr-2`}
                      type="link"
                      onClick={onTextExpanderClick}
                      size="small"
                    >
                      + Expander Templates
                    </Button>
                  )}
                </div>

                {checkedBookmark && checkedBookmark?.length > 0 && (
                  <Dropdown
                    overlayStyle={{
                      width: "100%",
                      position: "fixed",
                    }}
                    trigger={["click"]}
                    dropdownRender={() => dropdownnRenderUICheck()}
                    onOpenChange={handleOpenCheck}
                    open={showCheckOptions}
                  >
                    <EllipsisHorizontalIcon className="ml-4 text-[#343330] h-4 w-4 cursor-pointer" />
                  </Dropdown>
                )}

                {checkedBookmark?.length === 0 && (
                  <div className="flex justify-between items-center">
                    {page !== "collection" &&
                      page !== "collection-public-shared" &&
                      page !== "tags" && (
                        <div className="mr-4">
                          <ViewComponent
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
                            isMobile={isMobile}
                            handleViewSubCollection={handleViewSubCollection}
                            viewSubCollections={viewSubCollections}
                            handleTextEditor={handleTextEditor}
                            showTextEditor={showTextEditor}
                            type={type}
                            viewSubTags={viewSubTags}
                            handleViewSubTag={handleViewSubTag}
                            hideGems={hideGems}
                            handleHideGems={handleHideGems}
                            setOpenIcon={setOpenIcon}
                            handleCoverModal={handleCoverModal}
                            showGems={showGems}
                            handleShowGems={handleShowGems}
                            hideBrokenLinks={hideBrokenLinks}
                            handleHideBrokenLinks={handleHideBrokenLinks}
                            handleGemOnClickEvent={handleGemOnClickEvent}
                            gemOnClickEvent={gemOnClickEvent}
                          />
                        </div>
                      )}

                    {isFollowedCollection ? (
                      <Button
                        className="flex items-center"
                        type="link"
                        onClick={() => {
                          if (isFollowedCollection) {
                            if (handleFollowerAddBookmark) {
                              handleFollowerAddBookmark();
                            }
                            return;
                          }
                          dispatch(
                            addBkFromPage({
                              page,
                              value: title,
                              collectionId: Number(collectionId),
                            })
                          );
                          dispatch(openDrawer("bookmark"));
                        }}
                        icon={<PlusIcon className="h-4 w-4" />}
                        id="tour-collection-add-button"
                      >
                        {isFollowedCollection ? "Submit" : "Add"}
                      </Button>
                    ) : (
                      <></>
                    )}

                    {(page === "filter" &&
                      title !== "Highlight" &&
                      title !== "Screenshot" &&
                      title !== "without tags") ||
                    page === "bookmark" ? (
                      <AddDropdown
                        isMobile={isMobile}
                        page={page}
                        title={title}
                        collectionId={collectionId}
                        tagId={tagId}
                      />
                    ) : (
                      <></>
                    )}

                    {/* {
                      page === 'tags' || (page === "collection" && (!permissions || permissions?.accessType !== "viewer")) ?
                        <AddDropdown isMobile={isMobile} page={page} title={title}
                        collectionId={collectionId} tagId={tagId}
                        /> : <></>
                      } */}

                    {/* {
                      page === 'collection' && showNotificationIcon && <Badge count={pendingGemsCount} size='small' offset={[-5,0]}>
                        <BellIcon className="h-5 w-5 cursor-pointer" onClick={handleOpenApproveReject}/>
                      </Badge>
                      } */}
                  </div>
                )}
              </div>
            </div>

            {shortDescription && (
              <div>
                <h2
                  className="ct-collection-short-desc"
                  style={{ color: "#6B6B6B" }}
                >
                  {shortDescription}
                </h2>
              </div>
            )}

            {page !== "collection-public-shared" && (
              <hr className="pageHeadingHr mt-2" />
            )}
          </>
        ) : (
          <>
            <div className={page === "collection" ? "xl:px-8" : ""}>
              <div className="flex flex-row items-center w-full justify-between  group">
                <div
                  className={
                    page !== "collection-public-shared"
                      ? "flex items-center"
                      : "flex items-center justify-between w-[100%]"
                  }
                >
                  <TitleComponent
                    title={title}
                    avatarCoverData={icon}
                    checkedBookmark={checkedBookmark}
                    handleEditCall={handleEditCall}
                    addEditIcon={addEditIcon}
                    shortDescription={shortDescription}
                    page={page}
                    showCopyCollectionIcon={showCopyCollectionIcon}
                    handleCopyCollection={handleCopyCollection}
                    copyLoading={copyLoading}
                    type={type}
                    isSubCollection={isSubCollection}
                    handleSelectSubCollection={handleSelectSubCollection}
                    showBackArrow={showBackArrow}
                    onFollowCollection={onFollowCollection}
                    onUnfollowCollection={onUnfollowCollection}
                    following={following}
                    isFollowedCollection={isFollowedCollection}
                    isPrivateProfile={isPrivateProfile}
                    isFollowerChildCollection={isFollowerChildCollection}
                    showFollowerCopy={showFollowerCopy}
                    showShare={showShare}
                    collectionUrl={collectionUrl}
                  />
                </div>

                <div>
                  {isSyncing && (
                    <div className="flex flex-col">
                      <ImportProgressBar />
                    </div>
                  )}
                </div>

                {page === "broken-duplicate" ||
                page === "bookmark" ||
                page === "filter" ||
                page === "collection-public-shared" ||
                page === "embed" ||
                page === "profile-bookmark" ||
                page === "embed-more" ? (
                  <></>
                ) : (
                  <div className="flex items-center hidden md:block">
                    {(!permissions ||
                      (permissions &&
                        (permissions?.accessType === "editor" ||
                          permissions?.accessType === "owner"))) &&
                      checkedBookmark?.length === 0 && (
                        <div className="flex flex-col opacity-100 md:flex md:flex-row md:items-center md:opacity-0 md:transition-opacity  md:group-hover:opacity-100">
                          {/* <Button
                              icon={<PhotoIcon className="h-5 w-5" />}
                              type="text"
                              className="text-[#37352f80] hover:bg-[#37352f14] hover:text-[#37352f80] cover-desc-btn"
                              onClick={() => setOpenIcon(true)}
                              style={{ padding: "2px 6px" }}
                            >
                              {icon ? "Update Icon" : "Add Icon"}
                            </Button> */}
                          {/* <Button
                              icon={<PhotoIcon className="h-5 w-5" />}
                              type="text"
                              className="text-[#37352f80] hover:bg-[#37352f14] hover:text-[#37352f80] cover-desc-btn"
                              onClick={handleCoverModal}
                              style={{ padding: "2px 6px" }}
                            >
                              {coverImage ? "Update cover" : "Add cover"}
                            </Button> */}
                          {showTextEditor && (
                            <Button
                              icon={
                                <InformationCircleIcon className="h-5 w-5" />
                              }
                              type="text"
                              className="text-[#37352f80] hover:bg-[#37352f14] hover:text-[#37352f80] cover-desc-btn"
                              onClick={() => handleTextEditor(false)}
                              style={{ padding: "2px 6px" }}
                            >
                              Hide Description
                            </Button>
                          )}

                          {!showTextEditor && (
                            <Button
                              icon={
                                <InformationCircleIcon className="h-5 w-5" />
                              }
                              type="text"
                              className="text-[#37352f80] hover:bg-[#37352f14] hover:text-[#37352f80] cover-desc-btn"
                              onClick={() => handleTextEditor(true)}
                              style={{ padding: "2px 6px" }}
                            >
                              Add Description
                            </Button>
                          )}
                        </div>
                      )}
                  </div>
                )}

                <div>
                  {checkedBookmark && checkedBookmark?.length > 0 && (
                    <div className="flex items-center">
                      <Button
                        onClick={handleOpenSelectBookmarkDrawer}
                        icon={<PencilSquareIcon className="h-5 w-5" />}
                        className="flex gap-2 items-center justify-center shadow"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={handleSelectAllSelectedBookmark}
                        className="flex gap-2 items-center justify-center shadow mx-2"
                      >
                        Select All
                      </Button>
                      <Button
                        onClick={handleOpenAllSelectedLinks}
                        className="flex gap-2 items-center justify-center shadow"
                      >
                        Open selected links
                      </Button>
                      <Button
                        onClick={handleCancelSelectedBookmark}
                        className="flex gap-2 items-center bg-red-500 ml-2 text-white hover:bg-red-400 hover:text-white border-none justify-center shadow "
                      >
                        Cancel
                      </Button>
                      <Button
                        className={`cursor-pointer ml-2 text-red-500 hover:text-red-400`}
                        style={{
                          border: "none",
                          boxShadow: "none",
                          backgroundColor: "transparent",
                        }}
                        onClick={() => handleBulkDelete()}
                      >
                        <Delete02Icon height={20} width={20} />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-1 md:mt-0">
                  {/* <div>
                    {checkedBookmark && checkedBookmark?.length > 0 && (
                      <Button
                        onClick={handleCancelSelectedBookmark}
                        className="flex gap-2 items-center bg-red-500 text-white hover:bg-red-400 hover:text-white border-none justify-center shadow "
                      >
                        Cancel
                      </Button>
                    )}
                  </div> */}

                  {isFollowedCollection ? (
                    <Button
                      className="flex items-center"
                      type="link"
                      onClick={() => {
                        if (isFollowedCollection) {
                          if (handleFollowerAddBookmark) {
                            handleFollowerAddBookmark();
                          }
                          return;
                        }
                        dispatch(
                          addBkFromPage({
                            page,
                            value: title,
                            collectionId: Number(collectionId),
                          })
                        );
                        dispatch(openDrawer("bookmark"));
                      }}
                      icon={<PlusIcon className="h-4 w-4" />}
                      id="tour-collection-add-button"
                    >
                      {isFollowedCollection ? "Submit" : "Add"}
                    </Button>
                  ) : (
                    <></>
                  )}

                  {(page === "filter" &&
                    title !== "Highlight" &&
                    title !== "Screenshot" &&
                    title !== "without tags") ||
                  page === "bookmark" ? (
                    <AddDropdown
                      isMobile={isMobile}
                      page={page}
                      title={title}
                      collectionId={collectionId}
                      tagId={tagId}
                    />
                  ) : (
                    <></>
                  )}

                  {(page === "tags" &&
                    (!permissions || permissions?.accessType !== "viewer")) ||
                  (page === "collection" &&
                    (!permissions || permissions?.accessType !== "viewer")) ? (
                    <AddDropdown
                      isMobile={isMobile}
                      page={page}
                      title={title}
                      collectionId={collectionId}
                      tagId={tagId}
                    />
                  ) : (
                    <></>
                  )}

                  {/* {
                  page === 'collection' && showNotificationIcon && <Badge count={pendingGemsCount} offset={[-8,0]} size="small">
                    <BellIcon className="h-5 w-5 cursor-pointer mr-2" onClick={handleOpenApproveReject}/>
                  </Badge>
                  } */}

                  {page === "collection-public-shared" &&
                    type === "collection-public" &&
                    showPublicAdd && (
                      <Button
                        className={`border-[#105FD3] bg-[#105FD3] hover:bg-[#105FD3] hover:border-[#105FD3] rounded mr-2`}
                        type="primary"
                        onClick={handleOpenAdd}
                        size="small"
                      >
                        + Submit
                      </Button>
                    )}
                  {showAILibraryBtn && (
                    <Button
                      className={`rounded mr-2`}
                      type="link"
                      onClick={onAiPromptLibraryClick}
                      size="small"
                    >
                      + Ai Templates
                    </Button>
                  )}
                  {showTextExpanderBtn && (
                    <Button
                      className={`rounded mr-2`}
                      type="link"
                      onClick={onTextExpanderClick}
                      size="small"
                    >
                      + Expander Templates
                    </Button>
                  )}

                  <div>
                    <ViewComponent
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
                      type={type}
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
                      allCollectionsValue={allCollectionsValue}
                      viewSubTags={viewSubTags}
                      handleViewSubTag={handleViewSubTag}
                      setOpenIcon={setOpenIcon}
                      handleCoverModal={handleCoverModal}
                      showGems={showGems}
                      handleShowGems={handleShowGems}
                      hideBrokenLinks={hideBrokenLinks}
                      handleHideBrokenLinks={handleHideBrokenLinks}
                      handleGemOnClickEvent={handleGemOnClickEvent}
                      gemOnClickEvent={gemOnClickEvent}
                    />
                  </div>
                  {onSEOShow && (
                    <button
                      className="px-3 h-8 shadow flex justify-center items-center outline-none rounded-md text-white bg-[#347AE2] gap-2 relative"
                      onClick={onSEOShow}
                    >
                      <HiSearch className="h-5 w-5" />
                      <span className="hidden md:block">Integrate SEO</span>
                    </button>
                  )}

                  {(page === "collection-public-shared" ||
                    isFollowedCollection) && (
                    <Dropdown
                      overlayStyle={{ width: "250px" }}
                      trigger={["click"]}
                      dropdownRender={() => dropdownnRenderUI()}
                      onOpenChange={handleOpen}
                      open={openShare}
                      placement="bottomRight"
                    >
                      <Button
                        icon={<ShareIcon className="h-5 w-5 text-[#105FD3]" />}
                        className="bookmark-shareBtn border-[#105FD3] hover:border-[#105FD3]"
                        aria-labelledby="Share Icon"
                        aria-label="Share Icon"
                      ></Button>
                    </Dropdown>
                  )}
                </div>
              </div>
            </div>

            {shortDescription && (
              <div>
                <h2
                  className="ct-collection-short-desc"
                  style={{ color: "#6B6B6B" }}
                >
                  {shortDescription}
                </h2>
              </div>
            )}

            {page !== "collection-public-shared" && (
              <hr className="pageHeadingHr mt-2" />
            )}
          </>
        )}
      </div>
      {(!permissions ||
        (permissions &&
          (permissions?.accessType === "editor" ||
            permissions?.accessType === "owner"))) &&
        showTextEditor && (
          <div className="xl:px-8">
            <Editor
              descriptionContent={descriptionContent}
              setDescriptionContent={setDescriptionContent}
              collectionId={collectionId}
              page={page}
              tagId={tagId}
              editable={true}
            />
          </div>
        )}
      {(permissions && permissions?.accessType === "viewer") ||
        (page === "collection-public-shared" && (
          <div className="pt-1">
            {/* <Editor
            descriptionContent={descriptionContent}
            setDescriptionContent={setDescriptionContent}
            collectionId={collectionId}
            page={page}
            tagId={tagId}
            editable={false}
          /> */}
            <CollectionDescriptionArea
              description={descriptionContent}
              onDescClick={() => {}}
            />
          </div>
        ))}
    </div>
  );
};

export default Topbar;
