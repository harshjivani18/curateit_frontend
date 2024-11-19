import { useEffect, useMemo, useState } from "react";
import MoodboardMediaTypeCard from "./MoodboardMediaTypeCard";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import slugify from "slugify";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Outlet } from 'react-router-dom';
import { Resizable } from "re-resizable";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import session from "@utils/session";
import { setPreviousPathName } from "@actions/app";
import { useDispatch } from "react-redux";


import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverlay,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSwappingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";


const MoodboardView = ({
  items,
  propertyOrder,
  collectionName,
  setOpenDrawer,
  setGemSingleIdSingleId,
  page = "",
  setIsPreviewVisible,
  setPreviewBookmark,
  checkedBookmark,
  setCheckedBookmark,
  showComment,
  showEdit = false,
  user,
  showAddToBookmark,
  collectionId = "",
  type = "",
  tagId = "",
  tagName = "",
  shrink,
  setShrink,
  cardSize,
  openPagesIn,
  isSharedAndAllowEdit = true,
  permissions,
  authorName = "",
  gemPublicView = "",
  layout,
  showSocialIcons = "",
  getSortedItems = () => {},
  isFilter,
  gemOnClickEvent='',
}) => {
  const itemsId = useMemo(() => items.map((col) => col.id), [items]);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navigate = useRouter();
  const [itemsState, setItemsState] = useState(items);
  const [width, setWidth] = useState("40%");
  const [mobileScreen, setMobileScreen] = useState(false);

  const [draggedItem, setDraggedItem] = useState(null);
  const [overItem, setOverItem] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 600) {
        setMobileScreen(true);
      } else {
        setMobileScreen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCheck = (e, item) => {
    if (e.target.checked === true) {
      setCheckedBookmark((prev) => [...prev, item]);
      return;
    }

    if (e.target.checked === false) {
      const filtered = checkedBookmark?.filter((data) => data.id !== item.id);
      setCheckedBookmark(filtered);
      return;
    }
  };

  const handleOpenGem = (e, item) => {
    const queryString = new URLSearchParams(searchParams).toString();
    const url = `${pathname}${queryString ? `?${queryString}` : ""}`;
    dispatch(setPreviousPathName(url));
    if (page === "random-bookmark" && gemPublicView) {
      e.stopPropagation();
      navigate.push(
        `/u/${authorName || "default"}/g/${item.id}/${
          item?.slug ||
          (item.title
            ? slugify(item.title || "", {
                lower: true,
                remove: /[&,+()$~%.'":*?<>{}/\/]/g,
              })
            : "default")
        }?public=true`
      );
      return;
    }
    if (page === "random-bookmark" && !gemPublicView) {
      e.stopPropagation();
      navigate.push(
        `/u/${item?.author?.username || "default"}/g/${item.id}/${
          item?.slug ||
          (item.title
            ? slugify(item.title || "", {
                lower: true,
                remove: /[&,+()$~%.'":*?<>{}/\/]/g,
              })
            : "default")
        }`
      );
      return;
    }
    if (page === "collection-public-shared") {
      e.stopPropagation();
      navigate.push(
        `/u/${item?.author?.username || "default"}/g/${item.id}/${
          item?.slug ||
          (item.title
            ? slugify(item.title || "", {
                lower: true,
                remove: /[&,+()$~%.'":*?<>{}/\/]/g,
              })
            : "default")
        }?public=true`
      );
      return;
    }
    if (page === "profile-bookmark") {
      if (item?.author?.id === Number(session?.userId)) {
        navigate.push(
          `/u/${item?.author?.username || "default"}/g/${item.id}/${
            item?.slug ||
            (item.title
              ? slugify(item.title || "", {
                  lower: true,
                  remove: /[&,+()$~%.'":*?<>{}/\/]/g,
                })
              : "default")
          }`
        );
        return;
      } else {
        navigate.push(
          `/u/${item?.author?.username || "default"}/g/${item.id}/${
            item?.slug ||
            (item.title
              ? slugify(item.title || "", {
                  lower: true,
                  remove: /[&,+()$~%.'":*?<>{}/\/]/g,
                })
              : "default")
          }?public=true`
        );
        return;
      }
    }
    if (openPagesIn === "full page") {
      e.stopPropagation();
      navigate.push(
        `/u/${item?.author?.username || "default"}/g/${item.id}/${
          item?.slug ||
          (item.title
            ? slugify(item.title || "", {
                lower: true,
                remove: /[&,+()$~%.'":*?<>{}/\/]/g,
              })
            : "default")
        }`
      );
      return;
    }
    if (openPagesIn === "side peek") {
      e.stopPropagation();
      setShrink(true);
      if (page === "bookmark") {
        navigate.push(
          `/u/${item?.author?.username || "default"}/all-bookmarks/${item.id}`
        );
        return;
      }
      if (page === "collection") {
        navigate.push(
          `/u/${item?.author?.username || "default"}/c/${collectionId}/${
            item?.collection_gems?.slug ||
            slugify(collectionName || "", {
              lower: true,
              remove: /[&,+()$~%.'":*?<>{}/\/]/g,
            })
          }/${item.id}`
        );
        return;
      }
      if (page === "filter") {
        navigate.push(
          `/u/${item?.author?.username || "default"}/filters/${slugify(
            type || "",
            { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g }
          )}/${item.id}?type=${type}`
        );
        return;
      }
      if (page === "broken-duplicate") {
        navigate.push(
          `/u/${item?.author?.username || "default"}/links/${
            item.id
          }?type=${type}`
        );
        return;
      }
      if (page === "tags") {
        if (item && item.id) {
          navigate.push(
            `/u/${session.username}/tags/${tagId}/${
              item?.slug ||
              slugify(tagName || "", {
                lower: true,
                remove: /[&,+()$~%.'":*?<>{}/\/]/g,
              })
            }/${item.id}`
          );
        } else {
          // handleLayout('card')
          navigate.push(
            `/u/${item?.author?.username || "default"}/tags/${tagId}/${
              item?.slug ||
              slugify(tagName || "", {
                lower: true,
                remove: /[&,+()$~%.'":*?<>{}/\/]/g,
              })
            }`
          );
        }
        return;
      }
      if (page === "profile-bookmark") {
        if (item?.author?.id === Number(session?.userId)) {
          navigate.push(
            `/u/${item?.author?.username || "default"}/g/${item.id}/${
              item?.slug ||
              (item.title
                ? slugify(item.title || "", {
                    lower: true,
                    remove: /[&,+()$~%.'":*?<>{}/\/]/g,
                  })
                : "default")
            }`
          );
          return;
        } else {
          navigate.push(
            `/u/${item?.author?.username || "default"}/g/${item.id}/${
              item?.slug ||
              (item.title
                ? slugify(item.title || "", {
                    lower: true,
                    remove: /[&,+()$~%.'":*?<>{}/\/]/g,
                  })
                : "default")
            }?public=true`
          );
        }
      }
    }
  };

  useEffect(() => {
    setItemsState(items);
  }, [items]);

  const breakpoints = {
    default: 6,
    2000: 6,
    1500: 5,
    1100: 4,
    900: 3,
    500: 2,
    400: 1,
  };
  const breakpointsCollection = {
    default: 6,
    2000: 6,
    1600: 5,
    1100: 4,
    900: 3,
    500: 2,
    400: 1,
  };

  const handleResetShrink = (e) => {
    e.stopPropagation();
    setShrink(false);
  };

  const getTaskPos = (id) => items.findIndex((item) => item.id === id);

  const handleDragStart = (event) => {
    const { active } = event;
    setDraggedItem(items.find((item) => item.id === active.id));
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    setDraggedItem(null);
    setOverItem(null);

    if (active.id === over.id) return;

    const originalPos = getTaskPos(active.id);
    const newPos = getTaskPos(over.id);

    const data = arrayMove(items, originalPos, newPos);

    getSortedItems(data);
  };

  return (
    <>
      {page === "bookmark" && (
        <>
          {shrink ? (
            <>
              <div className="flex flex-col-reverse md:flex md:flex-row">
                <Resizable
                  className="!h-[100vh] !overflow-y-scroll overflow-x-hidden"
                  size={{ width: mobileScreen ? "100%" : width }}
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
                    right: true,
                    left: false,
                  }}
                >
                  <div
                    className={`pr-2 ${
                      cardSize === "medium"
                        ? "grid-container"
                        : cardSize === "large"
                        ? "grid-container-large"
                        : "grid-container-small"
                    }`}
                  >
                    {itemsState.map((item, i) => {
                      return (
                        <div key={i}>
                          <MoodboardMediaTypeCard
                            layout={layout}
                            item={item}
                            showComment={showComment}
                            checkedBookmark={checkedBookmark}
                            handleOpenGem={handleOpenGem}
                            setGemSingleIdSingleId={setGemSingleIdSingleId}
                            setOpenDrawer={setOpenDrawer}
                            handleCheck={handleCheck}
                            user={user}
                            // showEdit={true}
                            isSharedAndAllowEdit={true}
                            showAddToBookmark={showAddToBookmark}
                            propertyOrder={propertyOrder}
                            page={page}
                          />
                        </div>
                      );
                    })}
                  </div>
                </Resizable>

                <div
                  className={`h-full  ${mobileScreen && "mb-4"}`}
                  style={{
                    width: mobileScreen ? "100%" : `calc(100% - ${width})`,
                  }}
                >
                  <div
                    className="mb-2 ml-1"
                    style={{
                      borderBottomColor: "#d9d9d9",
                      borderBottomStyle: "solid",
                      borderBottomWidth: "1px",
                    }}
                  >
                    <div className="p-2 w-fit hover:bg-[#f2f2f2] hover:rounded-[2px]">
                      <XMarkIcon
                        className="cursor-pointer h-5 w-5"
                        onClick={handleResetShrink}
                      />
                    </div>
                  </div>
                  <Outlet context={"inboxView"} />
                </div>
              </div>
            </>
          ) : (
            <ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
              <Masonry gutter="16px">
                {itemsState.map((item, i) => {
                  return (
                    <div key={i}>
                      <MoodboardMediaTypeCard
                        layout={layout}
                        item={item}
                        showComment={showComment}
                        checkedBookmark={checkedBookmark}
                        handleOpenGem={handleOpenGem}
                        setGemSingleIdSingleId={setGemSingleIdSingleId}
                        setOpenDrawer={setOpenDrawer}
                        handleCheck={handleCheck}
                        user={user}
                        isSharedAndAllowEdit={true}
                        showAddToBookmark={showAddToBookmark}
                        propertyOrder={propertyOrder}
                        page={page}
                        gemOnClickEvent={gemOnClickEvent}
                      />
                    </div>
                  );
                })}
              </Masonry>
            </ResponsiveMasonry>
          )}
        </>
      )}

      {page === "collection" && (
        <>
          {shrink ? (
            <>
              <div className="flex flex-col-reverse md:flex md:flex-row">
                <Resizable
                  className="!h-[100vh] !overflow-y-scroll overflow-x-hidden"
                  size={{ width: mobileScreen ? "100%" : width }}
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
                    right: true,
                    left: false,
                  }}
                >
                  <div
                    className={`pr-2 ${
                      cardSize === "medium"
                        ? "grid-container"
                        : cardSize === "large"
                        ? "grid-container-large"
                        : "grid-container-small"
                    }`}
                  >
                    {itemsState.map((item, i) => {
                      return (
                        <div key={i}>
                          <MoodboardMediaTypeCard
                            layout={layout}
                            item={item}
                            showComment={showComment}
                            checkedBookmark={checkedBookmark}
                            handleOpenGem={handleOpenGem}
                            setGemSingleIdSingleId={setGemSingleIdSingleId}
                            setOpenDrawer={setOpenDrawer}
                            handleCheck={handleCheck}
                            user={user}
                            // showEdit={true}
                            showAddToBookmark={showAddToBookmark}
                            propertyOrder={propertyOrder}
                            page={page}
                            collectionName={collectionName}
                            isSharedAndAllowEdit={isSharedAndAllowEdit}
                            permissions={permissions}
                          />
                        </div>
                      );
                    })}
                  </div>
                </Resizable>

                <div
                  className={`h-full  ${mobileScreen && "mb-4"}`}
                  style={{
                    width: mobileScreen ? "100%" : `calc(100% - ${width})`,
                  }}
                >
                  <div
                    className="mb-2 ml-1"
                    style={{
                      borderBottomColor: "#d9d9d9",
                      borderBottomStyle: "solid",
                      borderBottomWidth: "1px",
                    }}
                  >
                    <div className="p-2 w-fit hover:bg-[#f2f2f2] hover:rounded-[2px]">
                      <XMarkIcon
                        className="cursor-pointer h-5 w-5"
                        onClick={handleResetShrink}
                      />
                    </div>
                  </div>
                  <Outlet context={"inboxView"} />
                </div>
              </div>
            </>
          ) : (
            <DndContext
              onDragStart={handleDragStart}
              collisionDetection={closestCorners}
              onDragEnd={handleDragEnd}
              sensors={sensors}
            >
              <SortableContext items={itemsId} strategy={rectSwappingStrategy}>
                <ResponsiveMasonry
                  columnsCountBreakPoints={breakpointsCollection}
                >
                  <Masonry gutter="16px">
                    {itemsState.map((item) => {
                      // if(item?.id === draggedItem?.id) return <></>
                      return (
                        <MoodboardMediaTypeCard
                          layout={layout}
                          item={item}
                          showComment={showComment}
                          checkedBookmark={checkedBookmark}
                          handleOpenGem={handleOpenGem}
                          setGemSingleIdSingleId={setGemSingleIdSingleId}
                          setOpenDrawer={setOpenDrawer}
                          handleCheck={handleCheck}
                          user={user}
                          // showEdit={true}
                          showAddToBookmark={showAddToBookmark}
                          propertyOrder={propertyOrder}
                          page={page}
                          collectionName={collectionName}
                          isSharedAndAllowEdit={isSharedAndAllowEdit}
                          permissions={permissions}
                          key={item.id}
                          isFilter={isFilter}
                          gemOnClickEvent={gemOnClickEvent}
                        />
                      );
                    })}
                  </Masonry>
                </ResponsiveMasonry>
              </SortableContext>

              {createPortal(
                <DragOverlay>
                  {draggedItem && (
                    <MoodboardMediaTypeCard
                      item={draggedItem}
                      page={page}
                      key={draggedItem.id}
                      isDragging={true}
                    />
                  )}
                </DragOverlay>,
                document.body
              )}
            </DndContext>
          )}
        </>
      )}

      {(page === "broken-duplicate" || page === "filter") && (
        <>
          {shrink ? (
            <>
              <>
                <div className="flex flex-col-reverse md:flex md:flex-row">
                  <Resizable
                    className="!h-[100vh] !overflow-y-scroll overflow-x-hidden"
                    size={{ width: mobileScreen ? "100%" : width }}
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
                      right: true,
                      left: false,
                    }}
                  >
                    <div
                      className={`pr-2 ${
                        cardSize === "medium"
                          ? "grid-container"
                          : cardSize === "large"
                          ? "grid-container-large"
                          : "grid-container-small"
                      }`}
                    >
                      {itemsState.map((item, i) => {
                        return (
                          <div key={i}>
                            <MoodboardMediaTypeCard
                              layout={layout}
                              item={item}
                              showComment={showComment}
                              checkedBookmark={checkedBookmark}
                              handleOpenGem={handleOpenGem}
                              setGemSingleIdSingleId={setGemSingleIdSingleId}
                              setOpenDrawer={setOpenDrawer}
                              handleCheck={handleCheck}
                              user={user}
                              isSharedAndAllowEdit={isSharedAndAllowEdit}
                              // isSharedAndAllowEdit={item.author ? item.author.id === parseInt(session.userId) : true}
                              showAddToBookmark={showAddToBookmark}
                              propertyOrder={propertyOrder}
                              page={page}
                              permissions={permissions || null}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </Resizable>

                  <div
                    className={`h-full  ${mobileScreen && "mb-4"}`}
                    style={{
                      width: mobileScreen ? "100%" : `calc(100% - ${width})`,
                    }}
                  >
                    <div
                      className="mb-2 ml-1"
                      style={{
                        borderBottomColor: "#d9d9d9",
                        borderBottomStyle: "solid",
                        borderBottomWidth: "1px",
                      }}
                    >
                      <div className="p-2 w-fit hover:bg-[#f2f2f2] hover:rounded-[2px]">
                        <XMarkIcon
                          className="cursor-pointer h-5 w-5"
                          onClick={handleResetShrink}
                        />
                      </div>
                    </div>
                    <Outlet context={"inboxView"} />
                  </div>
                </div>
              </>
            </>
          ) : (
            <ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
              <Masonry gutter="16px">
                {itemsState.map((item, i) => {
                  return (
                    <div key={i}>
                      <MoodboardMediaTypeCard
                        layout={layout}
                        item={item}
                        showComment={showComment}
                        checkedBookmark={checkedBookmark}
                        handleOpenGem={handleOpenGem}
                        setGemSingleIdSingleId={setGemSingleIdSingleId}
                        setOpenDrawer={setOpenDrawer}
                        handleCheck={handleCheck}
                        user={user}
                        // showEdit={item.author ? item.author.id === parseInt(session.userId) : true}
                        showAddToBookmark={showAddToBookmark}
                        propertyOrder={propertyOrder}
                        page={page}
                        permissions={permissions || null}
                        isSharedAndAllowEdit={isSharedAndAllowEdit}
                        gemOnClickEvent={gemOnClickEvent}
                      />
                    </div>
                  );
                })}
              </Masonry>
            </ResponsiveMasonry>
          )}
        </>
      )}

      {page === "tags" && (
        <>
          {shrink ? (
            <>
              <>
                <div className="flex flex-col-reverse md:flex md:flex-row">
                  <Resizable
                    className="!h-[100vh] !overflow-y-scroll overflow-x-hidden"
                    size={{ width: mobileScreen ? "100%" : width }}
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
                      right: true,
                      left: false,
                    }}
                  >
                    <div
                      className={`pr-2 ${
                        cardSize === "medium"
                          ? "grid-container"
                          : cardSize === "large"
                          ? "grid-container-large"
                          : "grid-container-small"
                      }`}
                    >
                      {itemsState.map((item, i) => {
                        return (
                          <div key={i}>
                            <MoodboardMediaTypeCard
                              layout={layout}
                              item={item}
                              showComment={showComment}
                              checkedBookmark={checkedBookmark}
                              handleOpenGem={handleOpenGem}
                              setGemSingleIdSingleId={setGemSingleIdSingleId}
                              setOpenDrawer={setOpenDrawer}
                              handleCheck={handleCheck}
                              user={user}
                              isSharedAndAllowEdit={isSharedAndAllowEdit}
                              // isSharedAndAllowEdit={item.author ? item.author.id === parseInt(session.userId) : true}
                              showAddToBookmark={showAddToBookmark}
                              propertyOrder={propertyOrder}
                              page={page}
                              permissions={permissions || null}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </Resizable>

                  <div
                    className={`h-full  ${mobileScreen && "mb-4"}`}
                    style={{
                      width: mobileScreen ? "100%" : `calc(100% - ${width})`,
                    }}
                  >
                    <div
                      className="mb-2 ml-1"
                      style={{
                        borderBottomColor: "#d9d9d9",
                        borderBottomStyle: "solid",
                        borderBottomWidth: "1px",
                      }}
                    >
                      <div className="p-2 w-fit hover:bg-[#f2f2f2] hover:rounded-[2px]">
                        <XMarkIcon
                          className="cursor-pointer h-5 w-5"
                          onClick={handleResetShrink}
                        />
                      </div>
                    </div>
                    <Outlet context={"inboxView"} />
                  </div>
                </div>
              </>
            </>
          ) : (
            <DndContext
              onDragStart={handleDragStart}
              collisionDetection={closestCorners}
              onDragEnd={handleDragEnd}
              sensors={sensors}
            >
              <SortableContext items={itemsId} strategy={rectSwappingStrategy}>
                <ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
                  <Masonry gutter="16px">
                    {itemsState.map((item, i) => {
                      return (
                        <div key={i}>
                          <MoodboardMediaTypeCard
                            layout={layout}
                            item={item}
                            showComment={showComment}
                            checkedBookmark={checkedBookmark}
                            handleOpenGem={handleOpenGem}
                            setGemSingleIdSingleId={setGemSingleIdSingleId}
                            setOpenDrawer={setOpenDrawer}
                            handleCheck={handleCheck}
                            user={user}
                            // showEdit={item.author ? item.author.id === parseInt(session.userId) : true}
                            showAddToBookmark={showAddToBookmark}
                            propertyOrder={propertyOrder}
                            page={page}
                            permissions={permissions || null}
                            isSharedAndAllowEdit={isSharedAndAllowEdit}
                            gemOnClickEvent={gemOnClickEvent}
                          />
                        </div>
                      );
                    })}
                  </Masonry>
                </ResponsiveMasonry>
              </SortableContext>
              {createPortal(
                <DragOverlay>
                  {draggedItem && (
                    <MoodboardMediaTypeCard
                      item={draggedItem}
                      page={page}
                      key={draggedItem.id}
                    />
                  )}
                </DragOverlay>,
                document.body
              )}
            </DndContext>
          )}
        </>
      )}

      {page === "embed" && (
        <>
          <ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
            <Masonry gutter="16px">
              {itemsState.map((item, i) => {
                return (
                  <div key={i}>
                    <MoodboardMediaTypeCard
                      layout={layout}
                      item={item}
                      showComment={showComment}
                      checkedBookmark={checkedBookmark}
                      handleOpenGem={handleOpenGem}
                      setGemSingleIdSingleId={setGemSingleIdSingleId}
                      setOpenDrawer={setOpenDrawer}
                      handleCheck={handleCheck}
                      showAddToBookmark={showAddToBookmark}
                      user={user}
                      page={page}
                      isSharedAndAllowEdit={isSharedAndAllowEdit}
                    />
                  </div>
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        </>
      )}
      {page === "profile-bookmark" && (
        <>
          {shrink ? (
            <>
              <>
                <div className="flex flex-col-reverse md:flex md:flex-row">
                  <Resizable
                    className="!h-[100vh] !overflow-y-scroll overflow-x-hidden"
                    size={{ width: mobileScreen ? "100%" : width }}
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
                      right: true,
                      left: false,
                    }}
                  >
                    <div
                      className={`pr-2 ${
                        cardSize === "medium"
                          ? "grid-container"
                          : cardSize === "large"
                          ? "grid-container-large"
                          : "grid-container-small"
                      }`}
                    >
                      {itemsState.map((item, i) => {
                        return (
                          <div key={i}>
                            <MoodboardMediaTypeCard
                              layout={layout}
                              item={item}
                              showComment={showComment}
                              checkedBookmark={checkedBookmark}
                              handleOpenGem={handleOpenGem}
                              setGemSingleIdSingleId={setGemSingleIdSingleId}
                              setOpenDrawer={setOpenDrawer}
                              handleCheck={handleCheck}
                              user={user}
                              showAddToBookmark={showAddToBookmark}
                              propertyOrder={propertyOrder}
                              page={page}
                              // showEdit={item?.author?.id === Number(session?.userId)}
                              isSharedAndAllowEdit={
                                item?.author?.id === Number(session?.userId)
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  </Resizable>

                  <div
                    className={`h-full  ${mobileScreen && "mb-4"}`}
                    style={{
                      width: mobileScreen ? "100%" : `calc(100% - ${width})`,
                    }}
                  >
                    <div
                      className="mb-2 ml-1"
                      style={{
                        borderBottomColor: "#d9d9d9",
                        borderBottomStyle: "solid",
                        borderBottomWidth: "1px",
                      }}
                    >
                      <div className="p-2 w-fit hover:bg-[#f2f2f2] hover:rounded-[2px]">
                        <XMarkIcon
                          className="cursor-pointer h-5 w-5"
                          onClick={handleResetShrink}
                        />
                      </div>
                    </div>
                    <Outlet context={"inboxView"} />
                  </div>
                </div>
              </>
            </>
          ) : (
            <ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
              <Masonry gutter="16px">
                {itemsState.map((item, i) => {
                  return (
                    <div key={i}>
                      <MoodboardMediaTypeCard
                        layout={layout}
                        item={item}
                        showComment={showComment}
                        checkedBookmark={checkedBookmark}
                        handleOpenGem={handleOpenGem}
                        setGemSingleIdSingleId={setGemSingleIdSingleId}
                        setOpenDrawer={setOpenDrawer}
                        handleCheck={handleCheck}
                        user={user}
                        // showEdit={item?.author?.id === Number(session?.userId)}
                        isSharedAndAllowEdit={
                          item?.author?.id === Number(session?.userId)
                        }
                        showAddToBookmark={showAddToBookmark}
                        propertyOrder={propertyOrder}
                        page={page}
                        gemOnClickEvent={gemOnClickEvent}
                      />
                    </div>
                  );
                })}
              </Masonry>
            </ResponsiveMasonry>
          )}
        </>
      )}

      {page === "random-bookmark" && (
        <ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
          <Masonry gutter="16px">
            {itemsState.map((item, i) => {
              return (
                <div key={i}>
                  <MoodboardMediaTypeCard
                    layout={layout}
                    item={item}
                    showComment={showComment}
                    checkedBookmark={checkedBookmark}
                    handleOpenGem={handleOpenGem}
                    setGemSingleIdSingleId={setGemSingleIdSingleId}
                    setOpenDrawer={setOpenDrawer}
                    handleCheck={handleCheck}
                    user={user}
                    showAddToBookmark={showAddToBookmark}
                    hideGemEngagement={true}
                    isSharedAndAllowEdit={false}
                  />
                </div>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      )}

      {page === "collection-public-shared" && (
        <ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
          <Masonry gutter="16px">
            {itemsState.map((item, i) => {
              return (
                <div key={i}>
                  <MoodboardMediaTypeCard
                    layout={layout}
                    item={item}
                    showComment={showComment}
                    checkedBookmark={checkedBookmark}
                    handleOpenGem={handleOpenGem}
                    setGemSingleIdSingleId={setGemSingleIdSingleId}
                    setOpenDrawer={setOpenDrawer}
                    handleCheck={handleCheck}
                    user={user}
                    // showEdit={showEdit}
                    showAddToBookmark={showAddToBookmark}
                    page={page}
                    isSharedAndAllowEdit={false}
                    propertyOrder={propertyOrder}
                    showSocialIcons={showSocialIcons}
                  />
                </div>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </>
  );
};

export default MoodboardView;