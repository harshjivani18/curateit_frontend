import { useEffect, useMemo, useState } from "react";
import MoodboardMediaTypeCard from "./MoodboardMediaTypeCard";
import slugify from "slugify";
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
  DragOverlay
} from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const StreamView = ({
  items,
  propertyOrder,
  collectionName,
  setOpenDrawer,
  setGemSingleIdSingleId,
  page = "",
  checkedBookmark,
  setCheckedBookmark,
  showComment,
  showEdit = false,
  user,
  showAddToBookmark,
  isSharedAndAllowEdit = true,
  permissions,
  authorName = "",
  layout,
  getSortedItems = () => {},
  isFilter,
  showSocialIcons = "",
  gemOnClickEvent = '',
}) => {
  const itemsId = useMemo(() => items.map((col) => col.id), [items]);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navigate = useRouter();
  const [itemsState, setItemsState] = useState(items);
  const [mobileScreen, setMobileScreen] = useState(false);

  const [draggedItem, setDraggedItem] = useState(null);

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
    if (page === "collection-public-shared") {
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
  };

  useEffect(() => {
    setItemsState(items);
  }, [items]);

  const getTaskPos = (id) => items.findIndex((item) => item.id === id);

  const handleDragStart = (event) => {
    const { active } = event;
    setDraggedItem(items.find((item) => item.id === active.id));
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    setDraggedItem(null);

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
          <div className="flex flex-col items-center justify-center">
            {itemsState.map((item, i) => {
              return (
                <div
                  key={i}
                  className={`my-2 ${mobileScreen ? "w-full" : "w-[60%]"}`}
                >
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
                    showEdit={true}
                    showAddToBookmark={showAddToBookmark}
                    propertyOrder={propertyOrder}
                    page={page}
                    isSharedAndAllowEdit={true}
                    gemOnClickEvent={gemOnClickEvent}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}

      {page === "collection" && (
        <>
          <DndContext
            onDragStart={handleDragStart}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <SortableContext
              items={itemsId}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col items-center justify-center">
                {itemsState.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className={`mb-2 ${mobileScreen ? "w-full" : "w-[60%]"}`}
                    >
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
                    </div>
                  );
                })}
              </div>
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
        </>
      )}

      {(page === "broken-duplicate" || page === "filter") && (
        <>
          <div className="flex flex-col items-center justify-center">
            {itemsState.map((item, i) => {
              return (
                <div
                  key={i}
                  className={`my-2 ${mobileScreen ? "w-full" : "w-[60%]"}`}
                >
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
                    showEdit={true}
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
          </div>
        </>
      )}

      {page === "tags" && (
        <>
          <DndContext
            onDragStart={handleDragStart}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <SortableContext
              items={itemsId}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col items-center justify-center">
                {itemsState.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className={`my-2 ${mobileScreen ? "w-full" : "w-[60%]"}`}
                    >
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
                        showEdit={true}
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
              </div>
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
        </>
      )}

      {page === "profile-bookmark" && (
        <>
          <div className="flex flex-col items-center justify-center">
            {itemsState.map((item, i) => {
              return (
                <div
                  key={i}
                  className={`my-2 ${mobileScreen ? "w-full" : "w-[60%]"}`}
                >
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
                    showEdit={item?.author?.id === Number(session?.userId)}
                    showAddToBookmark={showAddToBookmark}
                    propertyOrder={propertyOrder}
                    page={page}
                    gemOnClickEvent={gemOnClickEvent}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}

      {page === "collection-public-shared" && (
        <>
          <div className="flex flex-col items-center justify-center">
            {itemsState.map((item, i) => {
              return (
                <div
                  key={i}
                  className={`my-2 ${mobileScreen ? "w-full" : "w-[60%]"}`}
                >
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
                    showEdit={showEdit}
                    showAddToBookmark={showAddToBookmark}
                    propertyOrder={propertyOrder}
                    page={page}
                    showSocialIcons={showSocialIcons}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default StreamView;