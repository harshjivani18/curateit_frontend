import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import SinglePageItem from "./SinglePageItem";
import { useMemo, useState } from "react";
import { message } from "antd";
import { modifyNavPage } from "@utils/find-collection-id";
import { setEditDataNavbar } from "@actions/app";
import { useDispatch } from "react-redux";

const PageTreeComponent = ({ items, getSortedItems, setOptionSelected }) => {
  const dispatch = useDispatch()
  const [draggedItem, setDraggedItem] = useState(null);
  const [expandedIds, setExpandedIds] = useState([]);

  const itemsId = useMemo(() => items.map((col) => col.id), [items]);

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

  const dropAnimationConfig = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.3",
        },
      },
    }),
  };

  const removeItem = (id) => {
    // setItems((items) => removeItemRecursively(items, id));
    const data = removeItemRecursively(items, id);
    getSortedItems(data);
    message.success("Page deleted successfully");
  };

  const editItem = (item) => {
    dispatch(setEditDataNavbar(item));
    setOptionSelected("add");
  };

  const removeItemRecursively = (items, id) => {
    return items.filter((item) => {
      if (item.id === id) {
        return false;
      }
      if (item.children) {
        item.children = removeItemRecursively(item.children, id);
      }
      return true;
    });
  };

  const getItemById = (id, items) => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = getItemById(id, item.children);
        if (found) return found;
      }
    }
    return null;
  };

  const moveItem = (items, activeId, overId) => {
    const activeItem = getItemById(activeId, items);
    const overItem = getItemById(overId, items);

    if (!activeItem || !overItem) return items;

    const itemsWithoutActive = removeItemRecursively(items, activeId);

    const insertItem = (items, newItem, parentId) => {
      return items.map((item) => {
        if (item.id === parentId) {
          if (!item.children) item.children = [];
          item.children.push(newItem);
        } else if (item.children) {
          item.children = insertItem(item.children, newItem, parentId);
        }
        return item;
      });
    };

    return insertItem(itemsWithoutActive, activeItem, overId);
  };

  const moveWithinParent = (items, activeId, overId) => {
    const parent = findParent(items, activeId);
    if (!parent) return items;

    const activeIndex = parent.children.findIndex(
      (child) => child.id === activeId
    );
    const overIndex = parent.children.findIndex((child) => child.id === overId);

    parent.children = arrayMove(parent.children, activeIndex, overIndex);
    return [...items];
  };

  const findParent = (items, childId) => {
    for (const item of items) {
      if (item.children?.some((child) => child.id === childId)) {
        return item;
      }
      if (item.children) {
        const parent = findParent(item.children, childId);
        if (parent) return parent;
      }
    }
    return null;
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setDraggedItem(getItemById(active.id, items));
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    setDraggedItem(null);

    if (active.id === over.id) return;

    const activeParent = findParent(items, active.id);
    const overParent = findParent(items, over.id);

    if (!activeParent && !overParent) {
      const activeIndex = items.findIndex((item) => item.id === active.id);
      const overIndex = items.findIndex((item) => item.id === over.id);
      getSortedItems(arrayMove(items, activeIndex, overIndex));
    } else if (!activeParent && overParent) {
      message.error(
        "Parent items cannot be moved into another parent item as a child."
      );
    } else if (activeParent && !overParent) {
      const childItem = getItemById(active.id, items);
      getSortedItems((items) => {
        const itemsWithoutChild = removeItemRecursively(items, active.id);
        return [...itemsWithoutChild, childItem];
      });
    } else if (activeParent.id === overParent.id) {
      getSortedItems(moveWithinParent(items, active.id, over.id));
    } else {
      const childItem = getItemById(active.id, items);
      getSortedItems((items) => {
        const itemsWithoutChild = removeItemRecursively(items, active.id);
        return items.map((item) => {
          if (item.id === overParent.id) {
            if (!item.children) item.children = [];
            item.children.push(childItem);
          }
          return item;
        });
      });
    }
  };

  const handleToggleExpand = (id) => {
    setExpandedIds((prevExpandedIds) =>
      prevExpandedIds.includes(id)
        ? prevExpandedIds.filter((expandedId) => expandedId !== id)
        : [...prevExpandedIds, id]
    );
  };

  const handleVisibility = (id,value) => {
    const data = modifyNavPage(items,id,value)
    getSortedItems(data)
  }

  return (
    <>
      <DndContext
        onDragStart={handleDragStart}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={itemsId} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-2 w-full">
            {items?.map((item, i) => (
              <SinglePageItem
                item={item}
                key={i}
                removeItem={removeItem}
                expandedIds={expandedIds}
                onToggleExpand={handleToggleExpand}
                setOptionSelected={setOptionSelected}
                handleVisibility={handleVisibility}
                editItem={editItem}
              />
            ))}
          </div>
        </SortableContext>
        <DragOverlay dropAnimation={dropAnimationConfig}>
          {draggedItem ? (
            <SinglePageItem item={draggedItem} key={draggedItem.id} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default PageTreeComponent;
