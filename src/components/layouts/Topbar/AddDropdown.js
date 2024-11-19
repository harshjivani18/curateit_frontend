import { 
    addBkFromPage, 
    openDrawer, 
    setIsMobileSidebar, 
    setParentCollectionData, 
    setParentTagData 
}                                       from "@actions/app";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { ArrowUpTrayIcon, PlusIcon }                     from "@heroicons/react/24/outline";
import { Button, Dropdown }                     from "antd";
import { useState }                     from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import { useDispatch }                  from "react-redux";

const AddDropdown = ({isMobile,page,collectionId,title,tagId}) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);

    const handleOpen = (flag) => {
    setOpen(flag);
  };

  const dropdownnRenderUI = () => {
    if(page === 'tags' || page == 'collection'){
        return (
        <div className="dropdown-content px-[16px] rounded-sm flex flex-col mx-2 pt-3 pb-4 gap-y-2">
            <div className="flex px-3 py-1 items-center hover:bg-[#f5f5f5] cursor-pointer" onClick={(e) => {
                e.stopPropagation()
                setOpen(false)
                if(page === 'collection'){
                    isMobile && dispatch(setIsMobileSidebar(false));
                    dispatch(openDrawer("collection"))
                }
                if(page === 'tags'){
                    dispatch(openDrawer('tags'))
                    isMobile && dispatch(setIsMobileSidebar(false))
                }
            }}>
                  <PlusIcon className="h-5 w-5 mr-[5px] text-[#4B4F5D]" />
                  <span className="text-[#344054] font-medium text-sm">Add {page === 'collection' ? 'collection' : 'tag'}</span> 
            </div>

            <div className="flex px-3 py-1 items-center hover:bg-[#f5f5f5] cursor-pointer" onClick={(e) => {
                e.stopPropagation()
                setOpen(false)
                if(page === 'collection'){
                    isMobile && dispatch(setIsMobileSidebar(false));
                    dispatch(setParentCollectionData({
                        collectionId: Number(collectionId),
                        collectionName: title
                    }))
                    dispatch(openDrawer("collection"))
                }
                if(page === 'tags'){
                    dispatch(openDrawer('tags'))
                    dispatch(setParentTagData({
                        tagId: Number(tagId),
                        tagName: title
                    }))
                    isMobile && dispatch(setIsMobileSidebar(false))
                }
            }}>
                  <PlusIcon className="h-5 w-5 mr-[5px] text-[#4B4F5D]" />
                  <span className="text-[#344054] font-medium text-sm">Add {page === 'collection' ? 'Sub collection' : 'Sub tag'}</span> 
            </div>

            <div className="flex px-3 py-1 items-center hover:bg-[#f5f5f5] cursor-pointer" onClick={() => {
                setOpen(false)
                dispatch(openDrawer("upload-bookmark"));
            }}>
                <ArrowUpTrayIcon className="h-5 w-5 mr-[5px] text-[#4B4F5D] hover:bg-[#f5f5f5]" />
                <span className="text-[#344054] font-medium text-sm">Upload</span> 
            </div>
            
        </div>
        );
    }

    if(page === 'filter' || page == 'bookmark'){
        return (
        <div className="dropdown-content px-[16px] rounded-sm flex flex-col mx-2 pt-3 pb-4 gap-y-2">
            <div className="flex px-3 py-1 items-center hover:bg-[#f5f5f5] cursor-pointer" onClick={() => {
                setOpen(false)
                dispatch(openDrawer("upload-bookmark"));
            }}>
                <ArrowUpTrayIcon className="h-5 w-5 mr-[5px] text-[#4B4F5D] hover:bg-[#f5f5f5]" />
                <span className="text-[#344054] font-medium text-sm">Upload</span> 
            </div>
            
        </div>
        );
    }
}

    const handleOpenDrawer = () => {
        dispatch(
            addBkFromPage({
            page,
            value: title,
            collectionId: Number(collectionId),
        })
        );
        dispatch(openDrawer("bookmark"));
    }

    return (
      <>
        <div
          className="bg-[#347AE2] hover:bg-[#347AE2] flex items-center rounded p-1 h-[30px]"
          size="small"
          type="primary"
        >
          <div
            id="tour-collection-add-button"
            className="flex items-center cursor-pointer mr-2"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDrawer();
            }}
          >
            {!isMobile && <PlusIcon className="h-3 w-3 text-white" />}
            <div className="text-white text-sm px-1">Add</div>
          </div>

          <div className="shadow bg-[#4791FF] hover:bg-[#4791FF] p-[2px] text-white rounded">
            <Dropdown
              overlayStyle={{
                width: isMobile ? "100%" : "230px",
                position: "fixed",
              }}
              trigger={["click"]}
              dropdownRender={() => dropdownnRenderUI()}
              onOpenChange={handleOpen}
              open={open}
            >
              <RiArrowDownSFill className="cursor-pointer h-4 w-4" />
            </Dropdown>
          </div>
        </div>
      </>
    );
}

export default AddDropdown;