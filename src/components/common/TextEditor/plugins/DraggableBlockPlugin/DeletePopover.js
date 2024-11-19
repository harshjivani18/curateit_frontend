import { TrashIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";

const DeletePopover = ({ anchorElem, onDelete }) => {

    const onDeleteEditorNode = () => {
        onDelete && onDelete();
    }

    return createPortal(
        <>
            <ul className="bg-[white] w-[200px]">
                <li className="component-picker-menu-item p-2">
                    <button className="component-picker-menu-item-button flex justify-center items-center" onClick={onDeleteEditorNode}>
                        <TrashIcon className="h-5 w-5 mr-2" />
                        Delete
                    </button>
                </li>
            </ul>
        </>, anchorElem
    )
}

export default DeletePopover;