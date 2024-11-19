"use client";
import "./AiProfile.css";

import axios                      from "axios";
import { useEffect, useState }    from "react";
import {
  Spin,
  message,
  Dropdown,
  Select,
  Button,
  Switch,
  Slider,
  InputNumber,
}                                 from "antd";
import { useDispatch }            from "react-redux";
import { HiDownload }             from "react-icons/hi";
import { ChromePicker }           from "react-color";
import { PiPencilSimple }         from "react-icons/pi";
import debounce                   from "lodash/debounce";
import { FileUploader }           from "react-drag-drop-files";
import { FiUpload }               from "react-icons/fi";
import { TrashIcon }              from "@heroicons/react/24/outline";

import { 
  updateUser, 
  uploadProfileImage 
}                                 from "@actions/user";
import { deleteImageFromS3 }      from "@actions/collection";
import session                    from "@utils/session";
import { 
  TextMessage,
  backgroundGradients,
  backgroundColors,
  outlineColors
}                                 from "@utils/constants";
import { setOnboardingUserPreference } from "@actions/app";
import { MdOutlineRefresh } from "react-icons/md";
import AiPreviewImageComponent from "@components/common/AiPreviewImageComponent";

const FILETYPES = ["JPG", "PNG", "JPEG"];

const { Option } = Select;
const apiKey = process.env.NEXT_PUBLIC_PICSART_API_KEY;

const AiProfile = ({
  user,
  isMobile,
  fromOnboarding = false,
  handleRemoved = () => {},
}) => {
  const dispatch = useDispatch();
  const [profileImg, setProfileImg] = useState(user?.profilePhoto || "");
  const [noBgImage, setNoBgImage] = useState(
    user?.preferences?.userProfilePreferences?.bgRemovedProfilePhoto || ""
  );
  const [previewImage, setPreviewImage] = useState(user?.profilePhoto || "");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [combinedImages, setCombinedImages] = useState([]);
  //state for shape change
  const [borderRadius, setBorderRadius] = useState("50%");
  const [selectedOption, setSelectedOption] = useState("solid");
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#fff");
  const [currentRGBColor, setCurrentRGBColor] = useState("#fff");
  const [combinedImageUrl, setCombinedImageUrl] = useState("#fff");
  const [openEditDropDown, setOpenEditDropDown] = useState(false);
  const [toggleOutline, setToggleOutline] = useState(false);
  const [zoomInputValue, setZoomInputValue] = useState("1");
  const [toggleShadow, setToggleShadow] = useState(false);
  const [shadowOffsetWidth, setShadowOffsetWidth] = useState("10");
  const [selectedOutlineColor, setSelectedOutlineColor] = useState("#A5EA20");
  const [backgroundGalleryImage, setBackgroundGalleryImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [restorePhoto, setRestorePhoto] = useState(
    user?.preferences?.userProfilePreferences?.backupProfilePhoto || ""
  );

  const fetchData = async (img) => {
    const formData = new FormData();
    formData.append("output_type", "cutout");
    formData.append("format", "PNG");
    formData.append("image_url", img);
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.picsart.io/tools/1.0/removebg",
        formData,
        {
          headers: {
            "x-picsart-api-key": apiKey,
          },
        }
      );

      const noBgImageUrl = response.data.data.url;
      setNoBgImage(noBgImageUrl);
      setLoading(false);

      return noBgImageUrl;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleOpenChange = (open) => {
    setOpen(open);
  };

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setCurrentRGBColor(color.hex);
    combineImageWithBackgroundColor(color, noBgImage)
      .then((imageUrl) => {
        setCombinedImageUrl(imageUrl);
        setPreviewImage(imageUrl);
      })
      .catch((error) => {
        console.error("Error creating combined image:", error);
      });
  };

  // shape change function
  const handleShapeChange = (shape) => {
    let newBorderRadius = "";

    switch (shape) {
      case "circle":
        newBorderRadius = "50%";
        break;
      case "square":
        newBorderRadius = "0";
        break;
      case "rounded":
        newBorderRadius = "20px";
        break;
      default:
        newBorderRadius = "20px";
    }

    setBorderRadius(newBorderRadius);
  };

  const imageUrls = [
    `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/bg1.jpg`,
    `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/bg2.jpg`,
    `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/bg8.jpg`,
    `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/bg9.jpg`,
    `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/bg10.jpg`,
    `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/bg11.jpg`,
    `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/bg12.jpg`,
    `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/bg13.jpg`,
    `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/bg14.jpg`,
    `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/bg15.jpg`,
  ];

  const addFilter = (color, noBgImage, selectedColor, shadowOffsetWidth) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 500; // Set the canvas size to match the original image dimensions
    canvas.height = 500;

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Handle CORS if images are from external sources
        img.onload = () => resolve(img);
        img.onerror = reject; // Handling error event
        img.src = src;
      });
    };

    loadImage(noBgImage)
      .then((img) => {
        // const shadowOffset = 15; // Adjust the shadow offset as needed

        // Function to draw image with shadow
        const drawWithShadow = (offsetX, offsetY) => {
          ctx.shadowColor = color;
          ctx.shadowBlur = 0; // No blur
          ctx.shadowOffsetX = offsetX;
          ctx.shadowOffsetY = offsetY;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };

        // Draw the shadow on all sides
        drawWithShadow(shadowOffsetWidth, 0); // Right
        drawWithShadow(-shadowOffsetWidth, 0); // Left
        drawWithShadow(0, shadowOffsetWidth); // Bottom
        drawWithShadow(0, -shadowOffsetWidth); // Top

        // Draw the image in the center (without shadow)
        ctx.shadowColor = "transparent";
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert canvas to image
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          // Call combineImageWithBackgroundColor with the converted image and selected color
          combineImageWithBackgroundColor(selectedColor, url)
            .then((combinedImageUrl) => {
              // Update the previewImage state with the combined image URL
              setPreviewImage(combinedImageUrl);
              setCombinedImageUrl(combinedImageUrl);
            })
            .catch((error) => {
              console.error(
                "Error combining image with background color:",
                error
              );
            });
        }, "image/png");
      })
      .catch((error) => {
        console.error("Error loading image:", error);
      });
  };

  const addShadow = (
    noBgImage,
    selectedColor,
    applyShadow,
    backgroundImageSrc
  ) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };

    loadImage(noBgImage)
      .then((img) => {
        if (applyShadow) {
          ctx.shadowColor = "#696969";
          ctx.shadowBlur = 40;
          ctx.shadowOffsetX = 15;
          ctx.shadowOffsetY = 15;
        } else {
          // Clear shadow settings if shadow is not to be applied
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          if (selectedColor) {
            combineImageWithBackgroundColor(selectedColor, url)
              .then((combinedImageUrl) => {
                // Update the previewImage state with the combined image URL
                setPreviewImage(combinedImageUrl);
                setCombinedImageUrl(combinedImageUrl);
              })
              .catch((error) => {
                console.error(
                  "Error combining image with background color:",
                  error
                );
              });
          } else {
            combineImages(backgroundImageSrc, url)
              .then((combinedImageUrl) => {
                // Update the previewImage state with the combined image URL
                setPreviewImage(combinedImageUrl);
                setCombinedImageUrl(combinedImageUrl);
              })
              .catch((error) => {
                console.error(
                  "Error combining image with background color:",
                  error
                );
              });
          }
        }, "image/png");
      })
      .catch((error) => {
        console.error("Error loading image:", error);
      });
  };

  const colorToString = (color) => {
    if (typeof color === "string") {
      return color;
    } else if (color.rgb) {
      const { r, g, b, a } = color.rgb;
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
  };

  const createCanvasGradient = (ctx, gradientString, width, height) => {
    const colorRegex = /#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgba?\([^)]+\)/g;
    const colors = gradientString.match(colorRegex);

    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    colors.forEach((color, index) => {
      gradient.addColorStop(index / (colors.length - 1), color);
    });

    return gradient;
  };

  const combineImageWithBackgroundColor = (selectedColor, imageUrl) => {
    return new Promise((resolve, reject) => {
      selectedColor = colorToString(selectedColor);

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 400;
      canvas.height = 400;

      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        if (selectedColor.startsWith("linear-gradient")) {
          const gradient = createCanvasGradient(
            ctx,
            selectedColor,
            canvas.width,
            canvas.height
          );
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = selectedColor;
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL();

        resolve(dataUrl);
      };
      img.onerror = () => {
        reject(new Error("Error loading image"));
      };
      img.src = imageUrl;
    });
  };

  const urlToFile = async (imageUrl, fileName, mimeType) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: mimeType });
  };

  const combineImages = (backgroundImageSrc, personImageSrc) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 400; // Set the canvas size
      canvas.height = 400;

      const loadImage = (src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "Anonymous"; // Handle CORS if images are from external sources
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });
      };

      Promise.all([loadImage(backgroundImageSrc), loadImage(personImageSrc)])
        .then((images) => {
          ctx.drawImage(images[0], 0, 0, canvas.width, canvas.height); // Draw the background image
          ctx.drawImage(images[1], 0, 0, canvas.width, canvas.height); // Draw the person image

          canvas.toBlob((blob) => {
            resolve(blob);
          }, "image/png");
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const convertAndStoreImages = () => {
    setLoader(true);
    const combinedImagePromises = imageUrls.map((bgImage) =>
      combineImages(bgImage, noBgImage).then((blob) =>
        URL.createObjectURL(blob)
      )
    );

    Promise.all(combinedImagePromises)
      .then((combinedImageUrls) => {
        setCombinedImages(combinedImageUrls);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error combining images:", error);
        setLoader(false);
      });
  };

  // const handleColorImageUpdate = (combinedImageUrl) => {
  //   setImageFile(combinedImageUrl);
  // };

  useEffect(() => {
    // Call this function to start the process
    convertAndStoreImages();
  }, [noBgImage]);

  useEffect(() => {
    if (combinedImageUrl) {
      urlToFile(combinedImageUrl, "preview_image.png", "image/png")
        .then((file) => setImageFile(file))
        .catch((error) =>
          console.error("Error converting URL to File:", error)
        );
    }
  }, [combinedImageUrl]);

  useEffect(() => {
    // Function to convert image URL to File
    if (previewImage) {
      urlToFile(previewImage, "preview_image.png", "image/png")
        .then((file) => setImageFile(file))
        .catch((error) =>
          console.error("Error converting URL to File:", error)
        );
    }
  }, [previewImage]);

  const handleSaveProfileImg = () => {
    const formData = new FormData();
    formData.append("files", imageFile);
    setLoading(true);
    dispatch(uploadProfileImage(formData)).then((res) => {
      setLoading(false);
      if (res?.payload?.data?.media) {
        setProfileImg(res?.payload?.data?.media[0]);
        setPreviewImage(res?.payload?.data?.media[0]);
        dispatch(
          updateUser({ profilePhoto: res?.payload?.data?.media[0] })
        ).then((res) => {
          if (res?.payload?.data?.profilePhoto) {
            //Remove old profile photo
            session.setUserProfileImage(res?.payload?.data?.profilePhoto);
            message.success(TextMessage.PROFILE_PIC_UPDATE);
            if (fromOnboarding) {
              const obj = {
                ...user,
                profilePhoto: res?.payload?.data?.profilePhoto,
              };
              dispatch(setOnboardingUserPreference(obj));
            }
            // router.push(`/u/${username}`);
          }
        });
      }
    });
  };

  const updateMainImage = (imageUrl) => {
    setProfileImg(imageUrl);
    setPreviewImage(imageUrl);
  };

  const colorOptions = [
    { label: "Solid Color", value: "solid" },
    { label: "Gradients", value: "gradient" },
    { label: "RGB", value: "rgb" },
  ];

  const handleEditDropdown = () => {
    setOpenEditDropDown(!openEditDropDown);
  };

  const onChangeZoom = (newValue) => {
    setZoomInputValue(newValue);
  };

  const handleFilterClick = (color) => {
    setSelectedOutlineColor(color);
    addFilter(color, noBgImage, selectedColor, shadowOffsetWidth);
  };

  const handleFilterToggle = (isToggled) => {
    setToggleOutline(isToggled);
    const outlineColor = isToggled ? selectedOutlineColor : "#ffffff"; // Set outline color based on toggle state
    addFilter(outlineColor, noBgImage, selectedColor, shadowOffsetWidth);
  };

  const handleShadowToggle = (isToggled) => {
    setToggleShadow(isToggled);
    // Now directly using `isToggled` to decide whether to apply shadow or not
    addShadow(noBgImage, selectedColor, isToggled, backgroundGalleryImage);
  };

  const debouncedOnChangeShadowOffsetWidth = debounce((newValue) => {
    setShadowOffsetWidth(newValue);
    addFilter(selectedOutlineColor, noBgImage, selectedColor, newValue);
  }, 100);

  const onChangeShadowOffsetWidth = (newValue) => {
    debouncedOnChangeShadowOffsetWidth(newValue);
  };

  const dropDownRenderEditUI = () => {
    return (
      <div className="bg-white rounded-md border border-slate-400 shadow-md  p-2 w-full">
        <div className="flex flex-col w-full rounded-lg ">
          <div className=" justify-between items-center flex ">
            <span className="text-base font-medium"> Outline</span>
            <Switch
              style={{ background: toggleOutline ? "#1890ff" : "#00000040" }}
              size="small"
              checked={toggleOutline}
              onChange={handleFilterToggle}
            />
          </div>

          {toggleOutline && (
            <div className="flex flex-col">
              <div className=" flex flex-col">
                <div className="flex justify-between items-center">
                  <span>Width</span>
                  <InputNumber
                    min={10}
                    max={25}
                    step={1}
                    controls={false}
                    style={{
                      margin: "0 8px",
                      width: "50px",
                    }}
                    value={shadowOffsetWidth}
                    onChange={onChangeShadowOffsetWidth}
                  />
                </div>
                <Slider
                  min={10}
                  max={25}
                  step={1}
                  onChange={onChangeShadowOffsetWidth}
                  value={
                    typeof shadowOffsetWidth === "number"
                      ? shadowOffsetWidth
                      : 0
                  }
                />
              </div>
            </div>
          )}

          <div className="flex flex-col items-start">
            {toggleOutline && <span className="text-sm mb-1">Color</span>}
            {toggleOutline && (
              <div className="flex gap-2">
                {outlineColors.map((filter, index) => (
                  <div
                    key={index}
                    className="w-5 h-5 flex items-center justify-center cursor-pointer"
                    style={{
                      backgroundColor: filter.color,
                      borderRadius: "50%",
                    }}
                    title={`Filter ${index + 1}`}
                    onClick={() => handleFilterClick(filter.color)}
                  ></div>
                ))}
              </div>
            )}
          </div>

          <div className="justify-between border-y border-[#DFE4EC] py-3 mt-3 items-center flex">
            <span className="font-medium text-base"> Shadow</span>
            <Switch
              style={{ background: toggleShadow ? "#1890ff" : "#00000040" }}
              size="small"
              checked={toggleShadow}
              onChange={handleShadowToggle}
            />
          </div>

          <div className="flex flex-col mt-2">
            <span className="font-medium text-base">Transform</span>
            <div className=" flex mt-2 flex-col">
              <div className="flex justify-between items-center">
                <span>Zoom in</span>
                <InputNumber
                  min={1}
                  max={3}
                  step={0.1}
                  controls={false}
                  style={{
                    margin: "0 8px",
                    width: "50px",
                  }}
                  value={zoomInputValue}
                  onChange={onChangeZoom}
                />
              </div>
              <Slider
                min={1.0}
                max={3.0}
                step={0.1}
                onChange={onChangeZoom}
                value={typeof zoomInputValue === "number" ? zoomInputValue : 0}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleFileChange = async (file) => {
    setUploading(true);
    const oldProfile = user?.profilePhoto;
    const formData = new FormData();
    formData.append("files", file);

    const res = await dispatch(uploadProfileImage(formData));

    if (res?.payload?.data?.media) {
      setProfileImg(res?.payload?.data?.media[0]);
      setPreviewImage(res?.payload?.data?.media[0]);
      setRestorePhoto(res?.payload?.data?.media[0]);
      const img = await fetchData(res?.payload?.data?.media[0]);
      dispatch(
        updateUser({
          ...user,
          profilePhoto: res?.payload?.data?.media[0],
          preferences: {
            ...user?.preferences,
            userProfilePreferences: {
              ...user?.preferences?.userProfilePreferences,
              bgRemovedProfilePhoto: img,
              backupProfilePhoto: res?.payload?.data?.media[0],
            },
          },
        })
      ).then((res) => {
        if (res?.payload?.data?.profilePhoto) {
          //Remove old profile photo
          if (oldProfile) {
            dispatch(deleteImageFromS3(oldProfile));
          }
          session.setUserProfileImage(res?.payload?.data?.profilePhoto);
          message.success(TextMessage.PROFILE_PIC_UPDATE);
          // router.push(`/u/${username}`);
        }
        setUploading(false);
      });
    }
    setUploading(false);
  };

  const handleRestoreProfilePhoto = async () => {
    setPreviewImage(restorePhoto);
    setProfileImg(restorePhoto);
    dispatch(
      updateUser({
        ...user,
        profilePhoto: restorePhoto,
        preferences: {
          ...user?.preferences,
          userProfilePreferences: {
            ...user?.preferences?.userProfilePreferences,
            backupProfilePhoto: restorePhoto,
          },
        },
      })
    );
    if (fromOnboarding) {
      const obj = {
        ...user,
        profilePhoto: restorePhoto,
        preferences: {
          ...user?.preferences,
          userProfilePreferences: {
            ...user?.preferences?.userProfilePreferences,
            backupProfilePhoto: restorePhoto,
          },
        },
      };
      dispatch(setOnboardingUserPreference(obj));
    }
  };

  const handleDeleteProfilePhoto = () => {
    dispatch(deleteImageFromS3(profileImg));
    dispatch(
      updateUser({
        profilePhoto: null,
        preferences: {
          ...user?.preferences,
          userProfilePreferences: {
            ...user?.preferences?.userProfilePreferences,
            bgRemovedProfilePhoto: null,
          },
        },
      })
    );
    setProfileImg("");
    setPreviewImage("");
    setCombinedImages([]);
    session.setUserProfileImage(null);
    message.success(TextMessage.PROFILE_DELETE);

    if (fromOnboarding) {
      handleRemoved();
    }
  };

  return (
    <div className="text-center p-[8px]">
      {loading ? (
        <div>
          <Spin size="middle" />
        </div>
      ) : (
        <>
          <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-2  p-2">
            <div
              className={`"flex flex-col items-start  justify-start ${
                isMobile ? "p-0" : "pr-20"
              }`}
            >
              <div className="flex gap-x-3">
                <Select
                  value={selectedOption}
                  open={open}
                  style={{ width: "120px" }}
                  onChange={handleSelectChange}
                  onDropdownVisibleChange={handleOpenChange}
                >
                  {colorOptions.map((option) => (
                    <Option
                      key={option.value}
                      dropdownStyle={{ marginTop: "2px" }}
                      value={option.value}
                      style={{ alignItems: "start" }}
                    >
                      {option.label}
                    </Option>
                  ))}
                </Select>

                <Dropdown
                  overlayStyle={{ width: "290px" }}
                  placement="bottom"
                  trigger={["click"]}
                  open={openEditDropDown}
                  dropdownRender={() => dropDownRenderEditUI()}
                  onOpenChange={handleEditDropdown}
                >
                  <button className="px-2 bg-white border rounded-md border-gray-400 ">
                    <PiPencilSimple className="h-5 w-5 text-gray-400" />
                  </button>
                </Dropdown>
              </div>

              <div className="flex flex-wrap mt-4 max-w-lg">
                {selectedOption === "solid" &&
                  backgroundColors.map((color, index) => (
                    <div
                      key={index}
                      onClick={() => handleColorChange(color)}
                      style={{
                        backgroundColor: color,
                        cursor: "pointer",
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        margin: 5,
                      }}
                    />
                  ))}

                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {selectedOption === "gradient" &&
                    backgroundGradients.map((gradient, index) => (
                      <div
                        key={index}
                        onClick={() => handleColorChange(gradient)}
                        style={{
                          backgroundImage: gradient,
                          cursor: "pointer",
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          margin: 5,
                          flex: "flex",
                        }}
                      />
                    ))}
                </div>
                {selectedOption === "rgb" && (
                  <ChromePicker
                    color={currentRGBColor}
                    onChangeComplete={(color) => handleColorChange(color)}
                  />
                )}
              </div>
            </div>
            {previewImage && (
              <div className="flex flex-col justify-center relative">
                <div className="flex items-center">
                  <span className="text-gray-500 font-medium mb-2 text-md">
                    Preview
                  </span>
                </div>
                <div
                  className="border border-gray-300 relative"
                  style={{
                    borderRadius: `${borderRadius}`,
                    width: "160px",
                    height: "160px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={previewImage}
                    alt="Combined Image"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      scale: `${zoomInputValue}`,
                    }}
                  />
                </div>
                <div
                  onClick={handleDeleteProfilePhoto}
                  className="absolute top-5 z-2 right-0"
                >
                  <TrashIcon className="h-5 w-5 cursor-pointer text-red-400" />
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRestoreProfilePhoto();
                  }}
                  className="absolute top-5 z-2 left-0"
                >
                  <MdOutlineRefresh className="h-5 w-5 cursor-pointer text-black" />
                </div>

                {/* <Cropper
              src={combinedImageUrl}
              stencils={[{
                aspectRatio: 1 / 1,
                // Use this zoom state to control the zoom level of the image
                transformations: { scale: zoomInputValue},
              }]} */}
                {/* /> */}
              </div>
            )}
            {!previewImage && (
              <FileUploader
                className="outline-none"
                handleChange={handleFileChange}
                name="file"
                types={FILETYPES}
                onTypeError={(err) => message.error(err)}
              >
                <div className="bg-white my-0 mx-auto w-60 h-60  border-2 border-dashed border-gray-400 flex text-center justify-center align-middle items-center rounded-full">
                  {uploading ? (
                    <Spin size="middle" tip="Uploading..." />
                  ) : (
                    <>
                      <div>
                        <FiUpload className="h-6 w-6 text-gray-500 my-0 mx-auto mb-2" />
                        <span>Drag & drop to upload Image</span>
                        <div className="flex justify-center items-center gap-2 mt-2">
                          <hr className="w-12" />
                          <span className="text-gray-500">OR</span>
                          <hr className="w-12" />
                        </div>
                        <button className="bg-[#347AE2] p-2 mt-2 rounded-lg text-white">
                          Browse Image
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </FileUploader>
            )}
          </div>

          <div className="flex flex-col p-2">
            <div className="flex text-center justify-between">
              <span className="text-2xl text-black font-medium  ">
                Select your style
              </span>
              <Select
                defaultValue="circle"
                style={{ width: "120px" }}
                onChange={handleShapeChange}
              >
                <Option value="circle">Circle</Option>
                <Option value="square">Square</Option>
                <Option value="rounded">Rounded</Option>
              </Select>
            </div>

            {!loader ? (
              <div
                className={`grid gap-x-1 mt-6 cursor-pointer items-center  ${
                  isMobile ? "p-0 grid-cols-2" : "pr-2 grid-cols-5"
                }`}
              >
                {combinedImages.map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={imageUrl}
                      onClick={() => updateMainImage(imageUrl)}
                      alt={`Combined Image ${index + 1}`}
                      className="editImageStyle"
                      style={{
                        borderRadius: `${borderRadius}`,
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                        // margin: "10px",
                      }}
                    />
                    <a
                      href={imageUrl}
                      title="Download profile picture"
                      download={`CombinedImage${index + 1}.png`}
                      className="absolute bottom-5 right-6  opacity-0 group-hover:opacity-100 transition-opacity ease-out duration-300 flex justify-center items-center"
                      style={{
                        backgroundColor: "#347AE2",
                        color: "white",
                        padding: "8px",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      <HiDownload className="text-white h-6 w-6" />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <Spin size="middle" tipText="Generating images..." />
              </div>
            )}
          </div>

          {!previewImage && <AiPreviewImageComponent />}

          {previewImage && !loader && (
            <div className="flex justify-center items-center mt-4">
              <Button
                type="primary"
                className="bg-blue-500 px-4  rounded-md"
                onClick={handleSaveProfileImg}
              >
                Save
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AiProfile;
