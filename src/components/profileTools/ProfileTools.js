import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "antd";
import { HiOutlinePlus } from "react-icons/hi";
import SearchToolIcon from "./SearchToolIcon";
import FileIcon from "./FileIcon";
import SendIcon from "./SendToolIcon";

const ProfileTools = () => {
  const [isRotated, setIsRotated] = useState(false);
  const [openTools, setOpenTools] = useState(false);
  const { isMobileView } = useSelector((state) => state.app);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isRotated && e.target.closest(".rotate-icon") === null) {
        setIsRotated(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isRotated]);

  const toggleRotation = () => {
    setIsRotated(!isRotated);
  };

  const dropdownRenderToolsUI = () => {
    return (
      <div className="bg-white z-50 p-3 rounded-lg shadow-lg border-[0.5px] cursor-pointer flex flex-col mb-3 gap-2">
        <div>
          <SearchToolIcon />
        </div>
        <div>
          <FileIcon />
        </div>
        <div class="border-t border-[#E5F0FF] my-2 border-2"></div>
        <div>
            <SendIcon/>
        </div>
      </div>
    );
  };

  return (
    <>
      {isMobileView && (
        <>
          <Dropdown
            width={"100%"}
            trigger={["click"]}
            placement="top"
            // open={openTools}
            dropdownRender={() => dropdownRenderToolsUI()}
          >
            <div
              className={`fixed bottom-14 right-5 cursor-pointer group bg-[#347AE2] ${
                isRotated && "bg-[#C85C54]"
              } text-white p-3 rounded-xl shadow-lg z-[999] rotate-icon`}
              onClick={toggleRotation}
            >
              <HiOutlinePlus
                className="h-6 w-6 text-white"
                style={{
                  transform: `rotate(${isRotated ? "-45deg" : "0deg"})`,
                  transition: "transform 0.2s ease-in-out",
                }}
              />
            </div>
          </Dropdown>
        </>
      )}
    </>
  );
};

export default ProfileTools;
