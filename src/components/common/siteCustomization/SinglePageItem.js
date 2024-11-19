import { setSubPageParentData } from "@actions/app";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDownIcon, ChevronRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Dropdown } from "antd";
import { BsPencil, BsTrash } from "react-icons/bs";
import { PiDotsSixVertical, PiDotsThreeVertical } from "react-icons/pi";
import {
  TbLayoutBottombar,
  TbLayoutNavbar,
  TbLayoutSidebarRight,
} from "react-icons/tb";
import { useDispatch } from "react-redux";

const SinglePageItem = ({
  item,
  removeItem,
  expandedIds = [],
  onToggleExpand,
  setOptionSelected = () => {},
  handleVisibility = () => {},
  isChild = false,
  editItem=()=>{}
}) => {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item?.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const defaultItems = [
    {
      label: "Edit",
      key: "edit",
      icon: <BsPencil className="h-4 w-4 mr-2" />,
    },
    {
      label: "Delete",
      key: "delete",
      icon: <BsTrash className="h-4 w-4 mr-2" />,
      danger: true,
    },
  ];

  const subTextItems = [
    {
      label: "Edit",
      key: "edit",
      icon: <BsPencil className="h-4 w-4 mr-2" />,
    },
    {
      label: "Add sub page",
      key: "subPage",
      icon: <PlusIcon className="h-4 w-4 mr-2" />,
    },
    {
      label: "Delete",
      key: "delete",
      icon: <BsTrash className="h-4 w-4 mr-2" />,
      danger: true,
    },
  ];

  const isExpanded = expandedIds.includes(item?.id);

  return (
    <>
      <div
        className="touch-none flex items-center rounded-lg justify-between p-2 bg-white border border-solid border-[#DFE4EC] my-2"
        key={item?.id}
        ref={setNodeRef}
        style={style}
      >
        <div className="flex items-center gap-1">
          <PiDotsSixVertical
            className="h-5 w-5 cursor-grab text-[#74778B]"
            {...attributes}
            {...listeners}
          />
          <div className="ml-1 flex items-center gap-2">
            <span className="block text-[#292B38] text-base font-bold">
              {item?.title}
            </span>
            {item?.children?.length > 0 && (
              <>
                {isExpanded ? (
                  <ChevronDownIcon
                    className="h-4 w-4 cursor-pointer text-[#4B4F5D]"
                    onClick={() => onToggleExpand(item?.id)}
                  />
                ) : (
                  <ChevronRightIcon
                    className="h-4 w-4 cursor-pointer text-[#4B4F5D]"
                    onClick={() => onToggleExpand(item?.id)}
                  />
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <TbLayoutNavbar
            className={`${
              item?.visibility?.includes("top")
                ? "text-[#347AE2] bg-[#E5F0FF]"
                : "text-[#ABB7C9]"
            } h-5 w-5 cursor-pointer`}
            onClick={() => {
              if (item?.visibility?.includes("top")) {
                const filtered = item?.visibility?.filter(
                  (item) => item !== "top"
                );
                const obj = {
                  visibility: filtered,
                };
                handleVisibility(item.id, obj);
              } else {
                const obj = {
                  visibility: [...item.visibility, "top"],
                };
                handleVisibility(item.id, obj);
              }
            }}
          />
          <TbLayoutBottombar
            className={`${
              item?.visibility?.includes("bottom")
                ? "text-[#347AE2] bg-[#E5F0FF]"
                : "text-[#ABB7C9]"
            } h-5 w-5 cursor-pointer`}
            onClick={() => {
              if (item?.visibility?.includes("bottom")) {
                const filtered = item?.visibility?.filter(
                  (item) => item !== "bottom"
                );
                const obj = {
                  visibility: filtered,
                };
                handleVisibility(item.id, obj);
              } else {
                const obj = {
                  visibility: [...item.visibility, "bottom"],
                };
                handleVisibility(item.id, obj);
              }
            }}
          />
          <TbLayoutSidebarRight
            className={`${
              item?.visibility?.includes("sidebar")
                ? "text-[#347AE2] bg-[#E5F0FF]"
                : "text-[#ABB7C9]"
            } h-5 w-5 cursor-pointer`}
            onClick={() => {
              if (item?.visibility?.includes("sidebar")) {
                const filtered = item?.visibility?.filter(
                  (item) => item !== "sidebar"
                );
                const obj = {
                  visibility: filtered,
                };
                handleVisibility(item.id, obj);
              } else {
                const obj = {
                  visibility: [...item.visibility, "sidebar"],
                };
                handleVisibility(item.id, obj);
              }
            }}
          />
          <Dropdown
            menu={{
              items:
                item?.type === "text" &&
                (item?.subTextType === "text" || item?.subTextType === 'header') &&
                !isChild
                  ? subTextItems
                  : defaultItems,
              onClick: async (e) => {
                const { key } = e;
                if (key === "edit") {
                  editItem(item);
                } else if (key === "delete") {
                  removeItem(item?.id);
                } else if (key === "subPage") {
                  dispatch(setSubPageParentData(item));
                  setOptionSelected("add");
                }
              },
            }}
          >
            <PiDotsThreeVertical className="h-5 w-5 text-[#4B4F5D]" />
          </Dropdown>
        </div>
      </div>
      {isExpanded && item?.children?.length > 0 && (
        <div className="ml-6 flex flex-col gap-2 w-[calc(100% - 24px)]">
          {item.children.map((child, index) => (
            <SinglePageItem
              key={child?.id || index}
              item={child}
              removeItem={removeItem}
              expandedIds={expandedIds || []}
              onToggleExpand={onToggleExpand}
              isChild={true}
              handleVisibility={handleVisibility}
              editItem={editItem}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default SinglePageItem;
