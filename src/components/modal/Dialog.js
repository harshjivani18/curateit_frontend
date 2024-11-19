'use client'
// import * as ReactIcons from "react-icons/ri";
import { Modal, Tabs, message, Button, Input } from "antd";
import EmojiPicker, { Emoji, EmojiStyle } from "emoji-picker-react";
import { FileUploader } from "react-drag-drop-files";
import { FiUpload } from "react-icons/fi";
import { CirclePicker } from "react-color";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdRefresh } from "react-icons/io";
import { getBookmarkDetailsMicrolink } from "@actions/bookmark";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "WEBP"];

const DialogModal = ({
  open,
  handleEmoji,
  selectedEmoji,
  selectedColor,
  handleColor,
  handleImageUploadChange,
  handleCoverModalSubmit,
  selectedImage,
  resetCancelValues,
  loadingImg,
  handleIcon,
  selectedIcon,
  handleRemoveIconModalSubmit,
  action = "",
  setSelectedColor =() => {},
  setSelectedEmoji =() => {},
  setSelectedImage =() => {},
  setSelectedIcon =() => {},
  setLoadingImg =() => {},
  setOpenIconModal= () => {},setFavIconSrc=() => {},setDefaultFavIconSrc=() => {},
  singleBookmarkGem='',defaultFavIconSrc=''
}) => {
  const [tabKey, setTabKey] = useState("Emoji");
  // const iconNames = Object.keys(ReactIcons);
  // const [searchedIcon, setSearchedIcon] = useState([]);
  const { isMobileView } = useSelector((state) => state.app);
  const dispatch = useDispatch()

  // const handleSearchIcon = (e) => {
  //   const { value } = e.target;
  //   setTimeout(() => {
  //     setSearchedIcon(
  //       iconNames.filter((item) =>
  //         item.toLowerCase().trim().includes(value.toLowerCase().trim())
  //       )
  //     );
  //   }, 500);
  // };

  const renderEmoji = () => {
    return (
      <>
        <div className="mt-2">
          <EmojiPicker
            onEmojiClick={handleEmoji}
            autoFocusSearch={false}
            previewConfig={{
              defaultCaption: "Pick one!",
              defaultEmoji: "1f92a",
            }}
            width={isMobileView ? "fit-content" : "100%"}
          />
        </div>
      </>
    );
  };

  const renderColor = () => {
    return (
      <>
        <CirclePicker color={selectedColor} onChange={handleColor} />
      </>
    );
  };

  // const renderIcons = () => {
  //   return (
  //     <div>
  //       <div className="mb-4">
  //         <Input placeholder="Search Icon" onChange={handleSearchIcon} />
  //       </div>

  //       <div
  //         className="div-icon-list"
  //         style={{ height: "450px", overflow: "hidden", overflowY: "auto" }}
  //       >
  //         {searchedIcon?.length > 0
  //           ? searchedIcon.map((iconName) => {
  //               const Icon = ReactIcons[iconName];

  //               return (
  //                 <div
  //                   className="div-icon cursor-pointer"
  //                   key={iconName}
  //                   onClick={() => handleIcon(iconName)}
  //                 >
  //                   <Icon />
  //                 </div>
  //               );
  //             })
  //           : iconNames.map((iconName) => {
  //               const Icon = ReactIcons[iconName];

  //               return (
  //                 <div
  //                   className="div-icon cursor-pointer"
  //                   key={iconName}
  //                   onClick={() => handleIcon(iconName)}
  //                 >
  //                   <Icon />
  //                 </div>
  //               );
  //             })}
  //       </div>
  //     </div>
  //   );
  // };

  // const displayIcon = (iconName) => {
  //   const Icon = ReactIcons[iconName];
  //   return <Icon className="h-5 w-5" />;
  // };

  const renderImageUpload = () => {
    return (
      <>
        <FileUploader
          handleChange={handleImageUploadChange}
          name="drop-zone-section-file"
          types={fileTypes}
          onTypeError={(err) => message.error(err)}
          disabled={loadingImg}
        >
          <div
            className={`my-0 mx-auto ${
              isMobileView ? "w-[100%]" : "w-[348px]"
            } h-[218px] bg-white border-2 border-dashed border-gray-400 flex text-center justify-center align-middle items-center`}
          >
            <div>
              <FiUpload
                className="h-6 w-6 text-gray-500 my-0 mx-auto mb-2"
                disabled={loadingImg}
              />
              <span>Drag & drop to upload file</span>
              <div className="flex justify-center items-center gap-2 mt-2">
                <hr className="w-12" />
                <span className="text-gray-500">OR</span>
                <hr className="w-12" />
              </div>
              <Button variant="mt-2 primary" disabled={loadingImg}>
                Browse File
              </Button>
            </div>
          </div>
        </FileUploader>

        <div className="mt-3 w-full flex items-center justify-center flex-col">
          <div className="text-sm text-[#37352fa6]">
            Recommended size is 280 × 280 pixels
          </div>
          <div className="text-sm text-[#37352fa6] mt-2">
            The maximum size per file is 5 MB.
          </div>
        </div>
      </>
    );
  };

  const handleTabChange = (key) => {
    setTabKey(key);
  };


    const handleRefresh = async() => {
        if(defaultFavIconSrc){
            setFavIconSrc({
                type:'image',
                icon: defaultFavIconSrc
            })
            setSelectedEmoji('')
            setSelectedColor('')
            setSelectedImage('')
            setSelectedIcon('')
            setOpenIconModal(false)
            return;
        }

        try {
          const url     = encodeURIComponent(`${singleBookmarkGem?.url}`);
          setLoadingImg(true)

          const res = await dispatch(getBookmarkDetailsMicrolink(url))

          if (res?.payload?.data?.data?.microlink?.status === 'success'){
            const { data } = res?.payload?.data?.data?.microlink;
            setFavIconSrc({
                type:'image',
                icon: data?.image?.url || ''
              })
            setDefaultFavIconSrc(data?.image?.url || '')
            setLoadingImg(false)
          }else{
            setLoadingImg(false)
            setOpenIconModal(false)
            message.error('Error occured. Cant able to get favicon')
          }

        } catch (error) {
          setLoadingImg(false)
          setOpenIconModal(false)
          message.error('Error occured. Cant able to get favicon')
        }
    }

  const modalTitle = (
    <div className="flex justify-between items-center pr-8">
      Choose icon{" "}
      
      <div className='flex items-center'>
        {singleBookmarkGem && <IoMdRefresh className="w-5 h-5 text-gray-700 hover:text-[#347AE2] mr-2 cursor-pointer" onClick={handleRefresh}/>}
      <button
        onClick={handleCoverModalSubmit}
        className=" bg-[#40a9ff] text-white p-2 font-normal text-sm rounded-sm"
      >
        Save
      </button>
      </div>
    </div>
  );
  return (
    <>
      {open && (
        <Modal
          title={modalTitle}
          open={open}
          footer={null}
          maskClosable={false}
          onCancel={() => resetCancelValues()}
          width={isMobileView ? "90%" : "550px"}
        >
          <div className="pt-1">
            <div className="mb-1">
              <div
                className="flex items-center justify-between"
                style={{ wordBreak: "break-word" }}
              >
                <div className="flex items-center mr-2">
                  <div className="mr-2">Your selected icon is:</div>
                  {selectedEmoji ? (
                    <Emoji
                      unified={selectedEmoji.unified || selectedEmoji || ""}
                      emojiStyle={EmojiStyle.APPLE}
                      size={22}
                    />
                  ) : selectedColor ? (
                    <div
                      style={{
                        height: "20px",
                        width: "20px",
                        borderRadius: "50%",
                        background: selectedColor,
                      }}
                    ></div>
                  ) : selectedImage ? (
                    <div>
                    {typeof selectedImage === 'string' && (selectedImage.includes('aws') || selectedImage.includes('http')) ? (
                      <div className="ml-2">
                        <img src={selectedImage} alt="Selected icon" className="h-[50px] w-[50px]" />
                      </div>
                    ) : (
                      <div>
                        {selectedImage.name ? (
                          <div>
                            {selectedImage.name}
                          </div>
                        ) : (
                          <div>{selectedImage || selectedImage.name || ""}</div>
                        )}
                      </div>
                    )}
                  </div>
                  ) : null}
                  {/* // ) : selectedIcon ? (
                  //   <div>{displayIcon(selectedIcon)}</div>
                  // ) : null} */}
                </div>

                {(selectedEmoji ||
                  selectedColor ||
                  selectedImage ||
                  selectedIcon) &&
                  action === "" && (
                    <div className="">
                      <Button
                        type="text"
                        className="text-[#EB5757] hover:text-[#EB5757]"
                        onClick={handleRemoveIconModalSubmit}
                        disabled={loadingImg}
                      >
                        Remove Icon{" "}
                      </Button>
                    </div>
                  )}
              </div>
            </div>
            <Tabs
              defaultActiveKey={tabKey}
              onChange={handleTabChange}
              items={[
                {
                  label: `Emoji`,
                  key: "Emoji",
                  children: renderEmoji(),
                },
                {
                  label: `Color`,
                  key: "Color",
                  children: renderColor(),
                },
                // {
                //   label: `Icons`,
                //   key: "Icons",
                //   children: renderIcons(),
                // },
                {
                  label: `Upload`,
                  key: "Upload",
                  children: renderImageUpload(),
                },
              ]}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default DialogModal;
