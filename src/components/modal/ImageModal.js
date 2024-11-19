"use client"
import "./ImageModal.css"
import axios                                from "axios";
// import * as ReactIcons                      from 'react-icons/ri';
import { BiLogoUnsplash }                   from "react-icons/bi";
import { MagnifyingGlassIcon }              from "@heroicons/react/24/solid";
import { useDispatch }                      from "react-redux";
import { LoadingOutlined, UndoOutlined }    from "@ant-design/icons";
import { useState, useEffect, 
         useCallback }                      from "react";
import { FileUploader }                     from 'react-drag-drop-files'
import { CirclePicker }                     from "react-color"  
import EmojiPicker, { Emoji, EmojiStyle }   from 'emoji-picker-react';
import { Modal, Tabs, Radio, message, Spin,
         Button, Input, Row, Image, Col, 
         Select}   from "antd";
import { TbScreenshot, TbUpload }           from "react-icons/tb"
import { FiLink }                           from "react-icons/fi"
import ImageList                            from "@components/common/ImageList";
import { checkIsImgValid }                  from "../../utils/equalChecks";
import { TEXT_MESSAGE,
         debounceFunction,
         rgbToHex,
         GALLEY_UPLOAD_COLORS }             from "../../utils/constants";
import { takeScreenshotOfGivenPage }        from "../../utils/take-screenshot-site-images";
import { uploadIcons, uploadUnsplash }                      from "../../actions/collection";
import { removeDuplicateThumbnail }         from "../../utils/equalChecks";
// import { uploadBase64Img }                  from "../../actions/upload";

const fileTypes  = ["JPG", "PNG", "GIF","JPEG","WEBP"];
const {Option} = Select;

const ImageModal = ({
  platform,
  isSetResetOpt,
  onResetIcon,
  currentTab,
  onClose,
  currentIcon,
  currentThumbnail,
  onIconSelect,
  onThumbnailSelect,
  currentURL,
  siteImages = [],
  isBlogType = false,
  hideGallery = false,
  showResetIcon = false,
  setCoverSize = () => {},
  coverSize = "",
  action = "create",
  handleSaveCoverSize=() => {}
}) => {
  // const iconNames = Object.keys(ReactIcons);
  const dispatch = useDispatch();

  const [currentThumbnailMode, setCurrentThumbnailMode] =
    useState("screenshot");
  const [iconTab, setIconTab] = useState("emoji");
  const [coverTab, setCoverTab] = useState("gallery");
  const [loadingImg, setLoadingImg] = useState(false);
  const [takingScreenshot, setTakingScreenshot] = useState(false);
  const [uploadingUrl, setUploadingUrl] = useState(false);
  const [imgLink, setImgLink] = useState("");
  const [linkError, setLinkError] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(currentIcon || null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(
    currentThumbnail || null
  );
  const [searchedIcon, setSearchedIcon] = useState([]);
  const [searchImages, setSearchImages] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [randomImages, setRandomImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [searchLoading, setSearchLoding] = useState(false);
  const [newSiteImages, setNewSiteImages] = useState(siteImages || []);

  useEffect(() => {
    const getCall = async () => {
      setSearchLoding(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_UNSPLASH_API}/photos/random?count=12&&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_ACCESS_KEY}`
      );
      setRandomImages(res.data);
      setSearchLoding(false);
    };

    getCall();
  }, [
    process.env.NEXT_PUBLIC_UNSPLASH_API_ACCESS_KEY,
    process.env.NEXT_PUBLIC_UNSPLASH_API,
  ]);

  const getSearchPhotos = useCallback(
    async (value) => {
      if (totalPages && page > totalPages) return;
      setSearchLoding(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_UNSPLASH_API}/search/photos?query=${value}&per_page=12&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_ACCESS_KEY}&page=${page}`
      );
      setSearchImages([...searchImages, ...res.data.results]);
      setTotalPages(res.data.total_pages);
      setPage(page + 1);
      setSearchLoding(false);
    },
    [page, searchImages, totalPages]
  );

  const handleSearchChange = useCallback(
    (value) => {
      if (!value) {
        setSearchImages([]);
        setPage(1);
        setTotalPages(null);
        return;
      }

      setSearchText(value);
      getSearchPhotos(value);
    },
    [getSearchPhotos]
  );

  const debounceOnChange = useCallback(
    debounceFunction(handleSearchChange, 500),
    []
  );

  const onFileChange = async (files, type) => {
    if (files.length === 0) {
      message.error("Please select a file.");
      return;
    }
    const fileSize = files[0].size / 1024 / 1024; // Convert to MB
    // if (type === "icons" && fileSize > 5) {
    //     message.error(TEXT_MESSAGE.FILE_SIZE_ERROR);
    //     return
    // }
    setLoadingImg(true);
    const formData = new FormData();
    formData.append("file", files[0]);
    const res =
      isBlogType || hideGallery
        ? await dispatch(uploadIcons(formData, false, null, null))
        : await dispatch(uploadIcons(formData, true, null, null));
    setLoadingImg(false);
    if (res.error === undefined) {
      if (type === "icons") {
        const iconObj = {
          icon: res.payload?.data?.message || "",
          type: "image",
        };
        setSelectedIcon(iconObj);
        onIconSelect(iconObj);
      } else {
        setSelectedThumbnail(res.payload?.data?.message || "");
        onThumbnailSelect(
          platform === "gem"
            ? res.payload?.data?.message || ""
            : {
                type: "upload",
                icon: res.payload?.data?.message || "",
                imagePosition: {
                  x: 50,
                  y: 50,
                },
                size: coverSize,
              }
        );
      }
    } else {
      message.error("An error occured while uploading image.");
    }
  };

  const onLinkChange = (e) => {
    const { value } = e.target;
    setImgLink(value);
    setLinkError("");
  };

  const onLinkSubmit = async (type) => {
    setUploadingUrl(true);
    const isImgValidSrc = await checkIsImgValid(imgLink);
    setUploadingUrl(false);
    setImgLink("");
    if (!isImgValidSrc) {
      setLinkError(
        "Please give valid image url this url may be broken or not valid."
      );
      return;
    }
    if (type === "icons") {
      const iconObj = {
        type: "image",
        icon: isImgValidSrc,
      };
      setSelectedIcon(iconObj);
      onIconSelect(iconObj);
    } else {
      setSelectedThumbnail(isImgValidSrc);
      onThumbnailSelect(
        platform === "gem"
          ? isImgValidSrc
          : {
              type: "upload",
              icon: isImgValidSrc,
              imagePosition: {
                x: 50,
                y: 50,
              },
              size: coverSize,
            }
      );
    }
  };

  const onImgClick = async (img, index) => {
    if (currentThumbnailMode === "screenshot" && index === 0) {
      // Take screenshot of given url
      setTakingScreenshot(true);
      const base64 = await takeScreenshotOfGivenPage(currentURL);
      if (typeof base64 === "object" && base64.status === 400) {
        setTakingScreenshot(false);
        message.error(base64.message);
        return;
      }
      setTakingScreenshot(false);
      setSelectedThumbnail(base64);
      onThumbnailSelect(base64);
      return;
    }
    setSelectedThumbnail(img);
    onThumbnailSelect(img);
  };

  const onEmojiClick = (emoji) => {
    const iconObj = {
      type: "emoji",
      icon: emoji.unified,
    };
    setSelectedIcon(iconObj);
    onIconSelect(iconObj);
  };

  const onColorChangeClick = (color) => {
    const iconObj = {
      type: "color",
      icon: color.hex,
    };
    setSelectedIcon(iconObj);
    onIconSelect(iconObj);
  };

  const onIconClick = (iconName) => {
    const iconObj = {
      type: "icon",
      icon: iconName,
    };
    setSelectedIcon(iconObj);
    onIconSelect(iconObj);
  };

  // const onIconSearch = (e) => {
  //     const { value } = e.target;
  //     setTimeout(() => {
  //         setSearchedIcon(
  //             iconNames.filter((item) =>
  //                 item.toLowerCase().trim().includes(value.toLowerCase().trim())
  //             )
  //         );
  //     }, 500);
  // }

  const onGalleryClick = (e) => {
    const color = rgbToHex(e.target.style.background);
    setSelectedThumbnail(color);
    onThumbnailSelect({
      type: "gallery",
      icon: color,
      size: coverSize,
    });
  };

  const onUnsplashClick = async (img) => {
    const formData = new FormData();
    formData.append("fileLink", img);
    const res = await dispatch(uploadUnsplash(formData, false));
    if (res.error === undefined) {
      setSelectedThumbnail(res.payload?.data?.message || "");
      onThumbnailSelect(
        isBlogType && platform === "gem"
          ? res.payload?.data?.message || ""
          : {
              type: "upload",
              icon: res.payload?.data?.message || "",
              imagePosition: {
                x: 50,
                y: 50,
              },
              size: coverSize,
            }
      );
    } else {
      setSelectedThumbnail(img);
      onThumbnailSelect(
        isBlogType && platform === "gem"
          ? img
          : {
              type: "upload",
              icon: img,
              imagePosition: {
                x: 50,
                y: 50,
              },
              size: coverSize,
            }
      );
    }
  };

  const onImageError = (e) => {
    const idx = newSiteImages.indexOf(e.target.src);
    if (idx > -1) {
      newSiteImages.splice(idx, 1);
      setNewSiteImages([...newSiteImages]);
    }
    // e.target?.parentElement?.parentElement?.remove()
  };

  const renderLinkOption = (type = "thumbnail") => {
    return (
      <div className="flex flex-col mb-5">
        <div className="flex w-full">
          <Input
            placeholder="Paste link to an image"
            onChange={onLinkChange}
            value={imgLink}
            className="mr-1 h-[33px]"
          />
          <Button
            type="primary"
            onClick={() => onLinkSubmit(type)}
            className="ct-image-modal-btn"
          >
            {uploadingUrl ? (
              <LoadingOutlined
                style={{ fontSize: 24, color: "white", display: "flex" }}
                spin
              />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
        {linkError && <label className="error-label">{linkError}</label>}
      </div>
    );
  };

  const renderUploadOption = (type = "thumbnail") => {
    return (
      <>
        <FileUploader
          handleChange={(files) => onFileChange(files, type)}
          name="drop-zone-section-file"
          types={fileTypes}
          onTypeError={(err) => message.error(err)}
          multiple={true}
          disabled={loadingImg}
        >
          <div className="mb-5 w-full h-[155px] bg-white border-2 border-dashed border-gray-400 flex text-center justify-center align-middle items-center">
            <div>
              <TbUpload
                className="h-6 w-6 text-gray-500 my-0 mx-auto mb-2"
                disabled={loadingImg}
              />
              <span>Drag & drop to upload attachment</span>
              <div className="flex justify-center items-center gap-2 mt-2">
                <hr className="w-12" />
                <span className="text-gray-500">OR</span>
                <hr className="w-12" />
              </div>
              <Button variant="mt-2 primary" disabled={loadingImg}>
                Browse Attachment
              </Button>
            </div>
          </div>
        </FileUploader>
      </>
    );
  };

  const renderCollectionUploadPanel = () => {
    const filteredImgs = removeDuplicateThumbnail(newSiteImages);
    const images = [...filteredImgs];
    return (
      <div>
        {renderLinkOption()}
        {renderUploadOption()}
        <div className="mt-4">
          <Row gutter={[8, 8]} justify={"space-between"}>
            {images.map((img, index) => {
              if (!img) return null;
              return (
                <Col
                  span={12}
                  className="w-full h-full"
                  onClick={() => {
                    setSelectedThumbnail(img);
                    onThumbnailSelect({
                      size: coverSize,
                      type: "upload",
                      icon: img,
                      imagePosition: {
                        x: 50,
                        y: 50,
                      },
                    });
                  }}
                >
                  <div
                    className={`ct-img-col ct-row-border ct-inner-col-div ${
                      selectedThumbnail === img ? "ct-selected-thumbnail" : ""
                    }`}
                  >
                    <Image
                      wrapperClassName={`ct-img-wrapper`}
                      className="ct-img ct-img-scale-down"
                      src={img}
                      onError={onImageError}
                      preview={false}
                    />
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  };

  const renderThumbnailTab = () => {
    const filteredImgs = removeDuplicateThumbnail(newSiteImages);
    const images =
      currentThumbnailMode === "screenshot"
        ? [
            `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/take-screenshot-img.png`,
            ...filteredImgs,
          ]
        : [...filteredImgs];
    return (
      <div className="flex flex-col">
        <div className="flex justify-between items-center w-full mb-5">
          <Radio.Group
            className="flex justify-center items-center"
            optionType="button"
            buttonStyle="solid"
            value={currentThumbnailMode}
            onChange={(e) => setCurrentThumbnailMode(e.target.value)}
          >
            <Radio.Button className="flex items-center" value={"screenshot"}>
              <TbScreenshot size={18} />
            </Radio.Button>
            <Radio.Button className="flex items-center" value={"upload"}>
              <TbUpload size={18} />
            </Radio.Button>
            <Radio.Button className="flex items-center" value={"link"}>
              <FiLink size={18} />
            </Radio.Button>
            {isBlogType && (
              <Radio.Button className="flex items-center" value={"unsplash"}>
                <BiLogoUnsplash size={18} />
              </Radio.Button>
            )}
          </Radio.Group>
          <div className="flex items-center">
            {isSetResetOpt && (
              <Button
                type="text"
                onClick={() => {
                  setSelectedThumbnail(null);
                  onResetIcon("thumbnail");
                }}
                className="ct-button-contents"
              >
                <UndoOutlined />
              </Button>
            )}
            <Button
              type="text"
              className="error-label"
              onClick={() => {
                setSelectedThumbnail(null);
                onThumbnailSelect(null);
              }}
            >
              Remove
            </Button>
          </div>
        </div>
        <div className="">
          {currentThumbnailMode === "link"
            ? renderLinkOption()
            : currentThumbnailMode === "upload"
            ? renderUploadOption()
            : currentThumbnailMode === "unsplash"
            ? renderUnsplash()
            : null}
          <Row gutter={[8, 8]} justify={"space-between"}>
            {images.map((img, index) => {
              if (!img) return null;
              if (
                currentThumbnailMode === "screenshot" &&
                index === 0 &&
                takingScreenshot
              ) {
                return (
                  <Col span={12} className="w-full h-full">
                    <div className="ct-img-col flex items-center justify-center">
                      <Spin tip="Processing Screenshot..." />
                    </div>
                  </Col>
                );
              }
              if (currentThumbnailMode === "screenshot" && index === 0) {
                return (
                  <Col
                    span={12}
                    className="w-full h-full"
                    onClick={() => onImgClick(img, index)}
                  >
                    <div className="flex flex-col items-center justify-center ct-img-col ct-row-border">
                      <TbScreenshot className="w-5 h-5" />
                      <span className="text-gray-500">Take Screenshot</span>
                    </div>
                  </Col>
                );
              }
              return (
                <Col
                  span={12}
                  className="w-full h-full"
                  onClick={() => onImgClick(img, index)}
                >
                  <div
                    className={`ct-img-col ${
                      currentThumbnailMode === "screenshot" && index === 0
                        ? ""
                        : "ct-row-border"
                    } ct-inner-col-div ${
                      selectedThumbnail === img ? "ct-selected-thumbnail" : ""
                    }`}
                  >
                    <Image
                      wrapperClassName={`ct-img-wrapper ${
                        currentThumbnailMode === "screenshot" && index === 0
                          ? "w-full"
                          : ""
                      }`}
                      className={`ct-img ${
                        currentThumbnailMode === "screenshot" && index === 0
                          ? ""
                          : "ct-img-scale-down"
                      }`}
                      src={img}
                      preview={false}
                      onError={onImageError}
                    />
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  };

  const renderCustomArea = () => {
    const filteredImgs = removeDuplicateThumbnail(newSiteImages);
    const images = [...filteredImgs];
    return (
      <div>
        {renderLinkOption("icons")}
        {renderUploadOption("icons")}
        <div className="mt-4">
          <Row gutter={[8, 8]} justify={"space-between"}>
            {images.map((img, index) => {
              if (!img) return null;
              return (
                <Col
                  span={12}
                  className="w-full h-full"
                  onClick={() => {
                    setSelectedIcon(img);
                    onIconSelect({ type: "image", icon: img });
                  }}
                >
                  <div
                    className={`ct-img-col ct-row-border ct-inner-col-div ${
                      selectedThumbnail === img ? "ct-selected-thumbnail" : ""
                    }`}
                  >
                    <Image
                      wrapperClassName={`ct-img-wrapper`}
                      className="ct-img ct-img-scale-down"
                      src={img}
                      preview={false}
                      onError={onImageError}
                    />
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  };

  const renderEmojiArea = () => {
    return (
      <EmojiPicker
        onEmojiClick={onEmojiClick}
        autoFocusSearch={false}
        width={"100%"}
        previewConfig={{
          defaultCaption: "Pick one!",
          defaultEmoji: "1f92a",
        }}
      />
    );
  };

  const renderColorArea = () => {
    return (
      <CirclePicker
        color={selectedIcon || ""}
        onChange={onColorChangeClick}
        width="100%"
      />
    );
  };

  // const renderIconsArea = () => {
  //     return(
  //         <>
  //             <div className="mb-4">
  //                 <Input placeholder="Search Icon" onChange={onIconSearch} />
  //             </div>
  //             <div className="div-icon-list" style={{height:'450px',overflow:'hidden',overflowY:'auto'}}>
  //             {searchedIcon?.length > 0
  //                 ? searchedIcon.map((iconName) => {
  //                     const Icon = ReactIcons[iconName];

  //                     return (
  //                     <div
  //                         className="div-icon cursor-pointer"
  //                         key={iconName}
  //                         onClick={() => onIconClick(iconName)}
  //                     >
  //                         <Icon />
  //                     </div>
  //                     );
  //                 })
  //                 : iconNames.map((iconName) => {
  //                     const Icon = ReactIcons[iconName];

  //                     return (
  //                     <div
  //                         className="div-icon cursor-pointer"
  //                         key={iconName}
  //                         onClick={() => onIconClick(iconName)}
  //                     >
  //                         <Icon />
  //                     </div>
  //                     );
  //                 })}
  //             </div>
  //         </>
  //     )
  // }

  const renderIconsTab = () => {
    // const Icon = selectedIcon?.type === "icon" ? ReactIcons[selectedIcon?.icon] : null
    return (
      <div className="ct-icon-tab-container">
        <div className="flex justify-between items-center">
          <span className="ct-selected-icon-txt flex items-center">
            <span className="mr-1">Your selected icon is:</span>{" "}
            {selectedIcon ? (
              selectedIcon.type === "emoji" ? (
                <Emoji
                  unified={selectedIcon.icon}
                  emojiStyle={EmojiStyle.APPLE}
                  size={22}
                />
              ) : selectedIcon.type === "color" ? (
                <div
                  style={{
                    height: "20px",
                    width: "20px",
                    borderRadius: "50%",
                    background: selectedIcon.icon,
                  }}
                ></div>
              ) : selectedIcon.type === "image" ? (
                <img
                  src={selectedIcon.icon}
                  className="w-[20px] h-[20px]"
                  alt="Selected gem"
                />
              ) : // : Icon
              //    ? <div><Icon style={{ width: 24, height: 24 }} /></div>
              null
            ) : null}
          </span>
          <div className="flex items-center">
            {(isSetResetOpt || showResetIcon) && (
              <Button
                type="text"
                onClick={() => {
                  setSelectedIcon(null);
                  onResetIcon("icons");
                }}
                className="ct-button-contents"
              >
                <UndoOutlined />
              </Button>
            )}
            <Button
              type="text"
              className="error-label"
              onClick={() => {
                setSelectedIcon(null);
                onIconSelect(null);
              }}
            >
              Remove
            </Button>
          </div>
        </div>
        <Tabs
          defaultActiveKey={iconTab}
          onChange={(val) => setIconTab(val)}
          items={[
            {
              key: "emoji",
              label: "Emoji",
              children: renderEmojiArea(),
            },
            {
              key: "color",
              label: "Color",
              children: renderColorArea(),
            },
            // {
            //     key: "icons",
            //     label: "Icons",
            //     children: renderIconsArea()
            // },
            {
              key: "custom",
              label: "Custom",
              children: renderCustomArea(),
            },
          ]}
        />
      </div>
    );
  };

  const renderGallery = () => {
    return (
      <div className="w-full flex flex-wrap py-0">
        {GALLEY_UPLOAD_COLORS.map((item) => (
          <div
            className="w-[25%] p-1 cursor-pointer"
            key={item.id}
            onClick={(e) => onGalleryClick(e)}
          >
            <div
              className={`w-[120px] h-[64px] rounded-[3px]`}
              style={{ background: item.bg }}
            ></div>
          </div>
        ))}
      </div>
    );
  };

  const renderUnsplash = () => {
    return (
      <>
        <Input
          placeholder="Search for an image"
          className="mb-4 rounded-[50px]"
          onChange={(e) => debounceOnChange(e.target.value)}
          prefix={<MagnifyingGlassIcon className="h-4 w-4 text-[#a8a1a1]" />}
        />

        <div className="w-full flex flex-wrap py-0">
          <ImageList
            data={searchImages.length > 0 ? searchImages : randomImages}
            handleUnSplashUploadChange={onUnsplashClick}
          />
        </div>

        {searchLoading && (
          <div className="flex items-center justify-center my-1">
            <Spin size="middle" tip="Loading..." />
          </div>
        )}

        {searchImages?.length > 0 && (
          <div className="text-center">
            <Button
              type="link"
              onClick={(e) => {
                e.stopPropagation();
                getSearchPhotos(searchText);
              }}
            >
              See more
            </Button>
          </div>
        )}
      </>
    );
  };

  const renderCoverTab = () => {
    return (
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center mr-2">
            <div className="mr-2">Your selected cover is:</div>
            {currentThumbnail &&
              (currentThumbnail.type === "image" ||
                currentThumbnail.type === "upload") && (
                <img
                  src={currentThumbnail.icon || ""}
                  alt="cover"
                  className="h-[100px]"
                />
              )}
            {currentThumbnail && currentThumbnail.type === "unsplash" && (
              <img
                src={currentThumbnail.icon}
                alt="cover"
                className="h-[100px]"
              />
            )}
            {currentThumbnail && currentThumbnail.type === "gallery" && (
              <div
                className="mr-2 h-[100px] w-[100px]"
                style={{ backgroundColor: currentThumbnail.icon }}
              ></div>
            )}
          </div>
          <Button
            type="text"
            className="error-label"
            onClick={() => {
              setSelectedIcon(null);
              onThumbnailSelect(null);
            }}
          >
            Remove
          </Button>
        </div>
        {action === "create" ? (
          <></>
        ) : (
          <div className="my-1 flex items-center">
            <div className="mr-1 text-md">Choose size</div>
            <Select
              className="w-fit"
              placeholder="Select size"
              onChange={(value) => {
                if (action === "blog") {
                  handleSaveCoverSize(value);
                } else {
                  setCoverSize(value);
                  onClose();
                }
              }}
              value={coverSize}
            >
              <Option value="small">Minimal (1600x105px)</Option>
              <Option value="default">Default (1600x350px)</Option>
              <Option value="expanded">Expanded (1600x600px)</Option>
            </Select>
          </div>
        )}
        <Tabs
          defaultActiveKey={coverTab}
          onChange={(val) => setCoverTab(val)}
          items={
            hideGallery
              ? [
                  {
                    label: `Upload`,
                    key: "upload",
                    children: renderCollectionUploadPanel(),
                  },
                  {
                    label: (
                      <div className="flex items-center">
                        <BiLogoUnsplash className="h-5 w-5 mr-1" />
                        <div>Unsplash</div>
                      </div>
                    ),
                    key: "unsplash",
                    children: renderUnsplash(),
                  },
                ]
              : [
                  {
                    label: `Gallery`,
                    key: "gallery",
                    children: renderGallery(),
                  },
                  {
                    label: `Upload`,
                    key: "upload",
                    children: renderCollectionUploadPanel(),
                  },
                  {
                    label: (
                      <div className="flex items-center">
                        <BiLogoUnsplash className="h-5 w-5 mr-1" />
                        <div>Unsplash</div>
                      </div>
                    ),
                    key: "unsplash",
                    children: renderUnsplash(),
                  },
                ]
          }
        />
      </div>
    );
  };

  const collectionTabs = [
    {
      key: "covers",
      label: "Covers",
      children: renderCoverTab(),
    },
    {
      key: "favicon",
      label: "Favicon",
      children: renderIconsTab(),
    },
  ];

  const gemTabs = [
    {
      key: "thumbnail",
      label: "Thumbnail",
      children: renderThumbnailTab(),
    },
    {
      key: "favicon",
      label: "Favicon",
      children: renderIconsTab(),
    },
  ];

  return (
    <Modal open={true} footer={null} onCancel={onClose}>
      <Tabs
        defaultActiveKey={currentTab}
        items={platform === "collection" ? collectionTabs : gemTabs}
      />
    </Modal>
  );
};

export default ImageModal