import { useState } from "react";
import HeaderTitle from "./HeaderTitle";
import { Checkbox, Input, message, Select } from "antd";
import { PiSmiley } from "react-icons/pi";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { addSubPageById, modifyNavPage } from "@utils/find-collection-id";

const { Option } = Select;

const AddComponent = ({ handleClose, setItems, items, getSortedItems }) => {
  const subPageParentData = useSelector((state) => state.app.subPageParentData);
  const editPageDataNavbar = useSelector(
    (state) => state.app.editPageDataNavbar
  );
  const [pageOption, setPageOption] = useState(
    editPageDataNavbar ? editPageDataNavbar?.type : "page"
  );

  const [textTypeOption, setTextTypeOption] = useState(
    editPageDataNavbar ? editPageDataNavbar?.subTextType : "text"
  );

  const [pageTitle, setPageTitle] = useState(
    editPageDataNavbar
      ? editPageDataNavbar?.type === "page"
        ? editPageDataNavbar?.title
        : ""
      : ""
  );
  const [pageDetails, setPageDetails] = useState(
    editPageDataNavbar ? editPageDataNavbar?.details : null
  );
  const [pageCTA, setPageCTA] = useState(
    editPageDataNavbar
      ? editPageDataNavbar?.type === "page"
        ? editPageDataNavbar?.isCTA
        : ""
      : ""
  );

  const [linkTitle, setLinkTitle] = useState(
    editPageDataNavbar
      ? editPageDataNavbar?.type === "link"
        ? editPageDataNavbar?.title
        : ""
      : ""
  );
  const [linkURL, setLinkURL] = useState(
    editPageDataNavbar ? editPageDataNavbar?.url : ""
  );
  const [linkCTA, setLinkCTA] = useState(
    editPageDataNavbar
      ? editPageDataNavbar?.type === "link"
        ? editPageDataNavbar?.isCTA
        : ""
      : ""
  );

  const [textTitle, setTextTitle] = useState(
    editPageDataNavbar
      ? editPageDataNavbar?.type === "text"
        ? editPageDataNavbar?.title
        : ""
      : ""
  );

  const [openLinkType, setOpenLinkType] = useState(
    editPageDataNavbar ? editPageDataNavbar?.openLinkType : "new tab"
  );

  const handleSubmit = () => {
    const obj = {
      type: pageOption,
      id: uuidv4(),
      title:
        pageOption === "page"
          ? pageTitle
          : pageOption === "link"
          ? linkTitle
          : pageOption === "text"
          ? textTitle
          : "",
      isCTA:
        pageOption === "page"
          ? pageCTA
          : pageOption === "link"
          ? linkCTA
          : false,
      children: editPageDataNavbar ? editPageDataNavbar?.children : [],
      subTextType: textTypeOption,
      details: pageDetails,
      url: linkURL,
      visibility: ["top"],
      openLinkType: openLinkType
    };

    if (!obj?.title) {
      message.error("Please enter title");
      return;
    }

    if (obj?.type === "link" && !obj?.url) {
      message.error("Please enter url");
      return;
    }

    if (!subPageParentData && !editPageDataNavbar) {
      getSortedItems([...items, obj]);
      handleClose();
      return;
    }

    if(subPageParentData && !editPageDataNavbar){
      const payload = {
        children: [...subPageParentData.children, { ...obj, isChild: true }],
      };
      const data = addSubPageById(items, subPageParentData.id, payload);
      getSortedItems(data);
      handleClose();
      return;
    }

    if(!subPageParentData && editPageDataNavbar){
      const data = modifyNavPage(items, editPageDataNavbar?.id, obj);
      getSortedItems(data);
      handleClose();
    }
  };

  return (
    <div className="p-4">
      <HeaderTitle
        handleClose={handleClose}
        showLeftIcon={true}
        showRightIcon={false}
        title={
          subPageParentData && subPageParentData?.id
            ? "Add sub page"
            : editPageDataNavbar && editPageDataNavbar?.id
            ? "Edit"
            : "Add new page"
        }
      />

      {!editPageDataNavbar?.id && !subPageParentData?.id && (
        <div className="w-full my-4 flex items-center p-1 gap-2 rounded-[6px] bg-[#F8FAFB] border-[0.4px] border-solid border-[#ABB7C9] shadow-md">
          <div
            onClick={() => setPageOption("page")}
            className={`w-[33.33%] flex items-center justify-center p-1 gap-1 cursor-pointer font-medium text-sm ${
              pageOption === "page"
                ? "rounded shadow border-[0.4px] border-solid border-[78A6EC] bg-white text-[#347AE2]"
                : "text-[#74778B]"
            }`}
          >
            Page
          </div>

          <div
            onClick={() => setPageOption("link")}
            className={`w-[33.33%] flex items-center justify-center p-1 gap-1 cursor-pointer font-medium text-sm ${
              pageOption === "link"
                ? "rounded shadow border-[0.4px] border-solid border-[78A6EC] bg-white text-[#347AE2]"
                : "text-[#74778B]"
            }`}
          >
            Link
          </div>

          <div
            onClick={() => setPageOption("text")}
            className={`w-[33.33%] flex items-center justify-center p-1 gap-1 cursor-pointer font-medium text-sm ${
              pageOption === "text"
                ? "rounded shadow border-[0.4px] border-solid border-[78A6EC] bg-white text-[#347AE2]"
                : "text-[#74778B]"
            }`}
          >
            Text
          </div>
        </div>
      )}

      {!editPageDataNavbar?.id && subPageParentData?.id && (
        <div className="w-full my-4 flex items-center p-1 gap-2 rounded-[6px] bg-[#F8FAFB] border-[0.4px] border-solid border-[#ABB7C9] shadow-md">
          <div
            onClick={() => setPageOption("page")}
            className={`w-[50%] flex items-center justify-center p-1 gap-1 cursor-pointer font-medium text-sm ${
              pageOption === "page"
                ? "rounded shadow border-[0.4px] border-solid border-[78A6EC] bg-white text-[#347AE2]"
                : "text-[#74778B]"
            }`}
          >
            Page
          </div>

          <div
            onClick={() => setPageOption("link")}
            className={`w-[50%] flex items-center justify-center p-1 gap-1 cursor-pointer font-medium text-sm ${
              pageOption === "link"
                ? "rounded shadow border-[0.4px] border-solid border-[78A6EC] bg-white text-[#347AE2]"
                : "text-[#74778B]"
            }`}
          >
            Link
          </div>

          {/* <div
          onClick={() => setPageOption("text")}
          className={`w-[33.33%] flex items-center justify-center p-1 gap-1 cursor-pointer font-medium text-sm ${
            pageOption === "text"
              ? "rounded shadow border-[0.4px] border-solid border-[78A6EC] bg-white text-[#347AE2]"
              : "text-[#74778B]"
          }`}
        >
          Text
        </div> */}
        </div>
      )}

      {editPageDataNavbar?.id && !subPageParentData?.id && (
        <div className="w-full my-4 flex items-center p-1 gap-2 rounded-[6px] bg-[#F8FAFB] border-[0.4px] border-solid border-[#ABB7C9] shadow-md">
          <div
            // onClick={() => setPageOption("page")}
            className={`w-full items-center justify-center p-1 gap-1 font-medium text-sm ${
              pageOption === "page"
                ? "cursor-default flex rounded shadow border-[0.4px] border-solid border-[78A6EC] bg-white text-[#347AE2]"
                : "text-[#74778B] cursor-not-allowed hidden"
            }`}
          >
            Page
          </div>

          <div
            // onClick={() => setPageOption("link")}
            className={`w-full items-center justify-center p-1 gap-1 font-medium text-sm ${
              pageOption === "link"
                ? "cursor-default flex rounded shadow border-[0.4px] border-solid border-[78A6EC] bg-white text-[#347AE2]"
                : "text-[#74778B] hidden cursor-not-allowed"
            }`}
          >
            Link
          </div>

          <div
            // onClick={() => setPageOption("text")}
            className={`w-full items-center justify-center p-1 gap-1 font-medium text-sm ${
              pageOption === "text"
                ? "cursor-default flex rounded shadow border-[0.4px] border-solid border-[78A6EC] bg-white text-[#347AE2]"
                : "text-[#74778B] hidden cursor-not-allowed"
            }`}
          >
            Text
          </div>
        </div>
      )}

      {pageOption === "page" && (
        <div>
          <Input
            className="my-4 w-full rounded-lg border-[#ABB7C9]"
            addonAfter={
              <PiSmiley className="h-5 w-5 cursor-pointer text-[#4B4F5D]" />
            }
            placeholder="Title"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
          />

          <Select
            className="w-full rounded-lg !border-[#ABB7C9] mb-4"
            placeholder="Select gem or collection"
          ></Select>

          {!subPageParentData?.id && (
            <Checkbox
              checked={pageCTA}
              onChange={(e) => setPageCTA(e.target.checked)}
            >
              Call to action
            </Checkbox>
          )}

          <div
            className="mt-2 flex items-center justify-center p-2 gap-1 rounded-lg bg-[#E5F0FF] border border-solid border-[#B8D4FE] text-[#347AE2] text-base cursor-pointer"
            onClick={handleSubmit}
          >
            {subPageParentData && subPageParentData?.id
              ? "Add sub page"
              : editPageDataNavbar && editPageDataNavbar?.id
              ? "Save"
              : "Add page"}
          </div>
        </div>
      )}

      {pageOption === "link" && (
        <div>
          <Input
            className="my-4 w-full rounded-lg border-[#ABB7C9]"
            addonAfter={
              <PiSmiley className="h-5 w-5 cursor-pointer text-[#4B4F5D]" />
            }
            placeholder="Title"
            value={linkTitle}
            onChange={(e) => setLinkTitle(e.target.value)}
          />

          <Input
            placeholder="URL"
            className="w-full rounded-lg border-[#ABB7C9] mb-4"
            value={linkURL}
            onChange={(e) => setLinkURL(e.target.value)}
          />

          <Select
            className="w-full rounded-lg !border-[#ABB7C9] mb-4"
            placeholder="Select open link"
            onChange={(value) => setOpenLinkType(value)}
            value={openLinkType}
          >
            <Option value="new tab">New tab (default)</Option>
            <Option value="same tab">Same tab</Option>
          </Select>

          {!subPageParentData?.id && (
            <Checkbox
              checked={linkCTA}
              onChange={(e) => setLinkCTA(e.target.checked)}
            >
              Call to action
            </Checkbox>
          )}

          <div
            className="mt-2 flex items-center justify-center p-2 gap-1 rounded-lg bg-[#E5F0FF] border border-solid border-[#B8D4FE] text-[#347AE2] text-base cursor-pointer"
            onClick={handleSubmit}
          >
            {subPageParentData && subPageParentData?.id
              ? "Add sub page"
              : editPageDataNavbar && editPageDataNavbar?.id
              ? "Save"
              : "Add page"}
          </div>
        </div>
      )}

      {pageOption === "text" && !subPageParentData?.id && (
        <div>
          <Input
            className="mt-4 w-full rounded-lg border-[#ABB7C9]"
            addonAfter={
              <PiSmiley className="h-5 w-5 cursor-pointer text-[#4B4F5D]" />
            }
            placeholder="Title"
            value={textTitle}
            onChange={(e) => setTextTitle(e.target.value)}
          />

          <div className="w-full my-4 flex items-center p-1 gap-2 rounded-[6px] bg-[#F8FAFB] border-[0.4px] border-solid border-[#ABB7C9] shadow-md">
            <div
              onClick={() => setTextTypeOption("text")}
              className={`w-[50%] flex items-center justify-center p-1 gap-1 cursor-pointer font-medium text-sm ${
                textTypeOption === "text"
                  ? "rounded shadow border-[0.4px] border-solid border-[78A6EC] bg-white text-[#347AE2]"
                  : "text-[#74778B]"
              }`}
            >
              Text
            </div>

            {/* <div
              onClick={() => setTextTypeOption("header")}
              className={`w-[33.33%] flex items-center justify-center p-1 gap-1 cursor-pointer font-medium text-sm ${
                textTypeOption === "header"
                  ? "rounded shadow border-[0.4px] border-solid border-[78A6EC] bg-white text-[#347AE2]"
                  : "text-[#74778B]"
              }`}
            >
              Header
            </div> */}

            <div
              onClick={() => setTextTypeOption("button")}
              className={`w-[50%] flex items-center justify-center p-1 gap-1 cursor-pointer font-medium text-sm ${
                textTypeOption === "button"
                  ? "rounded shadow border-[0.4px] border-solid border-[78A6EC] bg-white text-[#347AE2]"
                  : "text-[#74778B]"
              }`}
            >
              Button
            </div>
          </div>

          <div
            className="mt-2 flex items-center justify-center p-2 gap-1 rounded-lg bg-[#E5F0FF] border border-solid border-[#B8D4FE] text-[#347AE2] text-base cursor-pointer"
            onClick={handleSubmit}
          >
            {subPageParentData && subPageParentData?.id
              ? "Add sub page"
              : editPageDataNavbar && editPageDataNavbar?.id
              ? "Save"
              : "Add page"}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddComponent;