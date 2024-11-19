import { setEditDataNavbar, setSubPageParentData } from "@actions/app";
import AddComponent from "@components/common/siteCustomization/AddComponent";
import HeaderEditorComponent from "@components/common/siteCustomization/HeaderEditorComponent";
import HeaderTitle from "@components/common/siteCustomization/HeaderTitle";
import PageTreeComponent from "@components/common/siteCustomization/PageTreeComponent";
import { Modal, Select, Switch } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

const { Option } = Select;

const HeaderCustomizationModal = ({
  openModal,
  setOpenModal,
  headerCustomizeOption = "",
  handleChangeHeaderType = () => {},
  headerPosition = "",
  fixedHeader = "",
  handleHeaderFixedPosition = () => {},
  handleHeaderPosition = () => {},
  pagesItems = [],
  setPagesItems = () => {},
  getSortedItems = () => {},
  showLoginButton='',
  showSignUpButton='',
  showSearchButton='',
  showAllowCopyCollection=''
}) => {
  const dispatch = useDispatch();

  const [optionSelected, setOptionSelected] = useState("");

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleCloseAdd = () => {
    setOptionSelected("");
    dispatch(setSubPageParentData(null));
    dispatch(setEditDataNavbar(null));
  };

  return (
    <>
      {openModal && (
        <Modal
          title={null}
          open={openModal}
          footer={null}
          maskClosable={false}
          onCancel={() => setOpenModal(false)}
          width={"98%"}
          style={{
            top: 20,
          }}
          bodyStyle={{
            padding: "0px",
            height: "100vh",
          }}
          closable={false}
        >
          <div className="w-full flex items-start h-full">
            <div className="hidden md:block w-[75%] h-full">
              {headerCustomizeOption === "custom" ? (
                <HeaderEditorComponent
                  alignment={headerPosition}
                  items={pagesItems}
                  showLoginButton={showLoginButton}
                  showSignUpButton={showSignUpButton}
                  showSearchButton={showSearchButton}
                  showAllowCopyCollection={showAllowCopyCollection}
                />
              ) : (
                <></>
              )}
            </div>

            {/* headeroptions */}
            <div className="w-full md:w-[30%] h-full bg-white border-l border-solid border-[#DFE4EC] p-4 shadow-xl overflow-x-hidden overflow-y-auto">
              {!optionSelected && (
                <>
                  <HeaderTitle
                    handleClose={handleClose}
                    title={"Header"}
                    showLeftIcon={false}
                    showRightIcon={true}
                  />

                  <Select
                    className="w-full rounded-lg border-[#ABB7C9]"
                    value={headerCustomizeOption}
                    onChange={(value) => handleChangeHeaderType(value)}
                    placeholder="Select option"
                  >
                    <Option value="default" key="default">
                      Set Default Top Bar
                    </Option>
                    <Option value="custom" key="custome">
                      Set custom navigation
                    </Option>
                  </Select>

                  {headerCustomizeOption === "custom" && (
                    <div className="mt-4">
                      <span className="text-[#292B38] text-base block mb-1 font-bold">
                        Navigation Alignment
                      </span>
                      <span className="block text-sm text-[#74778B]">
                        Set the alignment of the header contents
                      </span>

                      <div className="w-full justify-center mt-4 flex items-center p-1 gap-2 rounded-[6px] bg-[#F8FAFB] border-[0.4px] border-solid border-[#ABB7C9] shadow-md">
                        <div
                          className={`w-[25%] flex items-center justify-center p-1 gap-1 cursor-pointer font-medium text-sm ${
                            headerPosition === "left"
                              ? "rounded shadow border-[0.4px] border-solid border-[78A6EC] bg-white text-[#347AE2]"
                              : "text-[#74778B]"
                          }`}
                          onClick={() => handleHeaderPosition("left")}
                        >
                          Left
                        </div>

                        <div
                          onClick={() => handleHeaderPosition("center")}
                          className={`w-[25%] flex items-center justify-center p-1 gap-1 cursor-pointer font-medium text-sm ${
                            headerPosition === "center"
                              ? "rounded shadow border-[0.4px] border-solid border-[78A6EC] bg-white text-[#347AE2]"
                              : "text-[#74778B]"
                          }`}
                        >
                          Center
                        </div>

                        <div
                          onClick={() => handleHeaderPosition("right")}
                          className={`w-[25%] flex items-center justify-center p-1 gap-1 cursor-pointer font-medium text-sm ${
                            headerPosition === "right"
                              ? "rounded shadow border-[0.4px] border-solid border-[78A6EC] bg-white text-[#347AE2]"
                              : "text-[#74778B]"
                          }`}
                        >
                          Right
                        </div>
                        <div
                          onClick={() => handleHeaderPosition("minimal")}
                          className={`w-[25%] flex items-center justify-center p-1 gap-1 cursor-pointer font-medium text-sm ${
                            headerPosition === "minimal"
                              ? "rounded shadow border-[0.4px] border-solid border-[78A6EC] bg-white text-[#347AE2]"
                              : "text-[#74778B]"
                          }`}
                        >
                          Minimal
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <span className="block mb-1 text-base text-[#292B38] font-bold">
                            Fixed Header on top of page
                          </span>
                          <span className="text-sm text-[#74778B]">
                            Set navbar to the top of page on scroll
                          </span>
                        </div>

                        <Switch
                          checked={fixedHeader}
                          onChange={handleHeaderFixedPosition}
                          style={{
                            background: fixedHeader ? "#1890ff" : "#00000040",
                          }}
                          size="small"
                          // loading={loadingSwitch}
                        />
                      </div>

                      <div className="mt-3">
                        <span className="mb-1 block text-base text-[#347AE2] font-medium">
                          Header Navigation
                        </span>
                        <span className="text-sm text-[#74778B]">
                          Allow users to easily navigate to other pages on this
                          site
                        </span>
                      </div>

                      <div className="my-2">
                        {pagesItems?.length > 0 ? (
                          <PageTreeComponent
                            items={pagesItems}
                            getSortedItems={getSortedItems}
                            setOptionSelected={setOptionSelected}
                          />
                        ) : (
                          <></>
                        )}
                      </div>

                      <div
                        className="mt-2 flex items-center justify-center p-2 gap-1 rounded-lg bg-[#E5F0FF] border border-solid border-[#B8D4FE] text-[#347AE2] text-base cursor-pointer"
                        onClick={() => setOptionSelected("add")}
                      >
                        + Add new page
                      </div>
                    </div>
                  )}
                </>
              )}

              {optionSelected === "add" && (
                <div>
                  <AddComponent
                    handleClose={handleCloseAdd}
                    setItems={setPagesItems}
                    items={pagesItems}
                    getSortedItems={getSortedItems}
                  />
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default HeaderCustomizationModal;
