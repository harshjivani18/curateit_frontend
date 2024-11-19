import React, { useMemo, useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates
} from "@dnd-kit/sortable";

import { DragHandle, PromptItem } from "./PromptItem";
import { PromptDragOverlay } from "./PromptDragOverlay";

const PromptList = ({
    myPrompts,
    onDragEnd,
    renderItem
}) => {
    const [active, setActive] = useState(null);
    const activeItem          = useMemo(() => myPrompts.find((item) => item.id === active?.id), [active, myPrompts]);
    const sensors             = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates
        })
    );

    return (
        <DndContext
            sensors={sensors}
            onDragStart={({ active }) => {
                setActive(active);
            }}
            onDragEnd={({ active, over }) => {
                if (over && active.id !== over?.id) {
                    const activeIndex = myPrompts.findIndex(({ id }) => id === active.id);
                    const overIndex = myPrompts.findIndex(({ id }) => id === over.id);

                    onDragEnd(arrayMove(myPrompts, activeIndex, overIndex));
                }
                setActive(null);
            }}
            onDragCancel={() => {
                setActive(null);
            }}
        >
            <SortableContext items={myPrompts}>
                <ul className="ct-prompt-list" role="application">
                    {myPrompts.map((item) => (
                        <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
                    ))}
                </ul>
            </SortableContext>
            <PromptDragOverlay>
                {activeItem ? renderItem(activeItem) : null}
            </PromptDragOverlay>
        </DndContext>
    );
}

PromptList.Item = PromptItem;
PromptList.DragHandle = DragHandle;

export default PromptList;
