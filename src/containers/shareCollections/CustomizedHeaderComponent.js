import { openAuthModal } from "@actions/app";
import {
  Bars3Icon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import session from "@utils/session";
import { Button, Dropdown, Tooltip } from "antd";
import { useState } from "react";
import { PiCopy } from "react-icons/pi";
import { useDispatch } from "react-redux";

const CustomizedHeaderComponent = ({
  alignment = "center",
  items = [],
  isSticky = true,
  collapsed = false,
  isMobile = false,
  uname = "",
  moduleName = "",
  sourceId = "",
  slug = "",
  showCurateitWatermark = "",
  shareSubFolder='',
  showLoginButton='',
  showSignUpButton='',
  showCopyCollectionIcon='',
  copyLoading='',
  showSearchButton
}) => {
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const handleNavigate = (item) => {
    if (item?.type === "page") {
    }

    if (item?.type === "link" && item?.url) {
      if (item?.openLinkType === "same tab") {
        window.open(item.url, "_self");
        return;
      }
      window.open(item.url, "_blank");
    }
  };

  const toggleDropdown = (id) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const renderMenuItem = (item) => {
    if (
      item?.type === "page" ||
      item?.type === "link" ||
      (item?.type === "text" && item?.subTextType === "text")
    ) {
      if (item?.isCTA) {
        return (
          <Button
            type="primary"
            className={`border-[#105FD3] bg-[#105FD3] hover:bg-[#105FD3] hover:border-[#105FD3] rounded`}
            onClick={() => handleNavigate(item)}
          >
            {item?.title}
          </Button>
        );
      } else {
        return (
          <span
            className={`${
              item?.type === "link"
                ? "hover:underline hover:decoration-[#B8D4FE]"
                : "hover:bg-[#f5f5f5]"
            } block text-[#344054] text-base cursor-pointer capitalize`}
            onClick={() => handleNavigate(item)}
          >
            {item?.title}
          </span>
        );
      }
    }

    if (item?.type === "text" && item?.subTextType === "header") {
      return (
        <span className={`block text-[#344054] text-2xl hover:bg-[#f5f5f5]`}>
          {item?.title}
        </span>
      );
    }

    if (item?.type === "text" && item?.subTextType === "button") {
      return (
        <li>
          <Button className="rounded border-[#105FD3] text-[#105FD3] hover:border-[#105FD3] hover:text-[#105FD3]">
            {item?.title}
          </Button>
        </li>
      );
    }
  };

  const dropdownnRenderUI = (children) => {
    return (
      <div className="dropdown-content p-2 rounded-sm flex flex-col gap-y-2">
        {children?.map((item) => renderMenuItem(item))}
      </div>
    );
  };

  const renderPageDetails = (item, isVisible = true) => {
    if ((item?.type === "page" || item?.type === "link") && isVisible) {
      if (item?.isCTA) {
        return (
          <Button
            type="primary"
            className={`border-[#105FD3] bg-[#105FD3] hover:bg-[#105FD3] hover:border-[#105FD3] rounded`}
            onClick={() => handleNavigate(item)}
          >
            {item?.title}
          </Button>
        );
      } else {
        return (
          <span
            className={`${
              item?.type === "link"
                ? "hover:underline hover:decoration-[#B8D4FE]"
                : ""
            } block text-[#000929] text-base cursor-pointer capitalize`}
            onClick={() => handleNavigate(item)}
          >
            {item?.title}
          </span>
        );
      }
    }

    if (item?.type === "text" && item?.subTextType === "header" && isVisible) {
      return (
        <span className={`block text-[#000929] text-2xl`}>{item?.title}</span>
      );
    }

    if (item?.type === "text" && item?.subTextType === "button" && isVisible) {
      return (
        <Button className="rounded border-[#105FD3] text-[#105FD3] hover:border-[#105FD3] hover:text-[#105FD3]">
          {item?.title}
        </Button>
      );
    }

    if (item?.type === "text" && item?.subTextType === "text" && isVisible) {
      if (item?.children?.length > 0) {
        const isOpen = openDropdowns[item.id] || false;
        return (
          <Dropdown
            overlayStyle={{ width: "150px" }}
            dropdownRender={() => dropdownnRenderUI(item?.children || [])}
            onOpenChange={() => toggleDropdown(item.id)}
            open={isOpen}
            placement="bottom"
          >
            <div className="flex items-center cursor-pointer capitalize">
              <div className="text-base text-[#000929]">{item?.title}</div>{" "}
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </div>
          </Dropdown>
        );
      } else {
        return (
          <span
            className={`${
              item?.type === "link"
                ? "hover:underline hover:decoration-[#B8D4FE]"
                : ""
            } block text-[#000929] text-base cursor-pointer capitalize`}
          >
            {item?.title}
          </span>
        );
      }
    }

    return null;
  };

  return (
    <>
      {!isMobile && (
        <div
          className={`relative flex items-center justify-between w-full bg-white border-2 border-solid border-[#DFE4EC] p-2`}
          style={{
            paddingLeft:
              !isSticky && !collapsed && shareSubFolder
                ? "280px"
                : !isSticky && collapsed && shareSubFolder
                ? "8px"
                : !isSticky && !collapsed && !shareSubFolder
                ? "8px"
                : "8px",
            position: isSticky ? "fixed" : "",
            top: isSticky ? "0px" : "",
            zIndex: 100,
          }}
        >
          <div className="mr-auto">
            <img
              className={`object-scale-down h-[30px] cursor-pointer`}
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo.png`}
              alt="curateit"
            />
          </div>

          {alignment !== "minimal" && (
            <div
              className={`w-full items-center px-2 gap-4 flex`}
              style={{
                justifyContent:
                  alignment === "center"
                    ? "center"
                    : alignment === "left"
                    ? "flex-start"
                    : alignment === "right"
                    ? "flex-end"
                    : "center",
              }}
            >
              {items?.length > 0 ? (
                <>
                  {items?.map((item) =>
                    renderPageDetails(item, item?.visibility?.includes("top"))
                  )}
                  {/* {showSearchButton && (
                    <MagnifyingGlassIcon className="h-5 w-5" />
                  )} */}
                  {showCopyCollectionIcon && !copyLoading && (
                    <Tooltip
                      title={`${
                        copyLoading ? "Copying..." : "Copy collection"
                      }`}
                    >
                      <PiCopy
                        className={`h-5 w-5 ml-1 ${
                          copyLoading
                            ? "text-gray-200 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                        onClick={() => {
                          if (copyLoading) {
                            return;
                          } else {
                            handleCopyCollection();
                          }
                        }}
                      />
                    </Tooltip>
                  )}
                  {showCurateitWatermark && (
                    <Button
                      className="flex items-center rounded border-[#105FD3] text-[#105FD3] hover:border-[#105FD3] hover:text-[#105FD3]"
                      onClick={() => {
                        dispatch(
                          openAuthModal({
                            open: true,
                            action: "signup",
                            extraInfo: {
                              trigger: "signup",
                              username: uname,
                              id: sourceId,
                              module: moduleName,
                              slug: slug,
                            },
                          })
                        );
                      }}
                    >
                      Built with
                      <img
                        className="w-4 h-4 object-contain ml-1"
                        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}
                        alt="curateit-logo"
                      />
                    </Button>
                  )}
                </>
              ) : (
                <>
                  {/* {showSearchButton && (
                    <MagnifyingGlassIcon className="h-5 w-5" />
                  )} */}
                  {showCopyCollectionIcon && !copyLoading && (
                    <Tooltip
                      title={`${
                        copyLoading ? "Copying..." : "Copy collection"
                      }`}
                    >
                      <PiCopy
                        className={`h-5 w-5 ml-1 ${
                          copyLoading
                            ? "text-gray-200 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                        onClick={() => {
                          if (copyLoading) {
                            return;
                          } else {
                            handleCopyCollection();
                          }
                        }}
                      />
                    </Tooltip>
                  )}
                  {showCurateitWatermark && (
                    <Button
                      className="flex items-center rounded border-[#105FD3] text-[#105FD3] hover:border-[#105FD3] hover:text-[#105FD3]"
                      onClick={() => {
                        dispatch(
                          openAuthModal({
                            open: true,
                            action: "signup",
                            extraInfo: {
                              trigger: "signup",
                              username: uname,
                              id: sourceId,
                              module: moduleName,
                              slug: slug,
                            },
                          })
                        );
                      }}
                    >
                      Built with
                      <img
                        className="w-4 h-4 object-contain ml-1"
                        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}
                        alt="curateit-logo"
                      />
                    </Button>
                  )}
                </>
              )}
            </div>
          )}

          {alignment !== "minimal" && !session?.userId && (
            <div className="flex items-center ml-auto w-fit">
              {showLoginButton ? (
                <Button
                  className="mx-2 rounded border-[#105FD3] text-[#105FD3] hover:border-[#105FD3] hover:text-[#105FD3]"
                  onClick={() => {
                    dispatch(
                      openAuthModal({
                        open: true,
                        action: "login",
                      })
                    );
                  }}
                >
                  Login
                </Button>
              ) : (
                <></>
              )}
              {showSignUpButton ? (
                <Button
                  type="primary"
                  className={`border-[#105FD3] bg-[#105FD3] hover:bg-[#105FD3] hover:border-[#105FD3] rounded`}
                  onClick={() => {
                    dispatch(
                      openAuthModal({
                        open: true,
                        action: "signup",
                        extraInfo: {
                          trigger: "signup",
                          username: uname,
                          id: sourceId,
                          module: moduleName,
                          slug: slug,
                        },
                      })
                    );
                  }}
                >
                  Sign up
                </Button>
              ) : (
                <></>
              )}
            </div>
          )}

          {/* for minimal */}
          {alignment === "minimal" && (
            <div className="flex items-center gap-2">
              {/* {showSearchButton && <MagnifyingGlassIcon className="h-5 w-5" />} */}
              {showCopyCollectionIcon && !copyLoading && (
                <Tooltip
                  title={`${copyLoading ? "Copying..." : "Copy collection"}`}
                >
                  <PiCopy
                    className={`h-5 w-5 ml-1 ${
                      copyLoading
                        ? "text-gray-200 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    onClick={() => {
                      if (copyLoading) {
                        return;
                      } else {
                        handleCopyCollection();
                      }
                    }}
                  />
                </Tooltip>
              )}
              {showCurateitWatermark && (
                <Button
                  className="flex items-center rounded border-[#105FD3] text-[#105FD3] hover:border-[#105FD3] hover:text-[#105FD3]"
                  onClick={() => {
                    dispatch(
                      openAuthModal({
                        open: true,
                        action: "signup",
                        extraInfo: {
                          trigger: "signup",
                          username: uname,
                          id: sourceId,
                          module: moduleName,
                          slug: slug,
                        },
                      })
                    );
                  }}
                >
                  Built with
                  <img
                    className="w-4 h-4 object-contain ml-1"
                    src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}
                    alt="curateit-logo"
                  />
                </Button>
              )}

              <Bars3Icon
                className="h-5 w-5 cursor-pointer"
                onClick={openDrawer}
              />
            </div>
          )}

          {isDrawerOpen && (
            <>
              <div
                className={`fixed top-0 right-0 bg-white border-l border-solid border-[#DFE4EC] shadow-xl overflow-y-auto transition-transform duration-300 ${
                  isDrawerOpen ? "transform-none" : "transform translate-x-full"
                }`}
                style={{ width: "350px", height: "100vh", zIndex: 999 }}
              >
                <div className="p-4">
                  <div className="mb-4 pb-2 border-b border-solid border-[#cdcdcd] flex w-full items-center justify-between">
                    {session && session?.userId ? (
                      <></>
                    ) : (
                      <div className="flex items-center gap-2">
                        {showLoginButton && (
                          <Button
                            className="mx-2 rounded border-[#105FD3] text-[#105FD3] hover:border-[#105FD3] hover:text-[#105FD3]"
                            onClick={() => {
                              dispatch(
                                openAuthModal({
                                  open: true,
                                  action: "login",
                                })
                              );
                            }}
                          >
                            Login
                          </Button>
                        )}
                        {showSignUpButton && (
                          <Button
                            type="primary"
                            className={`border-[#105FD3] bg-[#105FD3] hover:bg-[#105FD3] hover:border-[#105FD3] rounded`}
                            onClick={() => {
                              dispatch(
                                openAuthModal({
                                  open: true,
                                  action: "signup",
                                  extraInfo: {
                                    trigger: "signup",
                                    username: uname,
                                    id: sourceId,
                                    module: moduleName,
                                    slug: slug,
                                  },
                                })
                              );
                            }}
                          >
                            Sign up
                          </Button>
                        )}
                      </div>
                    )}

                    <XMarkIcon
                      className="h-5 w-5 cursor-pointer"
                      onClick={closeDrawer}
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    {items?.length > 0 ? (
                      <>
                        {items?.map((item) =>
                          renderPageDetails(
                            item,
                            item?.visibility?.includes("sidebar")
                          )
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {isMobile && (
        <div
          className={`relative flex items-center justify-between w-full bg-white border-2 border-solid border-[#DFE4EC] p-2`}
          style={{
            paddingLeft: "8px",
            position: isSticky ? "fixed" : "",
            top: isSticky ? "0px" : "",
            zIndex: 100,
          }}
        >
          <div className="mr-auto">
            <img
              className={`object-scale-down h-[30px] cursor-pointer`}
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo.png`}
              alt="curateit"
            />
          </div>

          <div className="flex items-center gap-1">
            {/* {showSearchButton && <MagnifyingGlassIcon className="h-5 w-5" />} */}
            {showCopyCollectionIcon && !copyLoading && (
              <Tooltip
                title={`${copyLoading ? "Copying..." : "Copy collection"}`}
              >
                <PiCopy
                  className={`h-5 w-5 ${
                    copyLoading
                      ? "text-gray-200 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={() => {
                    if (copyLoading) {
                      return;
                    } else {
                      handleCopyCollection();
                    }
                  }}
                />
              </Tooltip>
            )}
            {showCurateitWatermark && (
              <Button
                className="flex items-center rounded border-[#105FD3] text-[#105FD3] hover:border-[#105FD3] hover:text-[#105FD3]"
                onClick={() => {
                  dispatch(
                    openAuthModal({
                      open: true,
                      action: "signup",
                      extraInfo: {
                        trigger: "signup",
                        username: uname,
                        id: sourceId,
                        module: moduleName,
                        slug: slug,
                      },
                    })
                  );
                }}
              >
                Built with
                <img
                  className="w-4 h-4 object-contain ml-1"
                  src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}
                  alt="curateit-logo"
                />
              </Button>
            )}

            <Bars3Icon
              className="h-5 w-5 cursor-pointer"
              onClick={openDrawer}
            />
          </div>

          {isDrawerOpen && (
            <>
              <div
                className={`fixed top-0 right-0 bg-white border-l border-solid border-[#DFE4EC] shadow-xl overflow-y-auto transition-transform duration-300 ${
                  isDrawerOpen ? "transform-none" : "transform translate-x-full"
                }`}
                style={{ width: "90%", height: "100vh", zIndex: 999 }}
              >
                <div className="p-4">
                  <div className="mb-4 pb-2 border-b border-solid border-[#cdcdcd] flex w-full items-center justify-between">
                    {session && session?.userId ? (
                      <></>
                    ) : (
                      <div className="flex items-center gap-2">
                        {showLoginButton && (
                          <Button
                            className="mx-2 rounded border-[#105FD3] text-[#105FD3] hover:border-[#105FD3] hover:text-[#105FD3]"
                            onClick={() => {
                              dispatch(
                                openAuthModal({
                                  open: true,
                                  action: "login",
                                })
                              );
                            }}
                          >
                            Login
                          </Button>
                        )}
                        {showSignUpButton && (
                          <Button
                            type="primary"
                            className={`border-[#105FD3] bg-[#105FD3] hover:bg-[#105FD3] hover:border-[#105FD3] rounded`}
                            onClick={() => {
                              dispatch(
                                openAuthModal({
                                  open: true,
                                  action: "signup",
                                  extraInfo: {
                                    trigger: "signup",
                                    username: uname,
                                    id: sourceId,
                                    module: moduleName,
                                    slug: slug,
                                  },
                                })
                              );
                            }}
                          >
                            Sign up
                          </Button>
                        )}
                      </div>
                    )}

                    <XMarkIcon
                      className="h-5 w-5 cursor-pointer"
                      onClick={closeDrawer}
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    {items?.length > 0 ? (
                      <>{items?.map((item) => renderPageDetails(item))}</>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
export default CustomizedHeaderComponent;
